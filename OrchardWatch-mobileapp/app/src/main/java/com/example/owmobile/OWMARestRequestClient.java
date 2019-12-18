package com.example.owmobile;

import android.content.ContentResolver;
import android.net.Uri;
import android.os.AsyncTask;
import android.renderscript.ScriptGroup;
import android.util.Base64;

import androidx.core.util.Consumer;

import com.google.gson.JsonObject;

import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.UUID;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;

public class OWMARestRequestClient {
    String MobileKey;
    ContentResolver contentResolver;
    // static String APIGatewayURL = "https://fhswpmwl2l.execute-api.us-east-2.amazonaws.com/prod";

    public OWMARestRequestClient(String MobileKey, ContentResolver contentResolver) {
        this.MobileKey = MobileKey;
        this.contentResolver = contentResolver;
    }

    public void UploadImage(File image, Consumer<String> callback) {
        try {
            InputStream is = new FileInputStream(image);
            new UploadImageTask(this.MobileKey, callback).execute(is);
        } catch (FileNotFoundException e) {
            throw new RuntimeException("File not found for image upload.");
        }
    }

    public void UploadImage(Uri image, Consumer<String> callback) {
        try {
            InputStream is = contentResolver.openInputStream(image);
            new UploadImageTask(this.MobileKey, callback).execute(is);
        } catch (FileNotFoundException e) {
            throw new RuntimeException("File not found for image upload.");
        }
    }


    public class UploadImageTask extends AsyncTask<InputStream, Integer, String> {

        final String APIGatewayImageUploadURL = "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/image-upload";

        String MobileKey;
        Consumer<String> callback;

        public UploadImageTask(String MobileKey, Consumer<String> callback) {
            this.MobileKey = MobileKey;
            this.callback = callback;
        }

        public String doInBackground(InputStream... images) {
            String message = "";

            for (int i = 0; i < images.length; i++) {
                InputStream image = images[i];

                JsonObject request_body = new JsonObject();
                // FIXME: respect original file extension
                // HACK: modern image processing libraries infer from file header anyways and extension is irrelevant
                request_body.addProperty("Filename", UUID.randomUUID().toString() + ".jpg");
                request_body.addProperty("Token", "");
                request_body.addProperty("MobileKey", this.MobileKey);
                try {
                    request_body.addProperty("Image", Base64.encodeToString(IOUtils.toByteArray(image), Base64.NO_WRAP));
                } catch (Exception e) {
                    return "Error while encoding image file: " + e.getMessage();
                }

                HttpResponse<JsonNode> response = Unirest.post(this.APIGatewayImageUploadURL)
                        .body(request_body)
                        .asJson();

                JsonNode response_body = response.getBody();

                // reason that I am not converting it to a gson json is because unirest seemed to have
                // a different implementation apart from gson
                if (!response.isSuccess()) {
                    message = "Connection error: " + response.getStatus();
                } else if (response_body.getObject().has("errorMessage")) {
                    // FIXME: Ideally we would like to return a success status and a message
                    // not sure if there is an idiomatic way to do it in java
                    message = response_body.getObject().getString("errorMessage");
                } else if (response_body.getObject().has("body")) {
                    JSONObject body = response_body.getObject().getJSONObject("body");
                    if (body.has("message")) {
                        message = body.getString("message");
                    } else {
                        message = "Corrupted response from backend.";
                        System.out.println(response_body.toPrettyString());
                    }
                } else {
                    message = "Corrupted response from backend.";
                    System.out.println(response_body.toPrettyString());
                }

                try {
                    image.close();
                } catch (IOException e){
                    throw new RuntimeException("Error while closing file during image upload.");
                }
            }
            return message;
        }

        public void onPostExecute(String message) {
            this.callback.accept(message);
        }
    }
}