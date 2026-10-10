import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { AlertCircle, Info } from 'lucide-react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export type AlertVariant = 'default' | 'destructive';

const AlertContext = createContext<{ variant: AlertVariant }>({
  variant: 'default',
});

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
    <AlertContext.Provider value={{ variant }}>
      <View
        accessibilityRole="alert"
        className={cn('flex-row items-start gap-3 rounded-xl p-4', className)}
        style={[styles.baseAlert, dynamicStyle, style]}
        {...props}
      >
        {!hideIcon && (
          <View style={styles.iconWell}>
            {icon ?? <DefaultIcon size={18} color={defaultIconColor} />}
          </View>
        )}
        <View style={styles.contentStack}>{children}</View>
      </View>
    </AlertContext.Provider>
  );
}

export function AlertTitle({ className, style, ...props }: TextProps) {
  const { variant } = useContext(AlertContext);
  const colors = useThemeColor();
  const isDestructive = variant === 'destructive';

  return (
    <Text
      className={cn(
        'text-[15px] font-semibold tracking-tight leading-5',
        isDestructive ? 'text-destructive' : 'text-foreground',
        className
      )}
      style={[isDestructive && { color: colors.destructive }, style]}
      numberOfLines={1}
      {...props}
    />
  );
}

export function AlertDescription({ className, style, ...props }: TextProps) {
  const { variant } = useContext(AlertContext);
  const colors = useThemeColor();
  const isDestructive = variant === 'destructive';

  return (
    <Text
      className={cn(
        'text-[13px] leading-5',
        isDestructive ? 'text-destructive/90' : 'text-muted-foreground',
        className
      )}
      style={[
        isDestructive && { color: colors.destructive },
        style,
      ]}
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
    gap: 2,
  },
});
