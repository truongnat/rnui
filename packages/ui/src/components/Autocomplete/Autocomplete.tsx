import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAutocomplete, useTokens } from "@rnui/headless";
import { Input } from "../Input/Input";

export interface AutocompleteProps<T = string> {
  options: T[];
  value?: T | T[];
  defaultValue?: T | T[];
  multiple?: boolean;
  getOptionLabel?: (option: T) => string;
  renderOption?: (option: T, selected: boolean) => React.ReactNode;
  onChange?: (value: T | T[] | undefined) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export function Autocomplete<T = string>({
  options,
  value,
  defaultValue,
  multiple = false,
  getOptionLabel,
  renderOption,
  onChange,
  inputValue,
  onInputChange,
  placeholder = "Select...",
  label,
  disabled = false,
}: AutocompleteProps<T>) {
  const tokens = useTokens();
  const {
    inputValue: query,
    setInputValue,
    isOpen,
    open,
    close,
    isSelected,
    selectOption,
    filteredOptions,
  } = useAutocomplete({
    options,
    value,
    defaultValue,
    multiple,
    getOptionLabel,
    onChange,
    inputValue,
    onInputChange,
  });

  const labelOf = getOptionLabel ?? ((o: T) => String(o));

  return (
    <View>
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChangeText={(val) => {
          setInputValue(val);
          if (!isOpen) open();
        }}
        onFocus={open}
        onBlur={close}
        disabled={disabled}
      />

      {isOpen && filteredOptions.length > 0 && (
        <View
          style={{
            marginTop: tokens.spacing[2],
            borderWidth: 1,
            borderColor: tokens.color.border.default,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.color.surface.default,
            overflow: "hidden",
          }}
        >
          {filteredOptions.map((option, idx) => {
            const selected = isSelected(option);
            return (
              <Pressable
                key={`${labelOf(option)}-${idx}`}
                onPress={() => selectOption(option)}
                style={{
                  paddingHorizontal: tokens.spacing[3],
                  paddingVertical: tokens.spacing[2],
                  backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
                }}
              >
                {renderOption ? (
                  renderOption(option, selected)
                ) : (
                  <Text style={{ color: tokens.color.text.primary }}>
                    {labelOf(option)}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
