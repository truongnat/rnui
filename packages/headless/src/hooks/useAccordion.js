'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useAccordion = useAccordion;
const react_1 = require('react');
function useAccordion(options = {}) {
  const {
    defaultExpanded = [],
    expanded: controlledExpanded,
    onChange,
    multiple = false,
  } = options;
  const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(
    defaultExpanded
  );
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const setExpanded = (0, react_1.useCallback)(
    (next) => {
      if (!isControlled) setInternalExpanded(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  const isExpanded = (0, react_1.useCallback)(
    (id) => expanded.includes(id),
    [expanded]
  );
  const toggle = (0, react_1.useCallback)(
    (id) => {
      if (isExpanded(id)) {
        setExpanded(expanded.filter((e) => e !== id));
      } else {
        setExpanded(multiple ? [...expanded, id] : [id]);
      }
    },
    [expanded, isExpanded, multiple, setExpanded]
  );
  const expand = (0, react_1.useCallback)(
    (id) => {
      if (!isExpanded(id)) setExpanded(multiple ? [...expanded, id] : [id]);
    },
    [expanded, isExpanded, multiple, setExpanded]
  );
  const collapse = (0, react_1.useCallback)(
    (id) => {
      setExpanded(expanded.filter((e) => e !== id));
    },
    [expanded, setExpanded]
  );
  const expandAll = (0, react_1.useCallback)(
    (ids) => {
      if (multiple) setExpanded(ids);
    },
    [multiple, setExpanded]
  );
  const collapseAll = (0, react_1.useCallback)(
    () => setExpanded([]),
    [setExpanded]
  );
  return {
    expanded,
    isExpanded,
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll,
  };
}
//# sourceMappingURL=useAccordion.js.map
