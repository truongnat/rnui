import React, { useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useSelect, useTokens, useComponentTokens } from "@rnui/headless";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import type { BottomSheetRef } from "../BottomSheet/BottomSheet";
import type { UseSelectOptions, SelectOption } from "@rnui/headless";
import { Icon } from "../Icon";

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
  const { select } = useComponentTokens();
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
  } = useSelect({ options, ...hookOptions, placeholder });

  const hasSelection = displayLabel !== placeholder;

  const filtered = query
    ? options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    )
    : options;

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
          paddingHorizontal: select.trigger.padding.x,
          paddingVertical: select.trigger.padding.y,
          borderWidth: 1,
          borderColor: error ? tokens.color.border.error : isOpen ? select.trigger.focusBorderColor : select.trigger.borderColor,
          borderRadius: select.trigger.borderRadius,
          backgroundColor: select.trigger.bg,
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
        <Icon size={16} color={tokens.color.text.tertiary}>
          {isOpen ? "chevronUp" : "chevronDown"}
        </Icon>
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
              <View style={{ marginRight: 8 }}>
                <Icon size={20} color={tokens.color.text.tertiary} name={"search" as any} />
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
                  <Icon size={18} color={tokens.color.text.tertiary} name={"close" as any} />
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
                      backgroundColor: selected ? select.option.selected.bg : "transparent",
                      marginBottom: 2,
                      opacity: option.disabled ? 0.4 : 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: tokens.fontSize.md,
                        color: selected ? select.option.selected.color : select.option.default.color,
                        fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular,
                      }}
                    >
                      {option.label}
                    </Text>
                    {selected && (
                      <Icon size={16} color={select.option.selected.color} name={"check" as any} />
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