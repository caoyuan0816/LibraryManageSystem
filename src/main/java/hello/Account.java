package hello;

import org.springframework.data.annotation.Id;

/**
 * Created by yuan on 15/5/17.
 */
public class Account {
    @Id
    private String id;

    private String username;
    private String password;

    public Account(String username, String password){
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {

        return password;
    }

    @Override
    public String toString() {
        return String.format(
                "Account[id=%s, name='%s', password='%s']",
                id, username, password);
    }
}
