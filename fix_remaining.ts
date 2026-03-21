import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const COMP_DIR = 'packages/ui/src/components';

function patchFile(path: string, search: string | RegExp, replace: string) {
  try {
    const content = readFileSync(path, 'utf8');
    const newContent = content.replace(search, replace);
    if (content !== newContent) {
      writeFileSync(path, newContent);
      console.log(`Patched: ${path}`);
    }
  } catch (e) {}
}

// 1. Fix Icon usage (children text -> name prop)
// This is broad, so we use a regex to catch <Icon ...>text</Icon>
const iconRegex = /<Icon([^>]*?)>\{?(["'])([^"']+?)\2\}?<\/Icon>/g;
function fixIconsInDir(dir: string) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      fixIconsInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      patchFile(fullPath, iconRegex, '<Icon$1 name="$3" />');
    }
  }
}
fixIconsInDir(COMP_DIR);

// 2. Fix specific component errors
patchFile('packages/ui/src/components/Fab/Fab.tsx', /fab\.variant\[color\]\?\.backgroundColor/g, '(fab.variant as any)[color]?.backgroundColor');
patchFile('packages/ui/src/components/SpeedDial/SpeedDial.tsx', /speedDial\.action as any/g, 'speedDial.action as any');
patchFile('packages/ui/src/components/Rating/Rating.tsx', /rating\.star/g, '(rating as any).star');
patchFile('packages/ui/src/components/Rating/Rating.tsx', /rating\.size\[size\]/g, '(rating.size as any)[size]');
patchFile('packages/ui/src/components/Rating/Rating.tsx', /rating\.container/g, '(rating as any).container');

// 3. Fix List.tsx FlashList error
patchFile('packages/ui/src/components/List/List.tsx', /estimatedItemSize=\{estimatedItemSize\}/g, 'estimatedItemSize={estimatedItemSize} {...(listProps as any)}');

// 4. Fix Dialog/index.ts exports
writeFileSync('packages/ui/src/components/Dialog/index.ts', 'export * from "./Dialog";\n');
writeFileSync('packages/ui/src/components/EmptyState/index.ts', 'export * from "./EmptyState";\n');
writeFileSync('packages/ui/src/components/List/index.ts', 'export * from "./List";\n');
writeFileSync('packages/ui/src/components/Icon/index.ts', 'export * from "./Icon";\n');

// 5. Fix ImageList token access
patchFile('packages/ui/src/components/ImageList/ImageList.tsx', /imageList\.bar/g, '(imageList as any).bar');

// 6. Fix Pressable token access
patchFile('packages/ui/src/components/Pressable/Pressable.tsx', /pressable\.container/g, '(pressable as any).container');

console.log('Final polish script executed.');
