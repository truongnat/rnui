import { memo, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Image } from '@/components/ui/image';
import { ListItem, ListSeparator } from '@/components/ui/list-item';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share2,
  ThumbsUp,
  X,
} from 'lucide-react-native';
import {
  formatEngagementCount,
  type SocialPost,
  type TimelinePost,
} from '@/demo/animatedListDemoData';
import { useIconColor, useThemeColor } from '@/lib/utils';

type EngagementActionProps = {
  icon: ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  /** Color shown for the count when `active` (matches the icon color). */
  activeColor?: string;
  onPress: () => void;
};

const EngagementAction = memo(function EngagementAction({
  icon,
  label,
  count,
  active = false,
  activeColor,
  onPress,
}: EngagementActionProps) {
  const mutedColor = useIconColor('muted');

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={count !== undefined ? `${label}, ${count}` : label}
      style={({ pressed }) => ({
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {icon}
      {count !== undefined && count > 0 ? (
        <Text
          variant="muted"
          style={{
            color: active ? activeColor : mutedColor,
            fontWeight: active ? '600' : '400',
          }}
        >
          {formatEngagementCount(count)}
        </Text>
      ) : null}
    </Pressable>
  );
});

export type ContactRowProps = {
  id: string;
  name: string;
  role: string;
  initials: string;
  unread: number;
  isLast: boolean;
  onOpen: (id: string, name: string) => void;
  onRemove: () => void;
};

export const ContactRow = memo(function ContactRow({
  id,
  name,
  role,
  initials,
  unread,
  isLast,
  onOpen,
  onRemove,
}: ContactRowProps) {
  return (
    <View>
      <ListItem
        onPress={() => onOpen(id, name)}
        title={name}
        subtitle={role}
        leading={
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        }
        trailing={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {unread > 0 ? <Badge>{unread > 99 ? '99+' : unread}</Badge> : null}
            <Button variant="ghost" size="sm" onPress={onRemove}>
              Remove
            </Button>
          </View>
        }
      />
      {!isLast ? <ListSeparator /> : null}
    </View>
  );
});

export type SocialFeedRowProps = {
  postImageHeight: number;
  onToast: (message: string) => void;
  post: SocialPost;
  isLast: boolean;
  onRemove: () => void;
  onToggleLike: (id: string) => void;
};

export const SocialFeedRow = memo(function SocialFeedRow({
  postImageHeight,
  onToast,
  post,
  isLast,
  onRemove,
  onToggleLike,
}: SocialFeedRowProps) {
  const colors = useThemeColor();
  const mutedIcon = useIconColor('muted');
  const primaryIcon = useIconColor('primary');

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Avatar>
            <AvatarFallback>{post.author.initials}</AvatarFallback>
          </Avatar>
          <View style={{ flex: 1, gap: 2 }}>
            <Text className="font-semibold" numberOfLines={1}>
              {post.author.name}
            </Text>
            <Text variant="muted">{post.timestamp} · Public</Text>
          </View>
          <IconButton
            icon={<MoreHorizontal color={mutedIcon} size={18} />}
            accessibilityLabel="Post options"
            size="sm"
            onPress={() => onToast('Post options')}
          />
          <IconButton
            icon={<X color={mutedIcon} size={18} />}
            accessibilityLabel="Remove post"
            size="sm"
            onPress={onRemove}
          />
        </View>

        <Text variant="p">{post.body}</Text>

        {post.imageUrl ? (
          <Image
            source={{ uri: post.imageUrl }}
            rounded="lg"
            style={{ width: '100%', height: postImageHeight }}
            resizeMode="cover"
            accessibilityLabel="Post attachment"
          />
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 4,
          }}
        >
          <Text variant="muted">{formatEngagementCount(post.likes)} likes</Text>
          <Text variant="muted">
            {formatEngagementCount(post.comments)} comments ·{' '}
            {formatEngagementCount(post.shares)} shares
          </Text>
        </View>
      </View>

      <Separator />

      <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
        <EngagementAction
          label="Like"
          count={post.likes}
          active={post.liked}
          activeColor={primaryIcon}
          onPress={() => onToggleLike(post.id)}
          icon={
            <ThumbsUp
              size={18}
              color={post.liked ? primaryIcon : mutedIcon}
              fill={post.liked ? primaryIcon : 'transparent'}
            />
          }
        />
        <EngagementAction
          label="Comment"
          count={post.comments}
          onPress={() => onToast('Open comments')}
          icon={<MessageCircle size={18} color={mutedIcon} />}
        />
        <EngagementAction
          label="Share"
          count={post.shares}
          onPress={() => onToast('Share post')}
          icon={<Share2 size={18} color={mutedIcon} />}
        />
      </View>
    </View>
  );
});

export type TimelineFeedRowProps = {
  onToast: (message: string) => void;
  post: TimelinePost;
  isLast: boolean;
  onRemove: () => void;
  onToggleLike: (id: string) => void;
  onToggleRepost: (id: string) => void;
};

export const TimelineFeedRow = memo(function TimelineFeedRow({
  onToast,
  post,
  isLast,
  onRemove,
  onToggleLike,
  onToggleRepost,
}: TimelineFeedRowProps) {
  const colors = useThemeColor();
  const mutedIcon = useIconColor('muted');
  const destructiveIcon = useIconColor('destructive');
  const successIcon = useIconColor('success');

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 12,
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
      }}
    >
      <Avatar>
        <AvatarFallback>{post.author.initials}</AvatarFallback>
      </Avatar>

      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          <View style={{ flex: 1, gap: 4 }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text className="font-semibold">{post.author.name}</Text>
              <Text variant="muted">{post.handle}</Text>
              <Text variant="muted">· {post.timestamp}</Text>
            </View>
            <Text variant="p">{post.body}</Text>
          </View>
          <IconButton
            icon={<X color={mutedIcon} size={18} />}
            accessibilityLabel="Remove post"
            size="sm"
            onPress={onRemove}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <EngagementAction
            label="Reply"
            count={post.replies}
            onPress={() => onToast('Reply to post')}
            icon={<MessageCircle size={17} color={mutedIcon} />}
          />
          <EngagementAction
            label="Repost"
            count={post.reposts}
            active={post.reposted}
            activeColor={successIcon}
            onPress={() => onToggleRepost(post.id)}
            icon={
              <Repeat2
                size={17}
                color={post.reposted ? successIcon : mutedIcon}
              />
            }
          />
          <EngagementAction
            label="Like"
            count={post.likes}
            active={post.liked}
            activeColor={destructiveIcon}
            onPress={() => onToggleLike(post.id)}
            icon={
              <Heart
                size={17}
                color={post.liked ? destructiveIcon : mutedIcon}
                fill={post.liked ? destructiveIcon : 'transparent'}
              />
            }
          />
          <EngagementAction
            label="Share"
            onPress={() => onToast('Share post')}
            icon={<Share2 size={17} color={mutedIcon} />}
          />
        </View>
      </View>
    </View>
  );
});
