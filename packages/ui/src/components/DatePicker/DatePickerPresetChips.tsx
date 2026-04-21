import { useTheme } from "@truongdq01/headless";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import type { DatePickerPreset } from "./datePickerTypes";
import { presetChipLabel } from "./datePickerUtils";

export interface DatePickerPresetChipsProps {
	presets: DatePickerPreset[];
	selectedPreset: DatePickerPreset;
	disabled: boolean;
	onSelect: (preset: DatePickerPreset) => void;
}

export const DatePickerPresetChips = memo(function DatePickerPresetChips({
	presets,
	selectedPreset,
	disabled,
	onSelect,
}: DatePickerPresetChipsProps) {
	const { tokens } = useTheme();

	if (!presets.length) return null;

	return (
		<View
			style={{
				flexDirection: "row",
				gap: tokens.spacing[2],
				flexWrap: "wrap",
			}}
		>
			{presets.map((preset) => (
				<Pressable
					key={String(preset)}
					onPress={() => preset && onSelect(preset)}
					disabled={disabled || !preset}
					style={({ pressed }) => [
						{
							paddingHorizontal: tokens.spacing[3],
							paddingVertical: tokens.spacing[2],
							backgroundColor:
								selectedPreset === preset
									? tokens.color.brand.default
									: tokens.color.bg.muted,
							borderRadius: tokens.radius.full,
						},
						{ opacity: disabled || pressed ? 0.6 : 1 },
					]}
				>
					<Text
						style={{
							fontSize: tokens.fontSize.sm,
							fontWeight: tokens.fontWeight.medium,
							color:
								selectedPreset === preset
									? tokens.color.text.onBrand
									: tokens.color.text.secondary,
							textTransform: "capitalize",
						}}
					>
						{presetChipLabel(preset)}
					</Text>
				</Pressable>
			))}
		</View>
	);
});
