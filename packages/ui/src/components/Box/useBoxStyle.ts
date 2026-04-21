import { useTheme } from "@truongdq01/headless";
import { useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { BoxProps } from "./types";

/**
 * Merges theme box defaults, optional flex shorthand, `sx`, then `style`
 * (last wins for overlapping keys when flattened).
 */
export function useBoxStyle({
	flex,
	sx,
	style,
}: Pick<BoxProps, "flex" | "sx" | "style">): StyleProp<ViewStyle> {
	const {
		components: { box },
	} = useTheme();

	return useMemo(
		(): StyleProp<ViewStyle> => [
			box.defaults,
			flex !== undefined ? { flex } : undefined,
			sx,
			style,
		],
		[box.defaults, flex, sx, style],
	);
}
