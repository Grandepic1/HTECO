package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import model.User;
import service.AuthService;

public class RegisterHandler implements HttpHandler {
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
            String email = json.get("email").getAsString();
            String password = json.get("password").getAsString();

            boolean success = authService.registerUser(username, email, password);

            if (!success) {
                exchange.sendResponseHeaders(401, -1);
                return;
            }

            JsonObject responseJson = new JsonObject();

            responseJson.addProperty("error", false);
            responseJson.addProperty("message", "User successfully added");
           
            String response = responseJson.toString();

            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes);
            exchange.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
