"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticTokens = exports.getBrandColors = exports.defineBrand = exports.darkTokens = exports.lightTokens = void 0;
exports.buildSemanticTokens = buildSemanticTokens;
const primitive_1 = require("./primitive");
const brand_1 = require("./brand");
/**
 * Semantic tokens — maps raw primitives to design intent.
 * Supports light and dark mode.
 * RULE: Components import from here, never from primitive.
 */
const { color, spacing, radius, fontSize, fontWeight, lineHeight, letterSpacing, opacity, zIndex, elevation, focusRing } = primitive_1.primitive;
// ─── Shared (mode-independent) ───────────────────────────────────
const shared = {
    spacing,
    radius,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    opacity,
    zIndex,
    elevation,
    focusRing,
    // Typography styles (composite)
    text: {
        xs: { fontSize: fontSize.xs, lineHeight: fontSize.xs * lineHeight.normal, fontWeight: fontWeight.regular },
        sm: { fontSize: fontSize.sm, lineHeight: fontSize.sm * lineHeight.normal, fontWeight: fontWeight.regular },
        md: { fontSize: fontSize.md, lineHeight: fontSize.md * lineHeight.normal, fontWeight: fontWeight.regular },
        lg: { fontSize: fontSize.lg, lineHeight: fontSize.lg * lineHeight.normal, fontWeight: fontWeight.regular },
        xl: { fontSize: fontSize.xl, lineHeight: fontSize.xl * lineHeight.snug, fontWeight: fontWeight.medium },
        "2xl": { fontSize: fontSize["2xl"], lineHeight: fontSize["2xl"] * lineHeight.snug, fontWeight: fontWeight.medium },
        "3xl": { fontSize: fontSize["3xl"], lineHeight: fontSize["3xl"] * lineHeight.tight, fontWeight: fontWeight.semibold },
    },
};
// ─── Light mode ──────────────────────────────────────────────────
exports.lightTokens = {
    ...shared,
    color: {
        // Backgrounds
        bg: {
            default: color.white,
            subtle: color.gray[50], // F8FAFC
            muted: color.gray[200], // E2E8F0
            emphasis: color.gray[400], // 94A3B8 - Highly visible for skeletons
            inverse: color.gray[900], // 0F172A
            overlay: "rgba(0,0,0,0.6)",
            hover: color.gray[100], // #F1F5F9 - hover state
            disabled: color.gray[100], // #F1F5F9 - disabled background
        },
        // Surfaces (cards, sheets, modals)
        surface: {
            default: color.white,
            raised: color.white,
            overlay: color.white,
            sunken: color.gray[100],
            hover: color.gray[50], // #F8FAFC - subtle hover on elevated surface
            disabled: color.gray[100], // #F1F5F9
        },
        // Text - Much darker overall
        text: {
            primary: color.gray[950], // 020617 - Pure contrast
            secondary: color.gray[700], // 334155 - Very readable
            tertiary: color.gray[500], // 64748B - Not "faded" anymore
            disabled: color.gray[500], // #64748B — 4.8x on white ✅ WCAG AA
            inverse: color.white,
            link: color.brand[700], // #6D28D9
            onBrand: color.white, // text on violet backgrounds
            onAccent: "#1C1917", // text on amber backgrounds
        },
        // Border - Ultra visible
        border: {
            default: color.gray[300], // #CBD5E1 - Default decorative border
            subtle: color.gray[200], // #E2E8F0 - Subtle border
            strong: color.gray[500], // #64748B - Strong border
            input: color.gray[400], // #94A3B8 - Form input border
            focus: color.brand[600], // #7C3AED - Focus ring
            error: color.red[600], // #DC2626
        },
        // Brand — Violet
        brand: {
            default: color.brand[600], // #7C3AED — 5.7x on white ✅
            hover: color.brand[700], // #6D28D9
            active: color.brand[800], // #5B21B6
            subtle: color.brand[100], // #EDE9FE
            muted: color.brand[200], // #DDD6FE
            text: color.brand[700], // #6D28D9
        },
        // Accent — Amber (CTAs, highlights)
        accent: {
            default: color.amber[500], // #F59E0B
            hover: color.amber[600], // #D97706
            active: color.amber[700], // #B45309
            subtle: color.amber[50], // #FFFBEB
            muted: color.amber[100], // #FEF3C7
            text: color.amber[800], // #92400E — 5.0x on white ✅
            onAccent: "#1C1917", // near-black text on amber bg
        },
        // Feedback - Max visibility, high contrast
        success: { bg: color.green[50], text: color.green[900], border: color.green[500], icon: color.green[600] },
        warning: { bg: color.amber[50], text: color.amber[900], border: color.amber[500], icon: color.amber[600] },
        error: { bg: color.red[50], text: color.red[900], border: color.red[500], icon: color.red[600] },
        info: { bg: color.blue[50], text: color.blue[900], border: color.blue[500], icon: color.blue[600] },
    },
    // Shadows — cross-platform (iOS shadowProps + Android elevation)
    shadow: {
        none: { shadowColor: "transparent", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
        sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
        md: { shadowColor: color.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
        lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 16, elevation: 8 },
        xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.20, shadowRadius: 32, elevation: 16 },
    },
};
// ─── Dark mode ───────────────────────────────────────────────────
exports.darkTokens = {
    ...shared,
    color: {
        bg: {
            default: "#0D0D14", // warm near-black (not pure cold gray)
            subtle: color.gray[900],
            muted: color.gray[800],
            emphasis: color.gray[700],
            inverse: color.gray[50],
            overlay: `rgba(0,0,0,0.6)`,
            hover: color.gray[800], // #1E293B - hover state dark
            disabled: color.gray[800], // #1E293B - disabled bg dark
        },
        surface: {
            default: color.gray[900],
            raised: color.gray[800],
            overlay: color.gray[800],
            sunken: color.gray[950],
            hover: "#1A1A28", // slightly lighter than raised
            disabled: "#0D0D14", // same as bg.default = sunken feel
        },
        text: {
            primary: color.gray[50],
            secondary: color.gray[400],
            tertiary: color.gray[500], // #64748B — 4.2x on dark-bg ✅
            disabled: color.gray[600], // #475569 — clearer than before
            inverse: color.gray[900],
            link: color.brand[400], // #A78BFA
            onBrand: color.white, // text on violet backgrounds
            onAccent: "#1C1917", // text on amber backgrounds
        },
        border: {
            default: color.gray[700], // #334155 - Standard border
            subtle: color.gray[800], // #1E293B - Subtle
            strong: color.gray[500], // #64748B - Visible border ✅
            input: color.gray[600], // #475569 - Form input border
            focus: color.brand[400], // #A78BFA - Focus ring ✅
            error: color.red[400],
        },
        // Brand — Violet dark mode
        brand: {
            default: color.brand[400], // #A78BFA — 7.1x on dark-bg ✅ AAA
            hover: color.brand[300], // #C4B5FD
            active: color.brand[200], // #DDD6FE
            subtle: color.brand[950], // #2E1065
            muted: color.brand[900], // #4C1D95
            text: color.brand[300], // #C4B5FD
        },
        // Accent — Amber dark mode
        accent: {
            default: color.amber[400], // #FBBF24 — 11.6x on dark-bg ✅ AAA
            hover: color.amber[300], // #FCD34D
            active: color.amber[500], // #F59E0B
            subtle: "rgba(251,191,36,0.12)",
            muted: "rgba(251,191,36,0.2)",
            text: color.amber[400], // #FBBF24
            onAccent: "#1C1917",
        },
        success: { bg: `rgba(34,197,94,0.12)`, text: color.green[400], border: color.green[600], icon: color.green[400] },
        warning: { bg: `rgba(245,158,11,0.12)`, text: color.amber[400], border: color.amber[600], icon: color.amber[400] },
        error: { bg: `rgba(239,68,68,0.12)`, text: color.red[400], border: color.red[600], icon: color.red[400] },
        info: { bg: `rgba(59,130,246,0.12)`, text: color.blue[400], border: color.blue[600], icon: color.blue[400] },
    },
    // Shadows dark mode — stronger for depth perception
    shadow: {
        none: { shadowColor: "transparent", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
        sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 2 },
        md: { shadowColor: color.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 4 },
        lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 20, elevation: 8 },
        xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.55, shadowRadius: 36, elevation: 16 },
    },
};
// ─── Brand-aware token factory ────────────────────────────────────
/**
 * Build a full SemanticTokens object from a Brand + color scheme.
 *
 * Architecture:
 *   primitive scale (spacing, radius, type...)
 *   + brand color group (bg, surface, text, border, brand, accent, states)
 *   = SemanticTokens (what components consume)
 *
 * @example
 * const tokens = buildSemanticTokens(loveBrand, "dark");
 * <ThemeProvider brand={loveBrand}>...</ThemeProvider>  // automatic
 */
function buildSemanticTokens(brand, scheme) {
    const colors = (0, brand_1.getBrandColors)(brand, scheme);
    const baseShadow = scheme === "dark"
        ? exports.darkTokens.shadow
        : exports.lightTokens.shadow;
    return {
        ...shared,
        color: colors,
        shadow: baseShadow,
    };
}
var brand_2 = require("./brand");
Object.defineProperty(exports, "defineBrand", { enumerable: true, get: function () { return brand_2.defineBrand; } });
Object.defineProperty(exports, "getBrandColors", { enumerable: true, get: function () { return brand_2.getBrandColors; } });
exports.semanticTokens = {
    light: exports.lightTokens,
    dark: exports.darkTokens,
};
//# sourceMappingURL=semantic.js.map