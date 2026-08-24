import type { ScreenSchema } from '@truongdq01/component-schema';

export type GenerateSchemaInput = {
  prompt: string;
  currentSchema?: ScreenSchema;
};

export type GenerateSchemaResult = {
  schema: ScreenSchema;
  reasoningSummary?: string;
};

export type RepairSchemaInput = {
  schema: unknown;
  errors: string[];
};

export interface AIProvider {
  generateSchema(input: GenerateSchemaInput): Promise<GenerateSchemaResult>;
  repairSchema(input: RepairSchemaInput): Promise<GenerateSchemaResult>;
}

export type ChatRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
};

export function createMessage(
  role: ChatRole,
  content: string,
  id?: string
): ChatMessage {
  return {
    id: id ?? `${role}-${Date.now()}-${crypto.randomUUID()}`,
    role,
    content,
    timestamp: Date.now(),
  };
}
