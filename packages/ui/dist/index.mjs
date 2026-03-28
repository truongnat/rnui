// src/index.ts
import { ThemeProvider, useTheme, useTokens as useTokens48, useComponentTokens as useComponentTokens63, useIsDark, useActiveBrand, useBrandSwitch, createTheme } from "@truongdq01/headless";

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
import { useDisclosure, useTokens as useTokens2, useComponentTokens as useComponentTokens2, usePressable } from "@truongdq01/headless";

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
  const resolvedColor = iconTokens.color[color] ?? color ?? tokens.color.text.primary;
  const IconComp = ICON_MAP[iconNameString] || Info;
  return /* @__PURE__ */ React.createElement(View, { style: [{ width: resolvedSize, height: resolvedSize, alignItems: "center", justifyContent: "center" }, style] }, /* @__PURE__ */ React.createElement(IconComp, { size: resolvedSize, color: resolvedColor }));
}
function IconWrapper({ children, size, color }) {
  const tokens = useTokens();
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, {
    color: children.props?.color ?? color ?? tokens.color.text.primary,
    size: children.props?.size ?? size
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
  const rotation = useSharedValue(ctx.expanded ? 1 : 0);
  React2.useEffect(() => {
    rotation.value = withTiming(ctx.expanded ? 1 : 0, { duration: 200 });
  }, [ctx.expanded]);
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
      ...accessibilityProps
    },
    /* @__PURE__ */ React2.createElement(Text2, { style: accordion.title }, children),
    /* @__PURE__ */ React2.createElement(Animated.View, { style: iconStyle }, expandIcon ?? /* @__PURE__ */ React2.createElement(Icon, { size: accordion.icon.size, color: accordion.icon.color, name: "chevronDown" }))
  ));
}
function AccordionDetails({ children }) {
  const { accordion } = useComponentTokens2();
  const ctx = useContext(AccordionContext);
  const [contentHeight, setContentHeight] = React2.useState(0);
  const animHeight = useSharedValue(0);
  React2.useEffect(() => {
    if (!ctx) return;
    animHeight.value = withTiming(ctx.expanded ? contentHeight : 0, { duration: 250 });
  }, [ctx?.expanded, contentHeight]);
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
import { FlashList } from "@shopify/flash-list";
import Animated2, { FadeInDown, Layout as Layout2 } from "react-native-reanimated";
import { useComponentTokens as useComponentTokens4 } from "@truongdq01/headless";
var ReanimatedFlashList = Animated2.createAnimatedComponent(FlashList);
var AnimatedList = forwardRef(({
  data,
  renderItem,
  itemEntering = FadeInDown,
  itemExiting,
  itemLayout = Layout2.springify().damping(16).stiffness(150),
  staggerEntering = false,
  staggerDelay = 50,
  itemContainerStyle,
  ...flashListProps
}, ref) => {
  const { animatedList } = useComponentTokens4();
  const AnimatedCell = ({ item, index, target, ...props }) => {
    const enteringAnim = staggerEntering && itemEntering?.delay ? itemEntering.delay(Math.min(index * staggerDelay, 500)) : itemEntering;
    return /* @__PURE__ */ React4.createElement(
      Animated2.View,
      {
        entering: enteringAnim,
        exiting: itemExiting,
        layout: itemLayout,
        style: [animatedList.item, itemContainerStyle, styles.itemWrapper]
      },
      renderItem({ item, index, target, separators: {} })
    );
  };
  return /* @__PURE__ */ React4.createElement(
    ReanimatedFlashList,
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
});
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
import React7, { useState as useState2, useRef } from "react";
import { View as View7, Text as Text5, Pressable as Pressable2, Modal, useWindowDimensions } from "react-native";
import Animated3, {
  useSharedValue as useSharedValue2,
  useAnimatedStyle as useAnimatedStyle2,
  withTiming as withTiming2,
  withSpring,
  Easing
} from "react-native-reanimated";
import { useAutocomplete, useTokens as useTokens6, useComponentTokens as useComponentTokens7 } from "@truongdq01/headless";

// src/components/Input/Input.tsx
import React6, { useMemo as useMemo4, useState } from "react";
import { TextInput as RNTextInput, View as View6, Text as Text4 } from "react-native";
import { useComponentTokens as useComponentTokens6, useTokens as useTokens5, useIconStyle } from "@truongdq01/headless";
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
  const { input } = useComponentTokens6();
  const tokens = useTokens5();
  const { size: iconSize, color: iconColor } = useIconStyle("input");
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
  const containerStyle = useMemo4(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ], [input, size, isFocused, error, disabled]);
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React6.isValidElement(icon)) {
      return React6.cloneElement(icon, {
        size: icon.props?.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React6.createElement(View6, null, label && /* @__PURE__ */ React6.createElement(Text4, { style: input.label }, label), /* @__PURE__ */ React6.createElement(View6, { style: containerStyle }, renderIcon(leadingElement), /* @__PURE__ */ React6.createElement(
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
  ), renderIcon(trailingElement)), error ? /* @__PURE__ */ React6.createElement(Text4, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ React6.createElement(Text4, { style: input.helperText }, helperText) : null);
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
  const opacity = useSharedValue2(0);
  const scale = useSharedValue2(0.95);
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
          opacity.value = withTiming2(1, { duration: 160, easing: Easing.out(Easing.cubic) });
          scale.value = withSpring(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };
  const handleClose = () => {
    opacity.value = withTiming2(0, { duration: 120 });
    scale.value = withTiming2(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };
  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;
  const dropdownTop = showAbove ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP : inputRect.pageY + inputRect.height + GAP;
  const dropdownAnimStyle = useAnimatedStyle2(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ React7.createElement(View7, { ref: inputRef }, /* @__PURE__ */ React7.createElement(
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
  ), dropdownMounted && filteredOptions.length > 0 && /* @__PURE__ */ React7.createElement(Modal, { transparent: true, animationType: "none", visible: dropdownMounted, onRequestClose: handleClose }, /* @__PURE__ */ React7.createElement(Pressable2, { style: { flex: 1 }, onPress: handleClose }), /* @__PURE__ */ React7.createElement(
    Animated3.View,
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
      return /* @__PURE__ */ React7.createElement(
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
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ React7.createElement(Text5, { style: { color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, labelOf(option))
      );
    })
  )));
}

// src/components/Avatar/Avatar.tsx
import React8 from "react";
import { View as View8, Text as Text6, Image as Image2 } from "react-native";
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
  return /* @__PURE__ */ React8.createElement(
    View8,
    {
      style: [{ width: sizeConfig.width, height: sizeConfig.height }, style],
      accessible: !!accessibilityLabel,
      accessibilityLabel
    },
    src ? /* @__PURE__ */ React8.createElement(
      Image2,
      {
        source: { uri: src },
        style: { width: sizeConfig.width, height: sizeConfig.height, borderRadius: radius },
        accessibilityLabel
      }
    ) : initials ? /* @__PURE__ */ React8.createElement(
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
      /* @__PURE__ */ React8.createElement(
        Text6,
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
      /* @__PURE__ */ React8.createElement(
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
        fallbackIcon ?? /* @__PURE__ */ React8.createElement(Text6, { style: { fontSize: sizeConfig.fontSize, color: tokens.color.text.tertiary } }, "?")
      )
    ),
    status && /* @__PURE__ */ React8.createElement(
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
  return /* @__PURE__ */ React8.createElement(
    View8,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ React8.createElement(
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
      /* @__PURE__ */ React8.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ React8.createElement(
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
      /* @__PURE__ */ React8.createElement(
        Text6,
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
import React9, { useMemo as useMemo5 } from "react";
import { View as View9, Text as Text7 } from "react-native";
import { useComponentTokens as useComponentTokens9, useIconStyle as useIconStyle2 } from "@truongdq01/headless";
var Badge = React9.memo(({ label, variant = "default", size = "md", icon }) => {
  const { badge } = useComponentTokens9();
  const { size: iconSize } = useIconStyle2("list");
  const containerStyle = useMemo5(() => [
    badge.base,
    badge.size[size],
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    }
  ], [badge, variant, size]);
  const textStyle = useMemo5(() => [
    badge.text,
    { color: badge.variant[variant].text }
  ], [badge, variant]);
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (React9.isValidElement(el)) {
      return React9.cloneElement(el, {
        size: el.props?.size ?? iconSize * 0.8,
        color: el.props?.color ?? iconColor
      });
    }
    return el;
  };
  return /* @__PURE__ */ React9.createElement(View9, { style: containerStyle }, renderIcon(icon), /* @__PURE__ */ React9.createElement(Text7, { style: textStyle }, label));
});

// src/components/BottomNavigation/BottomNavigation.tsx
import React10, { createContext as createContext2, useContext as useContext2, useMemo as useMemo6 } from "react";
import { View as View10, Text as Text8, Pressable as Pressable3 } from "react-native";
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
  return /* @__PURE__ */ React10.createElement(BottomNavContext.Provider, { value: ctx }, /* @__PURE__ */ React10.createElement(View10, { style: [bottomNavigation.container, { flexDirection: "row", justifyContent: "space-around" }] }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const { bottomNavigation } = useComponentTokens10();
  const tokens = useTokens8();
  const ctx = useContext2(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  return /* @__PURE__ */ React10.createElement(Pressable3, { ...ctx.getItemProps(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ React10.createElement(Text8, { style: { fontSize: tokens.fontSize.xs, color: selected ? bottomNavigation.item.active.color : bottomNavigation.item.inactive.color } }, label));
}

// src/components/BottomSheet/BottomSheet.tsx
import React11, { forwardRef as forwardRef2, useImperativeHandle, useState as useState3 } from "react";
import { View as View11, StyleSheet as StyleSheet2, Dimensions, Modal as Modal2 } from "react-native";
import Animated4 from "react-native-reanimated";
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
    borderRadius
  }, ref) {
    const { bottomSheet } = useComponentTokens11();
    const insets = useSafeAreaInsets();
    const [mounted, setMounted] = useState3(false);
    const handleClose = React11.useCallback(() => {
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
    const open = React11.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    useImperativeHandle(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ React11.createElement(Modal2, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ React11.createElement(View11, { style: StyleSheet2.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ React11.createElement(GestureDetector2, { gesture: backdropTapGesture }, /* @__PURE__ */ React11.createElement(
      Animated4.View,
      {
        style: [
          StyleSheet2.absoluteFill,
          bottomSheet.backdrop,
          backdropAnimatedStyle
        ]
      }
    )), /* @__PURE__ */ React11.createElement(
      Animated4.View,
      {
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
      /* @__PURE__ */ React11.createElement(GestureDetector2, { gesture: panGesture }, /* @__PURE__ */ React11.createElement(View11, { style: styles2.handleArea }, showHandle && /* @__PURE__ */ React11.createElement(
        View11,
        {
          style: [
            styles2.handle,
            bottomSheet.handle
          ]
        }
      ))),
      /* @__PURE__ */ React11.createElement(View11, { style: { flex: 1 } }, children)
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
import React12 from "react";
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
  return /* @__PURE__ */ React12.createElement(View12, { style: merged }, children);
}

// src/components/Breadcrumbs/Breadcrumbs.tsx
import React13 from "react";
import { View as View13, Text as Text9 } from "react-native";
import { useComponentTokens as useComponentTokens13 } from "@truongdq01/headless";
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const { breadcrumbs } = useComponentTokens13();
  const items = React13.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ React13.createElement(Text9, { key: "ellipsis", style: { color: breadcrumbs.separator.color } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ React13.createElement(View13, { style: breadcrumbs.container }, displayItems.map((child, idx) => /* @__PURE__ */ React13.createElement(React13.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ React13.createElement(Text9, { style: { marginHorizontal: breadcrumbs.container.gap, color: breadcrumbs.separator.color, fontSize: breadcrumbs.separator.fontSize } }, separator))));
}

// src/components/Button/Button.tsx
import React14, { useMemo as useMemo7 } from "react";
import Animated5 from "react-native-reanimated";
import { GestureDetector as GestureDetector3 } from "react-native-gesture-handler";
import { ActivityIndicator, Text as Text10, View as View14, StyleSheet as StyleSheet3, Linking } from "react-native";
import { usePressable as usePressable2, useComponentTokens as useComponentTokens14, useIconStyle as useIconStyle3, useTokens as useTokens10 } from "@truongdq01/headless";
var Button = React14.memo(({
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
  const { size: iconSize } = useIconStyle3("button");
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
  const handlePress = useMemo7(() => {
    if (!href) return onPress;
    return () => {
      onPress?.();
      Linking.openURL(href);
    };
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
  const iconColor = String(textStyle[0]?.color ?? button.variant[resolvedVariant].text.color);
  const content = children ?? label;
  const isTextContent = typeof content === "string" || typeof content === "number";
  const leading = startIcon ?? leadingIcon;
  const trailing = endIcon ?? trailingIcon;
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React14.isValidElement(icon)) {
      return React14.cloneElement(icon, {
        size: icon.props?.size ?? iconSize,
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ React14.createElement(GestureDetector3, { gesture }, /* @__PURE__ */ React14.createElement(
    Animated5.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ React14.createElement(View14, { style: [
      styles3.contentContainer,
      {
        gap: button.variant[resolvedVariant].container.gap,
        opacity: loading && loadingPosition === "center" ? 0 : 1
      }
    ] }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ React14.createElement(ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ React14.createElement(Text10, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ React14.createElement(ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ React14.createElement(View14, { style: [StyleSheet3.absoluteFill, styles3.loadingWrapper] }, loadingIndicator ?? /* @__PURE__ */ React14.createElement(ActivityIndicator, { size: "small", color: iconColor }))
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
import React15 from "react";
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
  const items = React15.Children.toArray(children);
  return /* @__PURE__ */ React15.createElement(
    View15,
    {
      style: {
        ...buttonGroup.container,
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start"
      }
    },
    items.map((child, i) => {
      if (!React15.isValidElement(child)) return child;
      const element = child;
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
      return React15.cloneElement(element, {
        variant,
        size,
        disabled: disabled || element.props?.disabled,
        fullWidth: fullWidth || element.props?.fullWidth,
        style: [
          { borderRadius: 0, borderWidth: 0 },
          borderStyle,
          radiusStyle,
          element.props?.style
        ].filter(Boolean)
      });
    })
  );
}

// src/components/Card/Card.tsx
import React16, { useMemo as useMemo8 } from "react";
import Animated6 from "react-native-reanimated";
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
    return /* @__PURE__ */ React16.createElement(GestureDetector4, { gesture }, /* @__PURE__ */ React16.createElement(Animated6.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ React16.createElement(View16, { style: containerStyle }, children);
}

// src/components/Carousel/Carousel.tsx
import React17 from "react";
import { View as View17, Dimensions as Dimensions2, ScrollView } from "react-native";
import Animated7, {
  useAnimatedStyle as useAnimatedStyle3,
  interpolate as interpolate2,
  Extrapolation as Extrapolation2
} from "react-native-reanimated";
import { useCarousel, useComponentTokens as useComponentTokens17 } from "@truongdq01/headless";
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
  const { carousel } = useComponentTokens17();
  const {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    itemStep,
    n
  } = useCarousel({
    data,
    itemWidth,
    gap,
    loop,
    autoPlay,
    autoPlayInterval
  });
  return /* @__PURE__ */ React17.createElement(View17, { style: { height } }, /* @__PURE__ */ React17.createElement(
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
        paddingHorizontal: (SCREEN_WIDTH - itemWidth) / 2,
        gap
      }
    },
    displayData.map((item, index) => {
      return /* @__PURE__ */ React17.createElement(View17, { key: index, style: { width: itemWidth, height } }, renderItem(item, loop ? (index - 1 + n) % n : index));
    })
  ), showPagination && /* @__PURE__ */ React17.createElement(
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
      return /* @__PURE__ */ React17.createElement(
        PaginationDot,
        {
          key: i,
          index: i,
          scrollX,
          itemStep,
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
  isLoop,
  n
}) {
  const { carousel } = useComponentTokens17();
  const dotStyle = useAnimatedStyle3(() => {
    let activeIndex = scrollX.value / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }
    const opacity = interpolate2(
      activeIndex,
      [index - 1, index, index + 1],
      [carousel.dot.inactive.opacity, 1, carousel.dot.inactive.opacity],
      Extrapolation2.CLAMP
    );
    const width = interpolate2(
      activeIndex,
      [index - 1, index, index + 1],
      [carousel.dot.inactive.width, carousel.dot.active.width, carousel.dot.inactive.width],
      Extrapolation2.CLAMP
    );
    return {
      width,
      opacity,
      backgroundColor: carousel.dot.active.bg,
      height: carousel.dot.height,
      borderRadius: carousel.dot.borderRadius
    };
  });
  return /* @__PURE__ */ React17.createElement(Animated7.View, { style: dotStyle });
}

// src/components/Checkbox/Checkbox.tsx
import React18 from "react";
import { View as View18, Text as Text11, Pressable as Pressable4 } from "react-native";
import Animated8, {
  useSharedValue as useSharedValue3,
  useAnimatedStyle as useAnimatedStyle4,
  withSpring as withSpring2,
  interpolate as interpolate3
} from "react-native-reanimated";
import { useCheckbox, useComponentTokens as useComponentTokens18, useTokens as useTokens12 } from "@truongdq01/headless";
import { spring } from "@truongdq01/tokens";
function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}) {
  const { checkbox } = useComponentTokens18();
  const tokens = useTokens12();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = useCheckbox(hookOptions);
  const sizeConfig = checkbox.size[size];
  const scale = useSharedValue3(1);
  const fillProgress = useSharedValue3(isChecked || isIndeterminate ? 1 : 0);
  React18.useEffect(() => {
    fillProgress.value = withSpring2(isChecked || isIndeterminate ? 1 : 0, spring.snappy);
  }, [isChecked, isIndeterminate]);
  const boxStyle = useAnimatedStyle4(() => ({
    backgroundColor: interpolate3(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5 ? checkbox.state.checked.backgroundColor : checkbox.state.default.backgroundColor,
    borderColor: fillProgress.value > 0.5 ? checkbox.state.checked.borderColor : checkbox.state.default.borderColor,
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = useAnimatedStyle4(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    scale.value = withSpring2(0.88, spring.snappy, () => {
      scale.value = withSpring2(1, spring.snappy);
    });
    toggle();
  };
  return /* @__PURE__ */ React18.createElement(
    Pressable4,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? checkbox.state.disabled.opacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React18.createElement(
      Animated8.View,
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
      /* @__PURE__ */ React18.createElement(Animated8.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ React18.createElement(View18, { style: { width: sizeConfig.iconSize, height: 2, backgroundColor: tokens.color.text.inverse, borderRadius: 1 } }) : /* @__PURE__ */ React18.createElement(Text11, { style: { color: tokens.color.text.inverse, fontSize: sizeConfig.iconSize, fontWeight: "700", lineHeight: sizeConfig.iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ React18.createElement(View18, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React18.createElement(Text11, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React18.createElement(Text11, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Chip/Chip.tsx
import React19 from "react";
import { View as View19, Text as Text12, Pressable as Pressable5 } from "react-native";
import { useTokens as useTokens13, useIconStyle as useIconStyle4, useComponentTokens as useComponentTokens19 } from "@truongdq01/headless";
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
  const { size: iconSize, color: iconColor } = useIconStyle4("list");
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
    if (React19.isValidElement(node)) {
      return React19.cloneElement(node, {
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
  const content = /* @__PURE__ */ React19.createElement(View19, { style: container }, avatar && /* @__PURE__ */ React19.createElement(View19, { style: avatarStyle }, avatar), renderIcon(icon), /* @__PURE__ */ React19.createElement(Text12, { style: {
    color: customText,
    fontSize: sizeStyle.fontSize,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: sizeStyle.fontSize * 1.4
  } }, label), onDelete && /* @__PURE__ */ React19.createElement(
    Pressable5,
    {
      onPress: onDelete,
      hitSlop: 8,
      style: deleteButtonStyle
    },
    deleteIcon ?? /* @__PURE__ */ React19.createElement(Text12, { style: {
      color: customText,
      fontSize: 14,
      fontWeight: tokens.fontWeight.bold,
      opacity: 0.7
    } }, "\xD7")
  ));
  if (onClick || clickable) {
    return /* @__PURE__ */ React19.createElement(
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
import React20 from "react";
import { ActivityIndicator as ActivityIndicator2, View as View20, Text as Text13, StyleSheet as StyleSheet4 } from "react-native";
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
  return /* @__PURE__ */ React20.createElement(View20, { style: [styles4.container, style] }, /* @__PURE__ */ React20.createElement(
    ActivityIndicator2,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ React20.createElement(View20, { style: StyleSheet4.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ React20.createElement(View20, { style: styles4.labelContainer }, /* @__PURE__ */ React20.createElement(Text13, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
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
import React21, { useState as useState4 } from "react";
import { View as View21, Text as Text14, Pressable as Pressable6, Platform, Modal as Modal3 } from "react-native";
import { useTokens as useTokens15, useComponentTokens as useComponentTokens21, useIconStyle as useIconStyle5 } from "@truongdq01/headless";
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
  const { datePicker, input } = useComponentTokens21();
  const tokens = useTokens15();
  const { size: iconSize, color: iconColor } = useIconStyle5("input");
  const [showPicker, setShowPicker] = useState4(false);
  const [selectedPreset, setSelectedPreset] = useState4(null);
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
    if (React21.isValidElement(node)) {
      return React21.cloneElement(node, {
        size: node.props?.size ?? iconSize,
        color: node.props?.color ?? iconColor
      });
    }
    return node;
  };
  const pickerComponent = showPicker ? /* @__PURE__ */ React21.createElement(
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
  return /* @__PURE__ */ React21.createElement(View21, { style: { gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 } }, label && /* @__PURE__ */ React21.createElement(Text14, { style: input.label }, label), presets && presets.length > 0 && /* @__PURE__ */ React21.createElement(View21, { style: { flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" } }, presets.map((preset) => /* @__PURE__ */ React21.createElement(
    Pressable6,
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
    /* @__PURE__ */ React21.createElement(
      Text14,
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
  ))), /* @__PURE__ */ React21.createElement(
    Pressable6,
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
    /* @__PURE__ */ React21.createElement(
      Text14,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: date ? tokens.color.text.primary : tokens.color.text.tertiary
        }
      },
      displayValue
    ),
    clearable && date && /* @__PURE__ */ React21.createElement(Pressable6, { onPress: handleClear, hitSlop: 8 }, /* @__PURE__ */ React21.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" })),
    /* @__PURE__ */ React21.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "calendar" })
  ), error && /* @__PURE__ */ React21.createElement(Text14, { style: input.errorText }, error), Platform.OS === "ios" && showPicker && /* @__PURE__ */ React21.createElement(Modal3, { transparent: true, animationType: "slide", visible: showPicker }, /* @__PURE__ */ React21.createElement(View21, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ React21.createElement(View21, { style: { backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }, /* @__PURE__ */ React21.createElement(View21, { style: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 } }, /* @__PURE__ */ React21.createElement(Pressable6, { onPress: () => setShowPicker(false), hitSlop: 12 }, /* @__PURE__ */ React21.createElement(Text14, { style: { fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Done"))), pickerComponent))), Platform.OS === "android" && pickerComponent);
}

// src/components/Dialog/Dialog.tsx
import React22 from "react";
import { Modal as Modal4, View as View22, Pressable as Pressable7, StyleSheet as StyleSheet5, Text as Text15 } from "react-native";
import { useComponentTokens as useComponentTokens22, useTokens as useTokens16 } from "@truongdq01/headless";
function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  fullWidth = false
}) {
  const { dialog, modal } = useComponentTokens22();
  const tokens = useTokens16();
  if (!open) return null;
  return /* @__PURE__ */ React22.createElement(Modal4, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React22.createElement(View22, { style: modal.overlay }, /* @__PURE__ */ React22.createElement(Pressable7, { style: StyleSheet5.absoluteFill, onPress: onClose }), /* @__PURE__ */ React22.createElement(
    View22,
    {
      style: [
        modal.container,
        {
          padding: tokens.spacing[6],
          width: fullWidth ? "90%" : "80%"
        }
      ]
    },
    title && /* @__PURE__ */ React22.createElement(View22, { style: { marginBottom: tokens.spacing[4] } }, typeof title === "string" ? /* @__PURE__ */ React22.createElement(Text15, { style: { fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary } }, title) : title),
    /* @__PURE__ */ React22.createElement(View22, { style: { marginBottom: actions ? tokens.spacing[6] : 0 } }, children),
    actions && /* @__PURE__ */ React22.createElement(View22, { style: { flexDirection: "row", justifyContent: "flex-end", gap: tokens.spacing[2] } }, actions)
  )));
}

// src/components/Divider/Divider.tsx
import React23 from "react";
import { View as View23, Text as Text16 } from "react-native";
import { useComponentTokens as useComponentTokens23, useTokens as useTokens17 } from "@truongdq01/headless";
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const { divider } = useComponentTokens23();
  const tokens = useTokens17();
  const lineColor = emphasis ? tokens.color.border.strong : divider.color;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: divider.margin,
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ React23.createElement(
      View23,
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
    return /* @__PURE__ */ React23.createElement(
      View23,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ React23.createElement(View23, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } }),
      /* @__PURE__ */ React23.createElement(
        Text16,
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
      /* @__PURE__ */ React23.createElement(View23, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ React23.createElement(
    View23,
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
import React24, { useEffect } from "react";
import { Modal as Modal5, View as View24, Pressable as Pressable8, StyleSheet as StyleSheet6, Dimensions as Dimensions3 } from "react-native";
import Animated9, {
  useSharedValue as useSharedValue4,
  useAnimatedStyle as useAnimatedStyle5,
  withSpring as withSpring3,
  runOnJS
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens24, useTokens as useTokens18 } from "@truongdq01/headless";
import { spring as spring2 } from "@truongdq01/tokens";
function Drawer({
  open,
  onClose,
  anchor = "left",
  children
}) {
  const { drawer } = useComponentTokens24();
  const tokens = useTokens18();
  const { width: windowWidth, height: windowHeight } = Dimensions3.get("window");
  const isVertical = anchor === "top" || anchor === "bottom";
  const size = isVertical ? windowHeight * 0.4 : 280;
  const progress = useSharedValue4(0);
  const [mounted, setMounted] = React24.useState(open);
  useEffect(() => {
    if (open) {
      setMounted(true);
      progress.value = withSpring3(1, spring2.snappy);
    } else {
      progress.value = withSpring3(0, spring2.snappy, (finished) => {
        if (finished) runOnJS(setMounted)(false);
      });
    }
  }, [open]);
  const animatedStyle = useAnimatedStyle5(() => {
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
  const backdropStyle = useAnimatedStyle5(() => ({
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
  return /* @__PURE__ */ React24.createElement(Modal5, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React24.createElement(View24, { style: { flex: 1 } }, /* @__PURE__ */ React24.createElement(Animated9.View, { style: [StyleSheet6.absoluteFill, drawer.overlay, backdropStyle] }, /* @__PURE__ */ React24.createElement(Pressable8, { style: { flex: 1 }, onPress: onClose })), /* @__PURE__ */ React24.createElement(
    Animated9.View,
    {
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
import React25 from "react";
import { View as View25, Text as Text17 } from "react-native";
import { useComponentTokens as useComponentTokens25, useTokens as useTokens19 } from "@truongdq01/headless";
function EmptyState({ title, description, icon, action }) {
  const { emptyState } = useComponentTokens25();
  const tokens = useTokens19();
  return /* @__PURE__ */ React25.createElement(View25, { style: emptyState.container }, icon && /* @__PURE__ */ React25.createElement(View25, { style: { marginBottom: tokens.spacing[2] } }, React25.isValidElement(icon) ? React25.cloneElement(icon, {
    size: icon.props?.size ?? emptyState.icon.size,
    color: icon.props?.color ?? emptyState.icon.color
  }) : icon), title && /* @__PURE__ */ React25.createElement(Text17, { style: emptyState.title }, title), description && /* @__PURE__ */ React25.createElement(Text17, { style: emptyState.description }, description), action && /* @__PURE__ */ React25.createElement(View25, { style: { marginTop: tokens.spacing[4] } }, action));
}

// src/components/Fab/Fab.tsx
import React26 from "react";
import { View as View26, Text as Text18, StyleSheet as StyleSheet7 } from "react-native";
import Animated10 from "react-native-reanimated";
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
  return /* @__PURE__ */ React26.createElement(GestureDetector5, { gesture }, /* @__PURE__ */ React26.createElement(Animated10.View, { style: containerStyle, ...accessibilityProps }, /* @__PURE__ */ React26.createElement(View26, { style: styles5.content }, icon && /* @__PURE__ */ React26.createElement(Icon, { size: s.iconSize, color: textColor }, icon), isExtended && /* @__PURE__ */ React26.createElement(Text18, { style: [styles5.label, { marginLeft: icon ? 8 : 0 }] }, label))));
}
var styles5 = StyleSheet7.create({
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

// src/components/FormControl/FormControl.tsx
import React27, { createContext as createContext3, useContext as useContext3, useMemo as useMemo10 } from "react";
import { View as View27, Text as Text19, Pressable as Pressable9 } from "react-native";
import { useComponentTokens as useComponentTokens27, useTokens as useTokens20 } from "@truongdq01/headless";
var FormControlContext = createContext3(null);
function useFormControl() {
  return useContext3(FormControlContext);
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
  const { formControl } = useComponentTokens27();
  const tokens = useTokens20();
  const marginSize = useMemo10(() => {
    if (margin === "dense") return tokens.spacing[2];
    if (margin === "normal") return tokens.spacing[4];
    return 0;
  }, [margin, tokens]);
  const ctxValue = useMemo10(() => ({ error, required, disabled, focused, fullWidth, variant }), [error, required, disabled, focused, fullWidth, variant]);
  return /* @__PURE__ */ React27.createElement(FormControlContext.Provider, { value: ctxValue }, /* @__PURE__ */ React27.createElement(View27, { style: [formControl.container, { alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const { formControl } = useComponentTokens27();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : ctx?.disabled ? formControl.label.color + "80" : formControl.label.color;
  return /* @__PURE__ */ React27.createElement(Text19, { style: [formControl.label, { color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const { formControl } = useComponentTokens27();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : formControl.helperText.color;
  return /* @__PURE__ */ React27.createElement(Text19, { style: [formControl.helperText, { color }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const { formControl } = useComponentTokens27();
  const tokens = useTokens20();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = React27.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ React27.createElement(
    Pressable9,
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
    label ? /* @__PURE__ */ React27.createElement(Text19, { style: formControl.label }, label) : null
  );
}

// src/components/FormField/FormField.tsx
import React28 from "react";
import { View as View28, Text as Text20 } from "react-native";
import { useComponentTokens as useComponentTokens28, useTokens as useTokens21 } from "@truongdq01/headless";
function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children
}) {
  const { formField, formControl } = useComponentTokens28();
  const tokens = useTokens21();
  return /* @__PURE__ */ React28.createElement(View28, { style: formField.container }, (label || labelTrailing) && /* @__PURE__ */ React28.createElement(
    View28,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: tokens.spacing[1]
      }
    },
    label && /* @__PURE__ */ React28.createElement(View28, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ React28.createElement(Text20, { style: formControl.label }, label), required && /* @__PURE__ */ React28.createElement(Text20, { style: formControl.errorText }, "*")),
    labelTrailing
  ), children, error ? /* @__PURE__ */ React28.createElement(
    Text20,
    {
      style: [formControl.errorText, { marginTop: tokens.spacing[1] }],
      accessibilityRole: "alert",
      accessibilityLiveRegion: "polite"
    },
    error
  ) : helperText ? /* @__PURE__ */ React28.createElement(
    Text20,
    {
      style: [formControl.helperText, { marginTop: tokens.spacing[1] }]
    },
    helperText
  ) : null);
}
function FormGroup({ children, gap = "md" }) {
  const tokens = useTokens21();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return /* @__PURE__ */ React28.createElement(View28, { style: { gap: gapSize } }, children);
}

// src/components/Grid/Grid.tsx
import React29 from "react";
import { View as View29 } from "react-native";
import { useComponentTokens as useComponentTokens29 } from "@truongdq01/headless";
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
  const { grid } = useComponentTokens29();
  const resolveGap = (s) => {
    if (s === void 0) return void 0;
    return typeof s === "number" ? s : grid.gap[s];
  };
  const gap = resolveGap(spacing) ?? 0;
  const rowGap = resolveGap(rowSpacing) ?? gap;
  const colGap = resolveGap(columnSpacing) ?? gap;
  if (container) {
    return /* @__PURE__ */ React29.createElement(
      View29,
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
  return /* @__PURE__ */ React29.createElement(
    View29,
    {
      style: [itemStyle, style]
    },
    children
  );
}

// src/components/Image/Image.tsx
import React30, { useState as useState5 } from "react";
import { Image as RNImage, View as View30, StyleSheet as StyleSheet8 } from "react-native";
import Animated11, {
  useAnimatedStyle as useAnimatedStyle6,
  withTiming as withTiming3,
  useSharedValue as useSharedValue5
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens30 } from "@truongdq01/headless";
var AnimatedImage = Animated11.createAnimatedComponent(RNImage);
function RnImage({ showPlaceholder = true, style, onLoad, ...props }) {
  const { image } = useComponentTokens30();
  const [isLoaded, setIsLoaded] = useState5(false);
  const opacity = useSharedValue5(0);
  const handleLoad = (e) => {
    setIsLoaded(true);
    opacity.value = withTiming3(1, { duration: 300 });
    onLoad?.(e);
  };
  const imageStyle = useAnimatedStyle6(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ React30.createElement(View30, { style: [styles6.container, style, { backgroundColor: showPlaceholder && !isLoaded ? image.placeholder.backgroundColor : "transparent" }] }, /* @__PURE__ */ React30.createElement(
    AnimatedImage,
    {
      ...props,
      onLoad: handleLoad,
      style: [StyleSheet8.absoluteFill, imageStyle, style]
    }
  ));
}
var styles6 = StyleSheet8.create({
  container: {
    overflow: "hidden",
    position: "relative"
  }
});

// src/components/ImageList/ImageList.tsx
import React31, { createContext as createContext4, useContext as useContext4, useMemo as useMemo11, useState as useState6 } from "react";
import { View as View31, Text as Text21, Dimensions as Dimensions4 } from "react-native";
import { useTokens as useTokens22, useComponentTokens as useComponentTokens31 } from "@truongdq01/headless";
var { width: SCREEN_WIDTH2 } = Dimensions4.get("window");
var ImageListContext = createContext4(null);
function useImageListContext() {
  return useContext4(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = useState6(SCREEN_WIDTH2);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = useMemo11(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ React31.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ React31.createElement(View31, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
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
  return /* @__PURE__ */ React31.createElement(View31, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const { imageList } = useComponentTokens31();
  const tokens = useTokens22();
  return /* @__PURE__ */ React31.createElement(
    View31,
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
    /* @__PURE__ */ React31.createElement(View31, { style: { flex: 1 } }, title ? /* @__PURE__ */ React31.createElement(Text21, { style: imageList.bar.title }, title) : null, subtitle ? /* @__PURE__ */ React31.createElement(Text21, { style: imageList.bar.subtitle }, subtitle) : null),
    actionIcon
  );
}

// src/components/Input/PasswordInput.tsx
import React32, { useState as useState7 } from "react";
import { Pressable as Pressable10 } from "react-native";
import { useIconStyle as useIconStyle6 } from "@truongdq01/headless";
function PasswordInput(props) {
  const [show, setShow] = useState7(false);
  const { size, color } = useIconStyle6("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ React32.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ React32.createElement(
        Pressable10,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        /* @__PURE__ */ React32.createElement(Icon, { size, color, name: show ? "eyeOff" : "eye" })
      )
    }
  );
}

// src/components/LinearProgress/LinearProgress.tsx
import React33 from "react";
import { View as View32, StyleSheet as StyleSheet9 } from "react-native";
import Animated12, { useAnimatedStyle as useAnimatedStyle7 } from "react-native-reanimated";
import { useTokens as useTokens23, useComponentTokens as useComponentTokens32 } from "@truongdq01/headless";
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
  const tokens = useTokens23();
  const { linearProgress } = useComponentTokens32();
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
    styles7.container,
    linearProgress.track,
    { height: thickness ?? linearProgress.track.height, backgroundColor: trackColor ?? linearProgress.track.backgroundColor },
    style
  ];
  const determinateStyle = useAnimatedStyle7(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ React33.createElement(View32, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ React33.createElement(
    Animated12.View,
    {
      style: [
        styles7.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ React33.createElement(React33.Fragment, null, variant === "buffer" && /* @__PURE__ */ React33.createElement(View32, { style: [styles7.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? tokens.color.bg.muted }] }), /* @__PURE__ */ React33.createElement(
    Animated12.View,
    {
      style: [
        styles7.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles7 = StyleSheet9.create({
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
import React34 from "react";
import { Text as Text22, Linking as Linking2 } from "react-native";
import { useComponentTokens as useComponentTokens33 } from "@truongdq01/headless";
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const { link } = useComponentTokens33();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ React34.createElement(
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
        link.text,
        { color: color ?? link.text.color, textDecorationLine: decoration },
        style
      ]
    },
    children
  );
}

// src/components/List/List.tsx
import React35, { createContext as createContext5, useContext as useContext5 } from "react";
import { View as View33, Text as Text23, Pressable as Pressable11 } from "react-native";
import { FlashList as FlashList2 } from "@shopify/flash-list";
import { useTokens as useTokens24, useComponentTokens as useComponentTokens34 } from "@truongdq01/headless";
var ListContext = createContext5(null);
function useListContext() {
  return useContext5(ListContext);
}
function List2({ children, dense = false, disablePadding = false, subheader, style }) {
  const { list } = useComponentTokens34();
  const tokens = useTokens24();
  return /* @__PURE__ */ React35.createElement(ListContext.Provider, { value: { dense, disablePadding } }, /* @__PURE__ */ React35.createElement(View33, { style: [list.container, style] }, subheader && /* @__PURE__ */ React35.createElement(View33, { style: list.subheader }, typeof subheader === "string" ? /* @__PURE__ */ React35.createElement(Text23, { style: { fontSize: tokens.fontSize.sm, fontWeight: "600", color: tokens.color.text.tertiary } }, subheader) : subheader), children));
}
function ListItem({
  children,
  secondaryAction,
  onPress,
  disabled = false,
  selected = false,
  divider = false,
  style
}) {
  const { list } = useComponentTokens34();
  const tokens = useTokens24();
  const ctx = useListContext();
  const isDense = ctx?.dense;
  return /* @__PURE__ */ React35.createElement(
    Pressable11,
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
    /* @__PURE__ */ React35.createElement(View33, { style: { flex: 1, flexDirection: "row", alignItems: "center" } }, children),
    secondaryAction && /* @__PURE__ */ React35.createElement(View33, { style: { marginLeft: tokens.spacing[2] } }, secondaryAction)
  );
}
function ListItemText({ primary, secondary }) {
  const { list } = useComponentTokens34();
  const tokens = useTokens24();
  const ctx = useListContext();
  return /* @__PURE__ */ React35.createElement(View33, { style: { flex: 1 } }, typeof primary === "string" ? /* @__PURE__ */ React35.createElement(Text23, { style: [list.itemText, ctx?.dense && { fontSize: tokens.fontSize.sm }] }, primary) : primary, secondary && (typeof secondary === "string" ? /* @__PURE__ */ React35.createElement(Text23, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary, marginTop: 2 } }, secondary) : secondary));
}
function ListItemIcon({ children }) {
  const tokens = useTokens24();
  return /* @__PURE__ */ React35.createElement(View33, { style: { marginRight: tokens.spacing[4], minWidth: 24, alignItems: "center" } }, children);
}
function ListData({
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
  ...listProps
}) {
  return /* @__PURE__ */ React35.createElement(List2, { ...listProps }, /* @__PURE__ */ React35.createElement(
    FlashList2,
    {
      data,
      renderItem,
      estimatedItemSize,
      ...listProps,
      keyExtractor
    }
  ));
}

// src/components/Menu/Menu.tsx
import React36 from "react";
import { Modal as Modal6, Pressable as Pressable12, Text as Text24, useWindowDimensions as useWindowDimensions2 } from "react-native";
import Animated13, {
  useSharedValue as useSharedValue6,
  useAnimatedStyle as useAnimatedStyle8,
  withTiming as withTiming4,
  withSpring as withSpring4,
  runOnJS as runOnJS2,
  Easing as Easing2
} from "react-native-reanimated";
import { useTokens as useTokens25, useComponentTokens as useComponentTokens35, useMenu } from "@truongdq01/headless";
var MenuContext = React36.createContext(null);
function Menu2({ open, onClose, anchorEl, children }) {
  const { menu } = useComponentTokens35();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions2();
  const [menuSize, setMenuSize] = React36.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React36.useState(false);
  const { close, getItemProps } = useMenu({ onClose });
  const opacity = useSharedValue6(0);
  const scale = useSharedValue6(0.9);
  React36.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = withTiming4(1, { duration: 180, easing: Easing2.out(Easing2.cubic) });
        scale.value = withSpring4(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = withTiming4(0, { duration: 130 });
      scale.value = withTiming4(0.92, { duration: 130 }, (done) => {
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
  const animStyle = useAnimatedStyle8(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ React36.createElement(Modal6, { visible: mounted, transparent: true, animationType: "none", onRequestClose: close }, /* @__PURE__ */ React36.createElement(Pressable12, { style: { flex: 1 }, onPress: close }), /* @__PURE__ */ React36.createElement(
    Animated13.View,
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
    /* @__PURE__ */ React36.createElement(MenuContext.Provider, { value: { getItemProps } }, children)
  ));
}
function MenuItem({ children, onPress, disabled = false, selected = false }) {
  const { menu } = useComponentTokens35();
  const tokens = useTokens25();
  const ctx = React36.useContext(MenuContext);
  const itemProps = ctx?.getItemProps({ onClick: onPress, disabled }) ?? { onPress, disabled };
  return /* @__PURE__ */ React36.createElement(
    Pressable12,
    {
      ...itemProps,
      style: ({ pressed }) => [
        menu.item,
        pressed && { backgroundColor: tokens.color.bg.subtle },
        selected && { backgroundColor: tokens.color.brand.subtle },
        disabled && { opacity: 0.5 }
      ]
    },
    /* @__PURE__ */ React36.createElement(Text24, { style: {
      color: selected ? tokens.color.brand.text : tokens.color.text.primary,
      fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
    } }, children)
  );
}

// src/components/Modal/Modal.tsx
import React37 from "react";
import { Modal as RNModal, View as View35, Pressable as Pressable13, StyleSheet as StyleSheet10 } from "react-native";
import { useComponentTokens as useComponentTokens36 } from "@truongdq01/headless";
function Modal7({
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
  const { modal } = useComponentTokens36();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ React37.createElement(
    RNModal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ React37.createElement(View35, { style: [styles8.overlay, modal.overlay] }, !hideBackdrop && (BackdropComponent ? /* @__PURE__ */ React37.createElement(BackdropComponent, { ...BackdropProps }) : /* @__PURE__ */ React37.createElement(
      Pressable13,
      {
        style: [StyleSheet10.absoluteFill, { backgroundColor: modal.overlay.backgroundColor }],
        onPress: onClose
      }
    )), /* @__PURE__ */ React37.createElement(View35, { style: [styles8.content, modal.container, contentStyle] }, children))
  );
}
var styles8 = StyleSheet10.create({
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
import React38, { useEffect as useEffect2 } from "react";
import { View as View36, TextInput, Pressable as Pressable14, Text as Text25 } from "react-native";
import Animated14, {
  useAnimatedStyle as useAnimatedStyle9,
  withSpring as withSpring5,
  useSharedValue as useSharedValue7,
  withTiming as withTiming5,
  withSequence
} from "react-native-reanimated";
import { useComponentTokens as useComponentTokens37, useOTPInput } from "@truongdq01/headless";
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false
}) {
  const { otpInput } = useComponentTokens37();
  const { inputRef, isFocused, handlePress, getOtpProps } = useOTPInput({
    length,
    value,
    onChange,
    onComplete,
    disabled
  });
  return /* @__PURE__ */ React38.createElement(View36, { style: { width: "100%" } }, /* @__PURE__ */ React38.createElement(
    TextInput,
    {
      ref: inputRef,
      caretHidden: true,
      style: {
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0
      },
      ...getOtpProps()
    }
  ), /* @__PURE__ */ React38.createElement(
    Pressable14,
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
      return /* @__PURE__ */ React38.createElement(
        OTPCell,
        {
          key: index,
          char,
          isFocused: hasFocusBorder,
          isFilled
        }
      );
    })
  ));
}
function OTPCell({
  char,
  isFocused,
  isFilled
}) {
  const { otpInput } = useComponentTokens37();
  const scale = useSharedValue7(1);
  useEffect2(() => {
    if (isFocused) {
      scale.value = withSequence(
        withTiming5(1.1, { duration: 150 }),
        withTiming5(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = withSpring5(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = withTiming5(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);
  const animatedStyle = useAnimatedStyle9(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: isFocused ? otpInput.cell.focused.borderColor : isFilled ? otpInput.cell.borderColor : otpInput.cell.borderColor,
      backgroundColor: isFilled ? otpInput.cell.backgroundColor : otpInput.cell.backgroundColor
    };
  });
  return /* @__PURE__ */ React38.createElement(
    Animated14.View,
    {
      style: [
        otpInput.cell,
        { flex: 1, aspectRatio: 0.8 },
        animatedStyle
      ]
    },
    /* @__PURE__ */ React38.createElement(
      Text25,
      {
        style: {
          fontSize: otpInput.cell.fontSize,
          fontWeight: otpInput.cell.fontWeight,
          color: otpInput.cell.color
        }
      },
      char
    )
  );
}

// src/components/Pagination/Pagination.tsx
import React39 from "react";
import { View as View37, Text as Text26, Pressable as Pressable15 } from "react-native";
import { usePagination, useTokens as useTokens27, useComponentTokens as useComponentTokens38 } from "@truongdq01/headless";
function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md"
}) {
  const tokens = useTokens27();
  const { pagination } = useComponentTokens38();
  const { page: current, setPage, items } = usePagination({ count, page, defaultPage, onChange });
  const s = pagination.size[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ React39.createElement(Text26, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    const itemTokens = selected ? pagination.item.active : pagination.item.default;
    return /* @__PURE__ */ React39.createElement(
      Pressable15,
      {
        key: item,
        onPress: () => setPage(item),
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
      /* @__PURE__ */ React39.createElement(Text26, { style: { fontSize: tokens.fontSize[size], color: itemTokens.color } }, item)
    );
  };
  return /* @__PURE__ */ React39.createElement(View37, { style: { flexDirection: "row", alignItems: "center", gap: pagination.gap } }, items.map(renderItem));
}

// src/components/Paper/Paper.tsx
import React40 from "react";
import { View as View38 } from "react-native";
import { useComponentTokens as useComponentTokens39, useTokens as useTokens28 } from "@truongdq01/headless";
function Paper({
  children,
  variant = "elevation",
  elevation = "sm",
  square = false,
  style
}) {
  const { paper } = useComponentTokens39();
  const tokens = useTokens28();
  return /* @__PURE__ */ React40.createElement(
    View38,
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
import React41, { useMemo as useMemo14, useState as useState9 } from "react";
import { Modal as Modal8, View as View39, Pressable as Pressable16, StyleSheet as StyleSheet12, Dimensions as Dimensions5 } from "react-native";
import { useTokens as useTokens29, useComponentTokens as useComponentTokens40 } from "@truongdq01/headless";
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
  const { popover } = useComponentTokens40();
  const tokens = useTokens29();
  const [contentSize, setContentSize] = useState9({ width: 0, height: 0 });
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
  const position = useMemo14(() => {
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
  return /* @__PURE__ */ React41.createElement(Modal8, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React41.createElement(Pressable16, { style: styles9.backdrop, onPress: onClose }), /* @__PURE__ */ React41.createElement(
    View39,
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
var styles9 = StyleSheet12.create({
  backdrop: {
    ...StyleSheet12.absoluteFillObject
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
import React42, { useMemo as useMemo15, useState as useState10 } from "react";
import { Modal as Modal9, View as View40, Pressable as Pressable17, StyleSheet as StyleSheet13, Dimensions as Dimensions6 } from "react-native";
import { useTokens as useTokens30, useComponentTokens as useComponentTokens41 } from "@truongdq01/headless";
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
  const { popper } = useComponentTokens41();
  const tokens = useTokens30();
  const [contentSize, setContentSize] = useState10({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = Dimensions6.get("window");
  const position = useMemo15(() => {
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
  return /* @__PURE__ */ React42.createElement(Modal9, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ React42.createElement(Pressable17, { style: styles10.backdrop, onPress: onClose }), /* @__PURE__ */ React42.createElement(
    View40,
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
var styles10 = StyleSheet13.create({
  backdrop: {
    ...StyleSheet13.absoluteFillObject
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
import React43 from "react";
import Animated15 from "react-native-reanimated";
import { GestureDetector as GestureDetector6 } from "react-native-gesture-handler";
import { usePressable as usePressable5, useComponentTokens as useComponentTokens42 } from "@truongdq01/headless";
function Pressable18({ children, style, ...hookOptions }) {
  const { pressable } = useComponentTokens42();
  const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable5(hookOptions);
  return /* @__PURE__ */ React43.createElement(GestureDetector6, { gesture }, /* @__PURE__ */ React43.createElement(Animated15.View, { style: [pressable.container, style, animatedStyle], ...accessibilityProps }, typeof children === "function" ? children({ isPressed }) : children));
}

// src/components/Radio/Radio.tsx
import React44 from "react";
import { View as View41, Text as Text27, Pressable as Pressable19 } from "react-native";
import Animated16, {
  useSharedValue as useSharedValue8,
  useAnimatedStyle as useAnimatedStyle10,
  withSpring as withSpring6
} from "react-native-reanimated";
import { useRadioGroup, useTokens as useTokens31, useComponentTokens as useComponentTokens43 } from "@truongdq01/headless";
import { spring as spring3 } from "@truongdq01/tokens";
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = useTokens31();
  const { radio } = useComponentTokens43();
  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = spring3.snappy;
  const scale = useSharedValue8(isSelected ? 1 : 0);
  React44.useEffect(() => {
    scale.value = withSpring6(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);
  const dotStyle = useAnimatedStyle10(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const handlePress = () => {
    if (!isSelected) {
      scale.value = withSpring6(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = withSpring6(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ React44.createElement(
    Pressable19,
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
    /* @__PURE__ */ React44.createElement(
      View41,
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
      /* @__PURE__ */ React44.createElement(
        Animated16.View,
        {
          style: [
            {
              width: innerSize.width,
              height: innerSize.height,
              borderRadius: innerSize.borderRadius,
              backgroundColor: tokens.color.text.inverse
            },
            dotStyle
          ]
        }
      )
    ),
    (label || description) && /* @__PURE__ */ React44.createElement(View41, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ React44.createElement(
      Text27,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ React44.createElement(
      Text27,
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
  const tokens = useTokens31();
  const { isSelected, getItemProps } = useRadioGroup(hookOptions);
  return /* @__PURE__ */ React44.createElement(View41, null, label && /* @__PURE__ */ React44.createElement(
    Text27,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ React44.createElement(
    View41,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ React44.createElement(
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
import React45 from "react";
import { View as View42, Pressable as Pressable20 } from "react-native";
import { useRating, useTokens as useTokens32, useComponentTokens as useComponentTokens44 } from "@truongdq01/headless";
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
  const { rating } = useComponentTokens44();
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
  const iconSize = rating.size[size];
  const activeColor = rating.star.filled.color;
  const inactiveColor = rating.star.empty.color;
  const handlePress = (index) => {
    if (disabled || readOnly) return;
    const next = index + 1;
    const snapped = Math.round(next / precision) * precision;
    setValue(ratingValue === snapped ? 0 : snapped);
  };
  return /* @__PURE__ */ React45.createElement(View42, { style: rating.container }, Array.from({ length: max }).map((_, i) => {
    const starNumber = i + 1;
    const filled = ratingValue >= starNumber;
    const halfFilled = !filled && ratingValue >= starNumber - 0.5 && precision <= 0.5;
    return /* @__PURE__ */ React45.createElement(
      Pressable20,
      {
        key: i,
        onPress: () => handlePress(i),
        disabled: disabled || readOnly,
        style: { opacity: disabled ? 0.5 : 1 }
      },
      /* @__PURE__ */ React45.createElement(
        Icon,
        {
          size: iconSize,
          color: filled || halfFilled ? activeColor : inactiveColor
        },
        filled ? "star" : halfFilled ? "star" : "star"
      )
    );
  }));
}

// src/components/SegmentedControl/SegmentedControl.tsx
import React46, { useState as useState11 } from "react";
import { View as View43, Pressable as Pressable21, Text as Text28 } from "react-native";
import Animated17, {
  useAnimatedStyle as useAnimatedStyle11,
  withSpring as withSpring7,
  useSharedValue as useSharedValue9
} from "react-native-reanimated";
import { useTokens as useTokens33, useComponentTokens as useComponentTokens45, useSegmentedControl } from "@truongdq01/headless";
import { spring as spring4 } from "@truongdq01/tokens";
function SegmentedControl({
  options,
  selectedIndex,
  onChange,
  height = 36,
  disabled = false
}) {
  const tokens = useTokens33();
  const { segmentedControl } = useComponentTokens45();
  const { isSelected, setSelectedIndex, getTabProps } = useSegmentedControl({
    value: selectedIndex,
    onChange: (val) => onChange(val),
    disabled
  });
  const [containerWidth, setContainerWidth] = useState11(0);
  const segmentWidth = containerWidth / options.length;
  const translateX = useSharedValue9(selectedIndex * segmentWidth);
  React46.useEffect(() => {
    if (segmentWidth > 0) {
      translateX.value = withSpring7(selectedIndex * segmentWidth, spring4.snappy);
    }
  }, [selectedIndex, segmentWidth, translateX]);
  const onLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };
  const indicatorStyle = useAnimatedStyle11(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth
  }));
  return /* @__PURE__ */ React46.createElement(
    View43,
    {
      onLayout,
      style: [
        segmentedControl.container,
        { height, borderRadius: height / 2, opacity: disabled ? 0.6 : 1 }
      ]
    },
    containerWidth > 0 && /* @__PURE__ */ React46.createElement(
      Animated17.View,
      {
        style: [
          segmentedControl.item.active,
          { borderRadius: (height - 4) / 2 },
          indicatorStyle
        ]
      }
    ),
    options.map((option, index) => {
      const selected = isSelected(index);
      return /* @__PURE__ */ React46.createElement(
        Pressable21,
        {
          key: option,
          disabled,
          ...getTabProps(index, index),
          style: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }
        },
        /* @__PURE__ */ React46.createElement(
          Text28,
          {
            style: {
              fontSize: tokens.fontSize.sm,
              fontWeight: selected ? tokens.fontWeight.semibold : tokens.fontWeight.medium,
              color: selected ? segmentedControl.item.activeText.color : segmentedControl.item.text.color
            }
          },
          option
        )
      );
    })
  );
}

// src/components/Select/Select.tsx
import React47, { useRef as useRef3, useState as useState12 } from "react";
import { View as View44, Text as Text29, TextInput as TextInput2, ScrollView as ScrollView2, Pressable as Pressable22 } from "react-native";
import { useSelect, useTokens as useTokens34, useComponentTokens as useComponentTokens46 } from "@truongdq01/headless";
function Select({
  label,
  placeholder = "Select\u2026",
  searchable = false,
  error,
  onClearError,
  options,
  ...hookOptions
}) {
  const { select } = useComponentTokens46();
  const tokens = useTokens34();
  const sheetRef = useRef3(null);
  const [query, setQuery] = useState12("");
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel
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
    onClearError?.();
    if (!hookOptions.multiple) handleClose();
  };
  return /* @__PURE__ */ React47.createElement(View44, null, label && /* @__PURE__ */ React47.createElement(Text29, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ React47.createElement(
    Pressable22,
    {
      onPress: handleOpen,
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 44,
        paddingHorizontal: select.trigger.padding.x,
        paddingVertical: select.trigger.padding.y,
        borderWidth: 1,
        borderColor: error ? tokens.color.border.error : isOpen ? select.trigger.focusBorderColor : select.trigger.borderColor,
        borderRadius: select.trigger.borderRadius,
        backgroundColor: select.trigger.bg
      },
      accessibilityState: { expanded: isOpen }
    },
    /* @__PURE__ */ React47.createElement(
      Text29,
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
    /* @__PURE__ */ React47.createElement(Icon, { size: 16, color: tokens.color.text.tertiary }, isOpen ? "chevronUp" : "chevronDown")
  ), error && /* @__PURE__ */ React47.createElement(Text29, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ React47.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ React47.createElement(View44, { style: { flex: 1, paddingHorizontal: tokens.spacing[4] } }, searchable && isOpen && /* @__PURE__ */ React47.createElement(
      View44,
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
      /* @__PURE__ */ React47.createElement(View44, { style: { marginRight: 8 } }, /* @__PURE__ */ React47.createElement(Icon, { size: 20, color: tokens.color.text.tertiary, name: "search" })),
      /* @__PURE__ */ React47.createElement(
        TextInput2,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search\u2026",
          placeholderTextColor: tokens.color.text.tertiary,
          style: { flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" },
          autoFocus: true
        }
      ),
      query.length > 0 && /* @__PURE__ */ React47.createElement(Pressable22, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ React47.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" }))
    ), /* @__PURE__ */ React47.createElement(ScrollView2, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled" }, filtered.length === 0 ? /* @__PURE__ */ React47.createElement(Text29, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] } }, 'No results for "', query, '"') : filtered.map((option) => {
      const selected = isSelected(option.value);
      return /* @__PURE__ */ React47.createElement(
        Pressable22,
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
            backgroundColor: selected ? select.option.selected.bg : "transparent",
            marginBottom: 2,
            opacity: option.disabled ? 0.4 : 1
          }
        },
        /* @__PURE__ */ React47.createElement(
          Text29,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? select.option.selected.color : select.option.default.color,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ React47.createElement(Icon, { size: 16, color: select.option.selected.color, name: "check" })
      );
    }), /* @__PURE__ */ React47.createElement(View44, { style: { height: tokens.spacing[4] } })))
  ));
}

// src/components/Skeleton/Skeleton.tsx
import React48, { useEffect as useEffect3 } from "react";
import { View as View45 } from "react-native";
import Animated18, {
  useSharedValue as useSharedValue10,
  useAnimatedStyle as useAnimatedStyle12,
  withRepeat,
  withTiming as withTiming6,
  interpolate as interpolate4
} from "react-native-reanimated";
import { useTokens as useTokens35, useComponentTokens as useComponentTokens47 } from "@truongdq01/headless";
function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true
}) {
  const tokens = useTokens35();
  const { skeleton } = useComponentTokens47();
  const shimmer = useSharedValue10(0);
  useEffect3(() => {
    if (!animate) return;
    shimmer.value = withRepeat(
      withTiming6(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);
  const animatedStyle = useAnimatedStyle12(() => ({
    opacity: interpolate4(shimmer.value, [0, 1], [skeleton.opacity.start, skeleton.opacity.end])
  }));
  return /* @__PURE__ */ React48.createElement(
    Animated18.View,
    {
      style: [
        {
          width,
          height,
          borderRadius: borderRadius ?? skeleton.borderRadius,
          backgroundColor: skeleton.backgroundColor
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
  const tokens = useTokens35();
  return /* @__PURE__ */ React48.createElement(View45, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ React48.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14
    }
  )));
}
function SkeletonCard() {
  const tokens = useTokens35();
  return /* @__PURE__ */ React48.createElement(
    View45,
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
    /* @__PURE__ */ React48.createElement(View45, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ React48.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ React48.createElement(View45, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React48.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ React48.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ React48.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ React48.createElement(Skeleton, { width: "40%", height: 32, borderRadius: tokens.radius.md })
  );
}
function SkeletonListItem() {
  const tokens = useTokens35();
  return /* @__PURE__ */ React48.createElement(
    View45,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React48.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ React48.createElement(View45, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ React48.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ React48.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ React48.createElement(Skeleton, { width: 24, height: 14 })
  );
}

// src/components/Slider/Slider.tsx
import React49 from "react";
import { View as View46, Text as Text30 } from "react-native";
import Animated19 from "react-native-reanimated";
import { GestureDetector as GestureDetector7 } from "react-native-gesture-handler";
import { useSlider, useTokens as useTokens36, useComponentTokens as useComponentTokens48 } from "@truongdq01/headless";
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
  const tokens = useTokens36();
  const { slider } = useComponentTokens48();
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
  return /* @__PURE__ */ React49.createElement(View46, { style: { opacity: hookOptions.disabled ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ React49.createElement(View46, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ React49.createElement(Text30, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ React49.createElement(Text30, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default } }, formatValue(currentValue))), /* @__PURE__ */ React49.createElement(Animated19.View, { style: [{ paddingVertical: 12 }, trackAnimatedStyle] }, /* @__PURE__ */ React49.createElement(GestureDetector7, { gesture: panGesture }, /* @__PURE__ */ React49.createElement(
    View46,
    {
      style: { height: slider.thumb.height, justifyContent: "center" },
      onLayout: (e) => onTrackLayout(e.nativeEvent.layout.width)
    },
    /* @__PURE__ */ React49.createElement(
      View46,
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
      /* @__PURE__ */ React49.createElement(
        Animated19.View,
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
      return /* @__PURE__ */ React49.createElement(
        View46,
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
    /* @__PURE__ */ React49.createElement(
      Animated19.View,
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
  ))), showRange && /* @__PURE__ */ React49.createElement(View46, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ React49.createElement(Text30, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ React49.createElement(Text30, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}

// src/components/Snackbar/Snackbar.tsx
import React50, { useEffect as useEffect4, useMemo as useMemo16 } from "react";
import { View as View47, Text as Text31, Pressable as Pressable23, Modal as Modal10, StyleSheet as StyleSheet14 } from "react-native";
import Animated20, {
  useSharedValue as useSharedValue11,
  useAnimatedStyle as useAnimatedStyle13,
  withTiming as withTiming7,
  withSpring as withSpring8,
  runOnJS as runOnJS3
} from "react-native-reanimated";
import { useTokens as useTokens37, useComponentTokens as useComponentTokens49 } from "@truongdq01/headless";
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const { snackbar } = useComponentTokens49();
  const tokens = useTokens37();
  const [mounted, setMounted] = React50.useState(open);
  const isBottom = anchorOrigin.vertical === "bottom";
  const translateY = useSharedValue11(isBottom ? 100 : -100);
  const opacity = useSharedValue11(0);
  const scale = useSharedValue11(0.95);
  const animateIn = () => {
    translateY.value = withSpring8(0, { damping: 25, stiffness: 300, mass: 1 });
    opacity.value = withTiming7(1, { duration: 200 });
    scale.value = withSpring8(1, { damping: 25, stiffness: 300 });
  };
  const animateOut = (onDone) => {
    translateY.value = withTiming7(isBottom ? 100 : -100, { duration: 200 });
    opacity.value = withTiming7(0, { duration: 150 }, (done) => {
      if (done) runOnJS3(onDone)();
    });
  };
  useEffect4(() => {
    if (open) {
      setMounted(true);
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  useEffect4(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = useMemo16(() => {
    if (anchorOrigin.horizontal === "center") return { alignSelf: "center" };
    if (anchorOrigin.horizontal === "left") return { left: 16 };
    return { right: 16 };
  }, [anchorOrigin.horizontal]);
  const animStyle = useAnimatedStyle13(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  if (!mounted && !open) return null;
  return /* @__PURE__ */ React50.createElement(Modal10, { visible: mounted || open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ React50.createElement(View47, { pointerEvents: "box-none", style: styles11.overlay }, /* @__PURE__ */ React50.createElement(
    Animated20.View,
    {
      style: [
        snackbar.container,
        verticalStyle,
        horizontalStyle,
        animStyle,
        { position: "absolute" }
      ]
    },
    /* @__PURE__ */ React50.createElement(Text31, { style: [snackbar.text, { flex: 1 }] }, message),
    action,
    onClose && /* @__PURE__ */ React50.createElement(Pressable23, { onPress: onClose, hitSlop: 8, style: { marginLeft: 8 } }, /* @__PURE__ */ React50.createElement(Icon, { size: 18, color: snackbar.text.color, name: "close" }))
  )));
}
var styles11 = StyleSheet14.create({
  overlay: {
    flex: 1
  }
});

// src/components/SpeedDial/SpeedDial.tsx
import React51, { createContext as createContext6, useContext as useContext6, useMemo as useMemo17 } from "react";
import { View as View48, Text as Text32, Pressable as Pressable24 } from "react-native";
import { useDisclosure as useDisclosure2, useTokens as useTokens38, useComponentTokens as useComponentTokens50 } from "@truongdq01/headless";
var SpeedDialContext = createContext6(null);
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
  const { speedDial } = useComponentTokens50();
  const disclosure = useDisclosure2({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = useTokens38();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  const ctxValue = useMemo17(() => ({ isOpen: disclosure.isOpen, close: disclosure.close }), [disclosure.isOpen, disclosure.close]);
  return /* @__PURE__ */ React51.createElement(SpeedDialContext.Provider, { value: ctxValue }, /* @__PURE__ */ React51.createElement(View48, { style: [speedDial.container, stackStyle] }, disclosure.isOpen && children, /* @__PURE__ */ React51.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const { speedDial } = useComponentTokens50();
  const tokens = useTokens38();
  const ctx = useContext6(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ React51.createElement(
    Pressable24,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: speedDial.action
    },
    /* @__PURE__ */ React51.createElement(
      View48,
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
    tooltipTitle && /* @__PURE__ */ React51.createElement(Text32, { style: speedDial.action.tooltip }, tooltipTitle)
  );
}

// src/components/Stack/Stack.tsx
import React52 from "react";
import { View as View49 } from "react-native";
import { useComponentTokens as useComponentTokens51 } from "@truongdq01/headless";
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
  const { stack } = useComponentTokens51();
  const gap = typeof spacing === "number" ? spacing : stack.gap[spacing];
  const items = React52.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ React52.createElement(
    View49,
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
import React53 from "react";
import { View as View50, Text as Text33 } from "react-native";
import { useComponentTokens as useComponentTokens52 } from "@truongdq01/headless";
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const { stepper } = useComponentTokens52();
  const items = React53.Children.toArray(children);
  return /* @__PURE__ */ React53.createElement(View50, { style: [stepper.container, { flexDirection: orientation === "horizontal" ? "row" : "column" }] }, items.map((child) => {
    if (!React53.isValidElement(child)) return child;
    const element = child;
    return React53.cloneElement(element, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }) {
  const { stepper } = useComponentTokens52();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  const color = isCompleted ? stepper.step.completed.color : isActive ? stepper.step.active.color : stepper.step.pending.color;
  return /* @__PURE__ */ React53.createElement(View50, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React53.createElement(
    View50,
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
    isCompleted ? /* @__PURE__ */ React53.createElement(Icon, { size: 14, color: stepper.step.completed.color, name: "check" }) : /* @__PURE__ */ React53.createElement(Text33, { style: { fontSize: 12, fontWeight: "600", color: isActive ? color : color } }, index + 1)
  ), label && /* @__PURE__ */ React53.createElement(Text33, { style: { color: isActive ? stepper.step.active.color : stepper.step.pending.color, fontSize: 14 } }, label), children);
}
function StepLabel({ children, style }) {
  const { stepper } = useComponentTokens52();
  return /* @__PURE__ */ React53.createElement(Text33, { style: [{ color: stepper.step.pending.color, fontSize: 14 }, style] }, children);
}

// src/components/Switch/Switch.tsx
import React54 from "react";
import { View as View51, Text as Text34, Pressable as Pressable25 } from "react-native";
import Animated21, {
  useSharedValue as useSharedValue12,
  useAnimatedStyle as useAnimatedStyle14,
  withSpring as withSpring9,
  interpolateColor
} from "react-native-reanimated";
import { useSwitch, useTokens as useTokens39, useComponentTokens as useComponentTokens53 } from "@truongdq01/headless";
import { spring as spring5 } from "@truongdq01/tokens";
var Switch = React54.memo(({ label, description, size = "md", ...hookOptions }) => {
  const tokens = useTokens39();
  const { switch: switchT } = useComponentTokens53();
  const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch(hookOptions);
  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = tTrack.width - tThumb.width - tTrack.padding * 2;
  const progress = useSharedValue12(isOn ? 1 : 0);
  React54.useEffect(() => {
    progress.value = withSpring9(isOn ? 1 : 0, spring5.snappy);
  }, [isOn]);
  const trackStyle = useAnimatedStyle14(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    )
  }));
  const thumbStyle = useAnimatedStyle14(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ React54.createElement(
    Pressable25,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? switchT.colors.disabledOpacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ React54.createElement(
      Animated21.View,
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
      /* @__PURE__ */ React54.createElement(
        Animated21.View,
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
    (label || description) && /* @__PURE__ */ React54.createElement(View51, { style: { flex: 1 } }, label && /* @__PURE__ */ React54.createElement(Text34, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ React54.createElement(Text34, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
});

// src/components/Table/Table.tsx
import React55, { createContext as createContext7, useContext as useContext7, useMemo as useMemo18 } from "react";
import { View as View52, ScrollView as ScrollView3, Text as Text35, Pressable as Pressable26 } from "react-native";
import { useComponentTokens as useComponentTokens54, useTokens as useTokens40 } from "@truongdq01/headless";
var TableContext = createContext7(null);
function useTableContext() {
  return useContext7(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = useMemo18(() => ({ size, padding, stickyHeader }), [size, padding, stickyHeader]);
  return /* @__PURE__ */ React55.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ React55.createElement(View52, { style }, children));
}
function TableContainer({ children, style }) {
  const { table } = useComponentTokens54();
  return /* @__PURE__ */ React55.createElement(
    ScrollView3,
    {
      horizontal: true,
      style: [
        table.container,
        style
      ]
    },
    /* @__PURE__ */ React55.createElement(View52, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const { table } = useComponentTokens54();
  return /* @__PURE__ */ React55.createElement(View52, { style: table.header }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ React55.createElement(View52, null, children);
}
function TableFooter({ children }) {
  const { table } = useComponentTokens54();
  return /* @__PURE__ */ React55.createElement(View52, { style: { borderTopWidth: 1, borderTopColor: table.container.borderColor } }, children);
}
function TableRow({ children, selected = false, style }) {
  const { table } = useComponentTokens54();
  const tokens = useTokens40();
  return /* @__PURE__ */ React55.createElement(
    View52,
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
  const { table } = useComponentTokens54();
  const ctx = useTableContext();
  const tokens = useTokens40();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const paddingX = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const paddingY = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ React55.createElement(View52, { style: [{ paddingHorizontal: paddingX, paddingVertical: paddingY, flexShrink: 0 }, style] }, /* @__PURE__ */ React55.createElement(
    Text35,
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
  const tokens = useTokens40();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ React55.createElement(
    View52,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ React55.createElement(Text35, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ React55.createElement(View52, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ React55.createElement(Text35, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ React55.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1)),
        startIcon: /* @__PURE__ */ React55.createElement(Icon, { size: 16, name: "chevronLeft" })
      },
      "Prev"
    ), /* @__PURE__ */ React55.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page >= totalPages - 1,
        onPress: () => onPageChange?.(Math.min(totalPages - 1, page + 1)),
        endIcon: /* @__PURE__ */ React55.createElement(Icon, { size: 16, name: "chevronRight" })
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
  const tokens = useTokens40();
  return /* @__PURE__ */ React55.createElement(Pressable26, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React55.createElement(Text35, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), active ? /* @__PURE__ */ React55.createElement(Icon, { size: 14, color: tokens.color.text.primary }, direction === "asc" ? "arrowUp" : "arrowDown") : /* @__PURE__ */ React55.createElement(View52, { style: { width: 14 } }));
}

// src/components/Tabs/Tabs.tsx
import React56, { createContext as createContext8, useContext as useContext8 } from "react";
import { View as View53, Text as Text36 } from "react-native";
import Animated22 from "react-native-reanimated";
import { GestureDetector as GestureDetector8 } from "react-native-gesture-handler";
import { useComponentTokens as useComponentTokens55, usePressable as usePressable6, useTabs, useTokens as useTokens41 } from "@truongdq01/headless";
var TabsContext = createContext8(null);
function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children
}) {
  const { tabs } = useComponentTokens55();
  const { getTabProps, isSelected } = useTabs({ value, defaultValue, onChange });
  return /* @__PURE__ */ React56.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ React56.createElement(
    View53,
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
  const { tabs } = useComponentTokens55();
  const tokens = useTokens41();
  const ctx = useContext8(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { animatedStyle, gesture, accessibilityProps } = usePressable6({
    onPress: () => ctx.getTabProps(value, disabled).onPress(),
    disabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "tab"
  });
  return /* @__PURE__ */ React56.createElement(GestureDetector8, { gesture }, /* @__PURE__ */ React56.createElement(
    Animated22.View,
    {
      style: [
        {
          paddingVertical: tokens.spacing[3],
          paddingHorizontal: tokens.spacing[4],
          borderBottomWidth: ctx.orientation === "horizontal" ? tabs.indicator.height : 0,
          borderLeftWidth: ctx.orientation === "vertical" ? tabs.indicator.height : 0,
          borderColor: selected ? tabs.indicator.bg : "transparent",
          opacity: disabled ? 0.5 : 1,
          alignItems: "center",
          flexDirection: "row",
          gap: tokens.spacing[2]
        },
        ctx.variant === "fullWidth" ? { flex: 1, justifyContent: "center" } : null,
        animatedStyle
      ],
      ...accessibilityProps
    },
    icon,
    label && /* @__PURE__ */ React56.createElement(
      Text36,
      {
        style: [
          selected ? tabs.tab.active : tabs.tab.inactive,
          { fontSize: tokens.fontSize.md }
        ]
      },
      label
    )
  ));
}

// src/components/TextArea/TextArea.tsx
import React57, { useState as useState13 } from "react";
import {
  View as View54,
  Text as Text37,
  TextInput as TextInput3
} from "react-native";
import { useComponentTokens as useComponentTokens56, useTokens as useTokens42 } from "@truongdq01/headless";
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
  const { textArea } = useComponentTokens56();
  const tokens = useTokens42();
  const [isFocused, setIsFocused] = useState13(false);
  const [contentHeight, setContentHeight] = useState13(0);
  const LINE_HEIGHT = tokens.fontSize.md * tokens.lineHeight.normal;
  const minHeight = minLines * LINE_HEIGHT + tokens.spacing[3] * 2;
  const maxHeight = maxLines * LINE_HEIGHT + tokens.spacing[3] * 2;
  const dynamicHeight = contentHeight ? Math.min(Math.max(contentHeight + tokens.spacing[3] * 2, minHeight), maxHeight) : minHeight;
  const handleContentSizeChange = (e) => {
    setContentHeight(e.nativeEvent.contentSize.height);
  };
  const containerStyle = [
    textArea.container,
    { height: dynamicHeight },
    isFocused && textArea.state.focused,
    error && textArea.state.error,
    disabled && textArea.state.disabled
  ];
  const charCount = value.length;
  const nearLimit = maxLength && charCount >= maxLength * 0.9;
  const atLimit = maxLength && charCount >= maxLength;
  return /* @__PURE__ */ React57.createElement(View54, null, (label || maxLength) && /* @__PURE__ */ React57.createElement(View54, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] } }, label && /* @__PURE__ */ React57.createElement(Text37, { style: textArea.label }, label), maxLength && /* @__PURE__ */ React57.createElement(
    Text37,
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
  )), /* @__PURE__ */ React57.createElement(View54, { style: containerStyle }, /* @__PURE__ */ React57.createElement(
    TextInput3,
    {
      value,
      onChangeText,
      placeholder,
      placeholderTextColor: textArea.text.placeholderColor,
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
        color: textArea.text.color,
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
  )), error ? /* @__PURE__ */ React57.createElement(Text37, { style: textArea.errorText }, error) : helperText ? /* @__PURE__ */ React57.createElement(Text37, { style: textArea.helperText }, helperText) : null);
}

// src/components/TextField/TextField.tsx
import React58, { useState as useState14 } from "react";
import { Pressable as Pressable27 } from "react-native";
import { useComponentTokens as useComponentTokens57 } from "@truongdq01/headless";
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
  const { textField } = useComponentTokens57();
  const [showPassword, setShowPassword] = useState14(false);
  const isPassword = type === "password";
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  const trailingElement = isPassword ? /* @__PURE__ */ React58.createElement(
    Pressable27,
    {
      onPress: () => setShowPassword(!showPassword),
      style: { padding: 4 },
      hitSlop: 8
    },
    /* @__PURE__ */ React58.createElement(Icon, { size: 20, color: textField.text.placeholderColor }, showPassword ? "eyeOff" : "eye")
  ) : rest.trailingElement;
  if (select) {
    return /* @__PURE__ */ React58.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ React58.createElement(
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
  return /* @__PURE__ */ React58.createElement(
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
import React59, { createContext as createContext9, useContext as useContext9 } from "react";
import { View as View55, Text as Text38 } from "react-native";
import { useComponentTokens as useComponentTokens58, useTokens as useTokens43 } from "@truongdq01/headless";
var TimelineContext = createContext9(null);
function useTimelineContext() {
  return useContext9(TimelineContext);
}
function Timeline({ position = "right", itemVariant = "filled", children }) {
  const { timeline } = useComponentTokens58();
  return /* @__PURE__ */ React59.createElement(TimelineContext.Provider, { value: { position, itemVariant } }, /* @__PURE__ */ React59.createElement(View55, { style: timeline.content }, React59.Children.map(children, (child, index) => {
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
    return /* @__PURE__ */ React59.createElement(Text38, null, result[0]);
  }
  return result;
}
function extractOpposite(children) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ React59.createElement(Text38, null, result[0]);
  }
  return result;
}
function TimelineSeparator({ status = "pending", variant = "filled", children }) {
  const { timeline } = useComponentTokens58();
  const connectorColor = status === "completed" ? timeline.dot.completed.borderColor : timeline.connector.color;
  return /* @__PURE__ */ React59.createElement(View55, { style: { alignItems: "center", width: 48, paddingHorizontal: 8 } }, children || /* @__PURE__ */ React59.createElement(React59.Fragment, null, /* @__PURE__ */ React59.createElement(
    TimelineDot,
    {
      variant,
      status
    }
  ), /* @__PURE__ */ React59.createElement(TimelineConnector, { color: connectorColor })));
}
function TimelineDot({ variant = "filled", color = "primary", status, size }) {
  const { timeline } = useComponentTokens58();
  const tokens = useTokens43();
  const resolvedStatus = status || (color === "success" ? "completed" : color === "error" ? "error" : color === "primary" ? "active" : "pending");
  const statusTokens = timeline.dot[resolvedStatus] || timeline.dot.pending;
  const dotSize = size || timeline.dot.size || 16;
  return /* @__PURE__ */ React59.createElement(
    View55,
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
  const { timeline } = useComponentTokens58();
  const resolvedWidth = width || timeline.connector.width;
  return /* @__PURE__ */ React59.createElement(View55, { style: { width: resolvedWidth, flex: 1, backgroundColor: color || timeline.connector.color, marginVertical: 4, borderRadius: resolvedWidth } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ React59.createElement(View55, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ React59.createElement(View55, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ React59.createElement(Text38, null, children) : children);
}

// src/components/Toast/ToastContainer.tsx
import React61 from "react";
import { View as View57, StyleSheet as StyleSheet15 } from "react-native";
import { useSafeAreaInsets as useSafeAreaInsets2 } from "react-native-safe-area-context";
import { useToast, dismissToast } from "@truongdq01/headless";

// src/components/Toast/ToastItem.tsx
import React60, { useEffect as useEffect5 } from "react";
import Animated23, {
  useSharedValue as useSharedValue13,
  useAnimatedStyle as useAnimatedStyle15,
  withTiming as withTiming8,
  runOnJS as runOnJS4,
  FadeInUp,
  FadeOutUp,
  FadeInDown as FadeInDown2,
  FadeOutDown
} from "react-native-reanimated";
import { View as View56, Text as Text39, Pressable as Pressable28 } from "react-native";
import { useComponentTokens as useComponentTokens59, useTokens as useTokens44 } from "@truongdq01/headless";
function ToastItem({ item, position, onDismiss }) {
  const { toast } = useComponentTokens59();
  const tokens = useTokens44();
  const progress = useSharedValue13(1);
  useEffect5(() => {
    if (item.persistent) return;
    progress.value = withTiming8(0, { duration: item.duration }, (finished) => {
      if (finished) runOnJS4(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = useAnimatedStyle15(() => ({
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
  const entering = position === "top" ? FadeInDown2.springify().damping(18).stiffness(280) : FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? FadeOutUp.duration(200) : FadeOutDown.duration(200);
  return /* @__PURE__ */ React60.createElement(
    Animated23.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ React60.createElement(View56, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, React60.isValidElement(item.icon) ? React60.cloneElement(item.icon, {
      size: item.icon.props?.size ?? 20,
      color: item.icon.props?.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ React60.createElement(Icon, { size: 20, color: v.iconColor, name: "VARIANT_ICONS[item.variant]" }),
    /* @__PURE__ */ React60.createElement(Text39, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ React60.createElement(
      Pressable28,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ React60.createElement(Text39, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ React60.createElement(Pressable28, { onPress: () => onDismiss(item.id), hitSlop: 8 }, /* @__PURE__ */ React60.createElement(Icon, { size: 18, color: tokens.color.text.inverse, name: "close" })),
    !item.persistent && /* @__PURE__ */ React60.createElement(View56, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ React60.createElement(Animated23.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets2();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ React61.createElement(View57, { style: [styles12.container, positionStyle], pointerEvents: "box-none" }, toasts.map((item) => /* @__PURE__ */ React61.createElement(
    ToastItem,
    {
      key: item.id,
      item,
      position,
      onDismiss: dismissToast
    }
  )));
}
var styles12 = StyleSheet15.create({
  container: {
    position: "absolute",
    zIndex: 9999
  }
});

// src/components/ToggleButton/ToggleButton.tsx
import React62, { createContext as createContext10, useContext as useContext10 } from "react";
import { View as View58, Text as Text40 } from "react-native";
import Animated24 from "react-native-reanimated";
import { GestureDetector as GestureDetector9 } from "react-native-gesture-handler";
import { useComponentTokens as useComponentTokens60, usePressable as usePressable7, useTokens as useTokens45, useToggleGroup } from "@truongdq01/headless";
var ToggleContext = createContext10(null);
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
  return /* @__PURE__ */ React62.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ React62.createElement(View58, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const { toggleButton } = useComponentTokens60();
  const tokens = useTokens45();
  const ctx = useContext10(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = usePressable7({
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
  return /* @__PURE__ */ React62.createElement(GestureDetector9, { gesture }, /* @__PURE__ */ React62.createElement(
    Animated24.View,
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
    /* @__PURE__ */ React62.createElement(
      Text40,
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
import React63, { useState as useState15, useCallback as useCallback2 } from "react";
import { Text as Text41, Pressable as Pressable29, Modal as Modal11, useWindowDimensions as useWindowDimensions3 } from "react-native";
import Animated25, {
  useSharedValue as useSharedValue14,
  useAnimatedStyle as useAnimatedStyle16,
  withTiming as withTiming9,
  runOnJS as runOnJS5
} from "react-native-reanimated";
import { useTokens as useTokens46, useComponentTokens as useComponentTokens61 } from "@truongdq01/headless";
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const { tooltip } = useComponentTokens61();
  const tokens = useTokens46();
  const [internalOpen, setInternalOpen] = useState15(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions3();
  const [triggerRect, setTriggerRect] = useState15(null);
  const [tooltipSize, setTooltipSize] = useState15({ width: 0, height: 0 });
  const triggerRef = React63.useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const opacity = useSharedValue14(0);
  const animateIn = useCallback2(() => {
    opacity.value = withTiming9(1, { duration: 150 });
  }, []);
  const animateOut = useCallback2((onDone) => {
    opacity.value = withTiming9(0, { duration: 100 }, () => {
      runOnJS5(onDone)();
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
  const animStyle = useAnimatedStyle16(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ React63.createElement(React63.Fragment, null, /* @__PURE__ */ React63.createElement(
    Pressable29,
    {
      ref: triggerRef,
      onPress: handleOpen,
      onLongPress: handleOpen,
      delayLongPress: 400
    },
    children
  ), /* @__PURE__ */ React63.createElement(
    Modal11,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ React63.createElement(
      Pressable29,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ React63.createElement(
        Animated25.View,
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
        typeof title === "string" ? /* @__PURE__ */ React63.createElement(Text41, { style: tooltip.text }, title) : title
      )
    )
  ));
}

// src/components/Typography/Typography.tsx
import React64 from "react";
import { Text as Text42 } from "react-native";
import { useComponentTokens as useComponentTokens62, useTokens as useTokens47 } from "@truongdq01/headless";
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
  const { typography } = useComponentTokens62();
  const tokens = useTokens47();
  const variantStyle = variant === "inherit" ? {} : typography.variants[variant] || {};
  const resolvedColor = color && typography.colors[color] ? typography.colors[color] : color || typography.colors.primary;
  const resolvedDisplay = display === "block" || display === "inline" || display === "inline-flex" ? "flex" : display;
  return /* @__PURE__ */ React64.createElement(
    Text42,
    {
      numberOfLines: noWrap ? 1 : void 0,
      style: [
        { color: resolvedColor, textAlign: align === "inherit" ? void 0 : align },
        variantStyle,
        paragraph && { marginBottom: tokens.spacing[4] },
        gutterBottom && { marginBottom: tokens.spacing[2] },
        resolvedDisplay ? { display: resolvedDisplay } : null,
        style
      ]
    },
    children
  );
}

// src/index.ts
import { StyleSheet as StyleSheet16 } from "react-native";
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
  Card,
  Carousel,
  Checkbox,
  Chip,
  CircularProgress,
  DatePicker,
  Dialog,
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
  Menu2 as Menu,
  MenuItem,
  Modal7 as Modal,
  OTPInput,
  Pagination,
  Paper,
  PasswordInput,
  Popover,
  Popper,
  Pressable18 as Pressable,
  RadioGroup,
  RadioItem,
  Rating,
  RnImage,
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
  StyleSheet16 as StyleSheet,
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
  createTheme,
  useActiveBrand,
  useBrandSwitch,
  useComponentTokens63 as useComponentTokens,
  useFormControl,
  useIsDark,
  useTheme,
  useTokens48 as useTokens
};
//# sourceMappingURL=index.mjs.map