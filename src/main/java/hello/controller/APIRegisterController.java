/**
 * Created by yuan on 15/5/17.
 */
package hello.controller;

import hello.model.Account;
import hello.model.AccountRepository;
import hello.utils.EmailSender;
import hello.utils.RandomGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Class used to record register result
 *
 * @author yuan
 * @version 0.0.2
 * @modify 2015-05-22 19:54:30
 */
class RegisterStatus {

    //true or false
    private final boolean status;

    //The reason text of status
    private final String message;

    RegisterStatus(boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public boolean isStatus() {
        return status;
    }
}

/**
 * Class APIRegisterController
 * Use to handle the requests of register
 * Mapping URL: /api/register/
 *
 * @author yuan
 * @version 0.0.2
 * @modify 2015-05-22 19:17:20
 */
@RestController
@RequestMapping("/api/register/")
public class APIRegisterController {

    @Autowired
    private AccountRepository accountRepository;

    /**
     * Mapping POST method
     * @param username from URL
     * @param password from URL
     * @param email from URL
     * @return the object render to JSON format
     */
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    RegisterStatus post(@RequestParam(value = "username", defaultValue = "") String username,
                        @RequestParam(value = "password", defaultValue = "") String password,
                        @RequestParam(value = "email", defaultValue = "") String email) {

        //Check paras legally
        if (username.equals("") || password.equals("") || email.equals("")) {
            return new RegisterStatus(false, "Invalid data.");
        }

        //Check the username is not exist
        if (accountRepository.findByUsername(username) != null) {
            return new RegisterStatus(false, "Username already used.");
        } else if (accountRepository.findByEmail(email) != null) {
            //Check the email is not exist
            return new RegisterStatus(false, "Email already used.");
        } else {
            //Try to sent a email to user
            String code = RandomGenerator.next();
            try {
                EmailSender.sendTo(email, "<h1>Hello,"+username+"</h1><a href=\"http://192.168.195.164/activate/?username="+ username +"&code="+ code +"\"><h2>there is a link to validate your email</h2></a>");
            } catch (Exception e) {
                //Email sent failed
                return new RegisterStatus(false, "Can not sent email.");
            }

            //save the new account into database
            accountRepository.save(new Account(username, password, email, code));
        }

        //Register success
        return new RegisterStatus(true, "Register success! Please check your email!");
    }
}
