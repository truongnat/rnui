import { useTokens } from '@truongdq01/headless';
import { SpeedDial, SpeedDialAction, Stack } from '@truongdq01/ui';
import { Copy, FilePlus, Mail, Plus, Printer, Share2 } from 'lucide-react-native';
import { Alert, View } from 'react-native';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function SpeedDialScreen() {
  const t = useTokens();

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
          <View style={{ height: t.spacing[20] + t.spacing[10], alignItems: 'center' }}>
            <SpeedDial ariaLabel="Add Actions" icon={<Plus size={24} />}>
              <SpeedDialAction
                icon={<Mail size={20} color={t.color.text.secondary} />}
                tooltipTitle="Email"
                onPress={handleAction('Email')}
              />
              <SpeedDialAction
                icon={<Share2 size={20} color={t.color.text.secondary} />}
                tooltipTitle="Share"
                onPress={handleAction('Share')}
              />
              <SpeedDialAction
                icon={<Copy size={20} color={t.color.text.secondary} />}
                tooltipTitle="Copy"
                onPress={handleAction('Copy')}
              />
            </SpeedDial>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Directions" description="Open up, down, left, or right.">
        <Stack spacing="xl">
          <View style={{ height: t.spacing[20], alignItems: 'center' }}>
            <SpeedDial
              direction="right"
              ariaLabel="Left-Right Actions"
              icon={<Plus size={24} />}
            >
              <SpeedDialAction
                icon={<Printer size={20} color={t.color.text.secondary} />}
                tooltipTitle="Print"
                onPress={handleAction('Print')}
              />
              <SpeedDialAction
                icon={<FilePlus size={20} color={t.color.text.secondary} />}
                tooltipTitle="Save"
                onPress={handleAction('Save')}
              />
            </SpeedDial>
          </View>

          <View style={{ height: t.spacing[20] + t.spacing[10], alignItems: 'center' }}>
            <SpeedDial
              direction="down"
              ariaLabel="Down Actions"
              icon={<Plus size={24} />}
            >
              <SpeedDialAction
                icon={<Share2 size={20} color={t.color.text.secondary} />}
                tooltipTitle="Social"
                onPress={handleAction('Social')}
              />
              <SpeedDialAction
                icon={<Mail size={20} color={t.color.text.secondary} />}
                tooltipTitle="Contact"
                onPress={handleAction('Contact')}
              />
            </SpeedDial>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Guidelines"
        description="Primary screen action only. Use tooltips; keep under 6 actions."
      />
    </DemoPage>
  );
}
