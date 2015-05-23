package hello.controller;

import hello.model.Account;
import hello.model.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Created by yang on 2015/5/22.
 * This class is built to solve the activation link sent to users
 * to activate their accounts.
 *
 * @author yang
 * @version 1.0
 */
@Controller
@RequestMapping("/activate/")
public class RegisterActiveController {
    /**
     * this method is used to get the username and validatecode sent to the user's email
     * and check if it is the user itself who do the register action
     *
     * @param username
     * @param validatecode
     * @return
     */
    //New a AccountRepository to check if the email validation link is correct
    @Autowired
    private AccountRepository accountRepository;
    private Account user_account;

    @RequestMapping(method = RequestMethod.GET)
    public String get(@RequestParam("username") String username,
                      @RequestParam("code") String validatecode,
                      Model model) {
        user_account = accountRepository.findByUsername(username);
        if (validatecode.equals(user_account.getValidateCode())) {
            if (user_account.isValidated()) {
                model.addAttribute("register_active_message", ":) You already has been authenticated. Don't repeat.");
            }
            user_account.passValidate();
            accountRepository.save(user_account);

            model.addAttribute("register_active_message", ":) Your account can use now, Please login!");

        } else {
            model.addAttribute("register_active_message", " :( Something bad, maybe you should resent validate email..");
        }
        return "index";
    }
}
