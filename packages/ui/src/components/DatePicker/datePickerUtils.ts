import { DATE_PICKER_YEAR_SPAN } from "./datePickerConstants";
import type {
	DatePickerPreset,
	DatePickerStrings,
	PickerSurface,
} from "./datePickerTypes";

export function defaultStrings(): Required<DatePickerStrings> {
	return {
		titleDate: "Select date",
		titleTime: "Select time",
		titleDateTime: "Select date & time",
		selectMonth: "Select month",
		selectYear: "Select year",
		confirm: "Confirm",
		cancel: "Cancel",
		today: "Today",
		done: "Done",
		hour: "Hour",
		minute: "Minute",
		am: "AM",
		pm: "PM",
		meridiem: "AM/PM",
	};
}

export function mergeStrings(
	s?: DatePickerStrings,
): Required<DatePickerStrings> {
	const d = defaultStrings();
	if (!s) return d;
	return {
		titleDate: s.titleDate ?? d.titleDate,
		titleTime: s.titleTime ?? d.titleTime,
		titleDateTime: s.titleDateTime ?? d.titleDateTime,
		selectMonth: s.selectMonth ?? d.selectMonth,
		selectYear: s.selectYear ?? d.selectYear,
		confirm: s.confirm ?? d.confirm,
		cancel: s.cancel ?? d.cancel,
		today: s.today ?? d.today,
		done: s.done ?? d.done,
		hour: s.hour ?? d.hour,
		minute: s.minute ?? d.minute,
		am: s.am ?? d.am,
		pm: s.pm ?? d.pm,
		meridiem: s.meridiem ?? d.meridiem,
	};
}

/** Resolve 12h vs 24h wheel when `explicit` is not set (uses `Intl` hourCycle when possible). */
export function resolveIs24HourClock(
	explicit: boolean | undefined,
	locale?: string,
): boolean {
	if (explicit !== undefined) return explicit;
	try {
		const opts = new Intl.DateTimeFormat(locale, {
			hour: "numeric",
		}).resolvedOptions() as { hourCycle?: string };
		return opts.hourCycle !== "h12";
	} catch {
		return true;
	}
}

export function defaultFormatOptions(
	mode: "date" | "time" | "datetime",
): Intl.DateTimeFormatOptions {
	switch (mode) {
		case "time":
			return { hour: "2-digit", minute: "2-digit" };
		case "datetime":
			return { dateStyle: "medium", timeStyle: "short" };
		default:
			return { dateStyle: "medium" };
	}
}

export function getPresetDate(preset: DatePickerPreset): Date {
	const now = new Date();
	switch (preset) {
		case "today":
			return new Date(now.getTime());
		case "yesterday": {
			const d = new Date(now.getTime());
			d.setDate(d.getDate() - 1);
			return d;
		}
		case "last7": {
			const d = new Date(now.getTime());
			d.setDate(d.getDate() - 7);
			return d;
		}
		case "last30": {
			const d = new Date(now.getTime());
			d.setDate(d.getDate() - 30);
			return d;
		}
		case "last90": {
			const d = new Date(now.getTime());
			d.setDate(d.getDate() - 90);
			return d;
		}
		default:
			return new Date(now.getTime());
	}
}

export function presetChipLabel(preset: DatePickerPreset): string {
	if (!preset) return "";
	return preset
		.replace("last", "Last ")
		.replace("today", "Today")
		.replace("yesterday", "Yesterday");
}

export function buildMonthNamesShort(locale?: string): string[] {
	return Array.from({ length: 12 }, (_, m) =>
		new Intl.DateTimeFormat(locale, { month: "short" }).format(
			new Date(2000, m, 1),
		),
	);
}

/** Year chips centered roughly on `calYear` (same range as previous implementation). */
export function buildYearOptions(calYear: number): number[] {
	return Array.from(
		{ length: DATE_PICKER_YEAR_SPAN },
		(_, i) => calYear - 5 + i,
	);
}

export function resolveModalTitle(
	mode: "date" | "time" | "datetime",
	surface: PickerSurface,
	str: Required<DatePickerStrings>,
): string {
	if (surface === "year") return str.selectYear;
	if (surface === "month") return str.selectMonth;
	if (mode === "time") return str.titleTime;
	if (mode === "datetime") return str.titleDateTime;
	return str.titleDate;
}
