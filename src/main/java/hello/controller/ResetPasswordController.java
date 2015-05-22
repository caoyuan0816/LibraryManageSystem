package hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import hello.model.Account;
import hello.model.AccountRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/***
 * Class ResetPasswordController
 * This class is used to reset password
 * Mapping URL: /
 * @author wei
 * @version 0.0.1
 */
@Controller
@RequestMapping("/resetpassword")
    public class ResetPasswordController {
    @Autowired
    private AccountRepository accountRepository;
    /*
     *Mapping post method
     */
    @RequestMapping(method= RequestMethod.POST)
    public String post(@RequestParam(value="username",defaultValue = "")String username,
                                                  @RequestParam(value="password",defaultValue="")String password,
                                                  @RequestParam(value="newpassword",defaultValue="")String newpassword ){
           //check the username is match with the password or not;
        Account account;
        account=accountRepository.findByUsername(username);
            if(account.getPassword()==password){
                //accountRepository.delete(Account(username,password));
                accountRepository.save(new Account(username,newpassword,account.getEmail()));

            }
        return "resetPassword";
    }

}
