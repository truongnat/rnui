import { useTheme } from "@truongdq01/headless";
import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ModalContentProps } from "./types";

function isPlainText(value: React.ReactNode): value is string | number {
	return typeof value === "string" || typeof value === "number";
}

/**
 * Rounded container with padding token that wraps modal children.
 * Handles full-screen override and passes the accessibility modal flag.
 */
export function ModalContent({
	children,
	style,
	fullScreen = false,
	accessibilityLabel = "Modal",
}: ModalContentProps) {
	const {
		components: { modal },
		tokens,
	} = useTheme();

	const body =
		children != null && isPlainText(children) ? (
			<Text
				style={{
					fontSize: tokens.fontSize.md,
					color: tokens.color.text.primary,
				}}
			>
				{children}
			</Text>
		) : (
			children
		);

	return (
		<View
			accessibilityViewIsModal
			accessibilityRole="none"
			accessibilityLabel={accessibilityLabel}
			style={[
				styles.content,
				modal.container,
				fullScreen && styles.fullScreen,
				style,
			]}
		>
			{body}
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		minWidth: 280,
		maxWidth: "90%",
	},
	fullScreen: {
		width: "100%",
		height: "100%",
		maxWidth: "100%",
		minWidth: "100%",
		borderRadius: 0,
	},
});
