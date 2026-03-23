import { useTokens } from "../theme";
import { type SemanticTokens } from "@truongdq01/tokens";

/**
 * Hook to apply default icon styles (size, color) based on component context.
 * Returns an object with style and color for the icon.
 */
export function useIconStyle(context: "button" | "input" | "list" | "select") {
    const tokens = useTokens();

    if (context === "button") {
        // Buttons use a default size and color based on their text color
        return {
            size: tokens.fontSize.md,
            color: "inherit", // Components should handle setting this based on variant
        };
    }

    if (context === "input" || context === "select") {
        return {
            size: tokens.fontSize.lg, // Search icons and chevrons usually slightly larger
            color: tokens.color.text.tertiary,
        };
    }

    if (context === "list") {
        return {
            size: tokens.fontSize.md,
            color: tokens.color.text.secondary,
        };
    }

    return {
        size: tokens.fontSize.md,
        color: tokens.color.text.primary,
    };
}
