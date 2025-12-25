package service;

import dao.KendaraanDAO;
import java.util.ArrayList;
import model.Kendaraan;
import model.PemilikKendaraan;

public class KendaraanService {
    private KendaraanDAO kendaraanDAO = new KendaraanDAO();

    public void refreshKendaraanPemilik(PemilikKendaraan pemilik) {
        ArrayList<Kendaraan> dbData = kendaraanDAO.findByUserId(pemilik.getId());

        pemilik.refreshKendaraans(dbData);
    }
    
    public void addKendaraan(PemilikKendaraan pemilik,
            String nama,
            String jenis,
            int emisiId,
            double efisiensi) {

        kendaraanDAO.insert(
                pemilik.getId(),
                nama,
                jenis,
                emisiId,
                efisiensi);

        // sync object with DB
        refreshKendaraanPemilik(pemilik);
    }

    public void deleteKendaraan(PemilikKendaraan pemilik, int kendaraanId) {

        kendaraanDAO.delete(kendaraanId, pemilik.getId());
        refreshKendaraanPemilik(pemilik);
    }

}
