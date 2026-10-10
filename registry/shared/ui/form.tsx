import { useContext, useId, type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

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
      <View className={cn('gap-2', className)} {...props}>
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
  const theme = useThemeColor();
  return (
    <Text
      className={cn('text-sm font-semibold text-foreground', className)}
      style={error ? { color: theme.destructive } : undefined}
      {...props}
    />
  );
}

export function FormDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-[13px] leading-4 text-muted-foreground', className)}
      {...props}
    />
  );
}

export function FormMessage({ className, ...props }: TextProps) {
  const { error } = useFormField();
  if (!error) return null;
  return (
    <Text
      className={cn('text-[13px] font-medium text-destructive', className)}
      {...props}
    >
      {error}
    </Text>
  );
}
