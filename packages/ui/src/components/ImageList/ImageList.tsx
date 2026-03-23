import React, { createContext, useContext, useMemo, useState } from "react";
import { View, Text, Dimensions, type LayoutChangeEvent } from "react-native";
import { useTokens, useComponentTokens } from "@truongnat/headless";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type ImageListVariant = "standard" | "woven" | "masonry" | "quilted";

interface ImageListContextValue {
  cols: number;
  gap: number;
  rowHeight: number | "auto";
  variant: ImageListVariant;
  width: number;
}

const ImageListContext = createContext<ImageListContextValue | null>(null);

function useImageListContext() {
  return useContext(ImageListContext);
}

export interface ImageListProps {
  children?: React.ReactNode;
  cols?: number;
  gap?: number;
  rowHeight?: number | "auto";
  variant?: ImageListVariant;
  style?: object;
}

export function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style,
}: ImageListProps) {
  const [width, setWidth] = useState(SCREEN_WIDTH);

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };

  const ctx = useMemo(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);

  return (
    <ImageListContext.Provider value={ctx}>
      <View onLayout={handleLayout} style={[{ flexDirection: "row", flexWrap: "wrap" }, style]}>
        {children}
      </View>
    </ImageListContext.Provider>
  );
}

export interface ImageListItemProps {
  children?: React.ReactNode;
  cols?: number;
  rows?: number;
  style?: object;
}

export function ImageListItem({ children, cols = 1, rows = 1, style }: ImageListItemProps) {
  const ctx = useImageListContext();
  const gap = ctx?.gap ?? 8;
  const columns = ctx?.cols ?? 2;
  const variant = ctx?.variant ?? "standard";
  const rowHeight = ctx?.rowHeight ?? 120;
  const listWidth = ctx?.width ?? 0;

  const totalGap = gap * (columns - 1);
  const baseWidth = columns > 0 ? (listWidth - totalGap) / columns : listWidth;
  const itemWidth = cols * baseWidth + gap * (cols - 1);

  const height = variant === "masonry" || rowHeight === "auto" ? undefined : rowHeight * rows + gap * (rows - 1);

  return (
    <View style={[{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style]}>
      {children}
    </View>
  );
}

export interface ImageListItemBarProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actionIcon?: React.ReactNode;
  position?: "top" | "bottom";
  style?: object;
}

export function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style,
}: ImageListItemBarProps) {
  const { imageList } = useComponentTokens();
  const tokens = useTokens();

  return (
    <View
      style={[
        (imageList as any).bar,
        {
          position: "absolute",
          left: 0,
          right: 0,
        },
        position === "top" ? { top: 0 } : { bottom: 0 },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        {title ? <Text style={(imageList as any).bar.title as any}>{title}</Text> : null}
        {subtitle ? <Text style={(imageList as any).bar.subtitle as any}>{subtitle}</Text> : null}
      </View>
      {actionIcon}
    </View>
  );
}
