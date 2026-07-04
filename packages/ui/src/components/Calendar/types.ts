import type { StyleProp, ViewStyle } from 'react-native';

export interface CalendarRangeValue {
  start: Date | null;
  end: Date | null;
}

export interface CalendarConstraintInfo {
  disabled: boolean;
  reason?: string;
}

export type CalendarDateConstraint = (
  date: Date
) => boolean | CalendarConstraintInfo;

export type CalendarSelectionMode = 'single' | 'range';

export interface CalendarProps {
  selectionMode?: CalendarSelectionMode;
  value?: Date | null;
  range?: CalendarRangeValue;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: CalendarRangeValue) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  dateConstraints?: CalendarDateConstraint;
  onUnavailableDatePress?: (date: Date, reason?: string) => void;
  initialMonth?: Date;
  numberOfMonths?: 1 | 2;
  locale?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
