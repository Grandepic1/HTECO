package model;

import java.util.ArrayList;

public abstract class Kendaraan implements Emisiable {
    protected int id;
    protected String nama;
    protected String plat_no;
    protected FaktorEmisi faktorEmisi;
    protected String jenisKendaraan;
    protected int userId;
    protected ArrayList<Perjalanan> perjalanans = new ArrayList<>();;

    public Kendaraan(int id, String nama, String plat_no, String jenisKendaraan,
            FaktorEmisi faktorEmisi, double efisiensi, int userId) {
        this.id = id;
        this.nama = nama;
        this.plat_no = plat_no;
        this.jenisKendaraan = jenisKendaraan;
        this.faktorEmisi = faktorEmisi;
        this.userId = userId;
    }

    public double hitungTotalEmisi(FaktorEmisi faktorEmisi) {
        double total = 0;
        for (Perjalanan p : perjalanans) {
            total += hitungEmisi(p);
        }
        return total;
    }
    
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

    public String getJenisKendaraan() {
        return jenisKendaraan;
    }

    public int getId() {
        return id;
    }

    public String getNama() {
        return nama;
    }

    public FaktorEmisi getFaktorEmisi() {
        return faktorEmisi;
    }

  


    
}


