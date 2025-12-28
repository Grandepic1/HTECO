package util;

import com.sun.net.httpserver.HttpExchange;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class HttpHelper {

        private static final Gson gson = new Gson();

        private HttpHelper() {
                // utility class
        }

        // Read raw request body
        public static String readRequestBody(HttpExchange exchange) throws IOException {
                InputStream is = exchange.getRequestBody();
                return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }

        // Parse JSON body into object
        public static <T> T readJson(HttpExchange exchange, Class<T> clazz) throws IOException {
                String body = readRequestBody(exchange);
                return gson.fromJson(body, clazz);
        }

        // Send JSON response
        public static void sendJson(
                        HttpExchange exchange,
                        int statusCode,
                        Object responseObj) throws IOException {

                String json = gson.toJson(responseObj);
                byte[] bytes = json.getBytes(StandardCharsets.UTF_8);

                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(statusCode, bytes.length);

                try (OutputStream os = exchange.getResponseBody()) {
                        os.write(bytes);
                }
        }

        // Send response without body
        public static void sendStatus(HttpExchange exchange, int statusCode) throws IOException {
                exchange.sendResponseHeaders(statusCode, -1);
                exchange.close();
        }

        // Check HTTP method
        public static boolean isMethod(HttpExchange exchange, String method) {
                return exchange.getRequestMethod().equalsIgnoreCase(method);
        }

        public static HashMap<String, String> getQueryParams(HttpExchange exchange) {
                HashMap<String, String> params = new HashMap<>();
                String query = exchange.getRequestURI().getQuery();

                if (query == null || query.isEmpty()) {
                        return params;
                }

                for (String pair : query.split("&")) {
                        String[] kv = pair.split("=", 2);
                        if (kv.length == 2) {
                                params.put(kv[0], kv[1]);
                        }
                }
                return params;
        }

}
