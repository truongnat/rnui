import type { PressFeedbackMode } from "@truongdq01/headless";
import type { ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

/** Available button visual style variants */
export type ButtonVariant =
	| "solid"
	| "outline"
	| "ghost"
	| "destructive"
	| "text"
	| "contained"
	| "outlined";

/** Available button size presets */
export type ButtonSize = "sm" | "md" | "lg";

/** Available button color themes */
export type ButtonColor =
	| "inherit"
	| "primary"
	| "secondary"
	| "success"
	| "error"
	| "info"
	| "warning"
	| "accent";

export interface ButtonProps {
	id?: string;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	label?: string;
	children?: ReactNode;
	onPress?: () => void;
	onLongPress?: () => void;
	disabled?: boolean;
	loading?: boolean;
	loadingIndicator?: ReactNode;
	loadingPosition?: "start" | "end" | "center";
	leadingIcon?: ReactNode;
	trailingIcon?: ReactNode;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	feedbackMode?: PressFeedbackMode;
	fullWidth?: boolean;
	href?: string;
	disableElevation?: boolean;
	style?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	accessibilityLabel?: string;
	accessibilityHint?: string;
}
