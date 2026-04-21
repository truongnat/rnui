import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Button, Menu, MenuItem, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { MoreVertical, Edit2, Trash2, Share2, Copy } from 'lucide-react-native';

export default function MenuScreen() {
  const t = useTokens();
  const [basicOpen, setBasicOpen] = useState(false);
  const [basicAnchor, setBasicAnchor] = useState<any>(null);
  
  const [iconOpen, setIconOpen] = useState(false);
  const [iconAnchor, setIconAnchor] = useState<any>(null);

  const basicBtnRef = useRef<View>(null);
  const iconBtnRef = useRef<View>(null);

  const openBasic = () => {
    basicBtnRef.current?.measureInWindow((x, y, width, height) => {
      setBasicAnchor({ pageX: x, pageY: y, width, height });
      setBasicOpen(true);
    });
  };

  const openIcon = () => {
    iconBtnRef.current?.measureInWindow((x, y, width, height) => {
      setIconAnchor({ pageX: x, pageY: y, width, height });
      setIconOpen(true);
    });
  };

  return (
    <DemoPage
      title="Menu"
      description="Menus display a list of choices on temporary surfaces. They appear when users interact with a button, action, or other control."
    >
      <DemoSection title="Basic Dropdown">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The standard menu allows users to select an action or navigate to a new page.
        </Typography>
        <View ref={basicBtnRef} collapsable={false} style={{ alignSelf: 'flex-start' }}>
          <Button label="Account Options" variant="outline" onPress={openBasic} />
        </View>
        
        <Menu
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          anchorEl={basicAnchor}
        >
          <MenuItem label="View Profile" onPress={() => setBasicOpen(false)} />
          <MenuItem label="Account Settings" onPress={() => setBasicOpen(false)} />
          <MenuItem label="Privacy Policy" onPress={() => setBasicOpen(false)} />
          <MenuItem label="Sign Out" onPress={() => setBasicOpen(false)} />
        </Menu>
      </DemoSection>

      <DemoSection title="Menu with Contextual Icons">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Icons help users scan the list faster and understand actions at a glance.
        </Typography>
        <View 
          ref={iconBtnRef} 
          collapsable={false} 
          style={{ 
            alignSelf: 'flex-start', 
            padding: t.spacing[2], 
            borderRadius: t.radius.full, 
            backgroundColor: t.color.bg.default, 
            borderWidth: 1, 
            borderColor: t.color.border.default 
          }}
        >
          <MoreVertical size={24} color={t.color.text.primary} onPress={openIcon} />
        </View>
        
        <Menu
          open={iconOpen}
          onClose={() => setIconOpen(false)}
          anchorEl={iconAnchor}
        >
          <MenuItem 
            label="Edit Object" 
            icon={<Edit2 size={18} color={t.color.text.primary} />} 
            onPress={() => setIconOpen(false)} 
          />
          <MenuItem 
            label="Duplicate" 
            icon={<Copy size={18} color={t.color.text.primary} />} 
            onPress={() => setIconOpen(false)} 
          />
          <MenuItem 
            label="Share Link" 
            icon={<Share2 size={18} color={t.color.text.primary} />} 
            onPress={() => setIconOpen(false)} 
          />
          <MenuItem 
            label="Move to Trash" 
            destructive
            icon={<Trash2 size={18} color={t.color.status.danger} />} 
            onPress={() => setIconOpen(false)} 
          />
        </Menu>
      </DemoSection>

      <DemoSection title="Guidelines">
        <Typography variant="body2" style={{ color: t.color.text.secondary, lineHeight: 20 }}>
          • Menus should be positioned relative to the element that triggers them.{"\n"}
          • List items should be logically grouped, with destructive actions at the bottom.{"\n"}
          • The Menu component automatically handles Portals and safe areas.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}

