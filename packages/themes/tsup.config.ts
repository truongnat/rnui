import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "brands/default": "src/brands/default.ts",
    "brands/love": "src/brands/love.ts",
    "brands/forest": "src/brands/forest.ts",
    "brands/midnight": "src/brands/midnight.ts",
    "brands/ocean": "src/brands/ocean.ts",
    "brands/sunset": "src/brands/sunset.ts",
    "brands/telegram": "src/brands/telegram.ts"
  },
  format: ["cjs", "esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  outDir: "dist",
});
