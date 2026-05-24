import { Input, type InputProps } from '../../../../../packages/ui/src/components/Input';

export type TextFieldProps = InputProps & {
  variant?: 'outlined' | 'filled';
  multiline?: boolean;
  select?: boolean;
};

/** Web builder stub — avoids Select/BottomSheet native deps from full TextField. */
export function TextField(props: TextFieldProps) {
  const { variant: _variant, multiline: _multiline, select: _select, ...inputProps } =
    props;
  return <Input {...inputProps} />;
}
