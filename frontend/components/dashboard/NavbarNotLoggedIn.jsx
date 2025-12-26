import Link from 'next/link';
import Button from '../ui/Button';

const NavbarNotLoggedIn = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#F7F7F5]/80 backdrop-blur-md border-b border-slate-200 px-6 h-14 flex items-center justify-center">
      <div className="w-full max-w-4xl flex justify-between items-center">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
          <span>🌿</span> HTECO
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex text-sm text-slate-500 gap-4 mr-4">
             <Link href="/auth/login" className="hover:text-slate-900 hover:bg-slate-200 p-2 px-4 rounded-2xl bg-black text-slate-200 flex justify-center items-center">Login</Link>
             <Link href="/auth/register" className="hover:text-slate-200 hover:bg-slate-900 p-2 px-4 rounded-2xl border-2 bg-slate-100 text-slate-800">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default NavbarNotLoggedIn;