import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useComponentTokens, useTokens } from '@truongdq01/headless';
import { Input } from '../Input/Input';
import { PasswordInput } from '../Input/PasswordInput';
import { FormGroupContext, useFormGroupVariant } from './FormGroupContext';

function isInputLikeElement(el: React.ReactElement): boolean {
  const C = el.type;
  return C === Input || C === PasswordInput;
}

function enhanceChildForGroupedField(
  child: React.ReactNode,
  label: string | undefined
): React.ReactNode {
  if (!label || !React.isValidElement(child)) return child;
  if (!isInputLikeElement(child)) return child;
  const props = child.props as { placeholder?: string };
  return React.cloneElement(
    child as React.ReactElement<Record<string, unknown>>,
    {
      floatingLabel: true,
      label,
      placeholder: props.placeholder ?? label,
    }
  );
}

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  labelTrailing?: React.ReactNode;
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children,
}: FormFieldProps) {
  const { formField, formControl, formGroup } = useComponentTokens();
  const tokens = useTokens();
  const groupVariant = useFormGroupVariant();
  const isGrouped = groupVariant === 'grouped';

  const childEl = React.isValidElement(children) ? children : null;
  const showFloatingClone = Boolean(
    isGrouped && label && childEl && isInputLikeElement(childEl)
  );
  const showLabelRow = Boolean((label || labelTrailing) && !showFloatingClone);

  const renderedChild = showFloatingClone
    ? enhanceChildForGroupedField(children, label)
    : children;

  const showMessagesBelowField = !isGrouped;

  return (
    <View
      style={
        [
          formField.container as any,
          isGrouped && (formField.groupedContainer as any),
          isGrouped && {
            paddingHorizontal: tokens.spacing[3],
            paddingVertical: tokens.spacing[2],
          },
        ] as any
      }
    >
      {showLabelRow && (label || labelTrailing) ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: tokens.spacing[1.5],
          }}
        >
          {label ? (
            <View style={{ flexDirection: 'row', gap: 3 }}>
              <Text style={formControl.label as any}>{label}</Text>
              {required ? (
                <Text
                  style={{
                    color: tokens.color.error.icon,
                    fontSize: tokens.fontSize.sm,
                    fontWeight: tokens.fontWeight.semibold,
                  }}
                >
                  *
                </Text>
              ) : null}
            </View>
          ) : null}
          {labelTrailing}
        </View>
      ) : null}

      {renderedChild}

      {showMessagesBelowField ? (
        error ? (
          <Text
            style={
              [formControl.errorText, { marginTop: tokens.spacing[2] }] as any
            }
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        ) : helperText ? (
          <Text
            style={
              [formControl.helperText, { marginTop: tokens.spacing[2] }] as any
            }
          >
            {helperText}
          </Text>
        ) : null
      ) : null}
    </View>
  );
}

export interface FormGroupProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  variant?: 'standard' | 'grouped';
  /** Shown under the grouped card (tertiary). */
  footer?: string;
  /** Validation or alert copy under the grouped card (e.g. from `useField`). */
  error?: string;
}

export function FormGroup({
  children,
  gap = 'md',
  variant = 'standard',
  footer,
  error,
}: FormGroupProps) {
  const tokens = useTokens();
  const { formGroup } = useComponentTokens();
  const gapSize = {
    sm: tokens.spacing[3],
    md: tokens.spacing[5],
    lg: tokens.spacing[7],
  }[gap];

  if (variant === 'standard') {
    return (
      <FormGroupContext.Provider value="standard">
        <View style={{ gap: gapSize }}>{children}</View>
      </FormGroupContext.Provider>
    );
  }

  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <FormGroupContext.Provider value="grouped">
      <View>
        <View style={formGroup.grouped.card as any}>
          {items.map((child, i) => (
            <React.Fragment key={i}>
              {child}
              {i < items.length - 1 ? (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: tokens.color.border.default,
                    marginLeft: tokens.spacing[3],
                  }}
                />
              ) : null}
            </React.Fragment>
          ))}
        </View>
        {error ? (
          <Text style={formGroup.errorBelowCard as any}>{error}</Text>
        ) : null}
        {footer ? <Text style={formGroup.footer as any}>{footer}</Text> : null}
      </View>
    </FormGroupContext.Provider>
  );
}
