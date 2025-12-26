import Link from 'next/link';
import Button from '../ui/Button';

const AdminNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-6 h-14 flex items-center justify-center text-white">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <Link href="/admin/dashboard" className="font-bold text-lg flex items-center gap-2">
          <span>🛡️</span> HTECO <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-normal">ADMIN</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm">
           <Link href="/admin/dashboard" className="hover:text-emerald-400 transition-colors">Monitoring</Link>
           <Link href="/admin/users" className="hover:text-emerald-400 transition-colors">Users</Link>
           <Link href="/admin/master" className="hover:text-emerald-400 transition-colors">Master Data</Link>
           <div className="w-px h-4 bg-slate-700"></div>
           <Link href="/auth/login" className="text-red-400 hover:text-red-300">Logout</Link>
        </div>
      </div>
    </nav>
  );
};
export default AdminNavbar;