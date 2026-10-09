import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  type ComponentType,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import {
  Animated,
  FlatList,
  type FlatListProps,
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type AnyFlatList = ComponentType<FlatListProps<unknown>>;

let cachedFlashList: AnyFlatList | null | undefined;

function loadFlashList(): AnyFlatList | null {
  if (cachedFlashList !== undefined) return cachedFlashList;
  try {
    // Optional peer dep — falls back to FlatList when not installed.
    const mod = require('@shopify/flash-list') as {
      FlashList?: AnyFlatList;
    };
    cachedFlashList = mod.FlashList ?? null;
  } catch {
    cachedFlashList = null;
  }
  return cachedFlashList;
}

const MAX_STAGGER_MS = 1000;

interface AnimatedCellProps {
  index: number;
  /** Delay between staggered items (ms). */
  itemDelay: number;
  /** Disable the entrance animation. */
  animated: boolean;
  itemContainerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

/** Per-item fade+rise entrance; delay staggers by index. */
function AnimatedCellInner({
  index,
  itemDelay,
  animated,
  itemContainerStyle,
  children,
}: AnimatedCellProps) {
  const progress = useRef(new Animated.Value(animated ? 0 : 1)).current;

  useEffect(() => {
    if (!animated) return;
    Animated.timing(progress, {
      toValue: 1,
      duration: 260,
      delay: Math.min(index * itemDelay, MAX_STAGGER_MS),
      useNativeDriver: true,
    }).start();
  }, [animated, index, itemDelay, progress]);

  return (
    <Animated.View
      style={[
        itemContainerStyle,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const AnimatedCell = memo(AnimatedCellInner);

export interface AnimatedListProps<T>
  extends Omit<FlatListProps<T>, 'renderItem'> {
  /** Items to render. */
  data: readonly T[] | null | undefined;
  renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
  /** Staggered entrance: delay between items in ms (0 disables animation). Default 50. */
  itemDelay?: number;
  /** Disable the entrance animation entirely. */
  animated?: boolean;
  /** Style for each animated item wrapper. */
  itemContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * AnimatedList — FlatList (or FlashList when installed) with a staggered
 * fade-in-down entrance per item. Zero deps beyond RN Animated.
 */
function AnimatedListInner<T>(
  {
    data,
    renderItem,
    itemDelay = 50,
    animated = true,
    itemContainerStyle,
    ...listProps
  }: AnimatedListProps<T>,
  ref: Ref<FlatList<T>>
) {
  const ListImpl = (loadFlashList() ?? FlatList) as ComponentType<
    FlatListProps<T> & { ref?: Ref<FlatList<T>> }
  >;

  const renderAnimatedItem = useCallback(
    (info: ListRenderItemInfo<T>) => (
      <AnimatedCell
        index={info.index}
        itemDelay={itemDelay}
        animated={animated}
        itemContainerStyle={itemContainerStyle}
      >
        {renderItem(info)}
      </AnimatedCell>
    ),
    [renderItem, itemDelay, animated, itemContainerStyle]
  );

  return (
    <ListImpl
      ref={ref as never}
      data={data}
      renderItem={renderAnimatedItem}
      {...listProps}
    />
  );
}

export const AnimatedList = forwardRef(AnimatedListInner) as <T>(
  props: AnimatedListProps<T> & { ref?: Ref<FlatList<T>> }
) => ReactElement;
