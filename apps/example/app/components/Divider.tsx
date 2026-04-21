import React from 'react';
import { View } from 'react-native';
import { Divider, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function DividerScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Divider" 
      description="Visual separators used to group content or define boundaries within a layout."
    >
      <DemoSection title="Horizontal Dividers">
        <Typography variant="body2" color="secondary">
          Section A
        </Typography>
        <Divider spacing="md" />
        <Typography variant="body2" color="secondary">
          Section B
        </Typography>
        <Divider spacing="lg" />
        <Typography variant="body2" color="secondary">
          Section C (Large Spacing)
        </Typography>
      </DemoSection>

      <DemoSection title="With Labels">
        <Typography variant="body2" color="secondary" style={{ textAlign: 'center' }}>
          Content above
        </Typography>
        <Divider label="OR" spacing="lg" />
        <Typography variant="body2" color="secondary" style={{ textAlign: 'center' }}>
          Content below
        </Typography>
        
        <View style={{ height: tokens.spacing[4] }} />
        
        <Divider label="CONTINUE WITH" spacing="lg" />
      </DemoSection>

      <DemoSection title="Vertical Dividers">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 48,
            gap: 12,
            backgroundColor: tokens.color.surface.default,
            paddingHorizontal: tokens.spacing[3],
            borderRadius: tokens.radius.md,
          }}
        >
          <Typography variant="body2">Left</Typography>
          <Divider orientation="vertical" spacing="none" />
          <Typography variant="body2">Middle</Typography>
          <Divider orientation="vertical" spacing="none" emphasis />
          <Typography variant="body2">Right (Emphasized)</Typography>
        </View>
      </DemoSection>

      <DemoSection title="Emphasis Variants">
        <Typography variant="caption" color="tertiary" style={{ marginBottom: 4 }}>
          Standard Divider
        </Typography>
        <Divider spacing="sm" />
        
        <View style={{ height: tokens.spacing[4] }} />
        
        <Typography variant="caption" color="tertiary" style={{ marginBottom: 4 }}>
          Emphasized Divider
        </Typography>
        <Divider spacing="sm" emphasis />
      </DemoSection>
    </DemoPage>
  );
}

