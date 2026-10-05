import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface ProgressProps extends ViewProps {
  /** 0–100 */
  value?: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({
  value = 0,
  className,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
    >
      <View
        className={cn('h-full bg-primary', indicatorClassName)}
        style={{ width: `${pct}%` }}
      />
    </View>
  );
}
