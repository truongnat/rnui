import "@testing-library/react-native/extend-expect";
import { configure } from "@testing-library/react-native";
import { createFlashListMock, createGestureHandlerMock, createReanimatedMock } from "./test-mocks";

configure({
  hostComponentNames: {
    text: "Text",
    textInput: "TextInput",
    image: "Image",
    switch: "Switch",
    scrollView: "ScrollView",
    modal: "Modal",
  },
});

const originalConsoleError = console.error;
const isReactTestRendererWarning = (message: unknown) =>
  typeof message === "string" && message.includes("react-test-renderer is deprecated");
console.error = (...args: unknown[]) => {
  if (isReactTestRendererWarning(args[0])) {
    return;
  }
  originalConsoleError(...args as Parameters<typeof originalConsoleError>);
};

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

jest.mock("react-native-reanimated", () => createReanimatedMock());

jest.mock("react-native-gesture-handler", () => createGestureHandlerMock());

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@shopify/flash-list", () => createFlashListMock());

jest.mock("react-native-svg", () => {
  const React = require("react");
  const Svg = ({ children, ...props }: any) => React.createElement("Svg", props, children);
  return {
    __esModule: true,
    Svg,
    Circle: Svg,
    Path: Svg,
    Rect: Svg,
    G: Svg,
    Line: Svg,
    Polygon: Svg,
    Polyline: Svg,
    Defs: Svg,
    LinearGradient: Svg,
    RadialGradient: Svg,
    Stop: Svg,
    ClipPath: Svg,
  };
});

jest.mock("lucide-react-native", () => {
  const React = require("react");
  return new Proxy(
    {},
    {
      get: () => (props: any) => React.createElement("Icon", props, null),
    }
  );
});

global.IS_REACT_ACT_ENVIRONMENT = true;
