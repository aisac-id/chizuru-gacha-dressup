# Operation — Chizuru Gacha Dress-Up

Knowledge base komersial & operasional untuk **Chizuru Gacha Dress-Up** — gim web statis satu halaman berisi mekanik gacha dengan pity (SSR dijamin pada undian ke-50), ekonomi mata uang koin tanpa uang sungguhan, katalog 100 kostum adat & olahraga dunia, album koleksi, dan Photo Mode yang menghasilkan PNG resolusi tinggi untuk dibagikan. Produk berjalan sepenuhnya offline, tanpa akun, tanpa iklan, tanpa backend, dan tanpa pengumpulan data pribadi. Dokumen-dokumen di bawah diterbitkan oleh **PT. Sainskerta Solusi Nusantara** (software house & AI partner, sejak 2013; Gedung Graha Mampang Lt. 3, Jakarta Selatan) sebagai basis kerja Divisi Produk & Komersial untuk lini ini, dan disusun dari kondisi repository `aisac-id/chizuru-gacha-dressup` (branch `main`) saat dokumen ini dibuat.

> **Catatan penting 1 — harga & proyeksi.** Seluruh harga, tarif internal, target konversi, ambang keberhasilan PoC, nilai RTO/RPO, skema kredit SLA, dan proyeksi dalam dokumen di sini berstatus **usulan — perlu validasi manajemen** sebelum dipakai dalam penawaran ke klien atau kontrak.

> **Catatan penting 2 — kekayaan intelektual.** Karakter yang ditampilkan, Chizuru Mizuhara, adalah IP pihak ketiga dari manga/anime *Rent-A-Girlfriend* (Kanojo, Okarishimasu) karya Reiji Miyajima, adaptasi anime oleh TMS Entertainment. Posisi jujur produk ini adalah **fan showcase / portofolio non-komersial**. Karena itu tidak ada satu pun dokumen di folder ini yang menyarankan penjualan langsung karya fan-art; jalur komersial yang dianggap sah adalah (a) lisensi mekanik gacha dress-up sebagai **engine white-label di atas karakter orisinal/berlisensi milik klien**, (b) **aktivasi brand/event** dengan aset klien atau hasil produksi ulang, dan (c) jalur lisensi resmi bila pemegang hak memberikan izin tertulis. Analisis risiko IP ada di dokumen `01`, `04`, `05`, `07`, `09`, `15`, `16`, `17`, `19`, dan `20`.

Setiap klaim fitur merujuk pada berkas nyata di repository (`README.md`, `index.html`, `data.js`, `assets/`, `promo/`), dan kompetitor yang dibandingkan adalah produk nyata dengan URL sumber.

## 01-Business-Strategy

| Dokumen | Isi |
|---|---|
| [01-Business-Model-Canvas](01-Business-Strategy/01-Business-Model-Canvas.docx) | Sembilan blok model bisnis + batasan struktural IP |
| [02-ICP-dan-Segmentasi-Pasar](01-Business-Strategy/02-ICP-dan-Segmentasi-Pasar.docx) | Skor kelayakan 7 segmen; dua segmen ditolak |
| [03-Analisis-Kompetitor](01-Business-Strategy/03-Analisis-Kompetitor.docx) | Love Nikki, Time Princess, SuitU, Gacha Life 2, portal HTML5 |
| [04-Analisis-SWOT](01-Business-Strategy/04-Analisis-SWOT.docx) | Kekuatan mekanik, kelemahan legalitas, ancaman takedown |

## 02-Sales

| Dokumen | Isi |
|---|---|
| [05-Proposal-Penjualan-B2B-White-Label-Engine](02-Sales/05-Proposal-Penjualan-B2B-White-Label-Engine.docx) | Studio game & agensi aktivasi: engine di atas karakter klien |
| [05-Proposal-Penjualan-B2C-Komunitas-Penggemar](02-Sales/05-Proposal-Penjualan-B2C-Komunitas-Penggemar.docx) | Komunitas fan: posisi non-komersial + dua pintu monetisasi sah |
| [06-Statement-of-Work](02-Sales/06-Statement-of-Work.docx) | Lingkup, milestone, kriteria penerimaan, klausul IP |
| [07-Pricing-dan-Packaging](02-Sales/07-Pricing-dan-Packaging.docx) | Paket & daftar harga usulan, margin, kebijakan penolakan |
| [08-Sales-Playbook-dan-Battlecard](02-Sales/08-Sales-Playbook-dan-Battlecard.docx) | IP gate, talk track, lima battlecard, penanganan keberatan |
| [09-Product-Datasheet](02-Sales/09-Product-Datasheet.docx) | Spesifikasi, katalog, batas produk, status hukum |

## 03-Pre-Sales

| Dokumen | Isi |
|---|---|
| [10-Discovery-Questionnaire](03-Pre-Sales/10-Discovery-Questionnaire.docx) | 10 bagian, termasuk gerbang IP dan perlindungan anak |
| [11-Demo-Script-dan-PoC-Plan](03-Pre-Sales/11-Demo-Script-dan-PoC-Plan.docx) | Skrip 20 menit, 4 tipe PoC, kriteria sukses S1-S9 |
| [12-Technical-Proposal](03-Pre-Sales/12-Technical-Proposal.docx) | Varian arsitektur, skenario uji TC1-TC10, estimasi |
| [13-ROI-dan-Business-Case](03-Pre-Sales/13-ROI-dan-Business-Case.docx) | Build-mandiri vs lisensi, aktivasi, sensitivitas |

## 04-IT-Communication

| Dokumen | Isi |
|---|---|
| [14-Arsitektur-Solusi](04-IT-Communication/14-Arsitektur-Solusi.docx) | Perspektif konteks, runtime, data, distribusi, ADR |
| [15-Arsitektur-Keamanan-dan-Threat-Model](04-IT-Communication/15-Arsitektur-Keamanan-dan-Threat-Model.docx) | Sepuluh ancaman nyata & backlog kontrol |
| [16-Privasi-Data-dan-Kepatuhan](04-IT-Communication/16-Privasi-Data-dan-Kepatuhan.docx) | Nol data pribadi, IGRS/Permenkominfo 2-2024, UU PDP |

## 05-Resilience-Operations

| Dokumen | Isi |
|---|---|
| [17-Business-Continuity-Plan](05-Resilience-Operations/17-Business-Continuity-Plan.docx) | Kontinuitas kanal rilis, aset, dukungan; skenario S1-S7 |
| [18-Disaster-Recovery-Plan](05-Resilience-Operations/18-Disaster-Recovery-Plan.docx) | Pemulihan repo, kredensial, build, pustaka aset |
| [19-SOP-Insiden-dan-Breach-Response](05-Resilience-Operations/19-SOP-Insiden-dan-Breach-Response.docx) | Lima playbook termasuk takedown IP & commit jahat |
| [20-SLA-dan-Model-Dukungan](05-Resilience-Operations/20-SLA-dan-Model-Dukungan.docx) | Jenjang layanan, target tanggap, pengecualian jujur |

## Cara Memakai Folder Ini

1. Mulai dari `01-Business-Strategy` untuk menetapkan segmen dan posisi sebelum menyusun penawaran; jangan lewati `04` karena di sana risiko IP diuraikan paling rinci.
2. Ambil dokumen `05` sesuai segmen peluang — B2B untuk engine/aktivasi, B2C untuk komunitas — lalu lengkapi `10-Discovery-Questionnaire` sebelum demo. Bagian B formulir adalah gerbang: bila bukti hak atas karakter tidak ada, hentikan di sana.
3. Gunakan `09` dan `12` sebagai dasar percakapan teknis; seluruh angkanya bisa diverifikasi klien sendiri dari `index.html` dan `data.js`.
4. Rujuk `17`-`20` saat menyusun kontrak dukungan; jangan menjanjikan uptime kanal pihak ketiga atau angka yang belum divalidasi manajemen.

Tiga hal yang harus dinyatakan jujur kepada klien maupun internal: **(1)** produk ini tidak memiliki backend, sehingga tidak ada klaim analitik, retensi, leaderboard, atau sinkronisasi lintas perangkat — save hanya ada di `localStorage` perangkat pemain dan tidak dapat dipulihkan dari sisi kami; **(2)** mekanik dan pipeline kontennya layak dijual, tetapi 100 ilustrasi serta nama karakternya adalah fan-art milik pihak ketiga sehingga tidak pernah menjadi objek transaksi; **(3)** monetisasi B2C (koin, premium, merchandise, iklan, sponsorship) hanya boleh dibuka setelah lisensi tertulis pemegang hak atau setelah varian karakter orisinal dirilis.

## Fakta Produk yang Dipakai Seluruh Dokumen

| Aspek | Nilai Terverifikasi |
|---|---|
| Jenis | Web app statis satu halaman, tanpa backend & tanpa dependensi eksternal |
| Katalog | 100 kostum di `data.js` (SSR 39 / SR 51 / R 10; 44 bertagal Indonesia) |
| Ekonomi | 300 koin awal; summon x1 100 / x10 900; bonus harian +200; duplikat +20/+50/+150 |
| Rate & pity | SSR 5% / SR 70% / R 25%; SSR dijamin pada undian ke-50 |
| Fitur | Album + filter, riwayat 60 undian, Photo Mode PNG 860x1290, audio WebAudio, haptics |
| Beban | `assets/` ±34 MB (100 JPG, rata-rata 340 KB), lazy load pada album/riwayat |
| Kanal | GitHub Pages, ZIP offline, opsi itch.io/portal (hanya varian sah) |
| Demo | https://aisac-id.github.io/chizuru-gacha-dressup/ |

---

© 2026 PT. Sainskerta Solusi Nusantara · hello@sainskerta.id · sainskerta.net
