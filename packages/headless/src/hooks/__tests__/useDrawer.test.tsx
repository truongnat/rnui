import { act, renderHook } from '@testing-library/react-native';
import { useDrawer } from '../useDrawer';

describe('useDrawer', () => {
  it('should manage open state and callbacks', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { result } = renderHook(() =>
      useDrawer({ defaultOpen: false, onOpen, onClose })
    );

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should toggle open state', () => {
    const { result } = renderHook(() => useDrawer({ defaultOpen: false }));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should respect closeOnBackdrop', () => {
    const onClose = jest.fn();
    const { result } = renderHook(() =>
      useDrawer({ defaultOpen: true, closeOnBackdrop: false, onClose })
    );

    act(() => {
      result.current.backdropProps.onPress();
    });

    expect(result.current.isOpen).toBe(true);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should expose drawer props and side', () => {
    const { result } = renderHook(() => useDrawer({ side: 'right' }));

    expect(result.current.side).toBe('right');
    expect(result.current.drawerProps.visible).toBe(false);
    expect(result.current.drawerProps.accessibilityViewIsModal).toBe(true);
  });
});
