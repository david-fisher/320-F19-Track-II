package requests;

/**
 * The type Image upload request.
 *
 * @author CSR
 * @version 2019-12-15
 */
public class ImageUploadRequest implements RequestInterface
{
    private String fileName;
    private String token;
    private String mobileKey;
    private String image;

    /**
     * Instantiates a new Image upload request.
     */
    public ImageUploadRequest()
    {
    }

    /**
     * Gets file name.
     *
     * @return the file name
     */
    public String getFileName()
    {
        return fileName;
    }

    /**
     * Gets token.
     *
     * @return the token
     */
    public String getToken()
    {
        return token;
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

    /**
     * Gets image in Base64 decoded.
     *
     * @return the image
     */
    public String getImage()
    {
        return image;
    }

    @Override
    public boolean isValid()
    {
        return fileName != null && !fileName.equals("") && token != null && mobileKey != null;
    }
}
