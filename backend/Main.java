package backend;
import com.sun.net.httpserver.HttpServer;
import handler.LoginHandler;
import handler.StatusHandler;
import java.net.InetSocketAddress;

public class Main {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/login", new LoginHandler());
        server.createContext("/api/status", new StatusHandler());

        server.setExecutor(null);
        server.start();

        System.out.println("Server running on http://localhost:8080");
    }
}
