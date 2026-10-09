import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';
import { rendererComponentMap } from '@/demo/rendererComponentMap';
import {
  builtInScreenSchemaExamples,
  dashboardScreenSchemaExample,
  formScreenSchemaExample,
  loginScreenSchemaExample,
  profileCardScreenSchemaExample,
  settingsScreenSchemaExample,
  type ScreenSchema,
} from '@rnui/component-schema';
import {
  createLazyLoadPlan,
  exportSchemaToTsx,
  RNUISchemaRenderer,
  validateBeforeRender,
  type RendererAction,
} from '@rnui/renderer';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

type ExampleKey = 'login' | 'settings' | 'profile' | 'dashboard' | 'form';

const EXAMPLES: Record<ExampleKey, ScreenSchema> = {
  login: loginScreenSchemaExample,
  settings: settingsScreenSchemaExample,
  profile: profileCardScreenSchemaExample,
  dashboard: dashboardScreenSchemaExample,
  form: formScreenSchemaExample,
};

export default function AIRendererScreen() {
  const { toast } = useToast();
  const [activeKey, setActiveKey] = useState<ExampleKey>('login');
  const [schema, setSchema] = useState<ScreenSchema>(loginScreenSchemaExample);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [exportedTsx, setExportedTsx] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);

  const lazyPlan = useMemo(() => createLazyLoadPlan(schema), [schema]);

  const uniqueComponentTypes = useMemo(
    () => [...new Set(lazyPlan.components.map((entry) => entry.type))],
    [lazyPlan]
  );

  const loadExample = useCallback((key: ExampleKey) => {
    setActiveKey(key);
    setSchema(EXAMPLES[key]);
    setExportedTsx('');
    setValidationErrors([]);
    setValidationWarnings([]);
    setLastAction(null);
  }, []);

  const runValidate = useCallback(() => {
    const result = validateBeforeRender(schema, { requireWebPreview: false });
    setValidationErrors(result.errors);
    setValidationWarnings(result.warnings);
    if (result.valid) {
      toast.success('Schema is valid');
    } else {
      toast.error('Schema has validation errors');
    }
  }, [schema, toast]);

  const runExport = useCallback(() => {
    const result = validateBeforeRender(schema, { requireWebPreview: false });
    if (!result.valid || !result.schema) {
      setValidationErrors(result.errors);
      toast.error('Fix validation errors before export');
      return;
    }
    setExportedTsx(
      exportSchemaToTsx(result.schema, { componentName: 'GeneratedScreen' })
    );
    toast.success('TSX exported below');
  }, [schema, toast]);

  const handleAction = useCallback(
    (action: RendererAction) => {
      const label = action.sourceNodeId
        ? `${action.name} (${action.sourceNodeId})`
        : action.name;
      setLastAction(label);
      toast.info(`Action: ${action.name}`);
    },
    [toast]
  );

  const actionHandlers = useMemo(
    () => ({
      signIn: () => handleAction({ name: 'signIn' }),
      submit: () => handleAction({ name: 'submit' }),
    }),
    [handleAction]
  );

  const loadButtons: Array<{ key: ExampleKey; label: string }> = [
    { key: 'login', label: 'Load Login' },
    { key: 'settings', label: 'Load Settings' },
    { key: 'profile', label: 'Profile card' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'form', label: 'Form' },
  ];

  return (
    <DemoPage
      title="AI Render Preview"
      description="Validate ScreenSchema JSON, preview RNUI output, inspect lazy-load plan, and export TSX — no AI API calls."
    >
      <DemoSection
        title="Example schemas"
        description={`${builtInScreenSchemaExamples.length} built-in fixtures from @rnui/component-schema.`}
      >
        <Stack direction="row" spacing="sm" wrap>
          {loadButtons.map(({ key, label }) => (
            <Button
              key={key}
              size="sm"
              variant={activeKey === key ? 'default' : 'outline'}
              onPress={() => loadExample(key)}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </DemoSection>

      <DemoSection
        title="Tools"
        description="Validate, export, or trigger a sample action."
      >
        <Stack direction="row" spacing="sm" wrap>
          <Button size="sm" variant="outline" onPress={runValidate}>
            Validate
          </Button>
          <Button size="sm" variant="outline" onPress={runExport}>
            Export TSX
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() =>
              handleAction({ name: 'sample', sourceNodeId: 'demo' })
            }
          >
            Trigger sample action
          </Button>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Live preview"
        description="Rendered with RNUISchemaRenderer — Screen maps to Stack root."
      >
        <DemoPreview>
          <View style={{ minHeight: 280 }}>
            <RNUISchemaRenderer
              schema={schema}
              requireWebPreview={false}
              componentMap={rendererComponentMap}
              actions={actionHandlers}
              onAction={handleAction}
              onValidationError={setValidationErrors}
            />
          </View>
        </DemoPreview>
        {lastAction ? (
          <Text variant="muted">Last action: {lastAction}</Text>
        ) : null}
      </DemoSection>

      <DemoSection
        title="Validation"
        description="Latest validateBeforeRender output."
      >
        <Card className="p-4">
          <Stack spacing="xs">
            {validationErrors.length === 0 ? (
              <Text variant="muted">No validation errors recorded.</Text>
            ) : (
              validationErrors.map((message) => (
                <Text
                  key={message}
                  variant="small"
                  className="text-destructive"
                >
                  {message}
                </Text>
              ))
            )}
            {validationWarnings.map((message) => (
              <Text key={message} variant="small" className="text-muted">
                {message}
              </Text>
            ))}
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Lazy-load plan"
        description="Unique component types required by the current schema."
      >
        <Card className="p-4">
          <Text>{uniqueComponentTypes.join(', ') || '—'}</Text>
        </Card>
      </DemoSection>

      {exportedTsx ? (
        <DemoSection
          title="Exported TSX"
          description="Static export — handlers are TODO stubs."
        >
          <Card className="p-4">
            <ScrollView horizontal>
              <Text variant="small" style={{ fontFamily: 'Menlo' }}>
                {exportedTsx}
              </Text>
            </ScrollView>
          </Card>
        </DemoSection>
      ) : null}
    </DemoPage>
  );
}
