'use client';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const MasterDataPage = () => {

  const [activeTab, setActiveTab] = useState('fuel'); // 'fuel' or 'vehicle'
  
  const [fuels, setFuels] = useState([
    { id: 1, name: 'Bensin (Gasoline)', unit: 'Liter', factor: 2.31 },
    { id: 2, name: 'Solar (Diesel)', unit: 'Liter', factor: 2.68 },
    { id: 3, name: 'Listrik (Grid)', unit: 'kWh', factor: 0.85 },
  ]);
  
  const [vehicleTemplates, setVehicleTemplates] = useState([
    { id: 1, type: 'Motor', default_efficiency: 45 },
    { id: 2, type: 'Mobil (City Car)', default_efficiency: 15 },
    { id: 3, type: 'Mobil (SUV)', default_efficiency: 10 },
    { id: 4, type: 'Truk Logistik', default_efficiency: 6 },
  ]);
  
  // crud
  
  const handleUpdateFuel = (id, newFactor) => {
    setFuels(fuels.map(f => f.id === id ? { ...f, factor: newFactor } : f));
  };
  
  const handleUpdateEfficiency = (id, newEff) => {
    setVehicleTemplates(vehicleTemplates.map(v => v.id === id ? { ...v, default_efficiency: newEff } : v));
  };
  
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Konfigurasi Emisi</h1>
        <p className="text-slate-500">Atur faktor emisi dan referensi standar yang digunakan user.</p>
      </div>
  
      {/* alert */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800">
        <span className="text-xl">⚠️</span>
        <div className="text-sm">
          <strong>Perhatian:</strong> Perubahan nilai faktor emisi akan mempengaruhi perhitungan perjalanan 
          yang akan datang. Data histori lama tidak akan berubah untuk menjaga integritas laporan.
        </div>
      </div>
  
      {/* tab switcher */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('fuel')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'fuel' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Faktor Emisi BBM
        </button>
        <button 
          onClick={() => setActiveTab('vehicle')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'vehicle' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Template Kendaraan
        </button>
      </div>
  

      {activeTab === 'fuel' && (
        <Card>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-800">Daftar Bahan Bakar & Emisi</h3>
            <Button className="text-xs">+ Tambah BBM Baru</Button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Nama BBM</th>
                <th className="py-3 px-4">Satuan</th>
                <th className="py-3 px-4">Faktor Emisi (kgCO₂e)</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fuels.map((fuel) => (
                <tr key={fuel.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-700">{fuel.name}</td>
                  <td className="py-3 px-4 text-slate-500">{fuel.unit}</td>
                  <td className="py-3 px-4">
                    <input 
                      type="number" step="0.01"
                      className="w-20 p-1 border border-slate-300 rounded text-center font-mono font-bold text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none"
                      value={fuel.factor}
                      onChange={(e) => handleUpdateFuel(fuel.id, e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-slate-400 hover:text-red-500 text-xs font-bold">HAPUS</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
  

      {activeTab === 'vehicle' && (
        <Card>
           <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Template Efisiensi Kendaraan</h3>
              <p className="text-xs text-slate-500">Nilai default rekomendasi saat user menambah kendaraan baru.</p>
            </div>
            <Button className="text-xs">+ Tambah Kategori</Button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Kategori Kendaraan</th>
                <th className="py-3 px-4">Efisiensi Default (km/liter)</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicleTemplates.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-700">{v.type}</td>
                  <td className="py-3 px-4">
                     <div className="flex items-center gap-2">
                        <input 
                          type="number"
                          className="w-16 p-1 border border-slate-300 rounded text-center font-mono font-bold text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none"
                          value={v.default_efficiency}
                          onChange={(e) => handleUpdateEfficiency(v.id, e.target.value)}
                        />
                        <span className="text-slate-400 text-xs">km/L</span>
                     </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-slate-400 hover:text-red-500 text-xs font-bold">HAPUS</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

export default MasterDataPage;