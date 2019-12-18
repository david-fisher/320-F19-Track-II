package entrypoints;

import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;
import database.ImageTableConnector;
import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import org.apache.http.HttpStatus;
import requests.GetImagesRequest;
import s3.S3Adapter;
import support.GatewayResponse;
import support.RequestParser;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author CSR
 * @version 2019-12-16
 * <p>
 * Entry for query images
 */
public class GetImagesHandlers extends AbstractHandler
{
    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context) throws Exception
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, Object> body = new HashMap<>();
        GetImagesRequest request = null;
        try
        {
            request = RequestParser.parse(input, GetImagesRequest.class);
        } catch (IllegalRequestException | IllegalContentsException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }

        List<String> links;
        List<Map<String, Object>> entries;
        try
        {
            ImageTableConnector db = new ImageTableConnector();
            entries = db.getImages(Long.parseUnsignedLong(request.getStartTime()), Long.parseUnsignedLong(request.getEndTime()));
            List<String> imagePaths = entries.stream().map(e -> (String) e.get("S3")).collect(Collectors.toList());
            S3Adapter s3 = new S3Adapter();
            links = s3.getImages(imagePaths);
        } catch (Exception e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }

        body.put("ImageInfo", entries);
        body.put("Images", links);
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
