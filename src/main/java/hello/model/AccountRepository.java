package hello.model;

import org.springframework.data.mongodb.repository.MongoRepository;



/***
 * Basic repository interface to persist account entities
 * Can use these methods to find account in mongoDB
 * Using default db -> test
 * @author yuan
 * @modify 2015-05-22 19:14:23
 * @version 0.0.2
 */
public interface AccountRepository extends MongoRepository<Account, String> {

    //db.account.find({"username": username})
    public Account findByUsername(String username);
    //db.account.find({"email": email})
    public Account findByEmail(String email);

    public Account findByUsernameAndValidated(String username, Boolean validated);

}