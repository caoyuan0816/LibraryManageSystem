package hello.model;

import org.springframework.data.annotation.Id;

/**
 * Created by yuan on 15/6/3.
 */
public class Record {

    @Id
    private String id;

    private String userid;
    private String bookid;
    private long borrowtime;
    private long returntime;
    private long actualreturntime;

    public Record(String userid, String bookid, long borrowtime, long returntime, long actualreturntime) {
        this.userid = userid;
        this.bookid = bookid;
        this.borrowtime = borrowtime;
        this.returntime = returntime;
        this.actualreturntime = actualreturntime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getBookid() {
        return bookid;
    }

    public void setBookid(String bookid) {
        this.bookid = bookid;
    }

    public long getBorrowtime() {
        return borrowtime;
    }

    public void setBorrowtime(long borrowtime) {
        this.borrowtime = borrowtime;
    }

    public long getReturntime() {
        return returntime;
    }

    public void setReturntime(long returntime) {
        this.returntime = returntime;
    }

    public long getActualreturntime() {
        return actualreturntime;
    }

    public void setActualreturntime(long actualreturntime) {
        this.actualreturntime = actualreturntime;
    }
}
