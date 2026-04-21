import type { SemanticTokens } from "@truongdq01/tokens";
import type { ButtonColor } from "./types";

export type ResolvedButtonPalette = {
	main: string;
	subtle: string;
	textOn: string;
};

/** Maps semantic `color` prop to concrete palette values from theme tokens. */
export function resolveButtonColor(
	color: ButtonColor,
	tokens: SemanticTokens,
): ResolvedButtonPalette {
	const t = tokens.color;
	const map: Record<ButtonColor, ResolvedButtonPalette> = {
		inherit: {
			main: t.text.primary,
			subtle: t.bg.muted,
			textOn: t.text.inverse,
		},
		secondary: {
			main: t.text.secondary,
			subtle: t.bg.muted,
			textOn: t.text.inverse,
		},
		success: {
			main: t.success.icon,
			subtle: t.success.bg,
			textOn: t.text.inverse,
		},
		warning: {
			main: t.warning.icon,
			subtle: t.warning.bg,
			textOn: t.text.inverse,
		},
		error: {
			main: t.error.icon,
			subtle: t.error.bg,
			textOn: t.text.inverse,
		},
		info: {
			main: t.info.icon,
			subtle: t.info.bg,
			textOn: t.text.inverse,
		},
		accent: {
			main: t.accent.default,
			subtle: t.accent.subtle,
			textOn: t.accent.onAccent,
		},
		primary: {
			main: t.brand.default,
			subtle: t.brand.subtle,
			textOn: t.text.inverse,
		},
	};
	return map[color];
}
