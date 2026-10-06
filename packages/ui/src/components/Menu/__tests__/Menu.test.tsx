import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Menu, MenuItem } from '..';

import { act } from '@testing-library/react-native';

test('Menu renders when open', () => {
  let getByText: any;
  act(() => {
    const renderResult = render(
      <ThemeProvider>
        <Menu open={true}>
          <MenuItem>Option 1</MenuItem>
        </Menu>
      </ThemeProvider>
    );
    getByText = renderResult.getByText;
  });

  // Since Menu uses requestAnimationFrame to start animation,
  // we may need to wait for it or just check if it's there
  expect(getByText('Option 1')).toBeTruthy();
});
