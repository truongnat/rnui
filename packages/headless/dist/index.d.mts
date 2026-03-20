import React$1, { ReactNode } from 'react';
import { SemanticTokens, ComponentTokens, ColorScheme } from '@rnui/tokens';
import * as node_modules_react_native_reanimated_lib_typescript from 'node_modules/react-native-reanimated/lib/typescript';
import { FadeInUp, FadeInDown, FadeIn, ZoomIn, SlideInDown, SlideInUp, SlideInRight, FadeOutDown, FadeOutUp, FadeOut, ZoomOut, SlideOutDown, SlideOutUp, SlideOutRight, useAnimatedStyle } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { AccessibilityRole, StyleSheet } from 'react-native';

interface Theme {
    /** Resolved semantic tokens for current color scheme */
    tokens: SemanticTokens;
    /** Resolved component tokens for current color scheme */
    components: ComponentTokens;
    /** Current color scheme */
    colorScheme: ColorScheme;
    /** Toggle or force a color scheme */
    setColorScheme: (scheme: ColorScheme | "system") => void;
}
type ThemeOverride = Partial<Record<ColorScheme, DeepPartial<SemanticTokens>>>;
interface ThemeProviderProps {
    children: ReactNode;
    /** Force a color scheme, ignoring system preference */
    colorScheme?: ColorScheme | "system";
    /** Token overrides for brand customization */
    override?: ThemeOverride;
}
/**
 * Utility to define a theme override with TypeScript autocomplete support.
 */
declare function createTheme(override: ThemeOverride): ThemeOverride;
declare function ThemeProvider({ children, colorScheme: forcedScheme, override, }: ThemeProviderProps): React$1.JSX.Element;
/**
 * Access the full theme (tokens + components + colorScheme).
 * Throws if used outside ThemeProvider.
 */
declare function useTheme(): Theme;
/**
 * Convenience hook — returns only semantic tokens.
 * Slightly cheaper than useTheme() when you don't need components or colorScheme.
 */
declare function useTokens(): SemanticTokens;
/**
 * Convenience hook — returns only component tokens.
 */
declare function useComponentTokens(): ComponentTokens;
/**
 * Returns true when the active color scheme is dark.
 */
declare function useIsDark(): boolean;
type DeepPartial<T> = T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T;

/**
 * Real Reanimated layout classes mapped from design tokens.
 * Use these for `entering` and `exiting` props.
 */
declare const motionPresets: {
    readonly enter: {
        readonly fadeUp: typeof FadeInUp;
        readonly fadeDown: typeof FadeInDown;
        readonly fadeIn: typeof FadeIn;
        readonly scaleIn: typeof ZoomIn;
        readonly slideFromBottom: typeof SlideInDown;
        readonly slideFromTop: typeof SlideInUp;
        readonly slideFromRight: typeof SlideInRight;
    };
    readonly exit: {
        readonly fadeDown: typeof FadeOutDown;
        readonly fadeUp: typeof FadeOutUp;
        readonly fadeOut: typeof FadeOut;
        readonly scaleOut: typeof ZoomOut;
        readonly slideToBottom: typeof SlideOutDown;
        readonly slideToTop: typeof SlideOutUp;
        readonly slideToRight: typeof SlideOutRight;
    };
};
/**
 * Real Reanimated Easing functions mapped from semantic tokens.
 * Use these in `withTiming({ easing: ... })`.
 */
declare const motionEasing: {
    readonly easeIn: node_modules_react_native_reanimated_lib_typescript.EasingFunctionFactory;
    readonly easeOut: node_modules_react_native_reanimated_lib_typescript.EasingFunctionFactory;
    readonly easeInOut: node_modules_react_native_reanimated_lib_typescript.EasingFunctionFactory;
    readonly linear: (t: number) => number;
};
/**
 * Shared Element Transition preset for Hero images and seamless navigation.
 * Usage: <Animated.View sharedTransitionTag="hero" sharedTransitionStyle={heroTransition} />
 */
declare const heroTransition: any;

type PressFeedbackMode = "scale" | "scaleSubtle" | "opacity" | "none";
interface UsePressableOptions {
    /** Called when press completes */
    onPress?: () => void;
    /** Called when long press fires (default 500ms) */
    onLongPress?: () => void;
    /** Minimum duration in ms for long press */
    longPressMinDuration?: number;
    /** Prevent all interaction */
    disabled?: boolean;
    /** Visual feedback style on press */
    feedbackMode?: PressFeedbackMode;
    /** Accessibility label (required for icon-only buttons) */
    accessibilityLabel?: string;
    /** Accessibility hint */
    accessibilityHint?: string;
    /** Override the accessibility role */
    accessibilityRole?: AccessibilityRole;
    /** Haptic feedback — requires expo-haptics or react-native-haptic-feedback */
    haptic?: boolean;
}
interface UsePressableReturn {
    /** Attach to Reanimated.View as animatedStyle */
    animatedStyle: ReturnType<typeof useAnimatedStyle>;
    /** Pass to GestureDetector gesture prop */
    gesture: ReturnType<typeof Gesture.Simultaneous>;
    /** Spread onto View for accessibility */
    accessibilityProps: {
        accessible: boolean;
        accessibilityRole: AccessibilityRole;
        accessibilityLabel?: string;
        accessibilityHint?: string;
        accessibilityState: {
            disabled: boolean;
        };
    };
    /** True while finger is down */
    isPressed: boolean;
}
declare function usePressable({ onPress, onLongPress, longPressMinDuration, disabled, feedbackMode, accessibilityLabel, accessibilityHint, accessibilityRole, haptic, }?: UsePressableOptions): UsePressableReturn;

interface UseDisclosureOptions {
    /** Initial open state */
    defaultOpen?: boolean;
    /** Controlled open state */
    isOpen?: boolean;
    /** Called when state changes to open */
    onOpen?: () => void;
    /** Called when state changes to closed */
    onClose?: () => void;
}
interface UseDisclosureReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    /** Spread onto trigger element */
    triggerProps: {
        onPress: () => void;
        accessibilityState: {
            expanded: boolean;
        };
    };
    /** Spread onto controlled element */
    contentProps: {
        accessibilityViewIsModal?: boolean;
    };
}
declare function useDisclosure({ defaultOpen, isOpen: controlledOpen, onOpen, onClose, }?: UseDisclosureOptions): UseDisclosureReturn;

type FieldValidator<T> = (value: T) => string | undefined | Promise<string | undefined>;
interface UseFieldOptions<T> {
    /** Initial value */
    defaultValue: T;
    /** Sync or async validator — return error string or undefined */
    validate?: FieldValidator<T>;
    /** Run validation on every change (default: only on blur) */
    validateOnChange?: boolean;
}
interface UseFieldReturn<T> {
    value: T;
    error: string | undefined;
    touched: boolean;
    isValidating: boolean;
    /** Call on input change */
    onChange: (value: T) => void;
    /** Call on input blur */
    onBlur: () => void;
    /** Reset to defaultValue, clear error and touched */
    reset: () => void;
    /** Programmatically set error */
    setError: (error: string | undefined) => void;
    /** Spread onto native TextInput */
    inputProps: {
        value: string;
        onChangeText: (text: string) => void;
        onBlur: () => void;
    };
}
declare function useField<T = string>({ defaultValue, validate, validateOnChange, }: UseFieldOptions<T>): UseFieldReturn<T>;

type ToastVariant = "default" | "success" | "warning" | "error" | "info";
type ToastPosition = "top" | "bottom";
interface ToastItem {
    id: string;
    message: string;
    variant: ToastVariant;
    duration: number;
    /** If true, user must dismiss manually */
    persistent: boolean;
    /** Optional action button */
    action?: {
        label: string;
        onPress: () => void;
    };
    /** Optional custom icon */
    icon?: React.ReactNode;
}
interface ShowToastOptions {
    message: string;
    variant?: ToastVariant;
    /** Duration in ms before auto-dismiss. Default 3500. */
    duration?: number;
    persistent?: boolean;
    action?: ToastItem["action"];
    /** Optional custom icon */
    icon?: React.ReactNode;
}
declare function showToast(options: ShowToastOptions): string;
declare function dismissToast(id: string): void;
declare function dismissAllToasts(): void;
interface UseToastReturn {
    /** Current visible toasts */
    toasts: ToastItem[];
    /** Show a new toast, returns its id */
    show: (options: ShowToastOptions) => string;
    /** Dismiss a toast by id */
    dismiss: (id: string) => void;
    /** Dismiss all toasts */
    dismissAll: () => void;
    /** Shorthand helpers */
    success: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
    error: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
    warning: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
    info: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
}
declare function useToast(): UseToastReturn;

type SnapPoint = number | `${number}%`;
interface UseBottomSheetOptions {
    /** Snap points from bottom. e.g. ['25%', '50%', '90%'] or [200, 400] */
    snapPoints?: SnapPoint[];
    /** Index of the initial snap point */
    initialSnapIndex?: number;
    /** Called when sheet fully closes */
    onClose?: () => void;
    /** Called when snap point changes */
    onSnapChange?: (index: number) => void;
    /** Allow dismissal by swiping down past lowest snap point */
    enableDismissOnSwipe?: boolean;
    /** Dim the backdrop */
    enableBackdrop?: boolean;
}
interface UseBottomSheetReturn {
    /** Is the sheet currently visible */
    isOpen: boolean;
    /** Open to a snap point index (default: last/highest) */
    open: (snapIndex?: number) => void;
    /** Animate closed */
    close: () => void;
    /** Snap to a specific index */
    snapTo: (index: number) => void;
    /** Current snap index */
    currentSnapIndex: number;
    /** Animated translateY for the sheet container */
    sheetAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
    /** Animated opacity for the backdrop */
    backdropAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
    /** Pan gesture — attach to the drag handle */
    panGesture: ReturnType<typeof Gesture.Pan>;
    /** Tap gesture — attach to backdrop to close on tap */
    backdropTapGesture: ReturnType<typeof Gesture.Tap>;
}
declare function useBottomSheet({ snapPoints: rawSnapPoints, initialSnapIndex, onClose, onSnapChange, enableDismissOnSwipe, enableBackdrop, }?: UseBottomSheetOptions): UseBottomSheetReturn;

interface UseCheckboxOptions {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    indeterminate?: boolean;
}
interface UseCheckboxReturn {
    isChecked: boolean;
    isIndeterminate: boolean;
    isDisabled: boolean;
    toggle: () => void;
    accessibilityProps: {
        accessible: boolean;
        accessibilityRole: "checkbox";
        accessibilityState: {
            checked: boolean | "mixed";
            disabled: boolean;
        };
    };
}
declare function useCheckbox({ defaultChecked, checked: controlledChecked, onChange, disabled, indeterminate, }?: UseCheckboxOptions): UseCheckboxReturn;

interface UseSwitchOptions {
    defaultOn?: boolean;
    on?: boolean;
    onChange?: (on: boolean) => void;
    disabled?: boolean;
}
interface UseSwitchReturn {
    isOn: boolean;
    isDisabled: boolean;
    toggle: () => void;
    accessibilityProps: {
        accessible: boolean;
        accessibilityRole: "switch";
        accessibilityState: {
            checked: boolean;
            disabled: boolean;
        };
    };
}
declare function useSwitch({ defaultOn, on: controlledOn, onChange, disabled, }?: UseSwitchOptions): UseSwitchReturn;

interface SelectOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
}
interface UseSelectOptions<T = string> {
    options: SelectOption<T>[];
    defaultValue?: T | T[];
    value?: T | T[];
    onChange?: (value: T | T[]) => void;
    multiple?: boolean;
    disabled?: boolean;
    placeholder?: string;
}
interface UseSelectReturn<T = string> {
    selected: T | T[] | undefined;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    selectOption: (value: T) => void;
    clearSelection: () => void;
    isSelected: (value: T) => boolean;
    displayLabel: string;
    triggerProps: {
        onPress: () => void;
        accessibilityState: {
            expanded: boolean;
            disabled: boolean;
        };
    };
}
declare function useSelect<T = string>({ options, defaultValue, value: controlledValue, onChange, multiple, disabled, placeholder, }: UseSelectOptions<T>): UseSelectReturn<T>;

interface UseScrollHeaderOptions {
    /** Maximum height of the header when fully expanded */
    headerMaxHeight: number;
    /** Minimum height of the header when fully collapsed (usually navbar height like 60 or insets.top + 44) */
    headerMinHeight: number;
}
declare function useScrollHeader({ headerMaxHeight, headerMinHeight }: UseScrollHeaderOptions): {
    scrollY: node_modules_react_native_reanimated_lib_typescript.SharedValue<number>;
    scrollHandler: node_modules_react_native_reanimated_lib_typescript.ScrollHandlerProcessed<Record<string, unknown>>;
    headerStyle: {
        height: number;
    };
    imageStyle: {
        transform: any;
    };
    titleStyle: {
        opacity: number;
        transform: {
            translateY: number;
        }[];
    };
    headerBgStyle: {
        opacity: number;
    };
};

declare function useMemoStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(styleFactory: (tokens: SemanticTokens) => T): T;

interface SwipeAction {
    label: string;
    color: string;
    textColor?: string;
    onPress: () => void;
}
interface UseListItemOptions {
    onPress?: () => void;
    onLongPress?: () => void;
    /** Swipe-to-reveal actions on the right side */
    trailingActions?: SwipeAction[];
    /** Swipe-to-reveal actions on the left side */
    leadingActions?: SwipeAction[];
    disabled?: boolean;
}
interface UseListItemReturn {
    itemAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
    trailingActionsStyle: ReturnType<typeof useAnimatedStyle>;
    leadingActionsStyle: ReturnType<typeof useAnimatedStyle>;
    gesture: ReturnType<typeof Gesture.Simultaneous>;
    accessibilityProps: {
        accessible: boolean;
        accessibilityRole: "button";
        accessibilityState: {
            disabled: boolean;
        };
    };
    /** Snap item back to closed */
    close: () => void;
}
declare function useListItem({ onPress, onLongPress, trailingActions, leadingActions, disabled, }?: UseListItemOptions): UseListItemReturn;

interface UseRadioGroupOptions<T = string> {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
    disabled?: boolean;
}
interface UseRadioGroupReturn<T = string> {
    selectedValue: T | undefined;
    select: (value: T) => void;
    isSelected: (value: T) => boolean;
    isDisabled: boolean;
    getItemProps: (value: T, itemDisabled?: boolean) => {
        onPress: () => void;
        accessibilityRole: "radio";
        accessibilityState: {
            checked: boolean;
            disabled: boolean;
        };
    };
}
declare function useRadioGroup<T = string>({ defaultValue, value: controlledValue, onChange, disabled, }?: UseRadioGroupOptions<T>): UseRadioGroupReturn<T>;

interface UseSliderOptions {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    value?: number;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
    disabled?: boolean;
}
interface UseSliderReturn {
    currentValue: number;
    thumbAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
    fillAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
    trackAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
    panGesture: ReturnType<typeof Gesture.Pan>;
    /** Call with the track's measured pixel width */
    onTrackLayout: (width: number) => void;
    percentage: number;
}
declare function useSlider({ min, max, step, defaultValue, value: controlledValue, onChange, onChangeEnd, disabled, }?: UseSliderOptions): UseSliderReturn;

/**
 * Hook to apply default icon styles (size, color) based on component context.
 * Returns an object with style and color for the icon.
 */
declare function useIconStyle(context: "button" | "input" | "list" | "select"): {
    size: 15;
    color: string;
} | {
    size: 17;
    color: string;
};

interface UseTabsOptions<T = string> {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
}
interface UseTabsReturn<T = string> {
    value: T | undefined;
    setValue: (value: T) => void;
    isSelected: (value: T) => boolean;
    getTabProps: (value: T, disabled?: boolean) => {
        onPress: () => void;
        accessibilityRole: "tab";
        accessibilityState: {
            selected: boolean;
            disabled: boolean;
        };
    };
}
declare function useTabs<T = string>({ defaultValue, value: controlledValue, onChange, }?: UseTabsOptions<T>): UseTabsReturn<T>;

interface UseToggleGroupOptions<T = string> {
    value?: T | T[];
    defaultValue?: T | T[];
    onChange?: (value: T | T[] | undefined) => void;
    exclusive?: boolean;
    disabled?: boolean;
}
interface UseToggleGroupReturn<T = string> {
    value: T | T[] | undefined;
    isSelected: (value: T) => boolean;
    toggle: (value: T) => void;
}
declare function useToggleGroup<T = string>({ value: controlledValue, defaultValue, onChange, exclusive, disabled, }?: UseToggleGroupOptions<T>): UseToggleGroupReturn<T>;

interface UseRatingOptions {
    value?: number;
    defaultValue?: number;
    max?: number;
    precision?: number;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: (value: number) => void;
}
interface UseRatingReturn {
    value: number;
    setValue: (value: number) => void;
    max: number;
    precision: number;
    disabled: boolean;
    readOnly: boolean;
}
declare function useRating({ value: controlledValue, defaultValue, max, precision, disabled, readOnly, onChange, }?: UseRatingOptions): UseRatingReturn;

interface UsePaginationOptions {
    count: number;
    page?: number;
    defaultPage?: number;
    siblingCount?: number;
    boundaryCount?: number;
    onChange?: (page: number) => void;
}
type PaginationItem = number | "start-ellipsis" | "end-ellipsis";
interface UsePaginationReturn {
    page: number;
    setPage: (page: number) => void;
    items: PaginationItem[];
}
declare function usePagination({ count, page: controlledPage, defaultPage, siblingCount, boundaryCount, onChange, }: UsePaginationOptions): UsePaginationReturn;

interface UseAutocompleteOptions<T = string> {
    options: T[];
    value?: T | T[];
    defaultValue?: T | T[];
    multiple?: boolean;
    inputValue?: string;
    defaultInputValue?: string;
    onInputChange?: (value: string) => void;
    onChange?: (value: T | T[] | undefined) => void;
    getOptionLabel?: (option: T) => string;
    filterOptions?: (options: T[], inputValue: string) => T[];
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}
interface UseAutocompleteReturn<T = string> {
    value: T | T[] | undefined;
    inputValue: string;
    setInputValue: (value: string) => void;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    isSelected: (value: T) => boolean;
    selectOption: (value: T) => void;
    clear: () => void;
    filteredOptions: T[];
}
declare function useAutocomplete<T = string>({ options, value: controlledValue, defaultValue, multiple, inputValue: controlledInput, defaultInputValue, onInputChange, onChange, getOptionLabel, filterOptions, open: controlledOpen, onOpen, onClose, }: UseAutocompleteOptions<T>): UseAutocompleteReturn<T>;

export { type FieldValidator, type PaginationItem, type PressFeedbackMode, type SelectOption, type ShowToastOptions, type SnapPoint, type SwipeAction, type Theme, type ThemeOverride, ThemeProvider, type ThemeProviderProps, type ToastItem, type ToastPosition, type ToastVariant, type UseAutocompleteOptions, type UseAutocompleteReturn, type UseBottomSheetOptions, type UseBottomSheetReturn, type UseCheckboxOptions, type UseCheckboxReturn, type UseDisclosureOptions, type UseDisclosureReturn, type UseFieldOptions, type UseFieldReturn, type UseListItemOptions, type UseListItemReturn, type UsePaginationOptions, type UsePaginationReturn, type UsePressableOptions, type UsePressableReturn, type UseRadioGroupOptions, type UseRadioGroupReturn, type UseRatingOptions, type UseRatingReturn, type UseScrollHeaderOptions, type UseSelectOptions, type UseSelectReturn, type UseSliderOptions, type UseSliderReturn, type UseSwitchOptions, type UseSwitchReturn, type UseTabsOptions, type UseTabsReturn, type UseToastReturn, type UseToggleGroupOptions, type UseToggleGroupReturn, createTheme, dismissAllToasts, dismissToast, heroTransition, motionEasing, motionPresets, showToast, useAutocomplete, useBottomSheet, useCheckbox, useComponentTokens, useDisclosure, useField, useIconStyle, useIsDark, useListItem, useMemoStyles, usePagination, usePressable, useRadioGroup, useRating, useScrollHeader, useSelect, useSlider, useSwitch, useTabs, useTheme, useToast, useToggleGroup, useTokens };
