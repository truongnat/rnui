import { renderHook, act } from "@testing-library/react-native";
import { useSwitch } from "../useSwitch";

describe("useSwitch", () => {
  it("should toggle state", () => {
    const { result } = renderHook(() => useSwitch({ defaultOn: false }));
    expect(result.current.isOn).toBe(false);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOn).toBe(true);
  });
});
