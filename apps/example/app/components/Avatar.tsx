import { useTokens } from '@truongdq01/headless';
import { Avatar, AvatarGroup, Stack, Typography } from '@truongdq01/ui';
import { User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

export default function AvatarScreen() {
  const t = useTokens();

  return (
    <DemoPage 
      title="Avatar" 
      description="Visual representation of a user or entity, supporting images, initials, and icons."
    >
      <DemoSection title="Sizes">
        <Stack direction="row" spacing="md" wrap="wrap" alignItems="center">
          <Avatar src={DEMO_IMAGE} size="xs" />
          <Avatar src={DEMO_IMAGE} size="sm" />
          <Avatar src={DEMO_IMAGE} size="md" />
          <Avatar src={DEMO_IMAGE} size="lg" />
          <Avatar src={DEMO_IMAGE} size="xl" />
          <Avatar src={DEMO_IMAGE} size="2xl" />
        </Stack>
      </DemoSection>

      <DemoSection title="Types">
        <Stack direction="row" spacing="lg" wrap="wrap">
          <View style={{ alignItems: 'center', gap: t.spacing[1] }}>
            <Avatar src={DEMO_IMAGE} size="lg" />
            <Typography variant="overline">Image</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: t.spacing[1] }}>
            <Avatar initials="JD" size="lg" />
            <Typography variant="overline">Initials</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: t.spacing[1] }}>
            <Avatar size="lg" />
            <Typography variant="overline">Fallback</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: t.spacing[1] }}>
            <Avatar 
              size="lg" 
              fallbackIcon={<User color={t.color.text.tertiary} size={24} />} 
            />
            <Typography variant="overline">Icon</Typography>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Status Indicators">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
            Avatars can display a status badge to indicate user availability.
        </Typography>
        <Stack direction="row" spacing="lg">
          <Avatar src={DEMO_IMAGE} size="lg" status="online" />
          <Avatar src={DEMO_IMAGE} size="lg" status="busy" />
          <Avatar src={DEMO_IMAGE} size="lg" status="away" />
          <Avatar src={DEMO_IMAGE} size="lg" status="offline" />
        </Stack>
      </DemoSection>

      <DemoSection title="Shapes">
        <Stack direction="row" spacing="lg">
          <View style={{ alignItems: 'center', gap: t.spacing[2] }}>
              <Avatar src={DEMO_IMAGE} size="xl" shape="circle" />
              <Typography variant="overline">Circle</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: t.spacing[2] }}>
              <Avatar src={DEMO_IMAGE} size="xl" shape="rounded" />
              <Typography variant="overline">Rounded</Typography>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Avatar Group">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
            Group multiple avatars together with overlap and a 'more' count.
        </Typography>
        <Stack spacing="xl">
          <View>
            <Typography variant="overline" style={{ marginBottom: 8 }}>Standard</Typography>
            <AvatarGroup 
                avatars={[
                { src: DEMO_IMAGE },
                { initials: 'AB' },
                { src: DEMO_IMAGE },
                { initials: 'CD' },
                { src: DEMO_IMAGE },
                ]}
                max={4}
            />
          </View>

          <View>
            <Typography variant="overline" style={{ marginBottom: 8 }}>Small</Typography>
            <AvatarGroup 
                size="sm"
                avatars={[
                { src: DEMO_IMAGE },
                { initials: 'XY' },
                { src: DEMO_IMAGE },
                { initials: 'ZW' },
                ]}
                max={3}
            />
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
