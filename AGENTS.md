# AGENTS.md

Baca **HARNESS.md** dulu sebelum mengubah apa pun di repo ini.

Aturan inti:
- Satu PR = satu tujuan, ±maks 400 baris, rujuk nomor issue, Conventional Commits (English).
- Branch fitur → Draft PR ke `main` → review Code Reviewer + Security Reviewer → `QA GATE` dari QA Engineer → merge HANYA oleh Owner.
- Maks 300 LoC per file kode baru; ES modules; tanpa CDN/dependensi runtime.
- Nol hardcode secret/config. Tempel hasil `C:\Users\Acer\.aisac\no-hardcode.cmd` (LULUS) + bukti uji di deskripsi PR.
- Sebelum push: `node scripts/check-harness.mjs` dan `npm test` harus lulus.
- WCAG 2.1 AA; performance budget di HARNESS.md §5.

Larangan:
- Push langsung ke `main`, force-push, merge sendiri, ubah setting repo, publikasi ke luar.
- Menambahkan/mempertahankan file baru di `Operation/` (dokumen internal, di-gitignore).
- Menyalin isi dokumen internal ke chat, issue, PR, atau log.
- Memakai Claude (dilarang Owner); coding pakai Sonus, diskusi Qwen4-Max.
- Membuat aset yang meniru rupa Chizuru/karakter IP lain.