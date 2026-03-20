// Brand presets
export { defaultBrand } from "./brands/default";
export { loveBrand }    from "./brands/love";
export { oceanBrand }   from "./brands/ocean";
export { forestBrand }  from "./brands/forest";
export { sunsetBrand }  from "./brands/sunset";
export { midnightBrand } from "./brands/midnight";

// Types
export type { BrandPreset } from "./types";

// All brands as array (for brand picker UI)
import { defaultBrand } from "./brands/default";
import { loveBrand }    from "./brands/love";
import { oceanBrand }   from "./brands/ocean";
import { forestBrand }  from "./brands/forest";
import { sunsetBrand }  from "./brands/sunset";
import { midnightBrand } from "./brands/midnight";

export const allBrands = [
  defaultBrand,
  loveBrand,
  oceanBrand,
  forestBrand,
  sunsetBrand,
  midnightBrand,
] as const;

export type BrandName = typeof allBrands[number]["name"];

// Helper: create a custom brand preset
export function createBrand(
  name: string,
  description: string,
  preview: { primary: string; secondary: string; background: string },
  overrides: { light?: object; dark?: object }
): import("./types").BrandPreset {
  return {
    name,
    description,
    preview,
    light: overrides.light ?? {},
    dark:  overrides.dark  ?? {},
  } as import("./types").BrandPreset;
}
