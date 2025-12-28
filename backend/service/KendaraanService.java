package service;

import dao.KendaraanDAO;
import dao.UserDAO;
import java.util.ArrayList;
import model.Kendaraan;
import model.PemilikKendaraan;

public class KendaraanService {
    private KendaraanDAO kendaraanDAO = new KendaraanDAO();
    private UserDAO userDao = new UserDAO();

    public void refreshKendaraanPemilik(PemilikKendaraan pemilik) {
        ArrayList<Kendaraan> dbData = kendaraanDAO.findByUserId(pemilik.getId());

        pemilik.refreshKendaraans(dbData);
    }
    
    public boolean addKendaraan(int userId,
            String nama,
            String plat_no,
            String jenis,
            int emisiId,
            double efisiensi) {

            PemilikKendaraan pemilik = (PemilikKendaraan) userDao.findById(userId);
            if (pemilik == null) return false;

        kendaraanDAO.insert(
                pemilik.getId(),
                nama,
                plat_no,
                jenis,
                emisiId,
                efisiensi);

        // sync object with DB
        refreshKendaraanPemilik(pemilik);
        return true;
    }

    public void deleteKendaraan(PemilikKendaraan pemilik, int kendaraanId) {

        kendaraanDAO.delete(kendaraanId, pemilik.getId());
        refreshKendaraanPemilik(pemilik);
    }

}
