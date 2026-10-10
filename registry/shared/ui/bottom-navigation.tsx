import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export interface BottomNavigationItem {
  key: string;
  label: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  badge?: number | string | boolean;
  disabled?: boolean;
}

export type BottomNavigationVariant = 'default' | 'floating';

export interface BottomNavigationProps extends ViewProps {
  items: BottomNavigationItem[];
  value: string;
  onValueChange?: (key: string) => void;
  variant?: BottomNavigationVariant;
  /** Add bottom padding for the device Home Indicator. Default: true. */
  safeArea?: boolean;
  className?: string;
}

interface IconWithColorProps {
  color?: string;
}

function NavItemButton({
  item,
  active,
  tint,
  colors,
  onPress,
}: {
  item: BottomNavigationItem;
  active: boolean;
  tint: string;
  colors: Record<string, string>;
  onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: active ? 1 : 0,
      damping: 18,
      stiffness: 300,
      mass: 0.6,
      useNativeDriver: true,
    }).start();
  }, [active, anim]);

  const rawIcon = active && item.activeIcon ? item.activeIcon : item.icon;

  let iconElement: ReactNode = rawIcon;
  if (isValidElement<IconWithColorProps>(rawIcon)) {
    const propsObj: unknown = rawIcon.props;
    const explicitColor =
      propsObj &&
      typeof propsObj === 'object' &&
      'color' in propsObj &&
      typeof propsObj.color === 'string'
        ? propsObj.color
        : tint;
    iconElement = cloneElement(rawIcon, { color: explicitColor });
  }

  const capsuleScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1],
  });

  const capsuleOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const iconScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{
        selected: active,
        disabled: !!item.disabled,
      }}
      disabled={item.disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.navItem,
        pressed && { opacity: 0.7 },
      ]}
    >
      {/* Animated Capsule Box */}
      <View style={styles.iconContainer}>
        {/* Animated Background Pill */}
        <Animated.View
          style={[
            styles.animatedCapsule,
            {
              backgroundColor: `${colors.primary}18`,
              opacity: capsuleOpacity,
              transform: [{ scale: capsuleScale }],
            },
          ]}
        />

        {/* Animated Icon */}
        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          {iconElement}
        </Animated.View>

        {/* Notification Badge */}
        {item.badge !== undefined && item.badge !== false && (
          <View style={styles.badgeAnchor}>
            {item.badge === true ? (
              <View
                style={[
                  styles.dotBadge,
                  { backgroundColor: colors.destructive },
                ]}
              />
            ) : (
              <Badge
                variant="destructive"
                className="px-1.5 py-0 min-w-4 h-4 rounded-full"
              >
                <Text style={styles.badgeText}>{item.badge}</Text>
              </Badge>
            )}
          </View>
        )}
      </View>

      {/* Label */}
      <Text
        style={[
          styles.itemLabel,
          {
            color: active ? colors.foreground : colors.mutedForeground,
            fontWeight: active ? '700' : '500',
          },
        ]}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

/**
 * Animated Bottom Navigation Bar with spring capsule highlights, floating island variant,
 * and badge counters.
 */
export function BottomNavigation({
  items,
  value,
  onValueChange,
  variant = 'default',
  safeArea = true,
  className,
  style,
  ...props
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColor();

  const isFloating = variant === 'floating';

  return (
    <View
      accessibilityRole="tablist"
      className={cn(
        isFloating
          ? 'mx-4 rounded-full border border-border bg-card p-2 shadow-xl'
          : 'border-t border-border bg-card pt-2 px-1',
        className
      )}
      style={[
        isFloating
          ? [
              styles.floatingBar,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                bottom: safeArea ? insets.bottom + 12 : 16,
              },
            ]
          : [
              styles.standardBar,
              {
                backgroundColor: colors.card,
                paddingBottom: safeArea ? Math.max(insets.bottom, 10) : 10,
              },
            ],
        style,
      ]}
      {...props}
    >
      {items.map((item) => {
        const active = item.key === value;
        const tint = active ? colors.primary : colors.mutedForeground;

        return (
          <NavItemButton
            key={item.key}
            item={item}
            active={active}
            tint={tint}
            colors={colors}
            onPress={() => onValueChange?.(item.key)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  standardBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: 56,
  },
  floatingBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  navItem: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 3,
  },
  iconContainer: {
    position: 'relative',
    width: 52,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedCapsule: {
    position: 'absolute',
    width: 52,
    height: 30,
    borderRadius: 15,
  },
  badgeAnchor: {
    position: 'absolute',
    top: -3,
    right: 4,
  },
  dotBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 12,
  },
  itemLabel: {
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
