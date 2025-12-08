
import java.util.Scanner;

public class Main {
    private static User currentUser = null;
    public static void main(String[] args) {
        DB database = new DB();

        Scanner input = new Scanner(System.in);

        String username = input.next();
        String password = input.next();

        currentUser = database.login(username, password);

        System.out.println("User: "+currentUser.getUsername());
    }
}
