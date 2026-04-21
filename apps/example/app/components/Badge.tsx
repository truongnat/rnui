import { useTokens } from '@truongdq01/headless';
import { Badge, Stack, Typography } from '@truongdq01/ui';
import { CheckCircle2, Clock, Plus, TriangleAlert } from 'lucide-react-native';
import React from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function BadgeScreen() {
  const t = useTokens();

  return (
    <DemoPage 
      title="Badge" 
      description="Small status descriptors for elements, indicating counts, status, or categories."
    >
      <DemoSection title="Variants">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Semantic colors for different states and categories.
        </Typography>
        <Stack direction="row" spacing="sm" wrap="wrap">
          <Badge label="Default" variant="default" />
          <Badge label="Brand" variant="brand" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
          <Badge label="Info" variant="info" />
        </Stack>
      </DemoSection>

      <DemoSection title="With Icons">
        <Stack direction="row" spacing="sm" wrap="wrap">
          <Badge label="Verified" variant="brand" icon={<CheckCircle2 size={12} />} />
          <Badge label="Pending" variant="warning" icon={<Clock size={12} />} />
          <Badge label="Danger" variant="error" icon={<TriangleAlert size={12} />} />
          <Badge label="Added" variant="success" icon={<Plus size={12} />} />
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Badge label="Small" size="sm" variant="brand" />
          <Badge label="Medium" size="md" variant="brand" />
          <Badge label="Large" size="lg" variant="brand" />
        </Stack>
      </DemoSection>

      <DemoSection title="Dots & Counts">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Badges can be dots for status or counts for notifications.
        </Typography>
        <Stack direction="row" spacing="md" alignItems="center">
          <Badge dot size="md" variant="error" />
          <Badge dot size="md" variant="success" />
          <Badge count={3} variant="error" />
          <Badge count={99} variant="error" />
          <Badge count="99+" variant="error" />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
