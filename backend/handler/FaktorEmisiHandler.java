package handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import java.util.HashMap;

import model.FaktorEmisi;
import service.FaktorEmisiService;
import util.HttpHelper;

public class FaktorEmisiHandler extends BaseHandler {

    private final Gson gson = new Gson();
    private final FaktorEmisiService service = new FaktorEmisiService();

    @Override
    protected void execute(HttpExchange exchange) throws Exception {

        if (HttpHelper.isMethod(exchange, "GET")) {
            handleGet(exchange);
            return;
        }

        if (HttpHelper.isMethod(exchange, "POST")) {
            handlePost(exchange);
            return;
        }

        if (HttpHelper.isMethod(exchange, "PUT")) {
            handlePut(exchange);
            return;
        }

        if (HttpHelper.isMethod(exchange, "DELETE")) {
            handleDelete(exchange);
            return;
        }

        methodNotAllowed(exchange);
    }

    // =========================
    // GET
    // =========================
    private void handleGet(HttpExchange exchange) throws Exception {

        HashMap<String, String> params = HttpHelper.getQueryParams(exchange);

        if (params.containsKey("id")) {
            int id = Integer.parseInt(params.get("id"));
            FaktorEmisi fe = service.getById(id);

            if (fe == null) {
                HttpHelper.sendStatus(exchange, 404);
                return;
            }

            HttpHelper.sendJson(exchange, 200, fe);
            return;
        }

        HttpHelper.sendJson(exchange, 200, service.getAll());
    }

    // =========================
    // POST (ADMIN)
    // =========================
    private void handlePost(HttpExchange exchange) throws Exception {

        JsonObject json = gson.fromJson(
                HttpHelper.readRequestBody(exchange),
                JsonObject.class);

        if (json == null ||
                !json.has("jenis") ||
                !json.has("faktor")) {

            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        boolean success = service.add(
                json.get("jenis").getAsString(),
                json.get("faktor").getAsDouble());

        if (!success) {
            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        JsonObject res = new JsonObject();
        res.addProperty("success", true);
        res.addProperty("message", "Faktor emisi berhasil ditambahkan");

        HttpHelper.sendJson(exchange, 201, res);
    }

    // =========================
    // PUT (ADMIN)
    // =========================
    private void handlePut(HttpExchange exchange) throws Exception {

        JsonObject json = gson.fromJson(
                HttpHelper.readRequestBody(exchange),
                JsonObject.class);

        if (json == null ||
                !json.has("id") ||
                !json.has("faktor")) {

            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        boolean success = service.update(
                json.get("id").getAsInt(),
                json.get("faktor").getAsDouble());

        if (!success) {
            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        HttpHelper.sendStatus(exchange, 204);
    }

    // =========================
    // DELETE (ADMIN)
    // =========================
    private void handleDelete(HttpExchange exchange) throws Exception {

        HashMap<String, String> params = HttpHelper.getQueryParams(exchange);

        if (!params.containsKey("id")) {
            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        service.delete(Integer.parseInt(params.get("id")));
        HttpHelper.sendStatus(exchange, 204);
    }
}
