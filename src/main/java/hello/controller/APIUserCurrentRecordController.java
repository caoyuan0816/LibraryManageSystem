package hello.controller;

import hello.model.*;
import org.omg.CORBA.DATA_CONVERSION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
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
    public
    @ResponseBody
    Recordlist post(@RequestParam(value="username",defaultValue="") String username){
        boolean status=false;
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!username.equals(userDetails.getUsername())) {
            return new Recordlist(false,new ArrayList<BorrowRecord>(),-1);
        }
        boolean is_User = false;

        for(GrantedAuthority s : userDetails.getAuthorities()){
            if (s.getAuthority().equals("ROLE_USER")) {
                is_User = true;
            }
        }

        if (!is_User){
            return new Recordlist(false,new ArrayList<BorrowRecord>(),-1);
        }
        ArrayList<BorrowRecord> recordlist= new ArrayList<BorrowRecord>();
        int sizeoflist=0;
        if(username.equals(""))
            return new Recordlist(status,new ArrayList<BorrowRecord>(),-1);
        Account account = accountRepository.findByUsername(username);
        List<Record> RecordToSearch = recordRepository.findByUserid(account.getId());
        String bookid;
        String bookname;
        String author;
        Date returndate;
        Date borrowdate;
        Date actualreturndate;
        Iterator<Record> it;
        it = RecordToSearch.iterator();
        while(it.hasNext()){
            Record tempRecord = it.next();
            bookid=tempRecord.getBookid();
            bookname=bookRepository.findOne(bookid).getBookName();
            author=bookRepository.findOne(bookid).getAuthor();
            returndate = new Date(tempRecord.getReturntime());
            borrowdate = new Date(tempRecord.getBorrowtime());
            actualreturndate = new Date(tempRecord.getActualreturntime());
            if(tempRecord.getActualreturntime()==-1)
                recordlist.add(new BorrowRecord(bookid,bookname,author,returndate,borrowdate,actualreturndate));
        }
        status=true;
        sizeoflist=recordlist.size();
        return new Recordlist(status,recordlist,sizeoflist);
    }
}

class Recordlist{
    private boolean status;
    private final ArrayList<BorrowRecord> records;
    private int size;

    public int getSize() {
        return size;
    }

    public Recordlist(boolean status, ArrayList<BorrowRecord> records,int size) {
        this.status = status;
        this.records = records;
        this.size=size;
    }

    public boolean isStatus() {
        return status;
    }

    public ArrayList<BorrowRecord> getRecords() {
        return records;
    }
}

class BorrowRecord{
    String bookid;
    String bookname;
    String author;
    Date returndate;
    Date borrowdate;
    Date actualreturndate;

    public BorrowRecord(String bookid, String bookname, String author, Date returndate, Date borrowdate, Date actualreturndate) {
        this.bookid = bookid;
        this.bookname = bookname;
        this.author = author;
        this.returndate = returndate;
        this.borrowdate = borrowdate;
        this.actualreturndate = actualreturndate;
    }

    public String getBookid() {
        return bookid;
    }

    public String getBookname() {
        return bookname;
    }

    public String getAuthor() {
        return author;
    }

    public Date getReturndate() {
        return returndate;
    }

    public Date getBorrowdate() {
        return borrowdate;
    }

    public Date getActualreturndate() {
        return actualreturndate;
    }
}