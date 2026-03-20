import type { BrandPreset } from "../types";

export const sunsetBrand: BrandPreset = {
  name: "Sunset",
  description: "Orange & Amber — warm, energetic, creative",
  preview: {
    primary: "#EA580C",   // orange-600
    secondary: "#F59E0B", // amber-500
    background: "#FFF7ED",
  },
  light: {
    color: {
      brand: {
        default: "#EA580C",  // orange-600 — 5.1x on white ✅
        hover:   "#C2410C",  // orange-700
        active:  "#9A3412",  // orange-800
        subtle:  "#FFEDD5",  // orange-100
        muted:   "#FED7AA",  // orange-200
        text:    "#9A3412",  // orange-800
      },
      accent: {
        default:  "#F59E0B", // amber-500
        hover:    "#D97706", // amber-600
        active:   "#B45309", // amber-700
        subtle:   "#FFFBEB", // amber-50
        muted:    "#FEF3C7", // amber-100
        text:     "#92400E", // amber-800
        onAccent: "#1C1917",
      },
      border: {
        focus: "#EA580C",
      },
    },
  },
  dark: {
    color: {
      brand: {
        default: "#FB923C",  // orange-400
        hover:   "#FDBA74",  // orange-300
        active:  "#FED7AA",  // orange-200
        subtle:  "#431407",  // orange-950
        muted:   "#7C2D12",  // orange-900
        text:    "#FDBA74",  // orange-300
      },
      accent: {
        default:  "#FBBF24", // amber-400
        hover:    "#FCD34D", // amber-300
        active:   "#FDE68A", // amber-200
        subtle:   "rgba(251,191,36,0.12)",
        muted:    "rgba(251,191,36,0.2)",
        text:     "#FBBF24",
        onAccent: "#1C1917",
      },
      border: {
        focus: "#FB923C",
      },
    },
  },
};
