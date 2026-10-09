import { Pressable, View, type ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface SegmentedControlProps<T extends string> extends ViewProps {
  options: readonly T[];
  value: T;
  onValueChange?: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  className,
  ...props
}: SegmentedControlProps<T>) {
  return (
    <View
      className={cn('flex-row self-start rounded-lg bg-muted p-1', className)}
      {...props}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onValueChange?.(opt)}
            className="rounded-md px-3 py-1.5"
          >
            {active && (
              <View className="absolute inset-0 rounded-md bg-background shadow-sm" />
            )}
            <Text
              className={cn(
                'text-sm font-medium',
                active ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
