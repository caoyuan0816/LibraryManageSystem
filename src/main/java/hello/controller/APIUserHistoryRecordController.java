package hello.controller;

import hello.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * *
 *
 * @author yang
 * @modify 2015/7/21:18
 */
@RestController
@RequestMapping("/api/history-records/")
public class APIUserHistoryRecordController {
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    AccountRepository accountRepository;
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Recordlist post(@RequestParam(value="username",defaultValue="") String username){
        boolean status=false;
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!username.equals(userDetails.getUsername())) {
            return new Recordlist(false,new ArrayList<Record>(),-1);
        }
        boolean is_User = false;

        for(GrantedAuthority s : userDetails.getAuthorities()){
            if (s.getAuthority().equals("ROLE_USER")) {
                is_User = true;
            }
        }

        if (!is_User){
            return new Recordlist(false,new ArrayList<Record>(),-1);
        }
        ArrayList<Record> recordlist= new ArrayList<Record>();
        int sizeoflist=0;
        if(username.equals(""))
            return new Recordlist(status,new ArrayList<Record>(),-1);
        Account account = accountRepository.findByUsername(username);
        List<Record> RecordToSearch = recordRepository.findByUserid(account.getId());
        Iterator<Record> it;
        it = RecordToSearch.iterator();
        while(it.hasNext()){
            recordlist.add(it.next());
        }
        status=true;
        sizeoflist=recordlist.size();
        return new Recordlist(status,recordlist,sizeoflist);
    }
}
