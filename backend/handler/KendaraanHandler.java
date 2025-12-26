package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import dao.KendaraanDAO;
import model.Kendaraan;

import java.io.IOException;

import static util.HttpUtil.*;

public class KendaraanHandler implements HttpHandler {

    private final KendaraanDAO kendaraanDao = new KendaraanDAO();

    @Override
    public void handle(HttpExchange ex) throws IOException {

        if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
            ex.sendResponseHeaders(405, -1);
            return;
        }

        String[] parts = ex.getRequestURI().getPath().split("/");
        if (parts.length != 3) {
            error(ex, 404, "Endpoint not found");
            return;
        }

        int id;
        try {
            id = Integer.parseInt(parts[2]);
        } catch (NumberFormatException e) {
            error(ex, 400, "Invalid kendaraan id");
            return;
        }

        Kendaraan k = kendaraanDao.findById(id);
        if (k == null) {
            error(ex, 404, "Kendaraan not found");
            return;
        }

        json(ex, 200, k);
    }
}
