import { StyleSheet, View } from "react-native";
import type { BottomSheetContentProps } from "./types";

/**
 * Content area wrapper for the BottomSheet.
 * Fills the remaining space below the drag handle.
 * Safe-area bottom inset is applied by the sheet container itself.
 */
export function BottomSheetContent({ children }: BottomSheetContentProps) {
	return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
});
