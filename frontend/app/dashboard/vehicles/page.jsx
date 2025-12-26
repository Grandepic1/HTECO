"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import DashboardBackButton from "@/components/ui/BackButton";

export default function VehiclesPage() {
  // --- DATABASE ADMIN (Katalog Referensi) ---
  const ADMIN_CATALOG = [
    {
      id: 1,
      name: "Toyota Avanza 1.3 G",
      type: "Mobil",
      fuel: "Bensin",
      efficiency: 14.5,
    },
    {
      id: 2,
      name: "Toyota Innova Zenix Hybrid",
      type: "Mobil",
      fuel: "Bensin",
      efficiency: 22.0,
      isHybrid: true,
    },
    {
      id: 3,
      name: "Honda Brio Satya",
      type: "Mobil",
      fuel: "Bensin",
      efficiency: 20.3,
    },
    {
      id: 4,
      name: "Mitsubishi Pajero Sport",
      type: "Mobil",
      fuel: "Solar",
      efficiency: 11.2,
    },
    {
      id: 5,
      name: "Honda Vario 160",
      type: "Motor",
      fuel: "Bensin",
      efficiency: 46.9,
    },
    {
      id: 6,
      name: "Tesla Model 3",
      type: "Mobil",
      fuel: "Listrik",
      efficiency: 6.5,
    },
  ];

  // --- STATE ---
  const [myVehicles, setMyVehicles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State Input Notion-Style
  const [inputValue, setInputValue] = useState(""); // Apa yang diketik user
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // State Data Form
  const [formData, setFormData] = useState({
    id: null, // ID dari catalog (kalau ada)
    name: "", // Nama final
    type: "Mobil", // Default
    fuel: "Bensin", // Default
    efficiency: "", // Angka km/l
    isCustom: false, // Penanda apakah ini data baru atau ambil dari catalog
    isHybrid: false,
  });

  // --- LOGIC 1: FILTERING (SEARCH) ---
  const filteredOptions = useMemo(() => {
    if (!inputValue) return ADMIN_CATALOG;
    return ADMIN_CATALOG.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue]);

  // --- LOGIC 2: HANDLE SELECTION ---

  // Skenario A: User memilih barang yang ADA di katalog
  const handleSelectExisting = (item) => {
    setInputValue(item.name);
    setFormData({
      id: item.id,
      name: item.name,
      type: item.type,
      fuel: item.fuel,
      efficiency: item.efficiency, // Auto-fill dari admin
      isCustom: false,
      isHybrid: item.isHybrid || false,
    });
    setShowDropdown(false);
  };

  // Skenario B: User membuat barang BARU (Create New)
  const handleCreateNew = () => {
    setFormData({
      id: null,
      name: inputValue, // Gunakan apa yang diketik user
      type: "Mobil", // Default, user harus ganti nanti
      fuel: "Bensin", // Default, user harus ganti nanti
      efficiency: "", // Kosong, user harus isi
      isCustom: true, // Flag bahwa ini custom
      isHybrid: false,
    });
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.efficiency) return;

    const newVehicle = {
      id: Date.now(),
      ...formData,
      efficiency: parseFloat(formData.efficiency),
    };

    setMyVehicles([...myVehicles, newVehicle]);

    setIsFormOpen(false);
    setInputValue("");
    setFormData({
      name: "",
      type: "Mobil",
      fuel: "Bensin",
      efficiency: "",
      isCustom: false,
    });
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus kendaraan ini dari garasi?")) {
      setMyVehicles(myVehicles.filter((v) => v.id !== id));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <div className="mb-4">
            <DashboardBackButton />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Garasi Saya</h1>
          <p className="text-slate-500 mt-1">
            Tambahkan kendaraan untuk mulai mencatat emisi.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} variant="primary">
          {isFormOpen ? "Batal" : "+ Tambah Kendaraan"}
        </Button>
      </div>

      {isFormOpen && (
        <Card className="bg-white border-slate-200 shadow-lg overflow-visible relative z-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                Nama Kendaraan
              </label>

              <input
                type="text"
                className="w-full text-xl font-bold border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-800 placeholder:text-slate-300 transition-colors bg-transparent"
                placeholder="Ketik nama mobil (misal: Honda Jazz)..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />

              {showDropdown && (
                <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-2 max-h-60 overflow-y-auto z-50 animate-fade-in-down">
                  {filteredOptions.length > 0 && (
                    <div className="py-2">
                      <p className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase">
                        Katalog Tersedia
                      </p>
                      {filteredOptions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectExisting(item)}
                          className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center group"
                        >
                          <div>
                            <p className="font-bold text-slate-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.type} • {item.fuel}
                            </p>
                          </div>
                          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500 group-hover:bg-white border border-transparent group-hover:border-slate-200">
                            Default: {item.efficiency} km/L
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {inputValue.length > 0 && (
                    <div
                      onClick={handleCreateNew}
                      className="border-t border-slate-100 px-4 py-3 hover:bg-emerald-50 cursor-pointer text-emerald-700 font-medium flex items-center gap-2"
                    >
                      <span>➕</span> Buat baru: <b>"{inputValue}"</b>
                    </div>
                  )}
                </div>
              )}
            </div>

            {(formData.name || inputValue) && !showDropdown && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up pt-2">
                {formData.isHybrid && (
                  <div className="md:col-span-3 bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-center gap-3 text-sm text-emerald-800">
                    <span className="text-xl">⚡</span>
                    <b>Hybrid System Detected:</b> Efisiensi otomatis
                    disesuaikan (Listrik + BBM).
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    Jenis
                  </label>
                  <select
                    className={`w-full p-2 rounded border border-slate-300 bg-white focus:ring-2 focus:ring-slate-800 outline-none ${
                      !formData.isCustom &&
                      "bg-slate-100 text-slate-500 pointer-events-none"
                    }`}
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option>Mobil</option>
                    <option>Motor</option>
                    <option>Truk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    Bahan Bakar
                  </label>
                  <select
                    className={`w-full p-2 rounded border border-slate-300 bg-white focus:ring-2 focus:ring-slate-800 outline-none ${
                      !formData.isCustom &&
                      "bg-slate-100 text-slate-500 pointer-events-none"
                    }`}
                    value={formData.fuel}
                    onChange={(e) =>
                      setFormData({ ...formData, fuel: e.target.value })
                    }
                  >
                    <option>Bensin</option>
                    <option>Solar</option>
                    <option>Listrik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    Efisiensi (km/L)
                    {!formData.isCustom && (
                      <span className="ml-1 text-[10px] font-normal text-slate-400">
                        (Boleh disesuaikan)
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-slate-800 outline-none font-mono font-bold"
                    placeholder="0.0"
                    value={formData.efficiency}
                    onChange={(e) =>
                      setFormData({ ...formData, efficiency: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="md:col-span-3 flex justify-end pt-4 border-t border-slate-100">
                  <Button type="submit" variant="primary">
                    Simpan ke Garasi
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      )}

      {/* LIST KENDARAAN (UI Card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myVehicles.map((v) => (
          <div
            key={v.id}
            className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    v.isHybrid ? "bg-emerald-100" : "bg-slate-100"
                  }`}
                >
                  {v.type === "Motor" ? "🛵" : "🚘"}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{v.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase border border-slate-200">
                      {v.fuel}
                    </span>
                    {v.isCustom && (
                      <span className="text-[10px] bg-amber-50 px-2 py-0.5 rounded text-amber-600 font-bold uppercase border border-amber-200">
                        Custom Data
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(v.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
                title="Hapus Kendaraan"
              >
                🗑️
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Efisiensi:
              </span>
              <span className="font-mono font-bold text-slate-800">
                {v.efficiency} km/L
              </span>
            </div>
          </div>
        ))}

        {myVehicles.length === 0 && !isFormOpen && (
          <div className="col-span-2 text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
            Belum ada kendaraan.
          </div>
        )}
      </div>
    </div>
  );
}
