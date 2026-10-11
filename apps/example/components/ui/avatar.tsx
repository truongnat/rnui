import { useEffect, useState } from 'react';
import { Image, type ImageProps, View, type ViewProps } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { UserRound } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export interface AvatarProps extends ViewProps {
  className?: string;
}

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <View
      className={cn(
        'relative h-10 w-10 overflow-hidden rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export interface AvatarImageProps extends ImageProps {
  className?: string;
}

export function AvatarImage(props: AvatarImageProps) {
  return (
    <AvatarImageContent
      key={JSON.stringify([props.source, props.src, props.srcSet])}
      {...props}
    />
  );
}

function AvatarImageContent({
  className,
  style,
  onLoad,
  onError,
  ...props
}: AvatarImageProps) {
  const [failed, setFailed] = useState(false);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  useEffect(() => () => cancelAnimation(opacity), [opacity]);
  if (failed) return null;

  return (
    <AnimatedImage
      className={cn('absolute inset-0 h-full w-full', className)}
      style={[{ zIndex: 1 }, animatedStyle, style]}
      onLoad={(e) => {
        opacity.value = withTiming(1, { duration: 220 });
        onLoad?.(e);
      }}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}

export interface AvatarFallbackProps extends ViewProps {
  className?: string;
}

export function AvatarFallback({
  className,
  children,
  ...props
}: AvatarFallbackProps) {
  const iconColor = useIconColor('muted');
  return (
    <View
      className={cn(
        'absolute inset-0 items-center justify-center bg-muted',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-muted-foreground">
          {children}
        </Text>
      ) : (
        (children ?? <UserRound size={20} color={iconColor} />)
      )}
    </View>
  );
}
