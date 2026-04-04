'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useField = useField;
const react_1 = require('react');
// ─── Hook ─────────────────────────────────────────────────────────
function useField({ defaultValue, validate, validateOnChange = false }) {
  const [value, setValue] = (0, react_1.useState)(defaultValue);
  const [error, setError] = (0, react_1.useState)(undefined);
  const [touched, setTouched] = (0, react_1.useState)(false);
  const [isValidating, setIsValidating] = (0, react_1.useState)(false);
  const runValidation = (0, react_1.useCallback)(
    async (val) => {
      if (!validate) return;
      setIsValidating(true);
      try {
        const result = await validate(val);
        setError(result);
        return result;
      } catch {
        const errorMsg = 'Validation failed';
        setError(errorMsg);
        return errorMsg;
      } finally {
        setIsValidating(false);
      }
    },
    [validate]
  );
  const onChange = (0, react_1.useCallback)(
    (val) => {
      setValue(val);
      if (validateOnChange && touched) {
        runValidation(val);
      } else if (error) {
        // Clear error optimistically while typing
        setError(undefined);
      }
    },
    [validateOnChange, touched, error, runValidation]
  );
  const onBlur = (0, react_1.useCallback)(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);
  const reset = (0, react_1.useCallback)(() => {
    setValue(defaultValue);
    setError(undefined);
    setTouched(false);
    setIsValidating(false);
  }, [defaultValue]);
  return {
    value,
    error,
    touched,
    isValidating,
    onChange,
    onBlur,
    reset,
    setError,
    validate: () => runValidation(value),
    inputProps: {
      value: String(value),
      onChangeText: (text) => onChange(text),
      onBlur,
    },
  };
}
//# sourceMappingURL=useField.js.map
