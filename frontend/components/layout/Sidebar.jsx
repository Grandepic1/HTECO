'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ role = 'user' }) => {
  const pathname = usePathname();

  const menus = [
    { name: 'Overview', href: '/dashboard', icon: '🍃' },
    { name: 'My Garage', href: '/vehicles', icon: '🏎️' },
    { name: 'Trip History', href: '/trips', icon: '📅' },
  ];

  return (
    <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-black/20 backdrop-blur-md flex flex-col z-50">
      <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hidden lg:block">
          EcoTrack.
        </h1>
        <span className="lg:hidden text-2xl">🌱</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menus.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
              pathname === item.href 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium hidden lg:block">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile Mini */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-black shadow-lg">
            {role.charAt(0).toUpperCase()}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-white">Pegawai</p>
            <p className="text-xs text-emerald-400">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;