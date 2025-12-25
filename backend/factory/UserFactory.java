package factory;
import model.Admin;
import model.PemilikKendaraan;
import model.Role;
import model.User;

public class UserFactory {
    public static User createUser(
            int id,
            String username,
            String email,
            String passwordHash,
            Role role) {

        switch (role) {
            case ADMIN -> {
                return new Admin(id, username, email, passwordHash);
            }
            case USER -> {
                return new PemilikKendaraan(id, username, email, passwordHash);
            }
            default -> throw new IllegalArgumentException("Unknown role");
        }
    }

}
