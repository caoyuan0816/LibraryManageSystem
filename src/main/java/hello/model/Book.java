package hello.model;

import org.springframework.data.annotation.Id;

/**
 * Created by yuan on 15/5/27.
 */
public class Book {

    @Id
    private String id;

    private String bookName;
    private String author;
    private String publisher;
    private String publishTime;
    private String ISBN;
    private int currentStorage;
    private String translator;
    private String photoURL;
    private String authorIntroduction;
    private String bookIntroduction;

    public Book(String bookName, String author, String publisher, String publishTime, String ISBN, int currentStorage, String translator, String photoURL, String authorIntroduction, String bookIntroduction) {
        this.bookName = bookName;
        this.author = author;
        this.publisher = publisher;
        this.publishTime = publishTime;
        this.ISBN = ISBN;
        this.currentStorage = currentStorage;
        this.translator = translator;
        this.photoURL = photoURL;
        this.authorIntroduction = authorIntroduction;
        this.bookIntroduction = bookIntroduction;
    }

    public boolean equals(Book book) {
        return book.getId().equals(id);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(String publishTime) {
        this.publishTime = publishTime;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public int getCurrentStorage() {
        return currentStorage;
    }

    public void setCurrentStorage(int currentStorage) {
        this.currentStorage = currentStorage;
    }

    public String getTranslator() {
        return translator;
    }

    public void setTranslator(String translator) {
        this.translator = translator;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getAuthorIntroduction() {
        return authorIntroduction;
    }

    public void setAuthorIntroduction(String authorIntroduction) {
        this.authorIntroduction = authorIntroduction;
    }

    public String getBookIntroduction() {
        return bookIntroduction;
    }

    public void setBookIntroduction(String bookIntroduction) {
        this.bookIntroduction = bookIntroduction;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookID='" + id + '\'' +
                ", ISBN='" + ISBN + '\'' +
                ", bookName='" + bookName + '\'' +
                ", author=" + author +
                ", translator='" + translator + '\'' +
                '}';
    }
}