import { useId, useTheme } from "@truongdq01/headless";
import type React from "react";
import { memo, useMemo } from "react";
import { Image, Text, View, type ViewStyle } from "react-native";

// ─── Types ────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
	/** Unique identifier */
	id?: string;
	/** Image URI */
	src?: string;
	/** Fallback initials if no src */
	initials?: string;
	/** Fallback when no src and no initials */
	fallbackIcon?: React.ReactNode;
	size?: AvatarSize;
	status?: AvatarStatus;
	shape?: "circle" | "rounded";
	/** Accessible label */
	accessibilityLabel?: string;
	style?: ViewStyle | ViewStyle[];
}

const STATUS_COLORS: Record<AvatarStatus, string> = {
	online: "#22C55E",
	offline: "#9CA3AF",
	busy: "#EF4444",
	away: "#F59E0B",
};

const STATUS_DOT_SIZE: Record<AvatarSize, number> = {
	xs: 6,
	sm: 8,
	md: 10,
	lg: 12,
	xl: 14,
	"2xl": 16,
};

// Deterministic color from initials string
const BG_PALETTE = [
	"#EEEDFE", // purple-50
	"#E1F5EE", // teal-50
	"#FAECE7", // coral-50
	"#FBEAF0", // pink-50
	"#EAF3DE", // green-50
	"#FAEEDA", // amber-50
	"#E6F1FB", // blue-50
];
const TEXT_PALETTE = [
	"#3C3489",
	"#085041",
	"#712B13",
	"#72243E",
	"#27500A",
	"#633806",
	"#0C447C",
];

const colorIndexCache = new Map<string, number>();

function getColorIndex(str: string): number {
	const cached = colorIndexCache.get(str);
	if (cached !== undefined) return cached;
	let hash = 0;
	for (let i = 0; i < str.length; i++)
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	const result = Math.abs(hash) % BG_PALETTE.length;
	colorIndexCache.set(str, result);
	return result;
}

// ─── Avatar ───────────────────────────────────────────────────────

function AvatarInner({
	id: idProp,
	src,
	initials,
	fallbackIcon,
	size = "md",
	status,
	shape = "circle",
	accessibilityLabel,
	style,
}: AvatarProps) {
	const id = useId(idProp, "avatar");
	const {
		components: { avatar },
		tokens,
	} = useTheme();
	const sizeConfig = avatar.size[size];
	const radius =
		shape === "circle" ? sizeConfig.borderRadius : tokens.radius.md;
	const colorIdx = initials ? getColorIndex(initials) : 0;

	const dotSize = status ? STATUS_DOT_SIZE[size] : 0;

	const initialsText = useMemo(
		() => (initials ? initials.slice(0, 2).toUpperCase() : ""),
		[initials],
	);

	const frameStyle = useMemo(
		() => ({
			width: sizeConfig.width,
			height: sizeConfig.height,
			borderRadius: radius,
		}),
		[sizeConfig.width, sizeConfig.height, radius],
	);

	const initialsBgStyle = useMemo(
		() => ({
			...frameStyle,
			backgroundColor: BG_PALETTE[colorIdx],
			alignItems: avatar.container.alignItems,
			justifyContent: avatar.container.justifyContent,
		}),
		[
			frameStyle,
			colorIdx,
			avatar.container.alignItems,
			avatar.container.justifyContent,
		],
	);

	const initialsTextStyle = useMemo(
		() => ({
			fontSize: sizeConfig.fontSize,
			fontWeight: avatar.text.fontWeight,
			color: TEXT_PALETTE[colorIdx],
			letterSpacing: 0.5,
		}),
		[sizeConfig.fontSize, colorIdx, avatar.text.fontWeight],
	);

	const fallbackShellStyle = useMemo(
		() => ({
			...frameStyle,
			backgroundColor: avatar.container.backgroundColor,
			alignItems: avatar.container.alignItems,
			justifyContent: avatar.container.justifyContent,
		}),
		[
			frameStyle,
			avatar.container.backgroundColor,
			avatar.container.alignItems,
			avatar.container.justifyContent,
		],
	);

	return (
		<View
			nativeID={id}
			style={[{ width: sizeConfig.width, height: sizeConfig.height }, style]}
			accessible={!!accessibilityLabel}
			accessibilityLabel={accessibilityLabel}
		>
			{src ? (
				<Image
					source={{ uri: src }}
					style={frameStyle}
					accessibilityLabel={accessibilityLabel}
					accessibilityRole="image"
				/>
			) : initials ? (
				<View style={initialsBgStyle}>
					<Text style={initialsTextStyle}>{initialsText}</Text>
				</View>
			) : (
				<View style={fallbackShellStyle}>
					{fallbackIcon ?? (
						<Text
							style={{
								fontSize: sizeConfig.fontSize,
								color: tokens.color.text.tertiary,
							}}
						>
							?
						</Text>
					)}
				</View>
			)}

			{status && (
				<View
					style={{
						position: "absolute",
						bottom: 0,
						right: 0,
						width: dotSize,
						height: dotSize,
						borderRadius: dotSize / 2,
						backgroundColor: STATUS_COLORS[status],
						borderWidth: avatar.presence.borderWidth,
						borderColor: avatar.presence.borderColor,
					}}
				/>
			)}
		</View>
	);
}

export const Avatar = memo(AvatarInner);
Avatar.displayName = "Avatar";

// ─── AvatarGroup ──────────────────────────────────────────────────

export interface AvatarGroupProps {
	id?: string;
	avatars: AvatarProps[];
	max?: number;
	size?: AvatarSize;
	overlap?: number;
}

function AvatarGroupInner({
	id: idProp,
	avatars,
	max = 4,
	size = "md",
	overlap,
}: AvatarGroupProps) {
	const id = useId(idProp, "avatar-group");
	const {
		components: { avatar: avatarTokens },
		tokens,
	} = useTheme();
	const sizeConfig = avatarTokens.size[size];
	const dim = sizeConfig.width;
	const gap = overlap ?? Math.round(dim * 0.3);

	const visible = avatars.slice(0, max);
	const overflow = avatars.length - max;

	return (
		<View
			nativeID={id}
			style={{
				flexDirection: "row",
				alignItems: "center",
				width:
					visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
				height: dim,
			}}
		>
			{visible.map((avatar, i) => (
				<View
					key={
						avatar.id ?? `${avatar.src ?? ""}-${avatar.initials ?? "x"}-${i}`
					}
					style={{
						position: "absolute",
						left: i * (dim - gap),
						zIndex: visible.length - i,
						borderWidth: avatarTokens.presence.borderWidth,
						borderColor: avatarTokens.presence.borderColor,
						borderRadius: dim / 2 + 2,
					}}
				>
					<Avatar {...avatar} size={size} />
				</View>
			))}

			{overflow > 0 && (
				<View
					style={{
						position: "absolute",
						left: visible.length * (dim - gap),
						width: dim,
						height: dim,
						borderRadius: dim / 2,
						backgroundColor: avatarTokens.container.backgroundColor,
						alignItems: avatarTokens.container.alignItems,
						justifyContent: avatarTokens.container.justifyContent,
						borderWidth: avatarTokens.presence.borderWidth,
						borderColor: avatarTokens.presence.borderColor,
						zIndex: 0,
					}}
				>
					<Text
						style={{
							fontSize: sizeConfig.fontSize,
							color: tokens.color.text.secondary,
							fontWeight: avatarTokens.text.fontWeight,
						}}
					>
						+{overflow}
					</Text>
				</View>
			)}
		</View>
	);
}

export const AvatarGroup = memo(AvatarGroupInner);
AvatarGroup.displayName = "AvatarGroup";
