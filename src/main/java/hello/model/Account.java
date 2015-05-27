/**
 * Created by yuan on 15/5/17.
 */
package hello.model;

import org.springframework.data.annotation.Id;

/**
 * Class Account : the user class in this system
 *
 * @author yuan
 * @modify 2015-05-22 19:56:29
 */
public class Account {

    //Auto yield
    @Id
    private String id;

    //properties
    private String username;
    private String password;
    private String email;
    private boolean validated;
    private String validateCode;

    public Account(String username, String password, String email, String validateCode) {
        this.username = username;
        this.password = password;
        this.email = email;
        validated = false;
        this.validateCode = validateCode;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getValidateCode() {
        return validateCode;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void passValidate() {
        validated = true;
    }

    public boolean isValidated() {
        return validated;
    }

    @Override
    public String toString() {
        return String.format(
                "Account[id=%s, name='%s', password='%s', email='']",
                id, username, password, email);
    }
}
