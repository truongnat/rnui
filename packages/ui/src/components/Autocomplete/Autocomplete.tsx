import React, { useState, useRef } from "react";
import { View, Text, Pressable, Modal, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { useAutocomplete, useTokens, useComponentTokens } from "@truongdq01/headless";
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
  const { autocomplete } = useComponentTokens();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const inputRef = useRef<View>(null);
  const [inputRect, setInputRect] = useState({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [dropdownMounted, setDropdownMounted] = useState(false);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

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
    options, value, defaultValue, multiple, getOptionLabel,
    onChange, inputValue, onInputChange,
  });

  const labelOf = getOptionLabel ?? ((o: T) => String(o));
  const DROPDOWN_MAX_HEIGHT = autocomplete.menu.maxHeight;
  const GAP = (autocomplete.menu as any).marginTop ?? 4;

  const measureAndOpen = () => {
    if (!isOpen) {
      inputRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
        setInputRect({ pageX, pageY, width: w, height: h });
        open();
        opacity.value = 0;
        scale.value = 0.95;
        setDropdownMounted(true);
        requestAnimationFrame(() => {
          opacity.value = withTiming(1, { duration: 160, easing: Easing.out(Easing.cubic) });
          scale.value = withSpring(1, { damping: 18, stiffness: 300 });
        });
      });
    }
  };

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 120 });
    scale.value = withTiming(0.96, { duration: 120 });
    setTimeout(() => {
      close();
      setDropdownMounted(false);
    }, 130);
  };

  const spaceBelow = windowHeight - (inputRect.pageY + inputRect.height);
  const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT + 40;

  const dropdownTop = showAbove
    ? inputRect.pageY - DROPDOWN_MAX_HEIGHT - GAP
    : inputRect.pageY + inputRect.height + GAP;

  const dropdownAnimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View ref={inputRef as any}>
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChangeText={(val) => {
          setInputValue(val);
          measureAndOpen();
        }}
        onFocus={measureAndOpen}
        onBlur={() => setTimeout(handleClose, 150)}
        disabled={disabled}
      />

      {dropdownMounted && filteredOptions.length > 0 && (
        <Modal transparent animationType="none" visible={dropdownMounted} onRequestClose={handleClose}>
          <Pressable style={{ flex: 1 }} onPress={handleClose} />
          <Animated.View
            style={[
              {
                position: "absolute",
                top: dropdownTop,
                left: inputRect.pageX,
                width: inputRect.width,
                ...autocomplete.menu,
                marginTop: undefined, // remove marginTop as it's used for calculation
                maxHeight: DROPDOWN_MAX_HEIGHT,
              },
              dropdownAnimStyle,
            ]}
          >
            {filteredOptions.map((option, idx) => {
              const selected = isSelected(option);
              return (
                <Pressable
                  key={`${labelOf(option)}-${idx}`}
                  onPress={() => {
                    if (selected && !multiple) {
                      // Deselect if already selected in single mode
                      selectOption(undefined as any);
                    } else {
                      selectOption(option);
                    }
                    if (!multiple) handleClose();
                  }}
                  style={({ pressed }) => ({
                    padding: autocomplete.item.padding,
                    backgroundColor: pressed
                      ? autocomplete.item.hover.backgroundColor
                      : selected
                        ? autocomplete.item.active.backgroundColor
                        : "transparent",
                  })}
                >
                  {renderOption ? renderOption(option, selected) : (
                    <Text style={{ color: selected ? tokens.color.brand.text : tokens.color.text.primary }}>
                      {labelOf(option)}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}
