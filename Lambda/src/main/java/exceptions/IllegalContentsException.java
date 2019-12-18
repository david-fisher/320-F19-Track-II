package exceptions;

/**
 * @author CSR
 * @version 2019-12-05
 * Trivial re-pack of Exception indicate that the contents from request are illegal (e.g. contains illegal characters).
 */
public class IllegalContentsException extends Exception
{
    public IllegalContentsException()
    {
    }

    public IllegalContentsException(String message)
    {
        super(message);
    }

    public IllegalContentsException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public IllegalContentsException(Throwable cause)
    {
        super(cause);
    }

    public IllegalContentsException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
