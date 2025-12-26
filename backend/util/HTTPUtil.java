package util;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public final class HttpUtil {

    private static final Gson gson = new Gson();

    private HttpUtil() {
    }

    public static void json(HttpExchange ex, int status, Object data)
            throws IOException {

        byte[] bytes = gson.toJson(data)
                .getBytes(StandardCharsets.UTF_8);

        ex.getResponseHeaders()
                .set("Content-Type", "application/json; charset=UTF-8");
        ex.sendResponseHeaders(status, bytes.length);
        ex.getResponseBody().write(bytes);
        ex.close();
    }

    public static void json(HttpExchange ex, int status, JsonElement json)
            throws IOException {

        byte[] bytes = json.toString()
                .getBytes(StandardCharsets.UTF_8);

        ex.getResponseHeaders()
                .set("Content-Type", "application/json; charset=UTF-8");
        ex.sendResponseHeaders(status, bytes.length);
        ex.getResponseBody().write(bytes);
        ex.close();
    }

    public static void error(HttpExchange ex, int status, String message)
            throws IOException {

        JsonObject obj = new JsonObject();
        obj.addProperty("error", message);
        json(ex, status, obj);
    }

    public static String readBody(HttpExchange ex)
            throws IOException {

        return new String(
                ex.getRequestBody().readAllBytes(),
                StandardCharsets.UTF_8);
    }
}
