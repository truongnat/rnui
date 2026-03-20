import React, { createContext, useMemo, useContext, useState, useCallback, useSyncExternalStore, useRef } from 'react';
import { Dimensions, useColorScheme, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { spring, semanticTokens, resolveComponentTokens, pressFeedback } from '@rnui/tokens';
import { Easing, SharedTransition, withSpring, SlideOutRight, SlideOutUp, SlideOutDown, ZoomOut, FadeOut, FadeOutUp, FadeOutDown, SlideInRight, SlideInUp, SlideInDown, ZoomIn, FadeIn, FadeInDown, FadeInUp, useSharedValue, useAnimatedStyle, runOnJS, withTiming, useAnimatedScrollHandler, interpolate, Extrapolation } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
function createTheme(override) {
  return override;
}
var ThemeContext = createContext(null);
function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  override
}) {
  const systemScheme = useColorScheme();
  const [manualScheme, setManualScheme] = React.useState(forcedScheme);
  const activeScheme = manualScheme === "system" ? systemScheme === "dark" ? "dark" : "light" : manualScheme;
  const theme = useMemo(() => {
    const baseTokens = semanticTokens[activeScheme];
    const tokens = override?.[activeScheme] ? deepMerge(baseTokens, override[activeScheme]) : baseTokens;
    const components = resolveComponentTokens(tokens);
    return {
      tokens,
      components,
      colorScheme: activeScheme,
      setColorScheme: setManualScheme
    };
  }, [activeScheme, override]);
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
function usePressable({
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  disabled = false,
  feedbackMode = "scale",
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  haptic = false
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
  const snappySpring = spring.snappy;
  const tapGesture = Gesture.Tap().enabled(!disabled).onBegin(() => {
    "worklet";
    runOnJS(setPressedState)(true);
    if (feedbackMode === "scale") {
      scale.value = withSpring(scaleDownPressed, snappySpring);
    } else if (feedbackMode === "scaleSubtle") {
      scale.value = withSpring(scaleSubtlePressed, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = withTiming(opacityOnlyPressed, { duration: 60 });
    }
  }).onFinalize((_event, success) => {
    "worklet";
    runOnJS(setPressedState)(false);
    if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
      scale.value = withSpring(1, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = withTiming(1, { duration: 100 });
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
function useDisclosure({
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpen,
  onClose
} = {}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const open = useCallback(() => {
    if (controlledOpen === void 0) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);
  const close = useCallback(() => {
    if (controlledOpen === void 0) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);
  const toggle = useCallback(() => {
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
function useField({
  defaultValue,
  validate,
  validateOnChange = false
}) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(void 0);
  const [touched, setTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const runValidation = useCallback(
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
  const onChange = useCallback(
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
  const onBlur = useCallback(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);
  const reset = useCallback(() => {
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
  const show = useCallback((options) => showToast(options), []);
  const dismiss = useCallback((id) => dismissToast(id), []);
  const dismissAll = useCallback(() => dismissAllToasts(), []);
  const success = useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "success" }),
    []
  );
  const error = useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "error" }),
    []
  );
  const warning = useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "warning" }),
    []
  );
  const info = useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "info" }),
    []
  );
  return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}
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
  const isOpenRef = useRef(false);
  const currentIndexRef = useRef(defaultSnapIndex);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const dragStartY = useSharedValue(0);
  const gentleSpring = spring.gentle;
  useCallback(
    (index, onDone) => {
      "worklet";
      const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = withSpring(targetY, gentleSpring, (finished) => {
        if (finished && onDone) scheduleOnRN(onDone);
      });
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]
  );
  const open = useCallback(
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
      translateY.value = withSpring(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const handleCloseEnd = useCallback(() => {
    isOpenRef.current = false;
    onClose?.();
  }, [onClose]);
  const close = useCallback(() => {
    translateY.value = withSpring(SCREEN_HEIGHT, gentleSpring, (finished) => {
      if (finished) {
        scheduleOnRN(handleCloseEnd);
      }
    });
    backdropOpacity.value = withTiming(0, { duration: 200 });
  }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);
  const snapTo = useCallback(
    (index) => {
      if (index < 0 || index >= snapPoints.length) return;
      currentIndexRef.current = index;
      const targetHeight = snapPoints[index];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== "number" || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for snapTo:", targetY);
        return;
      }
      translateY.value = withSpring(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const panGesture = Gesture.Pan().onStart(() => {
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
      scheduleOnRN(close);
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
    scheduleOnRN(snapTo, bestIndex);
  });
  const backdropTapGesture = Gesture.Tap().onEnd(() => {
    "worklet";
    scheduleOnRN(close);
  });
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  const backdropAnimatedStyle = useAnimatedStyle(() => ({
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
function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false
} = {}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== void 0 ? controlledChecked : internalChecked;
  const toggle = useCallback(() => {
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
function useSwitch({
  defaultOn = false,
  on: controlledOn,
  onChange,
  disabled = false
} = {}) {
  const [internalOn, setInternalOn] = useState(defaultOn);
  const isOn = controlledOn !== void 0 ? controlledOn : internalOn;
  const toggle = useCallback(() => {
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
function useSelect({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  multiple = false,
  disabled = false,
  placeholder = "Select\u2026"
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const disclosure = useDisclosure();
  const selected = controlledValue !== void 0 ? controlledValue : internalValue;
  const selectOption = useCallback(
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
  const clearSelection = useCallback(() => {
    const next = multiple ? [] : void 0;
    if (controlledValue === void 0) setInternalValue(next);
    if (next !== void 0) onChange?.(next);
  }, [multiple, controlledValue, onChange]);
  const isSelected = useCallback(
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
function useScrollHeader({ headerMaxHeight, headerMinHeight }) {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });
  const scrollDistance = headerMaxHeight - headerMinHeight;
  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, scrollDistance],
      [headerMaxHeight, headerMinHeight],
      Extrapolation.CLAMP
    );
    return { height };
  });
  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-headerMaxHeight, 0, scrollDistance],
      [-headerMaxHeight / 2, 0, scrollDistance * 0.5],
      // Moves at half speed relative to scroll
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [-headerMaxHeight, 0],
      [2, 1],
      { extrapolateLeft: Extrapolation.EXTEND, extrapolateRight: Extrapolation.CLAMP }
    );
    return {
      transform: [{ translateY }, { scale }]
    };
  });
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance * 0.9],
      [0, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance],
      [10, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }]
    };
  });
  const headerBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, scrollDistance],
      [0, 1],
      Extrapolation.CLAMP
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
function useMemoStyles(styleFactory) {
  const tokens = useTokens();
  const factoryRef = useRef(styleFactory);
  factoryRef.current = styleFactory;
  return useMemo(() => {
    const rawStyles = factoryRef.current(tokens);
    return StyleSheet.create(rawStyles);
  }, [tokens]);
}
var ACTION_WIDTH = 80;
function useListItem({
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false
} = {}) {
  const translateX = useSharedValue(0);
  const isRevealedValue = useSharedValue(false);
  const trailingMax = trailingActions.length * ACTION_WIDTH;
  const leadingMax = leadingActions.length * ACTION_WIDTH;
  const snappySpring = spring.snappy;
  const close = useCallback(() => {
    translateX.value = withSpring(0, snappySpring);
    isRevealedValue.value = false;
  }, [translateX, isRevealedValue, snappySpring]);
  const tapGesture = Gesture.Tap().enabled(!disabled).onEnd((_, success) => {
    "worklet";
    if (!success) return;
    if (isRevealedValue.value) {
      translateX.value = withSpring(0, snappySpring);
      isRevealedValue.value = false;
      return;
    }
    if (onPress) scheduleOnRN(onPress);
  });
  const longPressGesture = Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(500).onStart(() => {
    "worklet";
    if (onLongPress) scheduleOnRN(onLongPress);
  });
  const panGesture = Gesture.Pan().activeOffsetX([-8, 8]).failOffsetY([-5, 5]).onUpdate((e) => {
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
      translateX.value = withSpring(snap ? -trailingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else if (tx > 0 && leadingMax > 0) {
      const snap = tx > leadingMax / 2 || vel > 300;
      translateX.value = withSpring(snap ? leadingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else {
      translateX.value = withSpring(0, snappySpring);
      isRevealedValue.value = false;
    }
  });
  const gesture = Gesture.Simultaneous(
    Gesture.Race(panGesture, tapGesture),
    longPressGesture
  );
  const itemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));
  const trailingActionsStyle = useAnimatedStyle(() => ({
    width: Math.abs(Math.min(translateX.value, 0)),
    opacity: interpolate(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], Extrapolation.CLAMP)
  }));
  const leadingActionsStyle = useAnimatedStyle(() => ({
    width: Math.max(translateX.value, 0),
    opacity: interpolate(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], Extrapolation.CLAMP)
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
function useRadioGroup({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const select = useCallback(
    (val) => {
      if (disabled) return;
      if (controlledValue === void 0) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, controlledValue, onChange]
  );
  const isSelected = useCallback(
    (val) => selectedValue === val,
    [selectedValue]
  );
  const getItemProps = useCallback(
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
  const trackWidth = useSharedValue(0);
  const internalValue = useRef(controlledValue ?? defaultValue);
  const currentValue = controlledValue ?? internalValue.current;
  const percentage = (currentValue - min) / (max - min);
  const thumbRatio = useSharedValue(percentage);
  const isDragging = useSharedValue(false);
  const dragStartRatio = useSharedValue(0);
  const thumbScale = useSharedValue(1);
  const onTrackLayout = useCallback(
    (width) => {
      trackWidth.value = width;
    },
    [trackWidth]
  );
  const emitChange = useCallback(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValue.current = snapped;
      onChange?.(snapped);
    },
    [min, max, step, onChange]
  );
  const emitChangeEnd = useCallback(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEnd?.(snapped);
    },
    [min, max, step, onChangeEnd]
  );
  const snappySpringConfig = spring.snappy;
  const lastEmittedValue = useSharedValue(currentValue);
  const panGesture = Gesture.Pan().enabled(!disabled).onStart(() => {
    "worklet";
    isDragging.value = true;
    thumbScale.value = withSpring(1.2, snappySpringConfig);
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
      scheduleOnRN(emitChange, next);
    }
  }).onEnd(() => {
    "worklet";
    isDragging.value = false;
    thumbScale.value = withSpring(1, snappySpringConfig);
    const raw = thumbRatio.value * (max - min) + min;
    const snapped = Math.round((raw - min) / step) * step + min;
    const finalSnapped = Math.max(min, Math.min(max, snapped));
    const targetRatio = (finalSnapped - min) / (max - min);
    thumbRatio.value = withSpring(targetRatio, snappySpringConfig);
    scheduleOnRN(emitChangeEnd, targetRatio);
  });
  const thumbAnimatedStyle = useAnimatedStyle(() => {
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
  const fillAnimatedStyle = useAnimatedStyle(() => {
    const ratio = thumbRatio.value;
    return {
      width: `${ratio * 100}%`
    };
  });
  const trackAnimatedStyle = useAnimatedStyle(() => ({
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
function useTabs({
  defaultValue,
  value: controlledValue,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = useCallback(
    (next) => {
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );
  const isSelected = useCallback(
    (v) => value === v,
    [value]
  );
  const getTabProps = useCallback(
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
function useToggleGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  exclusive = false,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const isSelected = useCallback(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const toggle = useCallback(
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
function useRating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = useCallback(
    (next) => {
      if (disabled || readOnly) return;
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, readOnly, controlledValue, onChange]
  );
  return { value, setValue, max, precision, disabled, readOnly };
}
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
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = controlledPage ?? internalPage;
  const setPage = useCallback(
    (next) => {
      const clamped = Math.max(1, Math.min(count, next));
      if (controlledPage === void 0) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [count, controlledPage, onChange]
  );
  const items = useMemo(() => {
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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalInput, setInternalInput] = useState(defaultInputValue);
  const disclosure = useDisclosure({
    isOpen: controlledOpen,
    onOpen,
    onClose
  });
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const inputValue = controlledInput !== void 0 ? controlledInput : internalInput;
  const setInputValue = useCallback(
    (next) => {
      if (controlledInput === void 0) setInternalInput(next);
      onInputChange?.(next);
    },
    [controlledInput, onInputChange]
  );
  const isSelected = useCallback(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const selectOption = useCallback(
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
  const clear = useCallback(() => {
    if (controlledValue === void 0) setInternalValue(multiple ? [] : void 0);
    onChange?.(multiple ? [] : void 0);
    setInputValue("");
  }, [controlledValue, multiple, onChange, setInputValue]);
  const filteredOptions = useMemo(() => {
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

export { ThemeProvider, createTheme, dismissAllToasts, dismissToast, heroTransition, motionEasing, motionPresets, showToast, useAutocomplete, useBottomSheet, useCheckbox, useComponentTokens, useDisclosure, useField, useIconStyle, useIsDark, useListItem, useMemoStyles, usePagination, usePressable, useRadioGroup, useRating, useScrollHeader, useSelect, useSlider, useSwitch, useTabs, useTheme, useToast, useToggleGroup, useTokens };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map