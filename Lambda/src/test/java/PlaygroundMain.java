import support.TokenHelper;

public class PlaygroundMain
{
    public static void main(String[] argv)
    {
        String email = "test@test.com";
        //String token = TokenHelper.getToken(email);
        String token = "YBpn61KXOI5mbZUIElY5CQiAI7rD+Q8Fx6D8x0WllDY=";
        System.out.println(token);
        String decrypt = TokenHelper.verifyToken(token);
        System.out.println(decrypt);
    }
}
