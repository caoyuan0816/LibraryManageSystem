package hello.controller;

import hello.model.AccountRepository;
import hello.model.BookRepository;
import hello.model.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import hello.model.Book;
import hello.model.Account;
import hello.model.Record;

import java.text.SimpleDateFormat;

/**
 * Created by yuan on 15/6/3.
 */
@RestController
@RequestMapping("/api/return-book/")
public class APIReturnBookController {

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

        if (username.equals("") || bookID.equals("")) {
            return new Status(false, "Paras error!");
        }

        Account account = accountRepository.findByUsername(username);
        Book book = bookRepository.findOne(bookID);
        Record record = recordRepository.findByUseridAndBookid(account.getId(), book.getId());

        //Find username in database
        //Find isbn in database
        if (account != null && book != null && record != null && record.getActualreturntime() == -1) {

            //Check numbers

            long current_time = System.currentTimeMillis();

            record.setActualreturntime(current_time);
            recordRepository.save(record);

            account.setBorrownum(account.getBorrownum() + 1);
            accountRepository.save(account);

            book.setBorrowed(false);
            bookRepository.save(book);

        } else {
            return new Status(false, "username or isbn number error!");

        }
        return new Status(true, "Return record add success!");
    }
}