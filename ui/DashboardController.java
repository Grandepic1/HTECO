package ui;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import model.Kendaraan;
import model.PemilikKendaraan;
import service.KendaraanService;
import util.Session;

public class DashboardController {

    private KendaraanService kendaraanService = new KendaraanService();

    @FXML
    private Label welcomeLabel;
    @FXML
    private ListView<Kendaraan> kendaraanList;

    private PemilikKendaraan pemilik;

    @FXML
    public void initialize() {
        pemilik = (PemilikKendaraan) Session.getUser();
        welcomeLabel.setText("Welcome, " + pemilik.getUsername());
        refresh();
    }

    private void refresh() {
        kendaraanService.refreshKendaraanPemilik(pemilik);
        kendaraanList.getItems().setAll(pemilik.getKendaraans());
    }

    public void handleAdd() {
        // open form (next section)
    }

    public void handleDelete() {
        Kendaraan selected = kendaraanList.getSelectionModel().getSelectedItem();
        if (selected != null) {
            kendaraanService.deleteKendaraan(pemilik, selected.getId());
            refresh();
        }
    }
}
