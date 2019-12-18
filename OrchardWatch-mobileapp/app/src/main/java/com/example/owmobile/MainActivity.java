package com.example.owmobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.view.View;
import android.widget.EditText;
import android.os.Bundle;
import android.widget.Button;
import android.content.Intent;

public class MainActivity extends AppCompatActivity {

    String authenticationKey;
    EditText authInput;
    Button submitButton;

    SharedPreferences sp;
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sp = getSharedPreferences("MyData", MODE_PRIVATE);
        editor = sp.edit();

        authenticationKey = sp.getString("AuthKey", "EMPTY");

        if (!authenticationKey.equals("EMPTY")) {
            moveToHomePage();
        }

        authInput = findViewById(R.id.AuthKey);
        submitButton = findViewById(R.id.button);

        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                authenticationKey = authInput.getText().toString();
                editor.putString("AuthKey", authenticationKey);
                editor.commit();

                moveToHomePage();
            }
        });
    }

    private void moveToHomePage() {
        Intent intent = new Intent(MainActivity.this, HomePage.class);
        startActivity(intent);
    }
}
