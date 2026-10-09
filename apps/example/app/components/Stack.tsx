import { View } from 'react-native';
import { Paper } from '@/components/ui/paper';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

const Item = ({ children, padding }: { children: string; padding: number }) => (
  <Paper elevation="sm" style={{ padding, minWidth: 60, alignItems: 'center' }}>
    <Text variant="small">{children}</Text>
  </Paper>
);

export default function StackScreen() {
  const colors = useThemeColor();

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
            <Item padding={12}>Item 1</Item>
            <Item padding={12}>Item 2</Item>
            <Item padding={12}>Item 3</Item>
          </Stack>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Horizontal"
        description="Row layout with lg spacing between items."
      >
        <DemoPreview>
          <Stack direction="row" spacing="lg">
            <Item padding={12}>1</Item>
            <Item padding={12}>2</Item>
            <Item padding={12}>3</Item>
          </Stack>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Dividers"
        description="Insert dividers between each child."
      >
        <DemoPreview>
          <Stack spacing="md" divider={<Separator />}>
            <Item padding={12}>Top</Item>
            <Item padding={12}>Middle</Item>
            <Item padding={12}>Bottom</Item>
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
                  width: 40,
                  height: 40,
                  backgroundColor: colors.primary,
                  borderRadius: 9999,
                }}
              />
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#f59e0b',
                  borderRadius: 9999,
                }}
              />
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#16a34a',
                  borderRadius: 9999,
                }}
              />
            </Stack>
            <Text variant="h4">Centered Stack</Text>
          </Stack>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
