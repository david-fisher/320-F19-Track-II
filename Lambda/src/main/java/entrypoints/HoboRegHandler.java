package entrypoints;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import database.HoboTableConnector;
import exceptions.TimestampAlreadyExistException;
import org.apache.http.HttpStatus;
import support.GatewayResponse;

import java.time.Instant;
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
                    (int)Instant.now().getEpochSecond(),    //now
                    (int)(Math.random()*999+1)+"-"+(int)(Math.random()*999+1),  //001-001 to 999-999 (Unit: N/A)
                    (int)(Math.random()*101), //0 to 100 (Unit: %)
                    (int)(Math.random()*16),  //0 to 15 (Unit: level) (completely dry to saturated)
                    (int)(Math.random()*101),  //0 to 100 (Unit: mm)
                    (int)(Math.random()*36+10),  //10 to 45 (Unit: %)
                    (int)(Math.random()*999901+100),  //100 to 1000000 (Unit: nm)
                    (int)(Math.random()*107-2),  // -2 to 104 (Unit: F)(MA record)
                    (int)(Math.random()*12) // 0-12 (Unit: level)
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
