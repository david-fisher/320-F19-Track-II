package entrypoints;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import database.HoboTableConnector;
import exceptions.TimestampAlreadyExistException;
import org.apache.http.HttpStatus;
import support.GatewayResponse;

import java.util.HashMap;
import java.util.Map;


/**
 * @author lwb
 * @version 2019-12-15
 * <p>
 * Entry for Hobo registration.
 */
public class HoboRegHandler extends AbstractHandler
{
    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context)
    {
        System.out.println(input);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, String> body = new HashMap<>();
        HoboTableConnector db = new HoboTableConnector();
        try
        {
            db.addHobo(
                    2/*,
                    "2",
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9*/
            );
        } catch (AmazonServiceException | TimestampAlreadyExistException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
        body.put("message", "OK");
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
