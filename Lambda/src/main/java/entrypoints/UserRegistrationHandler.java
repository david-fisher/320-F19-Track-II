package entrypoints;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import database.UserTableConnector;
import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import exceptions.UserAlreadyExistException;
import org.apache.http.HttpStatus;
import requests.UserRegistrationRequest;
import support.GatewayResponse;
import support.RequestParser;
import support.UserRole;

import java.util.HashMap;
import java.util.Map;


/**
 * @author CSR
 * @version 2019-12-15
 * <p>
 * Entry for user registration.
 */
public class UserRegistrationHandler extends AbstractHandler
{
    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context) throws Exception
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, Object> body = new HashMap<>();
        UserRegistrationRequest request = null;
        try
        {
            request = RequestParser.parse(input, UserRegistrationRequest.class);
        } catch (IllegalRequestException | IllegalContentsException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }

        //MUST BE PUBLIC
        if (!request.getRole().toUpperCase().equals(UserRole.PUBLIC.name()))
        {
            body.put("message", "Cannot register a non-public account!");
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }

        UserTableConnector db = new UserTableConnector();
        try
        {
            db.addUser(
                    request.getEmail(),
                    UserRole.valueOf(request.getRole()),
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPassword()
            );
        } catch (AmazonServiceException | UserAlreadyExistException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
        body.put("message", "OK");
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
