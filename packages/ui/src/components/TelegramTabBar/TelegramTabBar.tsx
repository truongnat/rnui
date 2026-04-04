import React, { createContext, useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import { useTokens, useComponentTokens } from '@truongdq01/headless';
import { Badge } from '../Badge';

// ─── Types ────────────────────────────────────────────────────────

export interface TelegramTabBarProps<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  children?: React.ReactNode;
  glassEffect?: boolean;
}

export interface TelegramTabProps<T = string> {
  value: T;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number | string | boolean;
  disabled?: boolean;
}

interface TabBarContextValue<T = string> {
  value?: T;
  isSelected: (value: T) => boolean;
  getItemProps: (value: T, disabled?: boolean) => { onPress?: () => void };
}

const TabBarContext = createContext<TabBarContextValue<any> | null>(null);

// ─── Telegram Tab Bar ─────────────────────────────────────────────

export function TelegramTabBar<T = string>({
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  glassEffect = true,
}: TelegramTabBarProps<T>) {
  const tokens = useTokens();
  const { bottomNavigation } = useComponentTokens();

  const [internalValue, setInternalValue] = React.useState<T | undefined>(
    defaultValue
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const isSelected = (itemValue: T) => value === itemValue;

  const getItemProps = (itemValue: T, disabled?: boolean) => ({
    onPress: disabled
      ? undefined
      : () => {
          if (controlledValue === undefined) setInternalValue(itemValue);
          onChange?.(itemValue);
        },
  });

  return (
    <TabBarContext.Provider value={{ value, isSelected, getItemProps }}>
      <View
        style={[
          styles.container,
          glassEffect && {
            backgroundColor: tokens.color.surface.glass,
            borderTopColor: tokens.color.surface.glassBorder,
            borderTopWidth: 0.5,
          },
          !glassEffect && {
            backgroundColor: tokens.color.surface.default,
            borderTopColor: tokens.color.border.subtle,
            borderTopWidth: 1,
          },
        ]}
      >
        {children}
      </View>
    </TabBarContext.Provider>
  );
}

// ─── Telegram Tab Item ────────────────────────────────────────────

export function TelegramTab<T = string>({
  value,
  label,
  icon,
  activeIcon,
  badge,
  disabled = false,
}: TelegramTabProps<T>) {
  const tokens = useTokens();
  const ctx = useContext(
    TabBarContext as React.Context<TabBarContextValue<T> | null>
  );
  if (!ctx) return null;

  const selected = ctx.isSelected(value);
  const progress = useSharedValue(selected ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(selected ? 1 : 0, {
      damping: 22,
      stiffness: 300,
    });
  }, [selected]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.15]) }],
    opacity: interpolate(progress.value, [0, 1], [0.7, 1]),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [tokens.color.text.secondary, tokens.color.brand.default]
    ),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.95, 1]) }],
    opacity: interpolate(progress.value, [0, 1], [0.7, 1]),
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0, 1]) }],
  }));

  const itemProps = ctx.getItemProps(value, disabled);

  return (
    <Pressable
      {...itemProps}
      disabled={disabled}
      style={({ pressed }) => [
        styles.tabItem,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.3 },
      ]}
    >
      <View style={styles.iconContainer}>
        <Animated.View style={iconStyle}>
          {selected && activeIcon ? activeIcon : icon}
        </Animated.View>

        {badge !== undefined && badge !== false && (
          <Badge
            count={typeof badge === 'boolean' ? undefined : (badge as number)}
            dot={typeof badge === 'boolean'}
            style={styles.badge}
          />
        )}
      </View>

      <Animated.Text style={[styles.tabLabel, labelStyle]}>
        {label}
      </Animated.Text>

      <Animated.View
        style={[
          styles.activeDot,
          dotStyle,
          { backgroundColor: tokens.color.brand.default },
        ]}
      />
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    paddingBottom: 6,
    minHeight: 56,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    minHeight: 48,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -12,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    marginTop: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});
