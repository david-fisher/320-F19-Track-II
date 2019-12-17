package com.example.owmobile;

import android.util.Base64;

import com.google.gson.JsonObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

public class OWMARestRequestClient {
    String MobileKey;
    // static String APIGatewayURL = "https://fhswpmwl2l.execute-api.us-east-2.amazonaws.com/prod";
    static String APIGatewayImageUploadURL = "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/image-upload";

    public OWMARestRequestClient(String MobileKey){
        this.MobileKey = MobileKey;
    }

    /**
     * Uploads an image, return the response json object
     *
     * @param image : \<java.io.File\> file descriptor for the image file
     * @return : \<String\> message
     */
    public String UploadImage(File image) {
        JsonObject request_body = new JsonObject();
        // FIXME: name conflict with other clients? Is this handled by lambda?
        // possible solution: generate uuid for each image.
        request_body.addProperty("Filename", image.getName());
        request_body.addProperty("Token", "");
        request_body.addProperty("MobileKey", MobileKey);

        // silly workaround to make back-compatible to api level 15 (what does that even mean)

        // FIXME: java demands me to catch the FileNotFoundException,
        // but it really shouldn't happen, right?
        // doing this for brevity
        try {
            FileInputStream fis = new FileInputStream(image);
        } catch (FileNotFoundException e) {
            return "File not found.";
        }
        byte [] bytes = new byte[(int) image.length()];
        request_body.addProperty("Image", Base64.encodeToString(bytes, Base64.DEFAULT));

        HttpResponse<JsonNode> response = Unirest.post(this.APIGatewayImageUploadURL)
                .body(request_body)
                .asJson();

        JsonNode response_body = response.getBody();

        // reason that I am not converting it to a gson json is because unirest seemed to have
        // a different implementation apart from gson

        if (response_body.getObject().has("errorMessage")){
            // FIXME: Ideally we would like to return a success status and a message
            // not sure if there is an idiomatic way to do it in java
            return response_body.getObject().getString("errorMessage");
        }

        return response_body.getObject().getString("message");
    }

}
