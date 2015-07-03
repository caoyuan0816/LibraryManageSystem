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
 * @modify 2015/7/320:21
 */
@RestController
@RequestMapping("/api/user-fine/")
public class APIUserFineController {
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    AccountRepository accountRepository;

    @RequestMapping(method = RequestMethod.POST)
    public fineList post(@RequestParam(value="username",defaultValue = "")String username){
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!username.equals(userDetails.getUsername())) {
            return new fineList(false ,new ArrayList<Record>(),new ArrayList<fineRecord>(),-1);
        }
        boolean is_User = false;

        for(GrantedAuthority s : userDetails.getAuthorities()){
            if (s.getAuthority().equals("ROLE_USER")) {
                is_User = true;
            }
        }

        if (!is_User){
            return new fineList(false ,new ArrayList<Record>(),new ArrayList<fineRecord>(),-1);
        }
        if(username.equals(""))
            return new fineList(false ,new ArrayList<Record>(),new ArrayList<fineRecord>(),-1);
        double fine;
        ArrayList<fineRecord> fineRecords = new ArrayList<fineRecord>();
        ArrayList<Record> records = new ArrayList<Record>();
        Account accout = accountRepository.findByUsername(username);
        List<Record> listToSearch = recordRepository.findByUserid(accout.getId());
        Iterator<Record> it = listToSearch.iterator();
        while(it.hasNext()){
            Record temp = it.next();

            if(System.currentTimeMillis()>temp.getReturntime()||temp.getActualreturntime()>temp.getReturntime()){
                if(temp.getActualreturntime()==-1)
                    fineRecords.add(new fineRecord(false,(System.currentTimeMillis()-temp.getReturntime())/(1000*60*60*24)*0.5));
                else
                    fineRecords.add(new fineRecord(false,(temp.getActualreturntime()-temp.getReturntime())/(1000*60*60*24)*0.5));
                records.add(temp);
            }
        }
        return new fineList(true,records,fineRecords,records.size());
    }
}

class fineList{
    private boolean status;

    private ArrayList<Record> records;

    private ArrayList<fineRecord> fines;

    private int num;

    public fineList(boolean status, ArrayList<Record> records, ArrayList<fineRecord> fines, int num) {
        this.status = status;
        this.records = records;
        this.fines = fines;
        this.num = num;
    }

    public boolean isStatus() {
        return status;
    }

    public ArrayList<Record> getRecords() {
        return records;
    }

    public ArrayList<fineRecord> getFines() {
        return fines;
    }

    public int getNum() {
        return num;
    }
}

class fineRecord{
    private boolean status;
    private double fine;

    public fineRecord(boolean status, double fine) {
        this.status = status;
        this.fine = fine;
    }

    public boolean isStatus() {
        return status;
    }

    public double getFine() {
        return fine;
    }
}