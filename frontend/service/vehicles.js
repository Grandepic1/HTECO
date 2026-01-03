export async function addVehicle(vehicleData) {
  const userData = JSON.parse(localStorage.getItem("data"));
  const userId = userData?.id

  const payload = {
    userId: userId,
    platNomor: vehicleData.platNomor || "",
    nama: vehicleData.name,
    jenis: vehicleData.type.toLowerCase(),
    emisiId: getEmisiId(vehicleData.fuel),
    efisiensi: parseFloat(vehicleData.efficiency)
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/kendaraan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((data) => data.json()).then((data) => data);

  return res.json();
}

export async function getVehicles() {
  const userData = JSON.parse(localStorage.getItem("data"));

  return await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/kendaraan?userId=${userData.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json()).then((data) => console.log(data));
}

function getEmisiId(fuelType, emisiList) {
  if (!emisiList || !Array.isArray(emisiList)) return 1;
  
  const fuelMap = {
    "Solar": "solar",
    "90 Octane": "90 Octane",
    "OCTANE 100": "OCTANE 100"
  };

  const jenisBBM = fuelMap[fuelType];
  const emisi = emisiList.find(e => e.jenisBBM === jenisBBM);
  
  return emisi ? emisi.id : 1;
}