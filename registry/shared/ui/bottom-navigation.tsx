import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
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

export type BottomNavigationVariant = 'default' | 'floating' | 'pills';

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

/**
 * Modern Bottom Navigation Bar with iOS capsule highlights, floating island variant,
 * and notification badges.
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
          ? 'mx-4 self-center rounded-full border border-border bg-card/95 p-1.5 shadow-lg'
          : 'flex-row border-t border-border bg-card pt-1.5 px-3',
        className
      )}
      style={[
        isFloating
          ? [
              styles.floatingContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                bottom: safeArea ? insets.bottom + 12 : 16,
              },
            ]
          : safeArea && {
              paddingBottom: Math.max(insets.bottom, 10),
              backgroundColor: colors.card,
            },
        style,
      ]}
      {...props}
    >
      <View
        style={[
          styles.rowWrapper,
          isFloating && styles.floatingRowWrapper,
        ]}
      >
        {items.map((item) => {
          const active = item.key === value;
          const tint = active ? colors.primary : colors.mutedForeground;
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

          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityState={{
                selected: active,
                disabled: !!item.disabled,
              }}
              disabled={item.disabled}
              onPress={() => onValueChange?.(item.key)}
              style={({ pressed }) => [
                styles.itemPressable,
                pressed && { opacity: 0.75 },
              ]}
            >
              {/* Icon with Active Capsule Highlight */}
              <View
                style={[
                  styles.iconCapsule,
                  active && {
                    backgroundColor: `${colors.primary}16`,
                  },
                ]}
              >
                {iconElement}

                {/* Badge Indicator */}
                {item.badge !== undefined && item.badge !== false && (
                  <View style={styles.badgeWrapper}>
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
                  styles.label,
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
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  floatingRowWrapper: {
    paddingHorizontal: 6,
  },
  floatingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '92%',
    maxWidth: 420,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  itemPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 4,
    minHeight: 48,
  },
  iconCapsule: {
    position: 'relative',
    width: 48,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeWrapper: {
    position: 'absolute',
    top: -2,
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
  label: {
    fontSize: 11,
    letterSpacing: -0.2,
  },
});
