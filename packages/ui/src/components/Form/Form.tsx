import { useTheme } from '@truongdq01/headless';
import React, { createContext, useCallback, useContext } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

export interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  handleSubmit: (
    callback: (values: Record<string, any>) => void | Promise<void>
  ) => () => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a Form component');
  }
  return context;
}

export interface FormProps {
  /** Initial form values */
  initialValues?: Record<string, any>;
  /** Validation function */
  validate?: (values: Record<string, any>) => Record<string, string>;
  /** Submit handler */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /** Children components */
  children: React.ReactNode;
  /** Whether to show validation on change */
  validateOnChange?: boolean;
  /** Whether to show validation on blur */
  validateOnBlur?: boolean;
  /** Enable keyboard avoiding view */
  enableKeyboardAvoidingView?: boolean;
  /** Scrollable form */
  scrollable?: boolean;
  /** Custom style */
  style?: object;
  /** Test ID */
  testID?: string;
}

/**
 * Form component that provides form state management and validation.
 * Supports controlled inputs, validation, and submission handling.
 */
export function Form({
  initialValues = {},
  validate,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true,
  enableKeyboardAvoidingView = true,
  scrollable = true,
  style,
  testID = 'form',
}: FormProps) {
  const [values, setValues] =
    React.useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const runValidation = useCallback(
    (currentValues: Record<string, any>) => {
      if (!validate) return {};

      try {
        return validate(currentValues);
      } catch (error) {
        console.error('Form validation error:', error);
        return {};
      }
    },
    [validate]
  );

  const isValid = React.useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const setValue = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      if (validateOnChange) {
        setValues((current) => {
          const newErrors = runValidation({ ...current, [name]: value });
          setErrors(newErrors);
          return current;
        });
      }
    },
    [validateOnChange, runValidation]
  );

  const setError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const setTouchedField = useCallback(
    (name: string, fieldTouched: boolean) => {
      setTouched((prev) => ({ ...prev, [name]: fieldTouched }));

      if (validateOnBlur && fieldTouched) {
        const newErrors = runValidation(values);
        setErrors(newErrors);
      }
    },
    [validateOnBlur, runValidation, values]
  );

  const handleSubmit = useCallback(
    (callback: (values: Record<string, any>) => void | Promise<void>) => {
      return async () => {
        if (isSubmitting) return;

        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce(
          (acc, key) => {
            acc[key] = true;
            return acc;
          },
          {} as Record<string, boolean>
        );
        setTouched(allTouched);

        // Run final validation
        const finalErrors = runValidation(values);
        setErrors(finalErrors);

        if (Object.keys(finalErrors).length > 0) {
          return; // Don't submit if there are errors
        }

        setIsSubmitting(true);
        try {
          await callback(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [values, runValidation, isSubmitting]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const contextValue: FormContextValue = {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setError,
    setTouched: setTouchedField,
    handleSubmit,
    resetForm,
  };

  const formContent = (
    <View style={[styles.container, style]} testID={testID}>
      <FormContext.Provider value={contextValue}>
        {children}
      </FormContext.Provider>
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {formContent}
      </ScrollView>
    );
  }

  return formContent;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});
