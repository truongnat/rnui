import * as p from '@clack/prompts';
import { add } from './commands/add.js';
import { init } from './commands/init.js';
import { list } from './commands/list.js';
import { VARIANTS, type Variant } from './registry.js';

const HELP = `rnui — shadcn-style component registry for React Native

Usage:
  rnui init [--variant nativewind|uniwind] [--registry <url>] [--yes]
  rnui add <component> [component...] [--variant <v>] [--registry <url>]
  rnui list [--registry <url>]
  rnui help

Environment:
  RNUI_REGISTRY_BASE_URL   registry base, e.g. http://localhost:4999/r
`;

interface ParsedArgs {
  positional: string[];
  flags: Record<string, string | boolean>;
}

function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-y') {
      flags.yes = true;
    } else if (arg === '-o') {
      flags.overwrite = true;
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

async function main(): Promise<number> {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [command, ...rest] = positional;

  const common = {
    registry: typeof flags.registry === 'string' ? flags.registry : undefined,
    yes: flags.yes === true,
  };
  const variant =
    typeof flags.variant === 'string' ? (flags.variant as Variant) : undefined;
  if (variant && !VARIANTS.includes(variant)) {
    p.log.error(
      `Unknown --variant "${flags.variant}". Expected: ${VARIANTS.join(' | ')}`
    );
    return 1;
  }

  switch (command) {
    case 'init':
      return init({ ...common, variant });
    case 'add':
      return add(rest, { ...common, variant });
    case 'list':
      return list(common);
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      console.log(HELP);
      return 0;
    default:
      p.log.error(`Unknown command "${command}".`);
      console.log(HELP);
      return 1;
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    p.log.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
