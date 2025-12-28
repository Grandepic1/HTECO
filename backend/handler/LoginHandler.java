package handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import model.User;
import service.AuthService;
import util.HttpHelper;

public class LoginHandler extends BaseHandler {
    private static final Gson gson = new Gson();

    private static final AuthService authService = new AuthService();

    @Override
    protected void execute(HttpExchange exchange) throws Exception {
        System.out.println("HIT 1");
        if (!HttpHelper.isMethod(exchange, "POST")) {
            methodNotAllowed(exchange);
            return;
        }
        System.out.println("HIT 2");
        String body = HttpHelper.readRequestBody(exchange);
        JsonObject json = gson.fromJson(body, JsonObject.class);
        System.out.println("HIT 3");
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
