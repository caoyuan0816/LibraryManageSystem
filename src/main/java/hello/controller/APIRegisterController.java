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
     *
     * @param username from URL
     * @param password from URL
     * @param email    from URL
     * @return the object render to JSON format
     */
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Status post(@RequestParam(value = "username", defaultValue = "") String username,
                @RequestParam(value = "password", defaultValue = "") String password,
                @RequestParam(value = "email", defaultValue = "") String email) {

        //Check paras legally
        if (username.equals("") || password.equals("") || email.equals("")) {
            return new Status(false, "Invalid data.");
        }

        //Check the username is not exist
        if (accountRepository.findByUsername(username) != null) {
            return new Status(false, "Username already used.");
        } else if (accountRepository.findByEmail(email) != null) {
            //Check the email is not exist
            return new Status(false, "Email already used.");
        } else {
            //Try to sent a email to user
            String code = RandomGenerator.next();
            try {
                EmailSender.sendTo(email, "<h1>Hello," + username + "</h1>" +
                        "<p>We congratuate you to join us as a member!</p>" +
                        "<p>what you need to do is validating your email! You can use the following link within the next day to validate your email:</p>" +
                        "<p><a href=http://test.yuan25.com/activate/?username=" + username + "&code=" + code + "><h2>click this link to validate your email</h2></a></p>" +
                        "<p>Thanks,</p>" +
                        "<p>Your friends at BayMax</p>");
            } catch (Exception e) {
                //Email sent failed
                return new Status(false, "Can not sent email.");
            }

            //save the new account into database
            accountRepository.save(new Account(username, password, email, code));
        }

        //Register success
        return new Status(true, "Register success! Please check your email!");
    }
}
