'use client';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import DashboardBackButton from '@/components/ui/BackButton';

export default function TripsPage() {
  // mock
  const [trips, setTrips] = useState([
    { id: 1, date: '2025-12-17', vehicle: 'Avanza B 1234', distance: 12, emission: 1.44 },
    { id: 2, date: '2025-12-16', vehicle: 'Vario B 5678', distance: 5, emission: 0.25 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ vehicle: 'Avanza B 1234', distance: '' });

  const handleAddTrip = (e) => {
    e.preventDefault();
    const emission = (formData.distance * 0.12).toFixed(2); // Mock kalkulasi
    const newTrip = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      vehicle: formData.vehicle,
      distance: formData.distance,
      emission: emission
    };
    setTrips([newTrip, ...trips]);
    setIsAdding(false);
    setFormData({ vehicle: 'Avanza B 1234', distance: '' });
  };

  const handleDelete = (id) => {
    setTrips(trips.filter(t => t.id !== id));
  };

  const handleUpdate = (id) => {
    setTrips([])
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <DashboardBackButton />
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Catatan Perjalanan</h1>
          <p className="text-slate-500 mt-1">Kelola data perjalanan untuk kalkulasi emisi.</p>
        </div>
        <Button variant="primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Batal' : '+ Catat Baru'}
        </Button>
      </div>

      {isAdding && (
        <Card className="animate-fade-in-down bg-slate-50 border-slate-300">
          <form onSubmit={handleAddTrip} className="space-y-4">
            <h3 className="font-bold text-slate-800">Tambah Perjalanan Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Kendaraan</label>
                <select 
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  value={formData.vehicle}
                  onChange={e => setFormData({...formData, vehicle: e.target.value})}
                >
                  <option>Avanza B 1234</option>
                  <option>Vario B 5678</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Jarak (km)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  placeholder="0"
                  value={formData.distance}
                  onChange={e => setFormData({...formData, distance: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="primary" type="submit">Simpan Data</Button>
            </div>
          </form>
        </Card>
      )}


      <div className="space-y-4">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl">
                🚗
              </div>
              <div>
                <p className="font-bold text-slate-800">{trip.vehicle}</p>
                <p className="text-sm text-slate-500">{trip.date} • Jarak: {trip.distance} km</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-bold">Emisi</p>
                <p className="text-lg font-bold text-slate-900">{trip.emission} kg</p>
              </div>
              
            
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleUpdate(trip.id)} 
                 className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                  ✏️</button>
                <button 
                  onClick={() => handleDelete(trip.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                >🗑️</button>
              </div>
            </div>
          </div>
        ))}

        {trips.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            Belum ada data perjalanan.
          </div>
        )}
      </div>
    </div>
  );
}