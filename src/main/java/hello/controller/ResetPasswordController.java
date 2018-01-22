package hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import hello.model.Account;
import hello.model.AccountRepository;

/**
 * Class ResetPasswordController
 * This class is used to reset password
 * Mapping URL: /api/reset-password/
 *
 * @author wei
 * @version 0.0.1
 */
@RestController
@RequestMapping("/api/reset-password/")
public class ResetPasswordController {
    @Autowired
    private AccountRepository accountRepository;

    /*
     *Mapping post method
     */
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Status post(@RequestParam(value = "username", defaultValue = "") String username,
                             @RequestParam(value = "password", defaultValue = "") String password,
                             @RequestParam(value = "newpassword", defaultValue = "") String newpassword) {

        //Check paras
        if (username.equals("") || password.equals("") || newpassword.equals("")) {
            return new Status(false, "Invalid data");
        }

        //check the username is match with the password or not;
        Account account = accountRepository.findByUsername(username);
        if (account.getPassword().equals(password)) {
            account.setPassword(newpassword);
            accountRepository.save(account);
        }
        return new Status(true, "success!");
    }
}
