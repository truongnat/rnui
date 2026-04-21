import { useTheme } from "@truongdq01/headless";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import {
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	TIME_WHEEL_ROW_HEIGHT,
	TIME_WHEEL_VISIBLE_ROWS,
	timeWheelPaddingVertical,
} from "./timePickerConstants";

export interface TimeWheelColumnProps {
	items: readonly number[];
	value: number;
	onChange: (v: number) => void;
	formatItem: (n: number) => string;
	label: string;
	columnWidth?: number;
	rowHeight?: number;
	visibleRows?: number;
}

export const TimeWheelColumn = memo(function TimeWheelColumn({
	items,
	value,
	onChange,
	formatItem,
	label,
	columnWidth = 76,
	rowHeight = TIME_WHEEL_ROW_HEIGHT,
	visibleRows = TIME_WHEEL_VISIBLE_ROWS,
}: TimeWheelColumnProps) {
	const { tokens } = useTheme();
	const scrollRef = useRef<ScrollView>(null);
	const pad = timeWheelPaddingVertical(rowHeight, visibleRows);
	const listHeight = rowHeight * visibleRows;

	const indexForValue = useCallback(
		(v: number) => {
			const i = items.indexOf(v);
			return i >= 0 ? i : 0;
		},
		[items],
	);

	useLayoutEffect(() => {
		const i = indexForValue(value);
		scrollRef.current?.scrollTo({
			y: i * rowHeight,
			animated: false,
		});
	}, [value, indexForValue, rowHeight]);

	const onMomentumScrollEnd = useCallback(
		(e: NativeSyntheticEvent<NativeScrollEvent>) => {
			const y = e.nativeEvent.contentOffset.y;
			const idx = Math.round(y / rowHeight);
			const clamped = Math.max(0, Math.min(items.length - 1, idx));
			const next = items[clamped];
			if (next !== undefined && next !== value) {
				onChange(next);
			}
		},
		[items, rowHeight, onChange, value],
	);

	return (
		<View style={{ width: columnWidth }}>
			<Text
				style={{
					textAlign: "center",
					fontSize: tokens.fontSize.xs,
					fontWeight: tokens.fontWeight.medium,
					color: tokens.color.text.tertiary,
					marginBottom: 6,
				}}
				numberOfLines={1}
			>
				{label}
			</Text>
			<View style={{ height: listHeight, position: "relative" }}>
				<View
					pointerEvents="none"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: pad,
						height: rowHeight,
						borderTopWidth: StyleSheet.hairlineWidth,
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderColor: tokens.color.border.subtle,
						zIndex: 1,
					}}
				/>
				<ScrollView
					ref={scrollRef}
					style={{ zIndex: 2 }}
					showsVerticalScrollIndicator={false}
					snapToInterval={rowHeight}
					decelerationRate="fast"
					bounces={false}
					nestedScrollEnabled
					contentContainerStyle={{
						paddingVertical: pad,
					}}
					onMomentumScrollEnd={onMomentumScrollEnd}
				>
					{items.map((item) => {
						const selected = item === value;
						return (
							<Pressable
								key={String(item)}
								onPress={() => onChange(item)}
								style={{
									height: rowHeight,
									alignItems: "center",
									justifyContent: "center",
								}}
								accessibilityRole="button"
								accessibilityState={{ selected }}
							>
								<Text
									style={{
										fontSize: tokens.fontSize.lg,
										fontWeight: selected
											? tokens.fontWeight.semibold
											: tokens.fontWeight.regular,
										color: selected
											? tokens.color.brand.text
											: tokens.color.text.primary,
									}}
								>
									{formatItem(item)}
								</Text>
							</Pressable>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
});
