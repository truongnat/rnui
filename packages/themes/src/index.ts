/**
 * @truongdq01/themes — Multi-brand plugin system for RNUI
 *
 * Architecture:
 *   Branch (primitive scale: spacing, radius, typography...)
 *   └── Brand (color identity: bg, surface, text, border, brand, accent)
 *         ├── light → full BrandColorGroup
 *         └── dark  → full BrandColorGroup
 *
 * Usage:
 *   import { loveBrand } from "@truongdq01/themes"
 *   <ThemeProvider brand={loveBrand}>...</ThemeProvider>
 *
 *   // Swap at runtime:
 *   const switchBrand = useBrandSwitch()
 *   switchBrand(oceanBrand)
 */

// ── Types (re-exported for convenience) ───────────────────────────
export type { Brand, BrandColorGroup } from '@truongdq01/tokens';
export { defineBrand, defineBrand as createBrand } from '@truongdq01/tokens';
// ── Brand presets ──────────────────────────────────────────────────
export { defaultBrand } from './brands/default';
export { forestBrand } from './brands/forest';
export { loveBrand } from './brands/love';
export { midnightBrand } from './brands/midnight';
export { oceanBrand } from './brands/ocean';
export { sunsetBrand } from './brands/sunset';

import type { Brand } from '@truongdq01/tokens';
// ── All brands registry (for brand pickers, docs, etc.) ───────────
import { defaultBrand } from './brands/default';
import { forestBrand } from './brands/forest';
import { loveBrand } from './brands/love';
import { midnightBrand } from './brands/midnight';
import { oceanBrand } from './brands/ocean';
import { sunsetBrand } from './brands/sunset';

export const allBrands: Brand[] = [
  defaultBrand,
  loveBrand,
  oceanBrand,
  forestBrand,
  sunsetBrand,
  midnightBrand,
];

export type BrandId =
  | 'default'
  | 'love'
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'midnight';

/** Look up a brand by its id */
export function getBrandById(id: BrandId): Brand {
  const found = allBrands.find((b) => b.id === id);
  if (!found) throw new Error(`[RNUI] Unknown brand id: "${id}"`);
  return found;
}
