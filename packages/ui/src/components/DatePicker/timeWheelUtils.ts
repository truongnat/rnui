/** Build minute values 0..59 stepped by `interval` (e.g. 15 → 0,15,30,45). */
export function buildMinuteItems(interval: number): number[] {
	if (interval <= 1) {
		return Array.from({ length: 60 }, (_, i) => i);
	}
	const out: number[] = [];
	for (let m = 0; m < 60; m += interval) {
		out.push(m);
	}
	return out;
}

/** Snap `minute` to the closest value in `items` (sorted). */
export function nearestMinuteInList(minute: number, items: number[]): number {
	if (items.length === 0) return minute;
	return items.reduce((best, x) =>
		Math.abs(x - minute) < Math.abs(best - minute) ? x : best,
	);
}

export function alignMinuteToInterval(minute: number, interval: number): number {
	if (interval <= 1) return Math.min(59, Math.max(0, minute));
	const rounded = Math.round(minute / interval) * interval;
	return Math.min(59, Math.max(0, rounded));
}

/** 24h → 12h display + period */
export function to12hParts(hour24: number): { hour12: number; isPm: boolean } {
	if (hour24 === 0) return { hour12: 12, isPm: false };
	if (hour24 === 12) return { hour12: 12, isPm: true };
	if (hour24 < 12) return { hour12: hour24, isPm: false };
	return { hour12: hour24 - 12, isPm: true };
}

/** 12h + AM/PM → 24h */
export function to24hHour(hour12: number, isPm: boolean): number {
	if (!isPm) {
		if (hour12 === 12) return 0;
		return hour12;
	}
	if (hour12 === 12) return 12;
	return hour12 + 12;
}

export const HOURS_24 = Object.freeze(
	Array.from({ length: 24 }, (_, i) => i),
);

/** 12h wheel order (12 first — common clock / iOS-style). */
export const HOURS_12_ORDER = Object.freeze([
	12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
]);

export function applyTimeToDate(
	base: Date,
	hour24: number,
	minute: number,
): Date {
	const d = new Date(base);
	d.setHours(hour24, minute, 0, 0);
	return d;
}
