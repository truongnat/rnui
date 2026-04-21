import { renderHook } from '@testing-library/react-native';
import { useScrollHeader } from '../useScrollHeader';

jest.mock('react-native-reanimated', () => {
  const interpolate = (
    value: number,
    inputRange: number[],
    outputRange: number[]
  ) => {
    if (value <= inputRange[0]) return outputRange[0];
    for (let i = 1; i < inputRange.length; i += 1) {
      if (value <= inputRange[i]) {
        const inMin = inputRange[i - 1];
        const inMax = inputRange[i];
        const outMin = outputRange[i - 1];
        const outMax = outputRange[i];
        if (inMax === inMin) return outMax;
        const t = (value - inMin) / (inMax - inMin);
        return outMin + (outMax - outMin) * t;
      }
    }
    return outputRange[outputRange.length - 1];
  };

  return {
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedScrollHandler: () => () => {},
    useAnimatedStyle: <S extends Record<string, unknown>>(fn: () => S) => fn(),
    interpolate,
    Extrapolation: { CLAMP: 'clamp', EXTEND: 'extend' },
  };
});

describe('useScrollHeader', () => {
  it('should compute initial animated styles', () => {
    const headerMaxHeight = 200;
    const headerMinHeight = 80;
    const { result } = renderHook(() =>
      useScrollHeader({ headerMaxHeight, headerMinHeight })
    );

    expect(result.current.headerStyle.height).toBe(200);
    expect(result.current.imageStyle.transform).toEqual([
      { translateY: 0 },
      { scale: 1 },
    ]);
    expect(result.current.titleStyle.opacity).toBe(0);
    expect(result.current.titleStyle.transform).toEqual([{ translateY: 10 }]);
    expect(result.current.headerBgStyle.opacity).toBe(0);
  });

  it('should expose scrollY for external manipulation', () => {
    const { result } = renderHook(() =>
      useScrollHeader({ headerMaxHeight: 200, headerMinHeight: 80 })
    );

    // scrollY should be accessible for external updates
    expect(result.current.scrollY).toBeDefined();
    expect(typeof result.current.scrollY.value).toBe('number');
  });
});
