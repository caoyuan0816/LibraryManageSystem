package hello.controller;

import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by yuan on 15/5/29.
 */
@RestController
@RequestMapping("/api/book-upload/")
public class APIUploadBookController {

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Status post(@RequestParam(value = "bookname", defaultValue = "") String bookname,
                @RequestParam(value = "author", defaultValue = "") String authord,
                @RequestParam(value = "publisher", defaultValue = "") String publisher,
                @RequestParam(value = "publishtime", defaultValue = "") String publishtime,
                @RequestParam(value = "isbn", defaultValue = "") String isbn,
                @RequestParam(value = "currentstorage", defaultValue = "") String currentstorage,
                @RequestParam(value = "translator", defaultValue = "") String translator,
                @RequestParam(value = "photoURL", defaultValue = "") String photoURL,
                @RequestParam(value = "authorintro", defaultValue = "") String authorintro,
                @RequestParam(value = "bookintro", defaultValue = "") String bookintro){

        if (bookname.equals("") || authord.equals("") || publisher.equals("") || isbn.equals("") || currentstorage.equals("") || translator.equals("") || photoURL.equals("") || authorintro.equals("") || bookintro.equals("")){
            return new Status(false, "Book upload failed!");
        }else{
            Book book = new Book(bookname,authord,publisher,publisher,isbn, Integer.parseInt(currentstorage),translator,photoURL,authorintro,bookintro);
            bookRepository.save(book);
            return new Status(true, "Book upload success!");
        }
    }

}

