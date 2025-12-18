package ui;

import util.SceneUtil;

public class NavbarNotLoggedIn {
    public void handleLogin() {
        SceneUtil.switchScene("/ui/login.fxml");
    }

    public void handleRegister() {
        SceneUtil.switchScene("/ui/register.fxml");
    }
}
