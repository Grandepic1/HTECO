
import com.sun.net.httpserver.HttpServer;
import handler.FaktorEmisiHandler;
import handler.KendaraanHandler;
import handler.LoginHandler;
import handler.RegisterHandler;
import handler.StatusHandler;
import java.net.InetSocketAddress;

public class Main {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(5000), 0);

        server.createContext("/api/login", new LoginHandler());
        server.createContext("/api/register", new RegisterHandler());
        server.createContext("/api/status", new StatusHandler());
        server.createContext("/api/kendaraan", new KendaraanHandler());
        server.createContext("/api/faktoremisi", new FaktorEmisiHandler());
       

        server.setExecutor(null);
        server.start();

        System.out.println("Server running on http://localhost:5000");
    }
}
