import { Copy, FileText, Mail, Plus, Share2 } from 'lucide-react-native';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { SpeedDial, type SpeedDialAction } from '@/components/ui/speed-dial';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function SpeedDialScreen() {
  const { toast } = useToast();
  const fabColor = useIconColor('onPrimary');
  const actionColor = useIconColor('foreground');
  const actions: SpeedDialAction[] = [
    {
      key: 'compose',
      label: 'New Draft',
      icon: <FileText size={20} color={actionColor} />,
      onPress: () => toast.success('New draft created!'),
    },
    {
      key: 'email',
      label: 'Send Email',
      icon: <Mail size={20} color={actionColor} />,
      onPress: () => toast.info('Opening email composer...'),
    },
    {
      key: 'share',
      label: 'Share Link',
      icon: <Share2 size={20} color={actionColor} />,
      onPress: () => toast.info('Link shared!'),
    },
    {
      key: 'copy',
      label: 'Copy Key',
      icon: <Copy size={20} color={actionColor} />,
      onPress: () => toast.info('Copied to clipboard!'),
    },
  ];

  return (
    <DemoPage
      title="SpeedDial"
      description="The live screen-edge FAB avoids system gestures and cutouts. Its actions scroll when landscape space is limited; the embedded preview opts out."
      floatingContent={
        <SpeedDial
          accessibilityLabel="Open quick actions"
          icon={<Plus size={24} color={fabColor} />}
          actions={actions}
        />
      }
    >
      <DemoSection
        title="Interactive SpeedDial Demo"
        description="Tap the floating '+' button in the bottom-right corner to see the spring expansion and staggered actions."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <View
            style={{
              height: 320,
              position: 'relative',
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text className="text-base font-semibold text-foreground text-center">
              Tap the FAB below 👇
            </Text>
            <Text variant="muted" style={{ textAlign: 'center', marginTop: 4 }}>
              Actions slide up smoothly with 45° rotation on the main button.
            </Text>

            <SpeedDial
              safeArea={false}
              accessibilityLabel="Open preview actions"
              icon={<Plus size={24} color={fabColor} />}
              actions={actions}
            />
          </View>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
