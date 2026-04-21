import { useTheme } from "@truongdq01/headless";
import type { ReactNode } from "react";
import { memo } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import {
	DATE_PICKER_BACKDROP,
	DATE_PICKER_SHEET_RADIUS,
} from "./datePickerConstants";

export interface DatePickerNativeSpinnerSheetProps {
	visible: boolean;
	doneLabel: string;
	onDone: () => void;
	children: ReactNode;
}

export const DatePickerNativeSpinnerSheet = memo(
	function DatePickerNativeSpinnerSheet({
		visible,
		doneLabel,
		onDone,
		children,
	}: DatePickerNativeSpinnerSheetProps) {
		const { tokens } = useTheme();

		return (
			<Modal transparent animationType="slide" visible={visible}>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						backgroundColor: DATE_PICKER_BACKDROP,
					}}
				>
					<View
						style={{
							backgroundColor: tokens.color.surface.default,
							borderTopLeftRadius: DATE_PICKER_SHEET_RADIUS,
							borderTopRightRadius: DATE_PICKER_SHEET_RADIUS,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								paddingHorizontal: 16,
								paddingTop: 12,
							}}
						>
							<Pressable onPress={onDone} hitSlop={12}>
								<Text
									style={{
										fontSize: 16,
										color: tokens.color.brand.default,
										fontWeight: tokens.fontWeight.semibold,
									}}
								>
									{doneLabel}
								</Text>
							</Pressable>
						</View>
						{children}
					</View>
				</View>
			</Modal>
		);
	},
);
