import { memo } from "react";
import { View } from "react-native";
import type { BoxProps } from "./types";
import { useBoxStyle } from "./useBoxStyle";

function BoxInner({ children, style, sx, flex }: BoxProps) {
	const mergedStyle = useBoxStyle({ flex, sx, style });

	return <View style={mergedStyle}>{children}</View>;
}

export const Box = memo(BoxInner);
Box.displayName = "Box";
