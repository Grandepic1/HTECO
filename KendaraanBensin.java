public class KendaraanBensin extends Kendaraan implements Emisiable {

    public KendaraanBensin() {
        super(0, null, null, 0);
    }

    @Override
    public double hitungEmisi() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
