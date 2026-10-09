import { useCallback, useMemo } from 'react';
import { View, type ListRenderItemInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedList } from '@/components/ui/animated-list';
import { useToast } from '@/components/ui/toast';
import {
  createInitialTimelinePosts,
  createRandomTimelinePost,
  type TimelinePost,
} from '@/demo/animatedListDemoData';
import { AnimatedListDemoFrame } from './AnimatedListDemoFrame';
import { useAnimatedListController } from './controller';
import { RemovableRow } from './RemovableRow';
import { TimelineFeedRow } from './rows';

export function TimelineDemo() {
  const { toast } = useToast();
  const insets = useSafeAreaInsets();

  const initialData = useMemo(() => createInitialTimelinePosts(), []);
  const {
    items,
    setItems,
    listRef,
    insert,
    finalizeRemove,
    animated,
    itemDelay,
    keyExtractor,
  } = useAnimatedListController<TimelinePost>({
    initialData,
    createItem: createRandomTimelinePost,
    idPrefix: 'timeline',
  });

  const onToast = useCallback(
    (message: string) => toast.info(message),
    [toast]
  );

  const toggleLike = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
    },
    [setItems]
  );

  const toggleRepost = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                reposted: !post.reposted,
                reposts: post.reposted ? post.reposts - 1 : post.reposts + 1,
              }
            : post
        )
      );
    },
    [setItems]
  );

  const listFooter = useMemo(
    () => <View style={{ height: insets.bottom + 32 }} />,
    [insets.bottom]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<TimelinePost>) => (
      <RemovableRow
        resetKey={info.item.id}
        onRemoved={() => finalizeRemove(info.item.id)}
      >
        {(remove) => (
          <TimelineFeedRow
            onToast={onToast}
            post={info.item}
            isLast={info.index === items.length - 1}
            onRemove={remove}
            onToggleLike={toggleLike}
            onToggleRepost={toggleRepost}
          />
        )}
      </RemovableRow>
    ),
    [finalizeRemove, items.length, onToast, toggleLike, toggleRepost]
  );

  return (
    <AnimatedListDemoFrame insertLabel="Post Update" onInsert={insert}>
      <AnimatedList<TimelinePost>
        ref={listRef}
        style={{ flex: 1 }}
        data={items}
        extraData={items.length}
        animated={animated}
        itemDelay={itemDelay}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={listFooter}
      />
    </AnimatedListDemoFrame>
  );
}
