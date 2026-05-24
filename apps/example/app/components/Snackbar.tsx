import { useState } from 'react';
import { useTokens } from '@truongdq01/headless';
import { Button, Snackbar } from '@truongdq01/ui';
import { DemoPage, DemoSection, DemoGroup } from '@/demo/DemoPage';

export default function SnackbarScreen() {
  const t = useTokens();
  const [basicOpen, setBasicOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [position, setPosition] = useState<{
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  } | null>(null);

  return (
    <DemoPage
      title="Snackbar"
      description="Brief bottom-of-screen messages that inform without interrupting."
    >
      <DemoSection
        title="Core Behavior"
        description="Auto-dismiss after 4s or close manually."
      >
        <Button
          label="Show Simple Snackbar"
          onPress={() => setBasicOpen(true)}
        />
        <Snackbar
          open={basicOpen}
          message="Message archived"
          onClose={() => setBasicOpen(false)}
        />
      </DemoSection>

      <DemoSection
        title="With Actions"
        description="Inline buttons for immediate follow-up."
      >
        <Button
          label="Show with Undo"
          variant="outline"
          onPress={() => setActionOpen(true)}
        />
        <Snackbar
          open={actionOpen}
          message="1 item deleted from your list"
          action={
            <Button
              label="UNDO"
              variant="ghost"
              size="sm"
              onPress={() => setActionOpen(false)}
              color="primary"
              style={{ paddingHorizontal: t.spacing[1] }}
            />
          }
          onClose={() => setActionOpen(false)}
        />
      </DemoSection>

      <DemoSection
        title="Positioning"
        description="Anchor to top, bottom, or horizontal alignment."
      >
        <DemoGroup direction="row">
          <Button
            label="Top Center"
            size="sm"
            variant="ghost"
            onPress={() =>
              setPosition({ vertical: 'top', horizontal: 'center' })
            }
          />
          <Button
            label="Bottom Right"
            size="sm"
            variant="ghost"
            onPress={() =>
              setPosition({ vertical: 'bottom', horizontal: 'right' })
            }
          />
          <Button
            label="Bottom Left"
            size="sm"
            variant="ghost"
            onPress={() =>
              setPosition({ vertical: 'bottom', horizontal: 'left' })
            }
          />
        </DemoGroup>

        {position ? (
          <Snackbar
            open={!!position}
            anchorOrigin={position}
            message={`Position: ${position.vertical} ${position.horizontal}`}
            autoHideDuration={2000}
            onClose={() => setPosition(null)}
          />
        ) : null}
      </DemoSection>
    </DemoPage>
  );
}
