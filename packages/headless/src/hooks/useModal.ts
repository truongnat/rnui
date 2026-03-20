import { useState, useCallback, useEffect, useRef } from "react";

export interface UseModalOptions {
  defaultOpen?: boolean;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  backdropProps: {
    onPress: () => void;
    accessible: boolean;
    accessibilityRole: "button";
    accessibilityLabel: string;
  };
  modalProps: {
    visible: boolean;
    onRequestClose: () => void;
    accessibilityViewIsModal: boolean;
  };
}

export function useModal(options: UseModalOptions = {}): UseModalReturn {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    closeOnBackdrop = true,
  } = options;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen! : internalOpen;

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    backdropProps: {
      onPress: closeOnBackdrop ? close : () => {},
      accessible: true,
      accessibilityRole: "button",
      accessibilityLabel: "Close modal",
    },
    modalProps: {
      visible: isOpen,
      onRequestClose: close,
      accessibilityViewIsModal: true,
    },
  };
}
