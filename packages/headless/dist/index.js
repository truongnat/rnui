"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ThemeProvider: () => ThemeProvider,
  createTheme: () => createTheme,
  dismissAllToasts: () => dismissAllToasts,
  dismissToast: () => dismissToast,
  focusRingAnimation: () => import_tokens2.focusRingAnimation,
  heroTransition: () => heroTransition,
  motionEasing: () => motionEasing,
  motionPresets: () => motionPresets,
  showToast: () => showToast,
  timingPreset: () => import_tokens2.timingPreset,
  useAccordion: () => useAccordion,
  useActiveBrand: () => useActiveBrand,
  useAlert: () => useAlert,
  useAutocomplete: () => useAutocomplete,
  useBottomNavigation: () => useBottomNavigation,
  useBottomSheet: () => useBottomSheet,
  useBrandSwitch: () => useBrandSwitch,
  useCarousel: () => useCarousel,
  useCheckbox: () => useCheckbox,
  useComponentTokens: () => useComponentTokens,
  useDisclosure: () => useDisclosure,
  useDrawer: () => useDrawer,
  useField: () => useField,
  useIconStyle: () => useIconStyle,
  useIsDark: () => useIsDark,
  useListItem: () => useListItem,
  useMemoStyles: () => useMemoStyles,
  useMenu: () => useMenu,
  useModal: () => useModal,
  useOTPInput: () => useOTPInput,
  usePagination: () => usePagination,
  usePressable: () => usePressable,
  useRadioGroup: () => useRadioGroup,
  useRating: () => useRating,
  useScrollHeader: () => useScrollHeader,
  useSegmentedControl: () => useSegmentedControl,
  useSelect: () => useSelect,
  useSlider: () => useSlider,
  useStepper: () => useStepper,
  useSwitch: () => useSwitch,
  useTable: () => useTable,
  useTabs: () => useTabs,
  useTheme: () => useTheme,
  useToast: () => useToast,
  useToggleGroup: () => useToggleGroup,
  useTokens: () => useTokens
});
module.exports = __toCommonJS(index_exports);

// src/theme.tsx
var import_react = __toESM(require("react"));
var import_react_native = require("react-native");
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_tokens = require("@truongdq01/tokens");
function createTheme(override) {
  return override;
}
var ThemeContext = (0, import_react.createContext)(null);
function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  brand: initialBrand,
  override
}) {
  const systemScheme = (0, import_react_native.useColorScheme)();
  const [manualScheme, setManualScheme] = import_react.default.useState(forcedScheme);
  const [activeBrand, setActiveBrand] = import_react.default.useState(initialBrand);
  const activeScheme = manualScheme === "system" ? systemScheme === "dark" ? "dark" : "light" : manualScheme;
  const theme = (0, import_react.useMemo)(() => {
    let tokens = activeBrand ? (0, import_tokens.buildSemanticTokens)(activeBrand, activeScheme) : import_tokens.semanticTokens[activeScheme];
    if (override?.[activeScheme]) {
      tokens = deepMerge(tokens, override[activeScheme]);
    }
    const components = (0, import_tokens.resolveComponentTokens)(tokens);
    return {
      tokens,
      components,
      colorScheme: activeScheme,
      brand: activeBrand,
      setColorScheme: setManualScheme,
      setBrand: setActiveBrand
    };
  }, [activeScheme, activeBrand, override]);
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_gesture_handler.GestureHandlerRootView, { style: { flex: 1 } }, /* @__PURE__ */ import_react.default.createElement(ThemeContext.Provider, { value: theme }, children));
}
function useTheme() {
  const ctx = (0, import_react.useContext)(ThemeContext);
  if (!ctx) {
    throw new Error(
      "[RNUI] useTheme must be used inside <ThemeProvider>. Wrap your app root with <ThemeProvider>."
    );
  }
  return ctx;
}
function useTokens() {
  return useTheme().tokens;
}
function useComponentTokens() {
  return useTheme().components;
}
function useIsDark() {
  return useTheme().colorScheme === "dark";
}
function useActiveBrand() {
  return useTheme().brand;
}
function useBrandSwitch() {
  return useTheme().setBrand;
}
function deepMerge(base, override) {
  const result = { ...base };
  for (const key in override) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (overrideVal !== void 0 && typeof overrideVal === "object" && !Array.isArray(overrideVal) && baseVal !== null && typeof baseVal === "object") {
      result[key] = deepMerge(
        baseVal,
        overrideVal
      );
    } else if (overrideVal !== void 0) {
      result[key] = overrideVal;
    }
  }
  return result;
}

// src/motion.ts
var import_react_native_reanimated = require("react-native-reanimated");
var import_react_native_reanimated2 = require("react-native-reanimated");
var import_tokens2 = require("@truongdq01/tokens");
var motionPresets = {
  enter: {
    fadeUp: import_react_native_reanimated2.FadeInUp,
    fadeDown: import_react_native_reanimated2.FadeInDown,
    fadeIn: import_react_native_reanimated2.FadeIn,
    scaleIn: import_react_native_reanimated2.ZoomIn,
    slideFromBottom: import_react_native_reanimated2.SlideInDown,
    slideFromTop: import_react_native_reanimated2.SlideInUp,
    slideFromRight: import_react_native_reanimated2.SlideInRight
  },
  exit: {
    fadeDown: import_react_native_reanimated2.FadeOutDown,
    fadeUp: import_react_native_reanimated2.FadeOutUp,
    fadeOut: import_react_native_reanimated2.FadeOut,
    scaleOut: import_react_native_reanimated2.ZoomOut,
    slideToBottom: import_react_native_reanimated2.SlideOutDown,
    slideToTop: import_react_native_reanimated2.SlideOutUp,
    slideToRight: import_react_native_reanimated2.SlideOutRight
  }
};
var motionEasing = {
  easeIn: import_react_native_reanimated.Easing.bezier(0.4, 0, 1, 1),
  easeOut: import_react_native_reanimated.Easing.bezier(0, 0, 0.2, 1),
  easeInOut: import_react_native_reanimated.Easing.bezier(0.4, 0, 0.2, 1),
  linear: import_react_native_reanimated.Easing.linear
};
var heroTransition = import_react_native_reanimated.SharedTransition && import_react_native_reanimated.SharedTransition.custom ? import_react_native_reanimated.SharedTransition.custom((values) => {
  "worklet";
  return {
    height: (0, import_react_native_reanimated.withSpring)(values.targetHeight, import_tokens2.spring.snappy),
    width: (0, import_react_native_reanimated.withSpring)(values.targetWidth, import_tokens2.spring.snappy),
    originX: (0, import_react_native_reanimated.withSpring)(values.targetGlobalOriginX, import_tokens2.spring.snappy),
    originY: (0, import_react_native_reanimated.withSpring)(values.targetGlobalOriginY, import_tokens2.spring.snappy)
  };
}) : null;

// src/hooks/usePressable.ts
var import_react2 = require("react");
var import_react_native_reanimated3 = require("react-native-reanimated");
var import_react_native_worklets = require("react-native-worklets");
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var import_react_native2 = require("react-native");
var import_tokens3 = require("@truongdq01/tokens");
function usePressable({
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  disabled = false,
  feedbackMode = "scale",
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  haptic = false,
  hitSlop
} = {}) {
  const [isPressed, setIsPressed] = (0, import_react2.useState)(false);
  const scale = (0, import_react_native_reanimated3.useSharedValue)(1);
  const opacity = (0, import_react_native_reanimated3.useSharedValue)(1);
  const handlePress = (0, import_react2.useCallback)(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("light");
    onPress?.();
  }, [disabled, haptic, onPress]);
  const handleLongPress = (0, import_react2.useCallback)(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("medium");
    onLongPress?.();
  }, [disabled, haptic, onLongPress]);
  const setPressedState = (0, import_react2.useCallback)((pressed) => {
    setIsPressed(pressed);
  }, []);
  const animatedStyle = (0, import_react_native_reanimated3.useAnimatedStyle)(() => {
    if (feedbackMode === "opacity") {
      return { opacity: opacity.value };
    }
    if (feedbackMode === "none") {
      return {};
    }
    return { transform: [{ scale: scale.value }] };
  });
  const scaleDownPressed = import_tokens3.pressFeedback.scaleDown.pressed;
  const scaleSubtlePressed = import_tokens3.pressFeedback.scaleDownSubtle.pressed;
  const opacityOnlyPressed = import_tokens3.pressFeedback.opacityOnly.pressed;
  const snappySpring = import_tokens3.spring.snappy;
  const tapGesture = import_react_native_gesture_handler2.Gesture.Tap().enabled(!disabled).hitSlop(hitSlop ?? 0).onBegin(() => {
    "worklet";
    (0, import_react_native_reanimated3.runOnJS)(setPressedState)(true);
    if (feedbackMode === "scale") {
      scale.value = (0, import_react_native_reanimated3.withSpring)(scaleDownPressed, snappySpring);
    } else if (feedbackMode === "scaleSubtle") {
      scale.value = (0, import_react_native_reanimated3.withSpring)(scaleSubtlePressed, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = (0, import_react_native_reanimated3.withTiming)(opacityOnlyPressed, { duration: 60 });
    }
  }).onFinalize((_event, success) => {
    "worklet";
    (0, import_react_native_reanimated3.runOnJS)(setPressedState)(false);
    if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
      scale.value = (0, import_react_native_reanimated3.withSpring)(1, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = (0, import_react_native_reanimated3.withTiming)(1, { duration: 100 });
    }
    if (success) {
      (0, import_react_native_worklets.scheduleOnRN)(handlePress);
    }
  });
  const longPressGesture = import_react_native_gesture_handler2.Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(longPressMinDuration).onStart(() => {
    "worklet";
    (0, import_react_native_worklets.scheduleOnRN)(handleLongPress);
  });
  const gesture = import_react_native_gesture_handler2.Gesture.Simultaneous(tapGesture, longPressGesture);
  const accessibilityProps = {
    accessible: true,
    accessibilityRole,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState: { disabled }
  };
  return {
    animatedStyle,
    gesture,
    accessibilityProps,
    isPressed
  };
}
function triggerHaptic(type) {
  try {
    const Haptics = require("expo-haptics");
    const map = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy
    };
    Haptics.impactAsync(map[type]);
    return;
  } catch {
  }
  try {
    const HapticFeedback = require("react-native-haptic-feedback").default;
    HapticFeedback.trigger(
      import_react_native2.Platform.OS === "ios" ? "impactLight" : "notificationSuccess",
      { enableVibrateFallback: true, ignoreAndroidSystemSettings: false }
    );
  } catch {
  }
}

// src/hooks/useDisclosure.ts
var import_react3 = require("react");
function useDisclosure({
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpen,
  onClose
} = {}) {
  const [internalOpen, setInternalOpen] = (0, import_react3.useState)(defaultOpen);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const open = (0, import_react3.useCallback)(() => {
    if (controlledOpen === void 0) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);
  const close = (0, import_react3.useCallback)(() => {
    if (controlledOpen === void 0) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);
  const toggle = (0, import_react3.useCallback)(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);
  return {
    isOpen,
    open,
    close,
    toggle,
    triggerProps: {
      onPress: toggle,
      accessibilityState: { expanded: isOpen }
    },
    contentProps: {
      accessibilityViewIsModal: isOpen
    }
  };
}

// src/hooks/useField.ts
var import_react4 = require("react");
function useField({
  defaultValue,
  validate,
  validateOnChange = false
}) {
  const [value, setValue] = (0, import_react4.useState)(defaultValue);
  const [error, setError] = (0, import_react4.useState)(void 0);
  const [touched, setTouched] = (0, import_react4.useState)(false);
  const [isValidating, setIsValidating] = (0, import_react4.useState)(false);
  const runValidation = (0, import_react4.useCallback)(
    async (val) => {
      if (!validate) return;
      setIsValidating(true);
      try {
        const result = await validate(val);
        setError(result);
        return result;
      } catch {
        const errorMsg = "Validation failed";
        setError(errorMsg);
        return errorMsg;
      } finally {
        setIsValidating(false);
      }
    },
    [validate]
  );
  const onChange = (0, import_react4.useCallback)(
    (val) => {
      setValue(val);
      if (validateOnChange && touched) {
        runValidation(val);
      } else if (error) {
        setError(void 0);
      }
    },
    [validateOnChange, touched, error, runValidation]
  );
  const onBlur = (0, import_react4.useCallback)(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);
  const reset = (0, import_react4.useCallback)(() => {
    setValue(defaultValue);
    setError(void 0);
    setTouched(false);
    setIsValidating(false);
  }, [defaultValue]);
  return {
    value,
    error,
    touched,
    isValidating,
    onChange,
    onBlur,
    reset,
    setError,
    validate: () => runValidation(value),
    inputProps: {
      value: String(value),
      onChangeText: (text) => onChange(text),
      onBlur
    }
  };
}

// src/hooks/useToast.ts
var import_react5 = require("react");
var store = {
  queue: [],
  listeners: /* @__PURE__ */ new Set()
};
function notify() {
  store.listeners.forEach((l) => l());
}
function getSnapshot() {
  return store.queue;
}
function subscribe(listener) {
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
}
var _idCounter = 0;
function showToast(options) {
  const id = `toast-${++_idCounter}`;
  const item = {
    id,
    message: options.message,
    variant: options.variant ?? "default",
    duration: options.duration ?? 3500,
    persistent: options.persistent ?? false,
    action: options.action,
    icon: options.icon
  };
  store.queue = [...store.queue.slice(-2), item];
  notify();
  return id;
}
function dismissToast(id) {
  store.queue = store.queue.filter((t) => t.id !== id);
  notify();
}
function dismissAllToasts() {
  store.queue = [];
  notify();
}
function useToast() {
  const toasts = (0, import_react5.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
  const show = (0, import_react5.useCallback)((options) => showToast(options), []);
  const dismiss = (0, import_react5.useCallback)((id) => dismissToast(id), []);
  const dismissAll = (0, import_react5.useCallback)(() => dismissAllToasts(), []);
  const success = (0, import_react5.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "success" }),
    []
  );
  const error = (0, import_react5.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "error" }),
    []
  );
  const warning = (0, import_react5.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "warning" }),
    []
  );
  const info = (0, import_react5.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "info" }),
    []
  );
  return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}

// src/hooks/useBottomSheet.ts
var import_react6 = require("react");
var import_react_native_reanimated4 = require("react-native-reanimated");
var import_react_native_worklets2 = require("react-native-worklets");
var import_react_native_gesture_handler3 = require("react-native-gesture-handler");
var import_react_native3 = require("react-native");
var import_tokens4 = require("@truongdq01/tokens");
var SCREEN_HEIGHT = import_react_native3.Dimensions.get("window").height;
function resolveSnapPoint(point) {
  if (typeof point === "number") return point;
  const pct = parseFloat(point) / 100;
  return SCREEN_HEIGHT * pct;
}
function useBottomSheet({
  snapPoints: rawSnapPoints = ["50%"],
  initialSnapIndex,
  onClose,
  onSnapChange,
  enableDismissOnSwipe = true,
  enableBackdrop = true
} = {}) {
  const snapPoints = rawSnapPoints.map(resolveSnapPoint);
  const defaultSnapIndex = initialSnapIndex ?? snapPoints.length - 1;
  const isOpenRef = (0, import_react6.useRef)(false);
  const currentIndexRef = (0, import_react6.useRef)(defaultSnapIndex);
  const translateY = (0, import_react_native_reanimated4.useSharedValue)(SCREEN_HEIGHT);
  const backdropOpacity = (0, import_react_native_reanimated4.useSharedValue)(0);
  const dragStartY = (0, import_react_native_reanimated4.useSharedValue)(0);
  const gentleSpring = import_tokens4.spring.gentle;
  const animateToSnap = (0, import_react6.useCallback)(
    (index, onDone) => {
      "worklet";
      const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = (0, import_react_native_reanimated4.withSpring)(targetY, gentleSpring, (finished) => {
        if (finished && onDone) (0, import_react_native_worklets2.scheduleOnRN)(onDone);
      });
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]
  );
  const open = (0, import_react6.useCallback)(
    (snapIndex) => {
      const idx = snapIndex ?? defaultSnapIndex;
      isOpenRef.current = true;
      currentIndexRef.current = idx;
      const targetHeight = snapPoints[idx] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== "number" || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for open:", targetY);
        return;
      }
      translateY.value = (0, import_react_native_reanimated4.withSpring)(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const handleCloseEnd = (0, import_react6.useCallback)(() => {
    isOpenRef.current = false;
    onClose?.();
  }, [onClose]);
  const close = (0, import_react6.useCallback)(() => {
    translateY.value = (0, import_react_native_reanimated4.withSpring)(SCREEN_HEIGHT, gentleSpring, (finished) => {
      if (finished) {
        (0, import_react_native_worklets2.scheduleOnRN)(handleCloseEnd);
      }
    });
    backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(0, { duration: 200 });
  }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);
  const snapTo = (0, import_react6.useCallback)(
    (index) => {
      if (index < 0 || index >= snapPoints.length) return;
      currentIndexRef.current = index;
      const targetHeight = snapPoints[index];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== "number" || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for snapTo:", targetY);
        return;
      }
      translateY.value = (0, import_react_native_reanimated4.withSpring)(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const panGesture = import_react_native_gesture_handler3.Gesture.Pan().onStart(() => {
    "worklet";
    dragStartY.value = translateY.value;
  }).onUpdate((e) => {
    "worklet";
    const next = dragStartY.value + e.translationY;
    const minY = SCREEN_HEIGHT - Math.max(...snapPoints);
    if (next < minY) {
      translateY.value = minY + (next - minY) * 0.15;
    } else {
      translateY.value = next;
    }
    const currentHeight = SCREEN_HEIGHT - translateY.value;
    const maxHeight = Math.max(...snapPoints);
    backdropOpacity.value = enableBackdrop ? Math.max(0, currentHeight / maxHeight * 0.6) : 0;
  }).onEnd((e) => {
    "worklet";
    const velocity = e.velocityY;
    const currentHeight = SCREEN_HEIGHT - translateY.value;
    if (velocity > 800 && enableDismissOnSwipe) {
      (0, import_react_native_worklets2.scheduleOnRN)(close);
      return;
    }
    let bestIndex = 0;
    let bestDist = Infinity;
    for (let i = 0; i < snapPoints.length; i++) {
      const dist = Math.abs(snapPoints[i] - currentHeight);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }
    (0, import_react_native_worklets2.scheduleOnRN)(snapTo, bestIndex);
  });
  const backdropTapGesture = import_react_native_gesture_handler3.Gesture.Tap().onEnd(() => {
    "worklet";
    (0, import_react_native_worklets2.scheduleOnRN)(close);
  });
  const sheetAnimatedStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  const backdropAnimatedStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? "auto" : "none"
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
    backdropTapGesture
  };
}

// src/hooks/useCheckbox.ts
var import_react7 = require("react");
function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false
} = {}) {
  const [internalChecked, setInternalChecked] = (0, import_react7.useState)(defaultChecked);
  const isChecked = controlledChecked !== void 0 ? controlledChecked : internalChecked;
  const toggle = (0, import_react7.useCallback)(() => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === void 0) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, controlledChecked, onChange]);
  return {
    isChecked,
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "checkbox",
      accessibilityState: {
        checked: indeterminate ? "mixed" : isChecked,
        disabled
      }
    }
  };
}

// src/hooks/useSwitch.ts
var import_react8 = require("react");
function useSwitch({
  defaultOn = false,
  on: controlledOn,
  onChange,
  disabled = false
} = {}) {
  const [internalOn, setInternalOn] = (0, import_react8.useState)(defaultOn);
  const isOn = controlledOn !== void 0 ? controlledOn : internalOn;
  const toggle = (0, import_react8.useCallback)(() => {
    if (disabled) return;
    const next = !isOn;
    if (controlledOn === void 0) setInternalOn(next);
    onChange?.(next);
  }, [disabled, isOn, controlledOn, onChange]);
  return {
    isOn,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "switch",
      accessibilityState: { checked: isOn, disabled }
    }
  };
}

// src/hooks/useSelect.ts
var import_react9 = require("react");
function useSelect({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  multiple = false,
  disabled = false,
  placeholder = "Select\u2026"
}) {
  const [internalValue, setInternalValue] = (0, import_react9.useState)(defaultValue);
  const disclosure = useDisclosure();
  const selected = controlledValue !== void 0 ? controlledValue : internalValue;
  const selectOption = (0, import_react9.useCallback)(
    (val) => {
      if (disabled) return;
      let next;
      if (multiple) {
        const arr = Array.isArray(selected) ? selected : [];
        next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
      } else {
        next = val;
        disclosure.close();
      }
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, multiple, selected, controlledValue, onChange, disclosure]
  );
  const clearSelection = (0, import_react9.useCallback)(() => {
    const next = multiple ? [] : void 0;
    if (controlledValue === void 0) setInternalValue(next);
    if (next !== void 0) onChange?.(next);
  }, [multiple, controlledValue, onChange]);
  const isSelected = (0, import_react9.useCallback)(
    (val) => {
      if (!selected) return false;
      if (Array.isArray(selected)) return selected.includes(val);
      return selected === val;
    },
    [selected]
  );
  const displayLabel = (() => {
    if (!selected || Array.isArray(selected) && selected.length === 0) return placeholder;
    if (Array.isArray(selected)) {
      const labels = selected.map((v) => options.find((o) => o.value === v)?.label).filter(Boolean);
      return labels.join(", ");
    }
    return options.find((o) => o.value === selected)?.label ?? placeholder;
  })();
  return {
    selected,
    isOpen: disclosure.isOpen,
    open: disclosure.open,
    close: disclosure.close,
    toggle: disclosure.toggle,
    selectOption,
    clearSelection,
    isSelected,
    displayLabel,
    triggerProps: {
      onPress: disabled ? () => {
      } : disclosure.toggle,
      accessibilityState: { expanded: disclosure.isOpen, disabled }
    }
  };
}

// src/hooks/useScrollHeader.ts
var import_react_native_reanimated5 = require("react-native-reanimated");
function useScrollHeader({ headerMaxHeight, headerMinHeight }) {
  const scrollY = (0, import_react_native_reanimated5.useSharedValue)(0);
  const scrollHandler = (0, import_react_native_reanimated5.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });
  const scrollDistance = headerMaxHeight - headerMinHeight;
  const headerStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const height = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [0, scrollDistance],
      [headerMaxHeight, headerMinHeight],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    return { height };
  });
  const imageStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const translateY = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [-headerMaxHeight, 0, scrollDistance],
      [-headerMaxHeight / 2, 0, scrollDistance * 0.5],
      // Moves at half speed relative to scroll
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    const scale = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [-headerMaxHeight, 0],
      [2, 1],
      { extrapolateLeft: import_react_native_reanimated5.Extrapolation.EXTEND, extrapolateRight: import_react_native_reanimated5.Extrapolation.CLAMP }
    );
    return {
      transform: [{ translateY }, { scale }]
    };
  });
  const titleStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const opacity = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance * 0.9],
      [0, 1],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    const translateY = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance],
      [10, 0],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }]
    };
  });
  const headerBgStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const opacity = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [0, scrollDistance],
      [0, 1],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    return { opacity };
  });
  return {
    scrollY,
    scrollHandler,
    headerStyle,
    imageStyle,
    titleStyle,
    headerBgStyle
  };
}

// src/hooks/useMemoStyles.ts
var import_react10 = require("react");
var import_react_native4 = require("react-native");
function useMemoStyles(styleFactory) {
  const tokens = useTokens();
  const factoryRef = (0, import_react10.useRef)(styleFactory);
  factoryRef.current = styleFactory;
  return (0, import_react10.useMemo)(() => {
    const rawStyles = factoryRef.current(tokens);
    return import_react_native4.StyleSheet.create(rawStyles);
  }, [tokens]);
}

// src/hooks/useListItem.ts
var import_react11 = require("react");
var import_react_native_reanimated6 = require("react-native-reanimated");
var import_react_native_worklets3 = require("react-native-worklets");
var import_react_native_gesture_handler4 = require("react-native-gesture-handler");
var import_tokens5 = require("@truongdq01/tokens");
var ACTION_WIDTH = 80;
function useListItem({
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false
} = {}) {
  const translateX = (0, import_react_native_reanimated6.useSharedValue)(0);
  const isRevealedValue = (0, import_react_native_reanimated6.useSharedValue)(false);
  const trailingMax = trailingActions.length * ACTION_WIDTH;
  const leadingMax = leadingActions.length * ACTION_WIDTH;
  const snappySpring = import_tokens5.spring.snappy;
  const close = (0, import_react11.useCallback)(() => {
    translateX.value = (0, import_react_native_reanimated6.withSpring)(0, snappySpring);
    isRevealedValue.value = false;
  }, [translateX, isRevealedValue, snappySpring]);
  const tapGesture = import_react_native_gesture_handler4.Gesture.Tap().enabled(!disabled).onEnd((_, success) => {
    "worklet";
    if (!success) return;
    if (isRevealedValue.value) {
      translateX.value = (0, import_react_native_reanimated6.withSpring)(0, snappySpring);
      isRevealedValue.value = false;
      return;
    }
    if (onPress) (0, import_react_native_worklets3.scheduleOnRN)(onPress);
  });
  const longPressGesture = import_react_native_gesture_handler4.Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(500).onStart(() => {
    "worklet";
    if (onLongPress) (0, import_react_native_worklets3.scheduleOnRN)(onLongPress);
  });
  const panGesture = import_react_native_gesture_handler4.Gesture.Pan().activeOffsetX([-8, 8]).failOffsetY([-5, 5]).onUpdate((e) => {
    "worklet";
    const raw = e.translationX;
    if (raw < 0 && trailingMax > 0) {
      translateX.value = Math.max(raw, -trailingMax - 10);
    } else if (raw > 0 && leadingMax > 0) {
      translateX.value = Math.min(raw, leadingMax + 10);
    }
  }).onEnd((e) => {
    "worklet";
    const vel = e.velocityX;
    const tx = translateX.value;
    if (tx < 0 && trailingMax > 0) {
      const snap = tx < -trailingMax / 2 || vel < -300;
      translateX.value = (0, import_react_native_reanimated6.withSpring)(snap ? -trailingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else if (tx > 0 && leadingMax > 0) {
      const snap = tx > leadingMax / 2 || vel > 300;
      translateX.value = (0, import_react_native_reanimated6.withSpring)(snap ? leadingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else {
      translateX.value = (0, import_react_native_reanimated6.withSpring)(0, snappySpring);
      isRevealedValue.value = false;
    }
  });
  const gesture = import_react_native_gesture_handler4.Gesture.Simultaneous(
    import_react_native_gesture_handler4.Gesture.Race(panGesture, tapGesture),
    longPressGesture
  );
  const itemAnimatedStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    transform: [{ translateX: translateX.value }]
  }));
  const trailingActionsStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    width: Math.abs(Math.min(translateX.value, 0)),
    opacity: (0, import_react_native_reanimated6.interpolate)(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], import_react_native_reanimated6.Extrapolation.CLAMP)
  }));
  const leadingActionsStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    width: Math.max(translateX.value, 0),
    opacity: (0, import_react_native_reanimated6.interpolate)(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], import_react_native_reanimated6.Extrapolation.CLAMP)
  }));
  return {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "button",
      accessibilityState: { disabled }
    },
    close
  };
}

// src/hooks/useRadioGroup.ts
var import_react12 = require("react");
function useRadioGroup({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react12.useState)(defaultValue);
  const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const select = (0, import_react12.useCallback)(
    (val) => {
      if (disabled) return;
      if (controlledValue === void 0) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, controlledValue, onChange]
  );
  const isSelected = (0, import_react12.useCallback)(
    (val) => selectedValue === val,
    [selectedValue]
  );
  const getItemProps = (0, import_react12.useCallback)(
    (val, itemDisabled = false) => ({
      onPress: () => !itemDisabled && !disabled && select(val),
      accessibilityRole: "radio",
      accessibilityState: {
        checked: isSelected(val),
        disabled: disabled || itemDisabled
      }
    }),
    [select, isSelected, disabled]
  );
  return { selectedValue, select, isSelected, isDisabled: disabled, getItemProps };
}

// src/hooks/useSlider.ts
var import_react13 = require("react");
var import_react_native_reanimated7 = require("react-native-reanimated");
var import_react_native_worklets4 = require("react-native-worklets");
var import_react_native_gesture_handler5 = require("react-native-gesture-handler");
var import_tokens6 = require("@truongdq01/tokens");
function snapToStep(value, min, max, step) {
  const snapped = Math.round((value - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}
function useSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = min,
  value: controlledValue,
  onChange,
  onChangeEnd,
  disabled = false
} = {}) {
  const trackWidth = (0, import_react_native_reanimated7.useSharedValue)(0);
  const internalValue = (0, import_react13.useRef)(controlledValue ?? defaultValue);
  const currentValue = controlledValue ?? internalValue.current;
  const percentage = (currentValue - min) / (max - min);
  const thumbRatio = (0, import_react_native_reanimated7.useSharedValue)(percentage);
  const isDragging = (0, import_react_native_reanimated7.useSharedValue)(false);
  const dragStartRatio = (0, import_react_native_reanimated7.useSharedValue)(0);
  const thumbScale = (0, import_react_native_reanimated7.useSharedValue)(1);
  const onTrackLayout = (0, import_react13.useCallback)(
    (width) => {
      trackWidth.value = width;
    },
    [trackWidth]
  );
  const emitChange = (0, import_react13.useCallback)(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValue.current = snapped;
      onChange?.(snapped);
    },
    [min, max, step, onChange]
  );
  const emitChangeEnd = (0, import_react13.useCallback)(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEnd?.(snapped);
    },
    [min, max, step, onChangeEnd]
  );
  const snappySpringConfig = import_tokens6.spring.snappy;
  const lastEmittedValue = (0, import_react_native_reanimated7.useSharedValue)(currentValue);
  const panGesture = import_react_native_gesture_handler5.Gesture.Pan().enabled(!disabled).onStart(() => {
    "worklet";
    isDragging.value = true;
    thumbScale.value = (0, import_react_native_reanimated7.withSpring)(1.2, snappySpringConfig);
    dragStartRatio.value = thumbRatio.value;
  }).onUpdate((e) => {
    "worklet";
    if (trackWidth.value === 0) return;
    const delta = e.translationX / trackWidth.value;
    const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
    thumbRatio.value = next;
    const raw = next * (max - min) + min;
    const snapped = Math.round((raw - min) / step) * step + min;
    const finalSnapped = Math.max(min, Math.min(max, snapped));
    if (finalSnapped !== lastEmittedValue.value) {
      lastEmittedValue.value = finalSnapped;
      (0, import_react_native_worklets4.scheduleOnRN)(emitChange, next);
    }
  }).onEnd(() => {
    "worklet";
    isDragging.value = false;
    thumbScale.value = (0, import_react_native_reanimated7.withSpring)(1, snappySpringConfig);
    const raw = thumbRatio.value * (max - min) + min;
    const snapped = Math.round((raw - min) / step) * step + min;
    const finalSnapped = Math.max(min, Math.min(max, snapped));
    const targetRatio = (finalSnapped - min) / (max - min);
    thumbRatio.value = (0, import_react_native_reanimated7.withSpring)(targetRatio, snappySpringConfig);
    (0, import_react_native_worklets4.scheduleOnRN)(emitChangeEnd, targetRatio);
  });
  const thumbAnimatedStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => {
    const width = trackWidth.value;
    const ratio = thumbRatio.value;
    const scale = thumbScale.value;
    return {
      transform: [
        { translateX: ratio * width },
        { scale }
      ]
    };
  });
  const fillAnimatedStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => {
    const ratio = thumbRatio.value;
    return {
      width: `${ratio * 100}%`
    };
  });
  const trackAnimatedStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => ({
    opacity: disabled ? 0.4 : 1
  }));
  return {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage
  };
}

// src/hooks/useIconStyle.ts
function useIconStyle(context) {
  const tokens = useTokens();
  if (context === "button") {
    return {
      size: tokens.fontSize.md,
      color: "inherit"
      // Components should handle setting this based on variant
    };
  }
  if (context === "input" || context === "select") {
    return {
      size: tokens.fontSize.lg,
      // Search icons and chevrons usually slightly larger
      color: tokens.color.text.tertiary
    };
  }
  if (context === "list") {
    return {
      size: tokens.fontSize.md,
      color: tokens.color.text.secondary
    };
  }
  return {
    size: tokens.fontSize.md,
    color: tokens.color.text.primary
  };
}

// src/hooks/useTabs.ts
var import_react14 = require("react");
function useTabs({
  defaultValue,
  value: controlledValue,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react14.useState)(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (0, import_react14.useCallback)(
    (next) => {
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );
  const isSelected = (0, import_react14.useCallback)(
    (v) => value === v,
    [value]
  );
  const getTabProps = (0, import_react14.useCallback)(
    (v, disabled = false) => ({
      onPress: () => {
        if (disabled) return;
        setValue(v);
      },
      accessibilityRole: "tab",
      accessibilityState: { selected: value === v, disabled }
    }),
    [setValue, value]
  );
  return { value, setValue, isSelected, getTabProps };
}

// src/hooks/useToggleGroup.ts
var import_react15 = require("react");
function useToggleGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  exclusive = false,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react15.useState)(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const isSelected = (0, import_react15.useCallback)(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const toggle = (0, import_react15.useCallback)(
    (v) => {
      if (disabled) return;
      let next;
      if (exclusive) {
        next = value === v ? void 0 : v;
      } else {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      }
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, exclusive, value, controlledValue, onChange]
  );
  return { value, isSelected, toggle };
}

// src/hooks/useRating.ts
var import_react16 = require("react");
function useRating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react16.useState)(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (0, import_react16.useCallback)(
    (next) => {
      if (disabled || readOnly) return;
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, readOnly, controlledValue, onChange]
  );
  return { value, setValue, max, precision, disabled, readOnly };
}

// src/hooks/usePagination.ts
var import_react17 = require("react");
function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}
function usePagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onChange
}) {
  const [internalPage, setInternalPage] = (0, import_react17.useState)(defaultPage);
  const page = controlledPage ?? internalPage;
  const setPage = (0, import_react17.useCallback)(
    (next) => {
      const clamped = Math.max(1, Math.min(count, next));
      if (controlledPage === void 0) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [count, controlledPage, onChange]
  );
  const items = (0, import_react17.useMemo)(() => {
    if (count <= 0) return [];
    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
    const siblingsStart = Math.max(
      Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );
    const result = [];
    result.push(...startPages);
    if (siblingsStart > boundaryCount + 2) {
      result.push("start-ellipsis");
    } else if (boundaryCount + 1 < count - boundaryCount) {
      result.push(boundaryCount + 1);
    }
    result.push(...range(siblingsStart, siblingsEnd));
    if (siblingsEnd < count - boundaryCount - 1) {
      result.push("end-ellipsis");
    } else if (count - boundaryCount > boundaryCount) {
      result.push(count - boundaryCount);
    }
    result.push(...endPages);
    return Array.from(new Set(result)).filter((item) => {
      if (typeof item === "number") return item >= 1 && item <= count;
      return true;
    });
  }, [count, page, siblingCount, boundaryCount]);
  return { page, setPage, items };
}

// src/hooks/useAutocomplete.ts
var import_react18 = require("react");
function useAutocomplete({
  options,
  value: controlledValue,
  defaultValue,
  multiple = false,
  inputValue: controlledInput,
  defaultInputValue = "",
  onInputChange,
  onChange,
  getOptionLabel,
  filterOptions,
  open: controlledOpen,
  onOpen,
  onClose
}) {
  const [internalValue, setInternalValue] = (0, import_react18.useState)(defaultValue);
  const [internalInput, setInternalInput] = (0, import_react18.useState)(defaultInputValue);
  const disclosure = useDisclosure({
    isOpen: controlledOpen,
    onOpen,
    onClose
  });
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const inputValue = controlledInput !== void 0 ? controlledInput : internalInput;
  const setInputValue = (0, import_react18.useCallback)(
    (next) => {
      if (controlledInput === void 0) setInternalInput(next);
      onInputChange?.(next);
    },
    [controlledInput, onInputChange]
  );
  const isSelected = (0, import_react18.useCallback)(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const selectOption = (0, import_react18.useCallback)(
    (v) => {
      let next;
      if (multiple) {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      } else {
        next = v;
        disclosure.close();
      }
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
      if (!multiple) {
        const label = getOptionLabel ? getOptionLabel(v) : String(v);
        setInputValue(label);
      }
    },
    [multiple, value, controlledValue, onChange, disclosure, getOptionLabel, setInputValue]
  );
  const clear = (0, import_react18.useCallback)(() => {
    if (controlledValue === void 0) setInternalValue(multiple ? [] : void 0);
    onChange?.(multiple ? [] : void 0);
    setInputValue("");
  }, [controlledValue, multiple, onChange, setInputValue]);
  const filteredOptions = (0, import_react18.useMemo)(() => {
    const base = filterOptions ? filterOptions(options, inputValue) : options;
    if (!inputValue) return base;
    const labelOf = getOptionLabel ?? ((o) => String(o));
    return base.filter((opt) => labelOf(opt).toLowerCase().includes(inputValue.toLowerCase()));
  }, [options, inputValue, filterOptions, getOptionLabel]);
  return {
    value,
    inputValue,
    setInputValue,
    isOpen: disclosure.isOpen,
    open: disclosure.open,
    close: disclosure.close,
    isSelected,
    selectOption,
    clear,
    filteredOptions
  };
}

// src/hooks/useAccordion.ts
var import_react19 = require("react");
function useAccordion(options = {}) {
  const {
    defaultExpanded = [],
    expanded: controlledExpanded,
    onChange,
    multiple = false
  } = options;
  const [internalExpanded, setInternalExpanded] = (0, import_react19.useState)(defaultExpanded);
  const isControlled = controlledExpanded !== void 0;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const setExpanded = (0, import_react19.useCallback)((next) => {
    if (!isControlled) setInternalExpanded(next);
    onChange?.(next);
  }, [isControlled, onChange]);
  const isExpanded = (0, import_react19.useCallback)((id) => expanded.includes(id), [expanded]);
  const toggle = (0, import_react19.useCallback)((id) => {
    if (isExpanded(id)) {
      setExpanded(expanded.filter((e) => e !== id));
    } else {
      setExpanded(multiple ? [...expanded, id] : [id]);
    }
  }, [expanded, isExpanded, multiple, setExpanded]);
  const expand = (0, import_react19.useCallback)((id) => {
    if (!isExpanded(id)) setExpanded(multiple ? [...expanded, id] : [id]);
  }, [expanded, isExpanded, multiple, setExpanded]);
  const collapse = (0, import_react19.useCallback)((id) => {
    setExpanded(expanded.filter((e) => e !== id));
  }, [expanded, setExpanded]);
  const expandAll = (0, import_react19.useCallback)((ids) => {
    if (multiple) setExpanded(ids);
  }, [multiple, setExpanded]);
  const collapseAll = (0, import_react19.useCallback)(() => setExpanded([]), [setExpanded]);
  return { expanded, isExpanded, toggle, expand, collapse, expandAll, collapseAll };
}

// src/hooks/useModal.ts
var import_react20 = require("react");
function useModal(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    closeOnBackdrop = true
  } = options;
  const [internalOpen, setInternalOpen] = (0, import_react20.useState)(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (0, import_react20.useCallback)((next) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);
  const open = (0, import_react20.useCallback)(() => setOpen(true), [setOpen]);
  const close = (0, import_react20.useCallback)(() => setOpen(false), [setOpen]);
  const toggle = (0, import_react20.useCallback)(() => setOpen(!isOpen), [isOpen, setOpen]);
  return {
    isOpen,
    open,
    close,
    toggle,
    backdropProps: {
      onPress: closeOnBackdrop ? close : () => {
      },
      accessible: true,
      accessibilityRole: "button",
      accessibilityLabel: "Close modal"
    },
    modalProps: {
      visible: isOpen,
      onRequestClose: close,
      accessibilityViewIsModal: true
    }
  };
}

// src/hooks/useDrawer.ts
var import_react21 = require("react");
function useDrawer(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    side = "left",
    closeOnBackdrop = true
  } = options;
  const [internalOpen, setInternalOpen] = (0, import_react21.useState)(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (0, import_react21.useCallback)((next) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);
  const open = (0, import_react21.useCallback)(() => setOpen(true), [setOpen]);
  const close = (0, import_react21.useCallback)(() => setOpen(false), [setOpen]);
  const toggle = (0, import_react21.useCallback)(() => setOpen(!isOpen), [isOpen, setOpen]);
  return {
    isOpen,
    side,
    open,
    close,
    toggle,
    backdropProps: {
      onPress: closeOnBackdrop ? close : () => {
      },
      accessible: true,
      accessibilityRole: "button",
      accessibilityLabel: "Close drawer"
    },
    drawerProps: {
      visible: isOpen,
      accessibilityViewIsModal: true
    }
  };
}

// src/hooks/useStepper.ts
var import_react22 = require("react");
function useStepper(options) {
  const { steps, initialStep = 0, onChange, onComplete, linear = true } = options;
  const [currentStep, setCurrentStep] = (0, import_react22.useState)(initialStep);
  const [completedSteps, setCompletedSteps] = (0, import_react22.useState)(/* @__PURE__ */ new Set());
  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const next = (0, import_react22.useCallback)(async () => {
    const step = steps[currentStep];
    if (step.validate) {
      const valid = await step.validate();
      if (!valid) return false;
    }
    setCompletedSteps((prev2) => /* @__PURE__ */ new Set([...prev2, currentStep]));
    if (!isLast) {
      const next2 = currentStep + 1;
      setCurrentStep(next2);
      onChange?.(next2);
    }
    return true;
  }, [currentStep, isLast, steps, onChange]);
  const prev = (0, import_react22.useCallback)(() => {
    if (!isFirst) {
      const prev2 = currentStep - 1;
      setCurrentStep(prev2);
      onChange?.(prev2);
    }
  }, [currentStep, isFirst, onChange]);
  const goTo = (0, import_react22.useCallback)((index) => {
    if (index < 0 || index >= totalSteps) return;
    if (linear && index > currentStep && !completedSteps.has(index - 1)) return;
    setCurrentStep(index);
    onChange?.(index);
  }, [totalSteps, linear, currentStep, completedSteps, onChange]);
  const complete = (0, import_react22.useCallback)(() => {
    setCompletedSteps((prev2) => /* @__PURE__ */ new Set([...prev2, currentStep]));
    onComplete?.();
  }, [currentStep, onComplete]);
  const reset = (0, import_react22.useCallback)(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(/* @__PURE__ */ new Set());
  }, [initialStep]);
  const getStepProps = (0, import_react22.useCallback)((index) => ({
    active: index === currentStep,
    completed: completedSteps.has(index),
    accessible: true,
    accessibilityRole: "tab",
    accessibilitySelected: index === currentStep,
    accessibilityLabel: `${steps[index]?.label}${completedSteps.has(index) ? ", completed" : ""}${index === currentStep ? ", current" : ""}`
  }), [currentStep, completedSteps, steps]);
  return { currentStep, totalSteps, isFirst, isLast, completedSteps, next, prev, goTo, complete, reset, getStepProps };
}

// src/hooks/useCarousel.ts
var import_react23 = require("react");
var import_react_native5 = require("react-native");
var import_react_native_reanimated8 = require("react-native-reanimated");
var { width: SCREEN_WIDTH } = import_react_native5.Dimensions.get("window");
function useCarousel({
  data,
  itemWidth = SCREEN_WIDTH,
  gap = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3e3
}) {
  const scrollX = (0, import_react_native_reanimated8.useSharedValue)(0);
  const scrollViewRef = (0, import_react23.useRef)(null);
  const isJumping = (0, import_react23.useRef)(false);
  const autoPlayTimer = (0, import_react23.useRef)(null);
  const n = data.length;
  const itemStep = itemWidth + gap;
  const displayData = (0, import_react23.useMemo)(() => {
    if (!loop || n < 2) return data;
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);
  const snapToOffsets = (0, import_react23.useMemo)(() => {
    return displayData.map((_, i) => i * itemStep);
  }, [displayData, itemStep]);
  (0, import_react23.useEffect)(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
        scrollX.value = itemStep;
      });
    }
  }, []);
  const goToNextSlide = (0, import_react23.useCallback)(() => {
    if (!loop || n < 2) {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextIndex = currentIndex >= n - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * itemStep, animated: true });
    } else {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextX = (currentIndex + 1) * itemStep;
      if (nextX < displayData.length * itemStep) {
        scrollViewRef.current?.scrollTo({ x: nextX, animated: true });
      }
    }
  }, [loop, n, itemStep, scrollX, displayData.length]);
  const goToPreviousSlide = (0, import_react23.useCallback)(() => {
    const currentIndex = Math.round(scrollX.value / itemStep);
    const prevIndex = currentIndex <= 0 ? loop ? 0 : n - 1 : currentIndex - 1;
    scrollViewRef.current?.scrollTo({ x: prevIndex * itemStep, animated: true });
  }, [loop, n, itemStep, scrollX]);
  const startTimer = (0, import_react23.useCallback)(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    autoPlayTimer.current = setInterval(() => {
      requestAnimationFrame(() => {
        goToNextSlide();
      });
    }, autoPlayInterval);
  }, [autoPlayInterval, goToNextSlide]);
  const stopTimer = (0, import_react23.useCallback)(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  }, []);
  (0, import_react23.useEffect)(() => {
    if (autoPlay) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [autoPlay, startTimer, stopTimer]);
  const onScroll = (0, import_react23.useCallback)((e) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    if (autoPlay) {
      startTimer();
    }
  }, [autoPlay, startTimer, scrollX]);
  const onMomentumScrollEnd = (0, import_react23.useCallback)((e) => {
    if (!loop || n < 2 || isJumping.current) return;
    const x = Math.round(e.nativeEvent.contentOffset.x);
    const lastCloneX = (displayData.length - 1) * itemStep;
    if (x <= 0) {
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: n * itemStep, animated: false });
      scrollX.value = n * itemStep;
      setTimeout(() => {
        isJumping.current = false;
      }, 50);
    } else if (x >= lastCloneX) {
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
      scrollX.value = itemStep;
      setTimeout(() => {
        isJumping.current = false;
      }, 50);
    }
  }, [loop, n, itemStep, displayData.length, scrollX]);
  return {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    goToNextSlide,
    goToPreviousSlide,
    itemStep,
    n
  };
}

// src/hooks/useOTPInput.ts
var import_react24 = require("react");
function useOTPInput({
  length,
  value,
  onChange,
  onComplete,
  disabled = false
}) {
  const [isFocused, setIsFocused] = (0, import_react24.useState)(false);
  const inputRef = (0, import_react24.useRef)(null);
  const handlePress = (0, import_react24.useCallback)(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);
  const handleChange = (0, import_react24.useCallback)((text) => {
    const numericVal = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(numericVal);
    if (numericVal.length === length && onComplete) {
      onComplete(numericVal);
    }
  }, [length, onChange, onComplete]);
  return {
    inputRef,
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    handlePress,
    handleChange,
    getOtpProps: () => ({
      value,
      onChangeText: handleChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      keyboardType: "number-pad",
      textContentType: "oneTimeCode",
      autoComplete: "one-time-code",
      maxLength: length,
      editable: !disabled
    })
  };
}

// src/hooks/useSegmentedControl.ts
var import_react25 = require("react");
function useSegmentedControl({
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false
}) {
  const [internalValue, setInternalValue] = (0, import_react25.useState)(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const isSelected = (0, import_react25.useCallback)((val) => value === val, [value]);
  const selectValue = (0, import_react25.useCallback)((val) => {
    if (disabled) return;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }, [disabled, isControlled, onChange]);
  return {
    value,
    setSelectedIndex: (index, options) => selectValue(options[index]),
    isSelected,
    getTabProps: (val, index) => ({
      onPress: () => selectValue(val),
      accessibilityRole: "tab",
      accessibilityState: { selected: isSelected(val), disabled }
    })
  };
}

// src/hooks/useTable.ts
var import_react26 = require("react");
function useTable({
  data,
  rowsPerPage: initialRowsPerPage = 10,
  initialPage = 0,
  initialSort = null
}) {
  const [page, setPage] = (0, import_react26.useState)(initialPage);
  const [rowsPerPage, setRowsPerPage] = (0, import_react26.useState)(initialRowsPerPage);
  const [sort, setSort] = (0, import_react26.useState)(initialSort);
  const [selected, setSelected] = (0, import_react26.useState)(/* @__PURE__ */ new Set());
  const processedData = (0, import_react26.useMemo)(() => {
    if (!sort) return data;
    const { key, direction } = sort;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort]);
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = (0, import_react26.useMemo)(() => {
    const start = page * rowsPerPage;
    return processedData.slice(start, start + rowsPerPage);
  }, [processedData, page, rowsPerPage]);
  const handleSort = (0, import_react26.useCallback)((key) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }, []);
  const toggleSelect = (0, import_react26.useCallback)((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const toggleSelectAll = (0, import_react26.useCallback)((ids) => {
    setSelected((prev) => {
      if (prev.size === ids.length) return /* @__PURE__ */ new Set();
      return new Set(ids);
    });
  }, []);
  const isSelected = (0, import_react26.useCallback)((id) => selected.has(id), [selected]);
  return {
    page,
    rowsPerPage,
    sort,
    selected,
    processedData,
    paginatedData,
    totalPages,
    setPage,
    setRowsPerPage,
    handleSort,
    toggleSelect,
    toggleSelectAll,
    isSelected
  };
}

// src/hooks/useAlert.ts
var import_react27 = require("react");
function useAlert({
  defaultOpen = true,
  onClose
} = {}) {
  const [isOpen, setIsOpen] = (0, import_react27.useState)(defaultOpen);
  const close = (0, import_react27.useCallback)(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  return {
    isOpen,
    close,
    getAlertProps: () => ({
      role: "alert",
      accessibilityRole: "alert"
    }),
    getCloseButtonProps: () => ({
      onPress: close,
      accessibilityLabel: "Close alert",
      accessibilityRole: "button"
    })
  };
}

// src/hooks/useBottomNavigation.ts
var import_react28 = require("react");
function useBottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange
}) {
  const [internalValue, setInternalValue] = (0, import_react28.useState)(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const isSelected = (0, import_react28.useCallback)((val) => value === val, [value]);
  const selectValue = (0, import_react28.useCallback)((val) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }, [isControlled, onChange]);
  return {
    value,
    selectValue,
    isSelected,
    getItemProps: (val) => ({
      onPress: () => selectValue(val),
      accessibilityRole: "tab",
      accessibilityState: { selected: isSelected(val) }
    })
  };
}

// src/hooks/useMenu.ts
var import_react29 = require("react");
function useMenu({
  onClose,
  onOpen
} = {}) {
  const [isOpen, setIsOpen] = (0, import_react29.useState)(false);
  const open = (0, import_react29.useCallback)(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);
  const close = (0, import_react29.useCallback)(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  const toggle = (0, import_react29.useCallback)(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);
  return {
    isOpen,
    open,
    close,
    toggle,
    getTriggerProps: () => ({
      onPress: toggle,
      accessibilityRole: "button",
      accessibilityHasPopup: "menu",
      accessibilityState: { expanded: isOpen }
    }),
    getItemProps: (options = {}) => ({
      onPress: () => {
        if (options.disabled) return;
        options.onClick?.();
        close();
      },
      accessibilityRole: "menuitem",
      accessibilityState: { disabled: options.disabled }
    })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeProvider,
  createTheme,
  dismissAllToasts,
  dismissToast,
  focusRingAnimation,
  heroTransition,
  motionEasing,
  motionPresets,
  showToast,
  timingPreset,
  useAccordion,
  useActiveBrand,
  useAlert,
  useAutocomplete,
  useBottomNavigation,
  useBottomSheet,
  useBrandSwitch,
  useCarousel,
  useCheckbox,
  useComponentTokens,
  useDisclosure,
  useDrawer,
  useField,
  useIconStyle,
  useIsDark,
  useListItem,
  useMemoStyles,
  useMenu,
  useModal,
  useOTPInput,
  usePagination,
  usePressable,
  useRadioGroup,
  useRating,
  useScrollHeader,
  useSegmentedControl,
  useSelect,
  useSlider,
  useStepper,
  useSwitch,
  useTable,
  useTabs,
  useTheme,
  useToast,
  useToggleGroup,
  useTokens
});
//# sourceMappingURL=index.js.map