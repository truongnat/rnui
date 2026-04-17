import { renderHook, act } from '@testing-library/react-native';
import { useBottomSheet } from '../useBottomSheet';

// Mocking dependencies
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ height: 1000, width: 500 }),
  },
}));

jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((init) => ({ value: init })),
  useAnimatedStyle: jest.fn((cb) => cb()),
  withSpring: jest.fn((val, config, cb) => {
    if (cb) cb(true);
    return val;
  }),
  withTiming: jest.fn((val, config, cb) => {
    if (cb) cb(true);
    return val;
  }),
  interpolate: jest.fn(),
  Extrapolation: { CLAMP: 'clamp' },
}));

jest.mock('react-native-worklets', () => ({
  scheduleOnRN: jest.fn((cb, ...args) => {
    if (typeof cb === 'function') {
      cb(...args);
    }
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const panMethods = {
    enabled: jest.fn().mockReturnThis(),
    onBegin: jest.fn().mockReturnThis(),
    onStart: jest.fn().mockReturnThis(),
    onUpdate: jest.fn().mockReturnThis(),
    onEnd: jest.fn().mockReturnThis(),
    onFinalize: jest.fn().mockReturnThis(),
    onTouchesMove: jest.fn().mockReturnThis(),
    onTouchesDown: jest.fn().mockReturnThis(),
    onTouchesUp: jest.fn().mockReturnThis(),
    onTouchesCancelled: jest.fn().mockReturnThis(),
    activeOffsetX: jest.fn().mockReturnThis(),
    activeOffsetY: jest.fn().mockReturnThis(),
    failOffsetX: jest.fn().mockReturnThis(),
    failOffsetY: jest.fn().mockReturnThis(),
    minDuration: jest.fn().mockReturnThis(),
    hitSlop: jest.fn().mockReturnThis(),
    direction: jest.fn().mockReturnThis(),
    numberOfTaps: jest.fn().mockReturnThis(),
    maxDuration: jest.fn().mockReturnThis(),
    minPointers: jest.fn().mockReturnThis(),
    maxPointers: jest.fn().mockReturnThis(),
    minDistance: jest.fn().mockReturnThis(),
    shouldCancelWhenOutside: jest.fn().mockReturnThis(),
    withTestId: jest.fn().mockReturnThis(),
  };
  const tapMethods = {
    enabled: jest.fn().mockReturnThis(),
    onBegin: jest.fn().mockReturnThis(),
    onStart: jest.fn().mockReturnThis(),
    onUpdate: jest.fn().mockReturnThis(),
    onEnd: jest.fn().mockReturnThis(),
    onFinalize: jest.fn().mockReturnThis(),
    onTouchesMove: jest.fn().mockReturnThis(),
    onTouchesDown: jest.fn().mockReturnThis(),
    onTouchesUp: jest.fn().mockReturnThis(),
    onTouchesCancelled: jest.fn().mockReturnThis(),
    activeOffsetX: jest.fn().mockReturnThis(),
    activeOffsetY: jest.fn().mockReturnThis(),
    failOffsetX: jest.fn().mockReturnThis(),
    failOffsetY: jest.fn().mockReturnThis(),
    minDuration: jest.fn().mockReturnThis(),
    hitSlop: jest.fn().mockReturnThis(),
    direction: jest.fn().mockReturnThis(),
    numberOfTaps: jest.fn().mockReturnThis(),
    maxDuration: jest.fn().mockReturnThis(),
    minPointers: jest.fn().mockReturnThis(),
    maxPointers: jest.fn().mockReturnThis(),
    minDistance: jest.fn().mockReturnThis(),
    shouldCancelWhenOutside: jest.fn().mockReturnThis(),
    withTestId: jest.fn().mockReturnThis(),
  };
  return {
    Gesture: {
      Pan: jest.fn(() => panMethods),
      Tap: jest.fn(() => tapMethods),
    },
  };
});

jest.mock('@truongdq01/tokens', () => ({
  spring: {
    gentle: { damping: 50, stiffness: 200 },
  },
}));

describe('useBottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.currentSnapIndex).toBe(0);
    expect(result.current.sheetAnimatedStyle).toBeDefined();
    expect(result.current.backdropAnimatedStyle).toBeDefined();
    expect(result.current.panGesture).toBeDefined();
    expect(result.current.backdropTapGesture).toBeDefined();
  });

  it('should handle custom initial snap index and snap points', () => {
    const { result } = renderHook(() =>
      useBottomSheet({
        snapPoints: ['25%', '50%', '100%'],
        initialSnapIndex: 1,
      })
    );
    expect(result.current.currentSnapIndex).toBe(1);
  });

  it('should open and trigger onSnapChange', () => {
    const onSnapChange = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheet({ snapPoints: [200, 400], onSnapChange })
    );

    act(() => {
      result.current.open(1);
    });

    expect(result.current.currentSnapIndex).toBe(1);
    expect(onSnapChange).toHaveBeenCalledWith(1);
  });

  it('should close and trigger onClose', () => {
    const onClose = jest.fn();
    const { result } = renderHook(() => useBottomSheet({ onClose }));

    // Open the bottom sheet first
    act(() => {
      result.current.open();
    });

    // Then close it
    act(() => {
      result.current.close();
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('should snap to a specific index', () => {
    const onSnapChange = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheet({ snapPoints: [100, 200, 300], onSnapChange })
    );

    act(() => {
      result.current.snapTo(2);
    });

    expect(result.current.currentSnapIndex).toBe(2);
    expect(onSnapChange).toHaveBeenCalledWith(2);
  });

  it('should not snap to invalid indices', () => {
    const onSnapChange = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheet({ snapPoints: [100, 200], onSnapChange })
    );

    act(() => {
      result.current.snapTo(5); // Invalid index
    });
    expect(onSnapChange).not.toHaveBeenCalled();

    act(() => {
      result.current.snapTo(-1); // Invalid index
    });
    expect(onSnapChange).not.toHaveBeenCalled();
  });
});
