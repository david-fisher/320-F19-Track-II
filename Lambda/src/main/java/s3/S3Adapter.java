package s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.Region;

import java.io.ByteArrayInputStream;


/**
 * @author CSR
 * @version 2019-12-15
 * <p>
 * Adapter Class for AWS S3.
 */
public class S3Adapter
{
    protected static final Region REGION = Region.US_East_2;
    protected static final String IMAGE_BUCKET = "orchardwatchimages";

    protected AmazonS3 client;

    public S3Adapter()
    {
        client = AmazonS3Client.builder().withRegion(REGION.toString()).build();
    }

    public String putImage(byte[] image, String filename)
    {
        filename = String.valueOf(System.currentTimeMillis()) + "-" + filename;
        ByteArrayInputStream inputStream = new ByteArrayInputStream(image);
        client.putObject(IMAGE_BUCKET, filename, inputStream, new ObjectMetadata());
        return "s3://" + IMAGE_BUCKET + "/" + filename;
    }

}
