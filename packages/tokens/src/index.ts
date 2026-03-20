// Primitive tokens — raw values
export { primitive } from "./primitive";
export type { PrimitiveTokens } from "./primitive";

// Brand system — defineBrand, BrandColorGroup, getBrandColors
export { defineBrand, getBrandColors } from "./brand";
export type { Brand, BrandColorGroup } from "./brand";

// Semantic tokens — light + dark + brand-aware factory
export { lightTokens, darkTokens, semanticTokens, buildSemanticTokens } from "./semantic";
export type { SemanticTokens, ColorScheme } from "./semantic";

// Component tokens — per-component recipes
export {
  resolveComponentTokens,
  buttonTokens, inputTokens, cardTokens, badgeTokens, toastTokens,
  avatarTokens, checkboxTokens, switchTokens, radioTokens, sliderTokens,
  chipTokens, fabTokens, dialogTokens,
  tabsTokens, selectTokens, ratingTokens, paginationTokens, timelineTokens,
} from "./component";
export type { ComponentTokens } from "./component";

// Motion tokens — animation presets
export { spring, duration, easing, pressFeedback, motionPreset, timingPreset, focusRingAnimation } from "./motion";
export type { SpringConfig, PressFeedback, TimingPreset, MotionPresetKey, MotionExitKey, TimingPresetKey, DurationKey, EasingKey } from "./motion";
