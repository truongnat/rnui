import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { SettingsMenu } from '../SettingsMenu';

const sections = [
  { title: 'General', items: [{ id: '1', label: 'Option 1' }] },
];

test('SettingsMenu renders with required props', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <SettingsMenu sections={sections} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
