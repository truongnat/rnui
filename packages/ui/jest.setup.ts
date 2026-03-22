import "@testing-library/react-native/extend-expect";

jest.mock("react-native-worklets", () => ({
  Worklets: {
    createRunOnJS: (fn: any) => fn,
    createRunOnUI: (fn: any) => fn,
    createContext: () => ({}),
  },
  useSharedValue: (v: any) => ({ value: v }),
  useDerivedValue: (v: any) => ({ value: v() }),
  useWorkletCallback: (fn: any) => fn,
  createSerializable: (v: any) => v,
}));

jest.mock("react-native-reanimated", () => {
  const React = require("react");
  return {
    useSharedValue: (v: any) => ({ value: v }),
    useDerivedValue: (v: any) => ({ value: v() }),
    useAnimatedStyle: (fn: any) => fn(),
    useAnimatedProps: (fn: any) => fn(),
    useWorkletCallback: (fn: any) => fn,
    withTiming: (v: any) => v,
    withSpring: (v: any) => v,
    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
    makeMutable: (v: any) => ({ value: v }),
    createAnimatedComponent: (c: any) => c,
    View: ({ children }: any) => React.createElement("View", {}, children),
    Text: ({ children }: any) => React.createElement("Text", {}, children),
    Image: ({ children }: any) => React.createElement("Image", {}, children),
    ScrollView: ({ children }: any) => React.createElement("ScrollView", {}, children),
    interpolate: (v: any, input: any, output: any) => v,
    interpolateColor: (v: any, input: any, output: any) => output[0],
    Extrapolation: { CLAMP: "clamp" },
    Easing: {
      bezier: (a: any, b: any, c: any, d: any) => (t: any) => t,
      linear: (t: any) => t,
      out: (f: any) => f,
      in: (f: any) => f,
      inOut: (f: any) => f,
      quad: (t: any) => t,
      cubic: (t: any) => t,
      poly: (t: any) => t,
      sin: (t: any) => t,
      circle: (t: any) => t,
      exp: (t: any) => t,
      elastic: (t: any) => t,
      back: (t: any) => t,
      bounce: (t: any) => t,
    },
  };
});

jest.mock("react-native-gesture-handler", () => {
  const { View } = require("react-native");
  return {
    Gesture: {
      Tap: () => ({ enabled: () => ({ onBegin: () => ({ onFinalize: () => ({}) }) }) }),
      Pan: () => ({
        enabled: () => ({ activeOffsetX: () => ({ failOffsetY: () => ({ onUpdate: () => ({ onEnd: () => ({}) }) }) }) }),
      }),
      LongPress: () => ({ enabled: () => ({ minDuration: () => ({ onStart: () => ({}) }) }) }),
      Simultaneous: (...g: unknown[]) => g,
      Race: (...g: unknown[]) => g,
    },
    GestureDetector: View,
    GestureHandlerRootView: View,
  };
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@shopify/flash-list", () => {
  const { FlatList } = require("react-native");
  return { FlashList: FlatList };
});

global.IS_REACT_ACT_ENVIRONMENT = true;