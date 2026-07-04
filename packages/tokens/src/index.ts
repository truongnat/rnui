// Primitive tokens — raw values

export type { Brand, BrandColorGroup, DataColors, SyntaxColors } from './brand';
// Brand system — defineBrand, BrandColorGroup, getBrandColors
export { defineBrand, getBrandColors } from './brand';
// Component tokens — per-component recipes (resolveComponentTokens + all 60+ token functions)
export * from './component';
export type {
  DurationKey,
  DurationScaleKey,
  EasingKey,
  MotionExitKey,
  MotionPresetKey,
  PressFeedback,
  SpringConfig,
  TimingPreset,
  TimingPresetKey,
} from './motion';
// Motion tokens — animation presets
export {
  duration,
  durationScale,
  easing,
  focusRingAnimation,
  motionPreset,
  pressFeedback,
  spring,
  timingPreset,
} from './motion';
export type { PrimitiveTokens } from './primitive';
export { primitive } from './primitive';
export type { ColorScheme, SemanticTokens } from './semantic';
// Semantic tokens — light + dark + brand-aware factory
export {
  buildSemanticTokens,
  darkTokens,
  fillColorDefaults,
  lightTokens,
  semanticTokens,
} from './semantic';
export type {
  TypeScaleConfig,
  TypeScaleKey,
  TypeScaleStyle,
} from './typescale';
// Geometric type scale — Astryx-aligned generator + defaults
export {
  computeLineHeight,
  displayScale,
  expandTypeScale,
  sizeAtStep,
  typeScale,
} from './typescale';
