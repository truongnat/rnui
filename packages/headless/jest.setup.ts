import "@testing-library/react-native/extend-expect";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => { };
  return Reanimated;
});

jest.mock("react-native-gesture-handler", () => {
  const { View } = require("react-native");
  return {
    Gesture: {
      Tap: () => ({ enabled: () => ({ onBegin: () => ({ onFinalize: () => ({}) }) }) }),
      Pan: () => ({ onStart: () => ({ onUpdate: () => ({ onEnd: () => ({}) }) }) }),
      LongPress: () => ({ enabled: () => ({ minDuration: () => ({ onStart: () => ({}) }) }) }),
      Simultaneous: (...g) => g,
      Race: (...g) => g,
    },
    GestureDetector: View,
    GestureHandlerRootView: View,
  };
});

global.IS_REACT_ACT_ENVIRONMENT = true;
