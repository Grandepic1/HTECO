package handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import dao.KendaraanDAO;
import dao.UserDAO;

import java.io.IOException;
import java.util.ArrayList;
import model.Kendaraan;

import java.util.HashMap;
import model.PemilikKendaraan;
import service.KendaraanService;
import util.HttpHelper;

public class KendaraanHandler extends BaseHandler {
    private final KendaraanDAO kendaraanDAO = new KendaraanDAO();
    private final Gson gson = new Gson();
    private final KendaraanService kendaraanService = new KendaraanService();
    @Override
    protected void execute(HttpExchange exchange) throws Exception {
        if (HttpHelper.isMethod(exchange, "POST")){
            handlePost(exchange);
            return;
        }

        if (HttpHelper.isMethod(exchange, "GET")){
            handleGet(exchange);
            return;
        }

        methodNotAllowed(exchange);

    }

    private void handleGet(HttpExchange exchange) throws Exception{
        HashMap<String, String> params = HttpHelper.getQueryParams(exchange);

        if (params.containsKey("id")){
            int id = Integer.parseInt(params.get("id"));
            Kendaraan kendaraan = kendaraanDAO.findById(id);
            if (kendaraan==null){
                HttpHelper.sendStatus(exchange, 400);
                return;
            }

            HttpHelper.sendJson(exchange, 200, kendaraan);
            return;
        }
        if (params.containsKey("userId")){
            int id = Integer.parseInt(params.get("userId"));

            ArrayList<Kendaraan> kendaraans = kendaraanDAO.findByUserId(id);

            HttpHelper.sendJson(exchange, 200, kendaraans);
            return;
        }
        ArrayList<Kendaraan> all = kendaraanDAO.getAll();
        HttpHelper.sendJson(exchange, 200, all);
    }

    private void handlePost(HttpExchange exchange) throws Exception {

        String body = HttpHelper.readRequestBody(exchange);
        JsonObject json = gson.fromJson(body, JsonObject.class);

        if (json == null) {
            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        // Validate required fields
        String[] required = {
                "userId",
                "platNomor",
                "nama",
                "jenis",
                "emisiId",
                "efisiensi"
        };

        for (String key : required) {
            if (!json.has(key) || json.get(key).isJsonNull()) {
                JsonObject error = new JsonObject();
                error.addProperty("error", true);
                error.addProperty("message", "Missing field: " + key);
                HttpHelper.sendJson(exchange, 400, error);
                return;
            }
        }

        int userId = json.get("userId").getAsInt();
        String platNomor = json.get("platNomor").getAsString();
        String nama = json.get("nama").getAsString();
        String jenis = json.get("jenis").getAsString();
        int emisiId = json.get("emisiId").getAsInt();
        double efisiensi = json.get("efisiensi").getAsDouble();

        boolean success = kendaraanService.addKendaraan(
                userId,
                nama,
                platNomor,
                jenis,
                emisiId,
                efisiensi);

        if (!success) {
            HttpHelper.sendStatus(exchange, 400);
            return;
        }

        JsonObject response = new JsonObject();
        response.addProperty("success", true);
        response.addProperty("message", "Kendaraan successfully added");

        HttpHelper.sendJson(exchange, 201, response);
    }   
    
}
