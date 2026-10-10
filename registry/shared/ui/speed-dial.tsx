import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export interface SpeedDialAction {
  key: string;
  icon?: ReactNode;
  label?: string;
  onPress?: () => void;
}

export interface SpeedDialProps extends ViewProps {
  /** Main FAB content (e.g. Plus icon). */
  icon: ReactNode;
  /** Custom icon shown when open (if not using automatic 45° rotation). */
  openIcon?: ReactNode;
  actions: SpeedDialAction[];
  /** Open/close state controlled from outside. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Offset from screen edge considering device Home indicator. Default: true. */
  safeArea?: boolean;
  /** Dim the backdrop when open. Default: true. */
  overlay?: boolean;
  className?: string;
}

/**
 * Animated floating SpeedDial with spring rotation, staggered action slide-in,
 * and tactile haptic response.
 */
export function SpeedDial({
  icon,
  openIcon,
  actions,
  open: controlledOpen,
  onOpenChange,
  safeArea = true,
  overlay = true,
  className,
  style,
  ...props
}: SpeedDialProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const insets = useSafeAreaInsets();
  const colors = useThemeColor();

  const anim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const toggle = () => {
    const next = !isOpen;
    if (controlledOpen === undefined) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
  };

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  useEffect(() => {
    Animated.spring(anim, {
      toValue: isOpen ? 1 : 0,
      damping: 18,
      stiffness: 260,
      mass: 0.7,
      useNativeDriver: true,
    }).start();
  }, [isOpen, anim]);

  const fabRotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const overlayOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      {/* Backdrop overlay */}
      {overlay && isOpen && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.backdrop,
            { opacity: overlayOpacity },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFillObject} onPress={close} />
        </Animated.View>
      )}

      {/* Floating Actions Container */}
      <View
        pointerEvents="box-none"
        className={cn('absolute right-5 items-end gap-3.5', className)}
        style={[
          { bottom: safeArea ? insets.bottom + 16 : 24 },
          style,
        ]}
        {...props}
      >
        {/* Action Items */}
        {actions.map((action, idx) => {
          const count = actions.length;
          const reverseIndex = count - 1 - idx;

          // Staggered slide up & scale animation per action
          const itemTranslateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [20 * (reverseIndex + 1), 0],
          });

          const itemScale = anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.4, 0.8, 1],
          });

          const itemOpacity = anim.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [0, 0.5, 1],
          });

          return (
            <Animated.View
              key={action.key}
              style={[
                styles.actionRow,
                {
                  opacity: itemOpacity,
                  transform: [
                    { translateY: itemTranslateY },
                    { scale: itemScale },
                  ],
                },
              ]}
              pointerEvents={isOpen ? 'auto' : 'none'}
            >
              {action.label ? (
                <View
                  style={[
                    styles.actionLabelPill,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[styles.labelText, { color: colors.foreground }]}
                  >
                    {action.label}
                  </Text>
                </View>
              ) : null}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={action.label ?? action.key}
                onPress={() => {
                  action.onPress?.();
                  close();
                }}
                hitSlop={6}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                {action.icon}
              </Pressable>
            </Animated.View>
          );
        })}

        {/* Main Trigger FAB */}
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
          onPress={toggle}
          hitSlop={6}
          style={({ pressed }) => [
            styles.mainFab,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Animated.View
            style={{
              transform: openIcon ? [] : [{ rotate: fabRotation }],
            }}
          >
            {isOpen && openIcon ? openIcon : icon}
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 40,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionLabelPill: {
    borderRadius: 9999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  mainFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
});
