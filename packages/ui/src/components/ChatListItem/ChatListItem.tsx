import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useTokens, useComponentTokens } from "@truongdq01/headless";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";

// ─── Types ────────────────────────────────────────────────────────

export interface ChatListItemProps {
  /** Optional unique id */
  id?: string;
  /** Avatar source or initials */
  avatar?: {
    src?: string;
    initials?: string;
    status?: "online" | "offline" | "busy" | "away";
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
  const tokens = useTokens();
  const { list } = useComponentTokens();

  const pressed = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: pressed.value === 1
      ? tokens.color.surface.hover
      : selected
        ? tokens.color.brand.subtle
        : "transparent",
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      onPressIn={() => { pressed.value = withSpring(1, { damping: 20 }); }}
      onPressOut={() => { pressed.value = withSpring(0, { damping: 20 }); }}
    >
      <Animated.View style={[styles.container, containerStyle]}>
        {/* Avatar */}
        {avatar && (
          <Avatar
            src={avatar.src}
            initials={avatar.initials}
            status={avatar.status}
            size="md"
            style={styles.avatar}
          />
        )}

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.nameContainer}>
              {pinned && (
                <Text style={[styles.iconPin, { color: tokens.color.brand.default }]}>📌</Text>
              )}
              <Text
                style={[
                  styles.name,
                  { color: tokens.color.text.primary },
                  muted && { color: tokens.color.text.secondary },
                ]}
                numberOfLines={1}
              >
                {name}
              </Text>
              {muted && (
                <Text style={[styles.iconMute, { color: tokens.color.text.tertiary }]}>🔕</Text>
              )}
            </View>

            {time && (
              <Text
                style={[
                  styles.time,
                  { color: tokens.color.text.tertiary },
                  unread && unread > 0 ? { color: tokens.color.brand.default, fontWeight: "600" as const } : undefined,
                ]}
              >
                {time}
              </Text>
            )}
          </View>

          <View style={styles.previewRow}>
            <View style={styles.previewContainer}>
              {outgoing && (
                <Text style={[styles.checkmark, { color: read ? tokens.color.info.icon : tokens.color.text.tertiary }]}>
                  {read ? "✓✓" : "✓"}
                </Text>
              )}
              {preview && (
                <Text style={[styles.preview, { color: tokens.color.text.secondary }]} numberOfLines={1}>
                  {preview}
                </Text>
              )}
            </View>

            <View style={styles.rightContainer}>
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

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 72,
  },
  avatar: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    flex: 1,
  },
  iconPin: {
    marginRight: 4,
    fontSize: 14,
  },
  iconMute: {
    marginLeft: 4,
    fontSize: 14,
  },
  time: {
    fontSize: 13,
    lineHeight: 16,
    textAlign: "right",
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  checkmark: {
    fontSize: 12,
    marginRight: 4,
  },
  preview: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});


