import { useTheme } from "@truongdq01/headless";
import { memo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export interface DatePickerMonthGridProps {
	monthNames: string[];
	selectedMonth: number;
	onSelectMonth: (monthIndex: number) => void;
}

/** 12 month cells — scrollable on very small heights. */
export const DatePickerMonthGrid = memo(function DatePickerMonthGrid({
	monthNames,
	selectedMonth,
	onSelectMonth,
}: DatePickerMonthGridProps) {
	const { tokens } = useTheme();

	return (
		<ScrollView
			style={{ maxHeight: 320 }}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					paddingHorizontal: 16,
					paddingBottom: tokens.spacing[3],
					gap: tokens.spacing[2],
					justifyContent: "space-between",
				}}
			>
				{monthNames.map((labelMonth, m) => (
					<Pressable
						key={labelMonth}
						onPress={() => onSelectMonth(m)}
						style={{
							width: "30%",
							minWidth: "28%",
							alignItems: "center",
							paddingVertical: tokens.spacing[3],
							borderRadius: tokens.radius.md,
							backgroundColor:
								m === selectedMonth
									? tokens.color.brand.subtle
									: tokens.color.bg.muted,
						}}
					>
						<Text
							style={{
								fontSize: tokens.fontSize.sm,
								fontWeight: tokens.fontWeight.semibold,
								color:
									m === selectedMonth
										? tokens.color.brand.text
										: tokens.color.text.primary,
							}}
						>
							{labelMonth}
						</Text>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
});
