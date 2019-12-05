package database;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

/**
 * @author CSR
 * @version 2019-12-05
 * <p>
 * Adapter class for AmazonDynamoDBClient.
 */
public class DatabaseConnector
{
    /**
     * The AWS region.
     */
    public static final Regions AWS_REGION = Regions.US_EAST_2;

    protected AmazonDynamoDB client;

    public DatabaseConnector()
    {
        this.client = AmazonDynamoDBClientBuilder.standard().withRegion(Regions.US_EAST_2).build();
    }

    public AmazonDynamoDB getClient()
    {
        return this.client;
    }

}
