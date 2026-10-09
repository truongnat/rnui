import { User } from 'lucide-react-native';
import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

const SIZES = [
  { label: 'xs', className: 'h-6 w-6' },
  { label: 'sm', className: 'h-8 w-8' },
  { label: 'md', className: 'h-10 w-10' },
  { label: 'lg', className: 'h-14 w-14' },
  { label: 'xl', className: 'h-16 w-16' },
  { label: '2xl', className: 'h-20 w-20' },
] as const;

const STATUS_COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#a1a1aa'] as const;

function AvatarDot({ color }: { color: string }) {
  return (
    <View
      className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background"
      style={{ backgroundColor: color }}
    />
  );
}

export default function AvatarScreen() {
  const iconColor = useIconColor();

  return (
    <DemoPage
      title="Avatar"
      description="Visual representation of users — images, initials, and icons."
    >
      <DemoSection title="Sizes">
        <Stack direction="row" spacing="md" wrap alignItems="center">
          {SIZES.map((s) => (
            <Avatar key={s.label} className={s.className}>
              <AvatarImage source={{ uri: DEMO_IMAGE }} />
              <AvatarFallback>RN</AvatarFallback>
            </Avatar>
          ))}
        </Stack>
      </DemoSection>

      <DemoSection title="Types">
        <Stack direction="row" spacing="lg" wrap>
          <View className="items-center gap-1">
            <Avatar className="h-14 w-14">
              <AvatarImage source={{ uri: DEMO_IMAGE }} />
              <AvatarFallback>RN</AvatarFallback>
            </Avatar>
            <Text variant="muted" className="text-xs">
              Image
            </Text>
          </View>
          <View className="items-center gap-1">
            <Avatar className="h-14 w-14">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Text variant="muted" className="text-xs">
              Initials
            </Text>
          </View>
          <View className="items-center gap-1">
            <Avatar className="h-14 w-14">
              <AvatarFallback />
            </Avatar>
            <Text variant="muted" className="text-xs">
              Fallback
            </Text>
          </View>
          <View className="items-center gap-1">
            <Avatar className="h-14 w-14">
              <AvatarFallback>
                <User color={iconColor} size={24} />
              </AvatarFallback>
            </Avatar>
            <Text variant="muted" className="text-xs">
              Icon
            </Text>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Status" description="Availability badges on avatars.">
        <Stack direction="row" spacing="lg">
          {STATUS_COLORS.map((color) => (
            <View key={color}>
              <Avatar className="h-14 w-14">
                <AvatarImage source={{ uri: DEMO_IMAGE }} />
                <AvatarFallback>RN</AvatarFallback>
              </Avatar>
              <AvatarDot color={color} />
            </View>
          ))}
        </Stack>
      </DemoSection>

      <DemoSection title="Shapes">
        <Stack direction="row" spacing="lg">
          <View className="items-center gap-2">
            <Avatar className="h-16 w-16 rounded-full">
              <AvatarImage source={{ uri: DEMO_IMAGE }} />
              <AvatarFallback>RN</AvatarFallback>
            </Avatar>
            <Text variant="muted" className="text-xs">
              Circle
            </Text>
          </View>
          <View className="items-center gap-2">
            <Avatar className="h-16 w-16 rounded-xl">
              <AvatarImage source={{ uri: DEMO_IMAGE }} />
              <AvatarFallback>RN</AvatarFallback>
            </Avatar>
            <Text variant="muted" className="text-xs">
              Rounded
            </Text>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Avatar Group"
        description="Overlapping avatars with max count."
      >
        <Stack spacing="xl">
          <View className="flex-row items-center">
            {[DEMO_IMAGE, undefined, DEMO_IMAGE, undefined].map((src, i) => (
              <Avatar
                key={`${src ?? 'fallback'}-${i}`}
                className="border-2 border-background"
                style={{ marginLeft: i === 0 ? 0 : -12 }}
              >
                {src ? <AvatarImage source={{ uri: src }} /> : null}
                <AvatarFallback>{i % 2 === 0 ? 'RN' : 'AB'}</AvatarFallback>
              </Avatar>
            ))}
            <Avatar
              className="border-2 border-background"
              style={{ marginLeft: -12 }}
            >
              <AvatarFallback>+2</AvatarFallback>
            </Avatar>
          </View>
          <View className="flex-row items-center">
            {[DEMO_IMAGE, undefined, DEMO_IMAGE].map((src, i) => (
              <Avatar
                key={i}
                className="h-8 w-8 border-2 border-background"
                style={{ marginLeft: i === 0 ? 0 : -10 }}
              >
                {src ? <AvatarImage source={{ uri: src }} /> : null}
                <AvatarFallback>{i === 1 ? 'XY' : 'RN'}</AvatarFallback>
              </Avatar>
            ))}
            <Avatar
              className="h-8 w-8 border-2 border-background"
              style={{ marginLeft: -10 }}
            >
              <AvatarFallback>+1</AvatarFallback>
            </Avatar>
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
