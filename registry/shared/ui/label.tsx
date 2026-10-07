import { useContext } from 'react';
import { Pressable } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface LabelProps extends TextProps {
  className?: string;
  /** Dims the label — mirrors shadcn peer-disabled:opacity-50. */
  disabled?: boolean;
  /** Wrap in Pressable that focuses the sibling input via nativeID / onPress */
  onPress?: () => void;
}

export function Label({ className, disabled, onPress, ...props }: LabelProps) {
  const field = useContext(FormFieldContext);
  const theme = useThemeColor();
  const label = (
    <Text
      className={cn(
        'text-sm font-medium leading-none text-foreground',
        disabled && 'opacity-50',
        className
      )}
      style={field?.error ? { color: theme.destructive } : undefined}
      {...props}
    />
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="none">
        {label}
      </Pressable>
    );
  }
  return label;
}
