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
    private String isbn;
//    private int currentStorage;
    private String translator;
    private String photoURL;
    private String authorIntroduction;
    private String bookIntroduction;

    private boolean borrowed;

    private int classify;

    public int getClassify() {
        return classify;
    }

    public void setClassify(int classify) {
        this.classify = classify;
    }

    public Book(String bookName, String author, String publisher, String publishTime, String isbn, String translator, String photoURL, String authorIntroduction, String bookIntroduction, int classify) {
        this.bookName = bookName;
        this.author = author;
        this.publisher = publisher;
        this.publishTime = publishTime;
        this.isbn = isbn;
//        this.currentStorage = currentStorage;
        this.translator = translator;
        this.photoURL = photoURL;
        this.authorIntroduction = authorIntroduction;
        this.bookIntroduction = bookIntroduction;
        this.classify = classify;
        this.borrowed = false;
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

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
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

    public boolean isBorrowed() {
        return borrowed;
    }

    public void setBorrowed(boolean borrowed) {
        this.borrowed = borrowed;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookID='" + id + '\'' +
                ", ISBN='" + isbn + '\'' +
                ", bookName='" + bookName + '\'' +
                ", author=" + author +
                ", translator='" + translator + '\'' +
                '}';
    }
}
