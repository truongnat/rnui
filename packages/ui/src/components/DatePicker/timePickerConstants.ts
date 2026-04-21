/** Wheel row height — aligns with common touch targets. */
export const TIME_WHEEL_ROW_HEIGHT = 44;

/** Visible rows in the “window” (odd number so one row is centered). */
export const TIME_WHEEL_VISIBLE_ROWS = 5;

/** Top / bottom padding so the first & last items can scroll to the center line. */
export function timeWheelPaddingVertical(
	rowHeight: number,
	visibleRows: number,
): number {
	return (rowHeight * (visibleRows - 1)) / 2;
}
