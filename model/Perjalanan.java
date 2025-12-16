package model;
public class Perjalanan{
    private int id;
    private double jarakKm;
    private String tanggal;
    private int kendaraan_id;

    public Perjalanan(int id, double jarakKm, String tanggal, int kendaraan_id) {
        this.id = id;
        this.jarakKm = jarakKm;
        this.tanggal = tanggal;
        this.kendaraan_id = kendaraan_id;
    }
}
