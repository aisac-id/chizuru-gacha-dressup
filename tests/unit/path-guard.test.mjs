import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isForbidden } from '../../scripts/path-guard.mjs';

test('blocks Operation/ on posix and windows separators, any case/depth', () => {
  for (const p of [
    'Operation/notes.md',
    'Operation\\rahasia.docx',
    'operation/x',
    'OPERATION\\X',
    'foo/Operation/bar',
  ]) {
    assert.equal(isForbidden(p), true, p);
  }
});

test('blocks dot segments (.git, .env) and traversal', () => {
  for (const p of ['.git/config', '.git\\HEAD', '.env', '.env.local', '../secret', 'a/../../b', '..\\x']) {
    assert.equal(isForbidden(p), true, p);
  }
});

test('blocks absolute paths', () => {
  for (const p of ['/etc/passwd', '\\\\server\\share', 'C:\\Windows\\x', 'c:/x']) {
    assert.equal(isForbidden(p), true, p);
  }
});

test('allows game files', () => {
  for (const p of ['index.html', 'data.js', 'assets/001.jpg', 'promo/logo.png', 'js/config.js']) {
    assert.equal(isForbidden(p), false, p);
  }
});