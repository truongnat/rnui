import { useState } from 'react';
import { View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Stepper } from '@/components/ui/stepper';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const STEPS = [
  {
    label: 'Account Info',
    description: 'Create your display name and password',
  },
  {
    label: 'Payment Method',
    description: 'Add your credit card or PayPal',
  },
  {
    label: 'Shipping',
    description: 'Select your preferred carrier',
  },
];

const STEP_LABELS = STEPS.map((s) => s.label);

export default function StepperScreen() {
  const colors = useThemeColor();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleReset = () => setActiveStep(0);

  return (
    <DemoPage
      title="Stepper"
      description="Multi-step progress through a numbered sequence."
    >
      <DemoSection
        title="Horizontal"
        description="Labels below indicators — ideal for compact flows."
      >
        <Stepper steps={STEP_LABELS} current={activeStep} />

        <Card className="mt-6 p-4">
          {activeStep < STEPS.length ? (
            <>
              <Text variant="h4" className="mb-1">
                {STEPS[activeStep].label}
              </Text>
              <Text variant="muted">{STEPS[activeStep].description}</Text>
              <View className="mt-4 flex-row gap-3">
                <Button
                  variant="outline"
                  disabled={activeStep === 0}
                  onPress={handleBack}
                >
                  Back
                </Button>
                <Button onPress={handleNext}>
                  {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </View>
            </>
          ) : (
            <View className="items-center">
              <CheckCircle2 color={colors.primary} size={48} />
              <Text variant="h4" className="mt-4">
                All Steps Completed!
              </Text>
              <Button variant="ghost" onPress={handleReset} className="mt-4">
                Reset Flow
              </Button>
            </View>
          )}
        </Card>
      </DemoSection>

      <DemoSection
        title="States"
        description="Mid-flow versus fully completed sequences."
      >
        <Stack spacing="lg">
          <Stepper steps={['Cart', 'Payment', 'Review', 'Done']} current={2} />
          <Stepper steps={['Cart', 'Payment', 'Review', 'Done']} current={4} />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
