package model;

public class KendaraanListrik extends Kendaraan {

    private double konsumsiKwhPerKm;

    public KendaraanListrik(int id, String nama, String plat_no, String jenisKendaraan,
            FaktorEmisi faktorEmisi,
            double konsumsiKwhPerKm, int userId) {
        super(id, nama, plat_no, jenisKendaraan, faktorEmisi, konsumsiKwhPerKm, userId);
        this.konsumsiKwhPerKm = konsumsiKwhPerKm;
    }

    @Override
    public double hitungEmisi(Perjalanan p) {
        double kwh = p.getJarakKm() * konsumsiKwhPerKm;
        return kwh * faktorEmisi.getFaktorCO2perLiter();
    }
}
