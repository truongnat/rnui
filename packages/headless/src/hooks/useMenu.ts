import { useCallback, useState } from 'react';

export interface UseMenuOptions {
  onClose?: () => void;
  onOpen?: () => void;
}

/** Props spreadable onto a trigger `Pressable` / touchable host. */
export type UseMenuTriggerProps = {
  onPress: () => void;
  accessibilityRole: 'button';
  accessibilityHasPopup: 'menu';
  accessibilityState: { expanded: boolean };
};

/** Props spreadable onto a menu row `Pressable`. */
export type UseMenuItemProps = {
  onPress: () => void;
  accessibilityRole: 'menuitem';
  accessibilityState: { disabled?: boolean };
};

export interface UseMenuReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  getTriggerProps: () => UseMenuTriggerProps;
  getItemProps: (options?: {
    onClick?: () => void;
    disabled?: boolean;
  }) => UseMenuItemProps;
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
