import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, TextInput, Pressable } from 'react-native';
import { Form, useForm } from '../Form';
import { ThemeProvider } from '@truongdq01/headless';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Form', () => {
  it('renders children correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Form testID="form">
        <Text>Test Content</Text>
      </Form>
    );

    expect(getByTestId('form')).toBeTruthy();
  });

  it('provides form context to children', () => {
    function TestComponent() {
      const form = useForm();
      return <Text>{form.isValid ? 'Valid' : 'Invalid'}</Text>;
    }

    const { getByText } = renderWithTheme(
      <Form initialValues={{ test: 'value' }}>
        <TestComponent />
      </Form>
    );

    expect(getByText('Valid')).toBeTruthy();
  });

  it('handles form submission', async () => {
    const onSubmit = jest.fn();

    function TestComponent() {
      const { handleSubmit } = useForm();
      return (
        <Pressable testID="submit" onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Pressable>
      );
    }

    const { getByTestId } = renderWithTheme(
      <Form onSubmit={onSubmit} initialValues={{ name: 'John' }}>
        <TestComponent />
      </Form>
    );

    fireEvent.press(getByTestId('submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
    });
  });

  it('validates form fields', () => {
    const validate = (values: Record<string, any>) => {
      const errors: Record<string, string> = {};
      if (!values.email) {
        errors.email = 'Email is required';
      }
      return errors;
    };

    function TestComponent() {
      const { errors, setValue } = useForm();
      return (
        <React.Fragment>
          <TextInput
            testID="email"
            value=""
            onChangeText={(text) => setValue('email', text)}
          />
          {errors.email && <Text>{errors.email}</Text>}
        </React.Fragment>
      );
    }

    const { getByTestId, getByText } = renderWithTheme(
      <Form validate={validate} validateOnChange={true}>
        <TestComponent />
      </Form>
    );

    fireEvent.changeText(getByTestId('email'), '');

    expect(getByText('Email is required')).toBeTruthy();
  });

  it('handles form reset', () => {
    function TestComponent() {
      const { values, setValue, resetForm } = useForm();
      return (
        <React.Fragment>
          <Text>{values.name || 'No name'}</Text>
          <Pressable testID="set-name" onPress={() => setValue('name', 'Jane')}>
            <Text>Set Name</Text>
          </Pressable>
          <Pressable testID="reset" onPress={resetForm}>
            <Text>Reset</Text>
          </Pressable>
        </React.Fragment>
      );
    }

    const { getByTestId, getByText } = renderWithTheme(
      <Form initialValues={{ name: 'John' }}>
        <TestComponent />
      </Form>
    );

    fireEvent.press(getByTestId('set-name'));
    expect(getByText('Jane')).toBeTruthy();

    fireEvent.press(getByTestId('reset'));
    expect(getByText('John')).toBeTruthy();
  });

  it('handles touched state', () => {
    function TestComponent() {
      const { touched, setTouched } = useForm();
      return (
        <React.Fragment>
          <Text>{touched.email ? 'Touched' : 'Not touched'}</Text>
          <Pressable testID="touch" onPress={() => setTouched('email', true)}>
            <Text>Touch</Text>
          </Pressable>
        </React.Fragment>
      );
    }

    const { getByTestId, getByText } = renderWithTheme(
      <Form>
        <TestComponent />
      </Form>
    );

    expect(getByText('Not touched')).toBeTruthy();

    fireEvent.press(getByTestId('touch'));
    expect(getByText('Touched')).toBeTruthy();
  });

  it('prevents submission when invalid', async () => {
    const onSubmit = jest.fn();
    const validate = () => ({ email: 'Invalid' });

    function TestComponent() {
      const { handleSubmit } = useForm();
      return (
        <Pressable testID="submit" onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Pressable>
      );
    }

    const { getByTestId } = renderWithTheme(
      <Form validate={validate} onSubmit={onSubmit}>
        <TestComponent />
      </Form>
    );

    fireEvent.press(getByTestId('submit'));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('renders scrollable form', () => {
    const { getByTestId } = renderWithTheme(
      <Form scrollable={true} testID="form">
        <Text>Scrollable Content</Text>
      </Form>
    );

    expect(getByTestId('form')).toBeTruthy();
  });
});
