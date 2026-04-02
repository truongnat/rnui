import "@testing-library/react-native/extend-expect";

jest.mock("react-native-reanimated", () => {
  const { createReanimatedMock } = require("../ui/test-mocks");
  return createReanimatedMock();
});

jest.mock("react-native-gesture-handler", () => {
  const { View } = require("react-native");
  const panChain = {
    enabled: () => panChain,
    onStart: () => panChain,
    onUpdate: () => panChain,
    onEnd: () => panChain,
  };
  return {
    Gesture: {
      Tap: () => ({ enabled: () => ({ onBegin: () => ({ onFinalize: () => ({}) }) }) }),
      Pan: () => panChain,
      LongPress: () => ({ enabled: () => ({ minDuration: () => ({ onStart: () => ({}) }) }) }),
      Simultaneous: (...g) => g,
      Race: (...g) => g,
    },
    GestureDetector: View,
    GestureHandlerRootView: View,
  };
});

global.IS_REACT_ACT_ENVIRONMENT = true;
