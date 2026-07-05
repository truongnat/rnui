import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast, useTokens } from '@truongdq01/headless';
import { AnimatedList } from '@truongdq01/ui';
import {
  createInitialSocialPosts,
  createRandomSocialPost,
  type SocialPost,
} from '@/demo/animatedListDemoData';
import { AnimatedListDemoFrame } from './AnimatedListDemoFrame';
import { INSERT_AT_TOP_MVCP, useAnimatedListController } from './controller';
import { RemovableRow } from './RemovableRow';
import { SocialFeedRow } from './rows';

export function SocialDemo() {
  const t = useTokens();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const initialData = useMemo(() => createInitialSocialPosts(), []);
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
  } = useAnimatedListController<SocialPost>({
    initialData,
    createItem: createRandomSocialPost,
    idPrefix: 'social',
  });

  const postImageHeight = t.spacing[18] * 2;

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

  const listFooter = useMemo(
    () => <View style={{ height: insets.bottom + t.spacing[8] }} />,
    [insets.bottom, t.spacing]
  );

  const itemType = useCallback(
    (item: SocialPost) => (item.imageUrl ? 'withImage' : 'textOnly'),
    []
  );

  const renderItem = useCallback(
    (info: { item: SocialPost; index: number }) => (
      <RemovableRow
        resetKey={info.item.id}
        variant={removeVariant}
        onRemoved={() => finalizeRemove(info.item.id)}
      >
        {(remove) => (
          <SocialFeedRow
            tokens={t}
            postImageHeight={postImageHeight}
            onToast={onToast}
            post={info.item}
            isLast={info.index === countRef.current - 1}
            onRemove={remove}
            onToggleLike={toggleLike}
          />
        )}
      </RemovableRow>
    ),
    [countRef, finalizeRemove, onToast, postImageHeight, removeVariant, t, toggleLike]
  );

  return (
    <AnimatedListDemoFrame
      type={type}
      onChangeType={setType}
      insertLabel="Publish New Post"
      onInsert={insert}
    >
      <AnimatedList<SocialPost>
        ref={listRef}
        {...activeListConfig}
        style={{ flex: 1 }}
        data={items}
        extraData={items.length}
        maintainVisibleContentPosition={INSERT_AT_TOP_MVCP}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemType={itemType}
        ListFooterComponent={listFooter}
      />
    </AnimatedListDemoFrame>
  );
}
