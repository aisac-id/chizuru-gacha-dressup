# HARNESS — chizuru-gacha-dressup

Standar kerja WAJIB untuk semua kontribusi di repo ini. Reviewer menolak PR yang melanggar.

## 1. Identitas

- Jenis: game web HTML statis (gacha dress-up, 100 kostum), tanpa backend/build step.
- Stack: HTML + CSS + vanilla JS (inline di `index.html` + `data.js`), aset JPG/PNG, hosting GitHub Pages dari root `main`.
- Basis harness (turunan ringan, bukan salinan mentah):
  - `Aisac-Indonesia/loop-v5` @ `57d414ccde3ca77f4194666032f4b3942bd5b3aa` — RULES-OF-THE-GAME (Twelve-Factor, supply-chain, TDD/CI gate, Core Web Vitals).
  - `aisac-id/harness-extension` @ `2301564c22989c5b11efd2f81f76edf8bcb1ae71` — STANDARDS v1.5 (maks 300 LoC/file, ES modules, nol hardcode, performa ringan).
- Pemilik harness: **GM Games & Entertainment** (Project Lead). Perubahan harness hanya lewat PR `chore/harness-*`.

## 2. Aturan yang berlaku + pengecualian

| Aturan basis | Status di repo ini |
|---|---|
| Maks 300 LoC per file kode | WAJIB untuk file baru. Pengecualian legacy: `index.html` (566 baris) dan `data.js` (minified) sampai refactor issue #21; jangan menambah baris di file legacy tanpa alasan kuat. |
| ES modules, tanpa bundler | WAJIB untuk JS baru (`js/*.js`, `type="module"`). Kode inline legacy dipindah bertahap via #21. |
| Nol hardcode secret/config (Twelve-Factor III) | WAJIB. Repo ini tidak punya secret runtime; konfigurasi tooling lewat env (lihat §4). Data game (`data.js`) adalah konten, bukan config. |
| Supply-chain (SC): versi exact + lockfile + `npm ci` | WAJIB untuk devDependencies (Playwright). Tanpa dependensi runtime/CDN eksternal. |
| TDD + CI test gate | WAJIB: logika gacha/state baru harus punya test (unit Node atau e2e Playwright); CI hijau sebelum Ready for review. |
| Core Web Vitals | Target: LCP ≤ 2,5 s (4G mid-range), CLS ≤ 0,1, INP ≤ 200 ms. |
| WCAG 2.1 AA | WAJIB: zoom tidak diblokir, keyboard penuh, alt bermakna, kontras ≥ 4.5:1, target sentuh ≥ 44×44 px, `prefers-reduced-motion`. |
| Code 100% English (identifier/komentar/commit) | WAJIB. Teks UI Bahasa Indonesia; disclaimer ID/EN. Pengecualian i18n 3 bahasa (id/en/ja): tidak berlaku untuk game fan-made ini (keputusan Leader, scope kecil). |
| DATABASE-RULES, soft-delete, CRUD drawer, backend-first, Cloudflare edge, SRE backend, PDP penuh | TIDAK berlaku: tanpa database/backend/server; data hanya `localStorage` milik pengguna sendiri, tanpa pengumpulan data pribadi. |
| UX heuristic benchmark ≥ 9.0 | Disederhanakan: audit UI/UX per PR yang menyentuh UI (temuan UI Designer Fase 1 jadi acuan), tanpa skoring formal 3 framework. |

## 3. Struktur folder & batas ukuran

```
index.html          # legacy (pengecualian sementara, target pecah via #21)
data.js             # dataset 100 kostum (legacy minified)
js/                 # ES modules baru: config.js, state.js, gacha.js, ui.js, audio.js (maks 300 LoC/file)
styles.css          # hasil ekstraksi CSS (maks 300 LoC/file, boleh pecah)
assets/             # gambar kostum (target: rendition WebP/AVIF, bukan master JPG)
promo/              # aset promo
tests/              # e2e Playwright (*.spec.js) + unit (*.test.mjs)
scripts/            # tooling lokal (serve.mjs, check-harness.mjs)
.github/workflows/  # CI
Operation/          # DILARANG di-track git (dokumen internal; dihapus via PR terpisah)
```

## 4. Konfigurasi (nol hardcode)

Game tidak membutuhkan secret runtime. Env hanya untuk tooling dev/CI:

| Variabel | Fungsi | Contoh (palsu) |
|---|---|---|
| `PORT` | Port server statis lokal (`scripts/serve.mjs`) | `8123` |
| `CI` | Mode CI (Playwright: tanpa reuse server) | `true` |

`.env` lokal di-gitignore; hanya `.env.example` (placeholder) yang di-commit. Bila kelak butuh infrastruktur (Vercel/Neon/Blob), wajib lewat `vercel-ai.cmd` + env platform, tidak pernah hardcode.

## 5. Definition of Done (per PR)

1. Satu PR = satu tujuan, ±maks 400 baris perubahan (lockfile/generated tidak dihitung), merujuk nomor issue.
2. `node scripts/check-harness.mjs` LULUS (guard LoC, path terlarang, pola secret).
3. Test lulus: `npm test` (e2e Playwright) + unit baru bila menyentuh logika; bukti uji (output test/screenshot/headless) ditempel di deskripsi PR.
4. `C:\Users\Acer\.aisac\no-hardcode.cmd` LULUS — hasil ditempel di deskripsi PR (reviewer wajib menolak tanpa ini).
5. A11y WCAG AA & performance budget bila menyentuh UI/aset: first view ≤ 180 KB, album viewport ≤ 500 KB, summon ×10 ≤ 1,1 MB, gambar web ≤ 120 KB.
6. Review paralel: Code Reviewer + Security Reviewer (format `[BLOCKER|MAJOR|MINOR|NIT] file:baris, alasan, saran`).
7. QA Engineer menulis `QA GATE: LULUS/GAGAL` di PR pada SHA yang diuji.
8. Merge HANYA oleh Owner. Setelah merge: `git fetch --prune`, branch baru dari `main` terbaru.

## 6. Review checklist

- [ ] Diff sesuai satu tujuan + issue dirujuk; Conventional Commits.
- [ ] Tidak menambah baris di file legacy tanpa alasan; file baru ≤ 300 LoC.
- [ ] Tanpa secret/URL infra hardcode; tanpa CDN/dependensi runtime baru tanpa approval.
- [ ] `innerHTML` dengan data dinamis dihindari (pakai `textContent`/DOM builder); state `localStorage` divalidasi.
- [ ] A11y: keyboard, alt, aria-live, kontras, target sentuh; tidak memblokir zoom.
- [ ] Performa: `width/height` + `loading="lazy"` + `decoding="async"` pada img baru; rendition sesuai ukuran tampil.
- [ ] Bukti uji + hasil no-hardcode LULUS di deskripsi PR.
- [ ] Tidak menyentuh `Operation/`, setting repo, atau force-push.

## 7. Alur rilis & bukti rilis

Branch fitur (`security/…`, `fix/…`, `feat/…`, `perf/…`, `content/…`, `chore/…`) → Draft PR ke `main` → Ready setelah test lulus → review Code + Security → QA GATE → merge oleh Owner → GitHub Pages ter-deploy otomatis. Bukti rilis per batch: daftar PR (link, SHA, status review, QA GATE), hasil test, screenshot, laporan Leader ke grup. Tanpa tag/release manual tanpa approval Owner.

## 8. Aturan proses (Konstitusi + SOP grup)

- DILARANG: push langsung ke `main`, force-push, merge sendiri, mengubah setting repo, publikasi ke luar, memotong/menyalin isi dokumen internal ke chat/PR.
- Jalankan `C:\Users\Acer\.aisac\quota.cmd` sebelum langkah besar; berhenti bila STOP. Leader mencantumkan baris kuota di laporan.
- Model: diskusi/review/QA = Qwen4-Max; eksekusi coding = Sonus. Claude DILARANG (saklar Owner).
- Beda pendapat selevel: debat maks 3 putaran (Posisi, Bukti, Tanggapan, Kompromi), lalu Leader memutuskan; *disagree and commit*.