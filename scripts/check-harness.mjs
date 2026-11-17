// Harness guards: forbidden paths, file length budget, secret patterns, .env tracking.
// Run: node scripts/check-harness.mjs  (BASE_REF env optional, default origin/main)
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const git = (cmd) => execSync(`git ${cmd}`, { encoding: 'utf8' }).trim();
const tracked = git('ls-files').split('\n').filter(Boolean);
const failures = [];

// 1. No NEW tracked files under Operation/ (legacy removal happens in its own PR).
const baseRef = process.env.BASE_REF || 'origin/main';
try {
  git(`rev-parse --verify ${baseRef}`);
  const added = git(`diff --name-only --diff-filter=A ${baseRef}...HEAD`)
    .split('\n').filter(Boolean);
  for (const f of added) {
    if (f.startsWith('Operation/')) failures.push(`forbidden new file: ${f}`);
  }
} catch {
  console.log('note: base ref unavailable, skipping added-file diff guard');
}

// 2. .gitignore must protect Operation/ and .env.
const ignore = readFileSync('.gitignore', 'utf8');
if (!/^Operation\/$/m.test(ignore)) failures.push('.gitignore missing Operation/');
if (!/^\.env$/m.test(ignore)) failures.push('.gitignore missing .env');

// 3. No tracked .env files except .env.example.
for (const f of tracked) {
  if (/^\.env($|\.)/.test(f) && f !== '.env.example') failures.push(`tracked env file: ${f}`);
}

// 4. Code file length budget: max 300 LoC, legacy exceptions until issue #21.
const LEGACY = new Set(['index.html', 'data.js']);
for (const f of tracked) {
  if (!/\.(js|mjs|css|html)$/.test(f) || LEGACY.has(f)) continue;
  if (f.startsWith('node_modules/')) continue;
  const lines = readFileSync(f, 'utf8').split('\n').length;
  if (lines > 300) failures.push(`${f}: ${lines} LoC > 300 (split the file)`);
}

// 5. Secret patterns in tracked text files (skip binary assets and internal docs).
const PATTERNS = [
  /gh[pousr]_[A-Za-z0-9]{36,}/,
  /AKIA[0-9A-Z]{16}/,
  /sk-[A-Za-z0-9]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(?:password|passwd|api_?key|secret)\s*[:=]\s*['"][^'"\s]{8,}['"]/i,
];
const SKIP = /^(assets|promo|Operation)\//;
for (const f of tracked) {
  if (SKIP.test(f) || /\.(jpg|jpeg|png|webp|avif|ico|docx|pdf|zip)$/i.test(f)) continue;
  const text = readFileSync(f, 'utf8');
  for (const re of PATTERNS) {
    if (re.test(text)) failures.push(`${f}: possible hardcoded secret (${re})`);
  }
}

if (failures.length) {
  console.error('HARNESS CHECK: GAGAL\n' + failures.map((f) => ' - ' + f).join('\n'));
  process.exit(1);
}
console.log('HARNESS CHECK: LULUS');