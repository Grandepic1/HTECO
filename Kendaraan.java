public abstract class Kendaraan {
    protected int id;
    protected String nama;
    protected FaktorEmisi emisi;
    protected double efisiensiKmPerLiter;

    public Kendaraan(int id, String nama, FaktorEmisi emisi, double efisiensiKmPerLiter) {
        this.id = id;
        this.nama = nama;
        this.emisi = emisi;
        this.efisiensiKmPerLiter = efisiensiKmPerLiter;
    }
}