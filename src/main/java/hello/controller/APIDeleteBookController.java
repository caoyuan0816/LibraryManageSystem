package hello.controller;

import hello.model.Book;
import hello.model.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * *
 *
 * @author yang
 * @modify 2015/6/522:16
 */
@RestController
@RequestMapping("/api/delete-book/")
public class APIDeleteBookController {
    @Autowired
    private BookRepository bookRepository;
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Status post(@RequestParam(value="book-id",defaultValue = "")String id){
        Book bookToDelete = bookRepository.findOne(id);
        if(bookToDelete.getId().equals("")){
            return new Status(false,"Can not find the book,delete failed!");
        }else{
            if(bookToDelete.getId().equals(id)){
                bookRepository.delete(bookToDelete);
                return new Status(true,"The book has been deleted!");
            }
        }
        return new Status(false,"delete failed for unknown reason");
    }

}
