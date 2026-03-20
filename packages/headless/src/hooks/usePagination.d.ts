export interface UsePaginationOptions {
    count: number;
    page?: number;
    defaultPage?: number;
    siblingCount?: number;
    boundaryCount?: number;
    onChange?: (page: number) => void;
}
export type PaginationItem = number | "start-ellipsis" | "end-ellipsis";
export interface UsePaginationReturn {
    page: number;
    setPage: (page: number) => void;
    items: PaginationItem[];
}
export declare function usePagination({ count, page: controlledPage, defaultPage, siblingCount, boundaryCount, onChange, }: UsePaginationOptions): UsePaginationReturn;
//# sourceMappingURL=usePagination.d.ts.map