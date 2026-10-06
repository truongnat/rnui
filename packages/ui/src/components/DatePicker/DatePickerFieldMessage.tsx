import { useTheme } from '@truongdq01/headless';
import { Text } from 'react-native';
import type { DateFieldStatus } from './datePickerTypes';

export interface DatePickerFieldMessageProps {
  status?: DateFieldStatus;
  message?: string;
  helperText?: string;
}

/**
 * Renders the message shown below a date field. A validation `message`
 * (colored by `status`) takes priority over neutral `helperText`.
 */
export function DatePickerFieldMessage({
  status,
  message,
  helperText,
}: DatePickerFieldMessageProps) {
  const {
    components: { input },
  } = useTheme();

  if (status && message) {
    const style =
      status === 'error'
        ? input.errorText
        : status === 'warning'
          ? input.warningText
          : input.successText;
    return (
      <Text
        style={style}
        accessibilityRole={status === 'error' ? 'alert' : undefined}
      >
        {message}
      </Text>
    );
  }

  if (helperText) {
    return <Text style={input.helperText}>{helperText}</Text>;
  }

  return null;
}
