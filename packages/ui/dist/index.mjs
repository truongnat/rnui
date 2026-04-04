var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/index.ts
import { ThemeProvider, useTheme, useTokens as useTokens57, useComponentTokens as useComponentTokens67, useIsDark as useIsDark2, useActiveBrand, useBrandSwitch, createTheme } from "@truongdq01/headless";

// src/components/Accordion/Accordion.tsx
import React2, { createContext, useContext, useMemo } from "react";
import { View as View2, Text as Text2 } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useDisclosure, useTokens as useTokens2, useComponentTokens as useComponentTokens2, usePressable, useReduceMotionEnabled } from "@truongdq01/headless";

// src/components/Icon/Icon.tsx
import React from "react";
import { View } from "react-native";
import { useTokens, useComponentTokens } from "@truongdq01/headless";
import {
  Star,
  Heart,
  Check,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  X,
  XCircle,
  Menu,
  MoreVertical,
  MoreHorizontal,
  Search,
  Settings,
  Bell,
  Home,
  User,
  Plus,
  Minus,
  Edit,
  Trash,
  Share,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Calendar,
  Clock,
  MapPin,
  Camera,
  Image,
  Video,
  FileText,
  Copy,
  Layout,
  Grid,
  List,
  Layers,
  Box,
  Package,
  ShoppingCart,
  CreditCard,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Zap,
  Flame,
  StarHalf,
  ThumbsUp,
  ThumbsDown
} from "lucide-react-native";
var ICON_MAP = {
  star: Star,
  heart: Heart,
  check: Check,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  checkCircle: CheckCircle,
  close: X,
  closeCircle: XCircle,
  menu: Menu,
  moreVertical: MoreVertical,
  moreHorizontal: MoreHorizontal,
  search: Search,
  settings: Settings,
  bell: Bell,
  home: Home,
  user: User,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash,
  share: Share,
  download: Download,
  upload: Upload,
  refresh: RefreshCw,
  externalLink: ExternalLink,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  unlock: Unlock,
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
  camera: Camera,
  image: Image,
  video: Video,
  file: FileText,
  copy: Copy,
  layout: Layout,
  grid: Grid,
  list: List,
  layers: Layers,
  box: Box,
  package: Package,
  cart: ShoppingCart,
  card: CreditCard,
  mail: Mail,
  phone: Phone,
  message: MessageSquare,
  send: Send,
  zap: Zap,
  flame: Flame,
  starHalf: StarHalf,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown
};
function Icon({ name, children, size, color, style }) {
  const { icon: iconTokens } = useComponentTokens();
  const tokens = useTokens();
  const iconNameString = name ?? (typeof children === "string" ? children : void 0);
  const resolvedSize = typeof size === "number" ? size : iconTokens.size[size ?? "md"] ?? 20;
  const resolvedColor = color && color in iconTokens.color ? iconTokens.color[color] : color ?? tokens.color.text.primary;
  const IconComp = ICON_MAP[iconNameString] || Info;
  return /* @__PURE__ */ React.createElement(View, { style: [{ width: resolvedSize, height: resolvedSize, alignItems: "center", justifyContent: "center" }, style] }, /* @__PURE__ */ React.createElement(IconComp, { size: resolvedSize, color: resolvedColor }));
}
function IconWrapper({ children, size, color }) {
  const tokens = useTokens();
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, {
    color: children.props.color ?? color ?? tokens.color.text.primary,
    size: children.props.size ?? size
  });
}

// src/components/Accordion/Accordion.tsx
var AccordionContext = createContext(null);
function Accordion({
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  children
}) {
  const disclosure = useDisclosure({
    isOpen: controlledExpanded,
    defaultOpen: defaultExpanded,
    onOpen: () => onChange?.(true),
    onClose: () => onChange?.(false)
  });
  const { accordion } = useComponentTokens2();
  return /* @__PURE__ */ React2.createElement(AccordionContext.Provider, { value: { expanded: disclosure.isOpen, toggle: disclosure.toggle, disabled } }, /* @__PURE__ */ React2.createElement(View2, { style: accordion.container }, children));
}
function AccordionSummary({ children, expandIcon }) {
  const { accordion } = useComponentTokens2();
  const ctx = useContext(AccordionContext);
  if (!ctx) return null;
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress: ctx.toggle,
    disabled: ctx.disabled,
    feedbackMode: "opacity"
  });
  const reduceMotion = useReduceMotionEnabled();
  const rotation = useSharedValue(ctx.expanded ? 1 : 0);
  React2.useEffect(() => {
    const target = ctx.expanded ? 1 : 0;
    rotation.value = reduceMotion ? target : withTiming(target, { duration: 200 });
  }, [ctx.expanded, reduceMotion]);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(rotation.value, [0, 1], [0, 180], Extrapolation.CLAMP)}deg` }]
  }));
  const containerStyle = useMemo(() => [
    accordion.summary,
    animatedStyle
  ], [accordion.summary, animatedStyle]);
  return /* @__PURE__ */ React2.createElement(GestureDetector, { gesture }, /* @__PURE__ */ React2.createElement(
    Animated.View,
    {
      style: containerStyle,
      ...accessibilityProps,
      accessibilityState: { expanded: ctx.expanded }
    },
    /* @__PURE__ */ React2.createElement(Text2, { style: accordion.title }, children),
    /* @__PURE__ */ React2.createElement(Animated.View, { style: iconStyle }, expandIcon ?? /* @__PURE__ */ React2.createElement(Icon, { size: accordion.icon.size, color: accordion.icon.color, name: "chevronDown" }))
  ));
}
function AccordionDetails({ children }) {
  const { accordion } = useComponentTokens2();
  const ctx = useContext(AccordionContext);
  const reduceMotion = useReduceMotionEnabled();
  const [contentHeight, setContentHeight] = React2.useState(0);
  const animHeight = useSharedValue(0);
  React2.useEffect(() => {
    if (!ctx) return;
    const target = ctx.expanded ? contentHeight : 0;
    animHeight.value = reduceMotion ? target : withTiming(target, { duration: 250 });
  }, [ctx?.expanded, contentHeight, reduceMotion]);
  const animStyle = useAnimatedStyle(() => ({
    height: animHeight.value,
    overflow: "hidden"
  }));
  return /* @__PURE__ */ React2.createElement(Animated.View, { style: animStyle }, /* @__PURE__ */ React2.createElement(
    View2,
    {
      onLayout: (e) => setContentHeight(e.nativeEvent.layout.height),
      style: [accordion.details, { position: "absolute", left: 0, right: 0 }]
    },
    children
  ));
}
function AccordionActions({ children }) {
  const tokens = useTokens2();
  const ctx = useContext(AccordionContext);
  if (!ctx?.expanded) return null;
  return /* @__PURE__ */ React2.createElement(View2, { style: {
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    backgroundColor: tokens.color.bg.subtle,
    flexDirection: "row",
    gap: tokens.spacing[2]
  } }, children);
}

// src/components/Alert/Alert.tsx
import React3, { useMemo as useMemo2 } from "react";
import { View as View3, Text as Text3, Pressable } from "react-native";
import { useComponentTokens as useComponentTokens3, useTokens as useTokens3, useAlert } from "@truongdq01/headless";
var SEVERITY_ICONS = {
  info: "info",
  success: "checkCircle",
  warning: "warning",
  error: "error"
};
function Alert({
  severity = "info",
  variant = "standard",
  icon,
  action,
  onClose,
  children
}) {
  const { alert } = useComponentTokens3();
  const tokens = useTokens3();
  const { isOpen, getAlertProps, getCloseButtonProps } = useAlert({ onClose });
  const severityTokens = alert.variant[severity];
  if (!isOpen) return null;
  const containerStyle = useMemo2(() => {
    const base = [alert.container];
    if (variant === "filled") {
      base.push({
        backgroundColor: severityTokens.icon,
        borderColor: "transparent",
        borderWidth: 0
      });
    } else if (variant === "outlined") {
      base.push({
        backgroundColor: "transparent",
        borderColor: severityTokens.border,
        borderWidth: 1
      });
    } else {
      base.push({
        backgroundColor: severityTokens.bg,
        borderColor: "transparent",
        borderWidth: 0
      });
    }
    return base;
  }, [alert, severityTokens, variant]);
  const textColor = variant === "filled" ? "#FFFFFF" : severityTokens.text;
  const iconColor = variant === "filled" ? "#FFFFFF" : severityTokens.icon;
  return /* @__PURE__ */ React3.createElement(View3, { style: containerStyle, ...getAlertProps() }, icon !== false && /* @__PURE__ */ React3.createElement(View3, { style: { marginTop: 2 } }, icon ?? /* @__PURE__ */ React3.createElement(Icon, { size: 20, color: iconColor }, SEVERITY_ICONS[severity])), /* @__PURE__ */ React3.createElement(View3, { style: { flex: 1 } }, children), action, onClose && /* @__PURE__ */ React3.createElement(Pressable, { hitSlop: 8, style: { marginTop: 2 }, ...getCloseButtonProps() }, /* @__PURE__ */ React3.createElement(Icon, { size: 18, color: textColor || tokens.color.text.inverse, name: "close" })));
}
function AlertTitle({ children }) {
  const { alert } = useComponentTokens3();
  return /* @__PURE__ */ React3.createElement(Text3, { style: alert.title }, children);
}

// src/components/AnimatedList/AnimatedList.tsx
import React4, { forwardRef, useMemo as useMemo3 } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import Animated2, { FadeInDown, Layout as Layout2 } from "react-native-reanimated";
import { useComponentTokens as useComponentTokens4, useReduceMotionEnabled as useReduceMotionEnabled2 } from "@truongdq01/headless";
var ReanimatedListImpl = Animated2.createAnimatedComponent(FlatList);
function AnimatedListInner({
  data,
  renderItem,
  itemEntering = FadeInDown,
  itemExiting,
  itemLayout = Layout2.springify().damping(16).stiffness(150),
  staggerEntering = false,
  staggerDelay = 50,
  itemContainerStyle,
  ...flashListProps
}, ref) {
  const { animatedList } = useComponentTokens4();
  const reduceMotion = useReduceMotionEnabled2();
  const effectiveEntering = reduceMotion ? void 0 : itemEntering;
  const effectiveExiting = reduceMotion ? void 0 : itemExiting;
  const effectiveLayout = reduceMotion ? void 0 : itemLayout;
  const ListImpl = useMemo3(() => {
    try {
      const mod = __require("@shopify/flash-list");
      const Impl = mod?.FlashList ?? FlatList;
      return Animated2.createAnimatedComponent(Impl);
    } catch {
      return ReanimatedListImpl;
    }
  }, []);
  const AnimatedCell = (info) => {
    const { index } = info;
    const enteringAnim = staggerEntering && effectiveEntering?.delay ? effectiveEntering.delay(Math.min(index * staggerDelay, 500)) : effectiveEntering;
    return /* @__PURE__ */ React4.createElement(
      Animated2.View,
      {
        entering: enteringAnim,
        exiting: effectiveExiting,
        layout: effectiveLayout,
        style: [animatedList.item, itemContainerStyle, styles.itemWrapper]
      },
      renderItem(info)
    );
  };
  return /* @__PURE__ */ React4.createElement(
    ListImpl,
    {
      ref,
      data,
      renderItem: (info) => /* @__PURE__ */ React4.createElement(AnimatedCell, { ...info }),
      ...flashListProps,
      contentContainerStyle: useMemo3(() => [
        animatedList.container,
        flashListProps.contentContainerStyle
      ], [animatedList.container, flashListProps.contentContainerStyle])
    }
  );
}
var AnimatedList = forwardRef(AnimatedListInner);
var styles = StyleSheet.create({
  itemWrapper: {
    overflow: "hidden"
  }
});

// src/components/AppBar/AppBar.tsx
import React5 from "react";
import { View as View5 } from "react-native";
import { useComponentTokens as useComponentTokens5, useTokens as useTokens4 } from "@truongdq01/headless";
function AppBar({
  children,
  color = "primary",
  variant = "elevation",
  position = "relative",
  elevation = 2,
  style
}) {
  const { appBar } = useComponentTokens5();
  const tokens = useTokens4();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  const bgMap = {
    default: appBar.container.backgroundColor,
    inherit: "transparent",
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    transparent: "transparent"
  };
  return /* @__PURE__ */ React5.createElement(
    View5,
    {
      style: [
        {
          backgroundColor: bgMap[color],
          borderBottomWidth: variant === "outlined" ? 1 : 0,
          borderBottomColor: tokens.color.border.default,
          zIndex: appBar.container.zIndex
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
  const { appBar } = useComponentTokens5();
  const tokens = useTokens4();
  return /* @__PURE__ */ React5.createElement(
    View5,
    {
      style: [
        {
          minHeight: 56,
          paddingHorizontal: appBar.container.paddingHorizontal,
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

// src/components/Autocomplete/Autocomplete.tsx
import React9, { useState as useState2, useRef } from "react";
import { View as View7, Text as Text6, Pressable as Pressable2, Modal, useWindowDimensions } from "react-native";
import Animated5, {
  useSharedValue as useSharedValue3,
  useAnimatedStyle as useAnimatedStyle3,
  withTiming as withTiming3,
  withSpring,
  Easing
} from "react-native-reanimated";
import { useAutocomplete, useTokens as useTokens6, useComponentTokens as useComponentTokens7 } from "@truongdq01/headless";

// src/components/Input/Input.tsx
import React8, { useMemo as useMemo4, useState, useEffect } from "react";
import {
  TextInput as RNTextInput,
  View as View6,
  Text as Text5
} from "react-native";
import Animated4, {
  useSharedValue as useSharedValue2,
  useAnimatedStyle as useAnimatedStyle2,
  withTiming as withTiming2,
  interpolateColor,
  interpolate as interpolate2
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens6, useTokens as useTokens5, useIconStyle } from "@truongdq01/headless";

// src/components/FormField/FormGroupContext.tsx
import React6 from "react";
var FormGroupContext = React6.createContext("standard");
function useFormGroupVariant() {
  return React6.useContext(FormGroupContext);
}

// src/components/Input/AnimatedHelperText.tsx
import React7 from "react";
import { Text as Text4 } from "react-native";
import Animated3, { FadeIn, FadeOut } from "react-native-reanimated";
function AnimatedHelperText({ text, isError, style }) {
  if (!text) return null;
  return /* @__PURE__ */ React7.createElement(Animated3.View, { entering: FadeIn.duration(150), exiting: FadeOut.duration(100) }, /* @__PURE__ */ React7.createElement(
    Text4,
    {
      style,
      accessibilityRole: isError ? "alert" : void 0,
      accessibilityLiveRegion: isError ? "polite" : void 0
    },
    text
  ));
}

// src/components/Input/Input.tsx
var FOCUS_MS = 150;
var AnimatedTextInput = Animated4.createAnimatedComponent(RNTextInput);
function Input({
  label,
  error,
  helperText,
  floatingLabel = false,
  size = "md",
  leadingElement,
  trailingElement,
  disabled = false,
  onClearError,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  placeholder,
  accessibilityLabel: accessibilityLabelProp,
  ...rest
}) {
  const { input } = useComponentTokens6();
  const tokens = useTokens5();
  const { size: iconSize, color: iconColor } = useIconStyle("input");
  const formGroupVariant = useFormGroupVariant();
  const isGrouped = formGroupVariant === "grouped";
  const [isFocused, setIsFocused] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [uncontrolledText, setUncontrolledText] = useState(
    () => defaultValue !== void 0 && defaultValue !== null ? String(defaultValue) : ""
  );
  const hasValue = value !== void 0 && value !== null ? String(value).length > 0 : uncontrolledText.length > 0;
  const focusProgress = useSharedValue2(0);
  const floatProgress = useSharedValue2(0);
  const errorSv = useSharedValue2(0);
  const disabledSv = useSharedValue2(0);
  const groupedSv = useSharedValue2(0);
  useEffect(() => {
    errorSv.value = error ? 1 : 0;
  }, [error, errorSv]);
  useEffect(() => {
    disabledSv.value = disabled ? 1 : 0;
  }, [disabled, disabledSv]);
  useEffect(() => {
    groupedSv.value = isGrouped ? 1 : 0;
  }, [isGrouped, groupedSv]);
  useEffect(() => {
    if (error || disabled) {
      focusProgress.value = 0;
      return;
    }
    focusProgress.value = withTiming2(isFocused ? 1 : 0, { duration: FOCUS_MS });
  }, [isFocused, error, disabled, focusProgress]);
  useEffect(() => {
    if (!floatingLabel || !label) return;
    floatProgress.value = withTiming2(isFocused || hasValue ? 1 : 0, { duration: FOCUS_MS });
  }, [isFocused, hasValue, floatingLabel, label, floatProgress]);
  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;
  const errorBorder = tokens.color.border.error;
  const disabledBorder = tokens.color.border.default;
  const fl = input.floatingLabel;
  const animatedContainerStyle = useAnimatedStyle2(() => {
    if (groupedSv.value === 1) {
      return {};
    }
    if (errorSv.value === 1) {
      return { borderColor: errorBorder };
    }
    if (disabledSv.value === 1) {
      return { borderColor: disabledBorder };
    }
    return {
      borderColor: interpolateColor(focusProgress.value, [0, 1], [defaultBorder, focusBorder])
    };
  }, [defaultBorder, disabledBorder, errorBorder, focusBorder]);
  const floatingLabelStyle = useAnimatedStyle2(() => {
    if (!floatingLabel || !label || !fl) {
      return {};
    }
    const inactiveFs = fl.fontSize.inactive;
    const activeFs = fl.fontSize.active;
    const inactiveC = fl.color.inactive;
    const activeC = fl.color.active;
    const ty0 = fl.translateY.inactive;
    const ty1 = fl.translateY.active;
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: interpolate2(floatProgress.value, [0, 1], [16, 6]),
      transform: [{ translateY: interpolate2(floatProgress.value, [0, 1], [ty0, ty1]) }],
      fontSize: interpolate2(floatProgress.value, [0, 1], [inactiveFs, activeFs]),
      color: interpolateColor(floatProgress.value, [0, 1], [inactiveC, activeC]),
      pointerEvents: "none"
    };
  }, [floatingLabel, label, fl]);
  const animatedInputPadStyle = useAnimatedStyle2(() => {
    if (!floatingLabel || !label) {
      return {};
    }
    return {
      paddingTop: interpolate2(floatProgress.value, [0, 1], [0, 12])
    };
  }, [floatingLabel, label]);
  const staticContainerStyle = useMemo4(() => {
    const groupedChrome = isGrouped ? {
      borderWidth: 0,
      borderRadius: 0,
      backgroundColor: "transparent"
    } : {};
    return [
      input.container,
      input.size[size],
      !isGrouped && error && input.state.error,
      !isGrouped && disabled && input.state.disabled,
      groupedChrome
    ];
  }, [input, size, error, disabled, isGrouped]);
  const handleChange = (e) => {
    const text = e.nativeEvent.text;
    if (value === void 0) {
      setUncontrolledText(text);
    }
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React8.isValidElement(icon)) {
      return React8.cloneElement(icon, {
        size: icon.props.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props.color ?? iconColor
      });
    }
    return icon;
  };
  const placeholderResolved = floatingLabel && label ? isFocused || hasValue ? placeholder ?? "" : "" : placeholder;
  const inner = /* @__PURE__ */ React8.createElement(React8.Fragment, null, renderIcon(leadingElement), /* @__PURE__ */ React8.createElement(View6, { style: { flex: 1, position: "relative", justifyContent: "center" } }, floatingLabel && label ? /* @__PURE__ */ React8.createElement(Animated4.Text, { style: floatingLabelStyle }, label) : null, /* @__PURE__ */ React8.createElement(
    AnimatedTextInput,
    {
      style: [
        { flex: 1, color: input.text.color, fontSize: input.size[size].fontSize },
        animatedInputPadStyle
      ],
      placeholderTextColor: input.text.placeholderColor,
      editable: !disabled,
      accessibilityLabel: label ?? accessibilityLabelProp,
      accessibilityState: { disabled },
      value,
      defaultValue,
      onFocus: (e) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      onChange: handleChange,
      placeholder: placeholderResolved,
      ...rest
    }
  )), renderIcon(trailingElement));
  return /* @__PURE__ */ React8.createElement(View6, null, label && !floatingLabel ? /* @__PURE__ */ React8.createElement(Text5, { style: input.label }, label) : null, /* @__PURE__ */ React8.createElement(Animated4.View, { style: [staticContainerStyle, animatedContainerStyle] }, inner), error ? /* @__PURE__ */ React8.createElement(AnimatedHelperText, { text: error, isError: true, style: input.errorText }) : /* @__PURE__ */ React8.createElement(AnimatedHelperText, { text: helperText, isError: false, style: input.helperText }));
}

// src/components/Autocomplete/Autocomplete.tsx
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
  const tokens = useTokens6();
  const { autocomplete } = useComponentTokens7();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const inputRef = useRef(null);
  const [inputRect, setInputRect] = useState2({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [dropdownMounted, setDropdownMounted] = useState2(false);
  const opacity = useSharedValue3(0);
  const scale = useSharedValue3(0.95);
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
  const DROPDOWN_MAX_HEIGHT = autocomplete.menu.maxHeight;
  const GAP = autocomplete.menu.marginTop ?? 4;
  const measureAndOpen = () => {
    if (!isOpen) {
      inputRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
        setInputRect({ pageX, pageY, width: w, height: h });
        open();
        opacity.value = 0;
        scale.value = 0.95;
        setDropdownMounted(true);
        requestAnimationFrame(() => {
          opacity.value = withTiming3(1, { duration: 160, easing: Easing.out(Easing.cubic) });
          scale.value = withSpring(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };
  const handleClose = () => {
    opacity.value = withTiming3(0, { duration: 120 });
    scale.value = withTiming3(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };
  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;
  const dropdownTop = showAbove ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP : inputRect.pageY + inputRect.height + GAP;
  const dropdownAnimStyle = useAnimatedStyle3(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ React9.createElement(View7, { ref: inputRef }, /* @__PURE__ */ React9.createElement(
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
  ), dropdownMounted && filteredOptions.length > 0 && /* @__PURE__ */ React9.createElement(Modal, { transparent: true, animationType: "none", visible: dropdownMounted, onRequestClose: handleClose }, /* @__PURE__ */ React9.createElement(Pressable2, { style: { flex: 1 }, onPress: handleClose }), /* @__PURE__ */ React9.createElement(
    Animated5.View,
    {
      style: [
        {
          position: "absolute",
          top: dropdownTop,
          left: inputRect.pageX,
          width: inputRect.width,
          ...autocomplete.menu,
          marginTop: void 0,
          // remove marginTop as it's used for calculation
          maxHeight: DROPDOWN_MAX_HEIGHT
        },
        dropdownAnimStyle
      ]
    },
    filteredOptions.map((option, idx) => {
      const selected = isSelected(option);
      return /* @__PURE__ */ React9.createElement(
        Pressable2,
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
            padding: autocomplete.item.padding,
            backgroundColor: pressed ? autocomplete.item.hover.backgroundColor : selected ? autocomplete.item.active.backgroundColor : "transparent"
          })
        },
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ React9.createElement(Text6, { style: { color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, labelOf(option))
      );
    })
  )));
}

// src/components/Avatar/Avatar.tsx
import React10 from "react";
import { View as View8, Text as Text7, Image as Image2 } from "react-native";
import { useComponentTokens as useComponentTokens8, useTokens as useTokens7 } from "@truongdq01/headless";
var STATUS_COLORS = {
  online: "#22C55E",
  offline: "#9CA3AF",
  busy: "#EF4444",
  away: "#F59E0B"
};
var STATUS_DOT_SIZE = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16
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
var colorIndexCache = /* @__PURE__ */ new Map();
function getColorIndex(str) {
  const cached = colorIndexCache.get(str);
  if (cached !== void 0) return cached;
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const result = Math.abs(hash) % BG_PALETTE.length;
  colorIndexCache.set(str, result);
  return result;
}
function Avatar({
  src,
  initials,
  fallbackIcon,
  size = "md",
  status,
  shape = "circle",
  accessibilityLabel,
  style
}) {
  const { avatar } = useComponentTokens8();
  const tokens = useTokens7();
  const sizeConfig = avatar.size[size];
  const radius = shape === "circle" ? sizeConfig.borderRadius : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;
  const dotSize = status ? STATUS_DOT_SIZE[size] : 0;
  return /* @__PURE__ */ React10.createElement(
    View8,
    {
      style: [{ width: sizeConfig.width, height: sizeConfig.height }, style],
      accessible: !!accessibilityLabel,
      accessibilityLabel
    },
    src ? /* @__PURE__ */ React10.createElement(
      Image2,
      {
        source: { uri: src },
        style: { width: sizeConfig.width, height: sizeConfig.height, borderRadius: radius },
        accessibilityLabel
      }
    ) : initials ? /* @__PURE__ */ React10.createElement(
      View8,
      {
        style: {
          width: sizeConfig.width,
          height: sizeConfig.height,
          borderRadius: radius,
          backgroundColor: BG_PALETTE[colorIdx],
          alignItems: avatar.container.alignItems,
          justifyContent: avatar.container.justifyContent
        }
      },
      /* @__PURE__ */ React10.createElement(
        Text7,
        {
          style: {
            fontSize: sizeConfig.fontSize,
            fontWeight: avatar.text.fontWeight,
            color: TEXT_PALETTE[colorIdx],
            letterSpacing: 0.5
          }
        },
        initials.slice(0, 2).toUpperCase()
      )
    ) : (
      // Generic fallback
      /* @__PURE__ */ React10.createElement(
        View8,
        {
          style: {
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: radius,
            backgroundColor: avatar.container.backgroundColor,
            alignItems: avatar.container.alignItems,
            justifyContent: avatar.container.justifyContent
          }
        },
        fallbackIcon ?? /* @__PURE__ */ React10.createElement(Text7, { style: { fontSize: sizeConfig.fontSize, color: tokens.color.text.tertiary } }, "?")
      )
    ),
    status && /* @__PURE__ */ React10.createElement(
      View8,
      {
        style: {
          position: "absolute",
          bottom: 0,
          right: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: STATUS_COLORS[status],
          borderWidth: avatar.presence.borderWidth,
          borderColor: avatar.presence.borderColor
        }
      }
    )
  );
}
function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  overlap
}) {
  const { avatar: avatarTokens } = useComponentTokens8();
  const tokens = useTokens7();
  const sizeConfig = avatarTokens.size[size];
  const dim = sizeConfig.width;
  const gap = overlap ?? Math.round(dim * 0.3);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ React10.createElement(
    View8,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ React10.createElement(
      View8,
      {
        key: i,
        style: {
          position: "absolute",
          left: i * (dim - gap),
          zIndex: visible.length - i,
          borderWidth: avatarTokens.presence.borderWidth,
          borderColor: avatarTokens.presence.borderColor,
          borderRadius: dim / 2 + 2
        }
      },
      /* @__PURE__ */ React10.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ React10.createElement(
      View8,
      {
        style: {
          position: "absolute",
          left: visible.length * (dim - gap),
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: avatarTokens.container.backgroundColor,
          alignItems: avatarTokens.container.alignItems,
          justifyContent: avatarTokens.container.justifyContent,
          borderWidth: avatarTokens.presence.borderWidth,
          borderColor: avatarTokens.presence.borderColor,
          zIndex: 0
        }
      },
      /* @__PURE__ */ React10.createElement(
        Text7,
        {
          style: {
            fontSize: sizeConfig.fontSize,
            color: tokens.color.text.secondary,
            fontWeight: avatarTokens.text.fontWeight
          }
        },
        "+",
        overflow
      )
    )
  );
}

// src/components/Badge/Badge.tsx
import React11, { useMemo as useMemo5 } from "react";
import { View as View9, Text as Text8 } from "react-native";
import { useComponentTokens as useComponentTokens9 } from "@truongdq01/headless";
var BADGE_ROW_GAP = { sm: 3, md: 4, lg: 6 };
var Badge = React11.memo(({ label, count, variant = "default", size = "md", icon, dot = false }) => {
  const { badge } = useComponentTokens9();
  const { fontSize, sizeBox } = useMemo5(() => {
    const { fontSize: fs, ...rest } = badge.size[size];
    return { fontSize: fs, sizeBox: rest };
  }, [badge.size, size]);
  const iconPx = Math.round(fontSize * 0.85);
  const containerStyle = useMemo5(
    () => [
      badge.base,
      sizeBox,
      {
        backgroundColor: badge.variant[variant].bg,
        flexDirection: "row",
        alignItems: "center",
        gap: BADGE_ROW_GAP[size]
      }
    ],
    [badge.base, badge.variant, sizeBox, variant, size]
  );
  const textStyle = useMemo5(
    () => [badge.text, { color: badge.variant[variant].text, fontSize }],
    [badge.text, badge.variant, variant, fontSize]
  );
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (React11.isValidElement(el)) {
      return React11.cloneElement(el, {
        size: el.props.size ?? iconPx,
        color: el.props.color ?? iconColor
      });
    }
    return el;
  };
  const textPart = label !== void 0 ? label : count !== void 0 ? String(count) : null;
  const dotDim = size === "sm" ? Math.max(6, Math.round(badge.dot.size * 0.875)) : size === "lg" ? Math.round(badge.dot.size * 1.25) : badge.dot.size;
  return /* @__PURE__ */ React11.createElement(
    View9,
    {
      style: [
        containerStyle,
        dot && {
          padding: 0,
          width: dotDim,
          height: dotDim,
          borderRadius: dotDim / 2,
          justifyContent: "center"
        }
      ]
    },
    !dot && renderIcon(icon),
    !dot && textPart !== null && /* @__PURE__ */ React11.createElement(Text8, { style: textStyle }, textPart)
  );
});

// src/components/BottomNavigation/BottomNavigation.tsx
import React12, { createContext as createContext2, useContext as useContext2, useMemo as useMemo6 } from "react";
import { View as View10, Text as Text9, Pressable as Pressable3 } from "react-native";
import { useTokens as useTokens8, useComponentTokens as useComponentTokens10, useBottomNavigation } from "@truongdq01/headless";
var BottomNavContext = createContext2(null);
function BottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  children
}) {
  const { bottomNavigation } = useComponentTokens10();
  const { value, isSelected, getItemProps } = useBottomNavigation({
    value: controlledValue,
    defaultValue,
    onChange
  });
  const ctx = useMemo6(() => ({ value, isSelected, getItemProps, showLabels }), [value, isSelected, getItemProps, showLabels]);
  return /* @__PURE__ */ React12.createElement(BottomNavContext.Provider, { value: ctx }, /* @__PURE__ */ React12.createElement(View10, { style: [bottomNavigation.container, { flexDirection: "row", justifyContent: "space-around" }] }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const { bottomNavigation } = useComponentTokens10();
  const tokens = useTokens8();
  const ctx = useContext2(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  return /* @__PURE__ */ React12.createElement(Pressable3, { ...ctx.getItemProps(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ React12.createElement(Text9, { style: { fontSize: tokens.fontSize.xs, color: selected ? bottomNavigation.item.active.color : bottomNavigation.item.inactive.color } }, label));
}

// src/components/BottomSheet/BottomSheet.tsx
import React13, { forwardRef as forwardRef2, useImperativeHandle, useState as useState3 } from "react";
import { View as View11, StyleSheet as StyleSheet2, Dimensions, Modal as Modal2 } from "react-native";
import Animated6 from "react-native-reanimated";
import { GestureDetector as GestureDetector2 } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet, useComponentTokens as useComponentTokens11 } from "@truongdq01/headless";
var SCREEN_HEIGHT = Dimensions.get("window").height;
var BottomSheet = forwardRef2(
  function BottomSheet2({
    children,
    snapPoints = ["50%"],
    initialSnapIndex,
    onClose,
    onSnapChange,
    enableDismissOnSwipe = true,
    enableBackdrop = true,
    showHandle = true,
    borderRadius,
    accessibilityLabel = "Bottom sheet",
    backdropAccessibilityLabel = "Dismiss bottom sheet"
  }, ref) {
    const { bottomSheet } = useComponentTokens11();
    const insets = useSafeAreaInsets();
    const [mounted, setMounted] = useState3(false);
    const handleClose = React13.useCallback(() => {
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
    const open = React13.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    useImperativeHandle(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ React13.createElement(Modal2, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ React13.createElement(View11, { style: StyleSheet2.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ React13.createElement(GestureDetector2, { gesture: backdropTapGesture }, /* @__PURE__ */ React13.createElement(
      Animated6.View,
      {
        style: [
          StyleSheet2.absoluteFill,
          bottomSheet.backdrop,
          backdropAnimatedStyle
        ],
        accessibilityRole: "button",
        accessibilityLabel: backdropAccessibilityLabel,
        accessibilityHint: "Closes the bottom sheet"
      }
    )), /* @__PURE__ */ React13.createElement(
      Animated6.View,
      {
        accessibilityViewIsModal: true,
        accessibilityRole: "none",
        accessibilityLabel,
        style: [
          styles2.sheet,
          bottomSheet.container,
          {
            borderTopLeftRadius: borderRadius ?? bottomSheet.container.borderTopLeftRadius,
            borderTopRightRadius: borderRadius ?? bottomSheet.container.borderTopRightRadius,
            paddingBottom: insets.bottom + 8
          },
          sheetAnimatedStyle
        ]
      },
      /* @__PURE__ */ React13.createElement(GestureDetector2, { gesture: panGesture }, /* @__PURE__ */ React13.createElement(
        View11,
        {
          style: styles2.handleArea,
          accessibilityRole: "adjustable",
          accessibilityLabel: "Drag handle",
          accessibilityHint: "Swipe up or down to resize the bottom sheet"
        },
        showHandle && /* @__PURE__ */ React13.createElement(
          View11,
          {
            style: [
              styles2.handle,
              bottomSheet.handle
            ]
          }
        )
      )),
      /* @__PURE__ */ React13.createElement(View11, { style: { flex: 1 } }, children)
    )));
  }
);
var styles2 = StyleSheet2.create({
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

// src/components/Box/Box.tsx
import React14 from "react";
import { View as View12 } from "react-native";
import { useComponentTokens as useComponentTokens12 } from "@truongdq01/headless";
function Box2({ children, style, sx, flex }) {
  const { box } = useComponentTokens12();
  const merged = [
    box.defaults,
    flex !== void 0 ? { flex } : null,
    sx,
    style
  ];
  return /* @__PURE__ */ React14.createElement(View12, { style: merged }, children);
}

// src/components/Breadcrumbs/Breadcrumbs.tsx
import React15 from "react";
import { View as View13, Text as Text10 } from "react-native";
import { useComponentTokens as useComponentTokens13 } from "@truongdq01/headless";
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const { breadcrumbs } = useComponentTokens13();
  const items = React15.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ React15.createElement(Text10, { key: "ellipsis", style: { color: breadcrumbs.separator.color } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ React15.createElement(View13, { style: breadcrumbs.container }, displayItems.map((child, idx) => /* @__PURE__ */ React15.createElement(React15.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ React15.createElement(Text10, { style: { marginHorizontal: breadcrumbs.container.gap, color: breadcrumbs.separator.color, fontSize: breadcrumbs.separator.fontSize } }, separator))));
}

// src/components/Button/Button.tsx
import React16, { useCallback, useMemo as useMemo7 } from "react";
import Animated7 from "react-native-reanimated";
import { GestureDetector as GestureDetector3 } from "react-native-gesture-handler";
import { ActivityIndicator, Text as Text11, View as View14, StyleSheet as StyleSheet3, Linking } from "react-native";
import { usePressable as usePressable2, useComponentTokens as useComponentTokens14, useIconStyle as useIconStyle2, useTokens as useTokens10 } from "@truongdq01/headless";
var Button = React16.memo(({
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
}) => {
  const { button } = useComponentTokens14();
  const tokens = useTokens10();
  const { size: iconSize } = useIconStyle2("button");
  const isDisabled = disabled || loading;
  const resolvedVariant = useMemo7(() => {
    if (variant === "contained") return "solid";
    if (variant === "outlined") return "outline";
    if (variant === "text") return "ghost";
    return variant;
  }, [variant]);
  const resolvedColor = useMemo7(() => {
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
  const handlePress = useCallback(() => {
    if (!href) {
      onPress?.();
      return;
    }
    onPress?.();
    void Linking.openURL(href).catch(() => {
    });
  }, [href, onPress]);
  const hitSlop = useMemo7(() => {
    const height = button.size[size].container.height;
    const padding = Math.max(0, (44 - height) / 2);
    const isIconOnly = !label && !children;
    const horizontalPadding = isIconOnly ? padding : 0;
    return { top: padding, bottom: padding, left: horizontalPadding, right: horizontalPadding };
  }, [button, size, label, children]);
  const { animatedStyle, gesture, accessibilityProps } = usePressable2({
    onPress: handlePress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? (typeof children === "string" ? children : label),
    accessibilityHint,
    accessibilityRole: "button",
    hitSlop
  });
  const containerStyle = useMemo7(() => [
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
  const textStyle = useMemo7(() => [
    button.variant[resolvedVariant].text,
    button.size[size].text,
    resolvedVariant === "solid" && { color: resolvedColor.textOn || tokens.color.text.inverse },
    resolvedVariant === "outline" && { color: resolvedColor.main },
    resolvedVariant === "ghost" && { color: resolvedColor.main },
    resolvedVariant === "destructive" && { color: tokens.color.error.text }
  ], [button, resolvedVariant, size, resolvedColor, tokens]);
  const resolvedLabelColor = useMemo7(() => {
    switch (resolvedVariant) {
      case "solid":
        return String(resolvedColor.textOn ?? tokens.color.text.inverse);
      case "outline":
      case "ghost":
        return String(resolvedColor.main);
      case "destructive":
        return String(tokens.color.error.text);
      default: {
        const _never = resolvedVariant;
        throw new Error(`Unexpected button variant: ${_never}`);
      }
    }
  }, [resolvedVariant, resolvedColor, tokens]);
  const iconColor = resolvedLabelColor;
  const content = children ?? label;
  const isTextContent = typeof content === "string" || typeof content === "number";
  const leading = startIcon ?? leadingIcon;
  const trailing = endIcon ?? trailingIcon;
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React16.isValidElement(icon)) {
      return React16.cloneElement(icon, {
        size: icon.props.size ?? iconSize,
        color: icon.props.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React16.createElement(GestureDetector3, { gesture }, /* @__PURE__ */ React16.createElement(
    Animated7.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ React16.createElement(View14, { style: [
      styles3.contentContainer,
      {
        gap: button.variant[resolvedVariant].container.gap,
        opacity: loading && loadingPosition === "center" ? 0 : 1
      }
    ] }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ React16.createElement(ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ React16.createElement(Text11, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ React16.createElement(ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ React16.createElement(View14, { style: [StyleSheet3.absoluteFill, styles3.loadingWrapper] }, loadingIndicator ?? /* @__PURE__ */ React16.createElement(ActivityIndicator, { size: "small", color: iconColor }))
  ));
});
var styles3 = StyleSheet3.create({
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

// src/components/ButtonGroup/ButtonGroup.tsx
import React17 from "react";
import { View as View15 } from "react-native";
import { useTokens as useTokens11, useComponentTokens as useComponentTokens15 } from "@truongdq01/headless";
function ButtonGroup({
  children,
  variant = "outlined",
  size = "md",
  orientation = "horizontal",
  disabled = false,
  fullWidth = false
}) {
  const tokens = useTokens11();
  const { buttonGroup } = useComponentTokens15();
  const isRow = orientation === "horizontal";
  const items = React17.Children.toArray(children);
  return /* @__PURE__ */ React17.createElement(
    View15,
    {
      style: {
        ...buttonGroup.container,
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start"
      }
    },
    items.map((child, i) => {
      if (!React17.isValidElement(child)) return child;
      const isFirst = i === 0;
      const isLast = i === items.length - 1;
      const borderStyle = isRow ? {
        borderRightWidth: isLast ? 0 : buttonGroup.divider.width,
        borderRightColor: buttonGroup.divider.backgroundColor
      } : {
        borderBottomWidth: isLast ? 0 : buttonGroup.divider.width,
        borderBottomColor: buttonGroup.divider.backgroundColor
      };
      const radiusStyle = isFirst ? isRow ? { borderTopLeftRadius: buttonGroup.container.borderRadius, borderBottomLeftRadius: buttonGroup.container.borderRadius } : { borderTopLeftRadius: buttonGroup.container.borderRadius, borderTopRightRadius: buttonGroup.container.borderRadius } : isLast ? isRow ? { borderTopRightRadius: buttonGroup.container.borderRadius, borderBottomRightRadius: buttonGroup.container.borderRadius } : { borderBottomLeftRadius: buttonGroup.container.borderRadius, borderBottomRightRadius: buttonGroup.container.borderRadius } : { borderRadius: 0 };
      return React17.cloneElement(child, {
        variant,
        size,
        disabled: disabled || child.props.disabled,
        fullWidth: fullWidth || child.props.fullWidth,
        style: [
          { borderRadius: 0, borderWidth: 0 },
          borderStyle,
          radiusStyle,
          child.props.style
        ].filter(Boolean)
      });
    })
  );
}

// src/components/Card/Card.tsx
import React18, { useMemo as useMemo8 } from "react";
import Animated8 from "react-native-reanimated";
import { GestureDetector as GestureDetector4 } from "react-native-gesture-handler";
import { View as View16 } from "react-native";
import { usePressable as usePressable3, useComponentTokens as useComponentTokens16 } from "@truongdq01/headless";
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = useComponentTokens16();
  const containerStyle = useMemo8(() => [
    card.container,
    padding !== "none" && { padding: card.padding[padding] },
    style
  ], [card, padding, style]);
  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = usePressable3({
      onPress,
      feedbackMode: "scaleSubtle",
      accessibilityLabel,
      accessibilityRole: "button"
    });
    return /* @__PURE__ */ React18.createElement(GestureDetector4, { gesture }, /* @__PURE__ */ React18.createElement(Animated8.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ React18.createElement(View16, { style: containerStyle }, children);
}

// src/components/Carousel/Carousel.tsx
import React19 from "react";
import { View as View17, ScrollView, useWindowDimensions as useWindowDimensions2 } from "react-native";
import Animated9, {
  useAnimatedStyle as useAnimatedStyle4,
  interpolate as interpolate3,
  Extrapolation as Extrapolation2
} from "react-native-reanimated";
import { useCarousel, useComponentTokens as useComponentTokens17 } from "@truongdq01/headless";
function defaultKeyExtractor(_item, index) {
  return `carousel-${index}`;
}
function getSlideKey(item, indexInDisplay, loop, n, keyExtractor) {
  if (!loop || n < 2) {
    return keyExtractor(item, indexInDisplay);
  }
  if (indexInDisplay === 0) {
    return `${keyExtractor(item, n - 1)}-loop-prev`;
  }
  if (indexInDisplay === n + 1) {
    return `${keyExtractor(item, 0)}-loop-next`;
  }
  return keyExtractor(item, indexInDisplay - 1);
}
function Carousel({
  data,
  renderItem,
  itemWidth,
  gap = 0,
  height = 200,
  showPagination = true,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3e3,
  keyExtractor = defaultKeyExtractor
}) {
  const { width: windowWidthPx } = useWindowDimensions2();
  const windowWidth = Math.max(1, windowWidthPx > 0 ? windowWidthPx : 375);
  const resolvedItemWidth = itemWidth ?? windowWidth;
  const contentPaddingStart = (windowWidth - resolvedItemWidth) / 2;
  const { carousel } = useComponentTokens17();
  const {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    itemStep,
    n,
    contentPaddingStart: snapPad
  } = useCarousel({
    data,
    itemWidth: resolvedItemWidth,
    gap,
    contentPaddingStart,
    loop,
    autoPlay,
    autoPlayInterval
  });
  if (data.length === 0) {
    return null;
  }
  return /* @__PURE__ */ React19.createElement(View17, { style: { height } }, /* @__PURE__ */ React19.createElement(
    ScrollView,
    {
      ref: scrollViewRef,
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      decelerationRate: "fast",
      snapToOffsets,
      snapToAlignment: "start",
      onScroll,
      scrollEventThrottle: 16,
      onMomentumScrollEnd,
      contentContainerStyle: {
        paddingHorizontal: contentPaddingStart,
        gap
      }
    },
    displayData.map((item, index) => {
      return /* @__PURE__ */ React19.createElement(
        View17,
        {
          key: getSlideKey(item, index, loop, n, keyExtractor),
          style: { width: resolvedItemWidth, height }
        },
        renderItem(item, loop ? (index - 1 + n) % n : index)
      );
    })
  ), showPagination && /* @__PURE__ */ React19.createElement(
    View17,
    {
      style: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: carousel.pagination.marginTop,
        gap: carousel.pagination.gap
      }
    },
    data.map((_, i) => {
      return /* @__PURE__ */ React19.createElement(
        PaginationDot,
        {
          key: i,
          index: i,
          scrollX,
          itemStep,
          contentPaddingStart: snapPad,
          isLoop: loop,
          n,
          dot: carousel.dot
        }
      );
    })
  ));
}
function PaginationDot({
  index,
  scrollX,
  itemStep,
  contentPaddingStart,
  isLoop,
  n,
  dot
}) {
  const dotStyle = useAnimatedStyle4(() => {
    let activeIndex = (scrollX.value - contentPaddingStart) / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }
    const opacity = interpolate3(
      activeIndex,
      [index - 1, index, index + 1],
      [dot.inactive.opacity, 1, dot.inactive.opacity],
      Extrapolation2.CLAMP
    );
    const width = interpolate3(
      activeIndex,
      [index - 1, index, index + 1],
      [dot.inactive.width, dot.active.width, dot.inactive.width],
      Extrapolation2.CLAMP
    );
    return {
      width,
      opacity,
      backgroundColor: dot.active.bg,
      height: dot.height,
      borderRadius: dot.borderRadius
    };
  });
  return /* @__PURE__ */ React19.createElement(Animated9.View, { style: dotStyle });
}

// src/components/Checkbox/Checkbox.tsx
import React20 from "react";
import { View as View18, Text as Text12, Pressable as Pressable4 } from "react-native";
import Animated10, {
  useSharedValue as useSharedValue4,
  useAnimatedStyle as useAnimatedStyle5,
  withSpring as withSpring2,
  interpolateColor as interpolateColor2
} from "react-native-reanimated";
import { useCheckbox, useComponentTokens as useComponentTokens18, useTokens as useTokens12, useReduceMotionEnabled as useReduceMotionEnabled3 } from "@truongdq01/headless";
import { spring } from "@truongdq01/tokens";
function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}) {
  const { checkbox } = useComponentTokens18();
  const tokens = useTokens12();
  const reduceMotion = useReduceMotionEnabled3();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = useCheckbox(hookOptions);
  const sizeConfig = checkbox.size[size];
  const scale = useSharedValue4(1);
  const fillProgress = useSharedValue4(isChecked || isIndeterminate ? 1 : 0);
  React20.useEffect(() => {
    const target = isChecked || isIndeterminate ? 1 : 0;
    fillProgress.value = reduceMotion ? target : withSpring2(target, spring.snappy);
  }, [isChecked, isIndeterminate, reduceMotion]);
  const boxStyle = useAnimatedStyle5(() => ({
    backgroundColor: interpolateColor2(
      fillProgress.value,
      [0, 1],
      [checkbox.state.default.backgroundColor, checkbox.state.checked.backgroundColor]
    ),
    borderColor: interpolateColor2(
      fillProgress.value,
      [0, 1],
      [checkbox.state.default.borderColor, checkbox.state.checked.borderColor]
    ),
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = useAnimatedStyle5(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    if (!reduceMotion) {
      scale.value = withSpring2(0.88, spring.snappy, () => {
        scale.value = withSpring2(1, spring.snappy);
      });
    }
    toggle();
  };
  return /* @__PURE__ */ React20.createElement(
    Pressable4,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? checkbox.state.disabled.opacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React20.createElement(
      Animated10.View,
      {
        style: [
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: sizeConfig.borderRadius,
            borderWidth: sizeConfig.borderWidth,
            alignItems: checkbox.container.alignItems,
            justifyContent: checkbox.container.justifyContent,
            marginTop: 1
          },
          boxStyle
        ]
      },
      /* @__PURE__ */ React20.createElement(Animated10.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ React20.createElement(View18, { style: { width: sizeConfig.iconSize, height: 2, backgroundColor: tokens.color.text.inverse, borderRadius: 1 } }) : /* @__PURE__ */ React20.createElement(Text12, { style: { color: tokens.color.text.inverse, fontSize: sizeConfig.iconSize, fontWeight: "700", lineHeight: sizeConfig.iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ React20.createElement(View18, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React20.createElement(Text12, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React20.createElement(Text12, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Chip/Chip.tsx
import React21 from "react";
import { View as View19, Text as Text13, Pressable as Pressable5 } from "react-native";
import { useTokens as useTokens13, useIconStyle as useIconStyle3, useComponentTokens as useComponentTokens19 } from "@truongdq01/headless";
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
  const tokens = useTokens13();
  const { chip } = useComponentTokens19();
  const { size: iconSize, color: iconColor } = useIconStyle3("list");
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
    if (React21.isValidElement(node)) {
      return React21.cloneElement(node, {
        size: node.props.size ?? (size === "sm" ? 14 : 16),
        color: node.props.color ?? iconColor
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
    borderRadius: tokens.radius.full,
    minWidth: 28,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center"
  };
  const content = /* @__PURE__ */ React21.createElement(View19, { style: container }, avatar && /* @__PURE__ */ React21.createElement(View19, { style: avatarStyle }, avatar), renderIcon(icon), /* @__PURE__ */ React21.createElement(Text13, { style: {
    color: customText,
    fontSize: sizeStyle.fontSize,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: sizeStyle.fontSize * 1.4
  } }, label), onDelete && /* @__PURE__ */ React21.createElement(
    Pressable5,
    {
      onPress: onDelete,
      hitSlop: 8,
      style: deleteButtonStyle,
      accessibilityRole: "button",
      accessibilityLabel: "Remove"
    },
    deleteIcon ?? /* @__PURE__ */ React21.createElement(Text13, { style: {
      color: customText,
      fontSize: 14,
      fontWeight: tokens.fontWeight.bold,
      opacity: 0.7
    } }, "\xD7")
  ));
  if (onClick || clickable) {
    return /* @__PURE__ */ React21.createElement(
      Pressable5,
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

// src/components/CircularProgress/CircularProgress.tsx
import React22 from "react";
import { ActivityIndicator as ActivityIndicator2, View as View20, Text as Text14, StyleSheet as StyleSheet4 } from "react-native";
import { useTokens as useTokens14, useComponentTokens as useComponentTokens20 } from "@truongdq01/headless";
function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}
function CircularProgress({
  size = "md",
  color = "primary",
  thickness,
  value = 0,
  variant = "indeterminate",
  showLabel = false,
  style
}) {
  const tokens = useTokens14();
  const { circularProgress } = useComponentTokens20();
  const sizeMap = {
    sm: circularProgress.size.sm,
    md: circularProgress.size.md,
    lg: circularProgress.size.lg,
    small: circularProgress.size.sm,
    medium: circularProgress.size.md,
    large: circularProgress.size.lg
  };
  const resolvedSize = typeof size === "number" ? size : sizeMap[size] || circularProgress.size.md;
  const resolvedColor = {
    primary: circularProgress.color,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color];
  const progressValue = clamp(value);
  return /* @__PURE__ */ React22.createElement(View20, { style: [styles4.container, style] }, /* @__PURE__ */ React22.createElement(
    ActivityIndicator2,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ React22.createElement(View20, { style: StyleSheet4.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ React22.createElement(View20, { style: styles4.labelContainer }, /* @__PURE__ */ React22.createElement(Text14, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
}
var styles4 = StyleSheet4.create({
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

// src/components/DatePicker/DatePicker.tsx
import React25, { useState as useState4, useMemo as useMemo11 } from "react";
import { View as View23, Text as Text17, Pressable as Pressable8, Platform, Modal as Modal3, StyleSheet as StyleSheet5 } from "react-native";
import { useSafeAreaInsets as useSafeAreaInsets2 } from "react-native-safe-area-context";
import { useTokens as useTokens17, useComponentTokens as useComponentTokens21, useIconStyle as useIconStyle4 } from "@truongdq01/headless";
import DateTimePicker from "@react-native-community/datetimepicker";

// src/components/DatePicker/CalendarGrid.tsx
import React23, { useMemo as useMemo9, useCallback as useCallback2 } from "react";
import { View as View21, Text as Text15, Pressable as Pressable6 } from "react-native";
import { useTokens as useTokens15 } from "@truongdq01/headless";
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isToday(d) {
  return isSameDay(d, /* @__PURE__ */ new Date());
}
function isDateDisabled(d, min, max) {
  if (min) {
    const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (d < minDay) return true;
  }
  if (max) {
    const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (d > maxDay) return true;
  }
  return false;
}
function CalendarGrid({
  month,
  year,
  selectedDate,
  onSelectDate,
  onMonthChange,
  minimumDate,
  maximumDate,
  locale,
  onHeaderPress
}) {
  const t = useTokens15();
  const weekdayLabels = useMemo9(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const baseMonday = new Date(2024, 0, 8);
    return Array.from(
      { length: 7 },
      (_, i) => formatter.format(new Date(baseMonday.getFullYear(), baseMonday.getMonth(), baseMonday.getDate() + i))
    );
  }, [locale]);
  const monthYearTitle = useMemo9(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(year, month, 1)),
    [locale, year, month]
  );
  const goPrev = useCallback2(() => {
    if (month === 0) onMonthChange(11, year - 1);
    else onMonthChange(month - 1, year);
  }, [month, year, onMonthChange]);
  const goNext = useCallback2(() => {
    if (month === 11) onMonthChange(0, year + 1);
    else onMonthChange(month + 1, year);
  }, [month, year, onMonthChange]);
  const cells = useMemo9(() => {
    const firstDay = new Date(year, month, 1);
    let startWeekday = firstDay.getDay() - 1;
    if (startWeekday < 0) startWeekday = 6;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const rows = [];
    let row = [];
    for (let i = 0; i < startWeekday; i++) {
      const day = daysInPrevMonth - startWeekday + 1 + i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      row.push({ date: new Date(prevYear, prevMonth, day), inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      row.push({ date: new Date(year, month, d), inMonth: true });
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      let nextDay = 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      while (row.length < 7) {
        row.push({ date: new Date(nextYear, nextMonth, nextDay++), inMonth: false });
      }
      rows.push(row);
    }
    return rows;
  }, [month, year]);
  const cellSize = 40;
  return /* @__PURE__ */ React23.createElement(View21, null, /* @__PURE__ */ React23.createElement(View21, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4, marginBottom: t.spacing[3] } }, /* @__PURE__ */ React23.createElement(Pressable6, { onPress: goPrev, hitSlop: 12, accessibilityLabel: "Previous month", accessibilityRole: "button" }, /* @__PURE__ */ React23.createElement(Icon, { name: "chevronLeft", size: 22, color: t.color.text.secondary })), /* @__PURE__ */ React23.createElement(Pressable6, { onPress: () => onHeaderPress?.(), disabled: !onHeaderPress, accessibilityRole: onHeaderPress ? "button" : void 0 }, /* @__PURE__ */ React23.createElement(Text15, { style: { fontSize: t.fontSize.lg, fontWeight: t.fontWeight.semibold, color: t.color.text.primary } }, monthYearTitle)), /* @__PURE__ */ React23.createElement(Pressable6, { onPress: goNext, hitSlop: 12, accessibilityLabel: "Next month", accessibilityRole: "button" }, /* @__PURE__ */ React23.createElement(Icon, { name: "chevronRight", size: 22, color: t.color.text.secondary }))), /* @__PURE__ */ React23.createElement(View21, { style: { flexDirection: "row" } }, weekdayLabels.map((wd) => /* @__PURE__ */ React23.createElement(View21, { key: wd, style: { flex: 1, alignItems: "center", paddingBottom: t.spacing[2] } }, /* @__PURE__ */ React23.createElement(Text15, { style: { fontSize: t.fontSize.xs, fontWeight: t.fontWeight.medium, color: t.color.text.tertiary } }, wd)))), cells.map((row, ri) => /* @__PURE__ */ React23.createElement(View21, { key: ri, style: { flexDirection: "row" } }, row.map((cell, ci) => {
    const selected = selectedDate ? isSameDay(cell.date, selectedDate) : false;
    const today = isToday(cell.date);
    const disabled = !cell.inMonth || isDateDisabled(cell.date, minimumDate, maximumDate);
    return /* @__PURE__ */ React23.createElement(
      Pressable6,
      {
        key: ci,
        onPress: () => {
          if (!disabled) onSelectDate(cell.date);
        },
        disabled,
        accessibilityRole: "button",
        accessibilityLabel: cell.date.toDateString(),
        accessibilityState: { selected, disabled },
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: cellSize
        }
      },
      /* @__PURE__ */ React23.createElement(
        View21,
        {
          style: {
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: selected ? t.color.brand.default : "transparent",
            borderWidth: today && !selected ? 1.5 : 0,
            borderColor: today && !selected ? t.color.brand.default : "transparent"
          }
        },
        /* @__PURE__ */ React23.createElement(
          Text15,
          {
            style: {
              fontSize: t.fontSize.sm,
              fontWeight: selected || today ? t.fontWeight.semibold : t.fontWeight.regular,
              color: selected ? t.color.text.onBrand : disabled ? t.color.text.disabled : t.color.text.primary
            }
          },
          cell.date.getDate()
        )
      )
    );
  }))));
}

// src/components/DatePicker/TimePickerWheels.tsx
import React24, { useCallback as useCallback3, useMemo as useMemo10 } from "react";
import { View as View22, Text as Text16, ScrollView as ScrollView2, Pressable as Pressable7 } from "react-native";
import { useTokens as useTokens16 } from "@truongdq01/headless";
var ROW = 40;
var VISIBLE = 5;
function pad2(n) {
  return n.toString().padStart(2, "0");
}
function TimePickerWheels({ value, onChange }) {
  const t = useTokens16();
  const h = value.getHours();
  const m = value.getMinutes();
  const hours = useMemo10(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo10(() => Array.from({ length: 60 }, (_, i) => i), []);
  const setHM = useCallback3(
    (nh, nm) => {
      const d = new Date(value);
      d.setHours(nh, nm, 0, 0);
      onChange(d);
    },
    [value, onChange]
  );
  const col = (label, child) => /* @__PURE__ */ React24.createElement(View22, { style: { width: 80 } }, /* @__PURE__ */ React24.createElement(
    Text16,
    {
      style: {
        textAlign: "center",
        fontSize: t.fontSize.xs,
        fontWeight: t.fontWeight.medium,
        color: t.color.text.tertiary,
        marginBottom: 4
      }
    },
    label
  ), /* @__PURE__ */ React24.createElement(ScrollView2, { style: { height: ROW * VISIBLE }, showsVerticalScrollIndicator: false }, child));
  return /* @__PURE__ */ React24.createElement(
    View22,
    {
      style: {
        flexDirection: "row",
        gap: t.spacing[4],
        justifyContent: "center",
        paddingVertical: t.spacing[3]
      }
    },
    col(
      "Hour",
      hours.map((hour) => /* @__PURE__ */ React24.createElement(
        Pressable7,
        {
          key: hour,
          onPress: () => setHM(hour, m),
          style: {
            height: ROW,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: t.radius.md,
            backgroundColor: hour === h ? t.color.brand.subtle : "transparent"
          }
        },
        /* @__PURE__ */ React24.createElement(
          Text16,
          {
            style: {
              fontSize: t.fontSize.lg,
              fontWeight: hour === h ? t.fontWeight.semibold : t.fontWeight.regular,
              color: hour === h ? t.color.brand.text : t.color.text.primary
            }
          },
          pad2(hour)
        )
      ))
    ),
    col(
      "Min",
      minutes.map((minute) => /* @__PURE__ */ React24.createElement(
        Pressable7,
        {
          key: minute,
          onPress: () => setHM(h, minute),
          style: {
            height: ROW,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: t.radius.md,
            backgroundColor: minute === m ? t.color.brand.subtle : "transparent"
          }
        },
        /* @__PURE__ */ React24.createElement(
          Text16,
          {
            style: {
              fontSize: t.fontSize.lg,
              fontWeight: minute === m ? t.fontWeight.semibold : t.fontWeight.regular,
              color: minute === m ? t.color.brand.text : t.color.text.primary
            }
          },
          pad2(minute)
        )
      ))
    )
  );
}

// src/components/DatePicker/DatePicker.tsx
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
  clearable = true,
  pickerStyle: pickerStyleProp,
  locale,
  timeZoneOffsetInMinutes,
  timeZoneOffsetInSeconds,
  timeZoneName
}) {
  const { input } = useComponentTokens21();
  const tokens = useTokens17();
  const insets = useSafeAreaInsets2();
  const { size: iconSize, color: iconColor } = useIconStyle4("input");
  const [showPicker, setShowPicker] = useState4(false);
  const [selectedPreset, setSelectedPreset] = useState4(null);
  const [pickerDraft, setPickerDraft] = useState4(() => date ?? /* @__PURE__ */ new Date());
  const [yearPick, setYearPick] = useState4(false);
  const initDate = date ?? /* @__PURE__ */ new Date();
  const [calMonth, setCalMonth] = useState4(initDate.getMonth());
  const [calYear, setCalYear] = useState4(initDate.getFullYear());
  const effectivePickerStyle = pickerStyleProp ?? "calendar";
  const yearOptions = useMemo11(() => Array.from({ length: 12 }, (_, i) => calYear - 5 + i), [calYear]);
  const modalTitle = mode === "time" ? "Select time" : mode === "datetime" ? "Select date & time" : "Select date";
  const handleCalendarMonthChange = (m, y) => {
    setCalMonth(m);
    setCalYear(y);
  };
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
    if (disabled) return;
    const ref = date ?? /* @__PURE__ */ new Date();
    setPickerDraft(ref);
    setCalMonth(ref.getMonth());
    setCalYear(ref.getFullYear());
    setYearPick(false);
    setShowPicker(true);
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
    if (React25.isValidElement(node)) {
      return React25.cloneElement(node, {
        size: node.props.size ?? iconSize,
        color: node.props.color ?? iconColor
      });
    }
    return node;
  };
  const pickerComponent = showPicker ? /* @__PURE__ */ React25.createElement(
    DateTimePicker,
    {
      value: date ?? /* @__PURE__ */ new Date(),
      mode,
      display: Platform.OS === "ios" ? "spinner" : "default",
      onChange: handleChange,
      minimumDate,
      maximumDate,
      locale,
      timeZoneOffsetInMinutes,
      timeZoneOffsetInSeconds,
      timeZoneName
    }
  ) : null;
  return /* @__PURE__ */ React25.createElement(View23, { style: { gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 } }, label && /* @__PURE__ */ React25.createElement(Text17, { style: input.label }, label), presets && presets.length > 0 && /* @__PURE__ */ React25.createElement(View23, { style: { flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" } }, presets.map((preset) => /* @__PURE__ */ React25.createElement(
    Pressable8,
    {
      key: preset,
      onPress: () => handlePresetPress(preset),
      disabled,
      style: ({ pressed }) => [
        {
          paddingHorizontal: tokens.spacing[3],
          paddingVertical: tokens.spacing[2],
          backgroundColor: selectedPreset === preset ? tokens.color.brand.default : tokens.color.bg.muted,
          borderRadius: tokens.radius.full
        },
        { opacity: disabled || pressed ? 0.6 : 1 }
      ]
    },
    /* @__PURE__ */ React25.createElement(
      Text17,
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
  ))), /* @__PURE__ */ React25.createElement(
    Pressable8,
    {
      onPress: handlePressTrigger,
      disabled,
      style: [
        input.container,
        { height: 48 },
        error && input.state.error,
        { opacity: disabled ? 0.6 : 1 }
      ]
    },
    icon && renderIcon(icon),
    /* @__PURE__ */ React25.createElement(
      Text17,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: date ? tokens.color.text.primary : tokens.color.text.tertiary
        }
      },
      displayValue
    ),
    clearable && date && /* @__PURE__ */ React25.createElement(Pressable8, { onPress: handleClear, hitSlop: 8 }, /* @__PURE__ */ React25.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" })),
    /* @__PURE__ */ React25.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "calendar" })
  ), error && /* @__PURE__ */ React25.createElement(Text17, { style: input.errorText }, error), effectivePickerStyle === "calendar" && showPicker && /* @__PURE__ */ React25.createElement(Modal3, { transparent: true, animationType: "slide", visible: showPicker, onRequestClose: () => {
    setShowPicker(false);
    setYearPick(false);
  } }, /* @__PURE__ */ React25.createElement(View23, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ React25.createElement(
    Pressable8,
    {
      style: StyleSheet5.absoluteFill,
      onPress: () => {
        setShowPicker(false);
        setYearPick(false);
      },
      accessibilityLabel: "Dismiss"
    }
  ), /* @__PURE__ */ React25.createElement(
    View23,
    {
      style: {
        backgroundColor: tokens.color.surface.default,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
      }
    },
    /* @__PURE__ */ React25.createElement(View23, { style: { alignItems: "center", paddingVertical: 10 } }, /* @__PURE__ */ React25.createElement(View23, { style: { width: 36, height: 4, borderRadius: 2, backgroundColor: tokens.color.border.subtle } })),
    /* @__PURE__ */ React25.createElement(View23, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 12 } }, /* @__PURE__ */ React25.createElement(Text17, { style: { fontSize: tokens.fontSize.lg, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary } }, modalTitle), /* @__PURE__ */ React25.createElement(Pressable8, { onPress: () => {
      setShowPicker(false);
      setYearPick(false);
    }, hitSlop: 12, accessibilityRole: "button", accessibilityLabel: "Close" }, /* @__PURE__ */ React25.createElement(Icon, { name: "close", size: 22, color: tokens.color.text.secondary }))),
    yearPick && mode !== "time" ? /* @__PURE__ */ React25.createElement(View23, { style: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2], justifyContent: "center", paddingHorizontal: 16, paddingBottom: tokens.spacing[3] } }, yearOptions.map((y) => /* @__PURE__ */ React25.createElement(
      Pressable8,
      {
        key: y,
        onPress: () => {
          setCalYear(y);
          setYearPick(false);
        },
        style: {
          paddingHorizontal: tokens.spacing[3],
          paddingVertical: tokens.spacing[2],
          borderRadius: tokens.radius.md,
          backgroundColor: y === calYear ? tokens.color.brand.subtle : tokens.color.bg.muted
        }
      },
      /* @__PURE__ */ React25.createElement(
        Text17,
        {
          style: {
            fontSize: tokens.fontSize.sm,
            fontWeight: tokens.fontWeight.semibold,
            color: y === calYear ? tokens.color.brand.text : tokens.color.text.primary
          }
        },
        y
      )
    ))) : /* @__PURE__ */ React25.createElement(React25.Fragment, null, (mode === "date" || mode === "datetime") && /* @__PURE__ */ React25.createElement(View23, { style: { paddingHorizontal: 16 } }, /* @__PURE__ */ React25.createElement(
      CalendarGrid,
      {
        month: calMonth,
        year: calYear,
        selectedDate: pickerDraft,
        onSelectDate: (d) => {
          setPickerDraft((prev) => {
            const next = new Date(prev);
            next.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
            return next;
          });
          setSelectedPreset(null);
        },
        onMonthChange: handleCalendarMonthChange,
        minimumDate,
        maximumDate,
        locale,
        onHeaderPress: () => setYearPick(true)
      }
    )), (mode === "time" || mode === "datetime") && /* @__PURE__ */ React25.createElement(TimePickerWheels, { value: pickerDraft, onChange: setPickerDraft }), (mode === "date" || mode === "datetime") && /* @__PURE__ */ React25.createElement(View23, { style: { paddingHorizontal: 16, marginTop: 12 } }, /* @__PURE__ */ React25.createElement(
      Pressable8,
      {
        onPress: () => {
          const now = /* @__PURE__ */ new Date();
          setPickerDraft(now);
          setCalMonth(now.getMonth());
          setCalYear(now.getFullYear());
          setSelectedPreset(null);
        },
        style: {
          alignItems: "center",
          paddingVertical: tokens.spacing[3],
          borderRadius: tokens.radius.lg,
          backgroundColor: tokens.color.brand.subtle
        }
      },
      /* @__PURE__ */ React25.createElement(Text17, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.text } }, "Today")
    ))),
    /* @__PURE__ */ React25.createElement(
      View23,
      {
        style: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: tokens.spacing[3],
          marginTop: tokens.spacing[2],
          borderTopWidth: StyleSheet5.hairlineWidth,
          borderTopColor: tokens.color.border.subtle,
          paddingBottom: Math.max(insets.bottom, tokens.spacing[3])
        }
      },
      /* @__PURE__ */ React25.createElement(
        Pressable8,
        {
          onPress: () => {
            setShowPicker(false);
            setYearPick(false);
          },
          hitSlop: 12,
          accessibilityRole: "button",
          accessibilityLabel: "Cancel"
        },
        /* @__PURE__ */ React25.createElement(Text17, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.secondary, fontWeight: tokens.fontWeight.medium } }, "Cancel")
      ),
      /* @__PURE__ */ React25.createElement(
        Pressable8,
        {
          onPress: () => {
            onChange(pickerDraft);
            setSelectedPreset(null);
            setShowPicker(false);
            setYearPick(false);
          },
          hitSlop: 12,
          accessibilityRole: "button",
          accessibilityLabel: "Confirm"
        },
        /* @__PURE__ */ React25.createElement(Text17, { style: { fontSize: tokens.fontSize.md, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Confirm")
      )
    )
  ))), effectivePickerStyle !== "calendar" && Platform.OS === "ios" && showPicker && /* @__PURE__ */ React25.createElement(Modal3, { transparent: true, animationType: "slide", visible: showPicker }, /* @__PURE__ */ React25.createElement(View23, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ React25.createElement(View23, { style: { backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }, /* @__PURE__ */ React25.createElement(View23, { style: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 } }, /* @__PURE__ */ React25.createElement(Pressable8, { onPress: () => setShowPicker(false), hitSlop: 12 }, /* @__PURE__ */ React25.createElement(Text17, { style: { fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Done"))), pickerComponent))), effectivePickerStyle !== "calendar" && Platform.OS === "android" && pickerComponent);
}

// src/components/Dialog/Dialog.tsx
import React26 from "react";
import { Modal as Modal4, View as View24, Pressable as Pressable9, StyleSheet as StyleSheet6, Text as Text18 } from "react-native";
import { useComponentTokens as useComponentTokens22, useTokens as useTokens18 } from "@truongdq01/headless";
function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  fullWidth = false,
  accessibilityLabel = "Dialog",
  backdropAccessibilityLabel = "Dismiss dialog"
}) {
  const { dialog, modal } = useComponentTokens22();
  const tokens = useTokens18();
  if (!open) return null;
  return /* @__PURE__ */ React26.createElement(Modal4, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React26.createElement(View24, { style: modal.overlay }, /* @__PURE__ */ React26.createElement(
    Pressable9,
    {
      style: StyleSheet6.absoluteFill,
      onPress: onClose,
      accessibilityRole: "button",
      accessibilityLabel: backdropAccessibilityLabel,
      accessibilityHint: "Closes the dialog"
    }
  ), /* @__PURE__ */ React26.createElement(
    View24,
    {
      accessibilityViewIsModal: true,
      accessibilityRole: "none",
      accessibilityLabel,
      style: [
        modal.container,
        {
          padding: tokens.spacing[6],
          width: fullWidth ? "90%" : "80%"
        }
      ]
    },
    title && /* @__PURE__ */ React26.createElement(View24, { style: { marginBottom: tokens.spacing[4] } }, typeof title === "string" ? /* @__PURE__ */ React26.createElement(Text18, { style: { fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary } }, title) : title),
    /* @__PURE__ */ React26.createElement(View24, { style: { marginBottom: actions ? tokens.spacing[6] : 0 } }, children),
    actions && /* @__PURE__ */ React26.createElement(View24, { style: { flexDirection: "row", justifyContent: "flex-end", gap: tokens.spacing[2] } }, actions)
  )));
}

// src/components/Divider/Divider.tsx
import React27 from "react";
import { View as View25, Text as Text19 } from "react-native";
import { useComponentTokens as useComponentTokens23, useTokens as useTokens19 } from "@truongdq01/headless";
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const { divider } = useComponentTokens23();
  const tokens = useTokens19();
  const lineColor = emphasis ? tokens.color.border.strong : divider.color;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: divider.margin,
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ React27.createElement(
      View25,
      {
        style: {
          width: divider.thickness,
          alignSelf: "stretch",
          backgroundColor: lineColor,
          marginHorizontal: tokens.spacing[2]
        }
      }
    );
  }
  if (label) {
    return /* @__PURE__ */ React27.createElement(
      View25,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ React27.createElement(View25, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } }),
      /* @__PURE__ */ React27.createElement(
        Text19,
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
      /* @__PURE__ */ React27.createElement(View25, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ React27.createElement(
    View25,
    {
      style: {
        height: divider.thickness,
        backgroundColor: lineColor,
        marginVertical: verticalMargin
      }
    }
  );
}

// src/components/Drawer/Drawer.tsx
import React28, { useEffect as useEffect2 } from "react";
import { Modal as Modal5, View as View26, Pressable as Pressable10, StyleSheet as StyleSheet7, Dimensions as Dimensions2 } from "react-native";
import Animated11, {
  useSharedValue as useSharedValue5,
  useAnimatedStyle as useAnimatedStyle6,
  withSpring as withSpring3,
  runOnJS
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens24, useTokens as useTokens20, useReduceMotionEnabled as useReduceMotionEnabled4 } from "@truongdq01/headless";
import { spring as spring2 } from "@truongdq01/tokens";
function Drawer({
  open,
  onClose,
  anchor = "left",
  children,
  accessibilityLabel = "Drawer",
  backdropAccessibilityLabel = "Dismiss drawer"
}) {
  const { drawer } = useComponentTokens24();
  const tokens = useTokens20();
  const reduceMotion = useReduceMotionEnabled4();
  const { width: windowWidth, height: windowHeight } = Dimensions2.get("window");
  const isVertical = anchor === "top" || anchor === "bottom";
  const size = isVertical ? windowHeight * 0.4 : 280;
  const progress = useSharedValue5(0);
  const [mounted, setMounted] = React28.useState(open);
  useEffect2(() => {
    if (open) {
      setMounted(true);
      if (reduceMotion) {
        progress.value = 1;
      } else {
        progress.value = withSpring3(1, spring2.snappy);
      }
    } else {
      if (reduceMotion) {
        progress.value = 0;
        setMounted(false);
      } else {
        progress.value = withSpring3(0, spring2.snappy, (finished) => {
          if (finished) runOnJS(setMounted)(false);
        });
      }
    }
  }, [open, reduceMotion]);
  const animatedStyle = useAnimatedStyle6(() => {
    const translate = (1 - progress.value) * size;
    let transform = [];
    if (anchor === "left") transform = [{ translateX: -translate }];
    else if (anchor === "right") transform = [{ translateX: translate }];
    else if (anchor === "top") transform = [{ translateY: -translate }];
    else if (anchor === "bottom") transform = [{ translateY: translate }];
    return {
      transform
    };
  });
  const backdropStyle = useAnimatedStyle6(() => ({
    opacity: progress.value
  }));
  if (!mounted) return null;
  const containerStyle = {
    position: "absolute",
    ...anchor === "left" ? { left: 0, top: 0, bottom: 0, width: size } : {},
    ...anchor === "right" ? { right: 0, top: 0, bottom: 0, width: size } : {},
    ...anchor === "top" ? { top: 0, left: 0, right: 0, height: size } : {},
    ...anchor === "bottom" ? { bottom: 0, left: 0, right: 0, height: size } : {}
  };
  return /* @__PURE__ */ React28.createElement(Modal5, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React28.createElement(View26, { style: { flex: 1 } }, /* @__PURE__ */ React28.createElement(Animated11.View, { style: [StyleSheet7.absoluteFill, drawer.overlay, backdropStyle] }, /* @__PURE__ */ React28.createElement(
    Pressable10,
    {
      style: { flex: 1 },
      onPress: onClose,
      accessibilityRole: "button",
      accessibilityLabel: backdropAccessibilityLabel,
      accessibilityHint: "Closes the drawer"
    }
  )), /* @__PURE__ */ React28.createElement(
    Animated11.View,
    {
      accessibilityViewIsModal: true,
      accessibilityRole: "none",
      accessibilityLabel,
      style: [
        drawer.container,
        containerStyle,
        animatedStyle
      ]
    },
    children
  )));
}

// src/components/EmptyState/EmptyState.tsx
import React29 from "react";
import { View as View27, Text as Text20 } from "react-native";
import { useComponentTokens as useComponentTokens25, useTokens as useTokens21 } from "@truongdq01/headless";
function variantSemantics(variant, tokens) {
  switch (variant) {
    case "error":
    case "permission":
      return { iconColor: tokens.color.error.icon, wrapBg: tokens.color.error.bg };
    case "offline":
      return { iconColor: tokens.color.warning.icon, wrapBg: tokens.color.warning.bg };
    case "search":
      return { iconColor: tokens.color.text.tertiary, wrapBg: tokens.color.bg.muted };
    case "empty":
      return { iconColor: tokens.color.brand.text, wrapBg: tokens.color.brand.subtle };
    default:
      return { iconColor: tokens.color.brand.text, wrapBg: tokens.color.brand.subtle };
  }
}
var VARIANT_DEFAULTS = {
  search: {
    title: "No results found",
    description: "Try different keywords or filters.",
    iconName: "search"
  },
  error: {
    title: "Something went wrong",
    description: "We couldn't load this content. Try again.",
    iconName: "error"
  },
  offline: {
    title: "You're offline",
    description: "Check your connection and try again.",
    iconName: "warning"
  },
  permission: {
    title: "Access denied",
    description: "You don't have permission to view this.",
    iconName: "lock"
  },
  empty: {
    title: "Nothing here yet",
    description: "When there is content, it will show up here.",
    iconName: "package"
  }
};
function EmptyState({
  title,
  description,
  icon,
  action,
  size = "md",
  variant = "default",
  illustration
}) {
  const { emptyState } = useComponentTokens25();
  const tokens = useTokens21();
  const meta = variant !== "default" ? VARIANT_DEFAULTS[variant] : null;
  const resolvedTitle = title ?? meta?.title;
  const resolvedDescription = description ?? meta?.description;
  const { iconColor, wrapBg } = variantSemantics(variant, tokens);
  const iconSize = Math.round(emptyState.icon.size / 2);
  const resolvedIcon = icon ?? (meta ? /* @__PURE__ */ React29.createElement(Icon, { name: meta.iconName, size: iconSize, color: iconColor }) : null);
  const sizePad = emptyState.containerSize[size];
  const titleSize = emptyState.titleSize[size];
  const descSize = emptyState.descriptionSize[size];
  return /* @__PURE__ */ React29.createElement(
    View27,
    {
      accessibilityRole: "none",
      style: [
        emptyState.container,
        { padding: sizePad.padding, gap: sizePad.gap }
      ]
    },
    illustration && /* @__PURE__ */ React29.createElement(View27, { style: { marginBottom: tokens.spacing[2] } }, illustration),
    resolvedIcon && /* @__PURE__ */ React29.createElement(View27, { style: [emptyState.iconWrap, { backgroundColor: wrapBg }] }, React29.isValidElement(resolvedIcon) ? React29.cloneElement(resolvedIcon, {
      size: resolvedIcon.props.size ?? iconSize,
      color: resolvedIcon.props.color ?? iconColor
    }) : resolvedIcon),
    resolvedTitle && /* @__PURE__ */ React29.createElement(Text20, { style: [emptyState.title, titleSize] }, resolvedTitle),
    resolvedDescription && /* @__PURE__ */ React29.createElement(Text20, { style: [emptyState.description, descSize] }, resolvedDescription),
    action && /* @__PURE__ */ React29.createElement(View27, { style: { marginTop: tokens.spacing[4] } }, action)
  );
}

// src/components/Fab/Fab.tsx
import React30 from "react";
import { View as View28, Text as Text21, StyleSheet as StyleSheet8 } from "react-native";
import Animated12 from "react-native-reanimated";
import { GestureDetector as GestureDetector5 } from "react-native-gesture-handler";
import { usePressable as usePressable4, useComponentTokens as useComponentTokens26 } from "@truongdq01/headless";
function Fab({
  icon,
  label,
  onPress,
  disabled = false,
  color = "primary",
  size = "md",
  variant = "circular",
  accessibilityLabel
}) {
  const { fab } = useComponentTokens26();
  const { gesture, animatedStyle, accessibilityProps } = usePressable4({
    onPress,
    disabled,
    feedbackMode: "scale",
    accessibilityLabel: accessibilityLabel ?? label ?? (typeof icon === "string" ? icon : "FAB"),
    accessibilityRole: "button"
  });
  const isExtended = variant === "extended" && !!label;
  const baseColor = color === "primary" ? fab.color.primary.bg : fab.color.secondary.bg;
  const textColor = "#FFFFFF";
  const sizeMap = {
    sm: { size: 40, iconSize: 20 },
    md: { size: 56, iconSize: 24 },
    lg: { size: 72, iconSize: 28 }
  };
  const s = sizeMap[size];
  const containerStyle = [
    fab.container,
    {
      backgroundColor: baseColor,
      height: s.size,
      minWidth: s.size,
      borderRadius: s.size / 2,
      paddingHorizontal: isExtended ? 20 : 0
    },
    disabled && { opacity: 0.5 },
    animatedStyle
  ];
  return /* @__PURE__ */ React30.createElement(GestureDetector5, { gesture }, /* @__PURE__ */ React30.createElement(Animated12.View, { style: containerStyle, ...accessibilityProps }, /* @__PURE__ */ React30.createElement(View28, { style: styles5.content }, icon && /* @__PURE__ */ React30.createElement(Icon, { size: s.iconSize, color: textColor }, icon), isExtended && /* @__PURE__ */ React30.createElement(Text21, { style: [styles5.label, { marginLeft: icon ? 8 : 0 }] }, label))));
}
var styles5 = StyleSheet8.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    textTransform: "uppercase"
  }
});

// src/components/Form/Form.tsx
import React31, { createContext as createContext3, useContext as useContext3, useCallback as useCallback4 } from "react";
import { View as View29, ScrollView as ScrollView3, StyleSheet as StyleSheet9 } from "react-native";
import { useTokens as useTokens22 } from "@truongdq01/headless";
var FormContext = createContext3(null);
function useForm() {
  const context = useContext3(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a Form component");
  }
  return context;
}
function Form({
  initialValues = {},
  validate,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true,
  enableKeyboardAvoidingView = true,
  scrollable = true,
  style,
  testID = "form"
}) {
  const tokens = useTokens22();
  const [values, setValues] = React31.useState(initialValues);
  const [errors, setErrors] = React31.useState({});
  const [touched, setTouched] = React31.useState({});
  const [isSubmitting, setIsSubmitting] = React31.useState(false);
  const runValidation = useCallback4((currentValues) => {
    if (!validate) return {};
    try {
      return validate(currentValues);
    } catch (error) {
      console.error("Form validation error:", error);
      return {};
    }
  }, [validate]);
  const isValid = React31.useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);
  const setValue = useCallback4((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (validateOnChange) {
      setValues((current) => {
        const newErrors = runValidation({ ...current, [name]: value });
        setErrors(newErrors);
        return current;
      });
    }
  }, [validateOnChange, runValidation]);
  const setError = useCallback4((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);
  const setTouchedField = useCallback4((name, fieldTouched) => {
    setTouched((prev) => ({ ...prev, [name]: fieldTouched }));
    if (validateOnBlur && fieldTouched) {
      const newErrors = runValidation(values);
      setErrors(newErrors);
    }
  }, [validateOnBlur, runValidation, values]);
  const handleSubmit = useCallback4((callback) => {
    return async () => {
      if (isSubmitting) return;
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);
      const finalErrors = runValidation(values);
      setErrors(finalErrors);
      if (Object.keys(finalErrors).length > 0) {
        return;
      }
      setIsSubmitting(true);
      try {
        await callback(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, runValidation, isSubmitting]);
  const resetForm = useCallback4(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  const contextValue = {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setError,
    setTouched: setTouchedField,
    handleSubmit,
    resetForm
  };
  const formContent = /* @__PURE__ */ React31.createElement(View29, { style: [styles6.container, style], testID }, /* @__PURE__ */ React31.createElement(FormContext.Provider, { value: contextValue }, children));
  if (scrollable) {
    return /* @__PURE__ */ React31.createElement(
      ScrollView3,
      {
        contentContainerStyle: styles6.scrollContent,
        keyboardShouldPersistTaps: "handled",
        showsVerticalScrollIndicator: false
      },
      formContent
    );
  }
  return formContent;
}
var styles6 = StyleSheet9.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16
  }
});

// src/components/FormControl/FormControl.tsx
import React32, { createContext as createContext4, useContext as useContext4, useMemo as useMemo12 } from "react";
import { View as View30, Text as Text22, Pressable as Pressable11 } from "react-native";
import { useComponentTokens as useComponentTokens28, useTokens as useTokens23 } from "@truongdq01/headless";
var FormControlContext = createContext4(null);
function useFormControl() {
  return useContext4(FormControlContext);
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
  const { formControl } = useComponentTokens28();
  const tokens = useTokens23();
  const marginSize = useMemo12(() => {
    if (margin === "dense") return tokens.spacing[2];
    if (margin === "normal") return tokens.spacing[4];
    return 0;
  }, [margin, tokens]);
  const ctxValue = useMemo12(() => ({ error, required, disabled, focused, fullWidth, variant }), [error, required, disabled, focused, fullWidth, variant]);
  return /* @__PURE__ */ React32.createElement(FormControlContext.Provider, { value: ctxValue }, /* @__PURE__ */ React32.createElement(View30, { style: [formControl.container, { alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const { formControl } = useComponentTokens28();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : ctx?.disabled ? formControl.label.color + "80" : formControl.label.color;
  return /* @__PURE__ */ React32.createElement(Text22, { style: [formControl.label, { color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const { formControl } = useComponentTokens28();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : formControl.helperText.color;
  return /* @__PURE__ */ React32.createElement(Text22, { style: [formControl.helperText, { color }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const { formControl } = useComponentTokens28();
  const tokens = useTokens23();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = React32.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ React32.createElement(
    Pressable11,
    {
      onPress: onPress ?? control.props?.onPress,
      disabled: isDisabled,
      style: [
        {
          flexDirection: isRow ? rowReverse ? "row-reverse" : "row" : colReverse ? "column-reverse" : "column",
          alignItems: isRow ? "center" : "flex-start",
          gap: tokens.spacing[2],
          opacity: isDisabled ? 0.6 : 1
        },
        style
      ]
    },
    controlElement,
    label ? /* @__PURE__ */ React32.createElement(Text22, { style: formControl.label }, label) : null
  );
}

// src/components/FormField/FormField.tsx
import React34 from "react";
import { View as View31, Text as Text23, StyleSheet as StyleSheet10 } from "react-native";
import { useComponentTokens as useComponentTokens29, useTokens as useTokens24 } from "@truongdq01/headless";

// src/components/Input/PasswordInput.tsx
import React33, { useState as useState5 } from "react";
import { Pressable as Pressable12 } from "react-native";
import { useIconStyle as useIconStyle5 } from "@truongdq01/headless";
function PasswordInput(props) {
  const [show, setShow] = useState5(false);
  const { size, color } = useIconStyle5("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ React33.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ React33.createElement(
        Pressable12,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        /* @__PURE__ */ React33.createElement(Icon, { size, color, name: show ? "eyeOff" : "eye" })
      )
    }
  );
}

// src/components/FormField/FormField.tsx
function isInputLikeElement(el) {
  const C = el.type;
  return C === Input || C === PasswordInput;
}
function enhanceChildForGroupedField(child, label) {
  if (!label || !React34.isValidElement(child)) return child;
  if (!isInputLikeElement(child)) return child;
  const props = child.props;
  return React34.cloneElement(child, {
    floatingLabel: true,
    label,
    placeholder: props.placeholder ?? label
  });
}
function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children
}) {
  const { formField, formControl, formGroup } = useComponentTokens29();
  const tokens = useTokens24();
  const groupVariant = useFormGroupVariant();
  const isGrouped = groupVariant === "grouped";
  const childEl = React34.isValidElement(children) ? children : null;
  const showFloatingClone = Boolean(isGrouped && label && childEl && isInputLikeElement(childEl));
  const showLabelRow = Boolean((label || labelTrailing) && !showFloatingClone);
  const renderedChild = showFloatingClone ? enhanceChildForGroupedField(children, label) : children;
  const showMessagesBelowField = !isGrouped;
  return /* @__PURE__ */ React34.createElement(
    View31,
    {
      style: [
        formField.container,
        isGrouped && formField.groupedContainer,
        isGrouped && {
          paddingHorizontal: tokens.spacing[3],
          paddingVertical: tokens.spacing[2]
        }
      ]
    },
    showLabelRow && (label || labelTrailing) ? /* @__PURE__ */ React34.createElement(
      View31,
      {
        style: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing[1.5]
        }
      },
      label ? /* @__PURE__ */ React34.createElement(View31, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ React34.createElement(Text23, { style: formControl.label }, label), required ? /* @__PURE__ */ React34.createElement(
        Text23,
        {
          style: {
            color: tokens.color.error.icon,
            fontSize: tokens.fontSize.sm,
            fontWeight: tokens.fontWeight.semibold
          }
        },
        "*"
      ) : null) : null,
      labelTrailing
    ) : null,
    renderedChild,
    showMessagesBelowField ? error ? /* @__PURE__ */ React34.createElement(
      Text23,
      {
        style: [formControl.errorText, { marginTop: tokens.spacing[2] }],
        accessibilityRole: "alert",
        accessibilityLiveRegion: "polite"
      },
      error
    ) : helperText ? /* @__PURE__ */ React34.createElement(Text23, { style: [formControl.helperText, { marginTop: tokens.spacing[2] }] }, helperText) : null : null
  );
}
function FormGroup({
  children,
  gap = "md",
  variant = "standard",
  footer,
  error
}) {
  const tokens = useTokens24();
  const { formGroup } = useComponentTokens29();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  if (variant === "standard") {
    return /* @__PURE__ */ React34.createElement(FormGroupContext.Provider, { value: "standard" }, /* @__PURE__ */ React34.createElement(View31, { style: { gap: gapSize } }, children));
  }
  const items = React34.Children.toArray(children).filter(Boolean);
  return /* @__PURE__ */ React34.createElement(FormGroupContext.Provider, { value: "grouped" }, /* @__PURE__ */ React34.createElement(View31, null, /* @__PURE__ */ React34.createElement(View31, { style: formGroup.grouped.card }, items.map((child, i) => /* @__PURE__ */ React34.createElement(React34.Fragment, { key: i }, child, i < items.length - 1 ? /* @__PURE__ */ React34.createElement(
    View31,
    {
      style: {
        height: StyleSheet10.hairlineWidth,
        backgroundColor: tokens.color.border.default,
        marginLeft: tokens.spacing[3]
      }
    }
  ) : null))), error ? /* @__PURE__ */ React34.createElement(Text23, { style: formGroup.errorBelowCard }, error) : null, footer ? /* @__PURE__ */ React34.createElement(Text23, { style: formGroup.footer }, footer) : null));
}

// src/components/GlassCard/GlassCard.tsx
import React35, { useMemo as useMemo13 } from "react";
import { View as View32, StyleSheet as StyleSheet11 } from "react-native";
import { useTokens as useTokens25 } from "@truongdq01/headless";
var BlurView = null;
try {
  BlurView = __require("expo-blur").BlurView;
} catch {
}
function GlassCard({
  intensity = 40,
  tint,
  borderRadius,
  style,
  children,
  ...rest
}) {
  const t = useTokens25();
  const isDark = t.color.bg.default !== "#F8FAFC";
  const resolvedTint = tint ?? (isDark ? "dark" : "light");
  const resolvedRadius = borderRadius ?? t.radius.xl;
  const containerStyle = useMemo13(
    () => ({
      borderRadius: resolvedRadius,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: t.color.surface.glassBorder ?? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.3)")
    }),
    [resolvedRadius, t.color.surface.glassBorder, isDark]
  );
  const fallbackStyle = useMemo13(
    () => ({
      ...StyleSheet11.absoluteFillObject,
      backgroundColor: t.color.surface.glass ?? (isDark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.72)")
    }),
    [t.color.surface.glass, isDark]
  );
  return /* @__PURE__ */ React35.createElement(View32, { style: [containerStyle, style], ...rest }, BlurView ? /* @__PURE__ */ React35.createElement(
    BlurView,
    {
      intensity,
      tint: resolvedTint,
      style: StyleSheet11.absoluteFill
    }
  ) : /* @__PURE__ */ React35.createElement(View32, { style: fallbackStyle }), /* @__PURE__ */ React35.createElement(View32, { style: styles7.content }, children));
}
var styles7 = StyleSheet11.create({
  content: {
    position: "relative",
    zIndex: 1
  }
});

// src/components/Gradient/Gradient.tsx
import React36, { useMemo as useMemo14 } from "react";
import { View as View33, StyleSheet as StyleSheet12 } from "react-native";
import { primitive } from "@truongdq01/tokens";
var ExpoLinearGradient = null;
try {
  ExpoLinearGradient = __require("expo-linear-gradient").LinearGradient;
} catch {
}
function Gradient({
  preset,
  colors: colorsProp,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
  ...rest
}) {
  const resolvedColors = useMemo14(() => {
    if (colorsProp && colorsProp.length >= 2) return colorsProp;
    if (preset && primitive.gradient[preset]) return primitive.gradient[preset];
    return primitive.gradient.brand;
  }, [colorsProp, preset]);
  if (ExpoLinearGradient) {
    return /* @__PURE__ */ React36.createElement(
      ExpoLinearGradient,
      {
        colors: resolvedColors,
        start,
        end,
        style: [styles8.fill, style],
        ...rest
      },
      children
    );
  }
  return /* @__PURE__ */ React36.createElement(View33, { style: [{ backgroundColor: resolvedColors[0] }, style], ...rest }, children);
}
var styles8 = StyleSheet12.create({
  fill: { flex: 1 }
});

// src/components/Grid/Grid.tsx
import React37 from "react";
import { View as View34 } from "react-native";
import { useComponentTokens as useComponentTokens30 } from "@truongdq01/headless";
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
  const { grid } = useComponentTokens30();
  const resolveGap = (s) => {
    if (s === void 0) return void 0;
    return typeof s === "number" ? s : grid.gap[s];
  };
  const gap = resolveGap(spacing) ?? 0;
  const rowGap = resolveGap(rowSpacing) ?? gap;
  const colGap = resolveGap(columnSpacing) ?? gap;
  if (container) {
    return /* @__PURE__ */ React37.createElement(
      View34,
      {
        style: [
          grid.container,
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
  return /* @__PURE__ */ React37.createElement(
    View34,
    {
      style: [itemStyle, style]
    },
    children
  );
}

// src/components/Image/Image.tsx
import React38, { useState as useState6 } from "react";
import { Image as RNImage, View as View35, StyleSheet as StyleSheet13 } from "react-native";
import Animated13, {
  useAnimatedStyle as useAnimatedStyle7,
  withTiming as withTiming5,
  useSharedValue as useSharedValue6
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens31 } from "@truongdq01/headless";
var AnimatedImage = Animated13.createAnimatedComponent(RNImage);
function RnImage({ showPlaceholder = true, style, onLoad, ...props }) {
  const { image } = useComponentTokens31();
  const [isLoaded, setIsLoaded] = useState6(false);
  const opacity = useSharedValue6(0);
  const handleLoad = (e) => {
    setIsLoaded(true);
    opacity.value = withTiming5(1, { duration: 300 });
    onLoad?.(e);
  };
  const imageStyle = useAnimatedStyle7(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ React38.createElement(View35, { style: [styles9.container, style, { backgroundColor: showPlaceholder && !isLoaded ? image.placeholder.backgroundColor : "transparent" }] }, /* @__PURE__ */ React38.createElement(
    AnimatedImage,
    {
      ...props,
      onLoad: handleLoad,
      style: [StyleSheet13.absoluteFill, imageStyle, style]
    }
  ));
}
var styles9 = StyleSheet13.create({
  container: {
    overflow: "hidden",
    position: "relative"
  }
});

// src/components/ImageList/ImageList.tsx
import React39, { createContext as createContext5, useContext as useContext5, useMemo as useMemo15, useState as useState7 } from "react";
import { View as View36, Text as Text24, Dimensions as Dimensions3 } from "react-native";
import { useTokens as useTokens26, useComponentTokens as useComponentTokens32 } from "@truongdq01/headless";
var { width: SCREEN_WIDTH } = Dimensions3.get("window");
var ImageListContext = createContext5(null);
function useImageListContext() {
  return useContext5(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = useState7(SCREEN_WIDTH);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = useMemo15(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ React39.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ React39.createElement(View36, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
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
  return /* @__PURE__ */ React39.createElement(View36, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const { imageList } = useComponentTokens32();
  const tokens = useTokens26();
  return /* @__PURE__ */ React39.createElement(
    View36,
    {
      style: [
        imageList.bar,
        {
          position: "absolute",
          left: 0,
          right: 0
        },
        position === "top" ? { top: 0 } : { bottom: 0 },
        style
      ]
    },
    /* @__PURE__ */ React39.createElement(View36, { style: { flex: 1 } }, title ? /* @__PURE__ */ React39.createElement(Text24, { style: imageList.bar.title }, title) : null, subtitle ? /* @__PURE__ */ React39.createElement(Text24, { style: imageList.bar.subtitle }, subtitle) : null),
    actionIcon
  );
}

// src/components/LinearProgress/LinearProgress.tsx
import React40 from "react";
import { View as View37, StyleSheet as StyleSheet14 } from "react-native";
import Animated14, { useAnimatedStyle as useAnimatedStyle8 } from "react-native-reanimated";
import { useTokens as useTokens27, useComponentTokens as useComponentTokens33 } from "@truongdq01/headless";
function clamp2(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}
function LinearProgress({
  value = 0,
  variant = "indeterminate",
  valueBuffer = 0,
  color = "primary",
  trackColor,
  thickness,
  style
}) {
  const tokens = useTokens27();
  const { linearProgress } = useComponentTokens33();
  const progressValue = clamp2(value);
  const barColor = {
    primary: linearProgress.indicator.backgroundColor,
    brand: linearProgress.variant.brand.indicator.backgroundColor,
    accent: linearProgress.variant.accent.indicator.backgroundColor,
    success: linearProgress.variant.success.indicator.backgroundColor,
    error: linearProgress.variant.error.indicator.backgroundColor,
    secondary: tokens.color.text.secondary,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color] || linearProgress.indicator.backgroundColor;
  const containerStyle = [
    styles10.container,
    linearProgress.track,
    { height: thickness ?? linearProgress.track.height, backgroundColor: trackColor ?? linearProgress.track.backgroundColor },
    style
  ];
  const determinateStyle = useAnimatedStyle8(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ React40.createElement(View37, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ React40.createElement(
    Animated14.View,
    {
      style: [
        styles10.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ React40.createElement(React40.Fragment, null, variant === "buffer" && /* @__PURE__ */ React40.createElement(View37, { style: [styles10.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? tokens.color.bg.muted }] }), /* @__PURE__ */ React40.createElement(
    Animated14.View,
    {
      style: [
        styles10.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles10 = StyleSheet14.create({
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

// src/components/Link/Link.tsx
import React41 from "react";
import { Text as Text25, Linking as Linking2 } from "react-native";
import { useComponentTokens as useComponentTokens34 } from "@truongdq01/headless";
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const { link } = useComponentTokens34();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ React41.createElement(
    Text25,
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
        link.text,
        { color: color ?? link.text.color, textDecorationLine: decoration },
        style
      ]
    },
    children
  );
}

// src/components/List/List.tsx
import React42, { createContext as createContext6, useContext as useContext6, useMemo as useMemo16 } from "react";
import { View as View38, Text as Text26, Pressable as Pressable13, FlatList as FlatList2 } from "react-native";
import { useTokens as useTokens28, useComponentTokens as useComponentTokens35 } from "@truongdq01/headless";
var ListContext = createContext6(null);
function useListContext() {
  return useContext6(ListContext);
}
function List2({ children, dense = false, disablePadding = false, subheader, style }) {
  const { list } = useComponentTokens35();
  const tokens = useTokens28();
  return /* @__PURE__ */ React42.createElement(ListContext.Provider, { value: { dense, disablePadding } }, /* @__PURE__ */ React42.createElement(View38, { style: [list.container, style] }, subheader && /* @__PURE__ */ React42.createElement(View38, { style: list.subheader }, typeof subheader === "string" ? /* @__PURE__ */ React42.createElement(Text26, { style: { fontSize: tokens.fontSize.sm, fontWeight: "600", color: tokens.color.text.tertiary } }, subheader) : subheader), children));
}
function ListItemInner({
  children,
  secondaryAction,
  onPress,
  disabled = false,
  selected = false,
  divider = false,
  style
}) {
  const { list } = useComponentTokens35();
  const tokens = useTokens28();
  const ctx = useListContext();
  const isDense = ctx?.dense;
  return /* @__PURE__ */ React42.createElement(
    Pressable13,
    {
      onPress,
      disabled,
      style: ({ pressed }) => [
        list.item,
        {
          paddingVertical: isDense ? tokens.spacing[2] : tokens.spacing[3],
          backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
          borderBottomWidth: divider ? 1 : 0,
          borderBottomColor: tokens.color.border.subtle,
          opacity: disabled ? 0.5 : 1
        },
        pressed && list.item.pressed,
        style
      ]
    },
    /* @__PURE__ */ React42.createElement(View38, { style: { flex: 1, flexDirection: "row", alignItems: "center" } }, children),
    secondaryAction && /* @__PURE__ */ React42.createElement(View38, { style: { marginLeft: tokens.spacing[2] } }, secondaryAction)
  );
}
var ListItem = React42.memo(ListItemInner);
function ListItemText({ primary, secondary }) {
  const { list } = useComponentTokens35();
  const tokens = useTokens28();
  const ctx = useListContext();
  return /* @__PURE__ */ React42.createElement(View38, { style: { flex: 1 } }, typeof primary === "string" ? /* @__PURE__ */ React42.createElement(Text26, { style: [list.itemText, ctx?.dense && { fontSize: tokens.fontSize.sm }] }, primary) : primary, secondary && (typeof secondary === "string" ? /* @__PURE__ */ React42.createElement(Text26, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary, marginTop: 2 } }, secondary) : secondary));
}
function ListItemIcon({ children }) {
  const tokens = useTokens28();
  return /* @__PURE__ */ React42.createElement(View38, { style: { marginRight: tokens.spacing[4], minWidth: 24, alignItems: "center" } }, children);
}
function ListData({
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
  ...listProps
}) {
  const ListImpl = useMemo16(() => {
    try {
      const mod = __require("@shopify/flash-list");
      return mod?.FlashList ?? FlatList2;
    } catch {
      return FlatList2;
    }
  }, []);
  return /* @__PURE__ */ React42.createElement(List2, { ...listProps }, /* @__PURE__ */ React42.createElement(
    ListImpl,
    {
      data,
      renderItem,
      estimatedItemSize,
      ...listProps,
      keyExtractor
    }
  ));
}

// src/components/Marquee/Marquee.tsx
import React43, { useEffect as useEffect3, useRef as useRef2 } from "react";
import { View as View39, StyleSheet as StyleSheet15 } from "react-native";
import Animated15, {
  useAnimatedStyle as useAnimatedStyle9,
  useSharedValue as useSharedValue7,
  withTiming as withTiming6,
  withRepeat,
  withSequence,
  cancelAnimation,
  Easing as Easing2
} from "react-native-reanimated";
import { useTokens as useTokens29 } from "@truongdq01/headless";
function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
  pauseOnPress = false,
  loop = true,
  delay = 0,
  fadeEdges = true,
  fadeColor,
  accessibilityLabel = "Scrolling content",
  testID = "marquee"
}) {
  const tokens = useTokens29();
  const containerRef = useRef2(null);
  const contentRef = useRef2(null);
  const translateX = useSharedValue7(0);
  const translateY = useSharedValue7(0);
  const isPaused = useSharedValue7(false);
  const animatedStyle = useAnimatedStyle9(() => {
    if (direction === "left" || direction === "right") {
      return {
        transform: [{ translateX: translateX.value }]
      };
    } else {
      return {
        transform: [{ translateY: translateY.value }]
      };
    }
  });
  const startAnimation = (containerWidth, contentWidth) => {
    if (contentWidth <= containerWidth) return;
    const distance = contentWidth - containerWidth;
    const duration = distance / speed * 1e3;
    const startValue = direction === "left" ? 0 : -distance;
    const endValue = direction === "left" ? -distance : 0;
    if (direction === "left" || direction === "right") {
      translateX.value = startValue;
    } else {
      translateY.value = startValue;
    }
    const animation = withTiming6(endValue, {
      duration,
      easing: Easing2.linear
    });
    const repeatedAnimation = loop ? withRepeat(
      withSequence(
        withTiming6(endValue, { duration, easing: Easing2.linear }),
        withTiming6(startValue, { duration: 0 })
        // Reset instantly
      ),
      -1,
      // Infinite
      false
    ) : animation;
    if (delay > 0) {
      setTimeout(() => {
        if (direction === "left" || direction === "right") {
          translateX.value = repeatedAnimation;
        } else {
          translateY.value = repeatedAnimation;
        }
      }, delay);
    } else {
      if (direction === "left" || direction === "right") {
        translateX.value = repeatedAnimation;
      } else {
        translateY.value = repeatedAnimation;
      }
    }
  };
  const pauseAnimation = () => {
    isPaused.value = true;
    cancelAnimation(translateX);
    cancelAnimation(translateY);
  };
  const resumeAnimation = () => {
    isPaused.value = false;
    measureAndStart();
  };
  const measureAndStart = () => {
    containerRef.current?.measure((x, y, width, height) => {
      contentRef.current?.measure((cx, cy, cWidth, cHeight) => {
        if (direction === "left" || direction === "right") {
          startAnimation(width, cWidth);
        } else {
          startAnimation(height, cHeight);
        }
      });
    });
  };
  useEffect3(() => {
    const timeout = setTimeout(measureAndStart, 100);
    return () => {
      clearTimeout(timeout);
      cancelAnimation(translateX);
      cancelAnimation(translateY);
    };
  }, [children, speed, direction, loop]);
  const handlePressIn = () => {
    if (pauseOnPress) {
      pauseAnimation();
    }
  };
  const handlePressOut = () => {
    if (pauseOnPress) {
      resumeAnimation();
    }
  };
  const fadeGradient = fadeColor || tokens.color.surface.default;
  return /* @__PURE__ */ React43.createElement(
    View39,
    {
      ref: containerRef,
      style: styles11.container,
      accessibilityLabel,
      accessibilityRole: "text",
      testID
    },
    fadeEdges && /* @__PURE__ */ React43.createElement(React43.Fragment, null, /* @__PURE__ */ React43.createElement(
      View39,
      {
        style: [
          styles11.fadeLeft,
          { backgroundColor: fadeGradient },
          direction === "up" || direction === "down" ? styles11.fadeTop : void 0
        ]
      }
    ), /* @__PURE__ */ React43.createElement(
      View39,
      {
        style: [
          styles11.fadeRight,
          { backgroundColor: fadeGradient },
          direction === "up" || direction === "down" ? styles11.fadeBottom : void 0
        ]
      }
    )),
    /* @__PURE__ */ React43.createElement(
      Animated15.View,
      {
        ref: contentRef,
        style: [
          animatedStyle,
          direction === "up" || direction === "down" ? styles11.vertical : styles11.horizontal
        ],
        onTouchStart: handlePressIn,
        onTouchEnd: handlePressOut,
        accessible: false
      },
      children
    )
  );
}
var styles11 = StyleSheet15.create({
  container: {
    overflow: "hidden",
    position: "relative"
  },
  horizontal: {
    flexDirection: "row"
  },
  vertical: {
    flexDirection: "column"
  },
  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 1
  },
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 1
  },
  fadeTop: {
    left: 0,
    right: 0,
    top: 0,
    height: 20,
    width: void 0
  },
  fadeBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 20,
    width: void 0
  }
});

// src/components/Menu/Menu.tsx
import React44 from "react";
import { Modal as Modal6, Pressable as Pressable14, Text as Text28, useWindowDimensions as useWindowDimensions3 } from "react-native";
import Animated16, {
  useSharedValue as useSharedValue8,
  useAnimatedStyle as useAnimatedStyle10,
  withTiming as withTiming7,
  withSpring as withSpring4,
  runOnJS as runOnJS3,
  Easing as Easing3
} from "react-native-reanimated";
import { useTokens as useTokens30, useComponentTokens as useComponentTokens36, useMenu } from "@truongdq01/headless";
var MenuContext = React44.createContext(null);
function Menu2({ open, onClose, anchorEl, children }) {
  const { menu } = useComponentTokens36();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions3();
  const [menuSize, setMenuSize] = React44.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React44.useState(false);
  const { close, getItemProps } = useMenu({ onClose });
  const opacity = useSharedValue8(0);
  const scale = useSharedValue8(0.9);
  React44.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = withTiming7(1, { duration: 180, easing: Easing3.out(Easing3.cubic) });
        scale.value = withSpring4(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = withTiming7(0, { duration: 130 });
      scale.value = withTiming7(0.92, { duration: 130 }, (done) => {
        if (done) runOnJS3(setMounted)(false);
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
  const animStyle = useAnimatedStyle10(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ React44.createElement(Modal6, { visible: mounted, transparent: true, animationType: "none", onRequestClose: close }, /* @__PURE__ */ React44.createElement(Pressable14, { style: { flex: 1 }, onPress: close }), /* @__PURE__ */ React44.createElement(
    Animated16.View,
    {
      onLayout: (e) => {
        const { width, height } = e.nativeEvent.layout;
        setMenuSize({ width, height });
      },
      style: [
        menu.container,
        {
          position: "absolute",
          top,
          left,
          minWidth: MENU_MIN_WIDTH
        },
        animStyle
      ]
    },
    /* @__PURE__ */ React44.createElement(MenuContext.Provider, { value: { getItemProps } }, children)
  ));
}
function MenuItem({ children, onPress, disabled = false, selected = false }) {
  const { menu } = useComponentTokens36();
  const tokens = useTokens30();
  const ctx = React44.useContext(MenuContext);
  const itemProps = ctx?.getItemProps({ onClick: onPress, disabled }) ?? { onPress, disabled };
  return /* @__PURE__ */ React44.createElement(
    Pressable14,
    {
      ...itemProps,
      style: ({ pressed }) => [
        menu.item,
        pressed && { backgroundColor: tokens.color.bg.subtle },
        selected && { backgroundColor: tokens.color.brand.subtle },
        disabled && { opacity: 0.5 }
      ]
    },
    /* @__PURE__ */ React44.createElement(Text28, { style: {
      color: selected ? tokens.color.brand.text : tokens.color.text.primary,
      fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
    } }, children)
  );
}

// src/components/Modal/Modal.tsx
import React45 from "react";
import { Modal as RNModal, View as View41, Pressable as Pressable15, StyleSheet as StyleSheet16 } from "react-native";
import { useComponentTokens as useComponentTokens37 } from "@truongdq01/headless";
function Modal7({
  open,
  onClose,
  children,
  keepMounted = false,
  hideBackdrop = false,
  disableEscapeKeyDown = false,
  accessibilityLabel = "Modal",
  backdropAccessibilityLabel = "Dismiss modal",
  BackdropComponent,
  BackdropProps,
  contentStyle
}) {
  const { modal } = useComponentTokens37();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ React45.createElement(
    RNModal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ React45.createElement(View41, { style: [styles12.overlay, modal.overlay] }, !hideBackdrop && (BackdropComponent ? (() => {
      const el = /* @__PURE__ */ React45.createElement(BackdropComponent, { ...BackdropProps });
      return React45.isValidElement(el) ? React45.cloneElement(el, { collapsable: false }) : el;
    })() : /* @__PURE__ */ React45.createElement(
      Pressable15,
      {
        style: [StyleSheet16.absoluteFill, { backgroundColor: modal.overlay.backgroundColor }],
        onPress: onClose,
        accessibilityRole: "button",
        accessibilityLabel: backdropAccessibilityLabel,
        accessibilityHint: "Closes the modal"
      }
    )), /* @__PURE__ */ React45.createElement(
      View41,
      {
        accessibilityViewIsModal: true,
        accessibilityRole: "none",
        accessibilityLabel,
        style: [styles12.content, modal.container, contentStyle]
      },
      children
    ))
  );
}
var styles12 = StyleSheet16.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    minWidth: 280,
    maxWidth: "90%"
  }
});

// src/components/OTPInput/OTPInput.tsx
import React46, { useEffect as useEffect4 } from "react";
import { View as View42, TextInput, Pressable as Pressable16, Text as Text29 } from "react-native";
import Animated17, {
  useAnimatedStyle as useAnimatedStyle11,
  withSpring as withSpring5,
  useSharedValue as useSharedValue9,
  withTiming as withTiming8,
  withSequence as withSequence2,
  withRepeat as withRepeat2,
  cancelAnimation as cancelAnimation2
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens38, useOTPInput, useReduceMotionEnabled as useReduceMotionEnabled5 } from "@truongdq01/headless";
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  mask = false
}) {
  const { otpInput } = useComponentTokens38();
  const reduceMotion = useReduceMotionEnabled5();
  const { inputRef, isFocused, handlePress, getOtpProps } = useOTPInput({
    length,
    value,
    onChange,
    onComplete,
    disabled
  });
  return /* @__PURE__ */ React46.createElement(View42, { style: { width: "100%" } }, /* @__PURE__ */ React46.createElement(
    TextInput,
    {
      testID: "rnui-otp-input",
      ref: inputRef,
      caretHidden: true,
      style: {
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0
      },
      secureTextEntry: mask,
      ...getOtpProps()
    }
  ), /* @__PURE__ */ React46.createElement(
    Pressable16,
    {
      onPress: handlePress,
      style: [otpInput.container, { width: "100%" }]
    },
    Array.from({ length }).map((_, index) => {
      const char = value[index] || "";
      const isCurrentFocus = isFocused && value.length === index;
      const isFilled = char.length > 0;
      const isLastCellWhenFull = isFocused && value.length === length && index === length - 1;
      const hasFocusBorder = isCurrentFocus || isLastCellWhenFull;
      return /* @__PURE__ */ React46.createElement(
        OTPCell,
        {
          key: index,
          char,
          isFocused: hasFocusBorder,
          isFilled,
          showCursor: isCurrentFocus && !isFilled,
          mask,
          reduceMotion
        }
      );
    })
  ));
}
function OTPCell({
  char,
  isFocused,
  isFilled,
  showCursor,
  mask,
  reduceMotion
}) {
  const { otpInput } = useComponentTokens38();
  const scale = useSharedValue9(1);
  const cursorOpacity = useSharedValue9(1);
  useEffect4(() => {
    if (showCursor && !reduceMotion) {
      cursorOpacity.value = withRepeat2(
        withSequence2(withTiming8(0, { duration: 500 }), withTiming8(1, { duration: 500 })),
        -1,
        false
      );
    } else {
      cancelAnimation2(cursorOpacity);
      cursorOpacity.value = 1;
    }
    return () => cancelAnimation2(cursorOpacity);
  }, [showCursor, reduceMotion]);
  useEffect4(() => {
    if (isFocused) {
      scale.value = withSequence2(
        withTiming8(1.1, { duration: 150 }),
        withTiming8(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = withSpring5(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = withTiming8(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);
  const animatedStyle = useAnimatedStyle11(() => ({
    transform: [{ scale: scale.value }]
  }));
  const cursorStyle = useAnimatedStyle11(() => ({
    opacity: cursorOpacity.value
  }));
  const borderColor = isFocused ? otpInput.cell.focused.borderColor : isFilled ? otpInput.cell.filled.borderColor : otpInput.cell.borderColor;
  const backgroundColor = isFilled ? otpInput.cell.filled.backgroundColor : otpInput.cell.backgroundColor;
  const borderWidth = isFocused ? Math.max(otpInput.cell.borderWidth * 1.5, 2) : otpInput.cell.borderWidth;
  const displayChar = isFilled && mask ? "\u2022" : char;
  return /* @__PURE__ */ React46.createElement(
    Animated17.View,
    {
      style: [
        {
          flex: 1,
          aspectRatio: 1,
          minWidth: 0,
          maxHeight: otpInput.cell.height,
          borderRadius: otpInput.cell.borderRadius,
          alignItems: "center",
          justifyContent: "center",
          borderWidth,
          borderColor,
          backgroundColor
        },
        animatedStyle
      ]
    },
    showCursor ? /* @__PURE__ */ React46.createElement(
      Animated17.View,
      {
        style: [
          {
            width: 2,
            height: otpInput.cell.fontSize * 1.2,
            backgroundColor: otpInput.cell.focused.borderColor,
            borderRadius: 1
          },
          cursorStyle
        ]
      }
    ) : /* @__PURE__ */ React46.createElement(
      Text29,
      {
        style: {
          fontSize: otpInput.cell.fontSize,
          fontWeight: otpInput.cell.fontWeight,
          color: otpInput.cell.color
        }
      },
      displayChar
    )
  );
}

// src/components/Pagination/Pagination.tsx
import React47 from "react";
import { View as View43, Text as Text30, Pressable as Pressable17 } from "react-native";
import { usePagination, useTokens as useTokens31, useComponentTokens as useComponentTokens39 } from "@truongdq01/headless";
function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md"
}) {
  const tokens = useTokens31();
  const { pagination } = useComponentTokens39();
  const { page: current, setPage, items } = usePagination({ count, page, defaultPage, onChange });
  const s = pagination.size[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ React47.createElement(Text30, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    const itemTokens = selected ? pagination.item.active : pagination.item.default;
    return /* @__PURE__ */ React47.createElement(
      Pressable17,
      {
        key: item,
        onPress: () => setPage(item),
        accessibilityRole: "button",
        accessibilityLabel: `Page ${item}`,
        accessibilityState: { selected },
        style: {
          height: s,
          minWidth: s,
          paddingHorizontal: 8,
          borderRadius: shape === "circular" ? s / 2 : tokens.radius.md,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: itemTokens.bg,
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor: itemTokens.borderColor
        }
      },
      /* @__PURE__ */ React47.createElement(Text30, { style: { fontSize: tokens.fontSize[size], color: itemTokens.color } }, item)
    );
  };
  return /* @__PURE__ */ React47.createElement(View43, { style: { flexDirection: "row", alignItems: "center", gap: pagination.gap } }, items.map(renderItem));
}

// src/components/Paper/Paper.tsx
import React48 from "react";
import { View as View44 } from "react-native";
import { useComponentTokens as useComponentTokens40, useTokens as useTokens32 } from "@truongdq01/headless";
function Paper({
  children,
  variant = "elevation",
  elevation = "sm",
  square = false,
  style
}) {
  const { paper } = useComponentTokens40();
  const tokens = useTokens32();
  return /* @__PURE__ */ React48.createElement(
    View44,
    {
      style: [
        paper.container,
        square && { borderRadius: tokens.radius.none },
        variant === "outlined" && paper.variant.outlined,
        variant === "flat" && paper.variant.flat,
        variant === "elevation" && paper.elevation[elevation],
        style
      ]
    },
    children
  );
}

// src/components/Popover/Popover.tsx
import React49, { useMemo as useMemo18, useState as useState8 } from "react";
import { Modal as Modal8, View as View45, Pressable as Pressable18, StyleSheet as StyleSheet17, Dimensions as Dimensions4 } from "react-native";
import { useTokens as useTokens33, useComponentTokens as useComponentTokens41 } from "@truongdq01/headless";
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
  const { popover } = useComponentTokens41();
  const tokens = useTokens33();
  const [contentSize, setContentSize] = useState8({ width: 0, height: 0 });
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
  const { width: screenWidth, height: screenHeight } = Dimensions4.get("window");
  const position = useMemo18(() => {
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
  return /* @__PURE__ */ React49.createElement(Modal8, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React49.createElement(Pressable18, { style: styles13.backdrop, onPress: onClose }), /* @__PURE__ */ React49.createElement(
    View45,
    {
      onLayout: handleLayout,
      style: [
        popover.container,
        {
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
var styles13 = StyleSheet17.create({
  backdrop: {
    ...StyleSheet17.absoluteFillObject
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
import React50, { useMemo as useMemo19, useState as useState9 } from "react";
import { Modal as Modal9, View as View46, Pressable as Pressable19, StyleSheet as StyleSheet18, Dimensions as Dimensions5 } from "react-native";
import { useTokens as useTokens34, useComponentTokens as useComponentTokens42 } from "@truongdq01/headless";
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
  const { popper } = useComponentTokens42();
  const tokens = useTokens34();
  const [contentSize, setContentSize] = useState9({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = Dimensions5.get("window");
  const position = useMemo19(() => {
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
  return /* @__PURE__ */ React50.createElement(Modal9, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React50.createElement(Pressable19, { style: styles14.backdrop, onPress: onClose }), /* @__PURE__ */ React50.createElement(
    View46,
    {
      onLayout: handleLayout,
      style: [
        popper.container,
        position
      ]
    },
    children
  ));
}
var styles14 = StyleSheet18.create({
  backdrop: {
    ...StyleSheet18.absoluteFillObject
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

// src/components/Pressable/Pressable.tsx
import React51 from "react";
import Animated18 from "react-native-reanimated";
import { GestureDetector as GestureDetector6 } from "react-native-gesture-handler";
import { usePressable as usePressable5, useComponentTokens as useComponentTokens43 } from "@truongdq01/headless";
function Pressable20({ children, style, testID, ...hookOptions }) {
  const { pressable } = useComponentTokens43();
  const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable5({
    ...hookOptions,
    testID
  });
  return /* @__PURE__ */ React51.createElement(GestureDetector6, { gesture }, /* @__PURE__ */ React51.createElement(
    Animated18.View,
    {
      style: [pressable.container, style, animatedStyle],
      ...accessibilityProps
    },
    typeof children === "function" ? children({ isPressed }) : children
  ));
}

// src/components/Radio/Radio.tsx
import React52 from "react";
import { View as View47, Text as Text31, Pressable as Pressable21 } from "react-native";
import Animated19, {
  useSharedValue as useSharedValue10,
  useAnimatedStyle as useAnimatedStyle12,
  withSpring as withSpring6,
  interpolate as interpolate4,
  interpolateColor as interpolateColor3
} from "react-native-reanimated";
import { useRadioGroup, useTokens as useTokens35, useComponentTokens as useComponentTokens44, useReduceMotionEnabled as useReduceMotionEnabled6 } from "@truongdq01/headless";
import { spring as spring3 } from "@truongdq01/tokens";
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = useTokens35();
  const { radio } = useComponentTokens44();
  const reduceMotion = useReduceMotionEnabled6();
  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = spring3.snappy;
  const scale = useSharedValue10(isSelected ? 1 : 0);
  const ringFill = useSharedValue10(isSelected ? 1 : 0);
  React52.useEffect(() => {
    const target = isSelected ? 1 : 0;
    scale.value = reduceMotion ? target : withSpring6(target, snappySpring);
    ringFill.value = reduceMotion ? target : withSpring6(target, snappySpring);
  }, [isSelected, snappySpring, reduceMotion, scale, ringFill]);
  const dotStyle = useAnimatedStyle12(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const outerRingStyle = useAnimatedStyle12(() => ({
    borderWidth: interpolate4(ringFill.value, [0, 1], [outerSize.borderWidth, 0]),
    borderColor: interpolateColor3(ringFill.value, [0, 1], [radio.colors.borderOff, "transparent"]),
    backgroundColor: interpolateColor3(ringFill.value, [0, 1], [radio.colors.bgOff, radio.colors.borderOn])
  }));
  const handlePress = () => {
    if (!isSelected && !reduceMotion) {
      scale.value = withSpring6(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = withSpring6(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ React52.createElement(
    Pressable21,
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
    /* @__PURE__ */ React52.createElement(
      Animated19.View,
      {
        style: [
          {
            width: outerSize.width,
            height: outerSize.height,
            borderRadius: outerSize.borderRadius,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2
          },
          outerRingStyle
        ]
      },
      /* @__PURE__ */ React52.createElement(
        Animated19.View,
        {
          style: [
            {
              width: innerSize.width,
              height: innerSize.height,
              borderRadius: innerSize.borderRadius,
              backgroundColor: tokens.color.text.onBrand
            },
            dotStyle
          ]
        }
      )
    ),
    (label || description) && /* @__PURE__ */ React52.createElement(View47, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React52.createElement(
      Text31,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ React52.createElement(
      Text31,
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
  const tokens = useTokens35();
  const { isSelected, getItemProps } = useRadioGroup(hookOptions);
  return /* @__PURE__ */ React52.createElement(View47, null, label && /* @__PURE__ */ React52.createElement(
    Text31,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ React52.createElement(
    View47,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ React52.createElement(
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

// src/components/Rating/Rating.tsx
import React53, { memo, useCallback as useCallback6 } from "react";
import {
  View as View48,
  Pressable as Pressable22,
  Text as Text32,
  AccessibilityInfo as AccessibilityInfo2
} from "react-native";
import Animated20, { useAnimatedStyle as useAnimatedStyle13, useSharedValue as useSharedValue11, withSpring as withSpring7 } from "react-native-reanimated";
import { spring as spring4 } from "@truongdq01/tokens";
import { useRating, useComponentTokens as useComponentTokens45, useReduceMotionEnabled as useReduceMotionEnabled7 } from "@truongdq01/headless";
var DEFAULT_ICON_NAMES = {
  filled: "star",
  empty: "star",
  half: "starHalf"
};
function clamp3(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}
function RatingStarButton({
  index,
  iconSize,
  iconName,
  iconColor,
  starState,
  disabled,
  readOnly,
  reduceMotion,
  onPress,
  renderIcon
}) {
  const scale = useSharedValue11(1);
  const animStyle = useAnimatedStyle13(() => ({
    transform: [{ scale: scale.value }]
  }));
  const handlePressIn = () => {
    if (disabled || readOnly || reduceMotion) return;
    scale.value = withSpring7(1.12, spring4.snappy);
  };
  const handlePressOut = () => {
    if (disabled || readOnly) return;
    if (reduceMotion) {
      scale.value = 1;
      return;
    }
    scale.value = withSpring7(1, spring4.snappy);
  };
  const iconContent = renderIcon ? renderIcon(starState, iconSize, iconColor) : /* @__PURE__ */ React53.createElement(Icon, { size: iconSize, color: iconColor }, iconName);
  return /* @__PURE__ */ React53.createElement(
    Pressable22,
    {
      accessibilityElementsHidden: true,
      importantForAccessibility: "no",
      accessible: false,
      disabled: disabled || readOnly,
      onPress: () => onPress(index),
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      style: { opacity: disabled ? 0.5 : 1 }
    },
    /* @__PURE__ */ React53.createElement(Animated20.View, { style: animStyle }, iconContent)
  );
}
function RatingInner({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = "md",
  onChange,
  showValue = false,
  valuePosition = "end",
  compact = false,
  iconNames: iconNamesProp,
  renderIcon,
  ratingCount,
  formatLabel
}) {
  const { rating } = useComponentTokens45();
  const reduceMotion = useReduceMotionEnabled7();
  const icons = { ...DEFAULT_ICON_NAMES, ...iconNamesProp };
  const { value: ratingValue, setValue, precision: effectivePrecision } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    onChange
  });
  const iconSize = rating.size[size];
  const activeColor = rating.star.filled.color;
  const inactiveColor = rating.star.empty.color;
  const halfColor = rating.star.half.color;
  const announceValue = useCallback6(
    (next) => {
      const announce = AccessibilityInfo2.announceForAccessibility;
      if (typeof announce === "function") {
        announce(`${next} out of ${max} stars`);
      }
    },
    [max]
  );
  const handlePress = (index) => {
    if (disabled || readOnly) return;
    const tapTarget = index + 1;
    const snapped = Math.round(tapTarget / effectivePrecision) * effectivePrecision;
    const newVal = ratingValue === snapped ? 0 : snapped;
    setValue(newVal);
    announceValue(newVal);
  };
  const applyAccessibilityStep = (delta) => {
    if (disabled || readOnly) return;
    const raw = ratingValue + delta * effectivePrecision;
    const snapped = Math.round(raw / effectivePrecision) * effectivePrecision;
    const next = clamp3(snapped, 0, max);
    if (next !== ratingValue) {
      setValue(next);
      announceValue(next);
    }
  };
  const onAccessibilityAction = (event) => {
    const name = event.nativeEvent.actionName;
    if (name === "increment") {
      applyAccessibilityStep(1);
    } else if (name === "decrement") {
      applyAccessibilityStep(-1);
    }
  };
  const interactive = !readOnly && !disabled;
  const rowStyle = compact ? rating.containerCompact : rating.container;
  const defaultFormatLabel = (v, m, count) => {
    if (count != null) return `${v} (${count})`;
    return `${v}/${m}`;
  };
  const labelFormatter = formatLabel ?? defaultFormatLabel;
  const labelText = labelFormatter(ratingValue, max, ratingCount);
  const valueLabel = /* @__PURE__ */ React53.createElement(
    Text32,
    {
      accessibilityElementsHidden: true,
      importantForAccessibility: "no",
      accessible: false,
      style: { fontSize: iconSize * 0.7, color: activeColor, marginHorizontal: 4 }
    },
    labelText
  );
  const starsRow = /* @__PURE__ */ React53.createElement(
    View48,
    {
      accessible: interactive || readOnly || disabled,
      accessibilityRole: interactive ? "adjustable" : "none",
      accessibilityValue: interactive ? {
        min: 0,
        max,
        now: ratingValue
      } : void 0,
      accessibilityHint: interactive ? "Swipe up or down to adjust rating" : void 0,
      accessibilityLabel: !interactive ? ratingCount != null ? `${ratingValue} out of ${max} stars, ${ratingCount} ratings` : `${ratingValue} out of ${max} stars` : void 0,
      onAccessibilityAction: interactive ? onAccessibilityAction : void 0,
      style: rowStyle
    },
    Array.from({ length: max }).map((_, i) => {
      const starNumber = i + 1;
      const filled = ratingValue >= starNumber;
      const halfFilled = !filled && ratingValue >= starNumber - 0.5 && effectivePrecision <= 0.5;
      const starState = halfFilled ? "half" : filled ? "filled" : "empty";
      let iconName = icons.empty;
      if (halfFilled) iconName = icons.half;
      else if (filled) iconName = icons.filled;
      const iconColor = halfFilled ? halfColor : filled ? activeColor : inactiveColor;
      return /* @__PURE__ */ React53.createElement(
        RatingStarButton,
        {
          key: i,
          index: i,
          iconSize,
          iconName,
          iconColor,
          starState,
          disabled,
          readOnly,
          reduceMotion,
          onPress: handlePress,
          renderIcon
        }
      );
    })
  );
  if (!showValue) {
    return /* @__PURE__ */ React53.createElement(View48, null, starsRow);
  }
  return /* @__PURE__ */ React53.createElement(View48, { style: { flexDirection: "row", alignItems: "center" } }, valuePosition === "start" ? valueLabel : null, starsRow, valuePosition === "end" ? valueLabel : null);
}
var Rating = memo(RatingInner);
Rating.displayName = "Rating";

// src/components/SegmentedControl/SegmentedControl.tsx
import React54, { useState as useState10, useRef as useRef3 } from "react";
import { View as View49, Pressable as Pressable23, Text as Text33 } from "react-native";
import Animated21, {
  useAnimatedStyle as useAnimatedStyle14,
  withSpring as withSpring8,
  useSharedValue as useSharedValue12
} from "react-native-reanimated";
import { useTokens as useTokens36, useComponentTokens as useComponentTokens46, useSegmentedControl } from "@truongdq01/headless";
var TRACK_PADDING = 2;
var INDICATOR_SPRING = { damping: 28, stiffness: 300, mass: 0.8 };
var SIZE_HEIGHT = { sm: 32, md: 36, lg: 44 };
var SIZE_FONT = { sm: "xs", md: "sm", lg: "md" };
function getLabel(opt) {
  return typeof opt === "string" ? opt : opt.label;
}
function getIcon(opt) {
  return typeof opt === "string" ? void 0 : opt.icon;
}
function SegmentedControl({
  options,
  selectedIndex,
  onChange,
  size = "md",
  height: heightProp,
  disabled = false
}) {
  const tokens = useTokens36();
  const { segmentedControl } = useComponentTokens46();
  const { isSelected, setSelectedIndex, getTabProps } = useSegmentedControl({
    value: selectedIndex,
    onChange: (val) => onChange(val),
    disabled
  });
  const resolvedHeight = heightProp ?? SIZE_HEIGHT[size];
  const fontKey = SIZE_FONT[size];
  const [containerWidth, setContainerWidth] = useState10(0);
  const [layoutReady, setLayoutReady] = useState10(false);
  const innerWidth = Math.max(0, containerWidth - TRACK_PADDING * 2);
  const segmentWidth = options.length > 0 ? innerWidth / options.length : 0;
  const translateX = useSharedValue12(0);
  const indicatorWidth = useSharedValue12(0);
  const didInitialLayout = useRef3(false);
  React54.useEffect(() => {
    if (segmentWidth <= 0) return;
    const target = selectedIndex * segmentWidth;
    if (!didInitialLayout.current) {
      didInitialLayout.current = true;
      translateX.value = target;
      indicatorWidth.value = segmentWidth;
      return;
    }
    translateX.value = withSpring8(target, INDICATOR_SPRING);
    indicatorWidth.value = withSpring8(segmentWidth, INDICATOR_SPRING);
  }, [selectedIndex, segmentWidth, translateX, indicatorWidth]);
  const onLayout = (e) => {
    const w = e.nativeEvent.layout.width;
    setContainerWidth(w);
    if (w > 0) setLayoutReady(true);
  };
  const indicatorStyle = useAnimatedStyle14(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value
  }));
  const showIndicator = layoutReady && segmentWidth > 0;
  return /* @__PURE__ */ React54.createElement(
    View49,
    {
      onLayout,
      style: [
        segmentedControl.container,
        { height: resolvedHeight, borderRadius: resolvedHeight / 2, opacity: disabled ? 0.6 : 1 }
      ]
    },
    showIndicator && /* @__PURE__ */ React54.createElement(
      Animated21.View,
      {
        style: [
          segmentedControl.item.active,
          {
            position: "absolute",
            left: TRACK_PADDING,
            top: TRACK_PADDING,
            bottom: TRACK_PADDING,
            borderRadius: (resolvedHeight - TRACK_PADDING * 2) / 2
          },
          indicatorStyle
        ]
      }
    ),
    options.map((option, index) => {
      const selected = isSelected(index);
      const label = getLabel(option);
      const icon = getIcon(option);
      return /* @__PURE__ */ React54.createElement(
        Pressable23,
        {
          key: label,
          disabled,
          ...getTabProps(index, index),
          style: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: icon ? 6 : 0,
            zIndex: 1
          }
        },
        icon,
        /* @__PURE__ */ React54.createElement(
          Text33,
          {
            style: {
              fontSize: tokens.fontSize[fontKey],
              fontWeight: selected ? tokens.fontWeight.semibold : tokens.fontWeight.medium,
              color: selected ? segmentedControl.item.activeText.color : segmentedControl.item.text.color
            }
          },
          label
        )
      );
    })
  );
}

// src/components/Select/Select.tsx
import React56, { useRef as useRef4, useState as useState12, useMemo as useMemo20, useCallback as useCallback7 } from "react";
import { View as View51, Text as Text34, TextInput as TextInput2, Pressable as Pressable24, ActivityIndicator as ActivityIndicator3, FlatList as FlatList3 } from "react-native";
import { useSelect, useTokens as useTokens38, useComponentTokens as useComponentTokens48 } from "@truongdq01/headless";

// src/components/Skeleton/Skeleton.tsx
import React55, { createContext as createContext7, useContext as useContext7, useEffect as useEffect5, useState as useState11, Children, isValidElement, cloneElement } from "react";
import { View as View50 } from "react-native";
import Animated22, {
  useSharedValue as useSharedValue13,
  useAnimatedStyle as useAnimatedStyle15,
  withRepeat as withRepeat3,
  withTiming as withTiming9,
  interpolate as interpolate5,
  cancelAnimation as cancelAnimation3
} from "react-native-reanimated";
import { useTokens as useTokens37, useComponentTokens as useComponentTokens47, useIsDark } from "@truongdq01/headless";
var ShimmerCtx = createContext7(null);
function useShimmerValue(animate, delayMs) {
  const shared = useContext7(ShimmerCtx);
  const local = useSharedValue13(0);
  useEffect5(() => {
    if (shared || !animate) {
      cancelAnimation3(local);
      local.value = 0;
      return;
    }
    const start = () => {
      local.value = withRepeat3(withTiming9(1, { duration: 1200 }), -1, true);
    };
    if (delayMs > 0) {
      const t = setTimeout(start, delayMs);
      return () => {
        clearTimeout(t);
        cancelAnimation3(local);
      };
    }
    start();
    return () => cancelAnimation3(local);
  }, [animate, delayMs, !!shared]);
  return shared ?? local;
}
function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true,
  delayMs = 0,
  shimmerDirection = "pulse"
}) {
  const { skeleton } = useComponentTokens47();
  const isDark = useIsDark();
  const shimmer = useShimmerValue(animate, delayMs);
  const [layoutW, setLayoutW] = useState11(0);
  const sweepHighlight = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)";
  const pulseStyle = useAnimatedStyle15(() => ({
    opacity: interpolate5(shimmer.value, [0, 1], [skeleton.opacity.start, skeleton.opacity.end])
  }));
  const sweepStyle = useAnimatedStyle15(() => {
    const w = Math.max(layoutW, 1);
    const sweep = w * 0.35;
    const t = shimmerDirection === "right-to-left" ? 1 - shimmer.value : shimmer.value;
    return {
      transform: [{ translateX: interpolate5(t, [0, 1], [-sweep, w]) }],
      opacity: 0.45
    };
  });
  const isSweep = shimmerDirection === "left-to-right" || shimmerDirection === "right-to-left";
  return /* @__PURE__ */ React55.createElement(
    Animated22.View,
    {
      style: [
        {
          width,
          height,
          borderRadius: borderRadius ?? skeleton.borderRadius,
          backgroundColor: skeleton.backgroundColor,
          overflow: "hidden"
        },
        animate && !isSweep ? pulseStyle : null
      ],
      onLayout: (e) => setLayoutW(e.nativeEvent.layout.width)
    },
    animate && isSweep && /* @__PURE__ */ React55.createElement(
      Animated22.View,
      {
        style: [
          {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "35%",
            backgroundColor: sweepHighlight,
            borderRadius: borderRadius ?? skeleton.borderRadius
          },
          sweepStyle
        ]
      }
    )
  );
}
function SkeletonGroup({ stagger = 80, children }) {
  return /* @__PURE__ */ React55.createElement(React55.Fragment, null, Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child, {
      delayMs: i * stagger
    });
  }));
}
var SkeletonText = React55.memo(function SkeletonText2({
  lines = 3,
  lastLineWidth = "60%",
  shimmerDirection = "pulse"
}) {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(View50, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ React55.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14,
      shimmerDirection
    }
  )));
});
var SkeletonCard = React55.memo(function SkeletonCard2() {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(
    View50,
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
    /* @__PURE__ */ React55.createElement(View50, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ React55.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ React55.createElement(View50, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React55.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ React55.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ React55.createElement(Skeleton, { width: "40%", height: 16, borderRadius: tokens.radius.md })
  );
});
var SkeletonListItem = React55.memo(function SkeletonListItem2() {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(
    View50,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React55.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ React55.createElement(View50, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React55.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ React55.createElement(Skeleton, { width: 24, height: 14 })
  );
});
var SkeletonProfile = React55.memo(function SkeletonProfile2() {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(View50, { style: { gap: tokens.spacing[4], alignItems: "center" } }, /* @__PURE__ */ React55.createElement(Skeleton, { width: 96, height: 96, borderRadius: 48, shimmerDirection: "left-to-right" }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "70%", height: 18 }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "45%", height: 14 }));
});
var SkeletonMedia = React55.memo(function SkeletonMedia2() {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(View50, { style: { gap: tokens.spacing[3] } }, /* @__PURE__ */ React55.createElement(Skeleton, { width: "100%", height: 180, borderRadius: tokens.radius.lg, shimmerDirection: "left-to-right" }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "80%", height: 16 }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "50%", height: 13 }));
});
var SkeletonForm = React55.memo(function SkeletonForm2({ rows = 4 }) {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(View50, { style: { gap: tokens.spacing[4] } }, Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ React55.createElement(View50, { key: i, style: { gap: tokens.spacing[2] } }, /* @__PURE__ */ React55.createElement(Skeleton, { width: "30%", height: 12 }), /* @__PURE__ */ React55.createElement(Skeleton, { width: "100%", height: 44, borderRadius: tokens.radius.md }))));
});
var SkeletonGrid = React55.memo(function SkeletonGrid2({ columns = 3, rows = 2, cell = 48 }) {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(View50, { style: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2] } }, Array.from({ length: columns * rows }).map((_, i) => /* @__PURE__ */ React55.createElement(Skeleton, { key: i, width: cell, height: cell, borderRadius: tokens.radius.sm })));
});
var SkeletonTable = React55.memo(function SkeletonTable2({ columns = 4, dataRows = 3 }) {
  const tokens = useTokens37();
  return /* @__PURE__ */ React55.createElement(View50, { style: { gap: tokens.spacing[2] } }, /* @__PURE__ */ React55.createElement(View50, { style: { flexDirection: "row", gap: tokens.spacing[2] } }, Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ React55.createElement(Skeleton, { key: `h-${i}`, width: `${90 / columns}%`, height: 14 }))), Array.from({ length: dataRows }).map((_, r) => /* @__PURE__ */ React55.createElement(View50, { key: r, style: { flexDirection: "row", gap: tokens.spacing[2] } }, Array.from({ length: columns }).map((_2, c) => /* @__PURE__ */ React55.createElement(Skeleton, { key: `${r}-${c}`, width: `${90 / columns}%`, height: 12 })))));
});

// src/components/Select/Select.tsx
function Select({
  label,
  placeholder = "Select\u2026",
  searchable = false,
  error,
  onClearError,
  loading = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  renderOption,
  options,
  ...hookOptions
}) {
  const { select } = useComponentTokens48();
  const tokens = useTokens38();
  const sheetRef = useRef4(null);
  const [query, setQuery] = useState12("");
  const endReachBusy = useRef4(false);
  const a11yLabel = label ?? "Select";
  const ListImpl = useMemo20(() => {
    try {
      const mod = __require("@shopify/flash-list");
      return mod?.FlashList ?? FlatList3;
    } catch {
      return FlatList3;
    }
  }, []);
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel
  } = useSelect({ options, ...hookOptions, placeholder });
  const hasSelection = displayLabel !== placeholder;
  const filtered = useMemo20(() => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lowerQuery));
  }, [options, query]);
  const handleClose = useCallback7(() => {
    sheetRef.current?.close();
    close();
  }, [close]);
  const handleOpen = useCallback7(() => {
    setQuery("");
    sheetRef.current?.open();
    open();
  }, [open]);
  const handleSelect = useCallback7(
    (val) => {
      selectOption(val);
      onClearError?.();
      if (!hookOptions.multiple) handleClose();
    },
    [selectOption, onClearError, hookOptions.multiple, handleClose]
  );
  const onEndReached = useCallback7(() => {
    if (!onLoadMore || !hasMore || loading || loadingMore || endReachBusy.current) return;
    endReachBusy.current = true;
    onLoadMore();
  }, [onLoadMore, hasMore, loading, loadingMore]);
  React56.useEffect(() => {
    if (!loadingMore) endReachBusy.current = false;
  }, [loadingMore]);
  const renderItem = useCallback7(
    ({ item: option }) => {
      const selected = isSelected(option.value);
      if (renderOption) {
        return /* @__PURE__ */ React56.createElement(
          Pressable24,
          {
            onPress: () => !option.disabled && handleSelect(option.value),
            style: { opacity: option.disabled ? 0.4 : 1 }
          },
          renderOption(option, { selected })
        );
      }
      return /* @__PURE__ */ React56.createElement(
        Pressable24,
        {
          onPress: () => !option.disabled && handleSelect(option.value),
          style: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: tokens.spacing[3],
            paddingHorizontal: tokens.spacing[4],
            borderRadius: tokens.radius.md,
            backgroundColor: selected ? select.option.selected.bg : tokens.color.surface.default,
            opacity: option.disabled ? 0.4 : 1
          }
        },
        /* @__PURE__ */ React56.createElement(
          Text34,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? select.option.selected.color : select.option.default.color,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ React56.createElement(Icon, { size: 16, color: select.option.selected.color, name: "check" })
      );
    },
    [isSelected, renderOption, select.option, tokens, handleSelect]
  );
  const listEmpty = useMemo20(() => {
    if (loading && options.length === 0) {
      return /* @__PURE__ */ React56.createElement(View51, { style: { paddingVertical: tokens.spacing[2] } }, /* @__PURE__ */ React56.createElement(SkeletonListItem, null), /* @__PURE__ */ React56.createElement(SkeletonListItem, null), /* @__PURE__ */ React56.createElement(SkeletonListItem, null));
    }
    if (filtered.length === 0) {
      const emptyMsg = loading ? "Loading\u2026" : query ? `No results for "${query}"` : "No options";
      return /* @__PURE__ */ React56.createElement(
        Text34,
        {
          style: {
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.sm,
            textAlign: "center",
            paddingVertical: tokens.spacing[6]
          }
        },
        emptyMsg
      );
    }
    return null;
  }, [loading, options.length, filtered.length, query, tokens]);
  return /* @__PURE__ */ React56.createElement(View51, null, label && /* @__PURE__ */ React56.createElement(Text34, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ React56.createElement(
    Pressable24,
    {
      onPress: handleOpen,
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 48,
        paddingHorizontal: select.trigger.padding.x,
        paddingVertical: select.trigger.padding.y,
        borderWidth: 1,
        borderColor: error ? tokens.color.border.error : isOpen ? select.trigger.focusBorderColor : select.trigger.borderColor,
        borderRadius: select.trigger.borderRadius,
        backgroundColor: select.trigger.bg
      },
      accessibilityRole: "combobox",
      accessibilityLabel: a11yLabel,
      accessibilityState: { expanded: isOpen }
    },
    /* @__PURE__ */ React56.createElement(
      Text34,
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
    /* @__PURE__ */ React56.createElement(Icon, { size: 16, color: tokens.color.text.tertiary }, isOpen ? "chevronUp" : "chevronDown")
  ), error && /* @__PURE__ */ React56.createElement(Text34, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ React56.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ React56.createElement(View51, { style: { flex: 1, paddingHorizontal: tokens.spacing[4], backgroundColor: tokens.color.bg.default } }, searchable && isOpen && /* @__PURE__ */ React56.createElement(
      View51,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing[3],
          height: 48,
          marginBottom: tokens.spacing[3],
          backgroundColor: tokens.color.bg.subtle
        }
      },
      /* @__PURE__ */ React56.createElement(View51, { style: { marginRight: 8 } }, /* @__PURE__ */ React56.createElement(Icon, { size: 20, color: tokens.color.text.tertiary, name: "search" })),
      /* @__PURE__ */ React56.createElement(
        TextInput2,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search\u2026",
          placeholderTextColor: tokens.color.text.tertiary,
          style: { flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" },
          autoFocus: true,
          accessibilityLabel: `${a11yLabel} search`
        }
      ),
      query.length > 0 && /* @__PURE__ */ React56.createElement(Pressable24, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ React56.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" }))
    ), filtered.length === 0 ? /* @__PURE__ */ React56.createElement(View51, { style: { flex: 1, minHeight: 120 } }, listEmpty) : /* @__PURE__ */ React56.createElement(
      ListImpl,
      {
        style: { flex: 1 },
        data: filtered,
        extraData: query,
        renderItem,
        keyExtractor: (item) => String(item.value),
        onEndReached,
        onEndReachedThreshold: 0.35,
        ItemSeparatorComponent: () => /* @__PURE__ */ React56.createElement(
          View51,
          {
            style: {
              height: 1,
              backgroundColor: tokens.color.border.subtle,
              marginLeft: tokens.spacing[4]
            }
          }
        ),
        ListFooterComponent: loadingMore ? /* @__PURE__ */ React56.createElement(View51, { style: { paddingVertical: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ React56.createElement(ActivityIndicator3, { color: tokens.color.brand.default })) : /* @__PURE__ */ React56.createElement(View51, { style: { height: tokens.spacing[4] } }),
        estimatedItemSize: 48
      }
    ))
  ));
}

// src/components/Slider/Slider.tsx
import React57, { useMemo as useMemo21 } from "react";
import { View as View52, Text as Text35, TextInput as TextInput3 } from "react-native";
import Animated23, { useAnimatedProps } from "react-native-reanimated";
import { GestureDetector as GestureDetector7 } from "react-native-gesture-handler";
import { useSlider, useTokens as useTokens39, useComponentTokens as useComponentTokens49 } from "@truongdq01/headless";
var AnimatedTextInput2 = Animated23.createAnimatedComponent(TextInput3);
function snapSliderValueWorklet(raw, minV, maxV, stepV) {
  "worklet";
  if (stepV === 0 || maxV === minV) return Math.max(minV, Math.min(maxV, raw));
  const snapped = Math.round((raw - minV) / stepV) * stepV + minV;
  return Math.max(minV, Math.min(maxV, snapped));
}
function SliderLiveSingleValue(props) {
  const { show, thumbRatioShared, min, max, step, style } = props;
  const animatedProps = useAnimatedProps(() => {
    const raw = thumbRatioShared.value * (max - min) + min;
    const s = snapSliderValueWorklet(raw, min, max, step);
    return { text: String(s) };
  });
  if (!show) return null;
  return /* @__PURE__ */ React57.createElement(
    AnimatedTextInput2,
    {
      animatedProps,
      editable: false,
      pointerEvents: "none",
      underlineColorAndroid: "transparent",
      style: {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        padding: 0,
        margin: 0,
        minWidth: 40,
        textAlign: "right"
      }
    }
  );
}
function SliderLiveRangeValue(props) {
  const { show, thumbRatioLowShared, thumbRatioHighShared, min, max, step, style } = props;
  const animatedProps = useAnimatedProps(() => {
    const rawLo = thumbRatioLowShared.value * (max - min) + min;
    const rawHi = thumbRatioHighShared.value * (max - min) + min;
    const lo = snapSliderValueWorklet(rawLo, min, max, step);
    const hi = snapSliderValueWorklet(rawHi, min, max, step);
    return { text: `${lo} \u2013 ${hi}` };
  });
  if (!show) return null;
  return /* @__PURE__ */ React57.createElement(
    AnimatedTextInput2,
    {
      animatedProps,
      editable: false,
      pointerEvents: "none",
      underlineColorAndroid: "transparent",
      style: {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        padding: 0,
        margin: 0,
        minWidth: 56,
        textAlign: "right"
      }
    }
  );
}
function Slider({
  label,
  showValue = false,
  formatValue = (v) => String(v),
  showMinMaxLabels = false,
  showMarks = false,
  sliderHeight = 150,
  thumbRenderer,
  min = 0,
  max = 100,
  step = 1,
  orientation = "horizontal",
  range = false,
  ...rest
}) {
  const tokens = useTokens39();
  const { slider } = useComponentTokens49();
  const isVertical = orientation === "vertical";
  const sliderState = useSlider({
    min,
    max,
    step,
    orientation,
    range,
    ...rest
  });
  const showRangeLabels = showMinMaxLabels;
  const marks = showMarks && step > 0 ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min) : [];
  const liveValueStyle = useMemo21(
    () => ({
      fontSize: tokens.fontSize.sm,
      fontWeight: tokens.fontWeight.semibold,
      color: tokens.color.brand.default
    }),
    [tokens.color.brand.default, tokens.fontSize.sm, tokens.fontWeight.semibold]
  );
  const trackThickness = slider.track.height;
  const thumbW = slider.thumb.width;
  const thumbH = slider.thumb.height;
  const minHitSize = 48;
  const trackPad = Math.max(12, (minHitSize - thumbH) / 2);
  const thumbShellStyle = useMemo21(() => {
    const chrome = thumbRenderer ? {
      backgroundColor: "transparent",
      borderWidth: 0,
      borderColor: "transparent",
      elevation: 0,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: "transparent"
    } : {
      backgroundColor: slider.thumb.bg,
      borderWidth: slider.thumb.borderWidth,
      borderColor: slider.thumb.borderColor,
      shadowColor: slider.thumb.shadowColor,
      shadowOffset: slider.thumb.shadowOffset,
      shadowOpacity: slider.thumb.shadowOpacity,
      shadowRadius: slider.thumb.shadowRadius,
      elevation: slider.thumb.elevation
    };
    return {
      position: "absolute",
      width: thumbW,
      height: thumbH,
      borderRadius: slider.thumb.borderRadius,
      ...chrome,
      ...isVertical ? { left: "50%", marginLeft: -thumbW / 2, top: -thumbH / 2 } : { left: -thumbW / 2, top: void 0 }
    };
  }, [
    thumbRenderer,
    isVertical,
    thumbW,
    thumbH,
    slider.thumb
  ]);
  function renderThumb(animatedStyle, kind, value) {
    const custom = thumbRenderer?.({ kind, value });
    return /* @__PURE__ */ React57.createElement(Animated23.View, { style: [thumbShellStyle, animatedStyle] }, custom ?? null);
  }
  if (sliderState.mode === "range") {
    const {
      currentValue: currentValue2,
      thumbRatioLowShared,
      thumbRatioHighShared,
      thumbLowAnimatedStyle,
      thumbHighAnimatedStyle,
      fillAnimatedStyle: fillAnimatedStyle2,
      trackAnimatedStyle: trackAnimatedStyle2,
      panGestureLow,
      panGestureHigh,
      onTrackLayout: onTrackLayout2
    } = sliderState;
    const [lo, hi] = currentValue2;
    const d = rest.disabled;
    return /* @__PURE__ */ React57.createElement(View52, { style: { opacity: d ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ React57.createElement(View52, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ React57.createElement(Text35, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ React57.createElement(
      SliderLiveRangeValue,
      {
        show: showValue,
        thumbRatioLowShared,
        thumbRatioHighShared,
        min,
        max,
        step,
        style: liveValueStyle
      }
    )), /* @__PURE__ */ React57.createElement(
      Animated23.View,
      {
        style: [
          {
            paddingVertical: isVertical ? 0 : trackPad,
            paddingHorizontal: isVertical ? trackPad : 0
          },
          trackAnimatedStyle2
        ]
      },
      /* @__PURE__ */ React57.createElement(
        View52,
        {
          style: isVertical ? { width: thumbW + trackPad * 2, height: sliderHeight, justifyContent: "center" } : { height: thumbH + trackPad * 2, justifyContent: "center" },
          onLayout: (e) => onTrackLayout2(isVertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)
        },
        /* @__PURE__ */ React57.createElement(
          View52,
          {
            style: {
              position: "absolute",
              ...isVertical ? { top: 0, bottom: 0, left: "50%", marginLeft: -trackThickness / 2, width: trackThickness } : { left: 0, right: 0, height: trackThickness },
              borderRadius: slider.track.borderRadius,
              backgroundColor: slider.track.bgOff,
              overflow: "hidden"
            }
          },
          /* @__PURE__ */ React57.createElement(
            Animated23.View,
            {
              style: [
                {
                  height: isVertical ? "100%" : slider.track.height,
                  backgroundColor: slider.track.bgOn,
                  borderRadius: slider.track.borderRadius
                },
                fillAnimatedStyle2
              ]
            }
          )
        ),
        showMarks && !isVertical && marks.map((mark) => {
          const markPct = (mark - min) / (max - min);
          const isActive = mark <= hi && mark >= lo;
          return /* @__PURE__ */ React57.createElement(
            View52,
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
                top: (thumbH - 4) / 2 + trackPad
              }
            }
          );
        }),
        /* @__PURE__ */ React57.createElement(GestureDetector7, { gesture: panGestureLow }, renderThumb(thumbLowAnimatedStyle, "low", lo)),
        /* @__PURE__ */ React57.createElement(GestureDetector7, { gesture: panGestureHigh }, renderThumb(thumbHighAnimatedStyle, "high", hi))
      )
    ), showRangeLabels && /* @__PURE__ */ React57.createElement(View52, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ React57.createElement(Text35, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ React57.createElement(Text35, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
  }
  const {
    currentValue,
    thumbRatioShared,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout
  } = sliderState;
  const disabled = rest.disabled;
  return /* @__PURE__ */ React57.createElement(View52, { style: { opacity: disabled ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ React57.createElement(View52, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ React57.createElement(Text35, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ React57.createElement(
    SliderLiveSingleValue,
    {
      show: showValue,
      thumbRatioShared,
      min,
      max,
      step,
      style: liveValueStyle
    }
  )), /* @__PURE__ */ React57.createElement(
    Animated23.View,
    {
      style: [
        {
          paddingVertical: isVertical ? 0 : trackPad,
          paddingHorizontal: isVertical ? trackPad : 0
        },
        trackAnimatedStyle
      ]
    },
    /* @__PURE__ */ React57.createElement(GestureDetector7, { gesture: panGesture }, /* @__PURE__ */ React57.createElement(
      View52,
      {
        style: isVertical ? { width: thumbW + trackPad * 2, height: sliderHeight, justifyContent: "center" } : { height: thumbH + trackPad * 2, justifyContent: "center" },
        onLayout: (e) => onTrackLayout(isVertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)
      },
      /* @__PURE__ */ React57.createElement(
        View52,
        {
          style: {
            position: "absolute",
            ...isVertical ? { top: 0, bottom: 0, left: "50%", marginLeft: -trackThickness / 2, width: trackThickness } : { left: 0, right: 0, height: trackThickness },
            borderRadius: slider.track.borderRadius,
            backgroundColor: slider.track.bgOff,
            overflow: "hidden"
          }
        },
        /* @__PURE__ */ React57.createElement(
          Animated23.View,
          {
            style: [
              {
                height: isVertical ? "100%" : slider.track.height,
                backgroundColor: slider.track.bgOn,
                borderRadius: slider.track.borderRadius
              },
              fillAnimatedStyle
            ]
          }
        )
      ),
      showMarks && !isVertical && marks.map((mark) => {
        const markPct = (mark - min) / (max - min);
        const isActive = mark <= currentValue;
        return /* @__PURE__ */ React57.createElement(
          View52,
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
              top: (thumbH - 4) / 2 + trackPad
            }
          }
        );
      }),
      renderThumb(thumbAnimatedStyle, "single", currentValue)
    ))
  ), showRangeLabels && /* @__PURE__ */ React57.createElement(View52, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ React57.createElement(Text35, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ React57.createElement(Text35, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}

// src/components/Snackbar/Snackbar.tsx
import React58, { useEffect as useEffect6, useMemo as useMemo22 } from "react";
import { View as View53, Text as Text36, Pressable as Pressable25, Modal as Modal10, StyleSheet as StyleSheet19 } from "react-native";
import Animated24, {
  useSharedValue as useSharedValue14,
  useAnimatedStyle as useAnimatedStyle16,
  withTiming as withTiming10,
  withSpring as withSpring9,
  runOnJS as runOnJS4
} from "react-native-reanimated";
import { useTokens as useTokens40, useComponentTokens as useComponentTokens50 } from "@truongdq01/headless";
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const { snackbar } = useComponentTokens50();
  const tokens = useTokens40();
  const [mounted, setMounted] = React58.useState(open);
  const isBottom = anchorOrigin.vertical === "bottom";
  const translateY = useSharedValue14(isBottom ? 100 : -100);
  const opacity = useSharedValue14(0);
  const scale = useSharedValue14(0.95);
  const animateIn = () => {
    translateY.value = withSpring9(0, { damping: 25, stiffness: 300, mass: 1 });
    opacity.value = withTiming10(1, { duration: 200 });
    scale.value = withSpring9(1, { damping: 25, stiffness: 300 });
  };
  const animateOut = (onDone) => {
    translateY.value = withTiming10(isBottom ? 100 : -100, { duration: 200 });
    opacity.value = withTiming10(0, { duration: 150 }, (done) => {
      if (done) runOnJS4(onDone)();
    });
  };
  useEffect6(() => {
    if (open) {
      setMounted(true);
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  useEffect6(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = useMemo22(() => {
    if (anchorOrigin.horizontal === "center") return { alignSelf: "center" };
    if (anchorOrigin.horizontal === "left") return { left: 16 };
    return { right: 16 };
  }, [anchorOrigin.horizontal]);
  const animStyle = useAnimatedStyle16(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  if (!mounted && !open) return null;
  return /* @__PURE__ */ React58.createElement(Modal10, { visible: mounted || open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React58.createElement(View53, { pointerEvents: "box-none", style: styles15.overlay }, /* @__PURE__ */ React58.createElement(
    Animated24.View,
    {
      style: [
        snackbar.container,
        verticalStyle,
        horizontalStyle,
        animStyle,
        { position: "absolute" }
      ]
    },
    /* @__PURE__ */ React58.createElement(Text36, { style: [snackbar.text, { flex: 1 }] }, message),
    action,
    onClose && /* @__PURE__ */ React58.createElement(Pressable25, { onPress: onClose, hitSlop: 8, style: { marginLeft: 8 } }, /* @__PURE__ */ React58.createElement(Icon, { size: 18, color: snackbar.text.color, name: "close" }))
  )));
}
var styles15 = StyleSheet19.create({
  overlay: {
    flex: 1
  }
});

// src/components/SpeedDial/SpeedDial.tsx
import React59, { createContext as createContext8, useContext as useContext8, useMemo as useMemo23 } from "react";
import { View as View54, Text as Text37, Pressable as Pressable26 } from "react-native";
import { useDisclosure as useDisclosure2, useTokens as useTokens41, useComponentTokens as useComponentTokens51 } from "@truongdq01/headless";
var SpeedDialContext = createContext8(null);
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
  const { speedDial } = useComponentTokens51();
  const disclosure = useDisclosure2({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = useTokens41();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  const ctxValue = useMemo23(() => ({ isOpen: disclosure.isOpen, close: disclosure.close }), [disclosure.isOpen, disclosure.close]);
  return /* @__PURE__ */ React59.createElement(SpeedDialContext.Provider, { value: ctxValue }, /* @__PURE__ */ React59.createElement(View54, { style: [speedDial.container, stackStyle] }, disclosure.isOpen && children, /* @__PURE__ */ React59.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const { speedDial } = useComponentTokens51();
  const tokens = useTokens41();
  const ctx = useContext8(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ React59.createElement(
    Pressable26,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: speedDial.action
    },
    /* @__PURE__ */ React59.createElement(
      View54,
      {
        style: [
          speedDial.action.iconContainer,
          {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: tokens.color.surface.default,
            alignItems: "center",
            justifyContent: "center",
            ...tokens.shadow.sm
          }
        ]
      },
      icon
    ),
    tooltipTitle && /* @__PURE__ */ React59.createElement(Text37, { style: speedDial.action.tooltip }, tooltipTitle)
  );
}

// src/components/Stack/Stack.tsx
import React60 from "react";
import { View as View55 } from "react-native";
import { useComponentTokens as useComponentTokens52 } from "@truongdq01/headless";
function Stack({
  children,
  direction = "column",
  spacing = "sm",
  divider,
  alignItems,
  justifyContent,
  flexWrap,
  style
}) {
  const { stack } = useComponentTokens52();
  const gap = typeof spacing === "number" ? spacing : stack.gap[spacing];
  const items = React60.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ React60.createElement(
    View55,
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

// src/components/Stepper/Stepper.tsx
import React61 from "react";
import { View as View56, Text as Text38 } from "react-native";
import { useComponentTokens as useComponentTokens53 } from "@truongdq01/headless";
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const { stepper } = useComponentTokens53();
  const items = React61.Children.toArray(children);
  return /* @__PURE__ */ React61.createElement(View56, { style: [stepper.container, { flexDirection: orientation === "horizontal" ? "row" : "column" }] }, items.map((child) => {
    if (!React61.isValidElement(child)) return child;
    return React61.cloneElement(child, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }) {
  const { stepper } = useComponentTokens53();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  const color = isCompleted ? stepper.step.completed.color : isActive ? stepper.step.active.color : stepper.step.pending.color;
  return /* @__PURE__ */ React61.createElement(View56, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React61.createElement(
    View56,
    {
      style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: isCompleted ? color : isActive ? `${color}20` : "transparent",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: color
      }
    },
    isCompleted ? /* @__PURE__ */ React61.createElement(Icon, { size: 14, color: stepper.step.completed.color, name: "check" }) : /* @__PURE__ */ React61.createElement(Text38, { style: { fontSize: 12, fontWeight: "600", color: isActive ? color : color } }, index + 1)
  ), label && /* @__PURE__ */ React61.createElement(Text38, { style: { color: isActive ? stepper.step.active.color : stepper.step.pending.color, fontSize: 14 } }, label), children);
}
function StepLabel({ children, style }) {
  const { stepper } = useComponentTokens53();
  return /* @__PURE__ */ React61.createElement(Text38, { style: [{ color: stepper.step.pending.color, fontSize: 14 }, style] }, children);
}

// src/components/Switch/Switch.tsx
import React62 from "react";
import { View as View57, Text as Text39, Pressable as Pressable27 } from "react-native";
import Animated25, {
  useSharedValue as useSharedValue15,
  useAnimatedStyle as useAnimatedStyle17,
  withSpring as withSpring10,
  interpolateColor as interpolateColor4
} from "react-native-reanimated";
import { useSwitch, useTokens as useTokens42, useComponentTokens as useComponentTokens54, useReduceMotionEnabled as useReduceMotionEnabled8 } from "@truongdq01/headless";
import { spring as spring5 } from "@truongdq01/tokens";
var Switch = React62.memo(({ label, description, size = "md", ...hookOptions }) => {
  const tokens = useTokens42();
  const { switch: switchT } = useComponentTokens54();
  const reduceMotion = useReduceMotionEnabled8();
  const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch(hookOptions);
  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = Math.max(0, tTrack.width - tThumb.width - tTrack.padding * 2);
  const progress = useSharedValue15(isOn ? 1 : 0);
  React62.useEffect(() => {
    const target = isOn ? 1 : 0;
    progress.value = reduceMotion ? target : withSpring10(target, spring5.snappy);
  }, [isOn, reduceMotion]);
  const trackStyle = useAnimatedStyle17(() => ({
    backgroundColor: interpolateColor4(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    )
  }));
  const thumbStyle = useAnimatedStyle17(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ React62.createElement(
    Pressable27,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: {
        flexDirection: "row",
        alignItems: "center",
        gap: tokens.spacing[3],
        opacity: isDisabled ? switchT.colors.disabledOpacity : 1
      },
      ...accessibilityProps
    },
    /* @__PURE__ */ React62.createElement(
      Animated25.View,
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
      /* @__PURE__ */ React62.createElement(
        Animated25.View,
        {
          style: [
            {
              width: tThumb.width,
              height: tThumb.height,
              borderRadius: tThumb.borderRadius,
              backgroundColor: switchT.colors.thumb,
              ...tokens.shadow.sm
            },
            thumbStyle
          ]
        }
      )
    ),
    (label || description) && /* @__PURE__ */ React62.createElement(View57, { style: { flex: 1 } }, label && /* @__PURE__ */ React62.createElement(Text39, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React62.createElement(
      Text39,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          color: tokens.color.text.secondary,
          marginTop: tokens.spacing[0.5]
        }
      },
      description
    ))
  );
});

// src/components/Table/Table.tsx
import React63, { createContext as createContext9, useContext as useContext9, useMemo as useMemo24 } from "react";
import { View as View58, ScrollView as ScrollView4, Text as Text40, Pressable as Pressable28 } from "react-native";
import { useComponentTokens as useComponentTokens55, useTokens as useTokens43 } from "@truongdq01/headless";
var TableContext = createContext9(null);
function useTableContext() {
  return useContext9(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = useMemo24(() => ({ size, padding, stickyHeader }), [size, padding, stickyHeader]);
  return /* @__PURE__ */ React63.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ React63.createElement(View58, { style }, children));
}
function TableContainer({ children, style }) {
  const { table } = useComponentTokens55();
  return /* @__PURE__ */ React63.createElement(
    ScrollView4,
    {
      horizontal: true,
      style: [
        table.container,
        style
      ]
    },
    /* @__PURE__ */ React63.createElement(View58, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const { table } = useComponentTokens55();
  return /* @__PURE__ */ React63.createElement(View58, { style: table.header }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ React63.createElement(View58, null, children);
}
function TableFooter({ children }) {
  const { table } = useComponentTokens55();
  return /* @__PURE__ */ React63.createElement(View58, { style: { borderTopWidth: 1, borderTopColor: table.container.borderColor } }, children);
}
function TableRow({ children, selected = false, style }) {
  const { table } = useComponentTokens55();
  const tokens = useTokens43();
  return /* @__PURE__ */ React63.createElement(
    View58,
    {
      style: [
        table.row,
        selected && { backgroundColor: tokens.color.brand.subtle },
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
  const { table } = useComponentTokens55();
  const ctx = useTableContext();
  const tokens = useTokens43();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const paddingX = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const paddingY = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ React63.createElement(View58, { style: [{ paddingHorizontal: paddingX, paddingVertical: paddingY, flexShrink: 0 }, style] }, /* @__PURE__ */ React63.createElement(
    Text40,
    {
      style: [
        table.cell,
        { textAlign: align },
        variant === "head" && { fontWeight: tokens.fontWeight.semibold },
        resolvedSize === "small" && { fontSize: tokens.fontSize.sm }
      ]
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
  const tokens = useTokens43();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ React63.createElement(
    View58,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React63.createElement(Text40, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ React63.createElement(View58, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ React63.createElement(Text40, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ React63.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1)),
        startIcon: /* @__PURE__ */ React63.createElement(Icon, { size: 16, name: "chevronLeft" })
      },
      "Prev"
    ), /* @__PURE__ */ React63.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page >= totalPages - 1,
        onPress: () => onPageChange?.(Math.min(totalPages - 1, page + 1)),
        endIcon: /* @__PURE__ */ React63.createElement(Icon, { size: 16, name: "chevronRight" })
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
  const tokens = useTokens43();
  return /* @__PURE__ */ React63.createElement(Pressable28, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React63.createElement(Text40, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), active ? /* @__PURE__ */ React63.createElement(Icon, { size: 14, color: tokens.color.text.primary }, direction === "asc" ? "arrowUp" : "arrowDown") : /* @__PURE__ */ React63.createElement(View58, { style: { width: 14 } }));
}

// src/components/Tabs/Tabs.tsx
import React64, { createContext as createContext10, useContext as useContext10 } from "react";
import { View as View59, Text as Text41, Pressable as Pressable29 } from "react-native";
import { useComponentTokens as useComponentTokens56, useTabs, useTokens as useTokens44 } from "@truongdq01/headless";
var TabsContext = createContext10(null);
function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children
}) {
  const { tabs } = useComponentTokens56();
  const { getTabProps, isSelected } = useTabs({ value, defaultValue, onChange });
  return /* @__PURE__ */ React64.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ React64.createElement(
    View59,
    {
      style: [
        tabs.container,
        {
          flexDirection: orientation === "horizontal" ? "row" : "column",
          justifyContent: centered ? "center" : "flex-start",
          borderBottomWidth: orientation === "horizontal" ? 1 : 0,
          borderLeftWidth: orientation === "vertical" ? 1 : 0
        }
      ]
    },
    children
  ));
}
function Tab({ value, label, icon, disabled = false }) {
  const { tabs } = useComponentTokens56();
  const tokens = useTokens44();
  const ctx = useContext10(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { onPress, accessibilityState } = ctx.getTabProps(value, disabled);
  return /* @__PURE__ */ React64.createElement(
    Pressable29,
    {
      disabled,
      onPress,
      accessibilityRole: "tab",
      accessibilityState,
      style: ({ pressed }) => [
        {
          paddingVertical: tokens.spacing[3],
          paddingHorizontal: tokens.spacing[4],
          borderBottomWidth: ctx.orientation === "horizontal" ? tabs.indicator.height : 0,
          borderLeftWidth: ctx.orientation === "vertical" ? tabs.indicator.height : 0,
          borderColor: selected ? tabs.indicator.bg : "transparent",
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          alignItems: "center",
          flexDirection: "row",
          gap: tokens.spacing[2]
        },
        ctx.variant === "fullWidth" ? { flex: 1, justifyContent: "center" } : null
      ]
    },
    icon,
    label && /* @__PURE__ */ React64.createElement(
      Text41,
      {
        style: [
          selected ? tabs.tab.active : tabs.tab.inactive,
          { fontSize: tokens.fontSize.md }
        ]
      },
      label
    )
  );
}

// src/components/TextArea/TextArea.tsx
import React65, { useState as useState13, useEffect as useEffect7 } from "react";
import { View as View60, Text as Text42, TextInput as TextInput4 } from "react-native";
import Animated26, {
  useSharedValue as useSharedValue16,
  useAnimatedStyle as useAnimatedStyle18,
  withTiming as withTiming11,
  interpolateColor as interpolateColor5
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens57, useTokens as useTokens45 } from "@truongdq01/headless";
var FOCUS_MS2 = 150;
function TextArea({
  label,
  placeholder,
  value = "",
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  minLines: _minLines = 3,
  maxLines = 8,
  maxLength,
  showCounter = true,
  counterPosition = "inside",
  disabled = false,
  autoFocus = false,
  accessibilityLabel
}) {
  const { textArea } = useComponentTokens57();
  const tokens = useTokens45();
  const formGroupVariant = useFormGroupVariant();
  const isGrouped = formGroupVariant === "grouped";
  const [isFocused, setIsFocused] = useState13(false);
  const focusProgress = useSharedValue16(0);
  const errorSv = useSharedValue16(0);
  const disabledSv = useSharedValue16(0);
  const groupedSv = useSharedValue16(0);
  useEffect7(() => {
    errorSv.value = error ? 1 : 0;
  }, [error, errorSv]);
  useEffect7(() => {
    disabledSv.value = disabled ? 1 : 0;
  }, [disabled, disabledSv]);
  useEffect7(() => {
    groupedSv.value = isGrouped ? 1 : 0;
  }, [isGrouped, groupedSv]);
  useEffect7(() => {
    if (error || disabled) {
      focusProgress.value = 0;
      return;
    }
    focusProgress.value = withTiming11(isFocused ? 1 : 0, { duration: FOCUS_MS2 });
  }, [isFocused, error, disabled, focusProgress]);
  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;
  const errorBorder = tokens.color.border.error;
  const disabledBorder = tokens.color.border.default;
  const animatedBorderStyle = useAnimatedStyle18(() => {
    if (groupedSv.value === 1) {
      return {};
    }
    if (errorSv.value === 1) {
      return { borderColor: errorBorder };
    }
    if (disabledSv.value === 1) {
      return { borderColor: disabledBorder };
    }
    return {
      borderColor: interpolateColor5(focusProgress.value, [0, 1], [defaultBorder, focusBorder])
    };
  }, [defaultBorder, disabledBorder, errorBorder, focusBorder]);
  const LINE_HEIGHT = tokens.fontSize.md * tokens.lineHeight.normal;
  const maxHeight = maxLines * LINE_HEIGHT + tokens.spacing[3] * 2;
  const containerPadV = tokens.spacing[2];
  const showCounterAbove = Boolean(maxLength && showCounter && counterPosition === "above");
  const showCounterInside = Boolean(maxLength && showCounter && counterPosition === "inside");
  const showCounterBelow = Boolean(maxLength && showCounter && counterPosition === "below");
  const counterPaddingBottom = showCounterInside ? tokens.spacing[5] : 0;
  const innerMaxH = Math.max(1, maxHeight - 2 * containerPadV);
  const groupedChrome = isGrouped ? {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent"
  } : {};
  const containerStyle = [
    textArea.container,
    { height: maxHeight },
    !isGrouped && error && textArea.state.error,
    !isGrouped && disabled && textArea.state.disabled,
    groupedChrome
  ];
  const charCount = value.length;
  const nearLimit = maxLength && charCount >= maxLength * 0.9;
  const atLimit = maxLength && charCount >= maxLength;
  const counterColor = atLimit ? tokens.color.error.text : nearLimit ? tokens.color.warning.text : tokens.color.text.tertiary;
  const counterWeight = atLimit ? tokens.fontWeight.semibold : tokens.fontWeight.regular;
  const counterEl = maxLength && showCounter ? /* @__PURE__ */ React65.createElement(
    Text42,
    {
      pointerEvents: "none",
      style: {
        fontSize: tokens.fontSize.xs,
        color: counterColor,
        fontWeight: counterWeight
      }
    },
    charCount,
    "/",
    maxLength
  ) : null;
  return /* @__PURE__ */ React65.createElement(View60, null, (label || showCounterAbove) && /* @__PURE__ */ React65.createElement(
    View60,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: tokens.spacing[1]
      }
    },
    label ? /* @__PURE__ */ React65.createElement(Text42, { style: textArea.label }, label) : null,
    showCounterAbove ? counterEl : null
  ), /* @__PURE__ */ React65.createElement(
    Animated26.View,
    {
      style: [containerStyle, showCounterInside && { position: "relative" }, animatedBorderStyle]
    },
    /* @__PURE__ */ React65.createElement(
      TextInput4,
      {
        value,
        onChangeText,
        placeholder,
        placeholderTextColor: textArea.text.placeholderColor,
        multiline: true,
        scrollEnabled: true,
        maxLength,
        editable: !disabled,
        autoFocus,
        accessibilityLabel: accessibilityLabel ?? label,
        accessibilityState: { disabled },
        style: {
          height: innerMaxH,
          width: "100%",
          fontSize: tokens.fontSize.md,
          color: textArea.text.color,
          lineHeight: LINE_HEIGHT,
          textAlignVertical: "top",
          paddingTop: 0,
          paddingBottom: counterPaddingBottom
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
    ),
    showCounterInside && counterEl ? /* @__PURE__ */ React65.createElement(
      View60,
      {
        style: {
          position: "absolute",
          right: tokens.spacing[3],
          bottom: tokens.spacing[2]
        }
      },
      counterEl
    ) : null
  ), showCounterBelow && counterEl ? /* @__PURE__ */ React65.createElement(
    View60,
    {
      style: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: tokens.spacing[1]
      }
    },
    counterEl
  ) : null, error ? /* @__PURE__ */ React65.createElement(AnimatedHelperText, { text: error, isError: true, style: textArea.errorText }) : /* @__PURE__ */ React65.createElement(AnimatedHelperText, { text: helperText, isError: false, style: textArea.helperText }));
}

// src/components/TextField/TextField.tsx
import React66, { useState as useState14 } from "react";
import { Pressable as Pressable30 } from "react-native";
import { useComponentTokens as useComponentTokens58 } from "@truongdq01/headless";
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
  const { textField } = useComponentTokens58();
  const [showPassword, setShowPassword] = useState14(false);
  const isPassword = type === "password";
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  const trailingElement = isPassword ? /* @__PURE__ */ React66.createElement(
    Pressable30,
    {
      onPress: () => setShowPassword(!showPassword),
      style: { padding: 4 },
      hitSlop: 8
    },
    /* @__PURE__ */ React66.createElement(Icon, { size: 20, color: textField.text.placeholderColor }, showPassword ? "eyeOff" : "eye")
  ) : rest.trailingElement;
  if (select) {
    return /* @__PURE__ */ React66.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ React66.createElement(
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
  return /* @__PURE__ */ React66.createElement(
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

// src/components/Timeline/Timeline.tsx
import React67, { createContext as createContext11, useContext as useContext11 } from "react";
import { View as View61, Text as Text43 } from "react-native";
import { useComponentTokens as useComponentTokens59, useTokens as useTokens46 } from "@truongdq01/headless";
var TimelineContext = createContext11(null);
function useTimelineContext() {
  return useContext11(TimelineContext);
}
function Timeline({ position = "right", itemVariant = "filled", children }) {
  const { timeline } = useComponentTokens59();
  return /* @__PURE__ */ React67.createElement(TimelineContext.Provider, { value: { position, itemVariant } }, /* @__PURE__ */ React67.createElement(View61, { style: timeline.content }, React67.Children.map(children, (child, index) => {
    if (!React67.isValidElement(child)) return child;
    if (position === "alternate" || position === "alternate-reverse") {
      const isEven = index % 2 === 0;
      const derived = position === "alternate" ? isEven ? "right" : "left" : isEven ? "left" : "right";
      return React67.cloneElement(child, { position: child.props.position ?? derived, variant: itemVariant });
    }
    return React67.cloneElement(child, { variant: itemVariant });
  })));
}
function TimelineItem({ position, variant = "filled", status = "pending", children }) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");
  return /* @__PURE__ */ React67.createElement(View61, { style: { flexDirection: "row", alignItems: "stretch", minHeight: 80 } }, /* @__PURE__ */ React67.createElement(View61, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractOpposite(children) : extractContent(children)), /* @__PURE__ */ React67.createElement(TimelineSeparator, { status, variant }), /* @__PURE__ */ React67.createElement(View61, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractContent(children) : extractOpposite(children)));
}
function extractChildrenByType(children, type) {
  const items = [];
  React67.Children.forEach(children, (child) => {
    if (React67.isValidElement(child) && child.type === type) {
      const element = child;
      items.push(element.props.children);
    }
  });
  return items.length > 0 ? items : null;
}
function extractContent(children) {
  const result = extractChildrenByType(children, TimelineContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React67.createElement(Text43, null, result[0]);
  }
  return result;
}
function extractOpposite(children) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React67.createElement(Text43, null, result[0]);
  }
  return result;
}
function TimelineSeparator({ status = "pending", variant = "filled", children }) {
  const { timeline } = useComponentTokens59();
  const connectorColor = status === "completed" ? timeline.dot.completed.borderColor : timeline.connector.color;
  return /* @__PURE__ */ React67.createElement(View61, { style: { alignItems: "center", width: 48, paddingHorizontal: 8 } }, children || /* @__PURE__ */ React67.createElement(React67.Fragment, null, /* @__PURE__ */ React67.createElement(
    TimelineDot,
    {
      variant,
      status
    }
  ), /* @__PURE__ */ React67.createElement(TimelineConnector, { color: connectorColor })));
}
function TimelineDot({ variant = "filled", color = "primary", status, size }) {
  const { timeline } = useComponentTokens59();
  const tokens = useTokens46();
  const resolvedStatus = status || (color === "success" ? "completed" : color === "error" ? "error" : color === "primary" ? "active" : "pending");
  const statusTokens = timeline.dot[resolvedStatus] || timeline.dot.pending;
  const dotSize = size || timeline.dot.size || 16;
  return /* @__PURE__ */ React67.createElement(
    View61,
    {
      style: {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: variant === "filled" ? statusTokens.bg : "transparent",
        borderWidth: 2,
        borderColor: statusTokens.borderColor,
        ...tokens.shadow.sm
      }
    }
  );
}
function TimelineConnector({ color, width }) {
  const { timeline } = useComponentTokens59();
  const resolvedWidth = width || timeline.connector.width;
  return /* @__PURE__ */ React67.createElement(View61, { style: { width: resolvedWidth, flex: 1, backgroundColor: color || timeline.connector.color, marginVertical: 4, borderRadius: resolvedWidth } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ React67.createElement(View61, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ React67.createElement(View61, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ React67.createElement(Text43, null, children) : children);
}

// src/components/Toast/ToastContainer.tsx
import React69 from "react";
import { StyleSheet as StyleSheet20 } from "react-native";
import Animated28, { LinearTransition as RawLinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets as useSafeAreaInsets3 } from "react-native-safe-area-context";
import { useToast, dismissToast } from "@truongdq01/headless";

// src/components/Toast/ToastItem.tsx
import React68, { useEffect as useEffect8 } from "react";
import Animated27, {
  useSharedValue as useSharedValue17,
  useAnimatedStyle as useAnimatedStyle19,
  withTiming as withTiming12,
  runOnJS as runOnJS5,
  FadeOutUp,
  FadeOutDown,
  SlideInUp,
  SlideInDown,
  Easing as Easing4
} from "react-native-reanimated";
import { View as View62, Text as Text44, Pressable as Pressable31 } from "react-native";
import { useComponentTokens as useComponentTokens60, useTokens as useTokens47, useReduceMotionEnabled as useReduceMotionEnabled9 } from "@truongdq01/headless";
var VARIANT_ICONS = {
  success: "checkCircle",
  error: "error",
  warning: "warning",
  info: "info"
};
function ToastItem({ item, position, onDismiss }) {
  const { toast } = useComponentTokens60();
  const tokens = useTokens47();
  const reduceMotion = useReduceMotionEnabled9();
  const progress = useSharedValue17(1);
  useEffect8(() => {
    if (item.persistent) return;
    progress.value = withTiming12(0, { duration: item.duration }, (finished) => {
      if (finished) runOnJS5(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = useAnimatedStyle19(() => ({
    width: `${progress.value * 100}%`
  }));
  const variantMap = {
    default: { iconColor: tokens.color.text.tertiary, progressColor: tokens.color.border.strong },
    success: { iconColor: tokens.color.success.icon, progressColor: tokens.color.success.icon },
    warning: { iconColor: tokens.color.warning.icon, progressColor: tokens.color.warning.icon },
    error: { iconColor: tokens.color.error.icon, progressColor: tokens.color.error.icon },
    info: { iconColor: tokens.color.info.icon, progressColor: tokens.color.info.icon }
  };
  const v = variantMap[item.variant] || variantMap.default;
  const entering = reduceMotion ? void 0 : position === "top" ? SlideInDown.duration(280).easing(Easing4.out(Easing4.cubic)) : SlideInUp.duration(280).easing(Easing4.out(Easing4.cubic));
  const exiting = reduceMotion ? void 0 : position === "top" ? FadeOutUp.duration(200) : FadeOutDown.duration(200);
  return /* @__PURE__ */ React68.createElement(
    Animated27.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ React68.createElement(View62, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, React68.isValidElement(item.icon) ? React68.cloneElement(item.icon, {
      size: item.icon.props.size ?? 20,
      color: item.icon.props.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ React68.createElement(Icon, { size: 20, color: v.iconColor, name: VARIANT_ICONS[item.variant] ?? "info" }),
    /* @__PURE__ */ React68.createElement(Text44, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ React68.createElement(
      Pressable31,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ React68.createElement(Text44, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ React68.createElement(
      Pressable31,
      {
        onPress: () => onDismiss(item.id),
        hitSlop: 8,
        accessibilityRole: "button",
        accessibilityLabel: "Dismiss"
      },
      /* @__PURE__ */ React68.createElement(Icon, { size: 18, color: toast.text.color, name: "close" })
    ),
    !item.persistent && /* @__PURE__ */ React68.createElement(View62, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ React68.createElement(Animated27.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
var layoutTransition = typeof RawLinearTransition?.duration === "function" ? RawLinearTransition.duration(280) : void 0;
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets3();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ React69.createElement(
    Animated28.View,
    {
      layout: layoutTransition,
      style: [styles16.container, positionStyle],
      pointerEvents: "box-none",
      accessibilityLiveRegion: "polite",
      accessibilityRole: "alert"
    },
    toasts.map((item) => /* @__PURE__ */ React69.createElement(
      ToastItem,
      {
        key: item.id,
        item,
        position,
        onDismiss: dismissToast
      }
    ))
  );
}
var styles16 = StyleSheet20.create({
  container: {
    position: "absolute",
    zIndex: 9999,
    gap: 8
  }
});

// src/components/ToggleButton/ToggleButton.tsx
import React70, { createContext as createContext12, useContext as useContext12 } from "react";
import { View as View63, Text as Text45 } from "react-native";
import Animated29 from "react-native-reanimated";
import { GestureDetector as GestureDetector8 } from "react-native-gesture-handler";
import { useComponentTokens as useComponentTokens61, usePressable as usePressable6, useTokens as useTokens48, useToggleGroup } from "@truongdq01/headless";
var ToggleContext = createContext12(null);
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
  return /* @__PURE__ */ React70.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ React70.createElement(View63, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const { toggleButton } = useComponentTokens61();
  const tokens = useTokens48();
  const ctx = useContext12(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = usePressable6({
    onPress: () => ctx?.toggle(value),
    disabled: isDisabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "button"
  });
  const size = ctx?.size ?? "md";
  const sizeMap = {
    sm: { height: 32, paddingHorizontal: 12, fontSize: tokens.fontSize.sm },
    md: { height: 40, paddingHorizontal: 16, fontSize: tokens.fontSize.md },
    lg: { height: 48, paddingHorizontal: 20, fontSize: tokens.fontSize.lg }
  };
  const s = sizeMap[size];
  return /* @__PURE__ */ React70.createElement(GestureDetector8, { gesture }, /* @__PURE__ */ React70.createElement(
    Animated29.View,
    {
      style: [
        toggleButton.container,
        selected && toggleButton.container.selected,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          opacity: isDisabled ? 0.5 : 1
        },
        animatedStyle
      ],
      ...accessibilityProps
    },
    /* @__PURE__ */ React70.createElement(
      Text45,
      {
        style: {
          fontSize: s.fontSize,
          fontWeight: tokens.fontWeight.medium,
          color: selected ? toggleButton.icon.selected.color : toggleButton.icon.color
        }
      },
      children
    )
  ));
}

// src/components/Tooltip/Tooltip.tsx
import React71, { useState as useState15, useCallback as useCallback8 } from "react";
import { Text as Text46, Pressable as Pressable32, Modal as Modal11, useWindowDimensions as useWindowDimensions4 } from "react-native";
import Animated30, {
  useSharedValue as useSharedValue18,
  useAnimatedStyle as useAnimatedStyle20,
  withTiming as withTiming13,
  runOnJS as runOnJS6
} from "react-native-reanimated";
import { useTokens as useTokens49, useComponentTokens as useComponentTokens62 } from "@truongdq01/headless";
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const { tooltip } = useComponentTokens62();
  const tokens = useTokens49();
  const [internalOpen, setInternalOpen] = useState15(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions4();
  const [triggerRect, setTriggerRect] = useState15(null);
  const [tooltipSize, setTooltipSize] = useState15({ width: 0, height: 0 });
  const triggerRef = React71.useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const opacity = useSharedValue18(0);
  const animateIn = useCallback8(() => {
    opacity.value = withTiming13(1, { duration: 150 });
  }, []);
  const animateOut = useCallback8((onDone) => {
    opacity.value = withTiming13(0, { duration: 100 }, () => {
      runOnJS6(onDone)();
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
  const animStyle = useAnimatedStyle20(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ React71.createElement(React71.Fragment, null, /* @__PURE__ */ React71.createElement(
    Pressable32,
    {
      ref: triggerRef,
      onPress: handleOpen,
      onLongPress: handleOpen,
      delayLongPress: 400,
      accessibilityRole: "button",
      accessibilityHint: "Shows tooltip"
    },
    children
  ), /* @__PURE__ */ React71.createElement(
    Modal11,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ React71.createElement(
      Pressable32,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ React71.createElement(
        Animated30.View,
        {
          onLayout: (e) => {
            const { width, height } = e.nativeEvent.layout;
            setTooltipSize({ width, height });
          },
          onStartShouldSetResponder: () => true,
          style: [
            tooltip.container,
            {
              position: "absolute",
              top: safeTop,
              left: safeLeft
            },
            animStyle
          ]
        },
        typeof title === "string" ? /* @__PURE__ */ React71.createElement(Text46, { style: tooltip.text }, title) : title
      )
    )
  ));
}

// src/components/Typography/Typography.tsx
import React72 from "react";
import { Text as Text47 } from "react-native";
import { useComponentTokens as useComponentTokens63, useTokens as useTokens50 } from "@truongdq01/headless";
function accessibilityForAs(as) {
  if (!as || as === "span") return {};
  if (as === "p" || as === "label") {
    return { accessibilityRole: "text" };
  }
  if (as === "h1" || as === "h2" || as === "h3" || as === "h4" || as === "h5" || as === "h6") {
    return { accessibilityRole: "header" };
  }
  return {};
}
function TypographyInner({
  children,
  variant = "body1",
  as,
  align = "left",
  color,
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  display,
  style
}) {
  const { typography } = useComponentTokens63();
  const tokens = useTokens50();
  const variantStyle = variant === "inherit" ? {} : typography.variants[variant] || {};
  const presetColors = typography.colors;
  const resolvedColor = color != null && color !== "" && typeof color === "string" && Object.prototype.hasOwnProperty.call(presetColors, color) ? presetColors[color] : color || presetColors.primary;
  const resolvedDisplay = display === "block" || display === "inline" || display === "inline-flex" ? "flex" : display;
  const sans = tokens.fontFamily?.sans;
  const sansFont = sans != null && sans !== "" ? { fontFamily: sans } : null;
  const skipSans = variant === "code";
  const a11y = accessibilityForAs(as);
  return /* @__PURE__ */ React72.createElement(
    Text47,
    {
      ...a11y,
      numberOfLines: noWrap ? 1 : void 0,
      style: [
        { color: resolvedColor, textAlign: align === "inherit" ? void 0 : align },
        variantStyle,
        !skipSans && sansFont,
        paragraph && { marginBottom: tokens.spacing[4] },
        gutterBottom && { marginBottom: tokens.spacing[2] },
        resolvedDisplay ? { display: resolvedDisplay } : null,
        style
      ]
    },
    children
  );
}
var Typography = React72.memo(TypographyInner);

// src/components/TelegramTabBar/TelegramTabBar.tsx
import React73, { createContext as createContext13, useContext as useContext13 } from "react";
import { View as View65, Pressable as Pressable33, StyleSheet as StyleSheet21 } from "react-native";
import Animated31, {
  useSharedValue as useSharedValue19,
  useAnimatedStyle as useAnimatedStyle21,
  withSpring as withSpring11,
  interpolateColor as interpolateColor6,
  interpolate as interpolate6
} from "react-native-reanimated";
import { useTokens as useTokens51, useComponentTokens as useComponentTokens64 } from "@truongdq01/headless";
var TabBarContext = createContext13(null);
function TelegramTabBar({
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  glassEffect = true
}) {
  const tokens = useTokens51();
  const { bottomNavigation } = useComponentTokens64();
  const [internalValue, setInternalValue] = React73.useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const isSelected = (itemValue) => value === itemValue;
  const getItemProps = (itemValue, disabled) => ({
    onPress: disabled ? void 0 : () => {
      if (controlledValue === void 0) setInternalValue(itemValue);
      onChange?.(itemValue);
    }
  });
  return /* @__PURE__ */ React73.createElement(TabBarContext.Provider, { value: { value, isSelected, getItemProps } }, /* @__PURE__ */ React73.createElement(
    View65,
    {
      style: [
        styles17.container,
        glassEffect && {
          backgroundColor: tokens.color.surface.glass,
          borderTopColor: tokens.color.surface.glassBorder,
          borderTopWidth: 0.5
        },
        !glassEffect && {
          backgroundColor: tokens.color.surface.default,
          borderTopColor: tokens.color.border.subtle,
          borderTopWidth: 1
        }
      ]
    },
    children
  ));
}
function TelegramTab({
  value,
  label,
  icon,
  activeIcon,
  badge,
  disabled = false
}) {
  const tokens = useTokens51();
  const ctx = useContext13(TabBarContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const progress = useSharedValue19(selected ? 1 : 0);
  React73.useEffect(() => {
    progress.value = withSpring11(selected ? 1 : 0, {
      damping: 22,
      stiffness: 300
    });
  }, [selected]);
  const iconStyle = useAnimatedStyle21(() => ({
    transform: [{ scale: interpolate6(progress.value, [0, 1], [1, 1.15]) }],
    opacity: interpolate6(progress.value, [0, 1], [0.7, 1])
  }));
  const labelStyle = useAnimatedStyle21(() => ({
    color: interpolateColor6(
      progress.value,
      [0, 1],
      [tokens.color.text.secondary, tokens.color.brand.default]
    ),
    transform: [{ scale: interpolate6(progress.value, [0, 1], [0.95, 1]) }],
    opacity: interpolate6(progress.value, [0, 1], [0.7, 1])
  }));
  const dotStyle = useAnimatedStyle21(() => ({
    opacity: interpolate6(progress.value, [0, 1], [0, 1]),
    transform: [{ scale: interpolate6(progress.value, [0, 1], [0, 1]) }]
  }));
  const itemProps = ctx.getItemProps(value, disabled);
  return /* @__PURE__ */ React73.createElement(
    Pressable33,
    {
      ...itemProps,
      disabled,
      style: ({ pressed }) => [
        styles17.tabItem,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.3 }
      ]
    },
    /* @__PURE__ */ React73.createElement(View65, { style: styles17.iconContainer }, /* @__PURE__ */ React73.createElement(Animated31.View, { style: iconStyle }, selected && activeIcon ? activeIcon : icon), badge !== void 0 && badge !== false && /* @__PURE__ */ React73.createElement(
      Badge,
      {
        count: typeof badge === "boolean" ? void 0 : badge,
        dot: typeof badge === "boolean",
        style: styles17.badge
      }
    )),
    /* @__PURE__ */ React73.createElement(Animated31.Text, { style: [styles17.tabLabel, labelStyle] }, label),
    /* @__PURE__ */ React73.createElement(Animated31.View, { style: [styles17.activeDot, dotStyle, { backgroundColor: tokens.color.brand.default }] })
  );
}
var styles17 = StyleSheet21.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    paddingBottom: 6,
    minHeight: 56
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    minHeight: 48
  },
  iconContainer: {
    position: "relative",
    marginBottom: 2
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -12
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
    marginTop: 2
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4
  }
});

// src/components/ChatListItem/ChatListItem.tsx
import React74 from "react";
import { View as View66, Text as Text49, Pressable as Pressable34, StyleSheet as StyleSheet22 } from "react-native";
import Animated32, { useSharedValue as useSharedValue20, useAnimatedStyle as useAnimatedStyle22, withSpring as withSpring12 } from "react-native-reanimated";
import { useTokens as useTokens52, useComponentTokens as useComponentTokens65 } from "@truongdq01/headless";
function ChatListItem({
  avatar,
  name,
  preview,
  time,
  unread,
  read = true,
  outgoing = true,
  muted = false,
  pinned = false,
  selected = false,
  disabled = false,
  onPress,
  onLongPress,
  trailingElement
}) {
  const tokens = useTokens52();
  const { list } = useComponentTokens65();
  const pressed = useSharedValue20(0);
  const containerStyle = useAnimatedStyle22(() => ({
    backgroundColor: pressed.value === 1 ? tokens.color.surface.hover : selected ? tokens.color.brand.subtle : "transparent"
  }));
  return /* @__PURE__ */ React74.createElement(
    Pressable34,
    {
      onPress,
      onLongPress,
      disabled,
      onPressIn: () => {
        pressed.value = withSpring12(1, { damping: 20 });
      },
      onPressOut: () => {
        pressed.value = withSpring12(0, { damping: 20 });
      }
    },
    /* @__PURE__ */ React74.createElement(Animated32.View, { style: [styles18.container, containerStyle] }, avatar && /* @__PURE__ */ React74.createElement(
      Avatar,
      {
        src: avatar.src,
        initials: avatar.initials,
        status: avatar.status,
        size: "md",
        style: styles18.avatar
      }
    ), /* @__PURE__ */ React74.createElement(View66, { style: styles18.content }, /* @__PURE__ */ React74.createElement(View66, { style: styles18.headerRow }, /* @__PURE__ */ React74.createElement(View66, { style: styles18.nameContainer }, pinned && /* @__PURE__ */ React74.createElement(Text49, { style: [styles18.iconPin, { color: tokens.color.brand.default }] }, "\u{1F4CC}"), /* @__PURE__ */ React74.createElement(
      Text49,
      {
        style: [
          styles18.name,
          { color: tokens.color.text.primary },
          muted && { color: tokens.color.text.secondary }
        ],
        numberOfLines: 1
      },
      name
    ), muted && /* @__PURE__ */ React74.createElement(Text49, { style: [styles18.iconMute, { color: tokens.color.text.tertiary }] }, "\u{1F515}")), time && /* @__PURE__ */ React74.createElement(
      Text49,
      {
        style: [
          styles18.time,
          { color: tokens.color.text.tertiary },
          unread && unread > 0 ? { color: tokens.color.brand.default, fontWeight: "600" } : void 0
        ]
      },
      time
    )), /* @__PURE__ */ React74.createElement(View66, { style: styles18.previewRow }, /* @__PURE__ */ React74.createElement(View66, { style: styles18.previewContainer }, outgoing && /* @__PURE__ */ React74.createElement(Text49, { style: [styles18.checkmark, { color: read ? tokens.color.info.icon : tokens.color.text.tertiary }] }, read ? "\u2713\u2713" : "\u2713"), preview && /* @__PURE__ */ React74.createElement(Text49, { style: [styles18.preview, { color: tokens.color.text.secondary }], numberOfLines: 1 }, preview)), /* @__PURE__ */ React74.createElement(View66, { style: styles18.rightContainer }, unread && unread > 0 && /* @__PURE__ */ React74.createElement(Badge, { label: String(unread), size: "sm" }), trailingElement))))
  );
}
var styles18 = StyleSheet22.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 72
  },
  avatar: {
    marginRight: 12
  },
  content: {
    flex: 1,
    justifyContent: "center"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    flex: 1
  },
  iconPin: {
    marginRight: 4,
    fontSize: 14
  },
  iconMute: {
    marginLeft: 4,
    fontSize: 14
  },
  time: {
    fontSize: 13,
    lineHeight: 16,
    textAlign: "right"
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8
  },
  checkmark: {
    fontSize: 12,
    marginRight: 4
  },
  preview: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  }
});

// src/components/MessageInput/MessageInput.tsx
import React75, { useRef as useRef5, useState as useState16 } from "react";
import { View as View67, TextInput as RNTextInput2, Pressable as Pressable35, StyleSheet as StyleSheet23, Text as Text50 } from "react-native";
import Animated33, { useSharedValue as useSharedValue21, useAnimatedStyle as useAnimatedStyle23, withTiming as withTiming15 } from "react-native-reanimated";
import { useTokens as useTokens53, useComponentTokens as useComponentTokens66, useIconStyle as useIconStyle6 } from "@truongdq01/headless";
function MessageInput({
  leftActions,
  rightActions,
  showAttach = true,
  showSticker = true,
  showSend = true,
  onSend,
  onAttach,
  onSticker,
  sendButton,
  glassEffect = true,
  disabled = false,
  value,
  onChangeText,
  placeholder = "Type a message...",
  ...rest
}) {
  const tokens = useTokens53();
  const { input } = useComponentTokens66();
  const { size: iconSize } = useIconStyle6("input");
  const inputRef = useRef5(null);
  const [focused, setFocused] = useState16(false);
  const [text, setText] = useState16(value ?? "");
  const height = useSharedValue21(48);
  const attachVisible = useSharedValue21(1);
  const hasText = text.length > 0;
  React75.useEffect(() => {
    attachVisible.value = withTiming15(hasText ? 0 : 1, { duration: 180 });
  }, [hasText]);
  const inputStyle = useAnimatedStyle23(() => ({
    minHeight: height.value
  }));
  const attachStyle = useAnimatedStyle23(() => ({
    opacity: attachVisible.value,
    transform: [{ scale: attachVisible.value }],
    width: attachVisible.value > 0.5 ? 40 : 0
  }));
  const handleSend = () => {
    if (text.trim() && onSend) {
      onSend(text.trim());
      setText("");
    }
  };
  const handleChangeText = (newText) => {
    setText(newText);
    onChangeText?.(newText);
  };
  return /* @__PURE__ */ React75.createElement(
    View67,
    {
      style: [
        styles19.container,
        glassEffect && {
          backgroundColor: tokens.color.surface.glass,
          borderTopColor: tokens.color.surface.glassBorder,
          borderTopWidth: 0.5
        },
        !glassEffect && {
          backgroundColor: tokens.color.surface.default,
          borderTopColor: tokens.color.border.subtle,
          borderTopWidth: 1
        }
      ]
    },
    showAttach && /* @__PURE__ */ React75.createElement(Animated33.View, { style: attachStyle }, /* @__PURE__ */ React75.createElement(
      Pressable35,
      {
        style: styles19.actionButton,
        onPress: onAttach,
        disabled,
        hitSlop: 8
      },
      /* @__PURE__ */ React75.createElement(View67, { style: [styles19.iconButton, { opacity: disabled ? 0.3 : 0.7 }] }, /* @__PURE__ */ React75.createElement(Text50, { style: styles19.icon }, "\u{1F4CE}"))
    )),
    leftActions,
    /* @__PURE__ */ React75.createElement(Animated33.View, { style: [styles19.inputWrapper, inputStyle] }, /* @__PURE__ */ React75.createElement(
      RNTextInput2,
      {
        ref: inputRef,
        style: [
          styles19.input,
          { color: tokens.color.text.primary },
          focused && { borderColor: tokens.color.border.focus }
        ],
        placeholder,
        placeholderTextColor: tokens.color.text.tertiary,
        editable: !disabled,
        value: text,
        onChangeText: handleChangeText,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        multiline: true,
        textAlignVertical: "center",
        ...rest
      }
    ), showSticker && /* @__PURE__ */ React75.createElement(
      Pressable35,
      {
        style: styles19.stickerButton,
        onPress: onSticker,
        disabled,
        hitSlop: 8
      },
      /* @__PURE__ */ React75.createElement(Text50, { style: [styles19.icon, { opacity: disabled ? 0.3 : 0.7 }] }, "\u{1F60A}")
    )),
    rightActions,
    showSend && (sendButton ?? /* @__PURE__ */ React75.createElement(
      Pressable35,
      {
        style: [
          styles19.sendButton,
          hasText && { backgroundColor: tokens.color.brand.default },
          disabled && { opacity: 0.3 }
        ],
        onPress: handleSend,
        disabled: disabled || !hasText,
        hitSlop: 8
      },
      /* @__PURE__ */ React75.createElement(Text50, { style: [styles19.sendIcon, hasText && { color: "#FFFFFF" }] }, hasText ? "\u27A4" : "\u{1F3A4}")
    ))
  );
}
var styles19 = StyleSheet23.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 56
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center"
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgba(0,0,0,0.03)",
    overflow: "hidden",
    minHeight: 40
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingRight: 40,
    maxHeight: 120
  },
  stickerButton: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4
  },
  icon: {
    fontSize: 20
  },
  sendIcon: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(0,0,0,0.3)"
  }
});

// src/components/TelegramPopup/TelegramPopup.tsx
import React76, { useCallback as useCallback9 } from "react";
import { View as View68, Text as Text51, Pressable as Pressable36, StyleSheet as StyleSheet24, Modal as Modal12, useWindowDimensions as useWindowDimensions5 } from "react-native";
import Animated34, {
  useSharedValue as useSharedValue22,
  useAnimatedStyle as useAnimatedStyle24,
  withTiming as withTiming16,
  withSpring as withSpring14,
  runOnJS as runOnJS7
} from "react-native-reanimated";
import { useTokens as useTokens54 } from "@truongdq01/headless";
import { BlurView as BlurView2 } from "expo-blur";
function TelegramPopup({
  open,
  message,
  title,
  actions,
  onClose,
  autoHideDuration = 3e3,
  position = "top",
  blur = true,
  icon,
  variant = "default"
}) {
  const tokens = useTokens54();
  const { height: windowHeight } = useWindowDimensions5();
  const [mounted, setMounted] = React76.useState(open);
  const translateY = useSharedValue22(position === "bottom" ? 100 : -100);
  const opacity = useSharedValue22(0);
  const scale = useSharedValue22(0.95);
  const animateIn = useCallback9(() => {
    translateY.value = withSpring14(0, { damping: 25, stiffness: 300 });
    opacity.value = withTiming16(1, { duration: 200 });
    scale.value = withSpring14(1, { damping: 25, stiffness: 300 });
  }, []);
  const animateOut = useCallback9((onDone) => {
    translateY.value = withTiming16(position === "bottom" ? 100 : -100, { duration: 200 });
    opacity.value = withTiming16(0, { duration: 150 }, (done) => {
      if (done) runOnJS7(onDone)();
    });
  }, [position]);
  React76.useEffect(() => {
    if (open) {
      setMounted(true);
      translateY.value = position === "bottom" ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  React76.useEffect(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const positionStyle = position === "top" ? { top: 48, alignSelf: "center" } : position === "bottom" ? { bottom: 96, alignSelf: "center" } : { alignSelf: "center", top: windowHeight / 2 - 50 };
  const animStyle = useAnimatedStyle24(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  const variantColors = {
    default: tokens.color.bg.default,
    success: tokens.color.success.bg,
    error: tokens.color.error.bg,
    warning: tokens.color.warning.bg,
    info: tokens.color.info.bg
  };
  if (!mounted && !open) return null;
  return /* @__PURE__ */ React76.createElement(Modal12, { visible: mounted || open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React76.createElement(Pressable36, { style: styles20.overlay, onPress: onClose }, blur && /* @__PURE__ */ React76.createElement(
    BlurView2,
    {
      style: StyleSheet24.absoluteFill,
      tint: tokens.color.bg.default === "#FFFFFF" ? "light" : "dark",
      intensity: 20
    }
  ), /* @__PURE__ */ React76.createElement(
    Animated34.View,
    {
      style: [
        styles20.popup,
        positionStyle,
        animStyle,
        {
          backgroundColor: variantColors[variant],
          shadowColor: tokens.color.bg.inverse,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          borderRadius: 16
        }
      ]
    },
    /* @__PURE__ */ React76.createElement(View68, { style: styles20.content }, icon && /* @__PURE__ */ React76.createElement(View68, { style: styles20.iconContainer }, icon), /* @__PURE__ */ React76.createElement(View68, { style: styles20.textContent }, title && /* @__PURE__ */ React76.createElement(Text51, { style: [styles20.title, { color: tokens.color.text.primary }] }, title), typeof message === "string" ? /* @__PURE__ */ React76.createElement(Text51, { style: [styles20.message, { color: tokens.color.text.secondary }] }, message) : message)),
    actions && /* @__PURE__ */ React76.createElement(View68, { style: styles20.actions }, actions)
  )));
}
var styles20 = StyleSheet24.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  popup: {
    position: "absolute",
    marginHorizontal: 16,
    minWidth: 280,
    maxWidth: 340,
    padding: 16,
    elevation: 6
  },
  content: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    marginRight: 12
  },
  textContent: {
    flex: 1
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 2
  },
  message: {
    fontSize: 14,
    lineHeight: 18
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 8
  }
});

// src/components/TelegramContextMenu/TelegramContextMenu.tsx
import React77, { useCallback as useCallback10 } from "react";
import { View as View69, Text as Text52, Pressable as Pressable37, StyleSheet as StyleSheet25, Modal as Modal13, useWindowDimensions as useWindowDimensions6 } from "react-native";
import Animated35, {
  useSharedValue as useSharedValue23,
  useAnimatedStyle as useAnimatedStyle25,
  withTiming as withTiming17,
  withSpring as withSpring15,
  runOnJS as runOnJS8
} from "react-native-reanimated";
import { useTokens as useTokens55 } from "@truongdq01/headless";
function TelegramContextMenu({
  open,
  onClose,
  items,
  anchor
}) {
  const tokens = useTokens55();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions6();
  const [mounted, setMounted] = React77.useState(open);
  const [menuSize, setMenuSize] = React77.useState({ width: 200, height: 0 });
  const opacity = useSharedValue23(0);
  const scale = useSharedValue23(0.9);
  const animateIn = useCallback10(() => {
    opacity.value = withTiming17(1, { duration: 180 });
    scale.value = withSpring15(1, { damping: 18, stiffness: 320 });
  }, []);
  const animateOut = useCallback10((onDone) => {
    opacity.value = withTiming17(0, { duration: 130 });
    scale.value = withTiming17(0.92, { duration: 130 }, (done) => {
      if (done) runOnJS8(onDone)();
    });
  }, []);
  React77.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  const GAP = 8;
  let top = 100;
  let left = windowWidth - 220;
  if (anchor) {
    top = anchor.y + anchor.height + GAP;
    left = anchor.x;
    if (left + menuSize.width > windowWidth - 16) {
      left = windowWidth - menuSize.width - 16;
    }
    if (top + menuSize.height > windowHeight - 16) {
      top = anchor.y - menuSize.height - GAP;
    }
    top = Math.max(16, top);
    left = Math.max(16, left);
  }
  const animStyle = useAnimatedStyle25(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ React77.createElement(Modal13, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React77.createElement(Pressable37, { style: styles21.overlay, onPress: onClose }), /* @__PURE__ */ React77.createElement(
    Animated35.View,
    {
      onLayout: (e) => {
        setMenuSize({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height
        });
      },
      style: [
        styles21.menu,
        animStyle,
        {
          position: "absolute",
          top,
          left,
          backgroundColor: tokens.color.surface.default,
          borderRadius: 14,
          shadowColor: tokens.color.bg.inverse,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 18,
          elevation: 8
        }
      ]
    },
    items.map((item, index) => /* @__PURE__ */ React77.createElement(
      Pressable37,
      {
        key: item.id,
        onPress: () => {
          item.onPress?.();
          onClose();
        },
        disabled: item.disabled,
        style: ({ pressed }) => [
          styles21.item,
          index === 0 && { borderTopLeftRadius: 14, borderTopRightRadius: 14 },
          index === items.length - 1 && { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
          pressed && { backgroundColor: tokens.color.surface.hover },
          item.disabled && { opacity: 0.3 }
        ]
      },
      item.icon && /* @__PURE__ */ React77.createElement(View69, { style: styles21.itemIcon }, item.icon),
      /* @__PURE__ */ React77.createElement(
        Text52,
        {
          style: [
            styles21.itemLabel,
            { color: item.destructive ? tokens.color.error.text : tokens.color.text.primary }
          ]
        },
        item.label
      )
    ))
  ));
}
var styles21 = StyleSheet25.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  menu: {
    minWidth: 180,
    overflow: "hidden"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48
  },
  itemIcon: {
    marginRight: 12,
    width: 20,
    alignItems: "center"
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20
  }
});

// src/components/TelegramSettingsMenu/TelegramSettingsMenu.tsx
import React78 from "react";
import { View as View70, Text as Text53, Pressable as Pressable38, StyleSheet as StyleSheet26 } from "react-native";
import { useTokens as useTokens56 } from "@truongdq01/headless";
function TelegramSettingsMenu({ sections, variant = "grouped" }) {
  const tokens = useTokens56();
  return /* @__PURE__ */ React78.createElement(View70, { style: styles22.container }, sections.map((section, sectionIndex) => /* @__PURE__ */ React78.createElement(React78.Fragment, { key: sectionIndex }, section.title && /* @__PURE__ */ React78.createElement(View70, { style: styles22.sectionHeader }, /* @__PURE__ */ React78.createElement(Text53, { style: [styles22.sectionTitle, { color: tokens.color.text.secondary }] }, section.title)), /* @__PURE__ */ React78.createElement(
    View70,
    {
      style: [
        styles22.section,
        variant === "grouped" && {
          backgroundColor: tokens.color.surface.default,
          borderRadius: 12,
          marginHorizontal: 16,
          overflow: "hidden"
        }
      ]
    },
    section.items.map((item, itemIndex) => /* @__PURE__ */ React78.createElement(
      Pressable38,
      {
        key: item.id,
        onPress: item.onPress,
        disabled: item.disabled,
        style: ({ pressed }) => [
          styles22.item,
          pressed && { backgroundColor: tokens.color.surface.hover },
          item.disabled && { opacity: 0.3 },
          itemIndex !== section.items.length - 1 && {
            borderBottomWidth: StyleSheet26.hairlineWidth,
            borderBottomColor: tokens.color.border.subtle,
            marginLeft: 56
          }
        ]
      },
      item.icon && /* @__PURE__ */ React78.createElement(View70, { style: styles22.itemIcon }, item.icon),
      /* @__PURE__ */ React78.createElement(View70, { style: styles22.itemContent }, /* @__PURE__ */ React78.createElement(
        Text53,
        {
          style: [
            styles22.itemLabel,
            { color: item.destructive ? tokens.color.error.text : tokens.color.text.primary }
          ]
        },
        item.label
      ), item.subtitle && /* @__PURE__ */ React78.createElement(Text53, { style: [styles22.itemSubtitle, { color: tokens.color.text.secondary }] }, item.subtitle)),
      /* @__PURE__ */ React78.createElement(View70, { style: styles22.itemRight }, item.value, /* @__PURE__ */ React78.createElement(Text53, { style: [styles22.chevron, { color: tokens.color.text.tertiary }] }, "\u203A"))
    ))
  ))));
}
var styles22 = StyleSheet26.create({
  container: {
    paddingVertical: 16
  },
  sectionHeader: {
    paddingHorizontal: 32,
    paddingVertical: 8
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  section: {
    marginBottom: 24
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 52
  },
  itemIcon: {
    width: 28,
    marginRight: 12,
    alignItems: "center"
  },
  itemContent: {
    flex: 1
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22
  },
  itemSubtitle: {
    fontSize: 13,
    lineHeight: 16,
    marginTop: 2
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  chevron: {
    fontSize: 20,
    fontWeight: "400"
  }
});

// src/index.ts
import { StyleSheet as StyleSheet27 } from "react-native";
export {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
  CalendarGrid,
  Card,
  Carousel,
  ChatListItem,
  Checkbox,
  Chip,
  CircularProgress,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  EmptyState,
  Fab,
  Form,
  FormControl,
  FormControlLabel,
  FormField,
  FormGroup,
  FormHelperText,
  FormLabel,
  GlassCard,
  Gradient,
  Grid2 as Grid,
  ICON_MAP,
  Icon,
  IconWrapper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  LinearProgress,
  Link,
  List2 as List,
  ListData,
  ListItem,
  ListItemIcon,
  ListItemText,
  Marquee,
  Menu2 as Menu,
  MenuItem,
  MessageInput,
  Modal7 as Modal,
  OTPInput,
  Pagination,
  Paper,
  PasswordInput,
  Popover,
  Popper,
  Pressable20 as Pressable,
  RadioGroup,
  RadioItem,
  Rating,
  RnImage,
  SegmentedControl,
  Select,
  Skeleton,
  SkeletonCard,
  SkeletonForm,
  SkeletonGrid,
  SkeletonGroup,
  SkeletonListItem,
  SkeletonMedia,
  SkeletonProfile,
  SkeletonTable,
  SkeletonText,
  Slider,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Step,
  StepLabel,
  Stepper,
  StyleSheet27 as StyleSheet,
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
  TelegramContextMenu,
  TelegramPopup,
  TelegramSettingsMenu,
  TelegramTab,
  TelegramTabBar,
  TextArea,
  TextField,
  ThemeProvider,
  TimePickerWheels,
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
  createTheme,
  useActiveBrand,
  useBrandSwitch,
  useComponentTokens67 as useComponentTokens,
  useForm,
  useFormControl,
  useIsDark2 as useIsDark,
  useTheme,
  useTokens57 as useTokens
};
//# sourceMappingURL=index.mjs.map