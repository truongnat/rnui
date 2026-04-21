import { useTheme } from '@truongdq01/headless';
import React, { useState } from 'react';
import {
  Image as RNImage,
  type ImageProps as RNImageProps,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

export interface RnImageProps extends RNImageProps {
  /**
   * If true, shows a skeleton loading effect while the image is fetching.
   * Defaults to true.
   */
  showPlaceholder?: boolean;
}

export function RnImage({
  showPlaceholder = true,
  style,
  onLoad,
  ...props
}: RnImageProps) {
  const {
    components: { image },
  } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const opacity = useSharedValue(0);

  const handleLoad = (e: any) => {
    setIsLoaded(true);
    opacity.value = withTiming(1, { duration: 300 });
    onLoad?.(e);
  };

  const imageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor:
            showPlaceholder && !isLoaded
              ? image.placeholder.backgroundColor
              : 'transparent',
        },
      ]}
    >
      <AnimatedImage
        {...props}
        onLoad={handleLoad}
        style={[StyleSheet.absoluteFill, imageStyle, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
});
