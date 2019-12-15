package requests;

import support.RegularExpressionInputValidator;


/**
 * UserLoginRequest.
 * Request of user log-in
 *
 * @author CSR
 * @version 2019-12-15
 */
public class UserLoginRequest implements RequestInterface
{
    private String email;
    private String password;

    /**
     * Instantiates a new User login request.
     */
    public UserLoginRequest()
    {
    }

    /**
     * Gets email.
     *
     * @return the email
     */
    public String getEmail()
    {
        return email;
    }

    /**
     * Gets password.
     *
     * @return the password
     */
    public String getPassword()
    {
        return password;
    }

    @Override
    public boolean isValid()
    {
        return RegularExpressionInputValidator.isValidEmail(email) && password != null && !password.equals("");
    }
}
