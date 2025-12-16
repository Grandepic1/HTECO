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

        errorLabel.setVisible(false);

        User user = authService.login(
                usernameField.getText(),
                passwordField.getText());

        if (user == null) {
            errorLabel.setText("Invalid username or password");
            errorLabel.setVisible(true);
            return;
        }
        Session.setUser(user);
        openDashboard();

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
