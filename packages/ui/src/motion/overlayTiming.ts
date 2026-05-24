import { resolveTimingPreset } from '@truongdq01/headless';

/** Scale/fade overlays — dialogs, modals, menus */
export const overlayPopIn = resolveTimingPreset('popIn');
export const overlayPopOut = resolveTimingPreset('popOut');

/** Slide overlays — sheets, drawers, snackbars */
export const overlaySlideIn = resolveTimingPreset('slideIn');
export const overlaySlideOut = resolveTimingPreset('slideOut');

/** Opacity-only transitions — backdrop, fade surfaces */
export const overlayFadeIn = resolveTimingPreset('fadeIn');
export const overlayFadeOut = resolveTimingPreset('fadeOut');
