import React from "react";

const Svg = ({ children, ...props }: any) =>
	React.createElement("Svg", props, children);

export default Svg;
export {
	Svg,
	Circle: Svg,
	Path: Svg,
	Rect: Svg,
	G: Svg,
	Line: Svg,
	Polygon: Svg,
	Polyline: Svg,
	Defs: Svg,
	LinearGradient: Svg,
	RadialGradient: Svg,
	Stop: Svg,
	ClipPath: Svg,
};

export const Touchable = { Mixin: {} };
