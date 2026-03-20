import type { BrandPreset } from "../types";

export const midnightBrand: BrandPreset = {
  name: "Midnight",
  description: "Deep Purple & Electric Blue — mysterious, luxury, focus",
  preview: {
    primary: "#7E22CE",   // purple-700
    secondary: "#3B82F6", // blue-500
    background: "#0D0D1A",
  },
  light: {
    color: {
      brand: {
        default: "#7E22CE",  // purple-700 — 7.5x on white ✅
        hover:   "#6B21A8",  // purple-800
        active:  "#581C87",  // purple-900
        subtle:  "#F3E8FF",  // purple-100
        muted:   "#E9D5FF",  // purple-200
        text:    "#581C87",  // purple-900
      },
      accent: {
        default:  "#3B82F6", // blue-500
        hover:    "#2563EB", // blue-600
        active:   "#1D4ED8", // blue-700
        subtle:   "#EFF6FF", // blue-50
        muted:    "#DBEAFE", // blue-100
        text:     "#1E3A8A", // blue-900
        onAccent: "#FFFFFF",
      },
      border: {
        focus: "#7E22CE",
      },
    },
  },
  dark: {
    color: {
      bg: {
        default: "#0D0D1A",  // custom very dark purple-tinted
        subtle:  "#12122A",
      },
      surface: {
        default: "#16162E",
        raised:  "#1E1E3A",
      },
      brand: {
        default: "#C084FC",  // purple-400 — high contrast on dark
        hover:   "#D8B4FE",  // purple-300
        active:  "#E9D5FF",  // purple-200
        subtle:  "#3B0764",  // purple-950
        muted:   "#4A044E",  // purple-950 tint
        text:    "#D8B4FE",  // purple-300
      },
      accent: {
        default:  "#60A5FA", // blue-400
        hover:    "#93C5FD", // blue-300
        active:   "#BFDBFE", // blue-200
        subtle:   "rgba(96,165,250,0.12)",
        muted:    "rgba(96,165,250,0.2)",
        text:     "#60A5FA",
        onAccent: "#1E3A8A",
      },
      border: {
        focus: "#C084FC",
      },
    },
  },
};
