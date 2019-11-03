package com.example.orchardwatch;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

public class MainActivity extends AppCompatActivity {

    private WebView my_webview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView navView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);

        my_webview = (WebView)findViewById(R.id.webView);

        WebSettings web_settings = my_webview.getSettings();
        web_settings.setJavaScriptEnabled(true);

        my_webview.loadUrl("https://www.umass.edu/");
        my_webview.setWebViewClient(new WebViewClient());   //prevent opening in another browser instead of the app

    }

    /*
    When back button is clicked, it goes back to the previous page
     */
    @Override
    public void onBackPressed() {
        if(my_webview.canGoBack()){
            my_webview.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
