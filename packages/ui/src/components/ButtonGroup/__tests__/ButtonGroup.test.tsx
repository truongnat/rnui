import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Button } from '../../Button';
import { ButtonGroup } from '../ButtonGroup';

test('ButtonGroup renders children', () => {
  const { getByText } = render(
    <ThemeProvider>
      <ButtonGroup label="Actions">
        <Button label="One" variant="outline" />
        <Button label="Two" variant="outline" />
      </ButtonGroup>
    </ThemeProvider>
  );
  expect(getByText('One')).toBeTruthy();
  expect(getByText('Two')).toBeTruthy();
});

test('ButtonGroup applies connected outer radius to first and last buttons', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ButtonGroup label="Actions">
        <Button label="One" variant="outline" />
        <Button label="Two" variant="outline" />
        <Button label="Three" variant="outline" />
      </ButtonGroup>
    </ThemeProvider>
  );
  const tree = JSON.stringify(toJSON());
  expect(tree).toContain('"borderTopLeftRadius"');
  expect(tree).toContain('"borderTopRightRadius"');
  expect(tree).toContain('"borderLeftWidth":1');
});

test('ButtonGroup disables all children when isDisabled', () => {
  const { getByLabelText } = render(
    <ThemeProvider>
      <ButtonGroup label="Actions" isDisabled>
        <Button label="Save" accessibilityLabel="Save" variant="outline" />
      </ButtonGroup>
    </ThemeProvider>
  );
  expect(getByLabelText('Save').props.accessibilityState?.disabled).toBe(true);
});
