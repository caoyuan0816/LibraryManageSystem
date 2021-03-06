package hello.controller;

import hello.model.AccountRepository;
import hello.model.BookRepository;
import hello.model.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import hello.model.Book;
import hello.model.Account;
import hello.model.Record;

import java.text.SimpleDateFormat;

/**
 * Created by yuan on 15/6/3.
 */
@RestController
@RequestMapping("/api/borrow-book/")
public class APIBorrowBookController {

    //You can change this number
    private static final int MAX_BORROW_NUM = 5;

    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Status post(@RequestParam(value = "username", defaultValue = "") String username, @RequestParam(value = "book-id", defaultValue = "") String bookID) {
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (username.equals("") || bookID.equals("")){
            return new Status(false, "Paras error!");
        }

        Account account = accountRepository.findByUsername(username);
        Book book = bookRepository.findOne(bookID);

        //Find username in database
        //Find isbn in database
        if(account != null && book != null){

            //Check numbers
            if (account.getBorrownum() < MAX_BORROW_NUM && !book.isBorrowed()){

                long current_time = System.currentTimeMillis();
                //Default borrow 7 days, current_time + 604800000
                Record record = new Record(account.getId(), book.getId(), current_time, current_time+604800000,-1);
                recordRepository.save(record);

                account.setBorrownum(account.getBorrownum()+1);
                accountRepository.save(account);

                book.setBorrowed(true);
                bookRepository.save(book);

            }else{
                if(account.getBorrownum() >= MAX_BORROW_NUM) {
                    return new Status(false, "You can not borrow more books!");
                }else{
                    return new Status(false, "No more this book can borrow!");
                }
            }

        }else{
            return new Status(false, "username or isbn number error!");

        }
        return new Status(true, "Borrow record add success!");
    }
}