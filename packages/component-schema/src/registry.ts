import { nativeOnlyComponentSchemas } from './registry/native-only';
import { webPreviewComponentSchemas } from './registry/web-preview';
import type { ComponentSchema } from './types';

export const componentSchemaRegistry: ComponentSchema[] = [
  ...webPreviewComponentSchemas,
  ...nativeOnlyComponentSchemas,
];

export function getComponentSchema(name: string): ComponentSchema | undefined {
  return componentSchemaRegistry.find(
    (schema) => schema.name.toLowerCase() === name.toLowerCase()
  );
}

export function listComponentSchemas(): ComponentSchema[] {
  return [...componentSchemaRegistry];
}

export { nativeOnlyComponentSchemas, webPreviewComponentSchemas };
