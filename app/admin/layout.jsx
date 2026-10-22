export const metadata = {
  title: "Dashboard Admin – SMA Negeri 2 Purworejo",
  description: "Panel Administrasi dan Sistem Informasi Manajemen SMA Negeri 2 Purworejo (SMANDA Kutoarjo).",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {children}
    </div>
  );
}
