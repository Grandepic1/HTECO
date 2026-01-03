package dao;

import java.sql.*;
import java.util.ArrayList;
import model.*;
import util.Koneksi;

public class KendaraanDAO {

    private final Koneksi k = new Koneksi();
    private final FaktorEmisiDAO faktorEmisiDAO = new FaktorEmisiDAO();

    public ArrayList<Kendaraan> getAll() {

        ArrayList<Kendaraan> list = new ArrayList<>();
        String sql = "SELECT * FROM kendaraan";

        try (Connection conn = k.getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Kendaraan kendaraan = mapToKendaraan(rs);
                if (kendaraan != null) {
                    list.add(kendaraan);
                }
            }

        } catch (Exception e) {
            System.out.println("Eksepsi getAll kendaraan: " + e);
        }

        return list;
    }

    public ArrayList<Kendaraan> findByUserId(int userId) {
        ArrayList<Kendaraan> list = new ArrayList<>();
        String sql = "SELECT * FROM kendaraan WHERE userId = ?";

        try (Connection conn = k.getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Kendaraan kendaraan = mapToKendaraan(rs);
                if (kendaraan != null) {
                    list.add(kendaraan);
                }
            }

        } catch (Exception e) {
            System.out.println("Eksepsi : " + e);
        }

        return list;
    }

    public Kendaraan findById(int kendaraanId) {
        String sql = "SELECT * FROM kendaraan WHERE id = ?";

        try (Connection conn = k.getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, kendaraanId);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return mapToKendaraan(rs);
            }

        } catch (Exception e) {
            System.out.println("Eksepsi : " + e);
        }

        return null;
    }

    private Kendaraan mapToKendaraan(ResultSet rs) throws SQLException {

        int id = rs.getInt("id");
        int userId = rs.getInt("userId");
        String nama = rs.getString("nama");
        String platNo = rs.getString("plat_no");
        String jenisKendaraan = rs.getString("jenis_kendaraan"); // MOBIL / MOTOR
        double efisiensi = rs.getDouble("efisiensi");

        int emisiId = rs.getInt("emisi_id");
        FaktorEmisi faktorEmisi = faktorEmisiDAO.findById(emisiId);

        if (faktorEmisi == null) {
            throw new SQLException("Faktor emisi tidak ditemukan");
        }

        switch (faktorEmisi.getJenisBBM().toUpperCase()) {

            case "BENSIN":
                return new KendaraanBensin(
                        id, nama, platNo, jenisKendaraan,
                        faktorEmisi, efisiensi, userId);

            case "SOLAR":
                return new KendaraanSolar(
                        id, nama, platNo, jenisKendaraan,
                        faktorEmisi, efisiensi, userId);

            case "LISTRIK":
                return new KendaraanListrik(
                        id, nama, platNo, jenisKendaraan,
                        faktorEmisi, efisiensi, userId);

            default:
                throw new SQLException(
                        "Jenis BBM tidak dikenali: " + faktorEmisi.getJenisBBM());
        }
    }

    public void insert(int userId, String nama, String platNo,
            String jenis, int emisiId, double efisiensi) {

        String sql = """
                    INSERT INTO kendaraan
                    (userId, plat_no, nama, jenis_kendaraan, emisi_id, efisiensi)
                    VALUES (?, ?, ?, ?, ?, ?)
                """;

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ps.setString(2, platNo);
            ps.setString(3, nama);
            ps.setString(4, jenis);
            ps.setInt(5, emisiId); // FK
            ps.setDouble(6, efisiensi);

            ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Eksepsi insert kendaraan: " + e);
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
            System.out.println("Eksepsi delete kendaraan: " + e);
        }
    }
}
