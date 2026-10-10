import { AppBarAction } from '@/components/ui/app-bar';
import { Select, type SelectOption } from '@/components/ui/select';
import { useThemeColor } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react-native';
import {
  useDemoThemePreference,
  type SchemePreference,
} from './DemoThemeContext';

export const THEME_SELECT_OPTIONS: SelectOption[] = [
  { label: '☀️ Light', value: 'light' },
  { label: '🌙 Dark', value: 'dark' },
  { label: '⚙️ System', value: 'system' },
];

/**
 * Dropdown Select for switching themes cleanly without modals.
 */
export function ThemeSelect() {
  const { schemePreference, setSchemePreference } = useDemoThemePreference();

  return (
    <Select
      options={THEME_SELECT_OPTIONS}
      value={schemePreference}
      onValueChange={(val) => setSchemePreference(val as SchemePreference)}
      placeholder="Select Theme"
    />
  );
}

/**
 * Direct theme toggle button on the AppBar that switches between Light & Dark on click.
 */
export function ThemeToggleButton() {
  const { schemePreference, setSchemePreference } = useDemoThemePreference();
  const colors = useThemeColor();
  const isDark = schemePreference === 'dark';

  const toggle = () => {
    setSchemePreference(isDark ? 'light' : 'dark');
  };

  return (
    <AppBarAction
      onPress={toggle}
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={19} color="#f59e0b" />
      ) : (
        <Moon size={19} color={colors.foreground} />
      )}
    </AppBarAction>
  );
}

export function DemoThemeControls() {
  return null;
}
