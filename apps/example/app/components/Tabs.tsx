import { useState } from 'react';
import { useTokens } from '@truongdq01/headless';
import { Tab, Tabs, Typography, Card } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TabsScreen() {
  const t = useTokens();
  const [activeTab1, setActiveTab1] = useState('profile');

  return (
    <DemoPage
      title="Tabs"
      description="Organize content into categories without leaving the current context."
    >
      <DemoSection
        title="Standard Navigation"
        description="Underlined style with animated indicator."
      >
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
            Content for the selected tab appears here.
          </Typography>
        </Card>
      </DemoSection>

      <DemoSection
        title="Guidelines"
        description="Keep labels concise. For 5+ items, consider Select or Bottom Navigation."
      />
    </DemoPage>
  );
}
