import { Check } from 'lucide-react-native';
import { useContext, useState } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface CheckboxProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Mirrors shadcn `aria-invalid` — destructive border. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  invalid,
  className,
  disabled,
  style,
  onPress,
  ...props
}: CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const colors = useThemeColor();
  const field = useContext(FormFieldContext);
  const isInvalid = invalid ?? !!field?.error;

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) {
      setUncontrolledChecked(next);
    }
    onCheckedChange?.(next);
    onPress?.(e);
  };

  const dynamicStyle: ViewStyle = {
    backgroundColor: checked ? colors.primary : colors.background,
    borderColor: isInvalid
      ? colors.destructive
      : checked
        ? colors.primary
        : colors.input || colors.border,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Pressable
      hitSlop={12}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      className={cn(
        'h-5 w-5 items-center justify-center rounded-[4px] border',
        className
      )}
      style={[
        styles.base,
        dynamicStyle,
        style as ViewStyle,
      ]}
      {...props}
    >
      {checked ? (
        <Check
          size={13}
          color={colors.primaryForeground || '#ffffff'}
          strokeWidth={3}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
