package model;
public class KendaraanSolar extends Kendaraan {

    
    private double efisiensiKmPerLiter;

    public KendaraanSolar(
            int id,
            String nama,
            String platNo,
            String jenisKendaraan,
            FaktorEmisi faktorEmisi,
            double efisiensi,
            int userId) {
        super(id, nama, platNo, jenisKendaraan, faktorEmisi, efisiensi, userId);
        this.efisiensiKmPerLiter = efisiensi;
    }

    @Override
    public double hitungEmisi(Perjalanan p) {
        double liter = p.getJarakKm() / efisiensiKmPerLiter;
        return liter * faktorEmisi.getFaktorCO2perLiter();
    }

}
