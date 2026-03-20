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
                shadowColor: string;
                shadowOffset: {
                    width: number;
                    height: number;
                };
                shadowOpacity: number;
                shadowRadius: number;
                elevation: number;
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
                shadowColor: string;
                shadowOffset: {
                    width: number;
                    height: number;
                };
                shadowOpacity: number;
                shadowRadius: number;
                elevation: number;
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
        accent: {
            container: {
                shadowColor: string;
                shadowOffset: {
                    width: number;
                    height: number;
                };
                shadowOpacity: number;
                shadowRadius: number;
                elevation: number;
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
                shadowColor: string;
                shadowOffset: {
                    width: number;
                    height: number;
                };
                shadowOpacity: number;
                shadowRadius: number;
                elevation: number;
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
                paddingHorizontal: 24;
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
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
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
    hover: {
        borderColor: string;
    };
    disabled: {
        backgroundColor: string;
        borderColor: string;
        opacity: 0.5;
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
    focusRing: {
        borderColor: string;
        borderWidth: number;
        outlineOffset: 2;
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
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
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
        alignSelf: "flex-start";
    };
    size: {
        sm: {
            paddingHorizontal: 8;
            paddingVertical: 2;
            fontSize: 11;
        };
        md: {
            paddingHorizontal: 10;
            paddingVertical: 4;
            fontSize: 11;
        };
        lg: {
            paddingHorizontal: 12;
            paddingVertical: 6;
            fontSize: 13;
        };
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
        accent: {
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
        fontWeight: "600";
    };
    dot: {
        size: number;
        offset: number;
    };
};
export declare function toastTokens(t: SemanticTokens): {
    container: {
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        borderRadius: 12;
        paddingHorizontal: 24;
        paddingVertical: 20;
        flexDirection: "row";
        alignItems: "center";
        gap: 16;
    };
    variant: {
        default: {
            backgroundColor: string;
            borderWidth: number;
        };
        success: {
            backgroundColor: string;
            borderLeftWidth: number;
            borderLeftColor: string;
        };
        warning: {
            backgroundColor: string;
            borderLeftWidth: number;
            borderLeftColor: string;
        };
        error: {
            backgroundColor: string;
            borderLeftWidth: number;
            borderLeftColor: string;
        };
        info: {
            backgroundColor: string;
            borderLeftWidth: number;
            borderLeftColor: string;
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
    size: {
        xs: {
            width: number;
            height: number;
            borderRadius: number;
            fontSize: 11;
        };
        sm: {
            width: number;
            height: number;
            borderRadius: number;
            fontSize: 13;
        };
        md: {
            width: number;
            height: number;
            borderRadius: number;
            fontSize: 15;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: number;
            fontSize: 17;
        };
        xl: {
            width: number;
            height: number;
            borderRadius: number;
            fontSize: 20;
        };
        "2xl": {
            width: number;
            height: number;
            borderRadius: number;
            fontSize: 24;
        };
    };
    text: {
        color: string;
        fontWeight: "600";
    };
    onBrand: {
        color: string;
        fontWeight: "600";
    };
    presence: {
        borderWidth: number;
        borderColor: string;
    };
};
export declare function checkboxTokens(t: SemanticTokens): {
    size: {
        sm: {
            width: number;
            height: number;
            borderRadius: 2;
            borderWidth: number;
            iconSize: number;
        };
        md: {
            width: number;
            height: number;
            borderRadius: 2;
            borderWidth: number;
            iconSize: number;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: 4;
            borderWidth: number;
            iconSize: number;
        };
    };
    container: {
        alignItems: "center";
        justifyContent: "center";
    };
    focusRing: {
        borderColor: string;
        borderWidth: number;
        outlineOffset: 2;
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
export declare function switchTokens(t: SemanticTokens): {
    track: {
        sm: {
            width: number;
            height: number;
            borderRadius: number;
            padding: number;
        };
        md: {
            width: number;
            height: number;
            borderRadius: number;
            padding: number;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: number;
            padding: number;
        };
    };
    thumb: {
        sm: {
            width: number;
            height: number;
            borderRadius: number;
        };
        md: {
            width: number;
            height: number;
            borderRadius: number;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: number;
        };
    };
    colors: {
        trackOff: string;
        trackOn: string;
        thumb: string;
        disabledOpacity: 0.4;
    };
};
export declare function radioTokens(t: SemanticTokens): {
    container: {
        sm: {
            width: number;
            height: number;
            borderRadius: number;
            borderWidth: number;
        };
        md: {
            width: number;
            height: number;
            borderRadius: number;
            borderWidth: number;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: number;
            borderWidth: number;
        };
    };
    dot: {
        sm: {
            width: number;
            height: number;
            borderRadius: number;
        };
        md: {
            width: number;
            height: number;
            borderRadius: number;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: number;
        };
    };
    colors: {
        borderOff: string;
        borderOn: string;
        bgOff: string;
        bgOn: string;
        dot: string;
        disabledOpacity: 0.4;
    };
};
export declare function sliderTokens(t: SemanticTokens): {
    track: {
        height: number;
        borderRadius: 9999;
        bgOff: string;
        bgOn: string;
    };
    thumb: {
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        width: number;
        height: number;
        borderRadius: number;
        bg: string;
        borderColor: string;
        borderWidth: number;
    };
    disabledOpacity: 0.4;
};
export declare function chipTokens(t: SemanticTokens): {
    container: {
        borderRadius: 9999;
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "center";
        gap: 4;
    };
    size: {
        sm: {
            height: number;
            paddingHorizontal: 8;
            fontSize: 11;
        };
        md: {
            height: number;
            paddingHorizontal: 12;
            fontSize: 13;
        };
        lg: {
            height: number;
            paddingHorizontal: 16;
            fontSize: 15;
        };
    };
    variant: {
        solid: {
            bg: string;
            text: string;
            border: string;
        };
        outlined: {
            bg: string;
            text: string;
            border: string;
        };
        subtle: {
            bg: string;
            text: string;
            border: string;
        };
        accent: {
            bg: string;
            text: string;
            border: string;
        };
    };
    deleteIcon: {
        color: string;
        size: number;
    };
};
export declare function fabTokens(t: SemanticTokens): {
    container: {
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        alignItems: "center";
        justifyContent: "center";
    };
    size: {
        sm: {
            width: number;
            height: number;
            borderRadius: number;
        };
        md: {
            width: number;
            height: number;
            borderRadius: number;
        };
        lg: {
            width: number;
            height: number;
            borderRadius: number;
        };
    };
    color: {
        primary: {
            bg: string;
            text: string;
        };
        secondary: {
            bg: string;
            text: string;
        };
    };
};
export declare function dialogTokens(t: SemanticTokens): {
    container: {
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        backgroundColor: string;
        borderRadius: 16;
        padding: 24;
    };
    title: {
        fontSize: 20;
        fontWeight: "600";
        color: string;
        marginBottom: 8;
    };
    content: {
        fontSize: 15;
        color: string;
        lineHeight: number;
    };
    actions: {
        marginTop: 24;
        flexDirection: "row";
        justifyContent: "flex-end";
        gap: 8;
    };
};
export declare function resolveComponentTokens(t: SemanticTokens): {
    readonly button: {
        variant: {
            solid: {
                container: {
                    shadowColor: string;
                    shadowOffset: {
                        width: number;
                        height: number;
                    };
                    shadowOpacity: number;
                    shadowRadius: number;
                    elevation: number;
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
                    shadowColor: string;
                    shadowOffset: {
                        width: number;
                        height: number;
                    };
                    shadowOpacity: number;
                    shadowRadius: number;
                    elevation: number;
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
            accent: {
                container: {
                    shadowColor: string;
                    shadowOffset: {
                        width: number;
                        height: number;
                    };
                    shadowOpacity: number;
                    shadowRadius: number;
                    elevation: number;
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
                    shadowColor: string;
                    shadowOffset: {
                        width: number;
                        height: number;
                    };
                    shadowOpacity: number;
                    shadowRadius: number;
                    elevation: number;
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
                    paddingHorizontal: 24;
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
                shadowColor: string;
                shadowOffset: {
                    width: number;
                    height: number;
                };
                shadowOpacity: number;
                shadowRadius: number;
                elevation: number;
                opacity: 0.4;
            };
        };
    };
    readonly input: {
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
        hover: {
            borderColor: string;
        };
        disabled: {
            backgroundColor: string;
            borderColor: string;
            opacity: 0.5;
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
        focusRing: {
            borderColor: string;
            borderWidth: number;
            outlineOffset: 2;
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
    readonly card: {
        container: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
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
    readonly badge: {
        base: {
            borderRadius: 9999;
            alignSelf: "flex-start";
        };
        size: {
            sm: {
                paddingHorizontal: 8;
                paddingVertical: 2;
                fontSize: 11;
            };
            md: {
                paddingHorizontal: 10;
                paddingVertical: 4;
                fontSize: 11;
            };
            lg: {
                paddingHorizontal: 12;
                paddingVertical: 6;
                fontSize: 13;
            };
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
            accent: {
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
            fontWeight: "600";
        };
        dot: {
            size: number;
            offset: number;
        };
    };
    readonly toast: {
        container: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
            borderRadius: 12;
            paddingHorizontal: 24;
            paddingVertical: 20;
            flexDirection: "row";
            alignItems: "center";
            gap: 16;
        };
        variant: {
            default: {
                backgroundColor: string;
                borderWidth: number;
            };
            success: {
                backgroundColor: string;
                borderLeftWidth: number;
                borderLeftColor: string;
            };
            warning: {
                backgroundColor: string;
                borderLeftWidth: number;
                borderLeftColor: string;
            };
            error: {
                backgroundColor: string;
                borderLeftWidth: number;
                borderLeftColor: string;
            };
            info: {
                backgroundColor: string;
                borderLeftWidth: number;
                borderLeftColor: string;
            };
        };
        text: {
            fontSize: 13;
            color: string;
            flex: number;
        };
    };
    readonly avatar: {
        container: {
            backgroundColor: string;
            alignItems: "center";
            justifyContent: "center";
        };
        size: {
            xs: {
                width: number;
                height: number;
                borderRadius: number;
                fontSize: 11;
            };
            sm: {
                width: number;
                height: number;
                borderRadius: number;
                fontSize: 13;
            };
            md: {
                width: number;
                height: number;
                borderRadius: number;
                fontSize: 15;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: number;
                fontSize: 17;
            };
            xl: {
                width: number;
                height: number;
                borderRadius: number;
                fontSize: 20;
            };
            "2xl": {
                width: number;
                height: number;
                borderRadius: number;
                fontSize: 24;
            };
        };
        text: {
            color: string;
            fontWeight: "600";
        };
        onBrand: {
            color: string;
            fontWeight: "600";
        };
        presence: {
            borderWidth: number;
            borderColor: string;
        };
    };
    readonly checkbox: {
        size: {
            sm: {
                width: number;
                height: number;
                borderRadius: 2;
                borderWidth: number;
                iconSize: number;
            };
            md: {
                width: number;
                height: number;
                borderRadius: 2;
                borderWidth: number;
                iconSize: number;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: 4;
                borderWidth: number;
                iconSize: number;
            };
        };
        container: {
            alignItems: "center";
            justifyContent: "center";
        };
        focusRing: {
            borderColor: string;
            borderWidth: number;
            outlineOffset: 2;
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
    readonly switch: {
        track: {
            sm: {
                width: number;
                height: number;
                borderRadius: number;
                padding: number;
            };
            md: {
                width: number;
                height: number;
                borderRadius: number;
                padding: number;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: number;
                padding: number;
            };
        };
        thumb: {
            sm: {
                width: number;
                height: number;
                borderRadius: number;
            };
            md: {
                width: number;
                height: number;
                borderRadius: number;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: number;
            };
        };
        colors: {
            trackOff: string;
            trackOn: string;
            thumb: string;
            disabledOpacity: 0.4;
        };
    };
    readonly radio: {
        container: {
            sm: {
                width: number;
                height: number;
                borderRadius: number;
                borderWidth: number;
            };
            md: {
                width: number;
                height: number;
                borderRadius: number;
                borderWidth: number;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: number;
                borderWidth: number;
            };
        };
        dot: {
            sm: {
                width: number;
                height: number;
                borderRadius: number;
            };
            md: {
                width: number;
                height: number;
                borderRadius: number;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: number;
            };
        };
        colors: {
            borderOff: string;
            borderOn: string;
            bgOff: string;
            bgOn: string;
            dot: string;
            disabledOpacity: 0.4;
        };
    };
    readonly slider: {
        track: {
            height: number;
            borderRadius: 9999;
            bgOff: string;
            bgOn: string;
        };
        thumb: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
            width: number;
            height: number;
            borderRadius: number;
            bg: string;
            borderColor: string;
            borderWidth: number;
        };
        disabledOpacity: 0.4;
    };
    readonly chip: {
        container: {
            borderRadius: 9999;
            flexDirection: "row";
            alignItems: "center";
            justifyContent: "center";
            gap: 4;
        };
        size: {
            sm: {
                height: number;
                paddingHorizontal: 8;
                fontSize: 11;
            };
            md: {
                height: number;
                paddingHorizontal: 12;
                fontSize: 13;
            };
            lg: {
                height: number;
                paddingHorizontal: 16;
                fontSize: 15;
            };
        };
        variant: {
            solid: {
                bg: string;
                text: string;
                border: string;
            };
            outlined: {
                bg: string;
                text: string;
                border: string;
            };
            subtle: {
                bg: string;
                text: string;
                border: string;
            };
            accent: {
                bg: string;
                text: string;
                border: string;
            };
        };
        deleteIcon: {
            color: string;
            size: number;
        };
    };
    readonly fab: {
        container: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
            alignItems: "center";
            justifyContent: "center";
        };
        size: {
            sm: {
                width: number;
                height: number;
                borderRadius: number;
            };
            md: {
                width: number;
                height: number;
                borderRadius: number;
            };
            lg: {
                width: number;
                height: number;
                borderRadius: number;
            };
        };
        color: {
            primary: {
                bg: string;
                text: string;
            };
            secondary: {
                bg: string;
                text: string;
            };
        };
    };
    readonly dialog: {
        container: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
            backgroundColor: string;
            borderRadius: 16;
            padding: 24;
        };
        title: {
            fontSize: 20;
            fontWeight: "600";
            color: string;
            marginBottom: 8;
        };
        content: {
            fontSize: 15;
            color: string;
            lineHeight: number;
        };
        actions: {
            marginTop: 24;
            flexDirection: "row";
            justifyContent: "flex-end";
            gap: 8;
        };
    };
    readonly tabs: {
        readonly indicator: {
            readonly bg: string;
            readonly height: 2;
        };
        readonly tab: {
            readonly active: {
                readonly color: string;
                readonly fontWeight: "600";
            };
            readonly inactive: {
                readonly color: string;
            };
            readonly hover: {
                readonly bg: string;
            };
        };
        readonly container: {
            readonly borderBottomColor: string;
        };
    };
    readonly select: {
        readonly trigger: {
            readonly bg: string;
            readonly borderColor: string;
            readonly focusBorderColor: string;
            readonly borderRadius: 8;
            readonly padding: {
                readonly x: 12;
                readonly y: 8;
            };
        };
        readonly menu: {
            readonly bg: string;
            readonly borderColor: string;
            readonly borderRadius: 8;
            readonly shadow: {
                shadowColor: string;
                shadowOffset: {
                    width: number;
                    height: number;
                };
                shadowOpacity: number;
                shadowRadius: number;
                elevation: number;
            };
        };
        readonly option: {
            readonly selected: {
                readonly bg: string;
                readonly color: string;
            };
            readonly hover: {
                readonly bg: string;
            };
            readonly default: {
                readonly color: string;
            };
        };
    };
    readonly rating: {
        readonly star: {
            readonly filled: {
                readonly color: "#F59E0B";
            };
            readonly empty: {
                readonly color: string;
            };
            readonly half: {
                readonly color: "#F59E0B";
            };
        };
        readonly size: {
            readonly sm: 16;
            readonly md: 20;
            readonly lg: 28;
        };
    };
    readonly pagination: {
        readonly item: {
            readonly active: {
                readonly bg: string;
                readonly color: "#fff";
                readonly borderColor: string;
            };
            readonly default: {
                readonly bg: "transparent";
                readonly color: string;
                readonly borderColor: string;
            };
            readonly hover: {
                readonly bg: string;
            };
            readonly disabled: {
                readonly color: string;
                readonly borderColor: string;
            };
        };
        readonly size: {
            readonly sm: 28;
            readonly md: 36;
            readonly lg: 44;
        };
        readonly gap: 4;
    };
    readonly timeline: {
        readonly connector: {
            readonly color: string;
            readonly width: 2;
        };
        readonly dot: {
            readonly completed: {
                readonly bg: string;
                readonly borderColor: string;
            };
            readonly active: {
                readonly bg: string;
                readonly borderColor: string;
            };
            readonly pending: {
                readonly bg: string;
                readonly borderColor: string;
            };
            readonly size: 12;
        };
        readonly content: {
            readonly gap: 8;
        };
    };
};
export type ComponentTokens = ReturnType<typeof resolveComponentTokens>;
export declare function tabsTokens(t: SemanticTokens): {
    readonly indicator: {
        readonly bg: string;
        readonly height: 2;
    };
    readonly tab: {
        readonly active: {
            readonly color: string;
            readonly fontWeight: "600";
        };
        readonly inactive: {
            readonly color: string;
        };
        readonly hover: {
            readonly bg: string;
        };
    };
    readonly container: {
        readonly borderBottomColor: string;
    };
};
export declare function selectTokens(t: SemanticTokens): {
    readonly trigger: {
        readonly bg: string;
        readonly borderColor: string;
        readonly focusBorderColor: string;
        readonly borderRadius: 8;
        readonly padding: {
            readonly x: 12;
            readonly y: 8;
        };
    };
    readonly menu: {
        readonly bg: string;
        readonly borderColor: string;
        readonly borderRadius: 8;
        readonly shadow: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
    };
    readonly option: {
        readonly selected: {
            readonly bg: string;
            readonly color: string;
        };
        readonly hover: {
            readonly bg: string;
        };
        readonly default: {
            readonly color: string;
        };
    };
};
export declare function ratingTokens(t: SemanticTokens): {
    readonly star: {
        readonly filled: {
            readonly color: "#F59E0B";
        };
        readonly empty: {
            readonly color: string;
        };
        readonly half: {
            readonly color: "#F59E0B";
        };
    };
    readonly size: {
        readonly sm: 16;
        readonly md: 20;
        readonly lg: 28;
    };
};
export declare function paginationTokens(t: SemanticTokens): {
    readonly item: {
        readonly active: {
            readonly bg: string;
            readonly color: "#fff";
            readonly borderColor: string;
        };
        readonly default: {
            readonly bg: "transparent";
            readonly color: string;
            readonly borderColor: string;
        };
        readonly hover: {
            readonly bg: string;
        };
        readonly disabled: {
            readonly color: string;
            readonly borderColor: string;
        };
    };
    readonly size: {
        readonly sm: 28;
        readonly md: 36;
        readonly lg: 44;
    };
    readonly gap: 4;
};
export declare function timelineTokens(t: SemanticTokens): {
    readonly connector: {
        readonly color: string;
        readonly width: 2;
    };
    readonly dot: {
        readonly completed: {
            readonly bg: string;
            readonly borderColor: string;
        };
        readonly active: {
            readonly bg: string;
            readonly borderColor: string;
        };
        readonly pending: {
            readonly bg: string;
            readonly borderColor: string;
        };
        readonly size: 12;
    };
    readonly content: {
        readonly gap: 8;
    };
};
//# sourceMappingURL=component.d.ts.map