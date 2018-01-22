package hello.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by yuan on 15/5/27.
 */
@Controller
@RequestMapping("/api/login")
public class LoginPageController {

    @RequestMapping(method = RequestMethod.GET)
    public String get() {
        try{
            UserDetails userDetails =
                    (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return "redirect:/";
        }catch (Exception e){
            return "login";
        }
    }

}
