/**
 * Created by yuan on 15/5/17.
 */
package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

/***
 * Class used to record register result
 * @author yuan
 * @version 0.0.1
 */
class RegisterStatus{

    private final boolean status;
    //    private final String userID;
//    private String username;
//    private String password;
    RegisterStatus(boolean status){
        this.status = status;
    }

    public boolean getStatus(){
        return status;
    }
}

/***
 * Class APIRegisterController
 * Use to handle the requests of register
 * Mapping URL: /api/register/
 * @author yuan
 * @version 0.0.1
 */
@RestController
@RequestMapping("/api/register/")
public class APIRegisterController {

    @Autowired
    private AccountRepository accountRepository;

    /***
     * Mapping POST method
     * @return a object will be render to JSON format
     */
    @RequestMapping(method= RequestMethod.POST)
    public @ResponseBody RegisterStatus post(@RequestParam(value="username",defaultValue = "") String username,
                                             @RequestParam(value = "password",defaultValue = "") String password) {

        //Check legally
        if (username.equals("") || password.equals("")){
            return new RegisterStatus(false);
        }

        //Check the username is not exist
        if(accountRepository.findByUsername(username) != null){
            return new RegisterStatus(false);
        }else{
            accountRepository.save(new Account(username,password));
        }

        return new RegisterStatus(true);
    }
}
