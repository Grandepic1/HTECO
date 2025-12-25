package model;
public class KendaraanSolar extends Kendaraan {

    
    public KendaraanSolar(int id, String nama, int emisi_id, double efisiensiKmPerLiter, int userId) {
        super(id, nama, emisi_id, efisiensiKmPerLiter, userId);
    }

    @Override
    public double hitungEmisi() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
