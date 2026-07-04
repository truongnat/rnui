export type DatePickerPreset =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'last90'
  | null;

export type DateRangeInputPreset =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'last90'
  | 'thisMonth'
  | 'lastMonth';

export type DatePickerStyle = 'calendar' | 'spinner' | 'native';

/** Validation status for a date field, affecting the border and message color. */
export type DateFieldStatus = 'error' | 'warning' | 'success';

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
  /** Error message shown under the field. Shorthand for `status="error"`. */
  error?: string;
  /** Validation status affecting the field border and message color. */
  status?: DateFieldStatus;
  /** Message shown under the field, colored to match `status`. Ignored when `error` is set. */
  statusMessage?: string;
  icon?: import('react').ReactNode;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
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

export interface DateInputProps
  extends Omit<DatePickerProps, 'date' | 'mode' | 'onChange'> {
  value?: Date | null;
  date?: Date | null;
  onChange: (date: Date | null) => void;
  helperText?: string;
}

export interface DateTimeInputProps
  extends Omit<DatePickerProps, 'date' | 'mode' | 'onChange'> {
  value?: Date | null;
  date?: Date | null;
  onChange: (date: Date | null) => void;
  helperText?: string;
}

export interface DateRangeInputValue {
  start: Date | null;
  end: Date | null;
}

export interface DateRangeInputStrings extends DatePickerStrings {
  titleRange?: string;
  startDate?: string;
  endDate?: string;
}

export interface DateRangeInputProps {
  label?: string;
  value?: DateRangeInputValue;
  range?: DateRangeInputValue;
  onChange: (range: DateRangeInputValue) => void;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  /** Error message shown under the field. Shorthand for `status="error"`. */
  error?: string;
  /** Validation status affecting the field border and message color. */
  status?: DateFieldStatus;
  /** Message shown under the field, colored to match `status`. Ignored when `error` is set. */
  statusMessage?: string;
  icon?: import('react').ReactNode;
  minimumDate?: Date;
  maximumDate?: Date;
  presets?: DateRangeInputPreset[];
  onPresetChange?: (preset: DateRangeInputPreset | null) => void;
  clearable?: boolean;
  locale?: string;
  numberOfMonths?: 1 | 2;
  formatDate?: (date: Date) => string;
  formatOptions?: Intl.DateTimeFormatOptions;
  strings?: DateRangeInputStrings;
}

export type PickerSurface = 'day' | 'month' | 'year';
