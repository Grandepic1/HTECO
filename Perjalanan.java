public class Perjalanan{
    private long id;
    private double jarakKm;
    private String tanggal;
    private Kendaraan kendaraan;

    public Perjalanan(long id, double jarakKm, String tanggal, Kendaraan kendaraan) {
        this.id = id;
        this.jarakKm = jarakKm;
        this.tanggal = tanggal;
        this.kendaraan = kendaraan;
    }
}
