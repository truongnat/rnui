/**
 * @rnui/themes — Multi-brand plugin system for RNUI
 *
 * Architecture:
 *   Branch (primitive scale: spacing, radius, typography...)
 *   └── Brand (color identity: bg, surface, text, border, brand, accent)
 *         ├── light → full BrandColorGroup
 *         └── dark  → full BrandColorGroup
 *
 * Usage:
 *   import { loveBrand } from "@rnui/themes"
 *   <ThemeProvider brand={loveBrand}>...</ThemeProvider>
 *
 *   // Swap at runtime:
 *   const switchBrand = useBrandSwitch()
 *   switchBrand(oceanBrand)
 */
export { defaultBrand } from "./brands/default";
export { loveBrand } from "./brands/love";
export { oceanBrand } from "./brands/ocean";
export { forestBrand } from "./brands/forest";
export { sunsetBrand } from "./brands/sunset";
export { midnightBrand } from "./brands/midnight";
export type { Brand, BrandColorGroup } from "@rnui/tokens";
export { defineBrand } from "@rnui/tokens";
import type { Brand } from "@rnui/tokens";
export declare const allBrands: Brand[];
export type BrandId = "default" | "love" | "ocean" | "forest" | "sunset" | "midnight";
/** Look up a brand by its id */
export declare function getBrandById(id: BrandId): Brand;
//# sourceMappingURL=index.d.ts.map