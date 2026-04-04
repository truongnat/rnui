'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useTabs = useTabs;
const react_1 = require('react');
function useTabs({ defaultValue, value: controlledValue, onChange } = {}) {
  const [internalValue, setInternalValue] = (0, react_1.useState)(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (0, react_1.useCallback)(
    (next) => {
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );
  const isSelected = (0, react_1.useCallback)((v) => value === v, [value]);
  const getTabProps = (0, react_1.useCallback)(
    (v, disabled = false) => ({
      onPress: () => {
        if (disabled) return;
        setValue(v);
      },
      accessibilityRole: 'tab',
      accessibilityState: { selected: value === v, disabled },
    }),
    [setValue, value]
  );
  return { value, setValue, isSelected, getTabProps };
}
//# sourceMappingURL=useTabs.js.map
