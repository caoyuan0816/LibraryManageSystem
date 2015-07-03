package hello.model;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by yuan on 15/6/3.
 */
public interface RecordRepository extends MongoRepository<Record, String>{

    public Record findByUseridAndBookid(String userid, String bookid);
    public List<Record> findByUserid(String userid);
}
