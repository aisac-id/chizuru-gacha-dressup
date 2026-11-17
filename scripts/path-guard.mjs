// Pure path guard for the static dev server. Blocks internal docs, dot segments,
// traversal, and absolute paths on any OS separator (Windows normalize -> '\').
import { normalize } from 'node:path';

export function isForbidden(relPath) {
  const rel = normalize(relPath).split('\\').join('/').toLowerCase();
  if (rel.startsWith('/') || rel.startsWith('..') || /^[a-z]:/.test(rel)) return true;
  return rel.split('/').some((seg) => seg === 'operation' || seg.startsWith('.'));
}