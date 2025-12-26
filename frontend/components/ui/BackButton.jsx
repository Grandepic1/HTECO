import Link from 'next/link';

export default function DashboardBackButton() {
  return (
    <Link 
      href="/dashboard" 
      className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6 font-medium group"
    >
      <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-slate-400 group-hover:scale-105 transition-all shadow-sm">
        ←
      </span>
    </Link>
  );
}