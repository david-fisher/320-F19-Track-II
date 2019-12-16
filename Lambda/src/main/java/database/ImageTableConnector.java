package database;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;

import java.time.Instant;
import java.util.HashMap;
/**
 * @author CSR
 * @version 2019-12-15
 * Adapter class to communicate with Image Table.
 */
public class ImageTableConnector extends DatabaseConnector
{
    protected static final String IMAGE_TABLE = "Image";
    protected static final String IMAGE_ID_COLUMN = "ID";
    protected static final String IMAGE_ANNOTATED_COLUMN = "Annotated";
    protected static final String IMAGE_PREDICTION_COLUMN = "Prediction";
    protected static final String IMAGE_S3_COLUMN = "S3";
    protected static final String IMAGE_TIMESTAMP_COLUMN = "Timestamp";
    protected static final String IMAGE_UPLOADER_COLUMN = "Uploader";

    public ImageTableConnector()
    {
        super();
    }

    /**
     * Put image info to Image table
     *
     * @param s3Link   the s3 path
     * @param uploader the uploader
     */
    public void putImage(String s3Link, String uploader)
    {
        uploader = uploader.toLowerCase();
        HashMap<String, AttributeValue> toAdd = new HashMap<>();
        toAdd.put(IMAGE_ID_COLUMN, new AttributeValue().withN(String.valueOf(System.currentTimeMillis())));
        toAdd.put(IMAGE_ANNOTATED_COLUMN, new AttributeValue().withBOOL(false));
        toAdd.put(IMAGE_PREDICTION_COLUMN, new AttributeValue("null"));
        toAdd.put(IMAGE_S3_COLUMN, new AttributeValue(s3Link));
        toAdd.put(IMAGE_TIMESTAMP_COLUMN, new AttributeValue().withN(String.valueOf(Instant.now().getEpochSecond())));
        toAdd.put(IMAGE_UPLOADER_COLUMN, new AttributeValue(uploader));
        this.client.putItem(IMAGE_TABLE, toAdd);
    }


}
