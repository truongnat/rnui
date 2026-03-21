import React from "react";
import { View, Text, Pressable } from "react-native";
import { usePagination, type PaginationItem, useTokens, useComponentTokens } from "@rnui/headless";

export interface PaginationProps {
  count: number;
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  variant?: "text" | "outlined";
  shape?: "circular" | "rounded";
  size?: "sm" | "md" | "lg";
}

export function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md",
}: PaginationProps) {
  const tokens = useTokens();
  const { pagination } = useComponentTokens();
  const { page: current, setPage, items } = usePagination({ count, page, defaultPage, onChange });

  const s = pagination.size[size];

  const renderItem = (item: PaginationItem, idx: number) => {
    if (typeof item !== "number") {
      return (
        <Text key={`ellipsis-${idx}`} style={{ paddingHorizontal: 8, color: tokens.color.text.secondary }}>
          ...
        </Text>
      );
    }

    const selected = item === current;
    const itemTokens = selected ? pagination.item.active : pagination.item.default;

    return (
      <Pressable
        key={item}
        onPress={() => setPage(item)}
        style={{
          height: s,
          minWidth: s,
          paddingHorizontal: 8,
          borderRadius: shape === "circular" ? s / 2 : tokens.radius.md,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: itemTokens.bg,
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor: itemTokens.borderColor,
        }}
      >
        <Text style={{ fontSize: tokens.fontSize[size], color: itemTokens.color }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: pagination.gap }}>
      {items.map(renderItem)}
    </View>
  );
}
