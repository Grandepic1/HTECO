import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function UserDashboard() {
  return (
    <div className="space-y-10 animate-fade-in-up">
      
      <section className="text-center space-y-4 pt-4">
        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-4xl font-bold text-slate-900">Halo, Kei!</h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">
          Siap mencatat perjalanan hari ini? Berikut adalah ringkasan emisi karbonmu bulan ini.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center hover:shadow-md transition-shadow cursor-default">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Emisi</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-800">45.2 <span className="text-sm font-normal text-slate-500">kgCO2</span></h2>
        </Card>
        <Card className="text-center hover:shadow-md transition-shadow cursor-default">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Jarak</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-800">120 <span className="text-sm font-normal text-slate-500">km</span></h2>
        </Card>
        <Card className="text-center hover:shadow-md transition-shadow cursor-default">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kendaraan Aktif</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-800">2 <span className="text-sm font-normal text-slate-500">Unit</span></h2>
        </Card>
      </section>

      <hr className="border-slate-200" />

   
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-wider">Menu Utama</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
      
          <Link href="/dashboard/trips" className="group">
            <div className="h-full bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col items-start">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🚗</span>
              <h3 className="text-lg font-bold text-slate-800">Catat Perjalanan</h3>
              <p className="text-slate-500 text-sm mt-1">Input jarak tempuh harianmu untuk menghitung emisi.</p>
            </div>
          </Link>

        
          <Link href="/dashboard/vehicles" className="group">
            <div className="h-full bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col items-start">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🚘</span>
              <h3 className="text-lg font-bold text-slate-800">Garasi</h3>
              <p className="text-slate-500 text-sm mt-1">Tambah atau edit daftar kendaraan pribadi/dinas.</p>
            </div>
          </Link>

          
          <Link href="/dashboard/insight" className="group sm:col-span-2">
            <div className="h-full bg-slate-900 border border-slate-900 rounded-xl p-6 hover:bg-slate-800 hover:shadow-lg transition-all flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-bold">Lihat Laporan Emisi Lengkap</h3>
                <p className="text-slate-400 text-sm mt-1">Analisis tren emisi dan grafik penggunaan.</p>
              </div>
              <span className="text-2xl">📈 &rarr;</span>
            </div>
          </Link>

        </div>
      </section>

     
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Aktivitas Terakhir</h3>
        </div>
        <div className="bg-lime-200 border border-slate-200 rounded-xl overflow-hidden">
          {[1,2,3].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                  {idx === 0 ? '🚗' : '🛵'}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{idx === 0 ? 'Ke Kantor' : 'Meeting Client'}</p>
                  <p className="text-xs text-slate-500">17 Des • Toyota Avanza</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 text-sm">12 km</p>
                <p className="text-xs text-slate-500">1.4 kg CO2</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}