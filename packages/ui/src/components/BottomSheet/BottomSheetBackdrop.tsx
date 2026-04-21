import { useTheme } from "@truongdq01/headless";
import { memo, useMemo } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import type { AnimatedStyle } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import type { BottomSheetBackdropProps } from "./types";

type BackdropLayerStyle = ViewStyle | AnimatedStyle;

/**
 * Semi-transparent animated overlay behind the sheet.
 * Tapping it triggers the tap gesture (dismissal).
 */
function BottomSheetBackdropInner({
	animatedStyle,
	tapGesture,
	accessibilityLabel = "Dismiss bottom sheet",
}: BottomSheetBackdropProps) {
	const {
		components: { bottomSheet },
	} = useTheme();

	const backdropLayerStyle = useMemo(
		(): BackdropLayerStyle[] => [
			StyleSheet.absoluteFill,
			bottomSheet.backdrop,
			animatedStyle,
		],
		[animatedStyle, bottomSheet.backdrop],
	);

	return (
		<GestureDetector gesture={tapGesture}>
			<View
				collapsable={false}
				style={StyleSheet.absoluteFill}
				accessibilityRole="button"
				accessibilityLabel={accessibilityLabel}
				accessibilityHint="Closes the bottom sheet"
			>
				<Animated.View style={backdropLayerStyle} />
			</View>
		</GestureDetector>
	);
}

export const BottomSheetBackdrop = memo(BottomSheetBackdropInner);
BottomSheetBackdrop.displayName = "BottomSheetBackdrop";
