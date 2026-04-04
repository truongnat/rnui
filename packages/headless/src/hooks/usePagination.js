'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.usePagination = usePagination;
const react_1 = require('react');
function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}
function usePagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onChange,
}) {
  const [internalPage, setInternalPage] = (0, react_1.useState)(defaultPage);
  const page = controlledPage ?? internalPage;
  const setPage = (0, react_1.useCallback)(
    (next) => {
      const clamped = Math.max(1, Math.min(count, next));
      if (controlledPage === undefined) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [count, controlledPage, onChange]
  );
  const items = (0, react_1.useMemo)(() => {
    if (count <= 0) return [];
    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(
      Math.max(count - boundaryCount + 1, boundaryCount + 1),
      count
    );
    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1
      ),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );
    const result = [];
    result.push(...startPages);
    if (siblingsStart > boundaryCount + 2) {
      result.push('start-ellipsis');
    } else if (boundaryCount + 1 < count - boundaryCount) {
      result.push(boundaryCount + 1);
    }
    result.push(...range(siblingsStart, siblingsEnd));
    if (siblingsEnd < count - boundaryCount - 1) {
      result.push('end-ellipsis');
    } else if (count - boundaryCount > boundaryCount) {
      result.push(count - boundaryCount);
    }
    result.push(...endPages);
    return Array.from(new Set(result)).filter((item) => {
      if (typeof item === 'number') return item >= 1 && item <= count;
      return true;
    });
  }, [count, page, siblingCount, boundaryCount]);
  return { page, setPage, items };
}
//# sourceMappingURL=usePagination.js.map
