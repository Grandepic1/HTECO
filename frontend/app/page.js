import Link from 'next/link';
import Button from '@/components/ui/Button'; 
import Card from '@/components/ui/Card';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/dashboard/NavbarNotLoggedIn';
import NavbarNotLoggedIn from '@/components/dashboard/NavbarNotLoggedIn';


const LandingPage = () => {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[#F7F7F5] text-slate-800 selection:bg-emerald-200">
        
        <NavbarNotLoggedIn/>
    
        
        <header className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-10 pb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
            New: Hybrid Vehicle Support ⚡
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 max-w-4xl leading-tight animate-fade-in-up">
            Pantau Jejak Karbon.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Mulai Perubahan Nyata.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 animate-fade-in-up delay-100">
            Platform monitoring emisi kendaraan yang simpel dan transparan. 
            Kelola aset kendaraan, catat perjalanan, dan lihat dampakmu terhadap lingkungan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Link href="/auth/register">
              <Button className="px-8 py-4 text-lg rounded-full shadow-xl shadow-emerald-200 hover:shadow-emerald-300">
                Mulai Sekarang &rarr;
              </Button>
            </Link>
            <Link href="/dashboard">
              <button className="px-8 py-4 text-lg font-bold text-slate-600 hover:bg-white hover:shadow-lg rounded-full transition-all border border-transparent hover:border-slate-200">
                Masuk Dashboard
              </button>
            </Link>
          </div>
        </header>
    
       
        <section className="px-6 py-20 bg-white border-y rounded-3xl border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Fitur Utama</h2>
              <p className="text-slate-500">Semua yang kamu butuhkan untuk manajemen emisi.</p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[#F7F7F5] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm mb-6">
                  🚘
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Manajemen Garasi</h3>
                <p className="text-slate-500 leading-relaxed">
                  Database kendaraan lengkap dengan spesifikasi pabrik. Mendukung mobil bensin, solar, hingga hybrid dan listrik.
                </p>
              </div>
    
              <div className="p-8 rounded-2xl bg-[#F7F7F5] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm mb-6">
                  📝
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Pencatatan Mudah</h3>
                <p className="text-slate-500 leading-relaxed">
                  Cukup pilih kendaraan dan masukkan jarak tempuh. Sistem kami menghitung emisi CO2 secara otomatis dan akurat.
                </p>
              </div>
    
              <div className="p-8 rounded-2xl bg-[#F7F7F5] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm mb-6">
                  📈
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Laporan & Insight</h3>
                <p className="text-slate-500 leading-relaxed">
                  Visualisasi data tren emisi harian, mingguan, dan bulanan. Pantau kemajuanmu menuju gaya hidup hijau.
                </p>
              </div>
            </div>
          </div>
        </section>
    
    
        <section className="px-6 py-20 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Interface yang Bersih & Fokus</h2>
          
          <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 md:p-8 overflow-hidden">

            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase">Dashboard Preview</div>
            </div>
    
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left opacity-90 pointer-events-none select-none blur-[0.5px] hover:blur-0 transition-all duration-500">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Emisi</p>
                <p className="text-2xl font-bold text-slate-800">45.2 kg</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Jarak</p>
                <p className="text-2xl font-bold text-slate-800">120 km</p>
              </div>
              <div className="bg-lime-100 p-4 rounded-xl border border-lime-200 col-span-1 md:col-span-1">
                <p className="text-[10px] font-bold text-lime-700 uppercase">Status</p>
                <p className="text-lg font-bold text-lime-900 flex items-center gap-2">
                  ✅ Eco-Friendly
                </p>
              </div>
             
              <div className="col-span-1 md:col-span-3 mt-2 space-y-2">
                 <div className="flex justify-between p-3 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold">🚗 Ke Kantor</span>
                    <span className="text-sm text-emerald-600 font-mono">1.2 kg CO2</span>
                 </div>
                 <div className="flex justify-between p-3 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold">🛵 Meeting</span>
                    <span className="text-sm text-emerald-600 font-mono">0.4 kg CO2</span>
                 </div>
              </div>
            </div>
            
    
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] hover:backdrop-blur-none transition-all">
            </div>
          </div>
        </section>
    
    
          
      </div>
    );
}


export default LandingPage;