package CardapioApi.APi.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FoodDTO {

    private Long id;
    private String nome;
    private double preco;
    private int estoque;
    private String descricao;
    private String imagem;
}
