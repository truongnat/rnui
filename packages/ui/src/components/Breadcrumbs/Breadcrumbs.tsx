import { useTheme } from "@truongdq01/headless";
import { Fragment, isValidElement, memo, type ReactNode } from "react";
import { Text, View } from "react-native";
import type { BreadcrumbsProps } from "./types";
import { useBreadcrumbsDisplayItems } from "./useBreadcrumbsDisplayItems";

function breadcrumbRowKey(child: ReactNode, idx: number): string {
	if (isValidElement(child) && child.key != null && child.key !== "") {
		return String(child.key);
	}
	return `breadcrumb-row-${idx}`;
}

function BreadcrumbsInner({
	children,
	separator = "/",
	maxItems = 8,
	itemsBeforeCollapse = 1,
	itemsAfterCollapse = 1,
}: BreadcrumbsProps) {
	const {
		components: { breadcrumbs },
	} = useTheme();

	const displayItems = useBreadcrumbsDisplayItems(children, {
		maxItems,
		itemsBeforeCollapse,
		itemsAfterCollapse,
		ellipsisStyle: breadcrumbs.separator,
	});

	return (
		<View style={breadcrumbs.container}>
			{displayItems.map((child, idx) => (
				<Fragment key={breadcrumbRowKey(child, idx)}>
					{child}
					{idx < displayItems.length - 1 && (
						<Text style={breadcrumbs.separator}>{separator}</Text>
					)}
				</Fragment>
			))}
		</View>
	);
}

export const Breadcrumbs = memo(BreadcrumbsInner);
Breadcrumbs.displayName = "Breadcrumbs";
