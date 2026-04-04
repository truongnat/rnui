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
    accessibilityRole: 'button';
    accessibilityLabel: string;
  };
  modalProps: {
    visible: boolean;
    onRequestClose: () => void;
    accessibilityViewIsModal: boolean;
  };
}
export declare function useModal(options?: UseModalOptions): UseModalReturn;
//# sourceMappingURL=useModal.d.ts.map
