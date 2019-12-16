package database;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
import com.amazonaws.services.dynamodbv2.document.internal.IteratorSupport;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import exceptions.TimestampAlreadyExistException;

import java.util.HashMap;
/**
 * @author lwb
 * @version 2019-12-15
 * Hobo Table Connector.
 */
public class HoboTableConnector extends DatabaseConnector {

    /**
     * The table names of Hobos' information (ID, Timestamp, Humidity, etc.).
     */
    protected static final String HOBO_TABLE = "HoboLinkData";
    protected static final String HOBO_ID = "HoboID";
    protected static final String HOBO_TIMESTAMP_COLUMN = "Epochtime";
    protected static final String HOBO_HUMIDITY_COLUMN = "Humidity";
    protected static final String HOBO_LEAF_WETNESS_COLUMN = "LeafWetness";
    protected static final String HOBO_RAINFALL_COLUMN = "Rainfall";
    protected static final String HOBO_SOIL_MOISTURE_COLUMN = "SoilMoisture";
    protected static final String HOBO_SOLAR_RADIATION_COLUMN = "SolarRadiation";
    protected static final String HOBO_TEMPERATURE_COLUMN = "Temperature";
    protected static final String HOBO_WIND_COLUMN = "Wind";

    /**
     * Default constructor. Will establish a link to DynamoDB.
     */
    public HoboTableConnector() {
        super();
    }

    /**
     * Register Hobo sensors to Hobo Table.
     *
     * @param HoboID    the ID
     * @param Epochtime  the Timestamp
     * @param Humidity   the Humidity
     * @param LeafWetness   the Leaf Wetness
     * @param Rainfall  the Rainfall
     * @param SoilMoisture   the Soil Moisture
     * @param SolarRadiation  the Solar Radiation
     * @param Temperature  the Temperature
     * @param Wind  the Wind
     */
    /*
    public void addHobo(int time,String id, int hum, int leafWet, int rainFall, int moi,
                        int solarRad, int temp, int wind)
            throws TimestampAlreadyExistException, TimestampAlreadyExistException {
        if (id == null)
        {
            throw new NullPointerException("Cannot add null into Hobo table.");
        }

        //TBD which paras need to be forced lower case

        if (hasHobo(String.valueOf(time))) {
            throw new TimestampAlreadyExistException(String.format("Hobo with Timestamp:%s already exist.", time));
        }

        HashMap<String, AttributeValue> toAdd = new HashMap<>();
        toAdd.put(HOBO_ID, new AttributeValue(id));
        toAdd.put(HOBO_HUMIDITY_COLUMN, new AttributeValue(String.valueOf(hum)));
        toAdd.put(HOBO_LEAF_WETNESS_COLUMN, new AttributeValue(String.valueOf(leafWet)));
        toAdd.put(HOBO_RAINFALL_COLUMN, new AttributeValue(String.valueOf(rainFall)));
        toAdd.put(HOBO_SOIL_MOISTURE_COLUMN, new AttributeValue(String.valueOf(moi)));
        toAdd.put(HOBO_SOLAR_RADIATION_COLUMN, new AttributeValue(String.valueOf(solarRad)));
        toAdd.put(HOBO_TEMPERATURE_COLUMN, new AttributeValue(String.valueOf(temp)));
        toAdd.put(HOBO_TIMESTAMP_COLUMN, new AttributeValue(String.valueOf(time)));
        toAdd.put(HOBO_WIND_COLUMN, new AttributeValue(String.valueOf(wind)));
        this.client.putItem(HOBO_TABLE, toAdd);
    }
    */
    public void addHobo(int Epochtime/*, String HoboID, int Humidity, int LeafWetness, int Rainfall, int SoilMoisture,
                        int SolarRadiation, int Temperature, int Wind*/)
            throws TimestampAlreadyExistException, TimestampAlreadyExistException {
        /*if (HoboID == null)
        {
            throw new NullPointerException("Cannot add null into Hobo table.");
        }*/

        //TBD which paras need to be forced lower case

        if (hasHobo(String.valueOf(Epochtime))) {
            throw new TimestampAlreadyExistException(String.format("Hobo with Timestamp:%s already exist.", Epochtime));
        }

        HashMap<String, AttributeValue> toAdd = new HashMap<>();
        toAdd.put(HOBO_TIMESTAMP_COLUMN, new AttributeValue("2"));
        /*
        toAdd.put(HOBO_ID, new AttributeValue(HoboID));
        toAdd.put(HOBO_HUMIDITY_COLUMN, new AttributeValue().withN(String.valueOf(Humidity)));
        toAdd.put(HOBO_LEAF_WETNESS_COLUMN, new AttributeValue().withN(String.valueOf(LeafWetness)));
        toAdd.put(HOBO_RAINFALL_COLUMN, new AttributeValue().withN(String.valueOf(Rainfall)));
        toAdd.put(HOBO_SOIL_MOISTURE_COLUMN, new AttributeValue().withN(String.valueOf(SoilMoisture)));
        toAdd.put(HOBO_SOLAR_RADIATION_COLUMN, new AttributeValue().withN(String.valueOf(SolarRadiation)));
        toAdd.put(HOBO_TEMPERATURE_COLUMN, new AttributeValue().withN(String.valueOf(Temperature)));
        toAdd.put(HOBO_WIND_COLUMN, new AttributeValue().withN(String.valueOf(Wind)));
         */
        this.client.putItem(HOBO_TABLE,toAdd);
    }
    /**
     * Get specified row in db according to input Timestamp.
     *
     * @param Epochtime Table Name
     * @return Iterator for row
     */
    private IteratorSupport<Item, QueryOutcome> getRow(String Epochtime) {
        String condition = String.format("%s = :v", HOBO_TIMESTAMP_COLUMN, Epochtime);
        QuerySpec query = new QuerySpec();
        query.withKeyConditionExpression(condition).withValueMap(new HashMap<String, Object>() {{
            put(":v", Epochtime);
        }});
        return dynamoDB.getTable(HOBO_TABLE).query(query).iterator();
    }

    /**
     * Whether the timestamp is registered.
     *
     * @param timestamp Table Name
     * @return Whether the timestamp is registered
     */
    public boolean hasHobo(String Epochtime) {
        return getRow(Epochtime).hasNext();
    }

}