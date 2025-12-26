package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import dao.KendaraanDAO;
import dao.UserDAO;
import model.Kendaraan;
import model.User;

import java.io.IOException;
import java.util.List;

import static util.HttpUtil.*;

public class UserKendaraanHandler implements HttpHandler {

    private final UserDAO userDao = new UserDAO();
    private final KendaraanDAO kendaraanDao = new KendaraanDAO();

    @Override
    public void handle(HttpExchange ex) throws IOException {

        String[] parts = ex.getRequestURI().getPath().split("/");

        // /users/{id}/kendaraan
        if (parts.length != 4 || !parts[3].equals("kendaraan")) {
            ex.sendResponseHeaders(404, -1);
            return;
        }

        int userId;
        try {
            userId = Integer.parseInt(parts[2]);
        } catch (NumberFormatException e) {
            error(ex, 400, "Invalid user id");
            return;
        }

        User user = userDao.findById(userId);
        if (user == null) {
            error(ex, 404, "User not found");
            return;
        }

        switch (ex.getRequestMethod()) {
            case "GET" -> handleGet(ex, userId);
            case "POST" -> handlePost(ex, userId);
            default -> ex.sendResponseHeaders(405, -1);
        }
    }

    private void handleGet(HttpExchange ex, int userId)
            throws IOException {

        List<Kendaraan> list = kendaraanDao.findByUserId(userId);
        json(ex, 200, list);
    }

    private void handlePost(HttpExchange ex, int userId)
            throws IOException {

        String body = readBody(ex);
        Kendaraan k = gson.fromJson(body, Kendaraan.class);

        if (k.getNama() == null || k.getJenis() == null) {
            error(ex, 400, "Invalid kendaraan data");
            return; 
        }

        kendaraanDao.insert(
                userId,
                k.getNama(),
                k.getJenis(),
                k.getEmisiId(),
                k.getEfisiensi());

        json(ex, 201, k);
    }

}
