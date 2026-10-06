import { View, type ViewProps } from 'react-native';
import { Check } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export interface StepperProps extends ViewProps {
  steps: string[];
  /** Index of the current step (0-based). Steps before it are done. */
  current: number;
  className?: string;
}

export function Stepper({ steps, current, className, ...props }: StepperProps) {
  const checkColor = useIconColor('onPrimary');
  return (
    <View className={cn('w-full flex-row', className)} {...props}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;
        return (
          <View key={label} className={cn('items-center', !last && 'flex-1')}>
            <View className="flex-row items-center">
              <View
                className={cn(
                  'h-7 w-7 items-center justify-center rounded-full border',
                  done && 'border-primary bg-primary',
                  active && 'border-primary',
                  !done && !active && 'border-border'
                )}
              >
                {done ? (
                  <Check size={14} color={checkColor} strokeWidth={3} />
                ) : (
                  <Text
                    className={cn(
                      'text-xs font-medium',
                      active ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
              {!last && (
                <View
                  className={cn(
                    'h-px flex-1',
                    done ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </View>
            <Text
              className={cn(
                'mt-1 text-xs',
                active ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
