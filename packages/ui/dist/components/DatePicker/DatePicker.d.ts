import React from "react";
export type DatePickerPreset = "today" | "yesterday" | "last7" | "last30" | "last90" | null;
export interface DatePickerProps {
    label?: string;
    date: Date | null;
    onChange: (date: Date) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    icon?: React.ReactNode;
    minimumDate?: Date;
    maximumDate?: Date;
    mode?: "date" | "time" | "datetime";
    presets?: DatePickerPreset[];
    onPresetChange?: (preset: DatePickerPreset) => void;
    clearable?: boolean;
}
export declare function DatePicker({ label, date, onChange, placeholder, disabled, error, icon, minimumDate, maximumDate, mode, presets, onPresetChange, clearable, }: DatePickerProps): React.JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map