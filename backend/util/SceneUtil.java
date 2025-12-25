package util;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public final class SceneUtil {

    private static Stage primaryStage;

    private SceneUtil() {
        // prevent instantiation
    }

    /**
     * Must be called once from Main.start()
     */
    public static void setStage(Stage stage) {
        primaryStage = stage;
    }

    /**
     * Safely switch scene without resizing the window
     */
    public static void switchScene(String fxmlPath) {
        if (primaryStage == null) {
            throw new IllegalStateException("Stage not set in SceneUtil");
        }

        try {
            FXMLLoader loader = new FXMLLoader(
                    SceneUtil.class.getResource(fxmlPath));
            Parent root = loader.load();

            Scene currentScene = primaryStage.getScene();

            Scene newScene;
            if (currentScene == null) {
                newScene = new Scene(root);
            } else {
                newScene = new Scene(
                        root,
                        currentScene.getWidth(),
                        currentScene.getHeight());
            }

            primaryStage.setScene(newScene);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
