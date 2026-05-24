import { useTokens } from '@truongdq01/headless';
import { Avatar, AvatarGroup, Stack, Typography } from '@truongdq01/ui';
import { User } from 'lucide-react-native';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

export default function AvatarScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Avatar"
      description="Visual representation of users — images, initials, and icons."
    >
      <DemoSection title="Sizes">
        <Stack direction="row" spacing="md" wrap alignItems="center">
          <Avatar src={DEMO_IMAGE} size="xs" />
          <Avatar src={DEMO_IMAGE} size="sm" />
          <Avatar src={DEMO_IMAGE} size="md" />
          <Avatar src={DEMO_IMAGE} size="lg" />
          <Avatar src={DEMO_IMAGE} size="xl" />
          <Avatar src={DEMO_IMAGE} size="2xl" />
        </Stack>
      </DemoSection>

      <DemoSection title="Types">
        <Stack direction="row" spacing="lg" wrap>
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

      <DemoSection title="Status" description="Availability badges on avatars.">
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

      <DemoSection title="Avatar Group" description="Overlapping avatars with max count.">
        <Stack spacing="xl">
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
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
