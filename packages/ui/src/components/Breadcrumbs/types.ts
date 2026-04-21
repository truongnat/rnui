import type { ReactNode } from "react";

export interface BreadcrumbsProps {
	children?: ReactNode;
	separator?: ReactNode;
	maxItems?: number;
	itemsBeforeCollapse?: number;
	itemsAfterCollapse?: number;
}
