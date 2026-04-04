import React from "react";
import { mock } from "bun:test";

const createMockComponent = (name: string) => {
  const Component = ({ children, ...props }: any) =>
    React.createElement(name, props, children);
  Component.displayName = name;
  return Component;
};

const createReanimatedMock = () => {
  const animatedValue = { value: 0 };
  const createAnimatedComponent = (name: string) => {
    const Component = ({ children, ...props }: any) =>
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };

  const mockApi = {
    useSharedValue: (v: any) => ({ value: v }),
    useDerivedValue: (fn: any) => ({ value: fn() }),
    useAnimatedStyle: (fn: any) => fn(),
    useAnimatedProps: (fn: any) => fn(),
    useAnimatedReaction: () => {},
    useAnimatedScrollHandler: () => () => {},
    useAnimatedGestureHandler: () => () => {},
    useAnimatedRef: () => ({ current: null }),
    useWorkletCallback: (fn: any) => fn,
    useFrameCallback: () => {},
    useAnimatedKeyboard: () => ({ height: animatedValue, state: animatedValue }),
    useAnimatedSensor: () => ({ sensor: animatedValue }),
    useScrollViewOffset: () => animatedValue,

    withTiming: (v: any) => v,
    withSpring: (v: any) => v,
    withDecay: (v: any) => v,
    withDelay: (_delay: any, v: any) => v,
    withRepeat: (v: any) => v,
    withSequence: (...v: any[]) => v[v.length - 1],
    cancelAnimation: () => {},

    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
    makeMutable: (v: any) => ({ value: v }),
    makeShareable: (v: any) => v,

    Easing: {
      bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
      linear: (t: number) => t,
      out: (easing: any) => easing,
      cubic: (t: number) => t,
    },

    createAnimatedComponent: (c: any) => c,
    View: createAnimatedComponent("Reanimated.View"),
    Text: createAnimatedComponent("Reanimated.Text"),
    ScrollView: createAnimatedComponent("Reanimated.ScrollView"),
    Image: createAnimatedComponent("Reanimated.Image"),
    FlatList: createAnimatedComponent("Reanimated.FlatList"),

    interpolate: (_v: any, _input: any, output: any) => output[0],
    interpolateColor: (_v: any, _input: any, output: any) => output[0],
    Extrapolation: {
      CLAMP: "clamp",
      EXTEND: "extend",
      IDENTITY: "identity",
    },
    Extrapolate: {
      CLAMP: "clamp",
      EXTEND: "extend",
      IDENTITY: "identity",
    },
  };

  const defaultExport = {
    View: createAnimatedComponent("Reanimated.View"),
    Text: createAnimatedComponent("Reanimated.Text"),
    ScrollView: createAnimatedComponent("Reanimated.ScrollView"),
    Image: createAnimatedComponent("Reanimated.Image"),
    FlatList: createAnimatedComponent("Reanimated.FlatList"),
    createAnimatedComponent: (c: any) => c,
  };

  return { __esModule: true, ...mockApi, default: defaultExport };
};

const createGestureHandlerMock = () => {
  const createGestureBuilder = () => {
    const chain = {
      enabled: () => chain,
      onBegin: () => chain,
      onStart: () => chain,
      onUpdate: () => chain,
      onEnd: () => chain,
      onFinalize: () => chain,
      onTouchesMove: () => chain,
      onTouchesDown: () => chain,
      onTouchesUp: () => chain,
      onTouchesCancelled: () => chain,
      activeOffsetX: () => chain,
      activeOffsetY: () => chain,
      failOffsetX: () => chain,
      failOffsetY: () => chain,
      minDuration: () => chain,
      hitSlop: () => chain,
      direction: () => chain,
      numberOfTaps: () => chain,
      maxDuration: () => chain,
      minPointers: () => chain,
      maxPointers: () => chain,
      minDistance: () => chain,
      shouldCancelWhenOutside: () => chain,
      withTestId: () => chain,
    };
    return chain;
  };

  const GestureDetector = ({ children }: any) => children;

  return {
    GestureDetector,
    GestureHandlerRootView: createMockComponent("GestureHandlerRootView"),
    Gesture: {
      Tap: createGestureBuilder,
      Pan: createGestureBuilder,
      LongPress: createGestureBuilder,
      Fling: createGestureBuilder,
      Pinch: createGestureBuilder,
      Rotation: createGestureBuilder,
      Hover: createGestureBuilder,
      Native: createGestureBuilder,
      Manual: createGestureBuilder,
      Simultaneous: (...g: any[]) => g,
      Race: (...g: any[]) => g,
      Exclusive: (...g: any[]) => g,
    },
    GestureStateManager: {},
    State: {
      UNDETERMINED: 0,
      FAILED: 1,
      BEGAN: 2,
      CANCELLED: 3,
      ACTIVE: 4,
      END: 5,
    },
    Directions: {
      RIGHT: 1,
      LEFT: 2,
      UP: 4,
      DOWN: 8,
    },
  };
};

mock.module("react-native", () => ({
  View: createMockComponent("View"),
  Text: createMockComponent("Text"),
  Image: createMockComponent("Image"),
  ScrollView: createMockComponent("ScrollView"),
  FlatList: createMockComponent("FlatList"),
  SectionList: createMockComponent("SectionList"),
  TextInput: createMockComponent("TextInput"),
  TouchableOpacity: createMockComponent("TouchableOpacity"),
  TouchableHighlight: createMockComponent("TouchableHighlight"),
  TouchableWithoutFeedback: createMockComponent("TouchableWithoutFeedback"),
  Pressable: createMockComponent("Pressable"),
  Modal: createMockComponent("Modal"),
  ActivityIndicator: createMockComponent("ActivityIndicator"),
  Switch: createMockComponent("Switch"),

  StyleSheet: {
    create: (styles: any) => styles,
    flatten: (style: any) => style,
    compose: (a: any, b: any) => [a, b],
  },

  Platform: {
    OS: "ios",
    Version: "17.0",
    select: (obj: any) => obj.ios || obj.default,
  },

  Dimensions: {
    get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
    addEventListener: () => ({ remove: () => {} }),
  },

  Animated: {
    View: createMockComponent("Animated.View"),
    Text: createMockComponent("Animated.Text"),
    Image: createMockComponent("Animated.Image"),
    ScrollView: createMockComponent("Animated.ScrollView"),
    FlatList: createMockComponent("Animated.FlatList"),
    Value: class {
      constructor(public value: number) {}
      setValue(v: number) { this.value = v; }
      interpolate() { return this; }
    },
    timing: () => ({ start: (cb?: any) => cb?.() }),
    spring: () => ({ start: (cb?: any) => cb?.() }),
    decay: () => ({ start: (cb?: any) => cb?.() }),
    sequence: () => ({ start: (cb?: any) => cb?.() }),
    parallel: () => ({ start: (cb?: any) => cb?.() }),
    stagger: () => ({ start: (cb?: any) => cb?.() }),
    loop: () => ({ start: (cb?: any) => cb?.() }),
    event: () => () => {},
    createAnimatedComponent: (c: any) => c,
  },

  Linking: {
    openURL: async () => true,
    canOpenURL: async () => true,
    getInitialURL: async () => null,
    addEventListener: () => ({ remove: () => {} }),
  },

  Alert: { alert: () => {} },

  Keyboard: {
    dismiss: () => {},
    addListener: () => ({ remove: () => {} }),
  },

  Appearance: {
    getColorScheme: () => "light",
    addChangeListener: () => ({ remove: () => {} }),
  },

  useColorScheme: () => "light",
  useWindowDimensions: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),

  PixelRatio: {
    get: () => 2,
    getFontScale: () => 1,
    getPixelSizeForLayoutSize: (size: number) => size * 2,
    roundToNearestPixel: (size: number) => Math.round(size * 2) / 2,
  },

  AccessibilityInfo: {
    isScreenReaderEnabled: async () => false,
    addEventListener: () => ({ remove: () => {} }),
  },
}));

mock.module("react-native-reanimated", () => createReanimatedMock());
mock.module("react-native-gesture-handler", () => createGestureHandlerMock());
mock.module("react-native-worklets", () => ({
  Worklets: {
    createRunOnJS: (fn: any) => fn,
    createRunOnUI: (fn: any) => fn,
    createContext: () => ({}),
  },
  useSharedValue: (v: any) => ({ value: v }),
  useDerivedValue: (fn: any) => ({ value: fn() }),
  useWorkletCallback: (fn: any) => fn,
  createSerializable: (v: any) => v,
  scheduleOnRN: (fn: any) => fn(),
  scheduleOnUI: (fn: any) => fn(),
  runOnJS: (fn: any) => fn,
  runOnUI: (fn: any) => fn,
  makeShareable: (v: any) => v,
  isWorklet: () => false,
  isReanimated: () => false,
}));

global.IS_REACT_ACT_ENVIRONMENT = true;
global.requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id: any) => clearTimeout(id);

const shouldSuppressTestWarning = (args: unknown[]) =>
  args.some(
    (arg) =>
      typeof arg === "string" &&
      (
        /react-test-renderer is deprecated/i.test(arg) ||
        /not wrapped in act/i.test(arg) ||
        /When testing, code that causes React state updates should be wrapped into act/i.test(arg) ||
        /This ensures that you're testing the behavior the user would see in the browser/i.test(arg)
      )
  );

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  if (shouldSuppressTestWarning(args)) return;
  originalConsoleError(...args);
};

const originalConsoleWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (shouldSuppressTestWarning(args)) return;
  originalConsoleWarn(...args);
};
