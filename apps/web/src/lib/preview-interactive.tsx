'use client';

import type { CheckboxProps } from '../../../../packages/ui/src/components/Checkbox';
import { Checkbox } from '../../../../packages/ui/src/components/Checkbox';
import type { InputProps } from '../../../../packages/ui/src/components/Input';
import { Input } from '../../../../packages/ui/src/components/Input';
import type { SwitchProps } from '../../../../packages/ui/src/components/Switch';
import { Switch } from '../../../../packages/ui/src/components/Switch';
import { useState } from 'react';

/**
 * Schema JSON often pins `value` / `on` / `checked` for demo layout.
 * Strip controlled props in the web builder so fields remain editable.
 */
export function PreviewInput(props: InputProps) {
  const { value, defaultValue, onChange, ...rest } = props;

  if (value !== undefined && onChange === undefined) {
    return <Input {...rest} defaultValue={value || defaultValue} />;
  }

  return <Input {...props} />;
}

export function PreviewSwitch(props: SwitchProps) {
  const { on, defaultOn, onChange, ...rest } = props;
  const [localOn, setLocalOn] = useState(on ?? defaultOn ?? false);

  if (on !== undefined && onChange === undefined) {
    return (
      <Switch
        {...rest}
        on={localOn}
        onChange={(next) => {
          setLocalOn(next);
        }}
      />
    );
  }

  return <Switch {...props} />;
}

export function PreviewCheckbox(props: CheckboxProps) {
  const { checked, defaultChecked, onChange, ...rest } = props;
  const [localChecked, setLocalChecked] = useState(
    checked ?? defaultChecked ?? false
  );

  if (checked !== undefined && onChange === undefined) {
    return (
      <Checkbox
        {...rest}
        checked={localChecked}
        onChange={(next) => {
          setLocalChecked(next);
        }}
      />
    );
  }

  return <Checkbox {...props} />;
}
