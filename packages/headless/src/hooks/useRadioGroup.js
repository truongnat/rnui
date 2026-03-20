"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRadioGroup = useRadioGroup;
const react_1 = require("react");
function useRadioGroup({ defaultValue, value: controlledValue, onChange, disabled = false, } = {}) {
    const [internalValue, setInternalValue] = (0, react_1.useState)(defaultValue);
    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;
    const select = (0, react_1.useCallback)((val) => {
        if (disabled)
            return;
        if (controlledValue === undefined)
            setInternalValue(val);
        onChange?.(val);
    }, [disabled, controlledValue, onChange]);
    const isSelected = (0, react_1.useCallback)((val) => selectedValue === val, [selectedValue]);
    const getItemProps = (0, react_1.useCallback)((val, itemDisabled = false) => ({
        onPress: () => !itemDisabled && !disabled && select(val),
        accessibilityRole: "radio",
        accessibilityState: {
            checked: isSelected(val),
            disabled: disabled || itemDisabled,
        },
    }), [select, isSelected, disabled]);
    return { selectedValue, select, isSelected, isDisabled: disabled, getItemProps };
}
//# sourceMappingURL=useRadioGroup.js.map