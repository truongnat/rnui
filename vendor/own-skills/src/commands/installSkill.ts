import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync, cpSync } from 'node:fs';
import { join, resolve } from 'node:path';
import matter from 'gray-matter';

const IDE_TARGETS: Record<string, [string, string]> = {
  cursor: ['.cursor', 'skills'],
  claude: ['.claude', 'skills'],
  antigravity: ['.agent', 'skills'],
};

export type InstallSkillOptions = {
  skillDir: string;
  projectDir: string;
  name?: string;
  mode: 'symlink' | 'copy';
  force: boolean;
  allIdes: boolean;
  ides?: string[];
  noGitIsolation?: boolean;
};

function parseName(skillMdText: string): string {
  const p = matter(skillMdText);
  const name = typeof p.data.name === 'string' ? p.data.name.trim() : '';
  if (!name) throw new Error("SKILL.md must include frontmatter field 'name'");
  return name;
}

function ensureExclude(projectDir: string, relPath: string) {
  const excludePath = join(projectDir, '.git', 'info', 'exclude');
  if (!existsSync(join(projectDir, '.git', 'info'))) return;
  const existing = existsSync(excludePath) ? readFileSync(excludePath, 'utf8') : '';
  const line = `${relPath.replace(/\\/g, '/')}/`;
  if (existing.split(/\r?\n/).includes(line)) return;
  const content = `${existing}${existing.endsWith('\n') || existing.length === 0 ? '' : '\n'}${line}\n`;
  writeFileSync(excludePath, content, 'utf8');
}

export function installSkill(opts: InstallSkillOptions) {
  const skillDir = resolve(opts.skillDir);
  const projectDir = resolve(opts.projectDir);
  const skillMd = join(skillDir, 'SKILL.md');
  if (!existsSync(skillMd)) throw new Error(`Missing SKILL.md: ${skillMd}`);
  const parsedName = parseName(readFileSync(skillMd, 'utf8'));
  const installName = opts.name || parsedName;

  const ides = opts.allIdes ? ['cursor', 'claude', 'antigravity'] : opts.ides || ['cursor'];
  const targets: Record<string, string> = {};

  for (const ide of Array.from(new Set(ides))) {
    const pair = IDE_TARGETS[ide];
    if (!pair) throw new Error(`Unknown IDE key: ${ide}`);
    const target = join(projectDir, pair[0], pair[1], installName);
    mkdirSync(join(projectDir, pair[0], pair[1]), { recursive: true });
    if (existsSync(target)) {
      if (!opts.force) throw new Error(`Target exists: ${target}`);
      rmSync(target, { recursive: true, force: true });
    }
    if (opts.mode === 'symlink') {
      try {
        symlinkSync(skillDir, target, 'junction');
      } catch {
        cpSync(skillDir, target, { recursive: true });
      }
    } else {
      cpSync(skillDir, target, { recursive: true });
    }
    targets[ide] = target;
    if (!opts.noGitIsolation) ensureExclude(projectDir, `${pair[0]}/${pair[1]}/${installName}`);
  }

  const manifestDir = join(projectDir, '.cursor', 'skills', '.install-manifest');
  mkdirSync(manifestDir, { recursive: true });
  const manifest = {
    installed_at: new Date().toISOString(),
    mode: opts.mode,
    skill_name: installName,
    source: skillDir,
    ides,
    targets,
    primary_cursor_target: targets.cursor || null,
  };
  writeFileSync(join(manifestDir, `${installName}.json`), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  return { installName, targets };
}
