import { act, renderHook } from '@testing-library/react-native';
import { useDisclosure } from '../useDisclosure';

describe('useDisclosure', () => {
  it('should toggle open state', () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: false }));
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should open and close explicitly', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });
});
