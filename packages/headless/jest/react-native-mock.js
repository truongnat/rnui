const React = require('react');

const createComponent = (name) => {
  const Component = ({ children, ...props }) =>
    React.createElement(name, props, children);
  Component.displayName = name;
  return Component;
};

const View = createComponent('View');
const Text = createComponent('Text');
const Image = createComponent('Image');
const ScrollView = createComponent('ScrollView');
const Modal = ({ visible, children, onRequestClose }) => {
  if (!visible) return null;
  return React.createElement(View, { testID: 'modal' }, children);
};
const ActivityIndicator = createComponent('ActivityIndicator');
const Pressable = createComponent('Pressable');
const TouchableOpacity = createComponent('TouchableOpacity');
const TouchableHighlight = createComponent('TouchableHighlight');
const TouchableWithoutFeedback = createComponent('TouchableWithoutFeedback');
const TextInput = createComponent('TextInput');
const Switch = createComponent('Switch');
const FlatList = createComponent('FlatList');
const SectionList = createComponent('SectionList');
const Touchable = {
  Mixin: {
    touchableHandleStartShouldSetResponder: () => false,
    touchableHandleMoveShouldSetResponder: () => false,
    touchableHandleResponderTerminationRequest: () => false,
    touchableHandleResponderGrant: () => {},
    touchableHandleResponderMove: () => {},
    touchableHandleResponderRelease: () => {},
    touchableHandleResponderTerminate: () => {},
  },
};

const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style,
  hairlineWidth: 1,
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const Platform = {
  OS: 'ios',
  Version: '0.0',
  select: (obj) => (obj ? (obj.ios ?? obj.default) : undefined),
};

const Dimensions = {
  get: () => ({ width: 375, height: 812, scale: 2, fontScale: 2 }),
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
};
const useWindowDimensions = () => Dimensions.get();
const useColorScheme = () => 'light';
const Appearance = {
  getColorScheme: () => 'light',
  addChangeListener: () => ({ remove: () => {} }),
};

const PixelRatio = {
  get: () => 2,
  roundToNearestPixel: (v) => v,
};

const Animated = {
  Value: function Value(v) {
    this._value = v;
  },
  timing: () => ({ start: (cb) => cb && cb() }),
  spring: () => ({ start: (cb) => cb && cb() }),
  event: () => {},
  createAnimatedComponent: (comp) => comp,
};

const LayoutAnimation = {
  configureNext: () => {},
  Types: {},
  Properties: {},
};

const InteractionManager = {
  runAfterInteractions: (cb) => {
    if (cb) cb();
    return { cancel: () => {} };
  },
};

const AccessibilityInfo = {
  isScreenReaderEnabled: async () => false,
  addEventListener: () => ({ remove: () => {} }),
};

const Vibration = {
  vibrate: () => {},
  cancel: () => {},
};

const Keyboard = {
  dismiss: () => {},
  addListener: () => ({ remove: () => {} }),
};

const I18nManager = {
  isRTL: false,
  allowRTL: () => {},
  forceRTL: () => {},
};
const PanResponder = {
  create: () => ({ panHandlers: {} }),
};

const NativeModules = {};
const UIManager = {};
const TurboModuleRegistry = {};
const findNodeHandle = () => null;
const processColor = (value) => value;
const requireNativeComponent = (name) => createComponent(name);

// Mock requestAnimationFrame for tests
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
class NativeEventEmitter {
  addListener() {
    return { remove: () => {} };
  }
  removeAllListeners() {}
}

module.exports = {
  __esModule: true,
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Touchable,
  TextInput,
  Switch,
  FlatList,
  SectionList,
  StyleSheet,
  Platform,
  Dimensions,
  useWindowDimensions,
  useColorScheme,
  Appearance,
  PixelRatio,
  Animated,
  LayoutAnimation,
  InteractionManager,
  AccessibilityInfo,
  Vibration,
  Keyboard,
  I18nManager,
  PanResponder,
  NativeModules,
  NativeEventEmitter,
  UIManager,
  TurboModuleRegistry,
  findNodeHandle,
  processColor,
  requireNativeComponent,
  default: {
    View,
    Text,
    Image,
    ScrollView,
    Modal,
    ActivityIndicator,
    Pressable,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Touchable,
    TextInput,
    Switch,
    FlatList,
    SectionList,
    StyleSheet,
    Platform,
    Dimensions,
    useWindowDimensions,
    useColorScheme,
    Appearance,
    PixelRatio,
    Animated,
    LayoutAnimation,
    InteractionManager,
    AccessibilityInfo,
    Vibration,
    Keyboard,
    I18nManager,
    PanResponder,
    NativeModules,
    NativeEventEmitter,
    UIManager,
    TurboModuleRegistry,
    findNodeHandle,
    processColor,
    requireNativeComponent,
  },
};
