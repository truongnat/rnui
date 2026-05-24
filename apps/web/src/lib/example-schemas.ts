import type { ScreenSchema } from '@truongdq01/component-schema';
import dashboardSchema from '../../../../.ai/examples/schemas/dashboard.schema.json';
import formSchema from '../../../../.ai/examples/schemas/form.schema.json';
import loginSchema from '../../../../.ai/examples/schemas/login.schema.json';
import profileCardSchema from '../../../../.ai/examples/schemas/profile-card.schema.json';
import settingsSchema from '../../../../.ai/examples/schemas/settings.schema.json';

export type ExampleSchemaKey =
  | 'login'
  | 'settings'
  | 'profile-card'
  | 'dashboard'
  | 'form';

export const exampleSchemas: Record<ExampleSchemaKey, ScreenSchema> = {
  login: loginSchema as ScreenSchema,
  settings: settingsSchema as ScreenSchema,
  'profile-card': profileCardSchema as ScreenSchema,
  dashboard: dashboardSchema as ScreenSchema,
  form: formSchema as ScreenSchema,
};

export const exampleSchemaList = Object.entries(exampleSchemas).map(
  ([key, schema]) => ({
    key: key as ExampleSchemaKey,
    label: schema.name,
    description: schema.description,
  })
);
