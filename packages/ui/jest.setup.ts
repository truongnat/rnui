import "@testing-library/react-native/extend-expect";

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

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