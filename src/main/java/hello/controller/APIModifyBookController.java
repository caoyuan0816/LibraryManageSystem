package hello.controller;

import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * *
 *
 * @author jiangtai
 * @modify 2015/6/522:41
 */
@RestController
@RequestMapping("/api/modify-book/")
public class APIModifyBookController {
    @Autowired
    private BookRepository bookRepository;
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Status post(@RequestParam(value = "isbn" , defaultValue = "")String ISBN,
                                     @RequestParam(value = "bookname", defaultValue = "") String bookname,
                                     @RequestParam(value = "author", defaultValue = "") String author,
                                     @RequestParam(value = "publisher", defaultValue = "") String publisher,
                                     @RequestParam(value = "publishtime", defaultValue = "") String publishtime,
                                     @RequestParam(value = "currentstorage", defaultValue = "") String currentstorage,
                                     @RequestParam(value = "translator", defaultValue = "") String translator,
                                     @RequestParam(value = "photoURL", defaultValue = "") String photoURL,
                                     @RequestParam(value = "authorintro", defaultValue = "") String authorintro,
                                     @RequestParam(value = "bookintro", defaultValue = "") String bookintro,
                                     @RequestParam(value = "classify", defaultValue = "") String classify){
        Book bookToModify = bookRepository.findByIsbn(ISBN);
        if(bookname.equals("") || author.equals("") || publisher.equals("") || ISBN.equals("") || currentstorage.equals("") || translator.equals("") || photoURL.equals("") || authorintro.equals("") || bookintro.equals("") || classify.equals("")){
            return new Status(false,"Can not find the book,modify failed!");
        }else{
            if(bookToModify.getIsbn().equals(ISBN)){
                Book modifiedBook = new Book(bookname,author,publisher,publisher,ISBN, Integer.parseInt(currentstorage),translator,photoURL,authorintro,bookintro,Integer.parseInt(classify));
                bookToModify = modifiedBook;
                bookRepository.save(bookToModify);
                return new Status(true,"The book has been modified!");
            }
        }
        return new Status(false,"Modifiy failed for unknown reason!");
    }
}
