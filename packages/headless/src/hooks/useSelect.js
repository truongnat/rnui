"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelect = useSelect;
const react_1 = require("react");
const useDisclosure_1 = require("./useDisclosure");
function useSelect({ options, defaultValue, value: controlledValue, onChange, multiple = false, disabled = false, placeholder = "Select…", }) {
    const [internalValue, setInternalValue] = (0, react_1.useState)(defaultValue);
    const disclosure = (0, useDisclosure_1.useDisclosure)();
    const selected = controlledValue !== undefined ? controlledValue : internalValue;
    const selectOption = (0, react_1.useCallback)((val) => {
        if (disabled)
            return;
        let next;
        if (multiple) {
            const arr = Array.isArray(selected) ? selected : [];
            next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
        }
        else {
            next = val;
            disclosure.close();
        }
        if (controlledValue === undefined)
            setInternalValue(next);
        onChange?.(next);
    }, [disabled, multiple, selected, controlledValue, onChange, disclosure]);
    const clearSelection = (0, react_1.useCallback)(() => {
        const next = multiple ? [] : undefined;
        if (controlledValue === undefined)
            setInternalValue(next);
        if (next !== undefined)
            onChange?.(next);
    }, [multiple, controlledValue, onChange]);
    const isSelected = (0, react_1.useCallback)((val) => {
        if (!selected)
            return false;
        if (Array.isArray(selected))
            return selected.includes(val);
        return selected === val;
    }, [selected]);
    const displayLabel = (() => {
        if (!selected || (Array.isArray(selected) && selected.length === 0))
            return placeholder;
        if (Array.isArray(selected)) {
            const labels = selected
                .map((v) => options.find((o) => o.value === v)?.label)
                .filter(Boolean);
            return labels.join(", ");
        }
        return options.find((o) => o.value === selected)?.label ?? placeholder;
    })();
    return {
        selected,
        isOpen: disclosure.isOpen,
        open: disclosure.open,
        close: disclosure.close,
        toggle: disclosure.toggle,
        selectOption,
        clearSelection,
        isSelected,
        displayLabel,
        triggerProps: {
            onPress: disabled ? () => { } : disclosure.toggle,
            accessibilityState: { expanded: disclosure.isOpen, disabled },
        },
    };
}
//# sourceMappingURL=useSelect.js.map