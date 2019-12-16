package requests;

public class HoboDataRequest implements RequestInterface{

    private String startTime;
    private String endTime;

    public HoboDataRequest()
    {

    }
    public String getStartTime()
    {
        return startTime;
    }
    public String getEndTime()
    {
        return endTime;
    }
    @Override
    public boolean isValid()
    {
        try{
            Long.parseUnsignedLong(startTime);
            Long.parseUnsignedLong(endTime);
        } catch (Exception e)
        {
            return false;
        }
        return true;
    }
}
