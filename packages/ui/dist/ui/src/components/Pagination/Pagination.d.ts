import React from "react";
export interface PaginationProps {
    count: number;
    page?: number;
    defaultPage?: number;
    onChange?: (page: number) => void;
    variant?: "text" | "outlined";
    shape?: "circular" | "rounded";
    size?: "sm" | "md" | "lg";
}
export declare function Pagination({ count, page, defaultPage, onChange, variant, shape, size, }: PaginationProps): React.JSX.Element;
//# sourceMappingURL=Pagination.d.ts.map