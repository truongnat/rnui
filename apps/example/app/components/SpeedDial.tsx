import { Copy, Mail, Plus, Share2, X } from 'lucide-react-native';
import { Alert, View } from 'react-native';
import { SpeedDial } from '@/components/ui/speed-dial';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function SpeedDialScreen() {
  const fabColor = useIconColor('onPrimary');
  const actionColor = useIconColor('foreground');

  const handleAction = (name: string) => () => {
    Alert.alert('Action', name);
  };

  return (
    <DemoPage
      title="SpeedDial"
      description="FAB that reveals a series of related actions."
    >
      <DemoSection title="Standard" description="Expands upward from the FAB.">
        <DemoPreview>
          <View style={{ height: 240, alignItems: 'center' }}>
            <SpeedDial
              icon={<Plus size={24} color={fabColor} />}
              openIcon={<X size={24} color={fabColor} />}
              actions={[
                {
                  key: 'email',
                  label: 'Email',
                  icon: <Mail size={20} color={actionColor} />,
                  onPress: handleAction('Email'),
                },
                {
                  key: 'share',
                  label: 'Share',
                  icon: <Share2 size={20} color={actionColor} />,
                  onPress: handleAction('Share'),
                },
                {
                  key: 'copy',
                  label: 'Copy',
                  icon: <Copy size={20} color={actionColor} />,
                  onPress: handleAction('Copy'),
                },
              ]}
            />
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Guidelines"
        description="Primary screen action only. Use tooltips; keep under 6 actions."
      />
    </DemoPage>
  );
}
