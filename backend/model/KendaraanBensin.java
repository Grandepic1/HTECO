package model;
public class KendaraanBensin extends Kendaraan {

    public KendaraanBensin(int id, String nama, String plat_no, int emisi_id, double efisiensiKmPerLiter, int userId) {
        super(id, nama, plat_no, emisi_id, efisiensiKmPerLiter, userId);
    }

    @Override
    public double hitungEmisi() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
