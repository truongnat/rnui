import { useTheme } from "@truongdq01/headless";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../Icon";
import {
	DATE_PICKER_DRAG_HANDLE_HEIGHT,
	DATE_PICKER_DRAG_HANDLE_WIDTH,
	DATE_PICKER_HEADER_SLOT,
	DATE_PICKER_SHEET_ROW_MIN_HEIGHT,
} from "./datePickerConstants";

export interface DatePickerSheetHeaderProps {
	title: string;
	showBack: boolean;
	onBack: () => void;
	onClose: () => void;
	backAccessibilityLabel?: string;
}

/**
 * Bottom-sheet header: drag handle + balanced 3-column bar (back | centered title | close).
 */
export const DatePickerSheetHeader = memo(function DatePickerSheetHeader({
	title,
	showBack,
	onBack,
	onClose,
	backAccessibilityLabel = "Back",
}: DatePickerSheetHeaderProps) {
	const { tokens } = useTheme();

	return (
		<View>
			<View style={{ alignItems: "center", paddingVertical: 10 }}>
				<View
					style={{
						width: DATE_PICKER_DRAG_HANDLE_WIDTH,
						height: DATE_PICKER_DRAG_HANDLE_HEIGHT,
						borderRadius: 2,
						backgroundColor: tokens.color.border.subtle,
					}}
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					minHeight: DATE_PICKER_SHEET_ROW_MIN_HEIGHT,
					paddingHorizontal: 16,
					marginBottom: 8,
				}}
			>
				<View
					style={{
						width: DATE_PICKER_HEADER_SLOT,
						alignItems: "flex-start",
						justifyContent: "center",
					}}
				>
					{showBack ? (
						<Pressable
							onPress={onBack}
							hitSlop={12}
							accessibilityRole="button"
							accessibilityLabel={backAccessibilityLabel}
						>
							<Icon
								name="chevronLeft"
								size={22}
								color={tokens.color.text.secondary}
							/>
						</Pressable>
					) : null}
				</View>

				<Text
					style={{
						flex: 1,
						fontSize: tokens.fontSize.lg,
						fontWeight: tokens.fontWeight.semibold,
						color: tokens.color.text.primary,
						textAlign: "center",
					}}
					numberOfLines={1}
					accessibilityRole="header"
				>
					{title}
				</Text>

				<View
					style={{
						width: DATE_PICKER_HEADER_SLOT,
						alignItems: "flex-end",
						justifyContent: "center",
					}}
				>
					<Pressable
						onPress={onClose}
						hitSlop={12}
						accessibilityRole="button"
						accessibilityLabel="Close"
					>
						<Icon name="close" size={22} color={tokens.color.text.secondary} />
					</Pressable>
				</View>
			</View>
		</View>
	);
});
