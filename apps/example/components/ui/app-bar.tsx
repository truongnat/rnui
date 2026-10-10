import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export interface AppBarProps extends ViewProps {
  /** Rendered on the leading edge (overrides `onBack`). */
  leading?: ReactNode;
  /** Shows a back chevron button when provided. */
  onBack?: () => void;
  trailing?: ReactNode;
  /** Apply top padding for the notch / Dynamic Island. Default: true. */
  safeArea?: boolean;
  className?: string;
  children?: ReactNode;
}

export function AppBar({
  leading,
  onBack,
  trailing,
  safeArea = true,
  className,
  style,
  children,
  ...props
}: AppBarProps) {
  const insets = useSafeAreaInsets();
  const iconColor = useIconColor('foreground');

  return (
    <View
      className={cn(
        'border-b border-border bg-background px-3 pb-2.5',
        className
      )}
      style={[
        safeArea && { paddingTop: insets.top + 6 },
        style,
      ]}
      {...props}
    >
      <View style={styles.barRow}>
        <View style={styles.leadingContainer}>
          {leading ??
            (onBack && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={onBack}
                hitSlop={10}
                className="rounded-full p-2 active:bg-accent"
              >
                <ChevronLeft size={22} color={iconColor} />
              </Pressable>
            ))}
        </View>
        <View style={styles.centerContainer}>{children}</View>
        <View style={styles.trailingContainer}>{trailing}</View>
      </View>
    </View>
  );
}

export function AppBarTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-base font-semibold text-foreground text-center', className)}
      numberOfLines={1}
      {...props}
    />
  );
}

export function AppBarSubtitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-xs text-muted-foreground text-center', className)}
      numberOfLines={1}
      {...props}
    />
  );
}

export function AppBarAction({
  className,
  children,
  onPress,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      className={cn('rounded-full p-2 active:bg-accent', className)}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leadingContainer: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  trailingContainer: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
