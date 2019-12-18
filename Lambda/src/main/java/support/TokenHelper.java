package support;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Base64;

/**
 * @author CSR
 * @version 2019-12-15
 * <p>
 * Helper class to generate and verify token (simple cookies)
 */
public class TokenHelper
{
    private static final String TOKEN_DELIMITER = "/";
    private static final int TOKEN_VALID_TIME = 86400; // One-day period
    private static final Key TOKEN_KEY = new SecretKeySpec(new byte[]{
            (byte) 0xBA, (byte) 0xD, (byte) 0xC5, (byte) 0x32, (byte) 0x00,
            (byte) 0xBA, (byte) 0xD, (byte) 0xF1, (byte) 0x56, (byte) 0xE9,
            (byte) 0x12, (byte) 0x33, (byte) 0x0F, (byte) 0x12, (byte) 0x22, (byte) 0xFF
    }, "AES");

    private static Cipher TOKEN_CIPHER;

    static
    {
        try
        {
            TOKEN_CIPHER = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } catch (Exception e)
        {
            throw new IllegalStateException(e.getMessage());
        }
    }

    /**
     * Gets for input user with email.
     * Tokens valid for TOKEN_VALID_TIME seconds.
     *
     * @param email the email
     * @return the token
     */
    public static String getToken(String email)
    {
        long unixTime = Instant.now().getEpochSecond();
        String toEncrypt = email + TOKEN_DELIMITER + unixTime;
        byte[] bytes = toEncrypt.getBytes(StandardCharsets.UTF_8);
        try
        {
            TOKEN_CIPHER.init(Cipher.ENCRYPT_MODE, TOKEN_KEY);
            bytes = TOKEN_CIPHER.doFinal(bytes);
        } catch (Exception e)
        {
            throw new IllegalStateException(e.getMessage());
        }
        String ret = Base64.getEncoder().encodeToString(bytes);
        return ret;
    }

    /**
     * Verify token from front end.
     *
     * @param token the token
     * @return User's email if valid, otherwise null
     * @throws IllegalStateException
     * @throws IllegalArgumentException
     */
    public static String verifyToken(String token)
    {
        byte[] bytes = Base64.getDecoder().decode(token); //IllegalArgumentException here!!
        try
        {
            TOKEN_CIPHER.init(Cipher.DECRYPT_MODE, TOKEN_KEY);
            bytes = TOKEN_CIPHER.doFinal(bytes);
        } catch (Exception e)
        {
            throw new IllegalStateException(e.getMessage());
        }
        String plainText = new String(bytes, StandardCharsets.UTF_8);
        String[] strings = plainText.split("/");
        if (strings.length != 2)
        {
            return null;
        }
        String email = strings[0];
        long tokenTime = Long.valueOf(strings[1]);
        long currentTime = Instant.now().getEpochSecond();
        if (currentTime - tokenTime <= TOKEN_VALID_TIME)
        {
            return email;
        }
        return null;
    }

}
