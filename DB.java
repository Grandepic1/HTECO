import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author revaldo
 */
public class DB {
    private Connection conn;
    private final Koneksi k = new Koneksi();

    public User login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ?";

        try (Connection conn = k.getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            if (!rs.next()) {
                return null; // username not found
            }

            String storedPassword = rs.getString("password");

            // Compare raw passwords (not recommended)
            if (!storedPassword.equals(password)) {
                return null; // wrong password
            }

            // Create and return User object
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setRole(Role.valueOf(rs.getString("role")));

            return user;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
