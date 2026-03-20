import type { ThemeOverride } from "@rnui/headless";

export interface BrandPreset extends ThemeOverride {
  name: string;
  description: string;
  preview: {
    primary: string;    // main brand hex
    secondary: string;  // accent hex
    background: string; // bg hex
  };
}
