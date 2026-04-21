import React from 'react';
import { View, Image } from 'react-native';
import { EmptyState, Button, Typography, Card } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { RefreshCw, Plus } from 'lucide-react-native';

export default function EmptyStateScreen() {
  const { tokens } = useTheme();
  const toast = useToast();

  return (
    <DemoPage 
      title="Empty State" 
      description="Informs users when there is no content to display and provides guidance on next steps."
    >
      <DemoSection title="Standard Variants">
        <Typography variant="body2" gutterBottom>
            RNUI provides pre-defined variants for common empty states.
        </Typography>
        <View style={{ gap: tokens.spacing[4] }}>
            <Card padding="none">
                <EmptyState variant="empty" />
            </Card>
            
            <Card padding="none">
                <EmptyState 
                    variant="search" 
                    title="No results found"
                    description="Try adjusting your filters or search terms."
                    action={
                        <Button label="Clear Filters" variant="outline" size="sm" />
                    }
                />
            </Card>
            
            <Card padding="none">
                <EmptyState 
                    variant="error" 
                    title="Systems Down"
                    description="We're having trouble connecting to the server. Please try again later."
                    action={
                        <Button label="Retry Connection" leadingIcon={<RefreshCw size={16} />} size="sm" />
                    }
                />
            </Card>
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <Typography variant="body2" gutterBottom>
            Available in multiple sizes to fit different layout contexts.
        </Typography>
        <View style={{ gap: tokens.spacing[4] }}>
            <Card padding="none">
                <EmptyState title="Small" description="Minimal space usage" size="sm" variant="empty" />
            </Card>
            <Card padding="none">
                <EmptyState title="Medium" description="Standard layout size" size="md" variant="empty" />
            </Card>
            <Card padding="none">
                <EmptyState title="Large" description="High visibility centered layout" size="lg" variant="empty" />
            </Card>
        </View>
      </DemoSection>

      <DemoSection title="Custom Experience">
        <Typography variant="body2" gutterBottom>
            You can provide custom illustrations and primary actions for onboarding.
        </Typography>
        <Card padding="none">
            <EmptyState
                title="Your Journey Starts Here"
                description="Get started by creating your first project or inviting team members to collaborate."
                illustration={
                    <Image 
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486744.png' }}
                        style={{ width: 120, height: 120, marginBottom: tokens.spacing[4] }}
                    />
                }
                action={
                    <Button 
                        label="Create First Project" 
                        leadingIcon={<Plus size={18} />} 
                        onPress={() => toast.success('Initializing project setup...')} 
                    />
                }
            />
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
