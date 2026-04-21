import { useAutocomplete, useTheme } from "@truongdq01/headless";
import type React from "react";
import {
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	ActivityIndicator,
	Keyboard,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../Icon/Icon";
import { Input } from "../Input/Input";

const HORIZONTAL_PAD = 8;
const SUPPRESS_FOCUS_OPEN_MS = 600;
const BLUR_CLOSE_DELAY_MS = 180;
const IDLE_CALLBACK_TIMEOUT_MS = 220;
const RAF_FALLBACK_DISMISS_MS = 120;

/**
 * Schedules work after the current touch / frame (replaces deprecated
 * `InteractionManager.runAfterInteractions`). Prefer `requestIdleCallback` when available (RN guidance).
 */
function scheduleAfterOutsideDismiss(callback: () => void): void {
	const g = globalThis as typeof globalThis & {
		requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
	};
	if (typeof g.requestIdleCallback === "function") {
		g.requestIdleCallback(() => callback(), {
			timeout: IDLE_CALLBACK_TIMEOUT_MS,
		});
		return;
	}
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			setTimeout(callback, RAF_FALLBACK_DISMISS_MS);
		});
	});
}

function blurInputForBackdrop(textInputRef: {
	readonly current: React.ElementRef<typeof TextInput> | null;
}): void {
	const host = textInputRef.current;
	if (host != null) {
		TextInput.State.blurTextInput(host);
	}
	TextInput.State.blurTextInput();
	Keyboard.dismiss();
}

export interface AutocompleteProps<T = string> {
	options: T[];
	value?: T | T[];
	defaultValue?: T | T[];
	multiple?: boolean;
	getOptionLabel?: (option: T) => string;
	renderOption?: (option: T, selected: boolean) => React.ReactNode;
	onChange?: (value: T | T[] | undefined) => void;
	inputValue?: string;
	onInputChange?: (value: string) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	/** Debounces option filtering (ms). Reduces work while typing; input stays immediate. Default 200. */
	filterDebounceMs?: number;
	/** Shown when the query is non-empty but `filteredOptions` is empty. */
	noResultsText?: string;
	/**
	 * When focused with an empty query, show up to this many options (slice of `options`).
	 * Keeps first paint cheap when `options` is large. Default 50.
	 */
	maxOptionsOnFocus?: number;
	/**
	 * Open the suggestion panel on focus (browse mode before typing). Default true.
	 */
	showOnFocus?: boolean;
	/**
	 * When true, the suggestion panel shows a loading state instead of options (e.g. async fetch).
	 * You can still type; pair with `onInputChange` / controlled `options` when data arrives.
	 */
	loading?: boolean;
	/** Message next to the spinner when `loading` is true. Default "Loading…". */
	loadingText?: string;
	/**
	 * Where the suggestion panel is rendered. `modal` uses a native `Modal` so the panel stays above
	 * other scroll content. `inline` keeps it in the component tree (raises z-index on the root while open).
	 * Default comes from theme `autocomplete.overlay.layer`.
	 */
	dropdownLayer?: "modal" | "inline";
	/**
	 * Open/close motion for the panel (fade + slide). Defaults from theme `autocomplete.motion`.
	 */
	dropdownMotion?: {
		slideOffsetPx?: number;
		openDurationMs?: number;
		closeDurationMs?: number;
	};
	/**
	 * When `dropdownLayer` is `modal`, a transparent backdrop sits behind the panel; tapping it closes
	 * the dropdown. Default true. No effect when `dropdownLayer` is `inline` (use `dropdownLayer="modal"` for outside dismiss).
	 */
	closeOnBackdropPress?: boolean;
	/**
	 * When closing via modal backdrop or Android back on the modal, call `Keyboard.dismiss()` so the
	 * input loses focus and the keyboard hides. Default true. No effect for `dropdownLayer="inline"`;
	 * for that case use parent `ScrollView` `keyboardDismissMode` if needed.
	 */
	blurInputOnBackdropPress?: boolean;
}

/**
 * Dropdown is `position: 'absolute'` in the field wrapper. Position uses `measureInWindow` on both the
 * root wrapper and the input wrapper so `top`/`left` match the same coordinate system as `absolute`
 * children (fixes misalignment where `onLayout` alone disagrees with window placement in `ScrollView`).
 * Vertical side (above/below) uses the same window measurement + safe area.
 *
 * Parent `ScrollView` should use `keyboardShouldPersistTaps="handled"`. Inner list is `ScrollView` (not `FlatList`)
 * to avoid nesting VirtualizedList warnings.
 */

export function Autocomplete<T = string>({
	options,
	value,
	defaultValue,
	multiple = false,
	getOptionLabel,
	renderOption,
	onChange,
	inputValue,
	onInputChange,
	placeholder = "Select...",
	label,
	disabled = false,
	filterDebounceMs = 200,
	noResultsText = "No results",
	maxOptionsOnFocus = 50,
	showOnFocus = true,
	loading = false,
	loadingText = "Loading…",
	dropdownLayer: dropdownLayerProp,
	dropdownMotion,
	closeOnBackdropPress = true,
	blurInputOnBackdropPress = true,
}: AutocompleteProps<T>) {
	const {
		components: { autocomplete },
		tokens,
	} = useTheme();
	const insets = useSafeAreaInsets();
	const { width: windowWidth, height: windowHeight } = useWindowDimensions();

	const layer: "modal" | "inline" =
		dropdownLayerProp ?? autocomplete.overlay?.layer ?? "modal";
	const slideOffsetPx =
		dropdownMotion?.slideOffsetPx ?? autocomplete.motion?.slideOffsetPx ?? 8;
	const openDurationMs =
		dropdownMotion?.openDurationMs ??
		autocomplete.motion?.openDurationMs ??
		200;
	const closeDurationMs =
		dropdownMotion?.closeDurationMs ??
		autocomplete.motion?.closeDurationMs ??
		140;
	const modalElevation = autocomplete.overlay?.modalElevation ?? 24;
	const inlineRootZIndex = autocomplete.overlay?.inlineRootZIndex ?? 50_000;
	const inlineRootElevation =
		autocomplete.overlay?.inlineRootElevation ?? 50_000;

	/** Stable id so each instance's Modal is distinct when multiple Autocompletes mount. */
	const autocompleteModalId = useId();

	const rootRef = useRef<View>(null);
	const inputWrapRef = useRef<View>(null);
	const fieldFocusedRef = useRef(false);
	const showAboveRef = useRef(false);
	const isOpenRef = useRef(false);
	/** Pending blur → delayed close (cancel on refocus). */
	const blurCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	/** Pending close() after exit animation (cancel if user refocuses before it runs). */
	const closeFinishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	/** True after we cancelled a scheduled close(); next openPanel should replay entrance animation. */
	const abortedCloseRef = useRef(false);
	/**
	 * After backdrop / hardware back dismiss, ignore focus-driven openPanel briefly so the same touch
	 * does not reopen the menu when RN delivers it to the input under the modal (tap-through refocus).
	 */
	const suppressFocusOpenUntilRef = useRef(0);
	/** True while closing from modal backdrop so `onBlur` does not schedule a duplicate `handleClose`. */
	const backdropClosingRef = useRef(false);
	const textInputRef = useRef<React.ElementRef<typeof TextInput>>(null);
	const [inputLayout, setInputLayout] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	/** Root X in window — needed to clamp horizontal position when `left` is relative to root. */
	const [rootWindowX, setRootWindowX] = useState(0);
	/** Panel position in window coordinates (for `dropdownLayer="modal"`). */
	const [menuInWindow, setMenuInWindow] = useState<{
		left: number;
		top: number;
		width: number;
	} | null>(null);
	const [showAbove, setShowAbove] = useState(false);
	const [dropdownMounted, setDropdownMounted] = useState(false);

	const opacity = useSharedValue(0);
	const translateY = useSharedValue(0);

	const {
		inputValue: query,
		setInputValue,
		isOpen,
		open,
		close,
		isSelected,
		selectOption,
		filteredOptions,
		clear,
	} = useAutocomplete({
		options,
		value,
		defaultValue,
		multiple,
		getOptionLabel,
		onChange,
		inputValue,
		onInputChange,
		filterDebounceMs,
	});

	const labelOf = useMemo(
		() => getOptionLabel ?? ((o: T) => String(o)),
		[getOptionLabel],
	);
	const DROPDOWN_MAX_HEIGHT = autocomplete.menu.maxHeight;
	const GAP = tokens.spacing[1];

	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);

	const cancelPendingClose = useCallback(() => {
		if (blurCloseTimerRef.current) {
			clearTimeout(blurCloseTimerRef.current);
			blurCloseTimerRef.current = null;
		}
		if (closeFinishTimerRef.current) {
			clearTimeout(closeFinishTimerRef.current);
			closeFinishTimerRef.current = null;
			abortedCloseRef.current = true;
		}
	}, []);

	/**
	 * Measure input window rect first and commit modal position immediately (single source for Modal).
	 * Then measure root for inline-relative layout. Avoids stale menuInWindow when input/root async
	 * callbacks interleave across instances or frames.
	 */
	const withWindowMeasure = useCallback(
		(after: (nextShowAbove: boolean) => void) => {
			const root = rootRef.current;
			const input = inputWrapRef.current;
			if (!input) {
				return;
			}
			input.measureInWindow((ix, iy, iw, ih) => {
				const safeBottom = windowHeight - insets.bottom;
				const safeTop = insets.top;
				const spaceBelow = safeBottom - (iy + ih);
				const spaceAbove = iy - safeTop;
				const need = DROPDOWN_MAX_HEIGHT + GAP;
				let nextShowAbove: boolean;
				if (spaceBelow >= need) {
					nextShowAbove = false;
				} else if (spaceAbove >= need) {
					nextShowAbove = true;
				} else {
					nextShowAbove = spaceAbove > spaceBelow;
				}
				setShowAbove(nextShowAbove);
				showAboveRef.current = nextShowAbove;

				const leftWin = Math.max(
					HORIZONTAL_PAD,
					Math.min(ix, windowWidth - iw - HORIZONTAL_PAD),
				);
				const topWin = nextShowAbove
					? Math.max(
							insets.top + HORIZONTAL_PAD,
							iy - GAP - DROPDOWN_MAX_HEIGHT,
						)
					: iy + ih + GAP;

				setMenuInWindow({ left: leftWin, top: topWin, width: iw });

				if (!root) {
					after(nextShowAbove);
					return;
				}
				root.measureInWindow((rx, ry, _rw, _rh) => {
					setRootWindowX(rx);
					setInputLayout({
						x: ix - rx,
						y: iy - ry,
						width: iw,
						height: ih,
					});
					after(nextShowAbove);
				});
			});
		},
		[
			DROPDOWN_MAX_HEIGHT,
			GAP,
			insets.top,
			insets.bottom,
			windowHeight,
			windowWidth,
		],
	);

	const updatePlacement = useCallback(() => {
		withWindowMeasure(() => {});
	}, [withWindowMeasure]);

	const schedulePlacementUpdate = useCallback(() => {
		requestAnimationFrame(() => {
			updatePlacement();
		});
	}, [updatePlacement]);

	/** Keep menu inside horizontal safe bounds (narrow screens / inset fields). */
	const dropdownHorizontal = useMemo(() => {
		const w = inputLayout.width;
		if (w <= 0) {
			return { left: 0, width: 0 };
		}
		const leftInWindow = rootWindowX + inputLayout.x;
		const clampedLeftInWindow = Math.max(
			HORIZONTAL_PAD,
			Math.min(leftInWindow, windowWidth - w - HORIZONTAL_PAD),
		);
		const left = clampedLeftInWindow - rootWindowX;
		return { left, width: w };
	}, [inputLayout.x, inputLayout.width, rootWindowX, windowWidth]);

	/** Browse list when focused but query empty — capped for performance. */
	const displayOptions = useMemo(() => {
		if (query.trim().length > 0) {
			return filteredOptions;
		}
		return options.slice(0, maxOptionsOnFocus);
	}, [query, filteredOptions, options, maxOptionsOnFocus]);

	const runOpenAnimation = useCallback(
		(nextShowAbove: boolean) => {
			const enter = nextShowAbove ? -slideOffsetPx : slideOffsetPx;
			opacity.value = 0;
			translateY.value = enter;
			requestAnimationFrame(() => {
				opacity.value = withTiming(1, {
					duration: openDurationMs,
					easing: Easing.out(Easing.cubic),
				});
				translateY.value = withTiming(0, {
					duration: openDurationMs,
					easing: Easing.out(Easing.cubic),
				});
			});
		},
		[opacity, translateY, slideOffsetPx, openDurationMs],
	);

	const handleClose = useCallback(() => {
		if (closeFinishTimerRef.current) {
			clearTimeout(closeFinishTimerRef.current);
		}
		const exitOffset = showAboveRef.current ? -slideOffsetPx : slideOffsetPx;
		opacity.value = withTiming(0, { duration: closeDurationMs });
		translateY.value = withTiming(exitOffset, { duration: closeDurationMs });
		closeFinishTimerRef.current = setTimeout(() => {
			closeFinishTimerRef.current = null;
			close();
			setDropdownMounted(false);
			isOpenRef.current = false;
		}, closeDurationMs + 20);
	}, [close, opacity, translateY, slideOffsetPx, closeDurationMs]);

	/** Backdrop / hardware back: blur input, drop keyboard, then close after interactions to avoid tap-through refocus reopening the panel. */
	const handleBackdropPress = useCallback(() => {
		if (blurCloseTimerRef.current) {
			clearTimeout(blurCloseTimerRef.current);
			blurCloseTimerRef.current = null;
		}
		fieldFocusedRef.current = false;
		backdropClosingRef.current = true;
		if (blurInputOnBackdropPress) {
			blurInputForBackdrop(textInputRef);
		}
		suppressFocusOpenUntilRef.current = Date.now() + SUPPRESS_FOCUS_OPEN_MS;
		scheduleAfterOutsideDismiss(() => {
			backdropClosingRef.current = false;
			handleClose();
		});
	}, [blurInputOnBackdropPress, handleClose]);

	const openPanel = useCallback(() => {
		cancelPendingClose();
		/** Snapshot disclosure state; `isOpenRef` can lag `isOpen` across renders / async measure. */
		const disclosureWasClosed = !isOpen;
		withWindowMeasure((nextShowAbove) => {
			open();
			isOpenRef.current = true;
			setDropdownMounted(true);
			if (abortedCloseRef.current) {
				abortedCloseRef.current = false;
				runOpenAnimation(nextShowAbove);
			} else if (disclosureWasClosed) {
				runOpenAnimation(nextShowAbove);
			}
		});
	}, [isOpen, withWindowMeasure, open, runOpenAnimation, cancelPendingClose]);

	const handleChangeText = useCallback(
		(val: string) => {
			setInputValue(val);
			const trimmed = val.trim();
			if (trimmed.length === 0) {
				if (
					fieldFocusedRef.current &&
					showOnFocus &&
					(options.length > 0 || loading)
				) {
					openPanel();
				} else {
					handleClose();
				}
				return;
			}
			openPanel();
		},
		[
			setInputValue,
			showOnFocus,
			options.length,
			loading,
			openPanel,
			handleClose,
		],
	);

	const handleFocus = useCallback(() => {
		backdropClosingRef.current = false;
		fieldFocusedRef.current = true;
		cancelPendingClose();
		if (Date.now() < suppressFocusOpenUntilRef.current) {
			return;
		}
		if (!showOnFocus) {
			return;
		}
		if (options.length === 0 && !loading) {
			return;
		}
		openPanel();
	}, [showOnFocus, options.length, loading, openPanel, cancelPendingClose]);

	const handleBlur = useCallback(() => {
		fieldFocusedRef.current = false;
		if (backdropClosingRef.current) {
			return;
		}
		if (Date.now() < suppressFocusOpenUntilRef.current) {
			return;
		}
		if (blurCloseTimerRef.current) {
			clearTimeout(blurCloseTimerRef.current);
		}
		blurCloseTimerRef.current = setTimeout(() => {
			blurCloseTimerRef.current = null;
			handleClose();
		}, BLUR_CLOSE_DELAY_MS);
	}, [handleClose]);

	const dropdownAnimStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: translateY.value }],
	}));

	const hasQuery = query.trim().length > 0;

	const showSuggestionsPanel = useMemo(
		() =>
			dropdownMounted &&
			isOpen &&
			(hasQuery ||
				(!hasQuery && options.length > 0 && showOnFocus) ||
				(loading && showOnFocus)),
		[dropdownMounted, isOpen, hasQuery, options.length, showOnFocus, loading],
	);

	const dropdownTop = useMemo(
		() =>
			showAbove
				? Math.max(0, inputLayout.y - GAP - DROPDOWN_MAX_HEIGHT)
				: inputLayout.y + inputLayout.height + GAP,
		[showAbove, inputLayout.y, inputLayout.height, GAP, DROPDOWN_MAX_HEIGHT],
	);

	useEffect(() => {
		if (!showSuggestionsPanel) {
			setMenuInWindow(null);
		}
	}, [showSuggestionsPanel]);

	useEffect(() => {
		const onKeyboardFrame = () => {
			if (!fieldFocusedRef.current || !isOpenRef.current) return;
			schedulePlacementUpdate();
		};
		const showEvt =
			Platform.OS === "ios" ? "keyboardWillChangeFrame" : "keyboardDidShow";
		const hideEvt =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
		const subShow = Keyboard.addListener(showEvt, onKeyboardFrame);
		const subHide = Keyboard.addListener(hideEvt, onKeyboardFrame);
		return () => {
			subShow.remove();
			subHide.remove();
		};
	}, [schedulePlacementUpdate]);

	useLayoutEffect(() => {
		if (!showSuggestionsPanel) {
			return;
		}
		let cancelled = false;
		let raf1 = 0;
		let raf2 = 0;
		raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => {
				if (!cancelled) {
					updatePlacement();
				}
			});
		});
		return () => {
			cancelled = true;
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
		};
	}, [showSuggestionsPanel, updatePlacement]);

	useEffect(() => {
		if (!showSuggestionsPanel) {
			return;
		}
		void displayOptions;
		void loading;
		schedulePlacementUpdate();
	}, [displayOptions, loading, showSuggestionsPanel, schedulePlacementUpdate]);

	const clearPress = useCallback(() => {
		clear();
		handleClose();
	}, [clear, handleClose]);

	const showEmptyHint = hasQuery && !loading && displayOptions.length === 0;

	const trailingLoadingOrClear = useMemo(() => {
		if (disabled || (!loading && query.length === 0)) {
			return undefined;
		}
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: tokens.spacing[2],
				}}
			>
				{loading ? (
					<ActivityIndicator
						accessibilityLabel={loadingText}
						size="small"
						color={tokens.color.brand.default}
					/>
				) : null}
				{query.length > 0 ? (
					<Pressable
						accessibilityRole="button"
						accessibilityLabel="Clear search"
						hitSlop={12}
						onPress={clearPress}
					>
						<Icon name="close" size="sm" color={tokens.color.text.secondary} />
					</Pressable>
				) : null}
			</View>
		);
	}, [
		disabled,
		loading,
		query.length,
		clearPress,
		loadingText,
		tokens.color.brand.default,
		tokens.color.text.secondary,
		tokens.spacing[2],
	]);

	const menuBaseStyle = useMemo(
		() => ({
			...autocomplete.menu,
			marginTop: undefined,
			maxHeight: DROPDOWN_MAX_HEIGHT,
		}),
		[autocomplete.menu, DROPDOWN_MAX_HEIGHT],
	);

	const canShowDropdown = useMemo(
		() =>
			showSuggestionsPanel &&
			(layer === "modal"
				? Boolean(menuInWindow && menuInWindow.width > 0)
				: inputLayout.width > 0),
		[showSuggestionsPanel, layer, menuInWindow, inputLayout.width],
	);

	const suggestionsBody = useMemo(
		() => (
			<View
				style={{
					maxHeight: DROPDOWN_MAX_HEIGHT,
					overflow: "hidden",
					borderRadius: autocomplete.menu.borderRadius,
				}}
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					nestedScrollEnabled
					style={{ maxHeight: DROPDOWN_MAX_HEIGHT }}
					showsVerticalScrollIndicator
				>
					{loading ? (
						<View
							style={{
								padding: autocomplete.item.padding,
								minHeight: 52,
								flexDirection: "row",
								alignItems: "center",
								gap: tokens.spacing[2],
							}}
							accessibilityRole="progressbar"
							accessibilityLabel={loadingText}
						>
							<ActivityIndicator
								size="small"
								color={tokens.color.brand.default}
							/>
							<Text
								style={{
									color: tokens.color.text.secondary,
									fontSize: tokens.typography.body2.fontSize,
								}}
							>
								{loadingText}
							</Text>
						</View>
					) : showEmptyHint ? (
						<View
							style={{
								padding: autocomplete.item.padding,
								minHeight: 44,
								justifyContent: "center",
							}}
						>
							<Text
								accessibilityRole="text"
								style={{
									color: tokens.color.text.secondary,
									fontSize: tokens.typography.body2.fontSize,
								}}
							>
								{noResultsText}
							</Text>
						</View>
					) : (
						displayOptions.map((option, idx) => {
							const selected = isSelected(option);
							return (
								<Pressable
									key={`${labelOf(option)}-${String(idx)}`}
									onPress={() => {
										if (selected && !multiple) {
											selectOption(undefined);
										} else {
											selectOption(option);
										}
										if (!multiple) handleClose();
									}}
									style={({ pressed }) => ({
										padding: autocomplete.item.padding,
										backgroundColor: pressed
											? autocomplete.item.hover.backgroundColor
											: selected
												? autocomplete.item.active.backgroundColor
												: "transparent",
									})}
								>
									{renderOption ? (
										renderOption(option, selected)
									) : (
										<Text
											style={{
												color: selected
													? tokens.color.brand.text
													: tokens.color.text.primary,
											}}
										>
											{labelOf(option)}
										</Text>
									)}
								</Pressable>
							);
						})
					)}
				</ScrollView>
			</View>
		),
		[
			DROPDOWN_MAX_HEIGHT,
			autocomplete.item.active.backgroundColor,
			autocomplete.item.hover.backgroundColor,
			autocomplete.item.padding,
			autocomplete.menu.borderRadius,
			displayOptions,
			handleClose,
			isSelected,
			labelOf,
			loading,
			loadingText,
			multiple,
			noResultsText,
			renderOption,
			selectOption,
			showEmptyHint,
			tokens.color.brand.default,
			tokens.color.brand.text,
			tokens.color.text.primary,
			tokens.color.text.secondary,
			tokens.spacing[2],
			tokens.typography.body2.fontSize,
		],
	);

	return (
		<>
			<View
				ref={rootRef}
				collapsable={false}
				style={[
					{
						position: "relative",
						width: "100%",
						overflow: "visible",
					},
					layer === "inline" && showSuggestionsPanel
						? {
								zIndex: inlineRootZIndex,
								elevation: inlineRootElevation,
							}
						: { zIndex: 1000, elevation: 4 },
				]}
				onLayout={schedulePlacementUpdate}
			>
				<View
					ref={inputWrapRef}
					collapsable={false}
					onLayout={schedulePlacementUpdate}
				>
					<Input
						ref={textInputRef}
						label={label}
						placeholder={placeholder}
						value={query}
						onChangeText={handleChangeText}
						onFocus={handleFocus}
						onBlur={handleBlur}
						disabled={disabled}
						trailingElement={trailingLoadingOrClear}
						autoCorrect={false}
						spellCheck={false}
						textContentType="none"
						autoComplete="off"
					/>
				</View>

				{layer === "inline" && canShowDropdown && (
					<View
						collapsable={false}
						pointerEvents="box-none"
						style={[
							{
								position: "absolute",
								left: dropdownHorizontal.left,
								width: dropdownHorizontal.width,
								top: dropdownTop,
								zIndex: 2000,
								elevation: 24,
							},
							menuBaseStyle,
						]}
					>
						<Animated.View style={dropdownAnimStyle}>
							{suggestionsBody}
						</Animated.View>
					</View>
				)}
			</View>

			{layer === "modal" && (
				<Modal
					key={autocompleteModalId}
					visible={canShowDropdown}
					transparent
					animationType="none"
					statusBarTranslucent
					onRequestClose={handleBackdropPress}
				>
					<View style={StyleSheet.absoluteFill} pointerEvents="box-none">
						{closeOnBackdropPress ? (
							<Pressable
								accessibilityRole="button"
								accessibilityLabel="Close suggestions"
								style={StyleSheet.absoluteFill}
								onPress={handleBackdropPress}
							/>
						) : null}
						{canShowDropdown && menuInWindow ? (
							<Animated.View
								pointerEvents="auto"
								style={[
									{
										position: "absolute",
										left: menuInWindow.left,
										top: menuInWindow.top,
										width: menuInWindow.width,
										maxHeight: DROPDOWN_MAX_HEIGHT,
										elevation: modalElevation,
									},
									menuBaseStyle,
									dropdownAnimStyle,
								]}
							>
								{suggestionsBody}
							</Animated.View>
						) : null}
					</View>
				</Modal>
			)}
		</>
	);
}
