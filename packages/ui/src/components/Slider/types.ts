import type {
  UseSliderOptions,
  UseSliderOptionsRange,
  UseSliderOptionsSingle,
  UseSliderReturnRange,
  UseSliderReturnSingle,
} from '@truongdq01/headless';
import type React from 'react';
import type { TextStyle } from 'react-native';

/**
 * UI-only props shared by both single and range Slider modes.
 */
export interface SliderUiProps {
  /** Unique identifier for the slider component */
  id?: string;
  label?: string;
  /** Show current value (single) or "lo – hi" (range) */
  showValue?: boolean;
  formatValue?: (v: number) => string;
  /** Min / max labels under the track */
  showMinMaxLabels?: boolean;
  showMarks?: boolean;
  /** Vertical track height when `orientation="vertical"` */
  sliderHeight?: number;
  /** Replace default thumb circle */
  thumbRenderer?: (args: {
    kind: 'single' | 'low' | 'high';
    value: number;
  }) => React.ReactNode;
}

/**
 * Public props for the Slider root component.
 */
export type SliderProps =
  | (SliderUiProps & UseSliderOptionsSingle)
  | (SliderUiProps & UseSliderOptionsRange);

/**
 * All options passed to the headless useSlider hook.
 */
export type SliderHookOptions = UseSliderOptions;

/**
 * Shared text style used by live value labels.
 */
export type LiveValueStyle = Pick<TextStyle, 'fontSize' | 'fontWeight' | 'color'>;

/**
 * Props for the SliderTrack sub-component.
 */
export interface SliderTrackProps {
  isVertical: boolean;
  sliderHeight: number;
  trackThickness: number;
  thumbW: number;
  thumbH: number;
  trackPad: number;
  fillAnimatedStyle: object;
  trackAnimatedStyle: object;
  onTrackLayout: (size: number) => void;
  children?: React.ReactNode;
}

/**
 * Props for the SliderThumb sub-component.
 */
export interface SliderThumbProps {
  animatedStyle: object;
  thumbShellStyle: object;
  kind: 'single' | 'low' | 'high';
  value: number;
  thumbRenderer?: (args: { kind: 'single' | 'low' | 'high'; value: number }) => React.ReactNode;
}

/**
 * Props for the SliderMark sub-component.
 */
export interface SliderMarkProps {
  mark: number;
  min: number;
  max: number;
  /** Whether this mark is within the active (filled) range */
  isActive: boolean;
  thumbH: number;
  trackPad: number;
}

/**
 * Props for the SliderValueLabel sub-component (live animated text).
 */
export interface SliderValueLabelSingleProps {
  show: boolean;
  thumbRatioShared: UseSliderReturnSingle['thumbRatioShared'];
  min: number;
  max: number;
  step: number;
  style: LiveValueStyle;
}

export interface SliderValueLabelRangeProps {
  show: boolean;
  thumbRatioLowShared: UseSliderReturnRange['thumbRatioLowShared'];
  thumbRatioHighShared: UseSliderReturnRange['thumbRatioHighShared'];
  min: number;
  max: number;
  step: number;
  style: LiveValueStyle;
}
