// Harness guards: forbidden paths, file length budget, secret patterns, .env tracking.
// Run: node scripts/check-harness.mjs  (BASE_REF env optional, default origin/main)
// LoC = physical lines including comments; trailing final newline not counted.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const git = (cmd) => execSync(`git ${cmd}`, { encoding: 'utf8' }).trim();
const tracked = git('ls-files').split('\n').filter(Boolean);
const failures = [];

// 1. No NEW or RENAMED tracked files under Operation/ (any case).
// Fail-closed in CI when the base ref is unavailable; warn only in local dev.
const baseRef = process.env.BASE_REF || 'origin/main';
let baseOk = false;
try {
  git(`rev-parse --verify ${baseRef}`);
  baseOk = true;
} catch {
  if (process.env.CI) failures.push(`base ref ${baseRef} unavailable in CI (fail-closed)`);
  else console.log('note: base ref unavailable locally, skipping added-file diff guard');
}
if (baseOk) {
  const added = git(`diff --name-only --diff-filter=AR ${baseRef}...HEAD`)
    .split('\n').filter(Boolean);
  for (const f of added) {
    if (f.toLowerCase().startsWith('operation/')) failures.push(`forbidden new/renamed file: ${f}`);
  }
}

// 2. .gitignore must protect Operation/ and .env.
const ignore = readFileSync('.gitignore', 'utf8');
if (!/^Operation\/$/m.test(ignore)) failures.push('.gitignore missing Operation/');
if (!/^\.env$/m.test(ignore)) failures.push('.gitignore missing .env');

// 3. No tracked .env files except .env.example.
for (const f of tracked) {
  if (/^\.env($|\.)/.test(f) && f !== '.env.example') failures.push(`tracked env file: ${f}`);
}

// 4. Code file length budget: max 300 physical LoC, legacy exceptions until issue #21.
const LEGACY = new Set(['index.html', 'data.js']);
for (const f of tracked) {
  if (!/\.(js|mjs|css|html)$/.test(f) || LEGACY.has(f)) continue;
  if (!existsSync(f)) continue; // tracked-but-deleted in working tree (e.g. mid-removal PR)
  const text = readFileSync(f, 'utf8');
  const lines = text.split('\n').length - (text.endsWith('\n') ? 1 : 0);
  if (lines > 300) failures.push(`${f}: ${lines} LoC > 300 (split the file)`);
}

// 5. Secret patterns in tracked text files (skip binary assets and internal docs).
const PATTERNS = [
  /gh[pousr]_[A-Za-z0-9]{36,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /sk-[A-Za-z0-9]{20,}/,
  /sk-ant-[A-Za-z0-9-]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /AIza[0-9A-Za-z_-]{35}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(?:postgres|postgresql|mysql|mongodb):\/\/[^\s'"]+:[^\s'"]+@/,
  /(?:password|passwd|api_?key|secret|token|credential)\s*[:=]\s*['"][^'"\s]{8,}['"]/i,
  /(?:password|passwd|api_?key|secret|token|credential)\s*[:=]\s*[A-Za-z0-9_\-./+]{8,}\s*$/im,
];
const SKIP = /^(assets|promo|Operation)\//i;
for (const f of tracked) {
  if (SKIP.test(f) || /\.(jpg|jpeg|png|webp|avif|ico|docx|pdf|zip)$/i.test(f)) continue;
  if (!existsSync(f)) continue;
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