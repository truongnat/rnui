import '@testing-library/jest-native/extend-expect';

const originalConsoleError = console.error;
const isReactTestRendererWarning = (message: unknown) =>
  typeof message === 'string' &&
  message.includes('react-test-renderer is deprecated');
console.error = (...args: unknown[]) => {
  if (isReactTestRendererWarning(args[0])) {
    return;
  }
  originalConsoleError(...(args as Parameters<typeof originalConsoleError>));
};

jest.mock('react-native-reanimated', () => {
  const { createReanimatedMock } = require('../ui/test-mocks');
  return createReanimatedMock();
});

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  const panChain = {
    enabled: () => panChain,
    onStart: () => panChain,
    onUpdate: () => panChain,
    onEnd: () => panChain,
  };
  return {
    Gesture: {
      Tap: () => ({
        enabled: () => ({ onBegin: () => ({ onFinalize: () => ({}) }) }),
      }),
      Pan: () => panChain,
      LongPress: () => ({
        enabled: () => ({ minDuration: () => ({ onStart: () => ({}) }) }),
      }),
      Simultaneous: (...g) => g,
      Race: (...g) => g,
    },
    GestureDetector: View,
    GestureHandlerRootView: View,
  };
});

global.IS_REACT_ACT_ENVIRONMENT = true;
