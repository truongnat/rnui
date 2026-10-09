import type { ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface BottomNavigationItem {
  key: string;
  label: string;
  /** Icon node — receives no props; tint it per state yourself or use `renderIcon`. */
  icon?: ReactNode;
  /** Custom per-state icon renderer. */
  renderIcon?: (active: boolean) => ReactNode;
}

export interface BottomNavigationProps extends ViewProps {
  items: BottomNavigationItem[];
  value: string;
  onValueChange?: (key: string) => void;
  className?: string;
}

export function BottomNavigation({
  items,
  value,
  onValueChange,
  className,
  ...props
}: BottomNavigationProps) {
  return (
    <View
      accessibilityRole="tablist"
      className={cn(
        'flex-row border-t border-border bg-background pb-1 pt-1',
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const active = item.key === value;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onValueChange?.(item.key)}
            className="flex-1 items-center gap-0.5 py-1.5"
          >
            {item.renderIcon ? item.renderIcon(active) : item.icon}
            <Text
              className={cn(
                'text-xs',
                active ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
