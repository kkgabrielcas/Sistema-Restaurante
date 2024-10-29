package CardapioApi.APi.Database;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class updateSQL {

    private static final String DIRETORIO_IMAGENS = "imagens";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);


        System.out.print("Digite o nome do item: ");
        String nome = scanner.nextLine();

        System.out.print("Digite o preço do item: ");
        String precoInput = scanner.nextLine();

        System.out.print("Digite a quantidade em estoque: ");
        String quantidadeInput = scanner.nextLine();

        System.out.print("Digite a descrição do item: ");
        String descricao = scanner.nextLine();

        String caminhoImagem = abrirExploradorDeArquivos();

        if (caminhoImagem != null) {
            String nomeImagem = moverImagemParaDiretorio(caminhoImagem);
            if (nomeImagem != null) {
                addItem(nome, precoInput, quantidadeInput, descricao, nomeImagem);
            } else {
                System.out.println("");
            }
        } else {
            System.out.println("");
        }

        scanner.close();
    }

    private static String abrirExploradorDeArquivos() {
        FileDialog dialog = new FileDialog((Frame) null, "Escolha uma imagem para o item", FileDialog.LOAD);
        dialog.setVisible(true);

        String directory = dialog.getDirectory();
        String file = dialog.getFile();

        if (directory != null && file != null) {
            return directory + file;
        }
        return null;
    }

    private static String moverImagemParaDiretorio(String caminhoImagem) {
        try {
            Path diretorio = Paths.get(DIRETORIO_IMAGENS);
            if (!Files.exists(diretorio)) {
                Files.createDirectories(diretorio);
            }

            File imagemOrigem = new File(caminhoImagem);
            File imagemDestino = new File(diretorio.toFile(), imagemOrigem.getName());
            Files.copy(imagemOrigem.toPath(), imagemDestino.toPath());

            return imagemDestino.getName();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static void addItem(String nome, String precoInput, String quantidadeInput, String descricao, String nomeImagem) {
        String sql = "INSERT INTO itens_menu (nome, preco, estoque, descricao, imagem) VALUES (?, ?, ?, ?, ?)";

        try (Connection connection = ConexaoSQL.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, nome);
            String precoFormatado = precoInput.replace(',', '.');
            preparedStatement.setBigDecimal(2, new java.math.BigDecimal(precoFormatado));
            preparedStatement.setInt(3, Integer.parseInt(quantidadeInput));
            preparedStatement.setString(4, descricao);
            preparedStatement.setString(5, nomeImagem);

            int rowsAffected = preparedStatement.executeUpdate();
            System.out.println(rowsAffected + " item adicionado ao banco de dados.");

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
    }
}
