'use client';
import Card from '@/components/ui/Card';

const AdminDashboard = () => {
   return (

    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Monitoring Sistem</h1>
          <p className="text-slate-500">Statistik penggunaan & total emisi seluruh pengguna.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
             ● System Online
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white border-none shadow-xl">
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Emisi Akumulatif</p>
           <h2 className="text-4xl font-bold mt-2 text-blue-950">2,450 <span className="text-lg font-normal text-slate-400">kgCO₂e</span></h2>
           <div className="mt-4 h-1 w-full bg-slate-800 rounded overflow-hidden">
             <div className="h-full bg-emerald-500 w-[70%]"></div>
           </div>
           <p className="text-xs text-slate-400 mt-2">70% dari batas ambang aman tahunan.</p>
        </Card>

        <Card>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Perjalanan Tercatat</p>
           <h2 className="text-4xl font-bold mt-2 text-slate-800">1,024</h2>
           <p className="text-emerald-600 text-sm font-bold mt-2">↑ 124 perjalanan baru (bulan ini)</p>
        </Card>

        <Card>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Statistik Penggunaan</p>
           <div className="mt-4 space-y-2">
             <div className="flex justify-between text-sm">
                <span className="text-slate-600">User Aktif (Hari Ini)</span>
                <span className="font-bold text-slate-900">18 User</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-600">Rata-rata Emisi/User</span>
                <span className="font-bold text-slate-900">45 kg</span>
             </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
           <h3 className="font-bold text-slate-800 mb-4">Tren Emisi Pengguna (6 Bulan Terakhir)</h3>
           <div className="h-64 flex items-end justify-between px-4 border-b border-slate-100 pb-0 gap-4">
              {[65, 50, 80, 70, 90, 60].map((h, i) => (
                <div key={i} className="w-full flex flex-col justify-end gap-2 group cursor-pointer h-full">
                   <div style={{height: `${h}%`}} className="bg-slate-300 rounded-t-sm w-full group-hover:bg-slate-900 transition-all relative">
                     <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100">{h}kg</span>
                   </div>
                   <span className="text-center text-xs text-slate-400 font-bold mb-2">Bln {i+1}</span>
                </div>
              ))}
           </div>
        </Card>

        <Card>
           <h3 className="font-bold text-slate-800 mb-4">Sebaran Tipe Kendaraan</h3>
           <div className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                   <span className="font-bold text-slate-700">Mobil (Bensin)</span>
                   <span className="text-slate-500">60%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                   <div className="bg-slate-800 h-3 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                   <span className="font-bold text-slate-700">Motor</span>
                   <span className="text-slate-500">30%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                   <div className="bg-slate-500 h-3 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                   <span className="font-bold text-slate-700">Kendaraan Listrik</span>
                   <span className="text-slate-500">10%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                   <div className="bg-emerald-500 h-3 rounded-full" style={{width: '10%'}}></div>
                </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
   );
}

export default AdminDashboard;
