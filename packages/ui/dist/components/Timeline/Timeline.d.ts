import React from "react";
export type TimelinePosition = "left" | "right" | "alternate" | "alternate-reverse";
export interface TimelineProps {
    position?: TimelinePosition;
    children?: React.ReactNode;
    itemVariant?: "filled" | "outlined";
}
export declare function Timeline({ position, itemVariant, children }: TimelineProps): React.JSX.Element;
export interface TimelineItemProps {
    position?: "left" | "right";
    variant?: "filled" | "outlined";
    status?: "pending" | "active" | "completed" | "error";
    children?: React.ReactNode;
}
export declare function TimelineItem({ position, variant, status, children }: TimelineItemProps): React.JSX.Element;
export interface TimelineSeparatorProps {
    status?: "pending" | "active" | "completed" | "error";
    variant?: "filled" | "outlined";
    children?: React.ReactNode;
}
export declare function TimelineSeparator({ status, variant, children }: TimelineSeparatorProps): React.JSX.Element;
export interface TimelineDotProps {
    variant?: "filled" | "outlined";
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
    status?: "pending" | "active" | "completed" | "error";
    size?: number;
}
export declare function TimelineDot({ variant, color, status, size }: TimelineDotProps): React.JSX.Element;
export interface TimelineConnectorProps {
    color?: string;
    width?: number;
}
export declare function TimelineConnector({ color, width }: TimelineConnectorProps): React.JSX.Element;
export interface TimelineContentProps {
    children?: React.ReactNode;
    align?: "left" | "right";
}
export declare function TimelineContent({ children, align }: TimelineContentProps): React.JSX.Element;
export interface TimelineOppositeContentProps {
    children?: React.ReactNode;
    align?: "left" | "right";
}
export declare function TimelineOppositeContent({ children, align }: TimelineOppositeContentProps): React.JSX.Element;
//# sourceMappingURL=Timeline.d.ts.map