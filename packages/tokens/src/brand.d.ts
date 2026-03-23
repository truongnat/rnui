/**
 * @truongnat/tokens — brand.ts
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
import type { ColorScheme } from "./semantic";
export interface BrandColorGroup {
    bg: {
        default: string;
        subtle: string;
        muted: string;
        emphasis: string;
        inverse: string;
        overlay: string;
        hover: string;
        disabled: string;
    };
    surface: {
        default: string;
        raised: string;
        overlay: string;
        sunken: string;
        hover: string;
        disabled: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
        inverse: string;
        link: string;
        onBrand: string;
        onAccent: string;
    };
    border: {
        default: string;
        subtle: string;
        strong: string;
        input: string;
        focus: string;
        error: string;
    };
    brand: {
        default: string;
        hover: string;
        active: string;
        subtle: string;
        muted: string;
        text: string;
    };
    accent: {
        default: string;
        hover: string;
        active: string;
        subtle: string;
        muted: string;
        text: string;
        onAccent: string;
    };
    success: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
    warning: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
    error: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
    info: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
}
export interface Brand {
    /** Unique identifier, e.g. "love", "ocean" */
    id: string;
    /** Display name, e.g. "Love" */
    name: string;
    /** Short description */
    description: string;
    /** Preview swatches for brand pickers */
    preview: {
        primary: string;
        secondary: string;
        background: string;
    };
    /** Full color group for light mode */
    light: BrandColorGroup;
    /** Full color group for dark mode */
    dark: BrandColorGroup;
}
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
export declare function defineBrand(brand: Brand): Brand;
/**
 * Get the color group for the active color scheme.
 */
export declare function getBrandColors(brand: Brand, scheme: ColorScheme): BrandColorGroup;
//# sourceMappingURL=brand.d.ts.map