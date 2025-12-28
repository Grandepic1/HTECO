package handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import util.HttpHelper;

public abstract class BaseHandler implements HttpHandler {

    @Override
    public final void handle(HttpExchange exchange) {
        try {
            addCorsHeaders(exchange);

            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            execute(exchange);

        } catch (Exception e) {
            e.printStackTrace();
            try {
                HttpHelper.sendStatus(exchange, 500);
            } catch (Exception ignored) {
            }
        }
    }

    private void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    protected abstract void execute(HttpExchange exchange) throws Exception;

    protected void methodNotAllowed(HttpExchange exchange) throws Exception {
        HttpHelper.sendStatus(exchange, 405);
    }
}
