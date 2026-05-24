import {
  getLazyLoadPlan,
  listWebPreviewComponents,
  validateScreenSchema,
} from '@truongdq01/component-schema';
import type { ScreenSchema } from '@truongdq01/component-schema';
import { createDefaultComponentMap } from './componentMap';
import { createLazyComponentMap } from './lazyComponentMap';
import type {
  LazyComponentMap,
  PrepareScreenRenderOptions,
  PreparedScreenRender,
  RendererComponentMap,
} from './types';

export {
  createDefaultComponentMap,
  getMvpComponentTypes,
} from './componentMap';
export { createLazyComponentMap } from './lazyComponentMap';

export async function loadComponentsForPlan(
  plan: ReturnType<typeof getLazyLoadPlan>,
  lazyMap: LazyComponentMap = createLazyComponentMap()
): Promise<RendererComponentMap> {
  const entries = await Promise.all(
    plan.components.map(async (entry) => {
      const loader = lazyMap[entry.import.lazyKey];
      if (!loader) {
        throw new Error(
          `No lazy loader registered for "${entry.import.lazyKey}" (${entry.type})`
        );
      }
      const loaded = await loader();
      return [entry.import.lazyKey, loaded.default] as const;
    })
  );

  return Object.fromEntries(entries);
}

export function getWebPreviewComponentTypes(): string[] {
  return listWebPreviewComponents().map((schema) => schema.name);
}

export function prepareScreenRender(
  schema: unknown,
  options: PrepareScreenRenderOptions = {}
): PreparedScreenRender {
  const validation = validateScreenSchema(schema, {
    requireWebPreview: options.requireWebPreview ?? true,
    maxDepth: options.maxDepth,
    maxNodes: options.maxNodes,
  });

  if (!validation.valid) {
    return {
      valid: false,
      errors: validation.errors.map((e) => `${e.path}: ${e.message}`),
      warnings: validation.warnings.map((w) => `${w.path}: ${w.message}`),
    };
  }

  const screenSchema = schema as ScreenSchema;
  const plan = getLazyLoadPlan(screenSchema);

  return {
    valid: true,
    schema: screenSchema,
    plan,
    errors: [],
    warnings: validation.warnings.map((w) => `${w.path}: ${w.message}`),
  };
}

/** Alias for prepareScreenRender — validate before mounting the preview tree. */
export function validateBeforeRender(
  schema: unknown,
  options: PrepareScreenRenderOptions = {}
): PreparedScreenRender {
  return prepareScreenRender(schema, options);
}
