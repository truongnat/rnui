import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface BoxProps {
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
	sx?: StyleProp<ViewStyle>;
	flex?: number;
}
