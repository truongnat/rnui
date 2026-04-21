import { useTokens } from '@truongdq01/headless';
import {
  AppBar,
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
  Button,
  Stack,
  Toolbar,
  Typography,
} from '@truongdq01/ui';
import { ChevronLeft, Menu, MoreVertical, Search } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

function PreviewCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTokens();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: t.color.surface.default,
          borderColor: t.color.border.subtle,
          borderRadius: t.radius.xl,
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
      description="The App Bar displays information and actions relating to the current screen."
    >
      <DemoSection title="Basic App Bar">
        <Typography
          variant="body2"
          color="secondary"
          style={{ marginBottom: t.spacing[4] }}
        >
          A clean top bar with leading navigation and trailing actions.
        </Typography>

        <PreviewCard>
          <AppBar
            style={[
              styles.previewAppBar,
              {
                borderRadius: t.radius.xl,
                overflow: 'hidden',
              },
            ]}
          >
            <Toolbar style={{ paddingVertical: t.spacing[2] }}>
              <AppBarLeading>
                <Button
                  variant="ghost"
                  style={[
                    styles.iconButton,
                    { backgroundColor: 'rgba(255,255,255,0.14)' },
                  ]}
                  leadingIcon={<Menu size={22} color="#fff" />}
                  accessibilityLabel="Open menu"
                />
              </AppBarLeading>

              <AppBarTitle>
                <Typography style={{ color: '#fff', fontWeight: '700' }}>
                  Page Title
                </Typography>
              </AppBarTitle>

              <AppBarTrailing>
                <Button
                  variant="ghost"
                  style={[
                    styles.iconButton,
                    { backgroundColor: 'rgba(255,255,255,0.14)' },
                  ]}
                  leadingIcon={<Search size={22} color="#fff" />}
                  accessibilityLabel="Search"
                />
                <Button
                  variant="ghost"
                  style={[
                    styles.iconButton,
                    { backgroundColor: 'rgba(255,255,255,0.14)' },
                  ]}
                  leadingIcon={<MoreVertical size={22} color="#fff" />}
                  accessibilityLabel="More actions"
                />
              </AppBarTrailing>
            </Toolbar>
          </AppBar>
        </PreviewCard>
      </DemoSection>

      <DemoSection title="With Subtitle">
        <PreviewCard>
          <AppBar
            style={[
              styles.previewAppBar,
              {
                borderRadius: t.radius.xl,
                overflow: 'hidden',
              },
            ]}
          >
            <Toolbar style={{ paddingVertical: t.spacing[2] }}>
              <AppBarLeading>
                <Button
                  variant="ghost"
                  style={[
                    styles.iconButton,
                    { backgroundColor: 'rgba(255,255,255,0.14)' },
                  ]}
                  leadingIcon={<ChevronLeft size={22} color="#fff" />}
                  accessibilityLabel="Go back"
                />
              </AppBarLeading>
              <AppBarTitle>
                <Typography style={{ color: '#fff', fontWeight: '700' }}>
                  Main Title
                </Typography>
                <Typography
                  variant="caption"
                  style={{ color: 'rgba(255,255,255,0.82)' }}
                >
                  Subtitle or secondary info
                </Typography>
              </AppBarTitle>
            </Toolbar>
          </AppBar>
        </PreviewCard>
      </DemoSection>

      <DemoSection title="Brand Variant">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Customizing the App Bar with brand colors for a distinctive identity.
        </Typography>
        <PreviewCard>
          <AppBar
            style={[
              styles.previewAppBar,
              {
                backgroundColor: t.color.brand.default,
                borderRadius: t.radius.xl,
                overflow: 'hidden',
              },
            ]}
          >
            <Toolbar style={{ paddingVertical: t.spacing[2] }}>
              <AppBarLeading>
                <Button
                  variant="ghost"
                  style={[
                    styles.iconButton,
                    { backgroundColor: 'rgba(255,255,255,0.14)' },
                  ]}
                  leadingIcon={<ChevronLeft size={22} color="#fff" />}
                  accessibilityLabel="Go back"
                />
              </AppBarLeading>
              <AppBarTitle>
                <Typography style={{ color: '#fff', fontWeight: '700' }}>
                  Brand Identity
                </Typography>
                <Typography
                  variant="caption"
                  style={{ color: 'rgba(255,255,255,0.82)' }}
                >
                  In the cloud
                </Typography>
              </AppBarTitle>
              <AppBarTrailing>
                <Button
                  variant="ghost"
                  style={[
                    styles.iconButton,
                    { backgroundColor: 'rgba(255,255,255,0.14)' },
                  ]}
                  leadingIcon={<Search size={22} color="#fff" />}
                  accessibilityLabel="Search"
                />
              </AppBarTrailing>
            </Toolbar>
          </AppBar>
        </PreviewCard>
      </DemoSection>
      
      <DemoSection title="Style Variations">
        <Stack spacing="lg">
            <View>
                <Typography variant="overline" style={{ marginBottom: 6 }}>Bordered</Typography>
                <PreviewCard>
                  <AppBar
                    color="default"
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: t.color.border.default,
                      borderRadius: t.radius.xl,
                      overflow: 'hidden',
                    }}
                  >
                    <Toolbar style={{ paddingVertical: t.spacing[2] }}>
                      <AppBarTitle>
                        <Typography style={{ fontWeight: '700' }}>
                          Bordered App Bar
                        </Typography>
                      </AppBarTitle>
                    </Toolbar>
                  </AppBar>
                </PreviewCard>
            </View>

            <View>
                <Typography variant="overline" style={{ marginBottom: 6 }}>Transparent / Background Match</Typography>
                <PreviewCard>
                  <AppBar
                    color="transparent"
                    style={{
                      borderRadius: t.radius.xl,
                      overflow: 'hidden',
                    }}
                  >
                    <Toolbar style={{ paddingVertical: t.spacing[2] }}>
                      <AppBarTitle>
                        <Typography style={{ fontWeight: '700' }}>
                          Transparent App Bar
                        </Typography>
                      </AppBarTitle>
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
                </PreviewCard>
            </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 12,
  },
  previewAppBar: {
    borderRadius: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
  },
});
