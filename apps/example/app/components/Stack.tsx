import { Stack, Typography, Paper, Divider } from '@truongdq01/ui';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

const Item = ({ children, padding }: { children: string; padding: number }) => (
  <Paper elevation="sm" style={{ padding, minWidth: 60, alignItems: 'center' }}>
    <Typography variant="button">{children}</Typography>
  </Paper>
);

export default function StackScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Stack"
      description="Layout children vertically or horizontally with spacing and dividers."
    >
      <DemoSection
        title="Direction & Spacing"
        description="Defaults to vertical column with sm spacing."
      >
        <DemoPreview>
          <Stack spacing="md">
            <Item padding={t.spacing[3]}>Item 1</Item>
            <Item padding={t.spacing[3]}>Item 2</Item>
            <Item padding={t.spacing[3]}>Item 3</Item>
          </Stack>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Horizontal"
        description="Row layout with lg spacing between items."
      >
        <DemoPreview>
          <Stack direction="row" spacing="lg">
            <Item padding={t.spacing[3]}>1</Item>
            <Item padding={t.spacing[3]}>2</Item>
            <Item padding={t.spacing[3]}>3</Item>
          </Stack>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Dividers" description="Insert dividers between each child.">
        <DemoPreview>
          <Stack spacing="md" divider={<Divider />}>
            <Item padding={t.spacing[3]}>Top</Item>
            <Item padding={t.spacing[3]}>Middle</Item>
            <Item padding={t.spacing[3]}>Bottom</Item>
          </Stack>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Nesting & Alignment"
        description="Nested stacks with centered alignment."
      >
        <DemoPreview>
          <Stack spacing="xl" alignItems="center">
            <Stack direction="row" spacing="xs">
              <View
                style={{
                  width: t.spacing[10],
                  height: t.spacing[10],
                  backgroundColor: t.color.brand.default,
                  borderRadius: t.radius.full,
                }}
              />
              <View
                style={{
                  width: t.spacing[10],
                  height: t.spacing[10],
                  backgroundColor: t.color.warning.border,
                  borderRadius: t.radius.full,
                }}
              />
              <View
                style={{
                  width: t.spacing[10],
                  height: t.spacing[10],
                  backgroundColor: t.color.success.border,
                  borderRadius: t.radius.full,
                }}
              />
            </Stack>
            <Typography variant="h6">Centered Stack</Typography>
          </Stack>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
