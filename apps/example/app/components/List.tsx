import {
  useTheme,
  useToast,
  useTokens,
} from '@truongdq01/headless';
import {
  Avatar,
  ListItem,
  Typography,
  Divider,
} from '@truongdq01/ui';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import { CONTACTS } from '../kitchen/constants';
import { UnreadBadge } from '../kitchen/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ListScreen() {
  const t = useTokens();
  const { tokens } = useTheme();
  const toast = useToast();

  return (
    <DemoPage 
      title="List" 
      description="Display collections of data using list items, supporting various layouts, avatars, and status badges."
    >
      <DemoSection title="Basic List Items">
        <View style={{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: tokens.color.surface.raised }}>
          <ListItem 
            onPress={() => toast.info('Menu item 1')}
            divider
          >
            <Typography>Profile Settings</Typography>
            <ChevronRight size={16} color={tokens.color.text.tertiary} />
          </ListItem>
          <ListItem 
            onPress={() => toast.info('Menu item 2')}
            divider
          >
            <Typography>Notifications</Typography>
            <ChevronRight size={16} color={tokens.color.text.tertiary} />
          </ListItem>
          <ListItem 
            onPress={() => toast.info('Menu item 3')}
          >
            <Typography>Help & Support</Typography>
            <ChevronRight size={16} color={tokens.color.text.tertiary} />
          </ListItem>
        </View>
      </DemoSection>

      <DemoSection title="Chat List (Telegram Style)">
        {CONTACTS.slice(0, 5).map((contact, index) => (
          <View key={contact.id}>
            <ListItem
              onPress={() => toast.info(`Chat with ${contact.name}`)}
              style={{ paddingVertical: 10 }}
            >
              <Avatar initials={contact.initials} size="md" />
              <View style={{ flex: 1, marginLeft: tokens.spacing[3] }}>
                <Typography fontWeight="semibold" variant="body1">
                  {contact.name}
                </Typography>
                <Typography variant="body2" color="secondary" numberOfLines={1}>
                  {contact.role}
                </Typography>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Typography variant="caption" color="tertiary">
                  {contact.time}
                </Typography>
                <UnreadBadge count={contact.unread} />
              </View>
            </ListItem>
            {index < 4 && (
              <Divider 
                style={{ marginLeft: 64 }} 
                color={tokens.color.border.subtle} 
              />
            )}
          </View>
        ))}
      </DemoSection>

      <DemoSection title="List with Subtitles & Avatars">
        <View style={{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: tokens.color.surface.raised }}>
          {CONTACTS.slice(5, 8).map((contact, index) => (
            <ListItem
              key={contact.id}
              onPress={() => toast.info(`Viewing ${contact.name}`)}
              divider={index < 2}
            >
              <Avatar initials={contact.initials} size="sm" />
              <View style={{ flex: 1, marginLeft: tokens.spacing[3] }}>
                <Typography fontWeight="semibold" variant="body2">
                  {contact.name}
                </Typography>
                <Typography variant="caption" color="secondary">
                  {contact.role}
                </Typography>
              </View>
              <ChevronRight size={14} color={tokens.color.text.tertiary} />
            </ListItem>
          ))}
        </View>
      </DemoSection>

      <DemoSection title="Disabled State">
        <ListItem disabled onPress={() => {}}>
          <Typography color="disabled">Disabled List Item</Typography>
          <Typography variant="caption" color="disabled">Unavailable</Typography>
        </ListItem>
      </DemoSection>
    </DemoPage>
  );
}

