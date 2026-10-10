import { useContext } from 'react';
import {
  Pressable,
  StyleSheet,
  Text as RNText,
  type TextStyle,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface LabelProps extends TextProps {
  className?: string;
  /** Appends a red asterisk `*` indicating the field is required. */
  required?: boolean;
  /** Appends a muted `(Optional)` text indicating the field is optional. */
  optional?: boolean;
  /** Dims the label — mirrors shadcn peer-disabled:opacity-50. */
  disabled?: boolean;
  /** Wrap in Pressable that focuses the sibling input via onPress */
  onPress?: () => void;
}

export function Label({
  className,
  required = false,
  optional = false,
  disabled = false,
  onPress,
  children,
  style,
  ...props
}: LabelProps) {
  const field = useContext(FormFieldContext);
  const theme = useThemeColor();
  const hasError = !!field?.error;

  const labelContent = (
    <Text
      className={cn(
        'text-sm font-semibold leading-5 text-foreground',
        disabled && 'opacity-50',
        className
      )}
      style={[
        style,
        hasError && { color: theme.destructive },
      ]}
      accessibilityRole="text"
      {...props}
    >
      {children}
      {required ? (
        <RNText
          style={[styles.requiredStar, { color: theme.destructive }]}
          accessibilityLabel="required"
        >
          {' *'}
        </RNText>
      ) : null}
      {optional ? (
        <RNText style={[styles.optionalText, { color: theme.mutedForeground }]}>
          {' (Optional)'}
        </RNText>
      ) : null}
    </Text>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        hitSlop={8}
        accessibilityRole="button"
        style={styles.pressableWrapper}
      >
        {labelContent}
      </Pressable>
    );
  }

  return labelContent;
}

const styles = StyleSheet.create({
  requiredStar: {
    fontWeight: '700',
  },
  optionalText: {
    fontSize: 12,
    fontWeight: '400',
  },
  pressableWrapper: {
    alignSelf: 'flex-start',
  },
});
