import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Menu, MenuItem } from '..';

test('Menu renders when open', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Menu open={true}>
        <MenuItem>Option 1</MenuItem>
      </Menu>
    </ThemeProvider>
  );
  expect(getByText('Option 1')).toBeTruthy();
});
