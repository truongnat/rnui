import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface SpeedDialAction {
  key: string;
  icon?: ReactNode;
  label?: string;
  onPress?: () => void;
}

export interface SpeedDialProps extends ViewProps {
  /** Main FAB content (icon node). */
  icon: ReactNode;
  /** Icon shown when open (e.g. X). Defaults to `icon`. */
  openIcon?: ReactNode;
  actions: SpeedDialAction[];
  /** Offset from screen edge considering Home indicator. Default true. */
  safeArea?: boolean;
  className?: string;
}

export function SpeedDial({
  icon,
  openIcon,
  actions,
  safeArea = true,
  className,
  style,
  ...props
}: SpeedDialProps) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn('absolute right-5 items-end gap-3', className)}
      style={[
        { bottom: safeArea ? insets.bottom + 16 : 24 },
        style,
      ]}
      {...props}
    >
      {open &&
        actions.map((a) => (
          <View key={a.key} className="flex-row items-center gap-2">
            {a.label && (
              <View className="rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-sm">
                <Text className="text-xs font-medium text-foreground">
                  {a.label}
                </Text>
              </View>
            )}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={a.label ?? a.key}
              onPress={() => {
                a.onPress?.();
                setOpen(false);
              }}
              hitSlop={6}
              className="h-11 w-11 items-center justify-center rounded-full bg-secondary shadow-md active:opacity-80"
            >
              {a.icon}
            </Pressable>
          </View>
        ))}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((v) => !v)}
        hitSlop={6}
        className="h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg active:opacity-90"
      >
        {open && openIcon ? openIcon : icon}
      </Pressable>
    </View>
  );
}
