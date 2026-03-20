"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSwitch = useSwitch;
const react_1 = require("react");
function useSwitch({ defaultOn = false, on: controlledOn, onChange, disabled = false, } = {}) {
    const [internalOn, setInternalOn] = (0, react_1.useState)(defaultOn);
    const isOn = controlledOn !== undefined ? controlledOn : internalOn;
    const toggle = (0, react_1.useCallback)(() => {
        if (disabled)
            return;
        const next = !isOn;
        if (controlledOn === undefined)
            setInternalOn(next);
        onChange?.(next);
    }, [disabled, isOn, controlledOn, onChange]);
    return {
        isOn,
        isDisabled: disabled,
        toggle,
        accessibilityProps: {
            accessible: true,
            accessibilityRole: "switch",
            accessibilityState: { checked: isOn, disabled },
        },
    };
}
//# sourceMappingURL=useSwitch.js.map