import { useTheme } from '@truongdq01/headless';
import type React from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';

// ─── Types ────────────────────────────────────────────────────────

export interface ChatListItemProps {
  /** Optional unique id */
  id?: string;
  /** Avatar source or initials */
  avatar?: {
    src?: string;
    initials?: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
  };
  /** Chat name / contact name */
  name: string;
  /** Message preview text */
  preview?: string;
  /** Message timestamp */
  time?: string;
  /** Unread count */
  unread?: number;
  /** Is message read */
  read?: boolean;
  /** Is message sent by current user */
  outgoing?: boolean;
  /** Is chat muted */
  muted?: boolean;
  /** Is chat pinned */
  pinned?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Press callback */
  onPress?: () => void;
  /** Long press callback */
  onLongPress?: () => void;
  /** Trailing custom element */
  trailingElement?: React.ReactNode;
}

// ─── Chat List Item ───────────────────────────────────────────────

export function ChatListItem({
  avatar,
  name,
  preview,
  time,
  unread,
  read = true,
  outgoing = true,
  muted = false,
  pinned = false,
  selected = false,
  disabled = false,
  onPress,
  onLongPress,
  trailingElement,
}: ChatListItemProps) {
  const { tokens } = useTheme();

  const pressed = useSharedValue(0);

  const layoutStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: tokens.spacing[4],
          paddingVertical: tokens.spacing[2.5],
          minHeight: 72,
        },
        avatar: {
          marginRight: tokens.spacing[3],
        },
        content: {
          flex: 1,
          justifyContent: 'center',
          minWidth: 0,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: tokens.spacing[1],
        },
        nameContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginRight: tokens.spacing[2],
          minWidth: 0,
        },
        name: {
          fontSize: tokens.fontSize.md,
          fontWeight: tokens.fontWeight.medium,
          lineHeight: tokens.fontSize.md * 1.25,
          flex: 1,
        },
        iconPin: {
          marginRight: tokens.spacing[1],
          fontSize: tokens.fontSize.sm,
        },
        iconMute: {
          marginLeft: tokens.spacing[1],
          fontSize: tokens.fontSize.sm,
        },
        time: {
          fontSize: tokens.fontSize.sm,
          lineHeight: tokens.fontSize.sm * 1.25,
          textAlign: 'right',
        },
        previewRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        previewContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginRight: tokens.spacing[2],
          minWidth: 0,
        },
        checkmark: {
          fontSize: tokens.fontSize.xs,
          marginRight: tokens.spacing[1],
        },
        preview: {
          fontSize: tokens.fontSize.sm,
          lineHeight: tokens.fontSize.sm * 1.3,
          flex: 1,
        },
        rightContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing[2],
        },
      }),
    [tokens]
  );

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor:
      pressed.value === 1
        ? tokens.color.surface.hover
        : selected
          ? tokens.color.brand.subtle
          : 'transparent',
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      onPressIn={() => {
        pressed.value = withSpring(1, { damping: 20 });
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, { damping: 20 });
      }}
    >
      <Animated.View style={[layoutStyles.container, containerStyle]}>
        {/* Avatar */}
        {avatar && (
          <Avatar
            src={avatar.src}
            initials={avatar.initials}
            status={avatar.status}
            size="md"
            style={layoutStyles.avatar}
          />
        )}

        {/* Content */}
        <View style={layoutStyles.content}>
          <View style={layoutStyles.headerRow}>
            <View style={layoutStyles.nameContainer}>
              {pinned && (
                <Text
                  style={[
                    layoutStyles.iconPin,
                    { color: tokens.color.brand.default },
                  ]}
                >
                  📌
                </Text>
              )}
              <Text
                style={[
                  layoutStyles.name,
                  { color: tokens.color.text.primary },
                  muted && { color: tokens.color.text.secondary },
                ]}
                numberOfLines={1}
              >
                {name}
              </Text>
              {muted && (
                <Text
                  style={[
                    layoutStyles.iconMute,
                    { color: tokens.color.text.tertiary },
                  ]}
                >
                  🔕
                </Text>
              )}
            </View>

            {time && (
              <Text
                style={[
                  layoutStyles.time,
                  { color: tokens.color.text.tertiary },
                  unread && unread > 0
                    ? {
                        color: tokens.color.brand.default,
                        fontWeight: tokens.fontWeight.semibold,
                      }
                    : undefined,
                ]}
              >
                {time}
              </Text>
            )}
          </View>

          <View style={layoutStyles.previewRow}>
            <View style={layoutStyles.previewContainer}>
              {outgoing && (
                <Text
                  style={[
                    layoutStyles.checkmark,
                    {
                      color: read
                        ? tokens.color.info.icon
                        : tokens.color.text.tertiary,
                    },
                  ]}
                >
                  {read ? '✓✓' : '✓'}
                </Text>
              )}
              {preview && (
                <Text
                  style={[
                    layoutStyles.preview,
                    { color: tokens.color.text.secondary },
                  ]}
                  numberOfLines={1}
                >
                  {preview}
                </Text>
              )}
            </View>

            <View style={layoutStyles.rightContainer}>
              {unread && unread > 0 && (
                <Badge label={String(unread)} size="sm" />
              )}
              {trailingElement}
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
