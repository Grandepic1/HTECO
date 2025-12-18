import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.stage.Screen;
import javafx.geometry.Rectangle2D;
import util.SceneUtil;

public class Main extends Application {

    @Override
    public void start(Stage stage) throws Exception {

        Rectangle2D screen = Screen.getPrimary().getVisualBounds();

        Parent root = FXMLLoader.load(
                getClass().getResource("/ui/Landing.fxml"));

        Scene scene = new Scene(
                root,
                screen.getWidth(),
                screen.getHeight());

        stage.setScene(scene);
        stage.setTitle("HTECO");
        scene.getStylesheets().add(
            getClass().getResource("/ui/landing.css").toExternalForm()
        );


        // register stage
        SceneUtil.setStage(stage);

        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
