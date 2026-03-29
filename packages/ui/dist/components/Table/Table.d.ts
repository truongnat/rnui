import React from "react";
export type TableSize = "small" | "medium";
export type TablePadding = "normal" | "checkbox" | "none";
export interface TableProps {
    children?: React.ReactNode;
    size?: TableSize;
    padding?: TablePadding;
    stickyHeader?: boolean;
    style?: object;
}
export declare function Table({ children, size, padding, stickyHeader, style, }: TableProps): React.JSX.Element;
export interface TableContainerProps {
    children?: React.ReactNode;
    style?: object;
}
export declare function TableContainer({ children, style }: TableContainerProps): React.JSX.Element;
export declare function TableHead({ children }: {
    children?: React.ReactNode;
}): React.JSX.Element;
export declare function TableBody({ children }: {
    children?: React.ReactNode;
}): React.JSX.Element;
export declare function TableFooter({ children }: {
    children?: React.ReactNode;
}): React.JSX.Element;
export interface TableRowProps {
    children?: React.ReactNode;
    selected?: boolean;
    style?: object;
}
export declare function TableRow({ children, selected, style }: TableRowProps): React.JSX.Element;
export interface TableCellProps {
    children?: React.ReactNode;
    align?: "left" | "center" | "right";
    padding?: TablePadding;
    size?: TableSize;
    variant?: "head" | "body" | "footer";
    style?: object;
}
export declare function TableCell({ children, align, padding, size, variant, style, }: TableCellProps): React.JSX.Element;
export interface TablePaginationProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rows: number) => void;
    labelRowsPerPage?: string;
}
export declare function TablePagination({ count, page, rowsPerPage, onPageChange, labelRowsPerPage, }: TablePaginationProps): React.JSX.Element;
export interface TableSortLabelProps {
    active?: boolean;
    direction?: "asc" | "desc";
    onClick?: () => void;
    children?: React.ReactNode;
}
export declare function TableSortLabel({ active, direction, onClick, children, }: TableSortLabelProps): React.JSX.Element;
//# sourceMappingURL=Table.d.ts.map