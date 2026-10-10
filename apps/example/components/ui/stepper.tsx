import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import { Check } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export interface StepperProps extends ViewProps {
  steps: string[];
  /** Index of the current step (0-based). Steps before it are done. */
  current: number;
  /** Optional callback when user taps a step indicator. */
  onStepPress?: (index: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  current,
  onStepPress,
  className,
  ...props
}: StepperProps) {
  const checkColor = useIconColor('onPrimary');
  const theme = useThemeColor();

  return (
    <View className={cn('w-full flex-row items-start', className)} {...props}>
      {steps.map((label, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        const isLast = i === steps.length - 1;
        const canPress = onStepPress && (isCompleted || isActive);

        const circle = (
          <View
            className={cn(
              'h-8 w-8 items-center justify-center rounded-full border',
              !isCompleted && !isActive && 'border-border bg-background'
            )}
            style={
              isCompleted
                ? {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                    borderWidth: 1.5,
                  }
                : isActive
                  ? {
                      borderColor: theme.primary,
                      borderWidth: 2,
                      backgroundColor: theme.background,
                    }
                  : { borderWidth: 1 }
            }
          >
            {isCompleted ? (
              <Check size={14} color={checkColor} strokeWidth={3} />
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? theme.primary : theme.mutedForeground,
                }}
              >
                {i + 1}
              </Text>
            )}
          </View>
        );

        return (
          <View
            key={label}
            className={cn('items-center', !isLast && 'flex-1')}
          >
            <View className="flex-row items-center w-full">
              {canPress ? (
                <Pressable
                  onPress={() => onStepPress(i)}
                  hitSlop={6}
                  accessibilityRole="button"
                  accessibilityLabel={`Step ${i + 1}: ${label}`}
                >
                  {circle}
                </Pressable>
              ) : (
                circle
              )}

              {!isLast && (
                <View
                  style={[
                    styles.connectorLine,
                    {
                      backgroundColor: isCompleted
                        ? theme.primary
                        : theme.border,
                    },
                  ]}
                />
              )}
            </View>

            <Text
              style={[
                styles.stepLabel,
                {
                  color: isActive ? theme.foreground : theme.mutedForeground,
                  fontWeight: isActive ? '600' : '400',
                },
              ]}
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

const styles = StyleSheet.create({
  connectorLine: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 1,
  },
  stepLabel: {
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});
