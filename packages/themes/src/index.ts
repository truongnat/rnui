/**
 * @truongdq01/themes — Astryx theme gallery for RNUI
 *
 * Architecture:
 *   Branch (primitive scale: spacing, radius, typography...)
 *   └── Brand (color identity: bg, surface, text, border, brand, accent)
 *         ├── light → full BrandColorGroup
 *         └── dark  → full BrandColorGroup
 *
 * The built-in default tokens (`ThemeProvider` with no `brand`) already use the
 * Astryx **neutral** palette. These presets port the rest of the Astryx theme
 * gallery. Reference: https://astryx.atmeta.com/themes
 *
 * Usage:
 *   import { butterBrand } from "@truongdq01/themes"
 *   <ThemeProvider brand={butterBrand}>...</ThemeProvider>
 *
 *   // Swap at runtime:
 *   const switchBrand = useBrandSwitch()
 *   switchBrand(matchaBrand)
 */

// ── Types (re-exported for convenience) ───────────────────────────
export type { Brand, BrandColorGroup } from '@truongdq01/tokens';
export { defineBrand, defineBrand as createBrand } from '@truongdq01/tokens';
// ── Brand presets (Astryx gallery) ────────────────────────────────
export { butterBrand } from './brands/butter';
export { chocolateBrand } from './brands/chocolate';
export { gothicBrand } from './brands/gothic';
export { matchaBrand } from './brands/matcha';
export { neutralBrand } from './brands/neutral';
export { stoneBrand } from './brands/stone';
export { y2kBrand } from './brands/y2k';

import type { Brand } from '@truongdq01/tokens';
// ── All brands registry (for brand pickers, docs, etc.) ───────────
import { butterBrand } from './brands/butter';
import { chocolateBrand } from './brands/chocolate';
import { gothicBrand } from './brands/gothic';
import { matchaBrand } from './brands/matcha';
import { neutralBrand } from './brands/neutral';
import { stoneBrand } from './brands/stone';
import { y2kBrand } from './brands/y2k';

export const allBrands: Brand[] = [
  neutralBrand,
  stoneBrand,
  butterBrand,
  chocolateBrand,
  matchaBrand,
  gothicBrand,
  y2kBrand,
];

export type BrandId =
  | 'neutral'
  | 'stone'
  | 'butter'
  | 'chocolate'
  | 'matcha'
  | 'gothic'
  | 'y2k';

/** Look up a brand by its id */
export function getBrandById(id: BrandId): Brand {
  const found = allBrands.find((b) => b.id === id);
  if (!found) throw new Error(`[RNUI] Unknown brand id: "${id}"`);
  return found;
}
