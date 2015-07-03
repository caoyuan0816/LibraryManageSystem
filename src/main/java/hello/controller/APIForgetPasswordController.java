package hello.controller;

import hello.model.Account;
import hello.model.AccountRepository;
import hello.utils.EmailSender;
import hello.utils.RandomGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Created by yuan on 15/5/23.
 */

class Status {

    //true or false
    private final boolean status;

    //The reason text of status
    private final String message;

    Status(boolean status, String message) {
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

@RestController
@RequestMapping("/api/forget-password/")
public class APIForgetPasswordController {

    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Status post(@RequestParam(value = "email", defaultValue = "") String email){
        if (email.equals("")) {
            return new Status(false, "Invalid paras.");
        }

        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!accountRepository.findByEmail(email).getEmail().equals(userDetails.getUsername())) {
            return new Status(false,"You're not the right one");
        }



        Account account = accountRepository.findByEmail(email);
        if (account == null) {
            return new Status(false, "This email is not registered");
        }

        //Set new password
        RandomGenerator.setLen(10);
        String newpassword = RandomGenerator.next();
        account.setPassword(newpassword);
        accountRepository.save(account);
        RandomGenerator.setLen(20);

        try{
            EmailSender.sendTo(email, "<h1>Hello," + account.getUsername() + "</h1>" +
                    "<p>We heard that you lost your password. Sorry about that!</p>" +
                    "<p>But don't worry! We've already changed your password to <b style='font-size: 18px;'>" + newpassword + "</b></p>" +
                    "<p>This is a temporary password, we suggest you change your password ASAP</p>" +
                    "<p>Thanks,</p>" +
                    "<p>Your friends at BayMax</p>");
        }catch (Exception e){
            return new Status(false, "Can not sent mail to this address.");
        }

        return new Status(true, "");
    }
}