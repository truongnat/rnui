import { useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useTokens } from "../theme";
import type { SemanticTokens } from "@truongdq01/tokens";

export function useMemoStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styleFactory: (tokens: SemanticTokens) => T
): T {
    const tokens = useTokens();

    // We use a ref to store the factory so that we don't re-compute the styles
    // just because an inline function was passed on every render.
    const factoryRef = useRef(styleFactory);
    factoryRef.current = styleFactory;

    // We only re-compute when the `tokens` object changes (e.g., light <-> dark mode switch).
    return useMemo(() => {
        const rawStyles = factoryRef.current(tokens);
        return StyleSheet.create(rawStyles) as T;
    }, [tokens]);
}
