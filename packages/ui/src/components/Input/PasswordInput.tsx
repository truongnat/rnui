import { useIconStyle } from '@truongdq01/headless';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Icon } from '../Icon';
import { Input, type InputProps } from './Input';

export interface PasswordInputProps extends InputProps {}

/**
 * A specialized Input component for passwords with a built-in visibility toggle.
 */
export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const { size, color } = useIconStyle('input');

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <Input
      {...props}
      secureTextEntry={!show}
      autoCapitalize="none"
      autoCorrect={false}
      trailingElement={
        <Pressable
          onPress={toggleShow}
          hitSlop={8}
          accessibilityLabel={show ? 'Hide password' : 'Show password'}
          accessibilityRole="button"
        >
          <Icon size={size} color={color} name={show ? 'eyeOff' : 'eye'} />
        </Pressable>
      }
    />
  );
}
