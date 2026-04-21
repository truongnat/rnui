import { useCallback, useState } from 'react';

export type DrawerSide = 'left' | 'right' | 'bottom' | 'top';

export interface UseDrawerOptions {
  defaultOpen?: boolean;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  side?: DrawerSide;
  closeOnBackdrop?: boolean;
}

export interface UseDrawerReturn {
  isOpen: boolean;
  side: DrawerSide;
  open: () => void;
  close: () => void;
  toggle: () => void;
  backdropProps: {
    onPress: () => void;
    accessible: boolean;
    accessibilityRole: 'button';
    accessibilityLabel: string;
  };
  drawerProps: {
    visible: boolean;
    accessibilityViewIsModal: boolean;
  };
}

export function useDrawer(options: UseDrawerOptions = {}): UseDrawerReturn {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    side = 'left',
    closeOnBackdrop = true,
  } = options;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen! : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      if (next) onOpen?.();
      else onClose?.();
    },
    [isControlled, onOpen, onClose]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return {
    isOpen,
    side,
    open,
    close,
    toggle,
    backdropProps: {
      onPress: closeOnBackdrop ? close : () => {},
      accessible: true,
      accessibilityRole: 'button',
      accessibilityLabel: 'Close drawer',
    },
    drawerProps: {
      visible: isOpen,
      accessibilityViewIsModal: true,
    },
  };
}
