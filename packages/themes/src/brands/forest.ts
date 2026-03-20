import type { BrandPreset } from "../types";

export const forestBrand: BrandPreset = {
  name: "Forest",
  description: "Emerald & Lime — fresh, natural, growth",
  preview: {
    primary: "#059669",   // emerald-600
    secondary: "#84CC16", // lime-500
    background: "#F0FDF4",
  },
  light: {
    color: {
      brand: {
        default: "#059669",  // emerald-600 — 4.7x on white ✅
        hover:   "#047857",  // emerald-700
        active:  "#065F46",  // emerald-800
        subtle:  "#D1FAE5",  // emerald-100
        muted:   "#A7F3D0",  // emerald-200
        text:    "#065F46",  // emerald-800
      },
      accent: {
        default:  "#84CC16", // lime-500
        hover:    "#65A30D", // lime-600
        active:   "#4D7C0F", // lime-700
        subtle:   "#F7FEE7", // lime-50
        muted:    "#ECFCCB", // lime-100
        text:     "#3F6212", // lime-800
        onAccent: "#1A2E05",
      },
      border: {
        focus: "#059669",
      },
    },
  },
  dark: {
    color: {
      brand: {
        default: "#34D399",  // emerald-400
        hover:   "#6EE7B7",  // emerald-300
        active:  "#A7F3D0",  // emerald-200
        subtle:  "#022C22",  // emerald-950
        muted:   "#064E3B",  // emerald-900
        text:    "#6EE7B7",  // emerald-300
      },
      accent: {
        default:  "#A3E635", // lime-400
        hover:    "#BEF264", // lime-300
        active:   "#D9F99D", // lime-200
        subtle:   "rgba(163,230,53,0.12)",
        muted:    "rgba(163,230,53,0.2)",
        text:     "#A3E635",
        onAccent: "#1A2E05",
      },
      border: {
        focus: "#34D399",
      },
    },
  },
};
