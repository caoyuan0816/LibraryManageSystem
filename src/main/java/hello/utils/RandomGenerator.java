package hello.utils;

import java.util.Random;

/**
 * Class RandomGrenerator : generate random string with given length
 * @author yuan
 * @version 0.0.1
 * @modify 2015-05-22 20:14:50
 */
public class RandomGenerator {

    //default len : 20
    private static int len = 20;

    //char list : used to yield random string
    public static final String ALLCHAR = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
     * Method next : generate next random string
     * Random string length : RandomGenerator.len
     * @return a random string
     */
    public static String next(){
        StringBuffer stringBuffer = new StringBuffer();
        Random random = new Random();
        for(int i = 0; i < len; i++){
            stringBuffer.append(ALLCHAR.charAt(random.nextInt(ALLCHAR.length())));
        }
        return stringBuffer.toString();
    }

    public static void setLen(int len) {
        RandomGenerator.len = len;
    }
}
