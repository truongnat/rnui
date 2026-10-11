import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { AlertCircle, Info } from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export type AlertVariant = 'default' | 'destructive';

export interface AlertProps extends ViewProps {
  variant?: AlertVariant;
  /** Custom icon component or node to replace the default icon. */
  icon?: ReactNode;
  /** Hide the leading status icon completely. */
  hideIcon?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Standard shadcn/ui Alert banner with solid surface background,
 * sharp high-contrast typography, and clean borders.
 */
export function Alert({
  variant = 'default',
  icon,
  hideIcon = false,
  className,
  style,
  children,
  ...props
}: AlertProps) {
  const colors = useThemeColor();
  const isDestructive = variant === 'destructive';

  const dynamicStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: isDestructive ? colors.destructive : colors.border,
    borderWidth: 1,
    borderCurve: 'continuous',
  };

  const defaultIconColor = isDestructive
    ? colors.destructive
    : colors.foreground;
  const DefaultIcon = isDestructive ? AlertCircle : Info;

  return (
    <Animated.View
      entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
      exiting={FadeOut.duration(120).reduceMotion(ReduceMotion.System)}
      layout={LinearTransition.duration(180).reduceMotion(ReduceMotion.System)}
      accessibilityRole="alert"
      accessibilityLiveRegion={isDestructive ? 'assertive' : 'polite'}
      className={cn('flex-row items-start gap-3 rounded-xl p-4', className)}
      style={[styles.baseAlert, dynamicStyle, style]}
      {...props}
    >
      {!hideIcon && (
        <View style={styles.iconWell}>
          {icon ?? <DefaultIcon size={20} color={defaultIconColor} />}
        </View>
      )}
      <View style={styles.contentStack}>{children}</View>
    </Animated.View>
  );
}

export function AlertTitle({ className, style, ...props }: TextProps) {
  const colors = useThemeColor();

  return (
    <Text
      accessibilityRole="header"
      className={cn('text-sm font-semibold leading-5', className)}
      style={[{ color: colors.cardForeground }, style]}
      {...props}
    />
  );
}

export function AlertDescription({ className, style, ...props }: TextProps) {
  const colors = useThemeColor();

  return (
    <Text
      className={cn('text-sm leading-5', className)}
      style={[{ color: colors.mutedForeground }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  baseAlert: {
    width: '100%',
  },
  iconWell: {
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentStack: {
    flex: 1,
    gap: 4,
  },
});
