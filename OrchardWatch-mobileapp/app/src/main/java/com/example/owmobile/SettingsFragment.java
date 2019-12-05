package com.example.owmobile;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class SettingsFragment extends Fragment {
    SharedPreferences sp;
    SharedPreferences.Editor editor;

    Button signoutButton;
    TextView authenticationKey;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_settings, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        sp = this.getContext().getSharedPreferences("MyData", this.getContext().MODE_PRIVATE);
        editor = sp.edit();

        signoutButton = (Button) this.getView().findViewById(R.id.signoutButton);
        authenticationKey = (TextView) this.getView().findViewById(R.id.authKey);

        authenticationKey.setText("Authentication Key: " + (sp.getString("AuthKey", "EMPTY")));

        signoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                editor.clear();
                editor.commit();

                moveToAuthenticationPage();
            }
        });
    }

    private void moveToAuthenticationPage() {
        Intent intent = new Intent(getContext(), MainActivity.class);
        startActivity(intent);
    }
}
