package support;

import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import requests.RequestInterface;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.*;

/**
 * The type Request parser.
 * The parser class to parse inputted HashMap to construct a Request object.
 * @author CSR
 * @version 2019 -12-05
 */
public final class RequestParser
{
    /**
     * Parse given Json (in the form of HashMap) into desired Request object using reflection.
     * Example: UserRegistrationRequest request = RequestParser.parse(input, UserRegistrationRequest.class);
     *
     * @param <R>          the Request Type
     * @param input        the parsed HashMap from json
     * @param requestClass the Request class
     * @return Constructed Instance of Desired Request Class.
     * @throws IllegalRequestException  if input HashMap does not contains all the filed in desired Request Class.
     * @throws IllegalContentsException if fields in request contains illegal contents.
     * @throws NullPointerException     if any of arguments are null
     * @throws IllegalStateException    if there is anything wrong during reflection.
     */
    public static <R extends RequestInterface> R parse(HashMap<String, String> input, Class requestClass)
            throws IllegalRequestException, IllegalContentsException
    {
        if (input == null || requestClass == null)
        {
            throw new NullPointerException("RequestParser.parse() received a null args! Please contact Lambda Team.");
        }

        R request = null;
        try
        {

            Constructor<R> constructor = requestClass.getConstructor();
            if (constructor.getParameterCount() != 0)
            {
                throw new NoSuchMethodException(); //Jump
            }
            request = constructor.newInstance();
        } catch (Exception e)
        {
            throw new IllegalStateException("RequestParser.parse() has error while constructing requests object. Please contact Lambda Team.");
        }

        List<Field> fields = Arrays.asList(requestClass.getDeclaredFields());
        Set<String> keys = input.keySet();
        for (final Field field : fields)
        {
            Optional<String> key = keys.stream().filter(k -> k.toLowerCase().equals(field.getName().toLowerCase())).findAny();
            if (key.isPresent())
            {
                try
                {
                    boolean accessible = field.isAccessible();
                    field.setAccessible(true);
                    field.set(request, input.get(key.get()));
                    field.setAccessible(accessible);
                } catch (Exception e)
                {
                    throw new IllegalStateException("RequestParser.parse() has error while modifying requests object. Please contact Lambda Team.");
                }
            } else
            {
                throw new IllegalRequestException(String.format("Requests does not contain necessary field:'%s'", field.getName()));
            }
        }

        if (!request.isValid())
        {
            throw new IllegalContentsException("Requests contains field(s) that has illegal contents.");
        }

        return request;
    }
}
