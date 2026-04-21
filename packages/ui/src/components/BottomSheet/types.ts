import type {
	UseBottomSheetOptions,
	UseBottomSheetReturn,
} from "@truongdq01/headless";
import type React from "react";

/**
 * Public imperative handle exposed via forwardRef.
 */
export interface BottomSheetRef {
	open: (snapIndex?: number) => void;
	close: () => void;
	snapTo: (index: number) => void;
}

/**
 * Props for the root BottomSheet component.
 */
export interface BottomSheetProps extends UseBottomSheetOptions {
	children: React.ReactNode;
	/** Show the pill-shaped drag handle at top */
	showHandle?: boolean;
	/** Horizontal border radius on the sheet. If not provided, uses theme token. */
	borderRadius?: number;
	/** Accessibility label for the sheet container */
	accessibilityLabel?: string;
	/** Accessibility label for the backdrop dismiss button */
	backdropAccessibilityLabel?: string;
}

/**
 * Props for the BottomSheetHandle sub-component.
 */
export interface BottomSheetHandleProps {
	/** Whether to render the handle at all */
	visible: boolean;
}

/**
 * Props for the BottomSheetBackdrop sub-component.
 */
export interface BottomSheetBackdropProps {
	/** The Reanimated animated style providing backdrop opacity */
	animatedStyle: UseBottomSheetReturn["backdropAnimatedStyle"];
	/** Gesture detector tap gesture for dismissal */
	tapGesture: UseBottomSheetReturn["backdropTapGesture"];
	/** Accessibility label for the dismiss button */
	accessibilityLabel?: string;
}

/**
 * Props for the BottomSheetContent sub-component.
 */
export interface BottomSheetContentProps {
	children: React.ReactNode;
}
