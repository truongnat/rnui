import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";
import { Button } from "../Button";

export interface EmptyStateAction {
  label: string;
  onPress: () => void;
  variant?: "solid" | "outline" | "ghost";
}

export interface EmptyStateProps {
  /** Large icon/illustration slot — pass an SVG or Image */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Primary action button */
  action?: EmptyStateAction;
  /** Secondary action link */
  secondaryAction?: EmptyStateAction;
  /** Compact variant for inline empty states inside lists */
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
}: EmptyStateProps) {
  const tokens = useTokens();

  return (
    <View
      style={{
        flex: compact ? undefined : 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: tokens.spacing[6],
        paddingVertical: compact ? tokens.spacing[8] : tokens.spacing[16],
        gap: tokens.spacing[3],
      }}
    >
      {/* Icon slot */}
      {icon && (
        <View
          style={{
            width: compact ? 48 : 72,
            height: compact ? 48 : 72,
            borderRadius: compact ? 24 : 36,
            backgroundColor: tokens.color.bg.muted, // Use darker background for icon visibility
            alignItems: "center",
            justifyContent: "center",
            marginBottom: tokens.spacing[1],
          }}
        >
          {icon}
        </View>
      )}

      {/* Default icon when none provided */}
      {!icon && (
        <View
          style={{
            width: compact ? 48 : 72,
            height: compact ? 48 : 72,
            borderRadius: compact ? 24 : 36,
            backgroundColor: tokens.color.bg.muted, // Use darker background for icon visibility
            alignItems: "center",
            justifyContent: "center",
            marginBottom: tokens.spacing[1],
          }}
        >
          <Text style={{ fontSize: compact ? 20 : 32, color: tokens.color.text.tertiary }}>
            ○
          </Text>
        </View>
      )}

      {/* Text */}
      <Text
        style={{
          fontSize: compact ? tokens.fontSize.md : tokens.fontSize.lg,
          fontWeight: tokens.fontWeight.semibold,
          color: tokens.color.text.primary,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={{
            fontSize: tokens.fontSize.sm,
            color: tokens.color.text.secondary,
            textAlign: "center",
            lineHeight: tokens.fontSize.sm * tokens.lineHeight.relaxed,
            maxWidth: 280,
          }}
        >
          {description}
        </Text>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <View
          style={{
            marginTop: tokens.spacing[2],
            gap: tokens.spacing[2],
            alignItems: "center",
            width: "100%",
          }}
        >
          {action && (
            <Button
              label={action.label}
              variant={action.variant ?? "solid"}
              onPress={action.onPress}
              size={compact ? "sm" : "md"}
              fullWidth
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
              variant={secondaryAction.variant ?? "ghost"}
              onPress={secondaryAction.onPress}
              size={compact ? "sm" : "md"}
            />
          )}
        </View>
      )}
    </View>
  );
}