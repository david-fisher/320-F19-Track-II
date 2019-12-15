package requests;


/**
 * MobileVerificationRequest.
 * Request of verification from mobile end.
 *
 * @author CSR
 * @version 2019-12-15
 */
public class MobileVerificationRequest implements RequestInterface
{


    private String mobileKey;

    /**
     * Instantiates a new Mobile verification request.
     */
    public MobileVerificationRequest()
    {
    }

    /**
     * Gets mobile key.
     *
     * @return the mobile key
     */
    public String getMobileKey()
    {
        return mobileKey;
    }

    @Override
    public boolean isValid()
    {
        return mobileKey != null && !mobileKey.equals("");
    }
}
