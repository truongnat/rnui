import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTokens } from '@truongdq01/headless';
// @ts-ignore expo-blur is optional peer dependency
import { BlurView } from 'expo-blur';

// ─── Types ────────────────────────────────────────────────────────

export interface TelegramPopupProps {
  /** If true, the popup is shown */
  open: boolean;
  /** The message to display */
  message: React.ReactNode;
  /** Title for popup */
  title?: string;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Callback on close */
  onClose?: () => void;
  /** Duration in ms before auto-hiding */
  autoHideDuration?: number | null;
  /** Position on screen */
  position?: 'top' | 'bottom' | 'center';
  /** Blur background */
  blur?: boolean;
  /** Icon */
  icon?: React.ReactNode;
  /** Variant for different types */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

// ─── Telegram Popup ───────────────────────────────────────────────

export function TelegramPopup({
  open,
  message,
  title,
  actions,
  onClose,
  autoHideDuration = 3000,
  position = 'top',
  blur = true,
  icon,
  variant = 'default',
}: TelegramPopupProps) {
  const tokens = useTokens();
  const { height: windowHeight } = useWindowDimensions();
  const [mounted, setMounted] = React.useState(open);

  const translateY = useSharedValue(position === 'bottom' ? 100 : -100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const animateIn = useCallback(() => {
    translateY.value = withSpring(0, { damping: 25, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1, { damping: 25, stiffness: 300 });
  }, []);

  const animateOut = useCallback(
    (onDone: () => void) => {
      translateY.value = withTiming(position === 'bottom' ? 100 : -100, {
        duration: 200,
      });
      opacity.value = withTiming(0, { duration: 150 }, (done) => {
        if (done) runOnJS(onDone)();
      });
    },
    [position]
  );

  React.useEffect(() => {
    if (open) {
      setMounted(true);
      translateY.value = position === 'bottom' ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);

  React.useEffect(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);

  const positionStyle =
    position === 'top'
      ? { top: 48, alignSelf: 'center' as const }
      : position === 'bottom'
        ? { bottom: 96, alignSelf: 'center' as const }
        : { alignSelf: 'center' as const, top: windowHeight / 2 - 50 };

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ] as const,
  }));

  const variantColors = {
    default: tokens.color.bg.default,
    success: tokens.color.success.bg,
    error: tokens.color.error.bg,
    warning: tokens.color.warning.bg,
    info: tokens.color.info.bg,
  };

  if (!mounted && !open) return null;

  return (
    <Modal
      visible={mounted || open}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        {blur && (
          <BlurView
            style={StyleSheet.absoluteFill}
            tint={tokens.color.bg.default === '#FFFFFF' ? 'light' : 'dark'}
            intensity={20}
          />
        )}
        <Animated.View
          style={
            [
              styles.popup,
              positionStyle,
              animStyle,
              {
                backgroundColor: variantColors[variant],
                shadowColor: tokens.color.bg.inverse,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                borderRadius: 16,
              },
            ] as any
          }
        >
          <View style={styles.content}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <View style={styles.textContent}>
              {title && (
                <Text
                  style={[styles.title, { color: tokens.color.text.primary }]}
                >
                  {title}
                </Text>
              )}
              {typeof message === 'string' ? (
                <Text
                  style={[
                    styles.message,
                    { color: tokens.color.text.secondary },
                  ]}
                >
                  {message}
                </Text>
              ) : (
                message
              )}
            </View>
          </View>
          {actions && <View style={styles.actions}>{actions}</View>}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  popup: {
    position: 'absolute',
    marginHorizontal: 16,
    minWidth: 280,
    maxWidth: 340,
    padding: 16,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
});
