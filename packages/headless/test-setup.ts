import { mock } from 'bun:test';
import React from 'react';

type MockViewProps = React.PropsWithChildren<Record<string, unknown>>;

const createMockComponent = (name: string) => {
  const Component = ({ children, ...props }: MockViewProps) =>
    React.createElement(name, props, children);
  Component.displayName = name;
  return Component;
};

const createReanimatedMock = () => {
  const animatedValue = { value: 0 };
  const createAnimatedComponent = (name: string) => {
    const Component = ({ children, ...props }: MockViewProps) =>
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };

  const mockApi = {
    useSharedValue: <T>(v: T) => ({ value: v }),
    useDerivedValue: (fn: () => unknown) => ({ value: fn() }),
    useAnimatedStyle: <S>(fn: () => S) => fn(),
    useAnimatedProps: <P>(fn: () => P) => fn(),
    useAnimatedReaction: () => {},
    useAnimatedScrollHandler: () => () => {},
    useAnimatedGestureHandler: () => () => {},
    useAnimatedRef: () => ({ current: null }),
    useWorkletCallback: <F extends (...args: never[]) => unknown>(fn: F) => fn,
    useFrameCallback: () => {},
    useAnimatedKeyboard: () => ({
      height: animatedValue,
      state: animatedValue,
    }),
    useAnimatedSensor: () => ({ sensor: animatedValue }),
    useScrollViewOffset: () => animatedValue,

    withTiming: <T>(v: T) => v,
    withSpring: <T>(v: T) => v,
    withDecay: <T>(v: T) => v,
    withDelay: <T>(_delay: number, v: T) => v,
    withRepeat: <T>(v: T) => v,
    withSequence: (...v: unknown[]) => v[v.length - 1],
    cancelAnimation: () => {},

    runOnJS: <F extends (...args: never[]) => unknown>(fn: F) => fn,
    runOnUI: <F extends (...args: never[]) => unknown>(fn: F) => fn,
    makeMutable: <T>(v: T) => ({ value: v }),
    makeShareable: <T>(v: T) => v,

    Easing: {
      bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) =>
        t,
      linear: (t: number) => t,
      out: <E>(easing: E) => easing,
      cubic: (t: number) => t,
    },

    createAnimatedComponent: <C>(c: C) => c,
    View: createAnimatedComponent('Reanimated.View'),
    Text: createAnimatedComponent('Reanimated.Text'),
    ScrollView: createAnimatedComponent('Reanimated.ScrollView'),
    Image: createAnimatedComponent('Reanimated.Image'),
    FlatList: createAnimatedComponent('Reanimated.FlatList'),

    interpolate: <T>(_v: number, _input: number[], output: readonly T[]) =>
      output[0],
    interpolateColor: <T>(_v: number, _input: number[], output: readonly T[]) =>
      output[0],
    Extrapolation: {
      CLAMP: 'clamp',
      EXTEND: 'extend',
      IDENTITY: 'identity',
    },
    Extrapolate: {
      CLAMP: 'clamp',
      EXTEND: 'extend',
      IDENTITY: 'identity',
    },
  };

  const defaultExport = {
    View: createAnimatedComponent('Reanimated.View'),
    Text: createAnimatedComponent('Reanimated.Text'),
    ScrollView: createAnimatedComponent('Reanimated.ScrollView'),
    Image: createAnimatedComponent('Reanimated.Image'),
    FlatList: createAnimatedComponent('Reanimated.FlatList'),
    createAnimatedComponent: <C>(c: C) => c,
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

  const GestureDetector = ({ children }: React.PropsWithChildren) =>
    children;

  return {
    GestureDetector,
    GestureHandlerRootView: createMockComponent('GestureHandlerRootView'),
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
      Simultaneous: (...g: unknown[]) => g,
      Race: (...g: unknown[]) => g,
      Exclusive: (...g: unknown[]) => g,
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

mock.module('react-native', () => ({
  View: createMockComponent('View'),
  Text: createMockComponent('Text'),
  Image: createMockComponent('Image'),
  ScrollView: createMockComponent('ScrollView'),
  FlatList: createMockComponent('FlatList'),
  SectionList: createMockComponent('SectionList'),
  TextInput: createMockComponent('TextInput'),
  TouchableOpacity: createMockComponent('TouchableOpacity'),
  TouchableHighlight: createMockComponent('TouchableHighlight'),
  TouchableWithoutFeedback: createMockComponent('TouchableWithoutFeedback'),
  Pressable: createMockComponent('Pressable'),
  Modal: createMockComponent('Modal'),
  ActivityIndicator: createMockComponent('ActivityIndicator'),
  Switch: createMockComponent('Switch'),

  StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => styles,
    flatten: (style: unknown) => style,
    compose: (a: unknown, b: unknown) => [a, b],
  },

  Platform: {
    OS: 'ios',
    Version: '17.0',
    select: (obj: Record<string, unknown>) => obj.ios || obj.default,
  },

  Dimensions: {
    get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
    addEventListener: () => ({ remove: () => {} }),
  },

  Animated: {
    View: createMockComponent('Animated.View'),
    Text: createMockComponent('Animated.Text'),
    Image: createMockComponent('Animated.Image'),
    ScrollView: createMockComponent('Animated.ScrollView'),
    FlatList: createMockComponent('Animated.FlatList'),
    Value: class {
      constructor(public value: number) {}
      setValue(v: number) {
        this.value = v;
      }
      interpolate() {
        return this;
      }
    },
    timing: () => ({ start: (cb?: () => void) => cb?.() }),
    spring: () => ({ start: (cb?: () => void) => cb?.() }),
    decay: () => ({ start: (cb?: () => void) => cb?.() }),
    sequence: () => ({ start: (cb?: () => void) => cb?.() }),
    parallel: () => ({ start: (cb?: () => void) => cb?.() }),
    stagger: () => ({ start: (cb?: () => void) => cb?.() }),
    loop: () => ({ start: (cb?: () => void) => cb?.() }),
    event: () => () => {},
    createAnimatedComponent: <C>(c: C) => c,
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
    getColorScheme: () => 'light',
    addChangeListener: () => ({ remove: () => {} }),
  },

  useColorScheme: () => 'light',
  useWindowDimensions: () => ({
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  }),

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

mock.module('react-native-reanimated', () => createReanimatedMock());
mock.module('react-native-gesture-handler', () => createGestureHandlerMock());
mock.module('react-native-worklets', () => ({
  Worklets: {
    createRunOnJS: <F extends (...args: never[]) => unknown>(fn: F) => fn,
    createRunOnUI: <F extends (...args: never[]) => unknown>(fn: F) => fn,
    createContext: () => ({}),
  },
  useSharedValue: <T>(v: T) => ({ value: v }),
  useDerivedValue: (fn: () => unknown) => ({ value: fn() }),
  useWorkletCallback: <F extends (...args: never[]) => unknown>(fn: F) => fn,
  createSerializable: <T>(v: T) => v,
  scheduleOnRN: <T>(fn: () => T) => fn(),
  scheduleOnUI: <T>(fn: () => T) => fn(),
  runOnJS: <F extends (...args: never[]) => unknown>(fn: F) => fn,
  runOnUI: <F extends (...args: never[]) => unknown>(fn: F) => fn,
  makeShareable: <T>(v: T) => v,
  isWorklet: () => false,
  isReanimated: () => false,
}));

global.IS_REACT_ACT_ENVIRONMENT = true;
global.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 0) as unknown as number;
global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
};

const shouldSuppressTestWarning = (args: unknown[]) =>
  args.some(
    (arg) =>
      typeof arg === 'string' &&
      (/react-test-renderer is deprecated/i.test(arg) ||
        /not wrapped in act/i.test(arg) ||
        /When testing, code that causes React state updates should be wrapped into act/i.test(
          arg
        ) ||
        /This ensures that you're testing the behavior the user would see in the browser/i.test(
          arg
        ))
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
