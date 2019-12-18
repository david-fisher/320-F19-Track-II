package exceptions;

/**
 * @author srbalt
 * @version 2019-12-17
 *
 * Trivial re-pack of Exception for exception when the request body does not contains necessary fields.
 */
public class HttpHandlerException extends RuntimeException
{
    public HttpHandlerException()
    {
    }

    public HttpHandlerException(String message)
    {
        super(message);
    }

    public HttpHandlerException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public HttpHandlerException(Throwable cause)
    {
        super(cause);
    }

    public HttpHandlerException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
