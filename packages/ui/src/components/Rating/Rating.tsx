import {
  useRating,
  useReduceMotionEnabled,
  useTheme,
} from '@truongdq01/headless';
import { spring } from '@truongdq01/tokens';
import type React from 'react';
import { memo, useCallback } from 'react';
import {
  type AccessibilityActionEvent,
  AccessibilityInfo,
  Pressable,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { IconName } from '../Icon';
import { Icon } from '../Icon';

const DEFAULT_ICON_NAMES = {
  filled: 'star' as const,
  empty: 'star' as const,
  half: 'starHalf' as const,
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/** State of a single star slot */
export type RatingStarState = 'filled' | 'half' | 'empty';

/**
 * Star row item: press feedback uses Reanimated; stars are not separate a11y nodes.
 * Consumers should pass a stable `onChange` (e.g. `useCallback`) so `Rating` memo stays effective.
 */
export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  /** When true, show numeric value next to stars (e.g. `3/5`). */
  showValue?: boolean;
  /** Where `showValue` sits relative to the star row. Default `end`. */
  valuePosition?: 'start' | 'end';
  /** Tighter gap between stars (uses `rating.containerCompact`). */
  compact?: boolean;
  /**
   * Icons for filled / empty / half. Empty uses the same glyph as `filled` with empty token color
   * when both default to `star`.
   */
  iconNames?: { filled: IconName; empty: IconName; half: IconName };
  /**
   * Fully custom icon renderer. Overrides `iconNames` when provided.
   * Receives the star state, dp size, and theme color — return any React node (emoji, SVG, etc.).
   */
  renderIcon?: (
    state: RatingStarState,
    size: number,
    color: string
  ) => React.ReactNode;
  /** Number of ratings/reviews — shown as `★ 4.3 (128)` when combined with `showValue`. */
  ratingCount?: number;
  /**
   * Format function for the value label. Receives `(value, max, ratingCount?)`.
   * Default: `"3/5"` or `"4.3 (128)"` when `ratingCount` is provided.
   */
  formatLabel?: (value: number, max: number, ratingCount?: number) => string;
}

type RatingStarButtonProps = {
  index: number;
  iconSize: number;
  iconName: IconName;
  iconColor: string;
  starState: RatingStarState;
  disabled: boolean;
  readOnly: boolean;
  reduceMotion: boolean;
  onPress: (index: number) => void;
  renderIcon?: (
    state: RatingStarState,
    size: number,
    color: string
  ) => React.ReactNode;
};

function RatingStarButton({
  index,
  iconSize,
  iconName,
  iconColor,
  starState,
  disabled,
  readOnly,
  reduceMotion,
  onPress,
  renderIcon,
}: RatingStarButtonProps) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled || readOnly || reduceMotion) return;
    scale.value = withSpring(1.12, spring.snappy);
  };

  const handlePressOut = () => {
    if (disabled || readOnly) return;
    if (reduceMotion) {
      scale.value = 1;
      return;
    }
    scale.value = withSpring(1, spring.snappy);
  };

  const iconContent = renderIcon ? (
    renderIcon(starState, iconSize, iconColor)
  ) : (
    <Icon size={iconSize} color={iconColor}>
      {iconName}
    </Icon>
  );

  return (
    <Pressable
      accessibilityElementsHidden
      importantForAccessibility="no"
      accessible={false}
      disabled={disabled || readOnly}
      onPress={() => onPress(index)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View style={animStyle}>{iconContent}</Animated.View>
    </Pressable>
  );
}

function RatingInner({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = 'md',
  onChange,
  showValue = false,
  valuePosition = 'end',
  compact = false,
  iconNames: iconNamesProp,
  renderIcon,
  ratingCount,
  formatLabel,
}: RatingProps) {
  const {
    components: { rating },
  } = useTheme();
  const reduceMotion = useReduceMotionEnabled();
  const icons = { ...DEFAULT_ICON_NAMES, ...iconNamesProp };

  const {
    value: ratingValue,
    setValue,
    precision: effectivePrecision,
  } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    onChange,
  });

  const iconSize = rating.size[size];
  const activeColor = rating.star.filled.color;
  const inactiveColor = rating.star.empty.color;
  const halfColor = rating.star.half.color;

  const announceValue = useCallback(
    (next: number) => {
      // TODO i18n — fixed English for library default
      const announce = AccessibilityInfo.announceForAccessibility;
      if (typeof announce === 'function') {
        announce(`${next} out of ${max} stars`);
      }
    },
    [max]
  );

  const handlePress = (index: number) => {
    if (disabled || readOnly) return;
    const tapTarget = index + 1;
    const snapped =
      Math.round(tapTarget / effectivePrecision) * effectivePrecision;
    const newVal = ratingValue === snapped ? 0 : snapped;
    setValue(newVal);
    announceValue(newVal);
  };

  const applyAccessibilityStep = (delta: 1 | -1) => {
    if (disabled || readOnly) return;
    const raw = ratingValue + delta * effectivePrecision;
    const snapped = Math.round(raw / effectivePrecision) * effectivePrecision;
    const next = clamp(snapped, 0, max);
    if (next !== ratingValue) {
      setValue(next);
      announceValue(next);
    }
  };

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const name = event.nativeEvent.actionName;
    if (name === 'increment') {
      applyAccessibilityStep(1);
    } else if (name === 'decrement') {
      applyAccessibilityStep(-1);
    }
  };

  const interactive = !readOnly && !disabled;
  const rowStyle = compact ? rating.containerCompact : rating.container;

  const defaultFormatLabel = (v: number, m: number, count?: number) => {
    if (count != null) return `${v} (${count})`;
    return `${v}/${m}`;
  };
  const labelFormatter = formatLabel ?? defaultFormatLabel;
  const labelText = labelFormatter(ratingValue, max, ratingCount);

  const valueLabel = (
    <Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      accessible={false}
      style={{
        fontSize: iconSize * 0.7,
        color: activeColor,
        marginHorizontal: 4,
      }}
    >
      {labelText}
    </Text>
  );

  const starsRow = (
    <View
      accessible={interactive || readOnly || disabled}
      accessibilityRole={interactive ? 'adjustable' : 'none'}
      accessibilityValue={
        interactive
          ? {
              min: 0,
              max,
              now: ratingValue,
            }
          : undefined
      }
      accessibilityHint={
        interactive
          ? 'Swipe up or down to adjust rating' // TODO i18n
          : undefined
      }
      accessibilityLabel={
        !interactive
          ? ratingCount != null
            ? `${ratingValue} out of ${max} stars, ${ratingCount} ratings`
            : `${ratingValue} out of ${max} stars`
          : undefined
      }
      onAccessibilityAction={interactive ? onAccessibilityAction : undefined}
      style={rowStyle}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starNumber = i + 1;
        const filled = ratingValue >= starNumber;
        const halfFilled =
          !filled &&
          ratingValue >= starNumber - 0.5 &&
          effectivePrecision <= 0.5;

        const starState: RatingStarState = halfFilled
          ? 'half'
          : filled
            ? 'filled'
            : 'empty';
        let iconName: IconName = icons.empty;
        if (halfFilled) iconName = icons.half;
        else if (filled) iconName = icons.filled;
        const iconColor = halfFilled
          ? halfColor
          : filled
            ? activeColor
            : inactiveColor;

        return (
          <RatingStarButton
            key={i}
            index={i}
            iconSize={iconSize}
            iconName={iconName}
            iconColor={iconColor}
            starState={starState}
            disabled={disabled}
            readOnly={readOnly}
            reduceMotion={reduceMotion}
            onPress={handlePress}
            renderIcon={renderIcon}
          />
        );
      })}
    </View>
  );

  if (!showValue) {
    return <View>{starsRow}</View>;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {valuePosition === 'start' ? valueLabel : null}
      {starsRow}
      {valuePosition === 'end' ? valueLabel : null}
    </View>
  );
}

export const Rating = memo(RatingInner);
Rating.displayName = 'Rating';
