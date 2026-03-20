"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollHeader = useScrollHeader;
const react_native_reanimated_1 = require("react-native-reanimated");
function useScrollHeader({ headerMaxHeight, headerMinHeight }) {
    const scrollY = (0, react_native_reanimated_1.useSharedValue)(0);
    const scrollHandler = (0, react_native_reanimated_1.useAnimatedScrollHandler)({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });
    const scrollDistance = headerMaxHeight - headerMinHeight;
    // Header container style (collapses from max to min)
    const headerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const height = (0, react_native_reanimated_1.interpolate)(scrollY.value, [0, scrollDistance], [headerMaxHeight, headerMinHeight], react_native_reanimated_1.Extrapolation.CLAMP);
        return { height };
    });
    // Image parallax effect (moves up slightly slower than the scroll, and scales up when pulling down)
    const imageStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const translateY = (0, react_native_reanimated_1.interpolate)(scrollY.value, [-headerMaxHeight, 0, scrollDistance], [-headerMaxHeight / 2, 0, scrollDistance * 0.5], // Moves at half speed relative to scroll
        react_native_reanimated_1.Extrapolation.CLAMP);
        const scale = (0, react_native_reanimated_1.interpolate)(scrollY.value, [-headerMaxHeight, 0], [2, 1], { extrapolateLeft: react_native_reanimated_1.Extrapolation.EXTEND, extrapolateRight: react_native_reanimated_1.Extrapolation.CLAMP });
        return {
            transform: [{ translateY }, { scale }],
        };
    });
    // Header Title style (fades in as header collapses)
    const titleStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(scrollY.value, [scrollDistance * 0.6, scrollDistance * 0.9], [0, 1], react_native_reanimated_1.Extrapolation.CLAMP);
        const translateY = (0, react_native_reanimated_1.interpolate)(scrollY.value, [scrollDistance * 0.6, scrollDistance], [10, 0], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            opacity,
            transform: [{ translateY }],
        };
    });
    // Useful for blending backgrounds or top navigation color
    const headerBgStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(scrollY.value, [0, scrollDistance], [0, 1], react_native_reanimated_1.Extrapolation.CLAMP);
        return { opacity };
    });
    return {
        scrollY,
        scrollHandler,
        headerStyle,
        imageStyle,
        titleStyle,
        headerBgStyle,
    };
}
//# sourceMappingURL=useScrollHeader.js.map