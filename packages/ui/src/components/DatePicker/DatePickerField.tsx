import { useIconStyle, useTheme } from '@truongdq01/headless';
import {
  cloneElement,
  isValidElement,
  memo,
  type ReactNode,
  useCallback,
} from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import { DATE_PICKER_FIELD_HEIGHT } from './datePickerConstants';
import type { DateFieldStatus } from './datePickerTypes';

export interface DatePickerFieldProps {
  displayValue: string;
  hasValue: boolean;
  disabled: boolean;
  /** Validation status applied to the field border. */
  status?: DateFieldStatus;
  clearable: boolean;
  showClear: boolean;
  icon?: ReactNode;
  onOpen: () => void;
  onClear: () => void;
}

function cloneInputIcon(
  node: ReactNode,
  iconSize: number,
  iconColor: string
): ReactNode {
  if (!node) return null;
  if (isValidElement<{ size?: number | string; color?: string }>(node)) {
    return cloneElement(node, {
      size: node.props.size ?? iconSize,
      color: node.props.color ?? iconColor,
    });
  }
  return node;
}

export const DatePickerField = memo(function DatePickerField({
  displayValue,
  hasValue,
  disabled,
  status,
  clearable,
  showClear,
  icon,
  onOpen,
  onClear,
}: DatePickerFieldProps) {
  const {
    components: { input },
    tokens,
  } = useTheme();
  const { size: iconSize, color: iconColor } = useIconStyle('input');

  const renderIcon = useCallback(
    (node: ReactNode) => cloneInputIcon(node, iconSize, iconColor),
    [iconSize, iconColor]
  );

  const statusStyle = status ? input.state[status] : null;

  return (
    <View
      style={[
        input.container,
        {
          height: DATE_PICKER_FIELD_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
        },
        statusStyle,
        { opacity: disabled ? 0.6 : 1 },
      ]}
    >
      <Pressable
        onPress={onOpen}
        disabled={disabled}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: DATE_PICKER_FIELD_HEIGHT,
          paddingVertical: 0,
        }}
        accessibilityRole="button"
        accessibilityLabel={displayValue}
        accessibilityHint="Opens date picker"
      >
        {icon ? renderIcon(icon) : null}
        <Text
          style={{
            flex: 1,
            fontSize: tokens.fontSize.md,
            color: hasValue
              ? tokens.color.text.primary
              : tokens.color.text.tertiary,
          }}
          numberOfLines={1}
        >
          {displayValue}
        </Text>
        <Icon size={18} color={tokens.color.text.tertiary} name="calendar" />
      </Pressable>
      {clearable && showClear ? (
        <Pressable
          onPress={onClear}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear date"
        >
          <Icon size={18} color={tokens.color.text.tertiary} name="close" />
        </Pressable>
      ) : null}
    </View>
  );
});
