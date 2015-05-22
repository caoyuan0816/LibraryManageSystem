/**
 * Created by yuan on 15/5/22.
 */
package hello.utils;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;
import java.util.concurrent.TransferQueue;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailSender {

//    private static final String USER_NAME = "validate@yuan25.com";
    private static final String USER_NAME = "562683864@qq.com";
//    private static final String PASSWORD = "asd123";
    private static final String PASSWORD = "Caoyuan7758521";

    // public static void main(String[] args) throws Throwable {

    //     EmailSender emailSender = new EmailSender();
    //     if(emailSender.sendTo("562683864@qq.com")){
    //         System.out.println("Sent success");
    //     }else{
    //         System.out.println("Sent failed");
    //     }
    // }

    public boolean sendTo(final String recipient){

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

        try {
            message.setFrom(new InternetAddress(USER_NAME));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);
            message.setText("This email is send from java!");

            //Send the message
            Transport transport = session.getTransport("smtp");
            transport.connect("smtp.qq.com", USER_NAME, PASSWORD);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();

            System.out.println("3");

        }catch (AddressException ae) {
            ae.printStackTrace();
            return false;
        }
        catch (MessagingException me) {
            me.printStackTrace();
            return false;
        }
        return true;
    }

}


