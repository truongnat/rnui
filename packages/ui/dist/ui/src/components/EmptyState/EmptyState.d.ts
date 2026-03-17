import React from "react";
export interface EmptyStateAction {
    label: string;
    onPress: () => void;
    variant?: "solid" | "outline" | "ghost";
}
export interface EmptyStateProps {
    /** Large icon/illustration slot — pass an SVG or Image */
    icon?: React.ReactNode;
    title: string;
    description?: string;
    /** Primary action button */
    action?: EmptyStateAction;
    /** Secondary action link */
    secondaryAction?: EmptyStateAction;
    /** Compact variant for inline empty states inside lists */
    compact?: boolean;
}
export declare function EmptyState({ icon, title, description, action, secondaryAction, compact, }: EmptyStateProps): React.JSX.Element;
//# sourceMappingURL=EmptyState.d.ts.map