import {
  createContext,
  useContext,
  type ComponentType,
  type ReactNode,
} from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

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

const VARIANT_ICONS: Record<
  AlertVariant,
  ComponentType<{ size?: number; color?: string }>
> = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
};

/**
 * Contextual Alert card with solid surface backgrounds, theme-safe status tints,
 * and automatic icon & title color wiring.
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

  const getVariantStyles = (): {
    bg: string;
    border: string;
    accent: string;
  } => {
    switch (variant) {
      case 'destructive':
        return {
          bg: `${colors.destructive}12`,
          border: `${colors.destructive}38`,
          accent: colors.destructive,
        };
      case 'success':
        return {
          bg: '#16a34a14',
          border: '#16a34a38',
          accent: '#16a34a',
        };
      case 'warning':
        return {
          bg: '#f59e0b14',
          border: '#f59e0b38',
          accent: '#f59e0b',
        };
      case 'default':
      default:
        return {
          bg: colors.card,
          border: colors.border,
          accent: colors.primary,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const DefaultIconComponent = VARIANT_ICONS[variant];

  const dynamicStyle: ViewStyle = {
    backgroundColor: variantStyles.bg,
    borderColor: variantStyles.border,
    borderCurve: 'continuous',
  };

  return (
    <AlertContext.Provider value={{ variant }}>
      <View
        accessibilityRole="alert"
        className={cn('flex-row items-start gap-3 rounded-xl border p-4 shadow-sm', className)}
        style={[dynamicStyle, style]}
        {...props}
      >
        {!hideIcon && (
          <View style={styles.iconWell}>
            {icon ?? (
              <DefaultIconComponent size={18} color={variantStyles.accent} />
            )}
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
        'text-[15px] font-bold tracking-tight leading-5',
        isDestructive ? 'text-destructive' : 'text-foreground',
        className
      )}
      style={[
        isDestructive && { color: colors.destructive },
        style,
      ]}
      numberOfLines={1}
      {...props}
    />
  );
}

export function AlertDescription({ className, style, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-[13px] leading-5 text-muted-foreground mt-0.5', className)}
      style={style}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
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
