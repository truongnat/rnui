import { useTokens } from "@truongdq01/headless";
import { useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../Icon";

export interface CalendarGridProps {
	month: number;
	year: number;
	selectedDate: Date | null;
	onSelectDate: (date: Date) => void;
	onMonthChange: (month: number, year: number) => void;
	minimumDate?: Date;
	maximumDate?: Date;
	/** BCP 47 locale for month title and weekday labels (default `undefined` = runtime default). */
	locale?: string;
	/** Tap the month name in the header (e.g. open month picker). */
	onMonthTitlePress?: () => void;
	/** Tap the year number in the header (e.g. open year picker). */
	onYearTitlePress?: () => void;
}

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isToday(d: Date): boolean {
	return isSameDay(d, new Date());
}

function isDateDisabled(d: Date, min?: Date, max?: Date): boolean {
	if (min) {
		const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
		if (d < minDay) return true;
	}
	if (max) {
		const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
		if (d > maxDay) return true;
	}
	return false;
}

export function CalendarGrid({
	month,
	year,
	selectedDate,
	onSelectDate,
	onMonthChange,
	minimumDate,
	maximumDate,
	locale,
	onMonthTitlePress,
	onYearTitlePress,
}: CalendarGridProps) {
	const t = useTokens();

	const weekdayLabels = useMemo(() => {
		const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
		const baseMonday = new Date(2024, 0, 8);
		return Array.from({ length: 7 }, (_, i) =>
			formatter.format(
				new Date(
					baseMonday.getFullYear(),
					baseMonday.getMonth(),
					baseMonday.getDate() + i,
				),
			),
		);
	}, [locale]);

	const monthLabelOnly = useMemo(
		() =>
			new Intl.DateTimeFormat(locale, { month: "long" }).format(
				new Date(year, month, 1),
			),
		[locale, year, month],
	);

	const yearLabelOnly = useMemo(() => String(year), [year]);

	const goPrev = useCallback(() => {
		if (month === 0) onMonthChange(11, year - 1);
		else onMonthChange(month - 1, year);
	}, [month, year, onMonthChange]);

	const goNext = useCallback(() => {
		if (month === 11) onMonthChange(0, year + 1);
		else onMonthChange(month + 1, year);
	}, [month, year, onMonthChange]);

	const cells = useMemo(() => {
		const firstDay = new Date(year, month, 1);
		let startWeekday = firstDay.getDay() - 1;
		if (startWeekday < 0) startWeekday = 6;

		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const daysInPrevMonth = new Date(year, month, 0).getDate();

		const rows: { date: Date; inMonth: boolean }[][] = [];
		let row: { date: Date; inMonth: boolean }[] = [];

		for (let i = 0; i < startWeekday; i++) {
			const day = daysInPrevMonth - startWeekday + 1 + i;
			const prevMonth = month === 0 ? 11 : month - 1;
			const prevYear = month === 0 ? year - 1 : year;
			row.push({ date: new Date(prevYear, prevMonth, day), inMonth: false });
		}

		for (let d = 1; d <= daysInMonth; d++) {
			row.push({ date: new Date(year, month, d), inMonth: true });
			if (row.length === 7) {
				rows.push(row);
				row = [];
			}
		}

		if (row.length > 0) {
			let nextDay = 1;
			const nextMonth = month === 11 ? 0 : month + 1;
			const nextYear = month === 11 ? year + 1 : year;
			while (row.length < 7) {
				row.push({
					date: new Date(nextYear, nextMonth, nextDay++),
					inMonth: false,
				});
			}
			rows.push(row);
		}

		return rows;
	}, [month, year]);

	const cellSize = 40;

	const monthTitleStyle = {
		fontSize: t.fontSize.lg,
		fontWeight: t.fontWeight.semibold,
		color: t.color.text.primary,
	};

	return (
		<View>
			{/* Month navigation */}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingHorizontal: 4,
					marginBottom: t.spacing[3],
				}}
			>
				<Pressable
					onPress={goPrev}
					hitSlop={12}
					accessibilityLabel="Previous month"
					accessibilityRole="button"
				>
					<Icon name="chevronLeft" size={22} color={t.color.text.secondary} />
				</Pressable>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						flexShrink: 1,
						gap: t.spacing[1],
					}}
				>
					{onMonthTitlePress ? (
						<Pressable
							onPress={onMonthTitlePress}
							hitSlop={8}
							accessibilityRole="button"
							accessibilityLabel="Choose month"
						>
							<Text style={monthTitleStyle}>{monthLabelOnly}</Text>
						</Pressable>
					) : (
						<Text style={monthTitleStyle}>{monthLabelOnly}</Text>
					)}
					{onYearTitlePress ? (
						<Pressable
							onPress={onYearTitlePress}
							hitSlop={8}
							accessibilityRole="button"
							accessibilityLabel="Choose year"
						>
							<Text style={monthTitleStyle}>{yearLabelOnly}</Text>
						</Pressable>
					) : (
						<Text style={monthTitleStyle}>{yearLabelOnly}</Text>
					)}
				</View>
				<Pressable
					onPress={goNext}
					hitSlop={12}
					accessibilityLabel="Next month"
					accessibilityRole="button"
				>
					<Icon name="chevronRight" size={22} color={t.color.text.secondary} />
				</Pressable>
			</View>

			{/* Weekday headers */}
			<View style={{ flexDirection: "row" }}>
				{weekdayLabels.map((wd) => (
					<View
						key={wd}
						style={{
							flex: 1,
							alignItems: "center",
							paddingBottom: t.spacing[2],
						}}
					>
						<Text
							style={{
								fontSize: t.fontSize.xs,
								fontWeight: t.fontWeight.medium,
								color: t.color.text.tertiary,
							}}
						>
							{wd}
						</Text>
					</View>
				))}
			</View>

			{/* Day grid */}
			{cells.map((row) => (
				<View key={row[0].date.toISOString()} style={{ flexDirection: "row" }}>
					{row.map((cell) => {
						const selected = selectedDate
							? isSameDay(cell.date, selectedDate)
							: false;
						const today = isToday(cell.date);
						const disabled =
							!cell.inMonth ||
							isDateDisabled(cell.date, minimumDate, maximumDate);

						return (
							<Pressable
								key={cell.date.toISOString()}
								onPress={() => {
									if (!disabled) onSelectDate(cell.date);
								}}
								disabled={disabled}
								accessibilityRole="button"
								accessibilityLabel={cell.date.toDateString()}
								accessibilityState={{ selected, disabled }}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									height: cellSize,
								}}
							>
								<View
									style={{
										width: 36,
										height: 36,
										borderRadius: 18,
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: selected
											? t.color.brand.default
											: "transparent",
										borderWidth: today && !selected ? 1.5 : 0,
										borderColor:
											today && !selected
												? t.color.brand.default
												: "transparent",
									}}
								>
									<Text
										style={{
											fontSize: t.fontSize.sm,
											fontWeight:
												selected || today
													? t.fontWeight.semibold
													: t.fontWeight.regular,
											color: selected
												? t.color.text.onBrand
												: disabled
													? t.color.text.disabled
													: t.color.text.primary,
										}}
									>
										{cell.date.getDate()}
									</Text>
								</View>
							</Pressable>
						);
					})}
				</View>
			))}
		</View>
	);
}
