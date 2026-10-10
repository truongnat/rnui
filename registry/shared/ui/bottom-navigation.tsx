import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
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

export interface BottomNavigationProps extends ViewProps {
  items: BottomNavigationItem[];
  value: string;
  onValueChange?: (key: string) => void;
  /** Add bottom padding for the device Home Indicator. Default: true. */
  safeArea?: boolean;
  className?: string;
}

export function BottomNavigation({
  items,
  value,
  onValueChange,
  safeArea = true,
  className,
  style,
  ...props
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColor();

  return (
    <View
      accessibilityRole="tablist"
      className={cn(
        'flex-row border-t border-border bg-background pt-1.5 px-2',
        className
      )}
      style={[
        safeArea && { paddingBottom: Math.max(insets.bottom, 8) },
        style,
      ]}
      {...props}
    >
      {items.map((item) => {
        const active = item.key === value;
        const tint = active ? colors.foreground : colors.mutedForeground;
        const icon = active && item.activeIcon ? item.activeIcon : item.icon;

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
            className={cn(
              'flex-1 items-center justify-center gap-0.5 py-1',
              item.disabled && 'opacity-50'
            )}
          >
            <View style={styles.iconWrapper}>
              {icon}
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
                    <Badge variant="destructive" className="px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </View>
              )}
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: tint,
                  fontWeight: active ? '600' : '500',
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
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 24,
  },
  badgeWrapper: {
    position: 'absolute',
    top: -3,
    right: -8,
  },
  dotBadge: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  label: {
    fontSize: 11,
  },
});
