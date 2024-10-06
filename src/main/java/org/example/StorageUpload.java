package org.example;


import com.google.firebase.cloud.StorageClient;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Blob;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class StorageUpload {

    public static String uploadImage(String localImagePath, String firebaseImagePath) throws IOException {
        // Recupera o bucket do Firebase Storage
        Bucket bucket = StorageClient.getInstance().bucket();

        // Carrega o arquivo local
        File file = new File(localImagePath);
        FileInputStream fileInputStream = new FileInputStream(file);

        // Envia o arquivo para o Firebase Storage
        Blob blob = bucket.create(firebaseImagePath, fileInputStream, "image/jpeg");

        // Retorna o URL do arquivo enviado
        return String.format("https://storage.googleapis.com/%s/%s", bucket.getName(), firebaseImagePath);
    }
}