import { useTheme } from "@truongdq01/headless";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
	ActivityIndicator,
	type StyleProp,
	StyleSheet,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Available progress indicator variants
 */
export type CircularProgressVariant = "indeterminate" | "determinate";

/**
 * Available progress indicator colors (semantic keys)
 */
export type CircularProgressColor =
	| "primary"
	| "secondary"
	| "success"
	| "error"
	| "info"
	| "warning"
	| "inherit";

/**
 * Props for the CircularProgress component
 */
export interface CircularProgressProps {
	size?: number | "sm" | "md" | "lg" | "small" | "medium" | "large";
	/** Semantic palette key or any CSS color string */
	color?: CircularProgressColor | string;
	thickness?: number;
	/** Ring width (preferred). Falls back to `thickness`. */
	strokeWidth?: number;
	/**
	 * Progress amount. Values **greater than 1** are treated as **0–100** (percent).
	 * Values **between 0 and 1 inclusive** are treated as **fractions** (e.g. `0.75` → 75%).
	 */
	value?: number;
	variant?: CircularProgressVariant;
	/** Same as `variant="indeterminate"` */
	indeterminate?: boolean;
	showLabel?: boolean;
	/** Alias for `showLabel` (center percentage) */
	showValue?: boolean;
	/** Custom center content; when set, overrides the default percentage label unless you compose both yourself. */
	children?: ReactNode;
	/** Format the built-in percentage label (when `showLabel` / `showValue` and no `children`). */
	formatValue?: (percent: number) => string;
	trackColor?: string;
	/** Default label text color (built-in label only). */
	labelColor?: string;
	labelStyle?: StyleProp<TextStyle>;
	/** Duration (ms) for the determinate arc when `value` changes. */
	animationDuration?: number;
	style?: StyleProp<ViewStyle>;
}

function clamp(value: number, min = 0, max = 100) {
	return Math.max(min, Math.min(max, value));
}

/** Fraction 0–1 or percent 0–100 (when value > 1). */
function toPercent(value: number): number {
	if (Number.isNaN(value)) return 0;
	if (value > 1) return clamp(value, 0, 100);
	return clamp(value * 100, 0, 100);
}

function sizeToThicknessKey(
	size: "sm" | "md" | "lg" | "small" | "medium" | "large",
): "sm" | "md" | "lg" {
	if (size === "sm" || size === "small") return "sm";
	if (size === "lg" || size === "large") return "lg";
	return "md";
}

type DeterminateRingProps = {
	resolvedSize: number;
	strokeW: number;
	cx: number;
	cy: number;
	r: number;
	circumference: number;
	progressPercent: number;
	resolvedIndicatorColor: string;
	resolvedTrackColor: string;
	animationDuration: number;
};

function DeterminateProgressRing({
	resolvedSize,
	strokeW,
	cx,
	cy,
	r,
	circumference,
	progressPercent,
	resolvedIndicatorColor,
	resolvedTrackColor,
	animationDuration,
}: DeterminateRingProps) {
	const targetOffset = circumference * (1 - progressPercent / 100);
	const dashOffset = useSharedValue(targetOffset);
	const prevCircumferenceRef = useRef(circumference);
	const didMountRef = useRef(false);

	// dashOffset is a stable Reanimated mutable ref; omitting avoids spurious reruns.
	// biome-ignore lint/correctness/useExhaustiveDependencies: shared value ref is stable
	useEffect(() => {
		const next = circumference * (1 - progressPercent / 100);

		if (prevCircumferenceRef.current !== circumference) {
			prevCircumferenceRef.current = circumference;
			dashOffset.value = next;
			didMountRef.current = true;
			return;
		}

		if (!didMountRef.current) {
			didMountRef.current = true;
			dashOffset.value = next;
			return;
		}

		dashOffset.value = withTiming(next, {
			duration: animationDuration,
			easing: Easing.bezier(0.4, 0, 0.2, 1),
		});
	}, [progressPercent, circumference, animationDuration]);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: dashOffset.value,
	}));

	const dashArray = Number(circumference.toFixed(3));

	return (
		<View
			style={[styles.svgRotate, { width: resolvedSize, height: resolvedSize }]}
			collapsable={false}
		>
			<Svg
				width={resolvedSize}
				height={resolvedSize}
				accessibilityElementsHidden
				importantForAccessibility="no-hide-descendants"
			>
				<Circle
					cx={cx}
					cy={cy}
					r={r}
					stroke={resolvedTrackColor}
					strokeWidth={strokeW}
					fill="none"
				/>
				<AnimatedCircle
					cx={cx}
					cy={cy}
					r={r}
					stroke={resolvedIndicatorColor}
					strokeWidth={strokeW}
					fill="none"
					strokeLinecap="round"
					strokeDasharray={dashArray}
					animatedProps={animatedProps}
				/>
			</Svg>
		</View>
	);
}

/**
 * Determinate circular ring (SVG) + indeterminate native spinner.
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} showLabel />
 * <CircularProgress value={0.42} showValue formatValue={(p) => `${Math.round(p)}%`} />
 * <CircularProgress value={60}><Text>Loading</Text></CircularProgress>
 * <CircularProgress indeterminate />
 * ```
 */
export function CircularProgress({
	size = "md",
	color = "primary",
	thickness,
	strokeWidth: strokeWidthProp,
	value = 0,
	variant = "determinate",
	indeterminate = false,
	showLabel = false,
	showValue = false,
	children,
	formatValue,
	trackColor: trackColorProp,
	labelColor,
	labelStyle,
	animationDuration = 380,
	style,
}: CircularProgressProps) {
	const {
		components: { circularProgress },
		tokens,
	} = useTheme();

	const sizeMap: Record<string, number> = {
		sm: circularProgress.size.sm,
		md: circularProgress.size.md,
		lg: circularProgress.size.lg,
		small: circularProgress.size.sm,
		medium: circularProgress.size.md,
		large: circularProgress.size.lg,
	};

	const resolvedSize =
		typeof size === "number" ? size : sizeMap[size] || circularProgress.size.md;

	const palette: Record<CircularProgressColor, string> = {
		primary: circularProgress.color,
		secondary: tokens.color.text.secondary,
		success: tokens.color.success.icon,
		error: tokens.color.error.icon,
		info: tokens.color.info.icon,
		warning: tokens.color.warning.icon,
		inherit: tokens.color.text.primary,
	};

	const resolveIndicatorColor = (): string => {
		if (color === undefined) return circularProgress.color;
		if (color in palette) return palette[color as CircularProgressColor];
		return color;
	};

	const resolvedIndicatorColor = resolveIndicatorColor();
	const resolvedTrackColor = trackColorProp ?? circularProgress.trackColor;

	const defaultStroke =
		typeof size === "number"
			? Math.max(2, Math.round(resolvedSize * 0.08))
			: circularProgress.thickness[sizeToThicknessKey(size)];

	const strokeW = strokeWidthProp ?? thickness ?? defaultStroke;

	const progressPercent = toPercent(value);
	const showBuiltinPercent = (showLabel || showValue) && children == null;
	const hasCenterOverlay = children != null || showBuiltinPercent;

	const isIndeterminate = indeterminate === true || variant === "indeterminate";

	const labelFontSize = Math.min(
		22,
		Math.max(10, Math.round(resolvedSize * 0.2)),
	);
	const defaultLabelColor = labelColor ?? tokens.color.text.primary;

	if (isIndeterminate) {
		const scale = resolvedSize / 40;
		return (
			<View
				style={[
					styles.container,
					styles.rootSized,
					{ width: resolvedSize, height: resolvedSize },
					style,
				]}
				accessibilityRole="progressbar"
				accessibilityState={{ busy: true }}
			>
				<ActivityIndicator
					color={resolvedIndicatorColor}
					animating
					style={{ transform: [{ scale }] }}
				/>
				{hasCenterOverlay && (
					<View style={styles.centerOverlay} pointerEvents="none">
						{children ??
							(showBuiltinPercent ? (
								<Text
									style={[
										{
											fontSize: labelFontSize,
											fontWeight: "600",
											color: defaultLabelColor,
										},
										labelStyle,
									]}
								>
									{formatValue
										? formatValue(progressPercent)
										: `${Math.round(progressPercent)}%`}
								</Text>
							) : null)}
					</View>
				)}
			</View>
		);
	}

	const r = Math.max(0, (resolvedSize - strokeW) / 2);
	const cx = resolvedSize / 2;
	const cy = resolvedSize / 2;
	const circumference = 2 * Math.PI * r;

	return (
		<View
			style={[
				styles.container,
				styles.rootSized,
				{ width: resolvedSize, height: resolvedSize },
				style,
			]}
			accessibilityRole="progressbar"
			accessibilityValue={{
				min: 0,
				max: 100,
				now: Math.round(progressPercent),
			}}
		>
			<DeterminateProgressRing
				resolvedSize={resolvedSize}
				strokeW={strokeW}
				cx={cx}
				cy={cy}
				r={r}
				circumference={circumference}
				progressPercent={progressPercent}
				resolvedIndicatorColor={resolvedIndicatorColor}
				resolvedTrackColor={resolvedTrackColor}
				animationDuration={animationDuration}
			/>
			{hasCenterOverlay && (
				<View style={styles.centerOverlay} pointerEvents="none">
					{children ??
						(showBuiltinPercent ? (
							<Text
								style={[
									{
										fontSize: labelFontSize,
										fontWeight: "600",
										color: defaultLabelColor,
										textAlign: "center",
									},
									labelStyle,
								]}
							>
								{formatValue
									? formatValue(progressPercent)
									: `${Math.round(progressPercent)}%`}
							</Text>
						) : null)}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	/** Fixed box so absolute center + Svg share the same bounds */
	rootSized: {
		position: "relative",
		overflow: "visible",
	},
	/** Start the arc at 12 o'clock (SVG circles begin at 3 o'clock). */
	svgRotate: {
		transform: [{ rotate: "-90deg" }],
	},
	centerOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 2,
		elevation: 4,
	},
});
