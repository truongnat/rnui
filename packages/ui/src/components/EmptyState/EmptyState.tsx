import React from "react";
import { View, Text } from "react-native";
import { useComponentTokens, useTokens } from "@truongdq01/headless";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const { emptyState } = useComponentTokens();
  const tokens = useTokens();

  return (
    <View style={emptyState.container as any}>
      {icon && (
        <View style={{ marginBottom: tokens.spacing[2] }}>
          {React.isValidElement<{ size?: number | string; color?: string }>(icon)
            ? React.cloneElement(icon, {
                size: icon.props.size ?? emptyState.icon.size,
                color: icon.props.color ?? emptyState.icon.color,
              })
            : icon}
        </View>
      )}
      
      {title && (
        <Text style={emptyState.title as any}>
          {title}
        </Text>
      )}
      
      {description && (
        <Text style={emptyState.description as any}>
          {description}
        </Text>
      )}
      
      {action && (
        <View style={{ marginTop: tokens.spacing[4] }}>
          {action}
        </View>
      )}
    </View>
  );
}
