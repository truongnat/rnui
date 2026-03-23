import React, { useState, useMemo } from "react";
import { View, Text, Pressable, Platform, Modal } from "react-native";
import { useTokens, useComponentTokens, useIconStyle } from "@truongnat/headless";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "../Icon";

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

export function DatePicker({
    label,
    date,
    onChange,
    placeholder = "Select date",
    disabled = false,
    error,
    icon,
    minimumDate,
    maximumDate,
    mode = "date",
    presets = ["today", "last7", "last30"],
    onPresetChange,
    clearable = true,
}: DatePickerProps) {
    const { datePicker, input } = useComponentTokens();
    const tokens = useTokens();
    const { size: iconSize, color: iconColor } = useIconStyle("input");
    const [showPicker, setShowPicker] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<DatePickerPreset>(null);

    const formattedDate = date
        ? mode === "time"
            ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : mode === "datetime"
                ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : date.toLocaleDateString()
        : "";

    const displayValue = date ? formattedDate : placeholder;

    const getPresetDate = (preset: DatePickerPreset): Date => {
        const now = new Date();
        switch (preset) {
            case "today": return now;
            case "yesterday": return new Date(now.setDate(now.getDate() - 1));
            case "last7": return new Date(now.setDate(now.getDate() - 7));
            case "last30": return new Date(now.setDate(now.getDate() - 30));
            case "last90": return new Date(now.setDate(now.getDate() - 90));
            default: return now;
        }
    };

    const handlePresetPress = (preset: DatePickerPreset) => {
        if (!preset || disabled) return;
        const presetDate = getPresetDate(preset);
        onChange(presetDate);
        setSelectedPreset(preset);
        onPresetChange?.(preset);
    };

    const handleClear = () => {
        setSelectedPreset(null);
        onPresetChange?.(null);
    };

    const handlePressTrigger = () => {
        if (!disabled) setShowPicker(true);
    };

    const handleChange = (_event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShowPicker(false);
        }
        if (selectedDate) {
            setSelectedPreset(null);
            onChange(selectedDate);
        }
    };

    const renderIcon = (node: React.ReactNode) => {
        if (!node) return null;
        if (React.isValidElement(node)) {
            return React.cloneElement(node as React.ReactElement, {
                size: (node.props as any)?.size ?? iconSize,
                color: (node.props as any)?.color ?? iconColor,
            } as any);
        }
        return node;
    };

    const pickerComponent = showPicker ? (
        <DateTimePicker
            value={date ?? new Date()}
            mode={mode}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
        />
    ) : null;

    return (
        <View style={{ gap: tokens.spacing[2], opacity: disabled ? 0.6 : 1 }}>
            {label && (
                <Text style={input.label as any}>
                    {label}
                </Text>
            )}

            {/* Quick presets */}
            {presets && presets.length > 0 && (
                <View style={{ flexDirection: "row", gap: tokens.spacing[2], flexWrap: "wrap" }}>
                    {presets.map((preset) => (
                        <Pressable
                            key={preset}
                            onPress={() => handlePresetPress(preset)}
                            disabled={disabled}
                            style={({ pressed }) => [
                                {
                                    paddingHorizontal: tokens.spacing[3],
                                    paddingVertical: tokens.spacing[2],
                                    backgroundColor: selectedPreset === preset
                                        ? tokens.color.brand.default
                                        : tokens.color.bg.muted,
                                    borderRadius: tokens.radius.full,
                                },
                                { opacity: (disabled || pressed) ? 0.6 : 1 }
                            ]}
                        >
                            <Text
                                style={{
                                    fontSize: tokens.fontSize.sm,
                                    fontWeight: tokens.fontWeight.medium,
                                    color: selectedPreset === preset
                                        ? tokens.color.text.onBrand
                                        : tokens.color.text.secondary,
                                    textTransform: "capitalize",
                                }}
                            >
                                {preset?.replace("last", "Last ").replace("today", "Today").replace("yesterday", "Yesterday")}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}

            {/* Date input field */}
            <Pressable
                onPress={handlePressTrigger}
                disabled={disabled}
                style={[
                    input.container,
                    { height: 48 },
                    error && input.state.error,
                    { opacity: disabled ? 0.6 : 1 }
                ] as any}
            >
                {icon && renderIcon(icon)}
                <Text
                    style={{
                        flex: 1,
                        fontSize: tokens.fontSize.md,
                        color: date ? tokens.color.text.primary : tokens.color.text.tertiary,
                    }}
                >
                    {displayValue}
                </Text>
                {/* Clear button */}
                {clearable && date && (
                    <Pressable onPress={handleClear} hitSlop={8}>
                        <Icon size={18} color={tokens.color.text.tertiary} name={"close" as any} />
                    </Pressable>
                )}
                {/* Calendar icon indicator */}
                <Icon size={18} color={tokens.color.text.tertiary} name={"calendar" as any} />
            </Pressable>

            {error && (
                <Text style={input.errorText as any}>
                    {error}
                </Text>
            )}

            {/* iOS: show picker in Modal overlay */}
            {Platform.OS === "ios" && showPicker && (
                <Modal transparent animationType="slide" visible={showPicker}>
                    <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
                        <View style={{ backgroundColor: tokens.color.surface.default, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 12 }}>
                                <Pressable onPress={() => setShowPicker(false)} hitSlop={12}>
                                    <Text style={{ fontSize: 16, color: tokens.color.brand.default, fontWeight: tokens.fontWeight.semibold }}>
                                        Done
                                    </Text>
                                </Pressable>
                            </View>
                            {pickerComponent}
                        </View>
                    </View>
                </Modal>
            )}

            {/* Android: picker renders as native dialog, just place it */}
            {Platform.OS === "android" && pickerComponent}
        </View>
    );
}
