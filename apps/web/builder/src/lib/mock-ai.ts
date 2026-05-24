import {
  validateScreenSchema,
  type ScreenSchema,
  type ValidationResult,
} from '@truongdq01/component-schema';
import { exampleSchemas, type ExampleSchemaKey } from './example-schemas';

export type ChatRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
};

export type MockAiResult = {
  reply: string;
  schema: ScreenSchema;
  validation: ValidationResult;
};

const PROMPT_MAP: Array<{
  match: RegExp;
  key: ExampleSchemaKey;
  reply: string;
}> = [
  {
    match: /login|sign[\s-]?in|auth/i,
    key: 'login',
    reply: 'Generated a login screen with email, password, and sign-in action.',
  },
  {
    match: /setting|preference|toggle|notification/i,
    key: 'settings',
    reply: 'Generated a settings screen with switches and a checkbox.',
  },
  {
    match: /profile|avatar|card/i,
    key: 'profile-card',
    reply: 'Generated a profile card with avatar, badge, and actions.',
  },
  {
    match: /dashboard|overview|stats|metric/i,
    key: 'dashboard',
    reply: 'Generated a dashboard layout with cards and status chips.',
  },
  {
    match: /form|input|field|submit/i,
    key: 'form',
    reply: 'Generated a form screen with text fields and submit action.',
  },
];

function cloneSchema(schema: ScreenSchema): ScreenSchema {
  return structuredClone(schema);
}

function invalidDemoSchema(): ScreenSchema {
  const broken = cloneSchema(exampleSchemas.login);
  broken.root.children = [
    ...(Array.isArray(broken.root.children) ? broken.root.children : []),
    {
      type: 'UnknownComponent',
      props: { style: { color: 'red' } },
    },
  ];
  return broken;
}

export function generateMockSchema(prompt: string): MockAiResult {
  const trimmed = prompt.trim();

  if (/invalid|error|repair|broken/i.test(trimmed)) {
    const schema = invalidDemoSchema();
    const validation = validateScreenSchema(schema, { requireWebPreview: true });
    return {
      reply:
        'Generated an intentionally invalid schema for repair-loop testing. Fix validation errors in the Schema panel, then re-validate.',
      schema,
      validation,
    };
  }

  const matched = PROMPT_MAP.find((entry) => entry.match.test(trimmed));
  const key = matched?.key ?? 'login';
  const schema = cloneSchema(exampleSchemas[key]);
  const validation = validateScreenSchema(schema, { requireWebPreview: true });

  return {
    reply:
      matched?.reply ??
      'No exact template matched — using login screen as a safe default. Try: login, settings, profile, dashboard, form.',
    schema,
    validation,
  };
}

export function validateSchemaDraft(
  schema: unknown,
  requireWebPreview = true
): ValidationResult {
  return validateScreenSchema(schema, { requireWebPreview });
}

export function createMessage(
  role: ChatRole,
  content: string,
  id?: string
): ChatMessage {
  return {
    id: id ?? `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    timestamp: Date.now(),
  };
}
