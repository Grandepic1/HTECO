package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import dao.UserDAO;
import model.User;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class UserHandler implements HttpHandler {

    private static final Gson gson = new Gson();
    private static final UserDAO userDao = new UserDAO();

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
            exchange.sendResponseHeaders(405, -1);
            return;
        }

        String[] parts = exchange.getRequestURI().getPath().split("/");

        // Expected: /users/{id}
        if (parts.length != 3) {
            send(exchange, 404, "Endpoint not found");
            return;
        }

        try {
            int userId = Integer.parseInt(parts[2]);
            User user = userDao.findById(userId);

            if (user == null) {
                send(exchange, 404, "User not found");
                return;
            }

            byte[] bytes = gson.toJsonTree(user)
                    .toString()
                    .getBytes(StandardCharsets.UTF_8);

            exchange.getResponseHeaders()
                    .set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes);
            exchange.close();

        } catch (NumberFormatException e) {
            send(exchange, 400, "Invalid user id");
        }
    }

    private void send(HttpExchange ex, int code, String msg)
            throws IOException {

        JsonObject obj = new JsonObject();
        obj.addProperty("error", msg);

        byte[] bytes = obj.toString()
                .getBytes(StandardCharsets.UTF_8);

        ex.sendResponseHeaders(code, bytes.length);
        ex.getResponseBody().write(bytes);
        ex.close();
    }
}
