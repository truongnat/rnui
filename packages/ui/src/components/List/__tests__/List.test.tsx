import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { List, ListItem, ListItemText } from '../index';

test('List renders items and text', () => {
  const { getByText } = render(
    <ThemeProvider>
      <List>
        <ListItem>
          <ListItemText primary="Item Primary" secondary="Secondary" />
        </ListItem>
      </List>
    </ThemeProvider>
  );
  expect(getByText('Item Primary')).toBeTruthy();
  expect(getByText('Secondary')).toBeTruthy();
});

test('List ignores JSX whitespace between items', () => {
  const { getByText } = render(
    <ThemeProvider>
      <List>
        <ListItem>
          <ListItemText primary="First" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Second" />
        </ListItem>
      </List>
    </ThemeProvider>
  );
  expect(getByText('First')).toBeTruthy();
  expect(getByText('Second')).toBeTruthy();
});
