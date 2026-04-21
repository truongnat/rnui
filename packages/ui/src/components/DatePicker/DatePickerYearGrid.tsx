import { useTheme } from "@truongdq01/headless";
import { memo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export interface DatePickerYearGridProps {
	years: number[];
	selectedYear: number;
	onSelectYear: (year: number) => void;
}

export const DatePickerYearGrid = memo(function DatePickerYearGrid({
	years,
	selectedYear,
	onSelectYear,
}: DatePickerYearGridProps) {
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
					gap: tokens.spacing[2],
					justifyContent: "center",
					paddingHorizontal: 16,
					paddingBottom: tokens.spacing[3],
				}}
			>
				{years.map((y) => (
					<Pressable
						key={y}
						onPress={() => onSelectYear(y)}
						style={{
							paddingHorizontal: tokens.spacing[3],
							paddingVertical: tokens.spacing[2],
							borderRadius: tokens.radius.md,
							backgroundColor:
								y === selectedYear
									? tokens.color.brand.subtle
									: tokens.color.bg.muted,
						}}
					>
						<Text
							style={{
								fontSize: tokens.fontSize.sm,
								fontWeight: tokens.fontWeight.semibold,
								color:
									y === selectedYear
										? tokens.color.brand.text
										: tokens.color.text.primary,
							}}
						>
							{y}
						</Text>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
});
