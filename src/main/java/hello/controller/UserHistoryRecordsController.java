/**
 * Created by yuan on 15/5/17.
 */
package hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;

/***
 * Class IndexController
 * Use to handle the requests of index page
 * Mapping URL: /
 * @author yuan
 * @version 0.0.1
 */
@Controller
@RequestMapping("/history-records/")
public class UserHistoryRecordsController {

    /***
     * Mapping GET method
     * Add attributes into model and return a view name to render
     * @return the view's name
     */
    @RequestMapping(method= RequestMethod.GET)
    public String get(Model model) {

       return "userHistoryRecords";
    }
}
