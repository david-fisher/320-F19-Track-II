package database;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.internal.IteratorSupport;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;
import com.amazonaws.services.dynamodbv2.document.spec.PutItemSpec;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.document.spec.UpdateItemSpec;
import com.amazonaws.services.dynamodbv2.document.utils.NameMap;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.PutItemRequest;
import exceptions.UserAlreadyExistException;
import support.UserRole;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author CSR
 * @version 2019-12-05
 * Adapter class to communicate with User Table.
 */
public class UserTableConnector extends DatabaseConnector
{
    /**
     * The table names of users' information (email, name, password, etc.).
     */
    protected static final String USER_TABLE = "UserInfo";
    protected static final String USER_EMAIL_COLUMN = "EMail";
    protected static final String USER_ROLE_COLUMN = "Role";
    protected static final String USER_FIRST_NAME_COLUMN = "FName";
    protected static final String USER_LAST_NAME_COLUMN = "LName";
    protected static final String USER_PASSWORD_COLUMN = "Password";
    protected static final String USER_MOBILE_KEY_COLUMN = "MobileKey";

    /**
     * Default constructor. Will establish a link to DynamoDB.
     */
    public UserTableConnector()
    {
        super();
    }

    /**
     * Add user to User Table.
     *
     * @param email    the email
     * @param role     the role
     * @param fname    the fname
     * @param lname    the lname
     * @param password the password
     */
    public void addUser(String email, UserRole role, String fname, String lname, String password)
            throws UserAlreadyExistException
    {
        if (email == null || role == null || fname == null || lname == null || password == null)
        {
            throw new NullPointerException("Cannot add null into user table.");
        }

        email = email.toLowerCase(); // Force lower case

        if (hasUser(email))
        {
            throw new UserAlreadyExistException(String.format("User with email:%s already exist.", email));
        }

        HashMap<String, AttributeValue> toAdd = new HashMap<>();
        toAdd.put(USER_EMAIL_COLUMN, new AttributeValue(email));
        toAdd.put(USER_ROLE_COLUMN, new AttributeValue(role.toString().toUpperCase()));
        toAdd.put(USER_FIRST_NAME_COLUMN, new AttributeValue(fname));
        toAdd.put(USER_LAST_NAME_COLUMN, new AttributeValue(lname));
        toAdd.put(USER_PASSWORD_COLUMN, new AttributeValue(password));
        this.client.putItem(USER_TABLE, toAdd);
    }

    /**
     * Get specified row in db according to input email.
     *
     * @param email Table Name
     * @return Iterator for row
     */
    private IteratorSupport<Item, QueryOutcome> getRow(String email)
    {
        String condition = String.format("%s = :v", USER_EMAIL_COLUMN, email);
        QuerySpec query = new QuerySpec();
        query.withKeyConditionExpression(condition).withValueMap(new HashMap<String, Object>()
        {{
            put(":v", email);
        }});
        return dynamoDB.getTable(USER_TABLE).query(query).iterator();
    }

    /**
     * Whether the email is registered.
     *
     * @param email the email
     * @return Whether the email is registered
     */
    public boolean hasUser(String email)
    {
        return getRow(email).hasNext();
    }

    /**
     * Verify password.
     *
     * @param email    the email
     * @param password the password
     * @return True iff the password exactly matches email.
     */
    public boolean verifyPassword(String email, String password)
    {
        IteratorSupport<Item, QueryOutcome> itr = getRow(email);
        if (!itr.hasNext())
        {
            return false;
        }
        Map<String, Object> item = itr.next().asMap();
        if (!item.containsKey(USER_PASSWORD_COLUMN) || !item.get(USER_PASSWORD_COLUMN).getClass().equals(String.class))
        {
            throw new IllegalStateException("Found user but not its password in database.");
        }
        String record = (String) item.get(USER_PASSWORD_COLUMN);
        return record.equals(password);
    }

    /**
     * Query for mobile's verification.
     * If input a right key, it will return owner's name, and generate a new access key
     * as the permanent key for future use for mobile users.
     * <p>
     * Returned Map would be:
     * {
     * "Name": [Owner's Name]
     * "Email": [Owner's Email]
     * "Role": [Owner's Role]
     * "Key": [New Access Key will be used]
     * }
     *
     * @param accessKey the access key
     * @return the Map with owner's email, name and new key. Null if no such owner.
     */
    public Map<String, String> mobileVerify(String accessKey)
    {
        Map<String, String> search = mobileAuthenticate(accessKey);
        String name = search.get("Name");
        String email = search.get("Email");
        String role = search.get("Role");
        String newKey = UUID.randomUUID().toString();
        String updateExpression = String.format("set %s = :v", USER_MOBILE_KEY_COLUMN);
        UpdateItemSpec updateSpec = new UpdateItemSpec()
                .withPrimaryKey(USER_EMAIL_COLUMN, email, USER_ROLE_COLUMN, role)
                .withUpdateExpression(updateExpression)
                .withValueMap(new ValueMap().with(":v", newKey));

        try
        {
            dynamoDB.getTable(USER_TABLE).updateItem(updateSpec);
        } catch (Exception e)
        {
            throw new IllegalStateException("Find User but fail to save new key!\n" + e.getMessage());
        }
        Map<String, String> ret = new HashMap<String, String>()
        {{
            put("Name", name);
            put("Email", email);
            put("Role", role);
            put("Key", newKey);
        }};
        return ret;
    }


    /**
     * Mobile authentication.
     *
     * Return user's info if access key is valid.
     *
     * Else null.
     *
     * @param accessKey the access key
     * @return User info map if valid key. Null other wise.
     */
    public Map<String, String> mobileAuthenticate(String accessKey)
    {
        IteratorSupport<Item, ScanOutcome> itr = super.getRow(USER_TABLE, USER_MOBILE_KEY_COLUMN, accessKey);
        if (!itr.hasNext())
        {
            return null;
        }
        Map<String, Object> item = itr.next().asMap();
        String name = (String) item.get(USER_FIRST_NAME_COLUMN) + " " + (String) item.get(USER_LAST_NAME_COLUMN);
        String email = (String) item.get(USER_EMAIL_COLUMN);
        String role = (String) item.get(USER_ROLE_COLUMN);
        Map<String, String> ret = new HashMap<String, String>()
        {{
            put("Name", name);
            put("Email", email);
            put("Role", role);
        }};
        return ret;
    }


    public Object getUserInfo(String email) {
        IteratorSupport<Item, QueryOutcome> itr = getRow(email);
        if (!itr.hasNext()) {
            return false;
        }
        Map<String, Object> item = itr.next().asMap();
        item.remove("Password");
        return item;
    }
}
