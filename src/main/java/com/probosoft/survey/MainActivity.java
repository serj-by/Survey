package com.probosoft.survey;

import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    // Перегружаем метод onCreate, в нем создаем необходимый нам WebView и устанавливаем ему возможность масштабирования
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main); // Показываем нашему приложению, кто тут главный
        WebView wv = (WebView) findViewById(R.id.webView); // Создаем WebView – мини-браузер в приложении
        WebSettings settings = wv.getSettings(); // Получаем класс настроек нашего мини-браузера
        settings.setDisplayZoomControls(true); // Разрешаем показать настройки масштабирования для мини-браузера
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        wv.loadUrl("file:///android_asset/html/index.html"); // Загружаем страницу нашего приложения в мини-браузер
    }
}