import { AlertCircle, Info } from 'lucide-react-native';
import { View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export interface AlertProps extends ViewProps {
  variant?: 'default' | 'destructive';
  className?: string;
}

export function Alert({
  variant = 'default',
  className,
  children,
  ...props
}: AlertProps) {
  const theme = useThemeColor();
  const foreground = useIconColor('foreground');
  const iconColor = variant === 'destructive' ? theme.destructive : foreground;
  const Icon = variant === 'destructive' ? AlertCircle : Info;

  return (
    <View
      accessibilityRole="alert"
      className={cn(
        'flex-row gap-3 rounded-lg border p-4',
        variant === 'destructive' ? 'border-destructive/50' : 'border-border',
        className
      )}
      {...props}
    >
      <Icon size={16} color={iconColor} style={{ marginTop: 2 }} />
      <View className="flex-1 gap-1">{children}</View>
    </View>
  );
}

export function AlertTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('font-medium leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  );
}
