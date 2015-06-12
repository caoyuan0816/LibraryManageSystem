package hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/user")
public class UserInfoPageController {

    /**
     * Mapping GET method
     * Add attributes into model and return a view name to render
     *
     * @return the view's name
     */
    @RequestMapping(method = RequestMethod.GET)
    public String get(@RequestParam("username") String username,
                      Model model) {

        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!username.equals(userDetails.getUsername())) {
            return "redirect:/";
        }

        for(GrantedAuthority s : userDetails.getAuthorities()){
            if (s.getAuthority().equals("ROLE_ADMIN")){
                return "admin";
            }
            if (s.getAuthority().equals("ROLE_STAFF")){
                return "staffBorrowBook";
            }
        }

        return "user";
    }
}
