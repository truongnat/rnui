import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Checkbox } from '../Checkbox';

test('Checkbox handles press', () => {
  const onPress = jest.fn();
  const { getByRole } = render(
    <ThemeProvider>
      <Checkbox label="Accept" checked={false} onChange={onPress} />
    </ThemeProvider>
  );
  fireEvent.press(getByRole('checkbox'));
  expect(onPress).toHaveBeenCalled();
});
