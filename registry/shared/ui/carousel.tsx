import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  AccessibilityInfo,
  AppState,
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

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
  /** Advance automatically while active; paused for reduced motion/screen readers. */
  autoPlay?: boolean;
  /** Time between advances in milliseconds. Default: 3000. */
  autoPlayInterval?: number;
  /** Wrap at both ends, using duplicate edge slides to preserve scroll continuity. */
  loop?: boolean;
  onIndexChange?: (index: number) => void;
}

function PaginationDot({
  active,
  index,
  onPress,
  reducedMotion,
}: {
  active: boolean;
  index: number;
  onPress: () => void;
  reducedMotion: boolean;
}) {
  const colors = useThemeColor();
  const progress = useSharedValue(active ? 1 : 0);
  useEffect(() => {
    progress.value = reducedMotion
      ? active
        ? 1
        : 0
      : withTiming(active ? 1 : 0, {
          duration: 220,
          easing: Easing.out(Easing.cubic),
        });
    return () => cancelAnimation(progress);
  }, [active, progress, reducedMotion]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + progress.value * 0.65,
    transform: [{ scale: 1 + progress.value * 0.35 }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Go to slide ${index + 1}`}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className="h-11 w-11 items-center justify-center active:opacity-60"
    >
      <Animated.View
        className="h-2 w-2 rounded-full"
        style={[{ backgroundColor: colors.foreground }, animatedStyle]}
      />
    </Pressable>
  );
}

export function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  className,
  itemClassName,
  showArrows = false,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  loop = false,
  onIndexChange,
  onLayout,
  ...props
}: CarouselProps<T>) {
  const { width: viewport } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(viewport);
  const w = Math.max(1, itemWidth ?? containerWidth);
  const looping = loop && data.length > 1;
  const edgeSlots = looping ? Math.max(1, Math.ceil(containerWidth / w)) : 0;
  const slides = useMemo(() => {
    const items = data.map((item, logicalIndex) => ({
      item,
      logicalIndex,
      duplicate: false,
    }));
    if (!looping) return items;
    const leading = Array.from({ length: edgeSlots }, (_, position) => {
      const logicalIndex =
        (((position - edgeSlots) % data.length) + data.length) % data.length;
      return { item: data[logicalIndex], logicalIndex, duplicate: true };
    });
    const trailing = Array.from({ length: edgeSlots }, (_, position) => {
      const logicalIndex = position % data.length;
      return { item: data[logicalIndex], logicalIndex, duplicate: true };
    });
    return [...leading, ...items, ...trailing];
  }, [data, looping, edgeSlots]);
  const list = useRef<FlatList<(typeof slides)[number]>>(null);
  const dots = useRef<ScrollView>(null);
  const [dotsWidth, setDotsWidth] = useState(0);
  const currentIndex = useRef(0);
  const [index, setIndex] = useState(0);
  const iconColor = useIconColor('foreground');
  const reducedMotion = useReducedMotion();
  const [appActive, setAppActive] = useState(
    AppState.currentState === 'active'
  );
  const [dragging, setDragging] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(reducedMotion);
  const [interaction, setInteraction] = useState(0);
  const latestInteraction = useRef(interaction);
  latestInteraction.current = interaction;
  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      if (mounted) setScreenReader(enabled);
    });
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    });
    const app = AppState.addEventListener('change', (state) =>
      setAppActive(state === 'active')
    );
    const reader = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setScreenReader
    );
    const motion = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion
    );
    return () => {
      mounted = false;
      app.remove();
      reader.remove();
      motion.remove();
    };
  }, []);
  // Pagination addresses positions, independently of the slide data's identity.
  const pageSlots = useMemo(
    () =>
      Array.from({ length: data.length }, (_, position) => ({
        key: `slide-${position}`,
        position,
      })),
    [data.length]
  );
  const callback = useRef(onIndexChange);
  callback.current = onIndexChange;

  const commitIndex = useCallback((next: number) => {
    if (next === currentIndex.current) return;
    currentIndex.current = next;
    setIndex(next);
    callback.current?.(next);
  }, []);

  const scrollTo = useCallback(
    (i: number) => {
      if (data.length === 0) return;
      const next = looping
        ? (i + data.length) % data.length
        : Math.max(0, Math.min(data.length - 1, i));
      const physical = looping ? i + edgeSlots : next;
      list.current?.scrollToOffset({
        offset: physical * w,
        animated: !reduceMotion,
      });
      if (
        reduceMotion &&
        looping &&
        (physical < edgeSlots || physical >= edgeSlots + data.length)
      )
        list.current?.scrollToOffset({
          offset: (next + edgeSlots) * w,
          animated: false,
        });
      commitIndex(next);
    },
    [data.length, looping, edgeSlots, w, reduceMotion, commitIndex]
  );

  useEffect(() => {
    if (
      !autoPlay ||
      data.length < 2 ||
      dragging ||
      !appActive ||
      screenReader ||
      reduceMotion ||
      !Number.isFinite(autoPlayInterval) ||
      autoPlayInterval <= 0 ||
      (!looping && index === data.length - 1)
    )
      return;
    const timer = setTimeout(() => {
      if (interaction === latestInteraction.current)
        scrollTo(currentIndex.current + 1);
    }, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [
    autoPlay,
    autoPlayInterval,
    data.length,
    dragging,
    appActive,
    screenReader,
    reduceMotion,
    looping,
    index,
    interaction,
    scrollTo,
  ]);

  useEffect(() => {
    const next = Math.max(0, Math.min(data.length - 1, currentIndex.current));
    if (next !== currentIndex.current) {
      currentIndex.current = next;
      setIndex(next);
      callback.current?.(next);
    }
    if (containerWidth > 0)
      list.current?.scrollToOffset({
        offset: (next + edgeSlots) * w,
        animated: false,
      });
  }, [containerWidth, data.length, w, edgeSlots]);

  useEffect(() => {
    if (data.length * 44 > dotsWidth)
      dots.current?.scrollTo({
        x: Math.max(0, index * 44 - dotsWidth / 2 + 22),
        animated: !reduceMotion,
      });
  }, [dotsWidth, data.length, index, reduceMotion]);

  return (
    <View className={cn('w-full', className)} onLayout={onLayout} {...props}>
      <FlatList
        ref={list}
        horizontal
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width;
          if (width > 0) setContainerWidth(width);
        }}
        data={slides}
        extraData={index}
        keyExtractor={(_, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 1}
        snapToInterval={w}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingRight: Math.max(0, containerWidth - w),
        }}
        getItemLayout={(_, i) => ({ length: w, offset: i * w, index: i })}
        onScrollBeginDrag={() => {
          setDragging(true);
          setInteraction((value) => value + 1);
        }}
        onScrollEndDrag={() => setDragging(false)}
        onMomentumScrollEnd={(event) => {
          if (data.length === 0) return;
          const physical = Math.max(
            0,
            Math.min(
              slides.length - 1,
              Math.round(event.nativeEvent.contentOffset.x / w)
            )
          );
          const next = looping
            ? (((physical - edgeSlots) % data.length) + data.length) %
              data.length
            : physical;
          commitIndex(next);
          if (
            looping &&
            (physical < edgeSlots || physical >= edgeSlots + data.length)
          )
            list.current?.scrollToOffset({
              offset: (next + edgeSlots) * w,
              animated: false,
            });
        }}
        renderItem={({ item }) => (
          <View
            className={itemClassName}
            style={{ width: w }}
            accessibilityElementsHidden={
              item.duplicate || item.logicalIndex !== index
            }
            importantForAccessibility={
              !item.duplicate && item.logicalIndex === index
                ? 'auto'
                : 'no-hide-descendants'
            }
          >
            {renderItem(item.item, item.logicalIndex)}
          </View>
        )}
      />
      {(showArrows || showDots) && data.length > 1 && (
        <View className="mt-2 flex-row items-center gap-2">
          {showArrows && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous"
              accessibilityState={{ disabled: !looping && index === 0 }}
              disabled={!looping && index === 0}
              onPress={() => {
                setInteraction((value) => value + 1);
                scrollTo(currentIndex.current - 1);
              }}
              className="h-11 w-11 items-center justify-center rounded-full border border-border bg-background active:opacity-70"
              style={{ opacity: !looping && index === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={20} color={iconColor} />
            </Pressable>
          )}
          {showDots ? (
            <ScrollView
              ref={dots}
              horizontal
              className="flex-1"
              onLayout={(event) => setDotsWidth(event.nativeEvent.layout.width)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
              {pageSlots.map(({ key, position }) => (
                <PaginationDot
                  key={key}
                  index={position}
                  active={position === index}
                  reducedMotion={reduceMotion}
                  onPress={() => {
                    setInteraction((value) => value + 1);
                    scrollTo(position);
                  }}
                />
              ))}
            </ScrollView>
          ) : (
            <View className="flex-1" />
          )}
          {showArrows && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next"
              accessibilityState={{
                disabled: !looping && index === data.length - 1,
              }}
              disabled={!looping && index === data.length - 1}
              onPress={() => {
                setInteraction((value) => value + 1);
                scrollTo(currentIndex.current + 1);
              }}
              className="h-11 w-11 items-center justify-center rounded-full border border-border bg-background active:opacity-70"
              style={{
                opacity: !looping && index === data.length - 1 ? 0.4 : 1,
              }}
            >
              <ChevronRight size={20} color={iconColor} />
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
