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
export declare function accordionTokens(t: SemanticTokens): {
    readonly container: {
        readonly borderWidth: 1;
        readonly borderColor: string;
        readonly borderRadius: 8;
        readonly backgroundColor: string;
    };
    readonly summary: {
        readonly paddingHorizontal: 16;
        readonly paddingVertical: 12;
        readonly backgroundColor: string;
        readonly gap: 8;
    };
    readonly details: {
        readonly paddingHorizontal: 16;
        readonly paddingVertical: 12;
        readonly backgroundColor: string;
    };
    readonly title: {
        readonly fontSize: 15;
        readonly fontWeight: "500";
        readonly color: string;
    };
    readonly icon: {
        readonly color: string;
        readonly size: 16;
    };
};
export declare function alertTokens(t: SemanticTokens): {
    readonly container: {
        readonly padding: 16;
        readonly borderRadius: 8;
        readonly borderWidth: 1;
        readonly flexDirection: "row";
        readonly gap: 12;
    };
    readonly variant: {
        readonly info: {
            readonly bg: string;
            readonly border: string;
            readonly text: string;
            readonly icon: string;
        };
        readonly success: {
            readonly bg: string;
            readonly border: string;
            readonly text: string;
            readonly icon: string;
        };
        readonly warning: {
            readonly bg: string;
            readonly border: string;
            readonly text: string;
            readonly icon: string;
        };
        readonly error: {
            readonly bg: string;
            readonly border: string;
            readonly text: string;
            readonly icon: string;
        };
    };
    readonly title: {
        readonly fontSize: 15;
        readonly fontWeight: "600";
        readonly marginBottom: 2;
    };
    readonly message: {
        readonly fontSize: 13;
        readonly lineHeight: number;
    };
};
export declare function carouselTokens(t: SemanticTokens): {
    readonly dot: {
        readonly active: {
            readonly bg: string;
            readonly width: 20;
        };
        readonly inactive: {
            readonly bg: string;
            readonly width: 8;
            readonly opacity: 0.3;
        };
        readonly height: 8;
        readonly borderRadius: 4;
    };
    readonly pagination: {
        readonly marginTop: 16;
        readonly gap: 6;
    };
};
export declare function animatedListTokens(t: SemanticTokens): {
    readonly container: {
        readonly flex: 1;
    };
    readonly item: {
        readonly paddingVertical: 8;
    };
};
export declare function appBarTokens(t: SemanticTokens): {
    readonly container: {
        readonly zIndex: 200;
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly height: 64;
        readonly backgroundColor: string;
        readonly paddingHorizontal: 16;
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly justifyContent: "space-between";
    };
    readonly title: {
        readonly fontSize: 17;
        readonly fontWeight: "600";
        readonly color: string;
    };
};
export declare function autocompleteTokens(t: SemanticTokens): {
    readonly container: {
        readonly width: "100%";
    };
    readonly menu: {
        readonly marginTop: 4;
        readonly maxHeight: 250;
        readonly borderWidth: 1;
        readonly borderColor: string;
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderRadius: 8;
    };
    readonly item: {
        readonly padding: 12;
        readonly hover: {
            readonly backgroundColor: string;
        };
        readonly active: {
            readonly backgroundColor: string;
        };
    };
};
export declare function bottomNavigationTokens(t: SemanticTokens): {
    readonly container: {
        readonly height: 56;
        readonly backgroundColor: string;
        readonly flexDirection: "row";
        readonly borderTopWidth: 1;
        readonly borderTopColor: string;
        readonly paddingBottom: 8;
    };
    readonly item: {
        readonly flex: 1;
        readonly alignItems: "center";
        readonly justifyContent: "center";
        readonly active: {
            readonly color: string;
        };
        readonly inactive: {
            readonly color: string;
        };
    };
    readonly label: {
        readonly fontSize: 11;
        readonly marginTop: 4;
    };
};
export declare function bottomSheetTokens(t: SemanticTokens): {
    readonly container: {
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderTopLeftRadius: 16;
        readonly borderTopRightRadius: 16;
    };
    readonly handle: {
        readonly width: 40;
        readonly height: 4;
        readonly borderRadius: 2;
        readonly backgroundColor: string;
        readonly alignSelf: "center";
        readonly marginVertical: 12;
    };
    readonly backdrop: {
        readonly backgroundColor: string;
    };
};
export declare function boxTokens(t: SemanticTokens): {
    readonly defaults: {
        readonly backgroundColor: "transparent";
    };
};
export declare function breadcrumbsTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 8;
    };
    readonly separator: {
        readonly color: string;
        readonly fontSize: 13;
    };
    readonly item: {
        readonly fontSize: 13;
        readonly color: string;
        readonly active: {
            readonly color: string;
            readonly fontWeight: "500";
        };
    };
};
export declare function buttonGroupTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly borderRadius: 8;
        readonly overflow: "hidden";
        readonly borderWidth: 1;
        readonly borderColor: string;
    };
    readonly divider: {
        readonly width: 1;
        readonly backgroundColor: string;
    };
};
export declare function circularProgressTokens(t: SemanticTokens): {
    readonly color: string;
    readonly trackColor: string;
    readonly size: {
        readonly sm: 24;
        readonly md: 40;
        readonly lg: 56;
    };
    readonly thickness: {
        readonly sm: 2;
        readonly md: 4;
        readonly lg: 6;
    };
};
export declare function datePickerTokens(t: SemanticTokens): {
    readonly container: {
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderRadius: 12;
        readonly padding: 16;
    };
    readonly header: {
        readonly flexDirection: "row";
        readonly justifyContent: "space-between";
        readonly alignItems: "center";
        readonly marginBottom: 16;
    };
    readonly day: {
        readonly width: 40;
        readonly height: 40;
        readonly alignItems: "center";
        readonly justifyContent: "center";
        readonly borderRadius: 9999;
        readonly selected: {
            readonly backgroundColor: string;
            readonly color: string;
        };
        readonly today: {
            readonly borderColor: string;
            readonly borderWidth: 1;
        };
        readonly outside: {
            readonly color: string;
        };
    };
};
export declare function dividerTokens(t: SemanticTokens): {
    readonly color: string;
    readonly thickness: 1;
    readonly margin: 16;
};
export declare function drawerTokens(t: SemanticTokens): {
    readonly container: {
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly width: 280;
        readonly height: "100%";
    };
    readonly overlay: {
        readonly backgroundColor: string;
    };
};
export declare function emptyStateTokens(t: SemanticTokens): {
    readonly container: {
        readonly padding: 32;
        readonly alignItems: "center";
        readonly justifyContent: "center";
        readonly gap: 16;
    };
    readonly icon: {
        readonly size: 64;
        readonly color: string;
    };
    readonly title: {
        readonly fontSize: 20;
        readonly fontWeight: "600";
        readonly color: string;
        readonly textAlign: "center";
    };
    readonly description: {
        readonly fontSize: 15;
        readonly color: string;
        readonly textAlign: "center";
    };
};
export declare function formControlTokens(t: SemanticTokens): {
    readonly container: {
        readonly width: "100%";
        readonly gap: 6;
    };
    readonly label: {
        readonly fontSize: 13;
        readonly fontWeight: "500";
        readonly color: string;
    };
    readonly helperText: {
        readonly fontSize: 11;
        readonly color: string;
    };
    readonly errorText: {
        readonly fontSize: 11;
        readonly color: string;
    };
};
export declare function formFieldTokens(t: SemanticTokens): {
    readonly container: {
        readonly marginBottom: 16;
    };
};
export declare function gridTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly flexWrap: "wrap";
    };
    readonly gap: {
        readonly sm: 8;
        readonly md: 16;
        readonly lg: 24;
    };
};
export declare function iconTokens(t: SemanticTokens): {
    readonly size: {
        readonly xs: 12;
        readonly sm: 16;
        readonly md: 20;
        readonly lg: 24;
        readonly xl: 32;
        readonly "2xl": 48;
        readonly small: 16;
        readonly medium: 20;
        readonly large: 24;
    };
    readonly color: {
        readonly primary: string;
        readonly secondary: string;
        readonly brand: string;
        readonly error: string;
        readonly success: string;
        readonly warning: string;
        readonly info: string;
    };
};
export declare function imageTokens(t: SemanticTokens): {
    readonly borderRadius: 8;
    readonly placeholder: {
        readonly backgroundColor: string;
    };
};
export declare function imageListTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly flexWrap: "wrap";
        readonly gap: 4;
    };
    readonly item: {
        readonly borderRadius: 4;
        readonly overflow: "hidden";
    };
};
export declare function linearProgressTokens(t: SemanticTokens): {
    readonly track: {
        readonly height: 4;
        readonly backgroundColor: string;
        readonly borderRadius: 9999;
        readonly overflow: "hidden";
    };
    readonly indicator: {
        readonly height: "100%";
        readonly backgroundColor: string;
    };
    readonly variant: {
        readonly brand: {
            readonly indicator: {
                readonly backgroundColor: string;
            };
        };
        readonly accent: {
            readonly indicator: {
                readonly backgroundColor: string;
            };
        };
        readonly success: {
            readonly indicator: {
                readonly backgroundColor: string;
            };
        };
        readonly error: {
            readonly indicator: {
                readonly backgroundColor: string;
            };
        };
    };
};
export declare function linkTokens(t: SemanticTokens): {
    readonly text: {
        readonly color: string;
        readonly fontSize: 15;
        readonly textDecorationLine: "none";
    };
    readonly hover: {
        readonly textDecorationLine: "underline";
    };
    readonly pressed: {
        readonly opacity: 0.7;
    };
};
export declare function listTokens(t: SemanticTokens): {
    readonly container: {
        readonly backgroundColor: string;
    };
    readonly item: {
        readonly padding: 16;
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 12;
        readonly pressed: {
            readonly backgroundColor: string;
        };
    };
    readonly itemText: {
        readonly fontSize: 15;
        readonly color: string;
    };
    readonly subheader: {
        readonly paddingHorizontal: 16;
        readonly paddingVertical: 8;
        readonly fontSize: 13;
        readonly fontWeight: "600";
        readonly color: string;
    };
};
export declare function menuTokens(t: SemanticTokens): {
    readonly container: {
        readonly borderWidth: 1;
        readonly borderColor: string;
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderRadius: 8;
        readonly padding: 4;
        readonly minWidth: 160;
    };
    readonly item: {
        readonly paddingHorizontal: 12;
        readonly paddingVertical: 8;
        readonly borderRadius: 4;
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 8;
        readonly pressed: {
            readonly backgroundColor: string;
        };
    };
    readonly itemText: {
        readonly fontSize: 13;
        readonly color: string;
    };
};
export declare function modalTokens(t: SemanticTokens): {
    readonly overlay: {
        readonly backgroundColor: string;
        readonly flex: 1;
        readonly justifyContent: "center";
        readonly alignItems: "center";
        readonly padding: 16;
    };
    readonly container: {
        readonly overflow: "hidden";
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderRadius: 16;
        readonly width: "100%";
        readonly maxWidth: 500;
    };
};
export declare function otpInputTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly gap: 8;
        readonly justifyContent: "center";
    };
    readonly cell: {
        readonly width: 48;
        readonly height: 56;
        readonly borderWidth: 1.5;
        readonly borderColor: string;
        readonly borderRadius: 8;
        readonly backgroundColor: string;
        readonly alignItems: "center";
        readonly justifyContent: "center";
        readonly fontSize: 20;
        readonly fontWeight: "600";
        readonly color: string;
        readonly focused: {
            readonly borderColor: string;
        };
        readonly error: {
            readonly borderColor: string;
        };
    };
};
export declare function paperTokens(t: SemanticTokens): {
    readonly container: {
        readonly backgroundColor: string;
        readonly borderRadius: 8;
        readonly borderWidth: 0;
        readonly borderColor: string;
    };
    readonly elevation: {
        readonly none: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
        };
        readonly sm: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
        };
        readonly md: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
        };
        readonly lg: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
        };
    };
    readonly variant: {
        readonly outlined: {
            readonly borderWidth: 1;
        };
        readonly flat: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly borderWidth: 0;
        };
    };
};
export declare function popoverTokens(t: SemanticTokens): {
    readonly container: {
        readonly borderWidth: 1;
        readonly borderColor: string;
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderRadius: 8;
        readonly padding: 16;
    };
    readonly arrow: {
        readonly backgroundColor: string;
    };
};
export declare function popperTokens(t: SemanticTokens): {
    readonly container: {
        readonly zIndex: 100;
    };
};
export declare function pressableTokens(t: SemanticTokens): {
    readonly container: {
        readonly opacity: 0.7;
        readonly backgroundColor: "transparent";
    };
    readonly opacity: 0.7;
    readonly backgroundColor: "transparent";
    readonly hover: {
        readonly backgroundColor: string;
    };
};
export declare function segmentedControlTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly backgroundColor: string;
        readonly borderRadius: 12;
        readonly padding: 2;
    };
    readonly item: {
        readonly flex: 1;
        readonly paddingVertical: 6;
        readonly alignItems: "center";
        readonly justifyContent: "center";
        readonly borderRadius: 8;
        readonly active: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
        };
        readonly text: {
            readonly fontSize: 13;
            readonly fontWeight: "500";
            readonly color: string;
        };
        readonly activeText: {
            readonly color: string;
        };
    };
};
export declare function skeletonTokens(t: SemanticTokens): {
    readonly backgroundColor: string;
    readonly borderRadius: 4;
    readonly opacity: {
        readonly start: 0.3;
        readonly end: 0.6;
    };
};
export declare function snackbarTokens(t: SemanticTokens): {
    readonly container: {
        readonly minWidth: 280;
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly borderRadius: 8;
        readonly paddingHorizontal: 16;
        readonly paddingVertical: 12;
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly justifyContent: "space-between";
    };
    readonly text: {
        readonly color: string;
        readonly fontSize: 13;
    };
    readonly action: {
        readonly color: string;
        readonly fontWeight: "700";
        readonly marginLeft: 16;
    };
};
export declare function speedDialTokens(t: SemanticTokens): {
    readonly container: {
        readonly alignItems: "center";
        readonly gap: 12;
    };
    readonly action: {
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly width: 40;
        readonly height: 40;
        readonly borderRadius: 20;
        readonly backgroundColor: string;
        readonly alignItems: "center";
        readonly justifyContent: "center";
    };
};
export declare function stackTokens(t: SemanticTokens): {
    readonly gap: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 16;
        readonly lg: 24;
        readonly xl: 32;
    };
};
export declare function stepperTokens(t: SemanticTokens): {
    readonly container: {
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 16;
    };
    readonly step: {
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 8;
        readonly active: {
            readonly color: string;
        };
        readonly completed: {
            readonly color: string;
        };
        readonly pending: {
            readonly color: string;
        };
    };
    readonly line: {
        readonly flex: 1;
        readonly height: 2;
        readonly backgroundColor: string;
        readonly active: {
            readonly backgroundColor: string;
        };
    };
};
export declare function tableTokens(t: SemanticTokens): {
    readonly container: {
        readonly width: "100%";
        readonly borderWidth: 1;
        readonly borderColor: string;
        readonly borderRadius: 8;
        readonly overflow: "hidden";
    };
    readonly header: {
        readonly backgroundColor: string;
        readonly borderBottomWidth: 1;
        readonly borderBottomColor: string;
    };
    readonly row: {
        readonly flexDirection: "row";
        readonly borderBottomWidth: 1;
        readonly borderBottomColor: string;
        readonly hover: {
            readonly backgroundColor: string;
        };
    };
    readonly cell: {
        readonly padding: 12;
        readonly fontSize: 13;
        readonly color: string;
    };
};
export declare function textAreaTokens(t: SemanticTokens): {
    readonly container: {
        readonly height: "auto";
        readonly minHeight: 100;
        readonly paddingVertical: 8;
        readonly textAlignVertical: "top";
        readonly borderWidth: number;
        readonly borderColor: string;
        readonly borderRadius: 8;
        readonly backgroundColor: string;
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly paddingHorizontal: 12;
        readonly gap: 8;
    };
    readonly hover: {
        borderColor: string;
    };
    readonly disabled: {
        backgroundColor: string;
        borderColor: string;
        opacity: 0.5;
    };
    readonly size: {
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
    readonly focusRing: {
        borderColor: string;
        borderWidth: number;
        outlineOffset: 2;
    };
    readonly state: {
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
    readonly text: {
        color: string;
        placeholderColor: string;
    };
    readonly label: {
        fontSize: 13;
        fontWeight: "500";
        color: string;
        marginBottom: 4;
    };
    readonly helperText: {
        fontSize: 11;
        color: string;
        marginTop: 4;
    };
    readonly errorText: {
        fontSize: 11;
        color: string;
        marginTop: 4;
    };
};
export declare function textFieldTokens(t: SemanticTokens): {
    readonly container: {
        readonly borderWidth: number;
        readonly borderColor: string;
        readonly borderRadius: 8;
        readonly backgroundColor: string;
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly paddingHorizontal: 12;
        readonly gap: 8;
    };
    readonly hover: {
        borderColor: string;
    };
    readonly disabled: {
        backgroundColor: string;
        borderColor: string;
        opacity: 0.5;
    };
    readonly size: {
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
    readonly focusRing: {
        borderColor: string;
        borderWidth: number;
        outlineOffset: 2;
    };
    readonly state: {
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
    readonly text: {
        color: string;
        placeholderColor: string;
    };
    readonly label: {
        fontSize: 13;
        fontWeight: "500";
        color: string;
        marginBottom: 4;
    };
    readonly helperText: {
        fontSize: 11;
        color: string;
        marginTop: 4;
    };
    readonly errorText: {
        fontSize: 11;
        color: string;
        marginTop: 4;
    };
};
export declare function toggleButtonTokens(t: SemanticTokens): {
    readonly container: {
        readonly padding: 8;
        readonly borderRadius: 8;
        readonly borderWidth: 1;
        readonly borderColor: string;
        readonly backgroundColor: string;
        readonly alignItems: "center";
        readonly justifyContent: "center";
        readonly selected: {
            readonly backgroundColor: string;
            readonly borderColor: string;
        };
    };
    readonly size: {
        readonly sm: {
            readonly height: 32;
            readonly paddingHorizontal: 12;
            readonly fontSize: 13;
        };
        readonly md: {
            readonly height: 40;
            readonly paddingHorizontal: 16;
            readonly fontSize: 15;
        };
        readonly lg: {
            readonly height: 48;
            readonly paddingHorizontal: 20;
            readonly fontSize: 17;
        };
    };
    readonly icon: {
        readonly color: string;
        readonly selected: {
            readonly color: string;
        };
    };
};
export declare function tooltipTokens(t: SemanticTokens): {
    readonly container: {
        readonly shadowColor: string;
        readonly shadowOffset: {
            width: number;
            height: number;
        };
        readonly shadowOpacity: number;
        readonly shadowRadius: number;
        readonly elevation: number;
        readonly backgroundColor: string;
        readonly paddingHorizontal: 8;
        readonly paddingVertical: 4;
        readonly borderRadius: 2;
    };
    readonly text: {
        readonly color: string;
        readonly fontSize: 11;
    };
};
export declare function typographyTokens(t: SemanticTokens): {
    readonly variants: {
        readonly h1: {
            readonly fontSize: 36;
            readonly fontWeight: "600";
            readonly lineHeight: number;
        };
        readonly h2: {
            readonly fontSize: 30;
            readonly fontWeight: "600";
            readonly lineHeight: number;
        };
        readonly h3: {
            readonly fontSize: 24;
            readonly fontWeight: "600";
            readonly lineHeight: number;
        };
        readonly h4: {
            readonly fontSize: 20;
            readonly fontWeight: "600";
            readonly lineHeight: number;
        };
        readonly h5: {
            readonly fontSize: 17;
            readonly fontWeight: "500";
            readonly lineHeight: number;
        };
        readonly h6: {
            readonly fontSize: 15;
            readonly fontWeight: "500";
            readonly lineHeight: number;
        };
        readonly subtitle1: {
            readonly fontSize: 15;
            readonly fontWeight: "500";
            readonly lineHeight: number;
        };
        readonly subtitle2: {
            readonly fontSize: 13;
            readonly fontWeight: "500";
            readonly lineHeight: number;
        };
        readonly body1: {
            readonly fontSize: 15;
            readonly fontWeight: "400";
            readonly lineHeight: number;
        };
        readonly body2: {
            readonly fontSize: 13;
            readonly fontWeight: "400";
            readonly lineHeight: number;
        };
        readonly caption: {
            readonly fontSize: 11;
            readonly fontWeight: "400";
            readonly lineHeight: number;
        };
        readonly button: {
            readonly fontSize: 13;
            readonly fontWeight: "600";
            readonly textTransform: "uppercase";
        };
        readonly overline: {
            readonly fontSize: 11;
            readonly fontWeight: "600";
            readonly letterSpacing: 1.2;
            readonly textTransform: "uppercase";
        };
    };
    readonly colors: {
        readonly primary: string;
        readonly secondary: string;
        readonly tertiary: string;
        readonly disabled: string;
        readonly brand: string;
        readonly error: string;
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
        readonly container: {
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 4;
        };
        /** Tighter row for `compact` Rating — same flex as `container`, smaller gap */
        readonly containerCompact: {
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 2;
        };
        readonly star: {
            readonly filled: {
                readonly color: string;
            };
            readonly empty: {
                readonly color: string;
            };
            readonly half: {
                readonly color: string;
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
    readonly accordion: {
        readonly container: {
            readonly borderWidth: 1;
            readonly borderColor: string;
            readonly borderRadius: 8;
            readonly backgroundColor: string;
        };
        readonly summary: {
            readonly paddingHorizontal: 16;
            readonly paddingVertical: 12;
            readonly backgroundColor: string;
            readonly gap: 8;
        };
        readonly details: {
            readonly paddingHorizontal: 16;
            readonly paddingVertical: 12;
            readonly backgroundColor: string;
        };
        readonly title: {
            readonly fontSize: 15;
            readonly fontWeight: "500";
            readonly color: string;
        };
        readonly icon: {
            readonly color: string;
            readonly size: 16;
        };
    };
    readonly alert: {
        readonly container: {
            readonly padding: 16;
            readonly borderRadius: 8;
            readonly borderWidth: 1;
            readonly flexDirection: "row";
            readonly gap: 12;
        };
        readonly variant: {
            readonly info: {
                readonly bg: string;
                readonly border: string;
                readonly text: string;
                readonly icon: string;
            };
            readonly success: {
                readonly bg: string;
                readonly border: string;
                readonly text: string;
                readonly icon: string;
            };
            readonly warning: {
                readonly bg: string;
                readonly border: string;
                readonly text: string;
                readonly icon: string;
            };
            readonly error: {
                readonly bg: string;
                readonly border: string;
                readonly text: string;
                readonly icon: string;
            };
        };
        readonly title: {
            readonly fontSize: 15;
            readonly fontWeight: "600";
            readonly marginBottom: 2;
        };
        readonly message: {
            readonly fontSize: 13;
            readonly lineHeight: number;
        };
    };
    readonly carousel: {
        readonly dot: {
            readonly active: {
                readonly bg: string;
                readonly width: 20;
            };
            readonly inactive: {
                readonly bg: string;
                readonly width: 8;
                readonly opacity: 0.3;
            };
            readonly height: 8;
            readonly borderRadius: 4;
        };
        readonly pagination: {
            readonly marginTop: 16;
            readonly gap: 6;
        };
    };
    readonly animatedList: {
        readonly container: {
            readonly flex: 1;
        };
        readonly item: {
            readonly paddingVertical: 8;
        };
    };
    readonly appBar: {
        readonly container: {
            readonly zIndex: 200;
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly height: 64;
            readonly backgroundColor: string;
            readonly paddingHorizontal: 16;
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly justifyContent: "space-between";
        };
        readonly title: {
            readonly fontSize: 17;
            readonly fontWeight: "600";
            readonly color: string;
        };
    };
    readonly autocomplete: {
        readonly container: {
            readonly width: "100%";
        };
        readonly menu: {
            readonly marginTop: 4;
            readonly maxHeight: 250;
            readonly borderWidth: 1;
            readonly borderColor: string;
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderRadius: 8;
        };
        readonly item: {
            readonly padding: 12;
            readonly hover: {
                readonly backgroundColor: string;
            };
            readonly active: {
                readonly backgroundColor: string;
            };
        };
    };
    readonly bottomNavigation: {
        readonly container: {
            readonly height: 56;
            readonly backgroundColor: string;
            readonly flexDirection: "row";
            readonly borderTopWidth: 1;
            readonly borderTopColor: string;
            readonly paddingBottom: 8;
        };
        readonly item: {
            readonly flex: 1;
            readonly alignItems: "center";
            readonly justifyContent: "center";
            readonly active: {
                readonly color: string;
            };
            readonly inactive: {
                readonly color: string;
            };
        };
        readonly label: {
            readonly fontSize: 11;
            readonly marginTop: 4;
        };
    };
    readonly bottomSheet: {
        readonly container: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderTopLeftRadius: 16;
            readonly borderTopRightRadius: 16;
        };
        readonly handle: {
            readonly width: 40;
            readonly height: 4;
            readonly borderRadius: 2;
            readonly backgroundColor: string;
            readonly alignSelf: "center";
            readonly marginVertical: 12;
        };
        readonly backdrop: {
            readonly backgroundColor: string;
        };
    };
    readonly box: {
        readonly defaults: {
            readonly backgroundColor: "transparent";
        };
    };
    readonly breadcrumbs: {
        readonly container: {
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 8;
        };
        readonly separator: {
            readonly color: string;
            readonly fontSize: 13;
        };
        readonly item: {
            readonly fontSize: 13;
            readonly color: string;
            readonly active: {
                readonly color: string;
                readonly fontWeight: "500";
            };
        };
    };
    readonly buttonGroup: {
        readonly container: {
            readonly flexDirection: "row";
            readonly borderRadius: 8;
            readonly overflow: "hidden";
            readonly borderWidth: 1;
            readonly borderColor: string;
        };
        readonly divider: {
            readonly width: 1;
            readonly backgroundColor: string;
        };
    };
    readonly circularProgress: {
        readonly color: string;
        readonly trackColor: string;
        readonly size: {
            readonly sm: 24;
            readonly md: 40;
            readonly lg: 56;
        };
        readonly thickness: {
            readonly sm: 2;
            readonly md: 4;
            readonly lg: 6;
        };
    };
    readonly datePicker: {
        readonly container: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderRadius: 12;
            readonly padding: 16;
        };
        readonly header: {
            readonly flexDirection: "row";
            readonly justifyContent: "space-between";
            readonly alignItems: "center";
            readonly marginBottom: 16;
        };
        readonly day: {
            readonly width: 40;
            readonly height: 40;
            readonly alignItems: "center";
            readonly justifyContent: "center";
            readonly borderRadius: 9999;
            readonly selected: {
                readonly backgroundColor: string;
                readonly color: string;
            };
            readonly today: {
                readonly borderColor: string;
                readonly borderWidth: 1;
            };
            readonly outside: {
                readonly color: string;
            };
        };
    };
    readonly divider: {
        readonly color: string;
        readonly thickness: 1;
        readonly margin: 16;
    };
    readonly drawer: {
        readonly container: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly width: 280;
            readonly height: "100%";
        };
        readonly overlay: {
            readonly backgroundColor: string;
        };
    };
    readonly emptyState: {
        readonly container: {
            readonly padding: 32;
            readonly alignItems: "center";
            readonly justifyContent: "center";
            readonly gap: 16;
        };
        readonly icon: {
            readonly size: 64;
            readonly color: string;
        };
        readonly title: {
            readonly fontSize: 20;
            readonly fontWeight: "600";
            readonly color: string;
            readonly textAlign: "center";
        };
        readonly description: {
            readonly fontSize: 15;
            readonly color: string;
            readonly textAlign: "center";
        };
    };
    readonly formControl: {
        readonly container: {
            readonly width: "100%";
            readonly gap: 6;
        };
        readonly label: {
            readonly fontSize: 13;
            readonly fontWeight: "500";
            readonly color: string;
        };
        readonly helperText: {
            readonly fontSize: 11;
            readonly color: string;
        };
        readonly errorText: {
            readonly fontSize: 11;
            readonly color: string;
        };
    };
    readonly formField: {
        readonly container: {
            readonly marginBottom: 16;
        };
    };
    readonly grid: {
        readonly container: {
            readonly flexDirection: "row";
            readonly flexWrap: "wrap";
        };
        readonly gap: {
            readonly sm: 8;
            readonly md: 16;
            readonly lg: 24;
        };
    };
    readonly icon: {
        readonly size: {
            readonly xs: 12;
            readonly sm: 16;
            readonly md: 20;
            readonly lg: 24;
            readonly xl: 32;
            readonly "2xl": 48;
            readonly small: 16;
            readonly medium: 20;
            readonly large: 24;
        };
        readonly color: {
            readonly primary: string;
            readonly secondary: string;
            readonly brand: string;
            readonly error: string;
            readonly success: string;
            readonly warning: string;
            readonly info: string;
        };
    };
    readonly image: {
        readonly borderRadius: 8;
        readonly placeholder: {
            readonly backgroundColor: string;
        };
    };
    readonly imageList: {
        readonly container: {
            readonly flexDirection: "row";
            readonly flexWrap: "wrap";
            readonly gap: 4;
        };
        readonly item: {
            readonly borderRadius: 4;
            readonly overflow: "hidden";
        };
    };
    readonly linearProgress: {
        readonly track: {
            readonly height: 4;
            readonly backgroundColor: string;
            readonly borderRadius: 9999;
            readonly overflow: "hidden";
        };
        readonly indicator: {
            readonly height: "100%";
            readonly backgroundColor: string;
        };
        readonly variant: {
            readonly brand: {
                readonly indicator: {
                    readonly backgroundColor: string;
                };
            };
            readonly accent: {
                readonly indicator: {
                    readonly backgroundColor: string;
                };
            };
            readonly success: {
                readonly indicator: {
                    readonly backgroundColor: string;
                };
            };
            readonly error: {
                readonly indicator: {
                    readonly backgroundColor: string;
                };
            };
        };
    };
    readonly link: {
        readonly text: {
            readonly color: string;
            readonly fontSize: 15;
            readonly textDecorationLine: "none";
        };
        readonly hover: {
            readonly textDecorationLine: "underline";
        };
        readonly pressed: {
            readonly opacity: 0.7;
        };
    };
    readonly list: {
        readonly container: {
            readonly backgroundColor: string;
        };
        readonly item: {
            readonly padding: 16;
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 12;
            readonly pressed: {
                readonly backgroundColor: string;
            };
        };
        readonly itemText: {
            readonly fontSize: 15;
            readonly color: string;
        };
        readonly subheader: {
            readonly paddingHorizontal: 16;
            readonly paddingVertical: 8;
            readonly fontSize: 13;
            readonly fontWeight: "600";
            readonly color: string;
        };
    };
    readonly menu: {
        readonly container: {
            readonly borderWidth: 1;
            readonly borderColor: string;
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderRadius: 8;
            readonly padding: 4;
            readonly minWidth: 160;
        };
        readonly item: {
            readonly paddingHorizontal: 12;
            readonly paddingVertical: 8;
            readonly borderRadius: 4;
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 8;
            readonly pressed: {
                readonly backgroundColor: string;
            };
        };
        readonly itemText: {
            readonly fontSize: 13;
            readonly color: string;
        };
    };
    readonly modal: {
        readonly overlay: {
            readonly backgroundColor: string;
            readonly flex: 1;
            readonly justifyContent: "center";
            readonly alignItems: "center";
            readonly padding: 16;
        };
        readonly container: {
            readonly overflow: "hidden";
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderRadius: 16;
            readonly width: "100%";
            readonly maxWidth: 500;
        };
    };
    readonly otpInput: {
        readonly container: {
            readonly flexDirection: "row";
            readonly gap: 8;
            readonly justifyContent: "center";
        };
        readonly cell: {
            readonly width: 48;
            readonly height: 56;
            readonly borderWidth: 1.5;
            readonly borderColor: string;
            readonly borderRadius: 8;
            readonly backgroundColor: string;
            readonly alignItems: "center";
            readonly justifyContent: "center";
            readonly fontSize: 20;
            readonly fontWeight: "600";
            readonly color: string;
            readonly focused: {
                readonly borderColor: string;
            };
            readonly error: {
                readonly borderColor: string;
            };
        };
    };
    readonly paper: {
        readonly container: {
            readonly backgroundColor: string;
            readonly borderRadius: 8;
            readonly borderWidth: 0;
            readonly borderColor: string;
        };
        readonly elevation: {
            readonly none: {
                readonly shadowColor: string;
                readonly shadowOffset: {
                    width: number;
                    height: number;
                };
                readonly shadowOpacity: number;
                readonly shadowRadius: number;
                readonly elevation: number;
            };
            readonly sm: {
                readonly shadowColor: string;
                readonly shadowOffset: {
                    width: number;
                    height: number;
                };
                readonly shadowOpacity: number;
                readonly shadowRadius: number;
                readonly elevation: number;
            };
            readonly md: {
                readonly shadowColor: string;
                readonly shadowOffset: {
                    width: number;
                    height: number;
                };
                readonly shadowOpacity: number;
                readonly shadowRadius: number;
                readonly elevation: number;
            };
            readonly lg: {
                readonly shadowColor: string;
                readonly shadowOffset: {
                    width: number;
                    height: number;
                };
                readonly shadowOpacity: number;
                readonly shadowRadius: number;
                readonly elevation: number;
            };
        };
        readonly variant: {
            readonly outlined: {
                readonly borderWidth: 1;
            };
            readonly flat: {
                readonly shadowColor: string;
                readonly shadowOffset: {
                    width: number;
                    height: number;
                };
                readonly shadowOpacity: number;
                readonly shadowRadius: number;
                readonly elevation: number;
                readonly borderWidth: 0;
            };
        };
    };
    readonly popover: {
        readonly container: {
            readonly borderWidth: 1;
            readonly borderColor: string;
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderRadius: 8;
            readonly padding: 16;
        };
        readonly arrow: {
            readonly backgroundColor: string;
        };
    };
    readonly popper: {
        readonly container: {
            readonly zIndex: 100;
        };
    };
    readonly pressable: {
        readonly container: {
            readonly opacity: 0.7;
            readonly backgroundColor: "transparent";
        };
        readonly opacity: 0.7;
        readonly backgroundColor: "transparent";
        readonly hover: {
            readonly backgroundColor: string;
        };
    };
    readonly segmentedControl: {
        readonly container: {
            readonly flexDirection: "row";
            readonly backgroundColor: string;
            readonly borderRadius: 12;
            readonly padding: 2;
        };
        readonly item: {
            readonly flex: 1;
            readonly paddingVertical: 6;
            readonly alignItems: "center";
            readonly justifyContent: "center";
            readonly borderRadius: 8;
            readonly active: {
                readonly shadowColor: string;
                readonly shadowOffset: {
                    width: number;
                    height: number;
                };
                readonly shadowOpacity: number;
                readonly shadowRadius: number;
                readonly elevation: number;
                readonly backgroundColor: string;
            };
            readonly text: {
                readonly fontSize: 13;
                readonly fontWeight: "500";
                readonly color: string;
            };
            readonly activeText: {
                readonly color: string;
            };
        };
    };
    readonly skeleton: {
        readonly backgroundColor: string;
        readonly borderRadius: 4;
        readonly opacity: {
            readonly start: 0.3;
            readonly end: 0.6;
        };
    };
    readonly snackbar: {
        readonly container: {
            readonly minWidth: 280;
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly borderRadius: 8;
            readonly paddingHorizontal: 16;
            readonly paddingVertical: 12;
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly justifyContent: "space-between";
        };
        readonly text: {
            readonly color: string;
            readonly fontSize: 13;
        };
        readonly action: {
            readonly color: string;
            readonly fontWeight: "700";
            readonly marginLeft: 16;
        };
    };
    readonly speedDial: {
        readonly container: {
            readonly alignItems: "center";
            readonly gap: 12;
        };
        readonly action: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly width: 40;
            readonly height: 40;
            readonly borderRadius: 20;
            readonly backgroundColor: string;
            readonly alignItems: "center";
            readonly justifyContent: "center";
        };
    };
    readonly stack: {
        readonly gap: {
            readonly xs: 4;
            readonly sm: 8;
            readonly md: 16;
            readonly lg: 24;
            readonly xl: 32;
        };
    };
    readonly stepper: {
        readonly container: {
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 16;
        };
        readonly step: {
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly gap: 8;
            readonly active: {
                readonly color: string;
            };
            readonly completed: {
                readonly color: string;
            };
            readonly pending: {
                readonly color: string;
            };
        };
        readonly line: {
            readonly flex: 1;
            readonly height: 2;
            readonly backgroundColor: string;
            readonly active: {
                readonly backgroundColor: string;
            };
        };
    };
    readonly table: {
        readonly container: {
            readonly width: "100%";
            readonly borderWidth: 1;
            readonly borderColor: string;
            readonly borderRadius: 8;
            readonly overflow: "hidden";
        };
        readonly header: {
            readonly backgroundColor: string;
            readonly borderBottomWidth: 1;
            readonly borderBottomColor: string;
        };
        readonly row: {
            readonly flexDirection: "row";
            readonly borderBottomWidth: 1;
            readonly borderBottomColor: string;
            readonly hover: {
                readonly backgroundColor: string;
            };
        };
        readonly cell: {
            readonly padding: 12;
            readonly fontSize: 13;
            readonly color: string;
        };
    };
    readonly textArea: {
        readonly container: {
            readonly height: "auto";
            readonly minHeight: 100;
            readonly paddingVertical: 8;
            readonly textAlignVertical: "top";
            readonly borderWidth: number;
            readonly borderColor: string;
            readonly borderRadius: 8;
            readonly backgroundColor: string;
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly paddingHorizontal: 12;
            readonly gap: 8;
        };
        readonly hover: {
            borderColor: string;
        };
        readonly disabled: {
            backgroundColor: string;
            borderColor: string;
            opacity: 0.5;
        };
        readonly size: {
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
        readonly focusRing: {
            borderColor: string;
            borderWidth: number;
            outlineOffset: 2;
        };
        readonly state: {
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
        readonly text: {
            color: string;
            placeholderColor: string;
        };
        readonly label: {
            fontSize: 13;
            fontWeight: "500";
            color: string;
            marginBottom: 4;
        };
        readonly helperText: {
            fontSize: 11;
            color: string;
            marginTop: 4;
        };
        readonly errorText: {
            fontSize: 11;
            color: string;
            marginTop: 4;
        };
    };
    readonly textField: {
        readonly container: {
            readonly borderWidth: number;
            readonly borderColor: string;
            readonly borderRadius: 8;
            readonly backgroundColor: string;
            readonly flexDirection: "row";
            readonly alignItems: "center";
            readonly paddingHorizontal: 12;
            readonly gap: 8;
        };
        readonly hover: {
            borderColor: string;
        };
        readonly disabled: {
            backgroundColor: string;
            borderColor: string;
            opacity: 0.5;
        };
        readonly size: {
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
        readonly focusRing: {
            borderColor: string;
            borderWidth: number;
            outlineOffset: 2;
        };
        readonly state: {
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
        readonly text: {
            color: string;
            placeholderColor: string;
        };
        readonly label: {
            fontSize: 13;
            fontWeight: "500";
            color: string;
            marginBottom: 4;
        };
        readonly helperText: {
            fontSize: 11;
            color: string;
            marginTop: 4;
        };
        readonly errorText: {
            fontSize: 11;
            color: string;
            marginTop: 4;
        };
    };
    readonly toggleButton: {
        readonly container: {
            readonly padding: 8;
            readonly borderRadius: 8;
            readonly borderWidth: 1;
            readonly borderColor: string;
            readonly backgroundColor: string;
            readonly alignItems: "center";
            readonly justifyContent: "center";
            readonly selected: {
                readonly backgroundColor: string;
                readonly borderColor: string;
            };
        };
        readonly size: {
            readonly sm: {
                readonly height: 32;
                readonly paddingHorizontal: 12;
                readonly fontSize: 13;
            };
            readonly md: {
                readonly height: 40;
                readonly paddingHorizontal: 16;
                readonly fontSize: 15;
            };
            readonly lg: {
                readonly height: 48;
                readonly paddingHorizontal: 20;
                readonly fontSize: 17;
            };
        };
        readonly icon: {
            readonly color: string;
            readonly selected: {
                readonly color: string;
            };
        };
    };
    readonly tooltip: {
        readonly container: {
            readonly shadowColor: string;
            readonly shadowOffset: {
                width: number;
                height: number;
            };
            readonly shadowOpacity: number;
            readonly shadowRadius: number;
            readonly elevation: number;
            readonly backgroundColor: string;
            readonly paddingHorizontal: 8;
            readonly paddingVertical: 4;
            readonly borderRadius: 2;
        };
        readonly text: {
            readonly color: string;
            readonly fontSize: 11;
        };
    };
    readonly typography: {
        readonly variants: {
            readonly h1: {
                readonly fontSize: 36;
                readonly fontWeight: "600";
                readonly lineHeight: number;
            };
            readonly h2: {
                readonly fontSize: 30;
                readonly fontWeight: "600";
                readonly lineHeight: number;
            };
            readonly h3: {
                readonly fontSize: 24;
                readonly fontWeight: "600";
                readonly lineHeight: number;
            };
            readonly h4: {
                readonly fontSize: 20;
                readonly fontWeight: "600";
                readonly lineHeight: number;
            };
            readonly h5: {
                readonly fontSize: 17;
                readonly fontWeight: "500";
                readonly lineHeight: number;
            };
            readonly h6: {
                readonly fontSize: 15;
                readonly fontWeight: "500";
                readonly lineHeight: number;
            };
            readonly subtitle1: {
                readonly fontSize: 15;
                readonly fontWeight: "500";
                readonly lineHeight: number;
            };
            readonly subtitle2: {
                readonly fontSize: 13;
                readonly fontWeight: "500";
                readonly lineHeight: number;
            };
            readonly body1: {
                readonly fontSize: 15;
                readonly fontWeight: "400";
                readonly lineHeight: number;
            };
            readonly body2: {
                readonly fontSize: 13;
                readonly fontWeight: "400";
                readonly lineHeight: number;
            };
            readonly caption: {
                readonly fontSize: 11;
                readonly fontWeight: "400";
                readonly lineHeight: number;
            };
            readonly button: {
                readonly fontSize: 13;
                readonly fontWeight: "600";
                readonly textTransform: "uppercase";
            };
            readonly overline: {
                readonly fontSize: 11;
                readonly fontWeight: "600";
                readonly letterSpacing: 1.2;
                readonly textTransform: "uppercase";
            };
        };
        readonly colors: {
            readonly primary: string;
            readonly secondary: string;
            readonly tertiary: string;
            readonly disabled: string;
            readonly brand: string;
            readonly error: string;
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
    readonly container: {
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 4;
    };
    /** Tighter row for `compact` Rating — same flex as `container`, smaller gap */
    readonly containerCompact: {
        readonly flexDirection: "row";
        readonly alignItems: "center";
        readonly gap: 2;
    };
    readonly star: {
        readonly filled: {
            readonly color: string;
        };
        readonly empty: {
            readonly color: string;
        };
        readonly half: {
            readonly color: string;
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