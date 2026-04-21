import { useIconStyle, usePressable, useTheme } from "@truongdq01/headless";
import React, { useCallback, useMemo } from "react";
import {
	ActivityIndicator,
	Linking,
	type StyleProp,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { resolveButtonColor } from "./resolveButtonColor";
import type { ButtonProps } from "./types";

function ButtonInner({
	id: idProp,
	variant = "solid",
	color = "primary",
	size = "md",
	label,
	children,
	onPress,
	onLongPress,
	disabled = false,
	loading = false,
	loadingIndicator,
	loadingPosition = "center",
	leadingIcon,
	trailingIcon,
	startIcon,
	endIcon,
	feedbackMode = "scale",
	fullWidth = false,
	href,
	disableElevation = false,
	style,
	labelStyle,
	accessibilityLabel,
	accessibilityHint,
}: ButtonProps) {
	const {
		components: { button },
		tokens,
	} = useTheme();
	const { size: iconSize } = useIconStyle("button");
	const isDisabled = disabled || loading;

	const resolvedVariant: "solid" | "outline" | "ghost" | "destructive" =
		useMemo(() => {
			if (variant === "contained") return "solid";
			if (variant === "outlined") return "outline";
			if (variant === "text") return "ghost";
			return variant as "solid" | "outline" | "ghost" | "destructive";
		}, [variant]);

	const resolvedColor = useMemo(
		() => resolveButtonColor(color, tokens),
		[color, tokens],
	);

	const handlePress = useCallback(() => {
		if (!href) {
			onPress?.();
			return;
		}
		onPress?.();
		void Linking.openURL(href).catch((err) => {
			console.warn(`Failed to open URL ${href}:`, err);
		});
	}, [href, onPress]);

	const hitSlop = useMemo(() => {
		const height = button.size[size].container.height;
		const padding = Math.max(0, (44 - height) / 2);
		const isIconOnly = !label && !children;
		const horizontalPadding = isIconOnly ? padding : 0;
		return {
			top: padding,
			bottom: padding,
			left: horizontalPadding,
			right: horizontalPadding,
		};
	}, [button, size, label, children]);

	const { animatedStyle, gesture, accessibilityProps } = usePressable({
		onPress: handlePress,
		onLongPress,
		disabled: isDisabled,
		feedbackMode,
		accessibilityLabel:
			accessibilityLabel ?? (typeof children === "string" ? children : label),
		accessibilityHint,
		accessibilityRole: "button",
		hitSlop,
		id: idProp,
	});

	const containerStyle = useMemo(
		() => [
			button.variant[resolvedVariant].container,
			button.size[size].container,
			fullWidth && { alignSelf: "stretch" as const },
			isDisabled && button.disabled.container,
			!label &&
				!children && {
					paddingHorizontal: button.size[size].container.paddingHorizontal / 2,
					width: button.size[size].container.height,
				},
			disableElevation && tokens.shadow.none,
			resolvedVariant === "solid" && { backgroundColor: resolvedColor.main },
			resolvedVariant === "outline" && { borderColor: resolvedColor.main },
			resolvedVariant === "ghost" && {
				backgroundColor: resolvedColor.subtle,
			},
			resolvedVariant === "destructive" && {
				backgroundColor: tokens.color.error.bg,
				borderColor: tokens.color.error.border,
			},
			style,
		],
		[
			button,
			resolvedVariant,
			size,
			fullWidth,
			isDisabled,
			label,
			children,
			disableElevation,
			tokens,
			resolvedColor,
			style,
		],
	);

	const textStyle = useMemo(
		() => [
			button.variant[resolvedVariant].text,
			button.size[size].text,
			{ textAlign: "center" as const },
			resolvedVariant === "solid" && {
				color: resolvedColor.textOn || tokens.color.text.inverse,
			},
			resolvedVariant === "outline" && { color: resolvedColor.main },
			resolvedVariant === "ghost" && { color: resolvedColor.main },
			resolvedVariant === "destructive" && { color: tokens.color.error.text },
			labelStyle,
		],
		[button, resolvedVariant, size, resolvedColor, tokens, labelStyle],
	);

	const resolvedLabelColor = useMemo(() => {
		switch (resolvedVariant) {
			case "solid":
				return resolvedColor.textOn ?? tokens.color.text.inverse;
			case "outline":
			case "ghost":
				return resolvedColor.main;
			case "destructive":
				return tokens.color.error.text;
			default: {
				const _never: never = resolvedVariant;
				throw new Error(`Unexpected button variant: ${_never}`);
			}
		}
	}, [resolvedVariant, resolvedColor, tokens]);

	const iconColor = String(resolvedLabelColor);
	const content = children ?? label;
	const isTextContent =
		typeof content === "string" || typeof content === "number";
	const leading = startIcon ?? leadingIcon;
	const trailing = endIcon ?? trailingIcon;

	const renderIcon = (icon: React.ReactNode) => {
		if (!icon) return null;
		if (
			React.isValidElement<{ size?: number | string; color?: string }>(icon)
		) {
			const explicit = icon.props.color;
			const looksLikeWhite =
				explicit === "white" || explicit === "#fff" || explicit === "#ffffff";
			// Destructive uses a light error surface; a slotted "white" icon is usually a mistake
			// (invisible). Prefer theme contrast color instead.
			const mergedColor =
				resolvedVariant === "destructive" && looksLikeWhite
					? iconColor
					: (explicit ?? iconColor);
			return React.cloneElement(icon, {
				size: icon.props.size ?? iconSize,
				color: mergedColor,
			});
		}
		return icon;
	};

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View
				style={
					[
						containerStyle,
						animatedStyle,
						{ position: "relative" },
					] as StyleProp<ViewStyle>
				}
				{...accessibilityProps}
			>
				<View
					style={[
						styles.contentContainer,
						{
							gap: button.variant[resolvedVariant].container.gap,
							opacity: loading && loadingPosition === "center" ? 0 : 1,
						},
					]}
				>
					{loading &&
						loadingPosition === "start" &&
						(loadingIndicator ?? (
							<ActivityIndicator size="small" color={iconColor} />
						))}
					{renderIcon(leading)}
					{isTextContent ? <Text style={textStyle}>{content}</Text> : content}
					{renderIcon(trailing)}
					{loading &&
						loadingPosition === "end" &&
						(loadingIndicator ?? (
							<ActivityIndicator size="small" color={iconColor} />
						))}
				</View>

				{loading && loadingPosition === "center" && (
					<View style={[StyleSheet.absoluteFill, styles.loadingWrapper]}>
						{loadingIndicator ?? (
							<ActivityIndicator size="small" color={iconColor} />
						)}
					</View>
				)}
			</Animated.View>
		</GestureDetector>
	);
}

export const Button = React.memo(ButtonInner);
Button.displayName = "Button";

const styles = StyleSheet.create({
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingWrapper: {
		alignItems: "center",
		justifyContent: "center",
	},
});
