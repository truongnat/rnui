import type { SnapPoint } from "@truongdq01/headless";
import { useBottomSheet } from "@truongdq01/headless";
import type { ForwardedRef } from "react";
import { useCallback, useImperativeHandle, useState } from "react";
import type { BottomSheetRef } from "./types";

type UseBottomSheetModalOptions = {
	snapPoints: SnapPoint[];
	initialSnapIndex?: number;
	onClose?: () => void;
	onSnapChange?: (index: number) => void;
	enableDismissOnSwipe: boolean;
	enableBackdrop: boolean;
};

/**
 * Bridges imperative `ref.open()` with `Modal` mount timing: the sheet hook
 * only runs animations after the modal has mounted (`onShow`).
 */
export function useBottomSheetModal(
	ref: ForwardedRef<BottomSheetRef>,
	{
		snapPoints,
		initialSnapIndex,
		onClose,
		onSnapChange,
		enableDismissOnSwipe,
		enableBackdrop,
	}: UseBottomSheetModalOptions,
) {
	const [mounted, setMounted] = useState(false);
	const [pendingSnapIndex, setPendingSnapIndex] = useState<number | undefined>(
		undefined,
	);

	const handleClose = useCallback(() => {
		setMounted(false);
		onClose?.();
	}, [onClose]);

	const {
		open: baseOpen,
		close,
		snapTo,
		sheetAnimatedStyle,
		backdropAnimatedStyle,
		panGesture,
		backdropTapGesture,
	} = useBottomSheet({
		snapPoints,
		initialSnapIndex,
		onClose: handleClose,
		onSnapChange,
		enableDismissOnSwipe,
		enableBackdrop,
	});

	const open = useCallback((idx?: number) => {
		setPendingSnapIndex(idx);
		setMounted(true);
	}, []);

	const handleModalShow = useCallback(() => {
		baseOpen(pendingSnapIndex);
		setPendingSnapIndex(undefined);
	}, [baseOpen, pendingSnapIndex]);

	useImperativeHandle(ref, () => ({ open, close, snapTo }), [
		open,
		close,
		snapTo,
	]);

	return {
		mounted,
		handleModalShow,
		close,
		sheetAnimatedStyle,
		backdropAnimatedStyle,
		panGesture,
		backdropTapGesture,
	};
}
