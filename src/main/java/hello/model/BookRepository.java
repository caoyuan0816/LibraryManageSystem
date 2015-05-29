package hello.model;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by yuan on 15/5/29.
 */
public interface BookRepository extends MongoRepository<Book, String>{

}

