package service;

import java.util.ArrayList;

import dao.KendaraanDAO;
import dao.PerjalananDAO;
import model.Kendaraan;

public class KendaraanService {

    private final KendaraanDAO kendaraanDAO = new KendaraanDAO();
    private final PerjalananDAO perjalananDAO = new PerjalananDAO();

    public Kendaraan getByIdWithPerjalanan(int kendaraanId) {
        Kendaraan k = kendaraanDAO.findById(kendaraanId);
        if (k != null) {
            k.refreshKendaraans(
                    perjalananDAO.findByKendaraanId(kendaraanId));
        }
        return k;
    }

    public ArrayList<Kendaraan> getByUserIdWithPerjalanan(int userId) {
        ArrayList<Kendaraan> list = kendaraanDAO.findByUserId(userId);

        for (Kendaraan k : list) {
            k.refreshKendaraans(
                    perjalananDAO.findByKendaraanId(k.getId()));
        }
        return list;
    }

    public ArrayList<Kendaraan> getAllWithPerjalanan() {
        ArrayList<Kendaraan> list = kendaraanDAO.getAll();

        for (Kendaraan k : list) {
            k.refreshKendaraans(
                    perjalananDAO.findByKendaraanId(k.getId()));
        }
        return list;
    }

    public boolean addKendaraan(int userId, String nama, String platNo,
            String jenis, int emisiId, double efisiensi) {
        kendaraanDAO.insert(userId, nama, platNo, jenis, emisiId, efisiensi);
        return true;
    }
}
