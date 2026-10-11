import { View } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { List, ListSeparator } from '@/components/ui/list';
import { ListItem } from '@/components/ui/list-item';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { CONTACTS } from '@/demo/demoData';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ListScreen() {
  const { toast } = useToast();

  return (
    <DemoPage
      title="List"
      description="Display collections of data using list items, supporting various layouts, avatars, and status badges."
    >
      <DemoSection title="Basic List Items" flush>
        <List>
          <ListItem
            title="Profile Settings"
            onPress={() => toast.info('Profile settings selected')}
          />
          <ListSeparator />
          <ListItem
            title="Notifications"
            onPress={() => toast.info('Notification preferences selected')}
          />
          <ListSeparator />
          <ListItem
            title="Help & Support"
            onPress={() => toast.info('Help and support selected')}
          />
        </List>
      </DemoSection>

      <DemoSection
        title="People & metadata"
        description="Names, roles, recent activity, and compact badges."
        flush
      >
        {CONTACTS.slice(0, 5).map((contact, index) => (
          <View key={contact.id}>
            <ListItem
              title={contact.name}
              subtitle={contact.role}
              leading={
                <Avatar>
                  <AvatarFallback>{contact.initials}</AvatarFallback>
                </Avatar>
              }
              trailing={
                <View className="items-end gap-1">
                  <Text variant="muted" className="text-xs">
                    {contact.time}
                  </Text>
                  {contact.unread > 0 ? (
                    <Badge>
                      {contact.unread > 99 ? '99+' : contact.unread}
                    </Badge>
                  ) : null}
                </View>
              }
              onPress={() => toast.info(`Chat with ${contact.name}`)}
            />
            {index < 4 ? <ListSeparator className="ml-16" /> : null}
          </View>
        ))}
      </DemoSection>

      <DemoSection title="Subtitles & Avatars" flush>
        <List>
          {CONTACTS.slice(5, 8).map((contact, index) => (
            <View key={contact.id}>
              <ListItem
                title={contact.name}
                subtitle={contact.role}
                leading={
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{contact.initials}</AvatarFallback>
                  </Avatar>
                }
                onPress={() => toast.info(`Viewing ${contact.name}`)}
              />
              {index < 2 ? <ListSeparator /> : null}
            </View>
          ))}
        </List>
      </DemoSection>

      <DemoSection
        title="Informational row"
        description="Without an action, a row has no chevron or button semantics."
        flush
      >
        <ListItem
          title="Offline backup"
          subtitle="Not available on this device"
        />
      </DemoSection>
    </DemoPage>
  );
}
