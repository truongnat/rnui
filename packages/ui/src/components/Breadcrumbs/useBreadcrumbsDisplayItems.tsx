import { Children, type ReactNode, useMemo } from "react";
import { Text } from "react-native";

type EllipsisStyle = { color: string; fontSize?: number };

type Options = {
	maxItems: number;
	itemsBeforeCollapse: number;
	itemsAfterCollapse: number;
	ellipsisStyle: EllipsisStyle;
};

/**
 * Collapses the middle segment with "..." when there are more than `maxItems` children.
 */
export function useBreadcrumbsDisplayItems(
	children: ReactNode | undefined,
	{ maxItems, itemsBeforeCollapse, itemsAfterCollapse, ellipsisStyle }: Options,
): ReactNode[] {
	return useMemo(() => {
		const items = Children.toArray(children);
		if (items.length <= maxItems) {
			return items;
		}
		return [
			...items.slice(0, itemsBeforeCollapse),
			<Text key="breadcrumbs-ellipsis" style={ellipsisStyle}>
				...
			</Text>,
			...items.slice(items.length - itemsAfterCollapse),
		];
	}, [
		children,
		ellipsisStyle,
		itemsAfterCollapse,
		itemsBeforeCollapse,
		maxItems,
	]);
}
