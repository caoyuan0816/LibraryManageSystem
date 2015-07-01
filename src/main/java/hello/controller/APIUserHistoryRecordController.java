package hello.controller;

import hello.model.*;
import org.springframework.beans.factory.annotation.Autowired;
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
 * @modify 2015/7/21:18
 */
@RestController
@RequestMapping("/api/history-record")
public class APIUserHistoryRecordController {
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    AccountRepository accountRepository;
    @RequestMapping(method = RequestMethod.POST)
    public Recordlist post(@RequestParam(value="username",defaultValue="") String username){
        boolean status=false;
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
