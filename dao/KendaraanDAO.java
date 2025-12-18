package dao;

import factory.KendaraanFactory;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import model.Kendaraan;
import util.Koneksi;

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
            System.out.println("Eksepsi : " + e);
        }

        return list;
    }

    public void insert(int userId, String nama, String jenis,
            int emisiId, double efisiensi) {

        String sql = """
                    INSERT INTO kendaraan (userId, nama, jenis_kendaraan, emisi_id, efisiensi)
                    VALUES (?, ?, ?, ?, ?)
                """;

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ps.setString(2, nama);
            ps.setString(3, jenis);
            ps.setInt(4, emisiId);
            ps.setDouble(5, efisiensi);
            ps.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            System.out.println("Eksepsi : " + e);
        }
    }

    public void delete(int kendaraanId, int userId) {

        String sql = "DELETE FROM kendaraan WHERE id = ? AND userId = ?";

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, kendaraanId);
            ps.setInt(2, userId);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Eksepsi : " + e);
        }
    }

}
