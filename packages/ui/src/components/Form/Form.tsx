import React, { createContext, useCallback, useContext, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type FormValues = Record<string, unknown>;

export interface FormContextValue {
  values: FormValues;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  handleSubmit: (
    callback?: (values: FormValues) => void | Promise<void>
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
  initialValues?: FormValues;
  /** Validation function */
  validate?: (values: FormValues) => Record<string, string>;
  /** Submit handler */
  onSubmit?: (values: FormValues) => void | Promise<void>;
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
  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const runValidation = useCallback(
    (currentValues: FormValues) => {
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

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const setValue = useCallback(
    (name: string, value: unknown) => {
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
    (callback?: (values: FormValues) => void | Promise<void>) => {
      return async () => {
        if (isSubmitting) return;

        const allTouched = Object.keys(values).reduce(
          (acc, key) => {
            acc[key] = true;
            return acc;
          },
          {} as Record<string, boolean>
        );
        setTouched(allTouched);

        const finalErrors = runValidation(values);
        setErrors(finalErrors);

        if (Object.keys(finalErrors).length > 0) {
          return;
        }

        const submitFn = callback ?? onSubmit;
        if (!submitFn) return;

        setIsSubmitting(true);
        try {
          await submitFn(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [values, runValidation, isSubmitting, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const contextValue = useMemo<FormContextValue>(
    () => ({
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
    }),
    [
      values,
      errors,
      touched,
      isSubmitting,
      isValid,
      setValue,
      setError,
      setTouchedField,
      handleSubmit,
      resetForm,
    ]
  );

  const formContent = (
    <View style={[styles.container, style]} testID={testID}>
      <FormContext.Provider value={contextValue}>
        {children}
      </FormContext.Provider>
    </View>
  );

  const wrapped = enableKeyboardAvoidingView ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}
    >
      {formContent}
    </KeyboardAvoidingView>
  ) : (
    formContent
  );

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {wrapped}
      </ScrollView>
    );
  }

  return wrapped;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  flex: {
    flex: 1,
  },
});
