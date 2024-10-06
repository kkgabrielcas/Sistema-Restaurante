package org.example;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;
import java.io.IOException;

// Esse código inicia a conexão com o firebase

public class Firebase {
    public static void initialize() throws IOException {
        // Key do firebase
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/SDKKEY.json"); // Caminho da chave .json

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("uuyt-2487d.appspot.com") // Link do Storage no banco
                .build();

        FirebaseApp.initializeApp(options);
    }
}
