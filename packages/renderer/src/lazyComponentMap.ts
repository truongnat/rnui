import { componentSchemaRegistry } from '@rnui/component-schema';
import type { ElementType } from 'react';
import type { LazyComponentLoader, LazyComponentMap } from './types';

/**
 * Loader function callers provide to resolve a module specifier to its
 * exports — e.g. bundler aliases mapping `@/components/ui/button` to the
 * registry file, or `import('react-native')` for primitives.
 */
export type ModuleLoader = (
  specifier: string
) => Promise<Record<string, unknown>>;

/**
 * Dynamic import map for code-splitting. One loader per unique `lazyKey`,
 * resolved through `loadModule` so the renderer stays agnostic of how
 * `@/components/ui/*` paths are aliased by the host bundler.
 */
export function createLazyComponentMap(
  loadModule?: ModuleLoader
): LazyComponentMap {
  if (!loadModule) return {};

  const map: LazyComponentMap = {};
  for (const schema of componentSchemaRegistry) {
    const { named, from, lazyKey } = schema.import;
    if (map[lazyKey]) continue;
    map[lazyKey] = () =>
      loadModule(from).then((module) => ({
        default: module[named] as ElementType,
      }));
  }
  return map;
}
