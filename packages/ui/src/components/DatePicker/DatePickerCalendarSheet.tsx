import { useTheme } from "@truongdq01/headless";
import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { CalendarGrid } from "./CalendarGrid";
import { DatePickerMonthGrid } from "./DatePickerMonthGrid";
import { DatePickerSheetFooter } from "./DatePickerSheetFooter";
import { DatePickerSheetHeader } from "./DatePickerSheetHeader";
import { DatePickerYearGrid } from "./DatePickerYearGrid";
import {
	DATE_PICKER_BACKDROP,
	DATE_PICKER_SHEET_RADIUS,
} from "./datePickerConstants";
import type { DatePickerStrings, PickerSurface } from "./datePickerTypes";
import { resolveModalTitle } from "./datePickerUtils";
import { TimePickerWheels } from "./TimePickerWheels";

export interface DatePickerCalendarSheetProps {
	visible: boolean;
	strings: Required<DatePickerStrings>;
	mode: "date" | "time" | "datetime";
	pickerSurface: PickerSurface;
	onSurfaceChange: (surface: PickerSurface) => void;
	calMonth: number;
	calYear: number;
	onCalMonthYearChange: (month: number, year: number) => void;
	pickerDraft: Date;
	setPickerDraft: Dispatch<SetStateAction<Date>>;
	minimumDate?: Date;
	maximumDate?: Date;
	locale?: string;
	monthNamesShort: string[];
	yearOptions: number[];
	onDismiss: () => void;
	onConfirmSelection: (date: Date) => void;
	onClearPresetBinding: () => void;
	bottomInset: number;
	minuteInterval?: number;
	is24Hour: boolean;
}

export const DatePickerCalendarSheet = memo(function DatePickerCalendarSheet({
	visible,
	strings,
	mode,
	pickerSurface,
	onSurfaceChange,
	calMonth,
	calYear,
	onCalMonthYearChange,
	pickerDraft,
	setPickerDraft,
	minimumDate,
	maximumDate,
	locale,
	monthNamesShort,
	yearOptions,
	onDismiss,
	onConfirmSelection,
	onClearPresetBinding,
	bottomInset,
	minuteInterval,
	is24Hour,
}: DatePickerCalendarSheetProps) {
	const { tokens } = useTheme();

	const timeWheelStrings = useMemo(
		() => ({
			hour: strings.hour,
			minute: strings.minute,
			am: strings.am,
			pm: strings.pm,
			meridiem: strings.meridiem,
		}),
		[strings.hour, strings.minute, strings.am, strings.pm, strings.meridiem],
	);

	const title = resolveModalTitle(mode, pickerSurface, strings);

	const goBackFromSubView = useCallback(() => {
		onSurfaceChange("day");
	}, [onSurfaceChange]);

	const handleSelectDate = useCallback(
		(d: Date) => {
			setPickerDraft((prev) => {
				const next = new Date(prev);
				next.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
				return next;
			});
			onClearPresetBinding();
		},
		[setPickerDraft, onClearPresetBinding],
	);

	const handleToday = useCallback(() => {
		const now = new Date();
		setPickerDraft(now);
		onCalMonthYearChange(now.getMonth(), now.getFullYear());
		onClearPresetBinding();
	}, [setPickerDraft, onCalMonthYearChange, onClearPresetBinding]);

	const confirm = useCallback(() => {
		onConfirmSelection(pickerDraft);
	}, [onConfirmSelection, pickerDraft]);

	const showDateChrome = mode === "date" || mode === "datetime";
	const showTimeChrome = mode === "time" || mode === "datetime";
	const showMonthYearPickers = pickerSurface !== "day" && showDateChrome;

	return (
		<Modal
			transparent
			animationType="slide"
			visible={visible}
			onRequestClose={onDismiss}
		>
			<View
				style={{
					flex: 1,
					justifyContent: "flex-end",
					backgroundColor: DATE_PICKER_BACKDROP,
				}}
			>
				<Pressable
					style={StyleSheet.absoluteFill}
					onPress={onDismiss}
					accessibilityLabel="Dismiss"
				/>
				<View
					style={{
						backgroundColor: tokens.color.surface.default,
						borderTopLeftRadius: DATE_PICKER_SHEET_RADIUS,
						borderTopRightRadius: DATE_PICKER_SHEET_RADIUS,
					}}
				>
					<DatePickerSheetHeader
						title={title}
						showBack={showMonthYearPickers}
						onBack={goBackFromSubView}
						onClose={onDismiss}
						backAccessibilityLabel="Back to calendar"
					/>

					{pickerSurface === "year" && showDateChrome ? (
						<DatePickerYearGrid
							years={yearOptions}
							selectedYear={calYear}
							onSelectYear={(y) => {
								onCalMonthYearChange(calMonth, y);
								onSurfaceChange("day");
							}}
						/>
					) : pickerSurface === "month" && showDateChrome ? (
						<DatePickerMonthGrid
							monthNames={monthNamesShort}
							selectedMonth={calMonth}
							onSelectMonth={(m) => {
								onCalMonthYearChange(m, calYear);
								onSurfaceChange("day");
							}}
						/>
					) : (
						<>
							{showDateChrome && (
								<View style={{ paddingHorizontal: 16 }}>
									<CalendarGrid
										month={calMonth}
										year={calYear}
										selectedDate={pickerDraft}
										onSelectDate={handleSelectDate}
										onMonthChange={onCalMonthYearChange}
										minimumDate={minimumDate}
										maximumDate={maximumDate}
										locale={locale}
										onMonthTitlePress={() => onSurfaceChange("month")}
										onYearTitlePress={() => onSurfaceChange("year")}
									/>
								</View>
							)}

							{showTimeChrome && (
								<TimePickerWheels
									value={pickerDraft}
									onChange={setPickerDraft}
									minuteInterval={minuteInterval}
									is24Hour={is24Hour}
									strings={timeWheelStrings}
								/>
							)}

							{showDateChrome && (
								<View style={{ paddingHorizontal: 16, marginTop: 12 }}>
									<Pressable
										onPress={handleToday}
										style={{
											alignItems: "center",
											paddingVertical: tokens.spacing[3],
											borderRadius: tokens.radius.lg,
											backgroundColor: tokens.color.brand.subtle,
										}}
									>
										<Text
											style={{
												fontSize: tokens.fontSize.sm,
												fontWeight: tokens.fontWeight.semibold,
												color: tokens.color.brand.text,
											}}
										>
											{strings.today}
										</Text>
									</Pressable>
								</View>
							)}
						</>
					)}

					<DatePickerSheetFooter
						cancelLabel={strings.cancel}
						confirmLabel={strings.confirm}
						onCancel={onDismiss}
						onConfirm={confirm}
						insetsBottom={bottomInset}
					/>
				</View>
			</View>
		</Modal>
	);
});
