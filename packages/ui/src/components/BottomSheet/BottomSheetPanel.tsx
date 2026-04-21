import type { UseBottomSheetReturn } from "@truongdq01/headless";
import type React from "react";
import { memo, useMemo } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import type { GestureType } from "react-native-gesture-handler";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { BottomSheetHandle } from "./BottomSheetHandle";

export type BottomSheetPanelProps = {
	windowHeight: number;
	paddingBottom: number;
	borderRadius: number | undefined;
	/** Theme `bottomSheet.container` */
	containerStyle: ViewStyle;
	sheetAnimatedStyle: UseBottomSheetReturn["sheetAnimatedStyle"];
	panGesture: GestureType;
	showHandle: boolean;
	accessibilityLabel: string;
	children: React.ReactNode;
};

function BottomSheetPanelInner({
	windowHeight,
	paddingBottom,
	borderRadius,
	containerStyle,
	sheetAnimatedStyle,
	panGesture,
	showHandle,
	accessibilityLabel,
	children,
}: BottomSheetPanelProps) {
	const sheetStyle = useMemo(
		(): (ViewStyle | UseBottomSheetReturn["sheetAnimatedStyle"])[] => [
			styles.sheet,
			containerStyle,
			{
				height: windowHeight,
				borderTopLeftRadius: borderRadius ?? containerStyle.borderTopLeftRadius,
				borderTopRightRadius:
					borderRadius ?? containerStyle.borderTopRightRadius,
				paddingBottom,
			},
			sheetAnimatedStyle,
		],
		[
			borderRadius,
			containerStyle,
			paddingBottom,
			sheetAnimatedStyle,
			windowHeight,
		],
	);

	return (
		<Animated.View
			accessibilityViewIsModal
			accessibilityRole="none"
			accessibilityLabel={accessibilityLabel}
			style={sheetStyle}
		>
			<GestureDetector gesture={panGesture}>
				<View collapsable={false}>
					<BottomSheetHandle visible={showHandle} />
				</View>
			</GestureDetector>

			<View style={styles.children}>{children}</View>
		</Animated.View>
	);
}

export const BottomSheetPanel = memo(BottomSheetPanelInner);
BottomSheetPanel.displayName = "BottomSheetPanel";

const styles = StyleSheet.create({
	sheet: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
	children: {
		flex: 1,
	},
});
