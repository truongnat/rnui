import {
  forwardRef,
  memo,
  useCallback,
  useState,
  type ComponentType,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import {
  FlatList,
  type FlatListProps,
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';

type OptionalList = ComponentType<FlatListProps<unknown>>;
let cachedFlashList: OptionalList | null | undefined;
function loadFlashList(): OptionalList | null {
  if (cachedFlashList !== undefined) return cachedFlashList;
  try {
    const module: { FlashList?: OptionalList } = require('@shopify/flash-list');
    cachedFlashList = module.FlashList ?? null;
  } catch {
    cachedFlashList = null;
  }
  return cachedFlashList;
}
const MAX_STAGGER_MS = 240;

interface AnimatedCellProps {
  index: number;
  /** Delay between staggered items (ms). */
  itemDelay: number;
  /** Disable the entrance animation. */
  animated: boolean;
  itemContainerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

/** Bounded item entrance plus layout continuity for mutations and reordering. */
function AnimatedCellInner({
  index,
  itemDelay,
  animated,
  itemContainerStyle,
  children,
}: AnimatedCellProps) {
  // A stable React item key keeps this entrance from replaying on sort/reorder.
  const [entrance] = useState(() =>
    FadeIn.duration(180)
      .delay(Math.min(Math.max(0, index * itemDelay), MAX_STAGGER_MS))
      .reduceMotion(ReduceMotion.System)
  );

  return (
    <Animated.View
      entering={animated && itemDelay > 0 ? entrance : undefined}
      layout={
        animated
          ? LinearTransition.duration(200).reduceMotion(ReduceMotion.System)
          : undefined
      }
      style={itemContainerStyle}
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
 * AnimatedList — virtualized rows with bounded entrances and layout continuity.
 * Uses FlashList when available; an explicit FlatList ref uses native FlatList.
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
  const renderAnimatedItem = useCallback(
    (info: ListRenderItemInfo<T>) => (
      <AnimatedCell
        key={listProps.keyExtractor?.(info.item, info.index)}
        index={info.index}
        itemDelay={itemDelay}
        animated={animated}
        itemContainerStyle={itemContainerStyle}
      >
        {renderItem(info)}
      </AnimatedCell>
    ),
    [
      renderItem,
      itemDelay,
      animated,
      itemContainerStyle,
      listProps.keyExtractor,
    ]
  );
  // FlashList is not a FlatList instance: do not forward a dishonest ref.
  const ListImpl = (loadFlashList() ?? FlatList) as ComponentType<
    FlatListProps<T>
  >;
  if (!ref) {
    return (
      <ListImpl data={data} renderItem={renderAnimatedItem} {...listProps} />
    );
  }

  return (
    <FlatList
      ref={ref}
      data={data}
      renderItem={renderAnimatedItem}
      {...listProps}
    />
  );
}

export const AnimatedList = forwardRef(AnimatedListInner) as <T>(
  props: AnimatedListProps<T> & { ref?: Ref<FlatList<T>> }
) => ReactElement;
