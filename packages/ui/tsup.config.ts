import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: false,
    sourcemap: true,
    clean: true,
    treeshake: false,
    external: [
        "react",
        "react-native",
        "react-native-reanimated",
        "react-native-gesture-handler",
        "@shopify/flash-list",
    ],
});
