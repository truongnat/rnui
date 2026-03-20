import React from "react";
export interface SkeletonProps {
    width?: number | `${number}%`;
    height?: number;
    borderRadius?: number;
    /** Disable shimmer animation */
    animate?: boolean;
}
export declare function Skeleton({ width, height, borderRadius, animate, }: SkeletonProps): React.JSX.Element;
export declare function SkeletonText({ lines, lastLineWidth, }: {
    lines?: number;
    lastLineWidth?: `${number}%`;
}): React.JSX.Element;
export declare function SkeletonCard(): React.JSX.Element;
export declare function SkeletonListItem(): React.JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map