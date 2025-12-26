import Card from "../ui/Card";

const TripHistory = () => {
  const history = [
    {
      id: 1,
      date: "17 Des 2025",
      vehicle: "Toyota Avanza",
      distance: "12 km",
      emission: "1.44 kg",
    },
    {
      id: 2,
      date: "16 Des 2025",
      vehicle: "Honda Vario",
      distance: "5 km",
      emission: "0.25 kg",
    },
    {
      id: 3,
      date: "15 Des 2025",
      vehicle: "Toyota Avanza",
      distance: "45 km",
      emission: "5.40 kg",
    },
  ];

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">Riwayat Terakhir</h3>
        <button className="text-sm text-emerald-600 hover:underline">
          Lihat Semua
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 border-b border-slate-100">
            <tr>
              <th className="pb-3 font-medium">Tanggal</th>
              <th className="pb-3 font-medium">Kendaraan</th>
              <th className="pb-3 font-medium">Jarak</th>
              <th className="pb-3 font-medium text-right">Emisi CO₂</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="py-3 text-slate-600">{item.date}</td>
                <td className="py-3 font-medium text-slate-800">
                  {item.vehicle}
                </td>
                <td className="py-3 text-slate-600">{item.distance}</td>
                <td className="py-3 text-right font-bold text-emerald-600">
                  {item.emission}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TripHistory;
