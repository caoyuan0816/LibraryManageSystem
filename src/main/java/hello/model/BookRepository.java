package hello.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

/**
 * Created by yuan on 15/5/29.
 */
public interface BookRepository extends MongoRepository<Book, String>{

    public List<Book> findByClassify(int classify);

    public Book findByIsbn(String isbn);
}

