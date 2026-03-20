import React, { useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSelect, useTokens, useIconStyle } from "@rnui/headless";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import type { BottomSheetRef } from "../BottomSheet/BottomSheet";
import type { UseSelectOptions, SelectOption } from "@rnui/headless";

export interface SelectProps<T = string> extends UseSelectOptions<T> {
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  /** Callback to clear error when selection changes */
  onClearError?: () => void;
}

export function Select<T = string>({
  label,
  placeholder = "Select…",
  searchable = false,
  error,
  onClearError,
  options,
  ...hookOptions
}: SelectProps<T>) {
  const tokens = useTokens();
  const sheetRef = useRef<BottomSheetRef>(null);
  const [query, setQuery] = useState("");

  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel,
    triggerProps,
  } = useSelect({ options, ...hookOptions, placeholder });

  const hasSelection = displayLabel !== placeholder;

  const filtered = query
    ? options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    )
    : options;

  const handleSelectOption = (option: SelectOption<T>) => {
    selectOption(option.value);
    onClearError?.();
    close();
  };

  const handleOpen = () => {
    setQuery("");
    sheetRef.current?.open();
    open();
  };

  const handleClose = () => {
    sheetRef.current?.close();
    close();
  };

  const handleSelect = (val: T) => {
    selectOption(val);
    onClearError?.();
    if (!hookOptions.multiple) handleClose();
  };

  const { size: searchIconSize, color: searchIconColor } = useIconStyle("input");

  return (
    <View>
      {label && (
        <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] }}>
          {label}
        </Text>
      )}

      {/* Trigger */}
      <Pressable
        onPress={handleOpen}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 44,
          paddingHorizontal: tokens.spacing[3],
          borderWidth: 1,
          borderColor: error ? tokens.color.border.error : isOpen ? tokens.color.border.focus : tokens.color.border.default,
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.color.surface.default,
        }}
        accessibilityState={{ expanded: isOpen }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: tokens.fontSize.md,
            color: hasSelection ? tokens.color.text.primary : tokens.color.text.tertiary,
          }}
          numberOfLines={1}
        >
          {displayLabel}
        </Text>
        {/* Chevron */}
        <Text style={{ fontSize: 12, color: tokens.color.text.tertiary, marginLeft: 8 }}>
          {isOpen ? "▲" : "▼"}
        </Text>
      </Pressable>

      {error && (
        <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] }}>
          {error}
        </Text>
      )}

      {/* Options sheet */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={searchable || options.length > 6 ? ["70%"] : ["40%"]}
        onClose={close}
        enableBackdrop
        enableDismissOnSwipe
      >
        <View style={{ flex: 1, paddingHorizontal: tokens.spacing[4] }}>
          {/* Search input */}
          {searchable && isOpen && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: tokens.color.border.default,
                borderRadius: tokens.radius.md,
                paddingHorizontal: tokens.spacing[3],
                height: 44,
                marginBottom: tokens.spacing[3],
                backgroundColor: tokens.color.bg.subtle,
              }}
            >
              {/* Custom Magnifying Glass Icon — Standardized */}
              <View style={{ width: searchIconSize, height: searchIconSize, marginRight: 8, alignItems: "center", justifyContent: "center" }}>
                <View style={{
                  width: searchIconSize * 0.7,
                  height: searchIconSize * 0.7,
                  borderRadius: searchIconSize * 0.35,
                  borderWidth: 2,
                  borderColor: searchIconColor,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }} />
                <View style={{
                  width: 2,
                  height: searchIconSize * 0.4,
                  backgroundColor: searchIconColor,
                  borderRadius: 1,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: [{ rotate: "-45deg" }],
                }} />
              </View>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search…"
                placeholderTextColor={tokens.color.text.tertiary}
                style={{ flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" }}
                autoFocus
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery("")} hitSlop={8}>
                  <Text style={{ fontSize: 14, color: tokens.color.text.tertiary }}>✕</Text>
                </Pressable>
              )}
            </View>
          )}

          {/* Option list */}
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {filtered.length === 0 ? (
              <Text style={{ color: tokens.color.text.tertiary, fontSize: tokens.fontSize.sm, textAlign: "center", paddingVertical: tokens.spacing[6] }}>
                No results for "{query}"
              </Text>
            ) : (
              filtered.map((option) => {
                const selected = isSelected(option.value);
                return (
                  <Pressable
                    key={String(option.value)}
                    onPress={() => !option.disabled && handleSelect(option.value)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: tokens.spacing[3],
                      paddingHorizontal: tokens.spacing[2],
                      borderRadius: tokens.radius.md,
                      backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
                      marginBottom: 2,
                      opacity: option.disabled ? 0.4 : 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: tokens.fontSize.md,
                        color: selected ? tokens.color.brand.text : tokens.color.text.primary,
                        fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular,
                      }}
                    >
                      {option.label}
                    </Text>
                    {selected && (
                      <Text style={{ fontSize: 14, color: tokens.color.brand.default }}>✓</Text>
                    )}
                  </Pressable>
                );
              })
            )}
            <View style={{ height: tokens.spacing[4] }} />
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}