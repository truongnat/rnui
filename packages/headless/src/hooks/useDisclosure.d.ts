export interface UseDisclosureOptions {
  /** Initial open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Called when state changes to open */
  onOpen?: () => void;
  /** Called when state changes to closed */
  onClose?: () => void;
}
export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Spread onto trigger element */
  triggerProps: {
    onPress: () => void;
    accessibilityState: {
      expanded: boolean;
    };
  };
  /** Spread onto controlled element */
  contentProps: {
    accessibilityViewIsModal?: boolean;
  };
}
export declare function useDisclosure({
  defaultOpen,
  isOpen: controlledOpen,
  onOpen,
  onClose,
}?: UseDisclosureOptions): UseDisclosureReturn;
//# sourceMappingURL=useDisclosure.d.ts.map
