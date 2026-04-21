import { createContext, useContext } from "react";
import type { BottomNavContextValue } from "./types";

/**
 * Shared context that flows from BottomNavigation (root) down to each BottomNavigationAction.
 */
export const BottomNavContext =
	createContext<BottomNavContextValue<unknown> | null>(null);

/**
 * Typed hook for consuming BottomNavContext.
 * Returns null when called outside a BottomNavigation tree.
 */
export function useBottomNavContext<
	T = string,
>(): BottomNavContextValue<T> | null {
	return useContext(BottomNavContext) as BottomNavContextValue<T> | null;
}
