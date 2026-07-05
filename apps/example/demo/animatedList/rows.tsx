import { memo, type ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconButton,
  ListItem,
  Typography,
} from '@truongdq01/ui';
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

export type ThemeTokens = ReturnType<typeof useTokens>;

const bareIconButtonStyle = { backgroundColor: 'transparent' } as const;

type EngagementActionProps = {
  tokens: ThemeTokens;
  icon: ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  activeColor?: string;
  onPress: () => void;
};

const EngagementAction = memo(function EngagementAction({
  tokens,
  icon,
  label,
  count,
  active = false,
  activeColor,
  onPress,
}: EngagementActionProps) {
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
        gap: tokens.spacing[1.5],
        paddingVertical: tokens.spacing[2],
        opacity: pressed ? tokens.opacity[70] : 1,
      })}
    >
      {icon}
      {count !== undefined && count > 0 ? (
        <Typography
          variant="caption"
          style={{
            color: active
              ? (activeColor ?? tokens.color.brand.primary)
              : tokens.color.text.secondary,
            fontWeight: active
              ? tokens.fontWeight.semibold
              : tokens.fontWeight.regular,
          }}
        >
          {formatEngagementCount(count)}
        </Typography>
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
  contentGap: number;
  actionPaddingH: number;
  actionPaddingV: number;
  onOpen: (id: string, name: string) => void;
  onRemove: (id: string) => void;
};

export const ContactRow = memo(function ContactRow({
  id,
  name,
  role,
  initials,
  unread,
  isLast,
  contentGap,
  actionPaddingH,
  actionPaddingV,
  onOpen,
  onRemove,
}: ContactRowProps) {
  return (
    <ListItem
      onPress={() => onOpen(id, name)}
      divider={!isLast}
      secondaryAction={
        <Button
          variant="ghost"
          size="sm"
          onPress={() => onRemove(id)}
          style={{
            paddingHorizontal: actionPaddingH,
            paddingVertical: actionPaddingV,
          }}
        >
          Remove
        </Button>
      }
    >
      <Avatar initials={initials} size="sm" />
      <View style={{ flex: 1, marginLeft: contentGap }}>
        <Typography variant="subtitle2" numberOfLines={1}>
          {name}
        </Typography>
        <Typography variant="caption" color="secondary" numberOfLines={1}>
          {role}
        </Typography>
      </View>
      {unread > 0 ? (
        <Badge count={unread > 99 ? '99+' : unread} variant="brand" size="sm" />
      ) : null}
    </ListItem>
  );
});

export type SocialFeedRowProps = {
  tokens: ThemeTokens;
  postImageHeight: number;
  onToast: (message: string) => void;
  post: SocialPost;
  isLast: boolean;
  onRemove: (id: string) => void;
  onToggleLike: (id: string) => void;
};

export const SocialFeedRow = memo(function SocialFeedRow({
  tokens,
  postImageHeight,
  onToast,
  post,
  isLast,
  onRemove,
  onToggleLike,
}: SocialFeedRowProps) {
  return (
    <View
      style={{
        backgroundColor: tokens.color.surface.default,
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: tokens.color.border.subtle,
      }}
    >
      <View
        style={{
          paddingHorizontal: tokens.spacing[4],
          paddingTop: tokens.spacing[4],
          gap: tokens.spacing[3],
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing[3],
          }}
        >
          <Avatar initials={post.author.initials} size="md" />
          <View style={{ flex: 1, gap: tokens.spacing[0.5] }}>
            <Typography variant="subtitle2" numberOfLines={1}>
              {post.author.name}
            </Typography>
            <Typography variant="caption" color="tertiary">
              {post.timestamp} · Public
            </Typography>
          </View>
          <IconButton
            icon={<MoreHorizontal color={tokens.color.text.tertiary} size={18} />}
            label="Post options"
            accessibilityLabel="Post options"
            size="sm"
            style={bareIconButtonStyle}
            onPress={() => onToast('Post options')}
          />
          <IconButton
            icon={<X color={tokens.color.text.tertiary} size={18} />}
            label="Remove post"
            accessibilityLabel="Remove post"
            size="sm"
            style={bareIconButtonStyle}
            onPress={() => onRemove(post.id)}
          />
        </View>

        <Typography
          variant="body2"
          style={{ lineHeight: tokens.fontSize.md * 1.5 }}
        >
          {post.body}
        </Typography>

        {post.imageUrl ? (
          <Image
            source={{ uri: post.imageUrl }}
            style={{
              width: '100%',
              height: postImageHeight,
              borderRadius: tokens.radius.lg,
              backgroundColor: tokens.color.surface.sunken,
            }}
            resizeMode="cover"
            accessibilityLabel="Post attachment"
          />
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: tokens.spacing[1],
          }}
        >
          <Typography variant="caption" color="secondary">
            {formatEngagementCount(post.likes)} likes
          </Typography>
          <Typography variant="caption" color="secondary">
            {formatEngagementCount(post.comments)} comments ·{' '}
            {formatEngagementCount(post.shares)} shares
          </Typography>
        </View>
      </View>

      <Divider spacing="none" />

      <View
        style={{ flexDirection: 'row', paddingHorizontal: tokens.spacing[2] }}
      >
        <EngagementAction
          tokens={tokens}
          label="Like"
          count={post.likes}
          active={post.liked}
          activeColor={tokens.color.brand.primary}
          onPress={() => onToggleLike(post.id)}
          icon={
            <ThumbsUp
              size={18}
              color={
                post.liked
                  ? tokens.color.brand.primary
                  : tokens.color.text.secondary
              }
              fill={post.liked ? tokens.color.brand.primary : 'transparent'}
            />
          }
        />
        <EngagementAction
          tokens={tokens}
          label="Comment"
          count={post.comments}
          onPress={() => onToast('Open comments')}
          icon={<MessageCircle size={18} color={tokens.color.text.secondary} />}
        />
        <EngagementAction
          tokens={tokens}
          label="Share"
          count={post.shares}
          onPress={() => onToast('Share post')}
          icon={<Share2 size={18} color={tokens.color.text.secondary} />}
        />
      </View>
    </View>
  );
});

export type TimelineFeedRowProps = {
  tokens: ThemeTokens;
  onToast: (message: string) => void;
  post: TimelinePost;
  isLast: boolean;
  onRemove: (id: string) => void;
  onToggleLike: (id: string) => void;
  onToggleRepost: (id: string) => void;
};

export const TimelineFeedRow = memo(function TimelineFeedRow({
  tokens,
  onToast,
  post,
  isLast,
  onRemove,
  onToggleLike,
  onToggleRepost,
}: TimelineFeedRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[4],
        gap: tokens.spacing[3],
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: tokens.color.border.subtle,
        backgroundColor: tokens.color.surface.default,
      }}
    >
      <Avatar initials={post.author.initials} size="md" />

      <View style={{ flex: 1, gap: tokens.spacing[2] }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing[2],
          }}
        >
          <View style={{ flex: 1, gap: tokens.spacing[1] }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: tokens.spacing[1],
              }}
            >
              <Typography variant="subtitle2">{post.author.name}</Typography>
              <Typography variant="caption" color="tertiary">
                {post.handle}
              </Typography>
              <Typography variant="caption" color="tertiary">
                · {post.timestamp}
              </Typography>
            </View>
            <Typography
              variant="body2"
              style={{ lineHeight: tokens.fontSize.md * 1.5 }}
            >
              {post.body}
            </Typography>
          </View>
          <IconButton
            icon={<X color={tokens.color.text.tertiary} size={18} />}
            label="Remove post"
            accessibilityLabel="Remove post"
            size="sm"
            style={bareIconButtonStyle}
            onPress={() => onRemove(post.id)}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <EngagementAction
            tokens={tokens}
            label="Reply"
            count={post.replies}
            onPress={() => onToast('Reply to post')}
            icon={<MessageCircle size={17} color={tokens.color.text.tertiary} />}
          />
          <EngagementAction
            tokens={tokens}
            label="Repost"
            count={post.reposts}
            active={post.reposted}
            activeColor={tokens.color.success.icon}
            onPress={() => onToggleRepost(post.id)}
            icon={
              <Repeat2
                size={17}
                color={
                  post.reposted
                    ? tokens.color.success.icon
                    : tokens.color.text.tertiary
                }
              />
            }
          />
          <EngagementAction
            tokens={tokens}
            label="Like"
            count={post.likes}
            active={post.liked}
            activeColor={tokens.color.error.icon}
            onPress={() => onToggleLike(post.id)}
            icon={
              <Heart
                size={17}
                color={
                  post.liked
                    ? tokens.color.error.icon
                    : tokens.color.text.tertiary
                }
                fill={post.liked ? tokens.color.error.icon : 'transparent'}
              />
            }
          />
          <EngagementAction
            tokens={tokens}
            label="Share"
            onPress={() => onToast('Share post')}
            icon={<Share2 size={17} color={tokens.color.text.tertiary} />}
          />
        </View>
      </View>
    </View>
  );
});
