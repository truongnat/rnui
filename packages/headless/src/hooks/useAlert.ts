import { useState, useCallback } from 'react';

export interface UseAlertOptions {
  defaultOpen?: boolean;
  onClose?: () => void;
}

export interface UseAlertReturn {
  isOpen: boolean;
  close: () => void;
  getAlertProps: () => any;
  getCloseButtonProps: () => any;
}

export function useAlert({
  defaultOpen = true,
  onClose,
}: UseAlertOptions = {}): UseAlertReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  return {
    isOpen,
    close,
    getAlertProps: () => ({
      role: 'alert',
      accessibilityRole: 'alert',
    }),
    getCloseButtonProps: () => ({
      onPress: close,
      accessibilityLabel: 'Close alert',
      accessibilityRole: 'button',
    }),
  };
}
