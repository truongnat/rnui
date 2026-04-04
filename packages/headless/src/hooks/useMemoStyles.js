'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useMemoStyles = useMemoStyles;
const react_1 = require('react');
const react_native_1 = require('react-native');
const theme_1 = require('../theme');
function useMemoStyles(styleFactory) {
  const tokens = (0, theme_1.useTokens)();
  // We use a ref to store the factory so that we don't re-compute the styles
  // just because an inline function was passed on every render.
  const factoryRef = (0, react_1.useRef)(styleFactory);
  factoryRef.current = styleFactory;
  // We only re-compute when the `tokens` object changes (e.g., light <-> dark mode switch).
  return (0, react_1.useMemo)(() => {
    const rawStyles = factoryRef.current(tokens);
    return react_native_1.StyleSheet.create(rawStyles);
  }, [tokens]);
}
//# sourceMappingURL=useMemoStyles.js.map
