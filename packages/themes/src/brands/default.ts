import type { BrandPreset } from "../types";

export const defaultBrand: BrandPreset = {
  name: "Default",
  description: "Violet & Amber — premium, warm, developer-focused",
  preview: {
    primary: "#7C3AED",
    secondary: "#F59E0B",
    background: "#FAFAF9",
  },
  // No overrides needed — this IS the base theme
  light: {},
  dark: {},
};
