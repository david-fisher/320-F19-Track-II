package exceptions;

/**
 * @author lwb
 * @version 2019-12-15
 *
 * Timestamp Already Exist Exception.
 */
public class TimestampAlreadyExistException extends Exception
{
    public TimestampAlreadyExistException()
    {
    }

    public TimestampAlreadyExistException(String message)
    {
        super(message);
    }

    public TimestampAlreadyExistException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public TimestampAlreadyExistException(Throwable cause)
    {
        super(cause);
    }

    public TimestampAlreadyExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
