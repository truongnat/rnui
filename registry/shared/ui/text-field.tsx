import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface TextFieldProps extends InputProps {
  /** Label above the input. Appends ` *` when `required`. */
  label?: string;
  /** Appends ` *` to the label. */
  required?: boolean;
  /** Helper text under the input — hidden while `error` is set. */
  description?: string;
  /** Error message; also marks the input invalid via FormFieldContext. */
  error?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  /** Classes for the Input itself — `className` targets the field container. */
  inputClassName?: string;
}

/**
 * Composite field: label + input + description/error message, wired through
 * `FormFieldContext` so `Input` picks up `nativeID` and the destructive
 * border automatically.
 */
export function TextField({
  label,
  required,
  description,
  error,
  className,
  labelClassName,
  descriptionClassName,
  inputClassName,
  ...inputProps
}: TextFieldProps) {
  const labelText = required && label ? `${label} *` : label;
  return (
    <FormField error={error} className={cn(className)}>
      {label ? <FormLabel className={labelClassName}>{labelText}</FormLabel> : null}
      <Input className={inputClassName} {...inputProps} />
      {error ? (
        <FormMessage />
      ) : description ? (
        <FormDescription className={descriptionClassName}>
          {description}
        </FormDescription>
      ) : null}
    </FormField>
  );
}
