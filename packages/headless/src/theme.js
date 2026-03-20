"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = createTheme;
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
exports.useTokens = useTokens;
exports.useComponentTokens = useComponentTokens;
exports.useIsDark = useIsDark;
exports.useActiveBrand = useActiveBrand;
exports.useBrandSwitch = useBrandSwitch;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const tokens_1 = require("@rnui/tokens");
/**
 * Utility to define a fine-grained theme override with TypeScript autocomplete.
 * For full brand swaps, use defineBrand() from @rnui/tokens instead.
 */
function createTheme(override) {
    return override;
}
// ─── Context ──────────────────────────────────────────────────────
const ThemeContext = (0, react_1.createContext)(null);
// ─── Provider ─────────────────────────────────────────────────────
function ThemeProvider({ children, colorScheme: forcedScheme = "system", brand: initialBrand, override, }) {
    const systemScheme = (0, react_native_1.useColorScheme)();
    const [manualScheme, setManualScheme] = react_1.default.useState(forcedScheme);
    const [activeBrand, setActiveBrand] = react_1.default.useState(initialBrand);
    const activeScheme = manualScheme === "system" ? (systemScheme === "dark" ? "dark" : "light") : manualScheme;
    const theme = (0, react_1.useMemo)(() => {
        // 1. Build base tokens:
        //    - If brand provided → build full SemanticTokens from brand's color group for this scheme
        //    - Otherwise → use default tokens for this scheme
        let tokens = activeBrand
            ? (0, tokens_1.buildSemanticTokens)(activeBrand, activeScheme)
            : tokens_1.semanticTokens[activeScheme];
        // 2. Apply fine-grained override on top (deep merge)
        if (override?.[activeScheme]) {
            tokens = deepMerge(tokens, override[activeScheme]);
        }
        // 3. Derive component tokens from the resolved semantic tokens
        const components = (0, tokens_1.resolveComponentTokens)(tokens);
        return {
            tokens,
            components,
            colorScheme: activeScheme,
            brand: activeBrand,
            setColorScheme: setManualScheme,
            setBrand: setActiveBrand,
        };
    }, [activeScheme, activeBrand, override]);
    return (<react_native_gesture_handler_1.GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </react_native_gesture_handler_1.GestureHandlerRootView>);
}
// ─── Hooks ────────────────────────────────────────────────────────
/**
 * Access the full theme (tokens + components + colorScheme + brand).
 * Throws if used outside ThemeProvider.
 */
function useTheme() {
    const ctx = (0, react_1.useContext)(ThemeContext);
    if (!ctx) {
        throw new Error("[RNUI] useTheme must be used inside <ThemeProvider>. " +
            "Wrap your app root with <ThemeProvider>.");
    }
    return ctx;
}
/**
 * Returns only semantic tokens. Slightly cheaper when you don't need
 * components, colorScheme, or brand.
 */
function useTokens() {
    return useTheme().tokens;
}
/**
 * Returns only component tokens.
 */
function useComponentTokens() {
    return useTheme().components;
}
/**
 * Returns true when the active color scheme is dark.
 */
function useIsDark() {
    return useTheme().colorScheme === "dark";
}
/**
 * Returns the active brand (or undefined if using default tokens).
 */
function useActiveBrand() {
    return useTheme().brand;
}
/**
 * Returns a function to swap the brand at runtime.
 * Triggers a full re-render of all components consuming tokens.
 *
 * @example
 * const switchBrand = useBrandSwitch();
 * switchBrand(oceanBrand);
 */
function useBrandSwitch() {
    return useTheme().setBrand;
}
function deepMerge(base, override) {
    const result = { ...base };
    for (const key in override) {
        const overrideVal = override[key];
        const baseVal = base[key];
        if (overrideVal !== undefined &&
            typeof overrideVal === "object" &&
            !Array.isArray(overrideVal) &&
            baseVal !== null &&
            typeof baseVal === "object") {
            result[key] = deepMerge(baseVal, overrideVal);
        }
        else if (overrideVal !== undefined) {
            result[key] = overrideVal;
        }
    }
    return result;
}
//# sourceMappingURL=theme.js.map