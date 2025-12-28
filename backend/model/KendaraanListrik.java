package model;
public class KendaraanListrik extends Kendaraan {

    public KendaraanListrik(int id, String nama, String plat_no, int emisi_id, double efisiensiKmPerLiter, int userId) {
        super(id, nama, plat_no, emisi_id, efisiensiKmPerLiter, userId);
    }
    @Override
    public double hitungEmisi() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'hitungEmisi'");
    }
    
}