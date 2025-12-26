'use client';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // --- 1. DATA KENDARAAN (Initial Dummy) ---
  const [vehicles, setVehicles] = useState([
    { id: 101, name: 'Toyota Avanza 1.3 G', type: 'Mobil', fuel: 'Bensin', efficiency: 14.5, isHybrid: false },
    { id: 102, name: 'Honda Vario 160', type: 'Motor', fuel: 'Bensin', efficiency: 46.9, isHybrid: false },
    { id: 103, name: 'Mercedes-Benz C 300 AMG', type: 'Mobil', fuel: 'Bensin', efficiency: 11.6, isHybrid: false }, // Dummy Request
    { id: 104, name: 'Audi Q5 Quattro', type: 'Mobil', fuel: 'Bensin', efficiency: 10.8, isHybrid: false },      // Dummy Request
  ]);

  // --- 2. DATA PERJALANAN (Initial Dummy) ---
  const [trips, setTrips] = useState([
    { id: 1, date: '2025-12-17', vehicleId: 101, vehicleName: 'Toyota Avanza 1.3 G', distance: 12, emission: 1.91 },
  ]);

  // --- ACTIONS VEHICLES ---
  const addVehicle = (newVehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  const deleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    // Opsional: Hapus juga trip yang terkait dengan mobil ini
    setTrips((prev) => prev.filter((t) => t.vehicleId !== id));
  };

  // --- ACTIONS TRIPS ---
  const addTrip = (tripData) => {
    // Cari data mobil untuk hitung emisi akurat
    const vehicle = vehicles.find(v => v.id === parseInt(tripData.vehicleId));
    if(!vehicle) return;

    // Rumus: (Jarak / Efisiensi) * Faktor Emisi (Asumsi Bensin ~2.3 kg/L)
    const fuelConsumed = tripData.distance / vehicle.efficiency;
    const emissionFactor = vehicle.fuel === 'Solar' ? 2.68 : vehicle.fuel === 'Listrik' ? 0.85 : 2.31; 
    const totalEmission = (fuelConsumed * emissionFactor).toFixed(2);

    const newTrip = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      vehicleId: vehicle.id,
      vehicleName: vehicle.name, // Simpan nama buat display
      distance: tripData.distance,
      emission: totalEmission
    };

    setTrips((prev) => [newTrip, ...prev]);
  };

  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DataContext.Provider value={{ vehicles, trips, addVehicle, deleteVehicle, addTrip, deleteTrip }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);