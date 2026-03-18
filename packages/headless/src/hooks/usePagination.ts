import { useCallback, useMemo, useState } from "react";

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

function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

export function usePagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onChange,
}: UsePaginationOptions): UsePaginationReturn {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = controlledPage ?? internalPage;

  const setPage = useCallback(
    (next: number) => {
      const clamped = Math.max(1, Math.min(count, next));
      if (controlledPage === undefined) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [count, controlledPage, onChange]
  );

  const items = useMemo<PaginationItem[]>(() => {
    if (count <= 0) return [];

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
      Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0]! - 2 : count - 1
    );

    const result: PaginationItem[] = [];
    result.push(...startPages);

    if (siblingsStart > boundaryCount + 2) {
      result.push("start-ellipsis");
    } else if (boundaryCount + 1 < count - boundaryCount) {
      result.push(boundaryCount + 1);
    }

    result.push(...range(siblingsStart, siblingsEnd));

    if (siblingsEnd < count - boundaryCount - 1) {
      result.push("end-ellipsis");
    } else if (count - boundaryCount > boundaryCount) {
      result.push(count - boundaryCount);
    }

    result.push(...endPages);

    return Array.from(new Set(result)).filter((item) => {
      if (typeof item === "number") return item >= 1 && item <= count;
      return true;
    });
  }, [count, page, siblingCount, boundaryCount]);

  return { page, setPage, items };
}
