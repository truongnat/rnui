import { useCallback, useMemo } from 'react';
import { View, type ListRenderItemInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedList } from '@/components/ui/animated-list';
import { useToast } from '@/components/ui/toast';
import {
  createInitialSocialPosts,
  createRandomSocialPost,
  type SocialPost,
} from '@/demo/animatedListDemoData';
import { AnimatedListDemoFrame } from './AnimatedListDemoFrame';
import { useAnimatedListController } from './controller';
import { RemovableRow } from './RemovableRow';
import { SocialFeedRow } from './rows';

export function SocialDemo() {
  const { toast } = useToast();
  const insets = useSafeAreaInsets();

  const initialData = useMemo(() => createInitialSocialPosts(), []);
  const {
    items,
    setItems,
    listRef,
    insert,
    finalizeRemove,
    animated,
    itemDelay,
    keyExtractor,
  } = useAnimatedListController<SocialPost>({
    initialData,
    createItem: createRandomSocialPost,
    idPrefix: 'social',
  });

  const postImageHeight = 144;

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
    () => <View style={{ height: insets.bottom + 32 }} />,
    [insets.bottom]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<SocialPost>) => (
      <RemovableRow
        resetKey={info.item.id}
        onRemoved={() => finalizeRemove(info.item.id)}
      >
        {(remove) => (
          <SocialFeedRow
            postImageHeight={postImageHeight}
            onToast={onToast}
            post={info.item}
            isLast={info.index === items.length - 1}
            onRemove={remove}
            onToggleLike={toggleLike}
          />
        )}
      </RemovableRow>
    ),
    [finalizeRemove, items.length, onToast, postImageHeight, toggleLike]
  );

  return (
    <AnimatedListDemoFrame insertLabel="Publish New Post" onInsert={insert}>
      <AnimatedList<SocialPost>
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
