import { useBottomNavigation, useTheme } from "@truongdq01/headless";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { BottomNavContext } from "./context";
import type { BottomNavContextValue, BottomNavigationProps } from "./types";

// Re-export sub-components and types so that imports from './BottomNavigation'
// remain backward-compatible with existing consumers and tests.
export { BottomNavigationAction } from "./BottomNavigationAction";
export type {
	BottomNavContextValue,
	BottomNavigationActionProps,
	BottomNavigationItemProps,
	BottomNavigationProps,
} from "./types";

/**
 * Root BottomNavigation component.
 * Owns the context provider and the safe-area-aware container row.
 * Action items are rendered as BottomNavigationAction children.
 */
export function BottomNavigation<T = string>({
	value: controlledValue,
	defaultValue,
	onChange,
	showLabels = false,
	children,
}: BottomNavigationProps<T>) {
	const {
		components: { bottomNavigation },
	} = useTheme();
	const { value, isSelected, getItemProps } = useBottomNavigation<T>({
		value: controlledValue,
		defaultValue,
		onChange,
	});

	const ctx = useMemo(
		() => ({ value, isSelected, getItemProps, showLabels }),
		[value, isSelected, getItemProps, showLabels],
	);

	return (
		<BottomNavContext.Provider value={ctx as BottomNavContextValue<unknown>}>
			<View style={[bottomNavigation.container, styles.container]}>
				{children}
			</View>
		</BottomNavContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});

BottomNavigation.displayName = "BottomNavigation";
