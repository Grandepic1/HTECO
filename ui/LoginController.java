package ui;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import model.User;
import service.AuthService;
import util.SceneUtil;
import util.Session;

public class LoginController {

    private AuthService authService = new AuthService();
    @FXML
    private Button btnUser;
    @FXML
    private Button btnAdmin;
    @FXML
    private Button loginButton;
    @FXML
    private TextField usernameField;
    @FXML
    private PasswordField passwordField;

    @FXML
    private Label errorLabel;
    

    private String role = "user";

    @FXML
    public void initialize() {
        updateRoleUI();
    }

    @FXML
    private void onSelectUser() {
        role = "user";
        updateRoleUI();
    }

    @FXML
    private void onSelectAdmin() {
        role = "admin";
        updateRoleUI();
    }

    private void updateRoleUI() {
        String activeStyle = """
                    -fx-background-color: white;
                    -fx-text-fill: #0f172a;
                    -fx-font-weight: bold;
                    -fx-background-radius: 8;
                """;

        String inactiveStyle = """
                    -fx-background-color: transparent;
                    -fx-text-fill: #64748b;
                """;

        btnUser.setStyle(role.equals("user") ? activeStyle : inactiveStyle);
        btnAdmin.setStyle(role.equals("admin") ? activeStyle : inactiveStyle);

        loginButton.setText(
                role.equals("admin") ? "Login as Admin" : "Login as User");
    }

    @FXML
    private void onLogin() {
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
        SceneUtil.switchScene("/ui/dashboard.fxml");
    }

    @FXML
    private void onRegister() {
        SceneUtil.switchScene("/ui/register.fxml");
    }
}
