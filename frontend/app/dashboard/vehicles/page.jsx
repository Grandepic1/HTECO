"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DashboardBackButton from "@/components/ui/BackButton";
import { addVehicle, getVehicles } from "@/service/vehicles";
import { getEmisi } from "@/service/emisi";

export default function VehiclesPage() {
	const [emisiList, setEmisiList] = useState([]);
	const [myVehicles, setMyVehicles] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [platNomor, setPlatNomor] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		id: null,
		name: "",
		type: "Mobil",
		fuel: "solar",
		efficiency: "",
		isCustom: true,
		isHybrid: false,
	});

	useEffect(() => {
		loadEmisi();
		loadVehicles();
	}, []);

	const loadEmisi = async () => {
		try {
			const data = await getEmisi();
			setEmisiList(data);
		} catch (error) {
			console.error("Error loading emisi:", error);
		}
	};

	const loadVehicles = async () => {
		setIsLoading(true);
		try {
			const data = await getVehicles();

			if (data && Array.isArray(data)) {
				const formattedVehicles = data.map((v) => ({
					id: v.id,
					name: v.nama,
					type: v.jenisKendaraan.charAt(0).toUpperCase() + v.jenisKendaraan.slice(1),
					fuel: v.faktorEmisi?.jenisBBM || "solar",
					efficiency: v.efisiensiKmPerLiter,
					platNomor: v.plat_no,
					isCustom: true,
					isHybrid: false,
				}));
				setMyVehicles(formattedVehicles);
			}
		} catch (error) {
			console.error("Error loading vehicles:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		try {
			const vehicleData = {
				name: inputValue,
				type: formData.type,
				fuel: formData.fuel,
				efficiency: formData.efficiency,
				platNomor: platNomor,
			};

			const result = await addVehicle(vehicleData, emisiList);

			if (result.success) {
				await loadVehicles();
				setInputValue("");
				setPlatNomor("");
				setFormData({
					name: "",
					type: "Mobil",
					fuel: emisiList[0]?.jenisBBM || "solar",
					efficiency: "",
					isCustom: true,
				});
			}

			location.reload();
		} catch (error) {
			console.error("Error adding vehicle:", error);

			location.reload();
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id) => {
		if (confirm("Yakin ingin menghapus kendaraan ini dari garasi?")) {
			setIsLoading(true);
			try {
				const result = await deleteVehicle(id);
				if (result.success) {
					await loadVehicles();
				}
			} catch (error) {
				console.error("Error deleting vehicle:", error);
				alert("Gagal menghapus kendaraan");
			} finally {
				setIsLoading(false);
			}
		}
	};

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
			</div>

			<Card className="bg-white border-slate-200 shadow-lg overflow-visible relative z-20">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
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
							}}
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up pt-2">
						{formData.isHybrid && (
							<div className="md:col-span-3 bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-center gap-3 text-sm text-emerald-800">
								<span className="text-xl">⚡</span>
								<b>Hybrid System Detected:</b> Efisiensi otomatis disesuaikan (Listrik +
								BBM).
							</div>
						)}

						<div className="md:col-span-3">
							<label className="block text-xs font-bold text-slate-400 uppercase mb-2">
								Plat Nomor
							</label>
							<input
								type="text"
								className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-slate-800 outline-none font-mono"
								placeholder="B1234XYZ"
								value={platNomor}
								onChange={(e) => setPlatNomor(e.target.value)}
							/>
						</div>

						<div>
							<label className="block text-xs font-bold text-slate-400 uppercase mb-2">
								Jenis
							</label>
							<select
								className="w-full p-2 rounded border border-slate-300 bg-white focus:ring-2 focus:ring-slate-800 outline-none"
								value={formData.type}
								onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
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
								className="w-full p-2 rounded border border-slate-300 bg-white focus:ring-2 focus:ring-slate-800 outline-none"
								value={formData.fuel}
								onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}>
								{emisiList.map((emisi) => (
									<option key={emisi.id} value={emisi.jenisBBM}>
										{emisi.jenisBBM}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-xs font-bold text-slate-400 uppercase mb-2">
								Efisiensi (km/L)
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
							<Button type="submit" variant="primary" disabled={isLoading}>
								{isLoading ? "Menyimpan..." : "Simpan ke Garasi"}
							</Button>
						</div>
					</div>
				</form>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{isLoading && myVehicles.length === 0 ? (
					<div className="col-span-2 text-center py-10 text-slate-400">
						Memuat kendaraan...
					</div>
				) : (
					myVehicles.map((v) => (
						<div
							key={v.id}
							className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all relative">
							<div className="flex justify-between items-start mb-4">
								<div className="flex items-center gap-4">
									<div
										className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
											v.isHybrid ? "bg-emerald-100" : "bg-slate-100"
										}`}>
										{v.type === "Motor" ? "🛵" : "🚘"}
									</div>
									<div>
										<h3 className="font-bold text-slate-800">{v.name}</h3>
										{v.platNomor && (
											<p className="text-xs text-slate-500 font-mono mt-0.5">
												{v.platNomor}
											</p>
										)}
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
									disabled={isLoading}>
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
					))
				)}

				{myVehicles.length === 0 && !isLoading && (
					<div className="col-span-2 text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
						Belum ada kendaraan.
					</div>
				)}
			</div>
		</div>
	);
}
