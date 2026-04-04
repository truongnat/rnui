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
  CalendarGrid: () => CalendarGrid,
  Card: () => Card,
  Carousel: () => Carousel,
  ChatListItem: () => ChatListItem,
  Checkbox: () => Checkbox,
  Chip: () => Chip,
  CircularProgress: () => CircularProgress,
  DatePicker: () => DatePicker,
  Dialog: () => Dialog,
  Divider: () => Divider,
  Drawer: () => Drawer,
  EmptyState: () => EmptyState,
  Fab: () => Fab,
  Form: () => Form,
  FormControl: () => FormControl,
  FormControlLabel: () => FormControlLabel,
  FormField: () => FormField,
  FormGroup: () => FormGroup,
  FormHelperText: () => FormHelperText,
  FormLabel: () => FormLabel,
  GlassCard: () => GlassCard,
  Gradient: () => Gradient,
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
  Marquee: () => Marquee,
  Menu: () => Menu2,
  MenuItem: () => MenuItem,
  MessageInput: () => MessageInput,
  Modal: () => Modal7,
  OTPInput: () => OTPInput,
  Pagination: () => Pagination,
  Paper: () => Paper,
  PasswordInput: () => PasswordInput,
  Popover: () => Popover,
  Popper: () => Popper,
  Pressable: () => Pressable20,
  RadioGroup: () => RadioGroup,
  RadioItem: () => RadioItem,
  Rating: () => Rating,
  RnImage: () => RnImage,
  SegmentedControl: () => SegmentedControl,
  Select: () => Select,
  Skeleton: () => Skeleton,
  SkeletonCard: () => SkeletonCard,
  SkeletonForm: () => SkeletonForm,
  SkeletonGrid: () => SkeletonGrid,
  SkeletonGroup: () => SkeletonGroup,
  SkeletonListItem: () => SkeletonListItem,
  SkeletonMedia: () => SkeletonMedia,
  SkeletonProfile: () => SkeletonProfile,
  SkeletonTable: () => SkeletonTable,
  SkeletonText: () => SkeletonText,
  Slider: () => Slider,
  Snackbar: () => Snackbar,
  SpeedDial: () => SpeedDial,
  SpeedDialAction: () => SpeedDialAction,
  Stack: () => Stack,
  Step: () => Step,
  StepLabel: () => StepLabel,
  Stepper: () => Stepper,
  StyleSheet: () => import_react_native78.StyleSheet,
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
  TelegramContextMenu: () => TelegramContextMenu,
  TelegramPopup: () => TelegramPopup,
  TelegramSettingsMenu: () => TelegramSettingsMenu,
  TelegramTab: () => TelegramTab,
  TelegramTabBar: () => TelegramTabBar,
  TextArea: () => TextArea,
  TextField: () => TextField,
  ThemeProvider: () => import_headless76.ThemeProvider,
  TimePickerWheels: () => TimePickerWheels,
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
  createTheme: () => import_headless76.createTheme,
  useActiveBrand: () => import_headless76.useActiveBrand,
  useBrandSwitch: () => import_headless76.useBrandSwitch,
  useComponentTokens: () => import_headless76.useComponentTokens,
  useForm: () => useForm,
  useFormControl: () => useFormControl,
  useIsDark: () => import_headless76.useIsDark,
  useTheme: () => import_headless76.useTheme,
  useTokens: () => import_headless76.useTokens
});
module.exports = __toCommonJS(index_exports);
var import_headless76 = require("@truongdq01/headless");

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
  const resolvedColor = color && color in iconTokens.color ? iconTokens.color[color] : color ?? tokens.color.text.primary;
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
  const reduceMotion = (0, import_headless2.useReduceMotionEnabled)();
  const rotation = (0, import_react_native_reanimated.useSharedValue)(ctx.expanded ? 1 : 0);
  import_react2.default.useEffect(() => {
    const target = ctx.expanded ? 1 : 0;
    rotation.value = reduceMotion ? target : (0, import_react_native_reanimated.withTiming)(target, { duration: 200 });
  }, [ctx.expanded, reduceMotion]);
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
      ...accessibilityProps,
      accessibilityState: { expanded: ctx.expanded }
    },
    /* @__PURE__ */ import_react2.default.createElement(import_react_native2.Text, { style: accordion.title }, children),
    /* @__PURE__ */ import_react2.default.createElement(import_react_native_reanimated.default.View, { style: iconStyle }, expandIcon ?? /* @__PURE__ */ import_react2.default.createElement(Icon, { size: accordion.icon.size, color: accordion.icon.color, name: "chevronDown" }))
  ));
}
function AccordionDetails({ children }) {
  const { accordion } = (0, import_headless2.useComponentTokens)();
  const ctx = (0, import_react2.useContext)(AccordionContext);
  const reduceMotion = (0, import_headless2.useReduceMotionEnabled)();
  const [contentHeight, setContentHeight] = import_react2.default.useState(0);
  const animHeight = (0, import_react_native_reanimated.useSharedValue)(0);
  import_react2.default.useEffect(() => {
    if (!ctx) return;
    const target = ctx.expanded ? contentHeight : 0;
    animHeight.value = reduceMotion ? target : (0, import_react_native_reanimated.withTiming)(target, { duration: 250 });
  }, [ctx?.expanded, contentHeight, reduceMotion]);
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
var import_react_native5 = require("react-native");
var import_react_native_reanimated2 = __toESM(require("react-native-reanimated"));
var import_headless4 = require("@truongdq01/headless");
var ReanimatedListImpl = import_react_native_reanimated2.default.createAnimatedComponent(import_react_native5.FlatList);
function AnimatedListInner({
  data,
  renderItem,
  itemEntering = import_react_native_reanimated2.FadeInDown,
  itemExiting,
  itemLayout = import_react_native_reanimated2.Layout.springify().damping(16).stiffness(150),
  staggerEntering = false,
  staggerDelay = 50,
  itemContainerStyle,
  ...flashListProps
}, ref) {
  const { animatedList } = (0, import_headless4.useComponentTokens)();
  const reduceMotion = (0, import_headless4.useReduceMotionEnabled)();
  const effectiveEntering = reduceMotion ? void 0 : itemEntering;
  const effectiveExiting = reduceMotion ? void 0 : itemExiting;
  const effectiveLayout = reduceMotion ? void 0 : itemLayout;
  const ListImpl = (0, import_react4.useMemo)(() => {
    try {
      const mod = require("@shopify/flash-list");
      const Impl = mod?.FlashList ?? import_react_native5.FlatList;
      return import_react_native_reanimated2.default.createAnimatedComponent(Impl);
    } catch {
      return ReanimatedListImpl;
    }
  }, []);
  const AnimatedCell = (info) => {
    const { index } = info;
    const enteringAnim = staggerEntering && effectiveEntering?.delay ? effectiveEntering.delay(Math.min(index * staggerDelay, 500)) : effectiveEntering;
    return /* @__PURE__ */ import_react4.default.createElement(
      import_react_native_reanimated2.default.View,
      {
        entering: enteringAnim,
        exiting: effectiveExiting,
        layout: effectiveLayout,
        style: [animatedList.item, itemContainerStyle, styles.itemWrapper]
      },
      renderItem(info)
    );
  };
  return /* @__PURE__ */ import_react4.default.createElement(
    ListImpl,
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
}
var AnimatedList = (0, import_react4.forwardRef)(AnimatedListInner);
var styles = import_react_native4.StyleSheet.create({
  itemWrapper: {
    overflow: "hidden"
  }
});

// src/components/AppBar/AppBar.tsx
var import_react5 = __toESM(require("react"));
var import_react_native6 = require("react-native");
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
    import_react_native6.View,
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
    import_react_native6.View,
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
var import_react9 = __toESM(require("react"));
var import_react_native9 = require("react-native");
var import_react_native_reanimated5 = __toESM(require("react-native-reanimated"));
var import_headless7 = require("@truongdq01/headless");

// src/components/Input/Input.tsx
var import_react8 = __toESM(require("react"));
var import_react_native8 = require("react-native");
var import_react_native_reanimated4 = __toESM(require("react-native-reanimated"));
var import_headless6 = require("@truongdq01/headless");

// src/components/FormField/FormGroupContext.tsx
var import_react6 = __toESM(require("react"));
var FormGroupContext = import_react6.default.createContext("standard");
function useFormGroupVariant() {
  return import_react6.default.useContext(FormGroupContext);
}

// src/components/Input/AnimatedHelperText.tsx
var import_react7 = __toESM(require("react"));
var import_react_native7 = require("react-native");
var import_react_native_reanimated3 = __toESM(require("react-native-reanimated"));
function AnimatedHelperText({ text, isError, style }) {
  if (!text) return null;
  return /* @__PURE__ */ import_react7.default.createElement(import_react_native_reanimated3.default.View, { entering: import_react_native_reanimated3.FadeIn.duration(150), exiting: import_react_native_reanimated3.FadeOut.duration(100) }, /* @__PURE__ */ import_react7.default.createElement(
    import_react_native7.Text,
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
var AnimatedTextInput = import_react_native_reanimated4.default.createAnimatedComponent(import_react_native8.TextInput);
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
  const { input } = (0, import_headless6.useComponentTokens)();
  const tokens = (0, import_headless6.useTokens)();
  const { size: iconSize, color: iconColor } = (0, import_headless6.useIconStyle)("input");
  const formGroupVariant = useFormGroupVariant();
  const isGrouped = formGroupVariant === "grouped";
  const [isFocused, setIsFocused] = (0, import_react8.useState)(false);
  const [hasTyped, setHasTyped] = (0, import_react8.useState)(false);
  const [uncontrolledText, setUncontrolledText] = (0, import_react8.useState)(
    () => defaultValue !== void 0 && defaultValue !== null ? String(defaultValue) : ""
  );
  const hasValue = value !== void 0 && value !== null ? String(value).length > 0 : uncontrolledText.length > 0;
  const focusProgress = (0, import_react_native_reanimated4.useSharedValue)(0);
  const floatProgress = (0, import_react_native_reanimated4.useSharedValue)(0);
  const errorSv = (0, import_react_native_reanimated4.useSharedValue)(0);
  const disabledSv = (0, import_react_native_reanimated4.useSharedValue)(0);
  const groupedSv = (0, import_react_native_reanimated4.useSharedValue)(0);
  (0, import_react8.useEffect)(() => {
    errorSv.value = error ? 1 : 0;
  }, [error, errorSv]);
  (0, import_react8.useEffect)(() => {
    disabledSv.value = disabled ? 1 : 0;
  }, [disabled, disabledSv]);
  (0, import_react8.useEffect)(() => {
    groupedSv.value = isGrouped ? 1 : 0;
  }, [isGrouped, groupedSv]);
  (0, import_react8.useEffect)(() => {
    if (error || disabled) {
      focusProgress.value = 0;
      return;
    }
    focusProgress.value = (0, import_react_native_reanimated4.withTiming)(isFocused ? 1 : 0, { duration: FOCUS_MS });
  }, [isFocused, error, disabled, focusProgress]);
  (0, import_react8.useEffect)(() => {
    if (!floatingLabel || !label) return;
    floatProgress.value = (0, import_react_native_reanimated4.withTiming)(isFocused || hasValue ? 1 : 0, { duration: FOCUS_MS });
  }, [isFocused, hasValue, floatingLabel, label, floatProgress]);
  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;
  const errorBorder = tokens.color.border.error;
  const disabledBorder = tokens.color.border.default;
  const fl = input.floatingLabel;
  const animatedContainerStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => {
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
      borderColor: (0, import_react_native_reanimated4.interpolateColor)(focusProgress.value, [0, 1], [defaultBorder, focusBorder])
    };
  }, [defaultBorder, disabledBorder, errorBorder, focusBorder]);
  const floatingLabelStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => {
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
      top: (0, import_react_native_reanimated4.interpolate)(floatProgress.value, [0, 1], [16, 6]),
      transform: [{ translateY: (0, import_react_native_reanimated4.interpolate)(floatProgress.value, [0, 1], [ty0, ty1]) }],
      fontSize: (0, import_react_native_reanimated4.interpolate)(floatProgress.value, [0, 1], [inactiveFs, activeFs]),
      color: (0, import_react_native_reanimated4.interpolateColor)(floatProgress.value, [0, 1], [inactiveC, activeC]),
      pointerEvents: "none"
    };
  }, [floatingLabel, label, fl]);
  const animatedInputPadStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => {
    if (!floatingLabel || !label) {
      return {};
    }
    return {
      paddingTop: (0, import_react_native_reanimated4.interpolate)(floatProgress.value, [0, 1], [0, 12])
    };
  }, [floatingLabel, label]);
  const staticContainerStyle = (0, import_react8.useMemo)(() => {
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
    if (import_react8.default.isValidElement(icon)) {
      return import_react8.default.cloneElement(icon, {
        size: icon.props.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props.color ?? iconColor
      });
    }
    return icon;
  };
  const placeholderResolved = floatingLabel && label ? isFocused || hasValue ? placeholder ?? "" : "" : placeholder;
  const inner = /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, renderIcon(leadingElement), /* @__PURE__ */ import_react8.default.createElement(import_react_native8.View, { style: { flex: 1, position: "relative", justifyContent: "center" } }, floatingLabel && label ? /* @__PURE__ */ import_react8.default.createElement(import_react_native_reanimated4.default.Text, { style: floatingLabelStyle }, label) : null, /* @__PURE__ */ import_react8.default.createElement(
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
  return /* @__PURE__ */ import_react8.default.createElement(import_react_native8.View, null, label && !floatingLabel ? /* @__PURE__ */ import_react8.default.createElement(import_react_native8.Text, { style: input.label }, label) : null, /* @__PURE__ */ import_react8.default.createElement(import_react_native_reanimated4.default.View, { style: [staticContainerStyle, animatedContainerStyle] }, inner), error ? /* @__PURE__ */ import_react8.default.createElement(AnimatedHelperText, { text: error, isError: true, style: input.errorText }) : /* @__PURE__ */ import_react8.default.createElement(AnimatedHelperText, { text: helperText, isError: false, style: input.helperText }));
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
  const { width: windowWidth, height: windowHeight } = (0, import_react_native9.useWindowDimensions)();
  const inputRef = (0, import_react9.useRef)(null);
  const [inputRect, setInputRect] = (0, import_react9.useState)({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [dropdownMounted, setDropdownMounted] = (0, import_react9.useState)(false);
  const opacity = (0, import_react_native_reanimated5.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated5.useSharedValue)(0.95);
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
          opacity.value = (0, import_react_native_reanimated5.withTiming)(1, { duration: 160, easing: import_react_native_reanimated5.Easing.out(import_react_native_reanimated5.Easing.cubic) });
          scale.value = (0, import_react_native_reanimated5.withSpring)(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };
  const handleClose = () => {
    opacity.value = (0, import_react_native_reanimated5.withTiming)(0, { duration: 120 });
    scale.value = (0, import_react_native_reanimated5.withTiming)(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };
  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;
  const dropdownTop = showAbove ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP : inputRect.pageY + inputRect.height + GAP;
  const dropdownAnimStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ import_react9.default.createElement(import_react_native9.View, { ref: inputRef }, /* @__PURE__ */ import_react9.default.createElement(
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
  ), dropdownMounted && filteredOptions.length > 0 && /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Modal, { transparent: true, animationType: "none", visible: dropdownMounted, onRequestClose: handleClose }, /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Pressable, { style: { flex: 1 }, onPress: handleClose }), /* @__PURE__ */ import_react9.default.createElement(
    import_react_native_reanimated5.default.View,
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
      return /* @__PURE__ */ import_react9.default.createElement(
        import_react_native9.Pressable,
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
        renderOption ? renderOption(option, selected) : /* @__PURE__ */ import_react9.default.createElement(import_react_native9.Text, { style: { color: selected ? tokens.color.brand.text : tokens.color.text.primary } }, labelOf(option))
      );
    })
  )));
}

// src/components/Avatar/Avatar.tsx
var import_react10 = __toESM(require("react"));
var import_react_native10 = require("react-native");
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
  return /* @__PURE__ */ import_react10.default.createElement(
    import_react_native10.View,
    {
      style: [{ width: sizeConfig.width, height: sizeConfig.height }, style],
      accessible: !!accessibilityLabel,
      accessibilityLabel
    },
    src ? /* @__PURE__ */ import_react10.default.createElement(
      import_react_native10.Image,
      {
        source: { uri: src },
        style: { width: sizeConfig.width, height: sizeConfig.height, borderRadius: radius },
        accessibilityLabel
      }
    ) : initials ? /* @__PURE__ */ import_react10.default.createElement(
      import_react_native10.View,
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
      /* @__PURE__ */ import_react10.default.createElement(
        import_react_native10.Text,
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
      /* @__PURE__ */ import_react10.default.createElement(
        import_react_native10.View,
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
        fallbackIcon ?? /* @__PURE__ */ import_react10.default.createElement(import_react_native10.Text, { style: { fontSize: sizeConfig.fontSize, color: tokens.color.text.tertiary } }, "?")
      )
    ),
    status && /* @__PURE__ */ import_react10.default.createElement(
      import_react_native10.View,
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
  return /* @__PURE__ */ import_react10.default.createElement(
    import_react_native10.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim
      }
    },
    visible.map((avatar, i) => /* @__PURE__ */ import_react10.default.createElement(
      import_react_native10.View,
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
      /* @__PURE__ */ import_react10.default.createElement(Avatar, { ...avatar, size })
    )),
    overflow > 0 && /* @__PURE__ */ import_react10.default.createElement(
      import_react_native10.View,
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
      /* @__PURE__ */ import_react10.default.createElement(
        import_react_native10.Text,
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
var import_react11 = __toESM(require("react"));
var import_react_native11 = require("react-native");
var import_headless9 = require("@truongdq01/headless");
var BADGE_ROW_GAP = { sm: 3, md: 4, lg: 6 };
var Badge = import_react11.default.memo(({ label, count, variant = "default", size = "md", icon, dot = false }) => {
  const { badge } = (0, import_headless9.useComponentTokens)();
  const { fontSize, sizeBox } = (0, import_react11.useMemo)(() => {
    const { fontSize: fs, ...rest } = badge.size[size];
    return { fontSize: fs, sizeBox: rest };
  }, [badge.size, size]);
  const iconPx = Math.round(fontSize * 0.85);
  const containerStyle = (0, import_react11.useMemo)(
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
  const textStyle = (0, import_react11.useMemo)(
    () => [badge.text, { color: badge.variant[variant].text, fontSize }],
    [badge.text, badge.variant, variant, fontSize]
  );
  const iconColor = String(badge.variant[variant].text);
  const renderIcon = (el) => {
    if (!el) return null;
    if (import_react11.default.isValidElement(el)) {
      return import_react11.default.cloneElement(el, {
        size: el.props.size ?? iconPx,
        color: el.props.color ?? iconColor
      });
    }
    return el;
  };
  const textPart = label !== void 0 ? label : count !== void 0 ? String(count) : null;
  const dotDim = size === "sm" ? Math.max(6, Math.round(badge.dot.size * 0.875)) : size === "lg" ? Math.round(badge.dot.size * 1.25) : badge.dot.size;
  return /* @__PURE__ */ import_react11.default.createElement(
    import_react_native11.View,
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
    !dot && textPart !== null && /* @__PURE__ */ import_react11.default.createElement(import_react_native11.Text, { style: textStyle }, textPart)
  );
});

// src/components/BottomNavigation/BottomNavigation.tsx
var import_react12 = __toESM(require("react"));
var import_react_native12 = require("react-native");
var import_headless10 = require("@truongdq01/headless");
var BottomNavContext = (0, import_react12.createContext)(null);
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
  const ctx = (0, import_react12.useMemo)(() => ({ value, isSelected, getItemProps, showLabels }), [value, isSelected, getItemProps, showLabels]);
  return /* @__PURE__ */ import_react12.default.createElement(BottomNavContext.Provider, { value: ctx }, /* @__PURE__ */ import_react12.default.createElement(import_react_native12.View, { style: [bottomNavigation.container, { flexDirection: "row", justifyContent: "space-around" }] }, children));
}
function BottomNavigationAction({ value, label, icon }) {
  const { bottomNavigation } = (0, import_headless10.useComponentTokens)();
  const tokens = (0, import_headless10.useTokens)();
  const ctx = (0, import_react12.useContext)(BottomNavContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  return /* @__PURE__ */ import_react12.default.createElement(import_react_native12.Pressable, { ...ctx.getItemProps(value), style: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 } }, icon, (ctx.showLabels || selected) && label && /* @__PURE__ */ import_react12.default.createElement(import_react_native12.Text, { style: { fontSize: tokens.fontSize.xs, color: selected ? bottomNavigation.item.active.color : bottomNavigation.item.inactive.color } }, label));
}

// src/components/BottomSheet/BottomSheet.tsx
var import_react13 = __toESM(require("react"));
var import_react_native13 = require("react-native");
var import_react_native_reanimated6 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var import_react_native_safe_area_context = require("react-native-safe-area-context");
var import_headless11 = require("@truongdq01/headless");
var SCREEN_HEIGHT = import_react_native13.Dimensions.get("window").height;
var BottomSheet = (0, import_react13.forwardRef)(
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
    const { bottomSheet } = (0, import_headless11.useComponentTokens)();
    const insets = (0, import_react_native_safe_area_context.useSafeAreaInsets)();
    const [mounted, setMounted] = (0, import_react13.useState)(false);
    const handleClose = import_react13.default.useCallback(() => {
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
    const open = import_react13.default.useCallback((idx) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);
    (0, import_react13.useImperativeHandle)(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);
    return /* @__PURE__ */ import_react13.default.createElement(import_react_native13.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: baseClose }, /* @__PURE__ */ import_react13.default.createElement(import_react_native13.View, { style: import_react_native13.StyleSheet.absoluteFill, pointerEvents: "box-none" }, enableBackdrop && /* @__PURE__ */ import_react13.default.createElement(import_react_native_gesture_handler2.GestureDetector, { gesture: backdropTapGesture }, /* @__PURE__ */ import_react13.default.createElement(
      import_react_native_reanimated6.default.View,
      {
        style: [
          import_react_native13.StyleSheet.absoluteFill,
          bottomSheet.backdrop,
          backdropAnimatedStyle
        ],
        accessibilityRole: "button",
        accessibilityLabel: backdropAccessibilityLabel,
        accessibilityHint: "Closes the bottom sheet"
      }
    )), /* @__PURE__ */ import_react13.default.createElement(
      import_react_native_reanimated6.default.View,
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
      /* @__PURE__ */ import_react13.default.createElement(import_react_native_gesture_handler2.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ import_react13.default.createElement(
        import_react_native13.View,
        {
          style: styles2.handleArea,
          accessibilityRole: "adjustable",
          accessibilityLabel: "Drag handle",
          accessibilityHint: "Swipe up or down to resize the bottom sheet"
        },
        showHandle && /* @__PURE__ */ import_react13.default.createElement(
          import_react_native13.View,
          {
            style: [
              styles2.handle,
              bottomSheet.handle
            ]
          }
        )
      )),
      /* @__PURE__ */ import_react13.default.createElement(import_react_native13.View, { style: { flex: 1 } }, children)
    )));
  }
);
var styles2 = import_react_native13.StyleSheet.create({
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
var import_react14 = __toESM(require("react"));
var import_react_native14 = require("react-native");
var import_headless12 = require("@truongdq01/headless");
function Box2({ children, style, sx, flex }) {
  const { box } = (0, import_headless12.useComponentTokens)();
  const merged = [
    box.defaults,
    flex !== void 0 ? { flex } : null,
    sx,
    style
  ];
  return /* @__PURE__ */ import_react14.default.createElement(import_react_native14.View, { style: merged }, children);
}

// src/components/Breadcrumbs/Breadcrumbs.tsx
var import_react15 = __toESM(require("react"));
var import_react_native15 = require("react-native");
var import_headless13 = require("@truongdq01/headless");
function Breadcrumbs({
  children,
  separator = "/",
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) {
  const { breadcrumbs } = (0, import_headless13.useComponentTokens)();
  const items = import_react15.default.Children.toArray(children);
  let displayItems = items;
  if (items.length > maxItems) {
    displayItems = [
      ...items.slice(0, itemsBeforeCollapse),
      /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Text, { key: "ellipsis", style: { color: breadcrumbs.separator.color } }, "..."),
      ...items.slice(items.length - itemsAfterCollapse)
    ];
  }
  return /* @__PURE__ */ import_react15.default.createElement(import_react_native15.View, { style: breadcrumbs.container }, displayItems.map((child, idx) => /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, { key: idx }, child, idx < displayItems.length - 1 && /* @__PURE__ */ import_react15.default.createElement(import_react_native15.Text, { style: { marginHorizontal: breadcrumbs.container.gap, color: breadcrumbs.separator.color, fontSize: breadcrumbs.separator.fontSize } }, separator))));
}

// src/components/Button/Button.tsx
var import_react16 = __toESM(require("react"));
var import_react_native_reanimated7 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler3 = require("react-native-gesture-handler");
var import_react_native16 = require("react-native");
var import_headless14 = require("@truongdq01/headless");
var Button = import_react16.default.memo(({
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
  const resolvedVariant = (0, import_react16.useMemo)(() => {
    if (variant === "contained") return "solid";
    if (variant === "outlined") return "outline";
    if (variant === "text") return "ghost";
    return variant;
  }, [variant]);
  const resolvedColor = (0, import_react16.useMemo)(() => {
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
  const handlePress = (0, import_react16.useCallback)(() => {
    if (!href) {
      onPress?.();
      return;
    }
    onPress?.();
    void import_react_native16.Linking.openURL(href).catch(() => {
    });
  }, [href, onPress]);
  const hitSlop = (0, import_react16.useMemo)(() => {
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
  const containerStyle = (0, import_react16.useMemo)(() => [
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
  const textStyle = (0, import_react16.useMemo)(() => [
    button.variant[resolvedVariant].text,
    button.size[size].text,
    resolvedVariant === "solid" && { color: resolvedColor.textOn || tokens.color.text.inverse },
    resolvedVariant === "outline" && { color: resolvedColor.main },
    resolvedVariant === "ghost" && { color: resolvedColor.main },
    resolvedVariant === "destructive" && { color: tokens.color.error.text }
  ], [button, resolvedVariant, size, resolvedColor, tokens]);
  const resolvedLabelColor = (0, import_react16.useMemo)(() => {
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
    if (import_react16.default.isValidElement(icon)) {
      return import_react16.default.cloneElement(icon, {
        size: icon.props.size ?? iconSize,
        color: icon.props.color ?? iconColor
      });
    }
    return icon;
  };
  return /* @__PURE__ */ import_react16.default.createElement(import_react_native_gesture_handler3.GestureDetector, { gesture }, /* @__PURE__ */ import_react16.default.createElement(
    import_react_native_reanimated7.default.View,
    {
      style: [containerStyle, animatedStyle, { position: "relative" }],
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react16.default.createElement(import_react_native16.View, { style: [
      styles3.contentContainer,
      {
        gap: button.variant[resolvedVariant].container.gap,
        opacity: loading && loadingPosition === "center" ? 0 : 1
      }
    ] }, loading && loadingPosition === "start" && (loadingIndicator ?? /* @__PURE__ */ import_react16.default.createElement(import_react_native16.ActivityIndicator, { size: "small", color: iconColor })), renderIcon(leading), isTextContent ? /* @__PURE__ */ import_react16.default.createElement(import_react_native16.Text, { style: textStyle }, content) : content, renderIcon(trailing), loading && loadingPosition === "end" && (loadingIndicator ?? /* @__PURE__ */ import_react16.default.createElement(import_react_native16.ActivityIndicator, { size: "small", color: iconColor }))),
    loading && loadingPosition === "center" && /* @__PURE__ */ import_react16.default.createElement(import_react_native16.View, { style: [import_react_native16.StyleSheet.absoluteFill, styles3.loadingWrapper] }, loadingIndicator ?? /* @__PURE__ */ import_react16.default.createElement(import_react_native16.ActivityIndicator, { size: "small", color: iconColor }))
  ));
});
var styles3 = import_react_native16.StyleSheet.create({
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
var import_react17 = __toESM(require("react"));
var import_react_native17 = require("react-native");
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
  const items = import_react17.default.Children.toArray(children);
  return /* @__PURE__ */ import_react17.default.createElement(
    import_react_native17.View,
    {
      style: {
        ...buttonGroup.container,
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start"
      }
    },
    items.map((child, i) => {
      if (!import_react17.default.isValidElement(child)) return child;
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
      return import_react17.default.cloneElement(child, {
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
var import_react18 = __toESM(require("react"));
var import_react_native_reanimated8 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler4 = require("react-native-gesture-handler");
var import_react_native18 = require("react-native");
var import_headless16 = require("@truongdq01/headless");
function Card({
  children,
  onPress,
  padding = "md",
  accessibilityLabel,
  style
}) {
  const { card } = (0, import_headless16.useComponentTokens)();
  const containerStyle = (0, import_react18.useMemo)(() => [
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
    return /* @__PURE__ */ import_react18.default.createElement(import_react_native_gesture_handler4.GestureDetector, { gesture }, /* @__PURE__ */ import_react18.default.createElement(import_react_native_reanimated8.default.View, { style: [containerStyle, animatedStyle], ...accessibilityProps }, children));
  }
  return /* @__PURE__ */ import_react18.default.createElement(import_react_native18.View, { style: containerStyle }, children);
}

// src/components/Carousel/Carousel.tsx
var import_react19 = __toESM(require("react"));
var import_react_native19 = require("react-native");
var import_react_native_reanimated9 = __toESM(require("react-native-reanimated"));
var import_headless17 = require("@truongdq01/headless");
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
  const { width: windowWidthPx } = (0, import_react_native19.useWindowDimensions)();
  const windowWidth = Math.max(1, windowWidthPx > 0 ? windowWidthPx : 375);
  const resolvedItemWidth = itemWidth ?? windowWidth;
  const contentPaddingStart = (windowWidth - resolvedItemWidth) / 2;
  const { carousel } = (0, import_headless17.useComponentTokens)();
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
  } = (0, import_headless17.useCarousel)({
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
  return /* @__PURE__ */ import_react19.default.createElement(import_react_native19.View, { style: { height } }, /* @__PURE__ */ import_react19.default.createElement(
    import_react_native19.ScrollView,
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
      return /* @__PURE__ */ import_react19.default.createElement(
        import_react_native19.View,
        {
          key: getSlideKey(item, index, loop, n, keyExtractor),
          style: { width: resolvedItemWidth, height }
        },
        renderItem(item, loop ? (index - 1 + n) % n : index)
      );
    })
  ), showPagination && /* @__PURE__ */ import_react19.default.createElement(
    import_react_native19.View,
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
      return /* @__PURE__ */ import_react19.default.createElement(
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
  const dotStyle = (0, import_react_native_reanimated9.useAnimatedStyle)(() => {
    let activeIndex = (scrollX.value - contentPaddingStart) / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }
    const opacity = (0, import_react_native_reanimated9.interpolate)(
      activeIndex,
      [index - 1, index, index + 1],
      [dot.inactive.opacity, 1, dot.inactive.opacity],
      import_react_native_reanimated9.Extrapolation.CLAMP
    );
    const width = (0, import_react_native_reanimated9.interpolate)(
      activeIndex,
      [index - 1, index, index + 1],
      [dot.inactive.width, dot.active.width, dot.inactive.width],
      import_react_native_reanimated9.Extrapolation.CLAMP
    );
    return {
      width,
      opacity,
      backgroundColor: dot.active.bg,
      height: dot.height,
      borderRadius: dot.borderRadius
    };
  });
  return /* @__PURE__ */ import_react19.default.createElement(import_react_native_reanimated9.default.View, { style: dotStyle });
}

// src/components/Checkbox/Checkbox.tsx
var import_react20 = __toESM(require("react"));
var import_react_native20 = require("react-native");
var import_react_native_reanimated10 = __toESM(require("react-native-reanimated"));
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
  const reduceMotion = (0, import_headless18.useReduceMotionEnabled)();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = (0, import_headless18.useCheckbox)(hookOptions);
  const sizeConfig = checkbox.size[size];
  const scale = (0, import_react_native_reanimated10.useSharedValue)(1);
  const fillProgress = (0, import_react_native_reanimated10.useSharedValue)(isChecked || isIndeterminate ? 1 : 0);
  import_react20.default.useEffect(() => {
    const target = isChecked || isIndeterminate ? 1 : 0;
    fillProgress.value = reduceMotion ? target : (0, import_react_native_reanimated10.withSpring)(target, import_tokens.spring.snappy);
  }, [isChecked, isIndeterminate, reduceMotion]);
  const boxStyle = (0, import_react_native_reanimated10.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated10.interpolateColor)(
      fillProgress.value,
      [0, 1],
      [checkbox.state.default.backgroundColor, checkbox.state.checked.backgroundColor]
    ),
    borderColor: (0, import_react_native_reanimated10.interpolateColor)(
      fillProgress.value,
      [0, 1],
      [checkbox.state.default.borderColor, checkbox.state.checked.borderColor]
    ),
    transform: [{ scale: scale.value }]
  }));
  const checkStyle = (0, import_react_native_reanimated10.useAnimatedStyle)(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }]
  }));
  const handlePress = () => {
    if (!reduceMotion) {
      scale.value = (0, import_react_native_reanimated10.withSpring)(0.88, import_tokens.spring.snappy, () => {
        scale.value = (0, import_react_native_reanimated10.withSpring)(1, import_tokens.spring.snappy);
      });
    }
    toggle();
  };
  return /* @__PURE__ */ import_react20.default.createElement(
    import_react_native20.Pressable,
    {
      onPress: handlePress,
      disabled: isDisabled,
      style: { flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? checkbox.state.disabled.opacity : 1 },
      ...accessibilityProps
    },
    /* @__PURE__ */ import_react20.default.createElement(
      import_react_native_reanimated10.default.View,
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
      /* @__PURE__ */ import_react20.default.createElement(import_react_native_reanimated10.default.View, { style: checkStyle }, isIndeterminate ? /* @__PURE__ */ import_react20.default.createElement(import_react_native20.View, { style: { width: sizeConfig.iconSize, height: 2, backgroundColor: tokens.color.text.inverse, borderRadius: 1 } }) : /* @__PURE__ */ import_react20.default.createElement(import_react_native20.Text, { style: { color: tokens.color.text.inverse, fontSize: sizeConfig.iconSize, fontWeight: "700", lineHeight: sizeConfig.iconSize + 2 } }, "\u2713"))
    ),
    (label || description) && /* @__PURE__ */ import_react20.default.createElement(import_react_native20.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ import_react20.default.createElement(import_react_native20.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ import_react20.default.createElement(import_react_native20.Text, { style: { fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 } }, description))
  );
}

// src/components/Chip/Chip.tsx
var import_react21 = __toESM(require("react"));
var import_react_native21 = require("react-native");
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
    if (import_react21.default.isValidElement(node)) {
      return import_react21.default.cloneElement(node, {
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
  const content = /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: container }, avatar && /* @__PURE__ */ import_react21.default.createElement(import_react_native21.View, { style: avatarStyle }, avatar), renderIcon(icon), /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Text, { style: {
    color: customText,
    fontSize: sizeStyle.fontSize,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: sizeStyle.fontSize * 1.4
  } }, label), onDelete && /* @__PURE__ */ import_react21.default.createElement(
    import_react_native21.Pressable,
    {
      onPress: onDelete,
      hitSlop: 8,
      style: deleteButtonStyle,
      accessibilityRole: "button",
      accessibilityLabel: "Remove"
    },
    deleteIcon ?? /* @__PURE__ */ import_react21.default.createElement(import_react_native21.Text, { style: {
      color: customText,
      fontSize: 14,
      fontWeight: tokens.fontWeight.bold,
      opacity: 0.7
    } }, "\xD7")
  ));
  if (onClick || clickable) {
    return /* @__PURE__ */ import_react21.default.createElement(
      import_react_native21.Pressable,
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
var import_react22 = __toESM(require("react"));
var import_react_native22 = require("react-native");
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
  return /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: [styles4.container, style] }, /* @__PURE__ */ import_react22.default.createElement(
    import_react_native22.ActivityIndicator,
    {
      size: resolvedSize,
      color: resolvedColor,
      animating: variant === "indeterminate"
    }
  ), variant === "determinate" && showLabel && /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: import_react_native22.StyleSheet.absoluteFill, pointerEvents: "none" }, /* @__PURE__ */ import_react22.default.createElement(import_react_native22.View, { style: styles4.labelContainer }, /* @__PURE__ */ import_react22.default.createElement(import_react_native22.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary } }, Math.round(progressValue), "%"))));
}
var styles4 = import_react_native22.StyleSheet.create({
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
var import_react25 = __toESM(require("react"));
var import_react_native25 = require("react-native");
var import_react_native_safe_area_context2 = require("react-native-safe-area-context");
var import_headless23 = require("@truongdq01/headless");
var import_datetimepicker = __toESM(require("@react-native-community/datetimepicker"));

// src/components/DatePicker/CalendarGrid.tsx
var import_react23 = __toESM(require("react"));
var import_react_native23 = require("react-native");
var import_headless21 = require("@truongdq01/headless");
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
  const t = (0, import_headless21.useTokens)();
  const weekdayLabels = (0, import_react23.useMemo)(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const baseMonday = new Date(2024, 0, 8);
    return Array.from(
      { length: 7 },
      (_, i) => formatter.format(new Date(baseMonday.getFullYear(), baseMonday.getMonth(), baseMonday.getDate() + i))
    );
  }, [locale]);
  const monthYearTitle = (0, import_react23.useMemo)(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(year, month, 1)),
    [locale, year, month]
  );
  const goPrev = (0, import_react23.useCallback)(() => {
    if (month === 0) onMonthChange(11, year - 1);
    else onMonthChange(month - 1, year);
  }, [month, year, onMonthChange]);
  const goNext = (0, import_react23.useCallback)(() => {
    if (month === 11) onMonthChange(0, year + 1);
    else onMonthChange(month + 1, year);
  }, [month, year, onMonthChange]);
  const cells = (0, import_react23.useMemo)(() => {
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
  return /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, null, /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4, marginBottom: t.spacing[3] } }, /* @__PURE__ */ import_react23.default.createElement(import_react_native23.Pressable, { onPress: goPrev, hitSlop: 12, accessibilityLabel: "Previous month", accessibilityRole: "button" }, /* @__PURE__ */ import_react23.default.createElement(Icon, { name: "chevronLeft", size: 22, color: t.color.text.secondary })), /* @__PURE__ */ import_react23.default.createElement(import_react_native23.Pressable, { onPress: () => onHeaderPress?.(), disabled: !onHeaderPress, accessibilityRole: onHeaderPress ? "button" : void 0 }, /* @__PURE__ */ import_react23.default.createElement(import_react_native23.Text, { style: { fontSize: t.fontSize.lg, fontWeight: t.fontWeight.semibold, color: t.color.text.primary } }, monthYearTitle)), /* @__PURE__ */ import_react23.default.createElement(import_react_native23.Pressable, { onPress: goNext, hitSlop: 12, accessibilityLabel: "Next month", accessibilityRole: "button" }, /* @__PURE__ */ import_react23.default.createElement(Icon, { name: "chevronRight", size: 22, color: t.color.text.secondary }))), /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { style: { flexDirection: "row" } }, weekdayLabels.map((wd) => /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { key: wd, style: { flex: 1, alignItems: "center", paddingBottom: t.spacing[2] } }, /* @__PURE__ */ import_react23.default.createElement(import_react_native23.Text, { style: { fontSize: t.fontSize.xs, fontWeight: t.fontWeight.medium, color: t.color.text.tertiary } }, wd)))), cells.map((row, ri) => /* @__PURE__ */ import_react23.default.createElement(import_react_native23.View, { key: ri, style: { flexDirection: "row" } }, row.map((cell, ci) => {
    const selected = selectedDate ? isSameDay(cell.date, selectedDate) : false;
    const today = isToday(cell.date);
    const disabled = !cell.inMonth || isDateDisabled(cell.date, minimumDate, maximumDate);
    return /* @__PURE__ */ import_react23.default.createElement(
      import_react_native23.Pressable,
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
      /* @__PURE__ */ import_react23.default.createElement(
        import_react_native23.View,
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
        /* @__PURE__ */ import_react23.default.createElement(
          import_react_native23.Text,
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
var import_react24 = __toESM(require("react"));
var import_react_native24 = require("react-native");
var import_headless22 = require("@truongdq01/headless");
var ROW = 40;
var VISIBLE = 5;
function pad2(n) {
  return n.toString().padStart(2, "0");
}
function TimePickerWheels({ value, onChange }) {
  const t = (0, import_headless22.useTokens)();
  const h = value.getHours();
  const m = value.getMinutes();
  const hours = (0, import_react24.useMemo)(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = (0, import_react24.useMemo)(() => Array.from({ length: 60 }, (_, i) => i), []);
  const setHM = (0, import_react24.useCallback)(
    (nh, nm) => {
      const d = new Date(value);
      d.setHours(nh, nm, 0, 0);
      onChange(d);
    },
    [value, onChange]
  );
  const col = (label, child) => /* @__PURE__ */ import_react24.default.createElement(import_react_native24.View, { style: { width: 80 } }, /* @__PURE__ */ import_react24.default.createElement(
    import_react_native24.Text,
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
  ), /* @__PURE__ */ import_react24.default.createElement(import_react_native24.ScrollView, { style: { height: ROW * VISIBLE }, showsVerticalScrollIndicator: false }, child));
  return /* @__PURE__ */ import_react24.default.createElement(
    import_react_native24.View,
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
      hours.map((hour) => /* @__PURE__ */ import_react24.default.createElement(
        import_react_native24.Pressable,
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
        /* @__PURE__ */ import_react24.default.createElement(
          import_react_native24.Text,
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
      minutes.map((minute) => /* @__PURE__ */ import_react24.default.createElement(
        import_react_native24.Pressable,
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
        /* @__PURE__ */ import_react24.default.createElement(
          import_react_native24.Text,
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
  const { input } = (0, import_headless23.useComponentTokens)();
  const tokens = (0, import_headless23.useTokens)();
  const insets = (0, import_react_native_safe_area_context2.useSafeAreaInsets)();
  const { size: iconSize, color: iconColor } = (0, import_headless23.useIconStyle)("input");
  const [showPicker, setShowPicker] = (0, import_react25.useState)(false);
  const [selectedPreset, setSelectedPreset] = (0, import_react25.useState)(null);
  const [pickerDraft, setPickerDraft] = (0, import_react25.useState)(() => date ?? /* @__PURE__ */ new Date());
  const [yearPick, setYearPick] = (0, import_react25.useState)(false);
  const initDate = date ?? /* @__PURE__ */ new Date();
  const [calMonth, setCalMonth] = (0, import_react25.useState)(initDate.getMonth());
  const [calYear, setCalYear] = (0, import_react25.useState)(initDate.getFullYear());
  const effectivePickerStyle = pickerStyleProp ?? "calendar";
  const yearOptions = (0, import_react25.useMemo)(() => Array.from({ length: 12 }, (_, i) => calYear - 5 + i), [calYear]);
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
    if (import_react_native25.Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      setSelectedPreset(null);
      onChange(selectedDate);
    }
  };
  const renderIcon = (node) => {
    if (!node) return null;
    if (import_react25.default.isValidElement(node)) {
      return import_react25.default.cloneElement(node, {
        size: node.props.size ?? iconSize,
        color: node.props.color ?? iconColor
      });
    }
    return node;
  };
  const pickerComponent = showPicker ? /* @__PURE__ */ import_react25.default.createElement(
    import_datetimepicker.default,
    {
      value: date ?? /* @__PURE__ */ new Date(),
      mode,
      display: import_react_native25.Platform.OS === "ios" ? "spinner" : "default",
      onChange: handleChange,
      minimumDate,
      maximumDate,
      locale,
      timeZoneOffsetInMinutes,
      timeZoneOffsetInSeconds,
      timeZoneName
    }
  ) : null;
  return /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 } }, label && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: input.label }, label), presets && presets.length > 0 && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" } }, presets.map((preset) => /* @__PURE__ */ import_react25.default.createElement(
    import_react_native25.Pressable,
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
    /* @__PURE__ */ import_react25.default.createElement(
      import_react_native25.Text,
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
  ))), /* @__PURE__ */ import_react25.default.createElement(
    import_react_native25.Pressable,
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
    /* @__PURE__ */ import_react25.default.createElement(
      import_react_native25.Text,
      {
        style: {
          flex: 1,
          fontSize: tokens.fontSize.md,
          color: date ? tokens.color.text.primary : tokens.color.text.tertiary
        }
      },
      displayValue
    ),
    clearable && date && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Pressable, { onPress: handleClear, hitSlop: 8 }, /* @__PURE__ */ import_react25.default.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" })),
    /* @__PURE__ */ import_react25.default.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "calendar" })
  ), error && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: input.errorText }, error), effectivePickerStyle === "calendar" && showPicker && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Modal, { transparent: true, animationType: "slide", visible: showPicker, onRequestClose: () => {
    setShowPicker(false);
    setYearPick(false);
  } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ import_react25.default.createElement(
    import_react_native25.Pressable,
    {
      style: import_react_native25.StyleSheet.absoluteFill,
      onPress: () => {
        setShowPicker(false);
        setYearPick(false);
      },
      accessibilityLabel: "Dismiss"
    }
  ), /* @__PURE__ */ import_react25.default.createElement(
    import_react_native25.View,
    {
      style: {
        backgroundColor: tokens.color.surface.default,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
      }
    },
    /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { alignItems: "center", paddingVertical: 10 } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { width: 36, height: 4, borderRadius: 2, backgroundColor: tokens.color.border.subtle } })),
    /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 12 } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: { fontSize: tokens.fontSize.lg, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary } }, modalTitle), /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Pressable, { onPress: () => {
      setShowPicker(false);
      setYearPick(false);
    }, hitSlop: 12, accessibilityRole: "button", accessibilityLabel: "Close" }, /* @__PURE__ */ import_react25.default.createElement(Icon, { name: "close", size: 22, color: tokens.color.text.secondary }))),
    yearPick && mode !== "time" ? /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2], justifyContent: "center", paddingHorizontal: 16, paddingBottom: tokens.spacing[3] } }, yearOptions.map((y) => /* @__PURE__ */ import_react25.default.createElement(
      import_react_native25.Pressable,
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
      /* @__PURE__ */ import_react25.default.createElement(
        import_react_native25.Text,
        {
          style: {
            fontSize: tokens.fontSize.sm,
            fontWeight: tokens.fontWeight.semibold,
            color: y === calYear ? tokens.color.brand.text : tokens.color.text.primary
          }
        },
        y
      )
    ))) : /* @__PURE__ */ import_react25.default.createElement(import_react25.default.Fragment, null, (mode === "date" || mode === "datetime") && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { paddingHorizontal: 16 } }, /* @__PURE__ */ import_react25.default.createElement(
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
    )), (mode === "time" || mode === "datetime") && /* @__PURE__ */ import_react25.default.createElement(TimePickerWheels, { value: pickerDraft, onChange: setPickerDraft }), (mode === "date" || mode === "datetime") && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { paddingHorizontal: 16, marginTop: 12 } }, /* @__PURE__ */ import_react25.default.createElement(
      import_react_native25.Pressable,
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
      /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.text } }, "Today")
    ))),
    /* @__PURE__ */ import_react25.default.createElement(
      import_react_native25.View,
      {
        style: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: tokens.spacing[3],
          marginTop: tokens.spacing[2],
          borderTopWidth: import_react_native25.StyleSheet.hairlineWidth,
          borderTopColor: tokens.color.border.subtle,
          paddingBottom: Math.max(insets.bottom, tokens.spacing[3])
        }
      },
      /* @__PURE__ */ import_react25.default.createElement(
        import_react_native25.Pressable,
        {
          onPress: () => {
            setShowPicker(false);
            setYearPick(false);
          },
          hitSlop: 12,
          accessibilityRole: "button",
          accessibilityLabel: "Cancel"
        },
        /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.secondary, fontWeight: tokens.fontWeight.medium } }, "Cancel")
      ),
      /* @__PURE__ */ import_react25.default.createElement(
        import_react_native25.Pressable,
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
        /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Confirm")
      )
    )
  ))), effectivePickerStyle !== "calendar" && import_react_native25.Platform.OS === "ios" && showPicker && /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Modal, { transparent: true, animationType: "slide", visible: showPicker }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.View, { style: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 } }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Pressable, { onPress: () => setShowPicker(false), hitSlop: 12 }, /* @__PURE__ */ import_react25.default.createElement(import_react_native25.Text, { style: { fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold } }, "Done"))), pickerComponent))), effectivePickerStyle !== "calendar" && import_react_native25.Platform.OS === "android" && pickerComponent);
}

// src/components/Dialog/Dialog.tsx
var import_react26 = __toESM(require("react"));
var import_react_native26 = require("react-native");
var import_headless24 = require("@truongdq01/headless");
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
  const { dialog, modal } = (0, import_headless24.useComponentTokens)();
  const tokens = (0, import_headless24.useTokens)();
  if (!open) return null;
  return /* @__PURE__ */ import_react26.default.createElement(import_react_native26.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react26.default.createElement(import_react_native26.View, { style: modal.overlay }, /* @__PURE__ */ import_react26.default.createElement(
    import_react_native26.Pressable,
    {
      style: import_react_native26.StyleSheet.absoluteFill,
      onPress: onClose,
      accessibilityRole: "button",
      accessibilityLabel: backdropAccessibilityLabel,
      accessibilityHint: "Closes the dialog"
    }
  ), /* @__PURE__ */ import_react26.default.createElement(
    import_react_native26.View,
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
    title && /* @__PURE__ */ import_react26.default.createElement(import_react_native26.View, { style: { marginBottom: tokens.spacing[4] } }, typeof title === "string" ? /* @__PURE__ */ import_react26.default.createElement(import_react_native26.Text, { style: { fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary } }, title) : title),
    /* @__PURE__ */ import_react26.default.createElement(import_react_native26.View, { style: { marginBottom: actions ? tokens.spacing[6] : 0 } }, children),
    actions && /* @__PURE__ */ import_react26.default.createElement(import_react_native26.View, { style: { flexDirection: "row", justifyContent: "flex-end", gap: tokens.spacing[2] } }, actions)
  )));
}

// src/components/Divider/Divider.tsx
var import_react27 = __toESM(require("react"));
var import_react_native27 = require("react-native");
var import_headless25 = require("@truongdq01/headless");
function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md"
}) {
  const { divider } = (0, import_headless25.useComponentTokens)();
  const tokens = (0, import_headless25.useTokens)();
  const lineColor = emphasis ? tokens.color.border.strong : divider.color;
  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: divider.margin,
    lg: tokens.spacing[6]
  }[spacing];
  if (orientation === "vertical") {
    return /* @__PURE__ */ import_react27.default.createElement(
      import_react_native27.View,
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
    return /* @__PURE__ */ import_react27.default.createElement(
      import_react_native27.View,
      {
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin
        }
      },
      /* @__PURE__ */ import_react27.default.createElement(import_react_native27.View, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } }),
      /* @__PURE__ */ import_react27.default.createElement(
        import_react_native27.Text,
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
      /* @__PURE__ */ import_react27.default.createElement(import_react_native27.View, { style: { flex: 1, height: divider.thickness, backgroundColor: lineColor } })
    );
  }
  return /* @__PURE__ */ import_react27.default.createElement(
    import_react_native27.View,
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
var import_react28 = __toESM(require("react"));
var import_react_native28 = require("react-native");
var import_react_native_reanimated11 = __toESM(require("react-native-reanimated"));
var import_headless26 = require("@truongdq01/headless");
var import_tokens2 = require("@truongdq01/tokens");
function Drawer({
  open,
  onClose,
  anchor = "left",
  children,
  accessibilityLabel = "Drawer",
  backdropAccessibilityLabel = "Dismiss drawer"
}) {
  const { drawer } = (0, import_headless26.useComponentTokens)();
  const tokens = (0, import_headless26.useTokens)();
  const reduceMotion = (0, import_headless26.useReduceMotionEnabled)();
  const { width: windowWidth, height: windowHeight } = import_react_native28.Dimensions.get("window");
  const isVertical = anchor === "top" || anchor === "bottom";
  const size = isVertical ? windowHeight * 0.4 : 280;
  const progress = (0, import_react_native_reanimated11.useSharedValue)(0);
  const [mounted, setMounted] = import_react28.default.useState(open);
  (0, import_react28.useEffect)(() => {
    if (open) {
      setMounted(true);
      if (reduceMotion) {
        progress.value = 1;
      } else {
        progress.value = (0, import_react_native_reanimated11.withSpring)(1, import_tokens2.spring.snappy);
      }
    } else {
      if (reduceMotion) {
        progress.value = 0;
        setMounted(false);
      } else {
        progress.value = (0, import_react_native_reanimated11.withSpring)(0, import_tokens2.spring.snappy, (finished) => {
          if (finished) (0, import_react_native_reanimated11.runOnJS)(setMounted)(false);
        });
      }
    }
  }, [open, reduceMotion]);
  const animatedStyle = (0, import_react_native_reanimated11.useAnimatedStyle)(() => {
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
  const backdropStyle = (0, import_react_native_reanimated11.useAnimatedStyle)(() => ({
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
  return /* @__PURE__ */ import_react28.default.createElement(import_react_native28.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react28.default.createElement(import_react_native28.View, { style: { flex: 1 } }, /* @__PURE__ */ import_react28.default.createElement(import_react_native_reanimated11.default.View, { style: [import_react_native28.StyleSheet.absoluteFill, drawer.overlay, backdropStyle] }, /* @__PURE__ */ import_react28.default.createElement(
    import_react_native28.Pressable,
    {
      style: { flex: 1 },
      onPress: onClose,
      accessibilityRole: "button",
      accessibilityLabel: backdropAccessibilityLabel,
      accessibilityHint: "Closes the drawer"
    }
  )), /* @__PURE__ */ import_react28.default.createElement(
    import_react_native_reanimated11.default.View,
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
var import_react29 = __toESM(require("react"));
var import_react_native29 = require("react-native");
var import_headless27 = require("@truongdq01/headless");
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
  const { emptyState } = (0, import_headless27.useComponentTokens)();
  const tokens = (0, import_headless27.useTokens)();
  const meta = variant !== "default" ? VARIANT_DEFAULTS[variant] : null;
  const resolvedTitle = title ?? meta?.title;
  const resolvedDescription = description ?? meta?.description;
  const { iconColor, wrapBg } = variantSemantics(variant, tokens);
  const iconSize = Math.round(emptyState.icon.size / 2);
  const resolvedIcon = icon ?? (meta ? /* @__PURE__ */ import_react29.default.createElement(Icon, { name: meta.iconName, size: iconSize, color: iconColor }) : null);
  const sizePad = emptyState.containerSize[size];
  const titleSize = emptyState.titleSize[size];
  const descSize = emptyState.descriptionSize[size];
  return /* @__PURE__ */ import_react29.default.createElement(
    import_react_native29.View,
    {
      accessibilityRole: "none",
      style: [
        emptyState.container,
        { padding: sizePad.padding, gap: sizePad.gap }
      ]
    },
    illustration && /* @__PURE__ */ import_react29.default.createElement(import_react_native29.View, { style: { marginBottom: tokens.spacing[2] } }, illustration),
    resolvedIcon && /* @__PURE__ */ import_react29.default.createElement(import_react_native29.View, { style: [emptyState.iconWrap, { backgroundColor: wrapBg }] }, import_react29.default.isValidElement(resolvedIcon) ? import_react29.default.cloneElement(resolvedIcon, {
      size: resolvedIcon.props.size ?? iconSize,
      color: resolvedIcon.props.color ?? iconColor
    }) : resolvedIcon),
    resolvedTitle && /* @__PURE__ */ import_react29.default.createElement(import_react_native29.Text, { style: [emptyState.title, titleSize] }, resolvedTitle),
    resolvedDescription && /* @__PURE__ */ import_react29.default.createElement(import_react_native29.Text, { style: [emptyState.description, descSize] }, resolvedDescription),
    action && /* @__PURE__ */ import_react29.default.createElement(import_react_native29.View, { style: { marginTop: tokens.spacing[4] } }, action)
  );
}

// src/components/Fab/Fab.tsx
var import_react30 = __toESM(require("react"));
var import_react_native30 = require("react-native");
var import_react_native_reanimated12 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler5 = require("react-native-gesture-handler");
var import_headless28 = require("@truongdq01/headless");
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
  const { fab } = (0, import_headless28.useComponentTokens)();
  const { gesture, animatedStyle, accessibilityProps } = (0, import_headless28.usePressable)({
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
  return /* @__PURE__ */ import_react30.default.createElement(import_react_native_gesture_handler5.GestureDetector, { gesture }, /* @__PURE__ */ import_react30.default.createElement(import_react_native_reanimated12.default.View, { style: containerStyle, ...accessibilityProps }, /* @__PURE__ */ import_react30.default.createElement(import_react_native30.View, { style: styles5.content }, icon && /* @__PURE__ */ import_react30.default.createElement(Icon, { size: s.iconSize, color: textColor }, icon), isExtended && /* @__PURE__ */ import_react30.default.createElement(import_react_native30.Text, { style: [styles5.label, { marginLeft: icon ? 8 : 0 }] }, label))));
}
var styles5 = import_react_native30.StyleSheet.create({
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
var import_react31 = __toESM(require("react"));
var import_react_native31 = require("react-native");
var import_headless29 = require("@truongdq01/headless");
var FormContext = (0, import_react31.createContext)(null);
function useForm() {
  const context = (0, import_react31.useContext)(FormContext);
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
  const tokens = (0, import_headless29.useTokens)();
  const [values, setValues] = import_react31.default.useState(initialValues);
  const [errors, setErrors] = import_react31.default.useState({});
  const [touched, setTouched] = import_react31.default.useState({});
  const [isSubmitting, setIsSubmitting] = import_react31.default.useState(false);
  const runValidation = (0, import_react31.useCallback)((currentValues) => {
    if (!validate) return {};
    try {
      return validate(currentValues);
    } catch (error) {
      console.error("Form validation error:", error);
      return {};
    }
  }, [validate]);
  const isValid = import_react31.default.useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);
  const setValue = (0, import_react31.useCallback)((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (validateOnChange) {
      setValues((current) => {
        const newErrors = runValidation({ ...current, [name]: value });
        setErrors(newErrors);
        return current;
      });
    }
  }, [validateOnChange, runValidation]);
  const setError = (0, import_react31.useCallback)((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);
  const setTouchedField = (0, import_react31.useCallback)((name, fieldTouched) => {
    setTouched((prev) => ({ ...prev, [name]: fieldTouched }));
    if (validateOnBlur && fieldTouched) {
      const newErrors = runValidation(values);
      setErrors(newErrors);
    }
  }, [validateOnBlur, runValidation, values]);
  const handleSubmit = (0, import_react31.useCallback)((callback) => {
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
  const resetForm = (0, import_react31.useCallback)(() => {
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
  const formContent = /* @__PURE__ */ import_react31.default.createElement(import_react_native31.View, { style: [styles6.container, style], testID }, /* @__PURE__ */ import_react31.default.createElement(FormContext.Provider, { value: contextValue }, children));
  if (scrollable) {
    return /* @__PURE__ */ import_react31.default.createElement(
      import_react_native31.ScrollView,
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
var styles6 = import_react_native31.StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16
  }
});

// src/components/FormControl/FormControl.tsx
var import_react32 = __toESM(require("react"));
var import_react_native32 = require("react-native");
var import_headless30 = require("@truongdq01/headless");
var FormControlContext = (0, import_react32.createContext)(null);
function useFormControl() {
  return (0, import_react32.useContext)(FormControlContext);
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
  const { formControl } = (0, import_headless30.useComponentTokens)();
  const tokens = (0, import_headless30.useTokens)();
  const marginSize = (0, import_react32.useMemo)(() => {
    if (margin === "dense") return tokens.spacing[2];
    if (margin === "normal") return tokens.spacing[4];
    return 0;
  }, [margin, tokens]);
  const ctxValue = (0, import_react32.useMemo)(() => ({ error, required, disabled, focused, fullWidth, variant }), [error, required, disabled, focused, fullWidth, variant]);
  return /* @__PURE__ */ import_react32.default.createElement(FormControlContext.Provider, { value: ctxValue }, /* @__PURE__ */ import_react32.default.createElement(import_react_native32.View, { style: [formControl.container, { alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style] }, children));
}
function FormLabel({ children, style }) {
  const { formControl } = (0, import_headless30.useComponentTokens)();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : ctx?.disabled ? formControl.label.color + "80" : formControl.label.color;
  return /* @__PURE__ */ import_react32.default.createElement(import_react_native32.Text, { style: [formControl.label, { color }, style] }, children, ctx?.required ? " *" : "");
}
function FormHelperText({ children, style }) {
  const { formControl } = (0, import_headless30.useComponentTokens)();
  const ctx = useFormControl();
  const color = ctx?.error ? formControl.errorText.color : formControl.helperText.color;
  return /* @__PURE__ */ import_react32.default.createElement(import_react_native32.Text, { style: [formControl.helperText, { color }, style] }, children);
}
function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style
}) {
  const { formControl } = (0, import_headless30.useComponentTokens)();
  const tokens = (0, import_headless30.useTokens)();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const controlElement = import_react32.default.cloneElement(control, {
    disabled: isDisabled
  });
  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";
  return /* @__PURE__ */ import_react32.default.createElement(
    import_react_native32.Pressable,
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
    label ? /* @__PURE__ */ import_react32.default.createElement(import_react_native32.Text, { style: formControl.label }, label) : null
  );
}

// src/components/FormField/FormField.tsx
var import_react34 = __toESM(require("react"));
var import_react_native34 = require("react-native");
var import_headless32 = require("@truongdq01/headless");

// src/components/Input/PasswordInput.tsx
var import_react33 = __toESM(require("react"));
var import_react_native33 = require("react-native");
var import_headless31 = require("@truongdq01/headless");
function PasswordInput(props) {
  const [show, setShow] = (0, import_react33.useState)(false);
  const { size, color } = (0, import_headless31.useIconStyle)("input");
  const toggleShow = () => setShow((prev) => !prev);
  return /* @__PURE__ */ import_react33.default.createElement(
    Input,
    {
      ...props,
      secureTextEntry: !show,
      autoCapitalize: "none",
      autoCorrect: false,
      trailingElement: /* @__PURE__ */ import_react33.default.createElement(
        import_react_native33.Pressable,
        {
          onPress: toggleShow,
          hitSlop: 8,
          accessibilityLabel: show ? "Hide password" : "Show password",
          accessibilityRole: "button"
        },
        /* @__PURE__ */ import_react33.default.createElement(Icon, { size, color, name: show ? "eyeOff" : "eye" })
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
  if (!label || !import_react34.default.isValidElement(child)) return child;
  if (!isInputLikeElement(child)) return child;
  const props = child.props;
  return import_react34.default.cloneElement(child, {
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
  const { formField, formControl, formGroup } = (0, import_headless32.useComponentTokens)();
  const tokens = (0, import_headless32.useTokens)();
  const groupVariant = useFormGroupVariant();
  const isGrouped = groupVariant === "grouped";
  const childEl = import_react34.default.isValidElement(children) ? children : null;
  const showFloatingClone = Boolean(isGrouped && label && childEl && isInputLikeElement(childEl));
  const showLabelRow = Boolean((label || labelTrailing) && !showFloatingClone);
  const renderedChild = showFloatingClone ? enhanceChildForGroupedField(children, label) : children;
  const showMessagesBelowField = !isGrouped;
  return /* @__PURE__ */ import_react34.default.createElement(
    import_react_native34.View,
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
    showLabelRow && (label || labelTrailing) ? /* @__PURE__ */ import_react34.default.createElement(
      import_react_native34.View,
      {
        style: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing[1.5]
        }
      },
      label ? /* @__PURE__ */ import_react34.default.createElement(import_react_native34.View, { style: { flexDirection: "row", gap: 3 } }, /* @__PURE__ */ import_react34.default.createElement(import_react_native34.Text, { style: formControl.label }, label), required ? /* @__PURE__ */ import_react34.default.createElement(
        import_react_native34.Text,
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
    showMessagesBelowField ? error ? /* @__PURE__ */ import_react34.default.createElement(
      import_react_native34.Text,
      {
        style: [formControl.errorText, { marginTop: tokens.spacing[2] }],
        accessibilityRole: "alert",
        accessibilityLiveRegion: "polite"
      },
      error
    ) : helperText ? /* @__PURE__ */ import_react34.default.createElement(import_react_native34.Text, { style: [formControl.helperText, { marginTop: tokens.spacing[2] }] }, helperText) : null : null
  );
}
function FormGroup({
  children,
  gap = "md",
  variant = "standard",
  footer,
  error
}) {
  const tokens = (0, import_headless32.useTokens)();
  const { formGroup } = (0, import_headless32.useComponentTokens)();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  if (variant === "standard") {
    return /* @__PURE__ */ import_react34.default.createElement(FormGroupContext.Provider, { value: "standard" }, /* @__PURE__ */ import_react34.default.createElement(import_react_native34.View, { style: { gap: gapSize } }, children));
  }
  const items = import_react34.default.Children.toArray(children).filter(Boolean);
  return /* @__PURE__ */ import_react34.default.createElement(FormGroupContext.Provider, { value: "grouped" }, /* @__PURE__ */ import_react34.default.createElement(import_react_native34.View, null, /* @__PURE__ */ import_react34.default.createElement(import_react_native34.View, { style: formGroup.grouped.card }, items.map((child, i) => /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, { key: i }, child, i < items.length - 1 ? /* @__PURE__ */ import_react34.default.createElement(
    import_react_native34.View,
    {
      style: {
        height: import_react_native34.StyleSheet.hairlineWidth,
        backgroundColor: tokens.color.border.default,
        marginLeft: tokens.spacing[3]
      }
    }
  ) : null))), error ? /* @__PURE__ */ import_react34.default.createElement(import_react_native34.Text, { style: formGroup.errorBelowCard }, error) : null, footer ? /* @__PURE__ */ import_react34.default.createElement(import_react_native34.Text, { style: formGroup.footer }, footer) : null));
}

// src/components/GlassCard/GlassCard.tsx
var import_react35 = __toESM(require("react"));
var import_react_native35 = require("react-native");
var import_headless33 = require("@truongdq01/headless");
var BlurView = null;
try {
  BlurView = require("expo-blur").BlurView;
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
  const t = (0, import_headless33.useTokens)();
  const isDark = t.color.bg.default !== "#F8FAFC";
  const resolvedTint = tint ?? (isDark ? "dark" : "light");
  const resolvedRadius = borderRadius ?? t.radius.xl;
  const containerStyle = (0, import_react35.useMemo)(
    () => ({
      borderRadius: resolvedRadius,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: t.color.surface.glassBorder ?? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.3)")
    }),
    [resolvedRadius, t.color.surface.glassBorder, isDark]
  );
  const fallbackStyle = (0, import_react35.useMemo)(
    () => ({
      ...import_react_native35.StyleSheet.absoluteFillObject,
      backgroundColor: t.color.surface.glass ?? (isDark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.72)")
    }),
    [t.color.surface.glass, isDark]
  );
  return /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: [containerStyle, style], ...rest }, BlurView ? /* @__PURE__ */ import_react35.default.createElement(
    BlurView,
    {
      intensity,
      tint: resolvedTint,
      style: import_react_native35.StyleSheet.absoluteFill
    }
  ) : /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: fallbackStyle }), /* @__PURE__ */ import_react35.default.createElement(import_react_native35.View, { style: styles7.content }, children));
}
var styles7 = import_react_native35.StyleSheet.create({
  content: {
    position: "relative",
    zIndex: 1
  }
});

// src/components/Gradient/Gradient.tsx
var import_react36 = __toESM(require("react"));
var import_react_native36 = require("react-native");
var import_tokens3 = require("@truongdq01/tokens");
var ExpoLinearGradient = null;
try {
  ExpoLinearGradient = require("expo-linear-gradient").LinearGradient;
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
  const resolvedColors = (0, import_react36.useMemo)(() => {
    if (colorsProp && colorsProp.length >= 2) return colorsProp;
    if (preset && import_tokens3.primitive.gradient[preset]) return import_tokens3.primitive.gradient[preset];
    return import_tokens3.primitive.gradient.brand;
  }, [colorsProp, preset]);
  if (ExpoLinearGradient) {
    return /* @__PURE__ */ import_react36.default.createElement(
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
  return /* @__PURE__ */ import_react36.default.createElement(import_react_native36.View, { style: [{ backgroundColor: resolvedColors[0] }, style], ...rest }, children);
}
var styles8 = import_react_native36.StyleSheet.create({
  fill: { flex: 1 }
});

// src/components/Grid/Grid.tsx
var import_react37 = __toESM(require("react"));
var import_react_native37 = require("react-native");
var import_headless34 = require("@truongdq01/headless");
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
  const { grid } = (0, import_headless34.useComponentTokens)();
  const resolveGap = (s) => {
    if (s === void 0) return void 0;
    return typeof s === "number" ? s : grid.gap[s];
  };
  const gap = resolveGap(spacing) ?? 0;
  const rowGap = resolveGap(rowSpacing) ?? gap;
  const colGap = resolveGap(columnSpacing) ?? gap;
  if (container) {
    return /* @__PURE__ */ import_react37.default.createElement(
      import_react_native37.View,
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
  return /* @__PURE__ */ import_react37.default.createElement(
    import_react_native37.View,
    {
      style: [itemStyle, style]
    },
    children
  );
}

// src/components/Image/Image.tsx
var import_react38 = __toESM(require("react"));
var import_react_native38 = require("react-native");
var import_react_native_reanimated13 = __toESM(require("react-native-reanimated"));
var import_headless35 = require("@truongdq01/headless");
var AnimatedImage = import_react_native_reanimated13.default.createAnimatedComponent(import_react_native38.Image);
function RnImage({ showPlaceholder = true, style, onLoad, ...props }) {
  const { image } = (0, import_headless35.useComponentTokens)();
  const [isLoaded, setIsLoaded] = (0, import_react38.useState)(false);
  const opacity = (0, import_react_native_reanimated13.useSharedValue)(0);
  const handleLoad = (e) => {
    setIsLoaded(true);
    opacity.value = (0, import_react_native_reanimated13.withTiming)(1, { duration: 300 });
    onLoad?.(e);
  };
  const imageStyle = (0, import_react_native_reanimated13.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ import_react38.default.createElement(import_react_native38.View, { style: [styles9.container, style, { backgroundColor: showPlaceholder && !isLoaded ? image.placeholder.backgroundColor : "transparent" }] }, /* @__PURE__ */ import_react38.default.createElement(
    AnimatedImage,
    {
      ...props,
      onLoad: handleLoad,
      style: [import_react_native38.StyleSheet.absoluteFill, imageStyle, style]
    }
  ));
}
var styles9 = import_react_native38.StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative"
  }
});

// src/components/ImageList/ImageList.tsx
var import_react39 = __toESM(require("react"));
var import_react_native39 = require("react-native");
var import_headless36 = require("@truongdq01/headless");
var { width: SCREEN_WIDTH } = import_react_native39.Dimensions.get("window");
var ImageListContext = (0, import_react39.createContext)(null);
function useImageListContext() {
  return (0, import_react39.useContext)(ImageListContext);
}
function ImageList({
  children,
  cols = 2,
  gap = 8,
  rowHeight = 120,
  variant = "standard",
  style
}) {
  const [width, setWidth] = (0, import_react39.useState)(SCREEN_WIDTH);
  const handleLayout = (event) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== width) setWidth(nextWidth);
  };
  const ctx = (0, import_react39.useMemo)(() => ({ cols, gap, rowHeight, variant, width }), [cols, gap, rowHeight, variant, width]);
  return /* @__PURE__ */ import_react39.default.createElement(ImageListContext.Provider, { value: ctx }, /* @__PURE__ */ import_react39.default.createElement(import_react_native39.View, { onLayout: handleLayout, style: [{ flexDirection: "row", flexWrap: "wrap" }, style] }, children));
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
  return /* @__PURE__ */ import_react39.default.createElement(import_react_native39.View, { style: [{ width: itemWidth, height, marginRight: gap, marginBottom: gap }, style] }, children);
}
function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = "bottom",
  style
}) {
  const { imageList } = (0, import_headless36.useComponentTokens)();
  const tokens = (0, import_headless36.useTokens)();
  return /* @__PURE__ */ import_react39.default.createElement(
    import_react_native39.View,
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
    /* @__PURE__ */ import_react39.default.createElement(import_react_native39.View, { style: { flex: 1 } }, title ? /* @__PURE__ */ import_react39.default.createElement(import_react_native39.Text, { style: imageList.bar.title }, title) : null, subtitle ? /* @__PURE__ */ import_react39.default.createElement(import_react_native39.Text, { style: imageList.bar.subtitle }, subtitle) : null),
    actionIcon
  );
}

// src/components/LinearProgress/LinearProgress.tsx
var import_react40 = __toESM(require("react"));
var import_react_native40 = require("react-native");
var import_react_native_reanimated14 = __toESM(require("react-native-reanimated"));
var import_headless37 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless37.useTokens)();
  const { linearProgress } = (0, import_headless37.useComponentTokens)();
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
  const determinateStyle = (0, import_react_native_reanimated14.useAnimatedStyle)(() => {
    return {
      width: `${progressValue}%`
    };
  }, [progressValue]);
  const bufferValue = clamp2(valueBuffer);
  return /* @__PURE__ */ import_react40.default.createElement(import_react_native40.View, { style: containerStyle }, variant === "indeterminate" || variant === "query" ? /* @__PURE__ */ import_react40.default.createElement(
    import_react_native_reanimated14.default.View,
    {
      style: [
        styles10.indeterminateBar,
        {
          backgroundColor: barColor
        }
      ]
    }
  ) : /* @__PURE__ */ import_react40.default.createElement(import_react40.default.Fragment, null, variant === "buffer" && /* @__PURE__ */ import_react40.default.createElement(import_react_native40.View, { style: [styles10.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? tokens.color.bg.muted }] }), /* @__PURE__ */ import_react40.default.createElement(
    import_react_native_reanimated14.default.View,
    {
      style: [
        styles10.determinateBar,
        { backgroundColor: barColor },
        determinateStyle
      ]
    }
  )));
}
var styles10 = import_react_native40.StyleSheet.create({
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
var import_react41 = __toESM(require("react"));
var import_react_native41 = require("react-native");
var import_headless38 = require("@truongdq01/headless");
function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style
}) {
  const { link } = (0, import_headless38.useComponentTokens)();
  const decoration = underline === "none" ? "none" : "underline";
  return /* @__PURE__ */ import_react41.default.createElement(
    import_react_native41.Text,
    {
      onPress: async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await import_react_native41.Linking.openURL(href);
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
var import_react42 = __toESM(require("react"));
var import_react_native42 = require("react-native");
var import_headless39 = require("@truongdq01/headless");
var ListContext = (0, import_react42.createContext)(null);
function useListContext() {
  return (0, import_react42.useContext)(ListContext);
}
function List2({ children, dense = false, disablePadding = false, subheader, style }) {
  const { list } = (0, import_headless39.useComponentTokens)();
  const tokens = (0, import_headless39.useTokens)();
  return /* @__PURE__ */ import_react42.default.createElement(ListContext.Provider, { value: { dense, disablePadding } }, /* @__PURE__ */ import_react42.default.createElement(import_react_native42.View, { style: [list.container, style] }, subheader && /* @__PURE__ */ import_react42.default.createElement(import_react_native42.View, { style: list.subheader }, typeof subheader === "string" ? /* @__PURE__ */ import_react42.default.createElement(import_react_native42.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: "600", color: tokens.color.text.tertiary } }, subheader) : subheader), children));
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
  const { list } = (0, import_headless39.useComponentTokens)();
  const tokens = (0, import_headless39.useTokens)();
  const ctx = useListContext();
  const isDense = ctx?.dense;
  return /* @__PURE__ */ import_react42.default.createElement(
    import_react_native42.Pressable,
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
    /* @__PURE__ */ import_react42.default.createElement(import_react_native42.View, { style: { flex: 1, flexDirection: "row", alignItems: "center" } }, children),
    secondaryAction && /* @__PURE__ */ import_react42.default.createElement(import_react_native42.View, { style: { marginLeft: tokens.spacing[2] } }, secondaryAction)
  );
}
var ListItem = import_react42.default.memo(ListItemInner);
function ListItemText({ primary, secondary }) {
  const { list } = (0, import_headless39.useComponentTokens)();
  const tokens = (0, import_headless39.useTokens)();
  const ctx = useListContext();
  return /* @__PURE__ */ import_react42.default.createElement(import_react_native42.View, { style: { flex: 1 } }, typeof primary === "string" ? /* @__PURE__ */ import_react42.default.createElement(import_react_native42.Text, { style: [list.itemText, ctx?.dense && { fontSize: tokens.fontSize.sm }] }, primary) : primary, secondary && (typeof secondary === "string" ? /* @__PURE__ */ import_react42.default.createElement(import_react_native42.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary, marginTop: 2 } }, secondary) : secondary));
}
function ListItemIcon({ children }) {
  const tokens = (0, import_headless39.useTokens)();
  return /* @__PURE__ */ import_react42.default.createElement(import_react_native42.View, { style: { marginRight: tokens.spacing[4], minWidth: 24, alignItems: "center" } }, children);
}
function ListData({
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
  ...listProps
}) {
  const ListImpl = (0, import_react42.useMemo)(() => {
    try {
      const mod = require("@shopify/flash-list");
      return mod?.FlashList ?? import_react_native42.FlatList;
    } catch {
      return import_react_native42.FlatList;
    }
  }, []);
  return /* @__PURE__ */ import_react42.default.createElement(List2, { ...listProps }, /* @__PURE__ */ import_react42.default.createElement(
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
var import_react43 = __toESM(require("react"));
var import_react_native43 = require("react-native");
var import_react_native_reanimated15 = __toESM(require("react-native-reanimated"));
var import_headless40 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless40.useTokens)();
  const containerRef = (0, import_react43.useRef)(null);
  const contentRef = (0, import_react43.useRef)(null);
  const translateX = (0, import_react_native_reanimated15.useSharedValue)(0);
  const translateY = (0, import_react_native_reanimated15.useSharedValue)(0);
  const isPaused = (0, import_react_native_reanimated15.useSharedValue)(false);
  const animatedStyle = (0, import_react_native_reanimated15.useAnimatedStyle)(() => {
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
    const animation = (0, import_react_native_reanimated15.withTiming)(endValue, {
      duration,
      easing: import_react_native_reanimated15.Easing.linear
    });
    const repeatedAnimation = loop ? (0, import_react_native_reanimated15.withRepeat)(
      (0, import_react_native_reanimated15.withSequence)(
        (0, import_react_native_reanimated15.withTiming)(endValue, { duration, easing: import_react_native_reanimated15.Easing.linear }),
        (0, import_react_native_reanimated15.withTiming)(startValue, { duration: 0 })
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
    (0, import_react_native_reanimated15.cancelAnimation)(translateX);
    (0, import_react_native_reanimated15.cancelAnimation)(translateY);
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
  (0, import_react43.useEffect)(() => {
    const timeout = setTimeout(measureAndStart, 100);
    return () => {
      clearTimeout(timeout);
      (0, import_react_native_reanimated15.cancelAnimation)(translateX);
      (0, import_react_native_reanimated15.cancelAnimation)(translateY);
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
  return /* @__PURE__ */ import_react43.default.createElement(
    import_react_native43.View,
    {
      ref: containerRef,
      style: styles11.container,
      accessibilityLabel,
      accessibilityRole: "text",
      testID
    },
    fadeEdges && /* @__PURE__ */ import_react43.default.createElement(import_react43.default.Fragment, null, /* @__PURE__ */ import_react43.default.createElement(
      import_react_native43.View,
      {
        style: [
          styles11.fadeLeft,
          { backgroundColor: fadeGradient },
          direction === "up" || direction === "down" ? styles11.fadeTop : void 0
        ]
      }
    ), /* @__PURE__ */ import_react43.default.createElement(
      import_react_native43.View,
      {
        style: [
          styles11.fadeRight,
          { backgroundColor: fadeGradient },
          direction === "up" || direction === "down" ? styles11.fadeBottom : void 0
        ]
      }
    )),
    /* @__PURE__ */ import_react43.default.createElement(
      import_react_native_reanimated15.default.View,
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
var styles11 = import_react_native43.StyleSheet.create({
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
var import_react44 = __toESM(require("react"));
var import_react_native44 = require("react-native");
var import_react_native_reanimated16 = __toESM(require("react-native-reanimated"));
var import_headless41 = require("@truongdq01/headless");
var MenuContext = import_react44.default.createContext(null);
function Menu2({ open, onClose, anchorEl, children }) {
  const { menu } = (0, import_headless41.useComponentTokens)();
  const { width: windowWidth, height: windowHeight } = (0, import_react_native44.useWindowDimensions)();
  const [menuSize, setMenuSize] = import_react44.default.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = import_react44.default.useState(false);
  const { close, getItemProps } = (0, import_headless41.useMenu)({ onClose });
  const opacity = (0, import_react_native_reanimated16.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated16.useSharedValue)(0.9);
  import_react44.default.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = (0, import_react_native_reanimated16.withTiming)(1, { duration: 180, easing: import_react_native_reanimated16.Easing.out(import_react_native_reanimated16.Easing.cubic) });
        scale.value = (0, import_react_native_reanimated16.withSpring)(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = (0, import_react_native_reanimated16.withTiming)(0, { duration: 130 });
      scale.value = (0, import_react_native_reanimated16.withTiming)(0.92, { duration: 130 }, (done) => {
        if (done) (0, import_react_native_reanimated16.runOnJS)(setMounted)(false);
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
  const animStyle = (0, import_react_native_reanimated16.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ import_react44.default.createElement(import_react_native44.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: close }, /* @__PURE__ */ import_react44.default.createElement(import_react_native44.Pressable, { style: { flex: 1 }, onPress: close }), /* @__PURE__ */ import_react44.default.createElement(
    import_react_native_reanimated16.default.View,
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
    /* @__PURE__ */ import_react44.default.createElement(MenuContext.Provider, { value: { getItemProps } }, children)
  ));
}
function MenuItem({ children, onPress, disabled = false, selected = false }) {
  const { menu } = (0, import_headless41.useComponentTokens)();
  const tokens = (0, import_headless41.useTokens)();
  const ctx = import_react44.default.useContext(MenuContext);
  const itemProps = ctx?.getItemProps({ onClick: onPress, disabled }) ?? { onPress, disabled };
  return /* @__PURE__ */ import_react44.default.createElement(
    import_react_native44.Pressable,
    {
      ...itemProps,
      style: ({ pressed }) => [
        menu.item,
        pressed && { backgroundColor: tokens.color.bg.subtle },
        selected && { backgroundColor: tokens.color.brand.subtle },
        disabled && { opacity: 0.5 }
      ]
    },
    /* @__PURE__ */ import_react44.default.createElement(import_react_native44.Text, { style: {
      color: selected ? tokens.color.brand.text : tokens.color.text.primary,
      fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
    } }, children)
  );
}

// src/components/Modal/Modal.tsx
var import_react45 = __toESM(require("react"));
var import_react_native45 = require("react-native");
var import_headless42 = require("@truongdq01/headless");
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
  const { modal } = (0, import_headless42.useComponentTokens)();
  if (!open && !keepMounted) return null;
  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ import_react45.default.createElement(
    import_react_native45.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleRequestClose
    },
    /* @__PURE__ */ import_react45.default.createElement(import_react_native45.View, { style: [styles12.overlay, modal.overlay] }, !hideBackdrop && (BackdropComponent ? (() => {
      const el = /* @__PURE__ */ import_react45.default.createElement(BackdropComponent, { ...BackdropProps });
      return import_react45.default.isValidElement(el) ? import_react45.default.cloneElement(el, { collapsable: false }) : el;
    })() : /* @__PURE__ */ import_react45.default.createElement(
      import_react_native45.Pressable,
      {
        style: [import_react_native45.StyleSheet.absoluteFill, { backgroundColor: modal.overlay.backgroundColor }],
        onPress: onClose,
        accessibilityRole: "button",
        accessibilityLabel: backdropAccessibilityLabel,
        accessibilityHint: "Closes the modal"
      }
    )), /* @__PURE__ */ import_react45.default.createElement(
      import_react_native45.View,
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
var styles12 = import_react_native45.StyleSheet.create({
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
var import_react46 = __toESM(require("react"));
var import_react_native46 = require("react-native");
var import_react_native_reanimated17 = __toESM(require("react-native-reanimated"));
var import_headless43 = require("@truongdq01/headless");
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  mask = false
}) {
  const { otpInput } = (0, import_headless43.useComponentTokens)();
  const reduceMotion = (0, import_headless43.useReduceMotionEnabled)();
  const { inputRef, isFocused, handlePress, getOtpProps } = (0, import_headless43.useOTPInput)({
    length,
    value,
    onChange,
    onComplete,
    disabled
  });
  return /* @__PURE__ */ import_react46.default.createElement(import_react_native46.View, { style: { width: "100%" } }, /* @__PURE__ */ import_react46.default.createElement(
    import_react_native46.TextInput,
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
  ), /* @__PURE__ */ import_react46.default.createElement(
    import_react_native46.Pressable,
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
      return /* @__PURE__ */ import_react46.default.createElement(
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
  const { otpInput } = (0, import_headless43.useComponentTokens)();
  const scale = (0, import_react_native_reanimated17.useSharedValue)(1);
  const cursorOpacity = (0, import_react_native_reanimated17.useSharedValue)(1);
  (0, import_react46.useEffect)(() => {
    if (showCursor && !reduceMotion) {
      cursorOpacity.value = (0, import_react_native_reanimated17.withRepeat)(
        (0, import_react_native_reanimated17.withSequence)((0, import_react_native_reanimated17.withTiming)(0, { duration: 500 }), (0, import_react_native_reanimated17.withTiming)(1, { duration: 500 })),
        -1,
        false
      );
    } else {
      (0, import_react_native_reanimated17.cancelAnimation)(cursorOpacity);
      cursorOpacity.value = 1;
    }
    return () => (0, import_react_native_reanimated17.cancelAnimation)(cursorOpacity);
  }, [showCursor, reduceMotion]);
  (0, import_react46.useEffect)(() => {
    if (isFocused) {
      scale.value = (0, import_react_native_reanimated17.withSequence)(
        (0, import_react_native_reanimated17.withTiming)(1.1, { duration: 150 }),
        (0, import_react_native_reanimated17.withTiming)(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = (0, import_react_native_reanimated17.withSpring)(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = (0, import_react_native_reanimated17.withTiming)(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);
  const animatedStyle = (0, import_react_native_reanimated17.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }]
  }));
  const cursorStyle = (0, import_react_native_reanimated17.useAnimatedStyle)(() => ({
    opacity: cursorOpacity.value
  }));
  const borderColor = isFocused ? otpInput.cell.focused.borderColor : isFilled ? otpInput.cell.filled.borderColor : otpInput.cell.borderColor;
  const backgroundColor = isFilled ? otpInput.cell.filled.backgroundColor : otpInput.cell.backgroundColor;
  const borderWidth = isFocused ? Math.max(otpInput.cell.borderWidth * 1.5, 2) : otpInput.cell.borderWidth;
  const displayChar = isFilled && mask ? "\u2022" : char;
  return /* @__PURE__ */ import_react46.default.createElement(
    import_react_native_reanimated17.default.View,
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
    showCursor ? /* @__PURE__ */ import_react46.default.createElement(
      import_react_native_reanimated17.default.View,
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
    ) : /* @__PURE__ */ import_react46.default.createElement(
      import_react_native46.Text,
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
var import_react47 = __toESM(require("react"));
var import_react_native47 = require("react-native");
var import_headless44 = require("@truongdq01/headless");
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
  const { pagination } = (0, import_headless44.useComponentTokens)();
  const { page: current, setPage, items } = (0, import_headless44.usePagination)({ count, page, defaultPage, onChange });
  const s = pagination.size[size];
  const renderItem = (item, idx) => {
    if (typeof item !== "number") {
      return /* @__PURE__ */ import_react47.default.createElement(import_react_native47.Text, { key: `ellipsis-${idx}`, style: { paddingHorizontal: 8, color: tokens.color.text.secondary } }, "...");
    }
    const selected = item === current;
    const itemTokens = selected ? pagination.item.active : pagination.item.default;
    return /* @__PURE__ */ import_react47.default.createElement(
      import_react_native47.Pressable,
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
      /* @__PURE__ */ import_react47.default.createElement(import_react_native47.Text, { style: { fontSize: tokens.fontSize[size], color: itemTokens.color } }, item)
    );
  };
  return /* @__PURE__ */ import_react47.default.createElement(import_react_native47.View, { style: { flexDirection: "row", alignItems: "center", gap: pagination.gap } }, items.map(renderItem));
}

// src/components/Paper/Paper.tsx
var import_react48 = __toESM(require("react"));
var import_react_native48 = require("react-native");
var import_headless45 = require("@truongdq01/headless");
function Paper({
  children,
  variant = "elevation",
  elevation = "sm",
  square = false,
  style
}) {
  const { paper } = (0, import_headless45.useComponentTokens)();
  const tokens = (0, import_headless45.useTokens)();
  return /* @__PURE__ */ import_react48.default.createElement(
    import_react_native48.View,
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
var import_react49 = __toESM(require("react"));
var import_react_native49 = require("react-native");
var import_headless46 = require("@truongdq01/headless");
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
  const { popover } = (0, import_headless46.useComponentTokens)();
  const tokens = (0, import_headless46.useTokens)();
  const [contentSize, setContentSize] = (0, import_react49.useState)({ width: 0, height: 0 });
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
  const { width: screenWidth, height: screenHeight } = import_react_native49.Dimensions.get("window");
  const position = (0, import_react49.useMemo)(() => {
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
  return /* @__PURE__ */ import_react49.default.createElement(import_react_native49.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react49.default.createElement(import_react_native49.Pressable, { style: styles13.backdrop, onPress: onClose }), /* @__PURE__ */ import_react49.default.createElement(
    import_react_native49.View,
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
var styles13 = import_react_native49.StyleSheet.create({
  backdrop: {
    ...import_react_native49.StyleSheet.absoluteFillObject
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
var import_react50 = __toESM(require("react"));
var import_react_native50 = require("react-native");
var import_headless47 = require("@truongdq01/headless");
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
  const { popper } = (0, import_headless47.useComponentTokens)();
  const tokens = (0, import_headless47.useTokens)();
  const [contentSize, setContentSize] = (0, import_react50.useState)({ width: 0, height: 0 });
  if (!open && !keepMounted) return null;
  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = import_react_native50.Dimensions.get("window");
  const position = (0, import_react50.useMemo)(() => {
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
  return /* @__PURE__ */ import_react50.default.createElement(import_react_native50.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose }, /* @__PURE__ */ import_react50.default.createElement(import_react_native50.Pressable, { style: styles14.backdrop, onPress: onClose }), /* @__PURE__ */ import_react50.default.createElement(
    import_react_native50.View,
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
var styles14 = import_react_native50.StyleSheet.create({
  backdrop: {
    ...import_react_native50.StyleSheet.absoluteFillObject
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
var import_react51 = __toESM(require("react"));
var import_react_native_reanimated18 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler6 = require("react-native-gesture-handler");
var import_headless48 = require("@truongdq01/headless");
function Pressable20({ children, style, testID, ...hookOptions }) {
  const { pressable } = (0, import_headless48.useComponentTokens)();
  const { gesture, animatedStyle, accessibilityProps, isPressed } = (0, import_headless48.usePressable)({
    ...hookOptions,
    testID
  });
  return /* @__PURE__ */ import_react51.default.createElement(import_react_native_gesture_handler6.GestureDetector, { gesture }, /* @__PURE__ */ import_react51.default.createElement(
    import_react_native_reanimated18.default.View,
    {
      style: [pressable.container, style, animatedStyle],
      ...accessibilityProps
    },
    typeof children === "function" ? children({ isPressed }) : children
  ));
}

// src/components/Radio/Radio.tsx
var import_react52 = __toESM(require("react"));
var import_react_native51 = require("react-native");
var import_react_native_reanimated19 = __toESM(require("react-native-reanimated"));
var import_headless49 = require("@truongdq01/headless");
var import_tokens4 = require("@truongdq01/tokens");
function RadioItem({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md"
}) {
  const tokens = (0, import_headless49.useTokens)();
  const { radio } = (0, import_headless49.useComponentTokens)();
  const reduceMotion = (0, import_headless49.useReduceMotionEnabled)();
  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = import_tokens4.spring.snappy;
  const scale = (0, import_react_native_reanimated19.useSharedValue)(isSelected ? 1 : 0);
  const ringFill = (0, import_react_native_reanimated19.useSharedValue)(isSelected ? 1 : 0);
  import_react52.default.useEffect(() => {
    const target = isSelected ? 1 : 0;
    scale.value = reduceMotion ? target : (0, import_react_native_reanimated19.withSpring)(target, snappySpring);
    ringFill.value = reduceMotion ? target : (0, import_react_native_reanimated19.withSpring)(target, snappySpring);
  }, [isSelected, snappySpring, reduceMotion, scale, ringFill]);
  const dotStyle = (0, import_react_native_reanimated19.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value
  }));
  const outerRingStyle = (0, import_react_native_reanimated19.useAnimatedStyle)(() => ({
    borderWidth: (0, import_react_native_reanimated19.interpolate)(ringFill.value, [0, 1], [outerSize.borderWidth, 0]),
    borderColor: (0, import_react_native_reanimated19.interpolateColor)(ringFill.value, [0, 1], [radio.colors.borderOff, "transparent"]),
    backgroundColor: (0, import_react_native_reanimated19.interpolateColor)(ringFill.value, [0, 1], [radio.colors.bgOff, radio.colors.borderOn])
  }));
  const handlePress = () => {
    if (!isSelected && !reduceMotion) {
      scale.value = (0, import_react_native_reanimated19.withSpring)(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = (0, import_react_native_reanimated19.withSpring)(1, snappySpring);
      });
    }
    onPress();
  };
  return /* @__PURE__ */ import_react52.default.createElement(
    import_react_native51.Pressable,
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
    /* @__PURE__ */ import_react52.default.createElement(
      import_react_native_reanimated19.default.View,
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
      /* @__PURE__ */ import_react52.default.createElement(
        import_react_native_reanimated19.default.View,
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
    (label || description) && /* @__PURE__ */ import_react52.default.createElement(import_react_native51.View, { style: { flex: 1, paddingTop: 1 } }, label && /* @__PURE__ */ import_react52.default.createElement(
      import_react_native51.Text,
      {
        style: {
          fontSize: tokens.fontSize.md,
          color: tokens.color.text.primary,
          fontWeight: tokens.fontWeight.medium
        }
      },
      label
    ), description && /* @__PURE__ */ import_react52.default.createElement(
      import_react_native51.Text,
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
  const tokens = (0, import_headless49.useTokens)();
  const { isSelected, getItemProps } = (0, import_headless49.useRadioGroup)(hookOptions);
  return /* @__PURE__ */ import_react52.default.createElement(import_react_native51.View, null, label && /* @__PURE__ */ import_react52.default.createElement(
    import_react_native51.Text,
    {
      style: {
        fontSize: tokens.fontSize.sm,
        fontWeight: tokens.fontWeight.medium,
        color: tokens.color.text.secondary,
        marginBottom: tokens.spacing[2]
      }
    },
    label
  ), /* @__PURE__ */ import_react52.default.createElement(
    import_react_native51.View,
    {
      style: {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3]
      }
    },
    options.map((option) => {
      const itemProps = getItemProps(option.value, option.disabled);
      return /* @__PURE__ */ import_react52.default.createElement(
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
var import_react53 = __toESM(require("react"));
var import_react_native52 = require("react-native");
var import_react_native_reanimated20 = __toESM(require("react-native-reanimated"));
var import_tokens5 = require("@truongdq01/tokens");
var import_headless50 = require("@truongdq01/headless");
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
  const scale = (0, import_react_native_reanimated20.useSharedValue)(1);
  const animStyle = (0, import_react_native_reanimated20.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }]
  }));
  const handlePressIn = () => {
    if (disabled || readOnly || reduceMotion) return;
    scale.value = (0, import_react_native_reanimated20.withSpring)(1.12, import_tokens5.spring.snappy);
  };
  const handlePressOut = () => {
    if (disabled || readOnly) return;
    if (reduceMotion) {
      scale.value = 1;
      return;
    }
    scale.value = (0, import_react_native_reanimated20.withSpring)(1, import_tokens5.spring.snappy);
  };
  const iconContent = renderIcon ? renderIcon(starState, iconSize, iconColor) : /* @__PURE__ */ import_react53.default.createElement(Icon, { size: iconSize, color: iconColor }, iconName);
  return /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.Pressable,
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
    /* @__PURE__ */ import_react53.default.createElement(import_react_native_reanimated20.default.View, { style: animStyle }, iconContent)
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
  const { rating } = (0, import_headless50.useComponentTokens)();
  const reduceMotion = (0, import_headless50.useReduceMotionEnabled)();
  const icons = { ...DEFAULT_ICON_NAMES, ...iconNamesProp };
  const { value: ratingValue, setValue, precision: effectivePrecision } = (0, import_headless50.useRating)({
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
  const announceValue = (0, import_react53.useCallback)(
    (next) => {
      const announce = import_react_native52.AccessibilityInfo.announceForAccessibility;
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
  const valueLabel = /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.Text,
    {
      accessibilityElementsHidden: true,
      importantForAccessibility: "no",
      accessible: false,
      style: { fontSize: iconSize * 0.7, color: activeColor, marginHorizontal: 4 }
    },
    labelText
  );
  const starsRow = /* @__PURE__ */ import_react53.default.createElement(
    import_react_native52.View,
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
      return /* @__PURE__ */ import_react53.default.createElement(
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
    return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.View, null, starsRow);
  }
  return /* @__PURE__ */ import_react53.default.createElement(import_react_native52.View, { style: { flexDirection: "row", alignItems: "center" } }, valuePosition === "start" ? valueLabel : null, starsRow, valuePosition === "end" ? valueLabel : null);
}
var Rating = (0, import_react53.memo)(RatingInner);
Rating.displayName = "Rating";

// src/components/SegmentedControl/SegmentedControl.tsx
var import_react54 = __toESM(require("react"));
var import_react_native53 = require("react-native");
var import_react_native_reanimated21 = __toESM(require("react-native-reanimated"));
var import_headless51 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless51.useTokens)();
  const { segmentedControl } = (0, import_headless51.useComponentTokens)();
  const { isSelected, setSelectedIndex, getTabProps } = (0, import_headless51.useSegmentedControl)({
    value: selectedIndex,
    onChange: (val) => onChange(val),
    disabled
  });
  const resolvedHeight = heightProp ?? SIZE_HEIGHT[size];
  const fontKey = SIZE_FONT[size];
  const [containerWidth, setContainerWidth] = (0, import_react54.useState)(0);
  const [layoutReady, setLayoutReady] = (0, import_react54.useState)(false);
  const innerWidth = Math.max(0, containerWidth - TRACK_PADDING * 2);
  const segmentWidth = options.length > 0 ? innerWidth / options.length : 0;
  const translateX = (0, import_react_native_reanimated21.useSharedValue)(0);
  const indicatorWidth = (0, import_react_native_reanimated21.useSharedValue)(0);
  const didInitialLayout = (0, import_react54.useRef)(false);
  import_react54.default.useEffect(() => {
    if (segmentWidth <= 0) return;
    const target = selectedIndex * segmentWidth;
    if (!didInitialLayout.current) {
      didInitialLayout.current = true;
      translateX.value = target;
      indicatorWidth.value = segmentWidth;
      return;
    }
    translateX.value = (0, import_react_native_reanimated21.withSpring)(target, INDICATOR_SPRING);
    indicatorWidth.value = (0, import_react_native_reanimated21.withSpring)(segmentWidth, INDICATOR_SPRING);
  }, [selectedIndex, segmentWidth, translateX, indicatorWidth]);
  const onLayout = (e) => {
    const w = e.nativeEvent.layout.width;
    setContainerWidth(w);
    if (w > 0) setLayoutReady(true);
  };
  const indicatorStyle = (0, import_react_native_reanimated21.useAnimatedStyle)(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value
  }));
  const showIndicator = layoutReady && segmentWidth > 0;
  return /* @__PURE__ */ import_react54.default.createElement(
    import_react_native53.View,
    {
      onLayout,
      style: [
        segmentedControl.container,
        { height: resolvedHeight, borderRadius: resolvedHeight / 2, opacity: disabled ? 0.6 : 1 }
      ]
    },
    showIndicator && /* @__PURE__ */ import_react54.default.createElement(
      import_react_native_reanimated21.default.View,
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
      return /* @__PURE__ */ import_react54.default.createElement(
        import_react_native53.Pressable,
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
        /* @__PURE__ */ import_react54.default.createElement(
          import_react_native53.Text,
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
var import_react56 = __toESM(require("react"));
var import_react_native55 = require("react-native");
var import_headless53 = require("@truongdq01/headless");

// src/components/Skeleton/Skeleton.tsx
var import_react55 = __toESM(require("react"));
var import_react_native54 = require("react-native");
var import_react_native_reanimated22 = __toESM(require("react-native-reanimated"));
var import_headless52 = require("@truongdq01/headless");
var ShimmerCtx = (0, import_react55.createContext)(null);
function useShimmerValue(animate, delayMs) {
  const shared = (0, import_react55.useContext)(ShimmerCtx);
  const local = (0, import_react_native_reanimated22.useSharedValue)(0);
  (0, import_react55.useEffect)(() => {
    if (shared || !animate) {
      (0, import_react_native_reanimated22.cancelAnimation)(local);
      local.value = 0;
      return;
    }
    const start = () => {
      local.value = (0, import_react_native_reanimated22.withRepeat)((0, import_react_native_reanimated22.withTiming)(1, { duration: 1200 }), -1, true);
    };
    if (delayMs > 0) {
      const t = setTimeout(start, delayMs);
      return () => {
        clearTimeout(t);
        (0, import_react_native_reanimated22.cancelAnimation)(local);
      };
    }
    start();
    return () => (0, import_react_native_reanimated22.cancelAnimation)(local);
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
  const { skeleton } = (0, import_headless52.useComponentTokens)();
  const isDark = (0, import_headless52.useIsDark)();
  const shimmer = useShimmerValue(animate, delayMs);
  const [layoutW, setLayoutW] = (0, import_react55.useState)(0);
  const sweepHighlight = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)";
  const pulseStyle = (0, import_react_native_reanimated22.useAnimatedStyle)(() => ({
    opacity: (0, import_react_native_reanimated22.interpolate)(shimmer.value, [0, 1], [skeleton.opacity.start, skeleton.opacity.end])
  }));
  const sweepStyle = (0, import_react_native_reanimated22.useAnimatedStyle)(() => {
    const w = Math.max(layoutW, 1);
    const sweep = w * 0.35;
    const t = shimmerDirection === "right-to-left" ? 1 - shimmer.value : shimmer.value;
    return {
      transform: [{ translateX: (0, import_react_native_reanimated22.interpolate)(t, [0, 1], [-sweep, w]) }],
      opacity: 0.45
    };
  });
  const isSweep = shimmerDirection === "left-to-right" || shimmerDirection === "right-to-left";
  return /* @__PURE__ */ import_react55.default.createElement(
    import_react_native_reanimated22.default.View,
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
    animate && isSweep && /* @__PURE__ */ import_react55.default.createElement(
      import_react_native_reanimated22.default.View,
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
  return /* @__PURE__ */ import_react55.default.createElement(import_react55.default.Fragment, null, import_react55.Children.map(children, (child, i) => {
    if (!(0, import_react55.isValidElement)(child)) return child;
    return (0, import_react55.cloneElement)(child, {
      delayMs: i * stagger
    });
  }));
}
var SkeletonText = import_react55.default.memo(function SkeletonText2({
  lines = 3,
  lastLineWidth = "60%",
  shimmerDirection = "pulse"
}) {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { gap: tokens.spacing[2] } }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ import_react55.default.createElement(
    Skeleton,
    {
      key: i,
      width: i === lines - 1 ? lastLineWidth : "100%",
      height: 14,
      shimmerDirection
    }
  )));
});
var SkeletonCard = import_react55.default.memo(function SkeletonCard2() {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.View,
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
    /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: 44, height: 44, borderRadius: 22 }), /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "50%", height: 14 }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "35%", height: 12 }))),
    /* @__PURE__ */ import_react55.default.createElement(SkeletonText, { lines: 3 }),
    /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "40%", height: 16, borderRadius: tokens.radius.md })
  );
});
var SkeletonListItem = import_react55.default.memo(function SkeletonListItem2() {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(
    import_react_native54.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: 40, height: 40, borderRadius: 20 }),
    /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { flex: 1, gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "55%", height: 14 }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "38%", height: 12 })),
    /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: 24, height: 14 })
  );
});
var SkeletonProfile = import_react55.default.memo(function SkeletonProfile2() {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { gap: tokens.spacing[4], alignItems: "center" } }, /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: 96, height: 96, borderRadius: 48, shimmerDirection: "left-to-right" }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "70%", height: 18 }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "45%", height: 14 }));
});
var SkeletonMedia = import_react55.default.memo(function SkeletonMedia2() {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { gap: tokens.spacing[3] } }, /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "100%", height: 180, borderRadius: tokens.radius.lg, shimmerDirection: "left-to-right" }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "80%", height: 16 }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "50%", height: 13 }));
});
var SkeletonForm = import_react55.default.memo(function SkeletonForm2({ rows = 4 }) {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { gap: tokens.spacing[4] } }, Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { key: i, style: { gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "30%", height: 12 }), /* @__PURE__ */ import_react55.default.createElement(Skeleton, { width: "100%", height: 44, borderRadius: tokens.radius.md }))));
});
var SkeletonGrid = import_react55.default.memo(function SkeletonGrid2({ columns = 3, rows = 2, cell = 48 }) {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2] } }, Array.from({ length: columns * rows }).map((_, i) => /* @__PURE__ */ import_react55.default.createElement(Skeleton, { key: i, width: cell, height: cell, borderRadius: tokens.radius.sm })));
});
var SkeletonTable = import_react55.default.memo(function SkeletonTable2({ columns = 4, dataRows = 3 }) {
  const tokens = (0, import_headless52.useTokens)();
  return /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { style: { flexDirection: "row", gap: tokens.spacing[2] } }, Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ import_react55.default.createElement(Skeleton, { key: `h-${i}`, width: `${90 / columns}%`, height: 14 }))), Array.from({ length: dataRows }).map((_, r) => /* @__PURE__ */ import_react55.default.createElement(import_react_native54.View, { key: r, style: { flexDirection: "row", gap: tokens.spacing[2] } }, Array.from({ length: columns }).map((_2, c) => /* @__PURE__ */ import_react55.default.createElement(Skeleton, { key: `${r}-${c}`, width: `${90 / columns}%`, height: 12 })))));
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
  const { select } = (0, import_headless53.useComponentTokens)();
  const tokens = (0, import_headless53.useTokens)();
  const sheetRef = (0, import_react56.useRef)(null);
  const [query, setQuery] = (0, import_react56.useState)("");
  const endReachBusy = (0, import_react56.useRef)(false);
  const a11yLabel = label ?? "Select";
  const ListImpl = (0, import_react56.useMemo)(() => {
    try {
      const mod = require("@shopify/flash-list");
      return mod?.FlashList ?? import_react_native55.FlatList;
    } catch {
      return import_react_native55.FlatList;
    }
  }, []);
  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel
  } = (0, import_headless53.useSelect)({ options, ...hookOptions, placeholder });
  const hasSelection = displayLabel !== placeholder;
  const filtered = (0, import_react56.useMemo)(() => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lowerQuery));
  }, [options, query]);
  const handleClose = (0, import_react56.useCallback)(() => {
    sheetRef.current?.close();
    close();
  }, [close]);
  const handleOpen = (0, import_react56.useCallback)(() => {
    setQuery("");
    sheetRef.current?.open();
    open();
  }, [open]);
  const handleSelect = (0, import_react56.useCallback)(
    (val) => {
      selectOption(val);
      onClearError?.();
      if (!hookOptions.multiple) handleClose();
    },
    [selectOption, onClearError, hookOptions.multiple, handleClose]
  );
  const onEndReached = (0, import_react56.useCallback)(() => {
    if (!onLoadMore || !hasMore || loading || loadingMore || endReachBusy.current) return;
    endReachBusy.current = true;
    onLoadMore();
  }, [onLoadMore, hasMore, loading, loadingMore]);
  import_react56.default.useEffect(() => {
    if (!loadingMore) endReachBusy.current = false;
  }, [loadingMore]);
  const renderItem = (0, import_react56.useCallback)(
    ({ item: option }) => {
      const selected = isSelected(option.value);
      if (renderOption) {
        return /* @__PURE__ */ import_react56.default.createElement(
          import_react_native55.Pressable,
          {
            onPress: () => !option.disabled && handleSelect(option.value),
            style: { opacity: option.disabled ? 0.4 : 1 }
          },
          renderOption(option, { selected })
        );
      }
      return /* @__PURE__ */ import_react56.default.createElement(
        import_react_native55.Pressable,
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
        /* @__PURE__ */ import_react56.default.createElement(
          import_react_native55.Text,
          {
            style: {
              fontSize: tokens.fontSize.md,
              color: selected ? select.option.selected.color : select.option.default.color,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular
            }
          },
          option.label
        ),
        selected && /* @__PURE__ */ import_react56.default.createElement(Icon, { size: 16, color: select.option.selected.color, name: "check" })
      );
    },
    [isSelected, renderOption, select.option, tokens, handleSelect]
  );
  const listEmpty = (0, import_react56.useMemo)(() => {
    if (loading && options.length === 0) {
      return /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: { paddingVertical: tokens.spacing[2] } }, /* @__PURE__ */ import_react56.default.createElement(SkeletonListItem, null), /* @__PURE__ */ import_react56.default.createElement(SkeletonListItem, null), /* @__PURE__ */ import_react56.default.createElement(SkeletonListItem, null));
    }
    if (filtered.length === 0) {
      const emptyMsg = loading ? "Loading\u2026" : query ? `No results for "${query}"` : "No options";
      return /* @__PURE__ */ import_react56.default.createElement(
        import_react_native55.Text,
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
  return /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, null, label && /* @__PURE__ */ import_react56.default.createElement(import_react_native55.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] } }, label), /* @__PURE__ */ import_react56.default.createElement(
    import_react_native55.Pressable,
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
    /* @__PURE__ */ import_react56.default.createElement(
      import_react_native55.Text,
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
    /* @__PURE__ */ import_react56.default.createElement(Icon, { size: 16, color: tokens.color.text.tertiary }, isOpen ? "chevronUp" : "chevronDown")
  ), error && /* @__PURE__ */ import_react56.default.createElement(import_react_native55.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] } }, error), /* @__PURE__ */ import_react56.default.createElement(
    BottomSheet,
    {
      ref: sheetRef,
      snapPoints: searchable || options.length > 6 ? ["70%"] : ["40%"],
      onClose: close,
      enableBackdrop: true,
      enableDismissOnSwipe: true
    },
    /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: { flex: 1, paddingHorizontal: tokens.spacing[4], backgroundColor: tokens.color.bg.default } }, searchable && isOpen && /* @__PURE__ */ import_react56.default.createElement(
      import_react_native55.View,
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
      /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: { marginRight: 8 } }, /* @__PURE__ */ import_react56.default.createElement(Icon, { size: 20, color: tokens.color.text.tertiary, name: "search" })),
      /* @__PURE__ */ import_react56.default.createElement(
        import_react_native55.TextInput,
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
      query.length > 0 && /* @__PURE__ */ import_react56.default.createElement(import_react_native55.Pressable, { onPress: () => setQuery(""), hitSlop: 8 }, /* @__PURE__ */ import_react56.default.createElement(Icon, { size: 18, color: tokens.color.text.tertiary, name: "close" }))
    ), filtered.length === 0 ? /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: { flex: 1, minHeight: 120 } }, listEmpty) : /* @__PURE__ */ import_react56.default.createElement(
      ListImpl,
      {
        style: { flex: 1 },
        data: filtered,
        extraData: query,
        renderItem,
        keyExtractor: (item) => String(item.value),
        onEndReached,
        onEndReachedThreshold: 0.35,
        ItemSeparatorComponent: () => /* @__PURE__ */ import_react56.default.createElement(
          import_react_native55.View,
          {
            style: {
              height: 1,
              backgroundColor: tokens.color.border.subtle,
              marginLeft: tokens.spacing[4]
            }
          }
        ),
        ListFooterComponent: loadingMore ? /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: { paddingVertical: tokens.spacing[3], alignItems: "center" } }, /* @__PURE__ */ import_react56.default.createElement(import_react_native55.ActivityIndicator, { color: tokens.color.brand.default })) : /* @__PURE__ */ import_react56.default.createElement(import_react_native55.View, { style: { height: tokens.spacing[4] } }),
        estimatedItemSize: 48
      }
    ))
  ));
}

// src/components/Slider/Slider.tsx
var import_react57 = __toESM(require("react"));
var import_react_native56 = require("react-native");
var import_react_native_reanimated23 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler7 = require("react-native-gesture-handler");
var import_headless54 = require("@truongdq01/headless");
var AnimatedTextInput2 = import_react_native_reanimated23.default.createAnimatedComponent(import_react_native56.TextInput);
function snapSliderValueWorklet(raw, minV, maxV, stepV) {
  "worklet";
  if (stepV === 0 || maxV === minV) return Math.max(minV, Math.min(maxV, raw));
  const snapped = Math.round((raw - minV) / stepV) * stepV + minV;
  return Math.max(minV, Math.min(maxV, snapped));
}
function SliderLiveSingleValue(props) {
  const { show, thumbRatioShared, min, max, step, style } = props;
  const animatedProps = (0, import_react_native_reanimated23.useAnimatedProps)(() => {
    const raw = thumbRatioShared.value * (max - min) + min;
    const s = snapSliderValueWorklet(raw, min, max, step);
    return { text: String(s) };
  });
  if (!show) return null;
  return /* @__PURE__ */ import_react57.default.createElement(
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
  const animatedProps = (0, import_react_native_reanimated23.useAnimatedProps)(() => {
    const rawLo = thumbRatioLowShared.value * (max - min) + min;
    const rawHi = thumbRatioHighShared.value * (max - min) + min;
    const lo = snapSliderValueWorklet(rawLo, min, max, step);
    const hi = snapSliderValueWorklet(rawHi, min, max, step);
    return { text: `${lo} \u2013 ${hi}` };
  });
  if (!show) return null;
  return /* @__PURE__ */ import_react57.default.createElement(
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
  const tokens = (0, import_headless54.useTokens)();
  const { slider } = (0, import_headless54.useComponentTokens)();
  const isVertical = orientation === "vertical";
  const sliderState = (0, import_headless54.useSlider)({
    min,
    max,
    step,
    orientation,
    range,
    ...rest
  });
  const showRangeLabels = showMinMaxLabels;
  const marks = showMarks && step > 0 ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min) : [];
  const liveValueStyle = (0, import_react57.useMemo)(
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
  const thumbShellStyle = (0, import_react57.useMemo)(() => {
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
    return /* @__PURE__ */ import_react57.default.createElement(import_react_native_reanimated23.default.View, { style: [thumbShellStyle, animatedStyle] }, custom ?? null);
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
    return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { opacity: d ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ import_react57.default.createElement(
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
    )), /* @__PURE__ */ import_react57.default.createElement(
      import_react_native_reanimated23.default.View,
      {
        style: [
          {
            paddingVertical: isVertical ? 0 : trackPad,
            paddingHorizontal: isVertical ? trackPad : 0
          },
          trackAnimatedStyle2
        ]
      },
      /* @__PURE__ */ import_react57.default.createElement(
        import_react_native56.View,
        {
          style: isVertical ? { width: thumbW + trackPad * 2, height: sliderHeight, justifyContent: "center" } : { height: thumbH + trackPad * 2, justifyContent: "center" },
          onLayout: (e) => onTrackLayout2(isVertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)
        },
        /* @__PURE__ */ import_react57.default.createElement(
          import_react_native56.View,
          {
            style: {
              position: "absolute",
              ...isVertical ? { top: 0, bottom: 0, left: "50%", marginLeft: -trackThickness / 2, width: trackThickness } : { left: 0, right: 0, height: trackThickness },
              borderRadius: slider.track.borderRadius,
              backgroundColor: slider.track.bgOff,
              overflow: "hidden"
            }
          },
          /* @__PURE__ */ import_react57.default.createElement(
            import_react_native_reanimated23.default.View,
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
          return /* @__PURE__ */ import_react57.default.createElement(
            import_react_native56.View,
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
        /* @__PURE__ */ import_react57.default.createElement(import_react_native_gesture_handler7.GestureDetector, { gesture: panGestureLow }, renderThumb(thumbLowAnimatedStyle, "low", lo)),
        /* @__PURE__ */ import_react57.default.createElement(import_react_native_gesture_handler7.GestureDetector, { gesture: panGestureHigh }, renderThumb(thumbHighAnimatedStyle, "high", hi))
      )
    ), showRangeLabels && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
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
  return /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { opacity: disabled ? slider.disabledOpacity : 1 } }, (label || showValue) && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] } }, label && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary } }, label), showValue && /* @__PURE__ */ import_react57.default.createElement(
    SliderLiveSingleValue,
    {
      show: showValue,
      thumbRatioShared,
      min,
      max,
      step,
      style: liveValueStyle
    }
  )), /* @__PURE__ */ import_react57.default.createElement(
    import_react_native_reanimated23.default.View,
    {
      style: [
        {
          paddingVertical: isVertical ? 0 : trackPad,
          paddingHorizontal: isVertical ? trackPad : 0
        },
        trackAnimatedStyle
      ]
    },
    /* @__PURE__ */ import_react57.default.createElement(import_react_native_gesture_handler7.GestureDetector, { gesture: panGesture }, /* @__PURE__ */ import_react57.default.createElement(
      import_react_native56.View,
      {
        style: isVertical ? { width: thumbW + trackPad * 2, height: sliderHeight, justifyContent: "center" } : { height: thumbH + trackPad * 2, justifyContent: "center" },
        onLayout: (e) => onTrackLayout(isVertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)
      },
      /* @__PURE__ */ import_react57.default.createElement(
        import_react_native56.View,
        {
          style: {
            position: "absolute",
            ...isVertical ? { top: 0, bottom: 0, left: "50%", marginLeft: -trackThickness / 2, width: trackThickness } : { left: 0, right: 0, height: trackThickness },
            borderRadius: slider.track.borderRadius,
            backgroundColor: slider.track.bgOff,
            overflow: "hidden"
          }
        },
        /* @__PURE__ */ import_react57.default.createElement(
          import_react_native_reanimated23.default.View,
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
        return /* @__PURE__ */ import_react57.default.createElement(
          import_react_native56.View,
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
  ), showRangeLabels && /* @__PURE__ */ import_react57.default.createElement(import_react_native56.View, { style: { flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] } }, /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(min)), /* @__PURE__ */ import_react57.default.createElement(import_react_native56.Text, { style: { fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary } }, formatValue(max))));
}

// src/components/Snackbar/Snackbar.tsx
var import_react58 = __toESM(require("react"));
var import_react_native57 = require("react-native");
var import_react_native_reanimated24 = __toESM(require("react-native-reanimated"));
var import_headless55 = require("@truongdq01/headless");
function Snackbar({
  open,
  message,
  autoHideDuration = 4e3,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" }
}) {
  const { snackbar } = (0, import_headless55.useComponentTokens)();
  const tokens = (0, import_headless55.useTokens)();
  const [mounted, setMounted] = import_react58.default.useState(open);
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
  (0, import_react58.useEffect)(() => {
    if (open) {
      setMounted(true);
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  (0, import_react58.useEffect)(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = (0, import_react58.useMemo)(() => {
    if (anchorOrigin.horizontal === "center") return { alignSelf: "center" };
    if (anchorOrigin.horizontal === "left") return { left: 16 };
    return { right: 16 };
  }, [anchorOrigin.horizontal]);
  const animStyle = (0, import_react_native_reanimated24.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));
  if (!mounted && !open) return null;
  return /* @__PURE__ */ import_react58.default.createElement(import_react_native57.Modal, { visible: mounted || open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react58.default.createElement(import_react_native57.View, { pointerEvents: "box-none", style: styles15.overlay }, /* @__PURE__ */ import_react58.default.createElement(
    import_react_native_reanimated24.default.View,
    {
      style: [
        snackbar.container,
        verticalStyle,
        horizontalStyle,
        animStyle,
        { position: "absolute" }
      ]
    },
    /* @__PURE__ */ import_react58.default.createElement(import_react_native57.Text, { style: [snackbar.text, { flex: 1 }] }, message),
    action,
    onClose && /* @__PURE__ */ import_react58.default.createElement(import_react_native57.Pressable, { onPress: onClose, hitSlop: 8, style: { marginLeft: 8 } }, /* @__PURE__ */ import_react58.default.createElement(Icon, { size: 18, color: snackbar.text.color, name: "close" }))
  )));
}
var styles15 = import_react_native57.StyleSheet.create({
  overlay: {
    flex: 1
  }
});

// src/components/SpeedDial/SpeedDial.tsx
var import_react59 = __toESM(require("react"));
var import_react_native58 = require("react-native");
var import_headless56 = require("@truongdq01/headless");
var SpeedDialContext = (0, import_react59.createContext)(null);
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
  const { speedDial } = (0, import_headless56.useComponentTokens)();
  const disclosure = (0, import_headless56.useDisclosure)({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = (0, import_headless56.useTokens)();
  if (hidden) return null;
  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center",
    gap: tokens.spacing[3]
  };
  const ctxValue = (0, import_react59.useMemo)(() => ({ isOpen: disclosure.isOpen, close: disclosure.close }), [disclosure.isOpen, disclosure.close]);
  return /* @__PURE__ */ import_react59.default.createElement(SpeedDialContext.Provider, { value: ctxValue }, /* @__PURE__ */ import_react59.default.createElement(import_react_native58.View, { style: [speedDial.container, stackStyle] }, disclosure.isOpen && children, /* @__PURE__ */ import_react59.default.createElement(Fab, { icon, accessibilityLabel: ariaLabel, onPress: disclosure.toggle })));
}
function SpeedDialAction({ icon, tooltipTitle, onPress }) {
  const { speedDial } = (0, import_headless56.useComponentTokens)();
  const tokens = (0, import_headless56.useTokens)();
  const ctx = (0, import_react59.useContext)(SpeedDialContext);
  if (!ctx?.isOpen) return null;
  return /* @__PURE__ */ import_react59.default.createElement(
    import_react_native58.Pressable,
    {
      onPress: () => {
        onPress?.();
        ctx.close();
      },
      style: speedDial.action
    },
    /* @__PURE__ */ import_react59.default.createElement(
      import_react_native58.View,
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
    tooltipTitle && /* @__PURE__ */ import_react59.default.createElement(import_react_native58.Text, { style: speedDial.action.tooltip }, tooltipTitle)
  );
}

// src/components/Stack/Stack.tsx
var import_react60 = __toESM(require("react"));
var import_react_native59 = require("react-native");
var import_headless57 = require("@truongdq01/headless");
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
  const { stack } = (0, import_headless57.useComponentTokens)();
  const gap = typeof spacing === "number" ? spacing : stack.gap[spacing];
  const items = import_react60.default.Children.toArray(children);
  const content = divider ? items.flatMap((child, idx) => idx === 0 ? [child] : [divider, child]) : items;
  return /* @__PURE__ */ import_react60.default.createElement(
    import_react_native59.View,
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
var import_react61 = __toESM(require("react"));
var import_react_native60 = require("react-native");
var import_headless58 = require("@truongdq01/headless");
function Stepper({ activeStep = 0, orientation = "horizontal", children }) {
  const { stepper } = (0, import_headless58.useComponentTokens)();
  const items = import_react61.default.Children.toArray(children);
  return /* @__PURE__ */ import_react61.default.createElement(import_react_native60.View, { style: [stepper.container, { flexDirection: orientation === "horizontal" ? "row" : "column" }] }, items.map((child) => {
    if (!import_react61.default.isValidElement(child)) return child;
    return import_react61.default.cloneElement(child, { activeStep, orientation });
  }));
}
function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }) {
  const { stepper } = (0, import_headless58.useComponentTokens)();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  const color = isCompleted ? stepper.step.completed.color : isActive ? stepper.step.active.color : stepper.step.pending.color;
  return /* @__PURE__ */ import_react61.default.createElement(import_react_native60.View, { style: { flexDirection: orientation === "horizontal" ? "column" : "row", gap: 8, alignItems: "center" } }, /* @__PURE__ */ import_react61.default.createElement(
    import_react_native60.View,
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
    isCompleted ? /* @__PURE__ */ import_react61.default.createElement(Icon, { size: 14, color: stepper.step.completed.color, name: "check" }) : /* @__PURE__ */ import_react61.default.createElement(import_react_native60.Text, { style: { fontSize: 12, fontWeight: "600", color: isActive ? color : color } }, index + 1)
  ), label && /* @__PURE__ */ import_react61.default.createElement(import_react_native60.Text, { style: { color: isActive ? stepper.step.active.color : stepper.step.pending.color, fontSize: 14 } }, label), children);
}
function StepLabel({ children, style }) {
  const { stepper } = (0, import_headless58.useComponentTokens)();
  return /* @__PURE__ */ import_react61.default.createElement(import_react_native60.Text, { style: [{ color: stepper.step.pending.color, fontSize: 14 }, style] }, children);
}

// src/components/Switch/Switch.tsx
var import_react62 = __toESM(require("react"));
var import_react_native61 = require("react-native");
var import_react_native_reanimated25 = __toESM(require("react-native-reanimated"));
var import_headless59 = require("@truongdq01/headless");
var import_tokens6 = require("@truongdq01/tokens");
var Switch = import_react62.default.memo(({ label, description, size = "md", ...hookOptions }) => {
  const tokens = (0, import_headless59.useTokens)();
  const { switch: switchT } = (0, import_headless59.useComponentTokens)();
  const reduceMotion = (0, import_headless59.useReduceMotionEnabled)();
  const { isOn, isDisabled, toggle, accessibilityProps } = (0, import_headless59.useSwitch)(hookOptions);
  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = Math.max(0, tTrack.width - tThumb.width - tTrack.padding * 2);
  const progress = (0, import_react_native_reanimated25.useSharedValue)(isOn ? 1 : 0);
  import_react62.default.useEffect(() => {
    const target = isOn ? 1 : 0;
    progress.value = reduceMotion ? target : (0, import_react_native_reanimated25.withSpring)(target, import_tokens6.spring.snappy);
  }, [isOn, reduceMotion]);
  const trackStyle = (0, import_react_native_reanimated25.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated25.interpolateColor)(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    )
  }));
  const thumbStyle = (0, import_react_native_reanimated25.useAnimatedStyle)(() => ({
    transform: [{ translateX: progress.value * thumbTravel }]
  }));
  return /* @__PURE__ */ import_react62.default.createElement(
    import_react_native61.Pressable,
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
    /* @__PURE__ */ import_react62.default.createElement(
      import_react_native_reanimated25.default.View,
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
      /* @__PURE__ */ import_react62.default.createElement(
        import_react_native_reanimated25.default.View,
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
    (label || description) && /* @__PURE__ */ import_react62.default.createElement(import_react_native61.View, { style: { flex: 1 } }, label && /* @__PURE__ */ import_react62.default.createElement(import_react_native61.Text, { style: { fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium } }, label), description && /* @__PURE__ */ import_react62.default.createElement(
      import_react_native61.Text,
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
var import_react63 = __toESM(require("react"));
var import_react_native62 = require("react-native");
var import_headless60 = require("@truongdq01/headless");
var TableContext = (0, import_react63.createContext)(null);
function useTableContext() {
  return (0, import_react63.useContext)(TableContext);
}
function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style
}) {
  const ctx = (0, import_react63.useMemo)(() => ({ size, padding, stickyHeader }), [size, padding, stickyHeader]);
  return /* @__PURE__ */ import_react63.default.createElement(TableContext.Provider, { value: ctx }, /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style }, children));
}
function TableContainer({ children, style }) {
  const { table } = (0, import_headless60.useComponentTokens)();
  return /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.ScrollView,
    {
      horizontal: true,
      style: [
        table.container,
        style
      ]
    },
    /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: { minWidth: "100%" } }, children)
  );
}
function TableHead({ children }) {
  const { table } = (0, import_headless60.useComponentTokens)();
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: table.header }, children);
}
function TableBody({ children }) {
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, null, children);
}
function TableFooter({ children }) {
  const { table } = (0, import_headless60.useComponentTokens)();
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: { borderTopWidth: 1, borderTopColor: table.container.borderColor } }, children);
}
function TableRow({ children, selected = false, style }) {
  const { table } = (0, import_headless60.useComponentTokens)();
  const tokens = (0, import_headless60.useTokens)();
  return /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.View,
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
  const { table } = (0, import_headless60.useComponentTokens)();
  const ctx = useTableContext();
  const tokens = (0, import_headless60.useTokens)();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";
  const paddingX = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0
  }[resolvedPadding];
  const paddingY = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: [{ paddingHorizontal: paddingX, paddingVertical: paddingY, flexShrink: 0 }, style] }, /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.Text,
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
  const tokens = (0, import_headless60.useTokens)();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  return /* @__PURE__ */ import_react63.default.createElement(
    import_react_native62.View,
    {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3]
      }
    },
    /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, labelRowsPerPage, ": ", rowsPerPage),
    /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: { flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] } }, /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: { color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm } }, "Page ", page + 1, " of ", totalPages), /* @__PURE__ */ import_react63.default.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page <= 0,
        onPress: () => onPageChange?.(Math.max(0, page - 1)),
        startIcon: /* @__PURE__ */ import_react63.default.createElement(Icon, { size: 16, name: "chevronLeft" })
      },
      "Prev"
    ), /* @__PURE__ */ import_react63.default.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        disabled: page >= totalPages - 1,
        onPress: () => onPageChange?.(Math.min(totalPages - 1, page + 1)),
        endIcon: /* @__PURE__ */ import_react63.default.createElement(Icon, { size: 16, name: "chevronRight" })
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
  const tokens = (0, import_headless60.useTokens)();
  return /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Pressable, { onPress: onClick, style: { flexDirection: "row", alignItems: "center", gap: 6 } }, /* @__PURE__ */ import_react63.default.createElement(import_react_native62.Text, { style: { color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular } }, children), active ? /* @__PURE__ */ import_react63.default.createElement(Icon, { size: 14, color: tokens.color.text.primary }, direction === "asc" ? "arrowUp" : "arrowDown") : /* @__PURE__ */ import_react63.default.createElement(import_react_native62.View, { style: { width: 14 } }));
}

// src/components/Tabs/Tabs.tsx
var import_react64 = __toESM(require("react"));
var import_react_native63 = require("react-native");
var import_headless61 = require("@truongdq01/headless");
var TabsContext = (0, import_react64.createContext)(null);
function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children
}) {
  const { tabs } = (0, import_headless61.useComponentTokens)();
  const { getTabProps, isSelected } = (0, import_headless61.useTabs)({ value, defaultValue, onChange });
  return /* @__PURE__ */ import_react64.default.createElement(TabsContext.Provider, { value: { getTabProps, isSelected, orientation, variant } }, /* @__PURE__ */ import_react64.default.createElement(
    import_react_native63.View,
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
  const { tabs } = (0, import_headless61.useComponentTokens)();
  const tokens = (0, import_headless61.useTokens)();
  const ctx = (0, import_react64.useContext)(TabsContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const { onPress, accessibilityState } = ctx.getTabProps(value, disabled);
  return /* @__PURE__ */ import_react64.default.createElement(
    import_react_native63.Pressable,
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
    label && /* @__PURE__ */ import_react64.default.createElement(
      import_react_native63.Text,
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
var import_react65 = __toESM(require("react"));
var import_react_native64 = require("react-native");
var import_react_native_reanimated26 = __toESM(require("react-native-reanimated"));
var import_headless62 = require("@truongdq01/headless");
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
  const { textArea } = (0, import_headless62.useComponentTokens)();
  const tokens = (0, import_headless62.useTokens)();
  const formGroupVariant = useFormGroupVariant();
  const isGrouped = formGroupVariant === "grouped";
  const [isFocused, setIsFocused] = (0, import_react65.useState)(false);
  const focusProgress = (0, import_react_native_reanimated26.useSharedValue)(0);
  const errorSv = (0, import_react_native_reanimated26.useSharedValue)(0);
  const disabledSv = (0, import_react_native_reanimated26.useSharedValue)(0);
  const groupedSv = (0, import_react_native_reanimated26.useSharedValue)(0);
  (0, import_react65.useEffect)(() => {
    errorSv.value = error ? 1 : 0;
  }, [error, errorSv]);
  (0, import_react65.useEffect)(() => {
    disabledSv.value = disabled ? 1 : 0;
  }, [disabled, disabledSv]);
  (0, import_react65.useEffect)(() => {
    groupedSv.value = isGrouped ? 1 : 0;
  }, [isGrouped, groupedSv]);
  (0, import_react65.useEffect)(() => {
    if (error || disabled) {
      focusProgress.value = 0;
      return;
    }
    focusProgress.value = (0, import_react_native_reanimated26.withTiming)(isFocused ? 1 : 0, { duration: FOCUS_MS2 });
  }, [isFocused, error, disabled, focusProgress]);
  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;
  const errorBorder = tokens.color.border.error;
  const disabledBorder = tokens.color.border.default;
  const animatedBorderStyle = (0, import_react_native_reanimated26.useAnimatedStyle)(() => {
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
      borderColor: (0, import_react_native_reanimated26.interpolateColor)(focusProgress.value, [0, 1], [defaultBorder, focusBorder])
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
  const counterEl = maxLength && showCounter ? /* @__PURE__ */ import_react65.default.createElement(
    import_react_native64.Text,
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
  return /* @__PURE__ */ import_react65.default.createElement(import_react_native64.View, null, (label || showCounterAbove) && /* @__PURE__ */ import_react65.default.createElement(
    import_react_native64.View,
    {
      style: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: tokens.spacing[1]
      }
    },
    label ? /* @__PURE__ */ import_react65.default.createElement(import_react_native64.Text, { style: textArea.label }, label) : null,
    showCounterAbove ? counterEl : null
  ), /* @__PURE__ */ import_react65.default.createElement(
    import_react_native_reanimated26.default.View,
    {
      style: [containerStyle, showCounterInside && { position: "relative" }, animatedBorderStyle]
    },
    /* @__PURE__ */ import_react65.default.createElement(
      import_react_native64.TextInput,
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
    showCounterInside && counterEl ? /* @__PURE__ */ import_react65.default.createElement(
      import_react_native64.View,
      {
        style: {
          position: "absolute",
          right: tokens.spacing[3],
          bottom: tokens.spacing[2]
        }
      },
      counterEl
    ) : null
  ), showCounterBelow && counterEl ? /* @__PURE__ */ import_react65.default.createElement(
    import_react_native64.View,
    {
      style: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: tokens.spacing[1]
      }
    },
    counterEl
  ) : null, error ? /* @__PURE__ */ import_react65.default.createElement(AnimatedHelperText, { text: error, isError: true, style: textArea.errorText }) : /* @__PURE__ */ import_react65.default.createElement(AnimatedHelperText, { text: helperText, isError: false, style: textArea.helperText }));
}

// src/components/TextField/TextField.tsx
var import_react66 = __toESM(require("react"));
var import_react_native65 = require("react-native");
var import_headless63 = require("@truongdq01/headless");
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
  const { textField } = (0, import_headless63.useComponentTokens)();
  const [showPassword, setShowPassword] = (0, import_react66.useState)(false);
  const isPassword = type === "password";
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : void 0;
  const trailingElement = isPassword ? /* @__PURE__ */ import_react66.default.createElement(
    import_react_native65.Pressable,
    {
      onPress: () => setShowPassword(!showPassword),
      style: { padding: 4 },
      hitSlop: 8
    },
    /* @__PURE__ */ import_react66.default.createElement(Icon, { size: 20, color: textField.text.placeholderColor }, showPassword ? "eyeOff" : "eye")
  ) : rest.trailingElement;
  if (select) {
    return /* @__PURE__ */ import_react66.default.createElement(
      Select,
      {
        label: labelText,
        error: errorText,
        ...selectProps
      }
    );
  }
  if (multiline) {
    return /* @__PURE__ */ import_react66.default.createElement(
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
  return /* @__PURE__ */ import_react66.default.createElement(
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
var import_react67 = __toESM(require("react"));
var import_react_native66 = require("react-native");
var import_headless64 = require("@truongdq01/headless");
var TimelineContext = (0, import_react67.createContext)(null);
function useTimelineContext() {
  return (0, import_react67.useContext)(TimelineContext);
}
function Timeline({ position = "right", itemVariant = "filled", children }) {
  const { timeline } = (0, import_headless64.useComponentTokens)();
  return /* @__PURE__ */ import_react67.default.createElement(TimelineContext.Provider, { value: { position, itemVariant } }, /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: timeline.content }, import_react67.default.Children.map(children, (child, index) => {
    if (!import_react67.default.isValidElement(child)) return child;
    if (position === "alternate" || position === "alternate-reverse") {
      const isEven = index % 2 === 0;
      const derived = position === "alternate" ? isEven ? "right" : "left" : isEven ? "left" : "right";
      return import_react67.default.cloneElement(child, { position: child.props.position ?? derived, variant: itemVariant });
    }
    return import_react67.default.cloneElement(child, { variant: itemVariant });
  })));
}
function TimelineItem({ position, variant = "filled", status = "pending", children }) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");
  return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { flexDirection: "row", alignItems: "stretch", minHeight: 80 } }, /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractOpposite(children) : extractContent(children)), /* @__PURE__ */ import_react67.default.createElement(TimelineSeparator, { status, variant }), /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { flex: 1, paddingHorizontal: 16 } }, resolved === "right" ? extractContent(children) : extractOpposite(children)));
}
function extractChildrenByType(children, type) {
  const items = [];
  import_react67.default.Children.forEach(children, (child) => {
    if (import_react67.default.isValidElement(child) && child.type === type) {
      const element = child;
      items.push(element.props.children);
    }
  });
  return items.length > 0 ? items : null;
}
function extractContent(children) {
  const result = extractChildrenByType(children, TimelineContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.Text, null, result[0]);
  }
  return result;
}
function extractOpposite(children) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  if (result && result.length === 1 && typeof result[0] === "string") {
    return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.Text, null, result[0]);
  }
  return result;
}
function TimelineSeparator({ status = "pending", variant = "filled", children }) {
  const { timeline } = (0, import_headless64.useComponentTokens)();
  const connectorColor = status === "completed" ? timeline.dot.completed.borderColor : timeline.connector.color;
  return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { alignItems: "center", width: 48, paddingHorizontal: 8 } }, children || /* @__PURE__ */ import_react67.default.createElement(import_react67.default.Fragment, null, /* @__PURE__ */ import_react67.default.createElement(
    TimelineDot,
    {
      variant,
      status
    }
  ), /* @__PURE__ */ import_react67.default.createElement(TimelineConnector, { color: connectorColor })));
}
function TimelineDot({ variant = "filled", color = "primary", status, size }) {
  const { timeline } = (0, import_headless64.useComponentTokens)();
  const tokens = (0, import_headless64.useTokens)();
  const resolvedStatus = status || (color === "success" ? "completed" : color === "error" ? "error" : color === "primary" ? "active" : "pending");
  const statusTokens = timeline.dot[resolvedStatus] || timeline.dot.pending;
  const dotSize = size || timeline.dot.size || 16;
  return /* @__PURE__ */ import_react67.default.createElement(
    import_react_native66.View,
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
  const { timeline } = (0, import_headless64.useComponentTokens)();
  const resolvedWidth = width || timeline.connector.width;
  return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { width: resolvedWidth, flex: 1, backgroundColor: color || timeline.connector.color, marginVertical: 4, borderRadius: resolvedWidth } });
}
function TimelineContent({ children, align = "left" }) {
  return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, children);
}
function TimelineOppositeContent({ children, align = "right" }) {
  return /* @__PURE__ */ import_react67.default.createElement(import_react_native66.View, { style: { flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" } }, typeof children === "string" ? /* @__PURE__ */ import_react67.default.createElement(import_react_native66.Text, null, children) : children);
}

// src/components/Toast/ToastContainer.tsx
var import_react69 = __toESM(require("react"));
var import_react_native68 = require("react-native");
var import_react_native_reanimated28 = __toESM(require("react-native-reanimated"));
var import_react_native_safe_area_context3 = require("react-native-safe-area-context");
var import_headless66 = require("@truongdq01/headless");

// src/components/Toast/ToastItem.tsx
var import_react68 = __toESM(require("react"));
var import_react_native_reanimated27 = __toESM(require("react-native-reanimated"));
var import_react_native67 = require("react-native");
var import_headless65 = require("@truongdq01/headless");
var VARIANT_ICONS = {
  success: "checkCircle",
  error: "error",
  warning: "warning",
  info: "info"
};
function ToastItem({ item, position, onDismiss }) {
  const { toast } = (0, import_headless65.useComponentTokens)();
  const tokens = (0, import_headless65.useTokens)();
  const reduceMotion = (0, import_headless65.useReduceMotionEnabled)();
  const progress = (0, import_react_native_reanimated27.useSharedValue)(1);
  (0, import_react68.useEffect)(() => {
    if (item.persistent) return;
    progress.value = (0, import_react_native_reanimated27.withTiming)(0, { duration: item.duration }, (finished) => {
      if (finished) (0, import_react_native_reanimated27.runOnJS)(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);
  const progressStyle = (0, import_react_native_reanimated27.useAnimatedStyle)(() => ({
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
  const entering = reduceMotion ? void 0 : position === "top" ? import_react_native_reanimated27.SlideInDown.duration(280).easing(import_react_native_reanimated27.Easing.out(import_react_native_reanimated27.Easing.cubic)) : import_react_native_reanimated27.SlideInUp.duration(280).easing(import_react_native_reanimated27.Easing.out(import_react_native_reanimated27.Easing.cubic));
  const exiting = reduceMotion ? void 0 : position === "top" ? import_react_native_reanimated27.FadeOutUp.duration(200) : import_react_native_reanimated27.FadeOutDown.duration(200);
  return /* @__PURE__ */ import_react68.default.createElement(
    import_react_native_reanimated27.default.View,
    {
      entering,
      exiting,
      style: [
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 }
      ]
    },
    item.icon ? /* @__PURE__ */ import_react68.default.createElement(import_react_native67.View, { style: { width: 20, height: 20, alignItems: "center", justifyContent: "center" } }, import_react68.default.isValidElement(item.icon) ? import_react68.default.cloneElement(item.icon, {
      size: item.icon.props.size ?? 20,
      color: item.icon.props.color ?? "#FFFFFF"
    }) : item.icon) : item.variant !== "default" && /* @__PURE__ */ import_react68.default.createElement(Icon, { size: 20, color: v.iconColor, name: VARIANT_ICONS[item.variant] ?? "info" }),
    /* @__PURE__ */ import_react68.default.createElement(import_react_native67.Text, { style: [toast.text, { flex: 1 }], numberOfLines: 3 }, item.message),
    item.action && /* @__PURE__ */ import_react68.default.createElement(
      import_react_native67.Pressable,
      {
        onPress: () => {
          item.action.onPress();
          onDismiss(item.id);
        },
        style: { paddingLeft: 4 }
      },
      /* @__PURE__ */ import_react68.default.createElement(import_react_native67.Text, { style: { fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted } }, item.action.label)
    ),
    /* @__PURE__ */ import_react68.default.createElement(
      import_react_native67.Pressable,
      {
        onPress: () => onDismiss(item.id),
        hitSlop: 8,
        accessibilityRole: "button",
        accessibilityLabel: "Dismiss"
      },
      /* @__PURE__ */ import_react68.default.createElement(Icon, { size: 18, color: toast.text.color, name: "close" })
    ),
    !item.persistent && /* @__PURE__ */ import_react68.default.createElement(import_react_native67.View, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" } }, /* @__PURE__ */ import_react68.default.createElement(import_react_native_reanimated27.default.View, { style: [{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle] }))
  );
}

// src/components/Toast/ToastContainer.tsx
var layoutTransition = typeof import_react_native_reanimated28.LinearTransition?.duration === "function" ? import_react_native_reanimated28.LinearTransition.duration(280) : void 0;
function ToastContainer({
  position = "bottom",
  horizontalPadding = 16
}) {
  const { toasts } = (0, import_headless66.useToast)();
  const insets = (0, import_react_native_safe_area_context3.useSafeAreaInsets)();
  const positionStyle = position === "top" ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding } : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ import_react69.default.createElement(
    import_react_native_reanimated28.default.View,
    {
      layout: layoutTransition,
      style: [styles16.container, positionStyle],
      pointerEvents: "box-none",
      accessibilityLiveRegion: "polite",
      accessibilityRole: "alert"
    },
    toasts.map((item) => /* @__PURE__ */ import_react69.default.createElement(
      ToastItem,
      {
        key: item.id,
        item,
        position,
        onDismiss: import_headless66.dismissToast
      }
    ))
  );
}
var styles16 = import_react_native68.StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999,
    gap: 8
  }
});

// src/components/ToggleButton/ToggleButton.tsx
var import_react70 = __toESM(require("react"));
var import_react_native69 = require("react-native");
var import_react_native_reanimated29 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler8 = require("react-native-gesture-handler");
var import_headless67 = require("@truongdq01/headless");
var ToggleContext = (0, import_react70.createContext)(null);
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
  const { isSelected, toggle } = (0, import_headless67.useToggleGroup)({
    value,
    defaultValue,
    exclusive,
    disabled,
    onChange
  });
  return /* @__PURE__ */ import_react70.default.createElement(ToggleContext.Provider, { value: { isSelected, toggle, size, disabled } }, /* @__PURE__ */ import_react70.default.createElement(import_react_native69.View, { style: { flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 } }, children));
}
function ToggleButton({ value, disabled = false, children }) {
  const { toggleButton } = (0, import_headless67.useComponentTokens)();
  const tokens = (0, import_headless67.useTokens)();
  const ctx = (0, import_react70.useContext)(ToggleContext);
  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;
  const { animatedStyle, gesture, accessibilityProps } = (0, import_headless67.usePressable)({
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
  return /* @__PURE__ */ import_react70.default.createElement(import_react_native_gesture_handler8.GestureDetector, { gesture }, /* @__PURE__ */ import_react70.default.createElement(
    import_react_native_reanimated29.default.View,
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
    /* @__PURE__ */ import_react70.default.createElement(
      import_react_native69.Text,
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
var import_react71 = __toESM(require("react"));
var import_react_native70 = require("react-native");
var import_react_native_reanimated30 = __toESM(require("react-native-reanimated"));
var import_headless68 = require("@truongdq01/headless");
function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}) {
  const { tooltip } = (0, import_headless68.useComponentTokens)();
  const tokens = (0, import_headless68.useTokens)();
  const [internalOpen, setInternalOpen] = (0, import_react71.useState)(false);
  const { width: windowWidth, height: windowHeight } = (0, import_react_native70.useWindowDimensions)();
  const [triggerRect, setTriggerRect] = (0, import_react71.useState)(null);
  const [tooltipSize, setTooltipSize] = (0, import_react71.useState)({ width: 0, height: 0 });
  const triggerRef = import_react71.default.useRef(null);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const opacity = (0, import_react_native_reanimated30.useSharedValue)(0);
  const animateIn = (0, import_react71.useCallback)(() => {
    opacity.value = (0, import_react_native_reanimated30.withTiming)(1, { duration: 150 });
  }, []);
  const animateOut = (0, import_react71.useCallback)((onDone) => {
    opacity.value = (0, import_react_native_reanimated30.withTiming)(0, { duration: 100 }, () => {
      (0, import_react_native_reanimated30.runOnJS)(onDone)();
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
  const animStyle = (0, import_react_native_reanimated30.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /* @__PURE__ */ import_react71.default.createElement(import_react71.default.Fragment, null, /* @__PURE__ */ import_react71.default.createElement(
    import_react_native70.Pressable,
    {
      ref: triggerRef,
      onPress: handleOpen,
      onLongPress: handleOpen,
      delayLongPress: 400,
      accessibilityRole: "button",
      accessibilityHint: "Shows tooltip"
    },
    children
  ), /* @__PURE__ */ import_react71.default.createElement(
    import_react_native70.Modal,
    {
      visible: isOpen,
      transparent: true,
      animationType: "none",
      onRequestClose: handleClose
    },
    /* @__PURE__ */ import_react71.default.createElement(
      import_react_native70.Pressable,
      {
        style: { flex: 1, backgroundColor: "transparent" },
        onPress: handleClose
      },
      /* @__PURE__ */ import_react71.default.createElement(
        import_react_native_reanimated30.default.View,
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
        typeof title === "string" ? /* @__PURE__ */ import_react71.default.createElement(import_react_native70.Text, { style: tooltip.text }, title) : title
      )
    )
  ));
}

// src/components/Typography/Typography.tsx
var import_react72 = __toESM(require("react"));
var import_react_native71 = require("react-native");
var import_headless69 = require("@truongdq01/headless");
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
  const { typography } = (0, import_headless69.useComponentTokens)();
  const tokens = (0, import_headless69.useTokens)();
  const variantStyle = variant === "inherit" ? {} : typography.variants[variant] || {};
  const presetColors = typography.colors;
  const resolvedColor = color != null && color !== "" && typeof color === "string" && Object.prototype.hasOwnProperty.call(presetColors, color) ? presetColors[color] : color || presetColors.primary;
  const resolvedDisplay = display === "block" || display === "inline" || display === "inline-flex" ? "flex" : display;
  const sans = tokens.fontFamily?.sans;
  const sansFont = sans != null && sans !== "" ? { fontFamily: sans } : null;
  const skipSans = variant === "code";
  const a11y = accessibilityForAs(as);
  return /* @__PURE__ */ import_react72.default.createElement(
    import_react_native71.Text,
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
var Typography = import_react72.default.memo(TypographyInner);

// src/components/TelegramTabBar/TelegramTabBar.tsx
var import_react73 = __toESM(require("react"));
var import_react_native72 = require("react-native");
var import_react_native_reanimated31 = __toESM(require("react-native-reanimated"));
var import_headless70 = require("@truongdq01/headless");
var TabBarContext = (0, import_react73.createContext)(null);
function TelegramTabBar({
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  glassEffect = true
}) {
  const tokens = (0, import_headless70.useTokens)();
  const { bottomNavigation } = (0, import_headless70.useComponentTokens)();
  const [internalValue, setInternalValue] = import_react73.default.useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const isSelected = (itemValue) => value === itemValue;
  const getItemProps = (itemValue, disabled) => ({
    onPress: disabled ? void 0 : () => {
      if (controlledValue === void 0) setInternalValue(itemValue);
      onChange?.(itemValue);
    }
  });
  return /* @__PURE__ */ import_react73.default.createElement(TabBarContext.Provider, { value: { value, isSelected, getItemProps } }, /* @__PURE__ */ import_react73.default.createElement(
    import_react_native72.View,
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
  const tokens = (0, import_headless70.useTokens)();
  const ctx = (0, import_react73.useContext)(TabBarContext);
  if (!ctx) return null;
  const selected = ctx.isSelected(value);
  const progress = (0, import_react_native_reanimated31.useSharedValue)(selected ? 1 : 0);
  import_react73.default.useEffect(() => {
    progress.value = (0, import_react_native_reanimated31.withSpring)(selected ? 1 : 0, {
      damping: 22,
      stiffness: 300
    });
  }, [selected]);
  const iconStyle = (0, import_react_native_reanimated31.useAnimatedStyle)(() => ({
    transform: [{ scale: (0, import_react_native_reanimated31.interpolate)(progress.value, [0, 1], [1, 1.15]) }],
    opacity: (0, import_react_native_reanimated31.interpolate)(progress.value, [0, 1], [0.7, 1])
  }));
  const labelStyle = (0, import_react_native_reanimated31.useAnimatedStyle)(() => ({
    color: (0, import_react_native_reanimated31.interpolateColor)(
      progress.value,
      [0, 1],
      [tokens.color.text.secondary, tokens.color.brand.default]
    ),
    transform: [{ scale: (0, import_react_native_reanimated31.interpolate)(progress.value, [0, 1], [0.95, 1]) }],
    opacity: (0, import_react_native_reanimated31.interpolate)(progress.value, [0, 1], [0.7, 1])
  }));
  const dotStyle = (0, import_react_native_reanimated31.useAnimatedStyle)(() => ({
    opacity: (0, import_react_native_reanimated31.interpolate)(progress.value, [0, 1], [0, 1]),
    transform: [{ scale: (0, import_react_native_reanimated31.interpolate)(progress.value, [0, 1], [0, 1]) }]
  }));
  const itemProps = ctx.getItemProps(value, disabled);
  return /* @__PURE__ */ import_react73.default.createElement(
    import_react_native72.Pressable,
    {
      ...itemProps,
      disabled,
      style: ({ pressed }) => [
        styles17.tabItem,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.3 }
      ]
    },
    /* @__PURE__ */ import_react73.default.createElement(import_react_native72.View, { style: styles17.iconContainer }, /* @__PURE__ */ import_react73.default.createElement(import_react_native_reanimated31.default.View, { style: iconStyle }, selected && activeIcon ? activeIcon : icon), badge !== void 0 && badge !== false && /* @__PURE__ */ import_react73.default.createElement(
      Badge,
      {
        count: typeof badge === "boolean" ? void 0 : badge,
        dot: typeof badge === "boolean",
        style: styles17.badge
      }
    )),
    /* @__PURE__ */ import_react73.default.createElement(import_react_native_reanimated31.default.Text, { style: [styles17.tabLabel, labelStyle] }, label),
    /* @__PURE__ */ import_react73.default.createElement(import_react_native_reanimated31.default.View, { style: [styles17.activeDot, dotStyle, { backgroundColor: tokens.color.brand.default }] })
  );
}
var styles17 = import_react_native72.StyleSheet.create({
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
var import_react74 = __toESM(require("react"));
var import_react_native73 = require("react-native");
var import_react_native_reanimated32 = __toESM(require("react-native-reanimated"));
var import_headless71 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless71.useTokens)();
  const { list } = (0, import_headless71.useComponentTokens)();
  const pressed = (0, import_react_native_reanimated32.useSharedValue)(0);
  const containerStyle = (0, import_react_native_reanimated32.useAnimatedStyle)(() => ({
    backgroundColor: pressed.value === 1 ? tokens.color.surface.hover : selected ? tokens.color.brand.subtle : "transparent"
  }));
  return /* @__PURE__ */ import_react74.default.createElement(
    import_react_native73.Pressable,
    {
      onPress,
      onLongPress,
      disabled,
      onPressIn: () => {
        pressed.value = (0, import_react_native_reanimated32.withSpring)(1, { damping: 20 });
      },
      onPressOut: () => {
        pressed.value = (0, import_react_native_reanimated32.withSpring)(0, { damping: 20 });
      }
    },
    /* @__PURE__ */ import_react74.default.createElement(import_react_native_reanimated32.default.View, { style: [styles18.container, containerStyle] }, avatar && /* @__PURE__ */ import_react74.default.createElement(
      Avatar,
      {
        src: avatar.src,
        initials: avatar.initials,
        status: avatar.status,
        size: "md",
        style: styles18.avatar
      }
    ), /* @__PURE__ */ import_react74.default.createElement(import_react_native73.View, { style: styles18.content }, /* @__PURE__ */ import_react74.default.createElement(import_react_native73.View, { style: styles18.headerRow }, /* @__PURE__ */ import_react74.default.createElement(import_react_native73.View, { style: styles18.nameContainer }, pinned && /* @__PURE__ */ import_react74.default.createElement(import_react_native73.Text, { style: [styles18.iconPin, { color: tokens.color.brand.default }] }, "\u{1F4CC}"), /* @__PURE__ */ import_react74.default.createElement(
      import_react_native73.Text,
      {
        style: [
          styles18.name,
          { color: tokens.color.text.primary },
          muted && { color: tokens.color.text.secondary }
        ],
        numberOfLines: 1
      },
      name
    ), muted && /* @__PURE__ */ import_react74.default.createElement(import_react_native73.Text, { style: [styles18.iconMute, { color: tokens.color.text.tertiary }] }, "\u{1F515}")), time && /* @__PURE__ */ import_react74.default.createElement(
      import_react_native73.Text,
      {
        style: [
          styles18.time,
          { color: tokens.color.text.tertiary },
          unread && unread > 0 ? { color: tokens.color.brand.default, fontWeight: "600" } : void 0
        ]
      },
      time
    )), /* @__PURE__ */ import_react74.default.createElement(import_react_native73.View, { style: styles18.previewRow }, /* @__PURE__ */ import_react74.default.createElement(import_react_native73.View, { style: styles18.previewContainer }, outgoing && /* @__PURE__ */ import_react74.default.createElement(import_react_native73.Text, { style: [styles18.checkmark, { color: read ? tokens.color.info.icon : tokens.color.text.tertiary }] }, read ? "\u2713\u2713" : "\u2713"), preview && /* @__PURE__ */ import_react74.default.createElement(import_react_native73.Text, { style: [styles18.preview, { color: tokens.color.text.secondary }], numberOfLines: 1 }, preview)), /* @__PURE__ */ import_react74.default.createElement(import_react_native73.View, { style: styles18.rightContainer }, unread && unread > 0 && /* @__PURE__ */ import_react74.default.createElement(Badge, { label: String(unread), size: "sm" }), trailingElement))))
  );
}
var styles18 = import_react_native73.StyleSheet.create({
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
var import_react75 = __toESM(require("react"));
var import_react_native74 = require("react-native");
var import_react_native_reanimated33 = __toESM(require("react-native-reanimated"));
var import_headless72 = require("@truongdq01/headless");
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
  const tokens = (0, import_headless72.useTokens)();
  const { input } = (0, import_headless72.useComponentTokens)();
  const { size: iconSize } = (0, import_headless72.useIconStyle)("input");
  const inputRef = (0, import_react75.useRef)(null);
  const [focused, setFocused] = (0, import_react75.useState)(false);
  const [text, setText] = (0, import_react75.useState)(value ?? "");
  const height = (0, import_react_native_reanimated33.useSharedValue)(48);
  const attachVisible = (0, import_react_native_reanimated33.useSharedValue)(1);
  const hasText = text.length > 0;
  import_react75.default.useEffect(() => {
    attachVisible.value = (0, import_react_native_reanimated33.withTiming)(hasText ? 0 : 1, { duration: 180 });
  }, [hasText]);
  const inputStyle = (0, import_react_native_reanimated33.useAnimatedStyle)(() => ({
    minHeight: height.value
  }));
  const attachStyle = (0, import_react_native_reanimated33.useAnimatedStyle)(() => ({
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
  return /* @__PURE__ */ import_react75.default.createElement(
    import_react_native74.View,
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
    showAttach && /* @__PURE__ */ import_react75.default.createElement(import_react_native_reanimated33.default.View, { style: attachStyle }, /* @__PURE__ */ import_react75.default.createElement(
      import_react_native74.Pressable,
      {
        style: styles19.actionButton,
        onPress: onAttach,
        disabled,
        hitSlop: 8
      },
      /* @__PURE__ */ import_react75.default.createElement(import_react_native74.View, { style: [styles19.iconButton, { opacity: disabled ? 0.3 : 0.7 }] }, /* @__PURE__ */ import_react75.default.createElement(import_react_native74.Text, { style: styles19.icon }, "\u{1F4CE}"))
    )),
    leftActions,
    /* @__PURE__ */ import_react75.default.createElement(import_react_native_reanimated33.default.View, { style: [styles19.inputWrapper, inputStyle] }, /* @__PURE__ */ import_react75.default.createElement(
      import_react_native74.TextInput,
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
    ), showSticker && /* @__PURE__ */ import_react75.default.createElement(
      import_react_native74.Pressable,
      {
        style: styles19.stickerButton,
        onPress: onSticker,
        disabled,
        hitSlop: 8
      },
      /* @__PURE__ */ import_react75.default.createElement(import_react_native74.Text, { style: [styles19.icon, { opacity: disabled ? 0.3 : 0.7 }] }, "\u{1F60A}")
    )),
    rightActions,
    showSend && (sendButton ?? /* @__PURE__ */ import_react75.default.createElement(
      import_react_native74.Pressable,
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
      /* @__PURE__ */ import_react75.default.createElement(import_react_native74.Text, { style: [styles19.sendIcon, hasText && { color: "#FFFFFF" }] }, hasText ? "\u27A4" : "\u{1F3A4}")
    ))
  );
}
var styles19 = import_react_native74.StyleSheet.create({
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
var import_react76 = __toESM(require("react"));
var import_react_native75 = require("react-native");
var import_react_native_reanimated34 = __toESM(require("react-native-reanimated"));
var import_headless73 = require("@truongdq01/headless");
var import_expo_blur = require("expo-blur");
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
  const tokens = (0, import_headless73.useTokens)();
  const { height: windowHeight } = (0, import_react_native75.useWindowDimensions)();
  const [mounted, setMounted] = import_react76.default.useState(open);
  const translateY = (0, import_react_native_reanimated34.useSharedValue)(position === "bottom" ? 100 : -100);
  const opacity = (0, import_react_native_reanimated34.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated34.useSharedValue)(0.95);
  const animateIn = (0, import_react76.useCallback)(() => {
    translateY.value = (0, import_react_native_reanimated34.withSpring)(0, { damping: 25, stiffness: 300 });
    opacity.value = (0, import_react_native_reanimated34.withTiming)(1, { duration: 200 });
    scale.value = (0, import_react_native_reanimated34.withSpring)(1, { damping: 25, stiffness: 300 });
  }, []);
  const animateOut = (0, import_react76.useCallback)((onDone) => {
    translateY.value = (0, import_react_native_reanimated34.withTiming)(position === "bottom" ? 100 : -100, { duration: 200 });
    opacity.value = (0, import_react_native_reanimated34.withTiming)(0, { duration: 150 }, (done) => {
      if (done) (0, import_react_native_reanimated34.runOnJS)(onDone)();
    });
  }, [position]);
  import_react76.default.useEffect(() => {
    if (open) {
      setMounted(true);
      translateY.value = position === "bottom" ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);
  import_react76.default.useEffect(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);
  const positionStyle = position === "top" ? { top: 48, alignSelf: "center" } : position === "bottom" ? { bottom: 96, alignSelf: "center" } : { alignSelf: "center", top: windowHeight / 2 - 50 };
  const animStyle = (0, import_react_native_reanimated34.useAnimatedStyle)(() => ({
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
  return /* @__PURE__ */ import_react76.default.createElement(import_react_native75.Modal, { visible: mounted || open, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react76.default.createElement(import_react_native75.Pressable, { style: styles20.overlay, onPress: onClose }, blur && /* @__PURE__ */ import_react76.default.createElement(
    import_expo_blur.BlurView,
    {
      style: import_react_native75.StyleSheet.absoluteFill,
      tint: tokens.color.bg.default === "#FFFFFF" ? "light" : "dark",
      intensity: 20
    }
  ), /* @__PURE__ */ import_react76.default.createElement(
    import_react_native_reanimated34.default.View,
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
    /* @__PURE__ */ import_react76.default.createElement(import_react_native75.View, { style: styles20.content }, icon && /* @__PURE__ */ import_react76.default.createElement(import_react_native75.View, { style: styles20.iconContainer }, icon), /* @__PURE__ */ import_react76.default.createElement(import_react_native75.View, { style: styles20.textContent }, title && /* @__PURE__ */ import_react76.default.createElement(import_react_native75.Text, { style: [styles20.title, { color: tokens.color.text.primary }] }, title), typeof message === "string" ? /* @__PURE__ */ import_react76.default.createElement(import_react_native75.Text, { style: [styles20.message, { color: tokens.color.text.secondary }] }, message) : message)),
    actions && /* @__PURE__ */ import_react76.default.createElement(import_react_native75.View, { style: styles20.actions }, actions)
  )));
}
var styles20 = import_react_native75.StyleSheet.create({
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
var import_react77 = __toESM(require("react"));
var import_react_native76 = require("react-native");
var import_react_native_reanimated35 = __toESM(require("react-native-reanimated"));
var import_headless74 = require("@truongdq01/headless");
function TelegramContextMenu({
  open,
  onClose,
  items,
  anchor
}) {
  const tokens = (0, import_headless74.useTokens)();
  const { width: windowWidth, height: windowHeight } = (0, import_react_native76.useWindowDimensions)();
  const [mounted, setMounted] = import_react77.default.useState(open);
  const [menuSize, setMenuSize] = import_react77.default.useState({ width: 200, height: 0 });
  const opacity = (0, import_react_native_reanimated35.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated35.useSharedValue)(0.9);
  const animateIn = (0, import_react77.useCallback)(() => {
    opacity.value = (0, import_react_native_reanimated35.withTiming)(1, { duration: 180 });
    scale.value = (0, import_react_native_reanimated35.withSpring)(1, { damping: 18, stiffness: 320 });
  }, []);
  const animateOut = (0, import_react77.useCallback)((onDone) => {
    opacity.value = (0, import_react_native_reanimated35.withTiming)(0, { duration: 130 });
    scale.value = (0, import_react_native_reanimated35.withTiming)(0.92, { duration: 130 }, (done) => {
      if (done) (0, import_react_native_reanimated35.runOnJS)(onDone)();
    });
  }, []);
  import_react77.default.useEffect(() => {
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
  const animStyle = (0, import_react_native_reanimated35.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));
  if (!mounted) return null;
  return /* @__PURE__ */ import_react77.default.createElement(import_react_native76.Modal, { visible: mounted, transparent: true, animationType: "none", onRequestClose: onClose }, /* @__PURE__ */ import_react77.default.createElement(import_react_native76.Pressable, { style: styles21.overlay, onPress: onClose }), /* @__PURE__ */ import_react77.default.createElement(
    import_react_native_reanimated35.default.View,
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
    items.map((item, index) => /* @__PURE__ */ import_react77.default.createElement(
      import_react_native76.Pressable,
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
      item.icon && /* @__PURE__ */ import_react77.default.createElement(import_react_native76.View, { style: styles21.itemIcon }, item.icon),
      /* @__PURE__ */ import_react77.default.createElement(
        import_react_native76.Text,
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
var styles21 = import_react_native76.StyleSheet.create({
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
var import_react78 = __toESM(require("react"));
var import_react_native77 = require("react-native");
var import_headless75 = require("@truongdq01/headless");
function TelegramSettingsMenu({ sections, variant = "grouped" }) {
  const tokens = (0, import_headless75.useTokens)();
  return /* @__PURE__ */ import_react78.default.createElement(import_react_native77.View, { style: styles22.container }, sections.map((section, sectionIndex) => /* @__PURE__ */ import_react78.default.createElement(import_react78.default.Fragment, { key: sectionIndex }, section.title && /* @__PURE__ */ import_react78.default.createElement(import_react_native77.View, { style: styles22.sectionHeader }, /* @__PURE__ */ import_react78.default.createElement(import_react_native77.Text, { style: [styles22.sectionTitle, { color: tokens.color.text.secondary }] }, section.title)), /* @__PURE__ */ import_react78.default.createElement(
    import_react_native77.View,
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
    section.items.map((item, itemIndex) => /* @__PURE__ */ import_react78.default.createElement(
      import_react_native77.Pressable,
      {
        key: item.id,
        onPress: item.onPress,
        disabled: item.disabled,
        style: ({ pressed }) => [
          styles22.item,
          pressed && { backgroundColor: tokens.color.surface.hover },
          item.disabled && { opacity: 0.3 },
          itemIndex !== section.items.length - 1 && {
            borderBottomWidth: import_react_native77.StyleSheet.hairlineWidth,
            borderBottomColor: tokens.color.border.subtle,
            marginLeft: 56
          }
        ]
      },
      item.icon && /* @__PURE__ */ import_react78.default.createElement(import_react_native77.View, { style: styles22.itemIcon }, item.icon),
      /* @__PURE__ */ import_react78.default.createElement(import_react_native77.View, { style: styles22.itemContent }, /* @__PURE__ */ import_react78.default.createElement(
        import_react_native77.Text,
        {
          style: [
            styles22.itemLabel,
            { color: item.destructive ? tokens.color.error.text : tokens.color.text.primary }
          ]
        },
        item.label
      ), item.subtitle && /* @__PURE__ */ import_react78.default.createElement(import_react_native77.Text, { style: [styles22.itemSubtitle, { color: tokens.color.text.secondary }] }, item.subtitle)),
      /* @__PURE__ */ import_react78.default.createElement(import_react_native77.View, { style: styles22.itemRight }, item.value, /* @__PURE__ */ import_react78.default.createElement(import_react_native77.Text, { style: [styles22.chevron, { color: tokens.color.text.tertiary }] }, "\u203A"))
    ))
  ))));
}
var styles22 = import_react_native77.StyleSheet.create({
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
var import_react_native78 = require("react-native");
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
  Marquee,
  Menu,
  MenuItem,
  MessageInput,
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
  useComponentTokens,
  useForm,
  useFormControl,
  useIsDark,
  useTheme,
  useTokens
});
//# sourceMappingURL=index.js.map