package entrypoints;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import support.GatewayResponse;

import java.util.HashMap;

/**
 * @author CSR
 * @version 2019-12-05
 * Abstract class implementing lambda.runtime.RequestHandler.
 * All requests will be parsed by AWS into HashMap.
 * And returned object would also be handled by AWS.
 */
public abstract class AbstractHandler implements RequestHandler<HashMap<String, String>, GatewayResponse>
{
    @Override
    abstract public GatewayResponse handleRequest(HashMap<String, String> input, Context context) throws Exception;

}
