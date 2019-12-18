package entrypoints;

import com.amazonaws.services.lambda.runtime.Context;
import database.HoboTableConnector;
import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import org.apache.http.HttpStatus;
import requests.HoboDataRequest;
import support.GatewayResponse;
import support.RequestParser;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * @author lwb
 * @version 2019-12-16
 * Hobo Table Connector.
 */
public class HoboPullDataHandler extends AbstractHandler {

    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context) throws Exception
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, Object> body = new HashMap<>();
        HoboDataRequest request = null;
        try
        {
            request = RequestParser.parse(input, HoboDataRequest.class);
        } catch (IllegalRequestException | IllegalContentsException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }
        //System.out.println(input);
        //System.out.println(input.get("StartTime"));
        //System.out.println(input.get("EndTime"));
        Long startTime= Long.parseUnsignedLong(request.getStartTime());
        Long endTime= Long.parseUnsignedLong(request.getEndTime());
        HoboTableConnector db = new HoboTableConnector();
        List<Map<String, Object>> rslt = db.getHobo(startTime,endTime);
        if (rslt == null)
            return new GatewayResponse(null, headers, HttpStatus.SC_NOT_FOUND);
        body.put("Hobo info:",rslt);
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
