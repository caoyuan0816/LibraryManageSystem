package hello.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Created by yang on 2015/5/22.
 * This class is built to solve the activation link sent to users
 * to activate their accounts.
 * @author yang
 * @version 1.0
 */
@Controller
@RequestMapping("/activate")
public class ActiveController {
    /**
     * this method is used to get the username and validatecode sent to the user's email
     * and check if it is the user itself who do the register action
     * @param username
     * @param validatecode
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String get(@RequestParam("username") String username,
                      @RequestParam("validatecode") String validatecode){

        return "activationpage";
    }
}
