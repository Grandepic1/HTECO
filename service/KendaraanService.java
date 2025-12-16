package service;

import dao.KendaraanDAO;
import model.Kendaraan;
import model.PemilikKendaraan;

import java.util.ArrayList;

public class KendaraanService {
    private KendaraanDAO kendaraanDAO = new KendaraanDAO();

    public void refreshKendaraanPemilik(PemilikKendaraan pemilik) {
        ArrayList<Kendaraan> dbData = kendaraanDAO.findByUserId(pemilik.getId());

        pemilik.refreshKendaraans(dbData);
    }
}
