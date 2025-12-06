public abstract class Kendaraan {
    protected long id;
    protected String nama;
    protected FaktorEmisi emisi;
    protected double efisiensiKmPerLiter;

    public Kendaraan(long id, String nama, FaktorEmisi emisi, double efisiensiKmPerLiter) {
        this.id = id;
        this.nama = nama;
        this.emisi = emisi;
        this.efisiensiKmPerLiter = efisiensiKmPerLiter;
    }
}