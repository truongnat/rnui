import { useState, useCallback } from "react";

export interface UseAccordionOptions {
  defaultExpanded?: string[];
  expanded?: string[];
  onChange?: (expanded: string[]) => void;
  multiple?: boolean;
}

export interface UseAccordionReturn {
  expanded: string[];
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
  expand: (id: string) => void;
  collapse: (id: string) => void;
  expandAll: (ids: string[]) => void;
  collapseAll: () => void;
}

export function useAccordion(options: UseAccordionOptions = {}): UseAccordionReturn {
  const {
    defaultExpanded = [],
    expanded: controlledExpanded,
    onChange,
    multiple = false,
  } = options;

  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded! : internalExpanded;

  const setExpanded = useCallback((next: string[]) => {
    if (!isControlled) setInternalExpanded(next);
    onChange?.(next);
  }, [isControlled, onChange]);

  const isExpanded = useCallback((id: string) => expanded.includes(id), [expanded]);

  const toggle = useCallback((id: string) => {
    if (isExpanded(id)) {
      setExpanded(expanded.filter((e) => e !== id));
    } else {
      setExpanded(multiple ? [...expanded, id] : [id]);
    }
  }, [expanded, isExpanded, multiple, setExpanded]);

  const expand = useCallback((id: string) => {
    if (!isExpanded(id)) setExpanded(multiple ? [...expanded, id] : [id]);
  }, [expanded, isExpanded, multiple, setExpanded]);

  const collapse = useCallback((id: string) => {
    setExpanded(expanded.filter((e) => e !== id));
  }, [expanded, setExpanded]);

  const expandAll = useCallback((ids: string[]) => {
    if (multiple) setExpanded(ids);
  }, [multiple, setExpanded]);

  const collapseAll = useCallback(() => setExpanded([]), [setExpanded]);

  return { expanded, isExpanded, toggle, expand, collapse, expandAll, collapseAll };
}
