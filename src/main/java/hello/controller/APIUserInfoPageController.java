package hello.controller;

import hello.model.*;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;
import java.util.List;

/**
 * *
 *
 * @author yang
 * @modify 2015/7/212:24
 */
@RestController
@RequestMapping("/api/user/")
public class APIUserInfoPageController {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    BookRepository bookRepository;

    @RequestMapping(method = RequestMethod.POST)
    public UserStatus post(@RequestParam(value="username",defaultValue = "")String username){
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!username.equals(userDetails.getUsername())) {
            return new UserStatus(false,-1,-1,-1,new int[7]);
        }
        boolean is_User = false;

        for(GrantedAuthority s : userDetails.getAuthorities()){
            if (s.getAuthority().equals("ROLE_USER")) {
                is_User = true;
            }
        }

        if (!is_User){
            return new UserStatus(false,-1,-1,-1,new int[7]);
        }
        if(username.equals(""))
            return new UserStatus(false,-1,-1,-1,new int[7]);
        int borrowed=0;
        int overdue=0;
        int accumulated=0;
        int[] num = new int[8];
        Account account = accountRepository.findByUsername(username);
        List<Record> borrowRecord = recordRepository.findByUserid(account.getId());
        accumulated = borrowRecord.size();
        Iterator<Record> it = borrowRecord.iterator();
        for(int i=0;i<=7;i++){
            num[i]=0;
        }
        while(it.hasNext()){
            Record temp = it.next();
            if(temp.getActualreturntime()==-1)
                borrowed++;
            if(temp.getReturntime()<System.currentTimeMillis())
                overdue++;
            Book book = bookRepository.findOne(temp.getBookid());
            int tempnum = num[book.getClassify()];
            num[book.getClassify()]=tempnum+1;
        }
        return new UserStatus(true,borrowed,overdue,accumulated,num);
    }
}

class UserStatus{
    boolean status;
    int borrowed;
    int overdue;
    int accumulated;
    int[] numByClassify;

    public UserStatus(boolean status, int borrowed, int overdue, int accumulated, int[] numByClassify) {
        this.status = status;
        this.borrowed = borrowed;
        this.overdue = overdue;
        this.accumulated = accumulated;
        this.numByClassify = numByClassify;
    }

    public int getBorrowed() {
        return borrowed;
    }

    public int getOverdue() {
        return overdue;
    }

    public int getAccumulated() {
        return accumulated;
    }

    public int[] getNumByClassify() {
        return numByClassify;
    }

    public boolean isStatus() {
        return status;
    }
}