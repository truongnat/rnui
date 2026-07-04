import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import type { ButtonProps, ButtonSize, ButtonVariant } from '../Button/types';
import { ButtonGroupContext } from './ButtonGroupContext';
import {
  getButtonGroupStyle,
  resolveButtonGroupPosition,
} from './buttonGroupStyles';

export interface ButtonGroupProps {
  children?: React.ReactNode;
  /** Accessible label for the grouped controls. */
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: ButtonSize;
  /** Disables every button in the group. */
  isDisabled?: boolean;
  /** Alias for `isDisabled`. */
  disabled?: boolean;
  fullWidth?: boolean;
  /**
   * Default variant applied to child buttons without their own `variant`.
   * Prefer setting the same variant on each child (Astryx guidance).
   */
  variant?: ButtonVariant | 'contained' | 'outlined' | 'text';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

type InjectableButtonProps = Pick<
  ButtonProps,
  'variant' | 'size' | 'disabled' | 'fullWidth' | 'style'
> & {
  buttonGroupPosition?: ReturnType<typeof resolveButtonGroupPosition>;
  buttonGroupOrientation?: 'horizontal' | 'vertical';
  feedbackMode?: ButtonProps['feedbackMode'];
};

function normalizeGroupVariant(
  variant: ButtonGroupProps['variant']
): 'solid' | 'outline' | 'ghost' | 'destructive' {
  if (variant === 'contained') return 'solid';
  if (variant === 'outlined' || variant === 'outline') return 'outline';
  if (variant === 'text') return 'ghost';
  if (variant === 'destructive') return 'destructive';
  if (variant === 'ghost') return 'ghost';
  return 'outline';
}

function resolveChildVariant(
  childVariant: ButtonVariant | undefined,
  groupVariant: ButtonGroupProps['variant']
): 'solid' | 'outline' | 'ghost' | 'destructive' {
  if (childVariant === 'contained') return 'solid';
  if (childVariant === 'outlined' || childVariant === 'outline')
    return 'outline';
  if (childVariant === 'text') return 'ghost';
  if (childVariant === 'destructive') return 'destructive';
  if (childVariant === 'ghost') return 'ghost';
  if (childVariant === 'solid') return 'solid';
  return normalizeGroupVariant(groupVariant);
}

export function ButtonGroup({
  children,
  label = 'Button group',
  orientation = 'horizontal',
  size = 'md',
  isDisabled = false,
  disabled = false,
  fullWidth = false,
  variant = 'outline',
  style,
  testID,
}: ButtonGroupProps) {
  const {
    components: { buttonGroup },
  } = useTheme();

  const groupDisabled = isDisabled || disabled;
  const isRow = orientation === 'horizontal';
  const items = React.Children.toArray(children);

  const contextValue = useMemo(
    () => ({ orientation, isDisabled: groupDisabled }),
    [groupDisabled, orientation]
  );

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <View
        testID={testID}
        accessibilityRole="toolbar"
        accessibilityLabel={label}
        style={[
          buttonGroup.container,
          {
            flexDirection: isRow ? 'row' : 'column',
            alignSelf: fullWidth
              ? ('stretch' as const)
              : buttonGroup.container.alignSelf,
            width: fullWidth ? ('100%' as const) : undefined,
          },
          style,
        ]}
      >
        {items.map((child, index) => {
          if (!React.isValidElement<InjectableButtonProps>(child)) {
            return child;
          }

          const position = resolveButtonGroupPosition(index, items.length);
          const childVariant = resolveChildVariant(
            child.props.variant,
            variant
          );
          const groupStyle = getButtonGroupStyle({
            position,
            orientation,
            variant: childVariant,
            radius: buttonGroup.radius,
            dividerWidth: buttonGroup.divider.width,
            dividerColor: buttonGroup.divider.color,
            solidDividerColor: buttonGroup.divider.solidColor,
            destructiveDividerColor: buttonGroup.divider.destructiveColor,
          });

          return React.cloneElement(child, {
            variant: child.props.variant ?? variant,
            size: child.props.size ?? size,
            disabled: groupDisabled || child.props.disabled,
            fullWidth: fullWidth || child.props.fullWidth,
            buttonGroupPosition: position,
            buttonGroupOrientation: orientation,
            feedbackMode: child.props.feedbackMode ?? 'opacity',
            style: [
              groupStyle,
              childVariant === 'solid' || childVariant === 'destructive'
                ? { elevation: 0, shadowOpacity: 0 }
                : null,
              fullWidth && isRow ? { flex: 1 } : null,
              child.props.style,
            ].filter(Boolean),
          });
        })}
      </View>
    </ButtonGroupContext.Provider>
  );
}
