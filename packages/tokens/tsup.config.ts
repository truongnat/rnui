import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "primitive": "src/primitive.ts",
    "semantic": "src/semantic.ts",
    "component": "src/component.ts",
    "brand": "src/brand.ts",
    "motion": "src/motion.ts"
  },
  format: ["esm", "cjs"],
  dts: false,  // Disable tsup's dts generation
  sourcemap: true,
  clean: true,
  treeshake: false,
  tsconfig: "tsconfig.json",
});
