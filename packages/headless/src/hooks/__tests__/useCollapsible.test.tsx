import { act, renderHook } from '@testing-library/react-native';
import {
  type CollapsibleGroupControl,
  useCollapsible,
} from '../useCollapsible';

describe('useCollapsible', () => {
  describe('uncontrolled mode', () => {
    it('starts from defaultOpen and toggles internal state', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHook(() =>
        useCollapsible({ defaultOpen: false, onOpenChange })
      );

      expect(result.current.isOpen).toBe(false);
      expect(result.current.isEnabled).toBe(true);

      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(true);
      expect(onOpenChange).toHaveBeenLastCalledWith(true);

      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });
  });

  describe('controlled mode', () => {
    it('reflects isOpen prop and only notifies (no internal state)', () => {
      const onOpenChange = jest.fn();
      const { result, rerender } = renderHook(
        ({ open }: { open: boolean }) =>
          useCollapsible({ isOpen: open, onOpenChange }),
        { initialProps: { open: true } }
      );

      expect(result.current.isOpen).toBe(true);

      act(() => result.current.toggle());
      // Controlled: state does not change internally, parent is notified with the inverse.
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(result.current.isOpen).toBe(true);

      rerender({ open: false });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('group-controlled mode', () => {
    it('delegates open state and toggling to the group', () => {
      const open = new Set<string>(['a']);
      const group: CollapsibleGroupControl = {
        isOpen: (v) => open.has(v),
        toggle: (v) => {
          if (open.has(v)) open.delete(v);
          else open.add(v);
        },
      };

      const { result, rerender } = renderHook(
        (_pass: number) => useCollapsible({ value: 'a', group }),
        { initialProps: 0 }
      );
      expect(result.current.isOpen).toBe(true);

      act(() => result.current.toggle());
      rerender(1);
      expect(open.has('a')).toBe(false);
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('disabled', () => {
    it('is not enabled and toggle is a no-op', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHook(() =>
        useCollapsible({ defaultOpen: false, disabled: true, onOpenChange })
      );

      expect(result.current.isEnabled).toBe(false);

      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });
});
