import type { SemanticTokens } from "./semantic";
/**
 * Component tokens — computed per component from semantic tokens.
 * Generated at theme-resolution time inside ThemeProvider.
 * RULE: One function per component, takes SemanticTokens, returns typed style map.
 */
export declare function buttonTokens(t: SemanticTokens): {
    variant: {
        solid: {
            container: {
                backgroundColor: string;
                borderWidth: number;
                borderRadius: 9999;
                flexDirection: "row";
                alignItems: "center";
                justifyContent: "center";
                gap: 8;
            };
            text: {
                color: string;
                fontWeight: "600";
            };
            pressed: {
                backgroundColor: string;
            };
        };
        outline: {
            container: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
                borderRadius: 9999;
                flexDirection: "row";
                alignItems: "center";
                justifyContent: "center";
                gap: 8;
            };
            text: {
                color: string;
                fontWeight: "600";
            };
            pressed: {
                backgroundColor: string;
            };
        };
        ghost: {
            container: {
                backgroundColor: string;
                borderWidth: number;
                borderRadius: 9999;
                flexDirection: "row";
                alignItems: "center";
                justifyContent: "center";
                gap: 8;
            };
            text: {
                color: string;
                fontWeight: "600";
            };
            pressed: {
                backgroundColor: string;
            };
        };
        destructive: {
            container: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
                borderRadius: 9999;
                flexDirection: "row";
                alignItems: "center";
                justifyContent: "center";
                gap: 8;
            };
            text: {
                color: string;
                fontWeight: "600";
            };
            pressed: {
                backgroundColor: string;
            };
        };
    };
    size: {
        sm: {
            container: {
                height: number;
                paddingHorizontal: 16;
            };
            text: {
                fontSize: 13;
            };
        };
        md: {
            container: {
                height: number;
                paddingHorizontal: 20;
            };
            text: {
                fontSize: 15;
            };
        };
        lg: {
            container: {
                height: number;
                paddingHorizontal: 32;
            };
            text: {
                fontSize: 17;
            };
        };
    };
    disabled: {
        container: {
            opacity: 0.4;
        };
    };
};
export declare function inputTokens(t: SemanticTokens): {
    container: {
        borderWidth: number;
        borderColor: string;
        borderRadius: 8;
        backgroundColor: string;
        flexDirection: "row";
        alignItems: "center";
        paddingHorizontal: 12;
        gap: 8;
    };
    size: {
        sm: {
            height: number;
            fontSize: 13;
        };
        md: {
            height: number;
            fontSize: 15;
        };
        lg: {
            height: number;
            fontSize: 17;
        };
    };
    state: {
        default: {
            borderColor: string;
        };
        focused: {
            borderColor: string;
            borderWidth: number;
        };
        error: {
            borderColor: string;
        };
        disabled: {
            backgroundColor: string;
            opacity: 0.6;
        };
    };
    text: {
        color: string;
        placeholderColor: string;
    };
    label: {
        fontSize: 13;
        fontWeight: "500";
        color: string;
        marginBottom: 4;
    };
    helperText: {
        fontSize: 11;
        color: string;
        marginTop: 4;
    };
    errorText: {
        fontSize: 11;
        color: string;
        marginTop: 4;
    };
};
export declare function cardTokens(t: SemanticTokens): {
    container: {
        backgroundColor: string;
        borderRadius: 12;
        borderWidth: number;
        borderColor: string;
    };
    padding: {
        sm: 12;
        md: 16;
        lg: 24;
    };
    pressed: {
        opacity: 0.8;
    };
};
export declare function badgeTokens(t: SemanticTokens): {
    base: {
        borderRadius: 9999;
        paddingHorizontal: 8;
        paddingVertical: 2;
        alignSelf: "flex-start";
    };
    variant: {
        default: {
            bg: string;
            text: string;
        };
        brand: {
            bg: string;
            text: string;
        };
        success: {
            bg: string;
            text: string;
        };
        warning: {
            bg: string;
            text: string;
        };
        error: {
            bg: string;
            text: string;
        };
        info: {
            bg: string;
            text: string;
        };
    };
    text: {
        fontSize: 11;
        fontWeight: "600";
    };
};
export declare function toastTokens(t: SemanticTokens): {
    container: {
        borderRadius: 12;
        paddingHorizontal: 16;
        paddingVertical: 12;
        flexDirection: "row";
        alignItems: "center";
        gap: 12;
    };
    variant: {
        default: {
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
        };
        success: {
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
        };
        warning: {
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
        };
        error: {
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
        };
        info: {
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
        };
    };
    text: {
        fontSize: 13;
        color: string;
        flex: number;
    };
};
export declare function avatarTokens(t: SemanticTokens): {
    container: {
        backgroundColor: string;
        alignItems: "center";
        justifyContent: "center";
    };
    text: {
        color: string;
        fontWeight: "600";
    };
    presence: {
        borderWidth: number;
        borderColor: string;
    };
};
export declare function checkboxTokens(t: SemanticTokens): {
    container: {
        width: number;
        height: number;
        borderRadius: 2;
        borderWidth: number;
        alignItems: "center";
        justifyContent: "center";
    };
    state: {
        default: {
            borderColor: string;
            backgroundColor: string;
        };
        checked: {
            borderColor: string;
            backgroundColor: string;
        };
        disabled: {
            opacity: 0.4;
        };
    };
};
export declare function resolveComponentTokens(t: SemanticTokens): {
    button: {
        variant: {
            solid: {
                container: {
                    backgroundColor: string;
                    borderWidth: number;
                    borderRadius: 9999;
                    flexDirection: "row";
                    alignItems: "center";
                    justifyContent: "center";
                    gap: 8;
                };
                text: {
                    color: string;
                    fontWeight: "600";
                };
                pressed: {
                    backgroundColor: string;
                };
            };
            outline: {
                container: {
                    backgroundColor: string;
                    borderWidth: number;
                    borderColor: string;
                    borderRadius: 9999;
                    flexDirection: "row";
                    alignItems: "center";
                    justifyContent: "center";
                    gap: 8;
                };
                text: {
                    color: string;
                    fontWeight: "600";
                };
                pressed: {
                    backgroundColor: string;
                };
            };
            ghost: {
                container: {
                    backgroundColor: string;
                    borderWidth: number;
                    borderRadius: 9999;
                    flexDirection: "row";
                    alignItems: "center";
                    justifyContent: "center";
                    gap: 8;
                };
                text: {
                    color: string;
                    fontWeight: "600";
                };
                pressed: {
                    backgroundColor: string;
                };
            };
            destructive: {
                container: {
                    backgroundColor: string;
                    borderWidth: number;
                    borderColor: string;
                    borderRadius: 9999;
                    flexDirection: "row";
                    alignItems: "center";
                    justifyContent: "center";
                    gap: 8;
                };
                text: {
                    color: string;
                    fontWeight: "600";
                };
                pressed: {
                    backgroundColor: string;
                };
            };
        };
        size: {
            sm: {
                container: {
                    height: number;
                    paddingHorizontal: 16;
                };
                text: {
                    fontSize: 13;
                };
            };
            md: {
                container: {
                    height: number;
                    paddingHorizontal: 20;
                };
                text: {
                    fontSize: 15;
                };
            };
            lg: {
                container: {
                    height: number;
                    paddingHorizontal: 32;
                };
                text: {
                    fontSize: 17;
                };
            };
        };
        disabled: {
            container: {
                opacity: 0.4;
            };
        };
    };
    input: {
        container: {
            borderWidth: number;
            borderColor: string;
            borderRadius: 8;
            backgroundColor: string;
            flexDirection: "row";
            alignItems: "center";
            paddingHorizontal: 12;
            gap: 8;
        };
        size: {
            sm: {
                height: number;
                fontSize: 13;
            };
            md: {
                height: number;
                fontSize: 15;
            };
            lg: {
                height: number;
                fontSize: 17;
            };
        };
        state: {
            default: {
                borderColor: string;
            };
            focused: {
                borderColor: string;
                borderWidth: number;
            };
            error: {
                borderColor: string;
            };
            disabled: {
                backgroundColor: string;
                opacity: 0.6;
            };
        };
        text: {
            color: string;
            placeholderColor: string;
        };
        label: {
            fontSize: 13;
            fontWeight: "500";
            color: string;
            marginBottom: 4;
        };
        helperText: {
            fontSize: 11;
            color: string;
            marginTop: 4;
        };
        errorText: {
            fontSize: 11;
            color: string;
            marginTop: 4;
        };
    };
    card: {
        container: {
            backgroundColor: string;
            borderRadius: 12;
            borderWidth: number;
            borderColor: string;
        };
        padding: {
            sm: 12;
            md: 16;
            lg: 24;
        };
        pressed: {
            opacity: 0.8;
        };
    };
    badge: {
        base: {
            borderRadius: 9999;
            paddingHorizontal: 8;
            paddingVertical: 2;
            alignSelf: "flex-start";
        };
        variant: {
            default: {
                bg: string;
                text: string;
            };
            brand: {
                bg: string;
                text: string;
            };
            success: {
                bg: string;
                text: string;
            };
            warning: {
                bg: string;
                text: string;
            };
            error: {
                bg: string;
                text: string;
            };
            info: {
                bg: string;
                text: string;
            };
        };
        text: {
            fontSize: 11;
            fontWeight: "600";
        };
    };
    toast: {
        container: {
            borderRadius: 12;
            paddingHorizontal: 16;
            paddingVertical: 12;
            flexDirection: "row";
            alignItems: "center";
            gap: 12;
        };
        variant: {
            default: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
            };
            success: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
            };
            warning: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
            };
            error: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
            };
            info: {
                backgroundColor: string;
                borderWidth: number;
                borderColor: string;
            };
        };
        text: {
            fontSize: 13;
            color: string;
            flex: number;
        };
    };
    avatar: {
        container: {
            backgroundColor: string;
            alignItems: "center";
            justifyContent: "center";
        };
        text: {
            color: string;
            fontWeight: "600";
        };
        presence: {
            borderWidth: number;
            borderColor: string;
        };
    };
    checkbox: {
        container: {
            width: number;
            height: number;
            borderRadius: 2;
            borderWidth: number;
            alignItems: "center";
            justifyContent: "center";
        };
        state: {
            default: {
                borderColor: string;
                backgroundColor: string;
            };
            checked: {
                borderColor: string;
                backgroundColor: string;
            };
            disabled: {
                opacity: 0.4;
            };
        };
    };
};
export type ComponentTokens = ReturnType<typeof resolveComponentTokens>;
//# sourceMappingURL=component.d.ts.map