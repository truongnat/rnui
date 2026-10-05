import { useState, type ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
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
  className?: string;
}

export function SpeedDial({
  icon,
  openIcon,
  actions,
  className,
  ...props
}: SpeedDialProps) {
  const [open, setOpen] = useState(false);

  return (
    <View
      className={cn('absolute bottom-6 right-4 items-end gap-3', className)}
      {...props}
    >
      {open &&
        actions.map((a) => (
          <View key={a.key} className="flex-row items-center gap-2">
            {a.label && (
              <View className="rounded-md border border-border bg-background px-2 py-1">
                <Text className="text-xs text-foreground">{a.label}</Text>
              </View>
            )}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={a.label ?? a.key}
              onPress={() => {
                a.onPress?.();
                setOpen(false);
              }}
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
        className="h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg active:opacity-90"
      >
        {open && openIcon ? openIcon : icon}
      </Pressable>
    </View>
  );
}
