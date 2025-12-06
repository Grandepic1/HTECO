public class Perjalanan{
    private int id;
    private double jarakKm;
    private String tanggal;
    private Kendaraan kendaraan;

    public Perjalanan(int id, double jarakKm, String tanggal, Kendaraan kendaraan) {
        this.id = id;
        this.jarakKm = jarakKm;
        this.tanggal = tanggal;
        this.kendaraan = kendaraan;
    }
}
