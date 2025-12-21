package ui;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import service.AuthService;
import util.SceneUtil;

public class RegisterController {
    private AuthService authService = new AuthService();

    @FXML
    private TextField nameField;
    @FXML
    private TextField emailField;
    @FXML
    private PasswordField passwordField;
    @FXML
    private PasswordField confirmPasswordField;

    @FXML
    private void onRegister() {
        String name = nameField.getText();
        String email = emailField.getText();
        String password = passwordField.getText();
        String confirm = confirmPasswordField.getText();

        if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
            showAlert("Error", "Semua field wajib diisi.");
            return;
        }

        if (!password.equals(confirm)) {
            showAlert("Error", "Password tidak cocok.");
            return;
        }

        try {
            authService.registerUser(name, email, password);
            SceneUtil.switchScene("/ui/login.fxml");
        } catch (Exception e) {
            System.out.println("Something went wrong");
        }
    }

    @FXML
    private void onLogin() {
        System.out.println("Navigate to Login page");
    }

    private void showAlert(String title, String message) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.show();
    }
}
