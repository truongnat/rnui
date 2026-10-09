import { createContext, useContext, useState } from 'react';
import { Image, type ImageProps, View, type ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type LoadState = 'loading' | 'loaded' | 'error';

const AvatarContext = createContext<{ setLoad: (v: LoadState) => void }>({
  setLoad: () => {},
});

export interface AvatarProps extends ViewProps {
  className?: string;
}

export function Avatar({ className, children, ...props }: AvatarProps) {
  const [_load, setLoad] = useState<LoadState>('loading');

  return (
    <AvatarContext.Provider value={{ setLoad }}>
      <View
        className={cn(
          'relative h-10 w-10 overflow-hidden rounded-full',
          className
        )}
        {...props}
      >
        {children}
      </View>
    </AvatarContext.Provider>
  );
}

export interface AvatarImageProps extends ImageProps {
  className?: string;
}

export function AvatarImage({
  className,
  style,
  onLoad,
  onError,
  ...props
}: AvatarImageProps) {
  const { setLoad } = useContext(AvatarContext);
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      className={cn('absolute inset-0 h-full w-full', className)}
      style={[{ zIndex: 1 }, style]}
      onLoad={(e) => {
        setLoad('loaded');
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoad('error');
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
        children
      )}
    </View>
  );
}
