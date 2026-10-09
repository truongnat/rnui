import { Camera, MessageCircle, Plus, Send } from 'lucide-react-native';
import { View } from 'react-native';
import { Fab } from '@/components/ui/fab';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function FabScreen() {
  const onPrimary = useIconColor('onPrimary');

  return (
    <DemoPage
      title="Floating Action Button"
      description="Primary action button that hovers over screen content."
    >
      <DemoSection
        title="Standard"
        description="Primary interactions with icon-only FABs."
      >
        <DemoPreview>
          <View className="flex-row items-center gap-4">
            <Fab
              icon={<Plus size={24} color={onPrimary} />}
              onPress={() => {}}
              accessibilityLabel="Create"
            />
            <Fab
              icon={<Camera size={24} color={onPrimary} />}
              onPress={() => {}}
              accessibilityLabel="Open camera"
            />
            <Fab
              icon={<MessageCircle size={24} color={onPrimary} />}
              onPress={() => {}}
              accessibilityLabel="Open messages"
            />
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Extended"
        description="Label + icon for maximum clarity."
      >
        <View className="items-start gap-3">
          <Fab
            label="Create New"
            icon={<Plus size={20} color={onPrimary} />}
            onPress={() => {}}
          />
          <Fab
            label="Send Message"
            icon={<Send size={18} color={onPrimary} />}
            onPress={() => {}}
          />
        </View>
      </DemoSection>

      <DemoSection title="Sizes" description="Small (40dp) and default (56dp).">
        <View className="flex-row items-end gap-6">
          <View className="items-center gap-2">
            <Fab
              size="sm"
              icon={<Plus size={18} color={onPrimary} />}
              onPress={() => {}}
            />
            <Text variant="muted">Small</Text>
          </View>
          <View className="items-center gap-2">
            <Fab
              icon={<Plus size={24} color={onPrimary} />}
              onPress={() => {}}
            />
            <Text variant="muted">Default</Text>
          </View>
        </View>
      </DemoSection>

      <DemoSection
        title="Disabled"
        description="Dims and blocks interaction for unavailable actions."
      >
        <Fab
          icon={<Plus size={24} color={onPrimary} />}
          onPress={() => {}}
          disabled
          accessibilityLabel="Create (unavailable)"
        />
      </DemoSection>
    </DemoPage>
  );
}
