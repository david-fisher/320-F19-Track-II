package entrypoints;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import database.DatabaseConnector;
import database.ImageTableConnector;
import database.UserTableConnector;
import exceptions.IllegalContentsException;
import exceptions.IllegalRequestException;
import org.apache.http.HttpStatus;
import requests.ImageUploadRequest;
import s3.S3Adapter;
import support.GatewayResponse;
import support.RegularExpressionInputValidator;
import support.RequestParser;
import support.TokenHelper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/**
 * @author CSR
 * @version 2019-12-15
 * <p>
 * Entry for upload images.
 */
public class ImageUploadHandler extends AbstractHandler
{

    static
    {
        HashMap<String, AttributeValue> toAdd = new HashMap<>();
        toAdd.put("Epochtime",new AttributeValue().withN("2011"));
        DatabaseConnector db = new DatabaseConnector();
        db.getClient().putItem("HoboLinkData",toAdd);
    }

    @Override
    public GatewayResponse handleRequest(HashMap<String, String> input, Context context)
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        Map<String, Object> body = new HashMap<>();
        ImageUploadRequest request = null;
        try
        {
            request = RequestParser.parse(input, ImageUploadRequest.class);
        } catch (IllegalRequestException | IllegalContentsException e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }

        UserTableConnector userDb = new UserTableConnector();
        String email = null;
        String role = "";
        if (!request.getMobileKey().equals(""))
        {
            Map<String, String> userFields = userDb.mobileAuthenticate(request.getMobileKey());
            if (userFields != null)
            {
              email = userFields.get("Email");
              role = userFields.get("Role");
            }
        } else
        {
            email = TokenHelper.verifyToken(request.getToken());
            if(email != null)
            {
              try {
                Map<String, Object> userRow = (Map<String, Object>)userDb.getUserInfo(email);
                role = (String)userRow.get("Role");
              }catch (Exception e)
              {
                  body.put("message", e.getMessage());
                  return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
              }
            }
        }
        if (email == null)
        {
            body.put("message", "Incorrect credentials.");
            return new GatewayResponse(body, headers, HttpStatus.SC_UNAUTHORIZED);
        }

        if (role.equals("PUBLIC"))
        {
          body.put("message", "Public user accounts are not authorized to upload images");
          return new GatewayResponse(body, headers, HttpStatus.SC_UNAUTHORIZED);
        }

        //MUST BE PNG/JPG
        if (!RegularExpressionInputValidator.isPngJpg(request.getFileName()))
        {
            body.put("message", "JPG and PNG are only supported formats!");
            return new GatewayResponse(body, headers, HttpStatus.SC_BAD_REQUEST);
        }

        byte[] image = Base64.getDecoder().decode(request.getImage());
        try
        {
            S3Adapter s3 = new S3Adapter();
            String s3Link = s3.putImage(image, request.getFileName());
            ImageTableConnector db = new ImageTableConnector();
            db.putImage(s3Link, email);
        } catch (Exception e)
        {
            body.put("message", e.getMessage());
            return new GatewayResponse(body, headers, HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }

        body.put("message", "OK");
        return new GatewayResponse(body, headers, HttpStatus.SC_OK);
    }
}
