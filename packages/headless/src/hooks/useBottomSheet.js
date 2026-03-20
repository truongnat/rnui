"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBottomSheet = useBottomSheet;
const react_1 = require("react");
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_worklets_1 = require("react-native-worklets");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_1 = require("react-native");
const tokens_1 = require("@rnui/tokens");
// ─── Helpers ─────────────────────────────────────────────────────
const SCREEN_HEIGHT = react_native_1.Dimensions.get("window").height;
function resolveSnapPoint(point) {
    if (typeof point === "number")
        return point;
    const pct = parseFloat(point) / 100;
    return SCREEN_HEIGHT * pct;
}
// ─── Hook ─────────────────────────────────────────────────────────
function useBottomSheet({ snapPoints: rawSnapPoints = ["50%"], initialSnapIndex, onClose, onSnapChange, enableDismissOnSwipe = true, enableBackdrop = true, } = {}) {
    const snapPoints = rawSnapPoints.map(resolveSnapPoint);
    const defaultSnapIndex = initialSnapIndex ?? snapPoints.length - 1;
    const isOpenRef = (0, react_1.useRef)(false);
    const currentIndexRef = (0, react_1.useRef)(defaultSnapIndex);
    // translateY: 0 = fully visible at snap, SCREEN_HEIGHT = hidden below screen
    const translateY = (0, react_native_reanimated_1.useSharedValue)(SCREEN_HEIGHT);
    const backdropOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const dragStartY = (0, react_native_reanimated_1.useSharedValue)(0);
    const gentleSpring = tokens_1.spring.gentle;
    // ── Animate to snap ──────────────────────────────────────────
    const animateToSnap = (0, react_1.useCallback)((index, onDone) => {
        "worklet";
        const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
        const targetY = SCREEN_HEIGHT - targetHeight;
        translateY.value = (0, react_native_reanimated_1.withSpring)(targetY, gentleSpring, (finished) => {
            if (finished && onDone)
                (0, react_native_worklets_1.scheduleOnRN)(onDone);
        });
        // Backdrop opacity: 0 when closed, 1 at highest snap point
        const maxHeight = Math.max(...snapPoints);
        backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(enableBackdrop ? targetHeight / maxHeight * 0.6 : 0, { duration: 250 });
    }, [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]);
    // ── JS-thread open/close/snap ────────────────────────────────
    const open = (0, react_1.useCallback)((snapIndex) => {
        const idx = snapIndex ?? defaultSnapIndex;
        isOpenRef.current = true;
        currentIndexRef.current = idx;
        const targetHeight = snapPoints[idx] ?? snapPoints[snapPoints.length - 1];
        const targetY = SCREEN_HEIGHT - targetHeight;
        if (typeof targetY !== 'number' || isNaN(targetY)) {
            console.warn("Invalid targetY calculated for open:", targetY);
            return;
        }
        translateY.value = (0, react_native_reanimated_1.withSpring)(targetY, gentleSpring);
        const maxHeight = Math.max(...snapPoints);
        backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(enableBackdrop ? (targetHeight / maxHeight) * 0.6 : 0, { duration: 250 });
        onSnapChange?.(idx);
    }, [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]);
    const handleCloseEnd = (0, react_1.useCallback)(() => {
        isOpenRef.current = false;
        onClose?.();
    }, [onClose]);
    const close = (0, react_1.useCallback)(() => {
        translateY.value = (0, react_native_reanimated_1.withSpring)(SCREEN_HEIGHT, gentleSpring, (finished) => {
            if (finished) {
                (0, react_native_worklets_1.scheduleOnRN)(handleCloseEnd);
            }
        });
        backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(0, { duration: 200 });
    }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);
    const snapTo = (0, react_1.useCallback)((index) => {
        if (index < 0 || index >= snapPoints.length)
            return;
        currentIndexRef.current = index;
        const targetHeight = snapPoints[index];
        const targetY = SCREEN_HEIGHT - targetHeight;
        if (typeof targetY !== 'number' || isNaN(targetY)) {
            console.warn("Invalid targetY calculated for snapTo:", targetY);
            return;
        }
        translateY.value = (0, react_native_reanimated_1.withSpring)(targetY, gentleSpring);
        const maxHeight = Math.max(...snapPoints);
        backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(enableBackdrop ? (targetHeight / maxHeight) * 0.6 : 0, { duration: 200 });
        onSnapChange?.(index);
    }, [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]);
    // ── Pan gesture (UI thread) ──────────────────────────────────
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .onStart(() => {
        "worklet";
        dragStartY.value = translateY.value;
    })
        .onUpdate((e) => {
        "worklet";
        const next = dragStartY.value + e.translationY;
        // Resistance above highest snap point
        const minY = SCREEN_HEIGHT - Math.max(...snapPoints);
        if (next < minY) {
            translateY.value = minY + (next - minY) * 0.15;
        }
        else {
            translateY.value = next;
        }
        const currentHeight = SCREEN_HEIGHT - translateY.value;
        const maxHeight = Math.max(...snapPoints);
        backdropOpacity.value = enableBackdrop
            ? Math.max(0, (currentHeight / maxHeight) * 0.6)
            : 0;
    })
        .onEnd((e) => {
        "worklet";
        const velocity = e.velocityY;
        const currentHeight = SCREEN_HEIGHT - translateY.value;
        // Fast downward flick → dismiss or snap to lower
        if (velocity > 800 && enableDismissOnSwipe) {
            (0, react_native_worklets_1.scheduleOnRN)(close);
            return;
        }
        // Find nearest snap point
        let bestIndex = 0;
        let bestDist = Infinity;
        for (let i = 0; i < snapPoints.length; i++) {
            const dist = Math.abs(snapPoints[i] - currentHeight);
            if (dist < bestDist) {
                bestDist = dist;
                bestIndex = i;
            }
        }
        (0, react_native_worklets_1.scheduleOnRN)(snapTo, bestIndex);
    });
    // ── Backdrop tap ─────────────────────────────────────────────
    const backdropTapGesture = react_native_gesture_handler_1.Gesture.Tap().onEnd(() => {
        "worklet";
        (0, react_native_worklets_1.scheduleOnRN)(close);
    });
    // ── Animated styles ──────────────────────────────────────────
    const sheetAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateY: translateY.value }],
    }));
    const backdropAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: backdropOpacity.value,
        pointerEvents: backdropOpacity.value > 0 ? "auto" : "none",
    }));
    return {
        isOpen: isOpenRef.current,
        open,
        close,
        snapTo,
        currentSnapIndex: currentIndexRef.current,
        sheetAnimatedStyle,
        backdropAnimatedStyle,
        panGesture,
        backdropTapGesture,
    };
}
//# sourceMappingURL=useBottomSheet.js.map