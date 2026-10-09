import { useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Image as RNImage,
  type ImageProps as RNImageProps,
  StyleSheet,
  View,
} from 'react-native';
import { cn } from '@/lib/utils';

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
export function Image({
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
  const opacity = useRef(new Animated.Value(0)).current;

  const showFallback = status !== 'loaded' && fallback !== null;

  return (
    <View
      className={cn(
        'overflow-hidden bg-muted',
        ROUNDED_CLASSES[rounded],
        className
      )}
      style={[aspectRatio != null && { aspectRatio }, style]}
    >
      {status !== 'error' && (
        <AnimatedImage
          style={[StyleSheet.absoluteFill, { opacity }]}
          onLoad={(e) => {
            setStatus('loaded');
            Animated.timing(opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
            onLoad?.(e);
          }}
          onError={(e) => {
            setStatus('error');
            onError?.(e);
          }}
          {...props}
        />
      )}
      {showFallback && (
        <View className="absolute inset-0 items-center justify-center">
          {typeof fallback === 'undefined' ? null : fallback}
        </View>
      )}
    </View>
  );
}
