import { Plus, Send, Camera, MessageCircle } from 'lucide-react-native';
import { View } from 'react-native';
import { useTheme } from '@truongdq01/headless';
import { Fab, Typography } from '@truongdq01/ui';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function FabScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Floating Action Button"
      description="Primary action button that hovers over screen content."
    >
      <DemoSection title="Standard" description="Primary interactions with icon-only FABs.">
        <DemoPreview>
          <View
            style={{
              flexDirection: 'row',
              gap: tokens.spacing[4],
              alignItems: 'center',
            }}
          >
            <Fab
              icon={<Plus size={24} />}
              onPress={() => {}}
              accessibilityLabel="Create"
            />
            <Fab
              variant="outline"
              icon={<Camera size={24} />}
              onPress={() => {}}
              accessibilityLabel="Open camera"
            />
            <Fab
              variant="ghost"
              icon={<MessageCircle size={24} />}
              onPress={() => {}}
              accessibilityLabel="Open messages"
            />
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Extended" description="Label + icon for maximum clarity.">
        <View style={{ gap: tokens.spacing[3], alignItems: 'flex-start' }}>
          <Fab
            variant="extended"
            label="Create New"
            icon={<Plus size={20} />}
            onPress={() => {}}
          />
          <Fab
            variant="extended"
            label="Send Message"
            icon={<Send size={18} />}
            onPress={() => {}}
          />
        </View>
      </DemoSection>

      <DemoSection title="Sizes" description="Small (44dp) and default (56dp).">
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing[6],
            alignItems: 'flex-end',
          }}
        >
          <View style={{ alignItems: 'center', gap: tokens.spacing[2] }}>
            <Fab size="sm" icon={<Plus size={18} />} onPress={() => {}} />
            <Typography variant="caption" color="secondary">
              Small
            </Typography>
          </View>
          <View style={{ alignItems: 'center', gap: tokens.spacing[2] }}>
            <Fab icon={<Plus size={24} />} onPress={() => {}} />
            <Typography variant="caption" color="secondary">
              Default
            </Typography>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
