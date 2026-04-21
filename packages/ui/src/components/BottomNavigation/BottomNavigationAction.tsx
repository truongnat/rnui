import { useTheme } from "@truongdq01/headless";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useBottomNavContext } from "./context";
import type { BottomNavigationActionProps } from "./types";

/**
 * Individual action item for BottomNavigation.
 * Renders an icon above a label; the label visibility respects showLabels and
 * the currently active state.  Active/inactive color is token-driven.
 */
export function BottomNavigationAction<T = string>({
	value,
	label,
	icon,
}: BottomNavigationActionProps<T>) {
	const {
		components: { bottomNavigation },
		tokens,
	} = useTheme();
	const ctx = useBottomNavContext<T>();

	// Derive values before hooks — all hooks must run unconditionally (Rules of Hooks).
	const selected = ctx ? ctx.isSelected(value) : false;
	const showLabel = ctx ? ctx.showLabels || selected : false;
	const activeColor = bottomNavigation.item.active.color;
	const inactiveColor = bottomNavigation.item.inactive.color;

	const labelStyle = useMemo(
		() => [
			styles.label,
			{
				fontSize: tokens.fontSize.xs,
				color: selected ? activeColor : inactiveColor,
			},
		],
		[selected, tokens.fontSize.xs, activeColor, inactiveColor],
	);

	if (!ctx) return null;

	return (
		<Pressable {...ctx.getItemProps(value)} style={styles.action}>
			{icon}
			{showLabel && label ? <Text style={labelStyle}>{label}</Text> : null}
		</Pressable>
	);
}

BottomNavigationAction.displayName = "BottomNavigationAction";

const styles = StyleSheet.create({
	action: {
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	label: {
		// fontSize and color applied via useMemo override
	},
});
