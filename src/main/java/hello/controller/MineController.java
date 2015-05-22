package hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
@Controller
@RequestMapping("/mine/")
public class MineController {

    /***
     * Mapping GET method
     * Add attributes into model and return a view name to render
     * @return the view's name
     */
    @RequestMapping(method= RequestMethod.GET)
    public String get(Model model) {

        return "mine";
    }
}
