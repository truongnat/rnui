import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type KbConfig = {
  documentsPath: string;
  embeddingModel: string;
  embeddingsPath: string;
  manifestPath: string;
  chunkSize: number;
  chunkOverlap: number;
  skillIndexPath: string;
  skillEmbeddingsPath: string;
};

const START = '<!-- kb-config-start -->';
const END = '<!-- kb-config-end -->';

const DEFAULTS: KbConfig = {
  documentsPath: 'knowledge-base/documents',
  embeddingModel: 'sentence-transformers/all-MiniLM-L6-v2',
  embeddingsPath: 'knowledge-base/embeddings/rag_embeddings.json',
  manifestPath: 'knowledge-base/embeddings/rag_manifest.json',
  chunkSize: 1000,
  chunkOverlap: 200,
  skillIndexPath: 'knowledge-base/embeddings/skill_index.json',
  skillEmbeddingsPath: 'knowledge-base/embeddings/skill_embeddings.json',
};

function extractBlock(text: string): string {
  const s = text.indexOf(START);
  const e = text.indexOf(END);
  if (s < 0 || e < 0 || e <= s) return '';
  return text.slice(s + START.length, e).trim();
}

export function loadKbConfig(cwd: string): KbConfig {
  const configPath = existsSync(resolve(cwd, 'config.md'))
    ? resolve(cwd, 'config.md')
    : resolve(cwd, 'config.example.md');
  if (!existsSync(configPath)) return DEFAULTS;
  const raw = readFileSync(configPath, 'utf8');
  const block = extractBlock(raw);
  if (!block) return DEFAULTS;

  const out: KbConfig = { ...DEFAULTS };
  for (const line of block.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    switch (key) {
      case 'documents_path':
        out.documentsPath = val;
        break;
      case 'embedding_model':
        out.embeddingModel = val;
        break;
      case 'embeddings_path':
        out.embeddingsPath = val.endsWith('.npy') ? val.replace(/\.npy$/i, '.json') : val;
        break;
      case 'manifest_path':
        out.manifestPath = val;
        break;
      case 'chunk_size':
        out.chunkSize = Number(val) || out.chunkSize;
        break;
      case 'chunk_overlap':
        out.chunkOverlap = Number(val) || out.chunkOverlap;
        break;
      case 'skill_index_path':
        out.skillIndexPath = val;
        break;
      case 'skill_embeddings_path':
        out.skillEmbeddingsPath = val.endsWith('.npy') ? val.replace(/\.npy$/i, '.json') : val;
        break;
      default:
        break;
    }
  }
  return out;
}
