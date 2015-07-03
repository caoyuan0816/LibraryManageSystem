package hello.controller;

import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by yuan on 15/5/29.
 */

class AddBookStatus {

    //true or false
    private final boolean status;

    //The reason text of status
    private final String message;

    private final String bookID;

    AddBookStatus(boolean status, String message, String bookID) {
        this.status = status;
        this.message = message;
        this.bookID = bookID;
    }

    public String getMessage() {
        return message;
    }

    public boolean isStatus() {
        return status;
    }

    public String getBookID() {
        return bookID;
    }
}

@RestController
@RequestMapping("/api/book-upload/")
public class APIUploadBookController {

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    AddBookStatus post(@RequestParam(value = "bookname", defaultValue = "") String bookname,
                @RequestParam(value = "author", defaultValue = "") String authord,
                @RequestParam(value = "publisher", defaultValue = "") String publisher,
                @RequestParam(value = "publishtime", defaultValue = "") String publishtime,
                @RequestParam(value = "isbn", defaultValue = "") String isbn,
                @RequestParam(value = "translator", defaultValue = "") String translator,
                @RequestParam(value = "photoURL", defaultValue = "") String photoURL,
                @RequestParam(value = "authorintro", defaultValue = "") String authorintro,
                @RequestParam(value = "bookintro", defaultValue = "") String bookintro,
                @RequestParam(value = "classify", defaultValue = "") String classify){

        if (bookname.equals("") || authord.equals("") || publisher.equals("") || isbn.equals("") || translator.equals("") || photoURL.equals("") || authorintro.equals("") || bookintro.equals("") || classify.equals("")){
            return new AddBookStatus(false, "Book upload failed!", "");
        }else{
            Book book = new Book(bookname,authord,publisher,publisher,isbn,translator,photoURL,authorintro,bookintro,Integer.parseInt(classify));
            bookRepository.save(book);
            return new AddBookStatus(true, "Book upload success!", book.getId());
        }
    }

}

