import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextField, Checkbox, Typography, Card, Stack, Switch } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function FormScreen() {
  const { tokens } = useTheme();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subscribe: true,
    notifications: false
  });

  const handleSubmit = () => {
    toast.success('Form submitted successfully!');
    console.log('Form Data:', formData);
  };

  return (
    <DemoPage 
      title="Form Components" 
      description="A collection of input components designed to capture user data consistently."
    >
      <DemoSection title="Account Details">
        <Typography variant="body2" gutterBottom>
            Forms use Stack and Card components to create structured input layouts.
        </Typography>
        <Card>
            <Stack spacing="lg">
                <TextField 
                    label="Username" 
                    placeholder="e.g. janesmith" 
                    value={formData.username}
                    onChangeText={(v) => setFormData(d => ({ ...d, username: v }))}
                />
                <TextField 
                    label="Email Address" 
                    placeholder="email@example.com" 
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(v) => setFormData(d => ({ ...d, email: v }))}
                />
            </Stack>
        </Card>
      </DemoSection>

      <DemoSection title="Preferences">
        <Card>
            <Stack spacing="md">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Typography variant="body1">Email Subscription</Typography>
                        <Typography variant="caption" color="secondary">Receive weekly product updates</Typography>
                    </View>
                    <Switch 
                        checked={formData.subscribe}
                        onChange={(v) => setFormData(d => ({ ...d, subscribe: v }))}
                    />
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Typography variant="body1">Push Notifications</Typography>
                        <Typography variant="caption" color="secondary">Real-time alerts for system events</Typography>
                    </View>
                    <Switch 
                        checked={formData.notifications}
                        onChange={(v) => setFormData(d => ({ ...d, notifications: v }))}
                    />
                </View>

                <View style={{ height: 1, backgroundColor: tokens.color.border.subtle, marginVertical: tokens.spacing[2] }} />

                <Checkbox 
                    label="I agree to the Terms of Service"
                    checked={formData.username.length > 0}
                />
            </Stack>
        </Card>
      </DemoSection>

      <View style={{ padding: tokens.spacing[4], marginTop: tokens.spacing[2] }}>
        <Button 
            label="Save Changes" 
            fullWidth 
            onPress={handleSubmit} 
        />
      </View>
    </DemoPage>
  );
}

