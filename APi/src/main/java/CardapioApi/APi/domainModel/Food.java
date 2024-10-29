package CardapioApi.APi.domainModel;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "itens_menu")
@Data
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "preco")
    private double preco;

    @Column(name = "estoque")
    private int estoque;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "imagem")
    private String imagem;


    public Food(Long id, String nome, double preco, int estoque, String descricao, String imagem) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
        this.descricao = descricao;
        this.imagem = imagem;
    }
}
