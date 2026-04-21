import { useTheme } from "@truongdq01/headless";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

export interface MarqueeProps {
	/** Content to scroll */
	children: React.ReactNode;
	/** Speed of animation (pixels per second) */
	speed?: number;
	/** Direction of scroll */
	direction?: "left" | "right" | "up" | "down";
	/** Whether to pause on hover/press (for web compatibility) */
	pauseOnHover?: boolean;
	/** Whether to pause on press */
	pauseOnPress?: boolean;
	/** Whether to repeat infinitely */
	loop?: boolean;
	/** Delay before starting animation */
	delay?: number;
	/** Gradient fade edges */
	fadeEdges?: boolean;
	/** Custom gradient colors for fade */
	fadeColor?: string;
	/** Accessibility label */
	accessibilityLabel?: string;
	/** Test ID for testing */
	testID?: string;
}

/**
 * Marquee component for scrolling text or content horizontally/vertically.
 * Uses React Native Reanimated for smooth GPU-accelerated animations.
 */
export function Marquee({
	children,
	speed = 50,
	direction = "left",
	pauseOnHover: _pauseOnHover = false,
	pauseOnPress = false,
	loop = true,
	delay = 0,
	fadeEdges = true,
	fadeColor,
	accessibilityLabel = "Scrolling content",
	testID = "marquee",
}: MarqueeProps) {
	const { tokens } = useTheme();

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const containerSize = useRef({ width: 0, height: 0 });
	const contentSize = useRef({ width: 0, height: 0 });
	const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const animatedStyle = useAnimatedStyle(() => {
		if (direction === "left" || direction === "right") {
			return {
				transform: [{ translateX: translateX.value }],
			};
		} else {
			return {
				transform: [{ translateY: translateY.value }],
			};
		}
	});

	const startAnimation = useCallback(
		(containerExtent: number, contentExtent: number) => {
			if (contentExtent <= containerExtent) return;

			if (delayTimerRef.current != null) {
				clearTimeout(delayTimerRef.current);
				delayTimerRef.current = null;
			}

			const distance = contentExtent - containerExtent;
			const duration = (distance / speed) * 1000;

			// "left" / "up": scroll toward negative translation; "right" / "down": opposite
			const isForward = direction === "left" || direction === "up";
			const startValue = isForward ? 0 : -distance;
			const endValue = isForward ? -distance : 0;

			const animation = withTiming(endValue, {
				duration,
				easing: Easing.linear,
			});

			const repeatedAnimation = loop
				? withRepeat(
						withSequence(
							withTiming(endValue, { duration, easing: Easing.linear }),
							withTiming(startValue, { duration: 0 }),
						),
						-1,
						false,
					)
				: animation;

			const run = () => {
				if (direction === "left" || direction === "right") {
					translateX.value = startValue;
					translateX.value = repeatedAnimation;
				} else {
					translateY.value = startValue;
					translateY.value = repeatedAnimation;
				}
			};

			if (delay > 0) {
				if (direction === "left" || direction === "right") {
					translateX.value = startValue;
				} else {
					translateY.value = startValue;
				}
				delayTimerRef.current = setTimeout(() => {
					delayTimerRef.current = null;
					run();
				}, delay);
			} else {
				run();
			}
		},
		[delay, direction, loop, speed, translateX, translateY],
	);

	const tryStart = useCallback(() => {
		const { width: cw, height: ch } = containerSize.current;
		const { width: contentW, height: contentH } = contentSize.current;

		if (direction === "left" || direction === "right") {
			if (cw > 0 && contentW > 0) startAnimation(cw, contentW);
		} else if (ch > 0 && contentH > 0) {
			startAnimation(ch, contentH);
		}
	}, [direction, startAnimation]);

	const onContainerLayout = useCallback(
		(e: LayoutChangeEvent) => {
			const { width, height } = e.nativeEvent.layout;
			containerSize.current = { width, height };
			tryStart();
		},
		[tryStart],
	);

	const onContentLayout = useCallback(
		(e: LayoutChangeEvent) => {
			const { width, height } = e.nativeEvent.layout;
			contentSize.current = { width, height };
			tryStart();
		},
		[tryStart],
	);

	const pauseAnimation = () => {
		cancelAnimation(translateX);
		cancelAnimation(translateY);
	};

	const resumeAnimation = () => {
		tryStart();
	};

	useEffect(() => {
		cancelAnimation(translateX);
		cancelAnimation(translateY);
		tryStart();
		return () => {
			if (delayTimerRef.current != null) {
				clearTimeout(delayTimerRef.current);
				delayTimerRef.current = null;
			}
			cancelAnimation(translateX);
			cancelAnimation(translateY);
		};
	}, [tryStart, translateX, translateY]);

	const handlePressIn = () => {
		if (pauseOnPress) {
			pauseAnimation();
		}
	};

	const handlePressOut = () => {
		if (pauseOnPress) {
			resumeAnimation();
		}
	};

	const fadeGradient = fadeColor || tokens.color.surface.default;

	return (
		<View
			style={styles.container}
			accessibilityLabel={accessibilityLabel}
			accessibilityRole="text"
			testID={testID}
			onLayout={onContainerLayout}
		>
			{fadeEdges && (
				<>
					<View
						style={[
							styles.fadeLeft,
							{ backgroundColor: fadeGradient },
							direction === "up" || direction === "down"
								? styles.fadeTop
								: undefined,
						]}
					/>
					<View
						style={[
							styles.fadeRight,
							{ backgroundColor: fadeGradient },
							direction === "up" || direction === "down"
								? styles.fadeBottom
								: undefined,
						]}
					/>
				</>
			)}
			<Animated.View
				collapsable={false}
				style={[
					animatedStyle,
					direction === "up" || direction === "down"
						? styles.vertical
						: styles.horizontal,
				]}
				onLayout={onContentLayout}
				onTouchStart={handlePressIn}
				onTouchEnd={handlePressOut}
				accessible={false} // Let parent handle accessibility
			>
				{children}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		position: "relative",
		alignSelf: "stretch",
		minWidth: 0,
	},
	horizontal: {
		flexDirection: "row",
		alignSelf: "flex-start",
	},
	vertical: {
		flexDirection: "column",
		alignSelf: "flex-start",
	},
	fadeLeft: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: 20,
		zIndex: 1,
	},
	fadeRight: {
		position: "absolute",
		right: 0,
		top: 0,
		bottom: 0,
		width: 20,
		zIndex: 1,
	},
	fadeTop: {
		left: 0,
		right: 0,
		top: 0,
		height: 20,
		width: undefined,
	},
	fadeBottom: {
		left: 0,
		right: 0,
		bottom: 0,
		height: 20,
		width: undefined,
	},
});
