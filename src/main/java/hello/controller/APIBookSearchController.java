package hello.controller;

import hello.model.AccountRepository;
import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
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
    Booklist post(@RequestParam(value = "classify", defaultValue = "") String cls,
                  @RequestParam(value = "page", defaultValue = "")String page,
                  @RequestParam(value = "type", defaultValue = "")String type,
                  @RequestParam(value = "value", defaultValue = "")String value){

        if (page.equals("")){
            return new Booklist(false,-1,new ArrayList<Book>());
        }

        int page_num = Integer.parseInt(page);

        List<Book> books;
        //classify is not null
        if (!cls.equals("")){
            books = bookRepository.findByClassify(Integer.parseInt(cls));
        }else{
            books = bookRepository.findAll();
        }

        if (type.equals("bookname")){

            Iterator<Book> it = books.iterator();
            while(it.hasNext()){
                Book book = it.next();
                if (book.getBookName().indexOf(value) == -1){
                    it.remove();
                }
            }

        }else if(type.equals("author")){
            Iterator<Book> it = books.iterator();
            while(it.hasNext()){
                Book book = it.next();
                if (book.getAuthor().indexOf(value) == -1){
                    it.remove();
                }
            }
        }

        ArrayList<Book> result = new ArrayList<Book>();

        for (int i = 1; i <= books.size(); i++){
            if (i > (page_num-1)*len && i <= page_num*len){
                result.add(books.get(i-1));
            }
        }
        return new Booklist(true, books.size(), result);
    }

}

