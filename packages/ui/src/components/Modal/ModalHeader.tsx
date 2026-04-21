import { useTheme } from "@truongdq01/headless";
import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ModalHeaderProps } from "./types";

function isPlainText(value: React.ReactNode): value is string | number {
	return typeof value === "string" || typeof value === "number";
}

/**
 * Layout helper that renders a title + optional trailing slot (e.g. close button)
 * at the top of a modal. Can also accept arbitrary children.
 */
export function ModalHeader({ title, trailing, children }: ModalHeaderProps) {
	const { tokens } = useTheme();

	if (children) {
		return <View style={styles.container}>{children}</View>;
	}

	return (
		<View style={styles.container}>
			<View style={styles.title}>
				{title != null &&
					(isPlainText(title) ? (
						<Text
							style={[
								styles.titleText,
								{
									fontSize: tokens.fontSize.lg,
									fontWeight: tokens.fontWeight.semibold,
									color: tokens.color.text.primary,
								},
							]}
							numberOfLines={3}
						>
							{title}
						</Text>
					) : (
						title
					))}
			</View>
			{trailing != null && <View>{trailing}</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
	},
	title: {
		flex: 1,
		minWidth: 0,
	},
	titleText: {
		flexShrink: 1,
	},
});
