package handler;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import model.User;
import service.AuthService;

public class LoginHandler implements HttpHandler {
    private static final AuthService authService = new AuthService();
    private Gson gson = new Gson();

    @Override
    public void handle(HttpExchange exchange) {
        try {
            if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                exchange.sendResponseHeaders(405, -1);
                return;
            }

            InputStream is = exchange.getRequestBody();
            String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);

            JsonObject json = gson.fromJson(body, JsonObject.class);

            String username = json.get("username").getAsString();
            String password = json.get("password").getAsString();

            User user = authService.login(username, password);

            if (user == null) {
                exchange.sendResponseHeaders(401, -1);
                return;
            }

            String response = """
                    {
                      "id": %d,
                      "username: "%s",
                      "email": "%s",
                      "role": "%s"
                    }
                    """.formatted(user.getId(), user.getUsername(), user.getEmail(), user.getRole());

            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.length());
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
