/**
 * Primitive tokens — raw values.
 * RULE: Never import these directly in components.
 * Always go through semantic tokens.
 */
export declare const primitive: {
    readonly color: {
        readonly black: "#000000";
        readonly white: "#FFFFFF";
        readonly gray: {
            readonly 50: "#F8FAFC";
            readonly 100: "#F1F5F9";
            readonly 200: "#E2E8F0";
            readonly 300: "#CBD5E1";
            readonly 400: "#94A3B8";
            readonly 500: "#64748B";
            readonly 600: "#475569";
            readonly 700: "#334155";
            readonly 800: "#1E293B";
            readonly 900: "#0F172A";
            readonly 950: "#020617";
        };
        readonly brand: {
            readonly 50: "#EEF2FF";
            readonly 100: "#E0E7FF";
            readonly 200: "#C7D2FE";
            readonly 300: "#A5B4FC";
            readonly 400: "#818CF8";
            readonly 500: "#6366F1";
            readonly 600: "#4F46E5";
            readonly 700: "#4338CA";
            readonly 800: "#3730A3";
            readonly 900: "#312E81";
            readonly 950: "#1E1B4B";
        };
        readonly red: {
            readonly 50: "#FEF2F2";
            readonly 400: "#F87171";
            readonly 500: "#EF4444";
            readonly 600: "#DC2626";
            readonly 900: "#7F1D1D";
        };
        readonly green: {
            readonly 50: "#F0FDF4";
            readonly 400: "#4ADE80";
            readonly 500: "#22C55E";
            readonly 600: "#16A34A";
            readonly 900: "#14532D";
        };
        readonly amber: {
            readonly 50: "#FFFBEB";
            readonly 400: "#FBBF24";
            readonly 500: "#F59E0B";
            readonly 600: "#D97706";
            readonly 900: "#78350F";
        };
        readonly blue: {
            readonly 50: "#EFF6FF";
            readonly 400: "#60A5FA";
            readonly 500: "#3B82F6";
            readonly 600: "#2563EB";
            readonly 900: "#1E3A8A";
        };
    };
    readonly spacing: {
        readonly 0: 0;
        readonly 0.5: 2;
        readonly 1: 4;
        readonly 1.5: 6;
        readonly 2: 8;
        readonly 2.5: 10;
        readonly 3: 12;
        readonly 3.5: 14;
        readonly 4: 16;
        readonly 5: 20;
        readonly 6: 24;
        readonly 7: 28;
        readonly 8: 32;
        readonly 9: 36;
        readonly 10: 40;
        readonly 12: 48;
        readonly 14: 56;
        readonly 16: 64;
        readonly 20: 80;
        readonly 24: 96;
    };
    readonly radius: {
        readonly none: 0;
        readonly xs: 2;
        readonly sm: 4;
        readonly md: 8;
        readonly lg: 12;
        readonly xl: 16;
        readonly "2xl": 24;
        readonly full: 9999;
    };
    readonly fontSize: {
        readonly xs: 11;
        readonly sm: 13;
        readonly md: 15;
        readonly lg: 17;
        readonly xl: 20;
        readonly "2xl": 24;
        readonly "3xl": 30;
        readonly "4xl": 36;
    };
    readonly fontWeight: {
        readonly regular: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
    readonly lineHeight: {
        readonly tight: 1.2;
        readonly snug: 1.375;
        readonly normal: 1.5;
        readonly relaxed: 1.625;
        readonly loose: 2;
    };
    readonly letterSpacing: {
        readonly tighter: -0.5;
        readonly tight: -0.25;
        readonly normal: 0;
        readonly wide: 0.25;
        readonly wider: 0.5;
        readonly widest: 1;
    };
    readonly opacity: {
        readonly 0: 0;
        readonly 5: 0.05;
        readonly 10: 0.1;
        readonly 20: 0.2;
        readonly 25: 0.25;
        readonly 30: 0.3;
        readonly 40: 0.4;
        readonly 50: 0.5;
        readonly 60: 0.6;
        readonly 70: 0.7;
        readonly 75: 0.75;
        readonly 80: 0.8;
        readonly 90: 0.9;
        readonly 95: 0.95;
        readonly 100: 1;
    };
    readonly zIndex: {
        readonly base: 0;
        readonly raised: 10;
        readonly dropdown: 100;
        readonly sticky: 200;
        readonly overlay: 300;
        readonly modal: 400;
        readonly toast: 500;
        readonly tooltip: 600;
    };
    readonly elevation: {
        readonly none: 0;
        readonly xs: 1;
        readonly sm: 2;
        readonly md: 4;
        readonly lg: 8;
        readonly xl: 16;
    };
};
export type PrimitiveTokens = typeof primitive;
//# sourceMappingURL=primitive.d.ts.map