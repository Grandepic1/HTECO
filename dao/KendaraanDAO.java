package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import model.Kendaraan;
import util.Koneksi;
import factory.KendaraanFactory;

public class KendaraanDAO {
    private final Koneksi k = new Koneksi();
    public ArrayList<Kendaraan> findByUserId(int userId) {
        ArrayList<Kendaraan> list = new ArrayList<>();
        String sql = "SELECT * FROM kendaraan WHERE userId = ?";

        try (Connection conn = k.getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                list.add(KendaraanFactory.fromResultSet(rs));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
}
