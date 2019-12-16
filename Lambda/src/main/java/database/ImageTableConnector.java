package database;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.internal.IteratorSupport;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.utils.NameMap;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * The type Image table connector.
 *
 * @author CSR
 * @version 2019 -12-15 Adapter class to communicate with Image Table.
 */
public class ImageTableConnector extends DatabaseConnector
{
    /**
     * The constant IMAGE_TABLE.
     */
    protected static final String IMAGE_TABLE = "Image";
    /**
     * The constant IMAGE_ID_COLUMN.
     */
    protected static final String IMAGE_ID_COLUMN = "ID";
    /**
     * The constant IMAGE_ANNOTATED_COLUMN.
     */
    protected static final String IMAGE_ANNOTATED_COLUMN = "Annotated";
    /**
     * The constant IMAGE_PREDICTION_COLUMN.
     */
    protected static final String IMAGE_PREDICTION_COLUMN = "Prediction";
    /**
     * The constant IMAGE_S3_COLUMN.
     */
    protected static final String IMAGE_S3_COLUMN = "S3";
    /**
     * The constant IMAGE_TIMESTAMP_COLUMN.
     */
    protected static final String IMAGE_TIMESTAMP_COLUMN = "Timestamp";
    /**
     * The constant IMAGE_UPLOADER_COLUMN.
     */
    protected static final String IMAGE_UPLOADER_COLUMN = "Uploader";

    /**
     * Instantiates a new Image table connector.
     */
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


    /**
     * Query all images using time span. All input are in Unix-Epoch time.
     *
     * @param startTime the start time
     * @param endTime   the end time
     * @return the images
     */
    public List<Map<String, Object>> getImages(long startTime, long endTime)
    {
        if (endTime < startTime)
        {
            return new ArrayList<>();
        }

        ScanSpec scanSpec = new ScanSpec()
                .withFilterExpression("#ts > :v1 and #ts < :v2")
                .withNameMap(new NameMap().with("#ts", IMAGE_TIMESTAMP_COLUMN))
                .withValueMap(new ValueMap().withNumber(":v1", startTime).withNumber(":v2", endTime));
        IteratorSupport<Item, ScanOutcome> itr = dynamoDB.getTable(IMAGE_TABLE).scan(scanSpec).iterator();
        if (!itr.hasNext())
        {
            return new ArrayList<>();
        }
        List<Map<String, Object>> entries = new ArrayList<>();
        itr.forEachRemaining(i -> entries.add(i.asMap()));
        return entries;
    }

}
