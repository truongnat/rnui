import { useTheme } from '@truongdq01/headless';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Icon } from '../Icon';
import { Input, type InputProps } from '../Input/Input';
import { Select, type SelectProps } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';

export interface TextFieldProps extends Omit<InputProps, 'error'> {
  variant?: 'outlined' | 'filled' | 'standard';
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  helperText?: string;
  error?: boolean | string;
  required?: boolean;
  select?: boolean;
  selectProps?: SelectProps<any>;
  onBlur?: (e?: any) => void;
  onFocus?: (e?: any) => void;
  type?: 'text' | 'password' | 'email' | 'number';
}

export function TextField({
  variant = 'outlined',
  multiline = false,
  rows,
  maxRows,
  minRows,
  helperText,
  error,
  required = false,
  select = false,
  selectProps,
  type = 'text',
  label,
  ...rest
}: TextFieldProps) {
  const {
    components: { textField },
  } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const labelText = required && label ? `${label} *` : label;
  const errorText =
    typeof error === 'string' ? error : error ? helperText : undefined;

  const trailingElement = isPassword ? (
    <Pressable
      onPress={() => setShowPassword(!showPassword)}
      style={{ padding: 4 }}
      hitSlop={8}
    >
      <Icon size={20} color={textField.text.placeholderColor}>
        {showPassword ? 'eyeOff' : 'eye'}
      </Icon>
    </Pressable>
  ) : (
    rest.trailingElement
  );

  if (select) {
    return (
      <Select
        label={labelText}
        error={errorText}
        options={[]}
        {...(selectProps as any)}
      />
    );
  }

  if (multiline) {
    return (
      <TextArea
        label={labelText}
        error={errorText}
        helperText={errorText ? undefined : helperText}
        minLines={minRows ?? rows ?? 3}
        maxLines={maxRows ?? 8}
        {...rest}
      />
    );
  }

  return (
    <Input
      label={labelText}
      error={errorText}
      helperText={errorText ? undefined : helperText}
      trailingElement={trailingElement}
      secureTextEntry={isPassword && !showPassword}
      {...rest}
    />
  );
}
