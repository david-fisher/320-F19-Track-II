package database;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.internal.IteratorSupport;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;


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
    protected DynamoDB dynamoDB;

    public DatabaseConnector()
    {
        this.client = AmazonDynamoDBClientBuilder.standard().withRegion(Regions.US_EAST_2).build();
        this.dynamoDB = new DynamoDB(client);
    }

    /**
     * Get specified row in db according to input value using SCAN.
     *
     * @param tableName  Table Name
     * @param columnName the column name to query
     * @param value      the value to look up
     * @return Iterator for row
     */
    protected IteratorSupport<Item, ScanOutcome> getRow(String tableName, String columnName, String value)
    {
        ScanSpec scanSpec = new ScanSpec()
                .withFilterExpression(String.format("%s = :v", columnName))
                .withValueMap(new ValueMap().withString(":v", value));
        return dynamoDB.getTable(tableName).scan(scanSpec).iterator();
    }

    public AmazonDynamoDB getClient()
    {
        return this.client;
    }

}
