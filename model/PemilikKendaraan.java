package model;
import java.util.ArrayList;

public class PemilikKendaraan extends User {
    private ArrayList<Kendaraan> kendaraans;


    public PemilikKendaraan(int id, String username, String email, String password) {
        super(id, username, email, password, Role.USER);
        this.kendaraans = new ArrayList<>();
    }

    public ArrayList<Kendaraan> getKendaraans(){
        return this.kendaraans;
    }

    public void refreshKendaraans(ArrayList<Kendaraan> newKendaraans) {
        kendaraans.clear();
        kendaraans.addAll(newKendaraans);
    }
    
}
