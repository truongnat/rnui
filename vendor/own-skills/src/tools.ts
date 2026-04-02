#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { relative, resolve, join } from 'node:path';
import minimist from 'minimist';
import matter from 'gray-matter';
import { globSync } from 'glob';
import { loadKbConfig } from './lib/kbConfig.js';
import { embedText, cosine } from './lib/embeddings.js';
import { installSkill } from './commands/installSkill.js';
import { listSkillDirs, readSkillInfo } from './lib/skills.js';

type ManifestItem = {
  id: string;
  path: string;
  title?: string;
  chunk_index: number;
  text: string;
};

function readText(path: string) {
  return readFileSync(path, 'utf8');
}

function collectMarkdownFiles(base: string): string[] {
  return globSync('**/*.md', { cwd: base, absolute: true, nodir: true }).sort();
}

function chunkText(text: string, size: number, overlap: number): string[] {
  const clean = text.replace(/\r\n/g, '\n').trim();
  if (!clean) return [];
  if (clean.length <= size) return [clean];
  const out: string[] = [];
  let i = 0;
  while (i < clean.length) {
    const end = Math.min(clean.length, i + size);
    out.push(clean.slice(i, end).trim());
    if (end >= clean.length) break;
    i = Math.max(0, end - overlap);
  }
  return out;
}

function cmdListSkills(args: minimist.ParsedArgs, repoRoot: string) {
  const includeTemplate = Boolean(args['include-template']);
  const asJson = Boolean(args.json);
  const dirs = listSkillDirs(repoRoot, includeTemplate);
  const rows = dirs.map((dir) => readSkillInfo(dir));
  if (asJson) {
    console.log(
      JSON.stringify(
        rows.map((r) => ({ folder: r.folder, name: r.name || null, path: r.path, has_skill_md: r.hasSkillMd })),
        null,
        2,
      ),
    );
    return;
  }
  for (const r of rows) {
    console.log(`${r.folder}\t${r.name || '-'}\t${r.path}`);
  }
}

function cmdValidateSkills(args: minimist.ParsedArgs, repoRoot: string) {
  const includeTemplate = Boolean(args['include-template']);
  const dirs = listSkillDirs(repoRoot, includeTemplate);
  const errs: string[] = [];
  for (const dir of dirs) {
    const info = readSkillInfo(dir);
    const folder = info.folder;
    if (!info.name) {
      errs.push(`${folder}: missing frontmatter name`);
      continue;
    }
    if (info.name !== folder) {
      errs.push(`${folder}: frontmatter name '${info.name}' must match folder name`);
    }
  }
  if (errs.length > 0) {
    console.error('Validation failed:');
    errs.forEach((e) => console.error(`- ${e}`));
    process.exit(2);
  }
  console.log(`Validated ${dirs.length} skills: OK`);
}

function extractTriggers(content: string): string[] {
  const m = content.match(/Triggers:\s*([\s\S]*?)(?:\n\n|\n##|\n###|$)/i);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.replace(/["`]/g, '').trim().toLowerCase())
    .filter(Boolean);
}

function extractWhenToUse(content: string): string[] {
  const m = content.match(/##\s*When to use([\s\S]*?)(?:\n##|$)/i);
  if (!m) return [];
  return m[1]
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*]\s*/, '').trim())
    .filter(Boolean);
}

function extractReferences(skillDir: string): string[] {
  const refDir = join(skillDir, 'references');
  if (!existsSync(refDir)) return [];
  return readdirSync(refDir).filter((f) => f.endsWith('.md')).sort();
}

function cmdBuildSkillIndex(args: minimist.ParsedArgs, repoRoot: string) {
  const cfg = loadKbConfig(repoRoot);
  const output = resolve(repoRoot, String(args.output || cfg.skillIndexPath));
  const withEmbeddings = Boolean(args['with-embeddings']);
  const dry = Boolean(args['dry-run']);
  const dirs = listSkillDirs(repoRoot, false);
  const rows = dirs.map((dir) => {
    const i = readSkillInfo(dir);
    const content = i.content || '';
    return {
      name: i.name || i.folder,
      folder: i.folder,
      description: i.description || '',
      triggers: extractTriggers(content),
      when_to_use: extractWhenToUse(content),
      references: extractReferences(dir),
    };
  });
  if (dry) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  mkdirSync(join(output, '..'), { recursive: true });
  writeFileSync(output, `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${rows.length} skills to ${relative(repoRoot, output)}`);
  if (withEmbeddings) {
    const vectors = rows.map((r) => embedText(`${r.name}\n${r.description}\n${r.triggers.join(', ')}`));
    const embPath = resolve(repoRoot, cfg.skillEmbeddingsPath);
    mkdirSync(join(embPath, '..'), { recursive: true });
    writeFileSync(embPath, `${JSON.stringify(vectors)}\n`, 'utf8');
    console.log(`Wrote embeddings: ${relative(repoRoot, embPath)}`);
  }
}

function cmdAnalyzeSkills(args: minimist.ParsedArgs, repoRoot: string) {
  const withRefs = Boolean(args['with-references']);
  const json = Boolean(args.json);
  const md = Boolean(args.markdown || args['self-review']);
  const onlyActionable = Boolean(args['only-actionable']);
  const dirs = listSkillDirs(repoRoot, Boolean(args['include-template']));
  const rows = dirs.map((dir) => {
    const i = readSkillInfo(dir);
    const content = i.content || '';
    const refCount = extractReferences(dir).length;
    const hasWorkflow = /workflow|steps|checklist/i.test(content);
    const hasScriptHints = /script|automation|ci|validate|build/i.test(content);
    const score = (hasWorkflow ? 2 : 0) + (hasScriptHints ? 2 : 0) + (refCount > 0 ? 1 : 0);
    const tier = score >= 4 ? 'strong' : score >= 2 ? 'consider' : 'low';
    return {
      skill: i.folder,
      score,
      tier,
      references: refCount,
      recommendation:
        tier === 'strong' ? 'Keep current automation links.' : tier === 'consider' ? 'Add or refine script helpers.' : 'Add references and actionable automation guidance.',
    };
  });
  const outRows = onlyActionable ? rows.filter((r) => r.tier !== 'strong') : rows;
  if (json) {
    console.log(JSON.stringify(outRows, null, 2));
    return;
  }
  if (md) {
    console.log('# Skills analysis');
    console.log('');
    console.log('| Skill | Tier | Score | References | Recommendation |');
    console.log('|---|---:|---:|---:|---|');
    outRows.forEach((r) => console.log(`| ${r.skill} | ${r.tier} | ${r.score} | ${r.references} | ${r.recommendation} |`));
    return;
  }
  outRows.forEach((r) => console.log(`${r.skill}\t${r.tier}\t${r.score}\t${r.recommendation}`));
  if (withRefs) {
    console.log('\n(reference counts included above)');
  }
}

function cmdInstallSkill(args: minimist.ParsedArgs, _repoRoot: string) {
  const skillPath = args._[1] ? String(args._[1]) : String(args['skill-dir'] || '.');
  const ides = String(args.ides || 'cursor')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  const res = installSkill({
    skillDir: skillPath,
    projectDir: String(args['project-dir'] || '.'),
    name: args.name ? String(args.name) : undefined,
    mode: (args.mode === 'copy' ? 'copy' : 'symlink') as 'symlink' | 'copy',
    force: Boolean(args.force),
    allIdes: Boolean(args['all-ides']),
    ides,
    noGitIsolation: Boolean(args['no-git-isolation']),
  });
  console.log(`Installed skill '${res.installName}'`);
}

function cmdVerifyBundleInstall(args: minimist.ParsedArgs, repoRoot: string) {
  const projectDir = resolve(String(args['project-dir'] || '.'));
  const vendor = join(projectDir, 'vendor', 'own-skills');
  const errs: string[] = [];
  if (!existsSync(vendor)) errs.push(`Missing ${vendor}`);
  if (!existsSync(join(vendor, '.own-skills-bundle'))) errs.push('Missing .own-skills-bundle marker');
  if (!existsSync(join(vendor, 'scripts'))) errs.push('Missing vendor/scripts');
  if (!existsSync(join(projectDir, '.cursor', 'skills'))) errs.push('Missing .cursor/skills');
  if (!Boolean(args['skip-validate-skills'])) {
    try {
      execFileSync('node', [join(repoRoot, 'dist', 'tools.js'), 'validate-skills'], {
        cwd: vendor,
        stdio: 'pipe',
      });
    } catch {
      errs.push('validate-skills failed in vendor bundle');
    }
  }
  if (errs.length > 0) {
    errs.forEach((e) => console.error(`- ${e}`));
    process.exit(2);
  }
  console.log('Bundle install verification: OK');
}

function buildKb(repoRoot: string, dry = false) {
  const cfg = loadKbConfig(repoRoot);
  const docsRoot = resolve(repoRoot, cfg.documentsPath);
  const files = collectMarkdownFiles(docsRoot);
  const manifest: ManifestItem[] = [];
  const vectors: number[][] = [];
  let idx = 0;
  for (const f of files) {
    const raw = readText(f);
    const p = matter(raw);
    const chunks = chunkText(p.content || '', cfg.chunkSize, cfg.chunkOverlap);
    chunks.forEach((c, i) => {
      const id = `chunk_${idx++}`;
      manifest.push({ id, path: relative(repoRoot, f).replace(/\\/g, '/'), title: p.data.title || undefined, chunk_index: i, text: c });
      vectors.push(embedText(c));
    });
  }
  if (dry) {
    console.log(`Would index ${files.length} files -> ${manifest.length} chunks`);
    return;
  }
  const embPath = resolve(repoRoot, cfg.embeddingsPath);
  const manifestPath = resolve(repoRoot, cfg.manifestPath);
  mkdirSync(join(embPath, '..'), { recursive: true });
  writeFileSync(embPath, `${JSON.stringify(vectors)}\n`, 'utf8');
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Wrote embeddings: ${relative(repoRoot, embPath)} (${vectors.length} vectors)`);
  console.log(`Wrote manifest: ${relative(repoRoot, manifestPath)}`);
}

function loadKbData(repoRoot: string) {
  const cfg = loadKbConfig(repoRoot);
  const embPath = resolve(repoRoot, cfg.embeddingsPath);
  const manifestPath = resolve(repoRoot, cfg.manifestPath);
  if (!existsSync(embPath) || !existsSync(manifestPath)) {
    throw new Error('Missing KB artifacts. Run build-kb first.');
  }
  const vectors = JSON.parse(readFileSync(embPath, 'utf8')) as number[][];
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as ManifestItem[];
  return { vectors, manifest };
}

function queryKb(repoRoot: string, q: string, topK: number) {
  const { vectors, manifest } = loadKbData(repoRoot);
  const qv = embedText(q);
  const scored = vectors
    .map((v, i) => ({ i, score: cosine(v, qv) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  return scored.map(({ i, score }) => ({ score, item: manifest[i] }));
}

function cmdQueryKb(args: minimist.ParsedArgs, repoRoot: string) {
  const q = String(args._[1] || '');
  if (!q) throw new Error('query-kb requires query text');
  const topK = Number(args.k || args['top-k'] || 5);
  const rows = queryKb(repoRoot, q, topK);
  rows.forEach((r, idx) => {
    console.log(`${idx + 1}. score=${r.score.toFixed(4)} path=${r.item.path} chunk=${r.item.chunk_index}`);
    console.log(`   ${r.item.text.slice(0, 180).replace(/\s+/g, ' ')}...`);
  });
}

function cmdQueryKbBatch(args: minimist.ParsedArgs, repoRoot: string) {
  const topK = Number(args.k || args['top-k'] || 5);
  const queries: string[] = [];
  const qArg = args.q ?? args.query;
  if (typeof qArg === 'string') queries.push(qArg);
  if (Array.isArray(qArg)) queries.push(...qArg.map(String));
  if (args.f || args.file) {
    const file = resolve(String(args.f || args.file));
    const lines = readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    queries.push(...lines);
  }
  if (queries.length === 0) throw new Error('query-kb-batch requires -q/--query or -f/--file');
  const out = queries.map((q) => ({ query: q, results: queryKb(repoRoot, q, topK) }));
  if (args.json) {
    console.log(JSON.stringify(out, null, 2));
    return;
  }
  out.forEach((item) => {
    console.log(`\nQuery: ${item.query}`);
    item.results.forEach((r, idx) => {
      console.log(`  ${idx + 1}. ${r.score.toFixed(4)}  ${r.item.path}#${r.item.chunk_index}`);
    });
  });
}

function cmdVerifyKb(_args: minimist.ParsedArgs, repoRoot: string) {
  const cfg = loadKbConfig(repoRoot);
  const embPath = resolve(repoRoot, cfg.embeddingsPath);
  const manifestPath = resolve(repoRoot, cfg.manifestPath);
  const errors: string[] = [];
  if (!existsSync(embPath)) errors.push(`Missing embeddings: ${embPath}`);
  if (!existsSync(manifestPath)) errors.push(`Missing manifest: ${manifestPath}`);
  if (errors.length === 0) {
    const v = JSON.parse(readFileSync(embPath, 'utf8')) as number[][];
    const m = JSON.parse(readFileSync(manifestPath, 'utf8')) as ManifestItem[];
    if (!Array.isArray(v) || !Array.isArray(m)) errors.push('Embeddings/manifest format invalid');
    if (v.length !== m.length) errors.push(`Vector count (${v.length}) != manifest count (${m.length})`);
  }
  if (errors.length > 0) {
    errors.forEach((e) => console.error(`- ${e}`));
    process.exit(2);
  }
  console.log('KB verification: OK');
}

function help() {
  console.log(`Usage: node dist/tools.js <command> [args]

Commands:
  list-skills [--include-template] [--json]
  validate-skills [--include-template]
  build-skill-index [--output <path>] [--with-embeddings] [--dry-run]
  analyze-skills [--json|--markdown|--self-review] [--with-references] [--only-actionable]
  install-skill <skill-path> [--project-dir <dir>] [--mode symlink|copy] [--force] [--all-ides]
  verify-bundle-install [--project-dir <dir>] [--skip-validate-skills]
  build-kb [--dry-run]
  query-kb "<query>" [-k 5]
  query-kb-batch [-q "..."]... [-f file] [-k 5] [--json]
  verify-kb`);
}

function main() {
  const args = minimist(process.argv.slice(2), {
    boolean: ['json', 'markdown', 'self-review', 'with-references', 'include-template', 'with-embeddings', 'dry-run', 'force', 'all-ides', 'skip-validate-skills'],
    string: ['output', 'project-dir', 'mode', 'name', 'ides', 'skill-dir', 'k', 'top-k', 'q', 'query', 'f', 'file'],
  });
  const cmd = String(args._[0] || '');
  const root = process.cwd();
  switch (cmd) {
    case 'list-skills':
      cmdListSkills(args, root);
      break;
    case 'validate-skills':
      cmdValidateSkills(args, root);
      break;
    case 'build-skill-index':
      cmdBuildSkillIndex(args, root);
      break;
    case 'analyze-skills':
      cmdAnalyzeSkills(args, root);
      break;
    case 'install-skill':
      cmdInstallSkill(args, root);
      break;
    case 'verify-bundle-install':
      cmdVerifyBundleInstall(args, root);
      break;
    case 'build-kb':
      buildKb(root, Boolean(args['dry-run']));
      break;
    case 'query-kb':
      cmdQueryKb(args, root);
      break;
    case 'query-kb-batch':
      cmdQueryKbBatch(args, root);
      break;
    case 'verify-kb':
      cmdVerifyKb(args, root);
      break;
    default:
      help();
      process.exit(cmd ? 1 : 0);
  }
}

try {
  main();
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
