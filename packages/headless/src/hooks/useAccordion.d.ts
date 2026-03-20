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
export declare function useAccordion(options?: UseAccordionOptions): UseAccordionReturn;
//# sourceMappingURL=useAccordion.d.ts.map