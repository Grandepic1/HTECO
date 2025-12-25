package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import dao.UserDAO;
import model.PemilikKendaraan;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.IOException;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class KendaraanHandler implements HttpHandler {

    private static final Gson gson = new Gson();
    private static final UserDAO userDao = new UserDAO();

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
            exchange.sendResponseHeaders(405, -1);
            return;
        }

        URI uri = exchange.getRequestURI();
        Map<String, String> query = parseQuery(uri.getQuery());

        JsonObject response = new JsonObject();
        int statusCode = 200;

        if (query.containsKey("userId")) {
            try {
                int userId = Integer.parseInt(query.get("userId"));
                PemilikKendaraan user = (PemilikKendaraan) userDao.findById(userId);

                if (user == null) {
                    statusCode = 404;
                    response.addProperty("error", "User not found");
                } else {
                    response.addProperty("userId", userId);
                    response.add(
                            "kendaraans",
                            gson.toJsonTree(user.getKendaraans()));
                }

            } catch (NumberFormatException e) {
                statusCode = 400;
                response.addProperty("error", "Invalid userId");
            }
        } else {
            response.addProperty("mode", "all");
            response.addProperty("message", "Semua kendaraan");
        }

        byte[] bytes = response.toString().getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        exchange.getResponseBody().write(bytes);
        exchange.close();
    }

    private Map<String, String> parseQuery(String query) {
        Map<String, String> map = new HashMap<>();

        if (query == null || query.isEmpty())
            return map;

        for (String pair : query.split("&")) {
            String[] parts = pair.split("=", 2);
            if (parts.length == 2) {
                map.put(
                        URLDecoder.decode(parts[0], StandardCharsets.UTF_8),
                        URLDecoder.decode(parts[1], StandardCharsets.UTF_8));
            }
        }
        return map;
    }
}
