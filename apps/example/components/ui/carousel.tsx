import { useRef, useState, type ReactNode } from 'react';
import {
  FlatList,
  Pressable,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { cn, useIconColor } from '@/lib/utils';

export interface CarouselProps<T> extends Omit<ViewProps, 'children'> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Item width in px — defaults to viewport width. */
  itemWidth?: number;
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  /** Pagination dots under the carousel. */
  showDots?: boolean;
  onIndexChange?: (index: number) => void;
}

export function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  className,
  itemClassName,
  showArrows = false,
  showDots = true,
  onIndexChange,
  ...props
}: CarouselProps<T>) {
  const { width: viewport } = useWindowDimensions();
  const w = itemWidth ?? viewport;
  const list = useRef<FlatList<T>>(null);
  const [index, setIndex] = useState(0);
  const iconColor = useIconColor('foreground');

  const scrollTo = (i: number) => {
    const next = Math.max(0, Math.min(data.length - 1, i));
    list.current?.scrollToOffset({ offset: next * w, animated: true });
    setIndex(next);
    onIndexChange?.(next);
  };

  return (
    <View className={cn('w-full', className)} {...props}>
      <FlatList
        ref={list}
        horizontal
        data={data}
        keyExtractor={(_, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        snapToInterval={w}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / w);
          setIndex(i);
          onIndexChange?.(i);
        }}
        renderItem={({ item, index: i }) => (
          <View className={itemClassName} style={{ width: w }}>
            {renderItem(item, i)}
          </View>
        )}
      />
      {showArrows && (
        <View
          className="absolute top-0 bottom-0 w-full flex-row items-center justify-between px-2"
          pointerEvents="box-none"
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous"
            onPress={() => scrollTo(index - 1)}
            className="rounded-full border border-border bg-background p-2"
          >
            <ChevronLeft size={18} color={iconColor} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next"
            onPress={() => scrollTo(index + 1)}
            className="rounded-full border border-border bg-background p-2"
          >
            <ChevronRight size={18} color={iconColor} />
          </Pressable>
        </View>
      )}
      {showDots && data.length > 1 && (
        <View className="mt-3 flex-row items-center justify-center gap-1.5">
          {data.map((_item, i) => (
            <Pressable
              // biome-ignore lint/suspicious/noArrayIndexKey: pagination dots have no stable id
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${i + 1}`}
              hitSlop={6}
              onPress={() => scrollTo(i)}
              className={cn(
                'h-1.5 rounded-full',
                i === index ? 'w-5 bg-foreground' : 'w-1.5 bg-border'
              )}
            />
          ))}
        </View>
      )}
    </View>
  );
}
