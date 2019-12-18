package com.example.owmobile;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.SparseArray;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class HomePage extends AppCompatActivity {
    BottomNavigationView bottomNav;
    String authenticationKey;
    SharedPreferences sp;

    private SparseArray<Fragment> fragmentSparseArray = new SparseArray<>();

    private Fragment visible;

    private BottomNavigationView.OnNavigationItemSelectedListener navListener =
            new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                    System.out.println(menuItem);
                    System.out.println(menuItem.getItemId());

                    FragmentManager fm = getSupportFragmentManager();
                    fm.beginTransaction().hide(visible).commit();

                    Fragment f = fragmentSparseArray.get(menuItem.getItemId());
                    visible = f;
                    fm.beginTransaction().show(f).commit();
                    return true;
                }
            };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);

        sp = getSharedPreferences("MyData", MODE_PRIVATE);
        authenticationKey = sp.getString("AuthKey", "EMPTY");

        Fragment homefrag = new HomeFragment();
        Fragment uploadfrag = new PhotoUploadNew();
        Fragment settingsfrag = new SettingsFragment();

        fragmentSparseArray.append(R.id.nav_home, homefrag);
        fragmentSparseArray.append(R.id.nav_photo_upload, uploadfrag);
        fragmentSparseArray.append(R.id.nav_settings, settingsfrag);

        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction().add(R.id.fragment_container, homefrag).commit();
        fm.beginTransaction().add(R.id.fragment_container, uploadfrag).commit();
        fm.beginTransaction().add(R.id.fragment_container, settingsfrag).commit();
        fm.beginTransaction().hide(uploadfrag).commit();
        fm.beginTransaction().hide(settingsfrag).commit();

        visible = homefrag;

        bottomNav = findViewById(R.id.navBar);
        bottomNav.setOnNavigationItemSelectedListener(navListener);
    }
}
