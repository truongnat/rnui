import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export interface BreadcrumbsProps {
  children?: React.ReactNode;
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

export function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
}: BreadcrumbsProps) {
  const tokens = useTokens();
  const items = React.Children.toArray(children);

  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      <Text key="ellipsis" style={{ color: tokens.color.text.tertiary }}>...</Text>,
      ...items.slice(items.length - itemsAfterCollapse),
    ];
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
      {displayItems.map((child, idx) => (
        <React.Fragment key={idx}>
          {child}
          {idx < displayItems.length - 1 && (
            <Text style={{ marginHorizontal: 6, color: tokens.color.text.tertiary }}>{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
