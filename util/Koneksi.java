package util;
import com.mysql.cj.jdbc.MysqlConnectionPoolDataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 *
 * @author revaldo
 */
public class Koneksi {
    private final MysqlConnectionPoolDataSource dataSource = new MysqlConnectionPoolDataSource();
    private final String DB_URL = "jdbc:mysql://localhost:3306/hteco";
    private final String username = "root";
    private final String password = "";

    public Connection getConnection() throws SQLException {
        dataSource.setURL(DB_URL);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        Connection conn = dataSource.getConnection();

        return conn;
    }
}