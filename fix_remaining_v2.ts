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

// 1. Fix Icon usage: <Icon ...>name</Icon> -> <Icon ... name="name" />
// We'll use a more robust regex that handles potential braces and quotes
function fixIcons(dir: string) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      fixIcons(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = readFileSync(fullPath, 'utf8');
      
      // Pattern: <Icon ...>{'name'}</Icon> or <Icon ...>"name"</Icon> or <Icon ...>name</Icon>
      const newContent = content.replace(/<Icon([^>]*?)>\{?(['"]?)([^'"}<]+)\2\}?<\/Icon>/g, (match, props, quote, name) => {
        if (name.includes('<') || name.includes('children')) return match; // skip nested
        return `<Icon${props} name="${name.trim()}" />`;
      });

      if (content !== newContent) {
        writeFileSync(fullPath, newContent);
        console.log(`Fixed Icons in: ${fullPath}`);
      }
    }
  }
}
fixIcons(COMP_DIR);

// 2. Fix FAB
patchFile('packages/ui/src/components/Fab/Fab.tsx', /fab\.variant\[color\]\?\.backgroundColor/g, '(fab.variant as any)[color]?.backgroundColor');

// 3. Fix SpeedDial
patchFile('packages/ui/src/components/SpeedDial/SpeedDial.tsx', /speedDial\.action\.iconContainer/g, '(speedDial.action as any).iconContainer');
patchFile('packages/ui/src/components/SpeedDial/SpeedDial.tsx', /speedDial\.action\.tooltip/g, '(speedDial.action as any).tooltip');

// 4. Fix Rating
patchFile('packages/ui/src/components/Rating/Rating.tsx', /rating\.icon\.active\.color/g, '(rating as any).star.filled.color');
patchFile('packages/ui/src/components/Rating/Rating.tsx', /rating\.icon\.inactive\.color/g, '(rating as any).star.empty.color');

// 5. Fix ImageList
patchFile('packages/ui/src/components/ImageList/ImageList.tsx', /imageList\.bar\.title/g, '(imageList as any).bar.title');
patchFile('packages/ui/src/components/ImageList/ImageList.tsx', /imageList\.bar\.subtitle/g, '(imageList as any).bar.subtitle');

// 6. Fix PasswordInput Icon
patchFile('packages/ui/src/components/Input/PasswordInput.tsx', /<Icon([^>]*?)>\s*\{show \? "eyeOff" : "eye"\}\s*<\/Icon>/g, '<Icon$1 name={show ? "eyeOff" : "eye"} />');

console.log('Final polish script v2 executed.');
