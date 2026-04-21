import type { SnapPoint } from "@truongdq01/headless";
import { useTheme } from "@truongdq01/headless";
import { forwardRef } from "react";
import { Modal, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetBackdrop } from "./BottomSheetBackdrop";
import { BottomSheetPanel } from "./BottomSheetPanel";
import {
	BOTTOM_SHEET_DEFAULT_SNAP_POINTS,
	BOTTOM_SHEET_EXTRA_BOTTOM_PADDING,
} from "./constants";
import type { BottomSheetProps, BottomSheetRef } from "./types";
import { useBottomSheetModal } from "./useBottomSheetModal";

/**
 * BottomSheet — gesture-driven modal sheet with snapping, backdrop, and handle.
 *
 * Exposes an imperative ref API: `open(snapIndex?)`, `close()`, `snapTo(index)`.
 */
export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
	function BottomSheet(
		{
			children,
			snapPoints = [...BOTTOM_SHEET_DEFAULT_SNAP_POINTS] as SnapPoint[],
			initialSnapIndex,
			onClose,
			onSnapChange,
			enableDismissOnSwipe = true,
			enableBackdrop = true,
			showHandle = true,
			borderRadius,
			accessibilityLabel = "Bottom sheet",
			backdropAccessibilityLabel = "Dismiss bottom sheet",
		},
		ref,
	) {
		const {
			components: { bottomSheet },
		} = useTheme();
		const insets = useSafeAreaInsets();
		const { height: windowHeight } = useWindowDimensions();

		const {
			mounted,
			handleModalShow,
			close,
			sheetAnimatedStyle,
			backdropAnimatedStyle,
			panGesture,
			backdropTapGesture,
		} = useBottomSheetModal(ref, {
			snapPoints,
			initialSnapIndex,
			onClose,
			onSnapChange,
			enableDismissOnSwipe,
			enableBackdrop,
		});

		const paddingBottom = insets.bottom + BOTTOM_SHEET_EXTRA_BOTTOM_PADDING;

		return (
			<Modal
				visible={mounted}
				transparent
				animationType="none"
				onRequestClose={close}
				onShow={handleModalShow}
			>
				<View style={StyleSheet.absoluteFill} pointerEvents="box-none">
					{enableBackdrop && (
						<BottomSheetBackdrop
							animatedStyle={backdropAnimatedStyle}
							tapGesture={backdropTapGesture}
							accessibilityLabel={backdropAccessibilityLabel}
						/>
					)}

					<BottomSheetPanel
						windowHeight={windowHeight}
						paddingBottom={paddingBottom}
						borderRadius={borderRadius}
						containerStyle={bottomSheet.container}
						sheetAnimatedStyle={sheetAnimatedStyle}
						panGesture={panGesture}
						showHandle={showHandle}
						accessibilityLabel={accessibilityLabel}
					>
						{children}
					</BottomSheetPanel>
				</View>
			</Modal>
		);
	},
);

BottomSheet.displayName = "BottomSheet";
