/**
 * Created by yuan on 15/5/17.
 */
package hello.controller;

import org.springframework.web.bind.annotation.*;

/***
 * Class version, use to test API.
 * @author yuan
 * @version 0.0.1
 */
class Version{

    //Strings to record version's info
    private final String version;
    private final String project_name;
    private final String team;

    /***
     * Construct method of class Version
     * i
     */
    public Version(){
        version = "0.0.1";
        project_name = "Library Manager System";
        team = "Baymax";
    }

    public String getVersion(){
        return version;
    }

    public String getProject_name(){
        return project_name;
    }
    public String getTeam(){
        return team;
    }
}

/***
 * Class APITestController
 * It is a API controller return JSON string
 * Mapping URL: /api/version/
 * @author yuan
 * @version 0.0.1
 */
@RestController
@RequestMapping("/api/version/")
public class APIVersionController {

    /***
     * Mapping GET method
     * @return a object will be render to JSON format
     */
    @RequestMapping(method= RequestMethod.GET)
    public @ResponseBody Version get() {
        return new Version();
    }
}
