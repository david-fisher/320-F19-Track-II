package support;

import java.util.regex.Pattern;

/**
 * @author CSR
 * @version 2019-12-05
 */
public class RegularExpressionInputValidator
{
    private static final String EMAIL_REGX = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";

    /**
     * If input string is a valid email address.
     *
     * @param string input email address.
     * @return If input string is a valid email address.
     */
    public static boolean isValidEmail(String string)
    {
        return Pattern.compile(EMAIL_REGX, Pattern.CASE_INSENSITIVE).matcher(string).find();
    }
}
