import { useTheme } from '@truongdq01/headless';
import { useCallback, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar } from '../Calendar';
import { DatePickerField } from './DatePickerField';
import { DatePickerFieldMessage } from './DatePickerFieldMessage';
import { DatePickerSheetFooter } from './DatePickerSheetFooter';
import { DatePickerSheetHeader } from './DatePickerSheetHeader';
import {
  DATE_PICKER_BACKDROP,
  DATE_PICKER_SHEET_RADIUS,
} from './datePickerConstants';
import type {
  DateRangeInputPreset,
  DateRangeInputProps,
  DateRangeInputStrings,
  DateRangeInputValue,
} from './datePickerTypes';
import {
  defaultFormatOptions,
  mergeStrings,
  resolveFieldStatus,
} from './datePickerUtils';
import { endOfMonth as rawEndOfMonth, startOfMonth } from './calendarUtils';

export type {
  DateRangeInputPreset,
  DateRangeInputProps,
  DateRangeInputStrings,
  DateRangeInputValue,
} from './datePickerTypes';

const emptyRange: DateRangeInputValue = { start: null, end: null };

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function getPresetRange(preset: DateRangeInputPreset): DateRangeInputValue {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  switch (preset) {
    case 'today':
      return { start: todayStart, end: todayEnd };
    case 'yesterday': {
      const yesterday = addDays(now, -1);
      return { start: startOfDay(yesterday), end: endOfDay(yesterday) };
    }
    case 'last7':
      return { start: startOfDay(addDays(now, -6)), end: todayEnd };
    case 'last30':
      return { start: startOfDay(addDays(now, -29)), end: todayEnd };
    case 'last90':
      return { start: startOfDay(addDays(now, -89)), end: todayEnd };
    case 'thisMonth':
      return { start: startOfMonth(now), end: endOfDay(now) };
    case 'lastMonth': {
      const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return {
        start: startOfMonth(previousMonth),
        end: endOfDay(rawEndOfMonth(previousMonth)),
      };
    }
    default:
      return assertNever(preset);
  }
}

function presetLabel(preset: DateRangeInputPreset): string {
  switch (preset) {
    case 'last7':
      return 'Last 7 days';
    case 'last30':
      return 'Last 30 days';
    case 'last90':
      return 'Last 90 days';
    case 'thisMonth':
      return 'This month';
    case 'lastMonth':
      return 'Last month';
    case 'yesterday':
      return 'Yesterday';
    case 'today':
      return 'Today';
    default:
      return assertNever(preset);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

function mergeRangeStrings(
  strings?: DateRangeInputStrings
): Required<DateRangeInputStrings> {
  const base = mergeStrings(strings);
  return {
    ...base,
    titleRange: strings?.titleRange ?? 'Select date range',
    startDate: strings?.startDate ?? 'Start date',
    endDate: strings?.endDate ?? 'End date',
  };
}

export function DateRangeInput({
  label,
  value,
  range,
  onChange,
  placeholder = 'Select date range',
  helperText,
  disabled = false,
  error,
  status,
  statusMessage,
  icon,
  minimumDate,
  maximumDate,
  presets = ['last7', 'last30', 'thisMonth'],
  onPresetChange,
  clearable = true,
  locale,
  numberOfMonths = 2,
  formatDate,
  formatOptions,
  strings,
}: DateRangeInputProps) {
  const {
    components: { input },
    tokens,
  } = useTheme();
  const insets = useSafeAreaInsets();
  const str = mergeRangeStrings(strings);
  const field = resolveFieldStatus(error, status, statusMessage);
  const selectedRange = value ?? range ?? emptyRange;
  const [showPicker, setShowPicker] = useState(false);
  const [draftRange, setDraftRange] =
    useState<DateRangeInputValue>(selectedRange);
  const [selectedPreset, setSelectedPreset] =
    useState<DateRangeInputPreset | null>(null);

  const formatter = useMemo(
    () =>
      formatDate ??
      ((date: Date) =>
        new Intl.DateTimeFormat(
          locale,
          formatOptions ?? defaultFormatOptions('date')
        ).format(date)),
    [formatDate, formatOptions, locale]
  );

  const displayValue = useMemo(() => {
    const { start, end } = selectedRange;
    if (!start && !end) return placeholder;
    if (start && end) return `${formatter(start)} - ${formatter(end)}`;
    if (start) return `${formatter(start)} -`;
    if (end) return `- ${formatter(end)}`;
    return placeholder;
  }, [
    formatter,
    placeholder,
    selectedRange.end,
    selectedRange.start,
    selectedRange,
  ]);

  const openPicker = useCallback(() => {
    if (disabled) return;
    setDraftRange(selectedRange);
    setShowPicker(true);
  }, [disabled, selectedRange]);

  const closePicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  const clearRange = useCallback(() => {
    setSelectedPreset(null);
    onPresetChange?.(null);
    onChange(emptyRange);
  }, [onChange, onPresetChange]);

  const confirmRange = useCallback(() => {
    setSelectedPreset(null);
    onPresetChange?.(null);
    onChange(draftRange);
    closePicker();
  }, [closePicker, draftRange, onChange, onPresetChange]);

  const applyPreset = useCallback(
    (preset: DateRangeInputPreset) => {
      if (disabled) return;
      const nextRange = getPresetRange(preset);
      setSelectedPreset(preset);
      onPresetChange?.(preset);
      onChange(nextRange);
    },
    [disabled, onChange, onPresetChange]
  );

  return (
    <View style={{ gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 }}>
      {label ? <Text style={input.label}>{label}</Text> : null}

      {presets.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing[2],
            flexWrap: 'wrap',
          }}
        >
          {presets.map((preset) => (
            <Pressable
              key={preset}
              onPress={() => applyPreset(preset)}
              disabled={disabled}
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
                }}
              >
                {presetLabel(preset)}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <DatePickerField
        displayValue={displayValue}
        hasValue={selectedRange.start != null || selectedRange.end != null}
        disabled={disabled}
        status={field.status}
        clearable={clearable}
        showClear={selectedRange.start != null || selectedRange.end != null}
        icon={icon}
        onOpen={openPicker}
        onClear={clearRange}
      />

      <DatePickerFieldMessage
        status={field.status}
        message={field.message}
        helperText={helperText}
      />

      <Modal
        transparent
        animationType="slide"
        visible={showPicker}
        onRequestClose={closePicker}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: DATE_PICKER_BACKDROP,
          }}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closePicker}
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
              title={str.titleRange}
              showBack={false}
              onBack={() => {}}
              onClose={closePicker}
            />
            <View style={{ paddingHorizontal: tokens.spacing[4] }}>
              <Calendar
                selectionMode="range"
                range={draftRange}
                onRangeChange={setDraftRange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                initialMonth={draftRange.start ?? draftRange.end ?? new Date()}
                numberOfMonths={numberOfMonths}
                locale={locale}
              />
            </View>
            <DatePickerSheetFooter
              cancelLabel={str.cancel}
              confirmLabel={str.confirm}
              onCancel={closePicker}
              onConfirm={confirmRange}
              insetsBottom={insets.bottom}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
