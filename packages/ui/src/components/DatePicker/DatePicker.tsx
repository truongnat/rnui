import React, { useState } from "react";
import { View, Text, Pressable, Platform, Modal } from "react-native";
import { useTokens, useIconStyle } from "@rnui/headless";
import DateTimePicker from "@react-native-community/datetimepicker";

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
}: DatePickerProps) {
    const tokens = useTokens();
    const { size: iconSize, color: iconColor } = useIconStyle("input");
    const [showPicker, setShowPicker] = useState(false);

    const formattedDate = date
        ? mode === "time"
            ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : mode === "datetime"
                ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : date.toLocaleDateString()
        : "";

    const displayValue = date ? formattedDate : placeholder;

    const handlePressTrigger = () => {
        if (!disabled) setShowPicker(true);
    };

    const handleChange = (_event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            // Android: dismiss on any interaction
            setShowPicker(false);
        }
        if (selectedDate) {
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
        <View style={{ gap: tokens.spacing[1], opacity: disabled ? tokens.opacity[60] : 1 }}>
            {label && (
                <Text
                    style={{
                        fontSize: tokens.fontSize.sm,
                        fontWeight: tokens.fontWeight.medium,
                        color: tokens.color.text.secondary,
                    }}
                >
                    {label}
                </Text>
            )}

            <Pressable
                onPress={handlePressTrigger}
                disabled={disabled}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: 48,
                    paddingHorizontal: tokens.spacing[3],
                    backgroundColor: tokens.color.surface.raised,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: error ? tokens.color.error.border : tokens.color.border.default,
                    gap: tokens.spacing[2],
                }}
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
                {/* Calendar icon indicator */}
                <Text style={{ fontSize: 18, color: tokens.color.text.tertiary }}>📅</Text>
            </Pressable>

            {error && (
                <Text style={{ fontSize: tokens.fontSize.sm, color: tokens.color.error.text }}>
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
