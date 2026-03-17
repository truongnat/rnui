'use strict';

var headless = require('@rnui/headless');
var React11 = require('react');
var Animated7 = require('react-native-reanimated');
var reactNativeGestureHandler = require('react-native-gesture-handler');
var reactNative = require('react-native');
var reactNativeSafeAreaContext = require('react-native-safe-area-context');
var tokens = require('@rnui/tokens');
var flashList = require('@shopify/flash-list');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React11__default = /*#__PURE__*/_interopDefault(React11);
var Animated7__default = /*#__PURE__*/_interopDefault(Animated7);

// src/index.ts
function Button({
  variant = "solid",
  size = "md",
  label,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  feedbackMode = "scale",
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint
}) {
  const { button } = headless.useComponentTokens();
  const isDisabled = disabled || loading;
  const { animatedStyle, gesture, accessibilityProps } = headless.usePressable({
    onPress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityHint,
    accessibilityRole: "button",
    haptic: true
  });
  const containerStyle = React11.useMemo(() => [
    button.variant[variant].container,
    button.size[size].container,
    fullWidth && { alignSelf: "stretch" },
    isDisabled && button.disabled.container
  ], [button, variant, size, fullWidth, isDisabled]);
  const textStyle = React11.useMemo(() => [
    button.variant[variant].text,
    button.size[size].text
  ], [button, variant, size]);
  return /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture }, /* @__PURE__ */ React11__default.default.createElement(
    Animated7__default.default.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: button.variant[variant].container.gap,
      opacity: loading ? 0 : 1
    } }, leadingIcon, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: textStyle }, label), trailingIcon),
    loading && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: [reactNative.StyleSheet.absoluteFill, { alignItems: "center", justifyContent: "center" }] }, /* @__PURE__ */ React11__default.default.createElement(
      reactNative.ActivityIndicator,
      {
        size: "small",
        color: String(button.variant[variant].text.color)
      }
    ))
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
  const { input } = headless.useComponentTokens();
  headless.useTokens();
  const [isFocused, setIsFocused] = React11.useState(false);
  const containerStyle = React11.useMemo(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ], [input, size, isFocused, error, disabled]);
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, label && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: input.label }, label), /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: containerStyle }, leadingElement, /* @__PURE__ */ React11__default.default.createElement(
    reactNative.TextInput,
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
  ), trailingElement), error ? /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: input.helperText }, helperText) : null);
}
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = headless.useComponentTokens();
  const containerStyle = React11.useMemo(() => [
    card.container,
    padding !== "none" && { padding: card.padding[padding] },
    style
  ], [card, padding, style]);
  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = headless.usePressable({
      onPress,
      feedbackMode: "scaleSubtle",
      accessibilityLabel,
      accessibilityRole: "button"
    });
    return /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture }, /* @__PURE__ */ React11__default.default.createElement(Animated7__default.default.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: containerStyle }, children);
}
function Badge({ label, variant = "default" }) {
  const { badge } = headless.useComponentTokens();
  const containerStyle = React11.useMemo(() => [
    badge.base,
    { backgroundColor: badge.variant[variant].bg }
  ], [badge, variant]);
  const textStyle = React11.useMemo(() => [
    badge.text,
    { color: badge.variant[variant].text }
  ], [badge, variant]);
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: containerStyle }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: textStyle }, label));
}
function VariantIcon({ variant, color }) {
  if (variant === "success") {
    return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: 18, height: 18, borderRadius: 9, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { color: "#fff", fontSize: 11, fontWeight: "700", marginTop: -1 } }, "\u2713"));
  }
  if (variant === "error") {
    return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: 18, height: 18, borderRadius: 9, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { color: "#fff", fontSize: 12, fontWeight: "700", marginTop: -1 } }, "\u2715"));
  }
  if (variant === "warning") {
    return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: 18, height: 18, borderRadius: 9, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { color: "#fff", fontSize: 12, fontWeight: "800" } }, "!"));
  }
  if (variant === "info") {
    return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: 18, height: 18, borderRadius: 9, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { color: "#fff", fontSize: 12, fontWeight: "700" } }, "i"));
  }
  return null;
}
function ToastItem({ item, position, onDismiss }) {
  const { toast } = headless.useComponentTokens();
  const tokens = headless.useTokens();
  const progress = Animated7.useSharedValue(1);
  React11.useEffect(() => {
    if (item.persistent) return;
    progress.value = Animated7.withTiming(0, { duration: item.duration }, (finished) => {
      if (finished) Animated7.runOnJS(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = Animated7.useAnimatedStyle(() => ({
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
  const entering = position === "top" ? Animated7.FadeInDown.springify().damping(18).stiffness(280) : Animated7.FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? Animated7.FadeOutUp.duration(200) : Animated7.FadeOutDown.duration(200);
  return /* @__PURE__ */ React11__default.default.createElement(
    Animated7__default.default.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.variant !== "default" && /* @__PURE__ */ React11__default.default.createElement(VariantIcon, { variant: item.variant, color: v.iconColor }),
    /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Pressable,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 13, fontWeight: "600", color: tokens.color.brand.default } }, item.action.label)
    ),
    /* @__PURE__ */ React11__default.default.createElement(reactNative.Pressable, { onPress: () => onDismiss(item.id), hitSlop: 8 }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 16, color: tokens.color.text.tertiary, lineHeight: 18 } }, "\u2715")),
    !item.persistent && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ React11__default.default.createElement(Animated7__default.default.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = headless.useToast();
  const insets = reactNativeSafeAreaContext.useSafeAreaInsets();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: [styles.container, positionStyle], pointerEvents: "box-none" }, toasts.map((item) => /* @__PURE__ */ React11__default.default.createElement(
    ToastItem,
    {
      key: item.id,
      item,
      position,
      onDismiss: headless.dismissToast
    }
  )));
}
var styles = reactNative.StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999
  }
});
var SCREEN_HEIGHT = reactNative.Dimensions.get("window").height;
var BottomSheet = React11.forwardRef(
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
    const tokens = headless.useTokens();
    const insets = reactNativeSafeAreaContext.useSafeAreaInsets();
    const [mounted, setMounted] = React11.useState(false);
    const handleClose = React11__default.default.useCallback(() => {
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
    } = headless.useBottomSheet({
      snapPoints,
      initialSnapIndex,
      onClose: handleClose,
      onSnapChange,
      enableDismissOnSwipe,
      enableBackdrop
    });
    const open = React11__default.default.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    React11.useImperativeHandle(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ React11__default.default.createElement(reactNative.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: reactNative.StyleSheet.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture: backdropTapGesture }, /* @__PURE__ */ React11__default.default.createElement(
      Animated7__default.default.View,
      {
        style: [
          reactNative.StyleSheet.absoluteFill,
          { backgroundColor: "#000" },
          backdropAnimatedStyle
        ]
      }
    )), /* @__PURE__ */ React11__default.default.createElement(
      Animated7__default.default.View,
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
      /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: styles2.handleArea }, showHandle && /* @__PURE__ */ React11__default.default.createElement(
        reactNative.View,
        {
          style: [
            styles2.handle,
            { backgroundColor: tokens.color.border.strong }
          ]
        }
      ))),
      /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1 } }, children)
    )));
  }
);
var styles2 = reactNative.StyleSheet.create({
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
  const tokens$1 = headless.useTokens();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = headless.useCheckbox(hookOptions);
  const boxSize = SIZE[size];
  const iconSize = ICON_SIZE[size];
  const scale = Animated7.useSharedValue(1);
  const fillProgress = Animated7.useSharedValue(isChecked || isIndeterminate ? 1 : 0);
  React11__default.default.useEffect(() => {
    fillProgress.value = Animated7.withSpring(isChecked || isIndeterminate ? 1 : 0, tokens.spring.snappy);
  }, [isChecked, isIndeterminate]);
  const boxStyle = Animated7.useAnimatedStyle(() => ({
    backgroundColor: Animated7.interpolate(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5 ? tokens$1.color.brand.default : "transparent",
    borderColor: fillProgress.value > 0.5 ? tokens$1.color.brand.default : tokens$1.color.border.default,
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = Animated7.useAnimatedStyle(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    scale.value = Animated7.withSpring(0.88, tokens.spring.snappy, () => {
      scale.value = Animated7.withSpring(1, tokens.spring.snappy);
    });
    toggle();
  };
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Pressable,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? 0.4 : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React11__default.default.createElement(
      Animated7__default.default.View,
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
      /* @__PURE__ */ React11__default.default.createElement(Animated7__default.default.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: iconSize, height: 2, backgroundColor: "#fff", borderRadius: 1 } }) : /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { color: "#fff", fontSize: iconSize, fontWeight: "700", lineHeight: iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens$1.fontSize.md, color: tokens$1.color.text.primary, fontWeight: tokens$1.fontWeight.medium } }, label), description && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens$1.fontSize.sm, color: tokens$1.color.text.secondary, marginTop: 2 } }, description))
  );
}
var TRACK = {
  sm: { width: 36, height: 20, radius: 10, thumbSize: 16, thumbOffset: 2 },
  md: { width: 46, height: 26, radius: 13, thumbSize: 22, thumbOffset: 2 },
  lg: { width: 56, height: 30, radius: 15, thumbSize: 26, thumbOffset: 2 }
};
function Switch({ label, description, size = "md", ...hookOptions }) {
  const tokens$1 = headless.useTokens();
  const { isOn, isDisabled, toggle, accessibilityProps } = headless.useSwitch(hookOptions);
  const t = TRACK[size];
  const thumbTravel = t.width - t.thumbSize - t.thumbOffset * 2;
  const progress = Animated7.useSharedValue(isOn ? 1 : 0);
  React11__default.default.useEffect(() => {
    progress.value = Animated7.withSpring(isOn ? 1 : 0, tokens.spring.snappy);
  }, [isOn]);
  const trackStyle = Animated7.useAnimatedStyle(() => ({
    backgroundColor: Animated7.interpolateColor(
      progress.value,
      [0, 1],
      [tokens$1.color.border.default, tokens$1.color.brand.default]
    )
  }));
  const thumbStyle = Animated7.useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Pressable,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? 0.4 : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React11__default.default.createElement(
      Animated7__default.default.View,
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
      /* @__PURE__ */ React11__default.default.createElement(
        Animated7__default.default.View,
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
    (label || description) && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1 } }, label && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens$1.fontSize.md, color: tokens$1.color.text.primary, fontWeight: tokens$1.fontWeight.medium } }, label), description && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens$1.fontSize.sm, color: tokens$1.color.text.secondary, marginTop: 2 } }, description))
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
  const tokens = headless.useTokens();
  const sheetRef = React11.useRef(null);
  const [query, setQuery] = React11.useState("");
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel,
    triggerProps
  } = headless.useSelect({ options, ...hookOptions, placeholder });
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
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, label && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Pressable,
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
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
    /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 12, color: tokens.color.text.tertiary, marginLeft: 8 } }, isOpen ? "\u25B2" : "\u25BC")
  ), error && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ React11__default.default.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, paddingHorizontal: tokens.spacing[4] } }, searchable && isOpen && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing[3],
          height: 40,
          marginBottom: tokens.spacing[3],
          backgroundColor: tokens.color.bg.subtle
        }
      },
      /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 14, color: tokens.color.text.tertiary, marginRight: 6 } }, "\u2315"),
      /* @__PURE__ */ React11__default.default.createElement(
        reactNative.TextInput,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search\u2026",
          placeholderTextColor: tokens.color.text.tertiary,
          style: { flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary },
          autoFocus: true
        }
      ),
      query.length > 0 && /* @__PURE__ */ React11__default.default.createElement(reactNative.Pressable, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 14, color: tokens.color.text.tertiary } }, "\u2715"))
    ), /* @__PURE__ */ React11__default.default.createElement(reactNative.ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled" }, filtered.length === 0 ? /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] } }, 'No results for "', query, '"') : filtered.map((option) => {
      const selected = isSelected(option.value);
      return /* @__PURE__ */ React11__default.default.createElement(
        reactNative.Pressable,
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
        /* @__PURE__ */ React11__default.default.createElement(
          reactNative.Text,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? tokens.color.brand.text : tokens.color.text.primary,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 14, color: tokens.color.brand.default } }, "\u2713")
      );
    }), /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { height: tokens.spacing[4] } })))
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
  const tokens = headless.useTokens();
  const {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps
  } = headless.useListItem({ onPress, onLongPress, trailingActions, leadingActions, disabled });
  trailingActions.length > 0 || leadingActions.length > 0;
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { overflow: "hidden" } }, leadingActions.length > 0 && /* @__PURE__ */ React11__default.default.createElement(
    Animated7__default.default.View,
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
    leadingActions.map((action, i) => /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Pressable,
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
      /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), trailingActions.length > 0 && /* @__PURE__ */ React11__default.default.createElement(
    Animated7__default.default.View,
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
    trailingActions.map((action, i) => /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Pressable,
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
      /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture }, /* @__PURE__ */ React11__default.default.createElement(
    Animated7__default.default.View,
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
    leading && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, leading),
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1 } }, /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        },
        numberOfLines: 1
      },
      title
    ), subtitle && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
    trailing && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, trailing)
  )), showSeparator && /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        height: 0.5,
        marginLeft: leading ? tokens.spacing[4] + 40 + tokens.spacing[3] : tokens.spacing[4],
        backgroundColor: tokens.color.border.default
      }
    }
  ));
}
function SectionHeader({ title, trailing }) {
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
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
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
  const tokens = headless.useTokens();
  const renderFlashItem = React11.useCallback(
    ({ item, index }) => renderItem(item, index),
    [renderItem]
  );
  const ItemSeparator = separator ? () => /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        height: 0.5,
        marginLeft: tokens.spacing[4],
        backgroundColor: tokens.color.border.default
      }
    }
  ) : void 0;
  if (isLoading) {
    return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, Array.from({ length: loadingCount }).map((_, i) => /* @__PURE__ */ React11__default.default.createElement(SkeletonItem, { key: i })));
  }
  if (data.length === 0 && emptyComponent) {
    return emptyComponent;
  }
  const FlashListAny = flashList.FlashList;
  return /* @__PURE__ */ React11__default.default.createElement(
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
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.color.bg.muted } }),
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, gap: 6 } }, /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: "60%", height: 14, borderRadius: 4, backgroundColor: tokens.color.bg.muted } }), /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: "40%", height: 12, borderRadius: 4, backgroundColor: tokens.color.bg.emphasis } }))
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
  const tokens$1 = headless.useTokens();
  const outerSize = OUTER[size];
  const innerSize = INNER[size];
  const snappySpring = tokens.spring.snappy;
  const scale = Animated7.useSharedValue(isSelected ? 1 : 0);
  React11__default.default.useEffect(() => {
    scale.value = Animated7.withSpring(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);
  const dotStyle = Animated7.useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const handlePress = () => {
    if (!isSelected) {
      scale.value = Animated7.withSpring(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = Animated7.withSpring(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Pressable,
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
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
      {
        style: {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          borderWidth: isSelected ? 0 : 1.5,
          borderColor: isSelected ? "transparent" : tokens$1.color.border.default,
          backgroundColor: isSelected ? tokens$1.color.brand.default : "transparent",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2
        }
      },
      /* @__PURE__ */ React11__default.default.createElement(
        Animated7__default.default.View,
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
    (label || description) && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
      {
        style: {
          fontSize: tokens$1.fontSize.md,
          color: tokens$1.color.text.primary,
          fontWeight: tokens$1.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
      {
        style: {
          fontSize: tokens$1.fontSize.sm,
          color: tokens$1.color.text.secondary,
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
  const tokens = headless.useTokens();
  const { isSelected, getItemProps } = headless.useRadioGroup(hookOptions);
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, label && /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Text,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ React11__default.default.createElement(
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
  const tokens = headless.useTokens();
  const {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage
  } = headless.useSlider({ min, max, step, ...hookOptions });
  const marks = showMarks && step > 0 ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min) : [];
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, (label || showValue) && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default } }, formatValue(currentValue))), /* @__PURE__ */ React11__default.default.createElement(Animated7__default.default.View, { style: [{ paddingVertical: 12 }, trackAnimatedStyle] }, /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: { height: THUMB_SIZE, justifyContent: "center" },
      onLayout: (e) => onTrackLayout(e.nativeEvent.layout.width)
    },
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
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
      /* @__PURE__ */ React11__default.default.createElement(
        Animated7__default.default.View,
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
      return /* @__PURE__ */ React11__default.default.createElement(
        reactNative.View,
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
    /* @__PURE__ */ React11__default.default.createElement(
      Animated7__default.default.View,
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
  ))), showRange && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
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
  const tokens = headless.useTokens();
  const dim = SIZES[size];
  const radius = shape === "circle" ? dim / 2 : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;
  const dotSize = status ? STATUS_DOT[size] : 0;
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { width: dim, height: dim }, accessible: !!accessibilityLabel, accessibilityLabel }, src ? /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Image,
    {
      source: { uri: src },
      style: { width: dim, height: dim, borderRadius: radius },
      accessibilityLabel
    }
  ) : initials ? /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
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
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
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
      fallbackIcon ?? /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: FONT_SIZES[size], color: tokens.color.text.tertiary } }, "?")
    )
  ), status && /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
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
  const tokens = headless.useTokens();
  const dim = SIZES[size];
  const gap = overlap ?? Math.round(dim * 0.3);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
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
      /* @__PURE__ */ React11__default.default.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
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
      /* @__PURE__ */ React11__default.default.createElement(
        reactNative.Text,
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
  const { input } = headless.useComponentTokens();
  const tokens = headless.useTokens();
  const [isFocused, setIsFocused] = React11.useState(false);
  const [contentHeight, setContentHeight] = React11.useState(0);
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
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, null, (label || maxLength) && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] } }, label && /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: input.label }, label), maxLength && /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Text,
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
  )), /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: containerStyle }, /* @__PURE__ */ React11__default.default.createElement(
    reactNative.TextInput,
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
  )), error ? /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: input.helperText }, helperText) : null);
}
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const tokens = headless.useTokens();
  const lineColor = emphasis ? tokens.color.border.strong : tokens.color.border.default;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: tokens.spacing[4],
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
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
    return /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, height: 1, backgroundColor: lineColor } }),
      /* @__PURE__ */ React11__default.default.createElement(
        reactNative.Text,
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
      /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, height: 1, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
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
  const tokens = headless.useTokens();
  const shimmer = Animated7.useSharedValue(0);
  React11.useEffect(() => {
    if (!animate) return;
    shimmer.value = Animated7.withRepeat(
      Animated7.withTiming(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);
  const animatedStyle = Animated7.useAnimatedStyle(() => ({
    opacity: Animated7.interpolate(shimmer.value, [0, 1], [0.4, 0.9])
  }));
  return /* @__PURE__ */ React11__default.default.createElement(
    Animated7__default.default.View,
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
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ React11__default.default.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14
    }
  )));
}
function SkeletonCard() {
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
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
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ React11__default.default.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: "40%", height: 32, borderRadius: tokens.radius.md })
  );
}
function SkeletonListItem() {
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ React11__default.default.createElement(Skeleton, { width: 24, height: 14 })
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
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
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
    icon && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
      {
        style: {
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: compact ? 24 : 36,
          backgroundColor: tokens.color.bg.emphasis,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: tokens.spacing[1]
        }
      },
      icon
    ),
    !icon && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
      {
        style: {
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: compact ? 24 : 36,
          backgroundColor: tokens.color.bg.emphasis,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: tokens.spacing[1]
        }
      },
      /* @__PURE__ */ React11__default.default.createElement(reactNative.Text, { style: { fontSize: compact ? 20 : 32, color: tokens.color.text.tertiary } }, "\u25CB")
    ),
    /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
    description && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
    (action || secondaryAction) && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.View,
      {
        style: {
          marginTop: tokens.spacing[2],
          gap: tokens.spacing[2],
          alignItems: "center",
          width: "100%"
        }
      },
      action && /* @__PURE__ */ React11__default.default.createElement(
        Button,
        {
          label: action.label,
          variant: action.variant ?? "solid",
          onPress: action.onPress,
          size: compact ? "sm" : "md",
          fullWidth: true
        }
      ),
      secondaryAction && /* @__PURE__ */ React11__default.default.createElement(
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
  const tokens = headless.useTokens();
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { gap: tokens.spacing[1] } }, (label || labelTrailing) && /* @__PURE__ */ React11__default.default.createElement(
    reactNative.View,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
    label && /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          fontWeight: tokens.fontWeight.medium,
          color: tokens.color.text.secondary
        }
      },
      label
    ), required && /* @__PURE__ */ React11__default.default.createElement(
      reactNative.Text,
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
  ), children, error ? /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Text,
    {
      style: {
        fontSize: tokens.fontSize.xs,
        color: tokens.color.error.text
      },
      accessibilityRole: "alert",
      accessibilityLiveRegion: "polite"
    },
    error
  ) : helperText ? /* @__PURE__ */ React11__default.default.createElement(
    reactNative.Text,
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
  const tokens = headless.useTokens();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return /* @__PURE__ */ React11__default.default.createElement(reactNative.View, { style: { gap: gapSize } }, children);
}
function Pressable7({ children, style, ...hookOptions }) {
  const { gesture, animatedStyle, accessibilityProps, isPressed } = headless.usePressable(hookOptions);
  return /* @__PURE__ */ React11__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture }, /* @__PURE__ */ React11__default.default.createElement(Animated7__default.default.View, { style: [style, animatedStyle], ...accessibilityProps }, typeof children === "function" ? children({ isPressed }) : children));
}

exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
exports.Badge = Badge;
exports.BottomSheet = BottomSheet;
exports.Button = Button;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.Divider = Divider;
exports.EmptyState = EmptyState;
exports.FormField = FormField;
exports.FormGroup = FormGroup;
exports.Input = Input;
exports.List = List;
exports.ListItem = ListItem;
exports.Pressable = Pressable7;
exports.RadioGroup = RadioGroup;
exports.RadioItem = RadioItem;
exports.SectionHeader = SectionHeader;
exports.Select = Select;
exports.Skeleton = Skeleton;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonListItem = SkeletonListItem;
exports.SkeletonText = SkeletonText;
exports.Slider = Slider;
exports.Switch = Switch;
exports.TextArea = TextArea;
exports.ToastContainer = ToastContainer;
exports.ToastItem = ToastItem;
Object.keys(headless).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return headless[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map