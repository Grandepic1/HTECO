'use client';
import { useState } from 'react';
import Card from '@/components/ui/Card';

const UsersPage = () => {

  const [users, setUsers] = useState([
    { id: 1, name: 'Alex John', email: 'alex@gmail.com', joinedAt: '12 Des 2025', status: 'Active', total_trips: 45 },
    { id: 2, name: 'Sarah Connor', email: 'sarah@outlook.com', joinedAt: '10 Nov 2025', status: 'Inactive', total_trips: 12 },
    { id: 3, name: 'Michael Doe', email: 'mike@yahoo.com', joinedAt: '01 Jan 2025', status: 'Active', total_trips: 0 },
  ]);
  
  const toggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
  };
  
  const deleteUser = (id) => {
    if(confirm('Hapus user ini? Semua data perjalanan mereka akan hilang.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kelola Pengguna</h1>
          <p className="text-slate-500">Monitor aktivitas dan status akun pengguna terdaftar.</p>
        </div>
        <div className="text-sm text-slate-500">
          Total Users: <span className="font-bold text-slate-900">{users.length}</span>
        </div>
      </div>
  
      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 font-semibold text-slate-600">Nama User</th>
              {/* Kolom Baru: Menggantikan Role */}
              <th className="py-4 px-6 font-semibold text-slate-600">Bergabung Sejak</th>
              <th className="py-4 px-6 font-semibold text-slate-600">Status</th>
              <th className="py-4 px-6 font-semibold text-slate-600 text-right">Total Trip</th>
              <th className="py-4 px-6 font-semibold text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 group">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </td>
                
                {/* Data Kolom Baru */}
                <td className="py-4 px-6">
                  <span className="text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded text-xs">
                    📅 {user.joinedAt}
                  </span>
                </td>
  
                <td className="py-4 px-6">
                  <button 
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                      user.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    {user.status === 'Active' ? 'Active ●' : 'Inactive ○'}
                  </button>
                </td>
                <td className="py-4 px-6 text-right font-mono text-slate-600">
                  {user.total_trips}
                </td>
                <td className="py-4 px-6 text-right">
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-2"
                    title="Hapus User"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default UsersPage;