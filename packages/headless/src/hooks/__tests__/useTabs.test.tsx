import { act, renderHook } from '@testing-library/react-native';
import { type UseTabsOptions, useTabs } from '../useTabs';

describe('useTabs', () => {
  it('should initialize with undefined default value', () => {
    const { result } = renderHook(() => useTabs());
    expect(result.current.value).toBeUndefined();
  });

  it('should initialize with defaultValue', () => {
    const { result } = renderHook(() => useTabs({ defaultValue: 'tab1' }));
    expect(result.current.value).toBe('tab1');
  });

  it('should update value when uncontrolled', () => {
    const { result } = renderHook(() => useTabs({ defaultValue: 'tab1' }));

    act(() => {
      result.current.setValue('tab2');
    });

    expect(result.current.value).toBe('tab2');
  });

  it('should trigger onChange when value changes', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useTabs({ defaultValue: 'tab1', onChange })
    );

    act(() => {
      result.current.setValue('tab2');
    });

    expect(onChange).toHaveBeenCalledWith('tab2');
    expect(result.current.value).toBe('tab2');
  });

  it('should respect controlled value', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      (props: UseTabsOptions<string>) => useTabs(props),
      {
        initialProps: { value: 'tab1', onChange },
      }
    );

    expect(result.current.value).toBe('tab1');

    act(() => {
      result.current.setValue('tab2');
    });

    expect(onChange).toHaveBeenCalledWith('tab2');
    // Should stay tab1 because it's controlled and we haven't re-rendered with new props
    expect(result.current.value).toBe('tab1');

    rerender({ value: 'tab2', onChange });
    expect(result.current.value).toBe('tab2');
  });

  it('should correctly identify selected tab', () => {
    const { result } = renderHook(() => useTabs({ defaultValue: 'tab1' }));

    expect(result.current.isSelected('tab1')).toBe(true);
    expect(result.current.isSelected('tab2')).toBe(false);
  });

  it('should return correct tab props', () => {
    const { result } = renderHook(() => useTabs({ defaultValue: 'tab1' }));

    const props = result.current.getTabProps('tab1');

    expect(props.accessibilityRole).toBe('tab');
    expect(props.accessibilityState).toEqual({
      selected: true,
      disabled: false,
    });
    expect(typeof props.onPress).toBe('function');
  });

  it('should update selected state on tab press', () => {
    const { result } = renderHook(() => useTabs({ defaultValue: 'tab1' }));

    const props = result.current.getTabProps('tab2');

    act(() => {
      props.onPress();
    });

    expect(result.current.value).toBe('tab2');
    expect(result.current.isSelected('tab2')).toBe(true);
  });

  it('should not trigger onPress when disabled', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useTabs({ defaultValue: 'tab1', onChange })
    );

    const props = result.current.getTabProps('tab2', true);

    expect(props.accessibilityState.disabled).toBe(true);

    act(() => {
      props.onPress();
    });

    expect(result.current.value).toBe('tab1');
    expect(onChange).not.toHaveBeenCalled();
  });
});
