import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface AspectRatioProps extends ViewProps {
  ratio?: number;
  className?: string;
}

export function AspectRatio({
  ratio = 1,
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  return (
    <View
      className={cn('w-full overflow-hidden', className)}
      style={[{ aspectRatio: ratio }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
