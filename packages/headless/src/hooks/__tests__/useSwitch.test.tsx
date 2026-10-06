import { act, renderHook } from '@testing-library/react-native';
import { useSwitch } from '../useSwitch';

describe('useSwitch', () => {
  it('should initialize with defaultChecked false', () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: false }));
    expect(result.current.checked).toBe(false);
  });

  it('should initialize with defaultChecked true', () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: true }));
    expect(result.current.checked).toBe(true);
  });

  it('should toggle state in uncontrolled mode', () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: false }));
    expect(result.current.checked).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.checked).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.checked).toBe(false);
  });

  it('should call onChange in uncontrolled mode', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useSwitch({ defaultChecked: false, onChange }));

    act(() => {
      result.current.toggle();
    });

    expect(onChange).toHaveBeenCalledWith(true);
    expect(result.current.checked).toBe(true);
  });

  it('should respect controlled state (checked)', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook((props) => useSwitch(props), {
      initialProps: { checked: false, onChange },
    });

    expect(result.current.checked).toBe(false);

    act(() => {
      result.current.toggle();
    });

    // state should not change internally
    expect(result.current.checked).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);

    // parent component updates the prop
    rerender({ checked: true, onChange });
    expect(result.current.checked).toBe(true);
  });

  it('should not toggle or call onChange when disabled', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useSwitch({ defaultChecked: false, disabled: true, onChange }));

    expect(result.current.checked).toBe(false);
    expect(result.current.disabled).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should provide correct accessibility props', () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: true, disabled: false, id: 'test-switch' }));

    expect(result.current.accessibilityProps).toEqual({
      accessible: true,
      accessibilityRole: 'switch',
      accessibilityState: { checked: true, disabled: false },
      nativeID: expect.any(String),
    });

    expect(result.current.accessibilityProps.nativeID).toBe('test-switch');
  });

  it('should generate an id if not provided', () => {
    const { result } = renderHook(() => useSwitch());
    expect(typeof result.current.accessibilityProps.nativeID).toBe('string');
    expect(result.current.accessibilityProps.nativeID.length).toBeGreaterThan(0);
  });
});
