package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import dao.UserDAO;
import dto.UserResponse;
import model.User;

import java.io.IOException;

import static util.HttpUtil.*;

public class UserHandler implements HttpHandler {

    private final UserDAO userDao = new UserDAO();

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
            error(ex, 400, "Invalid user id");
            return;
        }

        User user = userDao.findById(id);
        if (user == null) {
            error(ex, 404, "User not found");
            return;
        }

        json(ex, 200, UserResponse.from(user));
    }
}
