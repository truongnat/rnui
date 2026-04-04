import { renderHook, act } from '@testing-library/react-native';
import { useModal } from '../useModal';

describe('useModal', () => {
  it('should manage visibility', () => {
    const { result } = renderHook(() => useModal({ defaultOpen: false }));
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

  it('should toggle state', () => {
    const { result } = renderHook(() => useModal({ defaultOpen: false }));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
