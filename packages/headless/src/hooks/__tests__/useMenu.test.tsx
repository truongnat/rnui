import { renderHook, act } from "@testing-library/react-native";
import { useMenu } from "../useMenu";

describe("useMenu", () => {
  it("should toggle open state", () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.isOpen).toBe(false);
    
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should provide correct trigger props", () => {
    const { result } = renderHook(() => useMenu());
    const props = result.current.getTriggerProps();
    
    expect(props.accessibilityRole).toBe("button");
    expect(props.accessibilityHasPopup).toBe("menu");
    expect(props.accessibilityState.expanded).toBe(false);
    
    act(() => {
      props.onPress();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("should provide correct item props", () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useMenu());
    
    act(() => {
      result.current.open();
    });
    
    const itemProps = result.current.getItemProps({ onClick });
    expect(itemProps.accessibilityRole).toBe("menuitem");
    
    act(() => {
      itemProps.onPress();
    });
    
    expect(onClick).toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false); // Should close on click
  });
});
