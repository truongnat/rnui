"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutocomplete = useAutocomplete;
const react_1 = require("react");
const useDisclosure_1 = require("./useDisclosure");
function useAutocomplete({ options, value: controlledValue, defaultValue, multiple = false, inputValue: controlledInput, defaultInputValue = "", onInputChange, onChange, getOptionLabel, filterOptions, open: controlledOpen, onOpen, onClose, }) {
    const [internalValue, setInternalValue] = (0, react_1.useState)(defaultValue);
    const [internalInput, setInternalInput] = (0, react_1.useState)(defaultInputValue);
    const disclosure = (0, useDisclosure_1.useDisclosure)({
        isOpen: controlledOpen,
        onOpen,
        onClose,
    });
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const inputValue = controlledInput !== undefined ? controlledInput : internalInput;
    const setInputValue = (0, react_1.useCallback)((next) => {
        if (controlledInput === undefined)
            setInternalInput(next);
        onInputChange?.(next);
    }, [controlledInput, onInputChange]);
    const isSelected = (0, react_1.useCallback)((v) => {
        if (Array.isArray(value))
            return value.includes(v);
        return value === v;
    }, [value]);
    const selectOption = (0, react_1.useCallback)((v) => {
        let next;
        if (multiple) {
            const arr = Array.isArray(value) ? value : [];
            next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
        }
        else {
            next = v;
            disclosure.close();
        }
        if (controlledValue === undefined)
            setInternalValue(next);
        onChange?.(next);
        if (!multiple) {
            const label = getOptionLabel ? getOptionLabel(v) : String(v);
            setInputValue(label);
        }
    }, [multiple, value, controlledValue, onChange, disclosure, getOptionLabel, setInputValue]);
    const clear = (0, react_1.useCallback)(() => {
        if (controlledValue === undefined)
            setInternalValue(multiple ? [] : undefined);
        onChange?.(multiple ? [] : undefined);
        setInputValue("");
    }, [controlledValue, multiple, onChange, setInputValue]);
    const filteredOptions = (0, react_1.useMemo)(() => {
        const base = filterOptions ? filterOptions(options, inputValue) : options;
        if (!inputValue)
            return base;
        const labelOf = getOptionLabel ?? ((o) => String(o));
        return base.filter((opt) => labelOf(opt).toLowerCase().includes(inputValue.toLowerCase()));
    }, [options, inputValue, filterOptions, getOptionLabel]);
    return {
        value,
        inputValue,
        setInputValue,
        isOpen: disclosure.isOpen,
        open: disclosure.open,
        close: disclosure.close,
        isSelected,
        selectOption,
        clear,
        filteredOptions,
    };
}
//# sourceMappingURL=useAutocomplete.js.map