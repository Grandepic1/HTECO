package model;

public class FaktorEmisi {

    private int id;
    private String jenisBBM;
    private double faktorCO2perLiter;

    public FaktorEmisi(int id, String jenisBBM, double faktorCO2perLiter) {
        this.id = id;
        this.jenisBBM = jenisBBM;
        this.faktorCO2perLiter = faktorCO2perLiter;
    }

    public int getId() {
        return id;
    }

    public String getJenisBBM() {
        return jenisBBM;
    }

    public double getFaktorCO2perLiter() {
        return faktorCO2perLiter;
    }
}
