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
  Accordion: () => Accordion,
  AccordionActions: () => AccordionActions,
  AccordionDetails: () => AccordionDetails,
  AccordionSummary: () => AccordionSummary,
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
  ICON_MAP: () => ICON_MAP,
  Icon: () => Icon,
  IconWrapper: () => IconWrapper,
  ImageList: () => ImageList,
  ImageListItem: () => ImageListItem,
  ImageListItemBar: () => ImageListItemBar,
  Input: () => Input,
  LinearProgress: () => LinearProgress,
  Link: () => Link,
  List: () => List2,
  ListData: () => ListData,
  ListItem: () => ListItem,
  ListItemIcon: () => ListItemIcon,
  ListItemText: () => ListItemText,
  Menu: () => Menu2,
  MenuItem: () => MenuItem,
  Modal: () => Modal7,
  OTPInput: () => OTPInput,
  Pagination: () => Pagination,
  Paper: () => Paper,
  PasswordInput: () => PasswordInput,
  Popover: () => Popover,
  Popper: () => Popper,
  Pressable: () => Pressable18,
  RadioGroup: () => RadioGroup,
  RadioItem: () => RadioItem,
  Rating: () => Rating,
  RnImage: () => RnImage,
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
  StyleSheet: () => import_react_native64.StyleSheet,
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
  ThemeProvider: () => import_headless65.ThemeProvider,
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
  createTheme: () => import_headless65.createTheme,
  useActiveBrand: () => import_headless65.useActiveBrand,
  useBrandSwitch: () => import_headless65.useBrandSwitch,
  useComponentTokens: () => import_headless65.useComponentTokens,
  useFormControl: () => useFormControl,
  useIsDark: () => import_headless65.useIsDark,
  useTheme: () => import_headless65.useTheme,
  useTokens: () => import_headless65.useTokens
});
module.exports = __toCommonJS(index_exports);
var import_headless65 = require("@truongdq01/headless");

// src/components/Accordion/Accordion.tsx
var import_react2 = __toESM(require("react"));
var import_react_native2 = require("react-native");
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_headless2 = require("@truongdq01/headless");

// src/components/Icon/Icon.tsx
var import_react = __toESM(require("react"));
var import_react_native = require("react-native");
var import_headless = require("@truongdq01/headless");
var import_lucide_react_native = require("lucide-react-native");
var ICON_MAP = {
  star: import_lucide_react_native.Star,
  heart: import_lucide_react_native.Heart,
  check: import_lucide_react_native.Check,
  info: import_lucide_react_native.Info,
  warning: import_lucide_react_native.AlertTriangle,
  error: import_lucide_react_native.AlertCircle,
  checkCircle: import_lucide_react_native.CheckCircle,
  close: import_lucide_react_native.X,
  closeCircle: import_lucide_react_native.XCircle,
  menu: import_lucide_react_native.Menu,
  moreVertical: import_lucide_react_native.MoreVertical,
  moreHorizontal: import_lucide_react_native.MoreHorizontal,
  search: import_lucide_react_native.Search,
  settings: import_lucide_react_native.Settings,
  bell: import_lucide_react_native.Bell,
  home: import_lucide_react_native.Home,
  user: import_lucide_react_native.User,
  plus: import_lucide_react_native.Plus,
  minus: import_lucide_react_native.Minus,
  edit: import_lucide_react_native.Edit,
  trash: import_lucide_react_native.Trash,
  share: import_lucide_react_native.Share,
  download: import_lucide_react_native.Download,
  upload: import_lucide_react_native.Upload,
  refresh: import_lucide_react_native.RefreshCw,
  externalLink: import_lucide_react_native.ExternalLink,
  chevronUp: import_lucide_react_native.ChevronUp,
  chevronDown: import_lucide_react_native.ChevronDown,
  chevronLeft: import_lucide_react_native.ChevronLeft,
  chevronRight: import_lucide_react_native.ChevronRight,
  arrowUp: import_lucide_react_native.ArrowUp,
  arrowDown: import_lucide_react_native.ArrowDown,
  arrowLeft: import_lucide_react_native.ArrowLeft,
  arrowRight: import_lucide_react_native.ArrowRight,
  eye: import_lucide_react_native.Eye,
  eyeOff: import_lucide_react_native.EyeOff,
  lock: import_lucide_react_native.Lock,
  unlock: import_lucide_react_native.Unlock,
  calendar: import_lucide_react_native.Calendar,
  clock: import_lucide_react_native.Clock,
  mapPin: import_lucide_react_native.MapPin,
  camera: import_lucide_react_native.Camera,
  image: import_lucide_react_native.Image,
  video: import_lucide_react_native.Video,
  file: import_lucide_react_native.FileText,
  copy: import_lucide_react_native.Copy,
  layout: import_lucide_react_native.Layout,
  grid: import_lucide_react_native.Grid,
  list: import_lucide_react_native.List,
  layers: import_lucide_react_native.Layers,
  box: import_lucide_react_native.Box,
  package: import_lucide_react_native.Package,
  cart: import_lucide_react_native.ShoppingCart,
  card: import_lucide_react_native.CreditCard,
  mail: import_lucide_react_native.Mail,
  phone: import_lucide_react_native.Phone,
  message: import_lucide_react_native.MessageSquare,
  send: import_lucide_react_native.Send,
  zap: import_lucide_react_native.Zap,
  flame: import_lucide_react_native.Flame,
  starHalf: import_lucide_react_native.StarHalf,
  thumbsUp: import_lucide_react_native.ThumbsUp,
  thumbsDown: import_lucide_react_native.ThumbsDown
};
function Icon({ name, children, size, color, style }) {
  const { icon: iconTokens } = (0, import_headless.useComponentTokens)();
  const tokens = (0, import_headless.useTokens)();
  const iconNameString = name ?? (typeof children === "string" ? children : void 0);
  const resolvedSize = typeof size === "number" ? size : iconTokens.size[size ?? "md"] ?? 20;
  const resolvedColor = iconTokens.color[color] ?? color ?? tokens.color.text.primary;
  const IconComp = ICON_MAP[iconNameString] || import_lucide_react_native.Info;
  return /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { style: [{ width: resolvedSize, height: resolvedSize, alignItems: "center", justifyContent: "center" }, style] }, /* @__PURE__ */ import_react.default.createElement(IconComp, { size: resolvedSize, color: resolvedColor }));
}
function IconWrapper({ children, size, color }) {
  const tokens = (0, import_headless.useTokens)();
  if (!import_react.default.isValidElement(children)) return null;
  return import_react.default.cloneElement(children, {
    color: children.props.color ?? color ?? tokens.color.text.primary,
    size: children.props.size ?? size
  });
}

// src/components/Accordion/Accordion.tsx
var AccordionContext = (0, import_react2.createContext)(null);
function Accordion({
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  children
}) {
  const disclosure = (0, import_headless2.useDisclosure)({
    isOpen: controlledExpanded,
    defaultOpen: defaultExpanded,
    onOpen: () => onChange?.(true),
    onClose: () => onChange?.(false)
  });
  const { accordion } = (0, import_headless2.useComponentTokens)();
  return /* @__PURE__ */ import_react2.default.createElement(AccordionContext.Provider, { value: { expanded: disclosure.isOpen, toggle: disclosure.toggle, disabled } }, /* @__PURE__ */ import_react2.default.createElement(import_react_native2.View, { style: accordion.container }, children));
}
function AccordionSummary({ children, expandIcon }) {
  const { accordion } = (0, import_headless2.useComponentTokens)();
  const ctx = (0, import_react2.useContext)(AccordionContext);
  if (!ctx) return null;
  const { gesture, animatedStyle, accessibilityProps } = (0, import_headless2.usePressable)({
    onPress: ctx.toggle,
    disabled: ctx.disabled,
    feedbackMode: "opacity"
  });
  const rotation = (0, import_react_native_reanimated.useSharedValue)(ctx.expanded ? 1 : 0);
  import_react2.default.useEffect(() => {
    rotation.value = (0, import_react_native_reanimated.withTiming)(ctx.expanded ? 1 : 0, { duration: 200 });
  }, [ctx.expanded]);
  const iconStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    transform: [{ rotate: `${(0, import_react_native_reanimated.interpolate)(rotation.value, [0, 1], [0, 180], import_react_native_reanimated.Extrapolation.CLAMP)}deg` }]
  }));
  const containerStyle = (0, import_react2.useMemo)(() => [
    accordion.summary,
    animatedStyle
  ], [accordion.summary, animatedStyle]);
  return /* @__PURE__ */ import_react2.default.createElement(import_react_native_gesture_handler.GestureDetector, { gesture }, /* @__PURE__ */ import_react2.default.createElement(
    import_react_native_reanimated.default.View,
    {
      style: containerStyle,
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react2.default.createElement(import_react_native2.Text, { style: accordion.title }, children),
    /* @__PURE__ */ import_react2.default.createElement(import_react_native_reanimated.default.View, { style: iconStyle }, expandIcon ?? /* @__PURE__ */ import_react2.default.createElement(Icon, { size: accordion.icon.size, color: accordion.icon.color, name: "chevronDown" }))
  ));
}
function AccordionDetails({ children }) {
  const { accordion } = (0, import_headless2.useComponentTokens)();
  const ctx = (0, import_react2.useContext)(AccordionContext);
  const [contentHeight, setContentHeight] = import_react2.default.useState(0);
  const animHeight = (0, import_react_native_reanimated.useSharedValue)(0);
  import_react2.default.useEffect(() => {
    if (!ctx) return;
    animHeight.value = (0, import_react_native_reanimated.withTiming)(ctx.expanded ? contentHeight : 0, { duration: 250 });
  }, [ctx?.expanded, contentHeight]);
  const animStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    height: animHeight.value,
    overflow: "hidden"
  }));
  return /* @__PURE__ */ import_react2.default.createElement(import_react_native_reanimated.default.View, { style: animStyle }, /* @__PURE__ */ import_react2.default.createElement(
    import_react_native2.View,
    {
      onLayout: (e) => setContentHeight(e.nativeEvent.layout.height),
      style: [accordion.details, { position: "absolute", left: 0, right: 0 }]
    },
    children
  ));
}
function AccordionActions({ children }) {
  const tokens = (0, import_headless2.useTokens)();
  const ctx = (0, import_react2.useContext)(AccordionContext);
  if (!ctx?.expanded) return null;
  return /* @__PURE__ */ import_react2.default.createElement(import_react_native2.View, { style: {
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    backgroundColor: tokens.color.bg.subtle,
    flexDirection: "row",
    gap: tokens.spacing[2]
  } }, children);
}

// src/components/Alert/Alert.tsx
var import_react3 = __toESM(require("react"));
var import_react_native3 = require("react-native");
var import_headless3 = require("@truongdq01/headless");
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
  const { alert } = (0, import_headless3.useComponentTokens)();
  const tokens = (0, import_headless3.useTokens)();
  const { isOpen, getAlertProps, getCloseButtonProps } = (0, import_headless3.useAlert)({ onClose });
  const severityTokens = alert.variant[severity];
  if (!isOpen) return null;
  const containerStyle = (0, import_react3.useMemo)(() => {
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
  return /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, { style: containerStyle, ...getAlertProps() }, icon !== false && /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, { style: { marginTop: 2 } }, icon ?? /* @__PURE__ */ import_react3.default.createElement(Icon, { size: 20, color: iconColor }, SEVERITY_ICONS[severity])), /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, { style: { flex: 1 } }, children), action, onClose && /* @__PURE__ */ import_react3.default.createElement(import_react_native3.Pressable, { hitSlop: 8, style: { marginTop: 2 }, ...getCloseButtonProps() }, /* @__PURE__ */ import_react3.default.createElement(Icon, { size: 18, color: textColor || tokens.color.text.inverse, name: "close" })));
}
function AlertTitle({ children }) {
  const { alert } = (0, import_headless3.useComponentTokens)();
  return /* @__PURE__ */ import_react3.default.createElement(import_react_native3.Text, { style: alert.title }, children);
}

// src/components/AnimatedList/AnimatedList.tsx
var import_react4 = __toESM(require("react"));
var import_react_native4 = require("react-native");
var import_flash_list = require("@shopify/flash-list");
var import_react_native_reanimated2 = __toESM(require("react-native-reanimated"));
var import_headless4 = require("@truongdq01/headless");
var ReanimatedFlashList = import_react_native_reanimated2.default.createAnimatedComponent(import_flash_list.FlashList);
var AnimatedList = (0, import_react4.forwardRef)(({
  data,
  renderItem,
  itemEntering = import_react_native_reanimated2.FadeInDown,
  itemExiting,
  itemLayout = import_react_native_reanimated2.Layout.springify().damping(16).stiffness(150),
  staggerEntering = false,
  staggerDelay = 50,
  itemContainerStyle,
  ...flashListProps
}, ref) => {
  const { animatedList } = (0, import_headless4.useComponentTokens)();
  const AnimatedCell = ({ item, index, target, ...props }) => {
    const enteringAnim = staggerEntering && itemEntering?.delay ? itemEntering.delay(Math.min(index * staggerDelay, 500)) : itemEntering;
    return /* @__PURE__ */ import_react4.default.createElement(
      import_react_native_reanimated2.default.View,
      {
        entering: enteringAnim,
        exiting: itemExiting,
        layout: itemLayout,
        style: [animatedList.item, itemContainerStyle, styles.itemWrapper]
      },
      renderItem({ item, index, target, separators: {} })
    );
  };
  return /* @__PURE__ */ import_react4.default.createElement(
    ReanimatedFlashList,
    {
      ref,
      data,
      renderItem: (info) => /* @__PURE__ */ import_react4.default.createElement(AnimatedCell, { ...info }),
      ...flashListProps,
      contentContainerStyle: (0, import_react4.useMemo)(() => [
        animatedList.container,
        flashListProps.contentContainerStyle
      ], [animatedList.container, flashListProps.contentContainerStyle])
    }
  );
});
var styles = import_react_native4.StyleSheet.create({
  itemWrapper: {
    overflow: "hidden"
  }
});

// src/components/AppBar/AppBar.tsx
var import_react5 = __toESM(require("react"));
var import_react_native5 = require("react-native");
var import_headless5 = require("@truongdq01/headless");
function AppBar({
  children,
  color = "primary",
  variant = "elevation",
  position = "relative",
  elevation = 2,
  style
}) {
  const { appBar } = (0, import_headless5.useComponentTokens)();
  const tokens = (0, import_headless5.useTokens)();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];
  const bgMap = {
    default: appBar.container.backgroundColor,
    inherit: "transparent",
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    transparent: "transparent"
  };
  return /* @__PURE__ */ import_react5.default.createElement(
    import_react_native5.View,
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
  const { appBar } = (0, import_headless5.useComponentTokens)();
  const tokens = (0, import_headless5.useTokens)();
  return /* @__PURE__ */ import_react5.default.createElement(
    import_react_native5.View,
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
var import_react7 = __toESM(require("react"));
var import_react_native7 = require("react-native");
var import_react_native_reanimated3 = __toESM(require("react-native-reanimated"));
var import_headless7 = require("@truongdq01/headless");

// src/components/Input/Input.tsx
var import_react6 = __toESM(require("react"));
var import_react_native6 = require("react-native");
var import_headless6 = require("@truongdq01/headless");
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
  const { input } = (0, import_headless6.useComponentTokens)();
  const tokens = (0, import_headless6.useTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless6.useIconStyle)("input");
  const [isFocused, setIsFocused] = (0, import_react6.useState)(false);
  const [hasTyped, setHasTyped] = (0, import_react6.useState)(false);
  const handleChange = (e) => {
    const text = e.nativeEvent.text;
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };
  const containerStyle = (0, import_react6.useMemo)(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled
  ], [input, size, isFocused, error, disabled]);
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (import_react6.default.isValidElement(icon)) {
      return import_react6.default.cloneElement(icon, {
        size: icon.props.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, null, label && /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: input.label }, label), /* @__PURE__ */ import_react6.default.createElement(import_react_native6.View, { style: containerStyle }, renderIcon(leadingElement), /* @__PURE__ */ import_react6.default.createElement(
    import_react_native6.TextInput,
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
  ), renderIcon(trailingElement)), error ? /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: input.errorText }, error) : helperText ? /* @__PURE__ */ import_react6.default.createElement(import_react_native6.Text, { style: input.helperText }, helperText) : null);
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
  const tokens = (0, import_headless7.useTokens)();
  const { autocomplete } = (0, import_headless7.useComponentTokens)();
  const { width: windowWidth, height: windowHeight } = (0, import_react_native7.useWindowDimensions)();
  const inputRef = (0, import_react7.useRef)(null);
  const [inputRect, setInputRect] = (0, import_react7.useState)({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [dropdownMounted, setDropdownMounted] = (0, import_react7.useState)(false);
  const opacity = (0, import_react_native_reanimated3.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated3.useSharedValue)(0.95);
  const {
    inputValue: query,
    setInputValue,
    isOpen,
    open,
    close,
    isSelected,
    selectOption,
    filteredOptions
  } = (0, import_headless7.useAutocomplete)({
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
          opacity.value = (0, import_react_native_reanimated3.withTiming)(1, { duration: 160, easing: import_react_native_reanimated3.Easing.out(import_react_native_reanimated3.Easing.cubic) });
          scale.value = (0, import_react_native_reanimated3.withSpring)(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };
  const handleClose = () => {
    opacity.value = (0, import_react_native_reanimated3.withTiming)(0, { duration: 120 });
    scale.value = (0, import_react_native_reanimated3.withTiming)(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };
  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;
  const dropdownTop = showAbove ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP : inputRect.pageY + inputRect.height + GAP;
  const dropdownAnimStyle = (0, import_react_native_reanimated3.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ import_react7.default.createElement(import_react_native7.View, { ref: inputRef }, /* @__PURE__ */ import_react7.default.createElement(
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
  ), dropdownMounted && filteredOptions.length > 0 && /* @__PURE__ */ import_react7.default.createElement(import_react_native7.Modal, { transparent: true, animationType: "none", visible: dropdownMounted, onRequestClose: handleClose }, /* @__PURE__ */ import_react7.default.createElement(import_react_native7.Pressable, { style: { flex: 1 }, onPress: handleClose }), /* @__PURE__ */ import_react7.default.createElement(
    import_react_native_reanimated3.default.View,
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
      return /* @__PURE__ */ import_react7.default.createElement(
        import_react_native7.Pressable,
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
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ import_react7.default.createElement(import_react_native7.Text, { style: { color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, labelOf(option))
      );
    })
  )));
}

// src/components/Avatar/Avatar.tsx
var import_react8 = __toESM(require("react"));
var import_react_native8 = require("react-native");
var import_headless8 = require("@truongdq01/headless");
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
  const { avatar } = (0, import_headless8.useComponentTokens)();
  const tokens = (0, import_headless8.useTokens)();
  const sizeConfig = avatar.size[size];
  const radius = shape === "circle" ? sizeConfig.borderRadius : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;
  const dotSize = status ? STATUS_DOT_SIZE[size] : 0;
  return /* @__PURE__ */ import_react8.default.createElement(
    import_react_native8.View,
    {
      style: [{ width: sizeConfig.width, height: sizeConfig.height }, style],
      accessible: !!accessibilityLabel,
      accessibilityLabel
    },
    src ? /* @__PURE__ */ import_react8.default.createElement(
      import_react_native8.Image,
      {
        source: { uri: src },
        style: { width: sizeConfig.width, height: sizeConfig.height, borderRadius: radius },
        accessibilityLabel
      }
    ) : initials ? /* @__PURE__ */ import_react8.default.createElement(
      import_react_native8.View,
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
      /* @__PURE__ */ import_react8.default.createElement(
        import_react_native8.Text,
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
      /* @__PURE__ */ import_react8.default.createElement(
        import_react_native8.View,
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
        fallbackIcon ?? /* @__PURE__ */ import_react8.default.createElement(import_react_native8.Text, { style: { fontSize: sizeConfig.fontSize, color: tokens.color.text.tertiary } }, "?")
      )
    ),
    status && /* @__PURE__ */ import_react8.default.createElement(
      import_react_native8.View,
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
  const { avatar: avatarTokens } = (0, import_headless8.useComponentTokens)();
  const tokens = (0, import_headless8.useTokens)();
  const sizeConfig = avatarTokens.size[size];
  const dim = sizeConfig.width;
  const gap = overlap ?? Math.round(dim * 0.3);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ import_react8.default.createElement(
    import_react_native8.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ import_react8.default.createElement(
      import_react_native8.View,
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
      /* @__PURE__ */ import_react8.default.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ import_react8.default.createElement(
      import_react_native8.View,
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
      /* @__PURE__ */ import_react8.default.createElement(
        import_react_native8.Text,
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
var import_react9 = __toESM(require("react"));
var import_react_native9 = require("react-native");
var import_headless9 = require("@truongdq01/headless");
var Badge = import_react9.default.memo(({ label, variant = "default", size = "md", icon }) => {
  const { badge } = (0, import_headless9.useComponentTokens)();
  const { size: iconSize } = (0, import_headless9.useIconStyle)("list");
  const containerStyle = (0, import_react9.useMemo)(() => [
    badge.base,
    badge.size[size],
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    }
  ], [badge, variant, size]);
  const textStyle = (0, import_react9.useMemo)(() => [
    badge.text,
    { color: badge.variant[variant].text }
  ], [badge, variant]);
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (import_react9.default.isValidElement(el)) {
      return import_react9.default.cloneElement(el, {
        size: el.props.size ?? iconSize * 0.8,
        color: el.props.color ?? iconColor
      });
    }
    return el;
  };
  return /* @__PURE__ */ import_react9.default.createElement(import_react_native9.View, { style: containerStyle }, renderIcon(icon), /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Text, { style: textStyle }, label));
});

// src/components/BottomNavigation/BottomNavigation.tsx
var import_react10 = __toESM(require("react"));
var import_react_native10 = require("react-native");
var import_headless10 = require("@truongdq01/headless");
var BottomNavContext = (0, import_react10.createContext)(null);
function BottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  children
}) {
  const { bottomNavigation } = (0, import_headless10.useComponentTokens)();
  const { value, isSelected, getItemProps } = (0, import_headless10.useBottomNavigation)({
    value: controlledValue,
    defaultValue,
    onChange
  });
  const ctx = (0, import_react10.useMemo)(() => ({ value, isSelected, getItemProps, showLabels }), [value, isSelected, getItemProps, showLabels]);
  return /* @__PURE__ */ import_react10.default.createElement(BottomNavContext.Provider, { value: ctx }, /* @__PURE__ */ import_react10.default.createElement(import_react_native10.View, { style: [bottomNavigation.container, { flexDirection: "row", justifyContent: "space-around" }] }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const { bottomNavigation } = (0, import_headless10.useComponentTokens)();
  const tokens = (0, import_headless10.useTokens)();
  const ctx = (0, import_react10.useContext)(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  return /* @__PURE__ */ import_react10.default.createElement(import_react_native10.Pressable, { ...ctx.getItemProps(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ import_react10.default.createElement(import_react_native10.Text, { style: { fontSize: tokens.fontSize.xs, color: selected ? bottomNavigation.item.active.color : bottomNavigation.item.inactive.color } }, label));
}

// src/components/BottomSheet/BottomSheet.tsx
var import_react11 = __toESM(require("react"));
var import_react_native11 = require("react-native");
var import_react_native_reanimated4 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var import_react_native_safe_area_context = require("react-native-safe-area-context");
var import_headless11 = require("@truongdq01/headless");
var SCREEN_HEIGHT = import_react_native11.Dimensions.get("window").height;
var BottomSheet = (0, import_react11.forwardRef)(
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
    const { bottomSheet } = (0, import_headless11.useComponentTokens)();
    const insets = (0, import_react_native_safe_area_context.useSafeAreaInsets)();
    const [mounted, setMounted] = (0, import_react11.useState)(false);
    const handleClose = import_react11.default.useCallback(() => {
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
    } = (0, import_headless11.useBottomSheet)({
      snapPoints,
      initialSnapIndex,
      onClose: handleClose,
      onSnapChange,
      enableDismissOnSwipe,
      enableBackdrop
    });
    const open = import_react11.default.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    (0, import_react11.useImperativeHandle)(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: import_react_native11.StyleSheet.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ import_react11.default.createElement(import_react_native_gesture_handler2.GestureDetector, { gesture: backdropTapGesture }, /* @__PURE__ */ import_react11.default.createElement(
      import_react_native_reanimated4.default.View,
      {
        style: [
          import_react_native11.StyleSheet.absoluteFill,
          bottomSheet.backdrop,
          backdropAnimatedStyle
        ]
      }
    )), /* @__PURE__ */ import_react11.default.createElement(
      import_react_native_reanimated4.default.View,
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
      /* @__PURE__ */ import_react11.default.createElement(import_react_native_gesture_handler2.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: styles2.handleArea }, showHandle && /* @__PURE__ */ import_react11.default.createElement(
        import_react_native11.View,
        {
          style: [
            styles2.handle,
            bottomSheet.handle
          ]
        }
      ))),
      /* @__PURE__ */ import_react11.default.createElement(import_react_native11.View, { style: { flex: 1 } }, children)
    )));
  }
);
var styles2 = import_react_native11.StyleSheet.create({
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
var import_react12 = __toESM(require("react"));
var import_react_native12 = require("react-native");
var import_headless12 = require("@truongdq01/headless");
function Box2({ children, style, sx, flex }) {
  const { box } = (0, import_headless12.useComponentTokens)();
  const merged = [
    box.defaults,
    flex !== void 0 ? { flex } : null,
    sx,
    style
  ];
  return /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: merged }, children);
}

// src/components/Breadcrumbs/Breadcrumbs.tsx
var import_react13 = __toESM(require("react"));
var import_react_native13 = require("react-native");
var import_headless13 = require("@truongdq01/headless");
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const { breadcrumbs } = (0, import_headless13.useComponentTokens)();
  const items = import_react13.default.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ import_react13.default.createElement(import_react_native13.Text, { key: "ellipsis", style: { color: breadcrumbs.separator.color } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ import_react13.default.createElement(import_react_native13.View, { style: breadcrumbs.container }, displayItems.map((child, idx) => /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ import_react13.default.createElement(import_react_native13.Text, { style: { marginHorizontal: breadcrumbs.container.gap, color: breadcrumbs.separator.color, fontSize: breadcrumbs.separator.fontSize } }, separator))));
}

// src/components/Button/Button.tsx
var import_react14 = __toESM(require("react"));
var import_react_native_reanimated5 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler3 = require("react-native-gesture-handler");
var import_react_native14 = require("react-native");
var import_headless14 = require("@truongdq01/headless");
var Button = import_react14.default.memo(({
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
  const { button } = (0, import_headless14.useComponentTokens)();
  const tokens = (0, import_headless14.useTokens)();
  const { size: iconSize } = (0, import_headless14.useIconStyle)("button");
  const isDisabled = disabled || loading;
  const resolvedVariant = (0, import_react14.useMemo)(() => {
    if (variant === "contained") return "solid";
    if (variant === "outlined") return "outline";
    if (variant === "text") return "ghost";
    return variant;
  }, [variant]);
  const resolvedColor = (0, import_react14.useMemo)(() => {
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
  const handlePress = (0, import_react14.useMemo)(() => {
    if (!href) return onPress;
    return () => {
      onPress?.();
      import_react_native14.Linking.openURL(href);
    };
  }, [href, onPress]);
  const hitSlop = (0, import_react14.useMemo)(() => {
    const height = button.size[size].container.height;
    const padding = Math.max(0, (44 - height) / 2);
    const isIconOnly = !label && !children;
    const horizontalPadding = isIconOnly ? padding : 0;
    return { top: padding, bottom: padding, left: horizontalPadding, right: horizontalPadding };
  }, [button, size, label, children]);
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless14.usePressable)({
    onPress: handlePress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? (typeof children === "string" ? children : label),
    accessibilityHint,
    accessibilityRole: "button",
    hitSlop
  });
  const containerStyle = (0, import_react14.useMemo)(() => [
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
  const textStyle = (0, import_react14.useMemo)(() => [
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
    if (import_react14.default.isValidElement(icon)) {
      return import_react14.default.cloneElement(icon, {
        size: icon.props.size ?? iconSize,
        color: icon.props.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ import_react14.default.createElement(import_react_native_gesture_handler3.GestureDetector, { gesture }, /* @__PURE__ */ import_react14.default.createElement(
    import_react_native_reanimated5.default.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react14.default.createElement(import_react_native14.View, { style: [
      styles3.contentContainer,
      {
        gap: button.variant[resolvedVariant].container.gap,
        opacity: loading && loadingPosition === "center" ? 0 : 1
      }
    ] }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ import_react14.default.createElement(import_react_native14.ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ import_react14.default.createElement(import_react_native14.Text, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ import_react14.default.createElement(import_react_native14.ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ import_react14.default.createElement(import_react_native14.View, { style: [import_react_native14.StyleSheet.absoluteFill, styles3.loadingWrapper] }, loadingIndicator ?? /* @__PURE__ */ import_react14.default.createElement(import_react_native14.ActivityIndicator, { size: "small", color: iconColor }))
  ));
});
var styles3 = import_react_native14.StyleSheet.create({
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
var import_react15 = __toESM(require("react"));
var import_react_native15 = require("react-native");
var import_headless15 = require("@truongdq01/headless");
function ButtonGroup({
  children,
  variant = "outlined",
  size = "md",
  orientation = "horizontal",
  disabled = false,
  fullWidth = false
}) {
  const tokens = (0, import_headless15.useTokens)();
  const { buttonGroup } = (0, import_headless15.useComponentTokens)();
  const isRow = orientation === "horizontal";
  const items = import_react15.default.Children.toArray(children);
  return /* @__PURE__ */ import_react15.default.createElement(
    import_react_native15.View,
    {
      style: {
        ...buttonGroup.container,
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start"
      }
    },
    items.map((child, i) => {
      if (!import_react15.default.isValidElement(child)) return child;
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
      return import_react15.default.cloneElement(child, {
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
var import_react16 = __toESM(require("react"));
var import_react_native_reanimated6 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler4 = require("react-native-gesture-handler");
var import_react_native16 = require("react-native");
var import_headless16 = require("@truongdq01/headless");
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = (0, import_headless16.useComponentTokens)();
  const containerStyle = (0, import_react16.useMemo)(() => [
    card.container,
    padding !== "none" && { padding: card.padding[padding] },
    style
  ], [card, padding, style]);
  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = (0, import_headless16.usePressable)({
      onPress,
      feedbackMode: "scaleSubtle",
      accessibilityLabel,
      accessibilityRole: "button"
    });
    return /* @__PURE__ */ import_react16.default.createElement(import_react_native_gesture_handler4.GestureDetector, { gesture }, /* @__PURE__ */ import_react16.default.createElement(import_react_native_reanimated6.default.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ import_react16.default.createElement(import_react_native16.View, { style: containerStyle }, children);
}

// src/components/Carousel/Carousel.tsx
var import_react17 = __toESM(require("react"));
var import_react_native17 = require("react-native");
var import_react_native_reanimated7 = __toESM(require("react-native-reanimated"));
var import_headless17 = require("@truongdq01/headless");
var { width: SCREEN_WIDTH } = import_react_native17.Dimensions.get("window");
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
  const { carousel } = (0, import_headless17.useComponentTokens)();
  const {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    itemStep,
    n
  } = (0, import_headless17.useCarousel)({
    data,
    itemWidth,
    gap,
    loop,
    autoPlay,
    autoPlayInterval
  });
  return /* @__PURE__ */ import_react17.default.createElement(import_react_native17.View, { style: { height } }, /* @__PURE__ */ import_react17.default.createElement(
    import_react_native17.ScrollView,
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
      return /* @__PURE__ */ import_react17.default.createElement(import_react_native17.View, { key: index, style: { width: itemWidth, height } }, renderItem(item, loop ? (index - 1 + n) % n : index));
    })
  ), showPagination && /* @__PURE__ */ import_react17.default.createElement(
    import_react_native17.View,
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
      return /* @__PURE__ */ import_react17.default.createElement(
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
  const { carousel } = (0, import_headless17.useComponentTokens)();
  const dotStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => {
    let activeIndex = scrollX.value / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }
    const opacity = (0, import_react_native_reanimated7.interpolate)(
      activeIndex,
      [index - 1, index, index + 1],
      [carousel.dot.inactive.opacity, 1, carousel.dot.inactive.opacity],
      import_react_native_reanimated7.Extrapolation.CLAMP
    );
    const width = (0, import_react_native_reanimated7.interpolate)(
      activeIndex,
      [index - 1, index, index + 1],
      [carousel.dot.inactive.width, carousel.dot.active.width, carousel.dot.inactive.width],
      import_react_native_reanimated7.Extrapolation.CLAMP
    );
    return {
      width,
      opacity,
      backgroundColor: carousel.dot.active.bg,
      height: carousel.dot.height,
      borderRadius: carousel.dot.borderRadius
    };
  });
  return /* @__PURE__ */ import_react17.default.createElement(import_react_native_reanimated7.default.View, { style: dotStyle });
}

// src/components/Checkbox/Checkbox.tsx
var import_react18 = __toESM(require("react"));
var import_react_native18 = require("react-native");
var import_react_native_reanimated8 = __toESM(require("react-native-reanimated"));
var import_headless18 = require("@truongdq01/headless");
var import_tokens = require("@truongdq01/tokens");
function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}) {
  const { checkbox } = (0, import_headless18.useComponentTokens)();
  const tokens = (0, import_headless18.useTokens)();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = (0, import_headless18.useCheckbox)(hookOptions);
  const sizeConfig = checkbox.size[size];
  const scale = (0, import_react_native_reanimated8.useSharedValue)(1);
  const fillProgress = (0, import_react_native_reanimated8.useSharedValue)(isChecked || isIndeterminate ? 1 : 0);
  import_react18.default.useEffect(() => {
    fillProgress.value = (0, import_react_native_reanimated8.withSpring)(isChecked || isIndeterminate ? 1 : 0, import_tokens.spring.snappy);
  }, [isChecked, isIndeterminate]);
  const boxStyle = (0, import_react_native_reanimated8.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated8.interpolate)(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5 ? checkbox.state.checked.backgroundColor : checkbox.state.default.backgroundColor,
    borderColor: fillProgress.value > 0.5 ? checkbox.state.checked.borderColor : checkbox.state.default.borderColor,
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = (0, import_react_native_reanimated8.useAnimatedStyle)(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    scale.value = (0, import_react_native_reanimated8.withSpring)(0.88, import_tokens.spring.snappy, () => {
      scale.value = (0, import_react_native_reanimated8.withSpring)(1, import_tokens.spring.snappy);
    });
    toggle();
  };
  return /* @__PURE__ */ import_react18.default.createElement(
    import_react_native18.Pressable,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? checkbox.state.disabled.opacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react18.default.createElement(
      import_react_native_reanimated8.default.View,
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
      /* @__PURE__ */ import_react18.default.createElement(import_react_native_reanimated8.default.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ import_react18.default.createElement(import_react_native18.View, { style: { width: sizeConfig.iconSize, height: 2, backgroundColor: tokens.color.text.inverse, borderRadius: 1 } }) : /* @__PURE__ */ import_react18.default.createElement(import_react_native18.Text, { style: { color: tokens.color.text.inverse, fontSize: sizeConfig.iconSize, fontWeight: "700", lineHeight: sizeConfig.iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ import_react18.default.createElement(import_react_native18.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ import_react18.default.createElement(import_react_native18.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ import_react18.default.createElement(import_react_native18.Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Chip/Chip.tsx
var import_react19 = __toESM(require("react"));
var import_react_native19 = require("react-native");
var import_headless19 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless19.useTokens)();
  const { chip } = (0, import_headless19.useComponentTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless19.useIconStyle)("list");
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
    if (import_react19.default.isValidElement(node)) {
      return import_react19.default.cloneElement(node, {
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
    borderRadius: tokens.radius.full
  };
  const content = /* @__PURE__ */ import_react19.default.createElement(import_react_native19.View, { style: container }, avatar && /* @__PURE__ */ import_react19.default.createElement(import_react_native19.View, { style: avatarStyle }, avatar), renderIcon(icon), /* @__PURE__ */ import_react19.default.createElement(import_react_native19.Text, { style: {
    color: customText,
    fontSize: sizeStyle.fontSize,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: sizeStyle.fontSize * 1.4
  } }, label), onDelete && /* @__PURE__ */ import_react19.default.createElement(
    import_react_native19.Pressable,
    {
      onPress: onDelete,
      hitSlop: 8,
      style: deleteButtonStyle
    },
    deleteIcon ?? /* @__PURE__ */ import_react19.default.createElement(import_react_native19.Text, { style: {
      color: customText,
      fontSize: 14,
      fontWeight: tokens.fontWeight.bold,
      opacity: 0.7
    } }, "\xD7")
  ));
  if (onClick || clickable) {
    return /* @__PURE__ */ import_react19.default.createElement(
      import_react_native19.Pressable,
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
var import_react20 = __toESM(require("react"));
var import_react_native20 = require("react-native");
var import_headless20 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless20.useTokens)();
  const { circularProgress } = (0, import_headless20.useComponentTokens)();
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
  return /* @__PURE__ */ import_react20.default.createElement(import_react_native20.View, { style: [styles4.container, style] }, /* @__PURE__ */ import_react20.default.createElement(
    import_react_native20.ActivityIndicator,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ import_react20.default.createElement(import_react_native20.View, { style: import_react_native20.StyleSheet.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ import_react20.default.createElement(import_react_native20.View, { style: styles4.labelContainer }, /* @__PURE__ */ import_react20.default.createElement(import_react_native20.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
}
var styles4 = import_react_native20.StyleSheet.create({
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
var import_react21 = __toESM(require("react"));
var import_react_native21 = require("react-native");
var import_headless21 = require("@truongdq01/headless");
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
  const { datePicker, input } = (0, import_headless21.useComponentTokens)();
  const tokens = (0, import_headless21.useTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless21.useIconStyle)("input");
  const [showPicker, setShowPicker] = (0, import_react21.useState)(false);
  const [selectedPreset, setSelectedPreset] = (0, import_react21.useState)(null);
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
    if (import_react_native21.Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      setSelectedPreset(null);
      onChange(selectedDate);
    }
  };
  const renderIcon = (node) => {
    if (!node) return null;
    if (import_react21.default.isValidElement(node)) {
      return import_react21.default.cloneElement(node, {
        size: node.props.size ?? iconSize,
        color: node.props.color ?? iconColor
      });
    }
    return node;
  };
  const pickerComponent = showPicker ? /* @__PURE__ */ import_react21.default.createElement(
    import_datetimepicker.default,
    {
      value: date ?? /* @__PURE__ */ new Date(),
      mode,
      display: import_react_native21.Platform.OS === "ios" ? "spinner" : "default",
      onChange: handleChange,
      minimumDate,
      maximumDate
    }
  ) : null;
  return /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: { gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 } }, label && /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Text, { style: input.label }, label), presets && presets.length > 0 && /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: { flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" } }, presets.map((preset) => /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.Pressable,
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
    /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.Text,
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
  ))), /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.Pressable,
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
    /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.Text,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: date ? tokens.color.text.primary : tokens.color.text.tertiary
        }
      },
      displayValue
    ),
    clearable && date && /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Pressable, { onPress: handleClear, hitSlop: 8 }, /* @__PURE__ */ import_react21.default.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" })),
    /* @__PURE__ */ import_react21.default.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "calendar" })
  ), error && /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Text, { style: input.errorText }, error), import_react_native21.Platform.OS === "ios" && showPicker && /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Modal, { transparent: true, animationType: "slide", visible: showPicker }, /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: { backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }, /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 } }, /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Pressable, { onPress: () => setShowPicker(false), hitSlop: 12 }, /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Text, { style: { fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Done"))), pickerComponent))), import_react_native21.Platform.OS === "android" && pickerComponent);
}

// src/components/Dialog/Dialog.tsx
var import_react22 = __toESM(require("react"));
var import_react_native22 = require("react-native");
var import_headless22 = require("@truongdq01/headless");
function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  fullWidth = false
}) {
  const { dialog, modal } = (0, import_headless22.useComponentTokens)();
  const tokens = (0, import_headless22.useTokens)();
  if (!open) return null;
  return /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: modal.overlay }, /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Pressable, { style: import_react_native22.StyleSheet.absoluteFill, onPress: onClose }), /* @__PURE__ */ import_react22.default.createElement(
    import_react_native22.View,
    {
      style: [
        modal.container,
        {
          padding: tokens.spacing[6],
          width: fullWidth ? "90%" : "80%"
        }
      ]
    },
    title && /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: { marginBottom: tokens.spacing[4] } }, typeof title === "string" ? /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Text, { style: { fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary } }, title) : title),
    /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: { marginBottom: actions ? tokens.spacing[6] : 0 } }, children),
    actions && /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: { flexDirection: "row", justifyContent: "flex-end", gap: tokens.spacing[2] } }, actions)
  )));
}

// src/components/Divider/Divider.tsx
var import_react23 = __toESM(require("react"));
var import_react_native23 = require("react-native");
var import_headless23 = require("@truongdq01/headless");
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const { divider } = (0, import_headless23.useComponentTokens)();
  const tokens = (0, import_headless23.useTokens)();
  const lineColor = emphasis ? tokens.color.border.strong : divider.color;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: divider.margin,
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ import_react23.default.createElement(
      import_react_native23.View,
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
      /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } }),
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
      /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ import_react23.default.createElement(
    import_react_native23.View,
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
var import_react24 = __toESM(require("react"));
var import_react_native24 = require("react-native");
var import_react_native_reanimated9 = __toESM(require("react-native-reanimated"));
var import_headless24 = require("@truongdq01/headless");
var import_tokens2 = require("@truongdq01/tokens");
function Drawer({
  open,
  onClose,
  anchor = "left",
  children
}) {
  const { drawer } = (0, import_headless24.useComponentTokens)();
  const tokens = (0, import_headless24.useTokens)();
  const { width: windowWidth, height: windowHeight } = import_react_native24.Dimensions.get("window");
  const isVertical = anchor === "top" || anchor === "bottom";
  const size = isVertical ? windowHeight * 0.4 : 280;
  const progress = (0, import_react_native_reanimated9.useSharedValue)(0);
  const [mounted, setMounted] = import_react24.default.useState(open);
  (0, import_react24.useEffect)(() => {
    if (open) {
      setMounted(true);
      progress.value = (0, import_react_native_reanimated9.withSpring)(1, import_tokens2.spring.snappy);
    } else {
      progress.value = (0, import_react_native_reanimated9.withSpring)(0, import_tokens2.spring.snappy, (finished) => {
        if (finished) (0, import_react_native_reanimated9.runOnJS)(setMounted)(false);
      });
    }
  }, [open]);
  const animatedStyle = (0, import_react_native_reanimated9.useAnimatedStyle)(() => {
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
  const backdropStyle = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({
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
  return /* @__PURE__ */ import_react24.default.createElement(import_react_native24.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react24.default.createElement(import_react_native24.View, { style: { flex: 1 } }, /* @__PURE__ */ import_react24.default.createElement(import_react_native_reanimated9.default.View, { style: [import_react_native24.StyleSheet.absoluteFill, drawer.overlay, backdropStyle] }, /* @__PURE__ */ import_react24.default.createElement(import_react_native24.Pressable, { style: { flex: 1 }, onPress: onClose })), /* @__PURE__ */ import_react24.default.createElement(
    import_react_native_reanimated9.default.View,
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
var import_react25 = __toESM(require("react"));
var import_react_native25 = require("react-native");
var import_headless25 = require("@truongdq01/headless");
function EmptyState({ title, description, icon, action }) {
  const { emptyState } = (0, import_headless25.useComponentTokens)();
  const tokens = (0, import_headless25.useTokens)();
  return /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: emptyState.container }, icon && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { marginBottom: tokens.spacing[2] } }, import_react25.default.isValidElement(icon) ? import_react25.default.cloneElement(icon, {
    size: icon.props.size ?? emptyState.icon.size,
    color: icon.props.color ?? emptyState.icon.color
  }) : icon), title && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: emptyState.title }, title), description && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: emptyState.description }, description), action && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { marginTop: tokens.spacing[4] } }, action));
}

// src/components/Fab/Fab.tsx
var import_react26 = __toESM(require("react"));
var import_react_native26 = require("react-native");
var import_react_native_reanimated10 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler5 = require("react-native-gesture-handler");
var import_headless26 = require("@truongdq01/headless");
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
  const { fab } = (0, import_headless26.useComponentTokens)();
  const { gesture, animatedStyle, accessibilityProps } = (0, import_headless26.usePressable)({
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
  return /* @__PURE__ */ import_react26.default.createElement(import_react_native_gesture_handler5.GestureDetector, { gesture }, /* @__PURE__ */ import_react26.default.createElement(import_react_native_reanimated10.default.View, { style: containerStyle, ...accessibilityProps }, /* @__PURE__ */ import_react26.default.createElement(import_react_native26.View, { style: styles5.content }, icon && /* @__PURE__ */ import_react26.default.createElement(Icon, { size: s.iconSize, color: textColor }, icon), isExtended && /* @__PURE__ */ import_react26.default.createElement(import_react_native26.Text, { style: [styles5.label, { marginLeft: icon ? 8 : 0 }] }, label))));
}
var styles5 = import_react_native26.StyleSheet.create({
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
var import_react27 = __toESM(require("react"));
var import_react_native27 = require("react-native");
var import_headless27 = require("@truongdq01/headless");
var FormControlContext = (0, import_react27.createContext)(null);
function useFormControl() {
  return (0, import_react27.useContext)(FormControlContext);
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
  const { formControl } = (0, import_headless27.useComponentTokens)();
  const tokens = (0, import_headless27.useTokens)();
  const marginSize = (0, import_react27.useMemo)(() => {
    if (margin === "dense") return tokens.spacing[2];
    if (margin === "normal") return tokens.spacing[4];
    return 0;
  }, [margin, tokens]);
  const ctxValue = (0, import_react27.useMemo)(() => ({ error, required, disabled, focused, fullWidth, variant }), [error, required, disabled, focused, fullWidth, variant]);
  return /* @__PURE__ */ import_react27.default.createElement(FormControlContext.Provider, { value: ctxValue }, /* @__PURE__ */ import_react27.default.createElement(import_react_native27.View, { style: [formControl.container, { alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const { formControl } = (0, import_headless27.useComponentTokens)();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : ctx?.disabled ? formControl.label.color + "80" : formControl.label.color;
  return /* @__PURE__ */ import_react27.default.createElement(import_react_native27.Text, { style: [formControl.label, { color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const { formControl } = (0, import_headless27.useComponentTokens)();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : formControl.helperText.color;
  return /* @__PURE__ */ import_react27.default.createElement(import_react_native27.Text, { style: [formControl.helperText, { color }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const { formControl } = (0, import_headless27.useComponentTokens)();
  const tokens = (0, import_headless27.useTokens)();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = import_react27.default.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ import_react27.default.createElement(
    import_react_native27.Pressable,
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
    label ? /* @__PURE__ */ import_react27.default.createElement(import_react_native27.Text, { style: formControl.label }, label) : null
  );
}

// src/components/FormField/FormField.tsx
var import_react28 = __toESM(require("react"));
var import_react_native28 = require("react-native");
var import_headless28 = require("@truongdq01/headless");
function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children
}) {
  const { formField, formControl } = (0, import_headless28.useComponentTokens)();
  const tokens = (0, import_headless28.useTokens)();
  return /* @__PURE__ */ import_react28.default.createElement(import_react_native28.View, { style: formField.container }, (label || labelTrailing) && /* @__PURE__ */ import_react28.default.createElement(
    import_react_native28.View,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: tokens.spacing[1]
      }
    },
    label && /* @__PURE__ */ import_react28.default.createElement(import_react_native28.View, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ import_react28.default.createElement(import_react_native28.Text, { style: formControl.label }, label), required && /* @__PURE__ */ import_react28.default.createElement(import_react_native28.Text, { style: formControl.errorText }, "*")),
    labelTrailing
  ), children, error ? /* @__PURE__ */ import_react28.default.createElement(
    import_react_native28.Text,
    {
      style: [formControl.errorText, { marginTop: tokens.spacing[1] }],
      accessibilityRole: "alert",
      accessibilityLiveRegion: "polite"
    },
    error
  ) : helperText ? /* @__PURE__ */ import_react28.default.createElement(
    import_react_native28.Text,
    {
      style: [formControl.helperText, { marginTop: tokens.spacing[1] }]
    },
    helperText
  ) : null);
}
function FormGroup({ children, gap = "md" }) {
  const tokens = (0, import_headless28.useTokens)();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return /* @__PURE__ */ import_react28.default.createElement(import_react_native28.View, { style: { gap: gapSize } }, children);
}

// src/components/Grid/Grid.tsx
var import_react29 = __toESM(require("react"));
var import_react_native29 = require("react-native");
var import_headless29 = require("@truongdq01/headless");
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
  const { grid } = (0, import_headless29.useComponentTokens)();
  const resolveGap = (s) => {
    if (s === void 0) return void 0;
    return typeof s === "number" ? s : grid.gap[s];
  };
  const gap = resolveGap(spacing) ?? 0;
  const rowGap = resolveGap(rowSpacing) ?? gap;
  const colGap = resolveGap(columnSpacing) ?? gap;
  if (container) {
    return /* @__PURE__ */ import_react29.default.createElement(
      import_react_native29.View,
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
  return /* @__PURE__ */ import_react29.default.createElement(
    import_react_native29.View,
    {
      style: [itemStyle, style]
    },
    children
  );
}

// src/components/Image/Image.tsx
var import_react30 = __toESM(require("react"));
var import_react_native30 = require("react-native");
var import_react_native_reanimated11 = __toESM(require("react-native-reanimated"));
var import_headless30 = require("@truongdq01/headless");
var AnimatedImage = import_react_native_reanimated11.default.createAnimatedComponent(import_react_native30.Image);
function RnImage({ showPlaceholder = true, style, onLoad, ...props }) {
  const { image } = (0, import_headless30.useComponentTokens)();
  const [isLoaded, setIsLoaded] = (0, import_react30.useState)(false);
  const opacity = (0, import_react_native_reanimated11.useSharedValue)(0);
  const handleLoad = (e) => {
    setIsLoaded(true);
    opacity.value = (0, import_react_native_reanimated11.withTiming)(1, { duration: 300 });
    onLoad?.(e);
  };
  const imageStyle = (0, import_react_native_reanimated11.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ import_react30.default.createElement(import_react_native30.View, { style: [styles6.container, style, { backgroundColor: showPlaceholder && !isLoaded ? image.placeholder.backgroundColor : "transparent" }] }, /* @__PURE__ */ import_react30.default.createElement(
    AnimatedImage,
    {
      ...props,
      onLoad: handleLoad,
      style: [import_react_native30.StyleSheet.absoluteFill, imageStyle, style]
    }
  ));
}
var styles6 = import_react_native30.StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative"
  }
});

// src/components/ImageList/ImageList.tsx
var import_react31 = __toESM(require("react"));
var import_react_native31 = require("react-native");
var import_headless31 = require("@truongdq01/headless");
var { width: SCREEN_WIDTH2 } = import_react_native31.Dimensions.get("window");
var ImageListContext = (0, import_react31.createContext)(null);
function useImageListContext() {
  return (0, import_react31.useContext)(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = (0, import_react31.useState)(SCREEN_WIDTH2);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = (0, import_react31.useMemo)(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ import_react31.default.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ import_react31.default.createElement(import_react_native31.View, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
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
  return /* @__PURE__ */ import_react31.default.createElement(import_react_native31.View, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const { imageList } = (0, import_headless31.useComponentTokens)();
  const tokens = (0, import_headless31.useTokens)();
  return /* @__PURE__ */ import_react31.default.createElement(
    import_react_native31.View,
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
    /* @__PURE__ */ import_react31.default.createElement(import_react_native31.View, { style: { flex: 1 } }, title ? /* @__PURE__ */ import_react31.default.createElement(import_react_native31.Text, { style: imageList.bar.title }, title) : null, subtitle ? /* @__PURE__ */ import_react31.default.createElement(import_react_native31.Text, { style: imageList.bar.subtitle }, subtitle) : null),
    actionIcon
  );
}

// src/components/Input/PasswordInput.tsx
var import_react32 = __toESM(require("react"));
var import_react_native32 = require("react-native");
var import_headless32 = require("@truongdq01/headless");
function PasswordInput(props) {
  const [show, setShow] = (0, import_react32.useState)(false);
  const { size, color } = (0, import_headless32.useIconStyle)("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ import_react32.default.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ import_react32.default.createElement(
        import_react_native32.Pressable,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        /* @__PURE__ */ import_react32.default.createElement(Icon, { size, color, name: show ? "eyeOff" : "eye" })
      )
    }
  );
}

// src/components/LinearProgress/LinearProgress.tsx
var import_react33 = __toESM(require("react"));
var import_react_native33 = require("react-native");
var import_react_native_reanimated12 = __toESM(require("react-native-reanimated"));
var import_headless33 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless33.useTokens)();
  const { linearProgress } = (0, import_headless33.useComponentTokens)();
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
  const determinateStyle = (0, import_react_native_reanimated12.useAnimatedStyle)(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ import_react33.default.createElement(import_react_native33.View, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ import_react33.default.createElement(
    import_react_native_reanimated12.default.View,
    {
      style: [
        styles7.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ import_react33.default.createElement(import_react33.default.Fragment, null, variant === "buffer" && /* @__PURE__ */ import_react33.default.createElement(import_react_native33.View, { style: [styles7.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? tokens.color.bg.muted }] }), /* @__PURE__ */ import_react33.default.createElement(
    import_react_native_reanimated12.default.View,
    {
      style: [
        styles7.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles7 = import_react_native33.StyleSheet.create({
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
var import_react34 = __toESM(require("react"));
var import_react_native34 = require("react-native");
var import_headless34 = require("@truongdq01/headless");
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const { link } = (0, import_headless34.useComponentTokens)();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ import_react34.default.createElement(
    import_react_native34.Text,
    {
      onPress: async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await import_react_native34.Linking.openURL(href);
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
var import_react35 = __toESM(require("react"));
var import_react_native35 = require("react-native");
var import_flash_list2 = require("@shopify/flash-list");
var import_headless35 = require("@truongdq01/headless");
var ListContext = (0, import_react35.createContext)(null);
function useListContext() {
  return (0, import_react35.useContext)(ListContext);
}
function List2({ children, dense = false, disablePadding = false, subheader, style }) {
  const { list } = (0, import_headless35.useComponentTokens)();
  const tokens = (0, import_headless35.useTokens)();
  return /* @__PURE__ */ import_react35.default.createElement(ListContext.Provider, { value: { dense, disablePadding } }, /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: [list.container, style] }, subheader && /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: list.subheader }, typeof subheader === "string" ? /* @__PURE__ */ import_react35.default.createElement(import_react_native35.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: "600", color: tokens.color.text.tertiary } }, subheader) : subheader), children));
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
  const { list } = (0, import_headless35.useComponentTokens)();
  const tokens = (0, import_headless35.useTokens)();
  const ctx = useListContext();
  const isDense = ctx?.dense;
  return /* @__PURE__ */ import_react35.default.createElement(
    import_react_native35.Pressable,
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
    /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: { flex: 1, flexDirection: "row", alignItems: "center" } }, children),
    secondaryAction && /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: { marginLeft: tokens.spacing[2] } }, secondaryAction)
  );
}
function ListItemText({ primary, secondary }) {
  const { list } = (0, import_headless35.useComponentTokens)();
  const tokens = (0, import_headless35.useTokens)();
  const ctx = useListContext();
  return /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: { flex: 1 } }, typeof primary === "string" ? /* @__PURE__ */ import_react35.default.createElement(import_react_native35.Text, { style: [list.itemText, ctx?.dense && { fontSize: tokens.fontSize.sm }] }, primary) : primary, secondary && (typeof secondary === "string" ? /* @__PURE__ */ import_react35.default.createElement(import_react_native35.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary, marginTop: 2 } }, secondary) : secondary));
}
function ListItemIcon({ children }) {
  const tokens = (0, import_headless35.useTokens)();
  return /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: { marginRight: tokens.spacing[4], minWidth: 24, alignItems: "center" } }, children);
}
function ListData({
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
  ...listProps
}) {
  return /* @__PURE__ */ import_react35.default.createElement(List2, { ...listProps }, /* @__PURE__ */ import_react35.default.createElement(
    import_flash_list2.FlashList,
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
var import_react36 = __toESM(require("react"));
var import_react_native36 = require("react-native");
var import_react_native_reanimated13 = __toESM(require("react-native-reanimated"));
var import_headless36 = require("@truongdq01/headless");
var MenuContext = import_react36.default.createContext(null);
function Menu2({ open, onClose, anchorEl, children }) {
  const { menu } = (0, import_headless36.useComponentTokens)();
  const { width: windowWidth, height: windowHeight } = (0, import_react_native36.useWindowDimensions)();
  const [menuSize, setMenuSize] = import_react36.default.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = import_react36.default.useState(false);
  const { close, getItemProps } = (0, import_headless36.useMenu)({ onClose });
  const opacity = (0, import_react_native_reanimated13.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated13.useSharedValue)(0.9);
  import_react36.default.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = (0, import_react_native_reanimated13.withTiming)(1, { duration: 180, easing: import_react_native_reanimated13.Easing.out(import_react_native_reanimated13.Easing.cubic) });
        scale.value = (0, import_react_native_reanimated13.withSpring)(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = (0, import_react_native_reanimated13.withTiming)(0, { duration: 130 });
      scale.value = (0, import_react_native_reanimated13.withTiming)(0.92, { duration: 130 }, (done) => {
        if (done) (0, import_react_native_reanimated13.runOnJS)(setMounted)(false);
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
  const animStyle = (0, import_react_native_reanimated13.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ import_react36.default.createElement(import_react_native36.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: close }, /* @__PURE__ */ import_react36.default.createElement(import_react_native36.Pressable, { style: { flex: 1 }, onPress: close }), /* @__PURE__ */ import_react36.default.createElement(
    import_react_native_reanimated13.default.View,
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
    /* @__PURE__ */ import_react36.default.createElement(MenuContext.Provider, { value: { getItemProps } }, children)
  ));
}
function MenuItem({ children, onPress, disabled = false, selected = false }) {
  const { menu } = (0, import_headless36.useComponentTokens)();
  const tokens = (0, import_headless36.useTokens)();
  const ctx = import_react36.default.useContext(MenuContext);
  const itemProps = ctx?.getItemProps({ onClick: onPress, disabled }) ?? { onPress, disabled };
  return /* @__PURE__ */ import_react36.default.createElement(
    import_react_native36.Pressable,
    {
      ...itemProps,
      style: ({ pressed }) => [
        menu.item,
        pressed && { backgroundColor: tokens.color.bg.subtle },
        selected && { backgroundColor: tokens.color.brand.subtle },
        disabled && { opacity: 0.5 }
      ]
    },
    /* @__PURE__ */ import_react36.default.createElement(import_react_native36.Text, { style: {
      color: selected ? tokens.color.brand.text : tokens.color.text.primary,
      fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
    } }, children)
  );
}

// src/components/Modal/Modal.tsx
var import_react37 = __toESM(require("react"));
var import_react_native37 = require("react-native");
var import_headless37 = require("@truongdq01/headless");
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
  const { modal } = (0, import_headless37.useComponentTokens)();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ import_react37.default.createElement(
    import_react_native37.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ import_react37.default.createElement(import_react_native37.View, { style: [styles8.overlay, modal.overlay] }, !hideBackdrop && (BackdropComponent ? /* @__PURE__ */ import_react37.default.createElement(BackdropComponent, { ...BackdropProps }) : /* @__PURE__ */ import_react37.default.createElement(
      import_react_native37.Pressable,
      {
        style: [import_react_native37.StyleSheet.absoluteFill, { backgroundColor: modal.overlay.backgroundColor }],
        onPress: onClose
      }
    )), /* @__PURE__ */ import_react37.default.createElement(import_react_native37.View, { style: [styles8.content, modal.container, contentStyle] }, children))
  );
}
var styles8 = import_react_native37.StyleSheet.create({
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
var import_react38 = __toESM(require("react"));
var import_react_native38 = require("react-native");
var import_react_native_reanimated14 = __toESM(require("react-native-reanimated"));
var import_headless38 = require("@truongdq01/headless");
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false
}) {
  const { otpInput } = (0, import_headless38.useComponentTokens)();
  const { inputRef, isFocused, handlePress, getOtpProps } = (0, import_headless38.useOTPInput)({
    length,
    value,
    onChange,
    onComplete,
    disabled
  });
  return /* @__PURE__ */ import_react38.default.createElement(import_react_native38.View, { style: { width: "100%" } }, /* @__PURE__ */ import_react38.default.createElement(
    import_react_native38.TextInput,
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
  ), /* @__PURE__ */ import_react38.default.createElement(
    import_react_native38.Pressable,
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
      return /* @__PURE__ */ import_react38.default.createElement(
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
  const { otpInput } = (0, import_headless38.useComponentTokens)();
  const scale = (0, import_react_native_reanimated14.useSharedValue)(1);
  (0, import_react38.useEffect)(() => {
    if (isFocused) {
      scale.value = (0, import_react_native_reanimated14.withSequence)(
        (0, import_react_native_reanimated14.withTiming)(1.1, { duration: 150 }),
        (0, import_react_native_reanimated14.withTiming)(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = (0, import_react_native_reanimated14.withSpring)(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = (0, import_react_native_reanimated14.withTiming)(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);
  const animatedStyle = (0, import_react_native_reanimated14.useAnimatedStyle)(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: isFocused ? otpInput.cell.focused.borderColor : isFilled ? otpInput.cell.borderColor : otpInput.cell.borderColor,
      backgroundColor: isFilled ? otpInput.cell.backgroundColor : otpInput.cell.backgroundColor
    };
  });
  return /* @__PURE__ */ import_react38.default.createElement(
    import_react_native_reanimated14.default.View,
    {
      style: [
        otpInput.cell,
        { flex: 1, aspectRatio: 0.8 },
        animatedStyle
      ]
    },
    /* @__PURE__ */ import_react38.default.createElement(
      import_react_native38.Text,
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
var import_react39 = __toESM(require("react"));
var import_react_native39 = require("react-native");
var import_headless39 = require("@truongdq01/headless");
function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = "text",
  shape = "rounded",
  size = "md"
}) {
  const tokens = (0, import_headless39.useTokens)();
  const { pagination } = (0, import_headless39.useComponentTokens)();
  const { page: current, setPage, items } = (0, import_headless39.usePagination)({ count, page, defaultPage, onChange });
  const s = pagination.size[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ import_react39.default.createElement(import_react_native39.Text, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    const itemTokens = selected ? pagination.item.active : pagination.item.default;
    return /* @__PURE__ */ import_react39.default.createElement(
      import_react_native39.Pressable,
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
      /* @__PURE__ */ import_react39.default.createElement(import_react_native39.Text, { style: { fontSize: tokens.fontSize[size], color: itemTokens.color } }, item)
    );
  };
  return /* @__PURE__ */ import_react39.default.createElement(import_react_native39.View, { style: { flexDirection: "row", alignItems: "center", gap: pagination.gap } }, items.map(renderItem));
}

// src/components/Paper/Paper.tsx
var import_react40 = __toESM(require("react"));
var import_react_native40 = require("react-native");
var import_headless40 = require("@truongdq01/headless");
function Paper({
  children,
  variant = "elevation",
  elevation = "sm",
  square = false,
  style
}) {
  const { paper } = (0, import_headless40.useComponentTokens)();
  const tokens = (0, import_headless40.useTokens)();
  return /* @__PURE__ */ import_react40.default.createElement(
    import_react_native40.View,
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
var import_react41 = __toESM(require("react"));
var import_react_native41 = require("react-native");
var import_headless41 = require("@truongdq01/headless");
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
  const { popover } = (0, import_headless41.useComponentTokens)();
  const tokens = (0, import_headless41.useTokens)();
  const [contentSize, setContentSize] = (0, import_react41.useState)({ width: 0, height: 0 });
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
  const { width: screenWidth, height: screenHeight } = import_react_native41.Dimensions.get("window");
  const position = (0, import_react41.useMemo)(() => {
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
  return /* @__PURE__ */ import_react41.default.createElement(import_react_native41.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react41.default.createElement(import_react_native41.Pressable, { style: styles9.backdrop, onPress: onClose }), /* @__PURE__ */ import_react41.default.createElement(
    import_react_native41.View,
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
var styles9 = import_react_native41.StyleSheet.create({
  backdrop: {
    ...import_react_native41.StyleSheet.absoluteFillObject
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
var import_react42 = __toESM(require("react"));
var import_react_native42 = require("react-native");
var import_headless42 = require("@truongdq01/headless");
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
  const { popper } = (0, import_headless42.useComponentTokens)();
  const tokens = (0, import_headless42.useTokens)();
  const [contentSize, setContentSize] = (0, import_react42.useState)({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = import_react_native42.Dimensions.get("window");
  const position = (0, import_react42.useMemo)(() => {
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
  return /* @__PURE__ */ import_react42.default.createElement(import_react_native42.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react42.default.createElement(import_react_native42.Pressable, { style: styles10.backdrop, onPress: onClose }), /* @__PURE__ */ import_react42.default.createElement(
    import_react_native42.View,
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
var styles10 = import_react_native42.StyleSheet.create({
  backdrop: {
    ...import_react_native42.StyleSheet.absoluteFillObject
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
var import_react43 = __toESM(require("react"));
var import_react_native_reanimated15 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler6 = require("react-native-gesture-handler");
var import_headless43 = require("@truongdq01/headless");
function Pressable18({ children, style, ...hookOptions }) {
  const { pressable } = (0, import_headless43.useComponentTokens)();
  const { gesture, animatedStyle, accessibilityProps, isPressed } = (0, import_headless43.usePressable)(hookOptions);
  return /* @__PURE__ */ import_react43.default.createElement(import_react_native_gesture_handler6.GestureDetector, { gesture }, /* @__PURE__ */ import_react43.default.createElement(import_react_native_reanimated15.default.View, { style: [pressable.container, style, animatedStyle], ...accessibilityProps }, typeof children === "function" ? children({ isPressed }) : children));
}

// src/components/Radio/Radio.tsx
var import_react44 = __toESM(require("react"));
var import_react_native43 = require("react-native");
var import_react_native_reanimated16 = __toESM(require("react-native-reanimated"));
var import_headless44 = require("@truongdq01/headless");
var import_tokens3 = require("@truongdq01/tokens");
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = (0, import_headless44.useTokens)();
  const { radio } = (0, import_headless44.useComponentTokens)();
  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = import_tokens3.spring.snappy;
  const scale = (0, import_react_native_reanimated16.useSharedValue)(isSelected ? 1 : 0);
  import_react44.default.useEffect(() => {
    scale.value = (0, import_react_native_reanimated16.withSpring)(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);
  const dotStyle = (0, import_react_native_reanimated16.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const handlePress = () => {
    if (!isSelected) {
      scale.value = (0, import_react_native_reanimated16.withSpring)(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = (0, import_react_native_reanimated16.withSpring)(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ import_react44.default.createElement(
    import_react_native43.Pressable,
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
    /* @__PURE__ */ import_react44.default.createElement(
      import_react_native43.View,
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
      /* @__PURE__ */ import_react44.default.createElement(
        import_react_native_reanimated16.default.View,
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
    (label || description) && /* @__PURE__ */ import_react44.default.createElement(import_react_native43.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ import_react44.default.createElement(
      import_react_native43.Text,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ import_react44.default.createElement(
      import_react_native43.Text,
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
  const tokens = (0, import_headless44.useTokens)();
  const { isSelected, getItemProps } = (0, import_headless44.useRadioGroup)(hookOptions);
  return /* @__PURE__ */ import_react44.default.createElement(import_react_native43.View, null, label && /* @__PURE__ */ import_react44.default.createElement(
    import_react_native43.Text,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ import_react44.default.createElement(
    import_react_native43.View,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ import_react44.default.createElement(
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
var import_react45 = __toESM(require("react"));
var import_react_native44 = require("react-native");
var import_headless45 = require("@truongdq01/headless");
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
  const { rating } = (0, import_headless45.useComponentTokens)();
  const tokens = (0, import_headless45.useTokens)();
  const { value: ratingValue, setValue } = (0, import_headless45.useRating)({
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
  return /* @__PURE__ */ import_react45.default.createElement(import_react_native44.View, { style: rating.container }, Array.from({ length: max }).map((_, i) => {
    const starNumber = i + 1;
    const filled = ratingValue >= starNumber;
    const halfFilled = !filled && ratingValue >= starNumber - 0.5 && precision <= 0.5;
    return /* @__PURE__ */ import_react45.default.createElement(
      import_react_native44.Pressable,
      {
        key: i,
        onPress: () => handlePress(i),
        disabled: disabled || readOnly,
        style: { opacity: disabled ? 0.5 : 1 }
      },
      /* @__PURE__ */ import_react45.default.createElement(
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
var import_react46 = __toESM(require("react"));
var import_react_native45 = require("react-native");
var import_react_native_reanimated17 = __toESM(require("react-native-reanimated"));
var import_headless46 = require("@truongdq01/headless");
var import_tokens4 = require("@truongdq01/tokens");
function SegmentedControl({
  options,
  selectedIndex,
  onChange,
  height = 36,
  disabled = false
}) {
  const tokens = (0, import_headless46.useTokens)();
  const { segmentedControl } = (0, import_headless46.useComponentTokens)();
  const { isSelected, setSelectedIndex, getTabProps } = (0, import_headless46.useSegmentedControl)({
    value: selectedIndex,
    onChange: (val) => onChange(val),
    disabled
  });
  const [containerWidth, setContainerWidth] = (0, import_react46.useState)(0);
  const segmentWidth = containerWidth / options.length;
  const translateX = (0, import_react_native_reanimated17.useSharedValue)(selectedIndex * segmentWidth);
  import_react46.default.useEffect(() => {
    if (segmentWidth > 0) {
      translateX.value = (0, import_react_native_reanimated17.withSpring)(selectedIndex * segmentWidth, import_tokens4.spring.snappy);
    }
  }, [selectedIndex, segmentWidth, translateX]);
  const onLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };
  const indicatorStyle = (0, import_react_native_reanimated17.useAnimatedStyle)(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth
  }));
  return /* @__PURE__ */ import_react46.default.createElement(
    import_react_native45.View,
    {
      onLayout,
      style: [
        segmentedControl.container,
        { height, borderRadius: height / 2, opacity: disabled ? 0.6 : 1 }
      ]
    },
    containerWidth > 0 && /* @__PURE__ */ import_react46.default.createElement(
      import_react_native_reanimated17.default.View,
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
      return /* @__PURE__ */ import_react46.default.createElement(
        import_react_native45.Pressable,
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
        /* @__PURE__ */ import_react46.default.createElement(
          import_react_native45.Text,
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
var import_react47 = __toESM(require("react"));
var import_react_native46 = require("react-native");
var import_headless47 = require("@truongdq01/headless");
function Select({
  label,
  placeholder = "Select\u2026",
  searchable = false,
  error,
  onClearError,
  options,
  ...hookOptions
}) {
  const { select } = (0, import_headless47.useComponentTokens)();
  const tokens = (0, import_headless47.useTokens)();
  const sheetRef = (0, import_react47.useRef)(null);
  const [query, setQuery] = (0, import_react47.useState)("");
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel
  } = (0, import_headless47.useSelect)({ options, ...hookOptions, placeholder });
  const hasSelection = displayLabel !== placeholder;
  const filtered = (0, import_react47.useMemo)(() => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(lowerQuery)
    );
  }, [options, query]);
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
  return /* @__PURE__ */ import_react47.default.createElement(import_react_native46.View, null, label && /* @__PURE__ */ import_react47.default.createElement(import_react_native46.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ import_react47.default.createElement(
    import_react_native46.Pressable,
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
    /* @__PURE__ */ import_react47.default.createElement(
      import_react_native46.Text,
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
    /* @__PURE__ */ import_react47.default.createElement(Icon, { size: 16, color: tokens.color.text.tertiary }, isOpen ? "chevronUp" : "chevronDown")
  ), error && /* @__PURE__ */ import_react47.default.createElement(import_react_native46.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ import_react47.default.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ import_react47.default.createElement(import_react_native46.View, { style: { flex: 1, paddingHorizontal: tokens.spacing[4] } }, searchable && isOpen && /* @__PURE__ */ import_react47.default.createElement(
      import_react_native46.View,
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
      /* @__PURE__ */ import_react47.default.createElement(import_react_native46.View, { style: { marginRight: 8 } }, /* @__PURE__ */ import_react47.default.createElement(Icon, { size: 20, color: tokens.color.text.tertiary, name: "search" })),
      /* @__PURE__ */ import_react47.default.createElement(
        import_react_native46.TextInput,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search\u2026",
          placeholderTextColor: tokens.color.text.tertiary,
          style: { flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" },
          autoFocus: true
        }
      ),
      query.length > 0 && /* @__PURE__ */ import_react47.default.createElement(import_react_native46.Pressable, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ import_react47.default.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" }))
    ), /* @__PURE__ */ import_react47.default.createElement(import_react_native46.ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled" }, filtered.length === 0 ? /* @__PURE__ */ import_react47.default.createElement(import_react_native46.Text, { style: { color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] } }, 'No results for "', query, '"') : filtered.map((option) => {
      const selected = isSelected(option.value);
      return /* @__PURE__ */ import_react47.default.createElement(
        import_react_native46.Pressable,
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
        /* @__PURE__ */ import_react47.default.createElement(
          import_react_native46.Text,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? select.option.selected.color : select.option.default.color,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ import_react47.default.createElement(Icon, { size: 16, color: select.option.selected.color, name: "check" })
      );
    }), /* @__PURE__ */ import_react47.default.createElement(import_react_native46.View, { style: { height: tokens.spacing[4] } })))
  ));
}

// src/components/Skeleton/Skeleton.tsx
var import_react48 = __toESM(require("react"));
var import_react_native47 = require("react-native");
var import_react_native_reanimated18 = __toESM(require("react-native-reanimated"));
var import_headless48 = require("@truongdq01/headless");
function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true
}) {
  const tokens = (0, import_headless48.useTokens)();
  const { skeleton } = (0, import_headless48.useComponentTokens)();
  const shimmer = (0, import_react_native_reanimated18.useSharedValue)(0);
  (0, import_react48.useEffect)(() => {
    if (!animate) return;
    shimmer.value = (0, import_react_native_reanimated18.withRepeat)(
      (0, import_react_native_reanimated18.withTiming)(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);
  const animatedStyle = (0, import_react_native_reanimated18.useAnimatedStyle)(() => ({
    opacity: (0, import_react_native_reanimated18.interpolate)(shimmer.value, [0, 1], [skeleton.opacity.start, skeleton.opacity.end])
  }));
  return /* @__PURE__ */ import_react48.default.createElement(
    import_react_native_reanimated18.default.View,
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
  const tokens = (0, import_headless48.useTokens)();
  return /* @__PURE__ */ import_react48.default.createElement(import_react_native47.View, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ import_react48.default.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14
    }
  )));
}
function SkeletonCard() {
  const tokens = (0, import_headless48.useTokens)();
  return /* @__PURE__ */ import_react48.default.createElement(
    import_react_native47.View,
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
    /* @__PURE__ */ import_react48.default.createElement(import_react_native47.View, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ import_react48.default.createElement(import_react_native47.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ import_react48.default.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: "40%", height: 32, borderRadius: tokens.radius.md })
  );
}
function SkeletonListItem() {
  const tokens = (0, import_headless48.useTokens)();
  return /* @__PURE__ */ import_react48.default.createElement(
    import_react_native47.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ import_react48.default.createElement(import_react_native47.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ import_react48.default.createElement(Skeleton, { width: 24, height: 14 })
  );
}

// src/components/Slider/Slider.tsx
var import_react49 = __toESM(require("react"));
var import_react_native48 = require("react-native");
var import_react_native_reanimated19 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler7 = require("react-native-gesture-handler");
var import_headless49 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless49.useTokens)();
  const { slider } = (0, import_headless49.useComponentTokens)();
  const {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage
  } = (0, import_headless49.useSlider)({ min, max, step, ...hookOptions });
  const marks = showMarks && step > 0 ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min) : [];
  return /* @__PURE__ */ import_react49.default.createElement(import_react_native48.View, { style: { opacity: hookOptions.disabled ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ import_react49.default.createElement(import_react_native48.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ import_react49.default.createElement(import_react_native48.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ import_react49.default.createElement(import_react_native48.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default } }, formatValue(currentValue))), /* @__PURE__ */ import_react49.default.createElement(import_react_native_reanimated19.default.View, { style: [{ paddingVertical: 12 }, trackAnimatedStyle] }, /* @__PURE__ */ import_react49.default.createElement(import_react_native_gesture_handler7.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ import_react49.default.createElement(
    import_react_native48.View,
    {
      style: { height: slider.thumb.height, justifyContent: "center" },
      onLayout: (e) => onTrackLayout(e.nativeEvent.layout.width)
    },
    /* @__PURE__ */ import_react49.default.createElement(
      import_react_native48.View,
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
      /* @__PURE__ */ import_react49.default.createElement(
        import_react_native_reanimated19.default.View,
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
      return /* @__PURE__ */ import_react49.default.createElement(
        import_react_native48.View,
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
    /* @__PURE__ */ import_react49.default.createElement(
      import_react_native_reanimated19.default.View,
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
            shadowColor: slider.thumb.shadowColor,
            shadowOffset: slider.thumb.shadowOffset,
            shadowOpacity: slider.thumb.shadowOpacity,
            shadowRadius: slider.thumb.shadowRadius,
            elevation: slider.thumb.elevation
          },
          thumbAnimatedStyle
        ]
      }
    )
  ))), showRange && /* @__PURE__ */ import_react49.default.createElement(import_react_native48.View, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ import_react49.default.createElement(import_react_native48.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ import_react49.default.createElement(import_react_native48.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}

// src/components/Snackbar/Snackbar.tsx
var import_react50 = __toESM(require("react"));
var import_react_native49 = require("react-native");
var import_react_native_reanimated20 = __toESM(require("react-native-reanimated"));
var import_headless50 = require("@truongdq01/headless");
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const { snackbar } = (0, import_headless50.useComponentTokens)();
  const tokens = (0, import_headless50.useTokens)();
  const [mounted, setMounted] = import_react50.default.useState(open);
  const isBottom = anchorOrigin.vertical === "bottom";
  const translateY = (0, import_react_native_reanimated20.useSharedValue)(isBottom ? 100 : -100);
  const opacity = (0, import_react_native_reanimated20.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated20.useSharedValue)(0.95);
  const animateIn = () => {
    translateY.value = (0, import_react_native_reanimated20.withSpring)(0, { damping: 25, stiffness: 300, mass: 1 });
    opacity.value = (0, import_react_native_reanimated20.withTiming)(1, { duration: 200 });
    scale.value = (0, import_react_native_reanimated20.withSpring)(1, { damping: 25, stiffness: 300 });
  };
  const animateOut = (onDone) => {
    translateY.value = (0, import_react_native_reanimated20.withTiming)(isBottom ? 100 : -100, { duration: 200 });
    opacity.value = (0, import_react_native_reanimated20.withTiming)(0, { duration: 150 }, (done) => {
      if (done) (0, import_react_native_reanimated20.runOnJS)(onDone)();
    });
  };
  (0, import_react50.useEffect)(() => {
    if (open) {
      setMounted(true);
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  (0, import_react50.useEffect)(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = (0, import_react50.useMemo)(() => {
    if (anchorOrigin.horizontal === "center") return { alignSelf: "center" };
    if (anchorOrigin.horizontal === "left") return { left: 16 };
    return { right: 16 };
  }, [anchorOrigin.horizontal]);
  const animStyle = (0, import_react_native_reanimated20.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  if (!mounted && !open) return null;
  return /* @__PURE__ */ import_react50.default.createElement(import_react_native49.Modal, { visible: mounted || open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react50.default.createElement(import_react_native49.View, { pointerEvents: "box-none", style: styles11.overlay }, /* @__PURE__ */ import_react50.default.createElement(
    import_react_native_reanimated20.default.View,
    {
      style: [
        snackbar.container,
        verticalStyle,
        horizontalStyle,
        animStyle,
        { position: "absolute" }
      ]
    },
    /* @__PURE__ */ import_react50.default.createElement(import_react_native49.Text, { style: [snackbar.text, { flex: 1 }] }, message),
    action,
    onClose && /* @__PURE__ */ import_react50.default.createElement(import_react_native49.Pressable, { onPress: onClose, hitSlop: 8, style: { marginLeft: 8 } }, /* @__PURE__ */ import_react50.default.createElement(Icon, { size: 18, color: snackbar.text.color, name: "close" }))
  )));
}
var styles11 = import_react_native49.StyleSheet.create({
  overlay: {
    flex: 1
  }
});

// src/components/SpeedDial/SpeedDial.tsx
var import_react51 = __toESM(require("react"));
var import_react_native50 = require("react-native");
var import_headless51 = require("@truongdq01/headless");
var SpeedDialContext = (0, import_react51.createContext)(null);
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
  const { speedDial } = (0, import_headless51.useComponentTokens)();
  const disclosure = (0, import_headless51.useDisclosure)({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = (0, import_headless51.useTokens)();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  const ctxValue = (0, import_react51.useMemo)(() => ({ isOpen: disclosure.isOpen, close: disclosure.close }), [disclosure.isOpen, disclosure.close]);
  return /* @__PURE__ */ import_react51.default.createElement(SpeedDialContext.Provider, { value: ctxValue }, /* @__PURE__ */ import_react51.default.createElement(import_react_native50.View, { style: [speedDial.container, stackStyle] }, disclosure.isOpen && children, /* @__PURE__ */ import_react51.default.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const { speedDial } = (0, import_headless51.useComponentTokens)();
  const tokens = (0, import_headless51.useTokens)();
  const ctx = (0, import_react51.useContext)(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ import_react51.default.createElement(
    import_react_native50.Pressable,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: speedDial.action
    },
    /* @__PURE__ */ import_react51.default.createElement(
      import_react_native50.View,
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
    tooltipTitle && /* @__PURE__ */ import_react51.default.createElement(import_react_native50.Text, { style: speedDial.action.tooltip }, tooltipTitle)
  );
}

// src/components/Stack/Stack.tsx
var import_react52 = __toESM(require("react"));
var import_react_native51 = require("react-native");
var import_headless52 = require("@truongdq01/headless");
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
  const { stack } = (0, import_headless52.useComponentTokens)();
  const gap = typeof spacing === "number" ? spacing : stack.gap[spacing];
  const items = import_react52.default.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ import_react52.default.createElement(
    import_react_native51.View,
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
var import_react53 = __toESM(require("react"));
var import_react_native52 = require("react-native");
var import_headless53 = require("@truongdq01/headless");
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const { stepper } = (0, import_headless53.useComponentTokens)();
  const items = import_react53.default.Children.toArray(children);
  return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.View, { style: [stepper.container, { flexDirection: orientation === "horizontal" ? "row" : "column" }] }, items.map((child) => {
    if (!import_react53.default.isValidElement(child)) return child;
    return import_react53.default.cloneElement(child, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }) {
  const { stepper } = (0, import_headless53.useComponentTokens)();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  const color = isCompleted ? stepper.step.completed.color : isActive ? stepper.step.active.color : stepper.step.pending.color;
  return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.View, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: 8, alignItems: "center" } }, /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.View,
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
    isCompleted ? /* @__PURE__ */ import_react53.default.createElement(Icon, { size: 14, color: stepper.step.completed.color, name: "check" }) : /* @__PURE__ */ import_react53.default.createElement(import_react_native52.Text, { style: { fontSize: 12, fontWeight: "600", color: isActive ? color : color } }, index + 1)
  ), label && /* @__PURE__ */ import_react53.default.createElement(import_react_native52.Text, { style: { color: isActive ? stepper.step.active.color : stepper.step.pending.color, fontSize: 14 } }, label), children);
}
function StepLabel({ children, style }) {
  const { stepper } = (0, import_headless53.useComponentTokens)();
  return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.Text, { style: [{ color: stepper.step.pending.color, fontSize: 14 }, style] }, children);
}

// src/components/Switch/Switch.tsx
var import_react54 = __toESM(require("react"));
var import_react_native53 = require("react-native");
var import_react_native_reanimated21 = __toESM(require("react-native-reanimated"));
var import_headless54 = require("@truongdq01/headless");
var import_tokens5 = require("@truongdq01/tokens");
var Switch = import_react54.default.memo(({ label, description, size = "md", ...hookOptions }) => {
  const tokens = (0, import_headless54.useTokens)();
  const { switch: switchT } = (0, import_headless54.useComponentTokens)();
  const { isOn, isDisabled, toggle, accessibilityProps } = (0, import_headless54.useSwitch)(hookOptions);
  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = tTrack.width - tThumb.width - tTrack.padding * 2;
  const progress = (0, import_react_native_reanimated21.useSharedValue)(isOn ? 1 : 0);
  import_react54.default.useEffect(() => {
    progress.value = (0, import_react_native_reanimated21.withSpring)(isOn ? 1 : 0, import_tokens5.spring.snappy);
  }, [isOn]);
  const trackStyle = (0, import_react_native_reanimated21.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated21.interpolateColor)(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    )
  }));
  const thumbStyle = (0, import_react_native_reanimated21.useAnimatedStyle)(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ import_react54.default.createElement(
    import_react_native53.Pressable,
    {
      onPress: toggle,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? switchT.colors.disabledOpacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react54.default.createElement(
      import_react_native_reanimated21.default.View,
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
      /* @__PURE__ */ import_react54.default.createElement(
        import_react_native_reanimated21.default.View,
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
    (label || description) && /* @__PURE__ */ import_react54.default.createElement(import_react_native53.View, { style: { flex: 1 } }, label && /* @__PURE__ */ import_react54.default.createElement(import_react_native53.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ import_react54.default.createElement(import_react_native53.Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
});

// src/components/Table/Table.tsx
var import_react55 = __toESM(require("react"));
var import_react_native54 = require("react-native");
var import_headless55 = require("@truongdq01/headless");
var TableContext = (0, import_react55.createContext)(null);
function useTableContext() {
  return (0, import_react55.useContext)(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = (0, import_react55.useMemo)(() => ({ size, padding, stickyHeader }), [size, padding, stickyHeader]);
  return /* @__PURE__ */ import_react55.default.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style }, children));
}
function TableContainer({ children, style }) {
  const { table } = (0, import_headless55.useComponentTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.ScrollView,
    {
      horizontal: true,
      style: [
        table.container,
        style
      ]
    },
    /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const { table } = (0, import_headless55.useComponentTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: table.header }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, null, children);
}
function TableFooter({ children }) {
  const { table } = (0, import_headless55.useComponentTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { borderTopWidth: 1, borderTopColor: table.container.borderColor } }, children);
}
function TableRow({ children, selected = false, style }) {
  const { table } = (0, import_headless55.useComponentTokens)();
  const tokens = (0, import_headless55.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.View,
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
  const { table } = (0, import_headless55.useComponentTokens)();
  const ctx = useTableContext();
  const tokens = (0, import_headless55.useTokens)();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const paddingX = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const paddingY = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: [{ paddingHorizontal: paddingX, paddingVertical: paddingY, flexShrink: 0 }, style] }, /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.Text,
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
  const tokens = (0, import_headless55.useTokens)();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react55.default.createElement(import_react_native54.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react55.default.createElement(import_react_native54.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ import_react55.default.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1)),
        startIcon: /* @__PURE__ */ import_react55.default.createElement(Icon, { size: 16, name: "chevronLeft" })
      },
      "Prev"
    ), /* @__PURE__ */ import_react55.default.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page >= totalPages - 1,
        onPress: () => onPageChange?.(Math.min(totalPages - 1, page + 1)),
        endIcon: /* @__PURE__ */ import_react55.default.createElement(Icon, { size: 16, name: "chevronRight" })
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
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.Pressable, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ import_react55.default.createElement(import_react_native54.Text, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), active ? /* @__PURE__ */ import_react55.default.createElement(Icon, { size: 14, color: tokens.color.text.primary }, direction === "asc" ? "arrowUp" : "arrowDown") : /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { width: 14 } }));
}

// src/components/Tabs/Tabs.tsx
var import_react56 = __toESM(require("react"));
var import_react_native55 = require("react-native");
var import_react_native_reanimated22 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler8 = require("react-native-gesture-handler");
var import_headless56 = require("@truongdq01/headless");
var TabsContext = (0, import_react56.createContext)(null);
function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children
}) {
  const { tabs } = (0, import_headless56.useComponentTokens)();
  const { getTabProps, isSelected } = (0, import_headless56.useTabs)({ value, defaultValue, onChange });
  return /* @__PURE__ */ import_react56.default.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ import_react56.default.createElement(
    import_react_native55.View,
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
  const { tabs } = (0, import_headless56.useComponentTokens)();
  const tokens = (0, import_headless56.useTokens)();
  const ctx = (0, import_react56.useContext)(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless56.usePressable)({
    onPress: () => ctx.getTabProps(value, disabled).onPress(),
    disabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "tab"
  });
  return /* @__PURE__ */ import_react56.default.createElement(import_react_native_gesture_handler8.GestureDetector, { gesture }, /* @__PURE__ */ import_react56.default.createElement(
    import_react_native_reanimated22.default.View,
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
    label && /* @__PURE__ */ import_react56.default.createElement(
      import_react_native55.Text,
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
var import_react57 = __toESM(require("react"));
var import_react_native56 = require("react-native");
var import_headless57 = require("@truongdq01/headless");
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
  const { textArea } = (0, import_headless57.useComponentTokens)();
  const tokens = (0, import_headless57.useTokens)();
  const [isFocused, setIsFocused] = (0, import_react57.useState)(false);
  const [contentHeight, setContentHeight] = (0, import_react57.useState)(0);
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
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, null, (label || maxLength) && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] } }, label && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: textArea.label }, label), maxLength && /* @__PURE__ */ import_react57.default.createElement(
    import_react_native56.Text,
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
  )), /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: containerStyle }, /* @__PURE__ */ import_react57.default.createElement(
    import_react_native56.TextInput,
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
  )), error ? /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: textArea.errorText }, error) : helperText ? /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: textArea.helperText }, helperText) : null);
}

// src/components/TextField/TextField.tsx
var import_react58 = __toESM(require("react"));
var import_react_native57 = require("react-native");
var import_headless58 = require("@truongdq01/headless");
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
  const { textField } = (0, import_headless58.useComponentTokens)();
  const [showPassword, setShowPassword] = (0, import_react58.useState)(false);
  const isPassword = type === "password";
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  const trailingElement = isPassword ? /* @__PURE__ */ import_react58.default.createElement(
    import_react_native57.Pressable,
    {
      onPress: () => setShowPassword(!showPassword),
      style: { padding: 4 },
      hitSlop: 8
    },
    /* @__PURE__ */ import_react58.default.createElement(Icon, { size: 20, color: textField.text.placeholderColor }, showPassword ? "eyeOff" : "eye")
  ) : rest.trailingElement;
  if (select) {
    return /* @__PURE__ */ import_react58.default.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ import_react58.default.createElement(
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
  return /* @__PURE__ */ import_react58.default.createElement(
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
var import_react59 = __toESM(require("react"));
var import_react_native58 = require("react-native");
var import_headless59 = require("@truongdq01/headless");
var TimelineContext = (0, import_react59.createContext)(null);
function useTimelineContext() {
  return (0, import_react59.useContext)(TimelineContext);
}
function Timeline({ position = "right", itemVariant = "filled", children }) {
  const { timeline } = (0, import_headless59.useComponentTokens)();
  return /* @__PURE__ */ import_react59.default.createElement(TimelineContext.Provider, { value: { position, itemVariant } }, /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: timeline.content }, import_react59.default.Children.map(children, (child, index) => {
    if (!import_react59.default.isValidElement(child)) return child;
    if (position === "alternate" || position === "alternate-reverse") {
      const isEven = index % 2 === 0;
      const derived = position === "alternate" ? isEven ? "right" : "left" : isEven ? "left" : "right";
      return import_react59.default.cloneElement(child, { position: child.props.position ?? derived, variant: itemVariant });
    }
    return import_react59.default.cloneElement(child, { variant: itemVariant });
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
  const { timeline } = (0, import_headless59.useComponentTokens)();
  const connectorColor = status === "completed" ? timeline.dot.completed.borderColor : timeline.connector.color;
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { alignItems: "center", width: 48, paddingHorizontal: 8 } }, children || /* @__PURE__ */ import_react59.default.createElement(import_react59.default.Fragment, null, /* @__PURE__ */ import_react59.default.createElement(
    TimelineDot,
    {
      variant,
      status
    }
  ), /* @__PURE__ */ import_react59.default.createElement(TimelineConnector, { color: connectorColor })));
}
function TimelineDot({ variant = "filled", color = "primary", status, size }) {
  const { timeline } = (0, import_headless59.useComponentTokens)();
  const tokens = (0, import_headless59.useTokens)();
  const resolvedStatus = status || (color === "success" ? "completed" : color === "error" ? "error" : color === "primary" ? "active" : "pending");
  const statusTokens = timeline.dot[resolvedStatus] || timeline.dot.pending;
  const dotSize = size || timeline.dot.size || 16;
  return /* @__PURE__ */ import_react59.default.createElement(
    import_react_native58.View,
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
  const { timeline } = (0, import_headless59.useComponentTokens)();
  const resolvedWidth = width || timeline.connector.width;
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { width: resolvedWidth, flex: 1, backgroundColor: color || timeline.connector.color, marginVertical: 4, borderRadius: resolvedWidth } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ import_react59.default.createElement(import_react_native58.Text, null, children) : children);
}

// src/components/Toast/ToastContainer.tsx
var import_react61 = __toESM(require("react"));
var import_react_native60 = require("react-native");
var import_react_native_safe_area_context2 = require("react-native-safe-area-context");
var import_headless61 = require("@truongdq01/headless");

// src/components/Toast/ToastItem.tsx
var import_react60 = __toESM(require("react"));
var import_react_native_reanimated23 = __toESM(require("react-native-reanimated"));
var import_react_native59 = require("react-native");
var import_headless60 = require("@truongdq01/headless");
function ToastItem({ item, position, onDismiss }) {
  const { toast } = (0, import_headless60.useComponentTokens)();
  const tokens = (0, import_headless60.useTokens)();
  const progress = (0, import_react_native_reanimated23.useSharedValue)(1);
  (0, import_react60.useEffect)(() => {
    if (item.persistent) return;
    progress.value = (0, import_react_native_reanimated23.withTiming)(0, { duration: item.duration }, (finished) => {
      if (finished) (0, import_react_native_reanimated23.runOnJS)(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = (0, import_react_native_reanimated23.useAnimatedStyle)(() => ({
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
  const entering = position === "top" ? import_react_native_reanimated23.FadeInDown.springify().damping(18).stiffness(280) : import_react_native_reanimated23.FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? import_react_native_reanimated23.FadeOutUp.duration(200) : import_react_native_reanimated23.FadeOutDown.duration(200);
  return /* @__PURE__ */ import_react60.default.createElement(
    import_react_native_reanimated23.default.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ import_react60.default.createElement(import_react_native59.View, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, import_react60.default.isValidElement(item.icon) ? import_react60.default.cloneElement(item.icon, {
      size: item.icon.props.size ?? 20,
      color: item.icon.props.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ import_react60.default.createElement(Icon, { size: 20, color: v.iconColor, name: "VARIANT_ICONS[item.variant]" }),
    /* @__PURE__ */ import_react60.default.createElement(import_react_native59.Text, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ import_react60.default.createElement(
      import_react_native59.Pressable,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ import_react60.default.createElement(import_react_native59.Text, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ import_react60.default.createElement(import_react_native59.Pressable, { onPress: () => onDismiss(item.id), hitSlop: 8 }, /* @__PURE__ */ import_react60.default.createElement(Icon, { size: 18, color: tokens.color.text.inverse, name: "close" })),
    !item.persistent && /* @__PURE__ */ import_react60.default.createElement(import_react_native59.View, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ import_react60.default.createElement(import_react_native_reanimated23.default.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = (0, import_headless61.useToast)();
  const insets = (0, import_react_native_safe_area_context2.useSafeAreaInsets)();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ import_react61.default.createElement(import_react_native60.View, { style: [styles12.container, positionStyle], pointerEvents: "box-none" }, toasts.map((item) => /* @__PURE__ */ import_react61.default.createElement(
    ToastItem,
    {
      key: item.id,
      item,
      position,
      onDismiss: import_headless61.dismissToast
    }
  )));
}
var styles12 = import_react_native60.StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999
  }
});

// src/components/ToggleButton/ToggleButton.tsx
var import_react62 = __toESM(require("react"));
var import_react_native61 = require("react-native");
var import_react_native_reanimated24 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler9 = require("react-native-gesture-handler");
var import_headless62 = require("@truongdq01/headless");
var ToggleContext = (0, import_react62.createContext)(null);
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
  const { isSelected, toggle } = (0, import_headless62.useToggleGroup)({
    value,
    defaultValue,
    exclusive,
    disabled,
    onChange
  });
  return /* @__PURE__ */ import_react62.default.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ import_react62.default.createElement(import_react_native61.View, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const { toggleButton } = (0, import_headless62.useComponentTokens)();
  const tokens = (0, import_headless62.useTokens)();
  const ctx = (0, import_react62.useContext)(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless62.usePressable)({
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
  return /* @__PURE__ */ import_react62.default.createElement(import_react_native_gesture_handler9.GestureDetector, { gesture }, /* @__PURE__ */ import_react62.default.createElement(
    import_react_native_reanimated24.default.View,
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
    /* @__PURE__ */ import_react62.default.createElement(
      import_react_native61.Text,
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
var import_react63 = __toESM(require("react"));
var import_react_native62 = require("react-native");
var import_react_native_reanimated25 = __toESM(require("react-native-reanimated"));
var import_headless63 = require("@truongdq01/headless");
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const { tooltip } = (0, import_headless63.useComponentTokens)();
  const tokens = (0, import_headless63.useTokens)();
  const [internalOpen, setInternalOpen] = (0, import_react63.useState)(false);
  const { width: windowWidth, height: windowHeight } = (0, import_react_native62.useWindowDimensions)();
  const [triggerRect, setTriggerRect] = (0, import_react63.useState)(null);
  const [tooltipSize, setTooltipSize] = (0, import_react63.useState)({ width: 0, height: 0 });
  const triggerRef = import_react63.default.useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const opacity = (0, import_react_native_reanimated25.useSharedValue)(0);
  const animateIn = (0, import_react63.useCallback)(() => {
    opacity.value = (0, import_react_native_reanimated25.withTiming)(1, { duration: 150 });
  }, []);
  const animateOut = (0, import_react63.useCallback)((onDone) => {
    opacity.value = (0, import_react_native_reanimated25.withTiming)(0, { duration: 100 }, () => {
      (0, import_react_native_reanimated25.runOnJS)(onDone)();
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
  const animStyle = (0, import_react_native_reanimated25.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ import_react63.default.createElement(import_react63.default.Fragment, null, /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.Pressable,
    {
      ref: triggerRef,
      onPress: handleOpen,
      onLongPress: handleOpen,
      delayLongPress: 400
    },
    children
  ), /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.Modal,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ import_react63.default.createElement(
      import_react_native62.Pressable,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ import_react63.default.createElement(
        import_react_native_reanimated25.default.View,
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
        typeof title === "string" ? /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: tooltip.text }, title) : title
      )
    )
  ));
}

// src/components/Typography/Typography.tsx
var import_react64 = __toESM(require("react"));
var import_react_native63 = require("react-native");
var import_headless64 = require("@truongdq01/headless");
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
  const { typography } = (0, import_headless64.useComponentTokens)();
  const tokens = (0, import_headless64.useTokens)();
  const variantStyle = variant === "inherit" ? {} : typography.variants[variant] || {};
  const resolvedColor = color && typography.colors[color] ? typography.colors[color] : color || typography.colors.primary;
  const resolvedDisplay = display === "block" || display === "inline" || display === "inline-flex" ? "flex" : display;
  return /* @__PURE__ */ import_react64.default.createElement(
    import_react_native63.Text,
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
var import_react_native64 = require("react-native");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  ICON_MAP,
  Icon,
  IconWrapper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  LinearProgress,
  Link,
  List,
  ListData,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  StyleSheet,
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
  useComponentTokens,
  useFormControl,
  useIsDark,
  useTheme,
  useTokens
});
//# sourceMappingURL=index.js.map