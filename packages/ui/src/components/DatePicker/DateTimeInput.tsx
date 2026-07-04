import { useTheme } from '@truongdq01/headless';
import { Text } from 'react-native';
import { DatePicker } from './DatePicker';
import type { DateTimeInputProps } from './datePickerTypes';

export type { DateTimeInputProps } from './datePickerTypes';

export function DateTimeInput({
  value,
  date,
  helperText,
  presets = [],
  ...props
}: DateTimeInputProps) {
  const {
    components: { input },
  } = useTheme();
  const selectedDate = value ?? date ?? null;

  return (
    <>
      <DatePicker
        {...props}
        date={selectedDate}
        mode="datetime"
        presets={presets}
      />
      {helperText && !props.error && !props.status ? (
        <Text style={input.helperText}>{helperText}</Text>
      ) : null}
    </>
  );
}
