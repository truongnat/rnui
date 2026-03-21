var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/theme.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  semanticTokens,
  buildSemanticTokens,
  resolveComponentTokens
} from "@rnui/tokens";
function createTheme(override) {
  return override;
}
var ThemeContext = createContext(null);
function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  brand: initialBrand,
  override
}) {
  const systemScheme = useColorScheme();
  const [manualScheme, setManualScheme] = React.useState(forcedScheme);
  const [activeBrand, setActiveBrand] = React.useState(initialBrand);
  const activeScheme = manualScheme === "system" ? systemScheme === "dark" ? "dark" : "light" : manualScheme;
  const theme = useMemo(() => {
    let tokens = activeBrand ? buildSemanticTokens(activeBrand, activeScheme) : semanticTokens[activeScheme];
    if (override?.[activeScheme]) {
      tokens = deepMerge(tokens, override[activeScheme]);
    }
    const components = resolveComponentTokens(tokens);
    return {
      tokens,
      components,
      colorScheme: activeScheme,
      brand: activeBrand,
      setColorScheme: setManualScheme,
      setBrand: setActiveBrand
    };
  }, [activeScheme, activeBrand, override]);
  return /* @__PURE__ */ React.createElement(GestureHandlerRootView, { style: { flex: 1 } }, /* @__PURE__ */ React.createElement(ThemeContext.Provider, { value: theme }, children));
}
function useTheme() {
  const ctx = useContext(ThemeContext);
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
import { Easing, SharedTransition, withSpring } from "react-native-reanimated";
import {
  FadeInUp,
  FadeInDown,
  FadeIn,
  ZoomIn,
  SlideInDown,
  SlideInUp,
  SlideInRight,
  FadeOutDown,
  FadeOutUp,
  FadeOut,
  ZoomOut,
  SlideOutDown,
  SlideOutUp,
  SlideOutRight
} from "react-native-reanimated";
import { spring, timingPreset, focusRingAnimation } from "@rnui/tokens";
var motionPresets = {
  enter: {
    fadeUp: FadeInUp,
    fadeDown: FadeInDown,
    fadeIn: FadeIn,
    scaleIn: ZoomIn,
    slideFromBottom: SlideInDown,
    slideFromTop: SlideInUp,
    slideFromRight: SlideInRight
  },
  exit: {
    fadeDown: FadeOutDown,
    fadeUp: FadeOutUp,
    fadeOut: FadeOut,
    scaleOut: ZoomOut,
    slideToBottom: SlideOutDown,
    slideToTop: SlideOutUp,
    slideToRight: SlideOutRight
  }
};
var motionEasing = {
  easeIn: Easing.bezier(0.4, 0, 1, 1),
  easeOut: Easing.bezier(0, 0, 0.2, 1),
  easeInOut: Easing.bezier(0.4, 0, 0.2, 1),
  linear: Easing.linear
};
var heroTransition = SharedTransition && SharedTransition.custom ? SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight, spring.snappy),
    width: withSpring(values.targetWidth, spring.snappy),
    originX: withSpring(values.targetGlobalOriginX, spring.snappy),
    originY: withSpring(values.targetGlobalOriginY, spring.snappy)
  };
}) : null;

// src/hooks/usePressable.ts
import { useCallback, useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring as withSpring2,
  withTiming as withTiming2,
  runOnJS
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  Gesture
} from "react-native-gesture-handler";
import { Platform } from "react-native";
import { spring as spring2, pressFeedback } from "@rnui/tokens";
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
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const handlePress = useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("light");
    onPress?.();
  }, [disabled, haptic, onPress]);
  const handleLongPress = useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("medium");
    onLongPress?.();
  }, [disabled, haptic, onLongPress]);
  const setPressedState = useCallback((pressed) => {
    setIsPressed(pressed);
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    if (feedbackMode === "opacity") {
      return { opacity: opacity.value };
    }
    if (feedbackMode === "none") {
      return {};
    }
    return { transform: [{ scale: scale.value }] };
  });
  const scaleDownPressed = pressFeedback.scaleDown.pressed;
  const scaleSubtlePressed = pressFeedback.scaleDownSubtle.pressed;
  const opacityOnlyPressed = pressFeedback.opacityOnly.pressed;
  const snappySpring = spring2.snappy;
  const tapGesture = Gesture.Tap().enabled(!disabled).hitSlop(hitSlop ?? 0).onBegin(() => {
    "worklet";
    runOnJS(setPressedState)(true);
    if (feedbackMode === "scale") {
      scale.value = withSpring2(scaleDownPressed, snappySpring);
    } else if (feedbackMode === "scaleSubtle") {
      scale.value = withSpring2(scaleSubtlePressed, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = withTiming2(opacityOnlyPressed, { duration: 60 });
    }
  }).onFinalize((_event, success) => {
    "worklet";
    runOnJS(setPressedState)(false);
    if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
      scale.value = withSpring2(1, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = withTiming2(1, { duration: 100 });
    }
    if (success) {
      scheduleOnRN(handlePress);
    }
  });
  const longPressGesture = Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(longPressMinDuration).onStart(() => {
    "worklet";
    scheduleOnRN(handleLongPress);
  });
  const gesture = Gesture.Simultaneous(tapGesture, longPressGesture);
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
    const Haptics = __require("expo-haptics");
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
    const HapticFeedback = __require("react-native-haptic-feedback").default;
    HapticFeedback.trigger(
      Platform.OS === "ios" ? "impactLight" : "notificationSuccess",
      { enableVibrateFallback: true, ignoreAndroidSystemSettings: false }
    );
  } catch {
  }
}

// src/hooks/useDisclosure.ts
import { useCallback as useCallback2, useState as useState2 } from "react";
function useDisclosure({
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpen,
  onClose
} = {}) {
  const [internalOpen, setInternalOpen] = useState2(defaultOpen);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const open = useCallback2(() => {
    if (controlledOpen === void 0) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);
  const close = useCallback2(() => {
    if (controlledOpen === void 0) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);
  const toggle = useCallback2(() => {
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
import { useCallback as useCallback3, useState as useState3 } from "react";
function useField({
  defaultValue,
  validate,
  validateOnChange = false
}) {
  const [value, setValue] = useState3(defaultValue);
  const [error, setError] = useState3(void 0);
  const [touched, setTouched] = useState3(false);
  const [isValidating, setIsValidating] = useState3(false);
  const runValidation = useCallback3(
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
  const onChange = useCallback3(
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
  const onBlur = useCallback3(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);
  const reset = useCallback3(() => {
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
import { useCallback as useCallback4, useSyncExternalStore } from "react";
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
  const toasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const show = useCallback4((options) => showToast(options), []);
  const dismiss = useCallback4((id) => dismissToast(id), []);
  const dismissAll = useCallback4(() => dismissAllToasts(), []);
  const success = useCallback4(
    (message, opts) => showToast({ ...opts, message, variant: "success" }),
    []
  );
  const error = useCallback4(
    (message, opts) => showToast({ ...opts, message, variant: "error" }),
    []
  );
  const warning = useCallback4(
    (message, opts) => showToast({ ...opts, message, variant: "warning" }),
    []
  );
  const info = useCallback4(
    (message, opts) => showToast({ ...opts, message, variant: "info" }),
    []
  );
  return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}

// src/hooks/useBottomSheet.ts
import { useCallback as useCallback5, useRef as useRef2 } from "react";
import {
  useSharedValue as useSharedValue2,
  useAnimatedStyle as useAnimatedStyle2,
  withSpring as withSpring3,
  withTiming as withTiming3
} from "react-native-reanimated";
import { scheduleOnRN as scheduleOnRN2 } from "react-native-worklets";
import { Gesture as Gesture2 } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { spring as spring3 } from "@rnui/tokens";
var SCREEN_HEIGHT = Dimensions.get("window").height;
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
  const isOpenRef = useRef2(false);
  const currentIndexRef = useRef2(defaultSnapIndex);
  const translateY = useSharedValue2(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue2(0);
  const dragStartY = useSharedValue2(0);
  const gentleSpring = spring3.gentle;
  const animateToSnap = useCallback5(
    (index, onDone) => {
      "worklet";
      const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = withSpring3(targetY, gentleSpring, (finished) => {
        if (finished && onDone) scheduleOnRN2(onDone);
      });
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming3(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]
  );
  const open = useCallback5(
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
      translateY.value = withSpring3(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming3(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const handleCloseEnd = useCallback5(() => {
    isOpenRef.current = false;
    onClose?.();
  }, [onClose]);
  const close = useCallback5(() => {
    translateY.value = withSpring3(SCREEN_HEIGHT, gentleSpring, (finished) => {
      if (finished) {
        scheduleOnRN2(handleCloseEnd);
      }
    });
    backdropOpacity.value = withTiming3(0, { duration: 200 });
  }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);
  const snapTo = useCallback5(
    (index) => {
      if (index < 0 || index >= snapPoints.length) return;
      currentIndexRef.current = index;
      const targetHeight = snapPoints[index];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== "number" || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for snapTo:", targetY);
        return;
      }
      translateY.value = withSpring3(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming3(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const panGesture = Gesture2.Pan().onStart(() => {
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
      scheduleOnRN2(close);
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
    scheduleOnRN2(snapTo, bestIndex);
  });
  const backdropTapGesture = Gesture2.Tap().onEnd(() => {
    "worklet";
    scheduleOnRN2(close);
  });
  const sheetAnimatedStyle = useAnimatedStyle2(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  const backdropAnimatedStyle = useAnimatedStyle2(() => ({
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
import { useCallback as useCallback6, useState as useState4 } from "react";
function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false
} = {}) {
  const [internalChecked, setInternalChecked] = useState4(defaultChecked);
  const isChecked = controlledChecked !== void 0 ? controlledChecked : internalChecked;
  const toggle = useCallback6(() => {
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
import { useCallback as useCallback7, useState as useState5 } from "react";
function useSwitch({
  defaultOn = false,
  on: controlledOn,
  onChange,
  disabled = false
} = {}) {
  const [internalOn, setInternalOn] = useState5(defaultOn);
  const isOn = controlledOn !== void 0 ? controlledOn : internalOn;
  const toggle = useCallback7(() => {
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
import { useCallback as useCallback8, useState as useState6 } from "react";
function useSelect({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  multiple = false,
  disabled = false,
  placeholder = "Select\u2026"
}) {
  const [internalValue, setInternalValue] = useState6(defaultValue);
  const disclosure = useDisclosure();
  const selected = controlledValue !== void 0 ? controlledValue : internalValue;
  const selectOption = useCallback8(
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
  const clearSelection = useCallback8(() => {
    const next = multiple ? [] : void 0;
    if (controlledValue === void 0) setInternalValue(next);
    if (next !== void 0) onChange?.(next);
  }, [multiple, controlledValue, onChange]);
  const isSelected = useCallback8(
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
import {
  useSharedValue as useSharedValue3,
  useAnimatedScrollHandler,
  useAnimatedStyle as useAnimatedStyle3,
  interpolate as interpolate2,
  Extrapolation as Extrapolation2
} from "react-native-reanimated";
function useScrollHeader({ headerMaxHeight, headerMinHeight }) {
  const scrollY = useSharedValue3(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });
  const scrollDistance = headerMaxHeight - headerMinHeight;
  const headerStyle = useAnimatedStyle3(() => {
    const height = interpolate2(
      scrollY.value,
      [0, scrollDistance],
      [headerMaxHeight, headerMinHeight],
      Extrapolation2.CLAMP
    );
    return { height };
  });
  const imageStyle = useAnimatedStyle3(() => {
    const translateY = interpolate2(
      scrollY.value,
      [-headerMaxHeight, 0, scrollDistance],
      [-headerMaxHeight / 2, 0, scrollDistance * 0.5],
      // Moves at half speed relative to scroll
      Extrapolation2.CLAMP
    );
    const scale = interpolate2(
      scrollY.value,
      [-headerMaxHeight, 0],
      [2, 1],
      { extrapolateLeft: Extrapolation2.EXTEND, extrapolateRight: Extrapolation2.CLAMP }
    );
    return {
      transform: [{ translateY }, { scale }]
    };
  });
  const titleStyle = useAnimatedStyle3(() => {
    const opacity = interpolate2(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance * 0.9],
      [0, 1],
      Extrapolation2.CLAMP
    );
    const translateY = interpolate2(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance],
      [10, 0],
      Extrapolation2.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }]
    };
  });
  const headerBgStyle = useAnimatedStyle3(() => {
    const opacity = interpolate2(
      scrollY.value,
      [0, scrollDistance],
      [0, 1],
      Extrapolation2.CLAMP
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
import { useMemo as useMemo2, useRef as useRef3 } from "react";
import { StyleSheet } from "react-native";
function useMemoStyles(styleFactory) {
  const tokens = useTokens();
  const factoryRef = useRef3(styleFactory);
  factoryRef.current = styleFactory;
  return useMemo2(() => {
    const rawStyles = factoryRef.current(tokens);
    return StyleSheet.create(rawStyles);
  }, [tokens]);
}

// src/hooks/useListItem.ts
import { useCallback as useCallback9 } from "react";
import {
  useSharedValue as useSharedValue4,
  useAnimatedStyle as useAnimatedStyle4,
  withSpring as withSpring4,
  interpolate as interpolate3,
  Extrapolation as Extrapolation3
} from "react-native-reanimated";
import { scheduleOnRN as scheduleOnRN3 } from "react-native-worklets";
import { Gesture as Gesture3 } from "react-native-gesture-handler";
import { spring as spring4 } from "@rnui/tokens";
var ACTION_WIDTH = 80;
function useListItem({
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false
} = {}) {
  const translateX = useSharedValue4(0);
  const isRevealedValue = useSharedValue4(false);
  const trailingMax = trailingActions.length * ACTION_WIDTH;
  const leadingMax = leadingActions.length * ACTION_WIDTH;
  const snappySpring = spring4.snappy;
  const close = useCallback9(() => {
    translateX.value = withSpring4(0, snappySpring);
    isRevealedValue.value = false;
  }, [translateX, isRevealedValue, snappySpring]);
  const tapGesture = Gesture3.Tap().enabled(!disabled).onEnd((_, success) => {
    "worklet";
    if (!success) return;
    if (isRevealedValue.value) {
      translateX.value = withSpring4(0, snappySpring);
      isRevealedValue.value = false;
      return;
    }
    if (onPress) scheduleOnRN3(onPress);
  });
  const longPressGesture = Gesture3.LongPress().enabled(!disabled && !!onLongPress).minDuration(500).onStart(() => {
    "worklet";
    if (onLongPress) scheduleOnRN3(onLongPress);
  });
  const panGesture = Gesture3.Pan().activeOffsetX([-8, 8]).failOffsetY([-5, 5]).onUpdate((e) => {
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
      translateX.value = withSpring4(snap ? -trailingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else if (tx > 0 && leadingMax > 0) {
      const snap = tx > leadingMax / 2 || vel > 300;
      translateX.value = withSpring4(snap ? leadingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else {
      translateX.value = withSpring4(0, snappySpring);
      isRevealedValue.value = false;
    }
  });
  const gesture = Gesture3.Simultaneous(
    Gesture3.Race(panGesture, tapGesture),
    longPressGesture
  );
  const itemAnimatedStyle = useAnimatedStyle4(() => ({
    transform: [{ translateX: translateX.value }]
  }));
  const trailingActionsStyle = useAnimatedStyle4(() => ({
    width: Math.abs(Math.min(translateX.value, 0)),
    opacity: interpolate3(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], Extrapolation3.CLAMP)
  }));
  const leadingActionsStyle = useAnimatedStyle4(() => ({
    width: Math.max(translateX.value, 0),
    opacity: interpolate3(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], Extrapolation3.CLAMP)
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
import { useCallback as useCallback10, useState as useState7 } from "react";
function useRadioGroup({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = useState7(defaultValue);
  const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const select = useCallback10(
    (val) => {
      if (disabled) return;
      if (controlledValue === void 0) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, controlledValue, onChange]
  );
  const isSelected = useCallback10(
    (val) => selectedValue === val,
    [selectedValue]
  );
  const getItemProps = useCallback10(
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
import { useCallback as useCallback11, useRef as useRef4 } from "react";
import {
  useSharedValue as useSharedValue5,
  useAnimatedStyle as useAnimatedStyle5,
  withSpring as withSpring5
} from "react-native-reanimated";
import { scheduleOnRN as scheduleOnRN4 } from "react-native-worklets";
import { Gesture as Gesture4 } from "react-native-gesture-handler";
import { spring as spring5 } from "@rnui/tokens";
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
  const trackWidth = useSharedValue5(0);
  const internalValue = useRef4(controlledValue ?? defaultValue);
  const currentValue = controlledValue ?? internalValue.current;
  const percentage = (currentValue - min) / (max - min);
  const thumbRatio = useSharedValue5(percentage);
  const isDragging = useSharedValue5(false);
  const dragStartRatio = useSharedValue5(0);
  const thumbScale = useSharedValue5(1);
  const onTrackLayout = useCallback11(
    (width) => {
      trackWidth.value = width;
    },
    [trackWidth]
  );
  const emitChange = useCallback11(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValue.current = snapped;
      onChange?.(snapped);
    },
    [min, max, step, onChange]
  );
  const emitChangeEnd = useCallback11(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEnd?.(snapped);
    },
    [min, max, step, onChangeEnd]
  );
  const snappySpringConfig = spring5.snappy;
  const lastEmittedValue = useSharedValue5(currentValue);
  const panGesture = Gesture4.Pan().enabled(!disabled).onStart(() => {
    "worklet";
    isDragging.value = true;
    thumbScale.value = withSpring5(1.2, snappySpringConfig);
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
      scheduleOnRN4(emitChange, next);
    }
  }).onEnd(() => {
    "worklet";
    isDragging.value = false;
    thumbScale.value = withSpring5(1, snappySpringConfig);
    const raw = thumbRatio.value * (max - min) + min;
    const snapped = Math.round((raw - min) / step) * step + min;
    const finalSnapped = Math.max(min, Math.min(max, snapped));
    const targetRatio = (finalSnapped - min) / (max - min);
    thumbRatio.value = withSpring5(targetRatio, snappySpringConfig);
    scheduleOnRN4(emitChangeEnd, targetRatio);
  });
  const thumbAnimatedStyle = useAnimatedStyle5(() => {
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
  const fillAnimatedStyle = useAnimatedStyle5(() => {
    const ratio = thumbRatio.value;
    return {
      width: `${ratio * 100}%`
    };
  });
  const trackAnimatedStyle = useAnimatedStyle5(() => ({
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
import { useCallback as useCallback12, useState as useState8 } from "react";
function useTabs({
  defaultValue,
  value: controlledValue,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = useState8(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = useCallback12(
    (next) => {
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );
  const isSelected = useCallback12(
    (v) => value === v,
    [value]
  );
  const getTabProps = useCallback12(
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
import { useCallback as useCallback13, useState as useState9 } from "react";
function useToggleGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  exclusive = false,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = useState9(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const isSelected = useCallback13(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const toggle = useCallback13(
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
import { useCallback as useCallback14, useState as useState10 } from "react";
function useRating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = useState10(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = useCallback14(
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
import { useCallback as useCallback15, useMemo as useMemo3, useState as useState11 } from "react";
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
  const [internalPage, setInternalPage] = useState11(defaultPage);
  const page = controlledPage ?? internalPage;
  const setPage = useCallback15(
    (next) => {
      const clamped = Math.max(1, Math.min(count, next));
      if (controlledPage === void 0) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [count, controlledPage, onChange]
  );
  const items = useMemo3(() => {
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
import { useCallback as useCallback16, useMemo as useMemo4, useState as useState12 } from "react";
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
  const [internalValue, setInternalValue] = useState12(defaultValue);
  const [internalInput, setInternalInput] = useState12(defaultInputValue);
  const disclosure = useDisclosure({
    isOpen: controlledOpen,
    onOpen,
    onClose
  });
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const inputValue = controlledInput !== void 0 ? controlledInput : internalInput;
  const setInputValue = useCallback16(
    (next) => {
      if (controlledInput === void 0) setInternalInput(next);
      onInputChange?.(next);
    },
    [controlledInput, onInputChange]
  );
  const isSelected = useCallback16(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const selectOption = useCallback16(
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
  const clear = useCallback16(() => {
    if (controlledValue === void 0) setInternalValue(multiple ? [] : void 0);
    onChange?.(multiple ? [] : void 0);
    setInputValue("");
  }, [controlledValue, multiple, onChange, setInputValue]);
  const filteredOptions = useMemo4(() => {
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
import { useState as useState13, useCallback as useCallback17 } from "react";
function useAccordion(options = {}) {
  const {
    defaultExpanded = [],
    expanded: controlledExpanded,
    onChange,
    multiple = false
  } = options;
  const [internalExpanded, setInternalExpanded] = useState13(defaultExpanded);
  const isControlled = controlledExpanded !== void 0;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const setExpanded = useCallback17((next) => {
    if (!isControlled) setInternalExpanded(next);
    onChange?.(next);
  }, [isControlled, onChange]);
  const isExpanded = useCallback17((id) => expanded.includes(id), [expanded]);
  const toggle = useCallback17((id) => {
    if (isExpanded(id)) {
      setExpanded(expanded.filter((e) => e !== id));
    } else {
      setExpanded(multiple ? [...expanded, id] : [id]);
    }
  }, [expanded, isExpanded, multiple, setExpanded]);
  const expand = useCallback17((id) => {
    if (!isExpanded(id)) setExpanded(multiple ? [...expanded, id] : [id]);
  }, [expanded, isExpanded, multiple, setExpanded]);
  const collapse = useCallback17((id) => {
    setExpanded(expanded.filter((e) => e !== id));
  }, [expanded, setExpanded]);
  const expandAll = useCallback17((ids) => {
    if (multiple) setExpanded(ids);
  }, [multiple, setExpanded]);
  const collapseAll = useCallback17(() => setExpanded([]), [setExpanded]);
  return { expanded, isExpanded, toggle, expand, collapse, expandAll, collapseAll };
}

// src/hooks/useModal.ts
import { useState as useState14, useCallback as useCallback18 } from "react";
function useModal(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    closeOnBackdrop = true
  } = options;
  const [internalOpen, setInternalOpen] = useState14(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = useCallback18((next) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);
  const open = useCallback18(() => setOpen(true), [setOpen]);
  const close = useCallback18(() => setOpen(false), [setOpen]);
  const toggle = useCallback18(() => setOpen(!isOpen), [isOpen, setOpen]);
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
import { useState as useState15, useCallback as useCallback19 } from "react";
function useDrawer(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    side = "left",
    closeOnBackdrop = true
  } = options;
  const [internalOpen, setInternalOpen] = useState15(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = useCallback19((next) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);
  const open = useCallback19(() => setOpen(true), [setOpen]);
  const close = useCallback19(() => setOpen(false), [setOpen]);
  const toggle = useCallback19(() => setOpen(!isOpen), [isOpen, setOpen]);
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
import { useState as useState16, useCallback as useCallback20 } from "react";
function useStepper(options) {
  const { steps, initialStep = 0, onChange, onComplete, linear = true } = options;
  const [currentStep, setCurrentStep] = useState16(initialStep);
  const [completedSteps, setCompletedSteps] = useState16(/* @__PURE__ */ new Set());
  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const next = useCallback20(async () => {
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
  const prev = useCallback20(() => {
    if (!isFirst) {
      const prev2 = currentStep - 1;
      setCurrentStep(prev2);
      onChange?.(prev2);
    }
  }, [currentStep, isFirst, onChange]);
  const goTo = useCallback20((index) => {
    if (index < 0 || index >= totalSteps) return;
    if (linear && index > currentStep && !completedSteps.has(index - 1)) return;
    setCurrentStep(index);
    onChange?.(index);
  }, [totalSteps, linear, currentStep, completedSteps, onChange]);
  const complete = useCallback20(() => {
    setCompletedSteps((prev2) => /* @__PURE__ */ new Set([...prev2, currentStep]));
    onComplete?.();
  }, [currentStep, onComplete]);
  const reset = useCallback20(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(/* @__PURE__ */ new Set());
  }, [initialStep]);
  const getStepProps = useCallback20((index) => ({
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
import { useRef as useRef6, useMemo as useMemo5, useCallback as useCallback21, useEffect as useEffect2 } from "react";
import { Dimensions as Dimensions2 } from "react-native";
import { useSharedValue as useSharedValue6 } from "react-native-reanimated";
var { width: SCREEN_WIDTH } = Dimensions2.get("window");
function useCarousel({
  data,
  itemWidth = SCREEN_WIDTH,
  gap = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3e3
}) {
  const scrollX = useSharedValue6(0);
  const scrollViewRef = useRef6(null);
  const isJumping = useRef6(false);
  const autoPlayTimer = useRef6(null);
  const n = data.length;
  const itemStep = itemWidth + gap;
  const displayData = useMemo5(() => {
    if (!loop || n < 2) return data;
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);
  const snapToOffsets = useMemo5(() => {
    return displayData.map((_, i) => i * itemStep);
  }, [displayData, itemStep]);
  useEffect2(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
        scrollX.value = itemStep;
      });
    }
  }, []);
  const goToNextSlide = useCallback21(() => {
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
  const goToPreviousSlide = useCallback21(() => {
    const currentIndex = Math.round(scrollX.value / itemStep);
    const prevIndex = currentIndex <= 0 ? loop ? 0 : n - 1 : currentIndex - 1;
    scrollViewRef.current?.scrollTo({ x: prevIndex * itemStep, animated: true });
  }, [loop, n, itemStep, scrollX]);
  const startTimer = useCallback21(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    autoPlayTimer.current = setInterval(() => {
      requestAnimationFrame(() => {
        goToNextSlide();
      });
    }, autoPlayInterval);
  }, [autoPlayInterval, goToNextSlide]);
  const stopTimer = useCallback21(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  }, []);
  useEffect2(() => {
    if (autoPlay) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [autoPlay, startTimer, stopTimer]);
  const onScroll = useCallback21((e) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    if (autoPlay) {
      startTimer();
    }
  }, [autoPlay, startTimer, scrollX]);
  const onMomentumScrollEnd = useCallback21((e) => {
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
export {
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
  useAutocomplete,
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
  useModal,
  usePagination,
  usePressable,
  useRadioGroup,
  useRating,
  useScrollHeader,
  useSelect,
  useSlider,
  useStepper,
  useSwitch,
  useTabs,
  useTheme,
  useToast,
  useToggleGroup,
  useTokens
};
//# sourceMappingURL=index.js.map