import { Camera, MessageSquarePlus, Plus, Send, Trash2 } from 'lucide-react-native';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Fab } from '@/components/ui/fab';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function FabScreen() {
  const { toast } = useToast();
  const onPrimary = useIconColor('onPrimary');
  const foreground = useIconColor('foreground');

  return (
    <DemoPage
      title="Floating Action Button"
      description="Primary action button that hovers over screen content — notice the live '+' button floating in the bottom-right corner!"
      floatingContent={
        <Fab
          floating
          icon={<Plus size={26} color={onPrimary} />}
          onPress={() => toast.success('Floating Action Button tapped!')}
        />
      }
    >
      {/* 1. Live Floating FAB Notice */}
      <DemoSection
        title="1. Live Floating Button (Bottom-Right)"
        description="A real floating button anchored at the bottom-right corner of this screen. Tap it to test!"
        bare
      >
        <Card className="p-5 border-border bg-primary/5">
          <Text className="text-sm font-semibold text-foreground">
            👉 Look at the bottom-right of your screen!
          </Text>
          <Text variant="muted" className="mt-1">
            The primary Floating Action Button hovers over all scrollable content with spring press feedback and shadow elevation.
          </Text>
        </Card>
      </DemoSection>

      {/* 2. Extended FAB with Label + Icon */}
      <DemoSection
        title="2. Extended FAB"
        description="Pill-shaped action button with label and icon for maximum clarity."
        bare
      >
        <Card className="p-5 border-border">
          <View className="flex-row flex-wrap items-center gap-3">
            <Fab
              label="Compose Message"
              icon={<MessageSquarePlus size={20} color={onPrimary} />}
              onPress={() => toast.info('Compose tapped')}
            />
            <Fab
              label="Capture Photo"
              variant="secondary"
              icon={<Camera size={20} color={foreground} />}
              onPress={() => toast.info('Camera opened')}
            />
          </View>
        </Card>
      </DemoSection>

      {/* 3. Sizes */}
      <DemoSection
        title="3. Sizes"
        description="Small (40px), Default (56px), Large (64px)."
        bare
      >
        <Card className="p-5 border-border">
          <View className="flex-row items-center gap-6">
            <View className="items-center gap-2">
              <Fab
                size="sm"
                icon={<Plus size={18} color={onPrimary} />}
                onPress={() => toast.info('Small FAB (40px)')}
              />
              <Text variant="muted">Small (40px)</Text>
            </View>

            <View className="items-center gap-2">
              <Fab
                size="md"
                icon={<Plus size={24} color={onPrimary} />}
                onPress={() => toast.info('Default FAB (56px)')}
              />
              <Text variant="muted">Default (56px)</Text>
            </View>

            <View className="items-center gap-2">
              <Fab
                size="lg"
                icon={<Plus size={28} color={onPrimary} />}
                onPress={() => toast.info('Large FAB (64px)')}
              />
              <Text variant="muted">Large (64px)</Text>
            </View>
          </View>
        </Card>
      </DemoSection>

      {/* 4. Color Variants */}
      <DemoSection
        title="4. Color Variants & States"
        description="Default primary, secondary muted, destructive red, and disabled."
        bare
      >
        <Card className="p-5 border-border">
          <View className="flex-row items-center gap-4">
            <Fab
              variant="default"
              icon={<Send size={22} color={onPrimary} />}
              onPress={() => toast.info('Default variant')}
            />
            <Fab
              variant="secondary"
              icon={<Send size={22} color={foreground} />}
              onPress={() => toast.info('Secondary variant')}
            />
            <Fab
              variant="destructive"
              icon={<Trash2 size={22} color="#ffffff" />}
              onPress={() => toast.error('Destructive action')}
            />
            <Fab
              disabled
              icon={<Plus size={22} color={onPrimary} />}
            />
          </View>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
