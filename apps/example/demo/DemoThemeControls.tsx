import { Button } from '@/components/ui/button';
import { AppBarAction } from '@/components/ui/app-bar';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { Moon, Palette, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useDemoThemePreference,
  type SchemePreference,
} from './DemoThemeContext';

const SCHEME_OPTIONS: SchemePreference[] = ['light', 'dark', 'system'];

export function ThemeToggleButton() {
  const { schemePreference, setSchemePreference } = useDemoThemePreference();
  const [open, setOpen] = useState(false);
  const colors = useThemeColor();
  const isDark = schemePreference === 'dark';

  return (
    <>
      <AppBarAction
        onPress={() => setOpen(true)}
        accessibilityLabel="Theme preview settings"
      >
        {isDark ? (
          <Sun size={18} color="#f59e0b" />
        ) : (
          <Moon size={18} color={colors.foreground} />
        )}
      </AppBarAction>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Theme preview</ModalTitle>
          </ModalHeader>
          <Stack spacing="sm">
            <Text variant="large">Appearance</Text>
            <Stack direction="row" spacing="sm" wrap>
              {SCHEME_OPTIONS.map((scheme) => (
                <Button
                  key={scheme}
                  size="sm"
                  variant={schemePreference === scheme ? 'default' : 'outline'}
                  onPress={() => setSchemePreference(scheme)}
                >
                  {scheme}
                </Button>
              ))}
            </Stack>
            <Text variant="muted">
              Persisted to AsyncStorage; follows the system when set to
              &quot;system&quot;.
            </Text>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

export function DemoThemeControls() {
  return null;
}
