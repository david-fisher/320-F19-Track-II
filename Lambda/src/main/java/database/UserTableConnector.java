package database;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import exceptions.UserAlreadyExistException;
import support.UserRole;

import java.util.HashMap;

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
     * Whether the email is registered.
     *
     * @param email the email
     * @return Whether the email is registered
     */
    public boolean hasUser(String email)
    {
        String condition = String.format("%s = :email", USER_EMAIL_COLUMN, email);
        QuerySpec query = new QuerySpec();
        query.withKeyConditionExpression(condition).withValueMap(new HashMap<String, Object>()
        {{
            put(":email", email);
        }});
        return (new DynamoDB(client)).getTable(USER_TABLE).query(query).iterator().hasNext();
    }

}
