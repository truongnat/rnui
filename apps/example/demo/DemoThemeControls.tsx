import { Button } from '@/components/ui/button';
import { Fab } from '@/components/ui/fab';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Palette } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useDemoThemePreference,
  type SchemePreference,
} from './DemoThemeContext';

const SCHEME_OPTIONS: SchemePreference[] = ['light', 'dark', 'system'];

export function DemoThemeControls() {
  const insets = useSafeAreaInsets();
  const { schemePreference, setSchemePreference } = useDemoThemePreference();
  const [open, setOpen] = useState(false);

  return (
    <>
      <View
        pointerEvents="box-none"
        style={[styles.fabHost, { top: insets.top + 8 }]}
      >
        <Fab
          icon={<Palette />}
          size="sm"
          accessibilityLabel="Open theme preview settings"
          onPress={() => setOpen(true)}
        />
      </View>

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

const styles = StyleSheet.create({
  fabHost: {
    position: 'absolute',
    right: 12,
    zIndex: 100,
  },
});
