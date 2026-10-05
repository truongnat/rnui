import { useRef, useState } from 'react';
import { Pressable, TextInput, View, type ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface InputOTPProps extends ViewProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Fired once all slots are filled. */
  onComplete?: (value: string) => void;
  secure?: boolean;
  className?: string;
  slotClassName?: string;
}

export function InputOTP({
  length = 6,
  value = '',
  onChange,
  onComplete,
  secure = false,
  className,
  slotClassName,
  ...props
}: InputOTPProps) {
  const input = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (text: string) => {
    const next = text.replace(/[^0-9a-zA-Z]/g, '').slice(0, length);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  };

  return (
    <Pressable onPress={() => input.current?.focus()}>
      <View className={cn('flex-row items-center gap-2', className)} {...props}>
        {Array.from({ length }).map((_, i) => {
          const char = value[i] ?? '';
          const isActive = focused && i === Math.min(value.length, length - 1);
          return (
            <View
              // biome-ignore lint/suspicious/noArrayIndexKey: slots are positional by design
              key={i}
              className={cn(
                'h-12 w-10 items-center justify-center rounded-md border border-input bg-background',
                isActive && 'border-ring',
                slotClassName
              )}
            >
              <Text className="text-lg font-medium text-foreground">
                {secure && char ? '•' : char}
              </Text>
            </View>
          );
        })}
        <TextInput
          ref={input}
          value={value}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="number-pad"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          style={{
            position: 'absolute',
            opacity: 0,
            width: 1,
            height: 1,
          }}
        />
      </View>
    </Pressable>
  );
}
