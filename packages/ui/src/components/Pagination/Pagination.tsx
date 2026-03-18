import React from "react";
import { View, Text, Pressable } from "react-native";
import { usePagination, type PaginationItem, useTokens } from "@rnui/headless";

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
  const { page: current, setPage, items } = usePagination({ count, page, defaultPage, onChange });

  const sizeMap = {
    sm: { height: 28, minWidth: 28, fontSize: tokens.fontSize.sm },
    md: { height: 34, minWidth: 34, fontSize: tokens.fontSize.md },
    lg: { height: 40, minWidth: 40, fontSize: tokens.fontSize.lg },
  };

  const s = sizeMap[size];

  const renderItem = (item: PaginationItem, idx: number) => {
    if (typeof item !== "number") {
      return (
        <Text key={`ellipsis-${idx}`} style={{ paddingHorizontal: 8, color: tokens.color.text.secondary }}>
          ...
        </Text>
      );
    }

    const selected = item === current;
    return (
      <Pressable
        key={item}
        onPress={() => setPage(item)}
        style={{
          height: s.height,
          minWidth: s.minWidth,
          paddingHorizontal: 8,
          borderRadius: shape === "circular" ? s.height / 2 : tokens.radius.md,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor: tokens.color.border.default,
        }}
      >
        <Text style={{ fontSize: s.fontSize, color: selected ? tokens.color.brand.default : tokens.color.text.primary }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      {items.map(renderItem)}
    </View>
  );
}
