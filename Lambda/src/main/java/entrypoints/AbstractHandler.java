package entrypoints;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import support.GatewayResponse;

import java.util.HashMap;

public abstract class AbstractHandler implements RequestHandler<HashMap<String, String>, GatewayResponse>
{
    @Override
    abstract public GatewayResponse handleRequest(HashMap<String, String> input, Context context);

}
