import React, { useState } from 'react';
import { useTokens } from '@truongdq01/headless';
import { Tab, Tabs, Typography, Card } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function TabsScreen() {
  const t = useTokens();
  const [activeTab1, setActiveTab1] = useState('profile');

  return (
    <DemoPage
      title="Tabs"
      description="Tabs organize content into different categories and allow users to navigate between them without leaving the current context."
    >
      <DemoSection title="Standard Navigation">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The default underlined style provides a clean, web-standard look for content organization.
        </Typography>
        
        <Tabs value={activeTab1} onChange={(v) => setActiveTab1(v as string)}>
          <Tab value="profile" label="Profile" />
          <Tab value="settings" label="Settings" />
          <Tab value="notifications" label="Notifications" />
        </Tabs>
        
        <Card style={{ marginTop: t.spacing[4], padding: t.spacing[4] }}>
          <Typography variant="h4" style={{ marginBottom: t.spacing[2] }}>
            {activeTab1.charAt(0).toUpperCase() + activeTab1.slice(1)} View
          </Typography>
          <Typography variant="body1">
            This workspace area displays specific content according to the selected tab. 
            The Tabs component manages state and provides smooth visual indicators.
          </Typography>
        </Card>
      </DemoSection>

      <DemoSection title="Usage Considerations">
        <Typography variant="body2" style={{ color: t.color.text.secondary, lineHeight: 20 }}>
          • Use tabs when content can be separated into distinct categories at the same level of hierarchy.{"\n"}
          • Keep labels concise to avoid wrapping or truncation on smaller screens.{"\n"}
          • For more than 4-5 items, consider using a different navigation pattern like a Select or Bottom Navigation.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}

