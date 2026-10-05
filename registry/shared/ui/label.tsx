import { Pressable } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface LabelProps extends TextProps {
  className?: string;
  /** Wrap in Pressable that focuses the sibling input via nativeID / onPress */
  onPress?: () => void;
}

export function Label({ className, onPress, ...props }: LabelProps) {
  const label = (
    <Text
      className={cn(
        'text-sm font-medium leading-none text-foreground',
        className
      )}
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
