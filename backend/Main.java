
import com.sun.net.httpserver.HttpServer;

import handler.KendaraanHandler;
import handler.LoginHandler;
import handler.RegisterHandler;
import handler.StatusHandler;
import handler.UserHandler;

import java.net.InetSocketAddress;

public class Main {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/login", new LoginHandler());
        server.createContext("/api/register", new RegisterHandler());
        server.createContext("/api/status", new StatusHandler());
        server.createContext("/users", new UserHandler());
        server.createContext("/users/", new KendaraanHandler());

        server.setExecutor(null);
        server.start();

        System.out.println("Server running on http://localhost:8080");
    }
}
