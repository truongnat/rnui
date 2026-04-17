'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useDisclosure = useDisclosure;
const react_1 = require('react');
// ─── Hook ─────────────────────────────────────────────────────────
function useDisclosure({
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpen,
  onClose,
} = {}) {
  const [internalOpen, setInternalOpen] = (0, react_1.useState)(defaultOpen);
  // Support both controlled and uncontrolled
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const open = (0, react_1.useCallback)(() => {
    if (controlledOpen === undefined) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);
  const close = (0, react_1.useCallback)(() => {
    if (controlledOpen === undefined) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);
  const toggle = (0, react_1.useCallback)(() => {
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
//# sourceMappingURL=useDisclosure.js.map
