package service;
import org.mindrot.jbcrypt.BCrypt;

import dao.UserDAO;
import model.Role;
import model.User;

public class AuthService {

    private UserDAO userDAO = new UserDAO();

    public User login(String username, String password) {
        User user = userDAO.findByUsername(username);

        if (user == null){
            return null;
        }
        if (!BCrypt.checkpw(password, user.getPasswordHash())) {
            return null;
        }

        return user;
    }

    public boolean registerUser(String username, String email, String password) {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        return userDAO.insertUser(username, email, hashedPassword, Role.USER);
    }

    public boolean registerAdmin(String username, String email, String password) {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        return userDAO.insertUser(username, email, hashedPassword, Role.ADMIN);
    }
}
