/**
 * Concentric radius — Astryx-aligned.
 *
 * When a rounded container has padding, nested elements need a smaller radius to
 * appear visually concentric. Inner radius = max(0, outerRadius - padding).
 *
 * Reference: https://astryx.atmeta.com/docs/shape
 */
export function concentricRadius(outerRadius: number, padding: number): number {
  return Math.max(0, outerRadius - padding);
}
