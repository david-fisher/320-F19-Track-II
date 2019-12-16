package s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.Region;
import org.apache.commons.lang3.time.DateUtils;

import java.io.ByteArrayInputStream;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


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

    /**
     * Instantiates a new S 3 adapter.
     */
    public S3Adapter()
    {
        client = AmazonS3Client.builder().withRegion(REGION.toString()).build();
    }

    /**
     * Put image into S3.
     *
     * @param image    the image bytes.
     * @param filename the filename (key)
     * @return the string S3 path of images.
     */
    public String putImage(byte[] image, String filename)
    {
        filename = String.valueOf(System.currentTimeMillis()) + "-" + filename;
        ByteArrayInputStream inputStream = new ByteArrayInputStream(image);
        client.putObject(IMAGE_BUCKET, filename, inputStream, new ObjectMetadata());
        return "s3://" + IMAGE_BUCKET + "/" + filename;
    }

    /**
     * Gets images preassigned Urls using S3 paths.
     *
     * @param s3Links the s3 paths.
     * @return the preassigned urls for image.
     */
    public List<String> getImages(List<String> s3Links)
    {
        List<String> keys = s3Links.stream().map(l -> l.split("/")[3]).collect(Collectors.toList());
        List<String> ret = keys.stream()
                .map(l -> client.generatePresignedUrl(IMAGE_BUCKET, l, DateUtils.addHours(Date.from(Instant.now()), 1))
                        .toString()).collect(Collectors.toList());
        return ret;
    }

}
