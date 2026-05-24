import { useTokens } from '@truongdq01/headless';
import { Button, Popup, Stack } from '@truongdq01/ui';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react-native';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PopupScreen() {
  const t = useTokens();
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const showPopup = (id: string) => () => setActivePopup(id);
  const hidePopup = () => setActivePopup(null);

  return (
    <DemoPage
      title="Popup"
      description="Temporary overlay messages with auto-hide and severity variants."
    >
      <DemoSection title="Severity" description="Info, success, warning, and error levels.">
        <Stack spacing="md">
          <Button label="Show Info Popup" variant="outline" onPress={showPopup('info')} />
          <Button label="Show Success Popup" variant="outline" onPress={showPopup('success')} />
          <Button label="Show Warning Popup" variant="outline" onPress={showPopup('warning')} />
          <Button label="Show Error Popup" variant="outline" onPress={showPopup('error')} />
        </Stack>

        <Popup
          open={activePopup === 'info'}
          variant="info"
          title="Information"
          message="Your sync is in progress. We'll notify you when it's done."
          icon={<Info size={20} color={t.color.info.icon} />}
          onClose={hidePopup}
        />
        <Popup
          open={activePopup === 'success'}
          variant="success"
          title="Saved Successfully"
          message="All data has been synchronized with the server."
          icon={<CheckCircle size={20} color={t.color.success.icon} />}
          onClose={hidePopup}
        />
        <Popup
          open={activePopup === 'warning'}
          variant="warning"
          title="Account Warning"
          message="Your storage is 90% full. Upgrade to avoid data loss."
          icon={<AlertTriangle size={20} color={t.color.warning.icon} />}
          onClose={hidePopup}
        />
        <Popup
          open={activePopup === 'error'}
          variant="error"
          title="Connection Error"
          message="Could not reach the server. Please check your internet."
          icon={<XCircle size={20} color={t.color.error.icon} />}
          onClose={hidePopup}
        />
      </DemoSection>

      <DemoSection title="Positions" description="Top, center, or bottom of the screen.">
        <Stack direction="row" spacing="sm">
          <Button label="Top" size="sm" variant="outline" onPress={showPopup('pos-top')} />
          <Button label="Center" size="sm" variant="outline" onPress={showPopup('pos-center')} />
          <Button label="Bottom" size="sm" variant="outline" onPress={showPopup('pos-bottom')} />
        </Stack>

        <Popup
          open={activePopup === 'pos-top'}
          position="top"
          message="This popup appears at the top."
          onClose={hidePopup}
        />
        <Popup
          open={activePopup === 'pos-center'}
          position="center"
          message="This popup is perfectly centered."
          onClose={hidePopup}
        />
        <Popup
          open={activePopup === 'pos-bottom'}
          position="bottom"
          message="This popup appears at the bottom."
          onClose={hidePopup}
        />
      </DemoSection>

      <DemoSection title="Actions & Persistent" description="Inline actions or no auto-hide.">
        <Stack spacing="md">
          <Button label="Popup with Actions" variant="outline" onPress={showPopup('actions')} />
          <Button label="Persistent Popup" variant="outline" onPress={showPopup('persistent')} />
        </Stack>

        <Popup
          open={activePopup === 'actions'}
          title="Undo Delete"
          message="The message has been moved to trash."
          onClose={hidePopup}
          actions={
            <Button label="UNDO" size="sm" variant="ghost" onPress={hidePopup} />
          }
        />
        <Popup
          open={activePopup === 'persistent'}
          autoHideDuration={null}
          title="Persistent Notice"
          message="Stays until you tap outside or close manually."
          onClose={hidePopup}
        />
      </DemoSection>
    </DemoPage>
  );
}
