"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Alert: () => Alert,
  AlertTitle: () => AlertTitle,
  AnimatedList: () => AnimatedList,
  AppBar: () => AppBar,
  Autocomplete: () => Autocomplete,
  Avatar: () => Avatar,
  AvatarGroup: () => AvatarGroup,
  Badge: () => Badge,
  BottomNavigation: () => BottomNavigation,
  BottomNavigationAction: () => BottomNavigationAction,
  BottomSheet: () => BottomSheet,
  Box: () => Box2,
  Breadcrumbs: () => Breadcrumbs,
  Button: () => Button,
  ButtonGroup: () => ButtonGroup,
  Card: () => Card,
  Carousel: () => Carousel,
  Checkbox: () => Checkbox,
  Chip: () => Chip,
  CircularProgress: () => CircularProgress,
  DatePicker: () => DatePicker,
  Dialog: () => Dialog,
  DialogActions: () => DialogActions,
  DialogContent: () => DialogContent,
  DialogTitle: () => DialogTitle,
  Divider: () => Divider,
  Drawer: () => Drawer,
  EmptyState: () => EmptyState,
  Fab: () => Fab,
  FormControl: () => FormControl,
  FormControlLabel: () => FormControlLabel,
  FormField: () => FormField,
  FormGroup: () => FormGroup,
  FormHelperText: () => FormHelperText,
  FormLabel: () => FormLabel,
  Grid: () => Grid2,
  Icon: () => Icon,
  ImageList: () => ImageList,
  ImageListItem: () => ImageListItem,
  ImageListItemBar: () => ImageListItemBar,
  Input: () => Input,
  LinearProgress: () => LinearProgress,
  Link: () => Link,
  List: () => List,
  ListItem: () => ListItem,
  Menu: () => Menu2,
  MenuItem: () => MenuItem,
  Modal: () => Modal9,
  OTPInput: () => OTPInput,
  Pagination: () => Pagination,
  Paper: () => Paper,
  PasswordInput: () => PasswordInput,
  Popover: () => Popover,
  Popper: () => Popper,
  Pressable: () => Pressable11,
  RadioGroup: () => RadioGroup,
  RadioItem: () => RadioItem,
  Rating: () => Rating,
  RnImage: () => RnImage,
  SectionHeader: () => SectionHeader,
  SegmentedControl: () => SegmentedControl,
  Select: () => Select,
  Skeleton: () => Skeleton,
  SkeletonCard: () => SkeletonCard,
  SkeletonListItem: () => SkeletonListItem,
  SkeletonText: () => SkeletonText,
  Slider: () => Slider,
  Snackbar: () => Snackbar,
  SpeedDial: () => SpeedDial,
  SpeedDialAction: () => SpeedDialAction,
  Stack: () => Stack,
  Step: () => Step,
  StepLabel: () => StepLabel,
  Stepper: () => Stepper,
  SvgIcon: () => SvgIcon,
  Switch: () => Switch,
  Tab: () => Tab,
  Table: () => Table,
  TableBody: () => TableBody,
  TableCell: () => TableCell,
  TableContainer: () => TableContainer,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TablePagination: () => TablePagination,
  TableRow: () => TableRow,
  TableSortLabel: () => TableSortLabel,
  Tabs: () => Tabs,
  TextArea: () => TextArea,
  TextField: () => TextField,
  ThemeProvider: () => import_headless62.ThemeProvider,
  Timeline: () => Timeline,
  TimelineConnector: () => TimelineConnector,
  TimelineContent: () => TimelineContent,
  TimelineDot: () => TimelineDot,
  TimelineItem: () => TimelineItem,
  TimelineOppositeContent: () => TimelineOppositeContent,
  TimelineSeparator: () => TimelineSeparator,
  ToastContainer: () => ToastContainer,
  ToastItem: () => ToastItem,
  ToggleButton: () => ToggleButton,
  ToggleButtonGroup: () => ToggleButtonGroup,
  Toolbar: () => Toolbar,
  Tooltip: () => Tooltip,
  Typography: () => Typography,
  useComponentTokens: () => import_headless62.useComponentTokens,
  useFormControl: () => useFormControl,
  useIconStyle: () => import_headless63.useIconStyle,
  useIsDark: () => import_headless62.useIsDark,
  useTheme: () => import_headless62.useTheme,
  useTokens: () => import_headless62.useTokens
});
module.exports = __toCommonJS(index_exports);
__reExport(index_exports, require("@rnui/headless"), module.exports);
var import_headless62 = require("@rnui/headless");
var import_headless63 = require("@rnui/headless");

// src/components/Button/Button.tsx
var import_react = __toESM(require("react"));
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_react_native = require("react-native");
var import_headless = require("@rnui/headless");
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
  const { button } = (0, import_headless.useComponentTokens)();
  const tokens = (0, import_headless.useTokens)();
  const { size: iconSize } = (0, import_headless.useIconStyle)("button");
  const isDisabled = disabled || loading;
  const resolvedVariant = (0, import_react.useMemo)(() => {
    if (variant === "contained") return "solid";
    if (variant === "outlined") return "outline";
    if (variant === "text") return "ghost";
    return variant;
  }, [variant]);
  const resolvedColor = (0, import_react.useMemo)(() => {
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
  const handlePress = (0, import_react.useMemo)(() => {
    if (!href) return onPress;
    return () => {
      onPress?.();
      import_react_native.Linking.openURL(href);
    };
  }, [href, onPress]);
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless.usePressable)({
    onPress: handlePress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? (typeof children === "string" ? children : label),
    accessibilityHint,
    accessibilityRole: "button"
  });
  const containerStyle = (0, import_react.useMemo)(() => [
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
  const textStyle = (0, import_react.useMemo)(() => [
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
    if (import_react.default.isValidElement(icon)) {
      return import_react.default.cloneElement(icon, {
        size: icon.props?.size ?? iconSize,
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_gesture_handler.GestureDetector, { gesture }, /* @__PURE__ */ import_react.default.createElement(
    import_react_native_reanimated.default.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { style: [
      styles.contentContainer,
      {
        gap: button.variant[resolvedVariant].container.gap,
        opacity: loading && loadingPosition === "center" ? 0 : 1
      }
    ] }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ import_react.default.createElement(import_react_native.ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ import_react.default.createElement(import_react_native.ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { style: [import_react_native.StyleSheet.absoluteFill, styles.loadingWrapper] }, loadingIndicator ?? /* @__PURE__ */ import_react.default.createElement(import_react_native.ActivityIndicator, { size: "small", color: iconColor }))
  ));
}
var styles = import_react_native.StyleSheet.create({
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
var import_react2 = __toESM(require("react"));
var import_react_native2 = require("react-native");
var import_headless2 = require("@rnui/headless");
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
  const { input } = (0, import_headless2.useComponentTokens)();
  const tokens = (0, import_headless2.useTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless2.useIconStyle)("input");
  const [isFocused, setIsFocused] = (0, import_react2.useState)(false);
  const [hasTyped, setHasTyped] = (0, import_react2.useState)(false);
  const handleChange = (e) => {
    const text = e.nativeEvent.text;
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };
  const containerStyle = (0, import_react2.useMemo)(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ], [input, size, isFocused, error, disabled]);
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (import_react2.default.isValidElement(icon)) {
      return import_react2.default.cloneElement(icon, {
        size: icon.props?.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ import_react2.default.createElement(import_react_native2.View, null, label && /* @__PURE__ */ import_react2.default.createElement(import_react_native2.Text, { style: input.label }, label), /* @__PURE__ */ import_react2.default.createElement(import_react_native2.View, { style: containerStyle }, renderIcon(leadingElement), /* @__PURE__ */ import_react2.default.createElement(
    import_react_native2.TextInput,
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
  ), renderIcon(trailingElement)), error ? /* @__PURE__ */ import_react2.default.createElement(import_react_native2.Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ import_react2.default.createElement(import_react_native2.Text, { style: input.helperText }, helperText) : null);
}

// src/components/Input/PasswordInput.tsx
var import_react3 = __toESM(require("react"));
var import_react_native3 = require("react-native");
var import_headless3 = require("@rnui/headless");
var import_lucide_react_native = require("lucide-react-native");
function PasswordInput(props) {
  const [show, setShow] = (0, import_react3.useState)(false);
  const { size, color } = (0, import_headless3.useIconStyle)("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ import_react3.default.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ import_react3.default.createElement(
        import_react_native3.Pressable,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        show ? /* @__PURE__ */ import_react3.default.createElement(import_lucide_react_native.EyeOff, { size, color }) : /* @__PURE__ */ import_react3.default.createElement(import_lucide_react_native.Eye, { size, color })
      )
    }
  );
}

// src/components/Card/Card.tsx
var import_react4 = __toESM(require("react"));
var import_react_native_reanimated2 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var import_react_native4 = require("react-native");
var import_headless4 = require("@rnui/headless");
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = (0, import_headless4.useComponentTokens)();
  const containerStyle = (0, import_react4.useMemo)(() => [
    card.container,
    padding !== "none" && { padding: card.padding[padding] },
    style
  ], [card, padding, style]);
  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = (0, import_headless4.usePressable)({
      onPress,
      feedbackMode: "scaleSubtle",
      accessibilityLabel,
      accessibilityRole: "button"
    });
    return /* @__PURE__ */ import_react4.default.createElement(import_react_native_gesture_handler2.GestureDetector, { gesture }, /* @__PURE__ */ import_react4.default.createElement(import_react_native_reanimated2.default.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, { style: containerStyle }, children);
}

// src/components/Badge/Badge.tsx
var import_react5 = __toESM(require("react"));
var import_react_native5 = require("react-native");
var import_headless5 = require("@rnui/headless");
function Badge({ label, variant = "default", size = "md", icon }) {
  const { badge } = (0, import_headless5.useComponentTokens)();
  const { size: iconSize } = (0, import_headless5.useIconStyle)("list");
  const containerStyle = (0, import_react5.useMemo)(() => [
    badge.base,
    badge.size[size],
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    }
  ], [badge, variant, size]);
  const textStyle = (0, import_react5.useMemo)(() => [
    badge.text,
    { color: badge.variant[variant].text }
  ], [badge, variant]);
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (import_react5.default.isValidElement(el)) {
      return import_react5.default.cloneElement(el, {
        size: el.props?.size ?? iconSize * 0.8,
        color: el.props?.color ?? iconColor
      });
    }
    return el;
  };
  return /* @__PURE__ */ import_react5.default.createElement(import_react_native5.View, { style: containerStyle }, renderIcon(icon), /* @__PURE__ */ import_react5.default.createElement(import_react_native5.Text, { style: textStyle }, label));
}

// src/components/Toast/ToastContainer.tsx
var import_react7 = __toESM(require("react"));
var import_react_native7 = require("react-native");
var import_react_native_safe_area_context = require("react-native-safe-area-context");
var import_headless7 = require("@rnui/headless");

// src/components/Toast/ToastItem.tsx
var import_react6 = __toESM(require("react"));
var import_react_native_reanimated3 = __toESM(require("react-native-reanimated"));
var import_react_native6 = require("react-native");
var import_headless6 = require("@rnui/headless");
function VariantIcon({ variant, color }) {
  const size = 20;
  if (variant === "success") {
    return /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: { color: "#fff", fontSize: 12, fontWeight: "800", marginTop: -1 } }, "\u2713"));
  }
  if (variant === "error") {
    return /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: { color: "#fff", fontSize: 13, fontWeight: "800", marginTop: -1 } }, "\u2715"));
  }
  if (variant === "warning") {
    return /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: { color: "#fff", fontSize: 13, fontWeight: "900" } }, "!"));
  }
  if (variant === "info") {
    return /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: { color: "#fff", fontSize: 13, fontWeight: "900" } }, "i"));
  }
  return null;
}
function ToastItem({ item, position, onDismiss }) {
  const { toast } = (0, import_headless6.useComponentTokens)();
  const tokens = (0, import_headless6.useTokens)();
  const progress = (0, import_react_native_reanimated3.useSharedValue)(1);
  (0, import_react6.useEffect)(() => {
    if (item.persistent) return;
    progress.value = (0, import_react_native_reanimated3.withTiming)(0, { duration: item.duration }, (finished) => {
      if (finished) (0, import_react_native_reanimated3.runOnJS)(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = (0, import_react_native_reanimated3.useAnimatedStyle)(() => ({
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
  const entering = position === "top" ? import_react_native_reanimated3.FadeInDown.springify().damping(18).stiffness(280) : import_react_native_reanimated3.FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? import_react_native_reanimated3.FadeOutUp.duration(200) : import_react_native_reanimated3.FadeOutDown.duration(200);
  return /* @__PURE__ */ import_react6.default.createElement(
    import_react_native_reanimated3.default.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, import_react6.default.isValidElement(item.icon) ? import_react6.default.cloneElement(item.icon, {
      size: item.icon.props?.size ?? 20,
      color: item.icon.props?.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ import_react6.default.createElement(VariantIcon, { variant: item.variant, color: v.iconColor }),
    /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ import_react6.default.createElement(
      import_react_native6.Pressable,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Pressable, { onPress: () => onDismiss(item.id), hitSlop: 8 }, /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: { fontSize: 16, color: tokens.color.text.inverse, opacity: 0.7, lineHeight: 18 } }, "\u2715")),
    !item.persistent && /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ import_react6.default.createElement(import_react_native_reanimated3.default.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = (0, import_headless7.useToast)();
  const insets = (0, import_react_native_safe_area_context.useSafeAreaInsets)();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ import_react7.default.createElement(import_react_native7.View, { style: [styles2.container, positionStyle], pointerEvents: "box-none" }, toasts.map((item) => /* @__PURE__ */ import_react7.default.createElement(
    ToastItem,
    {
      key: item.id,
      item,
      position,
      onDismiss: import_headless7.dismissToast
    }
  )));
}
var styles2 = import_react_native7.StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999
  }
});

// src/components/BottomSheet/BottomSheet.tsx
var import_react8 = __toESM(require("react"));
var import_react_native8 = require("react-native");
var import_react_native_reanimated4 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler3 = require("react-native-gesture-handler");
var import_react_native_safe_area_context2 = require("react-native-safe-area-context");
var import_headless8 = require("@rnui/headless");
var SCREEN_HEIGHT = import_react_native8.Dimensions.get("window").height;
var BottomSheet = (0, import_react8.forwardRef)(
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
    const tokens = (0, import_headless8.useTokens)();
    const insets = (0, import_react_native_safe_area_context2.useSafeAreaInsets)();
    const [mounted, setMounted] = (0, import_react8.useState)(false);
    const handleClose = import_react8.default.useCallback(() => {
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
    } = (0, import_headless8.useBottomSheet)({
      snapPoints,
      initialSnapIndex,
      onClose: handleClose,
      onSnapChange,
      enableDismissOnSwipe,
      enableBackdrop
    });
    const open = import_react8.default.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    (0, import_react8.useImperativeHandle)(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ import_react8.default.createElement(import_react_native8.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ import_react8.default.createElement(import_react_native8.View, { style: import_react_native8.StyleSheet.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ import_react8.default.createElement(import_react_native_gesture_handler3.GestureDetector, { gesture: backdropTapGesture }, /* @__PURE__ */ import_react8.default.createElement(
      import_react_native_reanimated4.default.View,
      {
        style: [
          import_react_native8.StyleSheet.absoluteFill,
          { backgroundColor: "#000" },
          backdropAnimatedStyle
        ]
      }
    )), /* @__PURE__ */ import_react8.default.createElement(
      import_react_native_reanimated4.default.View,
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
      /* @__PURE__ */ import_react8.default.createElement(import_react_native_gesture_handler3.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ import_react8.default.createElement(import_react_native8.View, { style: styles3.handleArea }, showHandle && /* @__PURE__ */ import_react8.default.createElement(
        import_react_native8.View,
        {
          style: [
            styles3.handle,
            { backgroundColor: tokens.color.border.strong }
          ]
        }
      ))),
      /* @__PURE__ */ import_react8.default.createElement(import_react_native8.View, { style: { flex: 1 } }, children)
    )));
  }
);
var styles3 = import_react_native8.StyleSheet.create({
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
var import_react9 = __toESM(require("react"));
var import_react_native9 = require("react-native");
var import_react_native_reanimated5 = __toESM(require("react-native-reanimated"));
var import_headless9 = require("@rnui/headless");
var import_tokens = require("@rnui/tokens");
var SIZE = { sm: 18, md: 22, lg: 26 };
var ICON_SIZE = { sm: 10, md: 13, lg: 16 };
function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}) {
  const tokens = (0, import_headless9.useTokens)();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = (0, import_headless9.useCheckbox)(hookOptions);
  const boxSize = SIZE[size];
  const iconSize = ICON_SIZE[size];
  const scale = (0, import_react_native_reanimated5.useSharedValue)(1);
  const fillProgress = (0, import_react_native_reanimated5.useSharedValue)(isChecked || isIndeterminate ? 1 : 0);
  import_react9.default.useEffect(() => {
    fillProgress.value = (0, import_react_native_reanimated5.withSpring)(isChecked || isIndeterminate ? 1 : 0, import_tokens.spring.snappy);
  }, [isChecked, isIndeterminate]);
  const boxStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated5.interpolate)(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5 ? tokens.color.brand.default : "transparent",
    borderColor: fillProgress.value > 0.5 ? tokens.color.brand.default : tokens.color.border.default,
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    scale.value = (0, import_react_native_reanimated5.withSpring)(0.88, import_tokens.spring.snappy, () => {
      scale.value = (0, import_react_native_reanimated5.withSpring)(1, import_tokens.spring.snappy);
    });
    toggle();
  };
  return /* @__PURE__ */ import_react9.default.createElement(
    import_react_native9.Pressable,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? 0.4 : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react9.default.createElement(
      import_react_native_reanimated5.default.View,
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
      /* @__PURE__ */ import_react9.default.createElement(import_react_native_reanimated5.default.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ import_react9.default.createElement(import_react_native9.View, { style: { width: iconSize, height: 2, backgroundColor: "#fff", borderRadius: 1 } }) : /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Text, { style: { color: "#fff", fontSize: iconSize, fontWeight: "700", lineHeight: iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ import_react9.default.createElement(import_react_native9.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Switch/Switch.tsx
var import_react10 = __toESM(require("react"));
var import_react_native10 = require("react-native");
var import_react_native_reanimated6 = __toESM(require("react-native-reanimated"));
var import_headless10 = require("@rnui/headless");
var import_tokens2 = require("@rnui/tokens");
function Switch({ label, description, size = "md", ...hookOptions }) {
  const tokens = (0, import_headless10.useTokens)();
  const { switch: switchT } = (0, import_headless10.useComponentTokens)();
  const { isOn, isDisabled, toggle, accessibilityProps } = (0, import_headless10.useSwitch)(hookOptions);
  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = tTrack.width - tThumb.width - tTrack.padding * 2;
  const progress = (0, import_react_native_reanimated6.useSharedValue)(isOn ? 1 : 0);
  import_react10.default.useEffect(() => {
    progress.value = (0, import_react_native_reanimated6.withSpring)(isOn ? 1 : 0, import_tokens2.spring.snappy);
  }, [isOn]);
  const trackStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated6.interpolateColor)(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    )
  }));
  const thumbStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ import_react10.default.createElement(
    import_react_native10.Pressable,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? switchT.colors.disabledOpacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react10.default.createElement(
      import_react_native_reanimated6.default.View,
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
      /* @__PURE__ */ import_react10.default.createElement(
        import_react_native_reanimated6.default.View,
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
    (label || description) && /* @__PURE__ */ import_react10.default.createElement(import_react_native10.View, { style: { flex: 1 } }, label && /* @__PURE__ */ import_react10.default.createElement(import_react_native10.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ import_react10.default.createElement(import_react_native10.Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Select/Select.tsx
var import_react11 = __toESM(require("react"));
var import_react_native11 = require("react-native");
var import_headless11 = require("@rnui/headless");
function Select({
  label,
  placeholder = "Select\u2026",
  searchable = false,
  error,
  onClearError,
  options,
  ...hookOptions
}) {
  const tokens = (0, import_headless11.useTokens)();
  const sheetRef = (0, import_react11.useRef)(null);
  const [query, setQuery] = (0, import_react11.useState)("");
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel,
    triggerProps
  } = (0, import_headless11.useSelect)({ options, ...hookOptions, placeholder });
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
  const { size: searchIconSize, color: searchIconColor } = (0, import_headless11.useIconStyle)("input");
  return /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, null, label && /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ import_react11.default.createElement(
    import_react_native11.Pressable,
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
    /* @__PURE__ */ import_react11.default.createElement(
      import_react_native11.Text,
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
    /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: { fontSize: 12, color: tokens.color.text.tertiary, marginLeft: 8 } }, isOpen ? "\u25B2" : "\u25BC")
  ), error && /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ import_react11.default.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: { flex: 1, paddingHorizontal: tokens.spacing[4] } }, searchable && isOpen && /* @__PURE__ */ import_react11.default.createElement(
      import_react_native11.View,
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
      /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: { width: searchIconSize, height: searchIconSize, marginRight: 8, alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: {
        width: searchIconSize * 0.7,
        height: searchIconSize * 0.7,
        borderRadius: searchIconSize * 0.35,
        borderWidth: 2,
        borderColor: searchIconColor,
        position: "absolute",
        top: 0,
        left: 0
      } }), /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: {
        width: 2,
        height: searchIconSize * 0.4,
        backgroundColor: searchIconColor,
        borderRadius: 1,
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: [{ rotate: "-45deg" }]
      } })),
      /* @__PURE__ */ import_react11.default.createElement(
        import_react_native11.TextInput,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search\u2026",
          placeholderTextColor: tokens.color.text.tertiary,
          style: { flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" },
          autoFocus: true
        }
      ),
      query.length > 0 && /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Pressable, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: { fontSize: 14, color: tokens.color.text.tertiary } }, "\u2715"))
    ), /* @__PURE__ */ import_react11.default.createElement(import_react_native11.ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled" }, filtered.length === 0 ? /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] } }, 'No results for "', query, '"') : filtered.map((option) => {
      const selected = isSelected(option.value);
      return /* @__PURE__ */ import_react11.default.createElement(
        import_react_native11.Pressable,
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
        /* @__PURE__ */ import_react11.default.createElement(
          import_react_native11.Text,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? tokens.color.brand.text : tokens.color.text.primary,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: { fontSize: 14, color: tokens.color.brand.default } }, "\u2713")
      );
    }), /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: { height: tokens.spacing[4] } })))
  ));
}

// src/components/List/List.tsx
var import_react12 = __toESM(require("react"));
var import_react_native12 = require("react-native");
var import_react_native_reanimated7 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler4 = require("react-native-gesture-handler");
var import_flash_list = require("@shopify/flash-list");
var import_headless12 = require("@rnui/headless");
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
  const tokens = (0, import_headless12.useTokens)();
  const {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps
  } = (0, import_headless12.useListItem)({ onPress, onLongPress, trailingActions, leadingActions, disabled });
  const { size: iconSize, color: iconColor } = (0, import_headless12.useIconStyle)("list");
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (import_react12.default.isValidElement(icon)) {
      return import_react12.default.cloneElement(icon, {
        size: icon.props?.size ?? iconSize,
        color: icon.props?.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { overflow: "hidden" } }, leadingActions.length > 0 && /* @__PURE__ */ import_react12.default.createElement(
    import_react_native_reanimated7.default.View,
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
    leadingActions.map((action, i) => /* @__PURE__ */ import_react12.default.createElement(
      import_react_native12.Pressable,
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
      /* @__PURE__ */ import_react12.default.createElement(import_react_native12.Text, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), trailingActions.length > 0 && /* @__PURE__ */ import_react12.default.createElement(
    import_react_native_reanimated7.default.View,
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
    trailingActions.map((action, i) => /* @__PURE__ */ import_react12.default.createElement(
      import_react_native12.Pressable,
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
      /* @__PURE__ */ import_react12.default.createElement(import_react_native12.Text, { style: { fontSize: 12, fontWeight: "600", color: action.textColor ?? "#fff" } }, action.label)
    ))
  ), /* @__PURE__ */ import_react12.default.createElement(import_react_native_gesture_handler4.GestureDetector, { gesture }, /* @__PURE__ */ import_react12.default.createElement(
    import_react_native_reanimated7.default.View,
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
    leading && /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { width: 24, alignItems: "center", justifyContent: "center" } }, renderIcon(leading)),
    /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { flex: 1 } }, /* @__PURE__ */ import_react12.default.createElement(
      import_react_native12.Text,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        },
        numberOfLines: 1
      },
      title
    ), subtitle && /* @__PURE__ */ import_react12.default.createElement(
      import_react_native12.Text,
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
    trailing && /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, null, renderIcon(trailing))
  )), showSeparator && /* @__PURE__ */ import_react12.default.createElement(
    import_react_native12.View,
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
  const tokens = (0, import_headless12.useTokens)();
  return /* @__PURE__ */ import_react12.default.createElement(
    import_react_native12.View,
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
    /* @__PURE__ */ import_react12.default.createElement(
      import_react_native12.Text,
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
  const tokens = (0, import_headless12.useTokens)();
  const renderFlashItem = (0, import_react12.useCallback)(
    ({ item, index }) => renderItem(item, index),
    [renderItem]
  );
  const ItemSeparator = separator ? () => /* @__PURE__ */ import_react12.default.createElement(
    import_react_native12.View,
    {
      style: {
        height: 0.5,
        marginLeft: tokens.spacing[4],
        backgroundColor: tokens.color.border.default
      }
    }
  ) : void 0;
  if (isLoading) {
    return /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, null, Array.from({ length: loadingCount }).map((_, i) => /* @__PURE__ */ import_react12.default.createElement(SkeletonItem, { key: i })));
  }
  if (data.length === 0 && emptyComponent) {
    return emptyComponent;
  }
  const FlashListAny = import_flash_list.FlashList;
  return /* @__PURE__ */ import_react12.default.createElement(
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
  const tokens = (0, import_headless12.useTokens)();
  return /* @__PURE__ */ import_react12.default.createElement(
    import_react_native12.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.color.bg.muted } }),
    /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { flex: 1, gap: 6 } }, /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { width: "60%", height: 14, borderRadius: 4, backgroundColor: tokens.color.bg.muted } }), /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: { width: "40%", height: 12, borderRadius: 4, backgroundColor: tokens.color.bg.emphasis } }))
  );
}

// src/components/Radio/Radio.tsx
var import_react13 = __toESM(require("react"));
var import_react_native13 = require("react-native");
var import_react_native_reanimated8 = __toESM(require("react-native-reanimated"));
var import_headless13 = require("@rnui/headless");
var import_tokens3 = require("@rnui/tokens");
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = (0, import_headless13.useTokens)();
  const { radio } = (0, import_headless13.useComponentTokens)();
  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = import_tokens3.spring.snappy;
  const scale = (0, import_react_native_reanimated8.useSharedValue)(isSelected ? 1 : 0);
  import_react13.default.useEffect(() => {
    scale.value = (0, import_react_native_reanimated8.withSpring)(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);
  const dotStyle = (0, import_react_native_reanimated8.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const handlePress = () => {
    if (!isSelected) {
      scale.value = (0, import_react_native_reanimated8.withSpring)(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = (0, import_react_native_reanimated8.withSpring)(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ import_react13.default.createElement(
    import_react_native13.Pressable,
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
    /* @__PURE__ */ import_react13.default.createElement(
      import_react_native13.View,
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
      /* @__PURE__ */ import_react13.default.createElement(
        import_react_native_reanimated8.default.View,
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
    (label || description) && /* @__PURE__ */ import_react13.default.createElement(import_react_native13.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ import_react13.default.createElement(
      import_react_native13.Text,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ import_react13.default.createElement(
      import_react_native13.Text,
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
  const tokens = (0, import_headless13.useTokens)();
  const { isSelected, getItemProps } = (0, import_headless13.useRadioGroup)(hookOptions);
  return /* @__PURE__ */ import_react13.default.createElement(import_react_native13.View, null, label && /* @__PURE__ */ import_react13.default.createElement(
    import_react_native13.Text,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ import_react13.default.createElement(
    import_react_native13.View,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ import_react13.default.createElement(
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
var import_react14 = __toESM(require("react"));
var import_react_native14 = require("react-native");
var import_react_native_reanimated9 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler5 = require("react-native-gesture-handler");
var import_headless14 = require("@rnui/headless");
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
  const tokens = (0, import_headless14.useTokens)();
  const { slider } = (0, import_headless14.useComponentTokens)();
  const {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage
  } = (0, import_headless14.useSlider)({ min, max, step, ...hookOptions });
  const marks = showMarks && step > 0 ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min) : [];
  return /* @__PURE__ */ import_react14.default.createElement(import_react_native14.View, { style: { opacity: hookOptions.disabled ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ import_react14.default.createElement(import_react_native14.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ import_react14.default.createElement(import_react_native14.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ import_react14.default.createElement(import_react_native14.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default } }, formatValue(currentValue))), /* @__PURE__ */ import_react14.default.createElement(import_react_native_reanimated9.default.View, { style: [{ paddingVertical: 12 }, trackAnimatedStyle] }, /* @__PURE__ */ import_react14.default.createElement(import_react_native_gesture_handler5.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ import_react14.default.createElement(
    import_react_native14.View,
    {
      style: { height: slider.thumb.height, justifyContent: "center" },
      onLayout: (e) => onTrackLayout(e.nativeEvent.layout.width)
    },
    /* @__PURE__ */ import_react14.default.createElement(
      import_react_native14.View,
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
      /* @__PURE__ */ import_react14.default.createElement(
        import_react_native_reanimated9.default.View,
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
      return /* @__PURE__ */ import_react14.default.createElement(
        import_react_native14.View,
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
    /* @__PURE__ */ import_react14.default.createElement(
      import_react_native_reanimated9.default.View,
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
  ))), showRange && /* @__PURE__ */ import_react14.default.createElement(import_react_native14.View, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ import_react14.default.createElement(import_react_native14.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ import_react14.default.createElement(import_react_native14.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}

// src/components/DatePicker/DatePicker.tsx
var import_react15 = __toESM(require("react"));
var import_react_native15 = require("react-native");
var import_headless15 = require("@rnui/headless");
var import_datetimepicker = __toESM(require("@react-native-community/datetimepicker"));
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
  const tokens = (0, import_headless15.useTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless15.useIconStyle)("input");
  const [showPicker, setShowPicker] = (0, import_react15.useState)(false);
  const [selectedPreset, setSelectedPreset] = (0, import_react15.useState)(null);
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
    if (import_react_native15.Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      setSelectedPreset(null);
      onChange(selectedDate);
    }
  };
  const renderIcon = (node) => {
    if (!node) return null;
    if (import_react15.default.isValidElement(node)) {
      return import_react15.default.cloneElement(node, {
        size: node.props?.size ?? iconSize,
        color: node.props?.color ?? iconColor
      });
    }
    return node;
  };
  const pickerComponent = showPicker ? /* @__PURE__ */ import_react15.default.createElement(
    import_datetimepicker.default,
    {
      value: date ?? /* @__PURE__ */ new Date(),
      mode,
      display: import_react_native15.Platform.OS === "ios" ? "spinner" : "default",
      onChange: handleChange,
      minimumDate,
      maximumDate
    }
  ) : null;
  return /* @__PURE__ */ import_react15.default.createElement(import_react_native15.View, { style: { gap: tokens.spacing[2], opacity: disabled ? tokens.opacity[60] : 1 } }, label && /* @__PURE__ */ import_react15.default.createElement(
    import_react_native15.Text,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary
      }
    },
    label
  ), presets && presets.length > 0 && /* @__PURE__ */ import_react15.default.createElement(import_react_native15.View, { style: { flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" } }, presets.map((preset) => /* @__PURE__ */ import_react15.default.createElement(
    import_react_native15.Pressable,
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
    /* @__PURE__ */ import_react15.default.createElement(
      import_react_native15.Text,
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
  ))), /* @__PURE__ */ import_react15.default.createElement(
    import_react_native15.Pressable,
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
    /* @__PURE__ */ import_react15.default.createElement(
      import_react_native15.Text,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: date ? tokens.color.text.primary : tokens.color.text.tertiary
        }
      },
      displayValue
    ),
    clearable && date && /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Pressable, { onPress: handleClear, hitSlop: 8 }, /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Text, { style: { fontSize: 18, color: tokens.color.text.tertiary } }, "\u2715")),
    /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Text, { style: { fontSize: 18, color: tokens.color.text.tertiary } }, "\u{1F4C5}")
  ), error && /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.error.text } }, error), import_react_native15.Platform.OS === "ios" && showPicker && /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Modal, { transparent: true, animationType: "slide", visible: showPicker }, /* @__PURE__ */ import_react15.default.createElement(import_react_native15.View, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ import_react15.default.createElement(import_react_native15.View, { style: { backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }, /* @__PURE__ */ import_react15.default.createElement(import_react_native15.View, { style: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 } }, /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Pressable, { onPress: () => setShowPicker(false), hitSlop: 12 }, /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Text, { style: { fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Done"))), pickerComponent))), import_react_native15.Platform.OS === "android" && pickerComponent);
}

// src/components/AnimatedList/AnimatedList.tsx
var import_react16 = __toESM(require("react"));
var import_react_native16 = require("react-native");
var import_flash_list2 = require("@shopify/flash-list");
var import_react_native_reanimated10 = __toESM(require("react-native-reanimated"));
var ReanimatedFlashList = import_react_native_reanimated10.default.createAnimatedComponent(import_flash_list2.FlashList);
var AnimatedList = (0, import_react16.forwardRef)(({
  data,
  renderItem,
  itemEntering = import_react_native_reanimated10.FadeInDown,
  itemExiting,
  itemLayout = import_react_native_reanimated10.Layout.springify().damping(16).stiffness(150),
  staggerEntering = false,
  staggerDelay = 50,
  itemContainerStyle,
  ...flashListProps
}, ref) => {
  const AnimatedCell = ({ item, index, target, ...props }) => {
    const enteringAnim = staggerEntering && itemEntering?.delay ? itemEntering.delay(Math.min(index * staggerDelay, 500)) : itemEntering;
    return /* @__PURE__ */ import_react16.default.createElement(
      import_react_native_reanimated10.default.View,
      {
        entering: enteringAnim,
        exiting: itemExiting,
        layout: itemLayout,
        style: [itemContainerStyle, styles4.itemWrapper]
      },
      renderItem({ item, index, target, separators: {} })
    );
  };
  return /* @__PURE__ */ import_react16.default.createElement(
    ReanimatedFlashList,
    {
      ref,
      data,
      renderItem: (info) => /* @__PURE__ */ import_react16.default.createElement(AnimatedCell, { ...info }),
      ...flashListProps
    }
  );
});
var styles4 = import_react_native16.StyleSheet.create({
  container: {
    flex: 1
  },
  itemWrapper: {
    overflow: "hidden"
  }
});

// src/components/SegmentedControl/SegmentedControl.tsx
var import_react17 = __toESM(require("react"));
var import_react_native17 = require("react-native");
var import_react_native_reanimated11 = __toESM(require("react-native-reanimated"));
var import_headless16 = require("@rnui/headless");
var import_tokens4 = require("@rnui/tokens");
function SegmentedControl({
  options,
  selectedIndex,
  onChange,
  height = 36,
  disabled = false
}) {
  const tokens = (0, import_headless16.useTokens)();
  const [containerWidth, setContainerWidth] = (0, import_react17.useState)(0);
  const segmentWidth = containerWidth / options.length;
  const translateX = (0, import_react_native_reanimated11.useSharedValue)(selectedIndex * segmentWidth);
  import_react17.default.useEffect(() => {
    if (segmentWidth > 0) {
      translateX.value = (0, import_react_native_reanimated11.withSpring)(selectedIndex * segmentWidth, import_tokens4.spring.snappy);
    }
  }, [selectedIndex, segmentWidth, translateX]);
  const onLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };
  const indicatorStyle = (0, import_react_native_reanimated11.useAnimatedStyle)(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width: segmentWidth
    };
  });
  return /* @__PURE__ */ import_react17.default.createElement(
    import_react_native17.View,
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
    containerWidth > 0 && /* @__PURE__ */ import_react17.default.createElement(
      import_react_native_reanimated11.default.View,
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
      return /* @__PURE__ */ import_react17.default.createElement(
        import_react_native17.Pressable,
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
        /* @__PURE__ */ import_react17.default.createElement(
          import_react_native17.Text,
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
var import_react18 = __toESM(require("react"));
var import_react_native18 = require("react-native");
var import_react_native_reanimated12 = __toESM(require("react-native-reanimated"));
var import_headless17 = require("@rnui/headless");
var { width: SCREEN_WIDTH } = import_react_native18.Dimensions.get("window");
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
  const tokens = (0, import_headless17.useTokens)();
  const scrollX = (0, import_react_native_reanimated12.useSharedValue)(0);
  const scrollViewRef = (0, import_react18.useRef)(null);
  const isJumping = (0, import_react18.useRef)(false);
  const autoPlayTimer = (0, import_react18.useRef)(null);
  const n = data.length;
  const displayData = import_react18.default.useMemo(() => {
    if (!loop || n < 2) return data;
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);
  const itemStep = itemWidth + gap;
  const snapToOffsets = displayData.map((_, i) => i * itemStep);
  import_react18.default.useEffect(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
        scrollX.value = itemStep;
      });
    }
  }, []);
  const goToNextSlide = import_react18.default.useCallback(() => {
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
  import_react18.default.useEffect(() => {
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
  return /* @__PURE__ */ import_react18.default.createElement(import_react_native18.View, { style: { height } }, /* @__PURE__ */ import_react18.default.createElement(
    import_react_native18.ScrollView,
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
      return /* @__PURE__ */ import_react18.default.createElement(import_react_native18.View, { key: index, style: { width: itemWidth, height } }, renderItem(item, loop ? (index - 1 + n) % n : index));
    })
  ), showPagination && /* @__PURE__ */ import_react18.default.createElement(
    import_react_native18.View,
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
      return /* @__PURE__ */ import_react18.default.createElement(
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
  const dotStyle = (0, import_react_native_reanimated12.useAnimatedStyle)(() => {
    let activeIndex = scrollX.value / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }
    const opacity = (0, import_react_native_reanimated12.interpolate)(
      activeIndex,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      import_react_native_reanimated12.Extrapolation.CLAMP
    );
    const width = (0, import_react_native_reanimated12.interpolate)(
      activeIndex,
      [index - 1, index, index + 1],
      [8, 20, 8],
      import_react_native_reanimated12.Extrapolation.CLAMP
    );
    return {
      width,
      opacity,
      backgroundColor: tokens.color.brand.default,
      height: 8,
      borderRadius: 4
    };
  });
  return /* @__PURE__ */ import_react18.default.createElement(import_react_native_reanimated12.default.View, { style: dotStyle });
}

// src/components/OTPInput/OTPInput.tsx
var import_react19 = __toESM(require("react"));
var import_react_native19 = require("react-native");
var import_react_native_reanimated13 = __toESM(require("react-native-reanimated"));
var import_headless18 = require("@rnui/headless");
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false
}) {
  const tokens = (0, import_headless18.useTokens)();
  const inputRef = (0, import_react19.useRef)(null);
  const [isFocused, setIsFocused] = (0, import_react19.useState)(false);
  const pulseScale = (0, import_react_native_reanimated13.useSharedValue)(1);
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
  return /* @__PURE__ */ import_react19.default.createElement(import_react_native19.View, { style: { width: "100%" } }, /* @__PURE__ */ import_react19.default.createElement(
    import_react_native19.TextInput,
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
  ), /* @__PURE__ */ import_react19.default.createElement(
    import_react_native19.Pressable,
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
      return /* @__PURE__ */ import_react19.default.createElement(
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
  const scale = (0, import_react_native_reanimated13.useSharedValue)(1);
  (0, import_react19.useEffect)(() => {
    if (isFocused) {
      scale.value = (0, import_react_native_reanimated13.withSequence)(
        (0, import_react_native_reanimated13.withTiming)(1.1, { duration: 150 }),
        (0, import_react_native_reanimated13.withTiming)(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = (0, import_react_native_reanimated13.withSpring)(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = (0, import_react_native_reanimated13.withTiming)(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);
  const animatedStyle = (0, import_react_native_reanimated13.useAnimatedStyle)(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: isFocused ? tokens.color.brand.default : isFilled ? tokens.color.border.strong : tokens.color.border.default,
      backgroundColor: isFilled ? tokens.color.surface.raised : tokens.color.surface.default
    };
  });
  return /* @__PURE__ */ import_react19.default.createElement(
    import_react_native_reanimated13.default.View,
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
    /* @__PURE__ */ import_react19.default.createElement(
      import_react_native19.Text,
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
var import_react20 = __toESM(require("react"));
var import_react_native20 = require("react-native");
var import_react_native_reanimated14 = __toESM(require("react-native-reanimated"));
var import_headless19 = require("@rnui/headless");
var AnimatedImage = import_react_native_reanimated14.default.createAnimatedComponent(import_react_native20.Image);
function RnImage({ showPlaceholder = true, style, onLoad, ...props }) {
  const tokens = (0, import_headless19.useTokens)();
  const [isLoaded, setIsLoaded] = (0, import_react20.useState)(false);
  const opacity = (0, import_react_native_reanimated14.useSharedValue)(0);
  const handleLoad = (e) => {
    setIsLoaded(true);
    opacity.value = (0, import_react_native_reanimated14.withTiming)(1, { duration: 300 });
    onLoad?.(e);
  };
  const imageStyle = (0, import_react_native_reanimated14.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ import_react20.default.createElement(import_react_native20.View, { style: [styles5.container, style, { backgroundColor: showPlaceholder && !isLoaded ? tokens.color.bg.muted : "transparent" }] }, /* @__PURE__ */ import_react20.default.createElement(
    AnimatedImage,
    {
      ...props,
      onLoad: handleLoad,
      style: [import_react_native20.StyleSheet.absoluteFill, imageStyle, style]
    }
  ));
}
var styles5 = import_react_native20.StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative"
  }
});

// src/components/Avatar/Avatar.tsx
var import_react21 = __toESM(require("react"));
var import_react_native21 = require("react-native");
var import_headless20 = require("@rnui/headless");
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
  const tokens = (0, import_headless20.useTokens)();
  const dim = SIZES[size];
  const radius = shape === "circle" ? dim / 2 : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;
  const dotSize = status ? STATUS_DOT[size] : 0;
  return /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: { width: dim, height: dim }, accessible: !!accessibilityLabel, accessibilityLabel }, src ? /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.Image,
    {
      source: { uri: src },
      style: { width: dim, height: dim, borderRadius: radius },
      accessibilityLabel
    }
  ) : initials ? /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.View,
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
    /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.Text,
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
    /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.View,
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
      fallbackIcon ?? /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Text, { style: { fontSize: FONT_SIZES[size], color: tokens.color.text.tertiary } }, "?")
    )
  ), status && /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.View,
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
  const tokens = (0, import_headless20.useTokens)();
  const dim = SIZES[size];
  const gap = overlap ?? Math.round(dim * 0.3);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.View,
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
      /* @__PURE__ */ import_react21.default.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.View,
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
      /* @__PURE__ */ import_react21.default.createElement(
        import_react_native21.Text,
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
var import_react22 = __toESM(require("react"));
var import_react_native22 = require("react-native");
var import_headless21 = require("@rnui/headless");
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
  const { input } = (0, import_headless21.useComponentTokens)();
  const tokens = (0, import_headless21.useTokens)();
  const [isFocused, setIsFocused] = (0, import_react22.useState)(false);
  const [contentHeight, setContentHeight] = (0, import_react22.useState)(0);
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
  return /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, null, (label || maxLength) && /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] } }, label && /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Text, { style: input.label }, label), maxLength && /* @__PURE__ */ import_react22.default.createElement(
    import_react_native22.Text,
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
  )), /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: containerStyle }, /* @__PURE__ */ import_react22.default.createElement(
    import_react_native22.TextInput,
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
  )), error ? /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Text, { style: input.helperText }, helperText) : null);
}

// src/components/Divider/Divider.tsx
var import_react23 = __toESM(require("react"));
var import_react_native23 = require("react-native");
var import_headless22 = require("@rnui/headless");
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const tokens = (0, import_headless22.useTokens)();
  const lineColor = emphasis ? tokens.color.border.strong : tokens.color.border.default;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: tokens.spacing[4],
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ import_react23.default.createElement(
      import_react_native23.View,
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
    return /* @__PURE__ */ import_react23.default.createElement(
      import_react_native23.View,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { style: { flex: 1, height: 1, backgroundColor: lineColor } }),
      /* @__PURE__ */ import_react23.default.createElement(
        import_react_native23.Text,
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
      /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { style: { flex: 1, height: 1, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ import_react23.default.createElement(
    import_react_native23.View,
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
var import_react24 = __toESM(require("react"));
var import_react_native24 = require("react-native");
var import_react_native_reanimated15 = __toESM(require("react-native-reanimated"));
var import_headless23 = require("@rnui/headless");
function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true
}) {
  const tokens = (0, import_headless23.useTokens)();
  const shimmer = (0, import_react_native_reanimated15.useSharedValue)(0);
  (0, import_react24.useEffect)(() => {
    if (!animate) return;
    shimmer.value = (0, import_react_native_reanimated15.withRepeat)(
      (0, import_react_native_reanimated15.withTiming)(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);
  const animatedStyle = (0, import_react_native_reanimated15.useAnimatedStyle)(() => ({
    opacity: (0, import_react_native_reanimated15.interpolate)(shimmer.value, [0, 1], [0.6, 1])
    // Increased visibility
  }));
  return /* @__PURE__ */ import_react24.default.createElement(
    import_react_native_reanimated15.default.View,
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
  const tokens = (0, import_headless23.useTokens)();
  return /* @__PURE__ */ import_react24.default.createElement(import_react_native24.View, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ import_react24.default.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14
    }
  )));
}
function SkeletonCard() {
  const tokens = (0, import_headless23.useTokens)();
  return /* @__PURE__ */ import_react24.default.createElement(
    import_react_native24.View,
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
    /* @__PURE__ */ import_react24.default.createElement(import_react_native24.View, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ import_react24.default.createElement(import_react_native24.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ import_react24.default.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: "40%", height: 32, borderRadius: tokens.radius.md })
  );
}
function SkeletonListItem() {
  const tokens = (0, import_headless23.useTokens)();
  return /* @__PURE__ */ import_react24.default.createElement(
    import_react_native24.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ import_react24.default.createElement(import_react_native24.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ import_react24.default.createElement(Skeleton, { width: 24, height: 14 })
  );
}

// src/components/EmptyState/EmptyState.tsx
var import_react26 = __toESM(require("react"));
var import_react_native26 = require("react-native");
var import_headless25 = require("@rnui/headless");

// src/components/Icon/Icon.tsx
var import_react25 = __toESM(require("react"));
var import_react_native25 = require("react-native");
var import_headless24 = require("@rnui/headless");
var import_lucide_react_native2 = require("lucide-react-native");
var ICON_MAP = {
  // Navigation & Actions
  star: import_lucide_react_native2.Star,
  heart: import_lucide_react_native2.Heart,
  check: import_lucide_react_native2.Check,
  checkCircle: import_lucide_react_native2.CheckCircle,
  info: import_lucide_react_native2.Info,
  warning: import_lucide_react_native2.AlertTriangle,
  error: import_lucide_react_native2.AlertCircle,
  helpCircle: import_lucide_react_native2.HelpCircle,
  chevronRight: import_lucide_react_native2.ChevronRight,
  chevronLeft: import_lucide_react_native2.ChevronLeft,
  chevronDown: import_lucide_react_native2.ChevronDown,
  chevronUp: import_lucide_react_native2.ChevronUp,
  plus: import_lucide_react_native2.Plus,
  minus: import_lucide_react_native2.Minus,
  close: import_lucide_react_native2.X,
  xCircle: import_lucide_react_native2.XCircle,
  search: import_lucide_react_native2.Search,
  bell: import_lucide_react_native2.Bell,
  user: import_lucide_react_native2.User,
  settings: import_lucide_react_native2.Settings,
  calendar: import_lucide_react_native2.Calendar,
  clock: import_lucide_react_native2.Clock,
  mapPin: import_lucide_react_native2.MapPin,
  trash: import_lucide_react_native2.Trash2,
  edit: import_lucide_react_native2.Edit,
  share: import_lucide_react_native2.Share,
  download: import_lucide_react_native2.Download,
  upload: import_lucide_react_native2.Upload,
  image: import_lucide_react_native2.Image,
  video: import_lucide_react_native2.Video,
  camera: import_lucide_react_native2.Camera,
  mail: import_lucide_react_native2.Mail,
  phone: import_lucide_react_native2.Phone,
  home: import_lucide_react_native2.Home,
  logOut: import_lucide_react_native2.LogOut,
  logIn: import_lucide_react_native2.LogIn,
  menu: import_lucide_react_native2.Menu,
  moreVertical: import_lucide_react_native2.MoreVertical,
  moreHorizontal: import_lucide_react_native2.MoreHorizontal,
  filter: import_lucide_react_native2.Filter,
  sortAsc: import_lucide_react_native2.SortAsc,
  grid: import_lucide_react_native2.Grid,
  list: import_lucide_react_native2.List,
  layout: import_lucide_react_native2.Layout,
  folder: import_lucide_react_native2.Folder,
  file: import_lucide_react_native2.File,
  fileText: import_lucide_react_native2.FileText,
  copy: import_lucide_react_native2.Copy,
  clipboard: import_lucide_react_native2.Clipboard,
  externalLink: import_lucide_react_native2.ExternalLink,
  link: import_lucide_react_native2.Link,
  unlink: import_lucide_react_native2.Unlink,
  // Feedback & Status
  loader: import_lucide_react_native2.Loader,
  refreshCw: import_lucide_react_native2.RefreshCw,
  rotateCcw: import_lucide_react_native2.RotateCcw,
  play: import_lucide_react_native2.Play,
  pause: import_lucide_react_native2.Pause,
  stopCircle: import_lucide_react_native2.StopCircle,
  skipForward: import_lucide_react_native2.SkipForward,
  skipBack: import_lucide_react_native2.SkipBack,
  fastForward: import_lucide_react_native2.FastForward,
  rewind: import_lucide_react_native2.Rewind,
  // Commerce & Data
  shoppingCart: import_lucide_react_native2.ShoppingCart,
  creditCard: import_lucide_react_native2.CreditCard,
  dollarSign: import_lucide_react_native2.DollarSign,
  trendingUp: import_lucide_react_native2.TrendingUp,
  trendingDown: import_lucide_react_native2.TrendingDown,
  barChart3: import_lucide_react_native2.BarChart3,
  pieChart: import_lucide_react_native2.PieChart,
  activity: import_lucide_react_native2.Activity,
  zap: import_lucide_react_native2.Zap,
  flame: import_lucide_react_native2.Flame,
  award: import_lucide_react_native2.Award,
  target: import_lucide_react_native2.Target,
  bookmark: import_lucide_react_native2.Bookmark,
  tag: import_lucide_react_native2.Tag,
  // Communication
  messageCircle: import_lucide_react_native2.MessageCircle,
  messageSquare: import_lucide_react_native2.MessageSquare,
  send: import_lucide_react_native2.Send,
  inbox: import_lucide_react_native2.Inbox,
  archive: import_lucide_react_native2.Archive,
  hash: import_lucide_react_native2.Hash,
  atSign: import_lucide_react_native2.AtSign,
  // Media Controls
  volume2: import_lucide_react_native2.Volume2,
  volumeX: import_lucide_react_native2.VolumeX,
  mic: import_lucide_react_native2.Mic,
  micOff: import_lucide_react_native2.MicOff,
  headphones: import_lucide_react_native2.Headphones,
  radio: import_lucide_react_native2.Radio,
  tv: import_lucide_react_native2.Tv,
  monitor: import_lucide_react_native2.Monitor,
  smartphone: import_lucide_react_native2.Smartphone,
  tablet: import_lucide_react_native2.Tablet,
  laptop: import_lucide_react_native2.Laptop,
  // Weather & Nature
  sun: import_lucide_react_native2.Sun,
  moon: import_lucide_react_native2.Moon,
  cloud: import_lucide_react_native2.Cloud,
  cloudRain: import_lucide_react_native2.CloudRain,
  cloudSnow: import_lucide_react_native2.CloudSnow,
  wind: import_lucide_react_native2.Wind,
  thermometer: import_lucide_react_native2.Thermometer,
  droplet: import_lucide_react_native2.Droplet,
  // Locks & Security
  lock: import_lucide_react_native2.Lock,
  unlock: import_lucide_react_native2.Unlock,
  key: import_lucide_react_native2.Key,
  shield: import_lucide_react_native2.Shield,
  eye: import_lucide_react_native2.Eye,
  eyeOff: import_lucide_react_native2.EyeOff,
  // Arrows
  arrowUp: import_lucide_react_native2.ArrowUp,
  arrowDown: import_lucide_react_native2.ArrowDown,
  arrowLeft: import_lucide_react_native2.ArrowLeft,
  arrowRight: import_lucide_react_native2.ArrowRight,
  arrowUpRight: import_lucide_react_native2.ArrowUpRight,
  arrowDownLeft: import_lucide_react_native2.ArrowDownLeft,
  move: import_lucide_react_native2.Move,
  maximize2: import_lucide_react_native2.Maximize2,
  minimize2: import_lucide_react_native2.Minimize2,
  // UI Elements
  square: import_lucide_react_native2.Square,
  circle: import_lucide_react_native2.Circle,
  triangle: import_lucide_react_native2.Triangle,
  hexagon: import_lucide_react_native2.Hexagon,
  box: import_lucide_react_native2.Box,
  package: import_lucide_react_native2.Package,
  gift: import_lucide_react_native2.Gift,
  shoppingBag: import_lucide_react_native2.ShoppingBag,
  // Tools
  hammer: import_lucide_react_native2.Hammer,
  wrench: import_lucide_react_native2.Wrench,
  scissors: import_lucide_react_native2.Scissors,
  printer: import_lucide_react_native2.Printer,
  power: import_lucide_react_native2.Power,
  battery: import_lucide_react_native2.Battery,
  wifi: import_lucide_react_native2.Wifi,
  bluetooth: import_lucide_react_native2.Bluetooth,
  // Social
  github: import_lucide_react_native2.Github,
  twitter: import_lucide_react_native2.Twitter,
  facebook: import_lucide_react_native2.Facebook,
  instagram: import_lucide_react_native2.Instagram,
  linkedin: import_lucide_react_native2.Linkedin,
  youtube: import_lucide_react_native2.Youtube
};
var SIZE_MAP = { small: 16, medium: 20, large: 24 };
function Icon({ children, color, size, fontSize = "medium" }) {
  const tokens = (0, import_headless24.useTokens)();
  let resolvedSize;
  if (typeof size === "number") {
    resolvedSize = size;
  } else if (size) {
    resolvedSize = SIZE_MAP[size] || SIZE_MAP[fontSize];
  } else {
    resolvedSize = SIZE_MAP[fontSize] || 20;
  }
  if (import_react25.default.isValidElement(children)) {
    return import_react25.default.cloneElement(children, {
      size: resolvedSize || 20,
      color: color ?? tokens.color.text.primary
    });
  }
  if (typeof children === "string" && ICON_MAP[children]) {
    const IconComponent = ICON_MAP[children];
    return /* @__PURE__ */ import_react25.default.createElement(
      IconComponent,
      {
        size: resolvedSize || 20,
        color: color ?? tokens.color.text.primary
      }
    );
  }
  return /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: { color: color ?? tokens.color.text.primary, fontSize: resolvedSize } }, children));
}
function SvgIcon({ children, color, fontSize = "medium" }) {
  const tokens = (0, import_headless24.useTokens)();
  const size = fontSize === "inherit" ? void 0 : SIZE_MAP[fontSize];
  if (!import_react25.default.isValidElement(children)) return null;
  return import_react25.default.cloneElement(children, {
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
  const tokens = (0, import_headless25.useTokens)();
  const renderIcon = (iconNode) => {
    if (typeof iconNode === "string") {
      return /* @__PURE__ */ import_react26.default.createElement(Icon, { size: compact ? 24 : 36, color: tokens.color.text.tertiary }, iconNode);
    }
    return iconNode;
  };
  return /* @__PURE__ */ import_react26.default.createElement(
    import_react_native26.View,
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
    icon && /* @__PURE__ */ import_react26.default.createElement(
      import_react_native26.View,
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
    !icon && /* @__PURE__ */ import_react26.default.createElement(
      import_react_native26.View,
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
      /* @__PURE__ */ import_react26.default.createElement(import_react_native26.Text, { style: { fontSize: compact ? 20 : 32, color: tokens.color.text.tertiary } }, "\u25CB")
    ),
    /* @__PURE__ */ import_react26.default.createElement(
      import_react_native26.Text,
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
    description && /* @__PURE__ */ import_react26.default.createElement(
      import_react_native26.Text,
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
    (action || secondaryAction) && /* @__PURE__ */ import_react26.default.createElement(
      import_react_native26.View,
      {
        style: {
          marginTop: tokens.spacing[2],
          gap: tokens.spacing[2],
          alignItems: "center",
          width: "100%"
        }
      },
      action && /* @__PURE__ */ import_react26.default.createElement(
        Button,
        {
          label: action.label,
          variant: action.variant ?? "solid",
          onPress: action.onPress,
          size: compact ? "sm" : "md",
          fullWidth: true
        }
      ),
      secondaryAction && /* @__PURE__ */ import_react26.default.createElement(
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
var import_react27 = __toESM(require("react"));
var import_react_native27 = require("react-native");
var import_headless26 = require("@rnui/headless");
function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children
}) {
  const tokens = (0, import_headless26.useTokens)();
  return /* @__PURE__ */ import_react27.default.createElement(import_react_native27.View, { style: { gap: tokens.spacing[1] } }, (label || labelTrailing) && /* @__PURE__ */ import_react27.default.createElement(
    import_react_native27.View,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
    label && /* @__PURE__ */ import_react27.default.createElement(import_react_native27.View, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ import_react27.default.createElement(
      import_react_native27.Text,
      {
        style: {
          fontSize: tokens.fontSize.sm,
          fontWeight: tokens.fontWeight.medium,
          color: tokens.color.text.secondary
        }
      },
      label
    ), required && /* @__PURE__ */ import_react27.default.createElement(
      import_react_native27.Text,
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
  ), children, error ? /* @__PURE__ */ import_react27.default.createElement(
    import_react_native27.Text,
    {
      style: {
        fontSize: tokens.fontSize.xs,
        color: tokens.color.error.text
      },
      accessibilityRole: "alert",
      accessibilityLiveRegion: "polite"
    },
    error
  ) : helperText ? /* @__PURE__ */ import_react27.default.createElement(
    import_react_native27.Text,
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
  const tokens = (0, import_headless26.useTokens)();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return /* @__PURE__ */ import_react27.default.createElement(import_react_native27.View, { style: { gap: gapSize } }, children);
}

// src/components/Pressable/Pressable.tsx
var import_react28 = __toESM(require("react"));
var import_react_native_reanimated16 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler6 = require("react-native-gesture-handler");
var import_headless27 = require("@rnui/headless");
function Pressable11({ children, style, ...hookOptions }) {
  const { gesture, animatedStyle, accessibilityProps, isPressed } = (0, import_headless27.usePressable)(hookOptions);
  return /* @__PURE__ */ import_react28.default.createElement(import_react_native_gesture_handler6.GestureDetector, { gesture }, /* @__PURE__ */ import_react28.default.createElement(import_react_native_reanimated16.default.View, { style: [style, animatedStyle], ...accessibilityProps }, typeof children === "function" ? children({ isPressed }) : children));
}

// src/components/Box/Box.tsx
var import_react29 = __toESM(require("react"));
var import_react_native28 = require("react-native");
function Box2({ children, style, sx, flex }) {
  const merged = [flex !== void 0 ? { flex } : null, sx, style];
  return /* @__PURE__ */ import_react29.default.createElement(import_react_native28.View, { style: merged }, children);
}

// src/components/Stack/Stack.tsx
var import_react30 = __toESM(require("react"));
var import_react_native29 = require("react-native");
var import_headless28 = require("@rnui/headless");
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
  const tokens = (0, import_headless28.useTokens)();
  const gap = tokens.spacing[spacing] ?? spacing;
  const items = import_react30.default.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ import_react30.default.createElement(
    import_react_native29.View,
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
var import_react31 = __toESM(require("react"));
var import_react_native30 = require("react-native");
var import_headless29 = require("@rnui/headless");
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
  const tokens = (0, import_headless29.useTokens)();
  const gap = tokens.spacing[spacing] ?? spacing;
  const rowGap = rowSpacing !== void 0 ? tokens.spacing[rowSpacing] ?? rowSpacing : gap;
  const colGap = columnSpacing !== void 0 ? tokens.spacing[columnSpacing] ?? columnSpacing : gap;
  if (container) {
    return /* @__PURE__ */ import_react31.default.createElement(
      import_react_native30.View,
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
  return /* @__PURE__ */ import_react31.default.createElement(
    import_react_native30.View,
    {
      style: [itemStyle, style]
    },
    children
  );
}

// src/components/Typography/Typography.tsx
var import_react32 = __toESM(require("react"));
var import_react_native31 = require("react-native");
var import_headless30 = require("@rnui/headless");
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
  const tokens = (0, import_headless30.useTokens)();
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
  return /* @__PURE__ */ import_react32.default.createElement(
    import_react_native31.Text,
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
var import_react33 = __toESM(require("react"));
var import_react_native32 = require("react-native");
var import_headless31 = require("@rnui/headless");
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const tokens = (0, import_headless31.useTokens)();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ import_react33.default.createElement(
    import_react_native32.Text,
    {
      onPress: async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await import_react_native32.Linking.openURL(href);
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
var import_react34 = __toESM(require("react"));
var import_react_native33 = require("react-native");
var import_headless32 = require("@rnui/headless");
function Paper({
  children,
  variant = "elevation",
  elevation = 1,
  square = false,
  style
}) {
  const tokens = (0, import_headless32.useTokens)();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  return /* @__PURE__ */ import_react34.default.createElement(
    import_react_native33.View,
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
var import_react35 = __toESM(require("react"));
var import_react_native34 = require("react-native");
var import_headless33 = require("@rnui/headless");
function ButtonGroup({
  children,
  variant = "outlined",
  size = "md",
  orientation = "horizontal",
  disabled = false,
  fullWidth = false
}) {
  const tokens = (0, import_headless33.useTokens)();
  const isRow = orientation === "horizontal";
  const items = import_react35.default.Children.toArray(children);
  return /* @__PURE__ */ import_react35.default.createElement(
    import_react_native34.View,
    {
      style: {
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        borderRadius: tokens.radius.md,
        overflow: "hidden"
      }
    },
    items.map((child, i) => {
      if (!import_react35.default.isValidElement(child)) return child;
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
      return import_react35.default.cloneElement(element, {
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
var import_react36 = __toESM(require("react"));
var import_react_native35 = require("react-native");
var import_react_native_reanimated17 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler7 = require("react-native-gesture-handler");
var import_headless34 = require("@rnui/headless");
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
  const tokens = (0, import_headless34.useTokens)();
  const { size: iconSize } = (0, import_headless34.useIconStyle)("button");
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
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless34.usePressable)({
    onPress,
    disabled,
    feedbackMode: "scale",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityRole: "button"
  });
  const containerStyle = (0, import_react36.useMemo)(() => {
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
    if (import_react36.default.isValidElement(el)) {
      return import_react36.default.cloneElement(el, {
        size: el.props?.size ?? iconSize,
        color: el.props?.color ?? textMap[color]
      });
    }
    return el;
  };
  return /* @__PURE__ */ import_react36.default.createElement(import_react_native_gesture_handler7.GestureDetector, { gesture }, /* @__PURE__ */ import_react36.default.createElement(import_react_native_reanimated17.default.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, renderIcon(icon), variant === "extended" && label && /* @__PURE__ */ import_react36.default.createElement(import_react_native35.Text, { style: { color: textMap[color], fontWeight: tokens.fontWeight.semibold } }, label)));
}

// src/components/TextField/TextField.tsx
var import_react37 = __toESM(require("react"));
var import_react_native36 = require("react-native");
var import_headless35 = require("@rnui/headless");
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
  const tokens = (0, import_headless35.useTokens)();
  const [showPassword, setShowPassword] = (0, import_react37.useState)(false);
  const isPassword = type === "password";
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  const trailingElement = isPassword ? /* @__PURE__ */ import_react37.default.createElement(
    import_react_native36.Pressable,
    {
      onPress: () => setShowPassword(!showPassword),
      style: { padding: 4 }
    },
    /* @__PURE__ */ import_react37.default.createElement(import_react_native36.View, { style: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: tokens.color.bg.muted,
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ import_react37.default.createElement(import_react_native36.View, { style: {
      width: showPassword ? 12 : 8,
      height: 2,
      backgroundColor: tokens.color.text.secondary,
      borderRadius: 1
    } }))
  ) : rest.trailingElement;
  if (select) {
    return /* @__PURE__ */ import_react37.default.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ import_react37.default.createElement(
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
  return /* @__PURE__ */ import_react37.default.createElement(
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
var import_react38 = __toESM(require("react"));
var import_react_native37 = require("react-native");
var import_react_native_reanimated18 = __toESM(require("react-native-reanimated"));
var import_headless36 = require("@rnui/headless");
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
  const tokens = (0, import_headless36.useTokens)();
  const { width: windowWidth, height: windowHeight } = (0, import_react_native37.useWindowDimensions)();
  const inputRef = (0, import_react38.useRef)(null);
  const [inputRect, setInputRect] = (0, import_react38.useState)({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [dropdownMounted, setDropdownMounted] = (0, import_react38.useState)(false);
  const opacity = (0, import_react_native_reanimated18.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated18.useSharedValue)(0.95);
  const {
    inputValue: query,
    setInputValue,
    isOpen,
    open,
    close,
    isSelected,
    selectOption,
    filteredOptions
  } = (0, import_headless36.useAutocomplete)({
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
          opacity.value = (0, import_react_native_reanimated18.withTiming)(1, { duration: 160, easing: import_react_native_reanimated18.Easing.out(import_react_native_reanimated18.Easing.cubic) });
          scale.value = (0, import_react_native_reanimated18.withSpring)(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };
  const handleClose = () => {
    opacity.value = (0, import_react_native_reanimated18.withTiming)(0, { duration: 120 });
    scale.value = (0, import_react_native_reanimated18.withTiming)(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };
  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;
  const dropdownTop = showAbove ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP : inputRect.pageY + inputRect.height + GAP;
  const dropdownAnimStyle = (0, import_react_native_reanimated18.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ import_react38.default.createElement(import_react_native37.View, { ref: inputRef }, /* @__PURE__ */ import_react38.default.createElement(
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
  ), dropdownMounted && filteredOptions.length > 0 && /* @__PURE__ */ import_react38.default.createElement(import_react_native37.Modal, { transparent: true, animationType: "none", visible: dropdownMounted, onRequestClose: handleClose }, /* @__PURE__ */ import_react38.default.createElement(import_react_native37.Pressable, { style: { flex: 1 }, onPress: handleClose }), /* @__PURE__ */ import_react38.default.createElement(
    import_react_native_reanimated18.default.View,
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
      return /* @__PURE__ */ import_react38.default.createElement(
        import_react_native37.Pressable,
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
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ import_react38.default.createElement(import_react_native37.Text, { style: { color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, labelOf(option))
      );
    })
  )));
}

// src/components/Rating/Rating.tsx
var import_react39 = __toESM(require("react"));
var import_react_native38 = require("react-native");
var import_headless37 = require("@rnui/headless");
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
  const tokens = (0, import_headless37.useTokens)();
  const { value: ratingValue, setValue } = (0, import_headless37.useRating)({
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
  return /* @__PURE__ */ import_react39.default.createElement(import_react_native38.View, { style: { flexDirection: "row", alignItems: "center", gap: 2 } }, Array.from({ length: max }).map((_, i) => {
    const starNumber = i + 1;
    const filled = ratingValue >= starNumber;
    const halfFilled = !filled && ratingValue >= starNumber - 0.5 && precision <= 0.5;
    return /* @__PURE__ */ import_react39.default.createElement(
      import_react_native38.Pressable,
      {
        key: i,
        onPress: () => handlePress(i),
        disabled: disabled || readOnly,
        style: { opacity: disabled ? 0.5 : 1 }
      },
      /* @__PURE__ */ import_react39.default.createElement(import_react_native38.Text, { style: { fontSize, color: filled || halfFilled ? activeColor : inactiveColor, lineHeight: fontSize * 1.2 } }, filled ? "\u2605" : halfFilled ? "\u2BE8" : "\u2606")
    );
  }));
}

// src/components/ToggleButton/ToggleButton.tsx
var import_react40 = __toESM(require("react"));
var import_react_native39 = require("react-native");
var import_react_native_reanimated19 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler8 = require("react-native-gesture-handler");
var import_headless38 = require("@rnui/headless");
var ToggleContext = (0, import_react40.createContext)(null);
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
  const { isSelected, toggle } = (0, import_headless38.useToggleGroup)({
    value,
    defaultValue,
    exclusive,
    disabled,
    onChange
  });
  return /* @__PURE__ */ import_react40.default.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ import_react40.default.createElement(import_react_native39.View, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const tokens = (0, import_headless38.useTokens)();
  const ctx = (0, import_react40.useContext)(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless38.usePressable)({
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
  return /* @__PURE__ */ import_react40.default.createElement(import_react_native_gesture_handler8.GestureDetector, { gesture }, /* @__PURE__ */ import_react40.default.createElement(
    import_react_native_reanimated19.default.View,
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
    /* @__PURE__ */ import_react40.default.createElement(import_react_native39.Text, { style: { fontSize: s.fontSize, fontWeight: tokens.fontWeight.medium, color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, children)
  ));
}

// src/components/AppBar/AppBar.tsx
var import_react41 = __toESM(require("react"));
var import_react_native40 = require("react-native");
var import_headless39 = require("@rnui/headless");
function AppBar({
  children,
  color = "primary",
  variant = "elevation",
  position = "relative",
  elevation = 2,
  style
}) {
  const tokens = (0, import_headless39.useTokens)();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  const bgMap = {
    default: tokens.color.surface.default,
    inherit: "transparent",
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    transparent: "transparent"
  };
  return /* @__PURE__ */ import_react41.default.createElement(
    import_react_native40.View,
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
  const tokens = (0, import_headless39.useTokens)();
  return /* @__PURE__ */ import_react41.default.createElement(
    import_react_native40.View,
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
var import_react42 = __toESM(require("react"));
var import_react_native41 = require("react-native");
var import_react_native_reanimated20 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler9 = require("react-native-gesture-handler");
var import_headless40 = require("@rnui/headless");
var TabsContext = (0, import_react42.createContext)(null);
function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children
}) {
  const { getTabProps, isSelected } = (0, import_headless40.useTabs)({ value, defaultValue, onChange });
  return /* @__PURE__ */ import_react42.default.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ import_react42.default.createElement(
    import_react_native41.View,
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
  const tokens = (0, import_headless40.useTokens)();
  const ctx = (0, import_react42.useContext)(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless40.usePressable)({
    onPress: () => ctx.getTabProps(value, disabled).onPress(),
    disabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "tab"
  });
  return /* @__PURE__ */ import_react42.default.createElement(import_react_native_gesture_handler9.GestureDetector, { gesture }, /* @__PURE__ */ import_react42.default.createElement(
    import_react_native_reanimated20.default.View,
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
    label && /* @__PURE__ */ import_react42.default.createElement(import_react_native41.Text, { style: { color: selected ? tokens.color.brand.default : tokens.color.text.secondary, fontWeight: tokens.fontWeight.medium } }, label)
  ));
}

// src/components/Drawer/Drawer.tsx
var import_react43 = __toESM(require("react"));
var import_react_native42 = require("react-native");
var import_react_native_reanimated21 = __toESM(require("react-native-reanimated"));
var import_headless41 = require("@rnui/headless");
var { width: SCREEN_WIDTH2, height: SCREEN_HEIGHT2 } = import_react_native42.Dimensions.get("window");
function Drawer({
  open,
  onClose,
  anchor = "left",
  variant = "temporary",
  width = Math.min(320, SCREEN_WIDTH2 * 0.8),
  children,
  style
}) {
  const tokens = (0, import_headless41.useTokens)();
  const [mounted, setMounted] = import_react43.default.useState(open);
  const translateX = (0, import_react_native_reanimated21.useSharedValue)(anchor === "left" ? -width : anchor === "right" ? width : 0);
  const translateY = (0, import_react_native_reanimated21.useSharedValue)(anchor === "top" ? -SCREEN_HEIGHT2 : anchor === "bottom" ? SCREEN_HEIGHT2 : 0);
  const backdropOpacity = (0, import_react_native_reanimated21.useSharedValue)(0);
  (0, import_react43.useEffect)(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        translateX.value = (0, import_react_native_reanimated21.withTiming)(0, { duration: 280 });
        translateY.value = (0, import_react_native_reanimated21.withTiming)(0, { duration: 280 });
        backdropOpacity.value = (0, import_react_native_reanimated21.withTiming)(0.4, { duration: 280 });
      });
    } else {
      const offX = anchor === "left" ? -width : anchor === "right" ? width : 0;
      const offY = anchor === "top" ? -SCREEN_HEIGHT2 : anchor === "bottom" ? SCREEN_HEIGHT2 : 0;
      translateX.value = (0, import_react_native_reanimated21.withTiming)(offX, { duration: 220 });
      translateY.value = (0, import_react_native_reanimated21.withTiming)(offY, { duration: 220 });
      backdropOpacity.value = (0, import_react_native_reanimated21.withTiming)(0, { duration: 220 });
      setTimeout(() => setMounted(false), 230);
    }
  }, [open]);
  const drawerStyle = (0, import_react_native_reanimated21.useAnimatedStyle)(() => {
    if (anchor === "left" || anchor === "right") {
      return { transform: [{ translateX: translateX.value }] };
    }
    return { transform: [{ translateY: translateY.value }] };
  });
  const backdropStyle = (0, import_react_native_reanimated21.useAnimatedStyle)(() => ({
    opacity: backdropOpacity.value
  }));
  if (variant === "permanent") {
    return /* @__PURE__ */ import_react43.default.createElement(
      import_react_native42.View,
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
  return /* @__PURE__ */ import_react43.default.createElement(import_react_native42.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react43.default.createElement(import_react_native42.View, { style: { flex: 1 }, pointerEvents: "box-none" }, /* @__PURE__ */ import_react43.default.createElement(
    import_react_native_reanimated21.default.View,
    {
      style: [
        { ...positionStyle, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000" },
        backdropStyle
      ]
    },
    /* @__PURE__ */ import_react43.default.createElement(import_react_native42.Pressable, { style: { flex: 1 }, onPress: onClose })
  ), /* @__PURE__ */ import_react43.default.createElement(
    import_react_native_reanimated21.default.View,
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
var import_react44 = __toESM(require("react"));
var import_react_native43 = require("react-native");
var import_react_native_reanimated22 = __toESM(require("react-native-reanimated"));
var import_headless42 = require("@rnui/headless");
function Menu2({ open, onClose, anchorEl, children }) {
  const tokens = (0, import_headless42.useTokens)();
  const { width: windowWidth, height: windowHeight } = (0, import_react_native43.useWindowDimensions)();
  const [menuSize, setMenuSize] = import_react44.default.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = import_react44.default.useState(false);
  const opacity = (0, import_react_native_reanimated22.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated22.useSharedValue)(0.9);
  import_react44.default.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = (0, import_react_native_reanimated22.withTiming)(1, { duration: 180, easing: import_react_native_reanimated22.Easing.out(import_react_native_reanimated22.Easing.cubic) });
        scale.value = (0, import_react_native_reanimated22.withSpring)(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = (0, import_react_native_reanimated22.withTiming)(0, { duration: 130 });
      scale.value = (0, import_react_native_reanimated22.withTiming)(0.92, { duration: 130 }, (done) => {
        if (done) (0, import_react_native_reanimated22.runOnJS)(setMounted)(false);
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
  const animStyle = (0, import_react_native_reanimated22.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ import_react44.default.createElement(import_react_native43.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react44.default.createElement(import_react_native43.Pressable, { style: { flex: 1 }, onPress: onClose }), /* @__PURE__ */ import_react44.default.createElement(
    import_react_native_reanimated22.default.View,
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
  const tokens = (0, import_headless42.useTokens)();
  return /* @__PURE__ */ import_react44.default.createElement(
    import_react_native43.Pressable,
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
    /* @__PURE__ */ import_react44.default.createElement(import_react_native43.Text, { style: {
      color: selected ? tokens.color.brand.text : tokens.color.text.primary,
      fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
    } }, children)
  );
}

// src/components/Stepper/Stepper.tsx
var import_react45 = __toESM(require("react"));
var import_react_native44 = require("react-native");
var import_headless43 = require("@rnui/headless");
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const tokens = (0, import_headless43.useTokens)();
  const items = import_react45.default.Children.toArray(children);
  return /* @__PURE__ */ import_react45.default.createElement(import_react_native44.View, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: tokens.spacing[4] } }, items.map((child) => {
    if (!import_react45.default.isValidElement(child)) return child;
    const element = child;
    return import_react45.default.cloneElement(element, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }) {
  const tokens = (0, import_headless43.useTokens)();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  return /* @__PURE__ */ import_react45.default.createElement(import_react_native44.View, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: tokens.spacing[2], alignItems: "center" } }, /* @__PURE__ */ import_react45.default.createElement(
    import_react_native44.View,
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
    /* @__PURE__ */ import_react45.default.createElement(import_react_native44.Text, { style: { fontSize: 12, fontWeight: tokens.fontWeight.semibold, color: isCompleted ? "#fff" : tokens.color.text.primary } }, isCompleted ? "v" : index + 1)
  ), label && /* @__PURE__ */ import_react45.default.createElement(import_react_native44.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, label), children);
}
function StepLabel({ children, style }) {
  const tokens = (0, import_headless43.useTokens)();
  return /* @__PURE__ */ import_react45.default.createElement(import_react_native44.Text, { style: [{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }, style] }, children);
}

// src/components/Pagination/Pagination.tsx
var import_react46 = __toESM(require("react"));
var import_react_native45 = require("react-native");
var import_headless44 = require("@rnui/headless");
function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md"
}) {
  const tokens = (0, import_headless44.useTokens)();
  const { page: current, setPage, items } = (0, import_headless44.usePagination)({ count, page, defaultPage, onChange });
  const sizeMap2 = {
    sm: { height: 28, minWidth: 28, fontSize: tokens.fontSize.sm },
    md: { height: 34, minWidth: 34, fontSize: tokens.fontSize.md },
    lg: { height: 40, minWidth: 40, fontSize: tokens.fontSize.lg }
  };
  const s = sizeMap2[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ import_react46.default.createElement(import_react_native45.Text, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    return /* @__PURE__ */ import_react46.default.createElement(
      import_react_native45.Pressable,
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
      /* @__PURE__ */ import_react46.default.createElement(import_react_native45.Text, { style: { fontSize: s.fontSize, color: selected ? tokens.color.brand.default : tokens.color.text.primary } }, item)
    );
  };
  return /* @__PURE__ */ import_react46.default.createElement(import_react_native45.View, { style: { flexDirection: "row", alignItems: "center", gap: 6 } }, items.map(renderItem));
}

// src/components/BottomNavigation/BottomNavigation.tsx
var import_react47 = __toESM(require("react"));
var import_react_native46 = require("react-native");
var import_headless45 = require("@rnui/headless");
var BottomNavContext = (0, import_react47.createContext)(null);
function BottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  children
}) {
  const [internalValue, setInternalValue] = import_react47.default.useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (next) => {
    if (controlledValue === void 0) setInternalValue(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ import_react47.default.createElement(BottomNavContext.Provider, { value: { value, setValue, showLabels } }, /* @__PURE__ */ import_react47.default.createElement(import_react_native46.View, { style: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 } }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const tokens = (0, import_headless45.useTokens)();
  const ctx = (0, import_react47.useContext)(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.value === value;
  return /* @__PURE__ */ import_react47.default.createElement(import_react_native46.Pressable, { onPress: () => ctx.setValue(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ import_react47.default.createElement(import_react_native46.Text, { style: { fontSize: tokens.fontSize.xs, color: selected ? tokens.color.brand.default : tokens.color.text.secondary } }, label));
}

// src/components/Breadcrumbs/Breadcrumbs.tsx
var import_react48 = __toESM(require("react"));
var import_react_native47 = require("react-native");
var import_headless46 = require("@rnui/headless");
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const tokens = (0, import_headless46.useTokens)();
  const items = import_react48.default.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ import_react48.default.createElement(import_react_native47.Text, { key: "ellipsis", style: { color: tokens.color.text.tertiary } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ import_react48.default.createElement(import_react_native47.View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } }, displayItems.map((child, idx) => /* @__PURE__ */ import_react48.default.createElement(import_react48.default.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ import_react48.default.createElement(import_react_native47.Text, { style: { marginHorizontal: 6, color: tokens.color.text.tertiary } }, separator))));
}

// src/components/SpeedDial/SpeedDial.tsx
var import_react49 = __toESM(require("react"));
var import_react_native48 = require("react-native");
var import_headless47 = require("@rnui/headless");
var SpeedDialContext = (0, import_react49.createContext)(null);
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
  const disclosure = (0, import_headless47.useDisclosure)({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = (0, import_headless47.useTokens)();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  return /* @__PURE__ */ import_react49.default.createElement(SpeedDialContext.Provider, { value: { isOpen: disclosure.isOpen, close: disclosure.close } }, /* @__PURE__ */ import_react49.default.createElement(import_react_native48.View, { style: stackStyle }, disclosure.isOpen && children, /* @__PURE__ */ import_react49.default.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const tokens = (0, import_headless47.useTokens)();
  const ctx = (0, import_react49.useContext)(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ import_react49.default.createElement(
    import_react_native48.Pressable,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: { alignItems: "center", gap: 4 }
    },
    /* @__PURE__ */ import_react49.default.createElement(
      import_react_native48.View,
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
    tooltipTitle && /* @__PURE__ */ import_react49.default.createElement(import_react_native48.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, tooltipTitle)
  );
}

// src/components/Chip/Chip.tsx
var import_react50 = __toESM(require("react"));
var import_react_native49 = require("react-native");
var import_headless48 = require("@rnui/headless");
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
  const tokens = (0, import_headless48.useTokens)();
  const { chip } = (0, import_headless48.useComponentTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless48.useIconStyle)("list");
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
    if (import_react50.default.isValidElement(node)) {
      return import_react50.default.cloneElement(node, {
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
  const content = /* @__PURE__ */ import_react50.default.createElement(import_react_native49.View, { style: container }, avatar && /* @__PURE__ */ import_react50.default.createElement(import_react_native49.View, { style: avatarStyle }, avatar), renderIcon(icon), /* @__PURE__ */ import_react50.default.createElement(import_react_native49.Text, { style: {
    color: customText,
    fontSize: sizeStyle.fontSize,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: sizeStyle.fontSize * 1.4
  } }, label), onDelete && /* @__PURE__ */ import_react50.default.createElement(
    import_react_native49.Pressable,
    {
      onPress: onDelete,
      hitSlop: 8,
      style: deleteButtonStyle
    },
    deleteIcon ?? /* @__PURE__ */ import_react50.default.createElement(import_react_native49.Text, { style: {
      color: customText,
      fontSize: 14,
      fontWeight: tokens.fontWeight.bold,
      opacity: 0.7
    } }, "\xD7")
  ));
  if (onClick || clickable) {
    return /* @__PURE__ */ import_react50.default.createElement(
      import_react_native49.Pressable,
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
var import_react51 = __toESM(require("react"));
var import_react_native50 = require("react-native");
var import_react_native_reanimated23 = __toESM(require("react-native-reanimated"));
var import_headless49 = require("@rnui/headless");
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const tokens = (0, import_headless49.useTokens)();
  const [internalOpen, setInternalOpen] = (0, import_react51.useState)(false);
  const { width: windowWidth, height: windowHeight } = (0, import_react_native50.useWindowDimensions)();
  const [triggerRect, setTriggerRect] = (0, import_react51.useState)(null);
  const [tooltipSize, setTooltipSize] = (0, import_react51.useState)({ width: 0, height: 0 });
  const triggerRef = import_react51.default.useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const opacity = (0, import_react_native_reanimated23.useSharedValue)(0);
  const animateIn = (0, import_react51.useCallback)(() => {
    opacity.value = (0, import_react_native_reanimated23.withTiming)(1, { duration: 150 });
  }, []);
  const animateOut = (0, import_react51.useCallback)((onDone) => {
    opacity.value = (0, import_react_native_reanimated23.withTiming)(0, { duration: 100 }, () => {
      (0, import_react_native_reanimated23.runOnJS)(onDone)();
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
  const animStyle = (0, import_react_native_reanimated23.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ import_react51.default.createElement(import_react51.default.Fragment, null, /* @__PURE__ */ import_react51.default.createElement(
    import_react_native50.Pressable,
    {
      ref: triggerRef,
      onPress: handleOpen,
      onLongPress: handleOpen,
      delayLongPress: 400
    },
    children
  ), /* @__PURE__ */ import_react51.default.createElement(
    import_react_native50.Modal,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ import_react51.default.createElement(
      import_react_native50.Pressable,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ import_react51.default.createElement(
        import_react_native_reanimated23.default.View,
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
        typeof title === "string" ? /* @__PURE__ */ import_react51.default.createElement(import_react_native50.Text, { style: { color: tokens.color.text.inverse, fontSize: tokens.fontSize.sm, lineHeight: tokens.fontSize.sm * 1.4 } }, title) : title
      )
    )
  ));
}

// src/components/Alert/Alert.tsx
var import_react52 = __toESM(require("react"));
var import_react_native51 = require("react-native");
var import_headless50 = require("@rnui/headless");
function Alert({
  severity = "info",
  variant = "standard",
  icon,
  action,
  onClose,
  children
}) {
  const tokens = (0, import_headless50.useTokens)();
  const colors = tokens.color[severity];
  const bg = variant === "filled" ? colors.icon : colors.bg;
  const border = variant === "outlined" ? colors.border : "transparent";
  const textColor = variant === "filled" ? "#fff" : colors.text;
  return /* @__PURE__ */ import_react52.default.createElement(
    import_react_native51.View,
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
    icon !== false && /* @__PURE__ */ import_react52.default.createElement(import_react_native51.Text, { style: { color: textColor, fontWeight: tokens.fontWeight.semibold } }, "i"),
    /* @__PURE__ */ import_react52.default.createElement(import_react_native51.View, { style: { flex: 1 } }, /* @__PURE__ */ import_react52.default.createElement(import_react_native51.Text, { style: { color: textColor } }, children)),
    action,
    onClose && /* @__PURE__ */ import_react52.default.createElement(import_react_native51.Pressable, { onPress: onClose, hitSlop: 8 }, /* @__PURE__ */ import_react52.default.createElement(import_react_native51.Text, { style: { color: textColor } }, "x"))
  );
}
function AlertTitle({ children }) {
  const tokens = (0, import_headless50.useTokens)();
  return /* @__PURE__ */ import_react52.default.createElement(import_react_native51.Text, { style: { fontWeight: tokens.fontWeight.semibold, marginBottom: tokens.spacing[1] } }, children);
}

// src/components/Dialog/Dialog.tsx
var import_react53 = __toESM(require("react"));
var import_react_native52 = require("react-native");
var import_headless51 = require("@rnui/headless");
function Dialog({ open, onClose, fullWidth = false, fullScreen = false, maxWidth = 400, children }) {
  const tokens = (0, import_headless51.useTokens)();
  return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react53.default.createElement(import_react_native52.View, { style: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 } }, /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.Pressable,
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
  ), /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.View,
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
  const tokens = (0, import_headless51.useTokens)();
  return /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.Text,
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
  const tokens = (0, import_headless51.useTokens)();
  return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.View, { style: { marginBottom: tokens.spacing[4] } }, import_react53.default.Children.map(
    children,
    (child) => typeof child === "string" ? /* @__PURE__ */ import_react53.default.createElement(import_react_native52.Text, { style: { color: tokens.color.text.primary, lineHeight: tokens.fontSize.md * 1.5 } }, child) : child
  ));
}
function DialogActions({ children }) {
  const tokens = (0, import_headless51.useTokens)();
  return /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.View,
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
var import_react54 = __toESM(require("react"));
var import_react_native53 = require("react-native");
var import_react_native_reanimated24 = __toESM(require("react-native-reanimated"));
var import_headless52 = require("@rnui/headless");
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const tokens = (0, import_headless52.useTokens)();
  const [mounted, setMounted] = import_react54.default.useState(false);
  const isBottom = anchorOrigin.vertical === "bottom";
  const translateY = (0, import_react_native_reanimated24.useSharedValue)(isBottom ? 100 : -100);
  const opacity = (0, import_react_native_reanimated24.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated24.useSharedValue)(0.95);
  const animateIn = () => {
    translateY.value = (0, import_react_native_reanimated24.withSpring)(0, { damping: 25, stiffness: 300, mass: 1 });
    opacity.value = (0, import_react_native_reanimated24.withTiming)(1, { duration: 200 });
    scale.value = (0, import_react_native_reanimated24.withSpring)(1, { damping: 25, stiffness: 300 });
  };
  const animateOut = (onDone) => {
    translateY.value = (0, import_react_native_reanimated24.withTiming)(isBottom ? 100 : -100, { duration: 200 });
    opacity.value = (0, import_react_native_reanimated24.withTiming)(0, { duration: 150 }, (done) => {
      if (done) (0, import_react_native_reanimated24.runOnJS)(onDone)();
    });
  };
  (0, import_react54.useEffect)(() => {
    if (open) {
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      setMounted(true);
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  (0, import_react54.useEffect)(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = anchorOrigin.horizontal === "center" ? { alignSelf: "center" } : anchorOrigin.horizontal === "left" ? { left: 16 } : { right: 16 };
  const animStyle = (0, import_react_native_reanimated24.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ import_react54.default.createElement(import_react_native53.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react54.default.createElement(import_react_native53.View, { pointerEvents: "box-none", style: { flex: 1 } }, /* @__PURE__ */ import_react54.default.createElement(
    import_react_native_reanimated24.default.View,
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
    /* @__PURE__ */ import_react54.default.createElement(import_react_native53.Text, { style: { color: tokens.color.text.inverse, flex: 1 } }, message),
    action,
    onClose && /* @__PURE__ */ import_react54.default.createElement(import_react_native53.Pressable, { onPress: onClose, hitSlop: 8 }, /* @__PURE__ */ import_react54.default.createElement(import_react_native53.Text, { style: { color: tokens.color.text.inverse, fontSize: 16 } }, "\u2715"))
  )));
}

// src/components/CircularProgress/CircularProgress.tsx
var import_react55 = __toESM(require("react"));
var import_react_native54 = require("react-native");
var import_headless53 = require("@rnui/headless");
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
  const tokens = (0, import_headless53.useTokens)();
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
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: [styles6.container, style] }, /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.ActivityIndicator,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: import_react_native54.StyleSheet.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: styles6.labelContainer }, /* @__PURE__ */ import_react55.default.createElement(import_react_native54.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
}
var styles6 = import_react_native54.StyleSheet.create({
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
var import_react56 = __toESM(require("react"));
var import_react_native55 = require("react-native");
var import_react_native_reanimated25 = __toESM(require("react-native-reanimated"));
var import_headless54 = require("@rnui/headless");
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
  const tokens = (0, import_headless54.useTokens)();
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
  const determinateStyle = (0, import_react_native_reanimated25.useAnimatedStyle)(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ import_react56.default.createElement(
    import_react_native_reanimated25.default.View,
    {
      style: [
        styles7.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ import_react56.default.createElement(import_react56.default.Fragment, null, variant === "buffer" && /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: [styles7.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? "rgba(0,0,0,0.1)" }] }), /* @__PURE__ */ import_react56.default.createElement(
    import_react_native_reanimated25.default.View,
    {
      style: [
        styles7.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles7 = import_react_native55.StyleSheet.create({
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
var import_react57 = __toESM(require("react"));
var import_react_native56 = require("react-native");
var import_headless55 = require("@rnui/headless");
var TableContext = (0, import_react57.createContext)(null);
function useTableContext() {
  return (0, import_react57.useContext)(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = { size, padding, stickyHeader };
  return /* @__PURE__ */ import_react57.default.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style }, children));
}
function TableContainer({ children, style }) {
  const tokens = (0, import_headless55.useTokens)();
  return /* @__PURE__ */ import_react57.default.createElement(
    import_react_native56.ScrollView,
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
    /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const tokens = (0, import_headless55.useTokens)();
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { backgroundColor: tokens.color.bg.muted } }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, null, children);
}
function TableFooter({ children }) {
  const tokens = (0, import_headless55.useTokens)();
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { borderTopWidth: 1, borderTopColor: tokens.color.border.default } }, children);
}
function TableRow({ children, selected = false, style }) {
  const tokens = (0, import_headless55.useTokens)();
  return /* @__PURE__ */ import_react57.default.createElement(
    import_react_native56.View,
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
  const tokens = (0, import_headless55.useTokens)();
  const ctx = useTableContext();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const basePadding = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const verticalPadding = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: [{ paddingHorizontal: basePadding, paddingVertical: verticalPadding, flexShrink: 0 }, style] }, /* @__PURE__ */ import_react57.default.createElement(
    import_react_native56.Text,
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
  const tokens = (0, import_headless55.useTokens)();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ import_react57.default.createElement(
    import_react_native56.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ import_react57.default.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1))
      },
      "Prev"
    ), /* @__PURE__ */ import_react57.default.createElement(
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
  const tokens = (0, import_headless55.useTokens)();
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Pressable, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.xs } }, active ? direction === "asc" ? "^" : "v" : "-"));
}

// src/components/ImageList/ImageList.tsx
var import_react58 = __toESM(require("react"));
var import_react_native57 = require("react-native");
var import_headless56 = require("@rnui/headless");
var { width: SCREEN_WIDTH3 } = import_react_native57.Dimensions.get("window");
var ImageListContext = (0, import_react58.createContext)(null);
function useImageListContext() {
  return (0, import_react58.useContext)(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = (0, import_react58.useState)(SCREEN_WIDTH3);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = (0, import_react58.useMemo)(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ import_react58.default.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ import_react58.default.createElement(import_react_native57.View, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
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
  return /* @__PURE__ */ import_react58.default.createElement(import_react_native57.View, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const tokens = (0, import_headless56.useTokens)();
  return /* @__PURE__ */ import_react58.default.createElement(
    import_react_native57.View,
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
    /* @__PURE__ */ import_react58.default.createElement(import_react_native57.View, { style: { flex: 1 } }, title ? /* @__PURE__ */ import_react58.default.createElement(import_react_native57.Text, { style: { color: "#FFFFFF", fontWeight: tokens.fontWeight.semibold } }, title) : null, subtitle ? /* @__PURE__ */ import_react58.default.createElement(import_react_native57.Text, { style: { color: "#FFFFFF", fontSize: tokens.fontSize.xs } }, subtitle) : null),
    actionIcon
  );
}

// src/components/Timeline/Timeline.tsx
var import_react59 = __toESM(require("react"));
var import_react_native58 = require("react-native");
var import_headless57 = require("@rnui/headless");
var TimelineContext = (0, import_react59.createContext)(null);
function useTimelineContext() {
  return (0, import_react59.useContext)(TimelineContext);
}
function Timeline({ position = "right", itemVariant = "filled", children }) {
  return /* @__PURE__ */ import_react59.default.createElement(TimelineContext.Provider, { value: { position, itemVariant } }, /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { gap: 24 } }, import_react59.default.Children.map(children, (child, index) => {
    if (!import_react59.default.isValidElement(child)) return child;
    const element = child;
    if (position === "alternate" || position === "alternate-reverse") {
      const isEven = index % 2 === 0;
      const derived = position === "alternate" ? isEven ? "right" : "left" : isEven ? "left" : "right";
      return import_react59.default.cloneElement(element, { position: element.props?.position ?? derived, variant: itemVariant });
    }
    return import_react59.default.cloneElement(element, { variant: itemVariant });
  })));
}
function TimelineItem({ position, variant = "filled", status = "pending", children }) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flexDirection: "row", alignItems: "stretch", minHeight: 80 } }, /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractOpposite(children) : extractContent(children)), /* @__PURE__ */ import_react59.default.createElement(TimelineSeparator, { status, variant }), /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractContent(children) : extractOpposite(children)));
}
function extractChildrenByType(children, type) {
  const items = [];
  import_react59.default.Children.forEach(children, (child) => {
    if (import_react59.default.isValidElement(child) && child.type === type) {
      const element = child;
      items.push(element.props.children);
    }
  });
  return items.length > 0 ? items : null;
}
function extractContent(children) {
  const result = extractChildrenByType(children, TimelineContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.Text, null, result[0]);
  }
  return result;
}
function extractOpposite(children) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.Text, null, result[0]);
  }
  return result;
}
function TimelineSeparator({ status = "pending", variant = "filled", children }) {
  const tokens = (0, import_headless57.useTokens)();
  const dotColors = {
    pending: tokens.color.border.default,
    active: tokens.color.brand.default,
    completed: tokens.color.success.icon,
    error: tokens.color.error.icon
  };
  const connectorColor = status === "completed" ? tokens.color.success.border : tokens.color.border.default;
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { alignItems: "center", width: 48, paddingHorizontal: 8 } }, children || /* @__PURE__ */ import_react59.default.createElement(import_react59.default.Fragment, null, /* @__PURE__ */ import_react59.default.createElement(
    TimelineDot,
    {
      variant,
      color: status === "completed" ? "success" : status === "error" ? "error" : status === "active" ? "primary" : "secondary"
    }
  ), /* @__PURE__ */ import_react59.default.createElement(TimelineConnector, { color: connectorColor })));
}
function TimelineDot({ variant = "filled", color = "primary", size = 16 }) {
  const tokens = (0, import_headless57.useTokens)();
  const fill = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary
  }[color];
  return /* @__PURE__ */ import_react59.default.createElement(
    import_react_native58.View,
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
  const tokens = (0, import_headless57.useTokens)();
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { width, flex: 1, backgroundColor: color ?? tokens.color.border.default, marginVertical: 4, borderRadius: width } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ import_react59.default.createElement(import_react_native58.Text, null, children) : children);
}

// src/components/Modal/Modal.tsx
var import_react60 = __toESM(require("react"));
var import_react_native59 = require("react-native");
var import_headless58 = require("@rnui/headless");
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
  const tokens = (0, import_headless58.useTokens)();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ import_react60.default.createElement(
    import_react_native59.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ import_react60.default.createElement(import_react_native59.View, { style: styles8.container }, !hideBackdrop && (BackdropComponent ? /* @__PURE__ */ import_react60.default.createElement(BackdropComponent, { ...BackdropProps }) : /* @__PURE__ */ import_react60.default.createElement(
      import_react_native59.Pressable,
      {
        style: [import_react_native59.StyleSheet.absoluteFill, { backgroundColor: tokens.color.bg.overlay }],
        onPress: onClose
      }
    )), /* @__PURE__ */ import_react60.default.createElement(import_react_native59.View, { style: [styles8.content, { backgroundColor: tokens.color.surface.overlay }, contentStyle] }, children))
  );
}
var styles8 = import_react_native59.StyleSheet.create({
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
var import_react61 = __toESM(require("react"));
var import_react_native60 = require("react-native");
var import_headless59 = require("@rnui/headless");
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
  const tokens = (0, import_headless59.useTokens)();
  const [contentSize, setContentSize] = (0, import_react61.useState)({ width: 0, height: 0 });
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
  const { width: screenWidth, height: screenHeight } = import_react_native60.Dimensions.get("window");
  const position = (0, import_react61.useMemo)(() => {
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
  return /* @__PURE__ */ import_react61.default.createElement(import_react_native60.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react61.default.createElement(import_react_native60.Pressable, { style: styles9.backdrop, onPress: onClose }), /* @__PURE__ */ import_react61.default.createElement(
    import_react_native60.View,
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
var styles9 = import_react_native60.StyleSheet.create({
  backdrop: {
    ...import_react_native60.StyleSheet.absoluteFillObject
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
var import_react62 = __toESM(require("react"));
var import_react_native61 = require("react-native");
var import_headless60 = require("@rnui/headless");
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
  const tokens = (0, import_headless60.useTokens)();
  const [contentSize, setContentSize] = (0, import_react62.useState)({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = import_react_native61.Dimensions.get("window");
  const position = (0, import_react62.useMemo)(() => {
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
  return /* @__PURE__ */ import_react62.default.createElement(import_react_native61.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react62.default.createElement(import_react_native61.Pressable, { style: styles10.backdrop, onPress: onClose }), /* @__PURE__ */ import_react62.default.createElement(
    import_react_native61.View,
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
var styles10 = import_react_native61.StyleSheet.create({
  backdrop: {
    ...import_react_native61.StyleSheet.absoluteFillObject
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
var import_react63 = __toESM(require("react"));
var import_react_native62 = require("react-native");
var import_headless61 = require("@rnui/headless");
var FormControlContext = (0, import_react63.createContext)(null);
function useFormControl() {
  return (0, import_react63.useContext)(FormControlContext);
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
  const tokens = (0, import_headless61.useTokens)();
  const marginSize = margin === "dense" ? tokens.spacing[2] : margin === "normal" ? tokens.spacing[4] : 0;
  return /* @__PURE__ */ import_react63.default.createElement(FormControlContext.Provider, { value: { error, required, disabled, focused, fullWidth, variant } }, /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: [{ alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const tokens = (0, import_headless61.useTokens)();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.secondary;
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: [{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const tokens = (0, import_headless61.useTokens)();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.tertiary;
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: [{ fontSize: tokens.fontSize.xs, color, marginTop: tokens.spacing[1] }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const tokens = (0, import_headless61.useTokens)();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = import_react63.default.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.Pressable,
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
    label ? /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, label) : null
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  Box,
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
  Grid,
  Icon,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  LinearProgress,
  Link,
  List,
  ListItem,
  Menu,
  MenuItem,
  Modal,
  OTPInput,
  Pagination,
  Paper,
  PasswordInput,
  Popover,
  Popper,
  Pressable,
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
  useComponentTokens,
  useFormControl,
  useIconStyle,
  useIsDark,
  useTheme,
  useTokens,
  ...require("@rnui/headless")
});
//# sourceMappingURL=index.js.map