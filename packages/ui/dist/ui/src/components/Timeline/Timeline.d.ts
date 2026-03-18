import React from "react";
export type TimelinePosition = "left" | "right" | "alternate" | "alternate-reverse";
export interface TimelineProps {
    position?: TimelinePosition;
    children?: React.ReactNode;
}
export declare function Timeline({ position, children }: TimelineProps): React.JSX.Element;
export interface TimelineItemProps {
    position?: "left" | "right";
    children?: React.ReactNode;
}
export declare function TimelineItem({ position, children }: TimelineItemProps): React.JSX.Element;
export interface TimelineSeparatorProps {
    children?: React.ReactNode;
}
export declare function TimelineSeparator({ children }: TimelineSeparatorProps): React.JSX.Element;
export interface TimelineDotProps {
    variant?: "filled" | "outlined";
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
}
export declare function TimelineDot({ variant, color }: TimelineDotProps): React.JSX.Element;
export declare function TimelineConnector(): React.JSX.Element;
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