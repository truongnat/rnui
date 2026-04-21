import React, { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Button, Snackbar, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

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
      description="Brief messages about app processes at the bottom of the screen, designed to inform the user of an action without interrupting their experience."
    >
      <DemoSection title="Core Behavior">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Snackbars automatically disappear after a timeout (default 4000ms) or can be closed manually.
        </Typography>
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

      <DemoSection title="With Actions">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Include buttons to allow users to take immediate action on the notification.
        </Typography>
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
              color="brand"
              style={{ paddingHorizontal: 4 }}
            />
          }
          onClose={() => setActionOpen(false)}
        />
      </DemoSection>

      <DemoSection title="Anchoring & Positioning">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Snackbars can be anchored to different parts of the screen: Top, Bottom, and Horizontal alignments.
        </Typography>
        <DemoGroup direction="row">
          <Button 
            label="Top Center" 
            size="sm"
            variant="ghost"
            onPress={() => setPosition({ vertical: 'top', horizontal: 'center' })} 
          />
          <Button 
            label="Bottom Right" 
            size="sm"
            variant="ghost"
            onPress={() => setPosition({ vertical: 'bottom', horizontal: 'right' })} 
          />
          <Button 
            label="Bottom Left" 
            size="sm"
            variant="ghost"
            onPress={() => setPosition({ vertical: 'bottom', horizontal: 'left' })} 
          />
        </DemoGroup>

        {position && (
          <Snackbar
            open={!!position}
            anchorOrigin={position}
            message={`Position: ${position.vertical} ${position.horizontal}`}
            autoHideDuration={2000}
            onClose={() => setPosition(null)}
          />
        )}
      </DemoSection>
    </DemoPage>
  );
}

