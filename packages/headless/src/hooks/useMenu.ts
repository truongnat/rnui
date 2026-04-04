import { useState, useCallback } from 'react';

export interface UseMenuOptions {
  onClose?: () => void;
  onOpen?: () => void;
}

export interface UseMenuReturn {
  isOpen: boolean;
  open: (event?: any) => void;
  close: () => void;
  toggle: () => void;
  getTriggerProps: () => any;
  getItemProps: (options?: { onClick?: () => void; disabled?: boolean }) => any;
}

export function useMenu({
  onClose,
  onOpen,
}: UseMenuOptions = {}): UseMenuReturn {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    getTriggerProps: () => ({
      onPress: toggle,
      accessibilityRole: 'button',
      accessibilityHasPopup: 'menu',
      accessibilityState: { expanded: isOpen },
    }),
    getItemProps: (options = {}) => ({
      onPress: () => {
        if (options.disabled) return;
        options.onClick?.();
        close();
      },
      accessibilityRole: 'menuitem',
      accessibilityState: { disabled: options.disabled },
    }),
  };
}
