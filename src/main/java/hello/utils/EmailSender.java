package hello.utils;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;
import java.util.concurrent.TransferQueue;
import javax.mail.*;
import javax.mail.internet.*;

/***
 * Class EmailSender : using javax.mail library
 * Sent a email to specific email address
 * @author yuan
 * @modify 2015-05-22 19:28:09
 * @version 0.0.2
 */
public class EmailSender {

//    private static final String USER_NAME = "validate@yuan25.com";
    private static final String USER_NAME = "562683864@qq.com";
//    private static final String PASSWORD = "asd123";
    private static final String PASSWORD = "Caoyuan7758521";

<<<<<<< HEAD
    // public static void main(String[] args) throws Throwable {

    //     EmailSender emailSender = new EmailSender();
    //     if(emailSender.sendTo("562683864@qq.com")){
    //         System.out.println("Sent success");
    //     }else{
    //         System.out.println("Sent failed");
    //     }
    // }

    public boolean sendTo(final String recipient){
=======
    /***
     * Method sendTo : sent a email with specific content to user's email address
     * If there are any problem during sending, it will throw a exception out
     * @param recipient the reciever's email address
     * @param content the content of email : with HTML format
     * @throws Exception
     */
    public static void sendTo(final String recipient, final String content) throws Exception{
>>>>>>> 6032fc268a3d9d0c4f0c91cafa03ad2670e06cc5

        //Construct the message
        String to = recipient;
        String subject = "Validate your account";

        //Set up the SMTP server
        Properties props = System.getProperties();
//        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host","smtp.qq.com");
        props.put("mail.smtp.user", USER_NAME);
        props.put("mail.smtp.password", PASSWORD);
//        props.put("mail.smtp.port", "456");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);

//        try {
            //Set up message
            message.setFrom(new InternetAddress(USER_NAME));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);
            message.setSentDate(new Date());
            Multipart multipart = new MimeMultipart();
            BodyPart bodyPart = new MimeBodyPart();
            bodyPart.setContent(content,"text/html; charset=utf-8");
            multipart.addBodyPart(bodyPart);
            message.setContent(multipart);

            //Send the message
            Transport transport = session.getTransport("smtp");
            transport.connect("smtp.qq.com", USER_NAME, PASSWORD);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();

//        }catch (AddressException ae) {
//            ae.printStackTrace();
//            return false;
//        }
//        catch (MessagingException me) {
//            me.printStackTrace();
//            return false;
//        }
    }
}


