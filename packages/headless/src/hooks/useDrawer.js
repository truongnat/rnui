'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useDrawer = useDrawer;
const react_1 = require('react');
function useDrawer(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    side = 'left',
    closeOnBackdrop = true,
  } = options;
  const [internalOpen, setInternalOpen] = (0, react_1.useState)(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (0, react_1.useCallback)(
    (next) => {
      if (!isControlled) setInternalOpen(next);
      if (next) onOpen?.();
      else onClose?.();
    },
    [isControlled, onOpen, onClose]
  );
  const open = (0, react_1.useCallback)(() => setOpen(true), [setOpen]);
  const close = (0, react_1.useCallback)(() => setOpen(false), [setOpen]);
  const toggle = (0, react_1.useCallback)(
    () => setOpen(!isOpen),
    [isOpen, setOpen]
  );
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
//# sourceMappingURL=useDrawer.js.map
