import { useTheme, type ViewAnimatedStyle } from '@truongdq01/headless';
import { memo, useMemo } from 'react';
import { StyleSheet, View, type StyleProp } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { BottomSheetBackdropProps } from './types';

/**
 * Semi-transparent animated overlay behind the sheet.
 * Tapping it triggers the tap gesture (dismissal).
 */
function BottomSheetBackdropInner({
  animatedStyle,
  tapGesture,
  accessibilityLabel = 'Dismiss bottom sheet',
}: BottomSheetBackdropProps) {
  const {
    components: { bottomSheet },
  } = useTheme();

  const backdropLayerStyle = useMemo(
    (): StyleProp<ViewAnimatedStyle> => [
      StyleSheet.absoluteFill,
      bottomSheet.backdrop,
      animatedStyle,
    ],
    [animatedStyle, bottomSheet.backdrop]
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <View
        collapsable={false}
        style={StyleSheet.absoluteFill}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint="Closes the bottom sheet"
      >
        <Animated.View style={backdropLayerStyle} />
      </View>
    </GestureDetector>
  );
}

export const BottomSheetBackdrop = memo(BottomSheetBackdropInner);
BottomSheetBackdrop.displayName = 'BottomSheetBackdrop';
