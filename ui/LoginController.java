package ui;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import model.User;
import service.AuthService;
import util.Session;

public class LoginController {

    private AuthService authService = new AuthService();

    @FXML
    private TextField usernameField;
    @FXML
    private PasswordField passwordField;
    @FXML
    private Label errorLabel;

    public void handleLogin() {
        try {
            User user = authService.login(
                    usernameField.getText(),
                    passwordField.getText());

            Session.setUser(user);
            openDashboard();

        } catch (Exception e) {
            errorLabel.setText("Invalid username or password");
        }
    }

    private void openDashboard() {
        try {
            Stage stage = (Stage) usernameField.getScene().getWindow();
            Parent root = FXMLLoader.load(
                    getClass().getResource("/ui/dashboard.fxml"));
            stage.setScene(new Scene(root));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
