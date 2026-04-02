#!/usr/bin/env node
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';
import degit from 'degit';
import inquirer from 'inquirer';
import ora from 'ora';
import minimist from 'minimist';
import { installSkill } from './commands/installSkill.js';

const DEFAULT_REPO = 'truongnat/skills';

function printHelp() {
  console.log(`own-skills

Usage:
  npx github:${DEFAULT_REPO} [install|uninstall] [options]

Install options:
  --repo <user/repo|https://github.com/...>
  --project-dir <path>
  --full
  --skills-only
  --cursor-only
  --yes

Uninstall options:
  --project-dir <path>
  --force
  --nuclear`);
}

function normalizeRepo(input: string): string {
  const s = input.trim();
  if (!s) return DEFAULT_REPO;
  if (/^[\w.-]+\/[\w.-]+$/.test(s) && !s.includes('://')) return s;
  const m = s.match(/github\.com[:/]([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/i);
  if (!m) throw new Error(`Could not parse repo: ${input}`);
  return `${m[1]}/${m[2]}`;
}

function httpsCloneUrl(repo: string) {
  return `https://github.com/${repo}.git`;
}

async function fetchRepo(repo: string): Promise<string> {
  const temp = mkdtempSync(join(tmpdir(), 'own-skills-'));
  const spin = ora('Fetching bundle...').start();
  try {
    const emitter = degit(repo, { cache: false, force: true });
    await emitter.clone(temp);
    spin.succeed('Bundle ready');
    return temp;
  } catch {
    spin.warn('degit failed, fallback to git clone');
    execFileSync('git', ['clone', '--depth', '1', httpsCloneUrl(repo), temp], { stdio: 'pipe' });
    spin.succeed('Repository cloned');
    return temp;
  }
}

function shouldIgnore(rel: string): boolean {
  const p = rel.replace(/\\/g, '/');
  return (
    p.startsWith('.git/') ||
    p.startsWith('.venv/') ||
    p.startsWith('knowledge-base/embeddings/') ||
    p.includes('/__pycache__/') ||
    p.endsWith('.pyc') ||
    p.endsWith('.DS_Store') ||
    p.startsWith('node_modules/')
  );
}

function syncVendor(src: string, dest: string) {
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, {
    recursive: true,
    filter: (_s, d) => {
      const rel = d.replace(dest, '').replace(/^[\\/]/, '');
      return !shouldIgnore(rel);
    },
  });
  writeFileSync(join(dest, '.own-skills-bundle'), '');
}

function linkRules(vendor: string, project: string) {
  const rulesSrc = join(vendor, '.cursor', 'rules');
  const rulesDst = join(project, '.cursor', 'rules');
  if (!existsSync(rulesSrc)) return;
  cpSync(rulesSrc, rulesDst, { recursive: true, force: true });
  for (const f of readdirSync(rulesSrc)) {
    if (!f.endsWith('.mdc')) continue;
    const s = join(rulesSrc, f);
    const d = join(rulesDst, f);
    try {
      rmSync(d, { force: true });
      symlinkSync(s, d, 'file');
    } catch {
      // Keep copied file
    }
  }
}

type InstalledArtifactManifest = {
  version: 1;
  createdPaths: string[];
};

function loadInstallManifest(projectDir: string): InstalledArtifactManifest {
  const path = join(projectDir, '.cursor', '.own-skills-install.json');
  if (!existsSync(path)) return { version: 1, createdPaths: [] };
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as InstalledArtifactManifest;
    return Array.isArray(parsed.createdPaths) ? parsed : { version: 1, createdPaths: [] };
  } catch {
    return { version: 1, createdPaths: [] };
  }
}

function saveInstallManifest(projectDir: string, manifest: InstalledArtifactManifest) {
  writeFileSync(
    join(projectDir, '.cursor', '.own-skills-install.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
}

function registerCreatedPath(projectDir: string, manifest: InstalledArtifactManifest, absPath: string) {
  const rel = relative(projectDir, absPath).replace(/\\/g, '/');
  if (!manifest.createdPaths.includes(rel)) manifest.createdPaths.push(rel);
}

function installCommandFiles(vendor: string, project: string, manifest: InstalledArtifactManifest) {
  const sources = [
    { src: join(vendor, '.cursor', 'commands'), dst: join(project, '.cursor', 'commands') },
    { src: join(vendor, '.claude', 'commands'), dst: join(project, '.claude', 'commands') },
  ];
  for (const pair of sources) {
    if (!existsSync(pair.src)) continue;
    cpSync(pair.src, pair.dst, { recursive: true, force: false });
    for (const f of readdirSync(pair.src)) {
      if (!f.endsWith('.md')) continue;
      const src = join(pair.src, f);
      const dst = join(pair.dst, f);
      if (existsSync(dst)) {
        const sameContent = readFileSync(dst, 'utf8') === readFileSync(src, 'utf8');
        if (sameContent) registerCreatedPath(project, manifest, dst);
        continue;
      }
      try {
        symlinkSync(src, dst, 'file');
      } catch {
        cpSync(src, dst, { force: true });
      }
      registerCreatedPath(project, manifest, dst);
    }
  }
}

function installAllSkills(repoRoot: string, projectDir: string, mode: 'symlink' | 'copy', allIdes: boolean) {
  const skillsRoot = join(repoRoot, 'skills');
  const dirs = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(skillsRoot, d.name, 'SKILL.md')))
    .map((d) => join(skillsRoot, d.name));
  const spin = ora(`Installing ${dirs.length} skills...`).start();
  let ok = 0;
  let fail = 0;
  for (const dir of dirs) {
    try {
      installSkill({
        skillDir: dir,
        projectDir,
        mode,
        force: true,
        allIdes,
      });
      ok++;
    } catch {
      if (mode === 'symlink') {
        try {
          installSkill({
            skillDir: dir,
            projectDir,
            mode: 'copy',
            force: true,
            allIdes,
          });
          ok++;
          continue;
        } catch {
          fail++;
        }
      } else {
        fail++;
      }
    }
  }
  if (fail) spin.warn(chalk.yellow(`Installed ${ok}/${dirs.length} skills (${fail} failed)`));
  else spin.succeed(chalk.green(`Installed ${ok} skills`));
}

function cleanupGitExclude(projectDir: string, skillNames: string[]) {
  const exclude = join(projectDir, '.git', 'info', 'exclude');
  if (!existsSync(exclude)) return;
  const lines = readFileSync(exclude, 'utf8').split(/\r?\n/);
  const deny = new Set<string>();
  for (const n of skillNames) {
    deny.add(`.cursor/skills/${n}/`);
    deny.add(`.claude/skills/${n}/`);
    deny.add(`.agent/skills/${n}/`);
  }
  writeFileSync(exclude, `${lines.filter((l) => !deny.has(l.trim())).join('\n')}\n`, 'utf8');
}

function uninstall(projectDir: string, nuclear: boolean) {
  const cursorSkills = join(projectDir, '.cursor', 'skills');
  const skills = existsSync(cursorSkills)
    ? readdirSync(cursorSkills).filter((n) => n !== '.install-manifest')
    : [];
  const spin = ora('Uninstalling...').start();
  for (const s of skills) {
    rmSync(join(projectDir, '.cursor', 'skills', s), { recursive: true, force: true });
    rmSync(join(projectDir, '.claude', 'skills', s), { recursive: true, force: true });
    rmSync(join(projectDir, '.agent', 'skills', s), { recursive: true, force: true });
  }
  cleanupGitExclude(projectDir, skills);
  rmSync(join(projectDir, '.cursor', 'skills', '.install-manifest'), { recursive: true, force: true });
  if (nuclear) {
    rmSync(join(projectDir, '.cursor'), { recursive: true, force: true });
  } else {
    const vendor = join(projectDir, 'vendor', 'own-skills');
    const vendorRules = join(vendor, '.cursor', 'rules');
    const projRules = join(projectDir, '.cursor', 'rules');
    if (existsSync(vendorRules) && existsSync(projRules)) {
      const removable = new Set(readdirSync(vendorRules).filter((f) => f.endsWith('.mdc')));
      for (const f of readdirSync(projRules)) {
        if (!removable.has(f)) continue;
        const p = join(projRules, f);
        try {
          unlinkSync(p);
        } catch {
          rmSync(p, { force: true });
        }
      }
    }
    rmSync(vendor, { recursive: true, force: true });
    const manifest = loadInstallManifest(projectDir);
    for (const relPath of manifest.createdPaths) {
      const abs = join(projectDir, relPath);
      try {
        unlinkSync(abs);
      } catch {
        rmSync(abs, { recursive: true, force: true });
      }
    }
    rmSync(join(projectDir, '.cursor', '.own-skills-install.json'), { force: true });
  }
  spin.succeed('Uninstall completed');
}

async function main() {
  const argv = minimist(process.argv.slice(2), {
    boolean: ['full', 'skills-only', 'cursor-only', 'yes', 'force', 'nuclear', 'help'],
    string: ['repo', 'project-dir'],
    alias: { h: 'help', y: 'yes' },
  });
  if (argv.help) {
    printHelp();
    return;
  }
  const cmd = (argv._[0] as string) === 'uninstall' ? 'uninstall' : 'install';
  const interactive = !argv.yes && process.stdin.isTTY;

  if (cmd === 'install') {
    let repo = normalizeRepo(String(argv.repo || DEFAULT_REPO));
    let projectDir = resolve(String(argv['project-dir'] || process.cwd()));
    let mode: 'full' | 'skills' = argv['skills-only'] ? 'skills' : 'full';
    let allIdes = !argv['cursor-only'];
    if (interactive) {
      const a = await inquirer.prompt([
        { type: 'input', name: 'repo', message: 'GitHub repo (user/repo or HTTPS)', default: repo },
        { type: 'input', name: 'projectDir', message: 'Target project directory', default: projectDir },
        {
          type: 'list',
          name: 'mode',
          message: 'Install mode',
          choices: [
            { name: 'Full bundle (vendor/own-skills + rules + all IDE skills)', value: 'full' },
            { name: 'Skills only (copy into project; no vendor bundle)', value: 'skills' },
          ],
          default: mode,
        },
        {
          type: 'list',
          name: 'allIdes',
          message: 'IDE targets',
          choices: [
            { name: 'All IDEs (.cursor + .claude + .agent)', value: true },
            { name: 'Cursor only (.cursor)', value: false },
          ],
          default: allIdes,
        },
      ]);
      repo = normalizeRepo(String(a.repo));
      projectDir = resolve(String(a.projectDir));
      mode = a.mode;
      allIdes = a.allIdes;
    }
    const temp = await fetchRepo(repo);
    try {
      if (mode === 'skills') {
        installAllSkills(temp, projectDir, 'copy', allIdes);
      } else {
        const vendor = join(projectDir, 'vendor', 'own-skills');
        const s = ora('Syncing bundle...').start();
        syncVendor(temp, vendor);
        linkRules(vendor, projectDir);
      const manifest = loadInstallManifest(projectDir);
      installCommandFiles(vendor, projectDir, manifest);
      saveInstallManifest(projectDir, manifest);
        s.succeed('Bundle synced');
        installAllSkills(vendor, projectDir, process.platform === 'win32' ? 'copy' : 'symlink', allIdes);
        console.log(chalk.cyan('Verify: node dist/tools.js verify-bundle-install --project-dir .'));
      }
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  } else {
    let projectDir = resolve(String(argv['project-dir'] || process.cwd()));
    let force = Boolean(argv.force);
    let nuclear = Boolean(argv.nuclear);
    if (interactive) {
      const a = await inquirer.prompt([
        { type: 'input', name: 'projectDir', message: 'Project directory to uninstall from', default: projectDir },
        {
          type: 'list',
          name: 'force',
          message: 'Confirmation behavior',
          choices: [
            { name: 'Ask confirmation (safe default)', value: false },
            { name: 'Force remove without confirmation', value: true },
          ],
          default: force,
        },
        {
          type: 'list',
          name: 'nuclear',
          message: chalk.red('NUCLEAR: delete entire .cursor directory?'),
          choices: [
            { name: 'No (keep .cursor except own-skills artifacts)', value: false },
            { name: 'Yes (remove entire .cursor)', value: true },
          ],
          default: nuclear,
        },
      ]);
      projectDir = resolve(String(a.projectDir));
      force = Boolean(a.force);
      nuclear = Boolean(a.nuclear);
    }
    if (!force && process.stdin.isTTY) {
      const ans = await inquirer.prompt([
        { type: 'confirm', name: 'ok', message: `Uninstall from ${projectDir}?`, default: false },
      ]);
      if (!ans.ok) return;
    }
    uninstall(projectDir, nuclear);
  }
}

main().catch((e) => {
  console.error(chalk.red((e as Error).message || String(e)));
  process.exit(1);
});
