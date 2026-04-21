import { useCallback, useState } from "react";

export interface UseBottomNavigationOptions<T> {
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
}

/** Props spread onto each tab `Pressable` from `getItemProps(value)`. */
export interface BottomNavigationItemProps {
	onPress: () => void;
	accessibilityRole: "tab";
	accessibilityState: { selected: boolean };
}

export interface UseBottomNavigationReturn<T> {
	value: T;
	selectValue: (val: T) => void;
	isSelected: (val: T) => boolean;
	getItemProps: (val: T) => BottomNavigationItemProps;
}

export function useBottomNavigation<T>({
	value: controlledValue,
	defaultValue,
	onChange,
}: UseBottomNavigationOptions<T>): UseBottomNavigationReturn<T> {
	const [internalValue, setInternalValue] = useState<T>(defaultValue as T);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;

	const isSelected = useCallback((val: T) => value === val, [value]);

	const selectValue = useCallback(
		(val: T) => {
			if (!isControlled) setInternalValue(val);
			onChange?.(val);
		},
		[isControlled, onChange],
	);

	const getItemProps = useCallback(
		(val: T): BottomNavigationItemProps => ({
			onPress: () => selectValue(val),
			accessibilityRole: "tab",
			accessibilityState: { selected: isSelected(val) },
		}),
		[selectValue, isSelected],
	);

	return {
		value,
		selectValue,
		isSelected,
		getItemProps,
	};
}
