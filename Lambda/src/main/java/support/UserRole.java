package support;

/**
 * The enum User Role.
 */
public enum UserRole
{
    /**
     * Public user role.
     */
    PUBLIC,
    /**
     * Researcher user role.
     */
    RESEARCHER;

    /**
     * If input string is a valid role.
     *
     * @param str input
     * @return If input string is a valid role.
     */
    public static boolean validRole(String str)
    {
        if (str == null)
        {
            return false;
        }

        boolean ret = true;
        try
        {
            UserRole.valueOf(str);
        } catch (IllegalStateException e)
        {
            ret = false;
        }
        return ret;
    }
}
