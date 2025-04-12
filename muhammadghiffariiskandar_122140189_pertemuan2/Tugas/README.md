# Dashboard Jadwal Kuliah

## 📋 Deskripsi Aplikasi
Aplikasi Dashboard Jadwal Kuliah adalah tools manajemen jadwal perkuliahan berbasis web yang membantu mahasiswa dalam:
- Mengorganisir jadwal kuliah harian
- Menyimpan data mata kuliah secara lokal
- Memiliki tampilan yang responsif dan user-friendly

## ✨ Fitur Utama
| Fitur | Keterangan |
|-------|------------|
| **CRUD Mata Kuliah** | Create, Read, Update, Delete data mata kuliah |
| **Penyimpanan Lokal** | Data tersimpan di browser menggunakan localStorage |
| **Dual Tema** | Light mode dan dark mode |
| **Responsif** | Dapat diakses dari desktop maupun mobile |
| **Navigasi** | Tombol kembali ke homepage |

## 🖥️ Tampilan Aplikasi
### Light Mode
![Light Mode Preview](asset/light-mode-screenshot.png)

### Dark Mode 
![Dark Mode Preview](asset/dark-mode-screenshot.png)

## 🛠️ Teknologi yang Digunakan
### ES6+ Features Implemented:
1. **Block-scoped variables**
   ```javascript
   const courses = [];
   let currentTheme = 'light';

2. **Arrow Function**
   ```javascript
   const renderCourses = (courses) => { ... };\

3. **Template Literals**
   ```javascript
   console.log(`Mata kuliah ${name} berhasil ditambahkan`);

4. **Async/Await**
   ```javascript
   async function loadData() {
   const response = await fetchData();
   }

5. **Classes**
   ```javascript
   class Course {
    constructor(name, lecturer) {
      this.name = name;
      this.lecturer = lecturer;
    }
   }


## 🚀 Panduan Penggunaan

### 1. Menambahkan Mata Kuliah Baru
1. Isi form input yang tersedia:
   - Nama Mata Kuliah
   - Nama Dosen
   - Ruang Kelas
   - Hari Kuliah
   - Waktu Kuliah
2. Klik tombol **"Tambah Mata Kuliah"**
3. Mata kuliah akan otomatis muncul di hari yang sesuai

### 2. Mengedit Mata Kuliah
1. Cari mata kuliah yang ingin diedit
2. Klik ikon **✏️ (pensil)** di pojok kanan atas kartu mata kuliah
3. Form input akan terisi dengan data yang ada
4. Ubah data yang diperlukan
5. Klik tombol **"Update Mata Kuliah"** untuk menyimpan perubahan

### 3. Menghapus Mata Kuliah
1. Cari mata kuliah yang ingin dihapus
2. Klik ikon **🗑️ (tong sampah)** di pojok kanan atas kartu mata kuliah
3. Mata kuliah akan langsung terhapus dari sistem

### 4. Mengganti Tema Tampilan
1. Klik ikon **🌙/☀️** di pojok kanan atas header
2. Tema akan otomatis berubah antara:
   - Light mode (terang)
   - Dark mode (gelap)
3. Preferensi tema akan tersimpan untuk kunjungan berikutnya

### 5. Kembali ke Homepage
1. Klik tombol **"Kembali"** di pojok kiri atas
2. Anda akan diarahkan kembali ke halaman utama

### Tips Penggunaan
- Data disimpan secara otomatis di browser Anda
- Tidak perlu khawatir kehilangan data saat menutup browser
- Tampilan otomatis menyesuaikan ukuran layar (desktop/tablet/mobile)

## Struktur File
📂 Tugas
 ├── 📂 assets          # Berisi gambar atau file pendukung lainnya
 ├── 📄 app.js          # Logika aplikasi
 ├── 📄 index.html      # Halaman utama
 ├── 📄 README.md       # Dokumentasi repository
 ├── 📄 style.css       # Styling dan tema
