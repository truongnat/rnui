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
  /** Leading icon / custom element (e.g. menu button). Overrides `onBack`. */
  leading?: ReactNode;
  /** Back button handler. Renders a circular chevron well when passed. */
  onBack?: () => void;
  /** Trailing action buttons (e.g. search, settings, more). */
  trailing?: ReactNode;
  /** Presentation style. Default: 'default'. */
  variant?: AppBarVariant;
  /** Header title string. */
  title?: string;
  /** Subtitle string under title. */
  subtitle?: string;
  /** Alignment of title in standard mode. Default: 'center'. */
  alignTitle?: 'center' | 'left';
  /** Apply top padding for device notch / Dynamic Island. Default: true. */
  safeArea?: boolean;
  className?: string;
  children?: ReactNode;
}

export function AppBar({
  leading,
  onBack,
  trailing,
  variant = 'default',
  title,
  subtitle,
  alignTitle = 'center',
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
        styles.actionWell,
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
          ? 'mx-4 rounded-2xl border border-border bg-card shadow-sm px-3.5 py-2'
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
              { paddingBottom: isLarge ? 6 : 8 },
            ],
        style,
      ]}
      {...props}
    >
      {/* Top Navigation Row */}
      <View style={styles.topRow}>
        {/* Leading Side */}
        <View style={styles.sideContainer}>
          {leading ?? backBtn}
        </View>

        {/* Center / Inline Title */}
        {!isLarge && (
          <View
            style={[
              styles.centerContainer,
              alignTitle === 'left' && styles.leftAlignedCenter,
            ]}
          >
            {title ? (
              <View
                style={[
                  styles.titleStack,
                  alignTitle === 'left' && { alignItems: 'flex-start' },
                ]}
              >
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
        )}

        {/* Trailing Side */}
        <View style={styles.sideContainer}>
          <View style={styles.trailingRow}>{trailing}</View>
        </View>
      </View>

      {/* Large Title Section (iOS Large Heading Style) */}
      {isLarge && (
        <View style={styles.largeTitleSection}>
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
      className={cn(
        'text-base font-bold text-foreground text-center',
        className
      )}
      style={style}
      numberOfLines={1}
      {...props}
    />
  );
}

export function AppBarSubtitle({ className, style, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'text-xs text-muted-foreground text-center mt-0.5',
        className
      )}
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
  accessibilityLabel,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}) {
  const colors = useThemeColor();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionWell,
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
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sideContainer: {
    minWidth: 44,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  leftAlignedCenter: {
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  titleStack: {
    alignItems: 'center',
    justifyContent: 'center',
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
  actionWell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeTitleSection: {
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 6,
  },
  largeTitleStack: {
    gap: 2,
  },
  largeTitleText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  largeSubText: {
    fontSize: 13,
  },
});
