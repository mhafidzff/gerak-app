# 🏋️ Gerak — Exercise Tracker Ica & Hfz

Aplikasi tracking olahraga mingguan untuk berdua, dengan data tersimpan di cloud dan bisa diakses dari HP maupun laptop.

---

## 🚀 Deploy (sekali aja, ~10 menit)

### Langkah 1 — Buat database di Supabase (gratis)

1. Buka https://supabase.com → **Start your project** → daftar/login
2. Klik **New project** → isi nama (misal: `gerak-app`) → pilih region **Southeast Asia (Singapore)** → klik Create
3. Tunggu ~1 menit sampai project siap
4. Di sidebar kiri klik **SQL Editor** → klik **New query**
5. Copy-paste isi file `supabase_schema.sql` → klik **Run**
6. Pergi ke **Project Settings** → **API**
7. Catat dua nilai ini:
   - **Project URL** (contoh: `https://abcxyz.supabase.co`)
   - **anon public** key (string panjang di bawah "Project API keys")

---

### Langkah 2 — Upload kode ke GitHub

1. Buka https://github.com → daftar/login
2. Klik **+** → **New repository** → nama: `gerak-app` → **Private** → Create
3. Di komputer, buka terminal/command prompt di folder ini lalu jalankan:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/gerak-app.git
git push -u origin main
```
*(Ganti USERNAME dengan username GitHub kamu)*

---

### Langkah 3 — Deploy ke Vercel (gratis)

1. Buka https://vercel.com → daftar/login dengan akun GitHub
2. Klik **Add New Project** → pilih repo `gerak-app`
3. Sebelum deploy, klik **Environment Variables** → tambahkan dua variabel:
   - `REACT_APP_SUPABASE_URL` → isi dengan Project URL dari langkah 1
   - `REACT_APP_SUPABASE_ANON_KEY` → isi dengan anon key dari langkah 1
4. Klik **Deploy** → tunggu ~2 menit
5. Vercel akan kasih URL seperti `gerak-app.vercel.app` — ini URL kalian berdua! 🎉

---

## 📱 Cara pakai sehari-hari

- Buka URL dari HP atau laptop (bisa tambah ke home screen HP)
- Tap nama di hari yang bersangkutan → pilih jenis olahraga → simpan
- Data langsung tersimpan dan keduanya bisa lihat secara real-time
- Cek tab **Denda** untuk lihat aturan dan status minggu ini

---

## 🔧 Update aplikasi

Kalau mau ubah sesuatu (misal aturan berubah setelah review), edit kodenya lalu:

```bash
git add .
git commit -m "update aturan"
git push
```

Vercel otomatis re-deploy dalam ~1 menit.

---

## Struktur file

```
gerak-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          ← logika & tampilan utama
│   ├── App.css         ← styling
│   ├── index.js        ← entry point
│   └── supabase.js     ← koneksi database
├── supabase_schema.sql ← jalankan ini di Supabase
├── .env.example        ← template environment variables
├── .gitignore
└── package.json
```
