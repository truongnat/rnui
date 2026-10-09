import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TabsScreen() {
  const [activeTab1, setActiveTab1] = useState('profile');

  return (
    <DemoPage
      title="Tabs"
      description="Organize content into categories without leaving the current context."
    >
      <DemoSection
        title="Standard Navigation"
        description="Segmented style with animated indicator."
      >
        <Tabs value={activeTab1} onValueChange={setActiveTab1}>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          {(['profile', 'settings', 'notifications'] as const).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card className="p-4">
                <Text variant="h4" className="mb-2">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} View
                </Text>
                <Text variant="p">
                  Content for the selected tab appears here.
                </Text>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DemoSection>

      <DemoSection
        title="Guidelines"
        description="Keep labels concise. For 5+ items, consider Select or Bottom Navigation."
      />
    </DemoPage>
  );
}
