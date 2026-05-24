import { useRef, useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Button, Menu, MenuItem } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { MoreVertical, Edit2, Trash2, Share2, Copy } from 'lucide-react-native';

type MenuAnchor = {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
};

export default function MenuScreen() {
  const t = useTokens();
  const [basicOpen, setBasicOpen] = useState(false);
  const [basicAnchor, setBasicAnchor] = useState<MenuAnchor | null>(null);

  const [iconOpen, setIconOpen] = useState(false);
  const [iconAnchor, setIconAnchor] = useState<MenuAnchor | null>(null);

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
      description="Temporary surfaces with a list of choices."
    >
      <DemoSection title="Basic Dropdown" description="Select an action from a list.">
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

      <DemoSection title="With Icons" description="Icons help users scan actions faster.">
        <View
          ref={iconBtnRef}
          collapsable={false}
          style={{
            alignSelf: 'flex-start',
            padding: t.spacing[2],
            borderRadius: t.radius.full,
            backgroundColor: t.color.bg.default,
            borderWidth: 1,
            borderColor: t.color.border.default,
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

      <DemoSection
        title="Guidelines"
        description="Group logically; place destructive actions last. Portal and safe areas handled automatically."
      />
    </DemoPage>
  );
}
