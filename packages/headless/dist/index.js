'use strict';

var React = require('react');
var reactNative = require('react-native');
var reactNativeGestureHandler = require('react-native-gesture-handler');
var tokens = require('@rnui/tokens');
var reactNativeReanimated = require('react-native-reanimated');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var ThemeContext = React.createContext(null);
function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  override
}) {
  const systemScheme = reactNative.useColorScheme();
  const [manualScheme, setManualScheme] = React__default.default.useState(forcedScheme);
  const activeScheme = manualScheme === "system" ? systemScheme === "dark" ? "dark" : "light" : manualScheme;
  const theme = React.useMemo(() => {
    const baseTokens = tokens.semanticTokens[activeScheme];
    const tokens$1 = override?.[activeScheme] ? deepMerge(baseTokens, override[activeScheme]) : baseTokens;
    const components = tokens.resolveComponentTokens(tokens$1);
    return {
      tokens: tokens$1,
      components,
      colorScheme: activeScheme,
      setColorScheme: setManualScheme
    };
  }, [activeScheme, override]);
  return /* @__PURE__ */ React__default.default.createElement(reactNativeGestureHandler.GestureHandlerRootView, { style: { flex: 1 } }, /* @__PURE__ */ React__default.default.createElement(ThemeContext.Provider, { value: theme }, children));
}
function useTheme() {
  const ctx = React.useContext(ThemeContext);
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
  const isPressedRef = React.useRef(false);
  const scale = reactNativeReanimated.useSharedValue(1);
  const opacity = reactNativeReanimated.useSharedValue(1);
  const handlePress = React.useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("light");
    onPress?.();
  }, [disabled, haptic, onPress]);
  const handleLongPress = React.useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("medium");
    onLongPress?.();
  }, [disabled, haptic, onLongPress]);
  const animatedStyle = reactNativeReanimated.useAnimatedStyle(() => {
    if (feedbackMode === "opacity") {
      return { opacity: opacity.value };
    }
    if (feedbackMode === "none") {
      return {};
    }
    return { transform: [{ scale: scale.value }] };
  });
  const scaleDownPressed = tokens.pressFeedback.scaleDown.pressed;
  const scaleSubtlePressed = tokens.pressFeedback.scaleDownSubtle.pressed;
  const opacityOnlyPressed = tokens.pressFeedback.opacityOnly.pressed;
  const snappySpring = tokens.spring.snappy;
  const tapGesture = reactNativeGestureHandler.Gesture.Tap().enabled(!disabled).onBegin(() => {
    "worklet";
    if (feedbackMode === "scale") {
      scale.value = reactNativeReanimated.withSpring(scaleDownPressed, snappySpring);
    } else if (feedbackMode === "scaleSubtle") {
      scale.value = reactNativeReanimated.withSpring(scaleSubtlePressed, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = reactNativeReanimated.withTiming(opacityOnlyPressed, { duration: 60 });
    }
  }).onFinalize((_event, success) => {
    "worklet";
    if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
      scale.value = reactNativeReanimated.withSpring(1, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = reactNativeReanimated.withTiming(1, { duration: 100 });
    }
    if (success) {
      reactNativeReanimated.runOnJS(handlePress)();
    }
  });
  const longPressGesture = reactNativeGestureHandler.Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(longPressMinDuration).onStart(() => {
    "worklet";
    reactNativeReanimated.runOnJS(handleLongPress)();
  });
  const gesture = reactNativeGestureHandler.Gesture.Simultaneous(tapGesture, longPressGesture);
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
      reactNative.Platform.OS === "ios" ? "impactLight" : "notificationSuccess",
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
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const open = React.useCallback(() => {
    if (controlledOpen === void 0) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);
  const close = React.useCallback(() => {
    if (controlledOpen === void 0) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);
  const toggle = React.useCallback(() => {
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
  const [value, setValue] = React.useState(defaultValue);
  const [error, setError] = React.useState(void 0);
  const [touched, setTouched] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);
  const runValidation = React.useCallback(
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
  const onChange = React.useCallback(
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
  const onBlur = React.useCallback(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);
  const reset = React.useCallback(() => {
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
  const toasts = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const show = React.useCallback((options) => showToast(options), []);
  const dismiss = React.useCallback((id) => dismissToast(id), []);
  const dismissAll = React.useCallback(() => dismissAllToasts(), []);
  const success = React.useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "success" }),
    []
  );
  const error = React.useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "error" }),
    []
  );
  const warning = React.useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "warning" }),
    []
  );
  const info = React.useCallback(
    (message, opts) => showToast({ ...opts, message, variant: "info" }),
    []
  );
  return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}
var SCREEN_HEIGHT = reactNative.Dimensions.get("window").height;
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
  const isOpenRef = React.useRef(false);
  const currentIndexRef = React.useRef(defaultSnapIndex);
  const translateY = reactNativeReanimated.useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = reactNativeReanimated.useSharedValue(0);
  const dragStartY = reactNativeReanimated.useSharedValue(0);
  const gentleSpring = tokens.spring.gentle;
  React.useCallback(
    (index, onDone) => {
      "worklet";
      const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = reactNativeReanimated.withSpring(targetY, gentleSpring, (finished) => {
        if (finished && onDone) reactNativeReanimated.runOnJS(onDone)();
      });
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = reactNativeReanimated.withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]
  );
  const open = React.useCallback(
    (snapIndex) => {
      const idx = snapIndex ?? defaultSnapIndex;
      isOpenRef.current = true;
      currentIndexRef.current = idx;
      const targetHeight = snapPoints[idx] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = reactNativeReanimated.withSpring(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = reactNativeReanimated.withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const handleCloseEnd = React.useCallback(() => {
    isOpenRef.current = false;
    onClose?.();
  }, [onClose]);
  const close = React.useCallback(() => {
    translateY.value = reactNativeReanimated.withSpring(SCREEN_HEIGHT, gentleSpring, (finished) => {
      if (finished) {
        reactNativeReanimated.runOnJS(handleCloseEnd)();
      }
    });
    backdropOpacity.value = reactNativeReanimated.withTiming(0, { duration: 200 });
  }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);
  const snapTo = React.useCallback(
    (index) => {
      if (index < 0 || index >= snapPoints.length) return;
      currentIndexRef.current = index;
      const targetHeight = snapPoints[index];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = reactNativeReanimated.withSpring(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = reactNativeReanimated.withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const panGesture = reactNativeGestureHandler.Gesture.Pan().onStart(() => {
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
      reactNativeReanimated.runOnJS(close)();
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
    reactNativeReanimated.runOnJS(snapTo)(bestIndex);
  });
  const backdropTapGesture = reactNativeGestureHandler.Gesture.Tap().onEnd(() => {
    "worklet";
    reactNativeReanimated.runOnJS(close)();
  });
  const sheetAnimatedStyle = reactNativeReanimated.useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  const backdropAnimatedStyle = reactNativeReanimated.useAnimatedStyle(() => ({
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
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = controlledChecked !== void 0 ? controlledChecked : internalChecked;
  const toggle = React.useCallback(() => {
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
  const [internalOn, setInternalOn] = React.useState(defaultOn);
  const isOn = controlledOn !== void 0 ? controlledOn : internalOn;
  const toggle = React.useCallback(() => {
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
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const disclosure = useDisclosure();
  const selected = controlledValue !== void 0 ? controlledValue : internalValue;
  const selectOption = React.useCallback(
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
  const clearSelection = React.useCallback(() => {
    const next = multiple ? [] : void 0;
    if (controlledValue === void 0) setInternalValue(next);
    if (next !== void 0) onChange?.(next);
  }, [multiple, controlledValue, onChange]);
  const isSelected = React.useCallback(
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
  const translateX = reactNativeReanimated.useSharedValue(0);
  const isRevealedValue = reactNativeReanimated.useSharedValue(false);
  const trailingMax = trailingActions.length * ACTION_WIDTH;
  const leadingMax = leadingActions.length * ACTION_WIDTH;
  const snappySpring = tokens.spring.snappy;
  const close = React.useCallback(() => {
    translateX.value = reactNativeReanimated.withSpring(0, snappySpring);
    isRevealedValue.value = false;
  }, [translateX, isRevealedValue, snappySpring]);
  const tapGesture = reactNativeGestureHandler.Gesture.Tap().enabled(!disabled).onEnd((_, success) => {
    "worklet";
    if (!success) return;
    if (isRevealedValue.value) {
      translateX.value = reactNativeReanimated.withSpring(0, snappySpring);
      isRevealedValue.value = false;
      return;
    }
    if (onPress) reactNativeReanimated.runOnJS(onPress)();
  });
  const longPressGesture = reactNativeGestureHandler.Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(500).onStart(() => {
    "worklet";
    if (onLongPress) reactNativeReanimated.runOnJS(onLongPress)();
  });
  const panGesture = reactNativeGestureHandler.Gesture.Pan().activeOffsetX([-8, 8]).failOffsetY([-5, 5]).onUpdate((e) => {
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
      translateX.value = reactNativeReanimated.withSpring(snap ? -trailingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else if (tx > 0 && leadingMax > 0) {
      const snap = tx > leadingMax / 2 || vel > 300;
      translateX.value = reactNativeReanimated.withSpring(snap ? leadingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else {
      translateX.value = reactNativeReanimated.withSpring(0, snappySpring);
      isRevealedValue.value = false;
    }
  });
  const gesture = reactNativeGestureHandler.Gesture.Simultaneous(
    reactNativeGestureHandler.Gesture.Race(panGesture, tapGesture),
    longPressGesture
  );
  const itemAnimatedStyle = reactNativeReanimated.useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));
  const trailingActionsStyle = reactNativeReanimated.useAnimatedStyle(() => ({
    width: Math.abs(Math.min(translateX.value, 0)),
    opacity: reactNativeReanimated.interpolate(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], reactNativeReanimated.Extrapolation.CLAMP)
  }));
  const leadingActionsStyle = reactNativeReanimated.useAnimatedStyle(() => ({
    width: Math.max(translateX.value, 0),
    opacity: reactNativeReanimated.interpolate(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], reactNativeReanimated.Extrapolation.CLAMP)
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
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const select = React.useCallback(
    (val) => {
      if (disabled) return;
      if (controlledValue === void 0) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, controlledValue, onChange]
  );
  const isSelected = React.useCallback(
    (val) => selectedValue === val,
    [selectedValue]
  );
  const getItemProps = React.useCallback(
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
  const trackWidth = reactNativeReanimated.useSharedValue(0);
  const internalValue = React.useRef(controlledValue ?? defaultValue);
  const currentValue = controlledValue ?? internalValue.current;
  const percentage = (currentValue - min) / (max - min);
  const thumbRatio = reactNativeReanimated.useSharedValue(percentage);
  const isDragging = reactNativeReanimated.useSharedValue(false);
  const dragStartRatio = reactNativeReanimated.useSharedValue(0);
  const onTrackLayout = React.useCallback(
    (width) => {
      trackWidth.value = width;
    },
    [trackWidth]
  );
  const emitChange = React.useCallback(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValue.current = snapped;
      onChange?.(snapped);
    },
    [min, max, step, onChange]
  );
  const emitChangeEnd = React.useCallback(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEnd?.(snapped);
    },
    [min, max, step, onChangeEnd]
  );
  const snappySpring = tokens.spring.snappy;
  const panGesture = reactNativeGestureHandler.Gesture.Pan().enabled(!disabled).onStart(() => {
    "worklet";
    isDragging.value = true;
    dragStartRatio.value = thumbRatio.value;
  }).onUpdate((e) => {
    "worklet";
    if (trackWidth.value === 0) return;
    const delta = e.translationX / trackWidth.value;
    const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
    thumbRatio.value = next;
    reactNativeReanimated.runOnJS(emitChange)(next);
  }).onEnd(() => {
    "worklet";
    isDragging.value = false;
    const raw = thumbRatio.value * (max - min) + min;
    const snapped = snapToStep(raw, min, max, step);
    thumbRatio.value = reactNativeReanimated.withSpring((snapped - min) / (max - min), snappySpring);
    reactNativeReanimated.runOnJS(emitChangeEnd)(thumbRatio.value);
  });
  const thumbAnimatedStyle = reactNativeReanimated.useAnimatedStyle(() => ({
    transform: [
      { translateX: thumbRatio.value * trackWidth.value },
      { scale: isDragging.value ? reactNativeReanimated.withSpring(1.2, tokens.spring.snappy) : reactNativeReanimated.withSpring(1, tokens.spring.snappy) }
    ]
  }));
  const fillAnimatedStyle = reactNativeReanimated.useAnimatedStyle(() => ({
    width: `${thumbRatio.value * 100}%`
  }));
  const trackAnimatedStyle = reactNativeReanimated.useAnimatedStyle(() => ({
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

exports.ThemeProvider = ThemeProvider;
exports.dismissAllToasts = dismissAllToasts;
exports.dismissToast = dismissToast;
exports.showToast = showToast;
exports.useBottomSheet = useBottomSheet;
exports.useCheckbox = useCheckbox;
exports.useComponentTokens = useComponentTokens;
exports.useDisclosure = useDisclosure;
exports.useField = useField;
exports.useIsDark = useIsDark;
exports.useListItem = useListItem;
exports.usePressable = usePressable;
exports.useRadioGroup = useRadioGroup;
exports.useSelect = useSelect;
exports.useSlider = useSlider;
exports.useSwitch = useSwitch;
exports.useTheme = useTheme;
exports.useToast = useToast;
exports.useTokens = useTokens;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map