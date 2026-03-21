import React from "react";
import { View, Text } from "react-native";
import { useComponentTokens } from "@rnui/headless";

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
  const { breadcrumbs } = useComponentTokens();
  const items = React.Children.toArray(children);

  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      <Text key="ellipsis" style={{ color: breadcrumbs.separator.color }}>...</Text>,
      ...items.slice(items.length - itemsAfterCollapse),
    ];
  }

  return (
    <View style={breadcrumbs.container}>
      {displayItems.map((child, idx) => (
        <React.Fragment key={idx}>
          {child}
          {idx < displayItems.length - 1 && (
            <Text style={{ marginHorizontal: breadcrumbs.container.gap, color: breadcrumbs.separator.color, fontSize: breadcrumbs.separator.fontSize }}>{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
