import type { BottomNavigationItemProps } from "@truongdq01/headless";
import type React from "react";

export type { BottomNavigationItemProps };

/**
 * Props for the root BottomNavigation container.
 */
export interface BottomNavigationProps<T = string> {
	/** Controlled active item value. */
	value?: T;
	/** Initial active item value (uncontrolled). */
	defaultValue?: T;
	/** Callback fired when the active item changes. */
	onChange?: (value: T) => void;
	/** When true, labels are always visible; otherwise only the active label shows. */
	showLabels?: boolean;
	/** BottomNavigationAction children. */
	children?: React.ReactNode;
}

/**
 * Props for an individual BottomNavigation action item.
 */
export interface BottomNavigationActionProps<T = string> {
	/** Value that identifies this action. */
	value: T;
	/** Label rendered below the icon. */
	label?: string;
	/** Icon node rendered above the label. */
	icon?: React.ReactNode;
}

/**
 * Shape of the value stored in BottomNavContext.
 */
export interface BottomNavContextValue<T = string> {
	/** Currently active value (may be undefined in uncontrolled mode before any selection). */
	value?: T;
	/** Returns true when the given item value is active. */
	isSelected: (value: T) => boolean;
	/** Returns pressable props (onPress, accessibilityRole, etc.) for an item. */
	getItemProps: (value: T) => BottomNavigationItemProps;
	/** Whether labels are always shown. */
	showLabels: boolean;
}
