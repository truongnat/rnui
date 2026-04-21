import { useCallback, useState } from 'react';
import { useId } from './useId';

export interface UseAlertOptions {
  defaultOpen?: boolean;
  onClose?: () => void;
  id?: string;
}

/** Container props (native + web-friendly `role` when dùng react-native-web). */
export type UseAlertContainerProps = {
  role?: 'alert';
  accessibilityRole: 'alert';
  nativeID: string;
};

export type UseAlertCloseButtonProps = {
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityRole: 'button';
};

export interface UseAlertReturn {
  isOpen: boolean;
  close: () => void;
  getAlertProps: () => UseAlertContainerProps;
  getCloseButtonProps: () => UseAlertCloseButtonProps;
}

export function useAlert({
  defaultOpen = true,
  onClose,
  id: idProp,
}: UseAlertOptions = {}): UseAlertReturn {
  const id = useId(idProp, 'alert');
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
      nativeID: id,
    }),
    getCloseButtonProps: () => ({
      onPress: close,
      accessibilityLabel: 'Close alert',
      accessibilityRole: 'button',
    }),
  };
}
