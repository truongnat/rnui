import { useTheme } from '@truongdq01/headless';
import { Text } from 'react-native';
import { DatePicker } from './DatePicker';
import type { DateInputProps } from './datePickerTypes';

export type { DateInputProps } from './datePickerTypes';

export function DateInput({
  value,
  date,
  helperText,
  presets = [],
  ...props
}: DateInputProps) {
  const {
    components: { input },
  } = useTheme();
  const selectedDate = value ?? date ?? null;

  return (
    <>
      <DatePicker
        {...props}
        date={selectedDate}
        mode="date"
        presets={presets}
      />
      {helperText && !props.error && !props.status ? (
        <Text style={input.helperText}>{helperText}</Text>
      ) : null}
    </>
  );
}
