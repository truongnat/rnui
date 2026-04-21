import { useTheme } from "@truongdq01/headless";
import { memo, useCallback, useLayoutEffect, useMemo } from "react";
import { View } from "react-native";
import type { DatePickerStrings } from "./datePickerTypes";
import { TimeWheelColumn } from "./TimeWheelColumn";
import {
	applyTimeToDate,
	buildMinuteItems,
	HOURS_12_ORDER,
	HOURS_24,
	nearestMinuteInList,
	to12hParts,
	to24hHour,
} from "./timeWheelUtils";

const PERIOD_ITEMS: readonly number[] = [0, 1];

function pad2(n: number): string {
	return n.toString().padStart(2, "0");
}

export interface TimePickerWheelsProps {
	value: Date;
	onChange: (next: Date) => void;
	minuteInterval?: number;
	is24Hour: boolean;
	strings: Pick<
		Required<DatePickerStrings>,
		"hour" | "minute" | "am" | "pm" | "meridiem"
	>;
}

/**
 * Scroll-snap hour / minute wheels (and AM/PM in 12h mode) for the calendar sheet.
 */
export const TimePickerWheels = memo(function TimePickerWheels({
	value,
	onChange,
	minuteInterval = 1,
	is24Hour,
	strings,
}: TimePickerWheelsProps) {
	const { tokens } = useTheme();

	const minuteItems = useMemo(
		() => buildMinuteItems(minuteInterval),
		[minuteInterval],
	);

	const h24 = value.getHours();
	const m = value.getMinutes();

	useLayoutEffect(() => {
		if (minuteItems.includes(m)) return;
		const aligned = nearestMinuteInList(m, minuteItems);
		onChange(applyTimeToDate(value, h24, aligned));
	}, [value, h24, m, minuteItems, onChange]);

	const displayMinute = minuteItems.includes(m)
		? m
		: nearestMinuteInList(m, minuteItems);

	const setTime24 = useCallback(
		(nh: number, nm: number) => {
			onChange(applyTimeToDate(value, nh, nm));
		},
		[value, onChange],
	);

	const parts12 = to12hParts(h24);

	const onHour24Change = useCallback(
		(nh: number) => {
			setTime24(nh, displayMinute);
		},
		[setTime24, displayMinute],
	);

	const onMinuteChange = useCallback(
		(nm: number) => {
			setTime24(h24, nm);
		},
		[setTime24, h24],
	);

	const onHour12Change = useCallback(
		(hour12: number) => {
			const nh = to24hHour(hour12, parts12.isPm);
			setTime24(nh, displayMinute);
		},
		[setTime24, displayMinute, parts12.isPm],
	);

	const onPeriodChange = useCallback(
		(period: number) => {
			const isPm = period === 1;
			const nh = to24hHour(parts12.hour12, isPm);
			setTime24(nh, displayMinute);
		},
		[setTime24, displayMinute, parts12.hour12],
	);

	const formatMinute = useCallback((n: number) => pad2(n), []);

	const hour24Format = useCallback((n: number) => pad2(n), []);

	const hour12Format = useCallback((n: number) => String(n), []);

	const formatPeriod = useCallback(
		(p: number) => (p === 0 ? strings.am : strings.pm),
		[strings.am, strings.pm],
	);

	return (
		<View
			style={{
				flexDirection: "row",
				gap: tokens.spacing[4],
				justifyContent: "center",
				paddingVertical: tokens.spacing[3],
			}}
		>
			{is24Hour ? (
				<>
					<TimeWheelColumn
						items={HOURS_24}
						value={h24}
						onChange={onHour24Change}
						formatItem={hour24Format}
						label={strings.hour}
					/>
					<TimeWheelColumn
						items={minuteItems}
						value={displayMinute}
						onChange={onMinuteChange}
						formatItem={formatMinute}
						label={strings.minute}
					/>
				</>
			) : (
				<>
					<TimeWheelColumn
						items={HOURS_12_ORDER}
						value={parts12.hour12}
						onChange={onHour12Change}
						formatItem={hour12Format}
						label={strings.hour}
						columnWidth={72}
					/>
					<TimeWheelColumn
						items={minuteItems}
						value={displayMinute}
						onChange={onMinuteChange}
						formatItem={formatMinute}
						label={strings.minute}
					/>
					<TimeWheelColumn
						items={PERIOD_ITEMS}
						value={parts12.isPm ? 1 : 0}
						onChange={onPeriodChange}
						formatItem={formatPeriod}
						label={strings.meridiem}
						columnWidth={56}
					/>
				</>
			)}
		</View>
	);
});
