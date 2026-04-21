import React, { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Button, Stepper, Step, StepLabel, StepContent, Typography, Card } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { CheckCircle2, User, CreditCard, Ship } from 'lucide-react-native';

const STEPS = [
  { label: 'Account Info', description: 'Create your display name and password', icon: User },
  { label: 'Payment Method', description: 'Add your credit card or PayPal', icon: CreditCard },
  { label: 'Shipping', description: 'Select your preferred carrier', icon: Ship },
];

export default function StepperScreen() {
  const t = useTokens();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, STEPS.length));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleReset = () => setActiveStep(0);

  return (
    <DemoPage 
      title="Stepper" 
      description="Steps convey progress through a multi-step process by displaying a sequence of logical and numbered steps."
    >
      <DemoSection title="Horizontal Stepper">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Ideal for simple flows where space is limited. Labels are placed below the indicators.
        </Typography>
        <Stepper activeStep={activeStep}>
          {STEPS.map((step, index) => (
            <Step key={step.label} completed={activeStep > index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card style={{ marginTop: t.spacing[6], padding: t.spacing[4] }}>
          {activeStep < STEPS.length ? (
            <>
              <Typography variant="h6" gutterBottom>{STEPS[activeStep].label}</Typography>
              <Typography variant="body2" color="secondary" paragraph>
                {STEPS[activeStep].description}
              </Typography>
              <View style={{ flexDirection: 'row', gap: t.spacing[3], marginTop: t.spacing[4] }}>
                <Button 
                  label="Back" 
                  variant="outline" 
                  disabled={activeStep === 0} 
                  onPress={handleBack} 
                />
                <Button 
                  label={activeStep === STEPS.length - 1 ? 'Finish' : 'Next'} 
                  onPress={handleNext} 
                />
              </View>
            </>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <CheckCircle2 color={t.color.brand.default} size={48} />
              <Typography variant="h6" style={{ marginTop: t.spacing[4] }}>All Steps Completed!</Typography>
              <Button label="Reset Flow" variant="ghost" onPress={handleReset} style={{ marginTop: t.spacing[4] }} />
            </View>
          )}
        </Card>
      </DemoSection>

      <DemoSection title="Vertical Orientation">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Best for complex forms or when you need to show descriptions simultaneously.
        </Typography>
        <Stepper activeStep={1} orientation="vertical">
          <Step>
            <StepLabel>Selection</StepLabel>
            <StepContent>
              <Typography variant="caption" color="secondary">Choose a category to continue.</Typography>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Details</StepLabel>
            <StepContent>
              <Typography variant="caption" color="secondary">Provide specific information about your request.</Typography>
              <Button label="SAVE DETAILS" size="sm" variant="outline" style={{ marginTop: 8 }} />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
      </DemoSection>

      <DemoSection title="Error State">
        <Stepper activeStep={1}>
          <Step completed>
            <StepLabel>Applied</StepLabel>
          </Step>
          <Step>
            <StepLabel error="Verification Failed">Security</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>
      </DemoSection>
    </DemoPage>
  );
}

