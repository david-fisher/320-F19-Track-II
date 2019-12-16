package support;

import com.amazonaws.serverless.proxy.internal.model.AwsProxyResponse;
import com.google.gson.Gson;


import java.util.Map;

/**
 * Repack for AwsProxyResponse
 *
 * @author CSR
 * @version 2019-12-15
 */
public class GatewayResponse extends AwsProxyResponse
{
    public GatewayResponse(final Map<String, String> body, final Map<String, String> headers, final int statusCode)
    {
        super();
        this.setStatusCode(statusCode);
        this.setHeaders(headers);
        this.setBody(new Gson().toJson(body).toString());
    }

}
