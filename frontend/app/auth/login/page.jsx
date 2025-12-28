'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {

  const router = useRouter();
  const [role, setRole] = useState('user'); //default
  
  const handleLogin = (e) => {
    e.preventDefault();
    // logic auth backend
    // cm simulasi redirect aja
    if (role === 'admin') {
      router.push('/admin'); 
    } else {
      router.push('/');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌿</div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Masuk untuk memantau jejak karbonmu.</p>
        </div>
  
      
        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          <button 
            onClick={() => setRole('user')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'user' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
          >
            Pegawai (User)
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
          >
            Admin / Spv
          </button>
        </div>
  
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
            <input type="email" placeholder="nama@kantor.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none" required />
          </div>
  
          <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all">
            Login as {role === 'user' ? 'User' : 'Admin'}
          </button>
        </form>
  
        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun? <Link href="/auth/register" className="text-slate-900 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;