import { useEffect, useState, type ReactNode } from 'react';
import {
  Image as RNImage,
  type ImageProps as RNImageProps,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ImageOff } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

const ROUNDED_CLASSES: Record<ImageRounded, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export interface ImageProps extends RNImageProps {
  /** Corner radius preset. */
  rounded?: ImageRounded;
  /** Width/height ratio applied to the container (e.g. 16/9, 1). */
  aspectRatio?: number;
  /**
   * Content rendered in place of the image while loading or after an
   * error. Defaults to a muted placeholder surface; pass `null` to
   * disable entirely.
   */
  fallback?: ReactNode;
  /** className applied to the image container. */
  className?: string;
}

/**
 * RN Image with rounded/aspect-ratio presets, a muted loading
 * placeholder, optional fallback content, and a fade-in on load.
 */
export function Image(props: ImageProps) {
  return (
    <ImageContent
      key={JSON.stringify([props.source, props.src, props.srcSet])}
      {...props}
    />
  );
}

function ImageContent({
  rounded = 'md',
  aspectRatio,
  fallback,
  className,
  style,
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading'
  );
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const fallbackStyle = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
  }));
  const iconColor = useIconColor('muted');

  useEffect(() => () => cancelAnimation(opacity), [opacity]);

  const showFallback = fallback !== null;

  return (
    <View
      className={cn(
        'overflow-hidden bg-muted',
        ROUNDED_CLASSES[rounded],
        className
      )}
      style={[aspectRatio != null && { aspectRatio }, style]}
    >
      {showFallback && (
        <Animated.View
          className="absolute inset-0 items-center justify-center gap-2"
          style={fallbackStyle}
          accessibilityElementsHidden={status === 'loaded'}
          importantForAccessibility={
            status === 'loaded' ? 'no-hide-descendants' : 'auto'
          }
          accessibilityLiveRegion="polite"
          pointerEvents={status === 'loaded' ? 'none' : 'auto'}
        >
          {typeof fallback === 'undefined' ? (
            status === 'error' ? (
              <>
                <ImageOff size={24} color={iconColor} />
                <Text variant="muted" className="text-xs">
                  Image unavailable
                </Text>
              </>
            ) : null
          ) : (
            fallback
          )}
        </Animated.View>
      )}
      {status !== 'error' && (
        <AnimatedImage
          style={[StyleSheet.absoluteFill, animatedStyle]}
          onLoad={(e) => {
            setStatus('loaded');
            opacity.value = withTiming(1, { duration: 220 });
            onLoad?.(e);
          }}
          onError={(e) => {
            cancelAnimation(opacity);
            opacity.value = 0;
            setStatus('error');
            onError?.(e);
          }}
          {...props}
        />
      )}
    </View>
  );
}
