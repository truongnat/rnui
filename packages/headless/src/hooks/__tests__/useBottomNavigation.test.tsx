import { act, renderHook } from '@testing-library/react-native';
import { useBottomNavigation } from '../useBottomNavigation';

describe('useBottomNavigation', () => {
  it('should initialize with defaultValue', () => {
    const { result } = renderHook(() =>
      useBottomNavigation({ defaultValue: 'home' })
    );
    expect(result.current.value).toBe('home');
    expect(result.current.isSelected('home')).toBe(true);
  });

  it('should select value', () => {
    const { result } = renderHook(() =>
      useBottomNavigation({ defaultValue: 'home' })
    );

    act(() => {
      result.current.selectValue('settings');
    });
    expect(result.current.value).toBe('settings');
    expect(result.current.isSelected('settings')).toBe(true);
  });

  it('should return correct item props', () => {
    const { result } = renderHook(() =>
      useBottomNavigation({ defaultValue: 'home' })
    );
    const props = result.current.getItemProps('home');

    expect(props.accessibilityRole).toBe('tab');
    expect(props.accessibilityState.selected).toBe(true);

    act(() => {
      props.onPress();
    });
    expect(result.current.value).toBe('home');
  });

  it('should notify onChange when value changes', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useBottomNavigation({ defaultValue: 'home', onChange })
    );

    act(() => {
      result.current.selectValue('profile');
    });
    expect(onChange).toHaveBeenCalledWith('profile');
  });
});
