import {
  builtInScreenSchemaExamples,
  dashboardScreenSchemaExample,
  formScreenSchemaExample,
  loginScreenSchemaExample,
  profileCardScreenSchemaExample,
  settingsScreenSchemaExample,
  type ScreenSchema,
} from '@truongdq01/component-schema';
import {
  createLazyLoadPlan,
  exportSchemaToTsx,
  RNUISchemaRenderer,
  validateBeforeRender,
  type RendererAction,
} from '@truongdq01/renderer';
import { useToast } from '@truongdq01/headless';
import { Button, Card, Stack, Typography } from '@truongdq01/ui';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

type ExampleKey = 'login' | 'settings' | 'profile' | 'dashboard' | 'form';

const EXAMPLES: Record<ExampleKey, ScreenSchema> = {
  login: loginScreenSchemaExample,
  settings: settingsScreenSchemaExample,
  profile: profileCardScreenSchemaExample,
  dashboard: dashboardScreenSchemaExample,
  form: formScreenSchemaExample,
};

export default function AIRendererScreen() {
  const toast = useToast();
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
    setExportedTsx(exportSchemaToTsx(result.schema, { componentName: 'GeneratedScreen' }));
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

  return (
    <DemoPage
      title="AI Render Preview"
      description="Validate ScreenSchema JSON, preview RNUI output, inspect lazy-load plan, and export TSX — no AI API calls."
    >
      <DemoSection
        title="Example schemas"
        description={`${builtInScreenSchemaExamples.length} built-in fixtures from @truongdq01/component-schema.`}
      >
        <Stack direction="row" spacing="sm" wrap>
          <Button
            label="Load Login"
            size="sm"
            variant={activeKey === 'login' ? 'solid' : 'outline'}
            onPress={() => loadExample('login')}
          />
          <Button
            label="Load Settings"
            size="sm"
            variant={activeKey === 'settings' ? 'solid' : 'outline'}
            onPress={() => loadExample('settings')}
          />
          <Button
            label="Profile card"
            size="sm"
            variant={activeKey === 'profile' ? 'solid' : 'outline'}
            onPress={() => loadExample('profile')}
          />
          <Button
            label="Dashboard"
            size="sm"
            variant={activeKey === 'dashboard' ? 'solid' : 'outline'}
            onPress={() => loadExample('dashboard')}
          />
          <Button
            label="Form"
            size="sm"
            variant={activeKey === 'form' ? 'solid' : 'outline'}
            onPress={() => loadExample('form')}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Tools" description="Validate, export, or trigger a sample action.">
        <Stack direction="row" spacing="sm" wrap>
          <Button label="Validate" size="sm" variant="outline" onPress={runValidate} />
          <Button label="Export TSX" size="sm" variant="outline" onPress={runExport} />
          <Button
            label="Trigger sample action"
            size="sm"
            variant="ghost"
            onPress={() => handleAction({ name: 'sample', sourceNodeId: 'demo' })}
          />
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
              actions={actionHandlers}
              onAction={handleAction}
              onValidationError={setValidationErrors}
            />
          </View>
        </DemoPreview>
        {lastAction ? (
          <Typography variant="caption" color="secondary">
            Last action: {lastAction}
          </Typography>
        ) : null}
      </DemoSection>

      <DemoSection title="Validation" description="Latest validateBeforeRender output.">
        <Card padding="md">
          <Stack spacing="xs">
            {validationErrors.length === 0 ? (
              <Typography variant="body2" color="secondary">
                No validation errors recorded.
              </Typography>
            ) : (
              validationErrors.map((message) => (
                <Typography key={message} variant="caption" color="error">
                  {message}
                </Typography>
              ))
            )}
            {validationWarnings.map((message) => (
              <Typography key={message} variant="caption" color="tertiary">
                {message}
              </Typography>
            ))}
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Lazy-load plan"
        description="Unique component types required by the current schema."
      >
        <Card padding="md">
          <Typography variant="body2">
            {uniqueComponentTypes.join(', ') || '—'}
          </Typography>
        </Card>
      </DemoSection>

      {exportedTsx ? (
        <DemoSection title="Exported TSX" description="Static export — handlers are TODO stubs.">
          <Card padding="md">
            <ScrollView horizontal>
              <Typography variant="caption" style={{ fontFamily: 'Menlo' }}>
                {exportedTsx}
              </Typography>
            </ScrollView>
          </Card>
        </DemoSection>
      ) : null}
    </DemoPage>
  );
}
