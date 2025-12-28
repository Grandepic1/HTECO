package model;

import java.util.ArrayList;

public abstract class Kendaraan implements Emisiable {
    protected int id;
    protected String nama;
    protected String plat_no;
    protected int emisi_id;
    protected double efisiensiKmPerLiter;
    protected int userId;
    protected ArrayList<Perjalanan> perjalanans;

    public Kendaraan(int id, String nama, String plat_no,int emisi_id, double efisiensiKmPerLiter, int userId) {
        this.id = id;
        this.nama = nama;
        this.plat_no = plat_no;
        this.emisi_id = emisi_id;
        this.efisiensiKmPerLiter = efisiensiKmPerLiter;
        this.userId = userId;
        this.perjalanans = new ArrayList<>();
    }

    @Override
    public abstract double hitungEmisi();
    
    @Override
    public String toString() {
        return nama + " (" + getClass().getSimpleName() + ")";

    }

    public ArrayList<Perjalanan> getPerjalanans(){
        return this.perjalanans;
    }

    public void refreshKendaraans(ArrayList<Perjalanan> newPerjalanans) {
        perjalanans.clear();
        perjalanans.addAll(newPerjalanans);
    }

    public int getId() {
        return id;
    }

    public String getNama() {
        return nama;
    }

    public int getEmisi_id() {
        return emisi_id;
    }

    public double getEfisiensiKmPerLiter() {
        return efisiensiKmPerLiter;
    }


    
}


