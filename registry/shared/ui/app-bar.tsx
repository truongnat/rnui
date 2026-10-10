import type { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export type AppBarVariant = 'default' | 'large' | 'floating' | 'transparent';

export interface AppBarProps extends ViewProps {
  /** Leading icon or component (e.g. menu button). Overrides `onBack`. */
  leading?: ReactNode;
  /** Callback showing a circular back button when provided. */
  onBack?: () => void;
  /** Trailing action buttons / menu icons. */
  trailing?: ReactNode;
  /** Header presentation style. Default: 'default'. */
  variant?: AppBarVariant;
  /** Header title text (when using simple string title). */
  title?: string;
  /** Subtitle text under main title. */
  subtitle?: string;
  /** Auto-apply safe area top inset padding. Default: true. */
  safeArea?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Modern iOS / Material style AppBar with centered title, large heading variant,
 * floating card mode, and circular action touch wells.
 */
export function AppBar({
  leading,
  onBack,
  trailing,
  variant = 'default',
  title,
  subtitle,
  safeArea = true,
  className,
  style,
  children,
  ...props
}: AppBarProps) {
  const insets = useSafeAreaInsets();
  const iconColor = useIconColor('foreground');
  const colors = useThemeColor();

  const isLarge = variant === 'large';
  const isFloating = variant === 'floating';
  const isTransparent = variant === 'transparent';

  const backBtn = onBack ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onBack}
      hitSlop={8}
      style={({ pressed }) => [
        styles.circleBtn,
        {
          backgroundColor: pressed ? colors.accent : 'transparent',
        },
      ]}
    >
      <ChevronLeft size={22} color={iconColor} />
    </Pressable>
  ) : null;

  return (
    <View
      className={cn(
        isFloating
          ? 'mx-4 rounded-2xl border border-border bg-card/95 shadow-sm px-3 py-2'
          : isTransparent
            ? 'bg-transparent px-3'
            : 'border-b border-border bg-card px-3',
        className
      )}
      style={[
        isFloating
          ? {
              marginTop: safeArea ? insets.top + 8 : 12,
              backgroundColor: colors.card,
              borderColor: colors.border,
            }
          : [
              !isTransparent && { backgroundColor: colors.card },
              safeArea && { paddingTop: insets.top + 4 },
              { paddingBottom: isLarge ? 8 : 10 },
            ],
        style,
      ]}
      {...props}
    >
      {/* Top Navigation Row */}
      <View style={styles.topRow}>
        <View style={styles.leadingBox}>{leading ?? backBtn}</View>

        {/* Standard Centered Title */}
        {!isLarge ? (
          <View style={styles.centerBox}>
            {title ? (
              <View style={styles.titleStack}>
                <Text
                  style={[styles.standardTitle, { color: colors.foreground }]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
                {subtitle ? (
                  <Text
                    style={[
                      styles.standardSub,
                      { color: colors.mutedForeground },
                    ]}
                    numberOfLines={1}
                  >
                    {subtitle}
                  </Text>
                ) : null}
              </View>
            ) : (
              children
            )}
          </View>
        ) : (
          <View style={styles.centerBox}>{!title && children}</View>
        )}

        <View style={styles.trailingBox}>{trailing}</View>
      </View>

      {/* Large Title Row (iOS Large Heading pattern) */}
      {isLarge && (
        <View style={styles.largeTitleBox}>
          {title ? (
            <View style={styles.largeTitleStack}>
              <Text
                style={[styles.largeTitleText, { color: colors.foreground }]}
                numberOfLines={1}
              >
                {title}
              </Text>
              {subtitle ? (
                <Text
                  style={[
                    styles.largeSubText,
                    { color: colors.mutedForeground },
                  ]}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>
          ) : (
            children
          )}
        </View>
      )}
    </View>
  );
}

export function AppBarTitle({ className, style, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-base font-bold text-foreground text-center', className)}
      style={style}
      numberOfLines={1}
      {...props}
    />
  );
}

export function AppBarSubtitle({ className, style, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-xs text-muted-foreground text-center mt-0.5', className)}
      style={style}
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
  const colors = useThemeColor();
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.circleBtn,
        {
          backgroundColor: pressed ? colors.accent : 'transparent',
        },
      ]}
      className={className}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRow: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leadingBox: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  titleStack: {
    alignItems: 'center',
  },
  standardTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  standardSub: {
    fontSize: 11,
    marginTop: 1,
  },
  trailingBox: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeTitleBox: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 4,
  },
  largeTitleStack: {
    gap: 2,
  },
  largeTitleText: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  largeSubText: {
    fontSize: 13,
  },
});
