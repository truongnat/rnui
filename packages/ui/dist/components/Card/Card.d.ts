import React from "react";
export type CardPadding = "sm" | "md" | "lg" | "none";
export interface CardProps {
    children: React.ReactNode;
    /** If provided, card becomes pressable */
    onPress?: () => void;
    /** Inner padding preset */
    padding?: CardPadding;
    /** Accessibility label (required if pressable) */
    accessibilityLabel?: string;
    /** Additional style override */
    style?: object;
}
export declare function Card({ children, onPress, padding, accessibilityLabel, style, }: CardProps): React.JSX.Element;
//# sourceMappingURL=Card.d.ts.map