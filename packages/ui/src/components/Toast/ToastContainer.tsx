import type { ToastPosition } from '@truongdq01/headless';
import { dismissToast, useToast } from '@truongdq01/headless';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastItem } from './ToastItem';

// ─── Props ────────────────────────────────────────────────────────

export interface ToastContainerProps {
  position?: ToastPosition;
  /** Horizontal offset from screen edges */
  horizontalPadding?: number;
}

// ─── Component ────────────────────────────────────────────────────

/**
 * Container component for displaying toast notifications.
 * Manages positioning and animations for multiple toasts.
 *
 * @param props - Toast container configuration
 * @returns Animated toast container component
 *
 * @example
 * ```tsx
 * <ToastContainer position="top" horizontalPadding={20} />
 * ```
 */
export function ToastContainer({
  position = 'bottom',
  horizontalPadding = 16,
}: ToastContainerProps) {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();

  const positionStyle =
    position === 'top'
      ? {
          top: insets.top + 8,
          left: horizontalPadding,
          right: horizontalPadding,
        }
      : {
          bottom: insets.bottom + 8,
          left: horizontalPadding,
          right: horizontalPadding,
        };

  return (
    <View
      style={[
        styles.container,
        positionStyle,
        { flexDirection: position === 'bottom' ? 'column-reverse' : 'column' },
      ]}
      pointerEvents="box-none"
      accessibilityLiveRegion={toasts.length > 0 ? 'polite' : 'none'}
      accessibilityRole="alert"
    >
      {toasts.map((item) => (
        <ToastItem
          key={item.id}
          item={item}
          position={position}
          onDismiss={dismissToast}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    gap: 8,
  },
});
