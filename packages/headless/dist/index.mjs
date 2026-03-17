import React, { createContext, useMemo, useContext, useRef, useCallback, useState, useSyncExternalStore } from 'react';
import { Dimensions, useColorScheme, Platform } from 'react-native';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { semanticTokens, resolveComponentTokens, pressFeedback, spring } from '@rnui/tokens';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, interpolate, Extrapolation } from 'react-native-reanimated';

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
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
function usePressable({
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  disabled = false,
  feedbackMode = "scale",
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  haptic = true
} = {}) {
  const isPressedRef = useRef(false);
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
    if (feedbackMode === "scale") {
      scale.value = withSpring(scaleDownPressed, snappySpring);
    } else if (feedbackMode === "scaleSubtle") {
      scale.value = withSpring(scaleSubtlePressed, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = withTiming(opacityOnlyPressed, { duration: 60 });
    }
  }).onFinalize((_event, success) => {
    "worklet";
    if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
      scale.value = withSpring(1, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = withTiming(1, { duration: 100 });
    }
    if (success) {
      runOnJS(handlePress)();
    }
  });
  const longPressGesture = Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(longPressMinDuration).onStart(() => {
    "worklet";
    runOnJS(handleLongPress)();
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
    isPressed: isPressedRef.current
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
      } catch {
        setError("Validation failed");
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
    action: options.action
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
        if (finished && onDone) runOnJS(onDone)();
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
        runOnJS(handleCloseEnd)();
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
      runOnJS(close)();
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
    runOnJS(snapTo)(bestIndex);
  });
  const backdropTapGesture = Gesture.Tap().onEnd(() => {
    "worklet";
    runOnJS(close)();
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
    if (onPress) runOnJS(onPress)();
  });
  const longPressGesture = Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(500).onStart(() => {
    "worklet";
    if (onLongPress) runOnJS(onLongPress)();
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
  const snappySpring = spring.snappy;
  const panGesture = Gesture.Pan().enabled(!disabled).onStart(() => {
    "worklet";
    isDragging.value = true;
    dragStartRatio.value = thumbRatio.value;
  }).onUpdate((e) => {
    "worklet";
    if (trackWidth.value === 0) return;
    const delta = e.translationX / trackWidth.value;
    const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
    thumbRatio.value = next;
    runOnJS(emitChange)(next);
  }).onEnd(() => {
    "worklet";
    isDragging.value = false;
    const raw = thumbRatio.value * (max - min) + min;
    const snapped = snapToStep(raw, min, max, step);
    thumbRatio.value = withSpring((snapped - min) / (max - min), snappySpring);
    runOnJS(emitChangeEnd)(thumbRatio.value);
  });
  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: thumbRatio.value * trackWidth.value },
      { scale: isDragging.value ? withSpring(1.2, spring.snappy) : withSpring(1, spring.snappy) }
    ]
  }));
  const fillAnimatedStyle = useAnimatedStyle(() => ({
    width: `${thumbRatio.value * 100}%`
  }));
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

export { ThemeProvider, dismissAllToasts, dismissToast, showToast, useBottomSheet, useCheckbox, useComponentTokens, useDisclosure, useField, useIsDark, useListItem, usePressable, useRadioGroup, useSelect, useSlider, useSwitch, useTheme, useToast, useTokens };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map