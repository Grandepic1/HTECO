import AdminNavbar from '@/components/admin/AdminNavbar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-800 font-sans">
      <AdminNavbar />
      <main className="max-w-5xl mx-auto px-6 py-10 pb-20">
        {children}
      </main>
    </div>
  );
}