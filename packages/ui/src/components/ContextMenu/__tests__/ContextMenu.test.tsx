import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { ContextMenu } from '../ContextMenu';

const items = [{ id: '1', label: 'Item 1' }];

test('ContextMenu renders with required props', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ContextMenu open={false} onClose={() => {}} items={items} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
