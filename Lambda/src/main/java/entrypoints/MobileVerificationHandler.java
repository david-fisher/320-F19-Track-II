package entrypoints;


import com.amazonaws.services.lambda.runtime.Context;
import database.UserTableConnector;
import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import org.apache.http.HttpStatus;
import requests.MobileVerificationRequest;
import support.GatewayResponse;
import support.RequestParser;

import java.util.HashMap;
import java.util.Map;

/**
 * The Entry Point for handling verification from mobile end.
 *
 * @author CSR
 * @version 2019-12-05
 */
public class MobileVerificationHandler extends AbstractHandler
{

    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context)
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, String> body = new HashMap<>();
        MobileVerificationRequest request = null;
        try
        {
            request = RequestParser.parse(input, MobileVerificationRequest.class);
            request = RequestParser.parse(input, MobileVerificationRequest.class);
        } catch (IllegalRequestException | IllegalContentsException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }
        Map<String, String> ret;
        UserTableConnector db = new UserTableConnector();
        try
        {
            ret = db.mobileVerify(request.getMobileKey());
        } catch (IllegalStateException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
        if (ret == null)
        {
            body.put("message", "Cannot find user with such key!");
            return new GatewayResponse(body, headers, HttpStatus.SC_UNAUTHORIZED);
        }
        body.putAll(ret);
        body.put("message", "OK");
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
