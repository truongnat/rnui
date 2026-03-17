import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import { useListItem, useTokens } from "@rnui/headless";
import type { SwipeAction } from "@rnui/headless";

// ─── ListItem ─────────────────────────────────────────────────────

export interface ListItemProps {
  title: string;
  subtitle?: string;
  /** Leading element — avatar, icon, etc. */
  leading?: React.ReactNode;
  /** Trailing element — badge, chevron, value */
  trailing?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  trailingActions?: SwipeAction[];
  leadingActions?: SwipeAction[];
  disabled?: boolean;
  /** Show bottom separator */
  showSeparator?: boolean;
}

export function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false,
  showSeparator = true,
}: ListItemProps) {
  const tokens = useTokens();
  const {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps,
  } = useListItem({ onPress, onLongPress, trailingActions, leadingActions, disabled });

  const hasSwipe = trailingActions.length > 0 || leadingActions.length > 0;

  return (
    <View style={{ overflow: "hidden" }}>
      {/* Leading swipe actions */}
      {leadingActions.length > 0 && (
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              flexDirection: "row",
            },
            leadingActionsStyle,
          ]}
        >
          {leadingActions.map((action, i) => (
            <Pressable
              key={i}
              onPress={action.onPress}
              style={{
                width: 80,
                backgroundColor: action.color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" }}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </Animated.View>
      )}

      {/* Trailing swipe actions */}
      {trailingActions.length > 0 && (
        <Animated.View
          style={[
            {
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              flexDirection: "row",
              justifyContent: "flex-end",
            },
            trailingActionsStyle,
          ]}
        >
          {trailingActions.map((action, i) => (
            <Pressable
              key={i}
              onPress={action.onPress}
              style={{
                width: 80,
                backgroundColor: action.color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" }}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </Animated.View>
      )}

      {/* Main row */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: tokens.spacing[4],
              paddingVertical: tokens.spacing[3],
              backgroundColor: tokens.color.surface.default,
              gap: tokens.spacing[3],
              opacity: disabled ? 0.4 : 1,
            },
            itemAnimatedStyle,
          ]}
          {...accessibilityProps}
        >
          {leading && <View>{leading}</View>}

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: tokens.fontSize.md,
                color: tokens.color.text.primary,
                fontWeight: tokens.fontWeight.medium,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  fontSize: tokens.fontSize.sm,
                  color: tokens.color.text.secondary,
                  marginTop: 2,
                }}
                numberOfLines={2}
              >
                {subtitle}
              </Text>
            )}
          </View>

          {trailing && <View>{trailing}</View>}
        </Animated.View>
      </GestureDetector>

      {showSeparator && (
        <View
          style={{
            height: 0.5,
            marginLeft: leading ? tokens.spacing[4] + 40 + tokens.spacing[3] : tokens.spacing[4],
            backgroundColor: tokens.color.border.default,
          }}
        />
      )}
    </View>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────

export interface SectionHeaderProps {
  title: string;
  trailing?: React.ReactNode;
}

export function SectionHeader({ title, trailing }: SectionHeaderProps) {
  const tokens = useTokens();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: tokens.spacing[4],
        paddingTop: tokens.spacing[5],
        paddingBottom: tokens.spacing[2],
        backgroundColor: tokens.color.bg.subtle,
      }}
    >
      <Text
        style={{
          fontSize: tokens.fontSize.xs,
          fontWeight: tokens.fontWeight.semibold,
          color: tokens.color.text.tertiary,
          textTransform: "uppercase",
          letterSpacing: 0.7,
        }}
      >
        {title}
      </Text>
      {trailing}
    </View>
  );
}

// ─── List ─────────────────────────────────────────────────────────

export interface ListProps<T>
  extends Omit<FlashListProps<T>, "renderItem" | "estimatedItemSize"> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  estimatedItemSize?: number;
  /** Show divider between items */
  separator?: boolean;
  /** Empty state element */
  emptyComponent?: React.ReactElement;
  /** Loading skeleton count */
  loadingCount?: number;
  isLoading?: boolean;
}

export function List<T>({
  data,
  renderItem,
  estimatedItemSize = 60,
  separator = false,
  emptyComponent,
  isLoading = false,
  loadingCount = 5,
  ...rest
}: ListProps<T>) {
  const tokens = useTokens();

  const renderFlashItem = useCallback(
    ({ item, index }: { item: T; index: number }) => renderItem(item, index),
    [renderItem]
  );

  const ItemSeparator = separator
    ? () => (
      <View
        style={{
          height: 0.5,
          marginLeft: tokens.spacing[4],
          backgroundColor: tokens.color.border.default,
        }}
      />
    )
    : undefined;

  if (isLoading) {
    return (
      <View>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </View>
    );
  }

  if (data.length === 0 && emptyComponent) {
    return emptyComponent;
  }

  const FlashListAny = FlashList as any;

  return (
    <FlashListAny
      data={data}
      renderItem={renderFlashItem}
      estimatedItemSize={estimatedItemSize}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────

function SkeletonItem() {
  const tokens = useTokens();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3],
      }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.color.bg.muted }} />
      <View style={{ flex: 1, gap: 6 }}>
        <View style={{ width: "60%", height: 14, borderRadius: 4, backgroundColor: tokens.color.bg.muted }} />
        <View style={{ width: "40%", height: 12, borderRadius: 4, backgroundColor: tokens.color.bg.emphasis }} />
      </View>
    </View>
  );
}
