import type React from 'react';
import type { ButtonProps } from '../Button/types';

export interface IconButtonProps
  extends Omit<
    ButtonProps,
    | 'label'
    | 'children'
    | 'startIcon'
    | 'endIcon'
    | 'leadingIcon'
    | 'trailingIcon'
  > {
  /** The icon to display as the button's only visible content. */
  icon: React.ReactNode;
  /** Accessible name for screen readers since there is no visible text. */
  label: string;
}
