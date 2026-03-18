import React from "react";
export interface AccordionProps {
    expanded?: boolean;
    defaultExpanded?: boolean;
    disabled?: boolean;
    onChange?: (expanded: boolean) => void;
    children?: React.ReactNode;
}
export interface AccordionSummaryProps {
    children?: React.ReactNode;
    expandIcon?: React.ReactNode;
}
export interface AccordionDetailsProps {
    children?: React.ReactNode;
}
export interface AccordionActionsProps {
    children?: React.ReactNode;
}
export declare function Accordion({ expanded: controlledExpanded, defaultExpanded, disabled, onChange, children, }: AccordionProps): React.JSX.Element;
export declare function AccordionSummary({ children, expandIcon }: AccordionSummaryProps): React.JSX.Element | null;
export declare function AccordionDetails({ children }: AccordionDetailsProps): React.JSX.Element | null;
export declare function AccordionActions({ children }: AccordionActionsProps): React.JSX.Element | null;
//# sourceMappingURL=Accordion.d.ts.map