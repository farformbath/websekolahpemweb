"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  dataSekolah,
  daftarBerita as initialBerita,
} from "../../components/school-content";

const initialGuru = dataSekolah.tenagaPendidik || [];
const initialSarpras = dataSekolah.sarprasDetail || [];

// Data awal pendaftar PPDB SMANDA (Realistis Kutoarjo & Purworejo)
const defaultPendaftarPPDB = [
  {
    id: "REG-2026-001",
    nama: "Muhammad Rizky Pratama",
    nisn: "0089123456",
    asalSekolah: "SMP Negeri 1 Kutoarjo",
    jalur: "Zonasi",
    nilaiRapor: 89.4,
    jarakZonasi: "450 m",
    berkas: ["Kartu Keluarga", "Surat Keterangan Lulus", "Akta Kelahiran"],
    status: "Diterima",
    tanggal: "2026-10-18",
    catatan: "Berkas lengkap sesuai zonasi ring 1 Kutoarjo.",
  },
  {
    id: "REG-2026-002",
    nama: "Anindya Ayu Kirana",
    nisn: "0087456123",
    asalSekolah: "SMP Negeri 2 Kutoarjo",
    jalur: "Prestasi",
    nilaiRapor: 93.8,
    jarakZonasi: "1.8 km",
    berkas: ["Buku Rapor", "Sertifikat OSN Matematika Kab.", "Ijazah SMP"],
    status: "Diterima",
    tanggal: "2026-10-19",
    catatan: "Juara 1 OSN Matematika Tingkat Kabupaten Purworejo.",
  },
  {
    id: "REG-2026-003",
    nama: "Bagas Satria Wibowo",
    nisn: "0082345678",
    asalSekolah: "SMP Negeri 1 Purworejo",
    jalur: "Zonasi",
    nilaiRapor: 86.2,
    jarakZonasi: "1.1 km",
    berkas: ["Kartu Keluarga", "Surat Keterangan Lulus"],
    status: "Menunggu Verifikasi",
    tanggal: "2026-10-21",
    catatan: "Menunggu validasi keabsahan KK 1 tahun domisili.",
  },
  {
    id: "REG-2026-004",
    nama: "Citra Dewi Lestari",
    nisn: "0083456789",
    asalSekolah: "SMP Negeri 3 Kutoarjo",
    jalur: "Afirmasi",
    nilaiRapor: 88.0,
    jarakZonasi: "2.3 km",
    berkas: ["Kartu Indonesia Pintar (KIP)", "Kartu Keluarga", "SKL"],
    status: "Diterima",
    tanggal: "2026-10-20",
    catatan: "Terverifikasi penerima Program Indonesia Pintar (PIP).",
  },
  {
    id: "REG-2026-005",
    nama: "Dimas Arya Pangestu",
    nisn: "0084567890",
    asalSekolah: "SMP Negeri 1 Kemiri",
    jalur: "Prestasi",
    nilaiRapor: 91.5,
    jarakZonasi: "4.5 km",
    berkas: ["Buku Rapor", "Piagam POPDA Atletik"],
    status: "Menunggu Verifikasi",
    tanggal: "2026-10-21",
    catatan: "Sertifikat POPDA sedang dalam antrean verifikasi panitia.",
  },
  {
    id: "REG-2026-006",
    nama: "Fadhilah Nur Rahma",
    nisn: "0085678901",
    asalSekolah: "MTs Negeri 1 Purworejo",
    jalur: "Zonasi",
    nilaiRapor: 87.7,
    jarakZonasi: "850 m",
    berkas: ["Kartu Keluarga", "SKL", "Akta Kelahiran"],
    status: "Perlu Perbaikan",
    tanggal: "2026-10-20",
    catatan: "Scan Akta Kelahiran buram, mohon unggah ulang berkas asli.",
  },
  {
    id: "REG-2026-007",
    nama: "Gilang Ramadhan",
    nisn: "0086789012",
    asalSekolah: "SMP Negeri 1 Butuh",
    jalur: "Perpindahan Tugas",
    nilaiRapor: 85.0,
    jarakZonasi: "3.2 km",
    berkas: ["SK Pindah Tugas Orang Tua (TNI)", "KK Baru", "SKL"],
    status: "Diterima",
    tanggal: "2026-10-19",
    catatan: "SK Mutasi Kodim 0708 Purworejo sah dan terverifikasi.",
  },
  {
    id: "REG-2026-008",
    nama: "Hafiz Kurniawan",
    nisn: "0087890123",
    asalSekolah: "SMP IT Sahabat Purworejo",
    jalur: "Zonasi",
    nilaiRapor: 83.5,
    jarakZonasi: "6.8 km",
    berkas: ["Kartu Keluarga"],
    status: "Ditolak",
    tanggal: "2026-10-18",
    catatan: "Alamat domisili di luar batas zonasi administratif SMANDA.",
  },
];

const defaultGuruList = initialGuru.map((g, idx) => ({
  id: `G-${idx + 1}`,
  nama: g.nama,
  nip: `197${5 + idx}0812 200${idx + 1}01 1 00${idx + 1}`,
  mapel: g.mapel,
  status: idx % 4 === 0 ? "PPPK" : "PNS (ASN)",
  sertifikasi: "Sudah Sertifikasi",
  kehadiran: "Hadir (06.45 WIB)",
  foto: g.foto,
}));

const defaultTendikList = [
  {
    id: "T-1",
    nama: "Slamet Rahardjo, S.Kom",
    nip: "19830415 201001 1 012",
    mapel: "Kepala Laboratorium Komputer & TIK",
    status: "PNS (ASN)",
    sertifikasi: "Tendik TIK",
    kehadiran: "Hadir (06.30 WIB)",
    foto: "/assets/teachers/guru-amin.jpg",
  },
  {
    id: "T-2",
    nama: "Sri Wahyuningsih, A.Md",
    nip: "19871120 201402 2 004",
    mapel: "Administrasi Persuratan & Tata Usaha",
    status: "PNS (ASN)",
    sertifikasi: "Tendik Administrasi",
    kehadiran: "Hadir (06.50 WIB)",
    foto: "/assets/teachers/guru-ida.jpg",
  },
  {
    id: "T-3",
    nama: "Eko Prasetyo, S.Ptk",
    nip: "19920311 202221 1 008",
    mapel: "Pengelola Perpustakaan Digital",
    status: "PPPK",
    sertifikasi: "Pustakawan Ahli",
    kehadiran: "Hadir (06.40 WIB)",
    foto: "/assets/teachers/guru-antonius.jpg",
  },
];

function AdminSkeleton() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold tracking-wider uppercase">
          Memuat Sistem SIM SMANDA...
        </span>
      </div>
    </div>
  );
}

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "ringkasan";

  // Tab & Sidebar State
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Theme State: "light" | "dark"
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("sim_smanda_theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("sim_smanda_theme", nextTheme);
  };

  // Sync tab with URL
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
    router.push(`/admin?tab=${tabId}`, { scroll: false });
  };

  // State Data
  const [pendaftar, setPendaftar] = useState(defaultPendaftarPPDB);
  const [beritaList, setBeritaList] = useState(initialBerita);
  const [guruList, setGuruList] = useState([...defaultGuruList, ...defaultTendikList]);
  const [sarpras, setSarpras] = useState(
    initialSarpras.map((s, i) => ({
      ...s,
      id: `SP-${i + 1}`,
      kondisi: i === 6 ? "Perlu Pemeliharaan" : "Kondisi Baik",
      penanggungJawab: i % 2 === 0 ? "Tim Sarpras SMANDA" : "Laboran Terkait",
      terakhirCek: "20 Oktober 2026",
    }))
  );

  // Toast State
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Modal States
  const [selectedPendaftar, setSelectedPendaftar] = useState(null);
  const [isBeritaModalOpen, setIsBeritaModalOpen] = useState(false);
  const [isGuruModalOpen, setIsGuruModalOpen] = useState(false);

  // Form States
  const [newBerita, setNewBerita] = useState({
    judul: "",
    kategori: "Kegiatan Sekolah",
    penulis: "Humas SMANDA",
    ringkasan: "",
    status: "Published",
  });

  const [newGuru, setNewGuru] = useState({
    nama: "",
    nip: "",
    mapel: "",
    status: "PNS (ASN)",
    sertifikasi: "Sudah Sertifikasi",
  });

  // Search & Filter States
  const [searchPPDB, setSearchPPDB] = useState("");
  const [filterJalur, setFilterJalur] = useState("Semua");
  const [filterStatusPPDB, setFilterStatusPPDB] = useState("Semua");

  const [searchBerita, setSearchBerita] = useState("");
  const [filterKategoriBerita, setFilterKategoriBerita] = useState("Semua");

  const [searchGuru, setSearchGuru] = useState("");

  // Statistics
  const stats = useMemo(() => {
    const totalSiswa = 1080;
    const totalGuru = guruList.length;
    const totalPendaftar = pendaftar.length;
    const pendingPPDB = pendaftar.filter((p) => p.status === "Menunggu Verifikasi").length;
    const diterimaPPDB = pendaftar.filter((p) => p.status === "Diterima").length;
    const perbaikanPPDB = pendaftar.filter((p) => p.status === "Perlu Perbaikan").length;
    const ditolakPPDB = pendaftar.filter((p) => p.status === "Ditolak").length;

    return {
      totalSiswa,
      totalGuru,
      totalPendaftar,
      pendingPPDB,
      diterimaPPDB,
      perbaikanPPDB,
      ditolakPPDB,
      totalBerita: beritaList.length,
      totalSarpras: sarpras.length,
    };
  }, [pendaftar, guruList, beritaList, sarpras]);

  // Filtered Lists
  const filteredPPDB = useMemo(() => {
    return pendaftar.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchPPDB.toLowerCase()) ||
        item.id.toLowerCase().includes(searchPPDB.toLowerCase()) ||
        item.asalSekolah.toLowerCase().includes(searchPPDB.toLowerCase()) ||
        item.nisn.includes(searchPPDB);
      const matchJalur = filterJalur === "Semua" || item.jalur === filterJalur;
      const matchStatus = filterStatusPPDB === "Semua" || item.status === filterStatusPPDB;
      return matchSearch && matchJalur && matchStatus;
    });
  }, [pendaftar, searchPPDB, filterJalur, filterStatusPPDB]);

  const filteredBerita = useMemo(() => {
    return beritaList.filter((item) => {
      const matchSearch =
        item.judul.toLowerCase().includes(searchBerita.toLowerCase()) ||
        item.ringkasan.toLowerCase().includes(searchBerita.toLowerCase());
      const matchKategori =
        filterKategoriBerita === "Semua" || item.kategori === filterKategoriBerita;
      return matchSearch && matchKategori;
    });
  }, [beritaList, searchBerita, filterKategoriBerita]);

  const filteredGuru = useMemo(() => {
    return guruList.filter((item) => {
      return (
        item.nama.toLowerCase().includes(searchGuru.toLowerCase()) ||
        item.mapel.toLowerCase().includes(searchGuru.toLowerCase()) ||
        item.nip.includes(searchGuru)
      );
    });
  }, [guruList, searchGuru]);

  // Action Handlers
  const handleUpdateStatusPPDB = (id, newStatus, reason = "") => {
    setPendaftar((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            catatan: reason || item.catatan,
          };
        }
        return item;
      })
    );
    if (selectedPendaftar && selectedPendaftar.id === id) {
      setSelectedPendaftar((prev) => ({
        ...prev,
        status: newStatus,
        catatan: reason || prev.catatan,
      }));
    }
    showToast(`Status calon peserta didik ${id} diubah menjadi "${newStatus}"`);
  };

  const handleAddBerita = (e) => {
    e.preventDefault();
    if (!newBerita.judul || !newBerita.ringkasan) {
      showToast("Judul dan ringkasan berita wajib diisi!", "error");
      return;
    }
    const slug = newBerita.judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const itemBaru = {
      id: String(Date.now()),
      slug: slug || `berita-${Date.now()}`,
      judul: newBerita.judul,
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kategori: newBerita.kategori,
      ringkasan: newBerita.ringkasan,
      penulis: newBerita.penulis || "Humas SMANDA",
      gambar: "/assets/campus-hero.png",
      konten: [newBerita.ringkasan],
      views: 1,
      status: newBerita.status,
    };

    setBeritaList([itemBaru, ...beritaList]);
    setIsBeritaModalOpen(false);
    setNewBerita({
      judul: "",
      kategori: "Kegiatan Sekolah",
      penulis: "Humas SMANDA",
      ringkasan: "",
      status: "Published",
    });
    showToast("Warta baru berhasil diterbitkan!");
  };

  const handleDeleteBerita = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel warta ini?")) {
      setBeritaList(beritaList.filter((b) => b.id !== id));
      showToast("Artikel warta berhasil dihapus.");
    }
  };

  const handleAddGuru = (e) => {
    e.preventDefault();
    if (!newGuru.nama || !newGuru.mapel) {
      showToast("Nama dan Mata Pelajaran wajib diisi!", "error");
      return;
    }
    const itemBaru = {
      id: `G-${Date.now()}`,
      nama: newGuru.nama,
      nip: newGuru.nip || "-",
      mapel: newGuru.mapel,
      status: newGuru.status,
      sertifikasi: newGuru.sertifikasi,
      kehadiran: "Hadir (06.50 WIB)",
      foto: "/assets/teachers/guru-amin.jpg",
    };
    setGuruList([itemBaru, ...guruList]);
    setIsGuruModalOpen(false);
    setNewGuru({
      nama: "",
      nip: "",
      mapel: "",
      status: "PNS (ASN)",
      sertifikasi: "Sudah Sertifikasi",
    });
    showToast(`Data pendidik/tendik ${itemBaru.nama} berhasil didaftarkan!`);
  };

  const handleDeleteGuru = (id) => {
    if (confirm("Hapus data pendidik/tendik ini dari direktori?")) {
      setGuruList(guruList.filter((g) => g.id !== id));
      showToast("Data pendidik/tendik berhasil dihapus.");
    }
  };

  const handleToggleSarpras = (id) => {
    setSarpras((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextKondisi =
            item.kondisi === "Kondisi Baik" ? "Perlu Pemeliharaan" : "Kondisi Baik";
          return { ...item, kondisi: nextKondisi };
        }
        return item;
      })
    );
    showToast("Status sarpras berhasil diperbarui.");
  };

  // Nav Menu items
  const navMenuItems = [
    {
      id: "ringkasan",
      label: "Ringkasan",
      sub: "Overview & Metrik",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "ppdb",
      label: "Verifikasi PPDB",
      sub: "Seleksi Peserta Didik Baru",
      badge: stats.pendingPPDB > 0 ? stats.pendingPPDB : null,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: "berita",
      label: "Kelola Warta",
      sub: "Publikasi Artikel Sekolah",
      badge: stats.totalBerita,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      id: "guru",
      label: "Data Guru & PTK",
      sub: "Direktori Pendidik SMANDA",
      badge: stats.totalGuru,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: "sarpras",
      label: "Sarana & Prasarana",
      sub: "Inventaris Gedung & Lab",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: "pengaturan",
      label: "Profil & Lembaga",
      sub: "NPSN & Konfigurasi",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-[100dvh] overflow-hidden bg-slate-100/80 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
        
        {/* Toast Alert */}
        {toast && (
          <div
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
              toast.type === "error"
                ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/90 dark:text-rose-200 dark:border-rose-800"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-800"
            }`}
          >
            <span>{toast.type === "error" ? "⚠️" : "✅"}</span>
            <span>{toast.message}</span>
          </div>
        )}

        {/* Sidebar Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* ========================================================
            SIDEBAR NAVIGATION
            ======================================================== */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-68 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-in-out shrink-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shadow-xs">
                <img
                  src="/assets/logo-sekolah.png"
                  alt="Logo SMANDA"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs tracking-tight text-slate-900 dark:text-white">
                    SIM SMANDA
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                    ADMIN
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  SMAN 2 Purworejo
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          {/* Academic Year Pill */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Semester Ganjil:</span>
            <span className="font-bold text-blue-700 dark:text-amber-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              TA 2026/2027
            </span>
          </div>

          {/* Navigation Menus */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Modul Administrasi
            </div>
            {navMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-white" : "text-slate-400 dark:text-slate-400"}>
                      {item.icon}
                    </span>
                    <div className="text-left">
                      <div className="leading-tight">{item.label}</div>
                      <div
                        className={`text-[10px] font-normal leading-tight ${
                          isActive ? "text-blue-100" : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-blue-700"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-blue-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 space-y-2.5">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                SM
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Dra. Setyo M., M.Pd.B.I
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Plt. Kepala Sekolah
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Portal Publik Sekolah
            </Link>
          </div>
        </aside>

        {/* ========================================================
            MAIN CONTENT AREA
            ======================================================== */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* Top Header Bar */}
          <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Buka Menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-medium">SIM SMANDA</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="font-bold text-slate-900 dark:text-white capitalize">{activeTab}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              
              {/* THEME SWITCHER (Mode Siang & Malam) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === "dark" ? "Ganti ke Mode Siang" : "Ganti ke Mode Malam"}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                {theme === "dark" ? (
                  <>
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="hidden sm:inline text-[11px]">Mode Siang</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="hidden sm:inline text-[11px]">Mode Malam</span>
                  </>
                )}
              </button>

              {/* Contextual Action Buttons */}
              {activeTab === "ppdb" && (
                <button
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Cetak Rekap
                </button>
              )}

              {activeTab === "berita" && (
                <button
                  onClick={() => setIsBeritaModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-2xs"
                >
                  <span>+</span> Tulis Warta
                </button>
              )}

              {activeTab === "guru" && (
                <button
                  onClick={() => setIsGuruModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-2xs"
                >
                  <span>+</span> Tambah PTK
                </button>
              )}

              {/* Date Indicator */}
              <div className="hidden md:flex flex-col text-right pl-2 border-l border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Zona WIB • Kutoarjo
                </span>
              </div>
            </div>
          </header>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            {/* ========================================================
                TAB 1: RINGKASAN (OVERVIEW)
                (No AI Slop Banner - Crisp Executive Overview)
                ======================================================== */}
            {activeTab === "ringkasan" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* Executive Overview Header Bar (Replaced AI-Slop Hero Banner) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Ringkasan Operasional Sekolah
                      </h1>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Sinkron Dapodik: Aktif
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      SMA Negeri 2 Purworejo • NPSN: 20306155 • Akreditasi A (Unggul)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTabChange("ppdb")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      <span>Verifikasi PPDB</span>
                      {stats.pendingPPDB > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                          {stats.pendingPPDB}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleTabChange("berita")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      Warta Sekolah
                    </button>
                  </div>
                </div>

                {/* 4 Crisp KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* Card 1 */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Peserta Didik Aktif
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">👥</span>
                    </div>
                    <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                      {stats.totalSiswa.toLocaleString("id-ID")}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>27 Rombel (Fase E & F)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Terdaftar</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Pendidik & Tendik
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400">👨‍🏫</span>
                    </div>
                    <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                      {stats.totalGuru}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Guru ASN & PPPK</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Hadir Pagi: {stats.totalGuru}</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Pendaftar PPDB Masuk
                      </span>
                      <span className="text-amber-500 dark:text-amber-400">📋</span>
                    </div>
                    <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                      {stats.totalPendaftar}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Diterima: {stats.diterimaPPDB}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">Pending: {stats.pendingPPDB}</span>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Ruang & Sarpras
                      </span>
                      <span className="text-purple-600 dark:text-purple-400">🏫</span>
                    </div>
                    <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                      {stats.totalSarpras} Unit
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Kelas & 5 Lab TIK/IPA</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Kondisi Baik: 95%</span>
                    </div>
                  </div>
                </div>

                {/* Progress & Quick Activities Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* PPDB Quota Allocation (2 cols) */}
                  <div className="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Alokasi Kuota & Daya Tampung PPDB 2026/2027
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Target daya tampung resmi: 360 Peserta Didik Baru (10 Rombel)
                        </p>
                      </div>
                      <button
                        onClick={() => handleTabChange("ppdb")}
                        className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                      >
                        Buka Seleksi →
                      </button>
                    </div>

                    <div className="space-y-3 pt-1">
                      {/* Zonasi */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-200">1. Jalur Zonasi (Min. 55%)</span>
                          <span className="text-blue-600 dark:text-blue-400 font-mono">198 / 198 Kursi Terpenuhi</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full w-[100%]" />
                        </div>
                      </div>

                      {/* Afirmasi */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-200">2. Jalur Afirmasi (Min. 20%)</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono">68 / 72 Kursi (94%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
                        </div>
                      </div>

                      {/* Prestasi */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-200">3. Jalur Prestasi (Maks. 20%)</span>
                          <span className="text-amber-600 dark:text-amber-400 font-mono">72 / 72 Kursi (100%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[100%]" />
                        </div>
                      </div>

                      {/* Pindah Tugas */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-200">4. Jalur Perpindahan Tugas (Maks. 5%)</span>
                          <span className="text-purple-600 dark:text-purple-400 font-mono">14 / 18 Kursi (77%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full w-[77%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Agenda Log (1 col) */}
                  <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Agenda & Notifikasi Resmi
                      </h2>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/20">
                        Aktif
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                          Transparansi Dana BOSP
                        </div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          Laporan Realisasi BOSP Tahap 1 2026 Terbit
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          Status: Dipublikasi di Papan Informasi
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                          Olimpiade Sains Nasional
                        </div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          10 Duta OSN Melaju ke Tingkat Provinsi
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          Pembinaan Intensif Cabang MIPA & Astronomi
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                          Kurikulum Merdeka
                        </div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          Gelar Karya Projek P5 Berkelanjutan
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          Tema Adiwiyata & Pelestarian Lingkungan
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Recent Verification Queue Table */}
                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3.5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Antrean Verifikasi Berkas PPDB Terkini
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Calon peserta didik baru yang memerlukan validasi berkas fisik / digital
                      </p>
                    </div>
                    <button
                      onClick={() => handleTabChange("ppdb")}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20 transition-all cursor-pointer"
                    >
                      Lihat Semua ({stats.totalPendaftar} Pendaftar)
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">No. Registrasi</th>
                          <th className="py-2.5 px-3">Nama Lengkap</th>
                          <th className="py-2.5 px-3">Asal Sekolah</th>
                          <th className="py-2.5 px-3">Jalur</th>
                          <th className="py-2.5 px-3">Nilai / Jarak</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {pendaftar.slice(0, 5).map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                              {item.id}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                              {item.nama}
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{item.asalSekolah}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                {item.jalur}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono">
                              {item.jalur === "Zonasi" ? item.jarakZonasi : `${item.nilaiRapor}`}
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status === "Diterima"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                                    : item.status === "Menunggu Verifikasi"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30"
                                    : item.status === "Perlu Perbaikan"
                                    ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30"
                                    : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => setSelectedPendaftar(item)}
                                className="px-2.5 py-1 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20 cursor-pointer"
                              >
                                Periksa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 2: VERIFIKASI PPDB
                ======================================================== */}
            {activeTab === "ppdb" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Verifikasi & Administrasi PPDB Online 2026/2027
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pelayanan berkas digital calon peserta didik SMA Negeri 2 Purworejo.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const csvContent =
                        "data:text/csv;charset=utf-8," +
                        ["No Registrasi,Nama,Asal Sekolah,Jalur,Nilai Rapor,Jarak Zonasi,Status"]
                          .concat(
                            filteredPPDB.map(
                              (p) =>
                                `"${p.id}","${p.nama}","${p.asalSekolah}","${p.jalur}","${p.nilaiRapor}","${p.jarakZonasi}","${p.status}"`
                            )
                          )
                          .join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "rekap-ppdb-smanda-2026.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      showToast("Rekap data PPDB berhasil diunduh (CSV)");
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs self-start md:self-auto"
                  >
                    <span>📥</span> Unduh CSV
                  </button>
                </div>

                {/* Filter Controls */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <div className="lg:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      Cari Pendaftar
                    </label>
                    <input
                      type="text"
                      value={searchPPDB}
                      onChange={(e) => setSearchPPDB(e.target.value)}
                      placeholder="Ketik nama siswa, NISN, no registrasi, atau asal SMP..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      Jalur Seleksi
                    </label>
                    <select
                      value={filterJalur}
                      onChange={(e) => setFilterJalur(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Semua">Semua Jalur</option>
                      <option value="Zonasi">Zonasi</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Afirmasi">Afirmasi</option>
                      <option value="Perpindahan Tugas">Perpindahan Tugas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      Status Berkas
                    </label>
                    <select
                      value={filterStatusPPDB}
                      onChange={(e) => setFilterStatusPPDB(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                </div>

                {/* Table PPDB */}
                <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      Ditemukan <strong className="text-slate-900 dark:text-white">{filteredPPDB.length}</strong> calon siswa
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Diterima
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" /> Menunggu
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Ditolak
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">No. Registrasi</th>
                          <th className="py-2.5 px-3">Nama Siswa</th>
                          <th className="py-2.5 px-3">Asal Sekolah</th>
                          <th className="py-2.5 px-3">Jalur</th>
                          <th className="py-2.5 px-3">Nilai / Jarak</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {filteredPPDB.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-6 text-center text-slate-400">
                              Tidak ada data yang sesuai filter pencarian.
                            </td>
                          </tr>
                        ) : (
                          filteredPPDB.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                                {item.id}
                                <div className="text-[10px] text-slate-400 font-normal">
                                  NISN: {item.nisn}
                                </div>
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="font-semibold text-slate-900 dark:text-white">{item.nama}</div>
                                <div className="text-[10px] text-slate-400">
                                  Daftar: {item.tanggal}
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                                {item.asalSekolah}
                              </td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                  {item.jalur}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-mono">
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {item.jalur === "Zonasi" ? item.jarakZonasi : `Rapor: ${item.nilaiRapor}`}
                                </div>
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                                    item.status === "Diterima"
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                                      : item.status === "Menunggu Verifikasi"
                                      ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30"
                                      : item.status === "Perlu Perbaikan"
                                      ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30"
                                      : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedPendaftar(item)}
                                    className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                                  >
                                    Detail
                                  </button>
                                  {item.status !== "Diterima" && (
                                    <button
                                      onClick={() => handleUpdateStatusPPDB(item.id, "Diterima")}
                                      title="Terima Siswa"
                                      className="px-2 py-1 rounded-md text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 border border-emerald-200 dark:border-emerald-500/30 cursor-pointer"
                                    >
                                      ✓
                                    </button>
                                  )}
                                  {item.status !== "Ditolak" && (
                                    <button
                                      onClick={() => handleUpdateStatusPPDB(item.id, "Ditolak")}
                                      title="Tolak Berkas"
                                      className="px-2 py-1 rounded-md text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 dark:text-rose-400 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 border border-rose-200 dark:border-rose-500/30 cursor-pointer"
                                    >
                                      ✕
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 3: KELOLA WARTA (CMS)
                ======================================================== */}
            {activeTab === "berita" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Manajemen Warta & Publikasi Sekolah
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Kelola artikel prestasi, kegiatan kesiswaan, dan buletin resmi SMANDA.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBeritaModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer shadow-2xs self-start md:self-auto"
                  >
                    <span>+</span> Tulis Warta Baru
                  </button>
                </div>

                {/* Filter */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchBerita}
                      onChange={(e) => setSearchBerita(e.target.value)}
                      placeholder="Cari judul warta atau ringkasan..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="sm:w-56">
                    <select
                      value={filterKategoriBerita}
                      onChange={(e) => setFilterKategoriBerita(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Semua">Semua Kategori</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                      <option value="Publikasi">Publikasi</option>
                    </select>
                  </div>
                </div>

                {/* Grid Berita */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredBerita.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3 shadow-2xs"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                            {item.kategori}
                          </span>
                          <span className="text-slate-400 text-[10px]">{item.tanggal}</span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                          {item.judul}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {item.ringkasan}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">
                          Penulis: <strong className="text-slate-700 dark:text-slate-300">{item.penulis || "Humas"}</strong>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/informasi/berita/${item.slug}`}
                            target="_blank"
                            className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                          >
                            Lihat ↗
                          </Link>
                          <button
                            onClick={() => handleDeleteBerita(item.id)}
                            className="px-2 py-1 rounded-md text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 4: GURU & PTK
                ======================================================== */}
            {activeTab === "guru" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Direktori Pendidik & Tenaga Kependidikan (PTK)
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Basis data pendidik dan staf penunjang akademik SMA Negeri 2 Purworejo.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGuruModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer shadow-2xs self-start md:self-auto"
                  >
                    <span>+</span> Tambah PTK
                  </button>
                </div>

                {/* Search */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <input
                    type="text"
                    value={searchGuru}
                    onChange={(e) => setSearchGuru(e.target.value)}
                    placeholder="Cari nama guru, NIP, atau mata pelajaran..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Table */}
                <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">Personel</th>
                          <th className="py-2.5 px-3">NIP / NUPTK</th>
                          <th className="py-2.5 px-3">Penugasan / Mapel</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Presensi</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {filteredGuru.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700">
                                  <img
                                    src={item.foto || "/assets/teachers/guru-amin.jpg"}
                                    alt={item.nama}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">{item.nama}</div>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">{item.nip}</td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-200 font-medium">
                              {item.mapel}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                                {item.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1 w-max">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {item.kehadiran}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleDeleteGuru(item.id)}
                                className="px-2 py-1 rounded-md text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 cursor-pointer"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 5: SARPRAS
                ======================================================== */}
            {activeTab === "sarpras" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Inventaris Sarana & Prasarana Kampus
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Status fisik gedung, laboratorium, dan fasilitas belajar SMA Negeri 2 Purworejo.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {sarpras.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-400 text-[11px]">{item.id}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.kondisi === "Kondisi Baik"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                                : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30"
                            }`}
                          >
                            {item.kondisi}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">{item.nama}</h3>
                        <div className="mt-2.5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex justify-between">
                            <span>Kapasitas / Luas:</span>
                            <strong className="text-slate-700 dark:text-slate-200">{item.luas}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Jumlah:</span>
                            <strong className="text-slate-700 dark:text-slate-200">{item.jumlah}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Penanggung Jawab:</span>
                            <span className="text-slate-700 dark:text-slate-300">{item.penanggungJawab}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          Cek: {item.terakhirCek}
                        </span>
                        <button
                          onClick={() => handleToggleSarpras(item.id)}
                          className="px-2 py-1 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 cursor-pointer"
                        >
                          Ubah Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 6: PROFIL & PENGATURAN
                ======================================================== */}
            {activeTab === "pengaturan" && (
              <div className="space-y-4 max-w-3xl animate-in fade-in duration-150">
                <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Pengaturan & Profil Lembaga
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Konfigurasi data pokok SMA Negeri 2 Purworejo yang terhubung ke portal publik.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                    Identitas Pokok Sekolah (NPSN)
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Satuan Pendidikan</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.nama}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">NPSN</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.npsn}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Akreditasi</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.akreditasi}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Plt. Kepala Sekolah</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.kepalaSekolah.nama}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Alamat Kampus</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.alamat}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Email Resmi</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.email}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Telepon</label>
                      <input
                        type="text"
                        readOnly
                        value={dataSekolah.telepon}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Tersinkronisasi dengan Database Dapodik Kemendikbudristek
                    </span>
                    <button
                      onClick={() => {
                        setPendaftar(defaultPendaftarPPDB);
                        setBeritaList(initialBerita);
                        setGuruList([...defaultGuruList, ...defaultTendikList]);
                        showToast("Data demo berhasil di-reset ke nilai default!");
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 dark:text-amber-300 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 cursor-pointer"
                    >
                      Reset Data Demo
                    </button>
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>

        {/* ========================================================
            MODAL DETAIL PENDAFTAR PPDB
            ======================================================== */}
        {selectedPendaftar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    {selectedPendaftar.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedPendaftar.nama}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPendaftar(null)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">NISN:</span>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {selectedPendaftar.nisn}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Asal SMP:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedPendaftar.asalSekolah}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Jalur Pilihan:</span>
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {selectedPendaftar.jalur}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Nilai / Jarak:</span>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedPendaftar.jalur === "Zonasi"
                      ? selectedPendaftar.jarakZonasi
                      : `Nilai: ${selectedPendaftar.nilaiRapor}`}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">Kelengkapan Dokumen Digital:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedPendaftar.berkas.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                      >
                        <span className="text-emerald-500">✓</span> {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">Catatan Panitia:</span>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 mt-1 italic text-[11px]">
                    &ldquo;{selectedPendaftar.catatan}&rdquo;
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Status: <strong className="text-slate-900 dark:text-white">{selectedPendaftar.status}</strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateStatusPPDB(selectedPendaftar.id, "Diterima")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-2xs"
                  >
                    Terima Siswa
                  </button>
                  <button
                    onClick={() => {
                      const alasan = prompt(
                        "Masukkan catatan perbaikan berkas:",
                        "Mohon lengkapi fotokopi legalisir ijazah/SKL."
                      );
                      if (alasan) {
                        handleUpdateStatusPPDB(selectedPendaftar.id, "Perlu Perbaikan", alasan);
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    Minta Revisi
                  </button>
                  <button
                    onClick={() => handleUpdateStatusPPDB(selectedPendaftar.id, "Ditolak")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer shadow-2xs"
                  >
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL TAMBAH WARTA
            ======================================================== */}
        {isBeritaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-3.5 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Tulis Publikasi Warta SMANDA
                </h3>
                <button
                  onClick={() => setIsBeritaModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddBerita} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SMAN 2 Purworejo Raih Prestasi Gemilang..."
                    value={newBerita.judul}
                    onChange={(e) => setNewBerita({ ...newBerita, judul: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                    <select
                      value={newBerita.kategori}
                      onChange={(e) => setNewBerita({ ...newBerita, kategori: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Publikasi">Publikasi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Penulis</label>
                    <input
                      type="text"
                      value={newBerita.penulis}
                      onChange={(e) => setNewBerita({ ...newBerita, penulis: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ringkasan Berita</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tuliskan 1-2 paragraf ringkasan isi warta..."
                    value={newBerita.ringkasan}
                    onChange={(e) => setNewBerita({ ...newBerita, ringkasan: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBeritaModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Terbitkan Warta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL TAMBAH PTK
            ======================================================== */}
        {isGuruModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-3.5 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Tambah Pendidik / Tenaga Kependidikan
                </h3>
                <button
                  onClick={() => setIsGuruModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddGuru} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dra. Nur Hayati, M.Pd"
                    value={newGuru.nama}
                    onChange={(e) => setNewGuru({ ...newGuru, nama: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">NIP / NUPTK</label>
                  <input
                    type="text"
                    placeholder="Contoh: 19820512 200801 2 015"
                    value={newGuru.nip}
                    onChange={(e) => setNewGuru({ ...newGuru, nip: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mata Pelajaran / Tugas</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kimia & Pembina Karya Ilmiah"
                    value={newGuru.mapel}
                    onChange={(e) => setNewGuru({ ...newGuru, mapel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status Kepegawaian</label>
                    <select
                      value={newGuru.status}
                      onChange={(e) => setNewGuru({ ...newGuru, status: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="PNS (ASN)">PNS (ASN)</option>
                      <option value="PPPK">PPPK</option>
                      <option value="Guru Tidak Tetap (GTT)">Guru Tidak Tetap (GTT)</option>
                      <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sertifikasi</label>
                    <select
                      value={newGuru.sertifikasi}
                      onChange={(e) => setNewGuru({ ...newGuru, sertifikasi: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Sudah Sertifikasi">Sudah Sertifikasi</option>
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Belum Sertifikasi">Belum Sertifikasi</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsGuruModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan Data PTK
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
