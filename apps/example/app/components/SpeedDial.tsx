import { useTokens } from '@truongdq01/headless';
import { SpeedDial, SpeedDialAction, Stack, Typography } from '@truongdq01/ui';
import { Copy, FilePlus, Mail, Plus, Printer, Share2 } from 'lucide-react-native';
import React from 'react';
import { Alert, View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function SpeedDialScreen() {
  const t = useTokens();

  const handleAction = (name: string) => () => {
    Alert.alert('Action', name);
  };

  return (
    <DemoPage 
      title="SpeedDial" 
      description="A floating action button that displays a series of related actions when pressed, perfect for primary screen interactions."
    >
      <DemoSection title="Standard Speed Dial">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The default speed dial expands upwards.
        </Typography>
        <View style={{ height: 120, alignItems: 'center' }}>
            <SpeedDial ariaLabel="Add Actions" icon={<Plus color="#fff" />}>
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
      </DemoSection>

      <DemoSection title="Directions">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Speed dials can open in any direction: up, down, left, or right.
        </Typography>
        <Stack spacing="xl">
            <View style={{ height: 100, alignItems: 'center' }}>
                <Typography variant="overline" style={{ marginBottom: 8 }}>Direction: Right</Typography>
                <SpeedDial direction="right" ariaLabel="Left-Right Actions" icon={<Plus color="#fff" />}>
                  <SpeedDialAction icon={<Printer size={20} color={t.color.text.secondary} />} onPress={handleAction('Print')} />
                  <SpeedDialAction icon={<FilePlus size={20} color={t.color.text.secondary} />} onPress={handleAction('Save')} />
                </SpeedDial>
            </View>

            <View style={{ height: 140, alignItems: 'center' }}>
                <Typography variant="overline" style={{ marginBottom: 8 }}>Direction: Down</Typography>
                <SpeedDial direction="down" ariaLabel="Down Actions" icon={<Plus color="#fff" />}>
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

      <DemoSection title="Usage Considerations">
        <Typography variant="body2" color="secondary">
          Speed dials should be used for the primary action of a screen. 
          Use tooltips to provide clarity for each action icon.
          Avoid adding more than 6 actions to ensure the UI remains clean.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}
