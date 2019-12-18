package requests;

import support.RegularExpressionInputValidator;
import support.UserRole;

public class UserRegistrationRequest implements RequestInterface
{

    private String email;
    private String role;
    private String firstName;
    private String lastName;
    private String password;

    /**
     * Instantiates a new User registration request.
     */
    public UserRegistrationRequest()
    {
    }

    /**
     * Gets email.
     *
     * @return the email
     */
    public String getEmail()
    {
        return email;
    }

    /**
     * Gets role.
     *
     * @return the role
     */
    public String getRole()
    {
        return role;
    }

    /**
     * Gets first name.
     *
     * @return the first name
     */
    public String getFirstName()
    {
        return firstName;
    }

    /**
     * Gets last name.
     *
     * @return the last name
     */
    public String getLastName()
    {
        return lastName;
    }

    /**
     * Gets password.
     *
     * @return the password
     */
    public String getPassword()
    {
        return password;
    }

    @Override
    public boolean isValid()
    {
        return RegularExpressionInputValidator.isValidEmail(email) &&
                UserRole.validRole(role) &&
                firstName != null && !firstName.equals("") &&
                lastName != null && !lastName.equals("") &&
                password != null && !password.equals("");
    }
}
