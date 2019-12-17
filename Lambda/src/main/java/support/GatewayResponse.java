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

    public GatewayResponse(final Map<String, Object> body, final Map<String, String> headers, final int statusCode)
    {
        this.statusCode = statusCode;
        Map<String, Object> bodycurr=body;
        switch (statusCode)
        {
            case HttpStatus.SC_UNAUTHORIZED:
                bodycurr.put("message","UNAUTHORIZED:"+bodycurr.get("message"));
                break;
            case HttpStatus.SC_BAD_REQUEST:
                bodycurr.put("message","BAD REQUEST:"+bodycurr.get("message"));
                break;
            case HttpStatus.SC_INTERNAL_SERVER_ERROR:
                bodycurr.put("message","INTERNAL SERVER ERROR:"+bodycurr.get("message"));
                break;
            case HttpStatus.SC_NOT_FOUND:
                bodycurr.put("message","NOT FOUND:"+bodycurr.get("message"));
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