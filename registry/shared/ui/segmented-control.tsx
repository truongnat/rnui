import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export interface SegmentedControlProps<T extends string> extends ViewProps {
  options: readonly T[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  className?: string;
  disabled?: boolean;
}

const PAD = 3;

export function SegmentedControl<T extends string>({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  disabled = false,
  style,
  ...props
}: SegmentedControlProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(
    defaultValue ?? options[0]
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [containerWidth, setContainerWidth] = useState(0);
  const colors = useThemeColor();

  const activeIndex = Math.max(0, options.indexOf(value));
  const segmentWidth =
    containerWidth > 0
      ? (containerWidth - PAD * 2) / options.length
      : 0;

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (segmentWidth > 0) {
      Animated.spring(translateX, {
        toValue: activeIndex * segmentWidth,
        damping: 24,
        stiffness: 280,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [activeIndex, segmentWidth, translateX]);

  const handleSelect = (opt: T) => {
    if (disabled || opt === value) return;
    if (!isControlled) {
      setUncontrolledValue(opt);
    }
    onValueChange?.(opt);
  };

  return (
    <View
      className={cn(
        'relative flex-row self-stretch rounded-xl bg-muted p-[3px]',
        disabled && 'opacity-50',
        className
      )}
      style={style}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      accessibilityRole="radiogroup"
      {...props}
    >
      {/* Sliding Active Indicator Pill */}
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            {
              width: segmentWidth,
              backgroundColor: colors.card || '#ffffff',
              borderColor: colors.border,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {/* Segment Option Buttons */}
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            accessibilityRole="radio"
            accessibilityState={{ selected: active, disabled }}
            disabled={disabled}
            onPress={() => handleSelect(opt)}
            style={styles.segmentButton}
          >
            <Text
              style={[
                styles.segmentText,
                {
                  color: active
                    ? colors.foreground
                    : colors.mutedForeground,
                  fontWeight: active ? '600' : '500',
                },
              ]}
              numberOfLines={1}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: PAD,
    bottom: PAD,
    left: PAD,
    borderRadius: 9,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 1.5,
      },
      default: {},
    }),
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  segmentText: {
    fontSize: 12,
  },
});
