package exceptions;

/**
 * @author CSR
 * @version 2019-12-05
 *
 * Trivial re-pack of Exception for exception when the request body does not contains necessary fields.
 */
public class IllegalRequestException extends Exception
{
    public IllegalRequestException()
    {
    }

    public IllegalRequestException(String message)
    {
        super(message);
    }

    public IllegalRequestException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public IllegalRequestException(Throwable cause)
    {
        super(cause);
    }

    public IllegalRequestException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
