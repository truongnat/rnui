declare const shared: {
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
    readonly text: {
        readonly xs: {
            readonly fontSize: 11;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly sm: {
            readonly fontSize: 13;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly md: {
            readonly fontSize: 15;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly lg: {
            readonly fontSize: 17;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly xl: {
            readonly fontSize: 20;
            readonly lineHeight: number;
            readonly fontWeight: "500";
        };
        readonly "2xl": {
            readonly fontSize: 24;
            readonly lineHeight: number;
            readonly fontWeight: "500";
        };
        readonly "3xl": {
            readonly fontSize: 30;
            readonly lineHeight: number;
            readonly fontWeight: "600";
        };
    };
};
export declare const lightTokens: {
    readonly color: {
        readonly bg: {
            readonly default: "#FFFFFF";
            readonly subtle: "#F8FAFC";
            readonly muted: "#E2E8F0";
            readonly emphasis: "#94A3B8";
            readonly inverse: "#0F172A";
            readonly overlay: "rgba(0,0,0,0.6)";
        };
        readonly surface: {
            readonly default: "#FFFFFF";
            readonly raised: "#FFFFFF";
            readonly overlay: "#FFFFFF";
            readonly sunken: "#F1F5F9";
        };
        readonly text: {
            readonly primary: "#020617";
            readonly secondary: "#334155";
            readonly tertiary: "#64748B";
            readonly disabled: "#94A3B8";
            readonly inverse: "#FFFFFF";
            readonly link: "#4338CA";
        };
        readonly border: {
            readonly default: "#94A3B8";
            readonly strong: "#475569";
            readonly focus: "#4F46E5";
            readonly error: "#DC2626";
        };
        readonly brand: {
            readonly default: "#4F46E5";
            readonly hover: "#4338CA";
            readonly active: "#3730A3";
            readonly subtle: "#E0E7FF";
            readonly muted: "#C7D2FE";
            readonly text: "#3730A3";
        };
        readonly success: {
            readonly bg: "#F0FDF4";
            readonly text: "#14532D";
            readonly border: "#22C55E";
            readonly icon: "#16A34A";
        };
        readonly warning: {
            readonly bg: "#FFFBEB";
            readonly text: "#78350F";
            readonly border: "#F59E0B";
            readonly icon: "#D97706";
        };
        readonly error: {
            readonly bg: "#FEF2F2";
            readonly text: "#7F1D1D";
            readonly border: "#EF4444";
            readonly icon: "#DC2626";
        };
        readonly info: {
            readonly bg: "#EFF6FF";
            readonly text: "#1E3A8A";
            readonly border: "#3B82F6";
            readonly icon: "#2563EB";
        };
    };
    readonly shadow: {
        readonly none: {};
        readonly sm: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 1;
            };
            readonly shadowOpacity: 0.1;
            readonly shadowRadius: 2;
        };
        readonly md: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 6;
            };
            readonly shadowOpacity: 0.2;
            readonly shadowRadius: 12;
        };
        readonly lg: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 12;
            };
            readonly shadowOpacity: 0.25;
            readonly shadowRadius: 24;
        };
        readonly xl: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 20;
            };
            readonly shadowOpacity: 0.3;
            readonly shadowRadius: 40;
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
    readonly text: {
        readonly xs: {
            readonly fontSize: 11;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly sm: {
            readonly fontSize: 13;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly md: {
            readonly fontSize: 15;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly lg: {
            readonly fontSize: 17;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly xl: {
            readonly fontSize: 20;
            readonly lineHeight: number;
            readonly fontWeight: "500";
        };
        readonly "2xl": {
            readonly fontSize: 24;
            readonly lineHeight: number;
            readonly fontWeight: "500";
        };
        readonly "3xl": {
            readonly fontSize: 30;
            readonly lineHeight: number;
            readonly fontWeight: "600";
        };
    };
};
export declare const darkTokens: {
    readonly color: {
        readonly bg: {
            readonly default: "#020617";
            readonly subtle: "#0F172A";
            readonly muted: "#1E293B";
            readonly emphasis: "#334155";
            readonly inverse: "#F8FAFC";
            readonly overlay: "rgba(0,0,0,0.6)";
        };
        readonly surface: {
            readonly default: "#0F172A";
            readonly raised: "#1E293B";
            readonly overlay: "#1E293B";
            readonly sunken: "#020617";
        };
        readonly text: {
            readonly primary: "#F8FAFC";
            readonly secondary: "#94A3B8";
            readonly tertiary: "#475569";
            readonly disabled: "#334155";
            readonly inverse: "#0F172A";
            readonly link: "#818CF8";
        };
        readonly border: {
            readonly default: "#334155";
            readonly strong: "#475569";
            readonly focus: "#818CF8";
            readonly error: "#F87171";
        };
        readonly brand: {
            readonly default: "#6366F1";
            readonly hover: "#818CF8";
            readonly active: "#A5B4FC";
            readonly subtle: "#1E1B4B";
            readonly muted: "#312E81";
            readonly text: "#A5B4FC";
        };
        readonly success: {
            readonly bg: "rgba(34,197,94,0.12)";
            readonly text: "#4ADE80";
            readonly border: "#16A34A";
            readonly icon: "#4ADE80";
        };
        readonly warning: {
            readonly bg: "rgba(245,158,11,0.12)";
            readonly text: "#FBBF24";
            readonly border: "#D97706";
            readonly icon: "#FBBF24";
        };
        readonly error: {
            readonly bg: "rgba(239,68,68,0.12)";
            readonly text: "#F87171";
            readonly border: "#DC2626";
            readonly icon: "#F87171";
        };
        readonly info: {
            readonly bg: "rgba(59,130,246,0.12)";
            readonly text: "#60A5FA";
            readonly border: "#2563EB";
            readonly icon: "#60A5FA";
        };
    };
    readonly shadow: {
        readonly none: {};
        readonly sm: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 1;
            };
            readonly shadowOpacity: 0.2;
            readonly shadowRadius: 2;
        };
        readonly md: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 2;
            };
            readonly shadowOpacity: 0.3;
            readonly shadowRadius: 8;
        };
        readonly lg: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 4;
            };
            readonly shadowOpacity: 0.4;
            readonly shadowRadius: 16;
        };
        readonly xl: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 8;
            };
            readonly shadowOpacity: 0.5;
            readonly shadowRadius: 24;
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
    readonly text: {
        readonly xs: {
            readonly fontSize: 11;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly sm: {
            readonly fontSize: 13;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly md: {
            readonly fontSize: 15;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly lg: {
            readonly fontSize: 17;
            readonly lineHeight: number;
            readonly fontWeight: "400";
        };
        readonly xl: {
            readonly fontSize: 20;
            readonly lineHeight: number;
            readonly fontWeight: "500";
        };
        readonly "2xl": {
            readonly fontSize: 24;
            readonly lineHeight: number;
            readonly fontWeight: "500";
        };
        readonly "3xl": {
            readonly fontSize: 30;
            readonly lineHeight: number;
            readonly fontWeight: "600";
        };
    };
};
interface ColorGroup {
    bg: {
        default: string;
        subtle: string;
        muted: string;
        emphasis: string;
        inverse: string;
        overlay: string;
    };
    surface: {
        default: string;
        raised: string;
        overlay: string;
        sunken: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
        inverse: string;
        link: string;
    };
    border: {
        default: string;
        strong: string;
        focus: string;
        error: string;
    };
    brand: {
        default: string;
        hover: string;
        active: string;
        subtle: string;
        muted: string;
        text: string;
    };
    success: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
    warning: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
    error: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
    info: {
        bg: string;
        text: string;
        border: string;
        icon: string;
    };
}
export interface SemanticTokens {
    spacing: typeof shared.spacing;
    radius: typeof shared.radius;
    fontSize: typeof shared.fontSize;
    fontWeight: typeof shared.fontWeight;
    lineHeight: typeof shared.lineHeight;
    letterSpacing: typeof shared.letterSpacing;
    opacity: typeof shared.opacity;
    zIndex: typeof shared.zIndex;
    elevation: typeof shared.elevation;
    text: typeof shared.text;
    color: ColorGroup;
    shadow: {
        none: object;
        sm: object;
        md: object;
        lg: object;
        xl: object;
    };
}
export type ColorScheme = "light" | "dark";
export declare const semanticTokens: Record<ColorScheme, SemanticTokens>;
export {};
//# sourceMappingURL=semantic.d.ts.map