import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { cn, spacingScale, useThemeColor } from '@/lib/utils';

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
  /** Keep floating actions inside screen safe-area edges. Disable in a parent-owned safe area. Default: true. */
  safeArea?: boolean;
  /** Dim the backdrop when open. Default: false. */
  overlay?: boolean;
  className?: string;
}

/**
 * Animated floating SpeedDial with spring rotation, staggered action slide-in,
 * and concrete native styling.
 */
export function SpeedDial({
  icon,
  openIcon,
  actions,
  open: controlledOpen,
  onOpenChange,
  safeArea = true,
  overlay = false,
  className,
  style,
  ...props
}: SpeedDialProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const bottomOffset = safeArea
    ? insets.bottom + spacingScale.md
    : spacingScale.md;
  const callerBottom = StyleSheet.flatten(style)?.bottom;
  const actionMaxHeight = safeArea
    ? Math.max(
        0,
        frame.height -
          insets.top -
          spacingScale.md -
          (typeof callerBottom === 'number' ? callerBottom : bottomOffset) -
          styles.mainFab.height -
          (spacingScale.sm + spacingScale.xs)
      )
    : undefined;
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

  const actionItems = actions.map((action, idx) => {
    const reverseIndex = actions.length - 1 - idx;
    const itemTranslateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [22 * (reverseIndex + 1), 0],
    });
    const itemScale = anim.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0.3, 0.75, 1],
    });
    const itemOpacity = anim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 0.4, 1],
    });

    return (
      <Animated.View
        key={action.key}
        style={[
          styles.actionRow,
          {
            opacity: itemOpacity,
            transform: [{ translateY: itemTranslateY }, { scale: itemScale }],
          },
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}
        accessibilityElementsHidden={!isOpen}
        importantForAccessibility={isOpen ? 'auto' : 'no-hide-descendants'}
      >
        {action.label ? (
          <View
            style={[
              styles.actionLabelPill,
              {
                backgroundColor: colors.card || '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.labelText, { color: colors.foreground }]}>
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
          hitSlop={8}
          style={[
            styles.actionButton,
            {
              backgroundColor: colors.card || '#ffffff',
              borderColor: colors.border,
            },
          ]}
        >
          {action.icon}
        </Pressable>
      </Animated.View>
    );
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
        className={cn('absolute right-4 bottom-4 items-end gap-3', className)}
        style={[
          safeArea && {
            bottom: bottomOffset,
            left: insets.left + spacingScale.md,
            right: insets.right + spacingScale.md,
          },
          style,
        ]}
        {...props}
      >
        {/* Action Items */}
        {actions.length > 0 &&
          (safeArea ? (
            <ScrollView
              pointerEvents={isOpen ? 'auto' : 'none'}
              style={[styles.actionsScroll, { maxHeight: actionMaxHeight }]}
              contentContainerStyle={styles.actionsContent}
              showsVerticalScrollIndicator={false}
            >
              {actionItems}
            </ScrollView>
          ) : (
            <View style={styles.actionsContent}>{actionItems}</View>
          ))}

        {/* Main Trigger FAB with Guaranteed Solid Dimensions */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={props.accessibilityLabel ?? 'Toggle actions'}
          accessibilityState={{ expanded: isOpen }}
          onPress={toggle}
          hitSlop={8}
          style={[
            styles.mainFab,
            {
              backgroundColor: colors.primary,
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
  actionsScroll: {
    flexGrow: 0,
    flexShrink: 1,
    width: '100%',
  },
  actionsContent: {
    alignItems: 'flex-end',
    gap: spacingScale.sm + spacingScale.xs,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '100%',
  },
  actionLabelPill: {
    flexShrink: 1,
    borderRadius: 9999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
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
    fontWeight: '700',
  },
  actionButton: {
    flexShrink: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
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
        shadowOpacity: 0.22,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
});
