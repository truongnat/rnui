import { useTokens } from '@truongdq01/headless';
import type { ReactNode } from 'react';
import {
  AppBar,
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
  Button,
  Stack,
  Toolbar,
} from '@truongdq01/ui';
import { ChevronLeft, Menu, MoreVertical, Search } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

function PreviewCard({ children }: { children: ReactNode }) {
  const t = useTokens();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: t.color.surface.default,
          borderColor: t.color.border.subtle,
          borderRadius: t.radius.xl,
          padding: t.spacing[3],
        },
      ]}
    >
      {children}
    </View>
  );
}

export default function AppBarScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="AppBar"
      description="Top bar with navigation, title, and screen actions."
    >
      <DemoSection title="Basic" description="Leading navigation and trailing actions.">
        <AppBar style={{ borderRadius: t.radius.xl, overflow: 'hidden' }}>
          <Toolbar style={{ paddingVertical: t.spacing[2] }}>
            <AppBarLeading>
              <Button
                variant="ghost"
                style={styles.iconButton}
                leadingIcon={<Menu size={22} />}
                accessibilityLabel="Open menu"
              />
            </AppBarLeading>
            <AppBarTitle>Page Title</AppBarTitle>
            <AppBarTrailing>
              <Button
                variant="ghost"
                style={styles.iconButton}
                leadingIcon={<Search size={22} />}
                accessibilityLabel="Search"
              />
              <Button
                variant="ghost"
                style={styles.iconButton}
                leadingIcon={<MoreVertical size={22} />}
                accessibilityLabel="More actions"
              />
            </AppBarTrailing>
          </Toolbar>
        </AppBar>
      </DemoSection>

      <DemoSection title="With Subtitle">
            <AppBar style={{ borderRadius: t.radius.xl, overflow: 'hidden' }}>
              <Toolbar style={{ paddingVertical: t.spacing[2] }}>
                <AppBarLeading>
                  <Button
                    variant="ghost"
                    style={styles.iconButton}
                    leadingIcon={<ChevronLeft size={22} />}
                    accessibilityLabel="Go back"
                  />
                </AppBarLeading>
                <AppBarTitle subtitle="Subtitle or secondary info">
                  Main Title
                </AppBarTitle>
              </Toolbar>
            </AppBar>
      </DemoSection>

      <DemoSection title="Brand" description="Inverse text on brand backgrounds.">
            <AppBar
              color="primary"
              style={{ borderRadius: t.radius.xl, overflow: 'hidden' }}
            >
              <Toolbar style={{ paddingVertical: t.spacing[2] }}>
                <AppBarLeading>
                  <Button
                    variant="ghost"
                    style={styles.iconButton}
                    leadingIcon={
                      <ChevronLeft size={22} color={t.color.text.inverse} />
                    }
                    accessibilityLabel="Go back"
                  />
                </AppBarLeading>
                <AppBarTitle subtitle="In the cloud">Brand Identity</AppBarTitle>
                <AppBarTrailing>
                  <Button
                    variant="ghost"
                    style={styles.iconButton}
                    leadingIcon={
                      <Search size={22} color={t.color.text.inverse} />
                    }
                    accessibilityLabel="Search"
                  />
                </AppBarTrailing>
              </Toolbar>
            </AppBar>
      </DemoSection>

      <DemoSection title="Variants">
        <Stack spacing="lg">
            <AppBar
              color="default"
              variant="outlined"
              style={{ borderRadius: t.radius.xl, overflow: 'hidden' }}
            >
              <Toolbar style={{ paddingVertical: t.spacing[2] }}>
                <AppBarTitle>Bordered App Bar</AppBarTitle>
              </Toolbar>
            </AppBar>
            <AppBar
              color="transparent"
              style={{ borderRadius: t.radius.xl, overflow: 'hidden' }}
            >
              <Toolbar style={{ paddingVertical: t.spacing[2] }}>
                <AppBarTitle>Transparent App Bar</AppBarTitle>
                <AppBarTrailing>
                  <Button
                    variant="ghost"
                    style={styles.iconButton}
                    leadingIcon={<MoreVertical size={22} />}
                    accessibilityLabel="More actions"
                  />
                </AppBarTrailing>
              </Toolbar>
            </AppBar>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
  },
});
