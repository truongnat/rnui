import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useMenuContext } from './context';
import type { MenuItemProps } from './types';

export function MenuItem({
  children,
  label,
  icon,
  destructive = false,
  onPress,
  disabled = false,
  selected = false,
}: MenuItemProps) {
  const {
    components: { menu },
    tokens,
  } = useTheme();

  const ctx = useMenuContext();

  const itemProps = ctx?.getItemProps({ onClick: onPress, disabled }) ?? {
    onPress,
    disabled,
  };

  const textColor = useMemo(() => {
    if (disabled) return tokens.color.text.disabled;
    if (destructive) return tokens.color.error.text;
    if (selected) return tokens.color.brand.text;
    return tokens.color.text.primary;
  }, [disabled, destructive, selected, tokens]);

  const textStyle = useMemo(
    () => ({
      color: textColor,
      fontWeight: selected
        ? tokens.fontWeight.medium
        : tokens.fontWeight.regular,
      fontSize: tokens.fontSize.md,
    }),
    [textColor, selected, tokens],
  );

  const iconWrapperStyle = useMemo(
    () => ({ marginRight: tokens.spacing[3] }),
    [tokens],
  );

  const pressableStyle = useMemo(
    () => ({
      paddingHorizontal: tokens.spacing[4],
      paddingVertical: tokens.spacing[3],
    }),
    [tokens],
  );

  const selectedBg = tokens.color.brand.subtle;
  const pressedBg = tokens.color.bg.subtle;

  return (
    <Pressable
      {...itemProps}
      style={({ pressed }) => [
        menu.item,
        styles.row,
        pressableStyle,
        pressed && { backgroundColor: pressedBg },
        selected && { backgroundColor: selectedBg },
        disabled && styles.disabled,
      ]}
    >
      {icon && (
        <View style={iconWrapperStyle}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement, {
                // @ts-ignore - dynamic icon props
                size: (icon.props as any).size ?? 18,
                // @ts-ignore - dynamic icon props
                color: (icon.props as any).color ?? textColor,
              })
            : icon}
        </View>
      )}
      <View style={styles.labelContainer}>
        {label ? (
          <Text style={textStyle}>{label}</Text>
        ) : typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
