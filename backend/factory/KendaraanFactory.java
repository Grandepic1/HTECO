package factory;

import java.sql.ResultSet;
import java.sql.SQLException;
import model.Kendaraan;
import model.KendaraanBensin;
import model.KendaraanListrik;
import model.KendaraanSolar;

public class KendaraanFactory {

    public static Kendaraan fromResultSet(ResultSet rs) throws SQLException {
        String jenis = rs.getString("jenis_kendaraan");

        switch (jenis) {
            case "BENSIN":
                return new KendaraanBensin(
                        rs.getInt("id"),
                        rs.getString("nama"),
                        rs.getString("plat_no"),
                        rs.getInt("emisi_id"),
                        rs.getDouble("efisiensi"),
                        rs.getInt("userId"));

            case "SOLAR":
                return new KendaraanSolar(
                        rs.getInt("id"),
                        rs.getString("nama"),
                        rs.getString("plat_no"),
                        rs.getInt("emisi_id"),
                        rs.getDouble("efisiensi"),
                        rs.getInt("userId"));

            case "LISTRIK":
                return new KendaraanListrik(
                        rs.getInt("id"),
                        rs.getString("nama"),
                        rs.getString("plat_no"),
                        rs.getInt("emisi_id"),
                        rs.getDouble("efisiensi"),
                        rs.getInt("userId"));

            default:
                throw new IllegalArgumentException("Unknown jenis_kendaraan: " + jenis);
        }
    }
}
