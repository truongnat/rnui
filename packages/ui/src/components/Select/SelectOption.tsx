import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Icon } from '../Icon';
import type { SelectOptionProps } from './types';

export function SelectOption<T = string>({
  option,
  selected,
  onSelect,
  renderOption,
}: SelectOptionProps<T>) {
  const {
    components: { select },
    tokens,
  } = useTheme();

  const textStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.md,
      color: selected
        ? select.option.selected.color
        : select.option.default.color,
      fontWeight: (selected
        ? tokens.fontWeight.medium
        : tokens.fontWeight.regular) as any,
    }),
    [
      selected,
      select.option.selected.color,
      select.option.default.color,
      tokens.fontSize.md,
      tokens.fontWeight.medium,
      tokens.fontWeight.regular,
    ]
  );

  const rowStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      paddingVertical: tokens.spacing[3],
      paddingHorizontal: tokens.spacing[4],
      borderRadius: tokens.radius.md,
      backgroundColor: selected
        ? select.option.selected.bg
        : tokens.color.surface.default,
      opacity: option.disabled ? 0.4 : 1,
    }),
    [
      selected,
      option.disabled,
      select.option.selected.bg,
      tokens.color.surface.default,
      tokens.spacing,
      tokens.radius.md,
    ]
  );

  const handlePress = () => {
    if (!option.disabled) onSelect(option.value);
  };

  if (renderOption) {
    return (
      <Pressable
        onPress={handlePress}
        style={styles.customOptionWrapper}
      >
        {renderOption(option, { selected })}
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} style={rowStyle}>
      <Text style={textStyle} numberOfLines={1}>
        {option.label}
      </Text>
      {selected && (
        <Icon size={16} color={select.option.selected.color} name="check" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customOptionWrapper: {
    opacity: 1,
  },
});
