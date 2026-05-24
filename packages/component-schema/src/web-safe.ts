import { getComponentSchema, listComponentSchemas } from './registry';
import type { ComponentSchema } from './types';

export { getComponentSchema, listComponentSchemas };

export function listWebPreviewComponents(): ComponentSchema[] {
  return listComponentSchemas().filter((schema) => schema.support.webPreview);
}

export function isComponentWebPreviewable(name: string): boolean {
  const schema = getComponentSchema(name);
  return schema?.support.webPreview === true;
}

export function getAllowedProps(name: string): string[] {
  const schema = getComponentSchema(name);
  if (!schema) return [];
  return schema.props
    .filter((prop) => prop.safeForAI !== false)
    .map((prop) => prop.name);
}
