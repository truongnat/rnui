import type {
  CalendarConstraintInfo,
  CalendarDateConstraint,
} from '../Calendar/types';

export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function compareDay(a: Date, b: Date): number {
  return normalizeDate(a).getTime() - normalizeDate(b).getTime();
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function isDateInRange(
  date: Date,
  start: Date | null,
  end: Date | null
): boolean {
  if (!start || !end) return false;
  return compareDay(date, start) >= 0 && compareDay(date, end) <= 0;
}

export function getCalendarConstraintInfo(
  date: Date,
  minimumDate?: Date,
  maximumDate?: Date,
  dateConstraints?: CalendarDateConstraint
): CalendarConstraintInfo {
  const normalized = normalizeDate(date);

  if (minimumDate && compareDay(normalized, minimumDate) < 0) {
    return { disabled: true };
  }

  if (maximumDate && compareDay(normalized, maximumDate) > 0) {
    return { disabled: true };
  }

  if (!dateConstraints) {
    return { disabled: false };
  }

  const result = dateConstraints(normalized);
  if (typeof result === 'boolean') {
    return { disabled: result };
  }

  return result;
}
