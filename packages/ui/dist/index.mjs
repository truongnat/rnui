import { useTokens, useBottomSheet, useComponentTokens, useIconStyle, usePressable, useToast, dismissToast, useCheckbox, useSwitch, useSelect, useListItem, useRadioGroup, useSlider, useAutocomplete, useRating, useToggleGroup, useTabs, usePagination, useDisclosure } from '@rnui/headless';
export * from '@rnui/headless';
export { ThemeProvider, useComponentTokens, useIconStyle, useIsDark, useTheme, useTokens } from '@rnui/headless';
import React12, { forwardRef, useState, useImperativeHandle, createContext, useMemo, useEffect, useRef, useCallback, useContext } from 'react';
import Animated7, { useSharedValue, withTiming, runOnJS, useAnimatedStyle, FadeInDown, FadeInUp, FadeOutUp, FadeOutDown, withSpring, interpolate, interpolateColor, withRepeat } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, Modal, View, Linking, ActivityIndicator, Text, TextInput, Pressable, ScrollView, Image, useWindowDimensions } from 'react-native';
import { EyeOff, Eye } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spring } from '@rnui/tokens';
import { FlashList } from '@shopify/flash-list';

// src/index.ts
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
    if (React12.isValidElement(icon)) {
      return React12.cloneElement(icon, {
        size: icon.props?.size ?? iconSize,
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ React12.createElement(View, { style: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: button.variant[resolvedVariant].container.gap,
      opacity: loading && loadingPosition === "center" ? 0 : 1
    } }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ React12.createElement(ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ React12.createElement(Text, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ React12.createElement(ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ React12.createElement(View, { style: [StyleSheet.absoluteFill, { alignItems: "center", justifyContent: "center" }] }, loadingIndicator ?? /* @__PURE__ */ React12.createElement(ActivityIndicator, { size: "small", color: iconColor }))
  ));
}
function Input({
  label,
  error,
  helperText,
  size = "md",
  leadingElement,
  trailingElement,
  disabled = false,
  onFocus,
  onBlur,
  ...rest
}) {
  const { input } = useComponentTokens();
  const tokens = useTokens();
  const { size: iconSize, color: iconColor } = useIconStyle("input");
  const [isFocused, setIsFocused] = useState(false);
  const containerStyle = useMemo(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ], [input, size, isFocused, error, disabled]);
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React12.isValidElement(icon)) {
      return React12.cloneElement(icon, {
        size: icon.props?.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React12.createElement(View, null, label && /* @__PURE__ */ React12.createElement(Text, { style: input.label }, label), /* @__PURE__ */ React12.createElement(View, { style: containerStyle }, renderIcon(leadingElement), /* @__PURE__ */ React12.createElement(
    TextInput,
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
      ...rest
    }
  ), renderIcon(trailingElement)), error ? /* @__PURE__ */ React12.createElement(Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React12.createElement(Text, { style: input.helperText }, helperText) : null);
}
function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const { size, color } = useIconStyle("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ React12.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ React12.createElement(
        Pressable,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        show ? /* @__PURE__ */ React12.createElement(EyeOff, { size, color }) : /* @__PURE__ */ React12.createElement(Eye, { size, color })
      )
    }
  );
}
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = useComponentTokens();
  const containerStyle = useMemo(() => [
    card.container,
    padding !== "none" && { padding: card.padding[padding] },
    style
  ], [card, padding, style]);
  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = usePressable({
      onPress,
      feedbackMode: "scaleSubtle",
      accessibilityLabel,
      accessibilityRole: "button"
    });
    return /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(Animated7.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ React12.createElement(View, { style: containerStyle }, children);
}
function Badge({ label, variant = "default", icon }) {
  const { badge } = useComponentTokens();
  const { size: iconSize } = useIconStyle("list");
  const containerStyle = useMemo(() => [
    badge.base,
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    }
  ], [badge, variant]);
  const textStyle = useMemo(() => [
    badge.text,
    { color: badge.variant[variant].text }
  ], [badge, variant]);
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (React12.isValidElement(el)) {
      return React12.cloneElement(el, {
        size: el.props?.size ?? iconSize * 0.8,
        color: el.props?.color ?? iconColor
      });
    }
    return el;
  };
  return /* @__PURE__ */ React12.createElement(View, { style: containerStyle }, renderIcon(icon), /* @__PURE__ */ React12.createElement(Text, { style: textStyle }, label));
}
function VariantIcon({ variant, color }) {
  const size = 20;
  if (variant === "success") {
    return /* @__PURE__ */ React12.createElement(View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: "#fff", fontSize: 12, fontWeight: "800", marginTop: -1 } }, "\u2713"));
  }
  if (variant === "error") {
    return /* @__PURE__ */ React12.createElement(View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: "#fff", fontSize: 13, fontWeight: "800", marginTop: -1 } }, "\u2715"));
  }
  if (variant === "warning") {
    return /* @__PURE__ */ React12.createElement(View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: "#fff", fontSize: 13, fontWeight: "900" } }, "!"));
  }
  if (variant === "info") {
    return /* @__PURE__ */ React12.createElement(View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: "#fff", fontSize: 13, fontWeight: "900" } }, "i"));
  }
  return null;
}
function ToastItem({ item, position, onDismiss }) {
  const { toast } = useComponentTokens();
  const tokens = useTokens();
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
  return /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ React12.createElement(View, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, React12.isValidElement(item.icon) ? React12.cloneElement(item.icon, {
      size: item.icon.props?.size ?? 20,
      color: item.icon.props?.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ React12.createElement(VariantIcon, { variant: item.variant, color: v.iconColor }),
    /* @__PURE__ */ React12.createElement(Text, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ React12.createElement(
      Pressable,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ React12.createElement(Pressable, { onPress: () => onDismiss(item.id), hitSlop: 8 }, /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 16, color: tokens.color.text.inverse, opacity: 0.7, lineHeight: 18 } }, "\u2715")),
    !item.persistent && /* @__PURE__ */ React12.createElement(View, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ React12.createElement(Animated7.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
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
  return /* @__PURE__ */ React12.createElement(View, { style: [styles.container, positionStyle], pointerEvents: "box-none" }, toasts.map((item) => /* @__PURE__ */ React12.createElement(
    ToastItem,
    {
      key: item.id,
      item,
      position,
      onDismiss: dismissToast
    }
  )));
}
var styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999
  }
});
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
    const tokens = useTokens();
    const insets = useSafeAreaInsets();
    const [mounted, setMounted] = useState(false);
    const handleClose = React12.useCallback(() => {
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
    const open = React12.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    useImperativeHandle(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ React12.createElement(Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ React12.createElement(View, { style: StyleSheet.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ React12.createElement(GestureDetector, { gesture: backdropTapGesture }, /* @__PURE__ */ React12.createElement(
      Animated7.View,
      {
        style: [
          StyleSheet.absoluteFill,
          { backgroundColor: "#000" },
          backdropAnimatedStyle
        ]
      }
    )), /* @__PURE__ */ React12.createElement(
      Animated7.View,
      {
        style: [
          styles2.sheet,
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
      /* @__PURE__ */ React12.createElement(GestureDetector, { gesture: panGesture }, /* @__PURE__ */ React12.createElement(View, { style: styles2.handleArea }, showHandle && /* @__PURE__ */ React12.createElement(
        View,
        {
          style: [
            styles2.handle,
            { backgroundColor: tokens.color.border.strong }
          ]
        }
      ))),
      /* @__PURE__ */ React12.createElement(View, { style: { flex: 1 } }, children)
    )));
  }
);
var styles2 = StyleSheet.create({
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
var SIZE = { sm: 18, md: 22, lg: 26 };
var ICON_SIZE = { sm: 10, md: 13, lg: 16 };
function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}) {
  const tokens = useTokens();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = useCheckbox(hookOptions);
  const boxSize = SIZE[size];
  const iconSize = ICON_SIZE[size];
  const scale = useSharedValue(1);
  const fillProgress = useSharedValue(isChecked || isIndeterminate ? 1 : 0);
  React12.useEffect(() => {
    fillProgress.value = withSpring(isChecked || isIndeterminate ? 1 : 0, spring.snappy);
  }, [isChecked, isIndeterminate]);
  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolate(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5 ? tokens.color.brand.default : "transparent",
    borderColor: fillProgress.value > 0.5 ? tokens.color.brand.default : tokens.color.border.default,
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = useAnimatedStyle(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    scale.value = withSpring(0.88, spring.snappy, () => {
      scale.value = withSpring(1, spring.snappy);
    });
    toggle();
  };
  return /* @__PURE__ */ React12.createElement(
    Pressable,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? 0.4 : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React12.createElement(
      Animated7.View,
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
      /* @__PURE__ */ React12.createElement(Animated7.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ React12.createElement(View, { style: { width: iconSize, height: 2, backgroundColor: "#fff", borderRadius: 1 } }) : /* @__PURE__ */ React12.createElement(Text, { style: { color: "#fff", fontSize: iconSize, fontWeight: "700", lineHeight: iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}
var TRACK = {
  sm: { width: 36, height: 20, radius: 10, thumbSize: 16, thumbOffset: 2 },
  md: { width: 46, height: 26, radius: 13, thumbSize: 22, thumbOffset: 2 },
  lg: { width: 56, height: 30, radius: 15, thumbSize: 26, thumbOffset: 2 }
};
function Switch({ label, description, size = "md", ...hookOptions }) {
  const tokens = useTokens();
  const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch(hookOptions);
  const t = TRACK[size];
  const thumbTravel = t.width - t.thumbSize - t.thumbOffset * 2;
  const progress = useSharedValue(isOn ? 1 : 0);
  React12.useEffect(() => {
    progress.value = withSpring(isOn ? 1 : 0, spring.snappy);
  }, [isOn]);
  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [tokens.color.border.default, tokens.color.brand.default]
    )
  }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ React12.createElement(
    Pressable,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? 0.4 : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React12.createElement(
      Animated7.View,
      {
        style: [
          {
            width: t.width,
            height: t.height,
            borderRadius: t.radius,
            justifyContent: "center",
            padding: t.thumbOffset
          },
          trackStyle
        ]
      },
      /* @__PURE__ */ React12.createElement(
        Animated7.View,
        {
          style: [
            {
              width: t.thumbSize,
              height: t.thumbSize,
              borderRadius: t.thumbSize / 2,
              backgroundColor: "#fff",
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
    (label || description) && /* @__PURE__ */ React12.createElement(View, { style: { flex: 1 } }, label && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}
function Select({
  label,
  placeholder = "Select\u2026",
  searchable = false,
  error,
  options,
  ...hookOptions
}) {
  const tokens = useTokens();
  const sheetRef = useRef(null);
  const [query, setQuery] = useState("");
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
    if (!hookOptions.multiple) handleClose();
  };
  const { size: searchIconSize, color: searchIconColor } = useIconStyle("input");
  return /* @__PURE__ */ React12.createElement(View, null, label && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ React12.createElement(
    Pressable,
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
    /* @__PURE__ */ React12.createElement(
      Text,
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
    /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 12, color: tokens.color.text.tertiary, marginLeft: 8 } }, isOpen ? "\u25B2" : "\u25BC")
  ), error && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ React12.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, paddingHorizontal: tokens.spacing[4] } }, searchable && isOpen && /* @__PURE__ */ React12.createElement(
      View,
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
      /* @__PURE__ */ React12.createElement(View, { style: { width: searchIconSize, height: searchIconSize, marginRight: 8, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React12.createElement(View, { style: {
        width: searchIconSize * 0.7,
        height: searchIconSize * 0.7,
        borderRadius: searchIconSize * 0.35,
        borderWidth: 2,
        borderColor: searchIconColor,
        position: "absolute",
        top: 0,
        left: 0
      } }), /* @__PURE__ */ React12.createElement(View, { style: {
        width: 2,
        height: searchIconSize * 0.4,
        backgroundColor: searchIconColor,
        borderRadius: 1,
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: [{ rotate: "-45deg" }]
      } })),
      /* @__PURE__ */ React12.createElement(
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
      query.length > 0 && /* @__PURE__ */ React12.createElement(Pressable, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 14, color: tokens.color.text.tertiary } }, "\u2715"))
    ), /* @__PURE__ */ React12.createElement(ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled" }, filtered.length === 0 ? /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] } }, 'No results for "', query, '"') : filtered.map((option) => {
      const selected = isSelected(option.value);
      return /* @__PURE__ */ React12.createElement(
        Pressable,
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
        /* @__PURE__ */ React12.createElement(
          Text,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? tokens.color.brand.text : tokens.color.text.primary,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 14, color: tokens.color.brand.default } }, "\u2713")
      );
    }), /* @__PURE__ */ React12.createElement(View, { style: { height: tokens.spacing[4] } })))
  ));
}
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
  const tokens = useTokens();
  const {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps
  } = useListItem({ onPress, onLongPress, trailingActions, leadingActions, disabled });
  const { size: iconSize, color: iconColor } = useIconStyle("list");
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
  return /* @__PURE__ */ React12.createElement(View, { style: { overflow: "hidden" } }, leadingActions.length > 0 && /* @__PURE__ */ React12.createElement(
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
      Pressable,
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
      /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
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
      Pressable,
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
      /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(
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
    leading && /* @__PURE__ */ React12.createElement(View, { style: { width: 24, alignItems: "center", justifyContent: "center" } }, renderIcon(leading)),
    /* @__PURE__ */ React12.createElement(View, { style: { flex: 1 } }, /* @__PURE__ */ React12.createElement(
      Text,
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
      Text,
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
    trailing && /* @__PURE__ */ React12.createElement(View, null, renderIcon(trailing))
  )), showSeparator && /* @__PURE__ */ React12.createElement(
    View,
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
      Text,
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
  const tokens = useTokens();
  const renderFlashItem = useCallback(
    ({ item, index }) => renderItem(item, index),
    [renderItem]
  );
  const ItemSeparator = separator ? () => /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        height: 0.5,
        marginLeft: tokens.spacing[4],
        backgroundColor: tokens.color.border.default
      }
    }
  ) : void 0;
  if (isLoading) {
    return /* @__PURE__ */ React12.createElement(View, null, Array.from({ length: loadingCount }).map((_, i) => /* @__PURE__ */ React12.createElement(SkeletonItem, { key: i })));
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React12.createElement(View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.color.bg.muted } }),
    /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, gap: 6 } }, /* @__PURE__ */ React12.createElement(View, { style: { width: "60%", height: 14, borderRadius: 4, backgroundColor: tokens.color.bg.muted } }), /* @__PURE__ */ React12.createElement(View, { style: { width: "40%", height: 12, borderRadius: 4, backgroundColor: tokens.color.bg.emphasis } }))
  );
}
var OUTER = { sm: 18, md: 22, lg: 26 };
var INNER = { sm: 8, md: 10, lg: 12 };
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = useTokens();
  const outerSize = OUTER[size];
  const innerSize = INNER[size];
  const snappySpring = spring.snappy;
  const scale = useSharedValue(isSelected ? 1 : 0);
  React12.useEffect(() => {
    scale.value = withSpring(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);
  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const handlePress = () => {
    if (!isSelected) {
      scale.value = withSpring(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = withSpring(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ React12.createElement(
    Pressable,
    {
      onPress: handlePress,
      disabled,
      style: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        opacity: disabled ? 0.4 : 1
      },
      accessibilityRole: "radio",
      accessibilityState: { checked: isSelected, disabled }
    },
    /* @__PURE__ */ React12.createElement(
      View,
      {
        style: {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          borderWidth: isSelected ? 0 : 1.5,
          borderColor: isSelected ? "transparent" : tokens.color.border.default,
          backgroundColor: isSelected ? tokens.color.brand.default : "transparent",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2
        }
      },
      /* @__PURE__ */ React12.createElement(
        Animated7.View,
        {
          style: [
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              backgroundColor: "#fff"
            },
            dotStyle
          ]
        }
      )
    ),
    (label || description) && /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React12.createElement(
      Text,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ React12.createElement(
      Text,
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
  const tokens = useTokens();
  const { isSelected, getItemProps } = useRadioGroup(hookOptions);
  return /* @__PURE__ */ React12.createElement(View, null, label && /* @__PURE__ */ React12.createElement(
    Text,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ React12.createElement(
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
var TRACK_HEIGHT = 4;
var THUMB_SIZE = 22;
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
  const tokens = useTokens();
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
  return /* @__PURE__ */ React12.createElement(View, null, (label || showValue) && /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default } }, formatValue(currentValue))), /* @__PURE__ */ React12.createElement(Animated7.View, { style: [{ paddingVertical: 12 }, trackAnimatedStyle] }, /* @__PURE__ */ React12.createElement(GestureDetector, { gesture: panGesture }, /* @__PURE__ */ React12.createElement(
    View,
    {
      style: { height: THUMB_SIZE, justifyContent: "center" },
      onLayout: (e) => onTrackLayout(e.nativeEvent.layout.width)
    },
    /* @__PURE__ */ React12.createElement(
      View,
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: tokens.color.bg.muted,
          overflow: "hidden"
        }
      },
      /* @__PURE__ */ React12.createElement(
        Animated7.View,
        {
          style: [
            {
              height: TRACK_HEIGHT,
              backgroundColor: tokens.color.brand.default,
              borderRadius: TRACK_HEIGHT / 2
            },
            fillAnimatedStyle
          ]
        }
      )
    ),
    showMarks && marks.map((mark) => {
      const markPct = (mark - min) / (max - min);
      const isActive = mark <= currentValue;
      return /* @__PURE__ */ React12.createElement(
        View,
        {
          key: mark,
          style: {
            position: "absolute",
            left: `${markPct * 100}%`,
            width: 4,
            height: 4,
            borderRadius: 2,
            marginLeft: -2,
            backgroundColor: isActive ? tokens.color.brand.default : tokens.color.border.strong,
            top: (THUMB_SIZE - 4) / 2
          }
        }
      );
    }),
    /* @__PURE__ */ React12.createElement(
      Animated7.View,
      {
        style: [
          {
            position: "absolute",
            left: -11,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: tokens.color.surface.default,
            borderWidth: 2,
            borderColor: tokens.color.brand.default,
            // Shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 4,
            elevation: 3
          },
          thumbAnimatedStyle
        ]
      }
    )
  ))), showRange && /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}
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
  const tokens = useTokens();
  const dim = SIZES[size];
  const radius = shape === "circle" ? dim / 2 : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;
  const dotSize = status ? STATUS_DOT[size] : 0;
  return /* @__PURE__ */ React12.createElement(View, { style: { width: dim, height: dim }, accessible: !!accessibilityLabel, accessibilityLabel }, src ? /* @__PURE__ */ React12.createElement(
    Image,
    {
      source: { uri: src },
      style: { width: dim, height: dim, borderRadius: radius },
      accessibilityLabel
    }
  ) : initials ? /* @__PURE__ */ React12.createElement(
    View,
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
    /* @__PURE__ */ React12.createElement(
      Text,
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
    /* @__PURE__ */ React12.createElement(
      View,
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
      fallbackIcon ?? /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: FONT_SIZES[size], color: tokens.color.text.tertiary } }, "?")
    )
  ), status && /* @__PURE__ */ React12.createElement(
    View,
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
  const tokens = useTokens();
  const dim = SIZES[size];
  const gap = overlap ?? Math.round(dim * 0.3);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ React12.createElement(
      View,
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
      /* @__PURE__ */ React12.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ React12.createElement(
      View,
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
      /* @__PURE__ */ React12.createElement(
        Text,
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
  const { input } = useComponentTokens();
  const tokens = useTokens();
  const [isFocused, setIsFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
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
  return /* @__PURE__ */ React12.createElement(View, null, (label || maxLength) && /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] } }, label && /* @__PURE__ */ React12.createElement(Text, { style: input.label }, label), maxLength && /* @__PURE__ */ React12.createElement(
    Text,
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
  )), /* @__PURE__ */ React12.createElement(View, { style: containerStyle }, /* @__PURE__ */ React12.createElement(
    TextInput,
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
  )), error ? /* @__PURE__ */ React12.createElement(Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React12.createElement(Text, { style: input.helperText }, helperText) : null);
}
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const tokens = useTokens();
  const lineColor = emphasis ? tokens.color.border.strong : tokens.color.border.default;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: tokens.spacing[4],
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ React12.createElement(
      View,
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
    return /* @__PURE__ */ React12.createElement(
      View,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, height: 1, backgroundColor: lineColor } }),
      /* @__PURE__ */ React12.createElement(
        Text,
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
      /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, height: 1, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        height: 1,
        backgroundColor: lineColor,
        marginVertical: verticalMargin
      }
    }
  );
}
function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true
}) {
  const tokens = useTokens();
  const shimmer = useSharedValue(0);
  useEffect(() => {
    if (!animate) return;
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.6, 1])
    // Increased visibility
  }));
  return /* @__PURE__ */ React12.createElement(
    Animated7.View,
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(View, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ React12.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14
    }
  )));
}
function SkeletonCard() {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
    /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ React12.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React12.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ React12.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ React12.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ React12.createElement(Skeleton, { width: "40%", height: 32, borderRadius: tokens.radius.md })
  );
}
function SkeletonListItem() {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React12.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React12.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ React12.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ React12.createElement(Skeleton, { width: 24, height: 14 })
  );
}
function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false
}) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
    icon && /* @__PURE__ */ React12.createElement(
      View,
      {
        style: {
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: compact ? 24 : 36,
          backgroundColor: tokens.color.bg.muted,
          // Use darker background for icon visibility
          alignItems: "center",
          justifyContent: "center",
          marginBottom: tokens.spacing[1]
        }
      },
      icon
    ),
    !icon && /* @__PURE__ */ React12.createElement(
      View,
      {
        style: {
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: compact ? 24 : 36,
          backgroundColor: tokens.color.bg.muted,
          // Use darker background for icon visibility
          alignItems: "center",
          justifyContent: "center",
          marginBottom: tokens.spacing[1]
        }
      },
      /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: compact ? 20 : 32, color: tokens.color.text.tertiary } }, "\u25CB")
    ),
    /* @__PURE__ */ React12.createElement(
      Text,
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
    description && /* @__PURE__ */ React12.createElement(
      Text,
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
    (action || secondaryAction) && /* @__PURE__ */ React12.createElement(
      View,
      {
        style: {
          marginTop: tokens.spacing[2],
          gap: tokens.spacing[2],
          alignItems: "center",
          width: "100%"
        }
      },
      action && /* @__PURE__ */ React12.createElement(
        Button,
        {
          label: action.label,
          variant: action.variant ?? "solid",
          onPress: action.onPress,
          size: compact ? "sm" : "md",
          fullWidth: true
        }
      ),
      secondaryAction && /* @__PURE__ */ React12.createElement(
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
function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children
}) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(View, { style: { gap: tokens.spacing[1] } }, (label || labelTrailing) && /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
    label && /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ React12.createElement(
      Text,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          fontWeight: tokens.fontWeight.medium,
          color: tokens.color.text.secondary
        }
      },
      label
    ), required && /* @__PURE__ */ React12.createElement(
      Text,
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
  ), children, error ? /* @__PURE__ */ React12.createElement(
    Text,
    {
      style: {
        fontSize: tokens.fontSize.xs,
        color: tokens.color.error.text
      },
      accessibilityRole: "alert",
      accessibilityLiveRegion: "polite"
    },
    error
  ) : helperText ? /* @__PURE__ */ React12.createElement(
    Text,
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
  const tokens = useTokens();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return /* @__PURE__ */ React12.createElement(View, { style: { gap: gapSize } }, children);
}
function Pressable8({ children, style, ...hookOptions }) {
  const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable(hookOptions);
  return /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(Animated7.View, { style: [style, animatedStyle], ...accessibilityProps }, typeof children === "function" ? children({ isPressed }) : children));
}
function Box({ children, style, sx, flex }) {
  const merged = [flex !== void 0 ? { flex } : null, sx, style];
  return /* @__PURE__ */ React12.createElement(View, { style: merged }, children);
}
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
  const tokens = useTokens();
  const gap = tokens.spacing[spacing] ?? spacing;
  const items = React12.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ React12.createElement(
    View,
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
function Grid({
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
  const tokens = useTokens();
  const gap = tokens.spacing[spacing] ?? spacing;
  const rowGap = rowSpacing !== void 0 ? tokens.spacing[rowSpacing] ?? rowSpacing : gap;
  const colGap = columnSpacing !== void 0 ? tokens.spacing[columnSpacing] ?? columnSpacing : gap;
  if (container) {
    return /* @__PURE__ */ React12.createElement(
      View,
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
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: [itemStyle, style]
    },
    children
  );
}
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
  const tokens = useTokens();
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
  return /* @__PURE__ */ React12.createElement(
    Text,
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
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const tokens = useTokens();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ React12.createElement(
    Text,
    {
      onPress: async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await Linking.openURL(href);
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
function Paper({
  children,
  variant = "elevation",
  elevation = 1,
  square = false,
  style
}) {
  const tokens = useTokens();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  return /* @__PURE__ */ React12.createElement(
    View,
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
function ButtonGroup({
  children,
  variant = "outlined",
  size = "md",
  orientation = "horizontal",
  disabled = false,
  fullWidth = false
}) {
  const tokens = useTokens();
  const isRow = orientation === "horizontal";
  const items = React12.Children.toArray(children);
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        borderRadius: tokens.radius.md,
        overflow: "hidden"
      }
    },
    items.map((child, i) => {
      if (!React12.isValidElement(child)) return child;
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
      return React12.cloneElement(element, {
        variant,
        size,
        disabled: disabled || element.props?.disabled,
        fullWidth: fullWidth || element.props?.fullWidth,
        style: [style, element.props?.style].filter(Boolean)
      });
    })
  );
}
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
  const tokens = useTokens();
  const { size: iconSize } = useIconStyle("button");
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
  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress,
    disabled,
    feedbackMode: "scale",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityRole: "button"
  });
  const containerStyle = useMemo(() => {
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
    if (React12.isValidElement(el)) {
      return React12.cloneElement(el, {
        size: el.props?.size ?? iconSize,
        color: el.props?.color ?? textMap[color]
      });
    }
    return el;
  };
  return /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(Animated7.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, renderIcon(icon), variant === "extended" && label && /* @__PURE__ */ React12.createElement(Text, { style: { color: textMap[color], fontWeight: tokens.fontWeight.semibold } }, label)));
}
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
  label,
  ...rest
}) {
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  if (select) {
    return /* @__PURE__ */ React12.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ React12.createElement(
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
  return /* @__PURE__ */ React12.createElement(
    Input,
    {
      label: labelText,
      error: errorText,
      helperText: errorText ? void 0 : helperText,
      ...rest
    }
  );
}
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
  const tokens = useTokens();
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
  return /* @__PURE__ */ React12.createElement(View, null, /* @__PURE__ */ React12.createElement(
    Input,
    {
      label,
      placeholder,
      value: query,
      onChangeText: (val) => {
        setInputValue(val);
        if (!isOpen) open();
      },
      onFocus: open,
      onBlur: close,
      disabled
    }
  ), isOpen && filteredOptions.length > 0 && /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        marginTop: tokens.spacing[2],
        borderWidth: 1,
        borderColor: tokens.color.border.default,
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.surface.default,
        overflow: "hidden"
      }
    },
    filteredOptions.map((option, idx) => {
      const selected = isSelected(option);
      return /* @__PURE__ */ React12.createElement(
        Pressable,
        {
          key: `${labelOf(option)}-${idx}`,
          onPress: () => selectOption(option),
          style: {
            paddingHorizontal: tokens.spacing[3],
            paddingVertical: tokens.spacing[2],
            backgroundColor: selected ? tokens.color.brand.subtle : "transparent"
          }
        },
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.primary } }, labelOf(option))
      );
    })
  ));
}
var SIZE_MAP = { sm: 16, md: 22, lg: 28 };
function Rating({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = "md",
  icon,
  emptyIcon,
  onChange
}) {
  const tokens = useTokens();
  const { value: ratingValue, setValue } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    onChange
  });
  const display = ratingValue;
  const renderStar = (filled, idx) => {
    const fontSize = SIZE_MAP[size];
    const color = filled ? tokens.color.brand.default : tokens.color.border.default;
    if (filled && icon) return icon;
    if (!filled && emptyIcon) return emptyIcon;
    return /* @__PURE__ */ React12.createElement(Text, { style: { fontSize, color, marginHorizontal: 2 } }, "*");
  };
  const handlePress = (index) => {
    if (disabled || readOnly) return;
    const next = Math.max(0, Math.min(max, index + 1));
    const snapped = Math.round(next / precision) * precision;
    setValue(snapped);
  };
  return /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", alignItems: "center" } }, Array.from({ length: max }).map((_, i) => {
    const filled = display >= i + 1;
    return /* @__PURE__ */ React12.createElement(
      Pressable,
      {
        key: i,
        onPress: () => handlePress(i),
        disabled: disabled || readOnly,
        style: { opacity: disabled ? 0.5 : 1 }
      },
      renderStar(filled)
    );
  }));
}
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
  return /* @__PURE__ */ React12.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const tokens = useTokens();
  const ctx = useContext(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = usePressable({
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
  return /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(
    Animated7.View,
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
    /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: s.fontSize, fontWeight: tokens.fontWeight.medium, color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, children)
  ));
}
function AppBar({
  children,
  color = "primary",
  variant = "elevation",
  position = "relative",
  elevation = 2,
  style
}) {
  const tokens = useTokens();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  const bgMap = {
    default: tokens.color.surface.default,
    inherit: "transparent",
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    transparent: "transparent"
  };
  return /* @__PURE__ */ React12.createElement(
    View,
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
var TabsContext = createContext(null);
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
  return /* @__PURE__ */ React12.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ React12.createElement(
    View,
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
  const tokens = useTokens();
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress: () => ctx.getTabProps(value, disabled).onPress(),
    disabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "tab"
  });
  return /* @__PURE__ */ React12.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React12.createElement(
    Animated7.View,
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
    label && /* @__PURE__ */ React12.createElement(Text, { style: { color: selected ? tokens.color.brand.default : tokens.color.text.secondary, fontWeight: tokens.fontWeight.medium } }, label)
  ));
}
function Drawer({
  open,
  onClose,
  anchor = "left",
  variant = "temporary",
  width = Math.min(320, Dimensions.get("window").width * 0.8),
  children,
  style
}) {
  const tokens = useTokens();
  if (variant === "permanent") {
    return /* @__PURE__ */ React12.createElement(
      View,
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
  return /* @__PURE__ */ React12.createElement(Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, flexDirection: anchor === "right" ? "row-reverse" : "row" } }, /* @__PURE__ */ React12.createElement(Pressable, { style: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }, onPress: onClose }), /* @__PURE__ */ React12.createElement(
    View,
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
  )));
}
function Menu({ open, onClose, children }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React12.createElement(Pressable, { style: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }, onPress: onClose }), /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        position: "absolute",
        top: 80,
        right: 24,
        minWidth: 180,
        backgroundColor: tokens.color.surface.default,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: tokens.color.border.default,
        overflow: "hidden",
        ...tokens.shadow.md
      }
    },
    children
  ));
}
function MenuItem({ children, onPress, disabled = false, selected = false }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    Pressable,
    {
      onPress,
      disabled,
      style: {
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
        opacity: disabled ? 0.5 : 1
      }
    },
    /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.primary, fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular } }, children)
  );
}
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const tokens = useTokens();
  const items = React12.Children.toArray(children);
  return /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: tokens.spacing[4] } }, items.map((child) => {
    if (!React12.isValidElement(child)) return child;
    const element = child;
    return React12.cloneElement(element, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep, orientation }) {
  const tokens = useTokens();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  return /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: tokens.spacing[2], alignItems: "center" } }, /* @__PURE__ */ React12.createElement(
    View,
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
    /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: 12, fontWeight: tokens.fontWeight.semibold, color: isCompleted ? "#fff" : tokens.color.text.primary } }, isCompleted ? "v" : index + 1)
  ), label && /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, label), children);
}
function StepLabel({ children, style }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(Text, { style: [{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }, style] }, children);
}
function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md"
}) {
  const tokens = useTokens();
  const { page: current, setPage, items } = usePagination({ count, page, defaultPage, onChange });
  const sizeMap2 = {
    sm: { height: 28, minWidth: 28, fontSize: tokens.fontSize.sm },
    md: { height: 34, minWidth: 34, fontSize: tokens.fontSize.md },
    lg: { height: 40, minWidth: 40, fontSize: tokens.fontSize.lg }
  };
  const s = sizeMap2[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ React12.createElement(Text, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    return /* @__PURE__ */ React12.createElement(
      Pressable,
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
      /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: s.fontSize, color: selected ? tokens.color.brand.default : tokens.color.text.primary } }, item)
    );
  };
  return /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", alignItems: "center", gap: 6 } }, items.map(renderItem));
}
var BottomNavContext = createContext(null);
function BottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  children
}) {
  const [internalValue, setInternalValue] = React12.useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (next) => {
    if (controlledValue === void 0) setInternalValue(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ React12.createElement(BottomNavContext.Provider, { value: { value, setValue, showLabels } }, /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 } }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const tokens = useTokens();
  const ctx = useContext(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.value === value;
  return /* @__PURE__ */ React12.createElement(Pressable, { onPress: () => ctx.setValue(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.xs, color: selected ? tokens.color.brand.default : tokens.color.text.secondary } }, label));
}
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const tokens = useTokens();
  const items = React12.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ React12.createElement(Text, { key: "ellipsis", style: { color: tokens.color.text.tertiary } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } }, displayItems.map((child, idx) => /* @__PURE__ */ React12.createElement(React12.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ React12.createElement(Text, { style: { marginHorizontal: 6, color: tokens.color.text.tertiary } }, separator))));
}
var SpeedDialContext = createContext(null);
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
  const tokens = useTokens();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  return /* @__PURE__ */ React12.createElement(SpeedDialContext.Provider, { value: { isOpen: disclosure.isOpen, close: disclosure.close } }, /* @__PURE__ */ React12.createElement(View, { style: stackStyle }, disclosure.isOpen && children, /* @__PURE__ */ React12.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const tokens = useTokens();
  const ctx = useContext(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ React12.createElement(
    Pressable,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: { alignItems: "center", gap: 4 }
    },
    /* @__PURE__ */ React12.createElement(
      View,
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
    tooltipTitle && /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, tooltipTitle)
  );
}
function Chip({
  label,
  variant = "filled",
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
  const tokens = useTokens();
  const { size: iconSize, color: iconColor } = useIconStyle("list");
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
  const container = {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing[1],
    paddingHorizontal: size === "sm" ? tokens.spacing[2] : tokens.spacing[3],
    height: size === "sm" ? 28 : 34,
    borderRadius: 999,
    backgroundColor: variant === "filled" ? colors.bg : "transparent",
    borderWidth: variant === "outlined" ? 1 : 0,
    borderColor: colors.border,
    opacity: disabled ? tokens.opacity[60] : 1
  };
  const renderIcon = (node) => {
    if (!node) return null;
    if (React12.isValidElement(node)) {
      return React12.cloneElement(node, {
        size: node.props?.size ?? iconSize,
        color: node.props?.color ?? iconColor
      });
    }
    return node;
  };
  const content = /* @__PURE__ */ React12.createElement(View, { style: container }, avatar, renderIcon(icon), /* @__PURE__ */ React12.createElement(Text, { style: { color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium } }, label), onDelete && /* @__PURE__ */ React12.createElement(Pressable, { onPress: onDelete, hitSlop: 8 }, deleteIcon ?? /* @__PURE__ */ React12.createElement(Text, { style: { color: colors.text, fontSize: 12 } }, "x")));
  if (onClick || clickable) {
    return /* @__PURE__ */ React12.createElement(Pressable, { onPress: onClick, disabled }, content);
  }
  return content;
}
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const tokens = useTokens();
  const [internalOpen, setInternalOpen] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const childRef = useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const handleClose = () => {
    onClose?.();
    setInternalOpen(false);
  };
  const handleLayout = (event) => {
    const layout = event.nativeEvent.layout;
    setTriggerPosition({
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height
    });
  };
  const childWithLayout = React12.cloneElement(children, {
    ref: childRef,
    onLayout: handleLayout
  });
  const tooltipWidth = 200;
  const tooltipHeight = 50;
  const padding = 8;
  let tooltipTop = placement === "top" ? triggerPosition.y - tooltipHeight - padding : triggerPosition.y + triggerPosition.height + padding;
  if (tooltipTop < 10) tooltipTop = triggerPosition.y + triggerPosition.height + padding;
  if (tooltipTop + tooltipHeight > windowHeight - 10) tooltipTop = triggerPosition.y - tooltipHeight - padding;
  const tooltipLeft = Math.max(
    padding,
    Math.min(
      triggerPosition.x + triggerPosition.width / 2 - tooltipWidth / 2,
      windowWidth - tooltipWidth - padding
    )
  );
  return /* @__PURE__ */ React12.createElement(React12.Fragment, null, childWithLayout, /* @__PURE__ */ React12.createElement(
    Modal,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ React12.createElement(
      Pressable,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ React12.createElement(
        View,
        {
          style: {
            position: "absolute",
            top: tooltipTop,
            left: tooltipLeft,
            width: tooltipWidth,
            backgroundColor: tokens.color.bg.inverse,
            paddingHorizontal: tokens.spacing[4],
            paddingVertical: tokens.spacing[3],
            borderRadius: tokens.radius.md,
            ...tokens.shadow.lg
          }
        },
        typeof title === "string" ? /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.inverse, textAlign: "center", fontSize: tokens.fontSize.sm } }, title) : title
      )
    )
  ));
}
var SIZE_MAP2 = { small: 16, medium: 20, large: 24 };
function Icon({ children, color, size, fontSize = "medium" }) {
  const tokens = useTokens();
  let resolvedSize;
  if (typeof size === "number") {
    resolvedSize = size;
  } else if (size && size !== "inherit") {
    resolvedSize = SIZE_MAP2[size] || SIZE_MAP2[fontSize];
  } else {
    resolvedSize = SIZE_MAP2[fontSize];
  }
  if (React12.isValidElement(children)) {
    return React12.cloneElement(children, {
      size: resolvedSize || 20,
      color: color ?? tokens.color.text.primary
    });
  }
  return /* @__PURE__ */ React12.createElement(View, { style: { alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: color ?? tokens.color.text.primary, fontSize: resolvedSize } }, children));
}
function SvgIcon({ children, color, fontSize = "medium" }) {
  const tokens = useTokens();
  const size = fontSize === "inherit" ? void 0 : SIZE_MAP2[fontSize];
  if (!React12.isValidElement(children)) return null;
  return React12.cloneElement(children, {
    color: children.props?.color ?? color ?? tokens.color.text.primary,
    size: children.props?.size ?? size
  });
}
function Alert({
  severity = "info",
  variant = "standard",
  icon,
  action,
  onClose,
  children
}) {
  const tokens = useTokens();
  const colors = tokens.color[severity];
  const bg = variant === "filled" ? colors.icon : colors.bg;
  const border = variant === "outlined" ? colors.border : "transparent";
  const textColor = variant === "filled" ? "#fff" : colors.text;
  return /* @__PURE__ */ React12.createElement(
    View,
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
    icon !== false && /* @__PURE__ */ React12.createElement(Text, { style: { color: textColor, fontWeight: tokens.fontWeight.semibold } }, "i"),
    /* @__PURE__ */ React12.createElement(View, { style: { flex: 1 } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: textColor } }, children)),
    action,
    onClose && /* @__PURE__ */ React12.createElement(Pressable, { onPress: onClose, hitSlop: 8 }, /* @__PURE__ */ React12.createElement(Text, { style: { color: textColor } }, "x"))
  );
}
function AlertTitle({ children }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(Text, { style: { fontWeight: tokens.fontWeight.semibold, marginBottom: tokens.spacing[1] } }, children);
}
function Dialog({ open, onClose, fullWidth = false, fullScreen = false, maxWidth = 400, children }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 } }, /* @__PURE__ */ React12.createElement(
    Pressable,
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
  ), /* @__PURE__ */ React12.createElement(
    View,
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    Text,
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(View, { style: { marginBottom: tokens.spacing[4] } }, React12.Children.map(
    children,
    (child) => typeof child === "string" ? /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.primary, lineHeight: tokens.fontSize.md * 1.5 } }, child) : child
  ));
}
function DialogActions({ children }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const tokens = useTokens();
  useEffect(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  if (!open) return null;
  const posStyle = {
    top: anchorOrigin.vertical === "top" ? 24 : void 0,
    bottom: anchorOrigin.vertical === "bottom" ? 24 : void 0,
    left: anchorOrigin.horizontal === "left" ? 24 : anchorOrigin.horizontal === "center" ? 0 : void 0,
    right: anchorOrigin.horizontal === "right" ? 24 : void 0,
    alignSelf: anchorOrigin.horizontal === "center" ? "center" : void 0
  };
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        position: "absolute",
        ...posStyle,
        backgroundColor: tokens.color.bg.inverse,
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        borderRadius: tokens.radius.md,
        flexDirection: "row",
        alignItems: "center",
        gap: tokens.spacing[3],
        ...tokens.shadow.md
      }
    },
    /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.inverse, flex: 1 } }, message),
    action,
    onClose && /* @__PURE__ */ React12.createElement(Pressable, { onPress: onClose, hitSlop: 8 }, /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.inverse } }, "x"))
  );
}
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
  const tokens = useTokens();
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
  return /* @__PURE__ */ React12.createElement(View, { style: [styles3.container, style] }, /* @__PURE__ */ React12.createElement(
    ActivityIndicator,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ React12.createElement(View, { style: StyleSheet.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ React12.createElement(View, { style: styles3.labelContainer }, /* @__PURE__ */ React12.createElement(Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
}
var styles3 = StyleSheet.create({
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
  const tokens = useTokens();
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
    styles4.container,
    { height: thickness, backgroundColor: trackColor ?? tokens.color.bg.muted },
    style
  ];
  const determinateStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ React12.createElement(View, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      style: [
        styles4.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ React12.createElement(React12.Fragment, null, variant === "buffer" && /* @__PURE__ */ React12.createElement(View, { style: [styles4.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? "rgba(0,0,0,0.1)" }] }), /* @__PURE__ */ React12.createElement(
    Animated7.View,
    {
      style: [
        styles4.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles4 = StyleSheet.create({
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
var TableContext = createContext(null);
function useTableContext() {
  return useContext(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = { size, padding, stickyHeader };
  return /* @__PURE__ */ React12.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ React12.createElement(View, { style }, children));
}
function TableContainer({ children, style }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    ScrollView,
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
    /* @__PURE__ */ React12.createElement(View, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(View, { style: { backgroundColor: tokens.color.bg.muted } }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ React12.createElement(View, null, children);
}
function TableFooter({ children }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(View, { style: { borderTopWidth: 1, borderTopColor: tokens.color.border.default } }, children);
}
function TableRow({ children, selected = false, style }) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
  const tokens = useTokens();
  const ctx = useTableContext();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const basePadding = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const verticalPadding = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ React12.createElement(View, { style: [{ paddingHorizontal: basePadding, paddingVertical: verticalPadding, flexShrink: 0 }, style] }, /* @__PURE__ */ React12.createElement(
    Text,
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
  const tokens = useTokens();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ React12.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1))
      },
      "Prev"
    ), /* @__PURE__ */ React12.createElement(
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
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(Pressable, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.xs } }, active ? direction === "asc" ? "^" : "v" : "-"));
}
var ImageListContext = createContext(null);
function useImageListContext() {
  return useContext(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = useState(0);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = useMemo(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ React12.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ React12.createElement(View, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
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
  return /* @__PURE__ */ React12.createElement(View, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(
    View,
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
    /* @__PURE__ */ React12.createElement(View, { style: { flex: 1 } }, title ? /* @__PURE__ */ React12.createElement(Text, { style: { color: "#FFFFFF", fontWeight: tokens.fontWeight.semibold } }, title) : null, subtitle ? /* @__PURE__ */ React12.createElement(Text, { style: { color: "#FFFFFF", fontSize: tokens.fontSize.xs } }, subtitle) : null),
    actionIcon
  );
}
var TimelineContext = createContext(null);
function useTimelineContext() {
  return useContext(TimelineContext);
}
function Timeline({ position = "right", children }) {
  return /* @__PURE__ */ React12.createElement(TimelineContext.Provider, { value: { position } }, /* @__PURE__ */ React12.createElement(View, { style: { gap: 16 } }, React12.Children.map(children, (child, index) => {
    if (!React12.isValidElement(child)) return child;
    const element = child;
    if (position === "alternate" || position === "alternate-reverse") {
      const isEven = index % 2 === 0;
      const derived = position === "alternate" ? isEven ? "right" : "left" : isEven ? "left" : "right";
      return React12.cloneElement(element, { position: element.props?.position ?? derived });
    }
    return element;
  })));
}
function TimelineItem({ position, children }) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");
  return /* @__PURE__ */ React12.createElement(View, { style: { flexDirection: "row", alignItems: "flex-start" } }, resolved === "left" && /* @__PURE__ */ React12.createElement(TimelineContent, { align: "right" }, extractOpposite(children)), /* @__PURE__ */ React12.createElement(TimelineSeparator, null, extractSeparator(children)), resolved === "right" && /* @__PURE__ */ React12.createElement(TimelineContent, { align: "left" }, extractOpposite(children)), /* @__PURE__ */ React12.createElement(TimelineContent, { align: resolved === "left" ? "left" : "right" }, extractContent(children)));
}
function extractChildrenByType(children, type) {
  const items = [];
  React12.Children.forEach(children, (child) => {
    if (React12.isValidElement(child) && child.type === type) {
      const element = child;
      items.push(element.props.children);
    }
  });
  return items.length ? items : null;
}
function extractSeparator(children) {
  return extractChildrenByType(children, TimelineSeparator) ?? null;
}
function extractContent(children) {
  const result = extractChildrenByType(children, TimelineContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React12.createElement(Text, null, result[0]);
  }
  return result ?? null;
}
function extractOpposite(children) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React12.createElement(Text, null, result[0]);
  }
  return result ?? null;
}
function TimelineSeparator({ children }) {
  return /* @__PURE__ */ React12.createElement(View, { style: { alignItems: "center", width: 40 } }, children);
}
function TimelineDot({ variant = "filled", color = "primary" }) {
  const tokens = useTokens();
  const fill = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color];
  return /* @__PURE__ */ React12.createElement(
    View,
    {
      style: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: variant === "filled" ? fill : "transparent",
        borderWidth: 2,
        borderColor: fill
      }
    }
  );
}
function TimelineConnector() {
  const tokens = useTokens();
  return /* @__PURE__ */ React12.createElement(View, { style: { width: 2, flex: 1, backgroundColor: tokens.color.border.default, marginVertical: 4 } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ React12.createElement(View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ React12.createElement(Text, null, children) : children);
}
function Modal6({
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
  const tokens = useTokens();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ React12.createElement(
    Modal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ React12.createElement(View, { style: styles5.container }, !hideBackdrop && (BackdropComponent ? /* @__PURE__ */ React12.createElement(BackdropComponent, { ...BackdropProps }) : /* @__PURE__ */ React12.createElement(
      Pressable,
      {
        style: [StyleSheet.absoluteFill, { backgroundColor: tokens.color.bg.overlay }],
        onPress: onClose
      }
    )), /* @__PURE__ */ React12.createElement(View, { style: [styles5.content, { backgroundColor: tokens.color.surface.overlay }, contentStyle] }, children))
  );
}
var styles5 = StyleSheet.create({
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
  const tokens = useTokens();
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
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
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const position = useMemo(() => {
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
  return /* @__PURE__ */ React12.createElement(Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React12.createElement(Pressable, { style: styles6.backdrop, onPress: onClose }), /* @__PURE__ */ React12.createElement(
    View,
    {
      onLayout: handleLayout,
      style: [
        styles6.paper,
        {
          backgroundColor: tokens.color.surface.overlay,
          borderColor: tokens.color.border.default,
          shadowColor: tokens.color.text.primary
        },
        position,
        PaperProps?.style
      ]
    },
    children
  ));
}
var styles6 = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject
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
  const tokens = useTokens();
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const position = useMemo(() => {
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
  return /* @__PURE__ */ React12.createElement(Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React12.createElement(Pressable, { style: styles7.backdrop, onPress: onClose }), /* @__PURE__ */ React12.createElement(
    View,
    {
      onLayout: handleLayout,
      style: [
        styles7.popper,
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
var styles7 = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject
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
var FormControlContext = createContext(null);
function useFormControl() {
  return useContext(FormControlContext);
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
  const tokens = useTokens();
  const marginSize = margin === "dense" ? tokens.spacing[2] : margin === "normal" ? tokens.spacing[4] : 0;
  return /* @__PURE__ */ React12.createElement(FormControlContext.Provider, { value: { error, required, disabled, focused, fullWidth, variant } }, /* @__PURE__ */ React12.createElement(View, { style: [{ alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const tokens = useTokens();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.secondary;
  return /* @__PURE__ */ React12.createElement(Text, { style: [{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const tokens = useTokens();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.tertiary;
  return /* @__PURE__ */ React12.createElement(Text, { style: [{ fontSize: tokens.fontSize.xs, color, marginTop: tokens.spacing[1] }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const tokens = useTokens();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = React12.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ React12.createElement(
    Pressable,
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
    label ? /* @__PURE__ */ React12.createElement(Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, label) : null
  );
}

export { Alert, AlertTitle, AppBar, Autocomplete, Avatar, AvatarGroup, Badge, BottomNavigation, BottomNavigationAction, BottomSheet, Box, Breadcrumbs, Button, ButtonGroup, Card, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, EmptyState, Fab, FormControl, FormControlLabel, FormField, FormGroup, FormHelperText, FormLabel, Grid, Icon, ImageList, ImageListItem, ImageListItemBar, Input, LinearProgress, Link, List, ListItem, Menu, MenuItem, Modal6 as Modal, Pagination, Paper, PasswordInput, Popover, Popper, Pressable8 as Pressable, RadioGroup, RadioItem, Rating, SectionHeader, Select, Skeleton, SkeletonCard, SkeletonListItem, SkeletonText, Slider, Snackbar, SpeedDial, SpeedDialAction, Stack, Step, StepLabel, Stepper, SvgIcon, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, TextArea, TextField, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, ToastContainer, ToastItem, ToggleButton, ToggleButtonGroup, Toolbar, Tooltip, Typography, useFormControl };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map