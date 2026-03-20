"use strict";
/**
 * @rnui/tokens — brand.ts
 *
 * A Brand defines a complete color identity:
 *   - Two full ColorGroup objects (light + dark)
 *   - Metadata (name, description, preview swatches)
 *
 * Architecture:
 *   Branch (primitive scale) → Brand (color identity) → Mode (light/dark) → SemanticTokens
 *
 * Components never hardcode color values. They read from SemanticTokens,
 * which are built by merging the base scale with a Brand's color group.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineBrand = defineBrand;
exports.getBrandColors = getBrandColors;
// ─── Helpers ──────────────────────────────────────────────────────
/**
 * Type-safe factory for defining a brand.
 * Ensures both light and dark modes are fully specified.
 *
 * @example
 * const myBrand = defineBrand({
 *   id: "ocean",
 *   name: "Ocean",
 *   description: "Teal & Cyan",
 *   preview: { primary: "#0D9488", secondary: "#06B6D4", background: "#F0FDFA" },
 *   light: { ... },
 *   dark: { ... },
 * });
 */
function defineBrand(brand) {
    return brand;
}
/**
 * Get the color group for the active color scheme.
 */
function getBrandColors(brand, scheme) {
    return scheme === "dark" ? brand.dark : brand.light;
}
//# sourceMappingURL=brand.js.map