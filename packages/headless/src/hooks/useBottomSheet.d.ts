import { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
export type SnapPoint = number | `${number}%`;
export interface UseBottomSheetOptions {
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
export interface UseBottomSheetReturn {
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
export declare function useBottomSheet({
  snapPoints: rawSnapPoints,
  initialSnapIndex,
  onClose,
  onSnapChange,
  enableDismissOnSwipe,
  enableBackdrop,
}?: UseBottomSheetOptions): UseBottomSheetReturn;
//# sourceMappingURL=useBottomSheet.d.ts.map
