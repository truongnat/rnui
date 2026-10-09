import {
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

const tabBarStyles = tv({
  slots: {
    container: 'flex-row border-t border-border bg-background px-2 pt-1',
    item: 'flex-1 items-center justify-center gap-0.5 py-1.5',
    label: 'text-xs font-medium',
  },
});

export interface TabBarItem {
  key: string;
  label: string;
  /** Icon element — `color` is injected when unset (active foreground / inactive muted). */
  icon?: ReactNode;
  /** Rendered instead of `icon` while the item is active. */
  activeIcon?: ReactNode;
  /** Badge count/text; `true` renders a plain dot. */
  badge?: number | string | boolean;
  disabled?: boolean;
}

export interface TabBarProps extends ViewProps {
  items: TabBarItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (key: string) => void;
  /** Pad the bottom edge for the home indicator. Default true. */
  safeArea?: boolean;
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
}

export function TabBar({
  items,
  value: controlled,
  defaultValue,
  onValueChange,
  safeArea = true,
  className,
  itemClassName,
  labelClassName,
  style,
  ...props
}: TabBarProps) {
  const { container, item, label } = tabBarStyles();
  const insets = useSafeAreaInsets();
  const colors = useThemeColor();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled !== undefined ? controlled : uncontrolled;

  const select = (key: string) => {
    if (controlled === undefined) setUncontrolled(key);
    onValueChange?.(key);
  };

  return (
    <View
      accessibilityRole="tablist"
      className={cn(container(), className)}
      style={[safeArea && { paddingBottom: insets.bottom }, style]}
      {...props}
    >
      {items.map((entry) => {
        const active = entry.key === value;
        const tint = active ? colors.foreground : colors.mutedForeground;
        const icon = active && entry.activeIcon ? entry.activeIcon : entry.icon;

        return (
          <Pressable
            key={entry.key}
            accessibilityRole="tab"
            accessibilityState={{
              selected: active,
              disabled: !!entry.disabled,
            }}
            disabled={entry.disabled}
            onPress={() => select(entry.key)}
            className={cn(
              item(),
              entry.disabled && 'opacity-50',
              itemClassName
            )}
          >
            <View>
              {isValidElement<{ color?: string }>(icon)
                ? cloneElement(icon as ReactElement<{ color?: string }>, {
                    color: icon.props.color ?? tint,
                  })
                : icon}
              {entry.badge !== undefined && entry.badge !== false && (
                <View className="absolute -right-2 -top-1">
                  {entry.badge === true ? (
                    <View
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: colors.destructive }}
                    />
                  ) : (
                    <Badge variant="destructive" className="px-1.5 py-0">
                      {entry.badge}
                    </Badge>
                  )}
                </View>
              )}
            </View>
            <Text
              className={cn(label(), labelClassName)}
              style={{ color: tint }}
            >
              {entry.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
