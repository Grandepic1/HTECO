public class KendaraanListrik extends Kendaraan implements Emisiable {

    public KendaraanListrik(int  id, String nama, FaktorEmisi emisi, double efisiensiKmPerLiter) {
        super(id, nama, emisi, efisiensiKmPerLiter);
    }
    @Override
    public double hitungEmisi() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'hitungEmisi'");
    }
    
}