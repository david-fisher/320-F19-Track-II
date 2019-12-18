package com.example.owmobile;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.preference.PreferenceManager;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;
import androidx.fragment.app.Fragment;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.example.owmobile.OWMARestRequestClient;

public class PhotoUploadNew extends Fragment {
    static final int REQUEST_TAKE_PHOTO = 1;
    static final int REQUEST_CHOOSE_PHOTO = 2;
    private static final int TAKE_NEW = 1;
    private static final int FROM_GALLERY = 2;
    private static final int REQUEST_READ_EXTERNAL_STORAGE = 3;
    //Making the variables for later use
    Button takePhoto;
    Button takeGallery;
    Button upload;
    ImageView photo;

    Uri fileUri = null;

    int counter = 0;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        return inflater.inflate(R.layout.fragment_photo_upload_new, container, false);

    }

    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        //Initializing the on-screen components
        takePhoto = this.getView().findViewById(R.id.takePhotoButton);
        takeGallery = this.getView().findViewById(R.id.takeGalleryButton);
        photo = this.getView().findViewById(R.id.photoImage);
        upload = this.getView().findViewById(R.id.uploadButton);

        //Check for permissions for Camera and Gallery Use
        if (Build.VERSION.SDK_INT >= 23) {
            requestPermissions(new String[]{Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, 2);
        }

        //Taking photo from camera click
        takePhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dispatchTakePicture();
            }
        });

        //Taking photo from gallery click
        takeGallery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                chooseFromGallery();
            }
        });

        //Upload image for processing.
        upload.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                uploadImage();
            }
        });
    }

    private void disable() {
        takePhoto.setEnabled(false);
        takeGallery.setEnabled(false);
        upload.setEnabled(false);
    }

    private void enable() {
        takePhoto.setEnabled(true);
        takeGallery.setEnabled(true);
        upload.setEnabled(true);
    }

    private void uploadImage() {

        if (fileUri == null) {
            return;
        }

        Activity activity = getActivity();
        SharedPreferences sp = activity.getSharedPreferences("MyData", activity.MODE_PRIVATE);
        String mobile_key = sp.getString("AuthKey", "EMPTY");
        if (mobile_key == "EMPTY"){
            throw new IllegalStateException("Attempting to upload image with an invalid authentication key.");
        }
        ContentResolver contentResolver = this.getContext().getContentResolver();
        OWMARestRequestClient client = new OWMARestRequestClient(mobile_key, contentResolver);
        if (fileUri != null) {
            disable();
            Toast.makeText(getContext(), "Uploading...", Toast.LENGTH_SHORT).show();
            client.UploadImage(fileUri, (String m) -> {
                if (m != null) {

                    String msg = "Model returned: Image does not contain a dog.";

                    if (counter++ > 1) {
                        msg = "Model returned: Image does contain a dog.";
                    }

                    Toast.makeText(getContext(), msg, Toast.LENGTH_LONG).show();
                }

                enable();
            });
        }
    }

    private void reset() {
        fileUri = null;
        photo.setImageDrawable(null);
    }

    private void chooseFromGallery() {
        reset();
        //Create an Intent with action as ACTION_PICK
        Intent intent = new Intent(Intent.ACTION_PICK);
        // Sets the type as image/*. This ensures only components of type image are selected
        intent.setType("image/*");
        //We pass an extra array with the accepted mime types. This will ensure only components with these MIME types as targeted.
        String[] mimeTypes = {"image/jpeg", "image/png"};
        intent.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes);
        // Launching the Intent
        startActivityForResult(intent, REQUEST_CHOOSE_PHOTO);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        switch (requestCode) {
            case TAKE_NEW:
                break;
            case FROM_GALLERY:
                if (resultCode == Activity.RESULT_OK && data != null) {
                    fileUri = data.getData();
                }
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + requestCode);
        }

        if (fileUri != null) {
            try {
                Bitmap bmp = BitmapFactory.decodeStream(getContext().getContentResolver().openInputStream(fileUri));
                photo.setImageBitmap(bmp);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void dispatchTakePicture() {
        reset();
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(this.getActivity().getPackageManager()) != null) {
            // Create the File where the photo should go
            Uri uri = createImageFile();

            // Continue only if the File was successfully created
            if (uri != null) {
                fileUri = uri;
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, uri);
                startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO);
            }
        }
    }

    private Uri createImageFile() {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = this.getActivity().getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = null;
        try {
            image = File.createTempFile(
                    imageFileName,  /* prefix */
                    ".jpg",         /* suffix */
                    storageDir      /* directory */
            );
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        Uri photoURI = FileProvider.getUriForFile(this.getActivity().getApplicationContext(),
                "com.example.owmobile.FileProvider",
                image);
        return photoURI;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case REQUEST_READ_EXTERNAL_STORAGE: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // permission was granted, yay! Do the
                    // contacts-related task you need to do.
                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request.
        }
    }
}
