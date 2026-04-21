import type {
  UseSliderReturnRange,
  UseSliderReturnSingle,
} from '@truongdq01/headless';
import { createContext, useContext } from 'react';

/**
 * Shared Slider state available to all sub-components via context.
 */
export interface SliderContextValue {
  /** Resolved current value — number for single, [lo, hi] for range */
  currentValue: number | [number, number];
  /** Lower bound */
  min: number;
  /** Upper bound */
  max: number;
  /** Step increment */
  step: number;
  /** Whether the slider is in range mode */
  isRange: boolean;
  /** Reanimated shared value for single-thumb position ratio (0–1) */
  thumbRatioShared?: UseSliderReturnSingle['thumbRatioShared'];
  /** Reanimated shared value for range low-thumb position ratio (0–1) */
  thumbRatioLowShared?: UseSliderReturnRange['thumbRatioLowShared'];
  /** Reanimated shared value for range high-thumb position ratio (0–1) */
  thumbRatioHighShared?: UseSliderReturnRange['thumbRatioHighShared'];
}

export const SliderContext = createContext<SliderContextValue | null>(null);

/**
 * Consume Slider state from any child of the Slider tree.
 * Throws if used outside a <Slider> root.
 */
export function useSliderContext(): SliderContextValue {
  const ctx = useContext(SliderContext);
  if (!ctx) {
    throw new Error('useSliderContext must be used inside a <Slider> component');
  }
  return ctx;
}
