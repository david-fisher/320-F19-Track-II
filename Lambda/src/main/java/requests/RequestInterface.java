package requests;

/**
 * The interface Request interface.
 * The Interface for all requests All the request classes should implement this interface.
 * Request object will be constructed form HashMap using reflection.
 * Therefore, all declared fields should be string. All declared fields are necessary for input.
 * Request class implementing this interface must have default constructor.
 *
 * @author CSR
 * @version 2019 -12-05
 */
public interface RequestInterface
{

    /**
     * Return whether all the fields have legal format.
     *
     * @return the boolean
     */
    boolean isValid();
}
