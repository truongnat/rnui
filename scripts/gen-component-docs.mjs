#!/usr/bin/env node
/**
 * Generate shadcn-style docs pages for registry components.
 *
 * Reads registry/registry.json + registry/themes/*.json and emits one mdx page
 * per item into docs/src/content/docs/registry/. Pages are generated — edit
 * SNIPPETS/meta here, not the output files.
 *
 * Run: node scripts/gen-component-docs.mjs
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_DIR = join(ROOT, 'registry');
const OUT_DIR = join(ROOT, 'docs', 'src', 'content', 'docs', 'registry');

const catalog = JSON.parse(
  readFileSync(join(REGISTRY_DIR, 'registry.json'), 'utf8')
);
const themesDir = join(REGISTRY_DIR, 'themes');
const brands = readdirSync(themesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(themesDir, f), 'utf8')));

// Usage snippets per item — keep short, idiomatic, compilable against the
// installed components.
const SNIPPETS = {
  text: `<Text variant="h1">Title</Text>
<Text variant="p">Body text</Text>
<Text variant="muted">Muted text</Text>`,
  button: `<Button onPress={() => {}}>Primary</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>`,
  card: `<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* content */}</CardContent>
  <CardFooter>{/* footer */}</CardFooter>
</Card>`,
  input: `<Input placeholder="Email" keyboardType="email-address" />`,
  label: `<Label>Email</Label>`,
  textarea: `<Textarea placeholder="Tell us more" />`,
  checkbox: `const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onCheckedChange={setChecked} />`,
  switch: `const [on, setOn] = useState(false);
<Switch checked={on} onCheckedChange={setOn} />`,
  'radio-group': `<RadioGroup value={value} onValueChange={setValue}>
  <View className="flex-row items-center gap-2">
    <RadioGroupItem value="a" />
    <Label>Option A</Label>
  </View>
</RadioGroup>`,
  select: `<Select
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]}
  value={value}
  onValueChange={setValue}
  placeholder="Pick a fruit"
/>`,
  separator: `<Separator />`,
  skeleton: `<Skeleton className="h-5 w-32" />`,
  badge: `<Badge>Default</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="outline">Outline</Badge>`,
  avatar: `<Avatar>
  <AvatarImage source={{ uri: 'https://i.pravatar.cc/100' }} />
  <AvatarFallback>TQ</AvatarFallback>
</Avatar>`,
  alert: `<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Something happened.</AlertDescription>
</Alert>`,
  dialog: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTitle>Confirm?</DialogTitle>
  <DialogDescription>Are you sure?</DialogDescription>
  <DialogFooter>
    <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
    <Button onPress={() => setOpen(false)}>OK</Button>
  </DialogFooter>
</Dialog>`,
  progress: `<Progress value={60} />`,
  accordion: `<Accordion>
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
</Accordion>`,
  tabs: `<Tabs value={tab} onValueChange={setTab} defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one">First tab</TabsContent>
  <TabsContent value="two">Second tab</TabsContent>
</Tabs>`,
  toggle: `const [pressed, setPressed] = useState(false);
<Toggle pressed={pressed} onPressedChange={setPressed}>
  <Text>Toggle</Text>
</Toggle>`,
  'toggle-group': `<ToggleGroup type="single" value={v} onValueChange={setV}>
  <ToggleGroupItem value="left"><Text>L</Text></ToggleGroupItem>
  <ToggleGroupItem value="right"><Text>R</Text></ToggleGroupItem>
</ToggleGroup>`,
  collapsible: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger><Text>Toggle</Text></CollapsibleTrigger>
  <CollapsibleContent><Text>Hidden content</Text></CollapsibleContent>
</Collapsible>`,
  sheet: `<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    {/* content */}
    <SheetFooter>
      <Button onPress={() => setOpen(false)}>Done</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  popover: `<Popover>
  <PopoverTrigger><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent>
    <Text>Popover content</Text>
  </PopoverContent>
</Popover>`,
  'dropdown-menu': `<DropdownMenu>
  <DropdownMenuTrigger><Button variant="outline">Menu</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem onPress={() => {}}>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onPress={() => {}}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  toast: `// Wrap your app once:
<ToastProvider>
  <App />
</ToastProvider>

// Then anywhere:
const { toast } = useToast();
toast({ title: 'Saved', description: 'It worked.' });
toast({ title: 'Failed', variant: 'destructive' });`,
  slider: `const [v, setV] = useState(50);
<Slider value={v} onValueChange={setV} min={0} max={100} />`,
  table: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead flex={2}>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana</TableCell>
      <TableCell flex={2}>ana@ex.co</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  breadcrumb: `<Breadcrumb>
  <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem onPress={() => {}}>Library</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbPage>Data</BreadcrumbPage>
</Breadcrumb>`,
  pagination: `const [page, setPage] = useState(1);
<Pagination page={page} totalPages={10} onPageChange={setPage} />`,
  command: `<Command
  open={open}
  onOpenChange={setOpen}
  items={[
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
  ]}
  onSelect={(item) => console.log(item.value)}
/>`,
  'login-screen': `import { LoginScreen } from '@/components/blocks/login-screen';

export default function App() {
  return <LoginScreen />;
}`,
};

const HEADER =
  '{/* GENERATED by scripts/gen-component-docs.mjs — edit the script, not this file */}\n';

function pageFor(item) {
  const snippet = SNIPPETS[item.name];
  return `---
title: ${JSON.stringify(item.title ?? item.name)}
description: ${JSON.stringify(item.description ?? '')}
---
${HEADER}
${item.description ?? ''}

## Install

\`\`\`bash
npx github:truongnat/rnui#cli add ${item.name}
\`\`\`

or directly via the shadcn CLI:

\`\`\`bash
npx shadcn add https://<registry-base>/r/nativewind/${item.name}.json   # or /uniwind/
\`\`\`

${item.dependencies?.length ? `**npm dependencies installed automatically:** ${item.dependencies.map((d) => `\`${d}\``).join(', ')}\n` : ''}
## Usage

\`\`\`tsx
${snippet ?? `// See the source file for the API:\n// components/ui/${item.name}.tsx`}
\`\`\`

## Source

${(item.files ?? []).map((f) => `- \`${f.target}\``).join('\n')}
${item.registryDependencies?.length ? `\nInstalls together with: ${item.registryDependencies.map((d) => `\`${d}\``).join(', ')}` : ''}
`;
}

mkdirSync(OUT_DIR, { recursive: true });

// index page
const uiItems = catalog.items.filter((i) => i.type === 'registry:ui');
const blockItems = catalog.items.filter((i) => i.type === 'registry:block');
writeFileSync(
  join(OUT_DIR, 'index.mdx'),
  `---
title: Registry components
description: shadcn-style copy-paste components for React Native.
---
${HEADER}
These components are installed as **source code you own** via the registry —
the same model as shadcn/ui. They work with both styling engines:
**nativewind** and **uniwind**.

## Quick start

\`\`\`bash
npx github:truongnat/rnui#cli init            # one-time setup (engine deps, metro/babel, theme)
npx github:truongnat/rnui#cli add button      # install a component
npx github:truongnat/rnui#cli list            # show all items
\`\`\`

## Components

${uiItems.map((i) => `- [${i.title ?? i.name}](/registry/${i.name}/) — ${i.description ?? ''}`).join('\n')}

## Blocks

${blockItems.map((i) => `- [${i.title ?? i.name}](/registry/${i.name}/) — ${i.description ?? ''}`).join('\n')}

## Themes

Brand themes swap the semantic CSS variables in \`global.css\`:

\`\`\`bash
npx github:truongnat/rnui#cli add theme-matcha
\`\`\`

${brands.map((b) => `- **${b.title}** (\`theme-${b.name}\`) — ${b.description ?? ''}`).join('\n')}
`
);

for (const item of [...uiItems, ...blockItems]) {
  writeFileSync(join(OUT_DIR, `${item.name}.mdx`), pageFor(item));
  console.log(`✓ registry/${item.name}.mdx`);
}
console.log(`\nDone → ${OUT_DIR}`);
