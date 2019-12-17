package support;

import com.amazonaws.serverless.proxy.internal.model.AwsProxyResponse;
import com.google.gson.Gson;
import org.apache.http.HttpStatus;


import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * POJO containing response object for API Gateway.
 *
 * @author CSR
 * @version 2019-12-15
 */
public class GatewayResponse
{

    private final Map<String, Object> body;
    private final Map<String, String> headers;
    private final int statusCode;

    public GatewayResponse(final Map<String, Object> body, final Map<String, String> headers, final int statusCode) throws Exception
    {
        this.statusCode = statusCode;
        Map<String, Object> bodycurr=body;
        switch (statusCode)
        {
            case HttpStatus.SC_UNAUTHORIZED:
                String errorMessage = statusCode + " UNAUTHORIZED: " + bodycurr.get("message");
                throw new Exception(errorMessage);
                break;
            case HttpStatus.SC_BAD_REQUEST:
                String errorMessage = statusCode + " BAD REQUEST: " + bodycurr.get("message");
                throw new Exception(errorMessage);
                break;
            case HttpStatus.SC_INTERNAL_SERVER_ERROR:
                String errorMessage = statusCode + " INTERNAL SERVER ERROR: " + bodycurr.get("message");
                throw new Exception(errorMessage);
                break;
            case HttpStatus.SC_NOT_FOUND:
                String errorMessage = statusCode + " NOT FOUND: " + bodycurr.get("message");
                throw new Exception(errorMessage);
                break;
            default:
        }
        this.body = bodycurr;
        this.headers = Collections.unmodifiableMap(new HashMap<>(headers));
    }

    public Map<String, Object> getBody()
    {
        return body;
    }

    public Map<String, String> getHeaders()
    {
        return headers;
    }

    public int getStatusCode()
    {
        return statusCode;
    }
}
