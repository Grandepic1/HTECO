package service;

import dao.FaktorEmisiDAO;
import java.util.ArrayList;
import model.FaktorEmisi;

public class FaktorEmisiService {

    private final FaktorEmisiDAO dao = new FaktorEmisiDAO();

    public ArrayList<FaktorEmisi> getAll() {
        return dao.getAll();
    }

    public FaktorEmisi getById(int id) {
        return dao.findById(id);
    }

    public boolean add(String jenis, double faktor) {

        if (jenis == null || jenis.isBlank() || faktor <= 0) {
            return false;
        }

        dao.insert(jenis.toUpperCase(), faktor);
        return true;
    }

    public boolean update(int id, double faktor) {

        if (faktor <= 0) {
            return false;
        }

        dao.update(id, faktor);
        return true;
    }

    public void delete(int id) {
        dao.delete(id);
    }
}
