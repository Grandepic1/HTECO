package handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import service.AuthService;
import util.HttpHelper;

public class RegisterHandler extends BaseHandler {

    private static final AuthService authService = new AuthService();
    private static final Gson gson = new Gson();

    @Override
    protected void execute(HttpExchange exchange) throws Exception {

        if (!HttpHelper.isMethod(exchange, "POST")) {
            methodNotAllowed(exchange);
            return;
        }

        String body = HttpHelper.readRequestBody(exchange);
        JsonObject json = gson.fromJson(body, JsonObject.class);

        String username = json.get("username").getAsString();
        String email = json.get("email").getAsString();
        String password = json.get("password").getAsString();

        boolean success = authService.registerUser(username, email, password);

        if (!success) {
            HttpHelper.sendStatus(exchange, 401);
            return;
        }

        JsonObject response = new JsonObject();
        response.addProperty("success", true);
        response.addProperty("message", "New Registered successfully added");

        HttpHelper.sendJson(exchange, 200, response);
    }
}
