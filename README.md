# EduTrack: Platform Kolaborasi Pembelajaran

## Ikhtisar Aplikasi

EduTrack adalah platform web yang dirancang untuk membantu mahasiswa mengelola dan memantau aktivitas belajar mereka, sekaligus memberikan akses bagi dosen untuk memantau perkembangan akademik secara real-time. Aplikasi ini bertujuan untuk menciptakan ekosistem pembelajaran daring yang transparan, kolaboratif, dan terstruktur, mendorong disiplin mahasiswa, dan memudahkan dosen dalam monitoring akademik secara digital.

## Fitur Utama

* **Catat Aktivitas**: Mahasiswa dapat menyimpan dan mengelola progres belajar mereka setiap hari dengan mudah dan rapi.
* **Komentar & Umpan Balik**: Memungkinkan diskusi materi dan penerimaan komentar dari dosen maupun mahasiswa lain.
* **Visualisasi Progres**: Pantau performa akademik melalui grafik yang informatif dan menarik (fitur ini disebutkan dalam deskripsi, namun implementasinya tidak sepenuhnya terlihat dalam kode yang diberikan).
* **Sistem Post (Rangkuman)**: Pengguna dapat membuat, melihat, menyukai, tidak menyukai, dan mengomentari rangkuman pembelajaran.
* **Rekomendasi Dosen**: Dosen memiliki kemampuan untuk merekomendasikan rangkuman tertentu, yang kemudian akan muncul di bagian "Terpopuler".
* **Profil Pengguna**: Pengguna dapat melihat dan memperbarui informasi profil mereka, termasuk mengubah password.
* **Autentikasi Pengguna**: Sistem login dan registrasi yang aman.

## Struktur Folder Frontend (React + Vite)

Struktur folder aplikasi ini diatur untuk memisahkan logika, UI, dan halaman, membuatnya mudah untuk dikelola dan diskalakan:

```
src/
├── assets/
│   ├── components/  // Komponen UI kustom seperti Button, ButtonWithIcon, CommentSection, Postcard
│   ├── css/         // File CSS utama, termasuk konfigurasi Tailwind
│   └── images/      // Aset gambar
├── components/
│   ├── layout/      // Komponen tata letak (misalnya, Layout.jsx)
│   └── ui/          // Komponen UI yang dapat digunakan kembali dari shadcn/ui (Button, Card, Input, dll.)
│   └── utils/       // Utilitas seperti apiRequest untuk panggilan API
├── config/          // Konfigurasi aplikasi (misalnya, URL dasar API)
├── hooks/           // Custom React Hooks untuk logika stateful (useAuth, useComments, usePostInteraction, usePostRecommendation, usePosts, useProfile)
├── lib/             // File utilitas umum (misalnya, cn untuk Tailwind CSS)
├── pages/
│   ├── authenticated/ // Halaman yang memerlukan autentikasi
│   │   ├── AddPost.jsx
│   │   ├── Index.jsx (Detail Post)
│   │   ├── MyPostsPage.jsx
│   │   ├── PostListPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── RecommendedPostsPage.jsx
│   ├── App.jsx      // Komponen utama aplikasi, mengelola routing
│   ├── LandingPage.jsx // Halaman landing (belum terautentikasi)
│   ├── Login.jsx    // Halaman login
│   └── Register.jsx // Halaman registrasi
├── routes/          // Komponen untuk mengelola rute (ProtectedRoute, RedirectToHome)
└── main.jsx         // Entry point aplikasi React
```

## Teknologi Frontend

* **React**: Pustaka JavaScript untuk membangun antarmuka pengguna.
* **Vite**: Alat build frontend yang cepat dan ringan.
* **Tailwind CSS**: Kerangka kerja CSS untuk styling utility-first.
* **Shadcn/ui**: Kumpulan komponen UI yang dapat disesuaikan dan dapat digunakan kembali.
* **React Router DOM**: Untuk manajemen routing di aplikasi React.
* **Zod & React Hook Form**: Untuk validasi formulir dan manajemen state formulir.
* **Sonner**: Pustaka untuk menampilkan notifikasi toast.
* **Lucide React & React Icons**: Kumpulan ikon.
* **Classnames & Clsx**: Untuk mengelola nama kelas CSS secara kondisional.

## Custom Hooks

Aplikasi ini menggunakan beberapa custom hooks untuk mengelola logika stateful dan interaksi API:

* **`useAuth.js`**: Mengelola state autentikasi pengguna (login, register, logout, update profil, ganti password, mendapatkan profil).
* **`useComments.js`**: Mengelola komentar untuk sebuah post (mengambil dan menambahkan komentar).
* **`usePostInteraction.js`**: Menangani interaksi like dan dislike pada post.
* **`usePostRecommendation.js`**: Mengelola fungsionalitas rekomendasi post oleh dosen (merekomendasikan dan membatalkan rekomendasi).
* **`usePosts.js`**: Mengelola data post (mengambil semua post, post berdasarkan ID, membuat post, like/dislike post).
* **`useProfile.js`**: Mengambil dan memperbarui informasi profil pengguna.

## Panggilan API

Semua interaksi dengan backend dilakukan melalui fungsi `apiRequest` yang berada di `src/components/utils/api.js`. Fungsi ini secara otomatis menambahkan header `Authorization` dengan token JWT jika tersedia, dan menangani respons serta kesalahan API. URL dasar API dikonfigurasi di `src/config/api.js`.

## Cara Menjalankan Aplikasi

1.  **Instal Dependensi**:
    ```bash
    npm install
    ```
2.  **Jalankan Mode Pengembangan**:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).
3.  **Bangun untuk Produksi**:
    ```bash
    npm run build
    ```
    Ini akan mengkompilasi aplikasi ke folder `dist/`.
4.  **Pratinjau Hasil Build**:
    ```bash
    npm run preview
    ```
    Ini akan melayani hasil build untuk pratinjau lokal.

## Hak Cipta

© 2025 EduTrack. Hak cipta dilindungi undang-undang. Dibuat oleh Boy Sandro Sigiro.
