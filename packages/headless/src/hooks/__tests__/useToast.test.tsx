import { renderHook, act } from '@testing-library/react-native';
import { useToast, dismissAllToasts } from '../useToast';

describe('useToast', () => {
  afterEach(() => {
    dismissAllToasts();
  });

  it('should show and dismiss a toast', () => {
    const { result } = renderHook(() => useToast());

    let id = '';
    act(() => {
      id = result.current.show({ message: 'Hello' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe(id);

    act(() => {
      result.current.dismiss(id);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should support variant helpers', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('Success');
      result.current.error('Error');
      result.current.warning('Warning');
      result.current.info('Info');
    });

    const variants = result.current.toasts.map((toast) => toast.variant);
    expect(variants).toEqual(['error', 'warning', 'info']);
  });

  it('should limit visible toasts to 3', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show({ message: 'One' });
      result.current.show({ message: 'Two' });
      result.current.show({ message: 'Three' });
      result.current.show({ message: 'Four' });
    });

    const messages = result.current.toasts.map((toast) => toast.message);
    expect(messages).toEqual(['Two', 'Three', 'Four']);
  });

  it('should dismiss all toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show({ message: 'A' });
      result.current.show({ message: 'B' });
    });

    expect(result.current.toasts).toHaveLength(2);

    act(() => {
      result.current.dismissAll();
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});
