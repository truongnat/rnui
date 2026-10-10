import {
  isValidElement,
  type ReactNode,
} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type ViewProps,
} from 'react-native';
import { ChevronLeft, Search, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '@/components/ui/badge';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export type AppBarVariant =
  | 'default'
  | 'large'
  | 'search'
  | 'floating'
  | 'glass'
  | 'transparent';

export interface AppBarProps extends ViewProps {
  /** Leading icon / custom element (e.g. back button, avatar). Overrides `onBack`. */
  leading?: ReactNode;
  /** Back button callback. Renders a rounded chevron well when passed. */
  onBack?: () => void;
  /** Trailing action buttons (search, more, settings). */
  trailing?: ReactNode;
  /** Header visual variant. Default: 'default'. */
  variant?: AppBarVariant;
  /** Main header title. */
  title?: string;
  /** Subtitle text displayed beneath main title. */
  subtitle?: string;
  /** Alignment of title in standard mode. Default: 'center'. */
  alignTitle?: 'center' | 'left';
  /** Value for embedded search input when `variant="search"`. */
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  searchPlaceholder?: string;
  /** Auto-apply safe area top inset padding. Default: true. */
  safeArea?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Top-tier mobile App Bar engineered to iOS 18 Human Interface Guidelines.
 * Features 54px navigation height, symmetric side touch anchors, perfectly anchored
 * badges, non-clipped large display titles, and subtle Apple elevation.
 */
export function AppBar({
  leading,
  onBack,
  trailing,
  variant = 'default',
  title,
  subtitle,
  alignTitle = 'center',
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
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
  const isSearch = variant === 'search';
  const isFloating = variant === 'floating';
  const isGlass = variant === 'glass';
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
          transform: [{ scale: pressed ? 0.92 : 1 }],
        },
      ]}
    >
      <ChevronLeft size={22} color={iconColor} />
    </Pressable>
  ) : null;

  const resolvedLeading = leading ?? backBtn;

  return (
    <View
      className={cn(
        isFloating
          ? 'mx-4 rounded-2xl border border-border bg-card px-4 py-2.5'
          : isGlass
            ? 'border-b border-border bg-card/90 px-4'
            : isTransparent
              ? 'bg-transparent px-4'
              : 'border-b border-border bg-card px-4',
        className
      )}
      style={[
        isFloating
          ? [
              styles.floatingCard,
              {
                marginTop: safeArea ? insets.top + 8 : 12,
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]
          : [
              !isTransparent && { backgroundColor: colors.card },
              safeArea && { paddingTop: insets.top + 4 },
              { paddingBottom: isLarge ? 12 : 8 },
            ],
        style,
      ]}
      {...props}
    >
      {/* Top Navigation Row (54px height) */}
      <View style={styles.topRow}>
        {/* Leading Side Anchor (Min 44x44px for iOS touch target) */}
        <View style={styles.sideSlot}>{resolvedLeading}</View>

        {/* Center Section: Search Bar OR Standard Title */}
        {isSearch ? (
          <View style={styles.searchBarWrapper}>
            <View
              style={[
                styles.searchBarInner,
                {
                  backgroundColor: colors.muted,
                  borderColor: colors.border,
                },
              ]}
            >
              <Search size={16} color={colors.mutedForeground} />
              <TextInput
                value={searchValue}
                onChangeText={onSearchChange}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.mutedForeground}
                style={[styles.searchInputText, { color: colors.foreground }]}
                returnKeyType="search"
              />
              {searchValue ? (
                <Pressable
                  onPress={() => onSearchChange?.('')}
                  hitSlop={6}
                  style={styles.clearSearchBtn}
                >
                  <X size={13} color={colors.mutedForeground} />
                </Pressable>
              ) : null}
            </View>
          </View>
        ) : !isLarge ? (
          <View
            style={[
              styles.centerSlot,
              alignTitle === 'left' && styles.leftAlignSlot,
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
        ) : (
          <View style={styles.centerSlot}>{!title && children}</View>
        )}

        {/* Trailing Side Anchor (Min 44x44px) */}
        <View style={[styles.sideSlot, styles.trailingSlot]}>
          {trailing}
        </View>
      </View>

      {/* Large Title Section (iOS Large Display Heading pattern) */}
      {isLarge && (
        <View style={styles.largeTitleSection}>
          {title ? (
            <View style={styles.largeTitleStack}>
              <Text
                style={[styles.largeTitleText, { color: colors.foreground }]}
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
        'text-[17px] font-bold text-foreground text-center tracking-tight',
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

export interface AppBarActionProps {
  className?: string;
  children?: ReactNode;
  badge?: number | string | boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function AppBarAction({
  className,
  children,
  badge,
  onPress,
  accessibilityLabel,
}: AppBarActionProps) {
  const colors = useThemeColor();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionWell,
        {
          backgroundColor: pressed ? colors.accent : 'transparent',
          transform: [{ scale: pressed ? 0.92 : 1 }],
        },
      ]}
      className={className}
    >
      {/* Icon Wrapper with Corner-Anchored Badge */}
      <View style={styles.iconWrapper}>
        {children}

        {badge !== undefined && badge !== false && (
          <View style={styles.badgeAnchor}>
            {badge === true ? (
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
                <Text style={styles.badgeText}>{badge}</Text>
              </Badge>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sideSlot: {
    minWidth: 44,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingSlot: {
    justifyContent: 'flex-end',
    gap: 4,
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  leftAlignSlot: {
    alignItems: 'flex-start',
    paddingHorizontal: 2,
  },
  titleStack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.4,
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
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeAnchor: {
    position: 'absolute',
    top: -5,
    right: -8,
    zIndex: 10,
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
  searchBarWrapper: {
    flex: 1,
    paddingHorizontal: 6,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    gap: 8,
  },
  searchInputText: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    height: '100%',
  },
  clearSearchBtn: {
    padding: 2,
  },
  largeTitleSection: {
    paddingHorizontal: 2,
    paddingTop: 12,
    paddingBottom: 4,
  },
  largeTitleStack: {
    gap: 3,
  },
  largeTitleText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 34,
    paddingBottom: 2,
  },
  largeSubText: {
    fontSize: 13,
    lineHeight: 18,
  },
  floatingCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
});
