import { renderHook, act } from "@testing-library/react-native";
import { useScrollHeader } from "../useScrollHeader";

jest.mock("react-native-reanimated", () => {
  const interpolate = (value: number, inputRange: number[], outputRange: number[]) => {
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
    useAnimatedScrollHandler: (handlers: { onScroll?: (event: any) => void }) => {
      return (event: any) => handlers.onScroll?.(event);
    },
    useAnimatedStyle: (fn: () => any) => fn(),
    interpolate,
    Extrapolation: { CLAMP: "clamp", EXTEND: "extend" },
  };
});

describe("useScrollHeader", () => {
  it("should compute initial animated styles", () => {
    const headerMaxHeight = 200;
    const headerMinHeight = 80;
    const { result } = renderHook(() =>
      useScrollHeader({ headerMaxHeight, headerMinHeight })
    );

    expect(result.current.headerStyle.height).toBe(200);
    expect(result.current.imageStyle.transform).toEqual([{ translateY: 0 }, { scale: 1 }]);
    expect(result.current.titleStyle.opacity).toBe(0);
    expect(result.current.titleStyle.transform).toEqual([{ translateY: 10 }]);
    expect(result.current.headerBgStyle.opacity).toBe(0);
  });

  it("should update scrollY via scrollHandler", () => {
    const { result } = renderHook(() =>
      useScrollHeader({ headerMaxHeight: 200, headerMinHeight: 80 })
    );

    act(() => {
      // Worklet scroll shape uses top-level contentOffset; handler typing still matches RN.
      result.current.scrollHandler({
        contentOffset: { x: 0, y: 120 },
      } as unknown as Parameters<typeof result.current.scrollHandler>[0]);
    });

    expect(result.current.scrollY.value).toBe(120);
  });
});
