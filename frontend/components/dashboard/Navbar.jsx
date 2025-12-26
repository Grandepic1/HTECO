import Link from 'next/link';
import Button from '../ui/Button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#F7F7F5]/80 backdrop-blur-md border-b border-slate-200 px-6 h-14 flex items-center justify-center">
      <div className="w-full max-w-4xl flex justify-between items-center">
        <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2">
          <span>🌿</span> HTECO
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex text-sm text-slate-500 gap-4 mr-4">
             <Link href="/dashboard" className="hover:text-slate-900">Home</Link>
             <Link href="/dashboard/insight" className="hover:text-slate-900">Laporan</Link>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
            U
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;