import { useTheme } from "@truongdq01/headless";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DATE_PICKER_SHEET_ROW_MIN_HEIGHT } from "./datePickerConstants";

export interface DatePickerSheetFooterProps {
	cancelLabel: string;
	confirmLabel: string;
	onCancel: () => void;
	onConfirm: () => void;
	insetsBottom: number;
}

export const DatePickerSheetFooter = memo(function DatePickerSheetFooter({
	cancelLabel,
	confirmLabel,
	onCancel,
	onConfirm,
	insetsBottom,
}: DatePickerSheetFooterProps) {
	const { tokens } = useTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				minHeight: DATE_PICKER_SHEET_ROW_MIN_HEIGHT,
				paddingHorizontal: 16,
				paddingTop: tokens.spacing[3],
				marginTop: tokens.spacing[2],
				borderTopWidth: StyleSheet.hairlineWidth,
				borderTopColor: tokens.color.border.subtle,
				paddingBottom: Math.max(insetsBottom, tokens.spacing[3]),
			}}
		>
			<Pressable
				onPress={onCancel}
				hitSlop={12}
				accessibilityRole="button"
				accessibilityLabel={cancelLabel}
			>
				<Text
					style={{
						fontSize: tokens.fontSize.md,
						color: tokens.color.text.secondary,
						fontWeight: tokens.fontWeight.medium,
					}}
				>
					{cancelLabel}
				</Text>
			</Pressable>
			<Pressable
				onPress={onConfirm}
				hitSlop={12}
				accessibilityRole="button"
				accessibilityLabel={confirmLabel}
			>
				<Text
					style={{
						fontSize: tokens.fontSize.md,
						color: tokens.color.brand.default,
						fontWeight: tokens.fontWeight.semibold,
					}}
				>
					{confirmLabel}
				</Text>
			</Pressable>
		</View>
	);
});
