import { jest } from '@jest/globals';
import 'react-native';

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  addEventListener: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

global.__fbBatchedBridgeConfig = {};
