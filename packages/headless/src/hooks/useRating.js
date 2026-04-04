'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useRating = useRating;
const react_1 = require('react');
function useRating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  onChange,
} = {}) {
  const [internalValue, setInternalValue] = (0, react_1.useState)(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (0, react_1.useCallback)(
    (next) => {
      if (disabled || readOnly) return;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, readOnly, controlledValue, onChange]
  );
  return { value, setValue, max, precision, disabled, readOnly };
}
//# sourceMappingURL=useRating.js.map
