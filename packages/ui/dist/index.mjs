// src/index.ts
export * from "@rnui/headless";
import { ThemeProvider, useTheme, useTokens as useTokens57, useComponentTokens as useComponentTokens11, useIsDark } from "@rnui/headless";
import { useIconStyle as useIconStyle10 } from "@rnui/headless";

// src/components/Button/Button.tsx
import React, { useMemo } from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { ActivityIndicator, Text, View, StyleSheet, Linking } from "react-native";
import { usePressable, useComponentTokens, useIconStyle, useTokens } from "@rnui/headless";
function Button({
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
  accessibilityHint
}) {
  const { button } = useComponentTokens();
  const tokens = useTokens();
  const { size: iconSize } = useIconStyle("button");
  const isDisabled = disabled || loading;
  const resolvedVariant = useMemo(() => {
    if (variant === "contained") return "solid";
    if (variant === "outlined") return "outline";
    if (variant === "text") return "ghost";
    return variant;
  }, [variant]);
  const resolvedColor = useMemo(() => {
    if (color === "inherit") {
      return {
        main: tokens.color.text.primary,
        subtle: tokens.color.bg.muted,
        textOn: tokens.color.text.inverse
      };
    }
    if (color === "secondary") {
      return {
        main: tokens.color.text.secondary,
        subtle: tokens.color.bg.muted,
        textOn: tokens.color.text.inverse
      };
    }
    if (color === "success") {
      return {
        main: tokens.color.success.icon,
        subtle: tokens.color.success.bg,
        textOn: tokens.color.text.inverse
      };
    }
    if (color === "warning") {
      return {
        main: tokens.color.warning.icon,
        subtle: tokens.color.warning.bg,
        textOn: tokens.color.text.inverse
      };
    }
    if (color === "error") {
      return {
        main: tokens.color.error.icon,
        subtle: tokens.color.error.bg,
        textOn: tokens.color.text.inverse
      };
    }
    if (color === "info") {
      return {
        main: tokens.color.info.icon,
        subtle: tokens.color.info.bg,
        textOn: tokens.color.text.inverse
      };
    }
    if (color === "accent") {
      return {
        main: tokens.color.accent.default,
        subtle: tokens.color.accent.subtle,
        textOn: tokens.color.accent.onAccent
      };
    }
    return {
      main: tokens.color.brand.default,
      subtle: tokens.color.brand.subtle,
      textOn: tokens.color.text.inverse
    };
  }, [color, tokens]);
  const handlePress = useMemo(() => {
    if (!href) return onPress;
    return () => {
      onPress?.();
      Linking.openURL(href);
    };
  }, [href, onPress]);
  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress: handlePress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? (typeof children === "string" ? children : label),
    accessibilityHint,
    accessibilityRole: "button"
  });
  const containerStyle = useMemo(() => [
    button.variant[resolvedVariant].container,
    button.size[size].container,
    fullWidth && { alignSelf: "stretch" },
    isDisabled && button.disabled.container,
    !label && !children && { paddingHorizontal: button.size[size].container.paddingHorizontal / 2, width: button.size[size].container.height },
    disableElevation && tokens.shadow.none,
    resolvedVariant === "solid" && { backgroundColor: resolvedColor.main },
    resolvedVariant === "outline" && { borderColor: resolvedColor.main },
    resolvedVariant === "ghost" && { backgroundColor: resolvedColor.subtle },
    resolvedVariant === "destructive" && { backgroundColor: tokens.color.error.bg, borderColor: tokens.color.error.border },
    style
  ], [button, resolvedVariant, size, fullWidth, isDisabled, label, children, disableElevation, tokens, resolvedColor, style]);
  const textStyle = useMemo(() => [
    button.variant[resolvedVariant].text,
    button.size[size].text,
    resolvedVariant === "solid" && { color: resolvedColor.textOn },
    resolvedVariant === "outline" && { color: resolvedColor.main },
    resolvedVariant === "ghost" && { color: resolvedColor.main },
    resolvedVariant === "destructive" && { color: tokens.color.error.text }
  ], [button, resolvedVariant, size, resolvedColor, tokens]);
  const iconColor = String(textStyle[0]?.color ?? button.variant[resolvedVariant].text.color);
  const content = children ?? label;
  const isTextContent = typeof content === "string" || typeof content === "number";
  const leading = startIcon ?? leadingIcon;
  const trailing = endIcon ?? trailingIcon;
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        size: icon.props?.size ?? iconSize,
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React.createElement(
    Animated.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ React.createElement(View, { style: [
      styles.contentContainer,
      {
        gap: button.variant[resolvedVariant].container.gap,
        opacity: loading && loadingPosition === "center" ? 0 : 1
      }
    ] }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ React.createElement(ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ React.createElement(Text, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ React.createElement(ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ React.createElement(View, { style: [StyleSheet.absoluteFill, styles.loadingWrapper] }, loadingIndicator ?? /* @__PURE__ */ React.createElement(ActivityIndicator, { size: "small", color: iconColor }))
  ));
}
var styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingWrapper: {
    alignItems: "center",
    justifyContent: "center"
  }
});

// src/components/Input/Input.tsx
import React2, { useMemo as useMemo2, useState } from "react";
import { TextInput as RNTextInput, View as View2, Text as Text2 } from "react-native";
import { useComponentTokens as useComponentTokens2, useTokens as useTokens2, useIconStyle as useIconStyle2 } from "@rnui/headless";
function Input({
  label,
  error,
  helperText,
  size = "md",
  leadingElement,
  trailingElement,
  disabled = false,
  onClearError,
  onFocus,
  onBlur,
  onChange,
  ...rest
}) {
  const { input } = useComponentTokens2();
  const tokens = useTokens2();
  const { size: iconSize, color: iconColor } = useIconStyle2("input");
  const [isFocused, setIsFocused] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const handleChange = (e) => {
    const text = e.nativeEvent.text;
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };
  const containerStyle = useMemo2(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ], [input, size, isFocused, error, disabled]);
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React2.isValidElement(icon)) {
      return React2.cloneElement(icon, {
        size: icon.props?.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React2.createElement(View2, null, label && /* @__PURE__ */ React2.createElement(Text2, { style: input.label }, label), /* @__PURE__ */ React2.createElement(View2, { style: containerStyle }, renderIcon(leadingElement), /* @__PURE__ */ React2.createElement(
    RNTextInput,
    {
      style: { flex: 1, color: input.text.color, fontSize: input.size[size].fontSize },
      placeholderTextColor: input.text.placeholderColor,
      editable: !disabled,
      accessibilityLabel: label,
      accessibilityState: { disabled },
      onFocus: (e) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      onChange: (e) => {
        handleChange(e.nativeEvent.text);
      },
      ...rest
    }
  ), renderIcon(trailingElement)), error ? /* @__PURE__ */ React2.createElement(Text2, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React2.createElement(Text2, { style: input.helperText }, helperText) : null);
}

// src/components/Input/PasswordInput.tsx
import React3, { useState as useState2 } from "react";
import { Pressable } from "react-native";
import { useIconStyle as useIconStyle3 } from "@rnui/headless";
import { Eye, EyeOff } from "lucide-react-native";
function PasswordInput(props) {
  const [show, setShow] = useState2(false);
  const { size, color } = useIconStyle3("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ React3.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ React3.createElement(
        Pressable,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        show ? /* @__PURE__ */ React3.createElement(EyeOff, { size, color }) : /* @__PURE__ */ React3.createElement(Eye, { size, color })
      )
    }
  );
}

// src/components/Card/Card.tsx
import React4, { useMemo as useMemo3 } from "react";
import Animated2 from "react-native-reanimated";
import { GestureDetector as GestureDetector2 } from "react-native-gesture-handler";
import { View as View3 } from "react-native";
import { usePressable as usePressable2, useComponentTokens as useComponentTokens3 } from "@rnui/headless";
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = useComponentTokens3();
  const containerStyle = useMemo3(() => [
    card.container,
    padding !== "none" && { padding: card.padding[padding] },
    style
  ], [card, padding, style]);
  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = usePressable2({
      onPress,
      feedbackMode: "scaleSubtle",
      accessibilityLabel,
      accessibilityRole: "button"
    });
    return /* @__PURE__ */ React4.createElement(GestureDetector2, { gesture }, /* @__PURE__ */ React4.createElement(Animated2.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ React4.createElement(View3, { style: containerStyle }, children);
}

// src/components/Badge/Badge.tsx
import React5, { useMemo as useMemo4 } from "react";
import { View as View4, Text as Text3 } from "react-native";
import { useComponentTokens as useComponentTokens4, useIconStyle as useIconStyle4 } from "@rnui/headless";
function Badge({ label, variant = "default", size = "md", icon }) {
  const { badge } = useComponentTokens4();
  const { size: iconSize } = useIconStyle4("list");
  const containerStyle = useMemo4(() => [
    badge.base,
    badge.size[size],
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    }
  ], [badge, variant, size]);
  const textStyle = useMemo4(() => [
    badge.text,
    { color: badge.variant[variant].text }
  ], [badge, variant]);
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (React5.isValidElement(el)) {
      return React5.cloneElement(el, {
        size: el.props?.size ?? iconSize * 0.8,
        color: el.props?.color ?? iconColor
      });
    }
    return el;
  };
  return /* @__PURE__ */ React5.createElement(View4, { style: containerStyle }, renderIcon(icon), /* @__PURE__ */ React5.createElement(Text3, { style: textStyle }, label));
}

// src/components/Toast/ToastContainer.tsx
import React7 from "react";
import { View as View6, StyleSheet as StyleSheet2 } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast, dismissToast } from "@rnui/headless";

// src/components/Toast/ToastItem.tsx
import React6, { useEffect } from "react";
import Animated3, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  FadeInUp,
  FadeOutUp,
  FadeInDown,
  FadeOutDown
} from "react-native-reanimated";
import { View as View5, Text as Text4, Pressable as Pressable2 } from "react-native";
import { useComponentTokens as useComponentTokens5, useTokens as useTokens3 } from "@rnui/headless";
function VariantIcon({ variant, color }) {
  const size = 20;
  if (variant === "success") {
    return /* @__PURE__ */ React6.createElement(View5, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React6.createElement(Text4, { style: { color: "#fff", fontSize: 12, fontWeight: "800", marginTop: -1 } }, "\u2713"));
  }
  if (variant === "error") {
    return /* @__PURE__ */ React6.createElement(View5, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React6.createElement(Text4, { style: { color: "#fff", fontSize: 13, fontWeight: "800", marginTop: -1 } }, "\u2715"));
  }
  if (variant === "warning") {
    return /* @__PURE__ */ React6.createElement(View5, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React6.createElement(Text4, { style: { color: "#fff", fontSize: 13, fontWeight: "900" } }, "!"));
  }
  if (variant === "info") {
    return /* @__PURE__ */ React6.createElement(View5, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React6.createElement(Text4, { style: { color: "#fff", fontSize: 13, fontWeight: "900" } }, "i"));
  }
  return null;
}
function ToastItem({ item, position, onDismiss }) {
  const { toast } = useComponentTokens5();
  const tokens = useTokens3();
  const progress = useSharedValue(1);
  useEffect(() => {
    if (item.persistent) return;
    progress.value = withTiming(0, { duration: item.duration }, (finished) => {
      if (finished) runOnJS(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));
  const variantMap = {
    default: { icon: null, iconColor: tokens.color.text.tertiary, progressColor: tokens.color.border.strong },
    success: { icon: "success", iconColor: tokens.color.success.icon, progressColor: tokens.color.success.icon },
    warning: { icon: "warning", iconColor: tokens.color.warning.icon, progressColor: tokens.color.warning.icon },
    error: { icon: "error", iconColor: tokens.color.error.icon, progressColor: tokens.color.error.icon },
    info: { icon: "info", iconColor: tokens.color.info.icon, progressColor: tokens.color.info.icon }
  };
  const v = variantMap[item.variant];
  const entering = position === "top" ? FadeInDown.springify().damping(18).stiffness(280) : FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? FadeOutUp.duration(200) : FadeOutDown.duration(200);
  return /* @__PURE__ */ React6.createElement(
    Animated3.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ React6.createElement(View5, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, React6.isValidElement(item.icon) ? React6.cloneElement(item.icon, {
      size: item.icon.props?.size ?? 20,
      color: item.icon.props?.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ React6.createElement(VariantIcon, { variant: item.variant, color: v.iconColor }),
    /* @__PURE__ */ React6.createElement(Text4, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ React6.createElement(
      Pressable2,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ React6.createElement(Text4, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ React6.createElement(Pressable2, { onPress: () => onDismiss(item.id), hitSlop: 8 }, /* @__PURE__ */ React6.createElement(Text4, { style: { fontSize: 16, color: tokens.color.text.inverse, opacity: 0.7, lineHeight: 18 } }, "\u2715")),
    !item.persistent && /* @__PURE__ */ React6.createElement(View5, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ React6.createElement(Animated3.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ React7.createElement(View6, { style: [styles2.container, positionStyle], pointerEvents: "box-none" }, toasts.map((item) => /* @__PURE__ */ React7.createElement(
    ToastItem,
    {
      key: item.id,
      item,
      position,
      onDismiss: dismissToast
    }
  )));
}
var styles2 = StyleSheet2.create({
  container: {
    position: "absolute",
    zIndex: 9999
  }
});

// src/components/BottomSheet/BottomSheet.tsx
import React8, { forwardRef, useImperativeHandle, useState as useState3 } from "react";
import { View as View7, StyleSheet as StyleSheet3, Dimensions, Modal } from "react-native";
import Animated4 from "react-native-reanimated";
import { GestureDetector as GestureDetector3 } from "react-native-gesture-handler";
import { useSafeAreaInsets as useSafeAreaInsets2 } from "react-native-safe-area-context";
import { useBottomSheet, useTokens as useTokens4 } from "@rnui/headless";
var SCREEN_HEIGHT = Dimensions.get("window").height;
var BottomSheet = forwardRef(
  function BottomSheet2({
    children,
    snapPoints = ["50%"],
    initialSnapIndex,
    onClose,
    onSnapChange,
    enableDismissOnSwipe = true,
    enableBackdrop = true,
    showHandle = true,
    borderRadius = 20
  }, ref) {
    const tokens = useTokens4();
    const insets = useSafeAreaInsets2();
    const [mounted, setMounted] = useState3(false);
    const handleClose = React8.useCallback(() => {
      setMounted(false);
      onClose?.();
    }, [onClose]);
    const {
      open: baseOpen,
      close: baseClose,
      snapTo,
      sheetAnimatedStyle,
      backdropAnimatedStyle,
      panGesture,
      backdropTapGesture
    } = useBottomSheet({
      snapPoints,
      initialSnapIndex,
      onClose: handleClose,
      onSnapChange,
      enableDismissOnSwipe,
      enableBackdrop
    });
    const open = React8.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    useImperativeHandle(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ React8.createElement(Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ React8.createElement(View7, { style: StyleSheet3.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ React8.createElement(GestureDetector3, { gesture: backdropTapGesture }, /* @__PURE__ */ React8.createElement(
      Animated4.View,
      {
        style: [
          StyleSheet3.absoluteFill,
          { backgroundColor: "#000" },
          backdropAnimatedStyle
        ]
      }
    )), /* @__PURE__ */ React8.createElement(
      Animated4.View,
      {
        style: [
          styles3.sheet,
          {
            backgroundColor: tokens.color.surface.overlay,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            paddingBottom: insets.bottom + 8,
            // iOS shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 20,
            // Android elevation
            elevation: 12
          },
          sheetAnimatedStyle
        ]
      },
      /* @__PURE__ */ React8.createElement(GestureDetector3, { gesture: panGesture }, /* @__PURE__ */ React8.createElement(View7, { style: styles3.handleArea }, showHandle && /* @__PURE__ */ React8.createElement(
        View7,
        {
          style: [
            styles3.handle,
            { backgroundColor: tokens.color.border.strong }
          ]
        }
      ))),
      /* @__PURE__ */ React8.createElement(View7, { style: { flex: 1 } }, children)
    )));
  }
);
var styles3 = StyleSheet3.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT
  },
  handleArea: {
    width: "100%",
    height: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2
  }
});

// src/components/Checkbox/Checkbox.tsx
import React9 from "react";
import { View as View8, Text as Text5, Pressable as Pressable3 } from "react-native";
import Animated5, {
  useSharedValue as useSharedValue2,
  useAnimatedStyle as useAnimatedStyle2,
  withSpring as withSpring2,
  interpolate
} from "react-native-reanimated";
import { useCheckbox, useTokens as useTokens5 } from "@rnui/headless";
import { spring } from "@rnui/tokens";
var SIZE = { sm: 18, md: 22, lg: 26 };
var ICON_SIZE = { sm: 10, md: 13, lg: 16 };
function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}) {
  const tokens = useTokens5();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = useCheckbox(hookOptions);
  const boxSize = SIZE[size];
  const iconSize = ICON_SIZE[size];
  const scale = useSharedValue2(1);
  const fillProgress = useSharedValue2(isChecked || isIndeterminate ? 1 : 0);
  React9.useEffect(() => {
    fillProgress.value = withSpring2(isChecked || isIndeterminate ? 1 : 0, spring.snappy);
  }, [isChecked, isIndeterminate]);
  const boxStyle = useAnimatedStyle2(() => ({
    backgroundColor: interpolate(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5 ? tokens.color.brand.default : "transparent",
    borderColor: fillProgress.value > 0.5 ? tokens.color.brand.default : tokens.color.border.default,
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = useAnimatedStyle2(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    scale.value = withSpring2(0.88, spring.snappy, () => {
      scale.value = withSpring2(1, spring.snappy);
    });
    toggle();
  };
  return /* @__PURE__ */ React9.createElement(
    Pressable3,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? 0.4 : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React9.createElement(
      Animated5.View,
      {
        style: [
          {
            width: boxSize,
            height: boxSize,
            borderRadius: 5,
            borderWidth: 1.5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1
          },
          boxStyle
        ]
      },
      /* @__PURE__ */ React9.createElement(Animated5.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ React9.createElement(View8, { style: { width: iconSize, height: 2, backgroundColor: "#fff", borderRadius: 1 } }) : /* @__PURE__ */ React9.createElement(Text5, { style: { color: "#fff", fontSize: iconSize, fontWeight: "700", lineHeight: iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ React9.createElement(View8, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React9.createElement(Text5, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React9.createElement(Text5, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Switch/Switch.tsx
import React10 from "react";
import { View as View9, Text as Text6, Pressable as Pressable4 } from "react-native";
import Animated6, {
  useSharedValue as useSharedValue3,
  useAnimatedStyle as useAnimatedStyle3,
  withSpring as withSpring3,
  interpolateColor
} from "react-native-reanimated";
import { useSwitch, useTokens as useTokens6, useComponentTokens as useComponentTokens6 } from "@rnui/headless";
import { spring as spring2 } from "@rnui/tokens";
function Switch({ label, description, size = "md", ...hookOptions }) {
  const tokens = useTokens6();
  const { switch: switchT } = useComponentTokens6();
  const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch(hookOptions);
  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = tTrack.width - tThumb.width - tTrack.padding * 2;
  const progress = useSharedValue3(isOn ? 1 : 0);
  React10.useEffect(() => {
    progress.value = withSpring3(isOn ? 1 : 0, spring2.snappy);
  }, [isOn]);
  const trackStyle = useAnimatedStyle3(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    )
  }));
  const thumbStyle = useAnimatedStyle3(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ React10.createElement(
    Pressable4,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? switchT.colors.disabledOpacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React10.createElement(
      Animated6.View,
      {
        style: [
          {
            width: tTrack.width,
            height: tTrack.height,
            borderRadius: tTrack.borderRadius,
            justifyContent: "center",
            padding: tTrack.padding
          },
          trackStyle
        ]
      },
      /* @__PURE__ */ React10.createElement(
        Animated6.View,
        {
          style: [
            {
              width: tThumb.width,
              height: tThumb.height,
              borderRadius: tThumb.borderRadius,
              backgroundColor: switchT.colors.thumb,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 2
            },
            thumbStyle
          ]
        }
      )
    ),
    (label || description) && /* @__PURE__ */ React10.createElement(View9, { style: { flex: 1 } }, label && /* @__PURE__ */ React10.createElement(Text6, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React10.createElement(Text6, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Select/Select.tsx
import React11, { useRef, useState as useState4 } from "react";
import { View as View10, Text as Text7, TextInput, ScrollView, Pressable as Pressable5 } from "react-native";
import { useSelect, useTokens as useTokens7, useIconStyle as useIconStyle5 } from "@rnui/headless";
function Select({
  label,
  placeholder = "Select\u2026",
  searchable = false,
  error,
  onClearError,
  options,
  ...hookOptions
}) {
  const tokens = useTokens7();
  const sheetRef = useRef(null);
  const [query, setQuery] = useState4("");
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel,
    triggerProps
  } = useSelect({ options, ...hookOptions, placeholder });
  const hasSelection = displayLabel !== placeholder;
  const filtered = query ? options.filter(
    (o) => o.label.toLowerCase().includes(query.toLowerCase())
  ) : options;
  const handleSelectOption = (option) => {
    selectOption(option.value);
    onClearError?.();
    close();
  };
  const handleOpen = () => {
    setQuery("");
    sheetRef.current?.open();
    open();
  };
  const handleClose = () => {
    sheetRef.current?.close();
    close();
  };
  const handleSelect = (val) => {
    selectOption(val);
    onClearError?.();
    if (!hookOptions.multiple) handleClose();
  };
  const { size: searchIconSize, color: searchIconColor } = useIconStyle5("input");
  return /* @__PURE__ */ React11.createElement(View10, null, label && /* @__PURE__ */ React11.createElement(Text7, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ React11.createElement(
    Pressable5,
    {
      onPress: handleOpen,
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 44,
        paddingHorizontal: tokens.spacing[3],
        borderWidth: 1,
        borderColor: error ? tokens.color.border.error : isOpen ? tokens.color.border.focus : tokens.color.border.default,
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.surface.default
      },
      accessibilityState: { expanded: isOpen }
    },
    /* @__PURE__ */ React11.createElement(
      Text7,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: hasSelection ? tokens.color.text.primary : tokens.color.text.tertiary
        },
        numberOfLines: 1
      },
      displayLabel
    ),
    /* @__PURE__ */ React11.createElement(Text7, { style: { fontSize: 12, color: tokens.color.text.tertiary, marginLeft: 8 } }, isOpen ? "\u25B2" : "\u25BC")
  ), error && /* @__PURE__ */ React11.createElement(Text7, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ React11.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ React11.createElement(View10, { style: { flex: 1, paddingHorizontal: tokens.spacing[4] } }, searchable && isOpen && /* @__PURE__ */ React11.createElement(
      View10,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing[3],
          height: 44,
          marginBottom: tokens.spacing[3],
          backgroundColor: tokens.color.bg.subtle
        }
      },
      /* @__PURE__ */ React11.createElement(View10, { style: { width: searchIconSize, height: searchIconSize, marginRight: 8, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React11.createElement(View10, { style: {
        width: searchIconSize * 0.7,
        height: searchIconSize * 0.7,
        borderRadius: searchIconSize * 0.35,
        borderWidth: 2,
        borderColor: searchIconColor,
        position: "absolute",
        top: 0,
        left: 0
      } }), /* @__PURE__ */ React11.createElement(View10, { style: {
        width: 2,
        height: searchIconSize * 0.4,
        backgroundColor: searchIconColor,
        borderRadius: 1,
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: [{ rotate: "-45deg" }]
      } })),
      /* @__PURE__ */ React11.createElement(
        TextInput,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search\u2026",
          placeholderTextColor: tokens.color.text.tertiary,
          style: { flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" },
          autoFocus: true
        }
      ),
      query.length > 0 && /* @__PURE__ */ React11.createElement(Pressable5, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ React11.createElement(Text7, { style: { fontSize: 14, color: tokens.color.text.tertiary } }, "\u2715"))
    ), /* @__PURE__ */ React11.createElement(ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled" }, filtered.length === 0 ? /* @__PURE__ */ React11.createElement(Text7, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] } }, 'No results for "', query, '"') : filtered.map((option) => {
      const selected = isSelected(option.value);
      return /* @__PURE__ */ React11.createElement(
        Pressable5,
        {
          key: String(option.value),
          onPress: () => !option.disabled && handleSelect(option.value),
          style: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: tokens.spacing[3],
            paddingHorizontal: tokens.spacing[2],
            borderRadius: tokens.radius.md,
            backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
            marginBottom: 2,
            opacity: option.disabled ? 0.4 : 1
          }
        },
        /* @__PURE__ */ React11.createElement(
          Text7,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? tokens.color.brand.text : tokens.color.text.primary,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ React11.createElement(Text7, { style: { fontSize: 14, color: tokens.color.brand.default } }, "\u2713")
      );
    }), /* @__PURE__ */ React11.createElement(View10, { style: { height: tokens.spacing[4] } })))
  ));
}

// src/components/List/List.tsx
import React12, { useCallback } from "react";
import { View as View11, Text as Text8, Pressable as Pressable6 } from "react-native";
import Animated7 from "react-native-reanimated";
import { GestureDetector as GestureDetector4 } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import { useListItem, useTokens as useTokens8, useIconStyle as useIconStyle6 } from "@rnui/headless";
function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false,
  showSeparator = true
}) {
  const tokens = useTokens8();
  const {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps
  } = useListItem({ onPress, onLongPress, trailingActions, leadingActions, disabled });
  const { size: iconSize, color: iconColor } = useIconStyle6("list");
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React12.isValidElement(icon)) {
      return React12.cloneElement(icon, {
        size: icon.props?.size ?? iconSize,
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React12.createElement(View11, { style: { overflow: "hidden" } }, leadingActions.length > 0 && /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      style: [
        {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          flexDirection: "row"
        },
        leadingActionsStyle
      ]
    },
    leadingActions.map((action, i) => /* @__PURE__ */ React12.createElement(
      Pressable6,
      {
        key: i,
        onPress: action.onPress,
        style: {
          width: 80,
          backgroundColor: action.color,
          alignItems: "center",
          justifyContent: "center"
        }
      },
      /* @__PURE__ */ React12.createElement(Text8, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), trailingActions.length > 0 && /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      style: [
        {
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "flex-end"
        },
        trailingActionsStyle
      ]
    },
    trailingActions.map((action, i) => /* @__PURE__ */ React12.createElement(
      Pressable6,
      {
        key: i,
        onPress: action.onPress,
        style: {
          width: 80,
          backgroundColor: action.color,
          alignItems: "center",
          justifyContent: "center"
        }
      },
      /* @__PURE__ */ React12.createElement(Text8, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), /* @__PURE__ */ React12.createElement(GestureDetector4, { gesture }, /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      style: [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: tokens.spacing[4],
          paddingVertical: tokens.spacing[3],
          backgroundColor: tokens.color.surface.default,
          gap: tokens.spacing[3],
          opacity: disabled ? 0.4 : 1
        },
        itemAnimatedStyle
      ],
      ...accessibilityProps
    },
    leading && /* @__PURE__ */ React12.createElement(View11, { style: { width: 24, alignItems: "center", justifyContent: "center" } }, renderIcon(leading)),
    /* @__PURE__ */ React12.createElement(View11, { style: { flex: 1 } }, /* @__PURE__ */ React12.createElement(
      Text8,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        },
        numberOfLines: 1
      },
      title
    ), subtitle && /* @__PURE__ */ React12.createElement(
      Text8,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          color: tokens.color.text.secondary,
          marginTop: 2
        },
        numberOfLines: 2
      },
      subtitle
    )),
    trailing && /* @__PURE__ */ React12.createElement(View11, null, renderIcon(trailing))
  )), showSeparator && /* @__PURE__ */ React12.createElement(
    View11,
    {
      style: {
        height: 0.5,
        marginLeft: leading ? tokens.spacing[4] + 24 + tokens.spacing[3] : tokens.spacing[4],
        backgroundColor: tokens.color.border.default
      }
    }
  ));
}
function SectionHeader({ title, trailing }) {
  const tokens = useTokens8();
  return /* @__PURE__ */ React12.createElement(
    View11,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: tokens.spacing[4],
        paddingTop: tokens.spacing[5],
        paddingBottom: tokens.spacing[2],
        backgroundColor: tokens.color.bg.subtle
      }
    },
    /* @__PURE__ */ React12.createElement(
      Text8,
      {
        style: {
          fontSize: tokens.fontSize.xs,
          fontWeight: tokens.fontWeight.semibold,
          color: tokens.color.text.tertiary,
          textTransform: "uppercase",
          letterSpacing: 0.7
        }
      },
      title
    ),
    trailing
  );
}
function List({
  data,
  renderItem,
  estimatedItemSize = 60,
  separator = false,
  emptyComponent,
  isLoading = false,
  loadingCount = 5,
  ...rest
}) {
  const tokens = useTokens8();
  const renderFlashItem = useCallback(
    ({ item, index }) => renderItem(item, index),
    [renderItem]
  );
  const ItemSeparator = separator ? () => /* @__PURE__ */ React12.createElement(
    View11,
    {
      style: {
        height: 0.5,
        marginLeft: tokens.spacing[4],
        backgroundColor: tokens.color.border.default
      }
    }
  ) : void 0;
  if (isLoading) {
    return /* @__PURE__ */ React12.createElement(View11, null, Array.from({ length: loadingCount }).map((_, i) => /* @__PURE__ */ React12.createElement(SkeletonItem, { key: i })));
  }
  if (data.length === 0 && emptyComponent) {
    return emptyComponent;
  }
  const FlashListAny = FlashList;
  return /* @__PURE__ */ React12.createElement(
    FlashListAny,
    {
      data,
      renderItem: renderFlashItem,
      estimatedItemSize,
      ItemSeparatorComponent: ItemSeparator,
      showsVerticalScrollIndicator: false,
      ...rest
    }
  );
}
function SkeletonItem() {
  const tokens = useTokens8();
  return /* @__PURE__ */ React12.createElement(
    View11,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React12.createElement(View11, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.color.bg.muted } }),
    /* @__PURE__ */ React12.createElement(View11, { style: { flex: 1, gap: 6 } }, /* @__PURE__ */ React12.createElement(View11, { style: { width: "60%", height: 14, borderRadius: 4, backgroundColor: tokens.color.bg.muted } }), /* @__PURE__ */ React12.createElement(View11, { style: { width: "40%", height: 12, borderRadius: 4, backgroundColor: tokens.color.bg.emphasis } }))
  );
}

// src/components/Radio/Radio.tsx
import React13 from "react";
import { View as View12, Text as Text9, Pressable as Pressable7 } from "react-native";
import Animated8, {
  useSharedValue as useSharedValue4,
  useAnimatedStyle as useAnimatedStyle4,
  withSpring as withSpring4
} from "react-native-reanimated";
import { useRadioGroup, useTokens as useTokens9, useComponentTokens as useComponentTokens7 } from "@rnui/headless";
import { spring as spring3 } from "@rnui/tokens";
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = useTokens9();
  const { radio } = useComponentTokens7();
  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = spring3.snappy;
  const scale = useSharedValue4(isSelected ? 1 : 0);
  React13.useEffect(() => {
    scale.value = withSpring4(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);
  const dotStyle = useAnimatedStyle4(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const handlePress = () => {
    if (!isSelected) {
      scale.value = withSpring4(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = withSpring4(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ React13.createElement(
    Pressable7,
    {
      onPress: handlePress,
      disabled,
      style: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        opacity: disabled ? radio.colors.disabledOpacity : 1
      },
      accessibilityRole: "radio",
      accessibilityState: { checked: isSelected, disabled }
    },
    /* @__PURE__ */ React13.createElement(
      View12,
      {
        style: {
          width: outerSize.width,
          height: outerSize.height,
          borderRadius: outerSize.borderRadius,
          borderWidth: isSelected ? 0 : outerSize.borderWidth,
          borderColor: isSelected ? "transparent" : radio.colors.borderOff,
          backgroundColor: isSelected ? radio.colors.borderOn : radio.colors.bgOff,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2
        }
      },
      /* @__PURE__ */ React13.createElement(
        Animated8.View,
        {
          style: [
            {
              width: innerSize.width,
              height: innerSize.height,
              borderRadius: innerSize.borderRadius,
              backgroundColor: "#fff"
            },
            dotStyle
          ]
        }
      )
    ),
    (label || description) && /* @__PURE__ */ React13.createElement(View12, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React13.createElement(
      Text9,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ React13.createElement(
      Text9,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          color: tokens.color.text.secondary,
          marginTop: 2
        }
      },
      description
    ))
  );
}
function RadioGroup({
  options,
  label,
  direction = "vertical",
  size = "md",
  ...hookOptions
}) {
  const tokens = useTokens9();
  const { isSelected, getItemProps } = useRadioGroup(hookOptions);
  return /* @__PURE__ */ React13.createElement(View12, null, label && /* @__PURE__ */ React13.createElement(
    Text9,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ React13.createElement(
    View12,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ React13.createElement(
        RadioItem,
        {
          key: String(option.value),
          value: option.value,
          label: option.label,
          description: option.description,
          disabled: option.disabled,
          isSelected: isSelected(option.value),
          onPress: itemProps.onPress,
          size
        }
      );
    })
  ));
}

// src/components/Slider/Slider.tsx
import React14 from "react";
import { View as View13, Text as Text10 } from "react-native";
import Animated9 from "react-native-reanimated";
import { GestureDetector as GestureDetector5 } from "react-native-gesture-handler";
import { useSlider, useTokens as useTokens10, useComponentTokens as useComponentTokens8 } from "@rnui/headless";
function Slider({
  label,
  showValue = false,
  formatValue = (v) => String(v),
  showRange = false,
  showMarks = false,
  min = 0,
  max = 100,
  step = 1,
  ...hookOptions
}) {
  const tokens = useTokens10();
  const { slider } = useComponentTokens8();
  const {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage
  } = useSlider({ min, max, step, ...hookOptions });
  const marks = showMarks && step > 0 ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min) : [];
  return /* @__PURE__ */ React14.createElement(View13, { style: { opacity: hookOptions.disabled ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ React14.createElement(View13, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ React14.createElement(Text10, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ React14.createElement(Text10, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default } }, formatValue(currentValue))), /* @__PURE__ */ React14.createElement(Animated9.View, { style: [{ paddingVertical: 12 }, trackAnimatedStyle] }, /* @__PURE__ */ React14.createElement(GestureDetector5, { gesture: panGesture }, /* @__PURE__ */ React14.createElement(
    View13,
    {
      style: { height: slider.thumb.height, justifyContent: "center" },
      onLayout: (e) => onTrackLayout(e.nativeEvent.layout.width)
    },
    /* @__PURE__ */ React14.createElement(
      View13,
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          height: slider.track.height,
          borderRadius: slider.track.borderRadius,
          backgroundColor: slider.track.bgOff,
          overflow: "hidden"
        }
      },
      /* @__PURE__ */ React14.createElement(
        Animated9.View,
        {
          style: [
            {
              height: slider.track.height,
              backgroundColor: slider.track.bgOn,
              borderRadius: slider.track.borderRadius
            },
            fillAnimatedStyle
          ]
        }
      )
    ),
    showMarks && marks.map((mark) => {
      const markPct = (mark - min) / (max - min);
      const isActive = mark <= currentValue;
      return /* @__PURE__ */ React14.createElement(
        View13,
        {
          key: mark,
          style: {
            position: "absolute",
            left: `${markPct * 100}%`,
            width: 4,
            height: 4,
            borderRadius: 2,
            marginLeft: -2,
            backgroundColor: isActive ? slider.track.bgOn : tokens.color.border.strong,
            top: (slider.thumb.height - 4) / 2
          }
        }
      );
    }),
    /* @__PURE__ */ React14.createElement(
      Animated9.View,
      {
        style: [
          {
            position: "absolute",
            left: -(slider.thumb.width / 2),
            width: slider.thumb.width,
            height: slider.thumb.height,
            borderRadius: slider.thumb.borderRadius,
            backgroundColor: slider.thumb.bg,
            borderWidth: slider.thumb.borderWidth,
            borderColor: slider.thumb.borderColor,
            ...slider.thumb
          },
          thumbAnimatedStyle
        ]
      }
    )
  ))), showRange && /* @__PURE__ */ React14.createElement(View13, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ React14.createElement(Text10, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ React14.createElement(Text10, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}

// src/components/DatePicker/DatePicker.tsx
import React15, { useState as useState5 } from "react";
import { View as View14, Text as Text11, Pressable as Pressable8, Platform, Modal as Modal2 } from "react-native";
import { useTokens as useTokens11, useIconStyle as useIconStyle7 } from "@rnui/headless";
import DateTimePicker from "@react-native-community/datetimepicker";
function DatePicker({
  label,
  date,
  onChange,
  placeholder = "Select date",
  disabled = false,
  error,
  icon,
  minimumDate,
  maximumDate,
  mode = "date",
  presets = ["today", "last7", "last30"],
  onPresetChange,
  clearable = true
}) {
  const tokens = useTokens11();
  const { size: iconSize, color: iconColor } = useIconStyle7("input");
  const [showPicker, setShowPicker] = useState5(false);
  const [selectedPreset, setSelectedPreset] = useState5(null);
  const formattedDate = date ? mode === "time" ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : mode === "datetime" ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : date.toLocaleDateString() : "";
  const displayValue = date ? formattedDate : placeholder;
  const getPresetDate = (preset) => {
    const now = /* @__PURE__ */ new Date();
    switch (preset) {
      case "today":
        return now;
      case "yesterday":
        return new Date(now.setDate(now.getDate() - 1));
      case "last7":
        return new Date(now.setDate(now.getDate() - 7));
      case "last30":
        return new Date(now.setDate(now.getDate() - 30));
      case "last90":
        return new Date(now.setDate(now.getDate() - 90));
      default:
        return now;
    }
  };
  const handlePresetPress = (preset) => {
    if (!preset || disabled) return;
    const presetDate = getPresetDate(preset);
    onChange(presetDate);
    setSelectedPreset(preset);
    onPresetChange?.(preset);
  };
  const handleClear = () => {
    setSelectedPreset(null);
    onPresetChange?.(null);
  };
  const handlePressTrigger = () => {
    if (!disabled) setShowPicker(true);
  };
  const handleChange = (_event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      setSelectedPreset(null);
      onChange(selectedDate);
    }
  };
  const renderIcon = (node) => {
    if (!node) return null;
    if (React15.isValidElement(node)) {
      return React15.cloneElement(node, {
        size: node.props?.size ?? iconSize,
        color: node.props?.color ?? iconColor
      });
    }
    return node;
  };
  const pickerComponent = showPicker ? /* @__PURE__ */ React15.createElement(
    DateTimePicker,
    {
      value: date ?? /* @__PURE__ */ new Date(),
      mode,
      display: Platform.OS === "ios" ? "spinner" : "default",
      onChange: handleChange,
      minimumDate,
      maximumDate
    }
  ) : null;
  return /* @__PURE__ */ React15.createElement(View14, { style: { gap: tokens.spacing[2], opacity: disabled ? tokens.opacity[60] : 1 } }, label && /* @__PURE__ */ React15.createElement(
    Text11,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary
      }
    },
    label
  ), presets && presets.length > 0 && /* @__PURE__ */ React15.createElement(View14, { style: { flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" } }, presets.map((preset) => /* @__PURE__ */ React15.createElement(
    Pressable8,
    {
      key: preset,
      onPress: () => handlePresetPress(preset),
      disabled,
      style: ({ pressed }) => ({
        paddingHorizontal: tokens.spacing[3],
        paddingVertical: tokens.spacing[2],
        backgroundColor: selectedPreset === preset ? tokens.color.brand.default : tokens.color.bg.muted,
        borderRadius: tokens.radius.full,
        opacity: disabled || pressed ? tokens.opacity[60] : 1
      })
    },
    /* @__PURE__ */ React15.createElement(
      Text11,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          fontWeight: tokens.fontWeight.medium,
          color: selectedPreset === preset ? tokens.color.text.onBrand : tokens.color.text.secondary,
          textTransform: "capitalize"
        }
      },
      preset?.replace("last", "Last ").replace("today", "Today").replace("yesterday", "Yesterday")
    )
  ))), /* @__PURE__ */ React15.createElement(
    Pressable8,
    {
      onPress: handlePressTrigger,
      disabled,
      style: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        paddingHorizontal: tokens.spacing[3],
        backgroundColor: tokens.color.surface.raised,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: error ? tokens.color.error.border : tokens.color.border.default,
        gap: tokens.spacing[2]
      }
    },
    icon && renderIcon(icon),
    /* @__PURE__ */ React15.createElement(
      Text11,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: date ? tokens.color.text.primary : tokens.color.text.tertiary
        }
      },
      displayValue
    ),
    clearable && date && /* @__PURE__ */ React15.createElement(Pressable8, { onPress: handleClear, hitSlop: 8 }, /* @__PURE__ */ React15.createElement(Text11, { style: { fontSize: 18, color: tokens.color.text.tertiary } }, "\u2715")),
    /* @__PURE__ */ React15.createElement(Text11, { style: { fontSize: 18, color: tokens.color.text.tertiary } }, "\u{1F4C5}")
  ), error && /* @__PURE__ */ React15.createElement(Text11, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.error.text } }, error), Platform.OS === "ios" && showPicker && /* @__PURE__ */ React15.createElement(Modal2, { transparent: true, animationType: "slide", visible: showPicker }, /* @__PURE__ */ React15.createElement(View14, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ React15.createElement(View14, { style: { backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }, /* @__PURE__ */ React15.createElement(View14, { style: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 } }, /* @__PURE__ */ React15.createElement(Pressable8, { onPress: () => setShowPicker(false), hitSlop: 12 }, /* @__PURE__ */ React15.createElement(Text11, { style: { fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Done"))), pickerComponent))), Platform.OS === "android" && pickerComponent);
}

// src/components/AnimatedList/AnimatedList.tsx
import React16, { forwardRef as forwardRef2 } from "react";
import { StyleSheet as StyleSheet4 } from "react-native";
import { FlashList as FlashList2 } from "@shopify/flash-list";
import Animated10, { FadeInDown as FadeInDown2, Layout } from "react-native-reanimated";
var ReanimatedFlashList = Animated10.createAnimatedComponent(FlashList2);
var AnimatedList = forwardRef2(({
  data,
  renderItem,
  itemEntering = FadeInDown2,
  itemExiting,
  itemLayout = Layout.springify().damping(16).stiffness(150),
  staggerEntering = false,
  staggerDelay = 50,
  itemContainerStyle,
  ...flashListProps
}, ref) => {
  const AnimatedCell = ({ item, index, target, ...props }) => {
    const enteringAnim = staggerEntering && itemEntering?.delay ? itemEntering.delay(Math.min(index * staggerDelay, 500)) : itemEntering;
    return /* @__PURE__ */ React16.createElement(
      Animated10.View,
      {
        entering: enteringAnim,
        exiting: itemExiting,
        layout: itemLayout,
        style: [itemContainerStyle, styles4.itemWrapper]
      },
      renderItem({ item, index, target, separators: {} })
    );
  };
  return /* @__PURE__ */ React16.createElement(
    ReanimatedFlashList,
    {
      ref,
      data,
      renderItem: (info) => /* @__PURE__ */ React16.createElement(AnimatedCell, { ...info }),
      ...flashListProps
    }
  );
});
var styles4 = StyleSheet4.create({
  container: {
    flex: 1
  },
  itemWrapper: {
    overflow: "hidden"
  }
});

// src/components/SegmentedControl/SegmentedControl.tsx
import React17, { useState as useState6 } from "react";
import { View as View16, Pressable as Pressable9, Text as Text12 } from "react-native";
import Animated11, {
  useAnimatedStyle as useAnimatedStyle5,
  withSpring as withSpring5,
  useSharedValue as useSharedValue5
} from "react-native-reanimated";
import { useTokens as useTokens12 } from "@rnui/headless";
import { spring as spring4 } from "@rnui/tokens";
function SegmentedControl({
  options,
  selectedIndex,
  onChange,
  height = 36,
  disabled = false
}) {
  const tokens = useTokens12();
  const [containerWidth, setContainerWidth] = useState6(0);
  const segmentWidth = containerWidth / options.length;
  const translateX = useSharedValue5(selectedIndex * segmentWidth);
  React17.useEffect(() => {
    if (segmentWidth > 0) {
      translateX.value = withSpring5(selectedIndex * segmentWidth, spring4.snappy);
    }
  }, [selectedIndex, segmentWidth, translateX]);
  const onLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };
  const indicatorStyle = useAnimatedStyle5(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width: segmentWidth
    };
  });
  return /* @__PURE__ */ React17.createElement(
    View16,
    {
      onLayout,
      style: {
        flexDirection: "row",
        height,
        backgroundColor: tokens.color.bg.subtle,
        borderRadius: height / 2,
        padding: 2,
        position: "relative",
        opacity: disabled ? tokens.opacity[60] : 1
      }
    },
    containerWidth > 0 && /* @__PURE__ */ React17.createElement(
      Animated11.View,
      {
        style: [
          {
            position: "absolute",
            top: 2,
            bottom: 2,
            left: 2,
            backgroundColor: tokens.color.surface.default,
            borderRadius: (height - 4) / 2,
            ...tokens.shadow.sm
          },
          indicatorStyle
        ]
      }
    ),
    options.map((option, index) => {
      const isSelected = selectedIndex === index;
      return /* @__PURE__ */ React17.createElement(
        Pressable9,
        {
          key: option,
          disabled,
          onPress: () => onChange(index),
          style: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }
        },
        /* @__PURE__ */ React17.createElement(
          Text12,
          {
            style: {
              fontSize: tokens.fontSize.sm,
              fontWeight: isSelected ? tokens.fontWeight.semibold : tokens.fontWeight.medium,
              color: isSelected ? tokens.color.text.primary : tokens.color.text.secondary
            }
          },
          option
        )
      );
    })
  );
}

// src/components/Carousel/Carousel.tsx
import React18, { useRef as useRef2 } from "react";
import { View as View17, Dimensions as Dimensions2, ScrollView as ScrollView2 } from "react-native";
import Animated12, {
  useSharedValue as useSharedValue6,
  useAnimatedStyle as useAnimatedStyle6,
  interpolate as interpolate2,
  Extrapolation
} from "react-native-reanimated";
import { useTokens as useTokens13 } from "@rnui/headless";
var { width: SCREEN_WIDTH } = Dimensions2.get("window");
function Carousel({
  data,
  renderItem,
  itemWidth = SCREEN_WIDTH,
  gap = 0,
  height = 200,
  showPagination = true,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3e3
}) {
  const tokens = useTokens13();
  const scrollX = useSharedValue6(0);
  const scrollViewRef = useRef2(null);
  const isJumping = useRef2(false);
  const autoPlayTimer = useRef2(null);
  const n = data.length;
  const displayData = React18.useMemo(() => {
    if (!loop || n < 2) return data;
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);
  const itemStep = itemWidth + gap;
  const snapToOffsets = displayData.map((_, i) => i * itemStep);
  React18.useEffect(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
        scrollX.value = itemStep;
      });
    }
  }, []);
  const goToNextSlide = React18.useCallback(() => {
    if (!loop || n < 2) {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextIndex = currentIndex >= n - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * itemStep, animated: true });
    } else {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextX = (currentIndex + 1) * itemStep;
      if (nextX < displayData.length * itemStep) {
        scrollViewRef.current?.scrollTo({ x: nextX, animated: true });
      }
    }
  }, [loop, n, itemStep, scrollX, displayData.length]);
  React18.useEffect(() => {
    if (autoPlay) {
      autoPlayTimer.current = setInterval(() => {
        requestAnimationFrame(() => {
          goToNextSlide();
        });
      }, autoPlayInterval);
    }
    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [autoPlay, autoPlayInterval, goToNextSlide]);
  const handleScroll = (e) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = setInterval(goToNextSlide, autoPlayInterval);
    }
  };
  const handleMomentumScrollEnd = (e) => {
    if (!loop || n < 2 || isJumping.current) return;
    const x = Math.round(e.nativeEvent.contentOffset.x);
    const lastCloneX = (displayData.length - 1) * itemStep;
    if (x <= 0) {
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: n * itemStep, animated: false });
      scrollX.value = n * itemStep;
      setTimeout(() => {
        isJumping.current = false;
      }, 50);
    } else if (x >= lastCloneX) {
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
      scrollX.value = itemStep;
      setTimeout(() => {
        isJumping.current = false;
      }, 50);
    }
  };
  return /* @__PURE__ */ React18.createElement(View17, { style: { height } }, /* @__PURE__ */ React18.createElement(
    ScrollView2,
    {
      ref: scrollViewRef,
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      decelerationRate: "fast",
      snapToOffsets,
      snapToAlignment: "start",
      onScroll: handleScroll,
      scrollEventThrottle: 16,
      onMomentumScrollEnd: handleMomentumScrollEnd,
      contentContainerStyle: {
        paddingHorizontal: (SCREEN_WIDTH - itemWidth) / 2,
        gap
      }
    },
    displayData.map((item, index) => {
      return /* @__PURE__ */ React18.createElement(View17, { key: index, style: { width: itemWidth, height } }, renderItem(item, loop ? (index - 1 + n) % n : index));
    })
  ), showPagination && /* @__PURE__ */ React18.createElement(
    View17,
    {
      style: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: tokens.spacing[4],
        gap: 6
      }
    },
    data.map((_, i) => {
      return /* @__PURE__ */ React18.createElement(
        PaginationDot,
        {
          key: i,
          index: i,
          scrollX,
          itemStep,
          tokens,
          isLoop: loop,
          n
        }
      );
    })
  ));
}
function PaginationDot({
  index,
  scrollX,
  itemStep,
  tokens,
  isLoop,
  n
}) {
  const dotStyle = useAnimatedStyle6(() => {
    let activeIndex = scrollX.value / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }
    const opacity = interpolate2(
      activeIndex,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );
    const width = interpolate2(
      activeIndex,
      [index - 1, index, index + 1],
      [8, 20, 8],
      Extrapolation.CLAMP
    );
    return {
      width,
      opacity,
      backgroundColor: tokens.color.brand.default,
      height: 8,
      borderRadius: 4
    };
  });
  return /* @__PURE__ */ React18.createElement(Animated12.View, { style: dotStyle });
}

// src/components/OTPInput/OTPInput.tsx
import React19, { useRef as useRef3, useState as useState7, useEffect as useEffect2 } from "react";
import { View as View18, TextInput as TextInput2, Pressable as Pressable10, Text as Text14 } from "react-native";
import Animated13, {
  useAnimatedStyle as useAnimatedStyle7,
  withSpring as withSpring6,
  useSharedValue as useSharedValue7,
  withTiming as withTiming4,
  withSequence
} from "react-native-reanimated";
import { useTokens as useTokens14 } from "@rnui/headless";
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false
}) {
  const tokens = useTokens14();
  const inputRef = useRef3(null);
  const [isFocused, setIsFocused] = useState7(false);
  const pulseScale = useSharedValue7(1);
  const handlePress = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };
  const handleChange = (text) => {
    const numericVal = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(numericVal);
    if (numericVal.length === length && onComplete) {
      onComplete(numericVal);
    }
  };
  return /* @__PURE__ */ React19.createElement(View18, { style: { width: "100%" } }, /* @__PURE__ */ React19.createElement(
    TextInput2,
    {
      ref: inputRef,
      value,
      onChangeText: handleChange,
      keyboardType: "number-pad",
      textContentType: "oneTimeCode",
      autoComplete: "one-time-code",
      maxLength: length,
      caretHidden: true,
      style: {
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0
      },
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      editable: !disabled
    }
  ), /* @__PURE__ */ React19.createElement(
    Pressable10,
    {
      onPress: handlePress,
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: tokens.spacing[2]
      }
    },
    Array.from({ length }).map((_, index) => {
      const char = value[index] || "";
      const isCurrentFocus = isFocused && value.length === index;
      const isFilled = char.length > 0;
      const isLastCellWhenFull = isFocused && value.length === length && index === length - 1;
      const hasFocusBorder = isCurrentFocus || isLastCellWhenFull;
      return /* @__PURE__ */ React19.createElement(
        OTPCell,
        {
          key: index,
          char,
          isFocused: hasFocusBorder,
          isFilled,
          tokens
        }
      );
    })
  ));
}
function OTPCell({
  char,
  isFocused,
  isFilled,
  tokens
}) {
  const scale = useSharedValue7(1);
  useEffect2(() => {
    if (isFocused) {
      scale.value = withSequence(
        withTiming4(1.1, { duration: 150 }),
        withTiming4(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = withSpring6(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = withTiming4(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);
  const animatedStyle = useAnimatedStyle7(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: isFocused ? tokens.color.brand.default : isFilled ? tokens.color.border.strong : tokens.color.border.default,
      backgroundColor: isFilled ? tokens.color.surface.raised : tokens.color.surface.default
    };
  });
  return /* @__PURE__ */ React19.createElement(
    Animated13.View,
    {
      style: [
        {
          flex: 1,
          aspectRatio: 0.8,
          borderRadius: tokens.radius.md,
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center"
        },
        animatedStyle
      ]
    },
    /* @__PURE__ */ React19.createElement(
      Text14,
      {
        style: {
          fontSize: tokens.fontSize["2xl"],
          fontWeight: tokens.fontWeight.bold,
          color: tokens.color.text.primary
        }
      },
      char
    )
  );
}

// src/components/Image/Image.tsx
import React20, { useState as useState8 } from "react";
import { Image as RNImage, View as View19, StyleSheet as StyleSheet6 } from "react-native";
import Animated14, {
  useAnimatedStyle as useAnimatedStyle8,
  withTiming as withTiming5,
  useSharedValue as useSharedValue8
} from "react-native-reanimated";
import { useTokens as useTokens15 } from "@rnui/headless";
var AnimatedImage = Animated14.createAnimatedComponent(RNImage);
function RnImage({ showPlaceholder = true, style, onLoad, ...props }) {
  const tokens = useTokens15();
  const [isLoaded, setIsLoaded] = useState8(false);
  const opacity = useSharedValue8(0);
  const handleLoad = (e) => {
    setIsLoaded(true);
    opacity.value = withTiming5(1, { duration: 300 });
    onLoad?.(e);
  };
  const imageStyle = useAnimatedStyle8(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ React20.createElement(View19, { style: [styles5.container, style, { backgroundColor: showPlaceholder && !isLoaded ? tokens.color.bg.muted : "transparent" }] }, /* @__PURE__ */ React20.createElement(
    AnimatedImage,
    {
      ...props,
      onLoad: handleLoad,
      style: [StyleSheet6.absoluteFill, imageStyle, style]
    }
  ));
}
var styles5 = StyleSheet6.create({
  container: {
    overflow: "hidden",
    position: "relative"
  }
});

// src/components/Avatar/Avatar.tsx
import React21 from "react";
import { View as View20, Text as Text15, Image } from "react-native";
import { useTokens as useTokens16 } from "@rnui/headless";
var SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 52,
  xl: 68
};
var FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 15,
  lg: 18,
  xl: 24
};
var STATUS_COLORS = {
  online: "#22C55E",
  offline: "#9CA3AF",
  busy: "#EF4444",
  away: "#F59E0B"
};
var STATUS_DOT = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14
};
var BG_PALETTE = [
  "#EEEDFE",
  // purple-50
  "#E1F5EE",
  // teal-50
  "#FAECE7",
  // coral-50
  "#FBEAF0",
  // pink-50
  "#EAF3DE",
  // green-50
  "#FAEEDA",
  // amber-50
  "#E6F1FB"
  // blue-50
];
var TEXT_PALETTE = [
  "#3C3489",
  "#085041",
  "#712B13",
  "#72243E",
  "#27500A",
  "#633806",
  "#0C447C"
];
function getColorIndex(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % BG_PALETTE.length;
}
function Avatar({
  src,
  initials,
  fallbackIcon,
  size = "md",
  status,
  shape = "circle",
  accessibilityLabel
}) {
  const tokens = useTokens16();
  const dim = SIZES[size];
  const radius = shape === "circle" ? dim / 2 : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;
  const dotSize = status ? STATUS_DOT[size] : 0;
  return /* @__PURE__ */ React21.createElement(View20, { style: { width: dim, height: dim }, accessible: !!accessibilityLabel, accessibilityLabel }, src ? /* @__PURE__ */ React21.createElement(
    Image,
    {
      source: { uri: src },
      style: { width: dim, height: dim, borderRadius: radius },
      accessibilityLabel
    }
  ) : initials ? /* @__PURE__ */ React21.createElement(
    View20,
    {
      style: {
        width: dim,
        height: dim,
        borderRadius: radius,
        backgroundColor: BG_PALETTE[colorIdx],
        alignItems: "center",
        justifyContent: "center"
      }
    },
    /* @__PURE__ */ React21.createElement(
      Text15,
      {
        style: {
          fontSize: FONT_SIZES[size],
          fontWeight: "600",
          color: TEXT_PALETTE[colorIdx],
          letterSpacing: 0.5
        }
      },
      initials.slice(0, 2).toUpperCase()
    )
  ) : (
    // Generic fallback
    /* @__PURE__ */ React21.createElement(
      View20,
      {
        style: {
          width: dim,
          height: dim,
          borderRadius: radius,
          backgroundColor: tokens.color.bg.muted,
          alignItems: "center",
          justifyContent: "center"
        }
      },
      fallbackIcon ?? /* @__PURE__ */ React21.createElement(Text15, { style: { fontSize: FONT_SIZES[size], color: tokens.color.text.tertiary } }, "?")
    )
  ), status && /* @__PURE__ */ React21.createElement(
    View20,
    {
      style: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: STATUS_COLORS[status],
        borderWidth: 1.5,
        borderColor: tokens.color.surface.default
      }
    }
  ));
}
function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  overlap
}) {
  const tokens = useTokens16();
  const dim = SIZES[size];
  const gap = overlap ?? Math.round(dim * 0.3);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ React21.createElement(
    View20,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ React21.createElement(
      View20,
      {
        key: i,
        style: {
          position: "absolute",
          left: i * (dim - gap),
          zIndex: visible.length - i,
          borderWidth: 2,
          borderColor: tokens.color.surface.default,
          borderRadius: dim / 2 + 2
        }
      },
      /* @__PURE__ */ React21.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ React21.createElement(
      View20,
      {
        style: {
          position: "absolute",
          left: visible.length * (dim - gap),
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: tokens.color.bg.muted,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: tokens.color.surface.default,
          zIndex: 0
        }
      },
      /* @__PURE__ */ React21.createElement(
        Text15,
        {
          style: {
            fontSize: FONT_SIZES[size],
            color: tokens.color.text.secondary,
            fontWeight: "600"
          }
        },
        "+",
        overflow
      )
    )
  );
}

// src/components/TextArea/TextArea.tsx
import React22, { useState as useState9 } from "react";
import {
  View as View21,
  Text as Text16,
  TextInput as TextInput3
} from "react-native";
import { useComponentTokens as useComponentTokens9, useTokens as useTokens17 } from "@rnui/headless";
function TextArea({
  label,
  placeholder,
  value = "",
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  minLines = 3,
  maxLines = 8,
  maxLength,
  disabled = false,
  autoFocus = false,
  accessibilityLabel
}) {
  const { input } = useComponentTokens9();
  const tokens = useTokens17();
  const [isFocused, setIsFocused] = useState9(false);
  const [contentHeight, setContentHeight] = useState9(0);
  const LINE_HEIGHT = tokens.fontSize.md * tokens.lineHeight.normal;
  const minHeight = minLines * LINE_HEIGHT + tokens.spacing[3] * 2;
  const maxHeight = maxLines * LINE_HEIGHT + tokens.spacing[3] * 2;
  const dynamicHeight = contentHeight ? Math.min(Math.max(contentHeight + tokens.spacing[3] * 2, minHeight), maxHeight) : minHeight;
  const handleContentSizeChange = (e) => {
    setContentHeight(e.nativeEvent.contentSize.height);
  };
  const containerStyle = [
    input.container,
    { height: dynamicHeight, alignItems: "flex-start", paddingVertical: tokens.spacing[3] },
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ];
  const charCount = value.length;
  const nearLimit = maxLength && charCount >= maxLength * 0.9;
  const atLimit = maxLength && charCount >= maxLength;
  return /* @__PURE__ */ React22.createElement(View21, null, (label || maxLength) && /* @__PURE__ */ React22.createElement(View21, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] } }, label && /* @__PURE__ */ React22.createElement(Text16, { style: input.label }, label), maxLength && /* @__PURE__ */ React22.createElement(
    Text16,
    {
      style: {
        fontSize: tokens.fontSize.xs,
        color: atLimit ? tokens.color.error.text : nearLimit ? tokens.color.warning.text : tokens.color.text.tertiary,
        fontWeight: atLimit ? tokens.fontWeight.semibold : tokens.fontWeight.regular
      }
    },
    charCount,
    "/",
    maxLength
  )), /* @__PURE__ */ React22.createElement(View21, { style: containerStyle }, /* @__PURE__ */ React22.createElement(
    TextInput3,
    {
      value,
      onChangeText,
      placeholder,
      placeholderTextColor: input.text.placeholderColor,
      multiline: true,
      scrollEnabled: contentHeight + tokens.spacing[3] * 2 > maxHeight,
      maxLength,
      editable: !disabled,
      autoFocus,
      accessibilityLabel: accessibilityLabel ?? label,
      accessibilityState: { disabled },
      onContentSizeChange: handleContentSizeChange,
      style: {
        flex: 1,
        width: "100%",
        fontSize: tokens.fontSize.md,
        color: input.text.color,
        lineHeight: LINE_HEIGHT,
        textAlignVertical: "top",
        paddingTop: 0,
        paddingBottom: 0
      },
      onFocus: () => {
        setIsFocused(true);
        onFocus?.();
      },
      onBlur: () => {
        setIsFocused(false);
        onBlur?.();
      }
    }
  )), error ? /* @__PURE__ */ React22.createElement(Text16, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React22.createElement(Text16, { style: input.helperText }, helperText) : null);
}

// src/components/Divider/Divider.tsx
import React23 from "react";
import { View as View22, Text as Text17 } from "react-native";
import { useTokens as useTokens18 } from "@rnui/headless";
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const tokens = useTokens18();
  const lineColor = emphasis ? tokens.color.border.strong : tokens.color.border.default;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: tokens.spacing[4],
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ React23.createElement(
      View22,
      {
        style: {
          width: 1,
          alignSelf: "stretch",
          backgroundColor: lineColor,
          marginHorizontal: tokens.spacing[2]
        }
      }
    );
  }
  if (label) {
    return /* @__PURE__ */ React23.createElement(
      View22,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ React23.createElement(View22, { style: { flex: 1, height: 1, backgroundColor: lineColor } }),
      /* @__PURE__ */ React23.createElement(
        Text17,
        {
          style: {
            fontSize: tokens.fontSize.xs,
            fontWeight: tokens.fontWeight.medium,
            color: tokens.color.text.tertiary,
            textTransform: "uppercase",
            letterSpacing: 0.5
          }
        },
        label
      ),
      /* @__PURE__ */ React23.createElement(View22, { style: { flex: 1, height: 1, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ React23.createElement(
    View22,
    {
      style: {
        height: 1,
        backgroundColor: lineColor,
        marginVertical: verticalMargin
      }
    }
  );
}

// src/components/Skeleton/Skeleton.tsx
import React24, { useEffect as useEffect3 } from "react";
import { View as View23 } from "react-native";
import Animated15, {
  useSharedValue as useSharedValue9,
  useAnimatedStyle as useAnimatedStyle9,
  withRepeat,
  withTiming as withTiming6,
  interpolate as interpolate3
} from "react-native-reanimated";
import { useTokens as useTokens19 } from "@rnui/headless";
function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true
}) {
  const tokens = useTokens19();
  const shimmer = useSharedValue9(0);
  useEffect3(() => {
    if (!animate) return;
    shimmer.value = withRepeat(
      withTiming6(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);
  const animatedStyle = useAnimatedStyle9(() => ({
    opacity: interpolate3(shimmer.value, [0, 1], [0.6, 1])
    // Increased visibility
  }));
  return /* @__PURE__ */ React24.createElement(
    Animated15.View,
    {
      style: [
        {
          width,
          height,
          borderRadius: borderRadius ?? tokens.radius.sm,
          backgroundColor: tokens.color.bg.emphasis
        },
        animate && animatedStyle
      ]
    }
  );
}
function SkeletonText({
  lines = 3,
  lastLineWidth = "60%"
}) {
  const tokens = useTokens19();
  return /* @__PURE__ */ React24.createElement(View23, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ React24.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14
    }
  )));
}
function SkeletonCard() {
  const tokens = useTokens19();
  return /* @__PURE__ */ React24.createElement(
    View23,
    {
      style: {
        padding: tokens.spacing[4],
        borderRadius: tokens.radius.lg,
        borderWidth: 0.5,
        borderColor: tokens.color.border.default,
        backgroundColor: tokens.color.surface.default,
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React24.createElement(View23, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ React24.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ React24.createElement(View23, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React24.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ React24.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ React24.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ React24.createElement(Skeleton, { width: "40%", height: 32, borderRadius: tokens.radius.md })
  );
}
function SkeletonListItem() {
  const tokens = useTokens19();
  return /* @__PURE__ */ React24.createElement(
    View23,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React24.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ React24.createElement(View23, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React24.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ React24.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ React24.createElement(Skeleton, { width: 24, height: 14 })
  );
}

// src/components/EmptyState/EmptyState.tsx
import React26 from "react";
import { View as View25, Text as Text19 } from "react-native";
import { useTokens as useTokens21 } from "@rnui/headless";

// src/components/Icon/Icon.tsx
import React25 from "react";
import { View as View24, Text as Text18 } from "react-native";
import { useTokens as useTokens20 } from "@rnui/headless";
import {
  Star,
  Heart,
  Check,
  Info,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Minus,
  Search,
  Bell,
  User,
  Settings,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Edit,
  Share,
  Download,
  Upload,
  Image as ImageIcon,
  Video,
  Camera,
  Mail,
  Phone,
  Home,
  LogOut,
  LogIn,
  Menu,
  MoreVertical,
  MoreHorizontal,
  Filter,
  SortAsc,
  Grid,
  List as List2,
  Layout as Layout2,
  Folder,
  File,
  FileText,
  Copy,
  Clipboard,
  ExternalLink,
  Link as LinkIcon,
  Unlink,
  CheckCircle,
  XCircle,
  HelpCircle,
  Loader,
  RefreshCw,
  RotateCcw,
  Play,
  Pause,
  StopCircle,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Flame,
  Award,
  Target,
  Bookmark,
  Tag,
  MessageCircle,
  MessageSquare,
  Send,
  Inbox,
  Archive,
  Hash,
  AtSign,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Radio,
  Tv,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplet,
  Lock,
  Unlock,
  Key,
  Shield,
  Eye as Eye2,
  EyeOff as EyeOff2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Move,
  Maximize2,
  Minimize2,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Box,
  Package,
  Gift,
  ShoppingBag,
  Hammer,
  Wrench,
  Scissors,
  Printer,
  Power,
  Battery,
  Wifi,
  Bluetooth,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react-native";
var ICON_MAP = {
  // Navigation & Actions
  star: Star,
  heart: Heart,
  check: Check,
  checkCircle: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  helpCircle: HelpCircle,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  plus: Plus,
  minus: Minus,
  close: X,
  xCircle: XCircle,
  search: Search,
  bell: Bell,
  user: User,
  settings: Settings,
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
  trash: Trash2,
  edit: Edit,
  share: Share,
  download: Download,
  upload: Upload,
  image: ImageIcon,
  video: Video,
  camera: Camera,
  mail: Mail,
  phone: Phone,
  home: Home,
  logOut: LogOut,
  logIn: LogIn,
  menu: Menu,
  moreVertical: MoreVertical,
  moreHorizontal: MoreHorizontal,
  filter: Filter,
  sortAsc: SortAsc,
  grid: Grid,
  list: List2,
  layout: Layout2,
  folder: Folder,
  file: File,
  fileText: FileText,
  copy: Copy,
  clipboard: Clipboard,
  externalLink: ExternalLink,
  link: LinkIcon,
  unlink: Unlink,
  // Feedback & Status
  loader: Loader,
  refreshCw: RefreshCw,
  rotateCcw: RotateCcw,
  play: Play,
  pause: Pause,
  stopCircle: StopCircle,
  skipForward: SkipForward,
  skipBack: SkipBack,
  fastForward: FastForward,
  rewind: Rewind,
  // Commerce & Data
  shoppingCart: ShoppingCart,
  creditCard: CreditCard,
  dollarSign: DollarSign,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  barChart3: BarChart3,
  pieChart: PieChart,
  activity: Activity,
  zap: Zap,
  flame: Flame,
  award: Award,
  target: Target,
  bookmark: Bookmark,
  tag: Tag,
  // Communication
  messageCircle: MessageCircle,
  messageSquare: MessageSquare,
  send: Send,
  inbox: Inbox,
  archive: Archive,
  hash: Hash,
  atSign: AtSign,
  // Media Controls
  volume2: Volume2,
  volumeX: VolumeX,
  mic: Mic,
  micOff: MicOff,
  headphones: Headphones,
  radio: Radio,
  tv: Tv,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  // Weather & Nature
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  wind: Wind,
  thermometer: Thermometer,
  droplet: Droplet,
  // Locks & Security
  lock: Lock,
  unlock: Unlock,
  key: Key,
  shield: Shield,
  eye: Eye2,
  eyeOff: EyeOff2,
  // Arrows
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  arrowDownLeft: ArrowDownLeft,
  move: Move,
  maximize2: Maximize2,
  minimize2: Minimize2,
  // UI Elements
  square: Square,
  circle: Circle,
  triangle: Triangle,
  hexagon: Hexagon,
  box: Box,
  package: Package,
  gift: Gift,
  shoppingBag: ShoppingBag,
  // Tools
  hammer: Hammer,
  wrench: Wrench,
  scissors: Scissors,
  printer: Printer,
  power: Power,
  battery: Battery,
  wifi: Wifi,
  bluetooth: Bluetooth,
  // Social
  github: Github,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube
};
var SIZE_MAP = { small: 16, medium: 20, large: 24 };
function Icon({ children, color, size, fontSize = "medium" }) {
  const tokens = useTokens20();
  let resolvedSize;
  if (typeof size === "number") {
    resolvedSize = size;
  } else if (size) {
    resolvedSize = SIZE_MAP[size] || SIZE_MAP[fontSize];
  } else {
    resolvedSize = SIZE_MAP[fontSize] || 20;
  }
  if (React25.isValidElement(children)) {
    return React25.cloneElement(children, {
      size: resolvedSize || 20,
      color: color ?? tokens.color.text.primary
    });
  }
  if (typeof children === "string" && ICON_MAP[children]) {
    const IconComponent = ICON_MAP[children];
    return /* @__PURE__ */ React25.createElement(
      IconComponent,
      {
        size: resolvedSize || 20,
        color: color ?? tokens.color.text.primary
      }
    );
  }
  return /* @__PURE__ */ React25.createElement(View24, { style: { alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React25.createElement(Text18, { style: { color: color ?? tokens.color.text.primary, fontSize: resolvedSize } }, children));
}
function SvgIcon({ children, color, fontSize = "medium" }) {
  const tokens = useTokens20();
  const size = fontSize === "inherit" ? void 0 : SIZE_MAP[fontSize];
  if (!React25.isValidElement(children)) return null;
  return React25.cloneElement(children, {
    color: children.props?.color ?? color ?? tokens.color.text.primary,
    size: children.props?.size ?? size
  });
}

// src/components/EmptyState/EmptyState.tsx
function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false
}) {
  const tokens = useTokens21();
  const renderIcon = (iconNode) => {
    if (typeof iconNode === "string") {
      return /* @__PURE__ */ React26.createElement(Icon, { size: compact ? 24 : 36, color: tokens.color.text.tertiary }, iconNode);
    }
    return iconNode;
  };
  return /* @__PURE__ */ React26.createElement(
    View25,
    {
      style: {
        flex: compact ? void 0 : 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: tokens.spacing[6],
        paddingVertical: compact ? tokens.spacing[8] : tokens.spacing[16],
        gap: tokens.spacing[3]
      }
    },
    icon && /* @__PURE__ */ React26.createElement(
      View25,
      {
        style: {
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: compact ? 24 : 36,
          backgroundColor: tokens.color.bg.muted,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: tokens.spacing[1]
        }
      },
      renderIcon(icon)
    ),
    !icon && /* @__PURE__ */ React26.createElement(
      View25,
      {
        style: {
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: compact ? 24 : 36,
          backgroundColor: tokens.color.bg.muted,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: tokens.spacing[1]
        }
      },
      /* @__PURE__ */ React26.createElement(Text19, { style: { fontSize: compact ? 20 : 32, color: tokens.color.text.tertiary } }, "\u25CB")
    ),
    /* @__PURE__ */ React26.createElement(
      Text19,
      {
        style: {
          fontSize: compact ? tokens.fontSize.md : tokens.fontSize.lg,
          fontWeight: tokens.fontWeight.semibold,
          color: tokens.color.text.primary,
          textAlign: "center"
        }
      },
      title
    ),
    description && /* @__PURE__ */ React26.createElement(
      Text19,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          color: tokens.color.text.secondary,
          textAlign: "center",
          lineHeight: tokens.fontSize.sm * tokens.lineHeight.relaxed,
          maxWidth: 280
        }
      },
      description
    ),
    (action || secondaryAction) && /* @__PURE__ */ React26.createElement(
      View25,
      {
        style: {
          marginTop: tokens.spacing[2],
          gap: tokens.spacing[2],
          alignItems: "center",
          width: "100%"
        }
      },
      action && /* @__PURE__ */ React26.createElement(
        Button,
        {
          label: action.label,
          variant: action.variant ?? "solid",
          onPress: action.onPress,
          size: compact ? "sm" : "md",
          fullWidth: true
        }
      ),
      secondaryAction && /* @__PURE__ */ React26.createElement(
        Button,
        {
          label: secondaryAction.label,
          variant: secondaryAction.variant ?? "ghost",
          onPress: secondaryAction.onPress,
          size: compact ? "sm" : "md"
        }
      )
    )
  );
}

// src/components/FormField/FormField.tsx
import React27 from "react";
import { View as View26, Text as Text20 } from "react-native";
import { useTokens as useTokens22 } from "@rnui/headless";
function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children
}) {
  const tokens = useTokens22();
  return /* @__PURE__ */ React27.createElement(View26, { style: { gap: tokens.spacing[1] } }, (label || labelTrailing) && /* @__PURE__ */ React27.createElement(
    View26,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
    label && /* @__PURE__ */ React27.createElement(View26, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ React27.createElement(
      Text20,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          fontWeight: tokens.fontWeight.medium,
          color: tokens.color.text.secondary
        }
      },
      label
    ), required && /* @__PURE__ */ React27.createElement(
      Text20,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          color: tokens.color.error.text,
          fontWeight: tokens.fontWeight.medium
        }
      },
      "*"
    )),
    labelTrailing
  ), children, error ? /* @__PURE__ */ React27.createElement(
    Text20,
    {
      style: {
        fontSize: tokens.fontSize.xs,
        color: tokens.color.error.text
      },
      accessibilityRole: "alert",
      accessibilityLiveRegion: "polite"
    },
    error
  ) : helperText ? /* @__PURE__ */ React27.createElement(
    Text20,
    {
      style: {
        fontSize: tokens.fontSize.xs,
        color: tokens.color.text.tertiary
      }
    },
    helperText
  ) : null);
}
function FormGroup({ children, gap = "md" }) {
  const tokens = useTokens22();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return /* @__PURE__ */ React27.createElement(View26, { style: { gap: gapSize } }, children);
}

// src/components/Pressable/Pressable.tsx
import React28 from "react";
import Animated16 from "react-native-reanimated";
import { GestureDetector as GestureDetector6 } from "react-native-gesture-handler";
import { usePressable as usePressable3 } from "@rnui/headless";
function Pressable11({ children, style, ...hookOptions }) {
  const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable3(hookOptions);
  return /* @__PURE__ */ React28.createElement(GestureDetector6, { gesture }, /* @__PURE__ */ React28.createElement(Animated16.View, { style: [style, animatedStyle], ...accessibilityProps }, typeof children === "function" ? children({ isPressed }) : children));
}

// src/components/Box/Box.tsx
import React29 from "react";
import { View as View27 } from "react-native";
function Box2({ children, style, sx, flex }) {
  const merged = [flex !== void 0 ? { flex } : null, sx, style];
  return /* @__PURE__ */ React29.createElement(View27, { style: merged }, children);
}

// src/components/Stack/Stack.tsx
import React30 from "react";
import { View as View28 } from "react-native";
import { useTokens as useTokens23 } from "@rnui/headless";
function Stack({
  children,
  direction = "column",
  spacing = 2,
  divider,
  alignItems,
  justifyContent,
  flexWrap,
  style
}) {
  const tokens = useTokens23();
  const gap = tokens.spacing[spacing] ?? spacing;
  const items = React30.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ React30.createElement(
    View28,
    {
      style: [
        {
          flexDirection: direction,
          gap,
          alignItems,
          justifyContent,
          flexWrap
        },
        style
      ]
    },
    content
  );
}

// src/components/Grid/Grid.tsx
import React31 from "react";
import { View as View29 } from "react-native";
import { useTokens as useTokens24 } from "@rnui/headless";
function Grid2({
  children,
  container = false,
  size,
  columns = 12,
  spacing = 0,
  rowSpacing,
  columnSpacing,
  direction = "row",
  wrap = "wrap",
  offset,
  style
}) {
  const tokens = useTokens24();
  const gap = tokens.spacing[spacing] ?? spacing;
  const rowGap = rowSpacing !== void 0 ? tokens.spacing[rowSpacing] ?? rowSpacing : gap;
  const colGap = columnSpacing !== void 0 ? tokens.spacing[columnSpacing] ?? columnSpacing : gap;
  if (container) {
    return /* @__PURE__ */ React31.createElement(
      View29,
      {
        style: [
          {
            flexDirection: direction,
            flexWrap: wrap,
            rowGap,
            columnGap: colGap
          },
          style
        ]
      },
      children
    );
  }
  const widthPct = typeof size === "number" ? `${size / columns * 100}%` : void 0;
  const widthValue = widthPct;
  const itemStyle = {
    flexGrow: size === "grow" ? 1 : 0,
    flexBasis: size === "grow" ? 0 : size === "auto" ? void 0 : widthValue,
    maxWidth: size === "grow" ? void 0 : size === "auto" ? void 0 : widthValue,
    marginLeft: offset ? `${offset / columns * 100}%` : void 0
  };
  return /* @__PURE__ */ React31.createElement(
    View29,
    {
      style: [itemStyle, style]
    },
    children
  );
}

// src/components/Typography/Typography.tsx
import React32 from "react";
import { Text as Text21 } from "react-native";
import { useTokens as useTokens25 } from "@rnui/headless";
function Typography({
  children,
  variant = "body1",
  align = "left",
  color,
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  display,
  style
}) {
  const tokens = useTokens25();
  const variantStyles = {
    h1: { fontSize: tokens.fontSize["4xl"], fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize["4xl"] * tokens.lineHeight.tight },
    h2: { fontSize: tokens.fontSize["3xl"], fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize["3xl"] * tokens.lineHeight.tight },
    h3: { fontSize: tokens.fontSize["2xl"], fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize["2xl"] * tokens.lineHeight.snug },
    h4: { fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize.xl * tokens.lineHeight.snug },
    h5: { fontSize: tokens.fontSize.lg, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.lg * tokens.lineHeight.normal },
    h6: { fontSize: tokens.fontSize.md, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.md * tokens.lineHeight.normal },
    subtitle1: { fontSize: tokens.fontSize.md, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.md * tokens.lineHeight.normal },
    subtitle2: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.sm * tokens.lineHeight.normal },
    body1: tokens.text.md,
    body2: tokens.text.sm,
    caption: tokens.text.xs,
    button: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, textTransform: "uppercase" },
    overline: { fontSize: tokens.fontSize.xs, fontWeight: tokens.fontWeight.semibold, textTransform: "uppercase", letterSpacing: tokens.letterSpacing.wide },
    inherit: {}
  };
  const resolvedDisplay = display === "block" || display === "inline" || display === "inline-flex" ? "flex" : display;
  return /* @__PURE__ */ React32.createElement(
    Text21,
    {
      numberOfLines: noWrap ? 1 : void 0,
      style: [
        { color: color ?? tokens.color.text.primary, textAlign: align === "inherit" ? void 0 : align },
        variantStyles[variant],
        paragraph && { marginBottom: tokens.spacing[4] },
        gutterBottom && { marginBottom: tokens.spacing[2] },
        resolvedDisplay ? { display: resolvedDisplay } : null,
        style
      ]
    },
    children
  );
}

// src/components/Link/Link.tsx
import React33 from "react";
import { Text as Text22, Linking as Linking2 } from "react-native";
import { useTokens as useTokens26 } from "@rnui/headless";
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const tokens = useTokens26();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ React33.createElement(
    Text22,
    {
      onPress: async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await Linking2.openURL(href);
          } catch {
          }
        }
      },
      style: [
        { color: color ?? tokens.color.text.link, textDecorationLine: decoration },
        style
      ]
    },
    children
  );
}

// src/components/Paper/Paper.tsx
import React34 from "react";
import { View as View30 } from "react-native";
import { useTokens as useTokens27 } from "@rnui/headless";
function Paper({
  children,
  variant = "elevation",
  elevation = 1,
  square = false,
  style
}) {
  const tokens = useTokens27();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  return /* @__PURE__ */ React34.createElement(
    View30,
    {
      style: [
        {
          backgroundColor: tokens.color.surface.default,
          borderRadius: square ? tokens.radius.none : tokens.radius.lg,
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor: tokens.color.border.default
        },
        variant === "elevation" ? shadows[elevation] : null,
        style
      ]
    },
    children
  );
}

// src/components/ButtonGroup/ButtonGroup.tsx
import React35 from "react";
import { View as View31 } from "react-native";
import { useTokens as useTokens28 } from "@rnui/headless";
function ButtonGroup({
  children,
  variant = "outlined",
  size = "md",
  orientation = "horizontal",
  disabled = false,
  fullWidth = false
}) {
  const tokens = useTokens28();
  const isRow = orientation === "horizontal";
  const items = React35.Children.toArray(children);
  return /* @__PURE__ */ React35.createElement(
    View31,
    {
      style: {
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        borderRadius: tokens.radius.md,
        overflow: "hidden"
      }
    },
    items.map((child, i) => {
      if (!React35.isValidElement(child)) return child;
      const element = child;
      const isFirst = i === 0;
      const isLast = i === items.length - 1;
      const style = {
        borderRadius: 0,
        borderWidth: 1,
        borderColor: tokens.color.border.default
      };
      if (isRow && !isLast) {
        style.borderRightWidth = 0;
      }
      if (!isRow && !isLast) {
        style.borderBottomWidth = 0;
      }
      if (isFirst || isLast) {
        style.borderRadius = tokens.radius.md;
      }
      return React35.cloneElement(element, {
        variant,
        size,
        disabled: disabled || element.props?.disabled,
        fullWidth: fullWidth || element.props?.fullWidth,
        style: [style, element.props?.style].filter(Boolean)
      });
    })
  );
}

// src/components/Fab/Fab.tsx
import React36, { useMemo as useMemo5 } from "react";
import { Text as Text23 } from "react-native";
import Animated17 from "react-native-reanimated";
import { GestureDetector as GestureDetector7 } from "react-native-gesture-handler";
import { usePressable as usePressable4, useTokens as useTokens29, useIconStyle as useIconStyle8 } from "@rnui/headless";
var SIZE2 = {
  sm: 40,
  md: 56,
  lg: 64
};
function Fab({
  variant = "circular",
  size = "md",
  color = "primary",
  disabled = false,
  label,
  icon,
  onPress,
  accessibilityLabel
}) {
  const tokens = useTokens29();
  const { size: iconSize } = useIconStyle8("button");
  const bgMap = {
    default: tokens.color.bg.emphasis,
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    success: tokens.color.success.bg,
    error: tokens.color.error.bg,
    info: tokens.color.info.bg,
    warning: tokens.color.warning.bg
  };
  const textMap = {
    default: tokens.color.text.primary,
    primary: "#fff",
    secondary: tokens.color.brand.text,
    success: tokens.color.success.text,
    error: tokens.color.error.text,
    info: tokens.color.info.text,
    warning: tokens.color.warning.text
  };
  const { animatedStyle, gesture, accessibilityProps } = usePressable4({
    onPress,
    disabled,
    feedbackMode: "scale",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityRole: "button"
  });
  const containerStyle = useMemo5(() => {
    const dim = SIZE2[size];
    return {
      height: dim,
      borderRadius: variant === "circular" ? dim / 2 : dim / 2,
      paddingHorizontal: variant === "extended" ? tokens.spacing[5] : 0,
      minWidth: variant === "extended" ? dim + tokens.spacing[6] : dim,
      backgroundColor: bgMap[color],
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: tokens.spacing[2],
      opacity: disabled ? tokens.opacity[60] : 1,
      ...tokens.shadow.md
    };
  }, [size, variant, tokens, color, disabled]);
  const renderIcon = (el) => {
    if (!el) return null;
    if (React36.isValidElement(el)) {
      return React36.cloneElement(el, {
        size: el.props?.size ?? iconSize,
        color: el.props?.color ?? textMap[color]
      });
    }
    return el;
  };
  return /* @__PURE__ */ React36.createElement(GestureDetector7, { gesture }, /* @__PURE__ */ React36.createElement(Animated17.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, renderIcon(icon), variant === "extended" && label && /* @__PURE__ */ React36.createElement(Text23, { style: { color: textMap[color], fontWeight: tokens.fontWeight.semibold } }, label)));
}

// src/components/TextField/TextField.tsx
import React37, { useState as useState10 } from "react";
import { Pressable as Pressable12, View as View33 } from "react-native";
import { useTokens as useTokens30 } from "@rnui/headless";
function TextField({
  variant = "outlined",
  multiline = false,
  rows,
  maxRows,
  minRows,
  helperText,
  error,
  required = false,
  select = false,
  selectProps,
  type = "text",
  label,
  ...rest
}) {
  const tokens = useTokens30();
  const [showPassword, setShowPassword] = useState10(false);
  const isPassword = type === "password";
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  const trailingElement = isPassword ? /* @__PURE__ */ React37.createElement(
    Pressable12,
    {
      onPress: () => setShowPassword(!showPassword),
      style: { padding: 4 }
    },
    /* @__PURE__ */ React37.createElement(View33, { style: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: tokens.color.bg.muted,
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React37.createElement(View33, { style: {
      width: showPassword ? 12 : 8,
      height: 2,
      backgroundColor: tokens.color.text.secondary,
      borderRadius: 1
    } }))
  ) : rest.trailingElement;
  if (select) {
    return /* @__PURE__ */ React37.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ React37.createElement(
      TextArea,
      {
        label: labelText,
        error: errorText,
        helperText: errorText ? void 0 : helperText,
        minLines: minRows ?? rows ?? 3,
        maxLines: maxRows ?? 8,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ React37.createElement(
    Input,
    {
      label: labelText,
      error: errorText,
      helperText: errorText ? void 0 : helperText,
      trailingElement,
      secureTextEntry: isPassword && !showPassword,
      ...rest
    }
  );
}

// src/components/Autocomplete/Autocomplete.tsx
import React38, { useState as useState11, useRef as useRef4 } from "react";
import { View as View34, Text as Text24, Pressable as Pressable13, Modal as Modal3, useWindowDimensions } from "react-native";
import Animated18, {
  useSharedValue as useSharedValue10,
  useAnimatedStyle as useAnimatedStyle10,
  withTiming as withTiming7,
  withSpring as withSpring7,
  Easing
} from "react-native-reanimated";
import { useAutocomplete, useTokens as useTokens31 } from "@rnui/headless";
function Autocomplete({
  options,
  value,
  defaultValue,
  multiple = false,
  getOptionLabel,
  renderOption,
  onChange,
  inputValue,
  onInputChange,
  placeholder = "Select...",
  label,
  disabled = false
}) {
  const tokens = useTokens31();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const inputRef = useRef4(null);
  const [inputRect, setInputRect] = useState11({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [dropdownMounted, setDropdownMounted] = useState11(false);
  const opacity = useSharedValue10(0);
  const scale = useSharedValue10(0.95);
  const {
    inputValue: query,
    setInputValue,
    isOpen,
    open,
    close,
    isSelected,
    selectOption,
    filteredOptions
  } = useAutocomplete({
    options,
    value,
    defaultValue,
    multiple,
    getOptionLabel,
    onChange,
    inputValue,
    onInputChange
  });
  const labelOf = getOptionLabel ?? ((o) => String(o));
  const DROPDOWN_MAX_HEIGHT = 220;
  const GAP = 4;
  const measureAndOpen = () => {
    if (!isOpen) {
      inputRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
        setInputRect({ pageX, pageY, width: w, height: h });
        open();
        opacity.value = 0;
        scale.value = 0.95;
        setDropdownMounted(true);
        requestAnimationFrame(() => {
          opacity.value = withTiming7(1, { duration: 160, easing: Easing.out(Easing.cubic) });
          scale.value = withSpring7(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };
  const handleClose = () => {
    opacity.value = withTiming7(0, { duration: 120 });
    scale.value = withTiming7(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };
  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;
  const dropdownTop = showAbove ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP : inputRect.pageY + inputRect.height + GAP;
  const dropdownAnimStyle = useAnimatedStyle10(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ React38.createElement(View34, { ref: inputRef }, /* @__PURE__ */ React38.createElement(
    Input,
    {
      label,
      placeholder,
      value: query,
      onChangeText: (val) => {
        setInputValue(val);
        measureAndOpen();
      },
      onFocus: measureAndOpen,
      onBlur: () => setTimeout(handleClose, 150),
      disabled
    }
  ), dropdownMounted && filteredOptions.length > 0 && /* @__PURE__ */ React38.createElement(Modal3, { transparent: true, animationType: "none", visible: dropdownMounted, onRequestClose: handleClose }, /* @__PURE__ */ React38.createElement(Pressable13, { style: { flex: 1 }, onPress: handleClose }), /* @__PURE__ */ React38.createElement(
    Animated18.View,
    {
      style: [
        {
          position: "absolute",
          top: dropdownTop,
          left: inputRect.pageX,
          width: inputRect.width,
          maxHeight: DROPDOWN_MAX_HEIGHT,
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.color.surface.default,
          overflow: "hidden",
          ...tokens.shadow.md
        },
        dropdownAnimStyle
      ]
    },
    filteredOptions.map((option, idx) => {
      const selected = isSelected(option);
      return /* @__PURE__ */ React38.createElement(
        Pressable13,
        {
          key: `${labelOf(option)}-${idx}`,
          onPress: () => {
            if (selected && !multiple) {
              selectOption(void 0);
            } else {
              selectOption(option);
            }
            if (!multiple) handleClose();
          },
          style: ({ pressed }) => ({
            paddingHorizontal: tokens.spacing[3],
            paddingVertical: tokens.spacing[2],
            backgroundColor: pressed ? tokens.color.bg.subtle : selected ? tokens.color.brand.subtle : "transparent"
          })
        },
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ React38.createElement(Text24, { style: { color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, labelOf(option))
      );
    })
  )));
}

// src/components/Rating/Rating.tsx
import React39 from "react";
import { View as View35, Text as Text25, Pressable as Pressable14 } from "react-native";
import { useRating, useTokens as useTokens32 } from "@rnui/headless";
var SIZE_MAP2 = { sm: 18, md: 24, lg: 32 };
function Rating({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = "md",
  onChange
}) {
  const tokens = useTokens32();
  const { value: ratingValue, setValue } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    onChange
  });
  const fontSize = SIZE_MAP2[size];
  const activeColor = tokens.color.brand.default;
  const inactiveColor = tokens.color.border.default;
  const handlePress = (index) => {
    if (disabled || readOnly) return;
    const next = index + 1;
    const snapped = Math.round(next / precision) * precision;
    setValue(ratingValue === snapped ? 0 : snapped);
  };
  return /* @__PURE__ */ React39.createElement(View35, { style: { flexDirection: "row", alignItems: "center", gap: 2 } }, Array.from({ length: max }).map((_, i) => {
    const starNumber = i + 1;
    const filled = ratingValue >= starNumber;
    const halfFilled = !filled && ratingValue >= starNumber - 0.5 && precision <= 0.5;
    return /* @__PURE__ */ React39.createElement(
      Pressable14,
      {
        key: i,
        onPress: () => handlePress(i),
        disabled: disabled || readOnly,
        style: { opacity: disabled ? 0.5 : 1 }
      },
      /* @__PURE__ */ React39.createElement(Text25, { style: { fontSize, color: filled || halfFilled ? activeColor : inactiveColor, lineHeight: fontSize * 1.2 } }, filled ? "\u2605" : halfFilled ? "\u2BE8" : "\u2606")
    );
  }));
}

// src/components/ToggleButton/ToggleButton.tsx
import React40, { createContext, useContext } from "react";
import { View as View36, Text as Text26 } from "react-native";
import Animated19 from "react-native-reanimated";
import { GestureDetector as GestureDetector8 } from "react-native-gesture-handler";
import { usePressable as usePressable5, useTokens as useTokens33, useToggleGroup } from "@rnui/headless";
var ToggleContext = createContext(null);
function ToggleButtonGroup({
  value,
  defaultValue,
  exclusive = false,
  onChange,
  orientation = "horizontal",
  size = "md",
  disabled = false,
  children
}) {
  const { isSelected, toggle } = useToggleGroup({
    value,
    defaultValue,
    exclusive,
    disabled,
    onChange
  });
  return /* @__PURE__ */ React40.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ React40.createElement(View36, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const tokens = useTokens33();
  const ctx = useContext(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = usePressable5({
    onPress: () => ctx?.toggle(value),
    disabled: isDisabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "button"
  });
  const sizeMap2 = {
    sm: { height: 32, paddingHorizontal: 12, fontSize: tokens.fontSize.sm },
    md: { height: 40, paddingHorizontal: 16, fontSize: tokens.fontSize.md },
    lg: { height: 48, paddingHorizontal: 20, fontSize: tokens.fontSize.lg }
  };
  const s = sizeMap2[ctx?.size ?? "md"];
  return /* @__PURE__ */ React40.createElement(GestureDetector8, { gesture }, /* @__PURE__ */ React40.createElement(
    Animated19.View,
    {
      style: [
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? tokens.color.brand.default : tokens.color.border.default,
          backgroundColor: selected ? tokens.color.brand.subtle : tokens.color.surface.default,
          alignItems: "center",
          justifyContent: "center",
          opacity: isDisabled ? 0.5 : 1
        },
        animatedStyle
      ],
      ...accessibilityProps
    },
    /* @__PURE__ */ React40.createElement(Text26, { style: { fontSize: s.fontSize, fontWeight: tokens.fontWeight.medium, color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, children)
  ));
}

// src/components/AppBar/AppBar.tsx
import React41 from "react";
import { View as View37 } from "react-native";
import { useTokens as useTokens34 } from "@rnui/headless";
function AppBar({
  children,
  color = "primary",
  variant = "elevation",
  position = "relative",
  elevation = 2,
  style
}) {
  const tokens = useTokens34();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  const bgMap = {
    default: tokens.color.surface.default,
    inherit: "transparent",
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    transparent: "transparent"
  };
  return /* @__PURE__ */ React41.createElement(
    View37,
    {
      style: [
        {
          backgroundColor: bgMap[color],
          borderBottomWidth: variant === "outlined" ? 1 : 0,
          borderBottomColor: tokens.color.border.default
        },
        variant === "elevation" ? shadows[elevation] : null,
        position === "absolute" || position === "fixed" ? { position: "absolute", top: 0, left: 0, right: 0 } : null,
        style
      ]
    },
    children
  );
}
function Toolbar({ children, style }) {
  const tokens = useTokens34();
  return /* @__PURE__ */ React41.createElement(
    View37,
    {
      style: [
        {
          minHeight: 56,
          paddingHorizontal: tokens.spacing[4],
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3]
        },
        style
      ]
    },
    children
  );
}

// src/components/Tabs/Tabs.tsx
import React42, { createContext as createContext2, useContext as useContext2 } from "react";
import { View as View38, Text as Text27 } from "react-native";
import Animated20 from "react-native-reanimated";
import { GestureDetector as GestureDetector9 } from "react-native-gesture-handler";
import { usePressable as usePressable6, useTabs, useTokens as useTokens35 } from "@rnui/headless";
var TabsContext = createContext2(null);
function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children
}) {
  const { getTabProps, isSelected } = useTabs({ value, defaultValue, onChange });
  return /* @__PURE__ */ React42.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ React42.createElement(
    View38,
    {
      style: {
        flexDirection: orientation === "horizontal" ? "row" : "column",
        justifyContent: centered ? "center" : "flex-start",
        gap: 8
      }
    },
    children
  ));
}
function Tab({ value, label, icon, disabled = false }) {
  const tokens = useTokens35();
  const ctx = useContext2(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { animatedStyle, gesture, accessibilityProps } = usePressable6({
    onPress: () => ctx.getTabProps(value, disabled).onPress(),
    disabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "tab"
  });
  return /* @__PURE__ */ React42.createElement(GestureDetector9, { gesture }, /* @__PURE__ */ React42.createElement(
    Animated20.View,
    {
      style: [
        {
          paddingVertical: tokens.spacing[2],
          paddingHorizontal: tokens.spacing[3],
          borderBottomWidth: ctx.orientation === "horizontal" ? 2 : 0,
          borderLeftWidth: ctx.orientation === "vertical" ? 2 : 0,
          borderColor: selected ? tokens.color.brand.default : "transparent",
          opacity: disabled ? 0.5 : 1,
          alignItems: "center",
          flexDirection: "row",
          gap: tokens.spacing[2]
        },
        ctx.variant === "fullWidth" ? { flex: 1 } : null,
        animatedStyle
      ],
      ...accessibilityProps
    },
    icon,
    label && /* @__PURE__ */ React42.createElement(Text27, { style: { color: selected ? tokens.color.brand.default : tokens.color.text.secondary, fontWeight: tokens.fontWeight.medium } }, label)
  ));
}

// src/components/Drawer/Drawer.tsx
import React43, { useEffect as useEffect4 } from "react";
import { View as View39, Pressable as Pressable15, Dimensions as Dimensions3, Modal as Modal4 } from "react-native";
import Animated21, { useSharedValue as useSharedValue11, withTiming as withTiming8, useAnimatedStyle as useAnimatedStyle11 } from "react-native-reanimated";
import { useTokens as useTokens36 } from "@rnui/headless";
var { width: SCREEN_WIDTH2, height: SCREEN_HEIGHT2 } = Dimensions3.get("window");
function Drawer({
  open,
  onClose,
  anchor = "left",
  variant = "temporary",
  width = Math.min(320, SCREEN_WIDTH2 * 0.8),
  children,
  style
}) {
  const tokens = useTokens36();
  const [mounted, setMounted] = React43.useState(open);
  const translateX = useSharedValue11(anchor === "left" ? -width : anchor === "right" ? width : 0);
  const translateY = useSharedValue11(anchor === "top" ? -SCREEN_HEIGHT2 : anchor === "bottom" ? SCREEN_HEIGHT2 : 0);
  const backdropOpacity = useSharedValue11(0);
  useEffect4(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        translateX.value = withTiming8(0, { duration: 280 });
        translateY.value = withTiming8(0, { duration: 280 });
        backdropOpacity.value = withTiming8(0.4, { duration: 280 });
      });
    } else {
      const offX = anchor === "left" ? -width : anchor === "right" ? width : 0;
      const offY = anchor === "top" ? -SCREEN_HEIGHT2 : anchor === "bottom" ? SCREEN_HEIGHT2 : 0;
      translateX.value = withTiming8(offX, { duration: 220 });
      translateY.value = withTiming8(offY, { duration: 220 });
      backdropOpacity.value = withTiming8(0, { duration: 220 });
      setTimeout(() => setMounted(false), 230);
    }
  }, [open]);
  const drawerStyle = useAnimatedStyle11(() => {
    if (anchor === "left" || anchor === "right") {
      return { transform: [{ translateX: translateX.value }] };
    }
    return { transform: [{ translateY: translateY.value }] };
  });
  const backdropStyle = useAnimatedStyle11(() => ({
    opacity: backdropOpacity.value
  }));
  if (variant === "permanent") {
    return /* @__PURE__ */ React43.createElement(
      View39,
      {
        style: [
          {
            width,
            backgroundColor: tokens.color.surface.default,
            borderRightWidth: anchor === "left" ? 1 : 0,
            borderLeftWidth: anchor === "right" ? 1 : 0,
            borderColor: tokens.color.border.default
          },
          style
        ]
      },
      children
    );
  }
  if (!mounted) return null;
  const isVertical = anchor === "top" || anchor === "bottom";
  const drawerWidth = isVertical ? "100%" : width;
  const drawerHeight = isVertical ? SCREEN_HEIGHT2 * 0.5 : "100%";
  const positionStyle = {
    position: "absolute",
    ...anchor === "left" && { left: 0, top: 0, bottom: 0 },
    ...anchor === "right" && { right: 0, top: 0, bottom: 0 },
    ...anchor === "top" && { top: 0, left: 0, right: 0 },
    ...anchor === "bottom" && { bottom: 0, left: 0, right: 0 }
  };
  return /* @__PURE__ */ React43.createElement(Modal4, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React43.createElement(View39, { style: { flex: 1 }, pointerEvents: "box-none" }, /* @__PURE__ */ React43.createElement(
    Animated21.View,
    {
      style: [
        { ...positionStyle, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000" },
        backdropStyle
      ]
    },
    /* @__PURE__ */ React43.createElement(Pressable15, { style: { flex: 1 }, onPress: onClose })
  ), /* @__PURE__ */ React43.createElement(
    Animated21.View,
    {
      style: [
        positionStyle,
        {
          width: drawerWidth,
          backgroundColor: tokens.color.surface.default,
          borderRightWidth: anchor === "left" ? 1 : 0,
          borderLeftWidth: anchor === "right" ? 1 : 0,
          borderBottomWidth: anchor === "top" ? 1 : 0,
          borderTopWidth: anchor === "bottom" ? 1 : 0,
          borderColor: tokens.color.border.default
        },
        style,
        drawerStyle
      ]
    },
    children
  )));
}

// src/components/Menu/Menu.tsx
import React44 from "react";
import { Modal as Modal5, Pressable as Pressable16, Text as Text28, useWindowDimensions as useWindowDimensions2 } from "react-native";
import Animated22, {
  useSharedValue as useSharedValue12,
  useAnimatedStyle as useAnimatedStyle12,
  withTiming as withTiming9,
  withSpring as withSpring8,
  runOnJS as runOnJS2,
  Easing as Easing2
} from "react-native-reanimated";
import { useTokens as useTokens37 } from "@rnui/headless";
function Menu2({ open, onClose, anchorEl, children }) {
  const tokens = useTokens37();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions2();
  const [menuSize, setMenuSize] = React44.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React44.useState(false);
  const opacity = useSharedValue12(0);
  const scale = useSharedValue12(0.9);
  React44.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = withTiming9(1, { duration: 180, easing: Easing2.out(Easing2.cubic) });
        scale.value = withSpring8(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = withTiming9(0, { duration: 130 });
      scale.value = withTiming9(0.92, { duration: 130 }, (done) => {
        if (done) runOnJS2(setMounted)(false);
      });
    }
  }, [open]);
  const MENU_MIN_WIDTH = 180;
  const GAP = 4;
  let top = 48;
  let left = windowWidth - MENU_MIN_WIDTH - 16;
  if (anchorEl) {
    const { pageX, pageY, width, height } = anchorEl;
    top = pageY + height + GAP;
    left = pageX;
    if (left + menuSize.width > windowWidth - 8) {
      left = windowWidth - menuSize.width - 8;
    }
    if (top + menuSize.height > windowHeight - 8) {
      top = pageY - menuSize.height - GAP;
    }
    top = Math.max(8, top);
    left = Math.max(8, left);
  }
  const animStyle = useAnimatedStyle12(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ React44.createElement(Modal5, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React44.createElement(Pressable16, { style: { flex: 1 }, onPress: onClose }), /* @__PURE__ */ React44.createElement(
    Animated22.View,
    {
      onLayout: (e) => {
        const { width, height } = e.nativeEvent.layout;
        setMenuSize({ width, height });
      },
      style: [
        {
          position: "absolute",
          top,
          left,
          minWidth: MENU_MIN_WIDTH,
          backgroundColor: tokens.color.surface.default,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          overflow: "hidden",
          ...tokens.shadow.md
        },
        animStyle
      ]
    },
    children
  ));
}
function MenuItem({ children, onPress, disabled = false, selected = false }) {
  const tokens = useTokens37();
  return /* @__PURE__ */ React44.createElement(
    Pressable16,
    {
      onPress,
      disabled,
      style: ({ pressed }) => ({
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        backgroundColor: pressed ? tokens.color.bg.subtle : selected ? tokens.color.brand.subtle : "transparent",
        opacity: disabled ? 0.5 : 1
      })
    },
    /* @__PURE__ */ React44.createElement(Text28, { style: {
      color: selected ? tokens.color.brand.text : tokens.color.text.primary,
      fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
    } }, children)
  );
}

// src/components/Stepper/Stepper.tsx
import React45 from "react";
import { View as View41, Text as Text29 } from "react-native";
import { useTokens as useTokens38 } from "@rnui/headless";
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const tokens = useTokens38();
  const items = React45.Children.toArray(children);
  return /* @__PURE__ */ React45.createElement(View41, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: tokens.spacing[4] } }, items.map((child) => {
    if (!React45.isValidElement(child)) return child;
    const element = child;
    return React45.cloneElement(element, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }) {
  const tokens = useTokens38();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  return /* @__PURE__ */ React45.createElement(View41, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: tokens.spacing[2], alignItems: "center" } }, /* @__PURE__ */ React45.createElement(
    View41,
    {
      style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: isCompleted ? tokens.color.brand.default : isActive ? tokens.color.brand.subtle : tokens.color.bg.muted,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: isActive ? tokens.color.brand.default : tokens.color.border.default
      }
    },
    /* @__PURE__ */ React45.createElement(Text29, { style: { fontSize: 12, fontWeight: tokens.fontWeight.semibold, color: isCompleted ? "#fff" : tokens.color.text.primary } }, isCompleted ? "v" : index + 1)
  ), label && /* @__PURE__ */ React45.createElement(Text29, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, label), children);
}
function StepLabel({ children, style }) {
  const tokens = useTokens38();
  return /* @__PURE__ */ React45.createElement(Text29, { style: [{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }, style] }, children);
}

// src/components/Pagination/Pagination.tsx
import React46 from "react";
import { View as View42, Text as Text30, Pressable as Pressable17 } from "react-native";
import { usePagination, useTokens as useTokens39 } from "@rnui/headless";
function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md"
}) {
  const tokens = useTokens39();
  const { page: current, setPage, items } = usePagination({ count, page, defaultPage, onChange });
  const sizeMap2 = {
    sm: { height: 28, minWidth: 28, fontSize: tokens.fontSize.sm },
    md: { height: 34, minWidth: 34, fontSize: tokens.fontSize.md },
    lg: { height: 40, minWidth: 40, fontSize: tokens.fontSize.lg }
  };
  const s = sizeMap2[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ React46.createElement(Text30, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    return /* @__PURE__ */ React46.createElement(
      Pressable17,
      {
        key: item,
        onPress: () => setPage(item),
        style: {
          height: s.height,
          minWidth: s.minWidth,
          paddingHorizontal: 8,
          borderRadius: shape === "circular" ? s.height / 2 : tokens.radius.md,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor: tokens.color.border.default
        }
      },
      /* @__PURE__ */ React46.createElement(Text30, { style: { fontSize: s.fontSize, color: selected ? tokens.color.brand.default : tokens.color.text.primary } }, item)
    );
  };
  return /* @__PURE__ */ React46.createElement(View42, { style: { flexDirection: "row", alignItems: "center", gap: 6 } }, items.map(renderItem));
}

// src/components/BottomNavigation/BottomNavigation.tsx
import React47, { createContext as createContext3, useContext as useContext3 } from "react";
import { View as View43, Text as Text31, Pressable as Pressable18 } from "react-native";
import { useTokens as useTokens40 } from "@rnui/headless";
var BottomNavContext = createContext3(null);
function BottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  children
}) {
  const [internalValue, setInternalValue] = React47.useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (next) => {
    if (controlledValue === void 0) setInternalValue(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ React47.createElement(BottomNavContext.Provider, { value: { value, setValue, showLabels } }, /* @__PURE__ */ React47.createElement(View43, { style: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 } }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const tokens = useTokens40();
  const ctx = useContext3(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.value === value;
  return /* @__PURE__ */ React47.createElement(Pressable18, { onPress: () => ctx.setValue(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ React47.createElement(Text31, { style: { fontSize: tokens.fontSize.xs, color: selected ? tokens.color.brand.default : tokens.color.text.secondary } }, label));
}

// src/components/Breadcrumbs/Breadcrumbs.tsx
import React48 from "react";
import { View as View44, Text as Text32 } from "react-native";
import { useTokens as useTokens41 } from "@rnui/headless";
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const tokens = useTokens41();
  const items = React48.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ React48.createElement(Text32, { key: "ellipsis", style: { color: tokens.color.text.tertiary } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ React48.createElement(View44, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } }, displayItems.map((child, idx) => /* @__PURE__ */ React48.createElement(React48.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ React48.createElement(Text32, { style: { marginHorizontal: 6, color: tokens.color.text.tertiary } }, separator))));
}

// src/components/SpeedDial/SpeedDial.tsx
import React49, { createContext as createContext4, useContext as useContext4 } from "react";
import { View as View45, Text as Text33, Pressable as Pressable19 } from "react-native";
import { useDisclosure, useTokens as useTokens42 } from "@rnui/headless";
var SpeedDialContext = createContext4(null);
function SpeedDial({
  ariaLabel,
  icon,
  direction = "up",
  open: controlledOpen,
  onOpen,
  onClose,
  hidden = false,
  children
}) {
  const disclosure = useDisclosure({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = useTokens42();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  return /* @__PURE__ */ React49.createElement(SpeedDialContext.Provider, { value: { isOpen: disclosure.isOpen, close: disclosure.close } }, /* @__PURE__ */ React49.createElement(View45, { style: stackStyle }, disclosure.isOpen && children, /* @__PURE__ */ React49.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const tokens = useTokens42();
  const ctx = useContext4(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ React49.createElement(
    Pressable19,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: { alignItems: "center", gap: 4 }
    },
    /* @__PURE__ */ React49.createElement(
      View45,
      {
        style: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: tokens.color.surface.default,
          alignItems: "center",
          justifyContent: "center",
          ...tokens.shadow.sm
        }
      },
      icon
    ),
    tooltipTitle && /* @__PURE__ */ React49.createElement(Text33, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, tooltipTitle)
  );
}

// src/components/Chip/Chip.tsx
import React50 from "react";
import { View as View46, Text as Text34, Pressable as Pressable20 } from "react-native";
import { useTokens as useTokens43, useIconStyle as useIconStyle9, useComponentTokens as useComponentTokens10 } from "@rnui/headless";
function Chip({
  label,
  variant = "solid",
  color = "default",
  size = "md",
  avatar,
  icon,
  deleteIcon,
  onDelete,
  onClick,
  disabled = false,
  clickable = false
}) {
  const tokens = useTokens43();
  const { chip } = useComponentTokens10();
  const { size: iconSize, color: iconColor } = useIconStyle9("list");
  const palette = {
    default: { bg: tokens.color.bg.muted, text: tokens.color.text.primary, border: tokens.color.border.default },
    primary: { bg: tokens.color.brand.subtle, text: tokens.color.brand.text, border: tokens.color.brand.default },
    secondary: { bg: tokens.color.brand.muted, text: tokens.color.brand.text, border: tokens.color.brand.default },
    success: { bg: tokens.color.success.bg, text: tokens.color.success.text, border: tokens.color.success.border },
    error: { bg: tokens.color.error.bg, text: tokens.color.error.text, border: tokens.color.error.border },
    info: { bg: tokens.color.info.bg, text: tokens.color.info.text, border: tokens.color.info.border },
    warning: { bg: tokens.color.warning.bg, text: tokens.color.warning.text, border: tokens.color.warning.border }
  };
  const colors = palette[color];
  const vStyle = chip.variant[variant];
  const customBg = variant === "solid" && color !== "default" ? colors.bg : vStyle.bg;
  const customBorder = variant === "outlined" && color !== "default" ? colors.border : vStyle.border;
  const customText = color !== "default" ? colors.text : vStyle.text;
  const sizeStyle = chip.size[size] || chip.size.md;
  const container = {
    flexDirection: chip.container.flexDirection,
    alignItems: chip.container.alignItems,
    justifyContent: chip.container.justifyContent,
    gap: tokens.spacing[2],
    paddingHorizontal: sizeStyle.paddingHorizontal,
    paddingVertical: tokens.spacing[1],
    height: sizeStyle.height,
    borderRadius: chip.container.borderRadius,
    backgroundColor: customBg,
    borderWidth: variant === "outlined" ? 1 : 0,
    borderColor: customBorder,
    opacity: disabled ? tokens.opacity[60] : 1,
    minHeight: size === "sm" ? 24 : size === "lg" ? 40 : 32
  };
  const renderIcon = (node) => {
    if (!node) return null;
    if (React50.isValidElement(node)) {
      return React50.cloneElement(node, {
        size: node.props?.size ?? (size === "sm" ? 14 : 16),
        color: node.props?.color ?? iconColor
      });
    }
    return node;
  };
  const avatarStyle = {
    width: size === "sm" ? 20 : size === "lg" ? 28 : 24,
    height: size === "sm" ? 20 : size === "lg" ? 28 : 24,
    borderRadius: 12,
    marginRight: tokens.spacing[1]
  };
  const deleteButtonStyle = {
    padding: tokens.spacing[1],
    marginLeft: tokens.spacing[1],
    borderRadius: tokens.radius.full
  };
  const content = /* @__PURE__ */ React50.createElement(View46, { style: container }, avatar && /* @__PURE__ */ React50.createElement(View46, { style: avatarStyle }, avatar), renderIcon(icon), /* @__PURE__ */ React50.createElement(Text34, { style: {
    color: customText,
    fontSize: sizeStyle.fontSize,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: sizeStyle.fontSize * 1.4
  } }, label), onDelete && /* @__PURE__ */ React50.createElement(
    Pressable20,
    {
      onPress: onDelete,
      hitSlop: 8,
      style: deleteButtonStyle
    },
    deleteIcon ?? /* @__PURE__ */ React50.createElement(Text34, { style: {
      color: customText,
      fontSize: 14,
      fontWeight: tokens.fontWeight.bold,
      opacity: 0.7
    } }, "\xD7")
  ));
  if (onClick || clickable) {
    return /* @__PURE__ */ React50.createElement(
      Pressable20,
      {
        onPress: onClick,
        disabled,
        style: { opacity: disabled ? 0.5 : 1 }
      },
      content
    );
  }
  return content;
}

// src/components/Tooltip/Tooltip.tsx
import React51, { useState as useState12, useCallback as useCallback3 } from "react";
import { Text as Text35, Pressable as Pressable21, Modal as Modal6, useWindowDimensions as useWindowDimensions3 } from "react-native";
import Animated23, {
  useSharedValue as useSharedValue13,
  useAnimatedStyle as useAnimatedStyle13,
  withTiming as withTiming10,
  runOnJS as runOnJS3
} from "react-native-reanimated";
import { useTokens as useTokens44 } from "@rnui/headless";
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const tokens = useTokens44();
  const [internalOpen, setInternalOpen] = useState12(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions3();
  const [triggerRect, setTriggerRect] = useState12(null);
  const [tooltipSize, setTooltipSize] = useState12({ width: 0, height: 0 });
  const triggerRef = React51.useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const opacity = useSharedValue13(0);
  const animateIn = useCallback3(() => {
    opacity.value = withTiming10(1, { duration: 150 });
  }, []);
  const animateOut = useCallback3((onDone) => {
    opacity.value = withTiming10(0, { duration: 100 }, () => {
      runOnJS3(onDone)();
    });
  }, []);
  const handleOpen = () => {
    triggerRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
      setTriggerRect({ pageX, pageY, width: w, height: h });
      setInternalOpen(true);
      onOpen?.();
      requestAnimationFrame(() => animateIn());
    });
  };
  const handleClose = () => {
    animateOut(() => {
      setInternalOpen(false);
      setTriggerRect(null);
      onClose?.();
    });
  };
  const GAP = 8;
  const PADDING = 12;
  const tx = triggerRect?.pageX ?? 0;
  const ty = triggerRect?.pageY ?? 0;
  const tw = triggerRect?.width ?? 0;
  const th = triggerRect?.height ?? 0;
  const tlw = tooltipSize.width || 200;
  const tlh = tooltipSize.height || 40;
  let top = ty - tlh - GAP;
  let left = tx + tw / 2 - tlw / 2;
  if (placement.includes("bottom")) {
    top = ty + th + GAP;
  }
  if (placement.includes("left")) {
    left = tx - tlw - GAP;
  }
  if (placement.includes("right")) {
    left = tx + tw + GAP;
  }
  if (placement.includes("top-left") || placement.includes("bottom-left")) {
    left = tx;
  }
  if (placement.includes("top-right") || placement.includes("bottom-right")) {
    left = tx + tw - tlw;
  }
  const safeTop = Math.max(PADDING, Math.min(top, windowHeight - tlh - PADDING));
  const safeLeft = Math.max(PADDING, Math.min(left, windowWidth - tlw - PADDING));
  const animStyle = useAnimatedStyle13(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ React51.createElement(React51.Fragment, null, /* @__PURE__ */ React51.createElement(
    Pressable21,
    {
      ref: triggerRef,
      onPress: handleOpen,
      onLongPress: handleOpen,
      delayLongPress: 400
    },
    children
  ), /* @__PURE__ */ React51.createElement(
    Modal6,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ React51.createElement(
      Pressable21,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ React51.createElement(
        Animated23.View,
        {
          onLayout: (e) => {
            const { width, height } = e.nativeEvent.layout;
            setTooltipSize({ width, height });
          },
          onStartShouldSetResponder: () => true,
          style: [
            {
              position: "absolute",
              top: safeTop,
              left: safeLeft,
              maxWidth: 240,
              backgroundColor: tokens.color.bg.inverse,
              paddingHorizontal: tokens.spacing[3],
              paddingVertical: tokens.spacing[2],
              borderRadius: tokens.radius.md,
              ...tokens.shadow.lg,
              zIndex: 9999
            },
            animStyle
          ]
        },
        typeof title === "string" ? /* @__PURE__ */ React51.createElement(Text35, { style: { color: tokens.color.text.inverse, fontSize: tokens.fontSize.sm, lineHeight: tokens.fontSize.sm * 1.4 } }, title) : title
      )
    )
  ));
}

// src/components/Alert/Alert.tsx
import React52 from "react";
import { View as View48, Text as Text36, Pressable as Pressable22 } from "react-native";
import { useTokens as useTokens45 } from "@rnui/headless";
function Alert({
  severity = "info",
  variant = "standard",
  icon,
  action,
  onClose,
  children
}) {
  const tokens = useTokens45();
  const colors = tokens.color[severity];
  const bg = variant === "filled" ? colors.icon : colors.bg;
  const border = variant === "outlined" ? colors.border : "transparent";
  const textColor = variant === "filled" ? "#fff" : colors.text;
  return /* @__PURE__ */ React52.createElement(
    View48,
    {
      style: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: tokens.spacing[3],
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        borderRadius: tokens.radius.md,
        backgroundColor: bg,
        borderWidth: variant === "outlined" ? 1 : 0,
        borderColor: border
      }
    },
    icon !== false && /* @__PURE__ */ React52.createElement(Text36, { style: { color: textColor, fontWeight: tokens.fontWeight.semibold } }, "i"),
    /* @__PURE__ */ React52.createElement(View48, { style: { flex: 1 } }, /* @__PURE__ */ React52.createElement(Text36, { style: { color: textColor } }, children)),
    action,
    onClose && /* @__PURE__ */ React52.createElement(Pressable22, { onPress: onClose, hitSlop: 8 }, /* @__PURE__ */ React52.createElement(Text36, { style: { color: textColor } }, "x"))
  );
}
function AlertTitle({ children }) {
  const tokens = useTokens45();
  return /* @__PURE__ */ React52.createElement(Text36, { style: { fontWeight: tokens.fontWeight.semibold, marginBottom: tokens.spacing[1] } }, children);
}

// src/components/Dialog/Dialog.tsx
import React53 from "react";
import { Modal as Modal7, View as View49, Text as Text37, Pressable as Pressable23 } from "react-native";
import { useTokens as useTokens46 } from "@rnui/headless";
function Dialog({ open, onClose, fullWidth = false, fullScreen = false, maxWidth = 400, children }) {
  const tokens = useTokens46();
  return /* @__PURE__ */ React53.createElement(Modal7, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React53.createElement(View49, { style: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 } }, /* @__PURE__ */ React53.createElement(
    Pressable23,
    {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)"
      },
      onPress: onClose
    }
  ), /* @__PURE__ */ React53.createElement(
    View49,
    {
      style: {
        width: fullScreen ? "100%" : fullWidth ? "90%" : "auto",
        maxWidth: fullScreen ? "100%" : maxWidth,
        maxHeight: fullScreen ? "100%" : "80%",
        backgroundColor: tokens.color.surface.default,
        borderRadius: fullScreen ? 0 : tokens.radius.lg,
        padding: tokens.spacing[4],
        ...tokens.shadow.lg,
        zIndex: 1
      }
    },
    children
  )));
}
function DialogTitle({ children }) {
  const tokens = useTokens46();
  return /* @__PURE__ */ React53.createElement(
    Text37,
    {
      style: {
        fontSize: tokens.fontSize.xl,
        fontWeight: tokens.fontWeight.semibold,
        marginBottom: tokens.spacing[3],
        color: tokens.color.text.primary
      }
    },
    typeof children === "string" ? children : children
  );
}
function DialogContent({ children }) {
  const tokens = useTokens46();
  return /* @__PURE__ */ React53.createElement(View49, { style: { marginBottom: tokens.spacing[4] } }, React53.Children.map(
    children,
    (child) => typeof child === "string" ? /* @__PURE__ */ React53.createElement(Text37, { style: { color: tokens.color.text.primary, lineHeight: tokens.fontSize.md * 1.5 } }, child) : child
  ));
}
function DialogActions({ children }) {
  const tokens = useTokens46();
  return /* @__PURE__ */ React53.createElement(
    View49,
    {
      style: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: tokens.spacing[3],
        marginTop: tokens.spacing[4]
      }
    },
    children
  );
}

// src/components/Snackbar/Snackbar.tsx
import React54, { useEffect as useEffect5 } from "react";
import { View as View50, Text as Text38, Pressable as Pressable24, Modal as Modal8 } from "react-native";
import Animated24, {
  useSharedValue as useSharedValue14,
  useAnimatedStyle as useAnimatedStyle14,
  withTiming as withTiming11,
  withSpring as withSpring9,
  runOnJS as runOnJS4
} from "react-native-reanimated";
import { useTokens as useTokens47 } from "@rnui/headless";
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const tokens = useTokens47();
  const [mounted, setMounted] = React54.useState(false);
  const isBottom = anchorOrigin.vertical === "bottom";
  const translateY = useSharedValue14(isBottom ? 100 : -100);
  const opacity = useSharedValue14(0);
  const scale = useSharedValue14(0.95);
  const animateIn = () => {
    translateY.value = withSpring9(0, { damping: 25, stiffness: 300, mass: 1 });
    opacity.value = withTiming11(1, { duration: 200 });
    scale.value = withSpring9(1, { damping: 25, stiffness: 300 });
  };
  const animateOut = (onDone) => {
    translateY.value = withTiming11(isBottom ? 100 : -100, { duration: 200 });
    opacity.value = withTiming11(0, { duration: 150 }, (done) => {
      if (done) runOnJS4(onDone)();
    });
  };
  useEffect5(() => {
    if (open) {
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      setMounted(true);
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  useEffect5(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = anchorOrigin.horizontal === "center" ? { alignSelf: "center" } : anchorOrigin.horizontal === "left" ? { left: 16 } : { right: 16 };
  const animStyle = useAnimatedStyle14(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ React54.createElement(Modal8, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React54.createElement(View50, { pointerEvents: "box-none", style: { flex: 1 } }, /* @__PURE__ */ React54.createElement(
    Animated24.View,
    {
      style: [
        {
          position: "absolute",
          maxWidth: 400,
          minWidth: 200,
          backgroundColor: tokens.color.bg.inverse,
          paddingHorizontal: tokens.spacing[4],
          paddingVertical: tokens.spacing[3],
          borderRadius: tokens.radius.md,
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          ...tokens.shadow.lg
        },
        verticalStyle,
        horizontalStyle,
        animStyle
      ]
    },
    /* @__PURE__ */ React54.createElement(Text38, { style: { color: tokens.color.text.inverse, flex: 1 } }, message),
    action,
    onClose && /* @__PURE__ */ React54.createElement(Pressable24, { onPress: onClose, hitSlop: 8 }, /* @__PURE__ */ React54.createElement(Text38, { style: { color: tokens.color.text.inverse, fontSize: 16 } }, "\u2715"))
  )));
}

// src/components/CircularProgress/CircularProgress.tsx
import React55 from "react";
import { ActivityIndicator as ActivityIndicator2, View as View51, Text as Text39, StyleSheet as StyleSheet7 } from "react-native";
import { useTokens as useTokens48 } from "@rnui/headless";
var sizeMap = {
  small: 20,
  medium: 32,
  large: 48
};
function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}
function CircularProgress({
  size = "medium",
  color = "primary",
  thickness: _thickness,
  value = 0,
  variant = "indeterminate",
  showLabel = false,
  style
}) {
  const tokens = useTokens48();
  const resolvedSize = typeof size === "number" ? size : sizeMap[size];
  const resolvedColor = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color];
  const progressValue = clamp(value);
  return /* @__PURE__ */ React55.createElement(View51, { style: [styles6.container, style] }, /* @__PURE__ */ React55.createElement(
    ActivityIndicator2,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ React55.createElement(View51, { style: StyleSheet7.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ React55.createElement(View51, { style: styles6.labelContainer }, /* @__PURE__ */ React55.createElement(Text39, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
}
var styles6 = StyleSheet7.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  labelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

// src/components/LinearProgress/LinearProgress.tsx
import React56 from "react";
import { View as View52, StyleSheet as StyleSheet8 } from "react-native";
import Animated25, { useAnimatedStyle as useAnimatedStyle15 } from "react-native-reanimated";
import { useTokens as useTokens49 } from "@rnui/headless";
function clamp2(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}
function LinearProgress({
  value = 0,
  variant = "indeterminate",
  valueBuffer = 0,
  color = "primary",
  trackColor,
  thickness = 4,
  style
}) {
  const tokens = useTokens49();
  const progressValue = clamp2(value);
  const barColor = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color];
  const containerStyle = [
    styles7.container,
    { height: thickness, backgroundColor: trackColor ?? tokens.color.bg.muted },
    style
  ];
  const determinateStyle = useAnimatedStyle15(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ React56.createElement(View52, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ React56.createElement(
    Animated25.View,
    {
      style: [
        styles7.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ React56.createElement(React56.Fragment, null, variant === "buffer" && /* @__PURE__ */ React56.createElement(View52, { style: [styles7.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? "rgba(0,0,0,0.1)" }] }), /* @__PURE__ */ React56.createElement(
    Animated25.View,
    {
      style: [
        styles7.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles7 = StyleSheet8.create({
  container: {
    width: "100%",
    borderRadius: 999,
    overflow: "hidden"
  },
  determinateBar: {
    height: "100%"
  },
  indeterminateBar: {
    height: "100%",
    width: "40%"
  },
  bufferBar: {
    position: "absolute",
    height: "100%",
    left: 0,
    top: 0
  }
});

// src/components/Table/Table.tsx
import React57, { createContext as createContext5, useContext as useContext5 } from "react";
import { View as View53, ScrollView as ScrollView3, Text as Text40, Pressable as Pressable25 } from "react-native";
import { useTokens as useTokens50 } from "@rnui/headless";
var TableContext = createContext5(null);
function useTableContext() {
  return useContext5(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = { size, padding, stickyHeader };
  return /* @__PURE__ */ React57.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ React57.createElement(View53, { style }, children));
}
function TableContainer({ children, style }) {
  const tokens = useTokens50();
  return /* @__PURE__ */ React57.createElement(
    ScrollView3,
    {
      horizontal: true,
      style: [
        {
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          borderRadius: tokens.radius.md
        },
        style
      ]
    },
    /* @__PURE__ */ React57.createElement(View53, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const tokens = useTokens50();
  return /* @__PURE__ */ React57.createElement(View53, { style: { backgroundColor: tokens.color.bg.muted } }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ React57.createElement(View53, null, children);
}
function TableFooter({ children }) {
  const tokens = useTokens50();
  return /* @__PURE__ */ React57.createElement(View53, { style: { borderTopWidth: 1, borderTopColor: tokens.color.border.default } }, children);
}
function TableRow({ children, selected = false, style }) {
  const tokens = useTokens50();
  return /* @__PURE__ */ React57.createElement(
    View53,
    {
      style: [
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
          borderBottomWidth: 1,
          borderBottomColor: tokens.color.border.default
        },
        style
      ]
    },
    children
  );
}
function TableCell({
  children,
  align = "left",
  padding,
  size,
  variant = "body",
  style
}) {
  const tokens = useTokens50();
  const ctx = useTableContext();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const basePadding = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const verticalPadding = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ React57.createElement(View53, { style: [{ paddingHorizontal: basePadding, paddingVertical: verticalPadding, flexShrink: 0 }, style] }, /* @__PURE__ */ React57.createElement(
    Text40,
    {
      style: {
        color: tokens.color.text.primary,
        textAlign: align,
        fontWeight: variant === "head" ? tokens.fontWeight.semibold : tokens.fontWeight.regular,
        fontSize: resolvedSize === "small" ? tokens.fontSize.sm : tokens.fontSize.md
      }
    },
    children
  ));
}
function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  labelRowsPerPage = "Rows per page"
}) {
  const tokens = useTokens50();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ React57.createElement(
    View53,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React57.createElement(Text40, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ React57.createElement(View53, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ React57.createElement(Text40, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ React57.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1))
      },
      "Prev"
    ), /* @__PURE__ */ React57.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page >= totalPages - 1,
        onPress: () => onPageChange?.(Math.min(totalPages - 1, page + 1))
      },
      "Next"
    ))
  );
}
function TableSortLabel({
  active = false,
  direction = "asc",
  onClick,
  children
}) {
  const tokens = useTokens50();
  return /* @__PURE__ */ React57.createElement(Pressable25, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React57.createElement(Text40, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), /* @__PURE__ */ React57.createElement(Text40, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.xs } }, active ? direction === "asc" ? "^" : "v" : "-"));
}

// src/components/ImageList/ImageList.tsx
import React58, { createContext as createContext6, useContext as useContext6, useMemo as useMemo6, useState as useState13 } from "react";
import { View as View54, Text as Text41, Dimensions as Dimensions4 } from "react-native";
import { useTokens as useTokens51 } from "@rnui/headless";
var { width: SCREEN_WIDTH3 } = Dimensions4.get("window");
var ImageListContext = createContext6(null);
function useImageListContext() {
  return useContext6(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = useState13(SCREEN_WIDTH3);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = useMemo6(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ React58.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ React58.createElement(View54, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
}
function ImageListItem({ children, cols = 1, rows = 1, style }) {
  const ctx = useImageListContext();
  const gap = ctx?.gap ?? 8;
  const columns = ctx?.cols ?? 2;
  const variant = ctx?.variant ?? "standard";
  const rowHeight = ctx?.rowHeight ?? 120;
  const listWidth = ctx?.width ?? 0;
  const totalGap = gap * (columns - 1);
  const baseWidth = columns > 0 ? (listWidth - totalGap) / columns : listWidth;
  const itemWidth = cols * baseWidth + gap * (cols - 1);
  const height = variant === "masonry" || rowHeight === "auto" ? void 0 : rowHeight * rows + gap * (rows - 1);
  return /* @__PURE__ */ React58.createElement(View54, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const tokens = useTokens51();
  return /* @__PURE__ */ React58.createElement(
    View54,
    {
      style: [
        {
          position: "absolute",
          left: 0,
          right: 0,
          padding: tokens.spacing[3],
          backgroundColor: "rgba(0,0,0,0.55)",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        },
        position === "top" ? { top: 0 } : { bottom: 0 },
        style
      ]
    },
    /* @__PURE__ */ React58.createElement(View54, { style: { flex: 1 } }, title ? /* @__PURE__ */ React58.createElement(Text41, { style: { color: "#FFFFFF", fontWeight: tokens.fontWeight.semibold } }, title) : null, subtitle ? /* @__PURE__ */ React58.createElement(Text41, { style: { color: "#FFFFFF", fontSize: tokens.fontSize.xs } }, subtitle) : null),
    actionIcon
  );
}

// src/components/Timeline/Timeline.tsx
import React59, { createContext as createContext7, useContext as useContext7 } from "react";
import { View as View55, Text as Text42 } from "react-native";
import { useTokens as useTokens52 } from "@rnui/headless";
var TimelineContext = createContext7(null);
function useTimelineContext() {
  return useContext7(TimelineContext);
}
function Timeline({ position = "right", itemVariant = "filled", children }) {
  return /* @__PURE__ */ React59.createElement(TimelineContext.Provider, { value: { position, itemVariant } }, /* @__PURE__ */ React59.createElement(View55, { style: { gap: 24 } }, React59.Children.map(children, (child, index) => {
    if (!React59.isValidElement(child)) return child;
    const element = child;
    if (position === "alternate" || position === "alternate-reverse") {
      const isEven = index % 2 === 0;
      const derived = position === "alternate" ? isEven ? "right" : "left" : isEven ? "left" : "right";
      return React59.cloneElement(element, { position: element.props?.position ?? derived, variant: itemVariant });
    }
    return React59.cloneElement(element, { variant: itemVariant });
  })));
}
function TimelineItem({ position, variant = "filled", status = "pending", children }) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");
  return /* @__PURE__ */ React59.createElement(View55, { style: { flexDirection: "row", alignItems: "stretch", minHeight: 80 } }, /* @__PURE__ */ React59.createElement(View55, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractOpposite(children) : extractContent(children)), /* @__PURE__ */ React59.createElement(TimelineSeparator, { status, variant }), /* @__PURE__ */ React59.createElement(View55, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractContent(children) : extractOpposite(children)));
}
function extractChildrenByType(children, type) {
  const items = [];
  React59.Children.forEach(children, (child) => {
    if (React59.isValidElement(child) && child.type === type) {
      const element = child;
      items.push(element.props.children);
    }
  });
  return items.length > 0 ? items : null;
}
function extractContent(children) {
  const result = extractChildrenByType(children, TimelineContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React59.createElement(Text42, null, result[0]);
  }
  return result;
}
function extractOpposite(children) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React59.createElement(Text42, null, result[0]);
  }
  return result;
}
function TimelineSeparator({ status = "pending", variant = "filled", children }) {
  const tokens = useTokens52();
  const dotColors = {
    pending: tokens.color.border.default,
    active: tokens.color.brand.default,
    completed: tokens.color.success.icon,
    error: tokens.color.error.icon
  };
  const connectorColor = status === "completed" ? tokens.color.success.border : tokens.color.border.default;
  return /* @__PURE__ */ React59.createElement(View55, { style: { alignItems: "center", width: 48, paddingHorizontal: 8 } }, children || /* @__PURE__ */ React59.createElement(React59.Fragment, null, /* @__PURE__ */ React59.createElement(
    TimelineDot,
    {
      variant,
      color: status === "completed" ? "success" : status === "error" ? "error" : status === "active" ? "primary" : "secondary"
    }
  ), /* @__PURE__ */ React59.createElement(TimelineConnector, { color: connectorColor })));
}
function TimelineDot({ variant = "filled", color = "primary", size = 16 }) {
  const tokens = useTokens52();
  const fill = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color];
  return /* @__PURE__ */ React59.createElement(
    View55,
    {
      style: {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: variant === "filled" ? fill : "transparent",
        borderWidth: 2.5,
        borderColor: fill,
        ...tokens.shadow.sm
      }
    }
  );
}
function TimelineConnector({ color, width = 2 }) {
  const tokens = useTokens52();
  return /* @__PURE__ */ React59.createElement(View55, { style: { width, flex: 1, backgroundColor: color ?? tokens.color.border.default, marginVertical: 4, borderRadius: width } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ React59.createElement(View55, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ React59.createElement(View55, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ React59.createElement(Text42, null, children) : children);
}

// src/components/Modal/Modal.tsx
import React60 from "react";
import { Modal as RNModal, View as View56, Pressable as Pressable26, StyleSheet as StyleSheet9 } from "react-native";
import { useTokens as useTokens53 } from "@rnui/headless";
function Modal9({
  open,
  onClose,
  children,
  keepMounted = false,
  hideBackdrop = false,
  disableEscapeKeyDown = false,
  BackdropComponent,
  BackdropProps,
  contentStyle
}) {
  const tokens = useTokens53();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ React60.createElement(
    RNModal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ React60.createElement(View56, { style: styles8.container }, !hideBackdrop && (BackdropComponent ? /* @__PURE__ */ React60.createElement(BackdropComponent, { ...BackdropProps }) : /* @__PURE__ */ React60.createElement(
      Pressable26,
      {
        style: [StyleSheet9.absoluteFill, { backgroundColor: tokens.color.bg.overlay }],
        onPress: onClose
      }
    )), /* @__PURE__ */ React60.createElement(View56, { style: [styles8.content, { backgroundColor: tokens.color.surface.overlay }, contentStyle] }, children))
  );
}
var styles8 = StyleSheet9.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    minWidth: 280,
    maxWidth: "90%",
    borderRadius: 16,
    padding: 16
  }
});

// src/components/Popover/Popover.tsx
import React61, { useMemo as useMemo7, useState as useState14 } from "react";
import { Modal as Modal10, View as View57, Pressable as Pressable27, StyleSheet as StyleSheet10, Dimensions as Dimensions5 } from "react-native";
import { useTokens as useTokens54 } from "@rnui/headless";
var defaultOrigin = { vertical: "bottom", horizontal: "left" };
var defaultTransform = { vertical: "top", horizontal: "left" };
function resolveOrigin(value, size) {
  if (typeof value === "number") return value;
  if (value === "center") return size / 2;
  if (value === "bottom" || value === "right") return size;
  return 0;
}
function Popover({
  open,
  anchorEl,
  anchorPosition,
  onClose,
  anchorOrigin = defaultOrigin,
  transformOrigin = defaultTransform,
  PaperProps,
  marginThreshold = 12,
  children
}) {
  const tokens = useTokens54();
  const [contentSize, setContentSize] = useState14({ width: 0, height: 0 });
  if (!open) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const anchorX = anchorPosition?.left ?? anchorRect.x;
  const anchorY = anchorPosition?.top ?? anchorRect.y;
  const anchorWidth = anchorRect.width ?? 0;
  const anchorHeight = anchorRect.height ?? 0;
  const anchorOffsetX = resolveOrigin(anchorOrigin.horizontal, anchorWidth);
  const anchorOffsetY = resolveOrigin(anchorOrigin.vertical, anchorHeight);
  const transformOffsetX = resolveOrigin(transformOrigin.horizontal, contentSize.width);
  const transformOffsetY = resolveOrigin(transformOrigin.vertical, contentSize.height);
  const { width: screenWidth, height: screenHeight } = Dimensions5.get("window");
  const position = useMemo7(() => {
    let left = anchorX + anchorOffsetX - transformOffsetX;
    let top = anchorY + anchorOffsetY - transformOffsetY;
    left = Math.max(marginThreshold, Math.min(left, screenWidth - contentSize.width - marginThreshold));
    top = Math.max(marginThreshold, Math.min(top, screenHeight - contentSize.height - marginThreshold));
    return { left, top };
  }, [anchorX, anchorY, anchorOffsetX, anchorOffsetY, transformOffsetX, transformOffsetY, contentSize, screenWidth, screenHeight, marginThreshold]);
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== contentSize.width || height !== contentSize.height) {
      setContentSize({ width, height });
    }
  };
  return /* @__PURE__ */ React61.createElement(Modal10, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React61.createElement(Pressable27, { style: styles9.backdrop, onPress: onClose }), /* @__PURE__ */ React61.createElement(
    View57,
    {
      onLayout: handleLayout,
      style: [
        styles9.paper,
        {
          backgroundColor: tokens.color.surface.overlay,
          borderColor: tokens.color.border.default,
          shadowColor: tokens.color.text.primary,
          // Hide until measured to prevent position flash
          opacity: contentSize.width === 0 ? 0 : 1
        },
        position,
        PaperProps?.style
      ]
    },
    children
  ));
}
var styles9 = StyleSheet10.create({
  backdrop: {
    ...StyleSheet10.absoluteFillObject
  },
  paper: {
    position: "absolute",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 }
  }
});

// src/components/Popper/Popper.tsx
import React62, { useMemo as useMemo8, useState as useState15 } from "react";
import { Modal as Modal11, View as View58, Pressable as Pressable28, StyleSheet as StyleSheet11, Dimensions as Dimensions6 } from "react-native";
import { useTokens as useTokens55 } from "@rnui/headless";
function resolvePlacement(placement, anchor, content) {
  const baseX = anchor.x;
  const baseY = anchor.y;
  const centerX = baseX + anchor.width / 2 - content.width / 2;
  const centerY = baseY + anchor.height / 2 - content.height / 2;
  const leftX = baseX;
  const rightX = baseX + anchor.width - content.width;
  const topY = baseY - content.height;
  const bottomY = baseY + anchor.height;
  switch (placement) {
    case "top":
      return { left: centerX, top: topY };
    case "top-start":
      return { left: leftX, top: topY };
    case "top-end":
      return { left: rightX, top: topY };
    case "bottom":
      return { left: centerX, top: bottomY };
    case "bottom-start":
      return { left: leftX, top: bottomY };
    case "bottom-end":
      return { left: rightX, top: bottomY };
    case "left":
      return { left: baseX - content.width, top: centerY };
    case "left-start":
      return { left: baseX - content.width, top: baseY };
    case "left-end":
      return { left: baseX - content.width, top: baseY + anchor.height - content.height };
    case "right":
      return { left: baseX + anchor.width, top: centerY };
    case "right-start":
      return { left: baseX + anchor.width, top: baseY };
    case "right-end":
      return { left: baseX + anchor.width, top: baseY + anchor.height - content.height };
    default:
      return { left: centerX, top: bottomY };
  }
}
function Popper({
  open,
  anchorEl,
  placement = "bottom",
  keepMounted = false,
  onClose,
  children
}) {
  const tokens = useTokens55();
  const [contentSize, setContentSize] = useState15({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = Dimensions6.get("window");
  const position = useMemo8(() => {
    const pos = resolvePlacement(placement, {
      x: anchorRect.x,
      y: anchorRect.y,
      width: anchorRect.width ?? 0,
      height: anchorRect.height ?? 0
    }, contentSize);
    const left = Math.max(8, Math.min(pos.left, screenWidth - contentSize.width - 8));
    const top = Math.max(8, Math.min(pos.top, screenHeight - contentSize.height - 8));
    return { left, top };
  }, [placement, anchorRect, contentSize, screenWidth, screenHeight]);
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== contentSize.width || height !== contentSize.height) {
      setContentSize({ width, height });
    }
  };
  return /* @__PURE__ */ React62.createElement(Modal11, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React62.createElement(Pressable28, { style: styles10.backdrop, onPress: onClose }), /* @__PURE__ */ React62.createElement(
    View58,
    {
      onLayout: handleLayout,
      style: [
        styles10.popper,
        {
          backgroundColor: tokens.color.surface.overlay,
          borderColor: tokens.color.border.default,
          shadowColor: tokens.color.text.primary
        },
        position
      ]
    },
    children
  ));
}
var styles10 = StyleSheet11.create({
  backdrop: {
    ...StyleSheet11.absoluteFillObject
  },
  popper: {
    position: "absolute",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 }
  }
});

// src/components/FormControl/FormControl.tsx
import React63, { createContext as createContext8, useContext as useContext8 } from "react";
import { View as View59, Text as Text43, Pressable as Pressable29 } from "react-native";
import { useTokens as useTokens56 } from "@rnui/headless";
var FormControlContext = createContext8(null);
function useFormControl() {
  return useContext8(FormControlContext);
}
function FormControl({
  children,
  error,
  required,
  disabled,
  focused,
  fullWidth,
  variant = "outlined",
  margin = "none",
  style
}) {
  const tokens = useTokens56();
  const marginSize = margin === "dense" ? tokens.spacing[2] : margin === "normal" ? tokens.spacing[4] : 0;
  return /* @__PURE__ */ React63.createElement(FormControlContext.Provider, { value: { error, required, disabled, focused, fullWidth, variant } }, /* @__PURE__ */ React63.createElement(View59, { style: [{ alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const tokens = useTokens56();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.secondary;
  return /* @__PURE__ */ React63.createElement(Text43, { style: [{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const tokens = useTokens56();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.tertiary;
  return /* @__PURE__ */ React63.createElement(Text43, { style: [{ fontSize: tokens.fontSize.xs, color, marginTop: tokens.spacing[1] }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const tokens = useTokens56();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = React63.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ React63.createElement(
    Pressable29,
    {
      onPress: onPress ?? control.props?.onPress,
      disabled: isDisabled,
      style: [
        {
          flexDirection: isRow ? rowReverse ? "row-reverse" : "row" : colReverse ? "column-reverse" : "column",
          alignItems: isRow ? "center" : "flex-start",
          gap: tokens.spacing[2],
          opacity: isDisabled ? tokens.opacity[60] : 1
        },
        style
      ]
    },
    controlElement,
    label ? /* @__PURE__ */ React63.createElement(Text43, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, label) : null
  );
}
export {
  Alert,
  AlertTitle,
  AnimatedList,
  AppBar,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  BottomSheet,
  Box2 as Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Checkbox,
  Chip,
  CircularProgress,
  DatePicker,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  EmptyState,
  Fab,
  FormControl,
  FormControlLabel,
  FormField,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid2 as Grid,
  Icon,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  LinearProgress,
  Link,
  List,
  ListItem,
  Menu2 as Menu,
  MenuItem,
  Modal9 as Modal,
  OTPInput,
  Pagination,
  Paper,
  PasswordInput,
  Popover,
  Popper,
  Pressable11 as Pressable,
  RadioGroup,
  RadioItem,
  Rating,
  RnImage,
  SectionHeader,
  SegmentedControl,
  Select,
  Skeleton,
  SkeletonCard,
  SkeletonListItem,
  SkeletonText,
  Slider,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Step,
  StepLabel,
  Stepper,
  SvgIcon,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextArea,
  TextField,
  ThemeProvider,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  ToastContainer,
  ToastItem,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  useComponentTokens11 as useComponentTokens,
  useFormControl,
  useIconStyle10 as useIconStyle,
  useIsDark,
  useTheme,
  useTokens57 as useTokens
};
//# sourceMappingURL=index.mjs.map