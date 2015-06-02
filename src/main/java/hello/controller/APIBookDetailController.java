package hello.controller;

import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuan on 15/5/29.
 */

class BookDetailStatus{
    private final boolean status;
    private final Book book;

    BookDetailStatus(boolean status, Book book){
        this.status = status;
        this.book = book;
    }

    public boolean isStatus() {
        return status;
    }

    public Book getBook() {
        return book;
    }
}

@RestController
@RequestMapping("/api/book-detail/")
public class APIBookDetailController {

    @Autowired
    private BookRepository bookRepository;

    //Default page len 10
    private final static int len = 10;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    BookDetailStatus post(@RequestParam(value = "bookid", defaultValue = "") String bookId){

        if (bookId.equals("")){
            return new BookDetailStatus(false, new Book("","","","","",-1,"","","","",-1));
        }

        return new BookDetailStatus(true, bookRepository.findOne(bookId));
    }

}
