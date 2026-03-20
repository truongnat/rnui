"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToggleGroup = useToggleGroup;
const react_1 = require("react");
function useToggleGroup({ value: controlledValue, defaultValue, onChange, exclusive = false, disabled = false, } = {}) {
    const [internalValue, setInternalValue] = (0, react_1.useState)(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const isSelected = (0, react_1.useCallback)((v) => {
        if (Array.isArray(value))
            return value.includes(v);
        return value === v;
    }, [value]);
    const toggle = (0, react_1.useCallback)((v) => {
        if (disabled)
            return;
        let next;
        if (exclusive) {
            next = value === v ? undefined : v;
        }
        else {
            const arr = Array.isArray(value) ? value : [];
            next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
        }
        if (controlledValue === undefined)
            setInternalValue(next);
        onChange?.(next);
    }, [disabled, exclusive, value, controlledValue, onChange]);
    return { value, isSelected, toggle };
}
//# sourceMappingURL=useToggleGroup.js.map