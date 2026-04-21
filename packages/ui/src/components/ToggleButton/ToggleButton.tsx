import { usePressable, useTheme, useToggleGroup } from "@truongdq01/headless";
import React, {
	createContext,
	isValidElement,
	useContext,
	useMemo,
} from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export interface ToggleButtonGroupProps<T = string> {
	value?: T | T[];
	defaultValue?: T | T[];
	exclusive?: boolean;
	onChange?: (value: T | T[] | undefined) => void;
	orientation?: "horizontal" | "vertical";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	children?: React.ReactNode;
}

export interface ToggleButtonProps<T = string> {
	value: T;
	disabled?: boolean;
	children?: React.ReactNode;
}

interface ToggleContextValue<T = string> {
	isSelected: (value: T) => boolean;
	toggle: (value: T) => void;
	size: "sm" | "md" | "lg";
	disabled: boolean;
}

const ToggleContext = createContext<ToggleContextValue<unknown> | null>(null);

export function ToggleButtonGroup<T = string>({
	value,
	defaultValue,
	exclusive = false,
	onChange,
	orientation = "horizontal",
	size = "md",
	disabled = false,
	children,
}: ToggleButtonGroupProps<T>) {
	const { isSelected, toggle } = useToggleGroup<T>({
		value,
		defaultValue,
		exclusive,
		disabled,
		onChange,
	});

	return (
		<ToggleContext.Provider
			value={
				{ isSelected, toggle, size, disabled } as ToggleContextValue<unknown>
			}
		>
			<View
				style={{
					flexDirection: orientation === "horizontal" ? "row" : "column",
					gap: 8,
				}}
			>
				{children}
			</View>
		</ToggleContext.Provider>
	);
}

export function ToggleButton<T = string>({
	value,
	disabled = false,
	children,
}: ToggleButtonProps<T>) {
	const {
		components: { toggleButton },
		tokens,
	} = useTheme();
	const ctx = useContext(
		ToggleContext as React.Context<ToggleContextValue<T> | null>,
	);

	const selected = ctx?.isSelected(value) ?? false;
	const isDisabled = disabled || ctx?.disabled;

	const { animatedStyle, gesture, accessibilityProps } = usePressable({
		onPress: () => ctx?.toggle(value),
		disabled: isDisabled,
		feedbackMode: "scaleSubtle",
		accessibilityRole: "button",
	});

	const size = ctx?.size ?? "md";
	const sizeMap = {
		sm: { height: 32, paddingHorizontal: 12, fontSize: tokens.fontSize.sm },
		md: { height: 40, paddingHorizontal: 16, fontSize: tokens.fontSize.md },
		lg: { height: 48, paddingHorizontal: 20, fontSize: tokens.fontSize.lg },
	};

	const s = sizeMap[size];

	const labelColor = selected
		? toggleButton.icon.selected.color
		: toggleButton.icon.color;

	const textStyle = useMemo(
		(): TextStyle => ({
			fontSize: s.fontSize,
			fontWeight: tokens.fontWeight.medium,
			color: labelColor,
			textAlign: "center",
		}),
		[labelColor, s.fontSize, tokens.fontWeight.medium],
	);

	const containerStyle = useMemo((): StyleProp<ViewStyle> => {
		return [
			toggleButton.container,
			selected && toggleButton.container.selected,
			{
				height: s.height,
				minWidth: s.height,
				paddingHorizontal: s.paddingHorizontal,
				paddingVertical: 0,
				opacity: isDisabled ? 0.5 : 1,
			},
			animatedStyle,
		];
	}, [
		animatedStyle,
		isDisabled,
		s.height,
		s.paddingHorizontal,
		selected,
		toggleButton.container,
	]);

	const iconColor = labelColor;

	const content = useMemo(() => {
		if (typeof children === "string" || typeof children === "number") {
			return <Text style={textStyle}>{children}</Text>;
		}
		if (isValidElement<{ color?: string; size?: number | string }>(children)) {
			return React.cloneElement(children, {
				size: children.props.size ?? Math.round(s.fontSize * 1.25),
				color: children.props.color ?? iconColor,
			});
		}
		return <View style={styles.fallbackSlot}>{children}</View>;
	}, [children, iconColor, s.fontSize, textStyle]);

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={containerStyle} {...accessibilityProps}>
				{content}
			</Animated.View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	fallbackSlot: {
		alignItems: "center",
		justifyContent: "center",
	},
});
