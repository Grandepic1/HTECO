package handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import model.User;
import service.AuthService;
import util.HttpHelper;

public class LoginHandler extends BaseHandler {

    private static final AuthService authService = new AuthService();

    @Override
    protected void execute(HttpExchange exchange) throws Exception {

        if (!HttpHelper.isMethod(exchange, "POST")) {
            methodNotAllowed(exchange);
            return;
        }

        String body = HttpHelper.readRequestBody(exchange);
        JsonObject json = Gson().fromJson(body, JsonObject.class);

        String username = json.get("username").getAsString();
        String password = json.get("password").getAsString();

        User user = authService.login(username, password);

        if (user == null) {
            HttpHelper.sendStatus(exchange, 401);
            return;
        }

        JsonObject response = new JsonObject();
        response.addProperty("id", user.getId());
        response.addProperty("username", user.getUsername());
        response.addProperty("email", user.getEmail());
        response.addProperty("role", user.getRole().name());

        HttpHelper.sendJson(exchange, 200, response);
    }
}
