"use client";
import Card from "@/components/ui/Card";
import Link from "next/link";
import DashboardBackButton from "@/components/ui/BackButton";

export default function InsightPage() {
  // mock
  const chartData = [
    { label: "Sen", height: "40%", val: "2kg" },
    { label: "Sel", height: "65%", val: "4kg" },
    { label: "Rab", height: "30%", val: "1.5kg" },
    { label: "Kam", height: "85%", val: "5.2kg" },
    { label: "Jum", height: "50%", val: "3kg" },
    { label: "Sab", height: "20%", val: "0.8kg" },
    { label: "Min", height: "10%", val: "0.2kg" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <div className="mb-4">
            <DashboardBackButton />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Laporan Emisi</h1>
          <p className="text-slate-500 mt-1">
            Analisis tren jejak karbon mingguanmu.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
          <button className="px-3 py-1 text-xs font-bold bg-slate-900 text-white rounded">
            Mingguan
          </button>
          <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded">
            Bulanan
          </button>
        </div>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Tren Emisi Minggu Ini</h3>
          <span className="text-sm text-slate-500">Total: 16.7 kgCO2e</span>
        </div>

        <div className="h-64 border-b border-slate-100 flex items-end justify-between gap-2 sm:gap-4 px-2 pb-0">
          {chartData.map((d, i) => (
            <div
              key={i}
              className="h-full w-full flex flex-col items-center justify-end group cursor-pointer gap-2"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded mb-1">
                {d.val}
              </div>
              <div
                style={{ height: d.height }}
                className="w-full bg-slate-300 rounded-t-sm group-hover:bg-slate-800 transition-all duration-300 relative"
              ></div>
              <p className="text-xs text-slate-500 font-medium pb-2">
                {d.label}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-center">
          <h3 className="font-bold text-slate-800 mb-4">
            Kontribusi Sumber Emisi
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">
                  Toyota Avanza (Mobil)
                </span>
                <span className="text-slate-500">75%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-slate-800 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">
                  Honda Vario (Motor)
                </span>
                <span className="text-slate-500">25%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-slate-400 h-2 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between shadow-xl shadow-slate-200">
          <div>
            <span className="text-3xl">💡</span>
            <h3 className="font-bold text-lg mt-3">Green Tips</h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Emisi kamu minggu ini naik{" "}
              <span className="text-red-300 font-bold">12%</span>. Cobalah
              gunakan motor untuk jarak dekat atau gunakan transportasi umum
              besok.
            </p>
          </div>
          <button className="mt-6 text-sm font-bold text-emerald-400 text-left hover:text-emerald-300">
            Lihat detail saran &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
