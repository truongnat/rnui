import { useTheme } from "@truongdq01/headless";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

// ─── Types ────────────────────────────────────────────────────────

export interface ContextMenuItem {
	id: string;
	label: string;
	icon?: React.ReactNode;
	onPress?: () => void;
	destructive?: boolean;
	disabled?: boolean;
}

export interface ContextMenuProps {
	open: boolean;
	onClose: () => void;
	items: ContextMenuItem[];
	anchor?: { x: number; y: number; width: number; height: number } | null;
}

const GAP = 8;
const EDGE = 16;
/** Slide distance (px); menu opens with a short vertical slide + fade — no spring bounce. */
const SLIDE = 12;
const DURATION_IN = 220;
const DURATION_OUT = 160;

// ─── Context Menu ─────────────────────────────────────────────────

export function ContextMenu({
	open,
	onClose,
	items,
	anchor,
}: ContextMenuProps) {
	const { tokens } = useTheme();
	const { width: windowWidth, height: windowHeight } = useWindowDimensions();
	const [mounted, setMounted] = useState(open);
	const [menuSize, setMenuSize] = useState({ width: 200, height: 0 });

	const opacity = useSharedValue(0);
	const translateY = useSharedValue(0);

	const layout = useMemo(() => {
		let top = 100;
		let left = windowWidth - 220;
		let placement: "below" | "above" = "below";

		if (anchor) {
			left = anchor.x;
			const belowTop = anchor.y + anchor.height + GAP;
			top = belowTop;

			if (left + menuSize.width > windowWidth - EDGE) {
				left = windowWidth - menuSize.width - EDGE;
			}
			if (
				menuSize.height > 0 &&
				belowTop + menuSize.height > windowHeight - EDGE
			) {
				top = anchor.y - menuSize.height - GAP;
				placement = "above";
			}
			top = Math.max(EDGE, top);
			left = Math.max(EDGE, left);
		}

		return {
			top: Number.isFinite(top) ? top : EDGE,
			left: Number.isFinite(left) ? left : EDGE,
			placement,
		};
	}, [anchor, menuSize.height, menuSize.width, windowHeight, windowWidth]);

	const placementRef = useRef(layout.placement);
	placementRef.current = layout.placement;

	const openRisingEdge = useRef(false);
	// Reanimated shared values (opacity, translateY) are stable refs; listing them would re-run every render.
	// biome-ignore lint/correctness/useExhaustiveDependencies: shared values intentionally omitted
	useEffect(() => {
		if (!open) {
			openRisingEdge.current = false;
			return;
		}
		if (openRisingEdge.current) {
			return;
		}
		openRisingEdge.current = true;
		setMounted(true);
		const from = placementRef.current === "below" ? SLIDE : -SLIDE;
		translateY.value = from;
		opacity.value = 0;
		requestAnimationFrame(() => {
			translateY.value = withTiming(0, { duration: DURATION_IN });
			opacity.value = withTiming(1, { duration: DURATION_IN });
		});
	}, [open]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: shared values intentionally omitted
	useEffect(() => {
		if (open || !mounted) {
			return;
		}
		const to = placementRef.current === "below" ? SLIDE : -SLIDE;
		translateY.value = withTiming(to, { duration: DURATION_OUT });
		opacity.value = withTiming(0, { duration: DURATION_OUT }, (finished) => {
			"worklet";
			if (finished) {
				runOnJS(setMounted)(false);
			}
		});
	}, [open, mounted]);

	const animStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: translateY.value }],
	}));

	if (!mounted) {
		return null;
	}

	return (
		<Modal
			visible={mounted}
			transparent
			animationType="none"
			onRequestClose={onClose}
		>
			{/*
        Single root inside Modal: multiple direct children crash on some Android / RN builds.
      */}
			<View style={styles.modalRoot}>
				<Pressable style={styles.overlay} onPress={onClose} />
				<Animated.View
					onLayout={(e) => {
						setMenuSize({
							width: e.nativeEvent.layout.width,
							height: e.nativeEvent.layout.height,
						});
					}}
					style={[
						styles.menu,
						animStyle,
						{
							position: "absolute",
							top: layout.top,
							left: layout.left,
							backgroundColor: tokens.color.surface.default,
							borderRadius: 14,
							shadowColor: tokens.color.bg.inverse,
							shadowOffset: { width: 0, height: 6 },
							shadowOpacity: 0.2,
							shadowRadius: 18,
							elevation: 8,
						},
					]}
				>
					{items.map((item, index) => (
						<Pressable
							key={item.id}
							onPress={() => {
								item.onPress?.();
								onClose();
							}}
							disabled={item.disabled}
							style={({ pressed }) => [
								styles.item,
								index === 0 && {
									borderTopLeftRadius: 14,
									borderTopRightRadius: 14,
								},
								index === items.length - 1 && {
									borderBottomLeftRadius: 14,
									borderBottomRightRadius: 14,
								},
								pressed && { backgroundColor: tokens.color.surface.hover },
								item.disabled && { opacity: 0.3 },
							]}
						>
							{item.icon && <View style={styles.itemIcon}>{item.icon}</View>}
							<Text
								style={[
									styles.itemLabel,
									{
										color: item.destructive
											? tokens.color.error.text
											: tokens.color.text.primary,
									},
								]}
							>
								{item.label}
							</Text>
						</Pressable>
					))}
				</Animated.View>
			</View>
		</Modal>
	);
}

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
	modalRoot: {
		flex: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.1)",
	},
	menu: {
		minWidth: 180,
		overflow: "hidden",
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		minHeight: 48,
	},
	itemIcon: {
		marginRight: 12,
		width: 20,
		alignItems: "center",
	},
	itemLabel: {
		fontSize: 15,
		fontWeight: "500",
		lineHeight: 20,
	},
});
