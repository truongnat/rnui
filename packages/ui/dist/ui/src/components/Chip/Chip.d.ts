import React from "react";
export interface ChipProps {
    label: React.ReactNode;
    variant?: "filled" | "outlined";
    color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
    size?: "sm" | "md";
    avatar?: React.ReactNode;
    icon?: React.ReactNode;
    deleteIcon?: React.ReactNode;
    onDelete?: () => void;
    onClick?: () => void;
    disabled?: boolean;
    clickable?: boolean;
}
export declare function Chip({ label, variant, color, size, avatar, icon, deleteIcon, onDelete, onClick, disabled, clickable, }: ChipProps): React.JSX.Element;
//# sourceMappingURL=Chip.d.ts.map