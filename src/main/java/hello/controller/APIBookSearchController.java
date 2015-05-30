package hello.controller;

import hello.model.AccountRepository;
import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuan on 15/5/29.
 */


class Booklist {

    private final boolean status;
    private final int all_number;
    private final ArrayList<Book> book_list;

    public Booklist(boolean status, int all_number, ArrayList<Book> book_list) {
        this.status = status;
        this.all_number = all_number;
        this.book_list = book_list;
    }
    public boolean isStatus() {
        return status;
    }

    public ArrayList<Book> getBook_list() {
        return book_list;
    }

    public int getAll_number() {
        return all_number;
    }
}


@RestController
@RequestMapping("/api/book-search/")
public class APIBookSearchController {

    @Autowired
    private BookRepository bookRepository;

    //Default page len 10
    private final static int len = 8;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Booklist post(@RequestParam(value = "page", defaultValue = "") String page){

        if (page.equals("")){
            return new Booklist(false,-1,new ArrayList<Book>());
        }

        int page_num = Integer.parseInt(page);

        List<Book> books = bookRepository.findAll();
        ArrayList<Book> result = new ArrayList<Book>();

        for (int i = 1; i <= books.size(); i++){
            if (i > (page_num-1)*len && i <= page_num*len){
                result.add(books.get(i-1));
            }
        }
        return new Booklist(true, books.size(), result);
    }

}

