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
export declare function useDrawer(options?: UseDrawerOptions): UseDrawerReturn;
//# sourceMappingURL=useDrawer.d.ts.map
