import { useTokens } from '@truongdq01/headless';
import { Stack, Typography, Paper, Divider, Box } from '@truongdq01/ui';
import React from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

const Item = ({ children }: { children: string }) => (
    <Paper elevation="sm" style={{ padding: 12, minWidth: 60, alignItems: 'center' }}>
        <Typography variant="button">{children}</Typography>
    </Paper>
);

export default function StackScreen() {
  const t = useTokens();
  
  return (
    <DemoPage
      title="Stack"
      description="Stack manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child."
    >
      <DemoSection title="Direction & Spacing">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The Stack component defaults to a vertical (column) axis with 'sm' spacing.
        </Typography>
        <Stack spacing="md">
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>
      </DemoSection>

      <DemoSection title="Horizontal Stack">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Items arranged horizontally with 'lg' spacing.
        </Typography>
        <Stack direction="row" spacing="lg">
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
        </Stack>
      </DemoSection>

      <DemoSection title="Dividers">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Easily insert dividers between items.
        </Typography>
        <Stack spacing="md" divider={<Divider />}>
            <Item>Top</Item>
            <Item>Middle</Item>
            <Item>Bottom</Item>
        </Stack>
      </DemoSection>

      <DemoSection title="Nesting & Alignment">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Stack components can be nested to create complex layouts.
        </Typography>
        <Stack spacing="xl" alignItems="center">
            <Stack direction="row" spacing="xs">
                <Box sx={{ width: 40, height: 40, backgroundColor: 'brand.default', borderRadius: 'full' }} />
                <Box sx={{ width: 40, height: 40, backgroundColor: 'accent.default', borderRadius: 'full' }} />
                <Box sx={{ width: 40, height: 40, backgroundColor: 'success.default', borderRadius: 'full' }} />
            </Stack>
            <Typography variant="h6">Centered Stack</Typography>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
