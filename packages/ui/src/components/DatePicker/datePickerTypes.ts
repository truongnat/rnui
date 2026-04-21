export type DatePickerPreset =
	| "today"
	| "yesterday"
	| "last7"
	| "last30"
	| "last90"
	| null;

export type DatePickerStyle = "calendar" | "spinner" | "native";

/** Custom copy for the calendar modal and actions. Unspecified keys use English defaults. */
export interface DatePickerStrings {
	titleDate?: string;
	titleTime?: string;
	titleDateTime?: string;
	selectMonth?: string;
	selectYear?: string;
	confirm?: string;
	cancel?: string;
	today?: string;
	/** iOS spinner / native sheet primary action (default “Done”). */
	done?: string;
	/** Wheel column label — hour (default “Hour”). */
	hour?: string;
	/** Wheel column label — minute (default “Minute”). */
	minute?: string;
	/** 12h period — morning (default “AM”). */
	am?: string;
	/** 12h period — afternoon (default “PM”). */
	pm?: string;
	/** 12h third-column header (default “AM/PM”). */
	meridiem?: string;
}

export interface DatePickerProps {
	label?: string;
	date: Date | null;
	onChange: (date: Date | null) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	icon?: import("react").ReactNode;
	minimumDate?: Date;
	maximumDate?: Date;
	mode?: "date" | "time" | "datetime";
	presets?: DatePickerPreset[];
	onPresetChange?: (preset: DatePickerPreset) => void;
	clearable?: boolean;
	pickerStyle?: DatePickerStyle;
	locale?: string;
	timeZoneOffsetInMinutes?: number;
	timeZoneOffsetInSeconds?: number;
	timeZoneName?: string;
	/** Minute wheel step (e.g. 15 → 0, 15, 30, 45). Default 1. */
	minuteInterval?: number;
	/**
	 * Use 24h hour wheel. When omitted, follows the locale’s hour cycle when available.
	 */
	is24Hour?: boolean;
	formatDate?: (date: Date) => string;
	formatOptions?: Intl.DateTimeFormatOptions;
	strings?: DatePickerStrings;
}

export type PickerSurface = "day" | "month" | "year";
