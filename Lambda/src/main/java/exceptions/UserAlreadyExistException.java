package exceptions;

/**
 * @author CSR
 * @version 2019-12-05
 *
 * Trivial re-pack of Exception for exception when trying to register a user with existing email.
 */
public class UserAlreadyExistException extends Exception
{
    public UserAlreadyExistException()
    {
    }

    public UserAlreadyExistException(String message)
    {
        super(message);
    }

    public UserAlreadyExistException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public UserAlreadyExistException(Throwable cause)
    {
        super(cause);
    }

    public UserAlreadyExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
