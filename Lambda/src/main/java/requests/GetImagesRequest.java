package requests;

/**
 * The type Get image request.
 *
 * @author CSR
 * @version 2019-12-15
 */
public class GetImagesRequest implements RequestInterface
{
    private String startTime;
    private String endTime;

    /**
     * Instantiates a new Get image request.
     */
    public GetImagesRequest()
    {
    }

    /**
     * Gets start time.
     *
     * @return the start time
     */
    public String getStartTime()
    {
        return startTime;
    }

    /**
     * Gets end time.
     *
     * @return the end time
     */
    public String getEndTime()
    {
        return endTime;
    }

    @Override
    public boolean isValid()
    {
        try
        {
            Long.parseUnsignedLong(startTime);
            Long.parseUnsignedLong(endTime);
        } catch (Exception e)
        {
            return false;
        }
        return true;
    }
}
