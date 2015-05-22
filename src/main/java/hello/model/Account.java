/**
 * Created by yuan on 15/5/17.
 */
package hello.model;

import org.springframework.data.annotation.Id;

/***
 * @author yuan
 * @modify 15/5/22
 */
public class Account {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private boolean validated;

    public Account(String username, String password, String email){
        this.username = username;
        this.password = password;
        this.email = email;
        validated = false;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {

        return password;
    }

    public String getEmail(){
        return email;
    }

    public void passValidate(){
        validated = true;
    }

    public boolean isValidated() {
        return validated;
    }

    @Override
    public String toString() {
        return String.format(
                "Account[id=%s, name='%s', password='%s', email='']",
                id, username, password);
    }
}
