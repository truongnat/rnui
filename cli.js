#!/usr/bin/env node

// src/cli.ts
import * as p5 from "@clack/prompts";

// src/commands/add.ts
import { spawnSync } from "child_process";
import * as p from "@clack/prompts";

// src/detect.ts
import { existsSync, readFileSync } from "fs";
import { join } from "path";
function deps(pkg) {
  return {
    ...pkg.dependencies,
    ...pkg.devDependencies
  };
}
function detectPackageManager(cwd) {
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb")))
    return "bun";
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}
function detectProject(cwd = process.cwd()) {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) {
    throw new Error(
      "No package.json found. Run rnui inside a React Native / Expo project root."
    );
  }
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const allDeps = deps(pkg);
  const isExpo = "expo" in allDeps;
  const isRN = isExpo || "react-native" in allDeps;
  const variant = "uniwind" in allDeps ? "uniwind" : "nativewind" in allDeps ? "nativewind" : void 0;
  return {
    cwd,
    pkg,
    isExpo,
    isRN,
    packageManager: detectPackageManager(cwd),
    variant,
    hasExpoRouter: "expo-router" in allDeps
  };
}

// src/registry.ts
var VARIANTS = ["nativewind", "uniwind"];
var DEFAULT_REGISTRY_BASE = "https://rnui.vercel.app/r";
function getRegistryBase(opts = {}) {
  const base = opts.registry ?? process.env.RNUI_REGISTRY_BASE_URL ?? DEFAULT_REGISTRY_BASE;
  return base.replace(/\/+$/, "");
}
function itemUrl(base, variant, name) {
  const file = name.endsWith(".json") ? name : `${name}.json`;
  return `${base}/${variant}/${file}`;
}

// src/commands/add.ts
async function add(items, opts = {}) {
  if (items.length === 0) {
    p.log.error("Usage: rnui add <component> [component...]");
    return 1;
  }
  const info = detectProject();
  const variant = opts.variant ?? info.variant;
  if (!variant) {
    p.log.error(
      "Could not detect styling engine \u2014 neither `nativewind` nor `uniwind` is installed. Run `rnui init` first or pass --variant."
    );
    return 1;
  }
  const base = getRegistryBase(opts);
  const themes = items.filter((n) => n.startsWith("theme-"));
  const components = items.filter((n) => !n.startsWith("theme-"));
  const shadcnFlags = [];
  if (opts.yes) shadcnFlags.push("--yes", "--overwrite");
  if (components.length > 0) {
    p.log.info(`Adding ${components.join(", ")} (${variant}) via shadcn`);
    const urls = components.map((name) => itemUrl(base, variant, name));
    const result = spawnSync(
      "npx",
      ["--yes", "shadcn@latest", "add", ...shadcnFlags, ...urls],
      { stdio: "inherit", cwd: info.cwd }
    );
    if (result.status !== 0) return result.status ?? 1;
  }
  for (const name of themes) {
    p.log.info(`Applying theme ${name} (${variant})`);
    const result = spawnSync(
      "npx",
      [
        "--yes",
        "shadcn@latest",
        "add",
        ...shadcnFlags,
        itemUrl(base, variant, name)
      ],
      { stdio: "inherit", cwd: info.cwd }
    );
    if (result.status !== 0) return result.status ?? 1;
  }
  return 0;
}

// src/commands/init.ts
import { existsSync as existsSync3, readFileSync as readFileSync3 } from "fs";
import { join as join3 } from "path";
import { spawnSync as spawnSync2 } from "child_process";
import * as p3 from "@clack/prompts";

// src/files.ts
import { existsSync as existsSync2, readFileSync as readFileSync2, writeFileSync, copyFileSync } from "fs";
import { dirname, join as join2, relative } from "path";
import * as p2 from "@clack/prompts";
var COMPONENTS_JSON = {
  $schema: "https://ui.shadcn.com/schema.json",
  style: "default",
  rsc: false,
  tsx: true,
  tailwind: {
    config: "tailwind.config.ts",
    css: "global.css",
    baseColor: "neutral",
    cssVariables: true,
    prefix: ""
  },
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    lib: "@/lib",
    hooks: "@/hooks"
  },
  iconLibrary: "lucide"
};
var BABEL_CONFIG_NATIVEWIND = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
`;
function metroConfig(variant) {
  if (variant === "uniwind") {
    return `const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
});
`;
  }
  return `const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
`;
}
async function writeWithBackup(filePath, content, opts = {}) {
  const label = opts.label ?? filePath;
  if (!existsSync2(filePath)) {
    writeFileSync(filePath, content);
    return { path: filePath, action: "created" };
  }
  if (readFileSync2(filePath, "utf8") === content) {
    return { path: filePath, action: "skipped" };
  }
  const overwrite = opts.yes ?? await p2.confirm({
    message: `${label} already exists with different content. Overwrite? (backup will be saved to ${label}.bak)`,
    initialValue: false
  });
  if (p2.isCancel(overwrite) || !overwrite) {
    return { path: filePath, action: "skipped" };
  }
  copyFileSync(filePath, `${filePath}.bak`);
  writeFileSync(filePath, content);
  return { path: filePath, action: "backed-up" };
}
function stripJsonComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/.*$/gm, "$1");
}
async function ensureTsconfigAlias(cwd, _opts = {}) {
  const path = join2(cwd, "tsconfig.json");
  if (!existsSync2(path))
    return { action: "manual", note: "tsconfig.json not found" };
  const raw = readFileSync2(path, "utf8");
  let config;
  try {
    config = JSON.parse(stripJsonComments(raw));
  } catch {
    return {
      action: "manual",
      note: 'could not parse tsconfig.json \u2014 add "@/*": ["./*"] to compilerOptions.paths manually'
    };
  }
  const compilerOptions = config.compilerOptions ?? {};
  const paths = compilerOptions.paths ?? {};
  if (paths["@/*"]) return { action: "skipped" };
  paths["@/*"] = ["./*"];
  compilerOptions.paths = paths;
  config.compilerOptions = compilerOptions;
  writeFileSync(path, `${JSON.stringify(config, null, 2)}
`);
  return { action: "updated" };
}
function ensureAppJsonStyle(cwd) {
  const path = join2(cwd, "app.json");
  if (!existsSync2(path))
    return { action: "manual", note: "app.json not found" };
  let config;
  try {
    config = JSON.parse(readFileSync2(path, "utf8"));
  } catch {
    return {
      action: "manual",
      note: 'could not parse app.json \u2014 set "userInterfaceStyle": "automatic" manually for dark mode'
    };
  }
  const expo = config.expo ?? {};
  if (expo.userInterfaceStyle === "automatic") return { action: "skipped" };
  expo.userInterfaceStyle = "automatic";
  config.expo = expo;
  writeFileSync(path, `${JSON.stringify(config, null, 2)}
`);
  return { action: "updated" };
}
var ENTRY_CANDIDATES = [
  "app/_layout.tsx",
  "src/app/_layout.tsx",
  "App.tsx",
  "src/App.tsx",
  "index.ts"
];
function findEntry(cwd, hasExpoRouter) {
  const candidates = hasExpoRouter ? ENTRY_CANDIDATES : [...ENTRY_CANDIDATES.slice(2), ...ENTRY_CANDIDATES.slice(0, 2)];
  return candidates.find((rel) => existsSync2(join2(cwd, rel)));
}
function ensureGlobalCssImport(cwd, hasExpoRouter) {
  const entry = findEntry(cwd, hasExpoRouter);
  if (!entry) {
    return {
      action: "manual",
      note: "entry file not found \u2014 add `import './global.css';` to your app entry"
    };
  }
  const abs = join2(cwd, entry);
  const src = readFileSync2(abs, "utf8");
  if (src.includes("global.css")) return { action: "skipped", entry };
  const rel = relative(dirname(abs), join2(cwd, "global.css")).replace(
    /\\/g,
    "/"
  );
  const specifier = rel.startsWith(".") ? rel : `./${rel}`;
  writeFileSync(abs, `import '${specifier}';
${src}`);
  return { action: "added", entry };
}

// src/commands/init.ts
var ICON_DEPS = ["lucide-react-native", "react-native-svg"];
var ENGINE_DEPS = {
  nativewind: [
    "nativewind",
    "tailwindcss@^3.4",
    "react-native-reanimated",
    "react-native-worklets",
    ...ICON_DEPS
  ],
  uniwind: ["uniwind", "tailwindcss", ...ICON_DEPS]
};
function installDeps(info, deps2) {
  const cmd = info.isExpo ? { bin: "npx", args: ["expo", "install", ...deps2] } : info.packageManager === "bun" ? { bin: "bun", args: ["add", ...deps2] } : info.packageManager === "pnpm" ? { bin: "pnpm", args: ["add", ...deps2] } : info.packageManager === "yarn" ? { bin: "yarn", args: ["add", ...deps2] } : { bin: "npm", args: ["install", ...deps2] };
  const res = spawnSync2(cmd.bin, cmd.args, { stdio: "inherit", cwd: info.cwd });
  return res.status === 0;
}
async function init(opts = {}) {
  p3.intro("rnui init \u2014 shadcn-style components for React Native");
  const info = detectProject();
  if (!info.isRN) {
    p3.log.error(
      "No `expo` or `react-native` dependency found \u2014 run inside a React Native project."
    );
    return 1;
  }
  if (!info.isExpo) {
    p3.log.warn(
      "Bare React Native detected \u2014 init is tuned for Expo; verify babel/metro output manually."
    );
  }
  const variant = opts.variant ?? info.variant ?? await (async () => {
    const picked = await p3.select({
      message: "Styling engine?",
      options: VARIANTS.map((v) => ({
        value: v,
        label: v,
        hint: v === "uniwind" ? "Tailwind v4, CSS-first, metro only" : "Tailwind v3, babel preset"
      }))
    });
    if (p3.isCancel(picked)) {
      p3.cancel("Cancelled");
      process.exit(0);
    }
    return picked;
  })();
  const spinner2 = p3.spinner();
  spinner2.start(`Installing ${ENGINE_DEPS[variant].join(", ")}`);
  if (!installDeps(info, ENGINE_DEPS[variant])) {
    spinner2.stop("Dependency install failed");
    p3.log.error("Install the packages manually, then re-run `rnui init`.");
    return 1;
  }
  spinner2.stop("Dependencies installed");
  const results = [];
  const write = async (file, content) => {
    const r = await writeWithBackup(join3(info.cwd, file), content, {
      yes: opts.yes,
      label: file
    });
    results.push(`${file} \u2014 ${r.action}`);
  };
  if (variant === "nativewind")
    await write("babel.config.js", BABEL_CONFIG_NATIVEWIND);
  await write("metro.config.js", metroConfig(variant));
  await write(
    "components.json",
    `${JSON.stringify(COMPONENTS_JSON, null, 2)}
`
  );
  const tsconfig = await ensureTsconfigAlias(info.cwd, { yes: opts.yes });
  results.push(
    `tsconfig.json \u2014 ${tsconfig.action}${tsconfig.note ? ` (${tsconfig.note})` : ""}`
  );
  const appJson = ensureAppJsonStyle(info.cwd);
  results.push(
    `app.json \u2014 ${appJson.action}${appJson.note ? ` (${appJson.note})` : ""}`
  );
  p3.log.step(`Config: ${results.join("; ")}`);
  const existingGlobalCss = join3(info.cwd, "global.css");
  if (existsSync3(existingGlobalCss) && readFileSync3(existingGlobalCss, "utf8").trim().length > 0) {
    p3.log.warn(
      "global.css already has content \u2014 skipping theme install. Merge theme vars manually (see registry/templates/setup.md)."
    );
  } else {
    const themeUrl = itemUrl(getRegistryBase(opts), variant, "theme");
    const theme = spawnSync2(
      "npx",
      ["--yes", "shadcn@latest", "add", "--yes", themeUrl],
      {
        stdio: "inherit",
        cwd: info.cwd
      }
    );
    if (theme.status !== 0) {
      p3.log.warn(
        "Theme install via registry failed \u2014 fetch files manually (see registry/templates/setup.md)."
      );
    }
  }
  const css = ensureGlobalCssImport(info.cwd, info.hasExpoRouter);
  if (css.action === "added")
    p3.log.step(`Added global.css import to ${css.entry}`);
  else if (css.action === "manual")
    p3.log.warn(css.note ?? "Add the global.css import manually.");
  p3.outro(
    `Done. Add components: npx @rnui/cli add button  (variant: ${variant})`
  );
  return 0;
}

// src/commands/list.ts
import * as p4 from "@clack/prompts";
async function list(opts = {}) {
  const base = getRegistryBase(opts);
  const res = await fetch(`${base}/index.json`);
  if (!res.ok) {
    p4.log.error(
      `Failed to fetch registry index: ${res.status} ${res.statusText} (${base})`
    );
    return 1;
  }
  const index = await res.json();
  p4.log.info(
    `${index.name} \u2014 ${index.items.length} items \xD7 variants: ${index.variants.join(", ")}`
  );
  for (const item of index.items) {
    p4.log.step(item);
  }
  p4.log.info(
    `Add with: npx shadcn add ${base}/<${VARIANTS.join("|")}>/<item>.json`
  );
  return 0;
}

// src/cli.ts
var HELP = `rnui \u2014 shadcn-style component registry for React Native

Usage:
  rnui init [--variant nativewind|uniwind] [--registry <url>] [--yes]
  rnui add <component> [component...] [--variant <v>] [--registry <url>]
  rnui list [--registry <url>]
  rnui help

Environment:
  RNUI_REGISTRY_BASE_URL   registry base, e.g. http://localhost:4999/r
`;
function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "-y") {
      flags.yes = true;
    } else if (arg === "-o") {
      flags.overwrite = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("-")) {
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
async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [command, ...rest] = positional;
  const common = {
    registry: typeof flags.registry === "string" ? flags.registry : void 0,
    yes: flags.yes === true
  };
  const variant = typeof flags.variant === "string" ? flags.variant : void 0;
  if (variant && !VARIANTS.includes(variant)) {
    p5.log.error(
      `Unknown --variant "${flags.variant}". Expected: ${VARIANTS.join(" | ")}`
    );
    return 1;
  }
  switch (command) {
    case "init":
      return init({ ...common, variant });
    case "add":
      return add(rest, { ...common, variant });
    case "list":
      return list(common);
    case "help":
    case "--help":
    case "-h":
    case void 0:
      console.log(HELP);
      return 0;
    default:
      p5.log.error(`Unknown command "${command}".`);
      console.log(HELP);
      return 1;
  }
}
main().then((code) => process.exit(code)).catch((err) => {
  p5.log.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
