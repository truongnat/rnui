'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useIconStyle = useIconStyle;
const theme_1 = require('../theme');
/**
 * Hook to apply default icon styles (size, color) based on component context.
 * Returns an object with style and color for the icon.
 */
function useIconStyle(context) {
  const tokens = (0, theme_1.useTokens)();
  if (context === 'button') {
    // Buttons use a default size and color based on their text color
    return {
      size: tokens.fontSize.md,
      color: 'inherit', // Components should handle setting this based on variant
    };
  }
  if (context === 'input' || context === 'select') {
    return {
      size: tokens.fontSize.lg, // Search icons and chevrons usually slightly larger
      color: tokens.color.text.tertiary,
    };
  }
  if (context === 'list') {
    return {
      size: tokens.fontSize.md,
      color: tokens.color.text.secondary,
    };
  }
  return {
    size: tokens.fontSize.md,
    color: tokens.color.text.primary,
  };
}
//# sourceMappingURL=useIconStyle.js.map
