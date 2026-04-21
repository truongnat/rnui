import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@truongdq01/headless";
import { useCallback, useMemo, useState } from "react";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DatePickerCalendarSheet } from "./DatePickerCalendarSheet";
import { DatePickerField } from "./DatePickerField";
import { DatePickerNativeSpinnerSheet } from "./DatePickerNativeSpinnerSheet";
import { DatePickerPresetChips } from "./DatePickerPresetChips";
import type {
	DatePickerPreset,
	DatePickerProps,
	DatePickerStyle,
	PickerSurface,
} from "./datePickerTypes";
import {
	buildMonthNamesShort,
	buildYearOptions,
	defaultFormatOptions,
	getPresetDate,
	mergeStrings,
	resolveIs24HourClock,
} from "./datePickerUtils";
import { buildMinuteItems, nearestMinuteInList } from "./timeWheelUtils";

export type {
	DatePickerPreset,
	DatePickerProps,
	DatePickerStrings,
	DatePickerStyle,
} from "./datePickerTypes";

export function DatePicker({
	label,
	date,
	onChange,
	placeholder = "Select date",
	disabled = false,
	error,
	icon,
	minimumDate,
	maximumDate,
	mode = "date",
	presets = ["today", "last7", "last30"],
	onPresetChange,
	clearable = true,
	pickerStyle: pickerStyleProp,
	locale,
	timeZoneOffsetInMinutes,
	timeZoneOffsetInSeconds,
	timeZoneName,
	formatDate: formatDateProp,
	formatOptions,
	strings: stringsProp,
	minuteInterval,
	is24Hour: is24HourProp,
}: DatePickerProps) {
	const {
		components: { input },
		tokens,
	} = useTheme();
	const insets = useSafeAreaInsets();
	const str = mergeStrings(stringsProp);
	const is24Hour = resolveIs24HourClock(is24HourProp, locale);

	const [showPicker, setShowPicker] = useState(false);
	const [selectedPreset, setSelectedPreset] = useState<DatePickerPreset>(null);
	const [pickerDraft, setPickerDraft] = useState<Date>(
		() => date ?? new Date(),
	);
	const [pickerSurface, setPickerSurface] = useState<PickerSurface>("day");

	const initDate = date ?? new Date();
	const [calMonth, setCalMonth] = useState(initDate.getMonth());
	const [calYear, setCalYear] = useState(initDate.getFullYear());

	const effectivePickerStyle: DatePickerStyle = pickerStyleProp ?? "calendar";

	const yearOptions = useMemo(() => buildYearOptions(calYear), [calYear]);

	const monthNamesShort = useMemo(() => buildMonthNamesShort(locale), [locale]);

	const formattedDisplay = useMemo(() => {
		if (!date) return "";
		if (formatDateProp) return formatDateProp(date);
		const opts = formatOptions ?? defaultFormatOptions(mode);
		return new Intl.DateTimeFormat(locale, opts).format(date);
	}, [date, formatDateProp, formatOptions, mode, locale]);

	const displayValue = date ? formattedDisplay : placeholder;
	const hasError = Boolean(error);

	const handleCalMonthYearChange = useCallback((m: number, y: number) => {
		setCalMonth(m);
		setCalYear(y);
	}, []);

	const handlePresetPress = useCallback(
		(preset: DatePickerPreset) => {
			if (!preset || disabled) return;
			onChange(getPresetDate(preset));
			setSelectedPreset(preset);
			onPresetChange?.(preset);
		},
		[disabled, onChange, onPresetChange],
	);

	const handleClear = useCallback(() => {
		setSelectedPreset(null);
		onPresetChange?.(null);
		onChange(null);
	}, [onChange, onPresetChange]);

	const handlePressTrigger = useCallback(() => {
		if (disabled) return;
		const ref = date ?? new Date();
		const draft = new Date(ref);
		if (mode === "time" || mode === "datetime") {
			const items = buildMinuteItems(minuteInterval ?? 1);
			draft.setMinutes(nearestMinuteInList(draft.getMinutes(), items), 0, 0);
		}
		setPickerDraft(draft);
		setCalMonth(draft.getMonth());
		setCalYear(draft.getFullYear());
		setPickerSurface("day");
		setShowPicker(true);
	}, [date, disabled, mode, minuteInterval]);

	const handleNativeChange = useCallback(
		(_event: unknown, selectedDate?: Date) => {
			if (Platform.OS === "android") {
				setShowPicker(false);
			}
			if (selectedDate) {
				setSelectedPreset(null);
				onChange(selectedDate);
			}
		},
		[onChange],
	);

	const closeModal = useCallback(() => {
		setShowPicker(false);
		setPickerSurface("day");
	}, []);

	const clearPresetBinding = useCallback(() => {
		setSelectedPreset(null);
	}, []);

	const confirmCalendar = useCallback(
		(next: Date) => {
			onChange(next);
			setSelectedPreset(null);
			closeModal();
		},
		[onChange, closeModal],
	);

	const pickerComponent =
		showPicker && effectivePickerStyle !== "calendar" ? (
			<DateTimePicker
				value={date ?? new Date()}
				mode={mode}
				display={Platform.OS === "ios" ? "spinner" : "default"}
				onChange={handleNativeChange}
				minimumDate={minimumDate}
				maximumDate={maximumDate}
				locale={locale}
				timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
				timeZoneOffsetInSeconds={timeZoneOffsetInSeconds}
				timeZoneName={timeZoneName}
			/>
		) : null;

	return (
		<View style={{ gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 }}>
			{label ? <Text style={input.label}>{label}</Text> : null}

			{presets.length > 0 ? (
				<DatePickerPresetChips
					presets={presets}
					selectedPreset={selectedPreset}
					disabled={disabled}
					onSelect={handlePresetPress}
				/>
			) : null}

			<DatePickerField
				displayValue={displayValue}
				hasValue={date != null}
				disabled={disabled}
				error={hasError}
				clearable={clearable}
				showClear={date != null}
				icon={icon}
				onOpen={handlePressTrigger}
				onClear={handleClear}
			/>

			{error ? <Text style={input.errorText}>{error}</Text> : null}

			{effectivePickerStyle === "calendar" && (
				<DatePickerCalendarSheet
					visible={showPicker}
					strings={str}
					mode={mode}
					pickerSurface={pickerSurface}
					onSurfaceChange={setPickerSurface}
					calMonth={calMonth}
					calYear={calYear}
					onCalMonthYearChange={handleCalMonthYearChange}
					pickerDraft={pickerDraft}
					setPickerDraft={setPickerDraft}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					locale={locale}
					monthNamesShort={monthNamesShort}
					yearOptions={yearOptions}
					onDismiss={closeModal}
					onConfirmSelection={confirmCalendar}
					onClearPresetBinding={clearPresetBinding}
					bottomInset={insets.bottom}
					minuteInterval={minuteInterval}
					is24Hour={is24Hour}
				/>
			)}

			{effectivePickerStyle !== "calendar" &&
				Platform.OS === "ios" &&
				showPicker && (
					<DatePickerNativeSpinnerSheet
						visible={showPicker}
						doneLabel={str.done}
						onDone={closeModal}
					>
						{pickerComponent}
					</DatePickerNativeSpinnerSheet>
				)}

			{effectivePickerStyle !== "calendar" &&
				Platform.OS === "android" &&
				pickerComponent}
		</View>
	);
}
