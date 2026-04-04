import React, { useCallback, useMemo } from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { ActivityIndicator, Text, View, StyleSheet, Linking, type StyleProp, type ViewStyle } from "react-native";
import { usePressable, useComponentTokens, useIconStyle, useTokens } from "@truongdq01/headless";
import type { PressFeedbackMode } from "@truongdq01/headless";

// ─── Types ────────────────────────────────────────────────────────

/**
 * Available button visual style variants
 */
export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "destructive"
  | "text"
  | "contained"
  | "outlined";

/**
 * Available button size presets
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Available button color themes
 */
export type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "accent";  // Amber CTA — stands out from brand violet

/**
 * Props for the Button component
 */
export interface ButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Color theme */
  color?: ButtonColor;
  /** Size preset */
  size?: ButtonSize;
  /** Button label (optional for icon-only buttons) */
  label?: string;
  /** Optional children (preferred over label) */
  children?: React.ReactNode;
  /** Called on press */
  onPress?: () => void;
  /** Called on long press */
  onLongPress?: () => void;
  /** Disable all interaction and apply disabled styles */
  disabled?: boolean;
  /** Show loading spinner, disable interaction */
  loading?: boolean;
  /** Custom loading indicator */
  loadingIndicator?: React.ReactNode;
  /** Loading indicator placement */
  loadingPosition?: "start" | "end" | "center";
  /** Slot for leading icon */
  leadingIcon?: React.ReactNode;
  /** Slot for trailing icon */
  trailingIcon?: React.ReactNode;
  /** Alias for leadingIcon */
  startIcon?: React.ReactNode;
  /** Alias for trailingIcon */
  endIcon?: React.ReactNode;
  /** Override press feedback mode */
  feedbackMode?: PressFeedbackMode;
  /** Fill container width */
  fullWidth?: boolean;
  /** Render as link */
  href?: string;
  /** Remove drop shadow */
  disableElevation?: boolean;
  /** Additional style override */
  style?: object;
  /** Accessibility label override (defaults to label) */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
}

// ─── Component ────────────────────────────────────────────────────

/**
 * Button component with multiple variants, sizes, and interaction states.
 * Supports icons, loading states, accessibility, and gesture feedback.
 *
 * @param props - Button configuration props
 * @returns Memoized React button component
 *
 * @example
 * ```tsx
 * <Button
 *   variant="solid"
 *   color="primary"
 *   size="md"
 *   onPress={() => console.log('Pressed')}
 * >
 *   Click me
 * </Button>
 * ```
 *
 * @example With loading state
 * ```tsx
 * <Button loading loadingPosition="start">
 *   Saving...
 * </Button>
 * ```
 */
export const Button = React.memo(({
  variant = "solid",
  color = "primary",
  size = "md",
  label,
  children,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  loadingIndicator,
  loadingPosition = "center",
  leadingIcon,
  trailingIcon,
  startIcon,
  endIcon,
  feedbackMode = "scale",
  fullWidth = false,
  href,
  disableElevation = false,
  style,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) => {
  const { button } = useComponentTokens();
  const tokens = useTokens();
  const { size: iconSize } = useIconStyle("button");
  const isDisabled = disabled || loading;

  const resolvedVariant: "solid" | "outline" | "ghost" | "destructive" = useMemo(() => {
    if (variant === "contained") return "solid";
    if (variant === "outlined") return "outline";
    if (variant === "text") return "ghost";
    return variant as "solid" | "outline" | "ghost" | "destructive";
  }, [variant]);

  const resolvedColor = useMemo(() => {
    if (color === "inherit") {
      return {
        main: tokens.color.text.primary,
        subtle: tokens.color.bg.muted,
        textOn: tokens.color.text.inverse,
      };
    }
    if (color === "secondary") {
      return {
        main: tokens.color.text.secondary,
        subtle: tokens.color.bg.muted,
        textOn: tokens.color.text.inverse,
      };
    }
    if (color === "success") {
      return {
        main: tokens.color.success.icon,
        subtle: tokens.color.success.bg,
        textOn: tokens.color.text.inverse,
      };
    }
    if (color === "warning") {
      return {
        main: tokens.color.warning.icon,
        subtle: tokens.color.warning.bg,
        textOn: tokens.color.text.inverse,
      };
    }
    if (color === "error") {
      return {
        main: tokens.color.error.icon,
        subtle: tokens.color.error.bg,
        textOn: tokens.color.text.inverse,
      };
    }
    if (color === "info") {
      return {
        main: tokens.color.info.icon,
        subtle: tokens.color.info.bg,
        textOn: tokens.color.text.inverse,
      };
    }
    if (color === "accent") {
      return {
        main: tokens.color.accent.default,
        subtle: tokens.color.accent.subtle,
        textOn: tokens.color.accent.onAccent,
      };
    }
    return {
      main: tokens.color.brand.default,
      subtle: tokens.color.brand.subtle,
      textOn: tokens.color.text.inverse,
    };
  }, [color, tokens]);

  const handlePress = useCallback(() => {
    if (!href) {
      onPress?.();
      return;
    }
    onPress?.();
    void Linking.openURL(href).catch(() => {});
  }, [href, onPress]);

  const hitSlop = useMemo(() => {
    const height = button.size[size].container.height;
    const padding = Math.max(0, (44 - height) / 2);
    // If it's an icon-only button, width might also be small
    const isIconOnly = !label && !children;
    const horizontalPadding = isIconOnly ? padding : 0;
    return { top: padding, bottom: padding, left: horizontalPadding, right: horizontalPadding };
  }, [button, size, label, children]);

  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress: handlePress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? (typeof children === "string" ? children : label),
    accessibilityHint,
    accessibilityRole: "button",
    hitSlop,
  });

  // Resolve styles from component tokens — only recomputes on theme change
  const containerStyle = useMemo(() => [
    button.variant[resolvedVariant].container,
    button.size[size].container,
    fullWidth && { alignSelf: "stretch" as const },
    isDisabled && button.disabled.container,
    !label && !children && { paddingHorizontal: button.size[size].container.paddingHorizontal / 2, width: button.size[size].container.height },
    disableElevation && tokens.shadow.none,
    resolvedVariant === "solid" && { backgroundColor: resolvedColor.main },
    resolvedVariant === "outline" && { borderColor: resolvedColor.main },
    resolvedVariant === "ghost" && { backgroundColor: resolvedColor.subtle },
    resolvedVariant === "destructive" && { backgroundColor: tokens.color.error.bg, borderColor: tokens.color.error.border },
    style,
  ], [button, resolvedVariant, size, fullWidth, isDisabled, label, children, disableElevation, tokens, resolvedColor, style]);

  const textStyle = useMemo(() => [
    button.variant[resolvedVariant].text,
    button.size[size].text,
    resolvedVariant === "solid" && { color: resolvedColor.textOn || tokens.color.text.inverse },
    resolvedVariant === "outline" && { color: resolvedColor.main },
    resolvedVariant === "ghost" && { color: resolvedColor.main },
    resolvedVariant === "destructive" && { color: tokens.color.error.text },
  ], [button, resolvedVariant, size, resolvedColor, tokens]);

  const resolvedLabelColor = useMemo(() => {
    switch (resolvedVariant) {
      case "solid":
        return String(resolvedColor.textOn ?? tokens.color.text.inverse);
      case "outline":
      case "ghost":
        return String(resolvedColor.main);
      case "destructive":
        return String(tokens.color.error.text);
      default: {
        const _never: never = resolvedVariant;
        throw new Error(`Unexpected button variant: ${_never}`);
      }
    }
  }, [resolvedVariant, resolvedColor, tokens]);

  const iconColor = resolvedLabelColor;
  const content = children ?? label;
  const isTextContent = typeof content === "string" || typeof content === "number";
  const leading = startIcon ?? leadingIcon;
  const trailing = endIcon ?? trailingIcon;

  // Helper to clone icon with standardized props
  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;
    if (React.isValidElement<{ size?: number | string; color?: string }>(icon)) {
      return React.cloneElement(icon, {
        size: icon.props.size ?? iconSize,
        color: icon.props.color ?? iconColor,
      });
    }
    return icon;
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[containerStyle, animatedStyle, { position: "relative" }] as StyleProp<ViewStyle>}
        {...accessibilityProps}
      >
        <View style={[
          styles.contentContainer,
          {
            gap: button.variant[resolvedVariant].container.gap,
            opacity: loading && loadingPosition === "center" ? 0 : 1,
          }
        ]}>
          {loading && loadingPosition === "start" && (loadingIndicator ?? <ActivityIndicator size="small" color={iconColor} />)}
          {renderIcon(leading)}
          {isTextContent ? <Text style={textStyle}>{content}</Text> : content}
          {renderIcon(trailing)}
          {loading && loadingPosition === "end" && (loadingIndicator ?? <ActivityIndicator size="small" color={iconColor} />)}
        </View>

        {loading && loadingPosition === "center" && (
          <View style={[StyleSheet.absoluteFill, styles.loadingWrapper]}>
            {loadingIndicator ?? <ActivityIndicator size="small" color={iconColor} />}
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
