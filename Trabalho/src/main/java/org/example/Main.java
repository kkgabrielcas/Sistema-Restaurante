package org.example;


public class Main {
    public static void main(String[] args) {
        try {
            Firebase.initialize();

            String localImagePath = "src/main/resources/imagem/imagem.jpg"; // Caminho da imagem local
            String firebaseImagePath= "imagens/imagem.jpg"; // Caminho da imagem no banco de dados

            String imageUrl = StorageUpload.uploadImage(localImagePath, firebaseImagePath);
            System.out.println("Imagem enviada!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
