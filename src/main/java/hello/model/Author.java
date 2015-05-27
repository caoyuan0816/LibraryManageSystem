package hello.model;

/**
 * *
 *
 * @author yang
 * @modify 2015/5/2723:06
 */
public class Author {
    private String authorName;
    private String description;

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Author{" +
                "authorName='" + authorName + '\'' +
                '}';
    }
    public boolean equals(Author author){
        if(author.authorName==this.getAuthorName()){
            return true;
        }else{
            return false;
        }
    }
}
