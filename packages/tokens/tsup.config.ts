import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: false,  // Disable tsup's dts generation
  sourcemap: true,
  clean: true,
  treeshake: false,
  tsconfig: "tsconfig.json",
});
