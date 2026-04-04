import { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
export interface UseSliderOptions {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  disabled?: boolean;
}
export interface UseSliderReturn {
  currentValue: number;
  thumbAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  fillAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  trackAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  panGesture: ReturnType<typeof Gesture.Pan>;
  /** Call with the track's measured pixel width */
  onTrackLayout: (width: number) => void;
  percentage: number;
}
export declare function useSlider({
  min,
  max,
  step,
  defaultValue,
  value: controlledValue,
  onChange,
  onChangeEnd,
  disabled,
}?: UseSliderOptions): UseSliderReturn;
//# sourceMappingURL=useSlider.d.ts.map
