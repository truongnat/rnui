import { ScrollView, type ScrollViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface ScrollAreaProps extends ScrollViewProps {
  className?: string;
}

export function ScrollArea({
  className,
  children,
  showsVerticalScrollIndicator = true,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollView
      className={cn('flex-1', className)}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
