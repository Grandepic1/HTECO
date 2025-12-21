package ui;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import model.PemilikKendaraan;
import util.SceneUtil;
import util.Session;

public class DashboardController {

    private PemilikKendaraan pemilik;

    @FXML
    private Label welcomeLabel;

    @FXML
    public void initialize() {

        pemilik = (PemilikKendaraan) Session.getUser();
        welcomeLabel.setText("Halo, " + pemilik.getUsername()+ "!");
    }

    @FXML
    private void openTrips() {
        SceneUtil.switchScene("/ui/trips.fxml");
    }

    @FXML
    private void openVehicles() {
        SceneUtil.switchScene("/ui/vehicles.fxml");
    }

    @FXML
    private void openInsight() {
        SceneUtil.switchScene("/ui/insight.fxml");
    }
}
