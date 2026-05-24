import { useMemo } from 'react';
import { Platform, StyleSheet, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type OverlayHostInset = {
  paddingHorizontal: number;
  paddingVertical: number;
};

/**
 * Merges token host inset with device safe-area margins (max of each edge).
 * Skipped when `disabled` (e.g. full-screen modal).
 */
export function useOverlayHostPadding(
  hostInset: OverlayHostInset | undefined,
  disabled = false
): ViewStyle | undefined {
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    if (disabled || !hostInset) {
      return undefined;
    }

    return {
      paddingTop: Math.max(hostInset.paddingVertical, insets.top),
      paddingBottom: Math.max(hostInset.paddingVertical, insets.bottom),
      paddingLeft: Math.max(hostInset.paddingHorizontal, insets.left),
      paddingRight: Math.max(hostInset.paddingHorizontal, insets.right),
    };
  }, [disabled, hostInset, insets]);
}

export function getOverlayKeyboardBehavior(): 'padding' | undefined {
  return Platform.OS === 'ios' ? 'padding' : undefined;
}

export const overlayHostStyles = StyleSheet.create({
  host: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayRoot: {
    flex: 1,
  },
});
