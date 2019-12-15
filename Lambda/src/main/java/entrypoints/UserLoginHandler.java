package entrypoints;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import database.UserTableConnector;
import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import org.apache.http.HttpStatus;
import requests.UserLoginRequest;
import support.GatewayResponse;
import support.RequestParser;
import support.TokenHelper;


import java.util.HashMap;
import java.util.Map;

/**
 * @author CSR
 * @version 2019-12-15
 * <p>
 * Entry for user log-in.
 */
public class UserLoginHandler extends AbstractHandler
{
    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context)
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, String> body = new HashMap<>();
        UserLoginRequest request = null;
        try
        {
            request = RequestParser.parse(input, UserLoginRequest.class);
        } catch (IllegalRequestException | IllegalContentsException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }
        UserTableConnector db = new UserTableConnector();
        boolean success = false;
        try
        {
            success = db.verifyPassword(request.getEmail(), request.getPassword());
        } catch (AmazonServiceException | IllegalStateException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
        if (!success)
        {
            body.put("message", "Email and Password do not match.");
            return new GatewayResponse(body, headers, HttpStatus.SC_UNAUTHORIZED);
        }
        body.put("message", "OK");
        body.put("token", TokenHelper.getToken(request.getEmail()));
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
