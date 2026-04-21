import React, { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Chip, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { User, Tag, Settings, Heart } from 'lucide-react-native';

export default function ChipScreen() {
  const t = useTokens();
  const [selected, setSelected] = useState(['react']);

  const toggleSelection = (key: string) => {
    setSelected(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <DemoPage
      title="Chip"
      description="Chips are compact elements that represent an attribute, text, entity, or action. They allow users to enter information, make selections, filter content, or trigger actions."
    >
      <DemoSection title="Variants & Shapes">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Chips support multiple visual styles including solid, outlined, and ghost variants, 
          along with circular or rounded corners.
        </Typography>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          <Chip label="Solid Chip" variant="solid" />
          <Chip label="Outlined Chip" variant="outlined" />
          <Chip label="Ghost Chip" variant="subtle" />
          {/* shape prop not supported in core yet, can use style if needed */}
          <Chip label="Default Shape" />
        </View>
      </DemoSection>

      <DemoSection title="Colors & Icons">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Status-themed chips and icon support for better visual communication.
        </Typography>
        <View style={{ gap: t.spacing[3] }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
            <Chip label="Primary" color="primary" icon={<Tag size={12} />} />
            <Chip label="Success" color="success" icon={<Settings size={12} />} />
            <Chip label="Error" color="error" icon={<Heart size={12} />} />
            <Chip label="Warning" color="warning" />
            <Chip label="Info" color="info" />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
            <Chip label="Lead Icon" icon={<User size={12} />} />
            <Chip label="With Action" onDelete={() => {}} />
            <Chip label="Full Combo" icon={<User size={12} />} onDelete={() => {}} />
          </View>
        </View>
      </DemoSection>

      <DemoSection title="Interactive Selection">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Chips can be used for single or multiple selection patterns.
        </Typography>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          {['react', 'react-native', 'typescript', 'reanimated'].map(tech => (
            <Chip
              key={tech}
              label={tech.charAt(0).toUpperCase() + tech.slice(1)}
              variant={selected.includes(tech) ? 'solid' : 'outlined'}
              color={selected.includes(tech) ? 'primary' : 'default'}
              onClick={() => toggleSelection(tech)}
            />
          ))}
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Support for different UI densities.
        </Typography>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: t.spacing[2] }}>
          <Chip label="Small" size="sm" color="primary" />
          <Chip label="Medium" size="md" color="primary" />
          <Chip label="Large" size="lg" color="primary" />
        </View>
      </DemoSection>
    </DemoPage>
  );
}

