"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = useModal;
const react_1 = require("react");
function useModal(options = {}) {
    const { defaultOpen = false, open: controlledOpen, onOpen, onClose, closeOnBackdrop = true, } = options;
    const [internalOpen, setInternalOpen] = (0, react_1.useState)(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const setOpen = (0, react_1.useCallback)((next) => {
        if (!isControlled)
            setInternalOpen(next);
        if (next)
            onOpen?.();
        else
            onClose?.();
    }, [isControlled, onOpen, onClose]);
    const open = (0, react_1.useCallback)(() => setOpen(true), [setOpen]);
    const close = (0, react_1.useCallback)(() => setOpen(false), [setOpen]);
    const toggle = (0, react_1.useCallback)(() => setOpen(!isOpen), [isOpen, setOpen]);
    return {
        isOpen,
        open,
        close,
        toggle,
        backdropProps: {
            onPress: closeOnBackdrop ? close : () => { },
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
//# sourceMappingURL=useModal.js.map