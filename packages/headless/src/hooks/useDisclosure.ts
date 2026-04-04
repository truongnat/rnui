import { useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────

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
    accessibilityState: { expanded: boolean };
  };
  /** Spread onto controlled element */
  contentProps: {
    accessibilityViewIsModal?: boolean;
  };
}

// ─── Hook ─────────────────────────────────────────────────────────

export function useDisclosure({
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpen,
  onClose,
}: UseDisclosureOptions = {}): UseDisclosureReturn {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Support both controlled and uncontrolled
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const open = useCallback(() => {
    if (controlledOpen === undefined) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);

  const close = useCallback(() => {
    if (controlledOpen === undefined) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    triggerProps: {
      onPress: toggle,
      accessibilityState: { expanded: isOpen },
    },
    contentProps: {
      accessibilityViewIsModal: isOpen,
    },
  };
}
