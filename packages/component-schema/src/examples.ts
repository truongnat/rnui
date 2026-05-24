import type { ScreenSchema } from './screen-schema';
import dashboardSchema from '../../../.ai/examples/schemas/dashboard.schema.json';
import formSchema from '../../../.ai/examples/schemas/form.schema.json';
import loginSchema from '../../../.ai/examples/schemas/login.schema.json';
import profileCardSchema from '../../../.ai/examples/schemas/profile-card.schema.json';
import settingsSchema from '../../../.ai/examples/schemas/settings.schema.json';

/** Example ScreenSchema fixtures — sourced from `.ai/examples/schemas/`. */
export const loginScreenSchemaExample = loginSchema as ScreenSchema;

export const settingsScreenSchemaExample = settingsSchema as ScreenSchema;

export const profileCardScreenSchemaExample = profileCardSchema as ScreenSchema;

export const dashboardScreenSchemaExample = dashboardSchema as ScreenSchema;

export const formScreenSchemaExample = formSchema as ScreenSchema;

export const builtInScreenSchemaExamples = [
  loginScreenSchemaExample,
  settingsScreenSchemaExample,
  profileCardScreenSchemaExample,
  dashboardScreenSchemaExample,
  formScreenSchemaExample,
];
