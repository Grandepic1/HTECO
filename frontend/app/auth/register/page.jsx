'use client';
import Link from 'next/link';

const RegisterPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌿</div>
          <h1 className="text-2xl font-bold text-slate-800">Buat Akun Baru</h1>
          <p className="text-slate-500 text-sm">Mulai perjalanan hijau perusahaanmu.</p>
        </div>
  
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nama Lengkap</label>
            <input type="text" placeholder="Alex John" className="input-field" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Kantor</label>
            <input type="email" placeholder="alex@company.com" className="input-field" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="input-field" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Konfirmasi Password</label>
            <input type="password" placeholder="••••••••" className="input-field" required />
          </div>
  
          <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all mt-4">
            Daftar Sekarang
          </button>
        </form>
  
        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun? <Link href="/auth/login" className="text-slate-900 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;