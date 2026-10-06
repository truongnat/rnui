import { useContext, useId, type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, FormFieldContext } from '@/lib/utils';

export interface FormFieldProps extends ViewProps {
  error?: string;
  className?: string;
  children?: ReactNode;
}

export function FormField({
  error,
  className,
  children,
  ...props
}: FormFieldProps) {
  const id = useId();
  return (
    <FormFieldContext.Provider value={{ id, error }}>
      <View className={cn('gap-1.5', className)} {...props}>
        {children}
      </View>
    </FormFieldContext.Provider>
  );
}

export function useFormField() {
  const ctx = useContext(FormFieldContext);
  if (!ctx) {
    throw new Error('useFormField must be used inside <FormField>');
  }
  return ctx;
}

export function FormLabel({ className, ...props }: TextProps) {
  const { error } = useFormField();
  return (
    <Text
      className={cn(
        'text-sm font-medium text-foreground',
        error && 'text-destructive',
        className
      )}
      {...props}
    />
  );
}

export function FormDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

export function FormMessage({ className, ...props }: TextProps) {
  const { error } = useFormField();
  if (!error) return null;
  return (
    <Text
      className={cn('text-xs font-medium text-destructive', className)}
      {...props}
    >
      {error}
    </Text>
  );
}
