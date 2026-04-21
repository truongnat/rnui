import { useTheme } from "@truongdq01/headless";
import React from "react";
import { View, type ViewStyle } from "react-native";

export interface StackProps {
	children?: React.ReactNode;
	direction?: "column" | "column-reverse" | "row" | "row-reverse";
	spacing?: "xs" | "sm" | "md" | "lg" | "xl" | number;
	divider?: React.ReactNode;
	alignItems?: ViewStyle["alignItems"];
	justifyContent?: ViewStyle["justifyContent"];
	flexWrap?: ViewStyle["flexWrap"];
	/** When true, same as `flexWrap="wrap"` (handy for button chips in a row). */
	wrap?: boolean;
	style?: ViewStyle | ViewStyle[];
}

export function Stack({
	children,
	direction = "column",
	spacing = "sm",
	divider,
	alignItems,
	justifyContent,
	flexWrap,
	wrap,
	style,
}: StackProps) {
	const {
		components: { stack },
	} = useTheme();
	const gap = typeof spacing === "number" ? spacing : stack.gap[spacing];

	const items = React.Children.toArray(children);
	const content = divider
		? items.flatMap((child, idx) => (idx === 0 ? [child] : [divider, child]))
		: items;

	const resolvedFlexWrap = flexWrap ?? (wrap ? "wrap" : undefined);

	return (
		<View
			style={[
				{
					flexDirection: direction,
					gap,
					alignItems,
					justifyContent,
					flexWrap: resolvedFlexWrap,
				},
				style,
			]}
		>
			{content}
		</View>
	);
}
