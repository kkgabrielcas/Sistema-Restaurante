package CardapioApi.APi.update;

import CardapioApi.APi.connection.ConexaoSQL;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class updateSQL {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite o nome do item: ");
        String nome = scanner.nextLine();

        System.out.print("Digite a descrição do item: ");
        String descricao = scanner.nextLine();

        System.out.print("Digite o preço do item: ");
        String precoInput = scanner.nextLine();

        System.out.print("Digite a quantidade em estoque: ");
        String quantidadeInput = scanner.nextLine();
        
        addItem(nome, precoInput, quantidadeInput, descricao);
        scanner.close();
    }

    private static void addItem(String nome, String precoInput, String quantidadeInput, String descricao) {

        String sql = "INSERT INTO itens_menu (nome, preco, estoque, descricao) VALUES (?, ?, ?, ?)";


        try (Connection connection = ConexaoSQL.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            // Definir parâmetros
            preparedStatement.setString(1, nome);
            preparedStatement.setBigDecimal(2, new java.math.BigDecimal(precoInput));
            preparedStatement.setInt(3, Integer.parseInt(quantidadeInput));
            preparedStatement.setString(4, descricao);

            // Executar a adição
            int rowsAffected = preparedStatement.executeUpdate();
            System.out.println(rowsAffected + " item adicionado ao banco de dados.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
