package dao;

import java.sql.*;
import java.util.ArrayList;
import model.FaktorEmisi;
import util.Koneksi;

public class FaktorEmisiDAO {

    private final Koneksi k = new Koneksi();

    public ArrayList<FaktorEmisi> getAll() {
        ArrayList<FaktorEmisi> list = new ArrayList<>();
        String sql = "SELECT * FROM faktor_emisi";

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(new FaktorEmisi(
                        rs.getInt("id"),
                        rs.getString("jenisBBM"),
                        rs.getDouble("co2perliter")));
            }

        } catch (Exception e) {
            System.out.println("Eksepsi FaktorEmisiDAO: " + e);
        }

        return list;
    }

    public FaktorEmisi findById(int id) {
        String sql = "SELECT * FROM faktor_emisi WHERE id = ?";

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new FaktorEmisi(
                        rs.getInt("id"),
                        rs.getString("jenisBBM"),
                        rs.getDouble("co2perliter"));
            }

        } catch (Exception e) {
            System.out.println("Eksepsi FaktorEmisiDAO: " + e);
        }

        return null;
    }

    public void insert(String jenis, double faktor) {
        String sql = """
                    INSERT INTO faktor_emisi (jenisBBM, co2perliter)
                    VALUES (?, ?)
                """;

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setString(1, jenis);
            ps.setDouble(2, faktor);
            ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Eksepsi insert faktor emisi: " + e);
        }
    }

    public void update(int id, double faktor) {
        String sql = "UPDATE faktor_emisi SET co2perliter = ? WHERE id = ?";

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setDouble(1, faktor);
            ps.setInt(2, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Eksepsi update faktor emisi: " + e);
        }
    }

    public void delete(int id) {
        String sql = "DELETE FROM faktor_emisi WHERE id = ?";

        try (Connection c = k.getConnection();
                PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Eksepsi delete faktor emisi: " + e);
        }
    }
}
