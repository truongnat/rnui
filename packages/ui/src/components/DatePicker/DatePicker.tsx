import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useTokens,
  useComponentTokens,
  useIconStyle,
} from '@truongdq01/headless';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from '../Icon';
import { CalendarGrid } from './CalendarGrid';
import { TimePickerWheels } from './TimePickerWheels';

export type DatePickerPreset =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'last90'
  | null;

export type DatePickerStyle = 'calendar' | 'spinner' | 'native';

export interface DatePickerProps {
  label?: string;
  date: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  presets?: DatePickerPreset[];
  onPresetChange?: (preset: DatePickerPreset) => void;
  clearable?: boolean;
  /**
   * `"calendar"` — custom CalendarGrid in a bottom-sheet-style modal (default for date mode).
   * `"spinner"` — iOS drum-roll / Android native.
   * `"native"` — platform-default DateTimePicker.
   */
  pickerStyle?: DatePickerStyle;
  /** Forwarded to `@react-native-community/datetimepicker` — behavior is platform-specific. */
  locale?: string;
  /** Forwarded to `@react-native-community/datetimepicker`. */
  timeZoneOffsetInMinutes?: number;
  /** Forwarded to `@react-native-community/datetimepicker` (Android / newer iOS). */
  timeZoneOffsetInSeconds?: number;
  /** IANA tz name; forwarded to `@react-native-community/datetimepicker`. */
  timeZoneName?: string;
}

export function DatePicker({
  label,
  date,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  error,
  icon,
  minimumDate,
  maximumDate,
  mode = 'date',
  presets = ['today', 'last7', 'last30'],
  onPresetChange,
  clearable = true,
  pickerStyle: pickerStyleProp,
  locale,
  timeZoneOffsetInMinutes,
  timeZoneOffsetInSeconds,
  timeZoneName,
}: DatePickerProps) {
  const { input } = useComponentTokens();
  const tokens = useTokens();
  const insets = useSafeAreaInsets();
  const { size: iconSize, color: iconColor } = useIconStyle('input');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<DatePickerPreset>(null);
  const [pickerDraft, setPickerDraft] = useState<Date>(
    () => date ?? new Date()
  );
  const [yearPick, setYearPick] = useState(false);

  const initDate = date ?? new Date();
  const [calMonth, setCalMonth] = useState(initDate.getMonth());
  const [calYear, setCalYear] = useState(initDate.getFullYear());

  const effectivePickerStyle: DatePickerStyle = pickerStyleProp ?? 'calendar';

  const yearOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => calYear - 5 + i),
    [calYear]
  );

  const modalTitle =
    mode === 'time'
      ? 'Select time'
      : mode === 'datetime'
        ? 'Select date & time'
        : 'Select date';

  const handleCalendarMonthChange = (m: number, y: number) => {
    setCalMonth(m);
    setCalYear(y);
  };

  const formattedDate = date
    ? mode === 'time'
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : mode === 'datetime'
        ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : date.toLocaleDateString()
    : '';

  const displayValue = date ? formattedDate : placeholder;

  const getPresetDate = (preset: DatePickerPreset): Date => {
    const now = new Date();
    switch (preset) {
      case 'today':
        return now;
      case 'yesterday':
        return new Date(now.setDate(now.getDate() - 1));
      case 'last7':
        return new Date(now.setDate(now.getDate() - 7));
      case 'last30':
        return new Date(now.setDate(now.getDate() - 30));
      case 'last90':
        return new Date(now.setDate(now.getDate() - 90));
      default:
        return now;
    }
  };

  const handlePresetPress = (preset: DatePickerPreset) => {
    if (!preset || disabled) return;
    const presetDate = getPresetDate(preset);
    onChange(presetDate);
    setSelectedPreset(preset);
    onPresetChange?.(preset);
  };

  const handleClear = () => {
    setSelectedPreset(null);
    onPresetChange?.(null);
  };

  const handlePressTrigger = () => {
    if (disabled) return;
    const ref = date ?? new Date();
    setPickerDraft(ref);
    setCalMonth(ref.getMonth());
    setCalYear(ref.getFullYear());
    setYearPick(false);
    setShowPicker(true);
  };

  const handleChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setSelectedPreset(null);
      onChange(selectedDate);
    }
  };

  const renderIcon = (node: React.ReactNode) => {
    if (!node) return null;
    if (
      React.isValidElement<{ size?: number | string; color?: string }>(node)
    ) {
      return React.cloneElement(node, {
        size: node.props.size ?? iconSize,
        color: node.props.color ?? iconColor,
      });
    }
    return node;
  };

  const pickerComponent = showPicker ? (
    <DateTimePicker
      value={date ?? new Date()}
      mode={mode}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      onChange={handleChange}
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
      {label && <Text style={input.label as any}>{label}</Text>}

      {/* Quick presets */}
      {presets && presets.length > 0 && (
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
              onPress={() => handlePresetPress(preset)}
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
                  textTransform: 'capitalize',
                }}
              >
                {preset
                  ?.replace('last', 'Last ')
                  .replace('today', 'Today')
                  .replace('yesterday', 'Yesterday')}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Date input field */}
      <Pressable
        onPress={handlePressTrigger}
        disabled={disabled}
        style={
          [
            input.container,
            { height: 48 },
            error && input.state.error,
            { opacity: disabled ? 0.6 : 1 },
          ] as any
        }
      >
        {icon && renderIcon(icon)}
        <Text
          style={{
            flex: 1,
            fontSize: tokens.fontSize.md,
            color: date
              ? tokens.color.text.primary
              : tokens.color.text.tertiary,
          }}
        >
          {displayValue}
        </Text>
        {/* Clear button */}
        {clearable && date && (
          <Pressable onPress={handleClear} hitSlop={8}>
            <Icon
              size={18}
              color={tokens.color.text.tertiary}
              name={'close' as any}
            />
          </Pressable>
        )}
        {/* Calendar icon indicator */}
        <Icon
          size={18}
          color={tokens.color.text.tertiary}
          name={'calendar' as any}
        />
      </Pressable>

      {error && <Text style={input.errorText as any}>{error}</Text>}

      {/* Calendar mode — custom grid in bottom-sheet-style modal */}
      {effectivePickerStyle === 'calendar' && showPicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showPicker}
          onRequestClose={() => {
            setShowPicker(false);
            setYearPick(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => {
                setShowPicker(false);
                setYearPick(false);
              }}
              accessibilityLabel="Dismiss"
            />
            <View
              style={{
                backgroundColor: tokens.color.surface.default,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              {/* Handle bar */}
              <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                <View
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: tokens.color.border.subtle,
                  }}
                />
              </View>

              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: tokens.fontSize.lg,
                    fontWeight: tokens.fontWeight.semibold,
                    color: tokens.color.text.primary,
                  }}
                >
                  {modalTitle}
                </Text>
                <Pressable
                  onPress={() => {
                    setShowPicker(false);
                    setYearPick(false);
                  }}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                >
                  <Icon
                    name={'close' as any}
                    size={22}
                    color={tokens.color.text.secondary}
                  />
                </Pressable>
              </View>

              {yearPick && mode !== 'time' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing[2],
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                    paddingBottom: tokens.spacing[3],
                  }}
                >
                  {yearOptions.map((y) => (
                    <Pressable
                      key={y}
                      onPress={() => {
                        setCalYear(y);
                        setYearPick(false);
                      }}
                      style={{
                        paddingHorizontal: tokens.spacing[3],
                        paddingVertical: tokens.spacing[2],
                        borderRadius: tokens.radius.md,
                        backgroundColor:
                          y === calYear
                            ? tokens.color.brand.subtle
                            : tokens.color.bg.muted,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: tokens.fontSize.sm,
                          fontWeight: tokens.fontWeight.semibold,
                          color:
                            y === calYear
                              ? tokens.color.brand.text
                              : tokens.color.text.primary,
                        }}
                      >
                        {y}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <>
                  {(mode === 'date' || mode === 'datetime') && (
                    <View style={{ paddingHorizontal: 16 }}>
                      <CalendarGrid
                        month={calMonth}
                        year={calYear}
                        selectedDate={pickerDraft}
                        onSelectDate={(d) => {
                          setPickerDraft((prev) => {
                            const next = new Date(prev);
                            next.setFullYear(
                              d.getFullYear(),
                              d.getMonth(),
                              d.getDate()
                            );
                            return next;
                          });
                          setSelectedPreset(null);
                        }}
                        onMonthChange={handleCalendarMonthChange}
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                        locale={locale}
                        onHeaderPress={() => setYearPick(true)}
                      />
                    </View>
                  )}

                  {(mode === 'time' || mode === 'datetime') && (
                    <TimePickerWheels
                      value={pickerDraft}
                      onChange={setPickerDraft}
                    />
                  )}

                  {(mode === 'date' || mode === 'datetime') && (
                    <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
                      <Pressable
                        onPress={() => {
                          const now = new Date();
                          setPickerDraft(now);
                          setCalMonth(now.getMonth());
                          setCalYear(now.getFullYear());
                          setSelectedPreset(null);
                        }}
                        style={{
                          alignItems: 'center',
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
                          Today
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingTop: tokens.spacing[3],
                  marginTop: tokens.spacing[2],
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderTopColor: tokens.color.border.subtle,
                  paddingBottom: Math.max(insets.bottom, tokens.spacing[3]),
                }}
              >
                <Pressable
                  onPress={() => {
                    setShowPicker(false);
                    setYearPick(false);
                  }}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                >
                  <Text
                    style={{
                      fontSize: tokens.fontSize.md,
                      color: tokens.color.text.secondary,
                      fontWeight: tokens.fontWeight.medium,
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    onChange(pickerDraft);
                    setSelectedPreset(null);
                    setShowPicker(false);
                    setYearPick(false);
                  }}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Confirm"
                >
                  <Text
                    style={{
                      fontSize: tokens.fontSize.md,
                      color: tokens.color.brand.default,
                      fontWeight: tokens.fontWeight.semibold,
                    }}
                  >
                    Confirm
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Spinner / native mode — iOS: Modal overlay */}
      {effectivePickerStyle !== 'calendar' &&
        Platform.OS === 'ios' &&
        showPicker && (
          <Modal transparent animationType="slide" visible={showPicker}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            >
              <View
                style={{
                  backgroundColor: tokens.color.surface.default,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: 16,
                    paddingTop: 12,
                  }}
                >
                  <Pressable onPress={() => setShowPicker(false)} hitSlop={12}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: tokens.color.brand.default,
                        fontWeight: tokens.fontWeight.semibold,
                      }}
                    >
                      Done
                    </Text>
                  </Pressable>
                </View>
                {pickerComponent}
              </View>
            </View>
          </Modal>
        )}

      {/* Spinner / native mode — Android: native dialog */}
      {effectivePickerStyle !== 'calendar' &&
        Platform.OS === 'android' &&
        pickerComponent}
    </View>
  );
}
