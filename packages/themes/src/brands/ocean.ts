import type { BrandPreset } from "../types";

export const oceanBrand: BrandPreset = {
  name: "Ocean",
  description: "Teal & Cyan — calm, deep, trustworthy",
  preview: {
    primary: "#0D9488",   // teal-600
    secondary: "#06B6D4", // cyan-500
    background: "#F0FDFA",
  },
  light: {
    color: {
      brand: {
        default: "#0D9488",  // teal-600 — 5.1x on white ✅
        hover:   "#0F766E",  // teal-700
        active:  "#115E59",  // teal-800
        subtle:  "#CCFBF1",  // teal-100
        muted:   "#99F6E4",  // teal-200
        text:    "#115E59",  // teal-800
      },
      accent: {
        default:  "#06B6D4", // cyan-500
        hover:    "#0891B2", // cyan-600
        active:   "#0E7490", // cyan-700
        subtle:   "#CFFAFE", // cyan-100
        muted:    "#A5F3FC", // cyan-200
        text:     "#164E63", // cyan-900
        onAccent: "#FFFFFF",
      },
      border: {
        focus: "#0D9488",
      },
    },
  },
  dark: {
    color: {
      brand: {
        default: "#2DD4BF",  // teal-400 — high contrast on dark
        hover:   "#5EEAD4",  // teal-300
        active:  "#99F6E4",  // teal-200
        subtle:  "#042F2E",  // teal-950
        muted:   "#134E4A",  // teal-900
        text:    "#5EEAD4",  // teal-300
      },
      accent: {
        default:  "#22D3EE", // cyan-400
        hover:    "#67E8F9", // cyan-300
        active:   "#A5F3FC", // cyan-200
        subtle:   "rgba(34,211,238,0.12)",
        muted:    "rgba(34,211,238,0.2)",
        text:     "#22D3EE",
        onAccent: "#083344",
      },
      border: {
        focus: "#2DD4BF",
      },
    },
  },
};
