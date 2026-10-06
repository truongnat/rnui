import { useState } from 'react';
import { Pressable, ScrollView, View, type ViewProps } from 'react-native';
import { Input, type InputProps } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface AutocompleteProps extends ViewProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  /** Custom filter — defaults to case-insensitive substring. */
  filter?: (option: string, query: string) => boolean;
  emptyText?: string;
  inputProps?: Partial<
    Omit<InputProps, 'value' | 'onChangeText' | 'placeholder'>
  >;
  className?: string;
}

export function Autocomplete({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder,
  filter = (o, q) => o.toLowerCase().includes(q.toLowerCase()),
  emptyText = 'No results',
  inputProps,
  className,
  ...props
}: AutocompleteProps) {
  const [focused, setFocused] = useState(false);
  const results = value ? options.filter((o) => filter(o, value)) : [];

  return (
    <View className={cn('w-full', className)} {...props}>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...inputProps}
      />
      {focused && value.length > 0 && (
        <View className="mt-1 rounded-md border border-border bg-popover">
          <ScrollView className="max-h-48" keyboardShouldPersistTaps="handled">
            {results.length === 0 ? (
              <Text className="px-3 py-2.5 text-sm text-muted-foreground">
                {emptyText}
              </Text>
            ) : (
              results.map((opt) => (
                <Pressable
                  key={opt}
                  accessibilityRole="button"
                  onPress={() => {
                    onSelect?.(opt);
                    onChange?.(opt);
                    setFocused(false);
                  }}
                  className="px-3 py-2.5 active:bg-accent"
                >
                  <Text className="text-sm text-popover-foreground">{opt}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
