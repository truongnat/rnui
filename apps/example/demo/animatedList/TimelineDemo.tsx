import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast, useTokens } from '@truongdq01/headless';
import { AnimatedList } from '@truongdq01/ui';
import {
  createInitialTimelinePosts,
  createRandomTimelinePost,
  type TimelinePost,
} from '@/demo/animatedListDemoData';
import { AnimatedListDemoFrame } from './AnimatedListDemoFrame';
import { INSERT_AT_TOP_MVCP, useAnimatedListController } from './controller';
import { RemovableRow } from './RemovableRow';
import { TimelineFeedRow } from './rows';

export function TimelineDemo() {
  const t = useTokens();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const initialData = useMemo(() => createInitialTimelinePosts(), []);
  const {
    items,
    setItems,
    type,
    setType,
    listRef,
    countRef,
    insert,
    finalizeRemove,
    activeListConfig,
    removeVariant,
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
    () => <View style={{ height: insets.bottom + t.spacing[8] }} />,
    [insets.bottom, t.spacing]
  );

  const renderItem = useCallback(
    (info: { item: TimelinePost; index: number }) => (
      <RemovableRow
        resetKey={info.item.id}
        variant={removeVariant}
        onRemoved={() => finalizeRemove(info.item.id)}
      >
        {(remove) => (
          <TimelineFeedRow
            tokens={t}
            onToast={onToast}
            post={info.item}
            isLast={info.index === countRef.current - 1}
            onRemove={remove}
            onToggleLike={toggleLike}
            onToggleRepost={toggleRepost}
          />
        )}
      </RemovableRow>
    ),
    [countRef, finalizeRemove, onToast, removeVariant, t, toggleLike, toggleRepost]
  );

  return (
    <AnimatedListDemoFrame
      type={type}
      onChangeType={setType}
      insertLabel="Post Update"
      onInsert={insert}
    >
      <AnimatedList<TimelinePost>
        ref={listRef}
        {...activeListConfig}
        style={{ flex: 1 }}
        data={items}
        extraData={items.length}
        maintainVisibleContentPosition={INSERT_AT_TOP_MVCP}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={listFooter}
      />
    </AnimatedListDemoFrame>
  );
}
