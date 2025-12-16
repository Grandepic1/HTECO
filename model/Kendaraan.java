package model;
public abstract class Kendaraan implements Emisiable {
    protected int id;
    protected String nama;
    protected int emisi_id;
    protected double efisiensiKmPerLiter;
    protected int userId;

    public Kendaraan(int id, String nama, int emisi_id, double efisiensiKmPerLiter, int userId) {
        this.id = id;
        this.nama = nama;
        this.emisi_id = emisi_id;
        this.efisiensiKmPerLiter = efisiensiKmPerLiter;
        this.userId = userId;
    }

    @Override
    public abstract double hitungEmisi();
    
    @Override
    public String toString() {
        return nama + " (" + getClass().getSimpleName() + ")";

    }
}


