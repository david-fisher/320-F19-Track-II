package entrypoints;

import com.amazonaws.services.lambda.runtime.Context;
import exceptions.IllegalRequestException;
import requests.UserRegistrationRequest;
import support.GatewayResponse;
import support.RequestParser;

import java.util.HashMap;
import java.util.Map;

public class UserRegistrationHandler extends AbstractHandler
{
    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context)
    {
        UserRegistrationRequest request = null;
        try
        {
            request = RequestParser.parse(input, UserRegistrationRequest.class);
        } catch (IllegalRequestException e)
        {
            return null;
        }

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        String output = String.format("{ \"message\": \"hello world\", \"location\": \"%s\" }", "TEST");
        return new GatewayResponse(output, headers, 200);
    }
}
