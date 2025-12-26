package dto;

import model.User;

public class UserResponse {

    public int id;
    public String username;
    public String email;
    public String role;

    public static UserResponse from(User user) {
        UserResponse dto = new UserResponse();
        dto.id = user.getId();
        dto.username = user.getUsername();
        dto.email = user.getEmail();
        dto.role = user.getRole().name();
        return dto;
    }
}
