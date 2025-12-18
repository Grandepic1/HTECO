package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import model.Perjalanan;
import util.Koneksi;

public class PerjalananDAO {
    private final Koneksi k = new Koneksi();

    public ArrayList<Perjalanan> findByKendaraan(int kendaraanId) {
        ArrayList<Perjalanan> perjalanans = new ArrayList<>();

        String sql = "SELECT * FROM perjalanan WHERE kendaraan_id = ?";

        try (Connection conn = k.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, kendaraanId);
        } catch (SQLException e) {

        }

        return perjalanans;
    }
}
