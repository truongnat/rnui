import type { BrandPreset } from "../types";

export const loveBrand: BrandPreset = {
  name: "Love",
  description: "Rose & Blush — romantic, warm, tender",
  preview: {
    primary: "#E11D48",   // rose-600
    secondary: "#FB7185", // rose-400
    background: "#FFF1F2",
  },
  light: {
    color: {
      brand: {
        default: "#E11D48",  // rose-600 — 5.0x on white ✅
        hover:   "#BE123C",  // rose-700
        active:  "#9F1239",  // rose-800
        subtle:  "#FFE4E6",  // rose-100
        muted:   "#FECDD3",  // rose-200
        text:    "#9F1239",  // rose-800
      },
      accent: {
        default:  "#FB7185", // rose-400 — use on dark backgrounds
        hover:    "#F43F5E", // rose-500
        active:   "#E11D48", // rose-600
        subtle:   "#FFF1F2", // rose-50
        muted:    "#FFE4E6", // rose-100
        text:     "#9F1239", // rose-800
        onAccent: "#FFFFFF",
      },
      border: {
        focus: "#E11D48",
      },
    },
  },
  dark: {
    color: {
      brand: {
        default: "#FB7185",  // rose-400 — 7.2x on dark-bg ✅
        hover:   "#FDA4AF",  // rose-300
        active:  "#FECDD3",  // rose-200
        subtle:  "#4C0519",  // rose-950
        muted:   "#881337",  // rose-900
        text:    "#FDA4AF",  // rose-300
      },
      accent: {
        default:  "#FB7185", // rose-400
        hover:    "#FDA4AF", // rose-300
        active:   "#FECDD3", // rose-200
        subtle:   "rgba(251,113,133,0.12)",
        muted:    "rgba(251,113,133,0.2)",
        text:     "#FB7185",
        onAccent: "#1C1917",
      },
      border: {
        focus: "#FB7185",
      },
    },
  },
};
