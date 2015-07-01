package hello.controller;

import hello.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * *
 *
 * @author yang
 * @modify 2015/7/123:49
 */
@RestController
@RequestMapping("/api/current-records/")
public class APIUserCurrentRecordController {
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
                Record tempRecord = it.next();
            if(tempRecord.getActualreturntime()==-1)
                recordlist.add(tempRecord);
        }
        status=true;
        sizeoflist=recordlist.size();
        return new Recordlist(status,recordlist,sizeoflist);
    }
}

class Recordlist{
    private boolean status;
    private final ArrayList<Record> records;
    private int size;

    public int getSize() {
        return size;
    }

    public Recordlist(boolean status, ArrayList<Record> records,int size) {
        this.status = status;
        this.records = records;
        this.size=size;
    }

    public boolean isStatus() {
        return status;
    }

    public ArrayList<Record> getRecords() {
        return records;
    }
}