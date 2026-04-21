import { useTheme } from "@truongdq01/headless";
import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import type { BottomSheetHandleProps } from "./types";

/**
 * Pill-shaped drag indicator rendered at the top of the sheet.
 * Receives the full pan gesture via the parent GestureDetector wrapper.
 */
function BottomSheetHandleInner({ visible }: BottomSheetHandleProps) {
	const {
		components: { bottomSheet },
	} = useTheme();

	const handleStyle = useMemo(
		() => [styles.handle, bottomSheet.handle],
		[bottomSheet.handle],
	);

	return (
		<View
			collapsable={false}
			style={styles.handleArea}
			accessibilityRole="adjustable"
			accessibilityLabel="Drag handle"
			accessibilityHint="Swipe up or down to resize the bottom sheet"
		>
			{visible && <View style={handleStyle} />}
		</View>
	);
}

export const BottomSheetHandle = memo(BottomSheetHandleInner);
BottomSheetHandle.displayName = "BottomSheetHandle";

const styles = StyleSheet.create({
	handleArea: {
		width: "100%",
		height: 28,
		alignItems: "center",
		justifyContent: "center",
	},
	handle: {
		width: 36,
		height: 4,
		borderRadius: 2,
	},
});
