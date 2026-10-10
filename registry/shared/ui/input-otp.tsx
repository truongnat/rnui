import { useContext, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface InputOTPProps extends ViewProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Fired once all slots are filled. */
  onComplete?: (value: string) => void;
  secure?: boolean;
  /** Mirrors shadcn `aria-invalid` — destructive slot borders. Auto-detected from FormField error. */
  invalid?: boolean;
  /** Prevents input focus and dims slots. */
  disabled?: boolean;
  autoFocus?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  className?: string;
  slotClassName?: string;
}

export function InputOTP({
  length = 6,
  value = '',
  onChange,
  onComplete,
  secure = false,
  invalid,
  disabled = false,
  autoFocus = false,
  keyboardType = 'number-pad',
  className,
  slotClassName,
  ...props
}: InputOTPProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const isInvalid = invalid ?? !!field?.error;

  const handleChange = (text: string) => {
    const next = text.replace(/[^0-9a-zA-Z]/g, '').slice(0, length);
    onChange?.(next);
    if (next.length === length) {
      onComplete?.(next);
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={() => inputRef.current?.focus()}
      accessibilityRole="none"
      accessibilityState={{ disabled }}
      className={cn('relative', disabled && 'opacity-50')}
    >
      <View
        className={cn('flex-row items-center gap-2', className)}
        {...props}
      >
        {Array.from({ length }).map((_, i) => {
          const char = value[i] ?? '';
          const isActive =
            focused && !disabled && i === Math.min(value.length, length - 1);
          return (
            <View
              // biome-ignore lint/suspicious/noArrayIndexKey: slots are positional by design
              key={i}
              className={cn(
                'h-12 w-10 items-center justify-center rounded-lg border border-input bg-background',
                slotClassName
              )}
              style={[
                { borderCurve: 'continuous' },
                isActive && {
                  borderColor: colors.ring,
                  borderWidth: 1.5,
                },
                isInvalid && { borderColor: colors.destructive },
              ]}
            >
              <Text className="text-lg font-semibold text-foreground">
                {secure && char ? '•' : char}
              </Text>
            </View>
          );
        })}

        {/* Hidden full-area input wired for iOS & Android SMS Auto-Fill */}
        <TextInput
          ref={inputRef}
          value={value}
          editable={!disabled}
          autoFocus={autoFocus}
          maxLength={length}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          textContentType="oneTimeCode"
          accessibilityLabel="One-time verification code"
          style={styles.hiddenInput}
          caretHidden
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
});
