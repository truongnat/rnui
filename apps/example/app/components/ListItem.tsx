import { useState } from 'react';
import { Folder, ShieldCheck, Users } from 'lucide-react-native';
import {
  ListItem,
  ListSectionTitle,
  ListSeparator,
} from '@/components/ui/list-item';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function ListItemScreen() {
  const [selected, setSelected] = useState('Team members');
  const iconColor = useIconColor();

  return (
    <DemoPage
      title="List Item"
      description="A reusable row for settings, navigation, and grouped content."
    >
      <DemoSection
        title="Workspace settings"
        description={`Selected row: ${selected}`}
      >
        <ListSectionTitle>Workspace</ListSectionTitle>
        <ListItem
          title="Projects"
          subtitle="Organize your work"
          leading={<Folder size={19} color={iconColor} />}
          onPress={() => setSelected('Projects')}
        />
        <ListSeparator />
        <ListItem
          title="Team members"
          subtitle="Manage access and roles"
          leading={<Users size={19} color={iconColor} />}
          trailing={<Text className="text-xs text-muted-foreground">12</Text>}
          onPress={() => setSelected('Team members')}
        />
        <ListSeparator />
        <ListItem
          title="Security"
          subtitle="Authentication and sessions"
          leading={<ShieldCheck size={19} color={iconColor} />}
          onPress={() => setSelected('Security')}
        />
      </DemoSection>
    </DemoPage>
  );
}
