package hello.model;

/**
 * Created by yuan on 15/5/27.
 */
public class Book {

    private String bookID;
    private String ISBN;
    private String bookName;
    private Author author;
    private String translator;
    private String press;
    private double price;
    private String money;
    private int number;
    public boolean equals(Book book){
        if(book.bookID==this.getBookID()){
            return true;
        }else{
            return false;
        }
    }
    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getBookID() {
        return bookID;
    }

    public String getISBN() {
        return ISBN;
    }

    public String getBookName() {
        return bookName;
    }

    public Author getAuthor() {
        return author;
    }

    public String getTranslator() {
        return translator;
    }

    public String getPress() {
        return press;
    }

    public double getPrice() {
        return price;
    }

    public String getMoney() {
        return money;
    }

    public void setBookID(String bookID) {
        this.bookID = bookID;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public void setTranslator(String translator) {
        this.translator = translator;
    }

    public void setPress(String press) {
        this.press = press;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookID='" + bookID + '\'' +
                ", ISBN='" + ISBN + '\'' +
                ", bookName='" + bookName + '\'' +
                ", author=" + author +
                ", translator='" + translator + '\'' +
                ", press='" + press + '\'' +
                ", price=" + price +
                ", money='" + money + '\'' +
                ", number=" + number +
                '}';
    }
}
