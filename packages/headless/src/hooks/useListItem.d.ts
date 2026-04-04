import { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
export interface SwipeAction {
  label: string;
  color: string;
  textColor?: string;
  onPress: () => void;
}
export interface UseListItemOptions {
  onPress?: () => void;
  onLongPress?: () => void;
  /** Swipe-to-reveal actions on the right side */
  trailingActions?: SwipeAction[];
  /** Swipe-to-reveal actions on the left side */
  leadingActions?: SwipeAction[];
  disabled?: boolean;
}
export interface UseListItemReturn {
  itemAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  trailingActionsStyle: ReturnType<typeof useAnimatedStyle>;
  leadingActionsStyle: ReturnType<typeof useAnimatedStyle>;
  gesture: ReturnType<typeof Gesture.Simultaneous>;
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: 'button';
    accessibilityState: {
      disabled: boolean;
    };
  };
  /** Snap item back to closed */
  close: () => void;
}
export declare function useListItem({
  onPress,
  onLongPress,
  trailingActions,
  leadingActions,
  disabled,
}?: UseListItemOptions): UseListItemReturn;
//# sourceMappingURL=useListItem.d.ts.map
