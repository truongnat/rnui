'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useCheckbox = useCheckbox;
const react_1 = require('react');
function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false,
} = {}) {
  const [internalChecked, setInternalChecked] = (0, react_1.useState)(
    defaultChecked
  );
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;
  const toggle = (0, react_1.useCallback)(() => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, controlledChecked, onChange]);
  return {
    isChecked,
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: 'checkbox',
      accessibilityState: {
        checked: indeterminate ? 'mixed' : isChecked,
        disabled,
      },
    },
  };
}
//# sourceMappingURL=useCheckbox.js.map
