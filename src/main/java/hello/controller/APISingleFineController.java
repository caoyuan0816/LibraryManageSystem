package hello.controller;

import hello.model.Account;
import hello.model.AccountRepository;
import hello.model.Record;
import hello.model.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * *
 *
 * @author yang
 * @modify 2015/7/321:47
 */
@RestController
@RequestMapping("/api/single-fine/")
public class APISingleFineController {
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    AccountRepository accountRepository;

    @RequestMapping(method = RequestMethod.POST)
    public double post(@RequestParam(value="username",defaultValue = "")String username,
                       @RequestParam(value="book-id",defaultValue = "")String bookid){
        if(username.equals(""))
            return -1;
        double fine = -1;
        Account accout = accountRepository.findByUsername(username);
        Record record = recordRepository.findByUseridAndBookid(accout.getId(), bookid);
        if(System.currentTimeMillis()>record.getReturntime()&&record.getActualreturntime()==-1){
            fine = (System.currentTimeMillis()-record.getReturntime())/(1000*60*60*24)*0.5;
        }
        return fine;
    }
}
