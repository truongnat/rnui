import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { resolveComponentTokens, semanticTokens } from '@truongdq01/tokens';
import { Text } from 'react-native';
import { Typography } from '../../Typography';
import { Alert } from '../Alert';
import { AlertTitle } from '../AlertTitle';

function flattenColor(style: unknown): string | undefined {
  if (style == null) {
    return undefined;
  }
  const styles = Array.isArray(style) ? style : [style];
  for (let index = styles.length - 1; index >= 0; index -= 1) {
    const entry = styles[index];
    if (
      entry != null &&
      typeof entry === 'object' &&
      'color' in entry &&
      typeof entry.color === 'string'
    ) {
      return entry.color;
    }
  }
  return undefined;
}

test('Alert renders and handles close press', () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Alert onClose={onClose}>
        <Text>Warning</Text>
      </Alert>
    </ThemeProvider>
  );
  expect(getByText('Warning')).toBeTruthy();
});

test('Alert renders plain string children in Text', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Alert severity="info">Information message</Alert>
    </ThemeProvider>
  );
  expect(getByText('Information message')).toBeTruthy();
});

test('Alert renders numeric children in Text', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Alert severity="warning">{404}</Alert>
    </ThemeProvider>
  );
  expect(getByText('404')).toBeTruthy();
});

test('Alert renders compound children with AlertTitle', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <Text>Your changes were saved.</Text>
      </Alert>
    </ThemeProvider>
  );
  expect(getByText('Success')).toBeTruthy();
  expect(getByText('Your changes were saved.')).toBeTruthy();
});

test('AlertTitle inherits severity text color', () => {
  const { alert } = resolveComponentTokens(semanticTokens.light);
  const { getByText } = render(
    <ThemeProvider>
      <Alert severity="error">
        <AlertTitle>Critical</AlertTitle>
      </Alert>
    </ThemeProvider>
  );
  expect(flattenColor(getByText('Critical').props.style)).toBe(
    alert.variant.error.text
  );
});

test('Typography inside Alert inherits severity text color', () => {
  const { alert } = resolveComponentTokens(semanticTokens.light);
  const { getByText } = render(
    <ThemeProvider>
      <Alert severity="warning">
        <Typography variant="body2">Check your settings</Typography>
      </Alert>
    </ThemeProvider>
  );
  expect(flattenColor(getByText('Check your settings').props.style)).toBe(
    alert.variant.warning.text
  );
});

test('Typography keeps explicit color inside Alert', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Alert severity="error">
        <Typography variant="body2" color="brand">
          Branded note
        </Typography>
      </Alert>
    </ThemeProvider>
  );
  const { typography } = resolveComponentTokens(semanticTokens.light);
  expect(flattenColor(getByText('Branded note').props.style)).toBe(
    typography.colors.brand
  );
});
