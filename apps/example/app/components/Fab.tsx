import React from 'react';
import { View } from 'react-native';
import { Fab, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { Plus, Send, Camera, MessageCircle } from 'lucide-react-native';

export default function FabScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Floating Action Button" 
      description="The primary action button that hovers over the content of a screen."
    >
      <DemoSection title="Standard FAB">
        <Typography variant="body2" gutterBottom>
            Basic floating action buttons for trigger primary interactions.
        </Typography>
        <View style={{ flexDirection: 'row', gap: tokens.spacing[4], alignItems: 'center' }}>
          <Fab 
            icon={<Plus size={24} color="#FFFFFF" />} 
            onPress={() => {}} 
          />
          <Fab 
            variant="outline"
            icon={<Camera size={24} color={tokens.color.brand.default} />} 
            onPress={() => {}} 
          />
          <Fab 
            variant="ghost"
            icon={<MessageCircle size={24} color={tokens.color.text.secondary} />} 
            onPress={() => {}} 
          />
        </View>
      </DemoSection>

      <DemoSection title="Extended FAB">
        <Typography variant="body2" gutterBottom>
            Extended variants include a label for maximum clarity.
        </Typography>
        <View style={{ gap: tokens.spacing[3], alignItems: 'flex-start' }}>
          <Fab 
            variant="extended" 
            label="Create New" 
            icon={<Plus size={20} color="#FFFFFF" />} 
            onPress={() => {}} 
          />
          <Fab 
            variant="extended" 
            label="Send Message" 
            icon={<Send size={18} color="#FFFFFF" />} 
            onPress={() => {}} 
          />
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <Typography variant="body2" gutterBottom>
            Smaller buttons can be used for secondary or auxiliary screens.
        </Typography>
        <View style={{ flexDirection: 'row', gap: tokens.spacing[6], alignItems: 'flex-end' }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Fab 
              size="sm"
              icon={<Plus size={18} color="#FFFFFF" />} 
              onPress={() => {}} 
            />
            <Typography variant="caption" color="secondary">Small (40dp)</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Fab 
              icon={<Plus size={24} color="#FFFFFF" />} 
              onPress={() => {}} 
            />
            <Typography variant="caption" color="secondary">Default (56dp)</Typography>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}

