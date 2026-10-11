import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type OverlayAnimationType =
  | 'scale'
  | 'slideUp'
  | 'slideDown'
  | 'fade'
  | 'none';

const ENTER_MS = 200;
const EXIT_MS = 160;

export interface UseAnimatedOverlayOptions {
  animationType?: OverlayAnimationType;
  /** Duration override (ms) for both enter and exit. */
  duration?: number;
  /** Backdrop max opacity (0–1). */
  backdropOpacity?: number;
  /** Called when the enter (true) or exit (false) animation finishes. */
  onAnimationEnd?: (entering: boolean) => void;
}

/**
 * Reusable pop-in / pop-out animation for overlays (modal, sheet, dialog).
 * Built on RN `Animated` — no reanimated dep.
 *
 * Returns an animated `progress` value plus ready-made `contentStyle`
 * (opacity + scale/translate) and `backdropStyle` (fade to backdropOpacity).
 */
export function useAnimatedOverlay({
  animationType = 'scale',
  duration,
  backdropOpacity = 0.5,
  onAnimationEnd,
}: UseAnimatedOverlayOptions = {}) {
  const progress = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const callback = useRef(onAnimationEnd);
  callback.current = onAnimationEnd;
  const transition = useRef(0);

  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion
    );
    return () => {
      active = false;
      subscription.remove();
      transition.current += 1;
      progress.stopAnimation();
    };
  }, [progress]);

  const setVisible = useCallback(
    (visible: boolean) => {
      const current = ++transition.current;
      progress.stopAnimation();
      if (animationType === 'none' || reduceMotion) {
        progress.setValue(visible ? 1 : 0);
        callback.current?.(visible);
        return;
      }
      Animated.timing(progress, {
        toValue: visible ? 1 : 0,
        duration: duration ?? (visible ? ENTER_MS : EXIT_MS),
        easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && current === transition.current) {
          callback.current?.(visible);
        }
      });
    },
    [progress, animationType, duration, reduceMotion]
  );

  const contentStyle: StyleProp<ViewStyle> = {
    opacity: progress,
    transform:
      reduceMotion || animationType === 'fade' || animationType === 'none'
        ? []
        : [
            animationType === 'slideUp' || animationType === 'slideDown'
              ? {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [animationType === 'slideUp' ? 24 : -24, 0],
                  }),
                }
              : {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.96, 1],
                  }),
                },
          ],
  };

  const backdropStyle: StyleProp<ViewStyle> = {
    opacity: Animated.multiply(progress, backdropOpacity),
  };

  return { progress, setVisible, contentStyle, backdropStyle };
}

export interface AnimatedOverlayProps {
  visible: boolean;
  animationType?: OverlayAnimationType;
  /** Duration override (ms). */
  duration?: number;
  children?: ReactNode;
  className?: string;
  backdropColor?: string;
  backdropOpacity?: number;
  showBackdrop?: boolean;
  onBackdropPress?: () => void;
  /** Called when the enter (true) or exit (false) animation finishes. */
  onAnimationEnd?: (entering: boolean) => void;
  style?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  /** Extra style merged after the animated content style. */
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * AnimatedOverlay — fade-in backdrop + pop-in content wrapper.
 * Pair with RN `Modal transparent`; callers can defer unmount until
 * `onAnimationEnd(false)` fires so the exit animation plays.
 */
export function AnimatedOverlay({
  visible,
  animationType = 'scale',
  duration,
  children,
  className,
  backdropColor = '#000',
  backdropOpacity = 0.5,
  showBackdrop = true,
  onBackdropPress,
  onAnimationEnd,
  style,
  backdropStyle,
  contentStyle,
}: AnimatedOverlayProps) {
  const {
    setVisible,
    contentStyle: animContent,
    backdropStyle: animBackdrop,
  } = useAnimatedOverlay({
    animationType,
    duration,
    backdropOpacity,
    onAnimationEnd,
  });

  useEffect(() => {
    setVisible(visible);
  }, [visible, setVisible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
      className={className}
      style={[StyleSheet.absoluteFill, style]}
    >
      {showBackdrop && (
        <Pressable
          onPress={onBackdropPress}
          disabled={!onBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="Close overlay"
          style={StyleSheet.absoluteFill}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: backdropColor },
              animBackdrop,
              backdropStyle,
            ]}
          />
        </Pressable>
      )}
      <Animated.View
        pointerEvents="box-none"
        style={[styles.content, animContent, contentStyle]}
        accessible={false}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
