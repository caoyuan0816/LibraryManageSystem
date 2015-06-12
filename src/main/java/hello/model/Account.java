/**
 * Created by yuan on 15/5/17.
 */
package hello.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;

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

    private int borrownum;

    private boolean validated;
    private String validateCode;

    private ArrayList<String> roles;

    public Account(String username, String password, String email, String validateCode) {
        this.username = username;
        this.password = password;
        this.email = email;
        validated = false;
        this.validateCode = validateCode;
        roles = new ArrayList<String>();
        roles.add("ROLE_USER");
        borrownum = 0;
//        roles.add("ROLE_ADMIN");
        //roles.add("ROLE_STAFF");
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

    public void addRole(String role){
        roles.add(role);
    }

    public ArrayList<String> getRoles() {
        return roles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getBorrownum() {
        return borrownum;
    }

    public void setBorrownum(int borrownum) {
        this.borrownum = borrownum;
    }

    @Override
    public String toString() {
        return String.format(
                "Account[id=%s, name='%s', password='%s', email='']",
                id, username, password, email);
    }

    public boolean equals(Account account) {
        return account.getId().equals(id);
    }
}
