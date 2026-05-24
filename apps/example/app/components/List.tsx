import { useToast, useTokens } from '@truongdq01/headless';
import {
  Avatar,
  Badge,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemLeading,
  ListItemTrailing,
  Typography,
} from '@truongdq01/ui';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import { CONTACTS } from '@/demo/demoData';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ListScreen() {
  const t = useTokens();
  const toast = useToast();

  return (
    <DemoPage
      title="List"
      description="Display collections of data using list items, supporting various layouts, avatars, and status badges."
    >
      <DemoSection title="Basic List Items" flush>
        <List variant="inset">
          <ListItem onPress={() => toast.info('Menu item 1')} divider>
            <ListItemContent primary="Profile Settings" />
            <ListItemTrailing>
              <ChevronRight size={16} color={t.color.text.tertiary} />
            </ListItemTrailing>
          </ListItem>
          <ListItem onPress={() => toast.info('Menu item 2')} divider>
            <ListItemContent primary="Notifications" />
            <ListItemTrailing>
              <ChevronRight size={16} color={t.color.text.tertiary} />
            </ListItemTrailing>
          </ListItem>
          <ListItem onPress={() => toast.info('Menu item 3')}>
            <ListItemContent primary="Help & Support" />
            <ListItemTrailing>
              <ChevronRight size={16} color={t.color.text.tertiary} />
            </ListItemTrailing>
          </ListItem>
        </List>
      </DemoSection>

      <DemoSection
        title="Chat List"
        description="Telegram-style rows with avatar, subtitle, time, and unread badge."
        flush
      >
        {CONTACTS.slice(0, 5).map((contact, index) => (
          <View key={contact.id}>
            <ListItem onPress={() => toast.info(`Chat with ${contact.name}`)}>
              <ListItemLeading>
                <Avatar initials={contact.initials} size="md" />
              </ListItemLeading>
              <ListItemContent
                primary={contact.name}
                secondary={contact.role}
              />
              <ListItemTrailing>
                <View style={{ alignItems: 'flex-end', gap: t.spacing[1] }}>
                  <Typography variant="caption" color="tertiary">
                    {contact.time}
                  </Typography>
                  {contact.unread > 0 ? (
                    <Badge
                      count={contact.unread > 99 ? '99+' : contact.unread}
                      variant="brand"
                      size="sm"
                    />
                  ) : null}
                </View>
              </ListItemTrailing>
            </ListItem>
            {index < 4 ? <ListDivider insetLeading /> : null}
          </View>
        ))}
      </DemoSection>

      <DemoSection title="Subtitles & Avatars" flush>
        <List variant="inset">
          {CONTACTS.slice(5, 8).map((contact, index) => (
            <ListItem
              key={contact.id}
              onPress={() => toast.info(`Viewing ${contact.name}`)}
              divider={index < 2}
            >
              <ListItemLeading>
                <Avatar initials={contact.initials} size="sm" />
              </ListItemLeading>
              <ListItemContent
                primary={contact.name}
                secondary={contact.role}
              />
              <ListItemTrailing>
                <ChevronRight size={14} color={t.color.text.tertiary} />
              </ListItemTrailing>
            </ListItem>
          ))}
        </List>
      </DemoSection>

      <DemoSection title="Disabled State" flush>
        <ListItem disabled onPress={() => {}}>
          <ListItemContent
            primary="Disabled List Item"
            secondary="Unavailable"
          />
        </ListItem>
      </DemoSection>
    </DemoPage>
  );
}
